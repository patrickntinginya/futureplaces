// Minimal inline-SVG icon set — keeps the bundle free of an icon-library
// dependency while covering every icon key used across categories/components.
const PATHS = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  utensils: "M6 2v8M9 2v8M6 6a3 3 0 01-3-3M6 10v12M15 2c-2 0-3 2-3 5s1 5 3 5v10",
  "shopping-bag": "M6 8h12l1 12H5L6 8zM9 8V6a3 3 0 016 0v2",
  bed: "M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 18h18M3 18v3M21 18v3M7 10V7a1 1 0 011-1h3a1 1 0 011 1v3",
  cross: "M10 3h4v6h6v4h-6v8h-4v-8H4V9h6V3z",
  sprout: "M12 22V12M12 12C7 12 4 9 4 5c4 0 7 3 8 7M12 12c5 0 8-3 8-7-4 0-7 3-8 7",
  "graduation-cap": "M2 9l10-5 10 5-10 5-10-5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6",
  wrench: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2-2z",
  fuel: "M4 21V6a1 1 0 011-1h6a1 1 0 011 1v15M4 21h8M4 10h8M15 8l3 3v6.5a1.5 1.5 0 003 0V10l-3-3",
  music: "M9 18V4l11-2v14M9 18a3 3 0 11-6 0 3 3 0 016 0zM20 16a3 3 0 11-6 0 3 3 0 016 0z",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3",
  "map-pin": "M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21zM12 11a2 2 0 100-4 2 2 0 000 4z",
  heart: "M12 21s-7.5-5-9.6-9.4C.7 8.2 2 5 5.2 5c1.9 0 3.3 1 4.8 3 1.5-2 2.9-3 4.8-3 3.2 0 4.5 3.2 2.8 6.6C19.5 16 12 21 12 21z",
  "heart-fill": "M12 21s-7.5-5-9.6-9.4C.7 8.2 2 5 5.2 5c1.9 0 3.3 1 4.8 3 1.5-2 2.9-3 4.8-3 3.2 0 4.5 3.2 2.8 6.6C19.5 16 12 21 12 21z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  whatsapp: "M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zM8.5 7.5c.3-.7.6-.7.9-.7h.7c.2 0 .5 0 .7.6l.9 2.1c.1.3 0 .5-.1.7l-.6.7c-.2.2-.2.4 0 .7.6 1 1.7 2 2.8 2.5.3.1.5.1.7-.1l.6-.8c.2-.3.4-.3.7-.2l2 .9c.3.1.5.4.5.7v.7c0 .5-.6 1-1.1 1.1-1 .2-2.3.1-4.3-.9-2.5-1.2-4.1-3.6-4.3-3.9-.2-.3-1.4-1.9-1.4-3.6 0-1.7.9-2.5 1.2-2.9z",
  navigation: "M3 11l18-8-8 18-2-8-8-2z",
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  compass: "M12 22a10 10 0 100-20 10 10 0 000 20zM16 8l-3 5-5 3 3-5 5-3z",
  plus: "M12 5v14M5 12h14",
  bookmark: "M6 4h12v17l-6-4-6 4V4z",
  "bookmark-fill": "M6 4h12v17l-6-4-6 4V4z",
  briefcase: "M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M4 8h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1V8z",
  clock: "M12 7v5l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  "check-circle": "M22 11.1V12a10 10 0 11-5.9-9.2M22 4L12 14.01l-3-3",
  "chevron-left": "M15 18l-6-6 6-6",
  "chevron-right": "M9 18l6-6-6-6",
  x: "M18 6L6 18M6 6l12 12",
  camera: "M4 8h3l2-3h6l2 3h3v11H4V8zM12 18a3.5 3.5 0 100-7 3.5 3.5 0 000 7z",
  "alert-triangle": "M10.3 3.9L1.8 18a1 1 0 00.9 1.5h18.6a1 1 0 00.9-1.5L13.7 3.9a1 1 0 00-1.7 0zM12 9v4M12 17h.01",
  flag: "M4 4v17M4 4h13l-2 4 2 4H4",
};

export default function Icon({ name, size = 20, color = "currentColor", fill = false, strokeWidth = 2 }) {
  const path = PATHS[name] || PATHS["map-pin"];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? color : "none"}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
