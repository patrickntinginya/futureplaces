import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  doublePrecision,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Users — shared foundation for Future Places, and later Future Kilimo /
// Future Education / Future Marketplace. Role is a simple string today
// (customer | business_owner | admin) — enough for RBAC without overbuilding.
// ---------------------------------------------------------------------------
export const users = pgTable("users", {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  name: text().notNull(),
  passwordHash: text("password_hash"),
  role: text().notNull().default("customer"), // customer | business_owner | admin
  phone: text(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// Categories — reusable across the wider ecosystem (Kilimo can add its own
// category rows later without a schema change).
// ---------------------------------------------------------------------------
export const categories = pgTable("categories", {
  id: serial().primaryKey(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  nameSw: text("name_sw"), // Swahili label
  icon: text().notNull().default("map-pin"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// Businesses — the core listing entity.
// ---------------------------------------------------------------------------
export const businesses = pgTable("businesses", {
  id: serial().primaryKey(),
  ownerId: integer("owner_id").references(() => users.id),
  name: text().notNull(),
  slug: text().notNull().unique(),
  categoryId: integer("category_id").references(() => categories.id),
  description: text().notNull().default(""),
  phone: text(),
  whatsapp: text(),
  email: text(),
  address: text(),
  region: text(),
  district: text(),
  ward: text(),
  latitude: doublePrecision(),
  longitude: doublePrecision(),
  coverImage: text("cover_image"),
  status: text().notNull().default("pending"), // pending | verified | rejected | suspended
  rating: doublePrecision().default(0),
  reviewCount: integer("review_count").default(0),
  isMock: boolean("is_mock").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const businessImages = pgTable("business_images", {
  id: serial().primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  url: text().notNull(),
  position: integer().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const businessHours = pgTable("business_hours", {
  id: serial().primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  dayOfWeek: integer("day_of_week").notNull(), // 0=Sunday ... 6=Saturday
  opensAt: text("opens_at"), // "08:00"
  closesAt: text("closes_at"), // "20:00"
  isClosed: boolean("is_closed").notNull().default(false),
});

export const businessServices = pgTable("business_services", {
  id: serial().primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  name: text().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial().primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  userId: integer("user_id").references(() => users.id),
  authorName: text("author_name").notNull(),
  rating: integer().notNull(),
  comment: text(),
  status: text().notNull().default("visible"), // visible | flagged | removed
  createdAt: timestamp("created_at").defaultNow(),
});

export const favorites = pgTable("favorites", {
  id: serial().primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// Locations — general-purpose place lookups (regions/districts/wards),
// kept separate from businesses so Future Kilimo can reuse the same table
// for farm locations.
// ---------------------------------------------------------------------------
export const locations = pgTable("locations", {
  id: serial().primaryKey(),
  region: text().notNull(),
  district: text(),
  ward: text(),
});

export const verificationRequests = pgTable("verification_requests", {
  id: serial().primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  submittedBy: integer("submitted_by").references(() => users.id),
  notes: text(),
  status: text().notNull().default("pending"), // pending | approved | rejected
  reviewedBy: integer("reviewed_by").references(() => users.id),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});
