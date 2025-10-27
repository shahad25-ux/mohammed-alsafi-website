import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Star } from "lucide-react";

export default function ManageTestimonials() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    content: "",
    rating: 5,
  });

  // Fetch testimonials using tRPC
  const { data: testimonials = [], isLoading, refetch } = trpc.testimonials.getAll.useQuery();

  // Create testimonial using tRPC
  const createMutation = trpc.testimonials.create.useMutation({
    onSuccess: () => {
      refetch();
      resetForm();
    },
  });

  // Update testimonial using tRPC
  const updateMutation = trpc.testimonials.update.useMutation({
    onSuccess: () => {
      refetch();
      resetForm();
      setEditingId(null);
    },
  });

  // Delete testimonial using tRPC
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
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (testimonial: any) => {
    setEditingId(testimonial.id);
    setFormData({
      clientName: testimonial.clientName,
      clientRole: testimonial.clientRole || "",
      content: testimonial.content,
      rating: testimonial.rating,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الرأي؟")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">إدارة آراء العملاء</h1>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              ← العودة للوحة التحكم
            </Button>
          </Link>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {editingId ? "تعديل رأي" : "إضافة رأي جديد"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم العميل
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الدور / الوظيفة
              </label>
              <input
                type="text"
                value={formData.clientRole}
                onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="مثال: عميل - جلسات الأزواج"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المحتوى
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                التقييم
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingId ? "تحديث" : "إضافة"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  إلغاء
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Testimonials List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            الآراء الحالية ({testimonials.length})
          </h2>

          {isLoading ? (
            <div className="text-center py-8 text-gray-500">جاري التحميل...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-8 text-gray-500">لا توجد آراء حالياً</div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial: any) => (
                <div
                  key={testimonial.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{testimonial.clientName}</h3>
                      {testimonial.clientRole && (
                        <p className="text-sm text-gray-600">{testimonial.clientRole}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3 italic">"{testimonial.content}"</p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(testimonial)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      تعديل
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={deleteMutation.isPending}
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

