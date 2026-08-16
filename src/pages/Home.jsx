import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategorySlider from "../components/CategorySlider.jsx";
import PlaceCard from "../components/PlaceCard.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { fetchBusinesses } from "../lib/database.js";
import { getCurrentPosition, distanceKm } from "../services/locationService.js";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | loading | ready | error

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

  async function handleFindLocation() {
    setLocationStatus("loading");
    try {
      const pos = await getCurrentPosition();
      setUserLocation(pos);
      setLocationStatus("ready");
    } catch {
      setLocationStatus("error");
    }
  }

  const withDistance = useMemo(() => {
    return places
      .map((p) => ({
        ...p,
        _distance: userLocation ? distanceKm(userLocation.latitude, userLocation.longitude, p.latitude, p.longitude) : null,
      }))
      .sort((a, b) => {
        if (a._distance == null || b._distance == null) return 0;
        return a._distance - b._distance;
      });
  }, [places, userLocation]);

  const nearby = userLocation ? withDistance.slice(0, 4) : [];
  const popular = [...places].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6);

  return (
    <div className="page home">
      <Header
        locationLabel={userLocation ? `${userLocation.latitude.toFixed(3)}, ${userLocation.longitude.toFixed(3)}` : ""}
        locationStatus={locationStatus}
        onFindLocation={handleFindLocation}
      />

      <div className="container">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={() => navigate(`/explore?q=${encodeURIComponent(query)}`)}
        />
      </div>

      <div className="home__categories">
        <CategorySlider active={category} onSelect={setCategory} />
      </div>

      {locationStatus === "ready" && nearby.length > 0 && (
        <section className="home__section">
          <div className="container home__section-head">
            <h2 className="section-title">Karibu nawe</h2>
          </div>
          <div className="scroll-x home__horizontal">
            {nearby.map((p) => (
              <div key={p.slug} className="home__horizontal-item">
                <PlaceCard place={p} distanceKm={p._distance} userLocation={userLocation} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="home__section">
        <div className="container home__section-head">
          <h2 className="section-title">{category === "all" ? "Maarufu" : "Matokeo"}</h2>
        </div>

        {status === "loading" && <LoadingState message="Tunatafuta maeneo karibu nawe…" />}

        {status === "error" && (
          <EmptyState
            variant="error"
            icon="alert-triangle"
            title="Imeshindikana kupakia biashara"
            message="Kuna tatizo la muunganisho. Tafadhali jaribu tena."
            actionLabel="Jaribu tena"
            onAction={() => setCategory((c) => c)}
          />
        )}

        {status === "ready" && places.length === 0 && (
          <EmptyState
            icon="search"
            title="Hakuna biashara iliyopatikana"
            message="Jaribu neno lingine la utafutaji au chagua aina nyingine ya biashara."
          />
        )}

        {status === "ready" && places.length > 0 && (
          <div className="container home__grid">
            {(category === "all" ? popular : places).map((p) => (
              <PlaceCard key={p.slug} place={p} distanceKm={p._distance} userLocation={userLocation} />
            ))}
          </div>
        )}
      </section>

      <div className="container">
        <Link to="/add-business" className="home__cta card">
          <div>
            <h3>Una biashara?</h3>
            <p className="text-muted">Sajili biashara yako ili wateja wapya wakuone.</p>
          </div>
          <span className="btn btn-primary btn-sm">Ongeza biashara</span>
        </Link>
      </div>
    </div>
  );
}
