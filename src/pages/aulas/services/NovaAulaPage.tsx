import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { useAuth } from "../../../providers/useAuth";
import { useAulaPresenca } from "../../aula-presenca/hooks/useAulaPresenca";
import {
  FloppyDiskBackIcon,
  XCircleIcon,
} from "@phosphor-icons/react";

export function Input({ label, required, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="px-3 py-2 border border-slate-200 rounded-md
        focus:outline-none focus:ring-1 focus:ring-[#0096C7]
        bg-white text-sm"
      />
    </div>
  );
}

export function Select({ label, options = [], required, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        className="px-3 py-2 border border-slate-200 rounded-md
        focus:outline-none focus:ring-1 focus:ring-[#0096C7]
        bg-white text-sm"
      >
        <option value="">Selecionar opção</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function NovaAulaPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, token } = useAuth();
  const { aulas } = useAulaPresenca(token);

  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    date: "",
    startTime: "",
    endTime: "",
    toleranceMinutes: "",
    recurrence: "",
    contentAborted: "",
    professorNotes: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 🔥 PREENCHER CAMPOS SE FOR EDIÇÃO (SEM CHAMAR BACKEND)
  useEffect(() => {
    if (!id || !aulas.length) return;

    const aula = aulas.find((a) => a._id === id);
    if (!aula) return;

    setForm({
      subject: aula.subject || "",
      date: aula.date ? aula.date.slice(0, 10) : "",
      startTime: aula.startTime
        ? aula.startTime.slice(11, 16)
        : "",
      endTime: aula.endTime
        ? aula.endTime.slice(11, 16)
        : "",
      toleranceMinutes:
        aula.toleranceMinutes?.toString() || "",
      recurrence: aula.recurrence || "",
      contentAborted: aula.contentAborted || "",
      professorNotes: aula.professorNotes || "",
    });
  }, [id, aulas]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user) return;

    setLoading(true);

    try {
      const payload = {
        subject: form.subject,
        teacherId: user.id,
        date: new Date(form.date),
        startTime: new Date(`${form.date}T${form.startTime}`),
        endTime: new Date(`${form.date}T${form.endTime}`),
        toleranceMinutes: Number(form.toleranceMinutes),
        recurrence: form.recurrence,
        contentAborted: form.contentAborted,
        professorNotes: form.professorNotes,
        status: "aguardando",
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_ATTENDANCE}/api/attendance${
          isEditMode ? `/${id}` : ""
        }`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao salvar aula");
      }

      navigate("/aulas");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar a aula");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-8 bg-[#F8FAFC] min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode
                ? "Editar aula"
                : "Criar nova aula"}
            </h1>
            <p className="text-sm text-slate-500">
              A aula será vinculada automaticamente aos seus alunos.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/aulas")}
              className="flex gap-2 text-slate-500 border-slate-200"
            >
              <XCircleIcon size={20} />
              Cancelar
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#0096C7] hover:bg-[#0077B6] text-white flex gap-2"
            >
              <FloppyDiskBackIcon size={20} weight="fill" />
              {loading
                ? "Salvando..."
                : isEditMode
                ? "Salvar alterações"
                : "Salvar aula"}
            </Button>
          </div>
        </div>

        <Divider />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Título da aula"
              required
              value={form.subject}
              onChange={(e: any) =>
                handleChange("subject", e.target.value)
              }
            />

            <Input
              label="Tolerância para check-in (minutos)"
              required
              type="number"
              value={form.toleranceMinutes}
              onChange={(e: any) =>
                handleChange(
                  "toleranceMinutes",
                  e.target.value
                )
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Data da aula"
              required
              type="date"
              value={form.date}
              onChange={(e: any) =>
                handleChange("date", e.target.value)
              }
            />

            <Select
              label="Recorrência"
              required
              options={[
                "Sem recorrência",
                "Semanal",
                "Mensal",
              ]}
              value={form.recurrence}
              onChange={(e: any) =>
                handleChange("recurrence", e.target.value)
              }
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">
                Horário<span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={form.startTime}
                  className="px-3 py-2 border border-slate-200 rounded-md"
                  onChange={(e) =>
                    handleChange(
                      "startTime",
                      e.target.value
                    )
                  }
                  required
                />
                <input
                  type="time"
                  value={form.endTime}
                  className="px-3 py-2 border border-slate-200 rounded-md"
                  onChange={(e) =>
                    handleChange(
                      "endTime",
                      e.target.value
                    )
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Conteúdo abordado (Sumário)
              <span className="text-red-500">*</span>
            </label>
            <textarea
              className="mt-2 w-full h-40 border border-slate-200 rounded-md p-3 text-sm"
              value={form.contentAborted}
              onChange={(e) =>
                handleChange(
                  "contentAborted",
                  e.target.value
                )
              }
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Observações do professor
            </label>
            <textarea
              className="mt-2 w-full h-28 border border-slate-200 rounded-md p-3 text-sm"
              value={form.professorNotes}
              onChange={(e) =>
                handleChange(
                  "professorNotes",
                  e.target.value
                )
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
