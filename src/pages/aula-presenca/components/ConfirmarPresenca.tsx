import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  CircleNotch,
  House,
  XCircle,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../providers/useAuth";
import { recordCheckIn } from "../../aulas/services/attendance.service";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro ao tentar registrar sua presenca.";
}

export function ConfirmarPresenca() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, token: authToken } = useAuth();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Processando sua presenÃ§a...");

  const hasFetched = useRef(false);

  const attendanceId = searchParams.get("attendanceId");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location.pathname + location.search },
        replace: true,
      });
      return;
    }

    if (!attendanceId || !token) {
      setStatus("error");
      setMessage("Link de presenÃ§a invÃ¡lido ou incompleto.");
      return;
    }

    if (!authToken) {
      setStatus("error");
      setMessage(
        "Token de autenticaÃ§Ã£o invÃ¡lido. Por favor, faÃ§a o login novamente."
      );
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    const registrarPresenca = async () => {
      try {
        setMessage("Obtendo sua localizaÃ§Ã£o...");

        const locationData = await new Promise<{
          latitude: number;
          longitude: number;
        } | null>((resolve) => {
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
        setMessage("PresenÃ§a confirmada com sucesso!");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error: unknown) {
        setStatus("error");
        setMessage(getErrorMessage(error));
        hasFetched.current = false;
      }
    };

    registrarPresenca();
  }, [
    attendanceId,
    token,
    isAuthenticated,
    navigate,
    location,
    user,
    authToken,
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white border shadow-sm rounded-2xl border-slate-100">
        {/* Estado: Carregando */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <CircleNotch size={48} className="text-[#0096C7] animate-spin" />
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Verificando...
              </h2>
              <p className="text-slate-500">{message}</p>
            </div>
          </div>
        )}

        {/* Estado: Sucesso */}
        {status === "success" && (
          <div className="flex flex-col items-center gap-4 py-8 duration-300 animate-in fade-in zoom-in">
            <CheckCircle size={64} weight="fill" className="text-green-500" />
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Tudo Certo!</h2>
              <p className="mt-2 font-medium text-slate-600">{message}</p>
              <p className="mt-4 text-sm text-slate-400">
                Redirecionando para o inÃ­cio em instantes...
              </p>
            </div>
          </div>
        )}

        {/* Estado: Erro */}
        {status === "error" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <XCircle size={64} weight="fill" className="text-red-500" />
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Ops! Algo deu errado.
              </h2>
              <p className="p-3 mt-2 text-sm font-medium text-red-600 rounded-lg bg-red-50">
                {message}
              </p>
            </div>
            <Button
              onClick={() => navigate("/")}
              className="flex items-center justify-center w-full gap-2 mt-4 text-white bg-slate-800 hover:bg-slate-900"
            >
              <House size={20} /> Voltar ao InÃ­cio
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
