// Verified against Google's listing, business address, phone and website.
export const BUSINESS_PLACE_ID = "ChIJz2w7ZvxmeUgRUBoe_r00hJ0";
export const GOOGLE_REVIEWS_URL =
  `https://www.google.com/maps/search/?api=1&query=Spencer%20%26%20Broadhead%20Ltd&query_place_id=${BUSINESS_PLACE_ID}`;

type Attribution = {
  displayName?: string;
  uri?: string;
  photoURI?: string;
};

export type GoogleReview = {
  rating?: number;
  text?: string;
  originalText?: string;
  publishTime?: Date;
  authorAttribution?: Attribution;
};

type PlaceRecord = {
  displayName?: string;
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
  googleMapsURI?: string;
  attributions?: { provider?: string; providerURI?: string }[];
  fetchFields: (request: { fields: string[] }) => Promise<unknown>;
};

type PlacesLibrary = {
  Place: new (options: { id: string }) => PlaceRecord;
};

declare global {
  interface Window {
    spencerGoogleMapsReady?: () => void;
    google?: {
      maps?: {
        importLibrary?: (name: string) => Promise<unknown>;
      };
    };
  }
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
let placesLibraryPromise: Promise<PlacesLibrary> | undefined;
let pendingReviews: Promise<PlaceRecord> | undefined;

function loadPlacesLibrary(): Promise<PlacesLibrary> {
  if (!API_KEY) return Promise.reject(new Error("Google Maps key is not configured."));
  if (placesLibraryPromise) return placesLibraryPromise;

  const importPlaces = async () => {
    if (!window.google?.maps?.importLibrary) throw new Error("Google Maps could not be loaded.");
    return (await window.google.maps.importLibrary("places")) as PlacesLibrary;
  };

  if (window.google?.maps?.importLibrary) {
    placesLibraryPromise = importPlaces();
    return placesLibraryPromise;
  }

  placesLibraryPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      delete window.spencerGoogleMapsReady;
      reject(new Error("Google Maps load timed out."));
    }, 15000);
    window.spencerGoogleMapsReady = () => {
      window.clearTimeout(timeout);
      delete window.spencerGoogleMapsReady;
      resolve();
    };
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(API_KEY)}&v=weekly&loading=async&callback=spencerGoogleMapsReady`;
    script.async = true;
    script.onerror = () => {
      window.clearTimeout(timeout);
      delete window.spencerGoogleMapsReady;
      reject(new Error("Google Maps could not be loaded."));
    };
    document.head.appendChild(script);
  })
    .then(importPlaces)
    .catch((error) => {
      placesLibraryPromise = undefined;
      throw error;
    });

  return placesLibraryPromise;
}

async function fetchBusinessReviews() {
  const { Place } = await loadPlacesLibrary();
  const place = new Place({ id: BUSINESS_PLACE_ID });
  await place.fetchFields({
    fields: [
      "displayName",
      "formattedAddress",
      "rating",
      "userRatingCount",
      "reviews",
      "googleMapsURI",
      "attributions",
    ],
  });

  // Fail explicitly if Google's record no longer describes this garage.
  const name = (place.displayName ?? "").toLowerCase();
  const address = (place.formattedAddress ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!name.includes("spencer") || !name.includes("broadhead") ||
      !address.includes("wakefield") || !address.includes("wf11dr")) {
    throw new Error("The Spencer & Broadhead Google listing could not be verified.");
  }
  return place;
}

export function loadBusinessReviews(): Promise<PlaceRecord> {
  // Share concurrent mount requests (including React StrictMode) without persisting reviews.
  if (!pendingReviews) {
    pendingReviews = fetchBusinessReviews().finally(() => {
      pendingReviews = undefined;
    });
  }
  return pendingReviews;
}
