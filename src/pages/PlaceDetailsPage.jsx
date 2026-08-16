import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceDetails from "../components/PlaceDetails.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { fetchBusinessBySlug } from "../lib/database.js";

export default function PlaceDetailsPage() {
  const { slug } = useParams();
  const [place, setPlace] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    fetchBusinessBySlug(slug)
      .then((data) => {
        if (!active) return;
        if (!data) {
          setStatus("empty");
        } else {
          setPlace(data);
          setStatus("ready");
          document.title = `${data.name} · Future Places`;
        }
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <div className="page place-details-page">
      {status === "loading" && <LoadingState message="Inapakia maelezo ya biashara…" count={1} />}
      {status === "error" && (
        <EmptyState variant="error" icon="alert-triangle" title="Imeshindikana kupakia biashara" message="Jaribu tena baadaye." />
      )}
      {status === "empty" && (
        <EmptyState icon="search" title="Biashara haipatikani" message="Huenda tangazo hili limeondolewa." />
      )}
      {status === "ready" && place && <PlaceDetails place={place} />}
    </div>
  );
}
