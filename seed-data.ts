import Database from "better-sqlite3";
import { randomUUID } from "crypto";

const dbPath = "./database.db";
const db = new Database(dbPath);

console.log("🌱 Seeding database...");

// Insert services
const services = [
  {
    id: randomUUID(),
    title: "جلسات فردية",
    description: "جلسات استشارية فردية لتحسين مهارات التواصل والتعبير عن الذات",
    duration: 60,
    price: 80000,
    features: JSON.stringify(["جلسة مدتها ساعة", "استشارة شخصية", "خطة عمل مخصصة"]),
    type: "individual",
    isActive: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: randomUUID(),
    title: "جلسات للأزواج",
    description: "جلسات استشارية للأزواج لتحسين التواصل وحل المشاكل",
    duration: 90,
    price: 120000,
    features: JSON.stringify(["جلسة مدتها ساعة ونصف", "للأزواج", "تحسين التواصل"]),
    type: "couples",
    isActive: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const insertService = db.prepare(`
  INSERT INTO services (id, title, description, duration, price, features, type, isActive, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const service of services) {
  insertService.run(
    service.id,
    service.title,
    service.description,
    service.duration,
    service.price,
    service.features,
    service.type,
    service.isActive,
    service.createdAt,
    service.updatedAt
  );
}

console.log("✅ Services added");

// Insert testimonials
const testimonials = [
  {
    id: randomUUID(),
    clientName: "علي وسارة",
    clientRole: "عميل - جلسات الأزواج",
    content: "بعد ثلاث جلسات حسيت بتغيير حقيقي في طريقة كلامي مع زوجتي. قبل السلسات وصارت المحادثات أهدأ ومتمرة أكثر.",
    rating: 5,
    isActive: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: randomUUID(),
    clientName: "أحمد محمد",
    clientRole: "عميل - جلسات فردية",
    content: "الجلسات المستفيدة مع محمد فتحت عيوني على نقاط ما شفتها أبد. تعلمت أعبر عن مشاعي بدون خوف وصار البيت أهدأ!",
    rating: 5,
    isActive: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: randomUUID(),
    clientName: "خالد ونور",
    clientRole: "عميل - جلسات الأزواج",
    content: "كنت أعتقد المشكلة كلها من الطرف الثاني، لكن محمد علمني أشوف ذنوبي وأعبر عنه بوضوح والعلاقة صارت أفضل.",
    rating: 5,
    isActive: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: randomUUID(),
    clientName: "فاطمة حسن",
    clientRole: "عميل - جلسات فردية",
    content: "ساعدني محمد عمل وتستطيل العائلة. أدوات استخدمها يومياً التعامل مع الإزعاج والعمل ومن يومها قلت التوتر!",
    rating: 5,
    isActive: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const insertTestimonial = db.prepare(`
  INSERT INTO testimonials (id, clientName, clientRole, content, rating, isActive, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const testimonial of testimonials) {
  insertTestimonial.run(
    testimonial.id,
    testimonial.clientName,
    testimonial.clientRole,
    testimonial.content,
    testimonial.rating,
    testimonial.isActive,
    testimonial.createdAt,
    testimonial.updatedAt
  );
}

console.log("✅ Testimonials added");

// Insert book
const book = {
  id: randomUUID(),
  title: "فن التعبير",
  subtitle: "الكتيب الذي يساعدك ان تعبر عن نفسك بدون ان تفهم خطأ",
  description: "الإصدار الذي سيغيّر طريقتك في التعبير عن نفسك!",
  price: 25000,
  coverImage: "/book-cover.webp",
  badge: "حصريًا ✨",
  whatsappMessage: "اريد اطلب الكتيب",
  isActive: 1,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const insertBook = db.prepare(`
  INSERT INTO books (id, title, subtitle, description, price, coverImage, badge, whatsappMessage, isActive, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertBook.run(
  book.id,
  book.title,
  book.subtitle,
  book.description,
  book.price,
  book.coverImage,
  book.badge,
  book.whatsappMessage,
  book.isActive,
  book.createdAt,
  book.updatedAt
);

console.log("✅ Book added");

// Insert site settings
const settings = [
  {
    id: randomUUID(),
    settingKey: "whatsapp_number",
    settingValue: "9647725768730",
    settingType: "text",
    category: "contact",
    updatedAt: Date.now(),
  },
  {
    id: randomUUID(),
    settingKey: "site_title",
    settingValue: "محمد الصافي - استشاري التواصل",
    settingType: "text",
    category: "general",
    updatedAt: Date.now(),
  },
];

const insertSetting = db.prepare(`
  INSERT INTO siteSettings (id, settingKey, settingValue, settingType, category, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (const setting of settings) {
  insertSetting.run(
    setting.id,
    setting.settingKey,
    setting.settingValue,
    setting.settingType,
    setting.category,
    setting.updatedAt
  );
}

console.log("✅ Settings added");

db.close();

console.log("🎉 Database seeded successfully!");

