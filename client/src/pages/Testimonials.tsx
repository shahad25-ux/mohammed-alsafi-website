import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading } = trpc.testimonials.getActive.useQuery();

  // Sample testimonials if database is empty
  const sampleTestimonials = [
    {
      id: 1,
      content: "بعد ثلاث جلسات، حسيت بتغيير حقيقي في طريقة كلامي مع زوجتي. قلب المشاحنات وصارت المحادثات أهدأ ومتميزة أكثر.",
      clientName: "علي وسارة",
      clientRole: "عميل - جلسات الأزواج",
      rating: 5,
      isActive: 1
    },
    {
      id: 2,
      content: "الجلسات المستندة مع محمد فتحت عيوني على نقاط ما منتبه لها. تعلمت أعبر عن مشاعري بدون خوف وصار البيت أهدأ!",
      clientName: "أحمد محمد",
      clientRole: "عميل - جلسات فردية",
      rating: 5,
      isActive: 1
    },
    {
      id: 3,
      content: "كنت أعتقد المشكلة كلها من الطرف الثاني، لكن محمد علمني أشوف دوري وأعبر عنه بوضوح والعلاقة صارت أفضل!",
      clientName: "خالد ونور",
      clientRole: "عميل - جلسات الأزواج",
      rating: 5,
      isActive: 1
    },
    {
      id: 4,
      content: "ساعدني محمد عملي وبسيط. العلاقات أدوات استخدمها يومياً للتعامل مع الأولاد والعمل ومن يومها قلت التوتر!",
      clientName: "فاطمة حسن",
      clientRole: "عميل - جلسات فردية",
      rating: 5,
      isActive: 1
    }
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : sampleTestimonials;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            آراء العملاء
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            اقرأ تجارب الأشخاص الذين تغيرت حياتهم من خلال الجلسات
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">جاري التحميل...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
                {displayTestimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="border-2 border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-white"
                  >
                    {/* Stars */}
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "fill-gray-400 text-gray-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg text-center">
                      "{testimonial.content}"
                    </p>

                    {/* Client Info */}
                    <div className="border-t border-gray-200 pt-4 text-center">
                      <p className="font-bold text-gray-800 text-sm sm:text-base">
                        {testimonial.clientName}
                      </p>
                      {testimonial.clientRole && (
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {testimonial.clientRole}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 text-white rounded-2xl p-8 sm:p-12 mb-12 shadow-xl">
                <div className="grid grid-cols-3 gap-6 sm:gap-8 text-center">
                  <div>
                    <div className="text-4xl sm:text-5xl font-bold mb-2">
                      +100
                    </div>
                    <p className="text-base sm:text-lg">عميل سعيد</p>
                  </div>
                  <div>
                    <div className="text-4xl sm:text-5xl font-bold mb-2">
                      95%
                    </div>
                    <p className="text-base sm:text-lg">نسبة الرضا</p>
                  </div>
                  <div>
                    <div className="text-4xl sm:text-5xl font-bold mb-2">
                      +5
                    </div>
                    <p className="text-base sm:text-lg">سنوات خبرة</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-12 border-2 border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
              لماذا تختار جلساتنا؟
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100 hover:border-teal-300 transition-all">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  نهج عملي وواقعي
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  نركز على الحلول العملية التي يمكنك تطبيقها في حياتك اليومية فوراً
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100 hover:border-teal-300 transition-all">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  سرية تامة
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  جميع الجلسات والمعلومات سرية بشكل كامل وآمنة
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100 hover:border-teal-300 transition-all">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  مرونة في المواعيد
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  نوفر مواعيد مرنة تناسب جدولك الزمني
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100 hover:border-teal-300 transition-all">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                  نتائج ملموسة
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  ستلاحظ تحسناً واضحاً في مهارات التواصل والعلاقات
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            انضم إلى عملائنا السعداء
          </h2>
          <p className="text-white text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            احجز جلستك الآن وابدأ رحلتك نحو تواصل أفضل وعلاقات أقوى
          </p>
          <a href="https://wa.me/9647725768730" target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-teal-700 hover:bg-gray-100 text-base sm:text-lg py-5 sm:py-6 px-8 sm:px-12 font-bold shadow-xl hover:shadow-2xl transition-all">
              احجز استشارتك الآن
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}

