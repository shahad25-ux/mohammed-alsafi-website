# ✏️ كيف تعدل على الموقع بعد النشر

## 📋 نظرة عامة

بعد ما تنشر الموقع، في طريقتين للتعديل:
1. **تعديل المحتوى** - من لوحة التحكم (سهل جداً)
2. **تعديل التصميم والكود** - من الملفات (يحتاج خبرة بسيطة)

---

## 🎨 الطريقة 1: تعديل المحتوى (من لوحة التحكم)

### ما يمكنك تعديله بدون كود:
✅ الخدمات (إضافة/تعديل/حذف)  
✅ آراء العملاء  
✅ المقالات  
✅ محتوى الصفحات (النصوص)  
✅ الأسعار  
✅ المميزات  

### الخطوات:
1. افتح لوحة التحكم: `https://موقعك.com/dashboard`
2. اختر التبويب المناسب
3. عدّل المحتوى
4. احفظ
5. **التحديث فوري!** ✨

---

## 💻 الطريقة 2: تعديل التصميم والكود

### ما يمكنك تعديله:
✅ الألوان  
✅ الخطوط  
✅ التخطيط (Layout)  
✅ إضافة صفحات جديدة  
✅ إضافة حقول جديدة  
✅ تغيير الصور  

---

## 🔄 خطوات التعديل الكامل:

### الخطوة 1: تحميل المشروع على جهازك

```bash
# إذا عندك Git مثبت:
git clone https://github.com/USERNAME/mohammed-alsafi-website.git
cd mohammed-alsafi-website

# أو فك ضغط الملف المرفق
tar -xzf mohammed-alsafi-website-final.tar.gz
cd mohammed-alsafi-website
```

---

### الخطوة 2: تثبيت البرامج المطلوبة

#### على Windows:
1. **حمّل Node.js:** https://nodejs.org (النسخة LTS)
2. **ثبّته** واضغط Next حتى ينتهي
3. **افتح CMD** أو PowerShell
4. **شغّل:**
   ```bash
   npm install -g pnpm
   ```

#### على Mac:
```bash
# ثبّت Homebrew أولاً (إذا ما عندك)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# ثبّت Node.js و pnpm
brew install node
npm install -g pnpm
```

---

### الخطوة 3: تشغيل المشروع محلياً

```bash
# في مجلد المشروع
pnpm install

# شغّل السيرفر المحلي
pnpm dev
```

**افتح المتصفح:** http://localhost:3000

الآن الموقع شغال على جهازك! 🎉

---

### الخطوة 4: تعديل الملفات

#### 📁 هيكل المشروع:

```
mohammed-alsafi-website/
├── client/src/
│   ├── pages/          ← الصفحات
│   │   ├── Home.tsx    ← الصفحة الرئيسية
│   │   ├── About.tsx   ← صفحة من أنا
│   │   ├── Services.tsx
│   │   └── Dashboard.tsx
│   ├── components/     ← المكونات
│   │   ├── Header.tsx  ← الهيدر
│   │   └── Footer.tsx  ← الفوتر
│   └── index.css       ← الألوان والتنسيق
├── server/
│   ├── routers.ts      ← API Endpoints
│   └── db.ts           ← قاعدة البيانات
└── drizzle/
    └── schema.ts       ← جداول قاعدة البيانات
```

---

## 🎨 أمثلة على التعديلات الشائعة:

### 1️⃣ تغيير الألوان

**الملف:** `client/src/index.css`

```css
/* الألوان الحالية */
--primary: #84a2a0;    /* الأخضر الزمردي */
--secondary: #6d8a88;  /* الأخضر الداكن */
--accent: #d4af37;     /* الذهبي */

/* غيّرها لألوان جديدة */
--primary: #3b82f6;    /* أزرق */
--secondary: #1e40af;  /* أزرق داكن */
--accent: #f59e0b;     /* برتقالي */
```

---

### 2️⃣ تغيير النصوص في الصفحة الرئيسية

**الملف:** `client/src/pages/Home.tsx`

ابحث عن:
```tsx
<h1>محمد الصافي</h1>
<p>مدرب ومستشار في التواصل الفعال</p>
```

غيّره إلى:
```tsx
<h1>اسمك الجديد</h1>
<p>وصفك الجديد</p>
```

---

### 3️⃣ إضافة صفحة جديدة

**الملف الجديد:** `client/src/pages/Contact.tsx`

```tsx
export default function Contact() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">تواصل معنا</h1>
      <p>معلومات التواصل هنا...</p>
    </div>
  );
}
```

**أضفها للتطبيق:** `client/src/App.tsx`

```tsx
import Contact from "./pages/Contact";

// في قسم الـ Routes:
<Route path="/contact" component={Contact} />
```

**أضفها للهيدر:** `client/src/components/Header.tsx`

```tsx
<Link href="/contact">تواصل معنا</Link>
```

---

### 4️⃣ إضافة حقل جديد لجدول الخدمات

**الخطوة 1:** عدّل الـ Schema

