import { eq, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { InsertUser, users, bookings, InsertBooking, Booking, analytics, InsertAnalytics, services, InsertService, Service, testimonials, InsertTestimonial, Testimonial, articles, InsertArticle, Article, pageContent, InsertPageContent, PageContent, books, InsertBook, Book, siteSettings, InsertSiteSetting, SiteSetting } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const dbPath = process.env.DATABASE_URL.replace('file:', '');
      const sqlite = new Database(dbPath);
      _db = drizzle(sqlite);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const existing = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
    
    if (existing.length > 0) {
      // Update existing user
      await db.update(users).set({
        name: user.name,
        email: user.email,
        loginMethod: user.loginMethod,
        lastSignedIn: new Date(),
      }).where(eq(users.id, user.id));
    } else {
      // Insert new user
      await db.insert(users).values({
        id: user.id,
        name: user.name,
        email: user.email,
        loginMethod: user.loginMethod,
        role: user.id === ENV.ownerId ? 'admin' : 'user',
        createdAt: new Date(),
        lastSignedIn: new Date(),
      });
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Bookings functions
export async function createBooking(booking: InsertBooking): Promise<Booking> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(bookings).values({
    ...booking,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  const created = await db.select().from(bookings).where(eq(bookings.id, booking.id)).limit(1);
  return created[0];
}

export async function getBooking(id: string): Promise<Booking | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllBookings(): Promise<Booking[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
}

export async function updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  await db.update(bookings).set({ ...updates, updatedAt: new Date() }).where(eq(bookings.id, id));
  return await getBooking(id);
}

export async function getBookingStats() {
  const db = await getDb();
  if (!db) {
    return { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
  }

  const allBookings = await db.select().from(bookings);
  
  return {
    total: allBookings.length,
    pending: allBookings.filter(b => b.status === 'pending').length,
    confirmed: allBookings.filter(b => b.status === 'confirmed').length,
    completed: allBookings.filter(b => b.status === 'completed').length,
    cancelled: allBookings.filter(b => b.status === 'cancelled').length,
  };
}

// Analytics functions
export async function trackPageView(page: string, userAgent?: string, referrer?: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    const id = Math.random().toString(36).substring(2, 15);
    await db.insert(analytics).values({
      id,
      page,
      userAgent,
      referrer,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("[Analytics] Failed to track page view:", error);
  }
}

export async function getAnalyticsStats() {
  const db = await getDb();
  if (!db) {
    return {
      totalVisitors: 0,
      uniquePages: 0,
      pageViews: {},
      topPages: [],
    };
  }

  try {
    const allAnalytics = await db.select().from(analytics);
    const uniquePages = new Set(allAnalytics.map(a => a.page)).size;
    const pageViews = allAnalytics.reduce((acc: Record<string, number>, curr) => {
      acc[curr.page] = (acc[curr.page] || 0) + 1;
      return acc;
    }, {});
    const topPages = Object.entries(pageViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }));

    return {
      totalVisitors: allAnalytics.length,
      uniquePages,
      pageViews,
      topPages,
    };
  } catch (error) {
    console.error("[Analytics] Failed to get stats:", error);
    return {
      totalVisitors: 0,
      uniquePages: 0,
      pageViews: {},
      topPages: [],
    };
  }
}

export async function getRevenueStats() {
  const db = await getDb();
  if (!db) {
    return {
      totalRevenue: 0,
      completedSessions: 0,
      averageSessionPrice: 0,
    };
  }

  const completedBookings = await db.select().from(bookings).where(eq(bookings.status, 'completed'));
  const totalRevenue = completedBookings.reduce((sum, b) => sum + b.price, 0);
  const averageSessionPrice = completedBookings.length > 0 ? Math.round(totalRevenue / completedBookings.length) : 0;

  return {
    totalRevenue,
    completedSessions: completedBookings.length,
    averageSessionPrice,
  };
}

// Services functions
export async function getAllServices(): Promise<Service[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(services).orderBy(desc(services.createdAt));
}

export async function getActiveServices(): Promise<Service[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(services).where(eq(services.isActive, 1)).orderBy(desc(services.createdAt));
}

export async function getService(id: string): Promise<Service | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createService(service: InsertService): Promise<Service> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(services).values({
    ...service,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  const created = await db.select().from(services).where(eq(services.id, service.id)).limit(1);
  return created[0];
}

export async function updateService(id: string, updates: Partial<InsertService>): Promise<Service | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  await db.update(services).set({ ...updates, updatedAt: new Date() }).where(eq(services.id, id));
  return await getService(id);
}

export async function deleteService(id: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(services).where(eq(services.id, id));
}

// Testimonials functions
export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).where(eq(testimonials.isActive, 1)).orderBy(desc(testimonials.createdAt));
}

