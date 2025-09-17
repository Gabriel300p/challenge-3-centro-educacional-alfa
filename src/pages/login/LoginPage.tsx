import Logo from "@/assets/logo-vertical.svg";
import { buttonVariants } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../providers/useAuth"; 
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 

import { login as loginService } from "../../services/auth.services"; 

export function LoginPage() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const data = await loginService({ email, password });
      
     
      login(data.token);

      toast.success("Login realizado com sucesso!");
      navigate("/posts");
    } catch (error) {
      console.error("Erro no login:", error);
      if (error instanceof Error) {
        toast.error(`Erro no login: ${error.message}`);
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062E4B] to-[#0E6DB1] flex items-center justify-center p-4">
      <div className="w-full max-w-prose">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <img src={Logo} alt="Centro Educacional Alfa" />
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-600 mb-3"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="email" 
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 border-slate-200 rounded-xl bg-white focus:bg-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-200"
                  required
                />
              </div>
            </div>
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
            <button
              type="submit" 
              disabled={loading} 
              className={buttonVariants({
                variant: "default",
                className: "w-full",
              })}
            >
              {loading ? "Entrando..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}