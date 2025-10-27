import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { createBooking, getAllBookings, updateBooking, getBookingStats, trackPageView, getAnalyticsStats, getRevenueStats, getAllServices, getActiveServices, createService, updateService, deleteService, getAllTestimonials, getActiveTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, getAllArticles, getPublishedArticles, createArticle, updateArticle, deleteArticle, getPageContent, getAllPageContent, upsertPageContent, getAllBooks, getActiveBooks, createBook, updateBook, deleteBook, getAllSettings, getSetting, getSettingsByCategory, upsertSetting, deleteSetting } from "./db";
import { randomUUID } from "crypto";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  bookings: router({
    create: publicProcedure
      .input(z.object({
        clientName: z.string().min(1),
        clientPhone: z.string().min(1),
        clientEmail: z.string().email().optional(),
        sessionType: z.enum(["individual", "couples"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const price = input.sessionType === "individual" ? 80000 : 120000;
        const booking = await createBooking({
          id: randomUUID(),
          clientName: input.clientName,
          clientPhone: input.clientPhone,
          clientEmail: input.clientEmail,
          sessionType: input.sessionType,
          notes: input.notes,
          status: "pending",
          price,
        });
        
        // Send WhatsApp notification to admin
        try {
          const sessionTypeAr = input.sessionType === "individual" ? "فردية" : "للأزواج";
          const message = `تنبيه: العميل ${input.clientName} (${input.clientPhone}) قام بحجز جلسة ${sessionTypeAr}`;
          // Log the notification (in production, use WhatsApp API)
          console.log("WhatsApp notification:", message);
        } catch (error) {
          console.error("Failed to send WhatsApp notification:", error);
        }
        
        return booking;
      }),

    list: publicProcedure.query(async ({ ctx }) => {
      return await getAllBookings();
    }),

    updateStatus: publicProcedure
      .input(z.object({
        id: z.string(),
        status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
      }))
      .mutation(async ({ input, ctx }) => {
        return await updateBooking(input.id, { status: input.status });
      }),

    stats: publicProcedure.query(async ({ ctx }) => {
      return await getBookingStats();
    }),
  }),

  services: router({
    getAll: publicProcedure.query(async ({ ctx }) => {
      return await getAllServices();
    }),

    getActive: publicProcedure.query(async () => {
      return await getActiveServices();
    }),

    create: publicProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        duration: z.number(),
        price: z.number(),
        features: z.string().optional(),
        type: z.enum(["individual", "couples"]),
        isActive: z.number().default(1),
      }))
      .mutation(async ({ input, ctx }) => {
        return await createService({ id: randomUUID(), ...input });
      }),

    update: publicProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        duration: z.number().optional(),
        price: z.number().optional(),
        features: z.string().optional(),
        type: z.enum(["individual", "couples"]).optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { id, ...updates } = input;
        return await updateService(id, updates);
      }),

    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        await deleteService(input.id);
        return { success: true };
      }),
  }),

  testimonials: router({
    getAll: publicProcedure.query(async ({ ctx }) => {
      return await getAllTestimonials();
    }),

    getActive: publicProcedure.query(async () => {
      return await getActiveTestimonials();
    }),

    create: publicProcedure
      .input(z.object({
        clientName: z.string().min(1),
        clientRole: z.string().optional(),
        content: z.string().min(1),
        rating: z.number().min(1).max(5).default(5),
        isActive: z.number().default(1),
      }))
      .mutation(async ({ input, ctx }) => {
        return await createTestimonial({ id: randomUUID(), ...input });
      }),

    update: publicProcedure
      .input(z.object({
        id: z.string(),
        clientName: z.string().optional(),
        clientRole: z.string().optional(),
        content: z.string().optional(),
        rating: z.number().optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { id, ...updates } = input;
        return await updateTestimonial(id, updates);
      }),

    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      }),
  }),

  articles: router({
    getAll: publicProcedure.query(async ({ ctx }) => {
      return await getAllArticles();
    }),

    getPublished: publicProcedure.query(async () => {
      return await getPublishedArticles();
    }),

    create: publicProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        content: z.string().min(1),
        excerpt: z.string().optional(),
        coverImage: z.string().optional(),
        isPublished: z.number().default(0),
      }))
      .mutation(async ({ input, ctx }) => {
        return await createArticle({ 
          id: randomUUID(), 
          authorId: ctx.user.id,
          publishedAt: input.isPublished === 1 ? new Date() : null,
          ...input 
        });
      }),

    update: publicProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().optional(),
        slug: z.string().optional(),
        content: z.string().optional(),
        excerpt: z.string().optional(),
        coverImage: z.string().optional(),
        isPublished: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { id, ...updates } = input;
        const updatesWithDate: any = { ...updates };
        if (updates.isPublished === 1) {
          updatesWithDate.publishedAt = new Date();
        }
        return await updateArticle(id, updatesWithDate);
      }),

    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        await deleteArticle(input.id);
        return { success: true };
      }),
  }),

  pageContent: router({
    get: publicProcedure
      .input(z.object({
        pageName: z.string(),
        sectionName: z.string(),
      }))
      .query(async ({ input }) => {
        return await getPageContent(input.pageName, input.sectionName);
      }),

    getAll: publicProcedure
      .input(z.object({ pageName: z.string() }))
      .query(async ({ input }) => {
        return await getAllPageContent(input.pageName);
      }),

    upsert: publicProcedure
      .input(z.object({
        pageName: z.string(),
        sectionName: z.string(),
        content: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await upsertPageContent({
          id: randomUUID(),
          pageName: input.pageName,
          sectionName: input.sectionName,
          content: input.content,
          updatedBy: ctx.user.id,
        });
      }),
  }),

  books: router({
    getAll: publicProcedure.query(async ({ ctx }) => {
      return await getAllBooks();
    }),

    getActive: publicProcedure.query(async () => {
      return await getActiveBooks();
    }),

    create: publicProcedure
      .input(z.object({
        title: z.string().min(1),
        subtitle: z.string().optional(),
        description: z.string().min(1),
        price: z.number(),
        coverImage: z.string().optional(),
        badge: z.string().optional(),
        whatsappMessage: z.string().optional(),
        isActive: z.number().default(1),
      }))
      .mutation(async ({ input, ctx }) => {
        return await createBook({ id: randomUUID(), ...input });
      }),

    update: publicProcedure
      .input(z.object({
        id: z.string(),
        title: z.string().optional(),
        subtitle: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        coverImage: z.string().optional(),
        badge: z.string().optional(),
        whatsappMessage: z.string().optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { id, ...updates } = input;
        return await updateBook(id, updates);
      }),

    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        await deleteBook(input.id);
        return { success: true };
      }),
  }),

  settings: router({
    getAll: publicProcedure.query(async ({ ctx }) => {
      return await getAllSettings();
    }),

    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await getSetting(input.key);
      }),

    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await getSettingsByCategory(input.category);
      }),

    upsert: publicProcedure
      .input(z.object({
        settingKey: z.string(),
        settingValue: z.string(),
        settingType: z.string(),
        category: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await upsertSetting({
          id: randomUUID(),
          settingKey: input.settingKey,
          settingValue: input.settingValue,
          settingType: input.settingType,
          category: input.category,
          updatedBy: ctx.user.id,
        });
      }),

    delete: publicProcedure
      .input(z.object({ key: z.string() }))
      .mutation(async ({ input, ctx }) => {
        await deleteSetting(input.key);
        return { success: true };
      }),
  }),

  analytics: router({
    track: publicProcedure
      .input(z.object({
        page: z.string(),
        userAgent: z.string().optional(),
        referrer: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await trackPageView(input.page, input.userAgent, input.referrer);
        return { success: true };
      }),

    stats: publicProcedure.query(async ({ ctx }) => {
      return await getAnalyticsStats();
    }),

    revenue: publicProcedure.query(async ({ ctx }) => {
      return await getRevenueStats();
    }),
  }),
});

export type AppRouter = typeof appRouter;

