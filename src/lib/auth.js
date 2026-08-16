// Authentication architecture foundation for Future Places.
//
// This MVP does not ship a full auth flow yet — it establishes the shape so
// customer / business_owner / admin roles can be added without reworking
// call sites. Session state lives in localStorage for now; swap this module's
// internals for real session cookies + a server-verified JWT (or Netlify
// Identity) when auth ships, without changing how components call it.
//
// IMPORTANT: any real implementation must verify roles server-side (in the
// Netlify Function), never trust the client-stored role alone.

const SESSION_KEY = "futureplaces:session";

export const ROLES = {
  CUSTOMER: "customer",
  BUSINESS_OWNER: "business_owner",
  ADMIN: "admin",
};

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return Boolean(getSession());
}

export function hasRole(role) {
  const session = getSession();
  return session?.role === role;
}
