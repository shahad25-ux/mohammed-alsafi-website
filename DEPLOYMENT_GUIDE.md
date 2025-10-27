# دليل النشر - موقع محمد الصافي

## خيارات النشر

يمكن نشر الموقع باستخدام أحد الخيارات التالية:

## 1️⃣ النشر على Vercel (الخيار الموصى به)

### المميزات:
- ✅ مجاني للمشاريع الصغيرة
- ✅ نشر تلقائي عند كل تحديث
- ✅ SSL مجاني
- ✅ CDN عالمي
- ✅ سهل الإعداد

### الخطوات:

#### أ. إعداد قاعدة البيانات

**الخيار 1: PlanetScale (MySQL - موصى به)**

1. أنشئ حساب على [PlanetScale](https://planetscale.com)
2. أنشئ قاعدة بيانات جديدة
3. احصل على رابط الاتصال (Connection String)
4. سيكون بالشكل: `mysql://user:password@host/database?ssl={"rejectUnauthorized":true}`

**الخيار 2: Vercel Postgres**

1. في مشروع Vercel، اذهب إلى Storage
2. أنشئ Postgres Database
3. احصل على رابط الاتصال

> **ملاحظة**: إذا استخدمت Postgres، ستحتاج لتحويل المشروع من MySQL إلى Postgres (انظر القسم أدناه)

#### ب. النشر على Vercel

1. **تثبيت Vercel CLI**:
```bash
npm i -g vercel
```

2. **تسجيل الدخول**:
```bash
vercel login
```

3. **النشر**:
```bash
cd /home/ubuntu/mohammed-alsafi-website
vercel
```

4. **إضافة متغيرات البيئة**:
   - اذهب إلى لوحة تحكم Vercel
   - اختر المشروع
   - Settings → Environment Variables
   - أضف:
     - `DATABASE_URL`: رابط قاعدة البيانات
     - `NODE_ENV`: production

5. **تشغيل الترحيلات**:
```bash
# من لوحة تحكم Vercel أو محلياً
DATABASE_URL="your_production_url" pnpm drizzle-kit push
```

6. **إضافة البيانات الأولية** (اختياري):
```bash
DATABASE_URL="your_production_url" pnpm tsx scripts/seed-data.ts
```

#### ج. ربط دومين خاص

1. في لوحة تحكم Vercel، اذهب إلى Settings → Domains
2. أضف الدومين الخاص بك
3. اتبع التعليمات لتحديث DNS

---

## 2️⃣ النشر على Railway

### المميزات:
- ✅ دعم MySQL مباشر
- ✅ نشر سهل
- ✅ خطة مجانية متاحة

### الخطوات:

1. **إنشاء حساب**:
   - اذهب إلى [Railway.app](https://railway.app)
   - أنشئ حساب جديد

2. **إنشاء مشروع جديد**:
   - New Project → Deploy from GitHub
   - اختر المستودع

3. **إضافة قاعدة بيانات MySQL**:
   - في المشروع، انقر على "+ New"
   - اختر "Database" → "MySQL"
   - انسخ `DATABASE_URL`

4. **إضافة متغيرات البيئة**:
   - اذهب إلى Variables
   - أضف `DATABASE_URL`

5. **النشر**:
   - سيتم النشر تلقائياً

---

## 3️⃣ النشر على VPS (DigitalOcean, Linode, إلخ)

### المميزات:
- ✅ تحكم كامل
- ✅ أداء عالي
- ✅ مناسب للمشاريع الكبيرة

### الخطوات:

#### أ. إعداد الخادم

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# تثبيت pnpm
npm install -g pnpm

# تثبيت MySQL
sudo apt install -y mysql-server

# تأمين MySQL
sudo mysql_secure_installation
```

#### ب. إعداد قاعدة البيانات

```bash
sudo mysql

# في MySQL shell:
CREATE DATABASE mohammed_alsafi;
CREATE USER 'alsafi_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON mohammed_alsafi.* TO 'alsafi_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### ج. نشر المشروع

```bash
# استنساخ المشروع
cd /var/www
git clone your-repo-url mohammed-alsafi-website
cd mohammed-alsafi-website

# تثبيت الحزم
pnpm install

# إنشاء ملف .env
nano .env
# أضف:
# DATABASE_URL=mysql://alsafi_user:strong_password_here@localhost:3306/mohammed_alsafi
# NODE_ENV=production

# تشغيل الترحيلات
pnpm drizzle-kit push

# بناء المشروع
pnpm build

# تثبيت PM2
npm install -g pm2

# تشغيل المشروع
pm2 start dist/server/index.js --name "alsafi-website"
pm2 save
pm2 startup
```

#### د. إعداد Nginx كـ Reverse Proxy

```bash
# تثبيت Nginx
sudo apt install -y nginx

# إنشاء ملف التكوين
sudo nano /etc/nginx/sites-available/alsafi-website

# أضف التكوين التالي:
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# تفعيل الموقع
sudo ln -s /etc/nginx/sites-available/alsafi-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# تثبيت SSL (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 🔄 تحويل من MySQL إلى PostgreSQL (إذا لزم الأمر)

### 1. تحديث التبعيات

```bash
# إزالة MySQL
pnpm remove mysql2 drizzle-orm

# إضافة PostgreSQL
pnpm add postgres drizzle-orm
```

### 2. تحديث `drizzle.config.ts`

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // تغيير من mysql
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### 3. تحديث `drizzle/schema.ts`

استبدل جميع استيرادات MySQL بـ PostgreSQL:

```typescript
// قبل:
import { mysqlTable, mysqlEnum, varchar, text, int, timestamp } from "drizzle-orm/mysql-core";

// بعد:
import { pgTable, pgEnum, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

// وتحديث جميع الجداول:
// mysqlTable → pgTable
// mysqlEnum → pgEnum
// int → integer
```

### 4. تحديث `server/db.ts`

```typescript
// قبل:
import { drizzle } from "drizzle-orm/mysql2";

// بعد:
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// وتحديث دالة getDb:
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    const client = postgres(process.env.DATABASE_URL);
    _db = drizzle(client);
  }
  return _db;
}
```

---

## 📋 قائمة التحقق قبل النشر

- [ ] تحديث متغيرات البيئة
- [ ] اختبار الموقع محلياً
- [ ] تشغيل الترحيلات على قاعدة البيانات
- [ ] إضافة البيانات الأولية
- [ ] التأكد من عمل نظام المصادقة
- [ ] اختبار جميع الصفحات
- [ ] التأكد من عمل لوحة التحكم
- [ ] اختبار نظام الحجوزات
- [ ] التحقق من رقم WhatsApp
- [ ] إعداد النسخ الاحتياطي التلقائي
- [ ] إعداد مراقبة الأخطاء (مثل Sentry)

---

## 🔐 الأمان

### توصيات الأمان:

1. **كلمات مرور قوية**: استخدم كلمات مرور معقدة لقاعدة البيانات
2. **HTTPS**: تأكد من تفعيل SSL
3. **متغيرات البيئة**: لا تضع أسرار في الكود
4. **النسخ الاحتياطي**: احتفظ بنسخ احتياطية دورية
5. **التحديثات**: حدّث الحزم بانتظام
6. **Firewall**: قيّد الوصول إلى قاعدة البيانات

---

## 🔧 الصيانة

### النسخ الاحتياطي اليومي (VPS):

```bash
# إنشاء سكريبت النسخ الاحتياطي
nano /home/backup-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u alsafi_user -p'your_password' mohammed_alsafi > /backups/db_$DATE.sql
# حذف النسخ الأقدم من 30 يوم
find /backups -name "db_*.sql" -mtime +30 -delete
```

```bash
chmod +x /home/backup-db.sh

# إضافة إلى crontab للتشغيل اليومي
crontab -e
# أضف:
0 2 * * * /home/backup-db.sh
```

### مراقبة الخادم:

```bash
# مراقبة استخدام الموارد
pm2 monit

# عرض السجلات
pm2 logs alsafi-website

# إعادة تشغيل عند الحاجة
pm2 restart alsafi-website
```

---

## 📞 الدعم بعد النشر

### مشاكل شائعة وحلولها:

**المشكلة**: الموقع لا يعمل بعد النشر
- **الحل**: تحقق من السجلات وتأكد من متغيرات البيئة

**المشكلة**: خطأ في الاتصال بقاعدة البيانات
- **الحل**: تحقق من `DATABASE_URL` وصلاحيات المستخدم

**المشكلة**: لوحة التحكم لا تعمل
- **الحل**: تأكد من تسجيل الدخول بحساب مصرح

**المشكلة**: الصور لا تظهر
- **الحل**: تحقق من روابط الصور وصلاحيات الوصول

---

**آخر تحديث**: أكتوبر 2025
**الإصدار**: 2.0

