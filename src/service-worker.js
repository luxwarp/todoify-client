workbox.core.setCacheNameDetails({
  prefix: "todoify",
  suffix: "v1",
  precache: "precache",
  runtime: "run-time",
  googleAnalytics: "ga"
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerNavigationRoute("/index.html");

self.addEventListener("message", e => {
  if (!e.data) {
    return;
  }

  switch (e.data) {
    case "skipWaiting":
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});
