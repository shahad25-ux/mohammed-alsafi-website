import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export default function Services() {
  const { data: services, isLoading } = trpc.services.getActive.useQuery();

  // Separate services by type
  const individualServices = services?.filter(s => s.type === "individual") || [];
  const couplesServices = services?.filter(s => s.type === "couples") || [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-[#f9f6f6] to-[#f0f5f4]">
        <div className="container">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#6d8a88] mb-6">
            الخدمات
          </h1>
          <p className="text-lg sm:text-xl text-[#4a5f5e]">
            اكتشف الخدمات المتاحة لتطوير مهارات التواصل الفعال
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 px-4 bg-[#faf8f8]">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-[#4a5f5e] text-lg">جاري التحميل...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
              {/* Individual Sessions */}
              {individualServices.length > 0 && individualServices.map((service) => (
                <div key={service.id} className="border-2 border-[#dce8e6] rounded-xl p-6 sm:p-8 hover:shadow-2xl hover:border-[#84a2a0] transition-all duration-300 bg-gradient-to-br from-white to-[#f0f5f4]">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#6d8a88] mb-4">
                    {service.title}
                  </h2>
                  <div className="mb-6">
                    <p className="text-[#4a5f5e] mb-2 font-semibold text-sm sm:text-base">المدة: {service.duration} دقيقة</p>
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent">
                      {service.price.toLocaleString()} د.ع
                    </p>
                  </div>

                  <div className="mb-8">
                    <p className="text-[#4a5f5e] mb-4 whitespace-pre-wrap">
                      {service.description}
                    </p>
                    
                    {service.features && (
                      <>
                        <h3 className="text-lg sm:text-xl font-bold text-[#2a3534] mb-4">
                          ماذا ستتعلم:
                        </h3>
                        <ul className="space-y-3">
                          {service.features.split('\n').filter(f => f.trim()).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-[#84a2a0] text-xl mt-1 flex-shrink-0">✓</span>
                              <p className="text-[#2a3534] text-sm sm:text-base">{feature}</p>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <a href="https://wa.me/9647725768730" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] hover:from-[#6d8a88] hover:to-[#567070] text-white text-sm sm:text-base py-5 sm:py-6 font-semibold shadow-lg hover:shadow-xl transition-all">
                      احجز جلسة فردية
                    </Button>
                  </a>
                </div>
              ))}

              {/* Couples Sessions */}
              {couplesServices.length > 0 && couplesServices.map((service) => (
                <div key={service.id} className="border-2 border-[#dce8e6] rounded-xl p-6 sm:p-8 hover:shadow-2xl hover:border-[#84a2a0] transition-all duration-300 bg-gradient-to-br from-white to-[#f0f5f4]">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#6d8a88] mb-4">
                    {service.title}
                  </h2>
                  <div className="mb-6">
                    <p className="text-[#4a5f5e] mb-2 font-semibold text-sm sm:text-base">المدة: {service.duration} دقيقة</p>
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent">
                      {service.price.toLocaleString()} د.ع
                    </p>
                  </div>

                  <div className="mb-8">
                    <p className="text-[#4a5f5e] mb-4 whitespace-pre-wrap">
                      {service.description}
                    </p>
                    
                    {service.features && (
                      <>
                        <h3 className="text-lg sm:text-xl font-bold text-[#2a3534] mb-4">
                          ماذا ستتعلمان:
                        </h3>
                        <ul className="space-y-3">
                          {service.features.split('\n').filter(f => f.trim()).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-[#84a2a0] text-xl mt-1 flex-shrink-0">✓</span>
                              <p className="text-[#2a3534] text-sm sm:text-base">{feature}</p>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <a href="https://wa.me/9647725768730" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] hover:from-[#6d8a88] hover:to-[#567070] text-white text-sm sm:text-base py-5 sm:py-6 font-semibold shadow-lg hover:shadow-xl transition-all">
                      احجز جلسة للأزواج
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Process Section */}
          <div className="bg-gradient-to-r from-[#f0f5f4] to-[#e8f0ef] rounded-xl p-8 sm:p-12 border-2 border-[#dce8e6]">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent">
              طريقة الحجز والعمل
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-[#84a2a0]">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent mb-4">1</div>
                <h3 className="font-bold text-[#2a3534] mb-2 text-sm sm:text-base">
                  اضغط الزر
                </h3>
                <p className="text-xs sm:text-sm text-[#4a5f5e]">
                  اضغط على زر "احجز استشارتك" للتواصل عبر الواتساب
                </p>
              </div>

              <div className="text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-[#6d8a88]">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#6d8a88] to-[#567070] bg-clip-text text-transparent mb-4">2</div>
                <h3 className="font-bold text-[#2a3534] mb-2 text-sm sm:text-base">
                  اختر نوع الجلسة
                </h3>
                <p className="text-xs sm:text-sm text-[#4a5f5e]">
                  أخبرني عن نوع الجلسة التي تريدها (فردية أو للأزواج)
                </p>
              </div>

              <div className="text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-[#567070]">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#567070] to-[#3f5858] bg-clip-text text-transparent mb-4">3</div>
                <h3 className="font-bold text-[#2a3534] mb-2 text-sm sm:text-base">
                  حدد الموعد
                </h3>
                <p className="text-xs sm:text-sm text-[#4a5f5e]">
                  سنحدد موعد الجلسة بما يناسبك
                </p>
              </div>

              <div className="text-center bg-white p-6 rounded-lg shadow-md border-t-4 border-[#3f5858]">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#3f5858] to-[#2a4a48] bg-clip-text text-transparent mb-4">4</div>
                <h3 className="font-bold text-[#2a3534] mb-2 text-sm sm:text-base">
                  ابدأ رحلتك
                </h3>
                <p className="text-xs sm:text-sm text-[#4a5f5e]">
                  ابدأ في فهم نفسك والآخرين بشكل أعمق
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-4 bg-[#f0f5f4]">
        <div className="container max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent">
            أسئلة شائعة
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="border-r-4 border-[#84a2a0] bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-[#2a3534] mb-2 text-base sm:text-lg">
                هل يمكن حجز جلسات متعددة؟
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base">
                نعم، يمكنك حجز جلسات متعددة حسب احتياجك. سنناقش خطة العمل معك.
              </p>
            </div>

            <div className="border-r-4 border-[#6d8a88] bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-[#2a3534] mb-2 text-base sm:text-lg">
                هل الجلسات عبر الإنترنت أم شخصية؟
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base">
                الجلسات متاحة عبر الإنترنت وشخصياً حسب رغبتك وموقعك.
              </p>
            </div>

            <div className="border-r-4 border-[#567070] bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-[#2a3534] mb-2 text-base sm:text-lg">
                كيف يتم الدفع؟
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base">
                يتم الدفع عبر التحويل البنكي أو الدفع الإلكتروني. سنناقش التفاصيل عند الحجز.
              </p>
            </div>

            <div className="border-r-4 border-[#3f5858] bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-[#2a3534] mb-2 text-base sm:text-lg">
                هل المعلومات سرية؟
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base">
                نعم، جميع المعلومات والمحادثات سرية تماماً ولن يتم مشاركتها مع أي طرف.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-[#84a2a0] to-[#6d8a88]">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            هل أنت جاهز لبدء رحلتك؟
          </h2>
          <p className="text-white text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            احجز استشارتك الآن وابدأ في تطوير مهارات التواصل وفهم نفسك والآخرين بشكل أعمق
          </p>
          <a href="https://wa.me/9647725768730" target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-[#6d8a88] hover:bg-gray-100 text-base sm:text-lg py-5 sm:py-6 px-8 sm:px-12 font-bold shadow-xl hover:shadow-2xl transition-all">
              احجز استشارتك الآن
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}

