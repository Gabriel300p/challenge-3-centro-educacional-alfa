import Logo from "@/assets/logo.svg";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../providers/useAuth";
import { Home, BookOpen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";


export function TopBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) =>
    location.pathname.startsWith(path);

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const emailDisplay = user?.email;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-[#062E4B] text-white shadow-md">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-3 md:py-5">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo Centro Educacional Alfa"
            className="h-8 md:h-10 w-auto"
          />

          {/* Divider */}
          <div className="h-6 w-px bg-slate-500/60" />

          {/* Menu */}
          <nav className="flex items-center gap-2">
            <button
              onClick={() => navigate("/inicio")}
              className={`
        flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors
        ${isActive("/inicio")
                  ? "bg-slate-900/40 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }
      `}
            >
              <Home size={18} />
              Início
            </button>

            <button
              onClick={() => navigate("/posts")}
              className={`
        flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors
        ${isActive("/posts")
                  ? "bg-slate-900/40 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }
      `}
            >
              <BookOpen size={18} />
              Posts
            </button>

            <button
              onClick={() => navigate("/aulas")}
              className={`
        flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors
        ${isActive("/aulas")
                  ? "bg-slate-900/40 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }
      `}
            >
              <BookOpen size={18} />
              Aulas
            </button>
          </nav>
        </div>


        <div className="flex items-center gap-3 md:gap-5">
          {user && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs md:text-sm font-medium">
                  {getInitials(emailDisplay || "")}
                </span>
              </div>
              <span className="text-xs md:text-sm font-medium hidden sm:block">
                {emailDisplay}
              </span>
            </div>
          )}
          <hr className="border border-slate-600 h-4 md:h-6 w-px" />
          {/* Botão de Logout */}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="p-1 hover:bg-white/80 rounded-md transition-colors duration-200 flex items-center justify-center"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}