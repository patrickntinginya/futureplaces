import Icon from "./Icon.jsx";
import { categories } from "../data/categories.js";
import "./CategorySlider.css";

export default function CategorySlider({ active, onSelect }) {
  return (
    <div className="scroll-x category-slider">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          className={`category-pill ${active === cat.slug ? "is-active" : ""}`}
          onClick={() => onSelect(cat.slug)}
        >
          <Icon name={cat.icon} size={16} />
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
