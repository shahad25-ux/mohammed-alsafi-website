import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

type TabType = "bookings" | "services" | "testimonials" | "articles" | "pages";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<TabType>("bookings");
  
  // Direct access allowed for admins
  
  const { data: bookings, isLoading: bookingsLoading, refetch } = trpc.bookings.list.useQuery();
  
  const { data: stats, isLoading: statsLoading } = trpc.bookings.stats.useQuery();

  const { data: analyticsStats } = trpc.analytics.stats.useQuery();

  const { data: revenueStats } = trpc.analytics.revenue.useQuery();
  
  const updateStatusMutation = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  // Allow direct access to dashboard
  if (false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">غير مصرح</h1>
          <p className="text-gray-600 mb-6">ليس لديك صلاحيات للوصول إلى لوحة التحكم</p>
          <a href="/" className="text-teal-600 hover:underline">العودة إلى الموقع الرئيسي</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="container max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-700 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">مرحباً {user?.name}</p>
        </div>

        {/* Main Stats Section */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card className="p-6 bg-white border-2 border-teal-200">
              <p className="text-gray-600 mb-2 text-sm">إجمالي الحجوزات</p>
              <p className="text-3xl font-bold text-teal-600">{stats.total}</p>
            </Card>
            <Card className="p-6 bg-white border-2 border-yellow-200">
              <p className="text-gray-600 mb-2 text-sm">قيد الانتظار</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </Card>
            <Card className="p-6 bg-white border-2 border-blue-200">
              <p className="text-gray-600 mb-2 text-sm">مؤكدة</p>
              <p className="text-3xl font-bold text-blue-600">{stats.confirmed}</p>
            </Card>
            <Card className="p-6 bg-white border-2 border-green-200">
              <p className="text-gray-600 mb-2 text-sm">مكتملة</p>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </Card>
            <Card className="p-6 bg-white border-2 border-red-200">
              <p className="text-gray-600 mb-2 text-sm">ملغاة</p>
              <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
            </Card>
          </div>
        )}

        {/* Analytics Stats */}
        {analyticsStats && revenueStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 bg-white border-2 border-purple-200">
              <p className="text-gray-600 mb-2 text-sm">عدد الزوار</p>
              <p className="text-3xl font-bold text-purple-600">{analyticsStats.totalVisitors}</p>
            </Card>
            <Card className="p-6 bg-white border-2 border-indigo-200">
              <p className="text-gray-600 mb-2 text-sm">الصفحات المشهورة</p>
              <p className="text-3xl font-bold text-indigo-600">{analyticsStats.uniquePages}</p>
            </Card>
            <Card className="p-6 bg-white border-2 border-orange-200">
              <p className="text-gray-600 mb-2 text-sm">الإيراد الكلي</p>
              <p className="text-2xl font-bold text-orange-600">{revenueStats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500">د.ع</p>
            </Card>
            <Card className="p-6 bg-white border-2 border-pink-200">
              <p className="text-gray-600 mb-2 text-sm">متوسط السعر</p>
              <p className="text-2xl font-bold text-pink-600">{revenueStats.averageSessionPrice.toLocaleString()}</p>
              <p className="text-xs text-gray-500">د.ع</p>
            </Card>
          </div>
        )}

        {/* Top Pages */}
        {analyticsStats && analyticsStats.topPages.length > 0 && (
          <Card className="p-6 bg-white mb-8">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">الصفحات الأكثر زيارة</h2>
            <div className="space-y-3">
              {analyticsStats.topPages.map((page, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{page.page}</span>
                  <span className="text-teal-600 font-bold">{page.count} زيارة</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tabs Navigation */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "bookings"
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            الحجوزات
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "services"
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            إدارة الخدمات
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "testimonials"
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            آراء العملاء
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "articles"
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            المقالات
          </button>
          <button
            onClick={() => setActiveTab("pages")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "pages"
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            محتوى الصفحات
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "bookings" && (
          <BookingsTab 
            bookings={bookings} 
            bookingsLoading={bookingsLoading}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            updateStatusMutation={updateStatusMutation}
          />
        )}
        
        {activeTab === "services" && <ServicesTab />}
        {activeTab === "testimonials" && <TestimonialsTab />}
        {activeTab === "articles" && <ArticlesTab />}
        {activeTab === "pages" && <PagesTab />}
      </div>
    </div>
  );
}

// Bookings Tab Component
function BookingsTab({ bookings, bookingsLoading, selectedStatus, setSelectedStatus, updateStatusMutation }: any) {
  return (
    <Card className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-teal-700 mb-6">جدول الحجوزات</h2>
      
      {bookingsLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b-2 border-teal-300 bg-teal-50">
                <th className="p-4 text-teal-700 font-semibold">الاسم</th>
                <th className="p-4 text-teal-700 font-semibold">الهاتف</th>
                <th className="p-4 text-teal-700 font-semibold">نوع الجلسة</th>
                <th className="p-4 text-teal-700 font-semibold">السعر</th>
                <th className="p-4 text-teal-700 font-semibold">الحالة</th>
                <th className="p-4 text-teal-700 font-semibold">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking: any) => (
                <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 font-medium">{booking.clientName}</td>
                  <td className="p-4">
                    <a 
                      href={`https://wa.me/${booking.clientPhone}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-teal-600 hover:underline"
                    >
                      {booking.clientPhone}
                    </a>
                  </td>
                  <td className="p-4">
                    {booking.sessionType === "individual" ? "جلسة فردية" : "جلسة للأزواج"}
                  </td>
                  <td className="p-4">{booking.price.toLocaleString()} د.ع</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      booking.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                      booking.status === "completed" ? "bg-green-100 text-green-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {booking.status === "pending" ? "قيد الانتظار" :
                       booking.status === "confirmed" ? "مؤكدة" :
                       booking.status === "completed" ? "مكتملة" :
                       "ملغاة"}
                    </span>
                  </td>
                  <td className="p-4">
                    <select 
                      value={selectedStatus[booking.id] || booking.status}
                      onChange={(e) => {
                        setSelectedStatus((prev: any) => ({ ...prev, [booking.id]: e.target.value }));
                        updateStatusMutation.mutate({ 
                          id: booking.id, 
                          status: e.target.value as any 
                        });
                      }}
                      className="px-2 py-1 border border-teal-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="pending">قيد الانتظار</option>
                      <option value="confirmed">مؤكدة</option>
                      <option value="completed">مكتملة</option>
                      <option value="cancelled">ملغاة</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">لا توجد حجوزات حتى الآن</p>
        </div>
      )}
    </Card>
  );
}

// Services Tab Component
function ServicesTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 60,
    price: 80000,
    features: "",
    type: "individual" as "individual" | "couples",
    isActive: 1,
  });

  const { data: services, refetch } = trpc.services.getAll.useQuery();
  const createMutation = trpc.services.create.useMutation({
    onSuccess: () => {
      refetch();
      resetForm();
    },
  });
  const updateMutation = trpc.services.update.useMutation({
    onSuccess: () => {
      refetch();
      resetForm();
    },
  });
  const deleteMutation = trpc.services.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      duration: 60,
      price: 80000,
      features: "",
      type: "individual",
      isActive: 1,
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      duration: service.duration,
      price: service.price,
      features: service.features || "",
      type: service.type,
      isActive: service.isActive,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-700">إدارة الخدمات</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          {showForm ? "إلغاء" : "+ إضافة خدمة جديدة"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editingService ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">عنوان الخدمة</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">نوع الجلسة</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="individual">جلسة فردية</option>
                <option value="couples">جلسة للأزواج</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">المدة (بالدقائق)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">السعر (د.ع)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">الوصف</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                rows={3}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">المميزات (كل ميزة في سطر)</label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                rows={3}
                placeholder="مثال:&#10;جلسة مدتها 60 دقيقة&#10;استشارة شاملة&#10;متابعة بعد الجلسة"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">الحالة</label>
              <select
                value={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value={1}>نشط</option>
                <option value={0}>غير نشط</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
              {editingService ? "تحديث" : "إضافة"}
            </Button>
            <Button type="button" onClick={resetForm} className="bg-gray-400 hover:bg-gray-500 text-white">
              إلغاء
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {services && services.length > 0 ? (
          services.map((service: any) => (
            <div key={service.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                  <div className="flex gap-4 mt-3 text-sm">
                    <span className="text-teal-600 font-semibold">
                      {service.type === "individual" ? "جلسة فردية" : "جلسة للأزواج"}
                    </span>
                    <span className="text-gray-600">المدة: {service.duration} دقيقة</span>
                    <span className="text-gray-600">السعر: {service.price.toLocaleString()} د.ع</span>
                    <span className={`font-semibold ${service.isActive ? "text-green-600" : "text-red-600"}`}>
                      {service.isActive ? "نشط" : "غير نشط"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(service)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2"
                  >
                    تعديل
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
                        deleteMutation.mutate({ id: service.id });
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2"
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">لا توجد خدمات حتى الآن</p>
          </div>
        )}
      </div>
    </Card>
  );
}

// Testimonials Tab Component
function TestimonialsTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    content: "",
    rating: 5,
    isActive: 1,
  });

  const { data: testimonials, refetch } = trpc.testimonials.getAll.useQuery();
  const createMutation = trpc.testimonials.create.useMutation({
    onSuccess: () => {
      refetch();
      resetForm();
    },
  });
  const updateMutation = trpc.testimonials.update.useMutation({
    onSuccess: () => {
      refetch();
      resetForm();
    },
  });
  const deleteMutation = trpc.testimonials.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const resetForm = () => {
    setFormData({
      clientName: "",
      clientRole: "",
      content: "",
      rating: 5,
      isActive: 1,
    });
    setEditingTestimonial(null);
    setShowForm(false);
  };

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      clientRole: testimonial.clientRole || "",
      content: testimonial.content,
      rating: testimonial.rating,
      isActive: testimonial.isActive,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-700">إدارة آراء العملاء</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          {showForm ? "إلغاء" : "+ إضافة رأي جديد"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editingTestimonial ? "تعديل الرأي" : "إضافة رأي جديد"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">اسم العميل</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">الدور/الوصف (اختياري)</label>
              <input
                type="text"
                value={formData.clientRole}
                onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="مثال: عميل - جلسات فردية"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">التقييم (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">الحالة</label>
              <select
                value={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value={1}>نشط</option>
                <option value={0}>غير نشط</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">محتوى الرأي</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
              {editingTestimonial ? "تحديث" : "إضافة"}
            </Button>
            <Button type="button" onClick={resetForm} className="bg-gray-400 hover:bg-gray-500 text-white">
              إلغاء
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial: any) => (
            <div key={testimonial.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{testimonial.clientName}</h3>
                    {testimonial.clientRole && (
                      <span className="text-sm text-gray-500">- {testimonial.clientRole}</span>
                    )}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.content}</p>
                  <span className={`inline-block mt-2 text-sm font-semibold ${testimonial.isActive ? "text-green-600" : "text-red-600"}`}>
                    {testimonial.isActive ? "نشط" : "غير نشط"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(testimonial)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2"
                  >
                    تعديل
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm("هل أنت متأكد من حذف هذا الرأي؟")) {
                        deleteMutation.mutate({ id: testimonial.id });
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2"
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">لا توجد آراء حتى الآن</p>
          </div>
        )}
      </div>
    </Card>
  );
}

// Articles Tab Component
function ArticlesTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    isPublished: 0,
  });

  const { data: articles, refetch } = trpc.articles.getAll.useQuery();
  const createMutation = trpc.articles.create.useMutation({
    onSuccess: () => {
      refetch();
      resetForm();
    },
  });
  const updateMutation = trpc.articles.update.useMutation({
    onSuccess: () => {
      refetch();
      resetForm();
    },
  });
  const deleteMutation = trpc.articles.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      coverImage: "",
      isPublished: 0,
    });
    setEditingArticle(null);
    setShowForm(false);
  };

  const handleEdit = (article: any) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt || "",
      coverImage: article.coverImage || "",
      isPublished: article.isPublished,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      updateMutation.mutate({ id: editingArticle.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <Card className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-700">إدارة المقالات</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          {showForm ? "إلغاء" : "+ إضافة مقال جديد"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editingArticle ? "تعديل المقال" : "إضافة مقال جديد"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">عنوان المقال</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">الرابط (Slug)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="article-slug"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">رابط الصورة (اختياري)</label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">ملخص المقال (اختياري)</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                rows={2}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">محتوى المقال</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                rows={8}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">حالة النشر</label>
              <select
                value={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value={0}>مسودة</option>
                <option value={1}>منشور</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
              {editingArticle ? "تحديث" : "إضافة"}
            </Button>
            <Button type="button" onClick={resetForm} className="bg-gray-400 hover:bg-gray-500 text-white">
              إلغاء
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {articles && articles.length > 0 ? (
          articles.map((article: any) => (
            <div key={article.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
                  {article.excerpt && <p className="text-gray-600 mt-2">{article.excerpt}</p>}
                  <div className="flex gap-4 mt-3 text-sm">
                    <span className="text-gray-600">الرابط: /{article.slug}</span>
                    <span className={`font-semibold ${article.isPublished ? "text-green-600" : "text-yellow-600"}`}>
                      {article.isPublished ? "منشور" : "مسودة"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(article)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2"
                  >
                    تعديل
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm("هل أنت متأكد من حذف هذا المقال؟")) {
                        deleteMutation.mutate({ id: article.id });
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2"
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">لا توجد مقالات حتى الآن</p>
          </div>
        )}
      </div>
    </Card>
  );
}

// Pages Tab Component
function PagesTab() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [sections, setSections] = useState<any[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const { data: pageContent, refetch } = trpc.pageContent.getAll.useQuery(
    { pageName: selectedPage },
    { enabled: !!selectedPage }
  );

  const upsertMutation = trpc.pageContent.upsert.useMutation({
    onSuccess: () => {
      refetch();
      setEditingSection(null);
      setEditContent("");
    },
  });

  useEffect(() => {
    if (pageContent) {
      setSections(pageContent);
    }
  }, [pageContent]);

  const handleSave = (sectionName: string) => {
    upsertMutation.mutate({
      pageName: selectedPage,
      sectionName,
      content: editContent,
    });
  };

  return (
    <Card className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-teal-700 mb-6">إدارة محتوى الصفحات</h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">اختر الصفحة</label>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        >
          <option value="home">الصفحة الرئيسية</option>
          <option value="about">من أنا</option>
          <option value="services">الخدمات</option>
          <option value="testimonials">آراء العملاء</option>
        </select>
      </div>

      <div className="space-y-4">
        {sections && sections.length > 0 ? (
          sections.map((section: any) => (
            <div key={section.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-800">{section.sectionName}</h3>
                {editingSection === section.sectionName ? (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleSave(section.sectionName)}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2"
                    >
                      حفظ
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingSection(null);
                        setEditContent("");
                      }}
                      className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-2"
                    >
                      إلغاء
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setEditingSection(section.sectionName);
                      setEditContent(section.content);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2"
                  >
                    تعديل
                  </Button>
                )}
              </div>
              
              {editingSection === section.sectionName ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  rows={6}
                />
              ) : (
                <p className="text-gray-600 whitespace-pre-wrap">{section.content}</p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">لا يوجد محتوى لهذه الصفحة حتى الآن</p>
            <p className="text-sm text-gray-500 mt-2">يمكنك إضافة محتوى جديد من خلال تحديث الصفحات</p>
          </div>
        )}
      </div>
    </Card>
  );
}

