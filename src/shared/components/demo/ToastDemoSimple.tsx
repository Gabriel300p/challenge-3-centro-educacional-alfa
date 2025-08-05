import { Button } from "@shared/components/ui/button";
import { useToast } from "@shared/hooks";
import { AlertTriangle, Bell, CheckCircle, Info, Zap } from "lucide-react";

export function ToastDemoSimple() {
  const { success, error, warning, info } = useToast();

  const handleBasicSuccess = () => {
    success("Operação realizada com sucesso!");
  };

  const handleSuccessWithMessage = () => {
    success(
      "Dados salvos com sucesso!",
      "Todas as informações foram armazenadas no sistema.",
    );
  };

  const handleSuccessWithDescription = () => {
    success(
      "Sistema atualizado!",
      "Nova versão instalada com sucesso.",
      "A nova versão inclui melhorias de performance, correções de bugs e novas funcionalidades para uma melhor experiência do usuário.",
    );
  };

  const handleWarning = () => {
    warning(
      "Atenção: Manutenção programada",
      "Sistema indisponível no sábado das 2h às 6h.",
      "Durante este período, algumas funcionalidades podem estar temporariamente indisponíveis. Recomendamos salvar seu trabalho.",
    );
  };

  const handleError = () => {
    error(
      "Erro de conexão",
      "Falha ao conectar com o servidor.",
      "Verifique sua conexão com a internet e tente novamente. Se o problema persistir, contate o suporte.",
    );
  };

  const handleInfo = () => {
    info(
      "Nova funcionalidade disponível",
      "Sistema de notificações aprimorado.",
      "Agora você pode expandir descrições e pausar notificações importantes para ler com calma.",
    );
  };

  return (
    <div className="space-y-4 rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-xl font-bold text-slate-700">
          🍞 Sistema de Toast Renovado
        </h2>
        <p className="text-sm text-slate-500">
          Teste as novas funcionalidades: design limpo, descrições expandíveis e
          controle de pausa
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleBasicSuccess}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <CheckCircle className="h-4 w-4 text-green-600" />
          Sucesso Básico
        </Button>

        <Button
          onClick={handleSuccessWithMessage}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <CheckCircle className="h-4 w-4 text-green-600" />
          Sucesso + Mensagem
        </Button>

        <Button
          onClick={handleSuccessWithDescription}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Bell className="h-4 w-4 text-blue-600" />
          Com Descrição
        </Button>

        <Button
          onClick={handleWarning}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          Aviso
        </Button>

        <Button
          onClick={handleError}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Zap className="h-4 w-4 text-red-600" />
          Erro
        </Button>

        <Button
          onClick={handleInfo}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Info className="h-4 w-4 text-blue-600" />
          Informação
        </Button>
      </div>

      <div className="mt-6 rounded-lg bg-slate-50 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-700">
          ✨ Novidades:
        </h3>
        <ul className="space-y-1 text-xs text-slate-600">
          <li>• Design limpo com fundo branco e ícones coloridos</li>
          <li>• Títulos em slate-700, mensagens em slate-500</li>
          <li>• Descrições expandíveis com botão chevron</li>
          <li>• Controle de pausa com contador dinâmico</li>
          <li>• Animações mais suaves e naturais</li>
        </ul>
      </div>
    </div>
  );
}
