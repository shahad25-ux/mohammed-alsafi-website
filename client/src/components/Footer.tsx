export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-emerald-200 bg-gradient-to-b from-white to-emerald-50 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
              محمد الصافي
            </h3>
            <p className="text-sm text-gray-600">
              مدرب ومستشار في التواصل الفعال
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">الروابط السريعة</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-emerald-600 transition-colors font-medium">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-emerald-600 transition-colors font-medium">
                  من أنا
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-emerald-600 transition-colors font-medium">
                  الخدمات
                </a>
              </li>
              <li>
                <a href="/testimonials" className="hover:text-emerald-600 transition-colors font-medium">
                  آراء العملاء
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">التواصل</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <a
                  href="https://wa.me/9647725768730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 transition-colors font-medium flex items-center gap-2"
                >
                  <span className="text-emerald-600">📱</span>
                  واتساب: +964 772 5768730
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-emerald-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            © {currentYear} محمد الصافي. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

