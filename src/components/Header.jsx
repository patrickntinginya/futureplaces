import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import "./Header.css";

export default function Header({ locationLabel, onFindLocation, locationStatus }) {
  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="header__brand">
          <span className="header__logo">FP</span>
          <span className="header__name">Future Places</span>
        </Link>
      </div>
      <button
        type="button"
        className="header__location"
        onClick={onFindLocation}
        disabled={locationStatus === "loading"}
      >
        <Icon name="navigation" size={16} color="var(--green-primary)" />
        <span>
          {locationStatus === "loading" && "Tunatafuta eneo lako…"}
          {locationStatus === "error" && "Karibu yangu — bofya kujaribu tena"}
          {locationStatus === "idle" && "Karibu yangu"}
          {locationStatus === "ready" && (locationLabel || "Eneo limepatikana")}
        </span>
      </button>
    </header>
  );
}
