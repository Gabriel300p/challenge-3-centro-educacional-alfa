import Logo from "@/assets/logo.svg";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function TopBar() {
  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log("Logout realizado");
    // Redirecionar para a página de login ou limpar o estado de autenticação
    window.location.href = "/login";
  };

  return (
    <header className="bg-[#062E4B] text-white shadow-md">
      <div className="flex items-center justify-between px-16 py-5">
        {/* Logo e Nome */}

        <img src={Logo} alt="Logo Centro Educacional Alfa" />

        {/* Usuário */}
        <div className="flex items-center gap-5">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">GA</span>
            </div>
            <span className="text-sm font-medium">Gabriel Andrade</span>
          </div>
          <hr className="border border-slate-600 h-6 w-px" />
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
