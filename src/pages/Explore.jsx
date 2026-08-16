import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import CategorySlider from "../components/CategorySlider.jsx";
import MapView from "../components/MapView.jsx";
import PlaceCard from "../components/PlaceCard.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { fetchBusinesses } from "../lib/database.js";
import { getCurrentPosition } from "../services/locationService.js";
import "./Explore.css";

export default function Explore() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [places, setPlaces] = useState([]);
  const [status, setStatus] = useState("loading");
  const [view, setView] = useState("map");
  const [userLocation, setUserLocation] = useState(null);
  const [activeSlug, setActiveSlug] = useState(null);

  useEffect(() => {
    getCurrentPosition().then(setUserLocation).catch(() => {});
  }, []);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    fetchBusinesses({ category, q: query })
      .then((data) => {
        if (!active) return;
        setPlaces(data);
        setStatus("ready");
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [category, query]);

  return (
    <div className="page explore">
      <div className="container explore__header">
        <h1 className="explore__title">Explore</h1>
        <div className="explore__toggle">
          <button className={view === "map" ? "is-active" : ""} onClick={() => setView("map")}>
            Ramani
          </button>
          <button className={view === "list" ? "is-active" : ""} onClick={() => setView("list")}>
            Orodha
          </button>
        </div>
      </div>

      <div className="container">
        <SearchBar value={query} onChange={setQuery} placeholder="Tafuta kwenye ramani..." />
      </div>

      <CategorySlider active={category} onSelect={setCategory} />

      {status === "loading" && <LoadingState message="Tunatafuta maeneo karibu nawe…" count={2} />}

      {status === "error" && (
        <EmptyState variant="error" icon="alert-triangle" title="Imeshindikana kupakia ramani" message="Jaribu tena baadaye." />
      )}

      {status === "ready" && places.length === 0 && (
        <EmptyState icon="search" title="Hakuna biashara iliyopatikana" message="Jaribu kubadilisha kigezo cha utafutaji." />
      )}

      {status === "ready" && places.length > 0 && view === "map" && (
        <MapView places={places} userLocation={userLocation} activeSlug={activeSlug} onSelect={(p) => setActiveSlug(p.slug)} />
      )}

      {status === "ready" && places.length > 0 && view === "list" && (
        <div className="container explore__list">
          {places.map((p) => (
            <PlaceCard key={p.slug} place={p} userLocation={userLocation} />
          ))}
        </div>
      )}
    </div>
  );
}
