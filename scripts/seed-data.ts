import { drizzle } from "drizzle-orm/mysql2";
import { services, testimonials } from "../drizzle/schema";
import { randomUUID } from "crypto";

async function seedData() {
  const db = drizzle(process.env.DATABASE_URL!);

  console.log("Starting data seeding...");

  // Seed Services
  const servicesData = [
    {
      id: randomUUID(),
      title: "جلسات فردية",
      description: "جلسات استشارية فردية لتطوير مهارات التواصل وفهم الذات بشكل أعمق",
      duration: 60,
      price: 80000,
      features: `فهم جذور الخلافات واكتشاف الأسباب الحقيقية
التعامل مع التعلق وسوء الفهم بطريقة صحية
التعبير عن المشاعر بوضوح ودون خوف
فهم الآخرين دون صراع وبناء علاقات أفضل`,
      type: "individual" as const,
      isActive: 1,
    },
    {
      id: randomUUID(),
      title: "جلسات للأزواج",
      description: "جلسات استشارية للأزواج لتحسين التواصل وبناء علاقة أقوى",
      duration: 60,
      price: 120000,
      features: `تطوير الحوار والتفاهم بين الطرفين
إعادة الروح للعلاقة واستعادة الحب والقرب
تطوير التواصل الفعال بين الزوجين
التعامل مع الخلافات باحترام وبطريقة صحية`,
      type: "couples" as const,
      isActive: 1,
    },
  ];

  for (const service of servicesData) {
    await db.insert(services).values(service);
    console.log(`✓ Added service: ${service.title}`);
  }

  // Seed Testimonials
  const testimonialsData = [
    {
      id: randomUUID(),
      clientName: "أحمد محمد",
      clientRole: "عميل - جلسات فردية",
      content: "الجلسات المستمرة مع محمد فتحت عيوني على نقاط ما منتبهه الها، تعلمت أعبر عن مشاعري بدون خوف وصار البيت أهدأ",
      rating: 5,
      isActive: 1,
    },
    {
      id: randomUUID(),
      clientName: "علي وسارة",
      clientRole: "عميل - جلسات للأزواج",
      content: "بعد ثلاث جلسات حسيت بتغيير حقيقي في طريقة كلامي مع زوجتي، قلت المشاحنات وصارت المحادثات أهدأ ومثمرة أكثر",
      rating: 5,
      isActive: 1,
    },
    {
      id: randomUUID(),
      clientName: "فاطمة حسن",
      clientRole: "عميل - جلسات فردية",
      content: "أسلوب محمد عملي وبسيط، أنطاني أدوات استخدمها يومياً للتعامل مع الزملاء بالعمل ومن يومها قلت التوتر",
      rating: 5,
      isActive: 1,
    },
    {
      id: randomUUID(),
      clientName: "خالد ونور",
      clientRole: "عميل - جلسات للأزواج",
      content: "كنت أعتقد المشكلة كلها من الطرف الثاني، لكن محمد علمني أشوف دوري وأعبر عنه بوضوح والعلاقة صارت أفضل",
      rating: 5,
      isActive: 1,
    },
  ];

  for (const testimonial of testimonialsData) {
    await db.insert(testimonials).values(testimonial);
    console.log(`✓ Added testimonial from: ${testimonial.clientName}`);
  }

  console.log("\n✅ Data seeding completed successfully!");
}

seedData().catch((error) => {
  console.error("❌ Error seeding data:", error);
  process.exit(1);
});

