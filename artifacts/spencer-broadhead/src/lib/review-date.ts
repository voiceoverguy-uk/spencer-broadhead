const reviewDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatRecentReviewDate(publishTime?: Date, now = new Date()): string | undefined {
  if (!publishTime || Number.isNaN(publishTime.getTime()) || publishTime > now) return undefined;

  const cutoff = new Date(now);
  cutoff.setFullYear(cutoff.getFullYear() - 5);
  if (publishTime < cutoff) return undefined;

  return reviewDateFormatter.format(publishTime);
}
