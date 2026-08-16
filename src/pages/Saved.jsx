import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { getFavoriteSlugs, favoritesAuthNote } from "../lib/favorites.js";
import { fetchBusinessBySlug } from "../lib/database.js";

export default function Saved() {
  const [places, setPlaces] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    const slugs = getFavoriteSlugs();
    if (slugs.length === 0) {
      setStatus("ready");
      return;
    }
    Promise.all(slugs.map((slug) => fetchBusinessBySlug(slug)))
      .then((results) => {
        if (!active) return;
        setPlaces(results.filter(Boolean));
        setStatus("ready");
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: 18 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Saved</h1>
        <p className="text-muted" style={{ fontSize: 13, marginTop: 4 }}>
          {favoritesAuthNote()}
        </p>
      </div>

      {status === "loading" && <LoadingState message="Inapakia vipendwa vyako…" count={2} />}

      {status === "error" && (
        <EmptyState variant="error" icon="alert-triangle" title="Imeshindikana kupakia vipendwa" />
      )}

      {status === "ready" && places.length === 0 && (
        <EmptyState
          icon="heart"
          title="Hakuna vipendwa bado"
          message="Bofya alama ya moyo kwenye biashara unayopenda ili uihifadhi hapa."
        />
      )}

      {status === "ready" && places.length > 0 && (
        <div className="container" style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 14 }}>
          {places.map((p) => (
            <PlaceCard key={p.slug} place={p} />
          ))}
        </div>
      )}
    </div>
  );
}
