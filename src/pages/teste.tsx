import { useState } from "react";
import {
  type Teste,
  type Aeronave,
  TIPO_TESTE,
  RESULTADO_TESTE,
  Badge,
  Modal,
  FormRow,
  Field,
  ModalFooter,
  StatCard,
  CARD_STYLE,
  CARD_HDR,
  CARD_TTL,
  TH_STYLE,
  TD_STYLE,
  MONO_CODE,
} from "../enums/enum";

interface TestesPageProps {
  testes: Teste[];
  setTestes: React.Dispatch<React.SetStateAction<Teste[]>>;
  aeronaves: Aeronave[];
}

interface TesteForm {
  aeronave: string;
  tipo: string;
  resultado: string;
}

export function TestesPage({ testes, setTestes, aeronaves }: TestesPageProps) {
  const [createOpen, setCreateOpen] = useState(false);

  const blank: TesteForm = { aeronave: aeronaves[0]?.codigo ?? "", tipo: "ELETRICO", resultado: "APROVADO" };
  const [form, setForm] = useState<TesteForm>(blank);

  const upd = (k: keyof TesteForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    setTestes(prev => [...prev, { ...form, id: Date.now() }]);
    setForm(blank);
    setCreateOpen(false);
  };

  const aprovados = testes.filter(t => t.resultado === "APROVADO").length;
  const reprovados = testes.filter(t => t.resultado === "REPROVADO").length;
  const taxa = testes.length ? Math.round((aprovados / testes.length) * 100) : 0;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
        <StatCard num={testes.length} label="Total de Testes" />
        <StatCard num={aprovados} label="Aprovados" color="#10b981" />
        <StatCard num={reprovados} label="Reprovados" color="#ef4444" />
      </div>

      {testes.length > 0 && (
        <div style={{ background: "#07101f", border: "1px solid #0f2035", borderRadius: 8, padding: "12px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#3d5a78" }}>Taxa de aprovação global:</span>
          <div style={{ flex: 1, background: "#0f2035", borderRadius: 4, height: 6 }}>
            <div style={{ width: `${taxa}%`, background: taxa >= 80 ? "#10b981" : taxa >= 60 ? "#f59e0b" : "#ef4444", height: "100%", borderRadius: 4, transition: "width .4s" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: taxa >= 80 ? "#10b981" : "#f59e0b" }}>{taxa}%</span>
        </div>
      )}

      <div style={CARD_STYLE}>
        <div style={CARD_HDR}>
          <span style={CARD_TTL}>Registro de Testes</span>
          <button className="btn-primary" onClick={() => { setForm(blank); setCreateOpen(true); }}>+ Registrar Teste</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Aeronave", "Tipo de Teste", "Resultado"].map(h =>
              <th key={h} style={TH_STYLE}>{h}</th>
            )}</tr>
          </thead>
          <tbody>
            {testes.map((t, i) => (
              <tr key={t.id} className="row-hover" style={{ background: i % 2 === 0 ? "transparent" : "rgba(5,10,18,.5)" }}>
                <td style={TD_STYLE}><span style={MONO_CODE}>{t.aeronave}</span></td>
                <td style={TD_STYLE}><Badge value={t.tipo} /></td>
                <td style={TD_STYLE}><Badge value={t.resultado} /></td>
              </tr>
            ))}
            {testes.length === 0 && (
              <tr><td colSpan={3} style={{ ...TD_STYLE, textAlign: "center", color: "#1e3a5f", padding: "36px 0" }}>Nenhum teste registrado</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {createOpen && (
        <Modal title="Registrar Teste" onClose={() => setCreateOpen(false)}>
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
          <ModalFooter onClose={() => setCreateOpen(false)} onConfirm={handleSave} />
        </Modal>
      )}
    </div>
  );
}