**الملف:** `drizzle/schema.ts`

```typescript
export const services = mysqlTable("services", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  // ... الحقول الموجودة
  
  // أضف حقل جديد
  discount: int("discount").default(0), // خصم بالنسبة المئوية
});
```

**الخطوة 2:** شغّل Migration

```bash
pnpm drizzle-kit push:mysql
```

**الخطوة 3:** عدّل واجهة إدارة الخدمات

**الملف:** `client/src/pages/Dashboard.tsx`

ابحث عن form الخدمات وأضف:

```tsx
<input
  type="number"
  placeholder="الخصم %"
  value={newService.discount}
  onChange={(e) => setNewService({
    ...newService,
    discount: parseInt(e.target.value)
  })}
/>
```

---

### 5️⃣ تغيير الصورة الشخصية

**الخطوة 1:** ضع الصورة الجديدة في:
```
client/public/profile.png
```

**أو** غيّر المسار في `client/src/pages/Home.tsx`:

```tsx
<img src="/صورتك-الجديدة.jpg" alt="محمد الصافي" />
```

---

## 🚀 نشر التعديلات

بعد ما تخلص التعديلات:

### إذا استخدمت Git + Vercel:

```bash
# احفظ التعديلات
git add .
git commit -m "تعديلات على التصميم"
git push

# Vercel راح ينشر التعديلات تلقائياً! ✨
```

**انتظر 2-3 دقائق** وافتح موقعك - التعديلات راح تظهر!

---

### إذا ما استخدمت Git:

1. **افتح Vercel Dashboard**
2. **اذهب للمشروع**
3. **اضغط "Redeploy"**
4. **أو** ارفع الملفات يدوياً

---

## 🛠️ أدوات مساعدة للتعديل:

### 1️⃣ **VS Code** (محرر الكود)
- **حمّله:** https://code.visualstudio.com
- **الأفضل** لتعديل الكود
- **مجاني** وسهل الاستخدام

### 2️⃣ **GitHub Desktop** (إدارة Git)
- **حمّله:** https://desktop.github.com
- **سهل** لرفع التعديلات
- **بديل** للأوامر في Terminal

### 3️⃣ **Figma** (التصميم)
- **الموقع:** https://figma.com
- **لتصميم** الألوان والتخطيط
- **مجاني** للاستخدام الشخصي

---

## 📚 تعلم التعديلات المتقدمة:

### إذا تبي تتعلم أكثر:

1. **React Basics:**
   - https://react.dev/learn
   - أساسيات React (المكتبة المستخدمة)

2. **Tailwind CSS:**
   - https://tailwindcss.com/docs
   - التنسيق والألوان

3. **TypeScript:**
   - https://www.typescriptlang.org/docs
   - اللغة المستخدمة

---

## ⚠️ نصائح مهمة:

### ✅ افعل:
- **اختبر** التعديلات محلياً قبل النشر
- **احفظ نسخة احتياطية** قبل التعديلات الكبيرة
- **عدّل شي واحد** في كل مرة
- **اقرأ الأخطاء** في Console (F12)

### ❌ لا تفعل:
- **ما تعدل** ملفات `node_modules`
- **ما تحذف** ملفات ما تعرفها
- **ما تنشر** بدون اختبار
- **ما تغير** Database Schema بدون Migration

---

## 🆘 إذا صار خطأ:

### المشكلة: الموقع ما يشتغل بعد التعديل

**الحل:**
```bash
# امسح node_modules وثبّت من جديد
rm -rf node_modules
pnpm install
pnpm dev
```

### المشكلة: التعديلات ما تظهر

**الحل:**
1. امسح الـ Cache في المتصفح (Ctrl+Shift+R)
2. تأكد إنك رفعت التعديلات على Git
3. تأكد إن Vercel نشر النسخة الجديدة

### المشكلة: خطأ في الكود

**الحل:**
1. اقرأ رسالة الخطأ في Terminal
2. ابحث عن الخطأ في Google
3. أو ارجع للنسخة القديمة:
   ```bash
   git checkout .
   ```

---

## 🎓 ملخص سريع:

### للتعديلات البسيطة (محتوى):
👉 استخدم **لوحة التحكم** - سهل وسريع!

### للتعديلات المتوسطة (ألوان، نصوص):
1. حمّل المشروع
2. عدّل الملفات
3. ارفع على Git
4. Vercel ينشر تلقائياً

### للتعديلات المتقدمة (حقول، صفحات):
1. تعلم React و TypeScript
2. عدّل الـ Schema
3. شغّل Migrations
4. اختبر محلياً
5. انشر

---

## 💡 نصيحة أخيرة:

**ابدأ بالتعديلات البسيطة!**

- غيّر الألوان
- غيّر النصوص
- أضف صور جديدة

ولما تتعود، ابدأ بالتعديلات الأكبر.

**كل شي يصير بالتدريج!** 🚀

---

**تم إعداد هذا الدليل بواسطة:** Manus AI  
**التاريخ:** أكتوبر 2025

