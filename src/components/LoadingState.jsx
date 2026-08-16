import "./LoadingState.css";

export default function LoadingState({ message = "Inapakia…", count = 3 }) {
  return (
    <div className="loading-state">
      <p className="loading-state__message text-muted">{message}</p>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="loading-state__card card">
          <div className="skeleton loading-state__image" />
          <div className="loading-state__body">
            <div className="skeleton loading-state__line" style={{ width: "60%" }} />
            <div className="skeleton loading-state__line" style={{ width: "40%" }} />
            <div className="skeleton loading-state__line" style={{ width: "90%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
