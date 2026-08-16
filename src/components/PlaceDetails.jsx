import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon.jsx";
import { getGoogleMapsDirectionsUrl, getStaticMapEmbedUrl } from "../services/mapService.js";
import { getOpenStatus } from "../lib/hours.js";
import { isFavorite, toggleFavorite } from "../lib/favorites.js";
import "./PlaceDetails.css";

const DAY_NAMES = ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"];

export default function PlaceDetails({ place, userLocation }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(() => isFavorite(place.slug));
  const [reported, setReported] = useState(false);
  const openStatus = getOpenStatus(place.hours);
  const isVerified = place.status === "verified";
  const gallery = place.images?.length ? place.images.map((i) => i.url) : [place.coverImage];

  return (
    <div className="place-details">
      <div className="place-details__hero">
        <img src={gallery[0]} alt={place.name} className="place-details__cover" />
        <button className="place-details__back" onClick={() => navigate(-1)} aria-label="Rudi nyuma">
          <Icon name="chevron-left" size={20} />
        </button>
        <button
          className={`place-details__save ${saved ? "is-saved" : ""}`}
          onClick={() => setSaved(toggleFavorite(place.slug))}
          aria-label="Hifadhi"
        >
          <Icon name={saved ? "heart-fill" : "heart"} size={18} fill={saved} color={saved ? "#e0392b" : "#fff"} />
        </button>
      </div>

      {gallery.length > 1 && (
        <div className="scroll-x place-details__gallery">
          {gallery.map((url, i) => (
            <img key={i} src={url} alt="" loading="lazy" />
          ))}
        </div>
      )}

      <div className="container place-details__content">
        <div className="place-details__title-row">
          <h1 className="place-details__name">{place.name}</h1>
          {isVerified ? (
            <span className="badge badge-verified">
              <Icon name="check-circle" size={12} color="#fff" /> Verified
            </span>
          ) : (
            <span className="badge badge-pending">Inasubiri Uthibitisho</span>
          )}
        </div>

        <p className="text-muted place-details__category">{place.categoryName}</p>

        <div className="place-details__stats">
          {place.rating > 0 && (
            <span className="place-details__stat">
              <strong>★ {place.rating.toFixed(1)}</strong> ({place.reviewCount} maoni)
            </span>
          )}
          {openStatus && (
            <span className={`place-details__stat ${openStatus.open ? "is-open" : "is-closed"}`}>
              <Icon name="clock" size={13} /> {openStatus.label}
            </span>
          )}
        </div>

        {place.description && <p className="place-details__desc">{place.description}</p>}

        <div className="place-details__actions">
          {place.whatsapp && (
            <a
              className="btn btn-whatsapp btn-block"
              href={`https://wa.me/${place.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="whatsapp" size={16} /> WhatsApp
            </a>
          )}
          {place.phone && (
            <a className="btn btn-secondary btn-block" href={`tel:${place.phone}`}>
              <Icon name="phone" size={16} /> Piga simu
            </a>
          )}
          {place.latitude != null && place.longitude != null && (
            <a
              className="btn btn-outline btn-block"
              href={getGoogleMapsDirectionsUrl(place, userLocation)}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="navigation" size={16} /> Elekeza
            </a>
          )}
        </div>

        {place.address && (
          <section className="place-details__section">
            <h3 className="section-title">Anwani</h3>
            <p className="text-muted">
              {place.address}
              {place.ward ? `, ${place.ward}` : ""}
              {place.district ? `, ${place.district}` : ""}, {place.region}
            </p>
          </section>
        )}

        {place.latitude != null && place.longitude != null && (
          <section className="place-details__section">
            <h3 className="section-title">Ramani</h3>
            <div className="place-details__map">
              <iframe
                title="map"
                src={getStaticMapEmbedUrl(place.latitude, place.longitude)}
                loading="lazy"
              />
            </div>
          </section>
        )}

        {place.hours?.length > 0 && (
          <section className="place-details__section">
            <h3 className="section-title">Muda wa kufungua</h3>
            <ul className="place-details__hours">
              {place.hours
                .slice()
                .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                .map((h) => (
                  <li key={h.id}>
                    <span>{DAY_NAMES[h.dayOfWeek]}</span>
                    <span>{h.isClosed ? "Imefungwa" : `${h.opensAt} – ${h.closesAt}`}</span>
                  </li>
                ))}
            </ul>
          </section>
        )}

        {place.services?.length > 0 && (
          <section className="place-details__section">
            <h3 className="section-title">Huduma</h3>
            <div className="place-details__chips">
              {place.services.map((s) => (
                <span key={s.id || s.name} className="badge">
                  {s.name || s}
                </span>
              ))}
            </div>
          </section>
        )}

        {place.reviews?.length > 0 && (
          <section className="place-details__section">
            <h3 className="section-title">Maoni ({place.reviews.length})</h3>
            <div className="place-details__reviews">
              {place.reviews.map((r) => (
                <div key={r.id} className="place-details__review">
                  <div className="place-details__review-head">
                    <strong>{r.authorName}</strong>
                    <span>★ {r.rating}</span>
                  </div>
                  <p className="text-muted">{r.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="place-details__section place-details__report">
          {reported ? (
            <p className="text-muted">Asante, taarifa yako imepokelewa.</p>
          ) : (
            <button type="button" className="place-details__report-btn" onClick={() => setReported(true)}>
              <Icon name="flag" size={14} /> Ripoti tangazo hili
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
