self.addEventListener("install", () => {
  console.info("Service Worker installing.");
});

self.addEventListener("activate", () => {
  console.info("Service Worker activating.");
});

self.addEventListener("fetch", (event) => {
  console.info("Fetching:", event.request.url);
  event.respondWith(fetch(event.request));
});
