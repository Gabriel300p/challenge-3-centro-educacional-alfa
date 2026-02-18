import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, XCircle, CircleNotch, House } from "@phosphor-icons/react";
import { useAuth } from "../../../providers/useAuth";
import { Button } from "@/components/ui/button";
import { recordCheckIn } from "../../aulas/services/attendance.service";

export function ConfirmarPresenca() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, token: authToken } = useAuth();
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Processando sua presença...");
  
  const hasFetched = useRef(false);

  const attendanceId = searchParams.get("attendanceId");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { 
        state: { from: location.pathname + location.search },
        replace: true 
      });
      return;
    }

    if (!attendanceId || !token) {
      setStatus("error");
      setMessage("Link de presença inválido ou incompleto.");
      return;
    }

    if (!authToken) {
      setStatus("error");
      setMessage("Token de autenticação inválido. Por favor, faça o login novamente.");
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    const registrarPresenca = async () => {
      try {
        setMessage("Obtendo sua localização...");

        const locationData = await new Promise<{ latitude: number; longitude: number } | null>((resolve) => {
          if (!navigator.geolocation) {
            resolve(null);
            return;
          }
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            () => resolve(null),
            { timeout: 10000 }
          );
        });

        setMessage("Registrando presença...");
        
        await recordCheckIn(
          attendanceId,
          token,
          authToken,
          locationData ?? undefined
        );

        setStatus("success");
        setMessage("Presença confirmada com sucesso!");

        setTimeout(() => {
          navigate("/");
        }, 3000);

      } catch (error: any) {
        setStatus("error");
        setMessage(error.message || "Ocorreu um erro ao tentar registrar sua presença.");
        hasFetched.current = false;
      }
    };

    registrarPresenca();
  }, [attendanceId, token, isAuthenticated, navigate, location, user, authToken]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-sm border border-slate-100 text-center space-y-6">
        
        {/* Estado: Carregando */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <CircleNotch size={48} className="text-[#0096C7] animate-spin" />
            <div>
              <h2 className="text-xl font-bold text-slate-800">Verificando...</h2>
              <p className="text-slate-500">{message}</p>
            </div>
          </div>
        )}

        {/* Estado: Sucesso */}
        {status === "success" && (
          <div className="flex flex-col items-center gap-4 py-8 animate-in fade-in zoom-in duration-300">
            <CheckCircle size={64} weight="fill" className="text-green-500" />
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Tudo Certo!</h2>
              <p className="text-slate-600 font-medium mt-2">{message}</p>
              <p className="text-sm text-slate-400 mt-4">
                Redirecionando para o início em instantes...
              </p>
            </div>
          </div>
        )}

        {/* Estado: Erro */}
        {status === "error" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <XCircle size={64} weight="fill" className="text-red-500" />
            <div>
              <h2 className="text-xl font-bold text-slate-800">Ops! Algo deu errado.</h2>
              <p className="text-red-600 mt-2 bg-red-50 p-3 rounded-lg text-sm font-medium">
                {message}
              </p>
            </div>
            <Button 
              onClick={() => navigate("/")}
              className="mt-4 bg-slate-800 hover:bg-slate-900 text-white w-full flex items-center justify-center gap-2"
            >
              <House size={20} /> Voltar ao Início
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}