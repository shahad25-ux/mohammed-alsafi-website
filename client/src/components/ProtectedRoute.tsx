import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { isAdmin } from '@/lib/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading) {
      // إذا المستخدم مو مسجل دخول
      if (!user) {
        setLocation('/login');
        return;
      }

      // إذا المستخدم مسجل دخول لكن مو مسؤول
      if (!isAdmin(user?.email)) {
        setLocation('/unauthorized');
        return;
      }
    }
  }, [user, loading, setLocation]);

  // عرض شاشة تحميل أثناء التحقق
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  // إذا المستخدم مو مسجل دخول أو مو مسؤول، ما نعرض شي
  if (!user || !isAdmin(user?.email)) {
    return null;
  }

  // إذا كل شي تمام، نعرض المحتوى
  return <>{children}</>;
}

