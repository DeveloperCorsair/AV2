import { useState } from "react";
import {
  type Peca, type Aeronave,
  TIPO_PECA, STATUS_PECA, BADGE_CONFIG,
  Badge, Modal, FormRow, Field, ModalFooter,
  CARD_STYLE, CARD_HDR, CARD_TTL, TH_STYLE, TD_STYLE, MONO_CODE,
} from "../enums/enum";

interface PecasPageProps {
  pecas: Peca[];
  setPecas: React.Dispatch<React.SetStateAction<Peca[]>>;
  aeronaves: Aeronave[];
}

interface PecaForm { aeronave: string; nome: string; tipo: string; fornecedor: string; status: string; }

export function PecasPage({ pecas, setPecas, aeronaves }: PecasPageProps) {
  const [createOpen,   setCreateOpen]   = useState(false);
  const [editTarget,   setEditTarget]   = useState<Peca | null>(null);
  const [statusTarget, setStatusTarget] = useState<Peca | null>(null);

  const blank: PecaForm = { aeronave: aeronaves[0]?.codigo ?? "", nome: "", tipo: "NACIONAL", fornecedor: "", status: "EM_PRODUCAO" };
  const [form, setForm] = useState<PecaForm>(blank);

  const upd = (k: keyof PecaForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const openCreate = () => { setForm(blank); setCreateOpen(true); };
  const openEdit   = (p: Peca) => { setForm({ aeronave: p.aeronave, nome: p.nome, tipo: p.tipo, fornecedor: p.fornecedor, status: p.status }); setEditTarget(p); };

  const handleSave = () => {
    if (!form.nome.trim() || !form.fornecedor.trim()) { alert("Nome e fornecedor são obrigatórios."); return; }

    if (editTarget) {
      setPecas(prev => prev.map(p => p.id === editTarget.id ? { ...p, ...form } : p));
      setEditTarget(null);
    } else {
      setPecas(prev => [...prev, { ...form, id: Date.now() }]);
      setForm(blank);
      setCreateOpen(false);
    }
  };

  const applyStatus = (novoStatus: string) => {
    if (!statusTarget) return;
    setPecas(prev => prev.map(p => p.id === statusTarget.id ? { ...p, status: novoStatus } : p));
    setStatusTarget(null);
  };

  const PecaForm = () => (
    <>
      <Field label="Aeronave associada">
        <select value={form.aeronave} onChange={upd("aeronave")}>
          {aeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo} — {a.modelo}</option>)}
        </select>
      </Field>
      <Field label="Nome da peça">
        <input value={form.nome} onChange={upd("nome")} placeholder="Motor Turbofan TF-900" />
      </Field>
      <FormRow>
        <Field label="Tipo">
          <select value={form.tipo} onChange={upd("tipo")}>{TIPO_PECA.map(t => <option key={t}>{t}</option>)}</select>
        </Field>
        <Field label="Status">
          <select value={form.status} onChange={upd("status")}>{STATUS_PECA.map(t => <option key={t}>{t}</option>)}</select>
        </Field>
      </FormRow>
      <Field label="Fornecedor">
        <input value={form.fornecedor} onChange={upd("fornecedor")} placeholder="MotorTech International" />
      </Field>
    </>
  );

  return (
    <div>
      <div style={CARD_STYLE}>
        <div style={CARD_HDR}>
          <span style={CARD_TTL}>Peças e Componentes</span>
          <button className="btn-primary" onClick={openCreate}>+ Nova Peça</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Aeronave", "Nome da Peça", "Tipo", "Fornecedor", "Status", "Ações"].map(h =>
              <th key={h} style={TH_STYLE}>{h}</th>
            )}</tr>
          </thead>
          <tbody>
            {pecas.map((p, i) => (
              <tr key={p.id} className="row-hover" style={{ background: i % 2 === 0 ? "transparent" : "rgba(43,122,145,.03)" }}>
                <td style={TD_STYLE}><span style={MONO_CODE}>{p.aeronave}</span></td>
                <td style={{ ...TD_STYLE, fontWeight: 500 }}>{p.nome}</td>
                <td style={TD_STYLE}><Badge value={p.tipo} /></td>
                <td style={{ ...TD_STYLE, color: "#5a8496" }}>{p.fornecedor}</td>
                <td style={TD_STYLE}><Badge value={p.status} /></td>
                <td style={{ ...TD_STYLE, display: "flex", gap: 6 }}>
                  <button className="btn-ghost" onClick={() => openEdit(p)}>✎ Editar</button>
                  <button className="btn-amber" onClick={() => setStatusTarget(p)}>↺ Status</button>
                </td>
              </tr>
            ))}
            {pecas.length === 0 && (
              <tr><td colSpan={6} style={{ ...TD_STYLE, textAlign: "center", color: "#a0bec8", padding: "36px 0" }}>Nenhuma peça cadastrada</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: nova peça */}
      {createOpen && (
        <Modal title="Nova Peça / Componente" onClose={() => setCreateOpen(false)}>
          <PecaForm />
          <ModalFooter onClose={() => setCreateOpen(false)} onConfirm={handleSave} />
        </Modal>
      )}

      {/* Modal: editar peça */}
      {editTarget && (
        <Modal title={`Editar Peça — ${editTarget.nome}`} onClose={() => setEditTarget(null)}>
          <PecaForm />
          <ModalFooter onClose={() => setEditTarget(null)} onConfirm={handleSave} confirmLabel="Atualizar Peça" />
        </Modal>
      )}

      {/* Modal: atualizar status */}
      {statusTarget && (
        <Modal title="Atualizar Status da Peça" onClose={() => setStatusTarget(null)} width={420}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1a3a48", marginBottom: 6 }}>{statusTarget.nome}</div>
            <div style={{ fontSize: 12.5, color: "#5a8496" }}>Status atual: <Badge value={statusTarget.status} /></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {STATUS_PECA.map(s => (
              <button
                key={s}
                onClick={() => applyStatus(s)}
                style={{
                  background: s === statusTarget.status ? "#eef7fa" : "#f4f9fb",
                  border: s === statusTarget.status ? "1.5px solid #2B7A91" : "1px solid #cde0e8",
                  borderRadius: 8, padding: "11px 16px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  fontFamily: "DM Sans, sans-serif", transition: "all .12s",
                  color: s === statusTarget.status ? "#1d6a82" : "#5a8496", fontSize: 13.5,
                }}
              >
                <span>{BADGE_CONFIG[s]?.label ?? s}</span>
                <Badge value={s} />
              </button>
            ))}
          </div>
          <ModalFooter onClose={() => setStatusTarget(null)} onConfirm={() => setStatusTarget(null)} confirmLabel="Fechar" variant="outline" />
        </Modal>
      )}
    </div>
  );
}
