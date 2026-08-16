import Icon from "./Icon.jsx";
import "./SearchBar.css";

export default function SearchBar({ value, onChange, onSubmit, placeholder }) {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
    >
      <Icon name="search" size={19} color="var(--text-faint)" />
      <input
        type="search"
        inputMode="search"
        className="search-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Tafuta mgahawa, duka, hoteli..."}
        aria-label="Tafuta biashara"
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange("")}
          aria-label="Futa"
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </form>
  );
}
