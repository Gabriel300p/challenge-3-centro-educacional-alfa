import { Button } from "@shared/components/ui/button";
import { useToast } from "@shared/hooks";

export function ToastDemo() {
  const { success, error, warning, info, showToast } = useToast();

  const handleSuccessToast = () => {
    success("Operação realizada com sucesso!", "Sucesso");
  };

  const handleErrorToast = () => {
    error("Algo deu errado. Tente novamente.", "Erro");
  };

  const handleWarningToast = () => {
    warning("Atenção: Verifique os dados antes de continuar.", "Aviso");
  };

  const handleInfoToast = () => {
    info("Esta é uma informação importante.", "Informação");
  };

  const handleCustomToast = () => {
    showToast({
      type: "success",
      title: "Toast Personalizado",
      message: "Este toast tem uma ação personalizada.",
      duration: 10000,
      action: {
        label: "Desfazer",
        onClick: () => {
          info("Ação desfeita!");
        },
      },
    });
  };

  const handleToastWithDescription = () => {
    showToast({
      type: "info",
      title: "Nova Funcionalidade",
      // message: "Agora você pode expandir para ver mais detalhes.",
      description:
        "Esta é uma descrição expandida que fornece informações adicionais sobre a notificação. Você pode expandir ou recolher clicando no botão 'Mais/Menos'. Também é possível pausar permanentemente o timer clicando no ícone do relógio.",
      duration: 8000,
      action: {
        label: "Entendi",
        onClick: () => success("Obrigado por testar!"),
      },
    });
  };

  const handleLongToastWithPause = () => {
    showToast({
      type: "warning",
      title: "Notificação Importante",
      message: "Esta notificação tem timer longo mas você pode pausá-la.",
      description:
        "Use o botão do relógio para pausar permanentemente o timer. Isso é útil quando você quer manter a notificação visível por mais tempo para lê-la com calma.",
      duration: 15000,
    });
  };

  const handlePersistentToast = () => {
    showToast({
      type: "warning",
      title: "Toast Persistente",
      message: "Este toast não será removido automaticamente.",
      persistent: true,
    });
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">
          🍞 Sistema de Notificações Toast
        </h2>
        <p className="text-gray-600">
          Demonstração dos diferentes tipos de notificações toast disponíveis
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleSuccessToast}
            variant="default"
            className="bg-green-600 hover:bg-green-700"
          >
            ✅ Sucesso
          </Button>

          <Button onClick={handleErrorToast} variant="destructive">
            ❌ Erro
          </Button>

          <Button
            onClick={handleWarningToast}
            variant="outline"
            className="border-amber-500 text-amber-600 hover:bg-amber-50"
          >
            ⚠️ Aviso
          </Button>

          <Button
            onClick={handleInfoToast}
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            ℹ️ Informação
          </Button>
        </div>

        <div className="space-y-2 border-t pt-4">
          <h4 className="font-medium">Toasts Especiais</h4>
          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={handleCustomToast}
              variant="outline"
              className="w-full"
            >
              🎯 Toast com Ação
            </Button>

            <Button
              onClick={handleToastWithDescription}
              variant="outline"
              className="w-full"
            >
              📖 Toast com Descrição Expandível
            </Button>

            <Button
              onClick={handleLongToastWithPause}
              variant="outline"
              className="w-full"
            >
              ⏰ Toast com Timer Pausável
            </Button>

            <Button
              onClick={handlePersistentToast}
              variant="outline"
              className="w-full"
            >
              📌 Toast Persistente
            </Button>
          </div>
        </div>

        <div className="border-t pt-4 text-sm text-gray-600">
          <p className="mb-2">
            💡 <strong>Novas Funcionalidades:</strong>
          </p>
          <ul className="ml-4 space-y-1 text-xs">
            <li>
              • <strong>Descrição Expandível:</strong> Clique em "Mais" para ver
              detalhes
            </li>
            <li>
              • <strong>Pausa Permanente:</strong> Use o ícone do relógio (⏰)
              para pausar o timer
            </li>
            <li>
              • <strong>Animações Fluidas:</strong> Transições mais suaves e
              naturais
            </li>
            <li>
              • <strong>Hover para Pausar:</strong> Timer pausa automaticamente
              ao passar o mouse
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
