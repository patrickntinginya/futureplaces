// Favorites storage. Unauthenticated users get localStorage persistence;
// once real authentication ships, swap the branches here for API calls to
// /api/favorites without changing how pages call this module.
import { isAuthenticated } from "./auth.js";

const KEY = "futureplaces:favorites";

function readLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLocal(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}

export function getFavoriteSlugs() {
  // TODO: when authenticated, fetch from /api/favorites instead.
  return readLocal();
}

export function isFavorite(slug) {
  return getFavoriteSlugs().includes(slug);
}

export function toggleFavorite(slug) {
  const current = readLocal();
  const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
  writeLocal(next);
  return next.includes(slug);
}

export function favoritesAuthNote() {
  return isAuthenticated()
    ? "Vipendwa vyako vinahifadhiwa kwenye akaunti yako."
    : "Vipendwa vyako vinahifadhiwa kwenye kifaa hiki.";
}
