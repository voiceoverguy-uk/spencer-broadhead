import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

// No real Google requests or credentials are used in these regression checks.
const server = await createServer({
  configFile: false,
  root: fileURLToPath(new URL("..", import.meta.url)),
  appType: "custom",
  server: { middlewareMode: true },
  optimizeDeps: { noDiscovery: true, include: [] },
  define: {
    "import.meta.env.VITE_GOOGLE_MAPS_API_KEY": JSON.stringify("test-browser-key"),
  },
});

let requests = 0;
let responseName = "Spencer & Broadhead Ltd";
let rejectRequest = false;
let requestedId;

class FakePlace {
  constructor({ id }) {
    requestedId = id;
  }
  async fetchFields({ fields }) {
    requests++;
    assert(fields.includes("reviews"));
    assert(fields.includes("attributions"));
    await Promise.resolve();
    if (rejectRequest) throw new Error("REQUEST_DENIED");
    Object.assign(this, {
      displayName: responseName,
      formattedAddress: "George St, Wakefield WF1 1DR, UK",
      rating: 4.9,
      userRatingCount: 53,
      reviews: [{ rating: 5, text: "Test fixture only." }],
    });
  }
}

globalThis.window = {
  google: { maps: { importLibrary: async () => ({ Place: FakePlace }) } },
};

try {
  const { loadBusinessReviews, BUSINESS_PLACE_ID, GOOGLE_REVIEWS_URL } =
    await server.ssrLoadModule("/src/lib/google-reviews.ts");
  const first = loadBusinessReviews();
  const concurrent = loadBusinessReviews();
  assert.equal(first, concurrent, "Concurrent mounts must share one request.");
  const result = await first;
  assert.equal(requestedId, "ChIJz2w7ZvxmeUgRUBoe_r00hJ0");
  assert.equal(requestedId, BUSINESS_PLACE_ID);
  assert.equal(requests, 1);
  assert.equal(result.reviews[0].text, "Test fixture only.");
  assert(GOOGLE_REVIEWS_URL.includes(BUSINESS_PLACE_ID));

  responseName = "Different garage";
  await assert.rejects(loadBusinessReviews(), /listing could not be verified/);
  responseName = "Spencer & Broadhead Ltd";
  rejectRequest = true;
  await assert.rejects(loadBusinessReviews(), /REQUEST_DENIED/);
  rejectRequest = false;
  await loadBusinessReviews();
  assert.equal(requests, 4, "Failed requests must allow a later retry.");
  console.log("Google review checks passed: exact listing, deduplication, attribution fields, mismatch rejection and retry.");
} finally {
  delete globalThis.window;
  await server.close();
}
