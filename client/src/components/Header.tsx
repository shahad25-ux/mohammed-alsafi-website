import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[#dce8e6] bg-gradient-to-r from-white via-[#f0f5f4] to-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] bg-clip-text text-transparent group-hover:from-[#6d8a88] group-hover:to-[#567070] transition-all">
            محمد الصافي
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-[#2a3534] hover:text-[#84a2a0] transition-colors duration-200 relative group">
            الرئيسية
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/about" className="text-sm font-semibold text-[#2a3534] hover:text-[#84a2a0] transition-colors duration-200 relative group">
            من أنا
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/services" className="text-sm font-semibold text-[#2a3534] hover:text-[#84a2a0] transition-colors duration-200 relative group">
            الخدمات
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/testimonials" className="text-sm font-semibold text-[#2a3534] hover:text-[#84a2a0] transition-colors duration-200 relative group">
            آراء العملاء
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://wa.me/9647725768730" target="_blank" rel="noopener noreferrer" className="inline-block">
            <Button className="bg-gradient-to-r from-[#84a2a0] to-[#6d8a88] hover:from-[#6d8a88] hover:to-[#567070] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
              احجز استشارتك
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

