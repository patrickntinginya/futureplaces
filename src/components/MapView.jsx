import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import "./MapView.css";

// Lightweight, dependency-free map surface: projects lat/long onto a 2D plane
// so the Explore experience works without an API key. The container is
// isolated so a real map SDK (MapLibre/Google Maps/Mapbox) can be dropped in
// later by replacing only this component's internals.
export default function MapView({ places, userLocation, activeSlug, onSelect }) {
  const [selected, setSelected] = useState(null);

  const bounds = useMemo(() => {
    const withCoords = places.filter((p) => p.latitude != null && p.longitude != null);
    if (withCoords.length === 0) return null;
    const lats = withCoords.map((p) => p.latitude);
    const lngs = withCoords.map((p) => p.longitude);
    const pad = 0.05;
    return {
      minLat: Math.min(...lats) - pad,
      maxLat: Math.max(...lats) + pad,
      minLng: Math.min(...lngs) - pad,
      maxLng: Math.max(...lngs) + pad,
    };
  }, [places]);

  function project(lat, lng) {
    if (!bounds) return { left: "50%", top: "50%" };
    const { minLat, maxLat, minLng, maxLng } = bounds;
    const x = ((lng - minLng) / (maxLng - minLng || 1)) * 100;
    const y = 100 - ((lat - minLat) / (maxLat - minLat || 1)) * 100;
    return { left: `${Math.min(96, Math.max(4, x))}%`, top: `${Math.min(94, Math.max(6, y))}%` };
  }

  const withCoords = places.filter((p) => p.latitude != null && p.longitude != null);

  return (
    <div className="map-view">
      <div className="map-view__canvas">
        {withCoords.length === 0 && (
          <p className="map-view__empty text-muted">Hakuna alama za ramani kwa matokeo haya.</p>
        )}
        {userLocation && (
          <div className="map-view__you" style={project(userLocation.latitude, userLocation.longitude)}>
            <span className="map-view__you-dot" />
          </div>
        )}
        {withCoords.map((place) => {
          const pos = project(place.latitude, place.longitude);
          const isActive = place.slug === activeSlug || place.slug === selected?.slug;
          return (
            <button
              key={place.slug}
              type="button"
              className={`map-view__pin ${isActive ? "is-active" : ""}`}
              style={pos}
              onClick={() => {
                setSelected(place);
                onSelect?.(place);
              }}
              aria-label={place.name}
            >
              <Icon name="map-pin" size={isActive ? 26 : 22} fill={isActive} color={isActive ? "#fff" : "var(--green-primary)"} />
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="map-view__sheet card">
          <button className="map-view__sheet-close" onClick={() => setSelected(null)} aria-label="Funga">
            <Icon name="x" size={16} />
          </button>
          <img src={selected.coverImage} alt={selected.name} className="map-view__sheet-img" />
          <div className="map-view__sheet-body">
            <h4>{selected.name}</h4>
            <p className="text-muted" style={{ fontSize: 13 }}>
              {selected.categoryName} · {selected.address || selected.region}
            </p>
            <Link to={`/places/${selected.slug}`} className="btn btn-primary btn-sm btn-block" style={{ marginTop: 10 }}>
              Angalia maelezo
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
