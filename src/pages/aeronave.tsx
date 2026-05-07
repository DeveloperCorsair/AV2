import { useState } from "react";
import {
    type Aeronave,
    TIPO_AERONAVE,
    Badge,
    Modal,
    StatCard,
    FormRow,
    Field,
    ModalFooter,
    CARD_STYLE,
    CARD_HDR,
    CARD_TTL,
    TH_STYLE,
    TD_STYLE,
    MONO_CODE,
} from "../enums/enum";

interface AeronavesPageProps {
    aeronaves: Aeronave[];
    setAeronaves: React.Dispatch<React.SetStateAction<Aeronave[]>>;
}

interface AeronaveForm {
    codigo: string;
    modelo: string;
    tipo: string;
    capacidade: string;
    alcance: string;
}

export function AeronavesPage({ aeronaves, setAeronaves }: AeronavesPageProps) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Aeronave | null>(null);

    const blank: AeronaveForm = { codigo: "", modelo: "", tipo: "COMERCIAL", capacidade: "", alcance: "" };
    const [form, setForm] = useState<AeronaveForm>(blank);

    const upd = (k: keyof AeronaveForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm(p => ({ ...p, [k]: e.target.value }));

    const openCreate = () => { setForm(blank); setCreateOpen(true); };
    const openEdit = (a: Aeronave) => {
        setForm({ ...a, capacidade: String(a.capacidade), alcance: String(a.alcance) });
        setEditTarget(a);
    };

    const handleSave = () => {
        if (!form.codigo.trim() || !form.modelo.trim()) { alert("Código e Modelo são obrigatórios."); return; }
        if (editTarget) {
            setAeronaves(prev => prev.map(a =>
                a.codigo === editTarget.codigo
                    ? { ...form, capacidade: +form.capacidade, alcance: +form.alcance }
                    : a
            ));
            setEditTarget(null);
        } else {
            if (aeronaves.find(a => a.codigo === form.codigo)) { alert(`O código "${form.codigo}" já está cadastrado.`); return; }
            setAeronaves(prev => [...prev, { ...form, capacidade: +form.capacidade, alcance: +form.alcance }]);
            setCreateOpen(false);
        }
    };

    const AeronaveForm = () => (
        <>
            <FormRow>
                <Field label="Código único">
                    <input value={form.codigo} onChange={upd("codigo")} placeholder="EMB-000-001"
                        disabled={!!editTarget} style={editTarget ? { opacity: 0.5 } : {}} />
                </Field>
                <Field label="Modelo">
                    <input value={form.modelo} onChange={upd("modelo")} placeholder="Embraer E195-E2" />
                </Field>
            </FormRow>
            <Field label="Tipo de Aeronave">
                <select value={form.tipo} onChange={upd("tipo")}>
                    {TIPO_AERONAVE.map(t => <option key={t}>{t}</option>)}
                </select>
            </Field>
            <FormRow>
                <Field label="Capacidade (passageiros)">
                    <input type="number" value={form.capacidade} onChange={upd("capacidade")} placeholder="146" />
                </Field>
                <Field label="Alcance (km)">
                    <input type="number" value={form.alcance} onChange={upd("alcance")} placeholder="4800" />
                </Field>
            </FormRow>
        </>
    );

    return (
        <div>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
                <StatCard num={aeronaves.length} label="Total de Aeronaves" />
                <StatCard num={aeronaves.filter(a => a.tipo === "COMERCIAL").length} label="Comerciais" color="#38bdf8" />
                <StatCard num={aeronaves.filter(a => a.tipo === "MILITAR").length} label="Militares" color="#f59e0b" />
                <StatCard num={aeronaves.reduce((s, a) => s + a.capacidade, 0).toLocaleString("pt-BR")} label="Capacidade Total (pax)" color="#10b981" />
            </div>

            <div style={CARD_STYLE}>
                <div style={CARD_HDR}>
                    <span style={CARD_TTL}>Registro de Aeronaves</span>
                    <button className="btn-primary" onClick={openCreate}>+ Nova Aeronave</button>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>{["Código", "Modelo", "Tipo", "Capacidade", "Alcance", "Ações"].map(h =>
                            <th key={h} style={TH_STYLE}>{h}</th>
                        )}</tr>
                    </thead>
                    <tbody>
                        {aeronaves.map((a, i) => (
                            <tr key={a.codigo} className="row-hover" style={{ background: i % 2 === 0 ? "transparent" : "rgba(5,10,18,.5)" }}>
                                <td style={TD_STYLE}><span style={MONO_CODE}>{a.codigo}</span></td>
                                <td style={{ ...TD_STYLE, fontWeight: 500 }}>{a.modelo}</td>
                                <td style={TD_STYLE}><Badge value={a.tipo} /></td>
                                <td style={{ ...TD_STYLE, color: "#94a3b8" }}>{a.capacidade.toLocaleString("pt-BR")} pax</td>
                                <td style={{ ...TD_STYLE, color: "#94a3b8" }}>{a.alcance.toLocaleString("pt-BR")} km</td>
                                <td style={TD_STYLE}>
                                    <button className="btn-ghost" onClick={() => openEdit(a)}>✎ Editar</button>
                                </td>
                            </tr>
                        ))}
                        {aeronaves.length === 0 && (
                            <tr><td colSpan={6} style={{ ...TD_STYLE, textAlign: "center", color: "#1e3a5f", padding: "36px 0" }}>Nenhuma aeronave cadastrada</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {createOpen && (
                <Modal title="Nova Aeronave" onClose={() => setCreateOpen(false)}>
                    <AeronaveForm />
                    <ModalFooter onClose={() => setCreateOpen(false)} onConfirm={handleSave} />
                </Modal>
            )}

            {editTarget && (
                <Modal title={`Editar — ${editTarget.codigo}`} onClose={() => setEditTarget(null)}>
                    <div style={{ background: "rgba(245,158,11,.06)", border: "1px solid rgba(245,158,11,.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12.5, color: "#f59e0b" }}>
                        O código da aeronave não pode ser alterado após o cadastro.
                    </div>
                    <AeronaveForm />
                    <ModalFooter onClose={() => setEditTarget(null)} onConfirm={handleSave} confirmLabel="Atualizar Dados" variant="primary" />
                </Modal>
            )}
        </div>
    );
}
