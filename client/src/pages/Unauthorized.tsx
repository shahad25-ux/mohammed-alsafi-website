import { useLocation } from 'wouter';
import { ShieldX, Home, LogOut } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';

export default function Unauthorized() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldX className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            غير مصرح بالدخول
          </h1>
          <p className="text-gray-600 mb-6">
            عذراً، ليس لديك صلاحية الوصول إلى لوحة التحكم
          </p>

          {/* User Info */}
          {user && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">مسجل دخول كـ:</p>
              <p className="font-medium text-gray-800">{user?.email}</p>
            </div>
          )}

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-right">
            <p className="text-sm text-blue-800">
              💡 <strong>ملاحظة:</strong> لوحة التحكم متاحة للمسؤولين فقط.
              إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع المسؤول.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => setLocation('/')}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              العودة للصفحة الرئيسية
            </button>

            {user && (
              <button
                onClick={handleLogout}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                تسجيل الخروج
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

