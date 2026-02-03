import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { useAuth } from "../../../providers/useAuth"; 
import { FloppyDiskBackIcon, XCircleIcon } from "@phosphor-icons/react";

function Input({ label, ...props }: any) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
                {label}<span className="text-red-500">*</span>
            </label>
            <input
                {...props}
                className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0096C7] bg-white text-sm"
            />
        </div>
    );
}

function Select({ label, options = [], ...props }: any) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
                {label}<span className="text-red-500">*</span>
            </label>
            <select
                {...props}
                className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0096C7] bg-white text-sm"
            >
                <option value="">Selecionar opção</option>
                {options.map((option: string) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function NovaAulaPage() {
    const navigate = useNavigate();
    const { user, token } = useAuth(); //

    const [formData, setFormData] = useState({
        subject: "",
        date: "",
        timeInicio: "",
        timeFim: "",
        tolerance: "",
        recurrence: "Sem recorrência"
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        setLoading(true);

        // Formata a data e hora para o padrão ISO solicitado
        const combinedDate = new Date(`${formData.date}T${formData.timeInicio}:00Z`).toISOString();

        const payload = {
            subject: formData.subject,
            teacherId: user?.id || "697c961d82e9beba95aa2342", // Fallback conforme exemplo
            date: combinedDate,
            students: [
                {
                    studentId: "697c961d82e9beba95aa2344", // Exemplo fixo conforme solicitado
                    name: "João Silva",
                    status: "Presente"
                }
            ]
        };

        try {
            const response = await fetch("http://localhost:3003/api/Attendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` //
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Aula criada com sucesso!");
                navigate("/aulas");
            } else {
                console.error("Erro ao salvar aula");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto p-8 space-y-6 bg-[#F8FAFC] min-h-screen">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Criar nova aula</h1>
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
                            {loading ? "Salvando..." : "Salvar aula"}
                        </Button>
                    </div>
                </div>

                <Divider />

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Linha 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Título da aula"
                            placeholder="Digite o título"
                            value={formData.subject}
                            onChange={(e: any) => setFormData({ ...formData, subject: e.target.value })}
                            required
                        />
                        <Input
                            label="Tolerância para check-in (minutos)"
                            placeholder="Digite a qtde de tolerância em minutos"
                            type="number"
                            value={formData.tolerance}
                            onChange={(e: any) => setFormData({ ...formData, tolerance: e.target.value })}
                            required
                        />
                    </div>

                    {/* Linha 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            label="Data da aula"
                            type="date"
                            value={formData.date}
                            onChange={(e: any) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                        <Select
                            label="Recorrência"
                            options={["Sem recorrência", "Semanal", "Mensal"]}
                            value={formData.recurrence}
                            onChange={(e: any) => setFormData({ ...formData, recurrence: e.target.value })}
                            required
                        />
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700">Horário<span className="text-red-500">*</span></label>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="time"
                                    className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0096C7] text-sm"
                                    onChange={(e) => setFormData({ ...formData, timeInicio: e.target.value })}
                                    required
                                />
                                <input
                                    type="time"
                                    className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0096C7] text-sm"
                                    onChange={(e) => setFormData({ ...formData, timeFim: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Editor Placeholder */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Conteúdo abordado (Sumário)<span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2 h-48 border border-slate-200 rounded-md bg-white p-4 text-slate-400 text-sm italic">
                            Será implementado um editor de texto aqui no futuro.
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700">
                            Observações do professor (Opcional)
                        </label>
                        <textarea
                            className="mt-2 w-full h-28 border border-slate-200 rounded-md p-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#0096C7] text-sm"
                            placeholder="Digite sua mensagem..."
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}