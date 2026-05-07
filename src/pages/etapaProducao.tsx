import { useState } from "react";
import {
  type Etapa, type Aeronave, type Funcionario,
  Badge, Modal, Field, ModalFooter,
  CARD_STYLE, CARD_HDR, CARD_TTL, TH_STYLE, TD_STYLE, MONO_CODE,
} from "../enums/enum";

interface EtapasPageProps {
  etapas: Etapa[];
  setEtapas: React.Dispatch<React.SetStateAction<Etapa[]>>;
  aeronaves: Aeronave[];
  funcionarios: Funcionario[];
}

interface EtapaForm { aeronave: string; nome: string; prazo: string; }

export function EtapasPage({ etapas, setEtapas, aeronaves, funcionarios }: EtapasPageProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [funcTarget, setFuncTarget] = useState<Etapa | null>(null);

  const blank: EtapaForm = { aeronave: aeronaves[0]?.codigo ?? "", nome: "", prazo: "" };
  const [form, setForm] = useState<EtapaForm>(blank);

  const upd = (k: keyof EtapaForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    if (!form.nome.trim() || !form.prazo) { alert("Nome e prazo são obrigatórios."); return; }
    setEtapas(prev => [...prev, { ...form, id: Date.now(), status: "PENDENTE", funcionarios: [] }]);
    setForm(blank);
    setCreateOpen(false);
  };

  const avancar = (etapa: Etapa) => {
    setEtapas(prev => prev.map(e => {
      if (e.id !== etapa.id) return e;
      if (e.status === "PENDENTE")  return { ...e, status: "ANDAMENTO" };
      if (e.status === "ANDAMENTO") return { ...e, status: "CONCLUIDA" };
      return e;
    }));
  };

  const addFuncionario = (etapa: Etapa, nome: string) => {
    if (etapa.funcionarios.includes(nome)) return;
    setEtapas(prev => prev.map(e => e.id === etapa.id ? { ...e, funcionarios: [...e.funcionarios, nome] } : e));
    setFuncTarget(prev => prev ? { ...prev, funcionarios: [...prev.funcionarios, nome] } : prev);
  };

  return (
    <div>
      <div style={CARD_STYLE}>
        <div style={CARD_HDR}>
          <span style={CARD_TTL}>Etapas de Produção</span>
          <button className="btn-primary" onClick={() => { setForm(blank); setCreateOpen(true); }}>+ Nova Etapa</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Aeronave", "Etapa", "Prazo", "Status", "Responsáveis", "Ações"].map(h =>
              <th key={h} style={TH_STYLE}>{h}</th>
            )}</tr>
          </thead>
          <tbody>
            {etapas.map((e, i) => (
              <tr key={e.id} className="row-hover" style={{ background: i % 2 === 0 ? "transparent" : "rgba(43,122,145,.03)" }}>
                <td style={TD_STYLE}><span style={MONO_CODE}>{e.aeronave}</span></td>
                <td style={{ ...TD_STYLE, fontWeight: 500 }}>{e.nome}</td>
                <td style={{ ...TD_STYLE, fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#5a8496" }}>{e.prazo}</td>
                <td style={TD_STYLE}><Badge value={e.status} /></td>
                <td style={{ ...TD_STYLE, fontSize: 12.5, color: "#5a8496", maxWidth: 180 }}>
                  {e.funcionarios.length > 0 ? e.funcionarios.join(", ") : <span style={{ color: "#a0bec8" }}>Nenhum</span>}
                </td>
                <td style={{ ...TD_STYLE, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <button className="btn-ghost" onClick={() => setFuncTarget(e)}>+ Responsável</button>
                  {e.status === "PENDENTE"  && <button className="btn-success" onClick={() => avancar(e)}>▶ Iniciar</button>}
                  {e.status === "ANDAMENTO" && <button className="btn-amber"   onClick={() => avancar(e)}>✓ Finalizar</button>}
                  {e.status === "CONCLUIDA" && <span style={{ color: "#0a7a5a", fontSize: 12.5 }}>✓ Concluída</span>}
                </td>
              </tr>
            ))}
            {etapas.length === 0 && (
              <tr><td colSpan={6} style={{ ...TD_STYLE, textAlign: "center", color: "#a0bec8", padding: "36px 0" }}>Nenhuma etapa cadastrada</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {createOpen && (
        <Modal title="Nova Etapa de Produção" onClose={() => setCreateOpen(false)}>
          <Field label="Aeronave">
            <select value={form.aeronave} onChange={upd("aeronave")}>
              {aeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo} — {a.modelo}</option>)}
            </select>
          </Field>
          <Field label="Nome da etapa">
            <input value={form.nome} onChange={upd("nome")} placeholder="Montagem da Fuselagem" />
          </Field>
          <Field label="Prazo de conclusão">
            <input type="date" value={form.prazo} onChange={upd("prazo")} />
          </Field>
          <ModalFooter onClose={() => setCreateOpen(false)} onConfirm={handleSave} />
        </Modal>
      )}

      {funcTarget && (
        <Modal title={`Associar Responsável — ${funcTarget.nome}`} onClose={() => setFuncTarget(null)} width={440}>
          <div style={{ fontSize: 12.5, color: "#5a8496", marginBottom: 14 }}>
            Já associados: <strong style={{ color: "#1a3a48" }}>
              {funcTarget.funcionarios.length > 0 ? funcTarget.funcionarios.join(", ") : "nenhum"}
            </strong>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {funcionarios.map(fn => {
              const jaAssoc = funcTarget.funcionarios.includes(fn.nome);
              return (
                <button
                  key={fn.id}
                  disabled={jaAssoc}
                  onClick={() => addFuncionario(funcTarget, fn.nome)}
                  style={{
                    background: jaAssoc ? "#e8f8f2" : "#f4f9fb",
                    border: jaAssoc ? "1px solid #90d4b8" : "1px solid #cde0e8",
                    borderRadius: 8, padding: "11px 16px",
                    cursor: jaAssoc ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    fontFamily: "DM Sans, sans-serif", transition: "all .12s", opacity: jaAssoc ? 0.8 : 1,
                  }}
                >
                  <span style={{ color: "#1a3a48", fontSize: 13.5 }}>{fn.nome}</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <Badge value={fn.nivelPermissao} />
                    {jaAssoc && <span style={{ color: "#0a7a5a", fontSize: 13 }}>✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
          <ModalFooter onClose={() => setFuncTarget(null)} onConfirm={() => setFuncTarget(null)} confirmLabel="Fechar" variant="outline" />
        </Modal>
      )}
    </div>
  );
}
