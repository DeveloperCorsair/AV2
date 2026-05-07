import { useState } from "react";
import {
  type Peca,
  type Aeronave,
  TIPO_PECA,
  STATUS_PECA,
  BADGE_CONFIG,
  Badge,
  Modal,
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

interface PecasPageProps {
  pecas: Peca[];
  setPecas: React.Dispatch<React.SetStateAction<Peca[]>>;
  aeronaves: Aeronave[];
}

interface PecaForm {
  aeronave: string;
  nome: string;
  tipo: string;
  fornecedor: string;
  status: string;
}

export function PecasPage({ pecas, setPecas, aeronaves }: PecasPageProps) {
  const [createOpen,   setCreateOpen]   = useState(false);
  const [statusTarget, setStatusTarget] = useState<Peca | null>(null);

  const blank: PecaForm = { aeronave: aeronaves[0]?.codigo ?? "", nome: "", tipo: "NACIONAL", fornecedor: "", status: "EM_PRODUCAO" };
  const [form, setForm] = useState<PecaForm>(blank);

  const upd = (k: keyof PecaForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    if (!form.nome.trim() || !form.fornecedor.trim()) { alert("Nome e fornecedor são obrigatórios."); return; }
    setPecas(prev => [...prev, { ...form, id: Date.now() }]);
    setForm(blank);
    setCreateOpen(false);
  };

  const applyStatus = (novoStatus: string) => {
    if (!statusTarget) return;
    setPecas(prev => prev.map(p => p.id === statusTarget.id ? { ...p, status: novoStatus } : p));
    setStatusTarget(null);
  };

  return (
    <div>
      <div style={CARD_STYLE}>
        <div style={CARD_HDR}>
          <span style={CARD_TTL}>Peças e Componentes</span>
          <button className="btn-primary" onClick={() => { setForm(blank); setCreateOpen(true); }}>+ Nova Peça</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Aeronave", "Nome da Peça", "Tipo", "Fornecedor", "Status", "Ação"].map(h =>
              <th key={h} style={TH_STYLE}>{h}</th>
            )}</tr>
          </thead>
          <tbody>
            {pecas.map((p, i) => (
              <tr key={p.id} className="row-hover" style={{ background: i % 2 === 0 ? "transparent" : "rgba(5,10,18,.5)" }}>
                <td style={TD_STYLE}><span style={MONO_CODE}>{p.aeronave}</span></td>
                <td style={{ ...TD_STYLE, fontWeight: 500 }}>{p.nome}</td>
                <td style={TD_STYLE}><Badge value={p.tipo} /></td>
                <td style={{ ...TD_STYLE, color: "#64748b" }}>{p.fornecedor}</td>
                <td style={TD_STYLE}><Badge value={p.status} /></td>
                <td style={TD_STYLE}>
                  <button className="btn-amber" onClick={() => setStatusTarget(p)}>↺ Atualizar Status</button>
                </td>
              </tr>
            ))}
            {pecas.length === 0 && (
              <tr><td colSpan={6} style={{ ...TD_STYLE, textAlign: "center", color: "#1e3a5f", padding: "36px 0" }}>Nenhuma peça cadastrada</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: nova peça */}
      {createOpen && (
        <Modal title="Nova Peça / Componente" onClose={() => setCreateOpen(false)}>
          <Field label="Aeronave associada">
            <select value={form.aeronave} onChange={upd("aeronave")}>
              {aeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo} — {a.modelo}</option>)}
            </select>
          </Field>
          <Field label="Nome da peça">
            <input value={form.nome} onChange={upd("nome")} placeholder="Motor Pratt & Whitney GTF" />
          </Field>
          <FormRow>
            <Field label="Tipo">
              <select value={form.tipo} onChange={upd("tipo")}>{TIPO_PECA.map(t => <option key={t}>{t}</option>)}</select>
            </Field>
            <Field label="Status inicial">
              <select value={form.status} onChange={upd("status")}>{STATUS_PECA.map(t => <option key={t}>{t}</option>)}</select>
            </Field>
          </FormRow>
          <Field label="Fornecedor">
            <input value={form.fornecedor} onChange={upd("fornecedor")} placeholder="Pratt & Whitney" />
          </Field>
          <ModalFooter onClose={() => setCreateOpen(false)} onConfirm={handleSave} />
        </Modal>
      )}

      {/* Modal: atualizar status */}
      {statusTarget && (
        <Modal title="Atualizar Status da Peça" onClose={() => setStatusTarget(null)} width={420}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13.5, color: "#94a3b8", marginBottom: 6 }}>{statusTarget.nome}</div>
            <div style={{ fontSize: 12, color: "#3d5a78" }}>Status atual: <Badge value={statusTarget.status} /></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {STATUS_PECA.map(s => (
              <button
                key={s}
                onClick={() => applyStatus(s)}
                style={{
                  background: s === statusTarget.status ? "rgba(56,189,248,.08)" : "rgba(255,255,255,.02)",
                  border: s === statusTarget.status ? "1px solid #38bdf8" : "1px solid #1a3050",
                  borderRadius: 8, padding: "11px 16px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  color: s === statusTarget.status ? "#38bdf8" : "#64748b",
                  fontSize: 13.5, fontFamily: "DM Sans, sans-serif", transition: "all .12s",
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
