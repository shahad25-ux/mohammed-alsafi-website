import { useAuth } from "../_core/hooks/useAuth";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Users 
} from "lucide-react";

type SectionType = "services" | "content" | "studies" | "analytics" | "settings" | "members";

export default function DashboardNew() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);

  const sections = [
    {
      id: "services" as SectionType,
      title: "إدارة الخدمات",
      description: "إضافة أو تعديل أو حذف الخدمات المقدمة لعملائك.",
      icon: Briefcase,
      color: "teal",
    },
    {
      id: "content" as SectionType,
      title: "إدارة المحتوى",
      description: "إنشاء تدوينات ومواد تعليمية جديدة.",
      icon: FileText,
      color: "teal",
    },
    {
      id: "studies" as SectionType,
      title: "إدارة الدراسات",
      description: "تنظيم وتحديث دراسات الحالة وعرضها على موقعك.",
      icon: BookOpen,
      color: "teal",
    },
    {
      id: "analytics" as SectionType,
      title: "إحصائيات الأداء",
      description: "عرض الإحصائيات والأداء التفصيلي لخدماتك.",
      icon: BarChart3,
      color: "teal",
    },
    {
      id: "settings" as SectionType,
      title: "إعدادات الموقع",
      description: "تخصيص الألوان والخطوط وعناصر العلامة التجارية.",
      icon: Settings,
      color: "teal",
    },
    {
      id: "members" as SectionType,
      title: "الأعضاء",
      description: "إدارة الأعضاء والصلاحيات الخاصة بهم في لوحة التحكم.",
      icon: Users,
      color: "teal",
    },
  ];

  if (activeSection) {
    return <SectionView section={activeSection} onBack={() => setActiveSection(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 py-8 px-4" dir="rtl">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-teal-700 mb-2">لوحة التحكم</h1>
            <p className="text-gray-600">مرحباً {user?.name || "شهد الفهد"}</p>
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
            إضافة عنصر
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.id}
                className="p-8 bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-teal-300"
                onClick={() => {
                  if (section.id === 'services') window.location.href = '/manage-services';
                  else if (section.id === 'content') window.location.href = '/manage-testimonials';
                  else setActiveSection(section.id);
                }}
              >
                <div className="flex flex-col items-end text-right">
                  <div className="mb-4 p-3 bg-teal-100 rounded-full">
                    <Icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{section.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{section.description}</p>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all w-full">
                    التحكم
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <p className="text-teal-100 mb-2 text-sm">إجمالي الخدمات</p>
            <p className="text-4xl font-bold">12</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <p className="text-emerald-100 mb-2 text-sm">المقالات المنشورة</p>
            <p className="text-4xl font-bold">24</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <p className="text-green-100 mb-2 text-sm">عدد الزوار</p>
            <p className="text-4xl font-bold">1,234</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
            <p className="text-teal-100 mb-2 text-sm">الأعضاء النشطون</p>
            <p className="text-4xl font-bold">5</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Section View Component
function SectionView({ section, onBack }: { section: SectionType; onBack: () => void }) {
  const sectionTitles = {
    services: "إدارة الخدمات",
    content: "إدارة المحتوى",
    studies: "إدارة الدراسات",
    analytics: "إحصائيات الأداء",
    settings: "إعدادات الموقع",
    members: "الأعضاء",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 py-8 px-4" dir="rtl">
      <div className="container max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-2"
          >
            ← العودة إلى لوحة التحكم
          </button>
          <h1 className="text-4xl font-bold text-teal-700">{sectionTitles[section]}</h1>
        </div>

        <Card className="p-8 bg-white">
          {section === "services" && <ServicesSection />}
          {section === "content" && <ContentSection />}
          {section === "studies" && <StudiesSection />}
          {section === "analytics" && <AnalyticsSection />}
          {section === "settings" && <SettingsSection />}
          {section === "members" && <MembersSection />}
        </Card>
      </div>
    </div>
  );
}

// Services Section
function ServicesSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">الخدمات المتاحة</h2>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold">
          إضافة خدمة جديدة
        </button>
      </div>
      <p className="text-gray-600">هنا يمكنك إضافة وتعديل وحذف الخدمات التي تقدمها لعملائك.</p>
      
      <div className="mt-6 space-y-4">
        <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-teal-300 transition-all">
          <div className="flex justify-between items-start">
            <div className="text-right flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">جلسات فردية</h3>
              <p className="text-gray-600 mb-2">60 دقيقة - 80,000 د.ع</p>
              <p className="text-sm text-gray-500">فهم جذور الخلافات والتعامل مع التعلق وسوء الفهم</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                تعديل
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                حذف
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-teal-300 transition-all">
          <div className="flex justify-between items-start">
            <div className="text-right flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">جلسات للأزواج</h3>
              <p className="text-gray-600 mb-2">60 دقيقة - 120,000 د.ع</p>
              <p className="text-sm text-gray-500">تطوير الحوار والتفاهم وإعادة الروح للعلاقة</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                تعديل
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Content Section
function ContentSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">المحتوى والمقالات</h2>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold">
          إضافة مقال جديد
        </button>
      </div>
      <p className="text-gray-600">إنشاء وتحرير المقالات والمحتوى التعليمي.</p>
      
      <div className="mt-6 text-center py-12 text-gray-500">
        لا توجد مقالات حالياً. اضغط "إضافة مقال جديد" للبدء.
      </div>
    </div>
  );
}

// Studies Section
function StudiesSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">دراسات الحالة</h2>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold">
          إضافة دراسة جديدة
        </button>
      </div>
      <p className="text-gray-600">تنظيم وعرض دراسات الحالة الناجحة.</p>
      
      <div className="mt-6 text-center py-12 text-gray-500">
        لا توجد دراسات حالياً. اضغط "إضافة دراسة جديدة" للبدء.
      </div>
    </div>
  );
}

