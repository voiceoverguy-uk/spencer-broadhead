import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { page } from "./data";

const REVIEW_INTERVAL = 8000;
const PLACE_QUERY = "Spencer & Broadhead Ltd, George Street, Wakefield WF1 1DR, UK";
const PLACE_ID_CACHE_KEY = "spencer-broadhead-google-place-id";
const GOOGLE_LOGO =
  "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg";
const GOOGLE_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=Spencer%20%26%20Broadhead%20Ltd%2C%20Wakefield%20WF1%201DR";

type Attribution = {
  displayName?: string;
  uri?: string;
  photoURI?: string;
};

type GoogleReview = {
  rating?: number;
  text?: string;
  originalText?: string;
  authorAttribution?: Attribution;
};

type PlaceRecord = {
  id?: string;
  displayName?: { text?: string } | string;
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
  googleMapsURI?: string;
  attributions?: { provider?: string; providerURI?: string }[];
  fetchFields: (request: { fields: string[] }) => Promise<void>;
};

type PlacesLibrary = {
  Place: {
    new (options: { id: string }): PlaceRecord;
    searchByText: (request: {
      textQuery: string;
      fields: string[];
      language: string;
      region: string;
      maxResultCount: number;
    }) => Promise<{ places?: PlaceRecord[] }>;
  };
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

function loadPlacesLibrary(): Promise<PlacesLibrary> {
  if (!API_KEY) return Promise.reject(new Error("Google Maps key is not configured."));

  const importPlaces = async () => {
    if (!window.google?.maps?.importLibrary) throw new Error("Google Maps could not be loaded.");
    return (await window.google.maps.importLibrary("places")) as PlacesLibrary;
  };

  if (window.google?.maps?.importLibrary) return importPlaces();
  if (placesLibraryPromise) return placesLibraryPromise;

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

function displayName(place: PlaceRecord) {
  return typeof place.displayName === "string"
    ? place.displayName
    : place.displayName?.text ?? "";
}

function isSpencerAndBroadhead(place: PlaceRecord) {
  const name = displayName(place).toLowerCase();
  const address = (place.formattedAddress ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return (
    name.includes("spencer") &&
    name.includes("broadhead") &&
    address.includes("wakefield") &&
    address.includes("wf11dr")
  );
}

function getSavedPlaceId() {
  try {
    return window.localStorage.getItem(PLACE_ID_CACHE_KEY);
  } catch {
    return null;
  }
}

function savePlaceId(id: string | undefined) {
  if (!id) return;
  try {
    window.localStorage.setItem(PLACE_ID_CACHE_KEY, id);
  } catch {
    // Storage may be disabled; the current page can still show its live results.
  }
}

function clearSavedPlaceId() {
  try {
    window.localStorage.removeItem(PLACE_ID_CACHE_KEY);
  } catch {
    // Ignore unavailable storage.
  }
}

async function loadBusinessReviews() {
  const { Place } = await loadPlacesLibrary();
  const detailsFields = [
    "id",
    "displayName",
    "formattedAddress",
    "rating",
    "userRatingCount",
    "reviews",
    "googleMapsURI",
    "attributions",
  ];
  const savedId = getSavedPlaceId();

  if (savedId) {
    const savedPlace = new Place({ id: savedId });
    await savedPlace.fetchFields({ fields: detailsFields });
    if (isSpencerAndBroadhead(savedPlace)) return savedPlace;
    clearSavedPlaceId();
  }

  const { places = [] } = await Place.searchByText({
    textQuery: PLACE_QUERY,
    fields: ["id", "displayName", "formattedAddress"],
    language: "en-GB",
    region: "GB",
    maxResultCount: 5,
  });
  const match = places.find(isSpencerAndBroadhead);
  if (!match) throw new Error("The Spencer & Broadhead Google listing could not be verified.");

  await match.fetchFields({ fields: detailsFields });
  if (!isSpencerAndBroadhead(match)) {
    throw new Error("The Spencer & Broadhead Google listing could not be verified.");
  }
  savePlaceId(match.id);
  return match;
}

function GoogleBrand({ className = "" }: { className?: string }) {
  return (
    <img
      src={GOOGLE_LOGO}
      width="64"
      height="21"
      alt="Google"
      className={`inline-block h-[18px] w-auto ${className}`}
    />
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          aria-hidden="true"
          key={index}
          className={index < Math.round(rating) ? "text-[#F4C430]" : "text-current opacity-25"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function ReviewAuthor({ review }: { review: GoogleReview }) {
  const author = review.authorAttribution;
  const name = author?.displayName || "Google reviewer";
  const nameElement = author?.uri ? (
    <a href={author.uri} target="_blank" rel="noreferrer" className="font-semibold underline-offset-2 hover:underline">
      {name}
    </a>
  ) : (
    <span className="font-semibold">{name}</span>
  );

  return (
    <div className="mt-4 flex items-center gap-3 text-sm">
      {author?.photoURI ? (
        <img src={author.photoURI} alt="" className="h-9 w-9 rounded-full object-cover" loading="lazy" />
      ) : (
        <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-current/10 font-semibold">
          {name.slice(0, 1).toUpperCase()}
        </span>
      )}
      {nameElement}
    </div>
  );
}

function ReviewQuote({ review, dark = false, compact = false }: { review: GoogleReview; dark?: boolean; compact?: boolean }) {
  const quote = review.text || review.originalText;
  return (
    <figure>
      {typeof review.rating === "number" && (
        <div className="text-sm">
          <Stars rating={review.rating} />
        </div>
      )}
      <blockquote className={`mt-3 leading-relaxed ${compact ? "line-clamp-3" : ""} ${dark ? "text-secondary" : "text-white"}`}>
        {quote ? `“${quote}”` : "This customer left a star rating without a written comment."}
      </blockquote>
      <figcaption>
        <ReviewAuthor review={review} />
      </figcaption>
    </figure>
  );
}

type ReviewsData = {
  rating?: number;
  userRatingCount?: number;
  reviews: GoogleReview[];
  mapsUrl: string;
  attributions: NonNullable<PlaceRecord["attributions"]>;
};

type ReviewsStatus = "loading" | "ready" | "api-error" | "listing-error";

function useGoogleReviews() {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [status, setStatus] = useState<ReviewsStatus>("loading");

  useEffect(() => {
    let active = true;
    loadBusinessReviews()
      .then((place) => {
        if (!active) return;
        setData({
          rating: place.rating,
          userRatingCount: place.userRatingCount,
          reviews: place.reviews ?? [],
          mapsUrl: place.googleMapsURI || GOOGLE_SEARCH_URL,
          attributions: place.attributions ?? [],
        });
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (!active) return;
        // Only allowlisted error codes are logged, never Google's raw error or request URL.
        const code = error instanceof Error
          ? error.message.match(/\b(REQUEST_DENIED|INVALID_REQUEST|OVER_QUERY_LIMIT|ZERO_RESULTS|RefererNotAllowedMapError|ApiNotActivatedMapError|InvalidKeyMapError|BillingNotEnabledMapError)\b/)?.[0]
          : undefined;
        console.warn("[Google reviews]", code ?? (
          error instanceof Error && error.message.includes("listing could not be verified")
            ? "LISTING_NOT_VERIFIED"
            : "LOAD_FAILED"
        ));
        setStatus(
          error instanceof Error && error.message.includes("listing could not be verified")
            ? "listing-error"
            : "api-error",
        );
      });
    return () => {
      active = false;
    };
  }, []);

  return { data, status };
}

function ReviewSummary({ data, dark = false }: { data: ReviewsData; dark?: boolean }) {
  const tone = dark ? "text-white/80" : "text-muted-foreground";
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${tone}`}>
      {typeof data.rating === "number" && (
        <>
          <span className={dark ? "font-semibold text-white" : "font-semibold text-secondary"}>
            {data.rating.toFixed(1)}
          </span>
          <Stars rating={data.rating} />
        </>
      )}
      {typeof data.userRatingCount === "number" && (
        <span>{data.userRatingCount} Google reviews</span>
      )}
    </div>
  );
}

function ReviewError({ dark = false, status }: { dark?: boolean; status: ReviewsStatus }) {
  const message =
    status === "listing-error"
      ? "We couldn’t verify the garage’s Google listing. Please read our reviews directly on Google."
      : "Google reviews are temporarily unavailable. Please read them directly on Google.";
  return (
    <p className={dark ? "text-sm text-white/75" : "text-sm text-muted-foreground"}>
      {message}
    </p>
  );
}

export function HomeGoogleReviews() {
  const { data, status } = useGoogleReviews();
  const [current, setCurrent] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [canRotate, setCanRotate] = useState(false);

  useEffect(() => {
    setCanRotate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onVisibilityChange = () => setHidden(document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const next = useCallback(() => {
    if (!data?.reviews.length) return;
    setCurrent((index) => (index + 1 + Math.floor(Math.random() * (data.reviews.length - 1 || 1))) % data.reviews.length);
  }, [data]);

  useEffect(() => {
    if (!canRotate || hidden || (data?.reviews.length ?? 0) < 2) return;
    const timer = window.setTimeout(next, REVIEW_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [canRotate, current, data?.reviews.length, hidden, next]);

  const review = data?.reviews[current];

  return (
    <section
      id="testimonials"
      aria-labelledby="home-reviews-title"
      className="relative scroll-mt-[76px] overflow-hidden bg-secondary text-white"
      data-testid="section-home-testimonials"
    >
      <div className="stripe-rule h-1.5" />
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 md:px-8 md:py-8 lg:grid-cols-[210px_1fr] lg:items-center lg:gap-10">
        <div>
          <div className="flex items-center gap-2">
            <GoogleBrand />
            <span className="text-xs text-white/65">reviews</span>
          </div>
          <h2 id="home-reviews-title" className="mt-2 text-xl font-semibold text-white">
            What customers say
          </h2>
          {data && <ReviewSummary data={data} dark />}
          <a
            href={page("/testimonials")}
            data-testid="link-all-testimonials"
            className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F4C430] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4C430]"
          >
            All reviews <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div aria-live="off" className="min-h-[116px]">
          {status === "loading" && <p className="text-sm text-white/75">Loading Google reviews…</p>}
          {(status === "api-error" || status === "listing-error") && <ReviewError dark status={status} />}
          {review && <ReviewQuote review={review} compact />}
          {status === "ready" && !review && <p className="text-sm text-white/75">No written Google reviews are available to show.</p>}
          <a className="mt-2 inline-block text-xs text-white/75 underline underline-offset-4" href={data?.mapsUrl || GOOGLE_SEARCH_URL} target="_blank" rel="noreferrer">Read on Google</a>
          <ProviderAttributions data={data} />
        </div>
      </div>
    </section>
  );
}

export function GoogleReviewsWall() {
  const { data, status } = useGoogleReviews();

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20" aria-label="Google reviews">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-secondary/15 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <GoogleBrand />
            <span className="text-sm text-muted-foreground">reviews</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-secondary">Customer reviews</h2>
          {data && <ReviewSummary data={data} />}
        </div>
        <a
          href={data?.mapsUrl || GOOGLE_SEARCH_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-secondary underline underline-offset-4"
        >
          Read reviews on Google <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {status === "loading" && <p className="py-8 text-muted-foreground">Loading Google reviews…</p>}
      {(status === "api-error" || status === "listing-error") && <div className="py-8"><ReviewError status={status} /></div>}
      {status === "ready" && data?.reviews.length === 0 && (
        <p className="py-8 text-muted-foreground">No written Google reviews are available to show.</p>
      )}
      {data && data.reviews.length > 0 && (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.reviews.map((review, index) => (
            <li key={`${review.authorAttribution?.displayName ?? "review"}-${index}`} className="rounded-lg border border-secondary/15 bg-white p-6 shadow-sm">
              <ReviewQuote review={review} dark />
            </li>
          ))}
        </ul>
      )}
      <p className="mt-5 text-xs text-muted-foreground">
        Google may return a limited selection of reviews, ordered by relevance.
      </p>
      <ProviderAttributions data={data} />
    </section>
  );
}

function ProviderAttributions({ data }: { data: ReviewsData | null }) {
  if (!data?.attributions.length) return null;
  return (
    <p className="mt-3 text-xs">
      {data.attributions.map((attribution, index) => (
        <span key={index} className="mr-2">
          {attribution.providerURI
            ? <a href={attribution.providerURI} target="_blank" rel="noreferrer" className="underline">{attribution.provider}</a>
            : attribution.provider}
        </span>
      ))}
    </p>
  );
}
