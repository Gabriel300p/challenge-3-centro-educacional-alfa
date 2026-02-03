import { CheckCircleIcon, PlayIcon, QrCodeIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function StatusCard() {
  // "PRONTO", "AGUARDANDO", "EM_ANDAMENTO", "FINALIZADA"
  const status = "pronto"; 

  const config = {
    pronto: {
      bg: "bg-green-50",
      border: "border-green-100",
      icon: <CheckCircleIcon size={24} weight="fill" className="text-green-500" />,
      title: "Pronto para Iniciar",
      desc: "Mínimo de alunos atingido. Você pode começar a aula!",
      action: "Iniciar aula",
      variant: "bg-green-600 hover:bg-green-700"
    }
  };

  const current = config[status];

  return (
    <div className={`p-6 rounded-2xl border ${current.border} ${current.bg} shadow-sm transition-all`}>
      <div className="flex items-center gap-4 mb-4">
        {current.icon}
        <div>
          <h3 className="font-bold text-slate-800 text-lg">{current.title}</h3>
          <p className="text-sm text-slate-600">{current.desc}</p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button className={`${current.variant} text-white flex-1 flex gap-2 h-12 rounded-xl font-bold`}>
          <PlayIcon size={20} weight="fill" />
          {current.action}
        </Button>
        <Button variant="outline" className="border-slate-200 bg-white text-slate-700 flex gap-2 h-12 px-6 rounded-xl font-bold">
          <QrCodeIcon size={20} weight="bold" />
          Ver QR Code
        </Button>
      </div>
    </div>
  );
}