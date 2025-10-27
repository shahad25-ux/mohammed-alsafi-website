import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-[#f9f6f6] to-[#f0f5f4]">
        <div className="container">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#6d8a88] mb-6">
            من أنا
          </h1>
          <p className="text-lg sm:text-xl text-[#4a5f5e]">
            تعرف على رحلتي وكيف بدأت مسيرتي في التواصل الفعال
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 px-4 bg-[#faf8f8]">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="/profile.png"
              alt="محمد الصافي"
              className="w-full rounded-2xl shadow-2xl object-cover border-4 border-[#dce8e6]"
            />
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent">
              محمد الصافي
            </h2>
            <p className="text-lg sm:text-xl text-[#6d8a88] font-bold">
              مدرب ومستشار في التواصل الفعال
            </p>

            <div className="space-y-4 text-[#2a3534] leading-relaxed">
              <p className="text-base sm:text-lg">
                رحلتي بدأت من تجربة مؤلمة أثرت بحياتي، جعلتني أتساءل: كيف يُمكن أن يصل الإنسان لهذا المستوى من الغضب والصراع؟
              </p>

              <p className="text-base sm:text-lg">
                هذا السؤال دفعني للبحث عن جذور الصراع والعنف، فاكتشفت أن العنف المادي يبدأ من عنف عاطفي، وأن العنف العاطفي يُولد من الأحكام والمقارنات واللوم.
              </p>

              <p className="text-base sm:text-lg">
                بدأت هذه الرحلة حتى أساعد الناس أن يتجردوا من الأحكام ويتعلموا الإصغاء لأنفسهم وللآخرين بصدق ووضوح.
              </p>

              <p className="text-sm sm:text-base bg-gradient-to-r from-[#f0f5f4] to-[#e8f0ef] p-6 rounded-lg border-r-4 border-[#84a2a0] font-semibold text-[#2a3534]">
                اليوم أقدم جلسات تساعد الأفراد والأزواج على بناء تواصل حقيقي يخفف الألم ويجعل الكلمات جسرًا لا جدارًا.
              </p>
            </div>

            <div className="pt-6">
              <a href="https://wa.me/9647725768730" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] hover:from-[#6d8a88] hover:to-[#567070] text-white text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 font-semibold shadow-lg hover:shadow-xl transition-all">
                  احجز استشارتك الآن
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-[#f0f5f4] to-[#e8f0ef]">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent">
            رحلة التحول
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-t-4 border-[#84a2a0] hover:shadow-xl transition-shadow">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent mb-4">1</div>
              <h3 className="text-lg sm:text-xl font-bold text-[#2a3534] mb-3">
                اكتشاف الحقيقة
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base">
                اكتشفت أن جذور الصراع تكمن في سوء التواصل والأحكام التي نطلقها على الآخرين
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-t-4 border-[#6d8a88] hover:shadow-xl transition-shadow">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#6d8a88] to-[#567070] bg-clip-text text-transparent mb-4">2</div>
              <h3 className="text-lg sm:text-xl font-bold text-[#2a3534] mb-3">
                البحث والتعلم
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base">
                بدأت رحلة البحث العميق عن أسباب الصراع والعنف، وتعلمت أدوات التواصل الفعال
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-t-4 border-[#567070] hover:shadow-xl transition-shadow">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#567070] to-[#3f5858] bg-clip-text text-transparent mb-4">3</div>
              <h3 className="text-lg sm:text-xl font-bold text-[#2a3534] mb-3">
                مساعدة الآخرين
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base">
                الآن أساعد الأفراد والأزواج على بناء علاقات حقيقية وتواصل صحي
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 px-4 bg-[#faf8f8]">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent">
            قيمي وأساليبي
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <div className="space-y-3 bg-gradient-to-br from-[#f0f5f4] to-white p-6 rounded-lg border-r-4 border-[#84a2a0]">
              <h3 className="text-lg sm:text-xl font-bold text-[#2a3534] flex items-center gap-3">
                <span className="text-[#84a2a0] text-2xl">✓</span>
                الصدق والوضوح
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base mr-8">
                أساعدك على التعبير عن مشاعرك بصدق ووضوح دون خوف
              </p>
            </div>

            <div className="space-y-3 bg-gradient-to-br from-[#e8f0ef] to-white p-6 rounded-lg border-r-4 border-[#6d8a88]">
              <h3 className="text-lg sm:text-xl font-bold text-[#2a3534] flex items-center gap-3">
                <span className="text-[#6d8a88] text-2xl">✓</span>
                الإصغاء الفعال
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base mr-8">
                أعلمك كيفية الاستماع لنفسك والآخرين بعمق وتفهم
              </p>
            </div>

            <div className="space-y-3 bg-gradient-to-br from-[#f0f5f4] to-white p-6 rounded-lg border-r-4 border-[#567070]">
              <h3 className="text-lg sm:text-xl font-bold text-[#2a3534] flex items-center gap-3">
                <span className="text-[#567070] text-2xl">✓</span>
                التجرد من الأحكام
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base mr-8">
                أساعدك على التخلص من الأحكام والمقارنات التي تعيق التواصل
              </p>
            </div>

            <div className="space-y-3 bg-gradient-to-br from-[#e8f0ef] to-white p-6 rounded-lg border-r-4 border-[#3f5858]">
              <h3 className="text-lg sm:text-xl font-bold text-[#2a3534] flex items-center gap-3">
                <span className="text-[#3f5858] text-2xl">✓</span>
                بناء علاقات حقيقية
              </h3>
              <p className="text-[#4a5f5e] text-sm sm:text-base mr-8">
                أساعدك على بناء علاقات قائمة على الفهم والاحترام المتبادل
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-[#84a2a0] via-[#6d8a88] to-[#567070] text-white">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            هل أنت مستعد لبدء رحلتك؟
          </h2>
          <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto opacity-90">
            احجز استشارتك الأولى معي واكتشف كيف يمكنك بناء تواصل أفضل مع نفسك والآخرين
          </p>
          <a href="https://wa.me/9647725768730" target="_blank" rel="noopener noreferrer" className="inline-block">
            <Button className="bg-white hover:bg-gray-100 text-[#84a2a0] text-sm sm:text-base px-8 sm:px-12 py-5 sm:py-6 font-bold shadow-xl hover:shadow-2xl transition-all">
              احجز استشارتك على الواتساب
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}

