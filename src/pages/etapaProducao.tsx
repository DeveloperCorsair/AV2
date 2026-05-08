import { useState } from "react";
import {
  type Etapa, type Aeronave, type Funcionario,
  STATUS_ETAPA,
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
  const [editTarget, setEditTarget]  = useState<Etapa | null>(null);
  const [funcTarget, setFuncTarget]  = useState<Etapa | null>(null);

  const blank: EtapaForm = { aeronave: aeronaves[0]?.codigo ?? "", nome: "", prazo: "" };
  const [form, setForm] = useState<EtapaForm>(blank);

  const upd = (k: keyof EtapaForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const openCreate = () => { setForm(blank); setCreateOpen(true); };
  const openEdit   = (e: Etapa) => { setForm({ aeronave: e.aeronave, nome: e.nome, prazo: e.prazo }); setEditTarget(e); };

  const handleSave = () => {
    if (!form.nome.trim() || !form.prazo) { alert("Nome e prazo são obrigatórios."); return; }

    if (editTarget) {
      setEtapas(prev => prev.map(e => e.id === editTarget.id ? { ...e, ...form } : e));
      setEditTarget(null);
    } else {
      setEtapas(prev => [...prev, { ...form, id: Date.now(), status: "PENDENTE", funcionarios: [] }]);
      setForm(blank);
      setCreateOpen(false);
    }
  };

  const avancar = (etapa: Etapa) => {
    setEtapas(prev => prev.map(e => {
      if (e.id !== etapa.id) return e;
      if (e.status === "PENDENTE")  return { ...e, status: "ANDAMENTO" };
      if (e.status === "ANDAMENTO") return { ...e, status: "CONCLUIDA" };
      return e;
    }));
  };

  const addFuncionario = (etapaId: number, nomeFuncionario: string) => {
    setEtapas(prev => prev.map(e => {
      if (e.id !== etapaId || e.funcionarios.includes(nomeFuncionario)) return e;
      return { ...e, funcionarios: [...e.funcionarios, nomeFuncionario] };
    }));
    // Atualiza funcTarget para refletir mudança imediata
    setFuncTarget(prev => {
      if (!prev || prev.id !== etapaId) return prev;
      if (prev.funcionarios.includes(nomeFuncionario)) return prev;
      return { ...prev, funcionarios: [...prev.funcionarios, nomeFuncionario] };
    });
  };

  const EtapaForm = () => (
    <>
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
    </>
  );

  return (
    <div>
      <div style={CARD_STYLE}>
        <div style={CARD_HDR}>
          <span style={CARD_TTL}>Etapas de Produção</span>
          <button className="btn-primary" onClick={openCreate}>+ Nova Etapa</button>
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
                <td style={{ ...TD_STYLE, color: "#5a8496", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>{e.prazo}</td>
                <td style={TD_STYLE}><Badge value={e.status} /></td>
                <td style={{ ...TD_STYLE, fontSize: 12, color: "#5a8496", maxWidth: 160 }}>
                  {e.funcionarios.length > 0
                    ? e.funcionarios.join(", ")
                    : <span style={{ color: "#b0cdd6" }}>Nenhum</span>
                  }
                </td>
                <td style={{ ...TD_STYLE, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <button className="btn-ghost" onClick={() => openEdit(e)}>✎ Editar</button>
                  <button className="btn-ghost" style={{ borderColor: "rgba(29,92,114,.4)", color: "#2B7A91" }} onClick={() => setFuncTarget(e)}>+ Resp.</button>
                  {e.status === "PENDENTE"  && <button className="btn-success" onClick={() => avancar(e)}>▶ Iniciar</button>}
                  {e.status === "ANDAMENTO" && <button className="btn-amber"   onClick={() => avancar(e)}>✓ Finalizar</button>}
                  {e.status === "CONCLUIDA" && <span style={{ color: "#0e9068", fontSize: 12.5, alignSelf: "center" }}>✓ Concluída</span>}
                </td>
              </tr>
            ))}
            {etapas.length === 0 && (
              <tr><td colSpan={6} style={{ ...TD_STYLE, textAlign: "center", color: "#a0bec8", padding: "36px 0" }}>Nenhuma etapa cadastrada</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: nova etapa */}
      {createOpen && (
        <Modal title="Nova Etapa de Produção" onClose={() => setCreateOpen(false)}>
          <EtapaForm />
          <ModalFooter onClose={() => setCreateOpen(false)} onConfirm={handleSave} />
        </Modal>
      )}

      {/* Modal: editar etapa */}
      {editTarget && (
        <Modal title={`Editar Etapa — ${editTarget.nome}`} onClose={() => setEditTarget(null)}>
          <div style={{
            background: "#eef7fa", border: "1px solid #cde0e8", borderRadius: 8,
            padding: "10px 14px", marginBottom: 16, fontSize: 12.5, color: "#2B7A91",
          }}>
            O status da etapa não é alterado aqui — use os botões Iniciar / Finalizar na tabela.
          </div>
          <EtapaForm />
          <ModalFooter onClose={() => setEditTarget(null)} onConfirm={handleSave} confirmLabel="Atualizar Etapa" />
        </Modal>
      )}

      {/* Modal: associar responsável */}
      {funcTarget && (
        <Modal title={`Responsáveis — ${funcTarget.nome}`} onClose={() => setFuncTarget(null)} width={440}>
          <div style={{ fontSize: 12.5, color: "#5a8496", marginBottom: 14 }}>
            Já associados:{" "}
            {funcTarget.funcionarios.length > 0
              ? funcTarget.funcionarios.join(", ")
              : <span style={{ color: "#b0cdd6" }}>nenhum</span>
            }
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {funcionarios.map(fn => {
              const jaAssoc = funcTarget.funcionarios.includes(fn.nome);
              return (
                <button
                  key={fn.id}
                  disabled={jaAssoc}
                  onClick={() => addFuncionario(funcTarget.id, fn.nome)}
                  style={{
                    background: jaAssoc ? "#eef7fa" : "#f4f9fb",
                    border: jaAssoc ? "1.5px solid #2B7A91" : "1px solid #cde0e8",
                    borderRadius: 8, padding: "11px 16px",
                    cursor: jaAssoc ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    fontFamily: "DM Sans, sans-serif", transition: "all .12s", opacity: jaAssoc ? 0.75 : 1,
                  }}
                >
                  <span style={{ color: "#1a3a48", fontSize: 13.5 }}>{fn.nome}</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <Badge value={fn.nivelPermissao} />
                    {jaAssoc && <span style={{ color: "#0e9068", fontSize: 13 }}>✓</span>}
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
