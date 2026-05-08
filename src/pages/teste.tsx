import { useState } from "react";
import {
  type Teste, type Aeronave,
  TIPO_TESTE, RESULTADO_TESTE,
  Badge, Modal, FormRow, Field, ModalFooter, StatCard,
  CARD_STYLE, CARD_HDR, CARD_TTL, TH_STYLE, TD_STYLE, MONO_CODE,
} from "../enums/enum";

interface TestesPageProps {
  testes: Teste[];
  setTestes: React.Dispatch<React.SetStateAction<Teste[]>>;
  aeronaves: Aeronave[];
}

interface TesteForm { aeronave: string; tipo: string; resultado: string; }

export function TestesPage({ testes, setTestes, aeronaves }: TestesPageProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Teste | null>(null);

  const blank: TesteForm = { aeronave: aeronaves[0]?.codigo ?? "", tipo: "ELETRICO", resultado: "APROVADO" };
  const [form, setForm] = useState<TesteForm>(blank);

  const upd = (k: keyof TesteForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const openCreate = () => { setForm(blank); setCreateOpen(true); };
  const openEdit   = (t: Teste) => { setForm({ aeronave: t.aeronave, tipo: t.tipo, resultado: t.resultado }); setEditTarget(t); };

  const handleSave = () => {
    if (editTarget) {
      setTestes(prev => prev.map(t => t.id === editTarget.id ? { ...t, ...form } : t));
      setEditTarget(null);
    } else {
      setTestes(prev => [...prev, { ...form, id: Date.now() }]);
      setForm(blank);
      setCreateOpen(false);
    }
  };

  const aprovados  = testes.filter(t => t.resultado === "APROVADO").length;
  const reprovados = testes.filter(t => t.resultado === "REPROVADO").length;
  const taxa       = testes.length ? Math.round((aprovados / testes.length) * 100) : 0;

  const TesteForm = () => (
    <>
      <Field label="Aeronave">
        <select value={form.aeronave} onChange={upd("aeronave")}>
          {aeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo} — {a.modelo}</option>)}
        </select>
      </Field>
      <FormRow>
        <Field label="Tipo de Teste">
          <select value={form.tipo} onChange={upd("tipo")}>{TIPO_TESTE.map(t => <option key={t}>{t}</option>)}</select>
        </Field>
        <Field label="Resultado">
          <select value={form.resultado} onChange={upd("resultado")}>{RESULTADO_TESTE.map(t => <option key={t}>{t}</option>)}</select>
        </Field>
      </FormRow>
    </>
  );

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
        <StatCard num={testes.length} label="Total de Testes" />
        <StatCard num={aprovados}     label="Aprovados"       color="#0e9068" />
        <StatCard num={reprovados}    label="Reprovados"      color="#dc2626" />
      </div>

      {testes.length > 0 && (
        <div style={{
          background: "#fff", border: "1px solid #cde0e8", borderRadius: 10,
          padding: "14px 20px", marginBottom: 18,
          display: "flex", alignItems: "center", gap: 14,
          boxShadow: "0 1px 4px rgba(43,122,145,.06)",
        }}>
          <span style={{ fontSize: 12.5, color: "#5a8496", whiteSpace: "nowrap" }}>Taxa de aprovação</span>
          <div style={{ flex: 1, background: "#e8f2f6", borderRadius: 6, height: 8, overflow: "hidden" }}>
            <div style={{
              width: `${taxa}%`,
              background: taxa >= 80 ? "#0e9068" : taxa >= 60 ? "#d97706" : "#dc2626",
              height: "100%", borderRadius: 6, transition: "width .4s",
            }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: taxa >= 80 ? "#0e9068" : "#d97706", fontFamily: "Rajdhani, sans-serif" }}>
            {taxa}%
          </span>
        </div>
      )}

      <div style={CARD_STYLE}>
        <div style={CARD_HDR}>
          <span style={CARD_TTL}>Registro de Testes</span>
          <button className="btn-primary" onClick={openCreate}>+ Registrar Teste</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Aeronave", "Tipo de Teste", "Resultado", "Ações"].map(h =>
              <th key={h} style={TH_STYLE}>{h}</th>
            )}</tr>
          </thead>
          <tbody>
            {testes.map((t, i) => (
              <tr key={t.id} className="row-hover" style={{ background: i % 2 === 0 ? "transparent" : "rgba(43,122,145,.03)" }}>
                <td style={TD_STYLE}><span style={MONO_CODE}>{t.aeronave}</span></td>
                <td style={TD_STYLE}><Badge value={t.tipo} /></td>
                <td style={TD_STYLE}><Badge value={t.resultado} /></td>
                <td style={TD_STYLE}>
                  <button className="btn-ghost" onClick={() => openEdit(t)}>✎ Editar</button>
                </td>
              </tr>
            ))}
            {testes.length === 0 && (
              <tr><td colSpan={4} style={{ ...TD_STYLE, textAlign: "center", color: "#a0bec8", padding: "36px 0" }}>Nenhum teste registrado</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: novo teste */}
      {createOpen && (
        <Modal title="Registrar Teste" onClose={() => setCreateOpen(false)}>
          <TesteForm />
          <ModalFooter onClose={() => setCreateOpen(false)} onConfirm={handleSave} />
        </Modal>
      )}

      {/* Modal: editar teste */}
      {editTarget && (
        <Modal title="Editar Teste" onClose={() => setEditTarget(null)}>
          <TesteForm />
          <ModalFooter onClose={() => setEditTarget(null)} onConfirm={handleSave} confirmLabel="Atualizar Teste" />
        </Modal>
      )}
    </div>
  );
}
