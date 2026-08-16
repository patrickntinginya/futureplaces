import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { formatDistance } from "../services/locationService.js";
import { getGoogleMapsDirectionsUrl } from "../services/mapService.js";
import { isFavorite, toggleFavorite } from "../lib/favorites.js";
import { useState } from "react";
import "./PlaceCard.css";

export default function PlaceCard({ place, distanceKm, userLocation }) {
  const [saved, setSaved] = useState(() => isFavorite(place.slug));
  const isVerified = place.status === "verified";

  function handleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleFavorite(place.slug));
  }

  function handleWhatsapp(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!place.whatsapp) return;
    const phone = place.whatsapp.replace(/[^\d+]/g, "");
    window.open(`https://wa.me/${phone.replace("+", "")}`, "_blank");
  }

  function handleCall(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!place.phone) return;
    window.location.href = `tel:${place.phone}`;
  }

  function handleDirections(e) {
    e.preventDefault();
    e.stopPropagation();
    if (place.latitude == null || place.longitude == null) return;
    window.open(getGoogleMapsDirectionsUrl(place, userLocation), "_blank");
  }

  return (
    <Link to={`/places/${place.slug}`} className="place-card card">
      <div className="place-card__image-wrap">
        <img src={place.coverImage} alt={place.name} loading="lazy" className="place-card__image" />
        <button
          type="button"
          className={`place-card__save ${saved ? "is-saved" : ""}`}
          onClick={handleSave}
          aria-label="Hifadhi biashara"
        >
          <Icon name={saved ? "heart-fill" : "heart"} size={17} fill={saved} color={saved ? "#e0392b" : "#fff"} />
        </button>
        {isVerified && (
          <span className="badge badge-verified place-card__badge">
            <Icon name="check-circle" size={12} color="#fff" /> Verified
          </span>
        )}
      </div>
      <div className="place-card__body">
        <div className="place-card__row">
          <h3 className="place-card__name">{place.name}</h3>
          {distanceKm !== null && distanceKm !== undefined && (
            <span className="place-card__distance">{formatDistance(distanceKm)}</span>
          )}
        </div>
        <p className="place-card__meta">
          {place.categoryName}
          {place.rating > 0 && (
            <>
              {" · "}
              <span className="place-card__rating">★ {place.rating.toFixed(1)}</span>
              <span className="text-faint"> ({place.reviewCount})</span>
            </>
          )}
        </p>
        <p className="place-card__desc">{place.description}</p>
        <p className="place-card__address">
          <Icon name="map-pin" size={13} color="var(--text-faint)" /> {place.address || place.region}
        </p>
        <div className="place-card__actions">
          {place.whatsapp && (
            <button type="button" className="btn btn-sm btn-whatsapp" onClick={handleWhatsapp}>
              <Icon name="whatsapp" size={14} /> WhatsApp
            </button>
          )}
          {place.phone && (
            <button type="button" className="btn btn-sm btn-secondary" onClick={handleCall}>
              <Icon name="phone" size={14} /> Piga simu
            </button>
          )}
          <button type="button" className="btn btn-sm btn-outline" onClick={handleDirections}>
            <Icon name="navigation" size={14} /> Elekeza
          </button>
        </div>
      </div>
    </Link>
  );
}
