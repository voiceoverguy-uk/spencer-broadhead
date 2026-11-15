import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { page } from "./data";
import { GOOGLE_REVIEWS_URL, loadBusinessReviews, type GoogleReview } from "@/lib/google-reviews";
import { formatRecentReviewDate } from "@/lib/review-date";
import { shuffledReviewOrder } from "@/lib/review-order";

const REVIEW_INTERVAL = 8000;
const GOOGLE_LOGO =
  "https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg";

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
  const reviewDate = review.publishTime && formatRecentReviewDate(review.publishTime);
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
      <span className="flex flex-wrap items-baseline gap-x-2">
        {nameElement}
        {reviewDate && (
          <time dateTime={review.publishTime?.toISOString()} className="text-xs text-current/65">
            {reviewDate}
          </time>
        )}
      </span>
    </div>
  );
}

function ReviewQuote({ review, dark = false, compact = false }: { review: GoogleReview; dark?: boolean; compact?: boolean }) {
  const quote = review.text || review.originalText;
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const quoteElement = quoteRef.current;
    if (!quoteElement || compact || expanded) return;

    const measureOverflow = () => {
      setHasMore(quoteElement.scrollHeight > quoteElement.clientHeight + 1);
    };

    measureOverflow();
    const observer = new ResizeObserver(measureOverflow);
    observer.observe(quoteElement);
    return () => observer.disconnect();
  }, [quote, compact, expanded]);

  return (
    <figure>
      {typeof review.rating === "number" && (
        <div className="text-sm">
          <Stars rating={review.rating} />
        </div>
      )}
      <blockquote
        ref={quoteRef}
        className={`mt-3 leading-relaxed ${compact ? "line-clamp-3" : !expanded ? "line-clamp-6" : ""} ${dark ? "text-secondary" : "text-white"}`}
      >
        {quote ? `“${quote}”` : "This customer left a star rating without a written comment."}
      </blockquote>
      {!compact && hasMore && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
          className="mt-2 text-sm font-semibold text-secondary underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
          {expanded ? "Show less" : "Click for more"}
        </button>
      )}
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
  attributions: { provider?: string; providerURI?: string }[];
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
          mapsUrl: place.googleMapsURI || GOOGLE_REVIEWS_URL,
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
  const [sequence, setSequence] = useState<{ order: number[]; position: number }>({
    order: [],
    position: 0,
  });
  const [hidden, setHidden] = useState(false);
  const [canRotate, setCanRotate] = useState(false);
  const reviewCount = data?.reviews.length ?? 0;

  useEffect(() => {
    setSequence({ order: shuffledReviewOrder(reviewCount), position: 0 });
  }, [reviewCount]);

  useEffect(() => {
    setCanRotate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onVisibilityChange = () => setHidden(document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const next = useCallback(() => {
    setSequence(({ order, position }) => {
      if (position + 1 < order.length) return { order, position: position + 1 };
      return {
        order: shuffledReviewOrder(reviewCount, order[position]),
        position: 0,
      };
    });
  }, [reviewCount]);

  useEffect(() => {
    if (!canRotate || hidden || sequence.order.length < 2) return;
    const timer = window.setTimeout(next, REVIEW_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [canRotate, sequence, hidden, next]);

  const review = data?.reviews[sequence.order[sequence.position] ?? 0];

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
          <a className="mt-2 inline-block text-xs text-white/75 underline underline-offset-4" href={data?.mapsUrl || GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">Read on Google</a>
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
          href={data?.mapsUrl || GOOGLE_REVIEWS_URL}
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
