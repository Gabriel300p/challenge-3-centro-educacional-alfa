import Logo from "@/assets/logo.svg";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../providers/useAuth";

export function TopBar() {
  const { user, logout } = useAuth(); 

  
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
        <img
          src={Logo}
          alt="Logo Centro Educacional Alfa"
          className="h-8 md:h-10 w-auto"
        />

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