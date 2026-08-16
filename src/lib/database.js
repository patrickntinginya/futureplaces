// Thin client over the Netlify Functions API (see netlify/functions/*.mts).
// Falls back to bundled mock data if the API is unreachable so the UI is
// still testable before the database seed has applied.
import { mockPlaces } from "../data/mockPlaces.js";
import { categories as mockCategories } from "../data/categories.js";

async function safeFetch(url, options) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function fetchCategories() {
  const data = await safeFetch("/api/categories");
  if (data && data.length) return data;
  return mockCategories.filter((c) => c.slug !== "all");
}

export async function fetchBusinesses({ category, q, region } = {}) {
  const params = new URLSearchParams();
  if (category && category !== "all") params.set("category", category);
  if (q) params.set("q", q);
  if (region) params.set("region", region);

  const data = await safeFetch(`/api/businesses?${params.toString()}`);
  if (data) return data;

  // Offline/dev fallback using mock data
  return mockPlaces.filter((p) => {
    const matchesCategory = !category || category === "all" || p.categorySlug === category;
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.description.toLowerCase().includes(q.toLowerCase()) ||
      p.address?.toLowerCase().includes(q.toLowerCase());
    const matchesRegion = !region || p.region === region;
    return matchesCategory && matchesQuery && matchesRegion;
  });
}

export async function fetchBusinessBySlug(slug) {
  const data = await safeFetch(`/api/businesses/${slug}`);
  if (data && !data.error) return data;
  const mock = mockPlaces.find((p) => p.slug === slug);
  return mock ? { ...mock, images: [], hours: [], services: [], reviews: [] } : null;
}

export async function createBusiness(payload) {
  const res = await fetch("/api/businesses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Imeshindikana kusajili biashara.");
  return data;
}
