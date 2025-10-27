# موقع محمد الصافي - استشاري التواصل

موقع احترافي لاستشاري التواصل محمد الصافي مع نظام إدارة محتوى شامل (CMS) ونظام حجوزات متكامل.

## 🌟 الميزات الرئيسية

- ✅ موقع احترافي بتصميم عربي جذاب (RTL)
- ✅ نظام حجوزات عبر WhatsApp
- ✅ لوحة تحكم إدارية شاملة
- ✅ نظام إدارة محتوى كامل (CMS)
- ✅ إحصائيات وتحليلات مفصلة
- ✅ نظام مصادقة آمن (OAuth)
- ✅ قاعدة بيانات MySQL
- ✅ تصميم متجاوب لجميع الأجهزة

## 📋 المحتويات

- [دليل البدء السريع](./QUICK_START.md)
- [وثائق نظام إدارة المحتوى](./CMS_DOCUMENTATION.md)
- [دليل النشر](./DEPLOYMENT_GUIDE.md)
- [ملخص التغييرات](./CHANGES_SUMMARY.md)

## 🚀 البدء السريع

### المتطلبات
- Node.js 20+
- MySQL 8+
- pnpm

### التثبيت

```bash
# استنساخ المشروع
git clone <repository-url>
cd mohammed-alsafi-website

# تثبيت الحزم
pnpm install

# إعداد قاعدة البيانات
sudo mysql -e "CREATE DATABASE mohammed_alsafi;"
sudo mysql -e "CREATE USER 'alsafi_user'@'localhost' IDENTIFIED BY 'alsafi_password';"
sudo mysql -e "GRANT ALL PRIVILEGES ON mohammed_alsafi.* TO 'alsafi_user'@'localhost';"

# تشغيل الترحيلات
DATABASE_URL="mysql://alsafi_user:alsafi_password@localhost:3306/mohammed_alsafi" pnpm drizzle-kit push

# إضافة بيانات تجريبية (اختياري)
DATABASE_URL="mysql://alsafi_user:alsafi_password@localhost:3306/mohammed_alsafi" pnpm tsx scripts/seed-data.ts

# تشغيل الخادم
./start-server.sh
```

الموقع سيعمل على: `http://localhost:3000`

## 📱 الصفحات

- **الصفحة الرئيسية** (`/`): عرض الخدمات والآراء
- **من أنا** (`/about`): معلومات عن محمد الصافي
- **الخدمات** (`/services`): تفاصيل الخدمات المتاحة
- **آراء العملاء** (`/testimonials`): تجارب العملاء
- **لوحة التحكم** (`/dashboard`): للمسؤولين فقط

## 🎨 التصميم

- **الألوان**: أخضر زمردي، فيروزي، ذهبي
- **الخطوط**: Tajawal, Cairo, Almarai
- **الاتجاه**: RTL (من اليمين إلى اليسار)
- **التصميم**: متجاوب وحديث

## 🔐 المسؤولون

المستخدمون التاليون لديهم صلاحيات الوصول الكاملة:
- shahadalfahad70@gmail.com
- moalsafiy@gmail.com

## 📊 لوحة التحكم

### الإحصائيات:
- إجمالي الحجوزات
- الحجوزات حسب الحالة
- عدد الزوار
- الصفحات الأكثر زيارة
- الإيراد الكلي
- متوسط سعر الجلسة

### إدارة المحتوى:
- إدارة الخدمات (إضافة، تعديل، حذف)
- إدارة آراء العملاء
- إدارة المقالات
- تعديل محتوى الصفحات

## 🗄️ قاعدة البيانات

### الجداول:
- `users`: المستخدمين والمسؤولين
- `bookings`: الحجوزات
- `services`: الخدمات
- `testimonials`: آراء العملاء
- `articles`: المقالات
- `pageContent`: محتوى الصفحات
- `analytics`: إحصائيات الزوار

## 🛠️ التقنيات المستخدمة

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Express + tRPC
- **Database**: MySQL + Drizzle ORM
- **Authentication**: OAuth (Google)
- **Deployment**: Vercel / Railway / VPS

## 📞 معلومات الاتصال

- **WhatsApp**: 9647725768730
- **البريد الإلكتروني**: shahadalfahad70@gmail.com, moalsafiy@gmail.com

## 📝 الترخيص

جميع الحقوق محفوظة © 2025 محمد الصافي

## 🤝 المساهمة

للمساعدة أو الاستفسارات، يرجى التواصل مع المسؤولين.

---

**تم التطوير بواسطة**: Manus AI  
**التاريخ**: أكتوبر 2025  
**الإصدار**: 2.0