export async function getTestimonial(id: string): Promise<Testimonial | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(testimonials).values({
    ...testimonial,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  const created = await db.select().from(testimonials).where(eq(testimonials.id, testimonial.id)).limit(1);
  return created[0];
}

export async function updateTestimonial(id: string, updates: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  await db.update(testimonials).set({ ...updates, updatedAt: new Date() }).where(eq(testimonials.id, id));
  return await getTestimonial(id);
}

export async function deleteTestimonial(id: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// Articles functions
export async function getAllArticles(): Promise<Article[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(articles).orderBy(desc(articles.createdAt));
}

export async function getPublishedArticles(): Promise<Article[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(articles).where(eq(articles.isPublished, 1)).orderBy(desc(articles.publishedAt));
}

export async function getArticle(id: string): Promise<Article | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createArticle(article: InsertArticle): Promise<Article> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(articles).values({
    ...article,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  const created = await db.select().from(articles).where(eq(articles.id, article.id)).limit(1);
  return created[0];
}

export async function updateArticle(id: string, updates: Partial<InsertArticle>): Promise<Article | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  await db.update(articles).set({ ...updates, updatedAt: new Date() }).where(eq(articles.id, id));
  return await getArticle(id);
}

export async function deleteArticle(id: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(articles).where(eq(articles.id, id));
}

// Page content functions
export async function getPageContent(pageName: string, sectionName: string): Promise<PageContent | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(pageContent)
    .where(sql`${pageContent.pageName} = ${pageName} AND ${pageContent.sectionName} = ${sectionName}`)
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllPageContent(pageName: string): Promise<PageContent[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(pageContent).where(eq(pageContent.pageName, pageName));
}

export async function upsertPageContent(content: InsertPageContent): Promise<PageContent> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getPageContent(content.pageName, content.sectionName);
  
  if (existing) {
    await db.update(pageContent).set({
      content: content.content,
      updatedAt: new Date(),
      updatedBy: content.updatedBy,
    }).where(sql`${pageContent.pageName} = ${content.pageName} AND ${pageContent.sectionName} = ${content.sectionName}`);
  } else {
    await db.insert(pageContent).values({
      ...content,
      updatedAt: new Date(),
    });
  }
  
  return (await getPageContent(content.pageName, content.sectionName))!;
}

// Books functions
export async function getAllBooks(): Promise<Book[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(books).orderBy(desc(books.createdAt));
}

export async function getActiveBooks(): Promise<Book[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(books).where(eq(books.isActive, 1)).orderBy(desc(books.createdAt));
}

export async function getBook(id: string): Promise<Book | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(books).where(eq(books.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBook(book: InsertBook): Promise<Book> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(books).values({
    ...book,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  const created = await db.select().from(books).where(eq(books.id, book.id)).limit(1);
  return created[0];
}

export async function updateBook(id: string, updates: Partial<InsertBook>): Promise<Book | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  await db.update(books).set({ ...updates, updatedAt: new Date() }).where(eq(books.id, id));
  return await getBook(id);
}

export async function deleteBook(id: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(books).where(eq(books.id, id));
}

// Site settings functions
export async function getAllSettings(): Promise<SiteSetting[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(siteSettings);
}

export async function getSetting(key: string): Promise<SiteSetting | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getSettingsByCategory(category: string): Promise<SiteSetting[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(siteSettings).where(eq(siteSettings.category, category));
}

export async function upsertSetting(setting: InsertSiteSetting): Promise<SiteSetting> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getSetting(setting.settingKey);
  
  if (existing) {
    await db.update(siteSettings).set({
      settingValue: setting.settingValue,
      settingType: setting.settingType,
      category: setting.category,
      updatedAt: new Date(),
      updatedBy: setting.updatedBy,
    }).where(eq(siteSettings.settingKey, setting.settingKey));
  } else {
    await db.insert(siteSettings).values({
      ...setting,
      updatedAt: new Date(),
    });
  }
  
  return (await getSetting(setting.settingKey))!;
}

export async function deleteSetting(key: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(siteSettings).where(eq(siteSettings.settingKey, key));
}