// Analytics Section
function AnalyticsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">إحصائيات الأداء</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <p className="text-teal-100 mb-2 text-sm">إجمالي الزوار</p>
          <p className="text-4xl font-bold">1,234</p>
          <p className="text-teal-100 text-xs mt-2">↑ 12% من الشهر الماضي</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <p className="text-emerald-100 mb-2 text-sm">الحجوزات</p>
          <p className="text-4xl font-bold">45</p>
          <p className="text-emerald-100 text-xs mt-2">↑ 8% من الشهر الماضي</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <p className="text-green-100 mb-2 text-sm">الإيراد</p>
          <p className="text-4xl font-bold">3.6M</p>
          <p className="text-green-100 text-xs mt-2">د.ع</p>
        </Card>
      </div>

      <Card className="p-6 bg-white border-2 border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">الصفحات الأكثر زيارة</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">الصفحة الرئيسية</span>
            <span className="text-teal-600 font-bold">456 زيارة</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">صفحة الخدمات</span>
            <span className="text-teal-600 font-bold">234 زيارة</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">صفحة من أنا</span>
            <span className="text-teal-600 font-bold">189 زيارة</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Settings Section
function SettingsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات الموقع</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">اسم الموقع</label>
          <input
            type="text"
            defaultValue="موقع محمد الصافي - استشاري التواصل"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">الشعار</label>
          <input
            type="text"
            defaultValue="أساعدك تفهم نفسك والآخرين لتبني علاقات حقيقية"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">رقم الواتساب</label>
          <input
            type="text"
            defaultValue="9647725768730"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">اللون الأساسي</label>
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-teal-600 rounded-lg border-4 border-teal-700 cursor-pointer"></div>
            <div className="w-16 h-16 bg-emerald-600 rounded-lg border-2 border-gray-300 cursor-pointer"></div>
            <div className="w-16 h-16 bg-green-600 rounded-lg border-2 border-gray-300 cursor-pointer"></div>
          </div>
        </div>

        <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold">
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
}

// Members Section
function MembersSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الأعضاء</h2>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold">
          إضافة عضو جديد
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 border-2 border-gray-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-right">
              <h3 className="text-lg font-bold text-gray-800">شهد الفهد</h3>
              <p className="text-sm text-gray-600">shahadalfahad70@gmail.com</p>
              <span className="inline-block mt-2 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">
                مسؤول
              </span>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                تعديل
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                حذف
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-2 border-gray-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-right">
              <h3 className="text-lg font-bold text-gray-800">محمد الصافي</h3>
              <p className="text-sm text-gray-600">moalsafiy@gmail.com</p>
              <span className="inline-block mt-2 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">
                مسؤول
              </span>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                تعديل
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

