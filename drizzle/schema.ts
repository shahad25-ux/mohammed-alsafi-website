import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Core user table backing auth flow.
 */
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role").default("user").notNull(), // "user" or "admin"
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  lastSignedIn: integer("lastSignedIn", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Bookings table
export const bookings = sqliteTable("bookings", {
  id: text("id").primaryKey(),
  clientName: text("clientName").notNull(),
  clientPhone: text("clientPhone").notNull(),
  clientEmail: text("clientEmail"),
  sessionType: text("sessionType").notNull(), // "individual" or "couples"
  sessionDate: integer("sessionDate", { mode: "timestamp" }),
  notes: text("notes"),
  status: text("status").default("pending").notNull(), // "pending", "confirmed", "completed", "cancelled"
  price: integer("price").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// Analytics table for visitor tracking
export const analytics = sqliteTable("analytics", {
  id: text("id").primaryKey(),
  page: text("page").notNull(),
  userAgent: text("userAgent"),
  referrer: text("referrer"),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = typeof analytics.$inferInsert;

// Services table
export const services = sqliteTable("services", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(), // in minutes
  price: integer("price").notNull(),
  features: text("features"), // JSON array of features
  type: text("type").notNull(), // "individual" or "couples"
  isActive: integer("isActive").default(1).notNull(), // 1 = active, 0 = inactive
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// Testimonials table
export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  clientName: text("clientName").notNull(),
  clientRole: text("clientRole"), // e.g., "عميل - جلسات للأزواج"
  content: text("content").notNull(),
  rating: integer("rating").default(5).notNull(), // 1-5 stars
  isActive: integer("isActive").default(1).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// Articles/Blog posts table
export const articles = sqliteTable("articles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("coverImage"),
  authorId: text("authorId").notNull(),
  isPublished: integer("isPublished").default(0).notNull(),
  publishedAt: integer("publishedAt", { mode: "timestamp" }),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

// Page content table (for editable pages like Home, About, etc.)
export const pageContent = sqliteTable("pageContent", {
  id: text("id").primaryKey(),
  pageName: text("pageName").notNull(), // e.g., "home", "about", "services"
  sectionName: text("sectionName").notNull(), // e.g., "hero", "about_text"
  content: text("content").notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedBy: text("updatedBy"),
});

export type PageContent = typeof pageContent.$inferSelect;
export type InsertPageContent = typeof pageContent.$inferInsert;

// Book/Product table
export const books = sqliteTable("books", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  coverImage: text("coverImage"),
  badge: text("badge"), // e.g., "حصريًا ✨"
  whatsappMessage: text("whatsappMessage"), // Custom WhatsApp message
  isActive: integer("isActive").default(1).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type Book = typeof books.$inferSelect;
export type InsertBook = typeof books.$inferInsert;

// Site settings table
export const siteSettings = sqliteTable("siteSettings", {
  id: text("id").primaryKey(),
  settingKey: text("settingKey").notNull().unique(),
  settingValue: text("settingValue").notNull(),
  settingType: text("settingType").notNull(), // e.g., "text", "number", "color", "image"
  category: text("category"), // e.g., "general", "contact", "theme"
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedBy: text("updatedBy"),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;

