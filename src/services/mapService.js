// Map service abstraction. The Explore page renders a lightweight embedded
// map today; swap this module's internals for a full JS map SDK (MapLibre,
// Google Maps, Mapbox) later without touching page/component code.
// Any API key required by a future provider must come from an environment
// variable (e.g. import.meta.env.VITE_MAPS_API_KEY) — never hardcode keys here.

export function getGoogleMapsDirectionsUrl(destination, origin) {
  const dest = `${destination.latitude},${destination.longitude}`;
  const params = new URLSearchParams({ api: "1", destination: dest });
  if (origin) {
    params.set("origin", `${origin.latitude},${origin.longitude}`);
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function getStaticMapEmbedUrl(latitude, longitude, zoom = 15) {
  // OpenStreetMap embed requires no API key — a safe default for the MVP.
  const delta = 0.01;
  const bbox = [longitude - delta, latitude - delta, longitude + delta, latitude + delta].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${latitude},${longitude}&layer=mapnik`;
}
