import Logo from "@/assets/logo-vertical.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica de autenticação
    console.log("Login:", { username, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062E4B] to-[#0E6DB1] flex items-center justify-center p-4">
      <div className="w-full max-w-prose">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Logo e título */}
          <div className="flex flex-col items-center justify-center mb-8">
            <img src={Logo} alt="Centro Educacional Alfa" />
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-600 mb-3"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 h-14 border-slate-200 rounded-xl bg-white focus:bg-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-600 mb-3"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 border-slate-200 rounded-xl bg-white focus:bg-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Lembre de mim e Esqueci senha */}
            <div className="flex items-center justify-between mt-3 ">
              <div className="flex items-center gap-2">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="block text-sm text-slate-600 font-medium"
                >
                  Lembre de mim
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Esqueci minha senha
                </a>
              </div>
            </div>

            {/* Botão Login */}
            <Button
              type="submit"
              className="w-full py-4 text-base font-semibold bg-primary text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-3"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
