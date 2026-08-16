import Icon from "./Icon.jsx";
import "./EmptyState.css";

export default function EmptyState({
  icon = "map-pin",
  title = "Hakuna matokeo",
  message,
  actionLabel,
  onAction,
  variant = "empty",
}) {
  return (
    <div className={`empty-state empty-state--${variant}`}>
      <div className="empty-state__icon">
        <Icon name={icon} size={28} color={variant === "error" ? "var(--danger)" : "var(--green-primary)"} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      {message && <p className="empty-state__message text-muted">{message}</p>}
      {actionLabel && (
        <button type="button" className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
