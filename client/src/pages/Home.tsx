import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  
  // Fetch services from database
  const { data: services = [] } = trpc.services.getActive.useQuery();
  
  // Fetch book info from database
  const { data: books = [] } = trpc.books.getAll.useQuery();
  const book = books[0]; // Get first book

  // Separate services by type
  const individualService = services.find((s: any) => s.type === 'individual');
  const couplesService = services.find((s: any) => s.type === 'couples');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-12 sm:py-20 px-4 bg-gradient-to-b from-[#f9f6f6] via-[#f0f5f4] to-[#e8f0ef]">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#84a2a0] via-[#6d8a88] to-[#567070] bg-clip-text text-transparent leading-tight">
              محمد الصافي
            </h1>
            <p className="text-xl sm:text-2xl text-[#6d8a88] font-bold">
              مدرب ومستشار في التواصل الفعال
            </p>
            <p className="text-base sm:text-lg text-[#2a3534] leading-relaxed">
              أساعدك تفهم نفسك والآخرين لتبني علاقات حقيقية
            </p>
            <p className="text-sm sm:text-base text-[#4a5f5e] italic border-r-4 border-[#84a2a0] pr-4 bg-[#f0f5f4] p-4 rounded-lg">
              "حين تفهم نفسك يصبح التواصل أسهل"
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <a href="https://wa.me/9647725768730" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] hover:from-[#6d8a88] hover:to-[#567070] text-white text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 font-semibold shadow-lg hover:shadow-xl transition-all">
                  احجز استشارتك الآن
                </Button>
              </a>
              <Link href="/about" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[#dce8e6] to-[#84a2a0] hover:from-[#84a2a0] hover:to-[#6d8a88] text-[#2a3534] text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 font-semibold shadow-lg hover:shadow-xl transition-all">
                  تعرف أكثر عني
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center order-1 md:order-2">
            <img
              src="/profile.png"
              alt="محمد الصافي"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-2xl object-cover border-4 border-[#dce8e6] hover:shadow-3xl transition-shadow"
            />
          </div>
        </div>
      </section>

      {/* Book Section */}
      {book && (
        <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-[#f0f5f4] via-white to-[#e8f0ef]">
          <div className="container max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#dce8e6]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Book Cover */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center">
                  <img
                    src={book.coverImage || "/book-cover.webp"}
                    alt={`غلاف ${book.title}`}
                    className="w-full max-w-sm rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Book Info */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="inline-block bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                      حصريًا ✨
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#2a3534] mb-4">
                      {book.title}
                    </h2>
                    <p className="text-lg sm:text-xl text-[#4a5f5e] leading-relaxed mb-6">
                      {book.tagline || "الإصدار الذي سيغيّر طريقتك في التعبير عن نفسك!"}
                    </p>
                    <p className="text-base text-[#6d8a88] mb-6">
                      {book.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent">
                        {book.price.toLocaleString()}
                      </span>
                      <span className="text-xl text-[#4a5f5e] font-semibold">
                        دينار عراقي
                      </span>
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/9647725768730?text=${encodeURIComponent(book.whatsappMessage || "اريد اطلب الكتيب")}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] hover:from-[#6d8a88] hover:to-[#567070] text-white text-base sm:text-lg px-8 py-6 font-bold shadow-xl hover:shadow-2xl transition-all">
                      اطلب الكتيب الآن 📚
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Preview Section */}
      <section className="py-16 sm:py-20 px-4 bg-[#faf8f8]">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent">
            الخدمات المتاحة
          </h2>
          <p className="text-center text-[#4a5f5e] mb-12 text-base sm:text-lg">اختر الخدمة التي تناسبك وابدأ رحلتك نحو تواصل أفضل</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Individual Sessions */}
            {individualService && (
              <div className="border-2 border-[#dce8e6] rounded-xl p-6 sm:p-8 hover:shadow-2xl hover:border-[#84a2a0] transition-all duration-300 bg-gradient-to-br from-white to-[#f0f5f4]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#6d8a88] mb-4">
                  {individualService.title}
                </h3>
                <p className="text-[#4a5f5e] mb-4 font-semibold">{individualService.duration} دقيقة</p>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent mb-6">
                  {individualService.price.toLocaleString()} د.ع
                </p>
                <div className="text-[#2a3534] mb-6 whitespace-pre-line">
                  {individualService.description}
                </div>
                <a href="https://wa.me/9647725768730?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%AC%D9%84%D8%B3%D8%A9%20%D9%81%D8%B1%D8%AF%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] hover:from-[#6d8a88] hover:to-[#567070] text-white font-semibold py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all">
                    احجز الآن
                  </Button>
                </a>
              </div>
            )}

            {/* Couples Sessions */}
            {couplesService && (
              <div className="border-2 border-[#dce8e6] rounded-xl p-6 sm:p-8 hover:shadow-2xl hover:border-[#84a2a0] transition-all duration-300 bg-gradient-to-br from-white to-[#f0f5f4]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#6d8a88] mb-4">
                  {couplesService.title}
                </h3>
                <p className="text-[#4a5f5e] mb-4 font-semibold">{couplesService.duration} دقيقة</p>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent mb-6">
                  {couplesService.price.toLocaleString()} د.ع
                </p>
                <div className="text-[#2a3534] mb-6 whitespace-pre-line">
                  {couplesService.description}
                </div>
                <a href="https://wa.me/9647725768730?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%AC%D9%84%D8%B3%D8%A9%20%D9%84%D9%84%D8%A3%D8%B2%D9%88%D8%A7%D8%AC" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] hover:from-[#6d8a88] hover:to-[#567070] text-white font-semibold py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all">
                    احجز الآن
                  </Button>
                </a>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="inline-block">
              <Button variant="outline" className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 border-2 border-[#84a2a0] text-[#6d8a88] hover:bg-[#f0f5f4] font-semibold">
                اعرض جميع الخدمات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-[#84a2a0] via-[#6d8a88] to-[#567070] text-white">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            مستعد لبدء رحلتك نحو تواصل أفضل؟
          </h2>
          <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto opacity-90">
            احجز استشارتك الأولى اليوم وابدأ في فهم نفسك والآخرين بشكل أعمق
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

