workbox.core.setCacheNameDetails({
  prefix: "todoify",
  suffix: "v1",
  precache: "precache",
  runtime: "run-time",
  googleAnalytics: "ga"
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerNavigationRoute("/index.html");
