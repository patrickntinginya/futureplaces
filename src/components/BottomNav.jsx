import { NavLink } from "react-router-dom";
import Icon from "./Icon.jsx";
import "./BottomNav.css";

const links = [
  { to: "/", label: "Home", icon: "home", end: true },
  { to: "/explore", label: "Explore", icon: "compass" },
  { to: "/add-business", label: "Add", icon: "plus", isAdd: true },
  { to: "/saved", label: "Saved", icon: "bookmark" },
  { to: "/business", label: "Business", icon: "briefcase" },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "is-active" : ""} ${link.isAdd ? "bottom-nav__add" : ""}`
          }
        >
          <span className="bottom-nav__icon">
            <Icon name={link.icon} size={link.isAdd ? 24 : 21} strokeWidth={link.isAdd ? 2.5 : 2} />
          </span>
          <span className="bottom-nav__label">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
