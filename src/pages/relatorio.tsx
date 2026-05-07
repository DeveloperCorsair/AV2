import { useState } from "react";
import {
  type Aeronave,
  type Peca,
  type Etapa,
  type Teste,
  Field,
  CARD_STYLE,
  CARD_HDR,
  CARD_TTL,
} from "../enums/enum";

interface RelatorioPageProps {
  aeronaves: Aeronave[];
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];
}

export function RelatorioPage({ aeronaves, pecas, etapas, testes }: RelatorioPageProps) {
  const [sel, setSel] = useState(aeronaves[0]?.codigo ?? "");
  const [cliente, setCliente] = useState("");
  const [data, setData] = useState("");
  const [gerado, setGerado] = useState(false);

  const ae = aeronaves.find(a => a.codigo === sel);
  const aePecas = pecas.filter(p => p.aeronave === sel);
  const aeEtapas = etapas.filter(e => e.aeronave === sel);
  const aeTestes = testes.filter(t => t.aeronave === sel);
  const aprovados = aeTestes.filter(t => t.resultado === "APROVADO").length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20, alignItems: "start" }}>
      {/* Painel de parâmetros */}
      <div style={CARD_STYLE}>
        <div style={CARD_HDR}><span style={CARD_TTL}>Parâmetros do Relatório</span></div>
        <div style={{ padding: 20 }}>
          <Field label="Aeronave">
            <select value={sel} onChange={e => { setSel(e.target.value); setGerado(false); }}>
              {aeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo}</option>)}
            </select>
          </Field>
          <Field label="Nome do Cliente">
            <input value={cliente} onChange={e => setCliente(e.target.value)} placeholder="LATAM Airlines Brasil" />
          </Field>
          <Field label="Data de Entrega">
            <input type="date" value={data} onChange={e => setData(e.target.value)} />
          </Field>
          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "10px", marginTop: 4 }}
            onClick={() => setGerado(true)}
          >
            ⬡ Gerar Relatório Final
          </button>
        </div>

        {ae && (
          <div style={{ borderTop: "1px solid #0f2035", padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: "#2a4a6a", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Resumo</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { l: "Peças", v: aePecas.length },
                { l: "Etapas", v: aeEtapas.length },
                { l: "Testes", v: aeTestes.length },
                { l: "Aprovados", v: aprovados },
              ].map(({ l, v }) => (
                <div key={l} style={{ background: "#060c17", borderRadius: 6, padding: "8px 10px" }}>
                  <div style={{ fontSize: 16, fontFamily: "Rajdhani, sans-serif", fontWeight: 700, color: "#38bdf8" }}>{v}</div>
                  <div style={{ fontSize: 11, color: "#2a4a6a" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Área do relatório gerado */}
      {gerado && ae ? (
        <div style={CARD_STYLE}>
          <div style={CARD_HDR}>
            <span style={CARD_TTL}>Relatório — {ae.codigo}</span>
            <span style={{ fontSize: 11, color: "#2a4a6a" }}>Gerado em {new Date().toLocaleDateString("pt-BR")}</span>
          </div>
          <div style={{ padding: 24, fontFamily: "JetBrains Mono, monospace", fontSize: 12.5, lineHeight: 1.9, color: "#94a3b8" }}>
            <div style={{ color: "#38bdf8", fontSize: 15, fontFamily: "Rajdhani, sans-serif", fontWeight: 700, marginBottom: 14, letterSpacing: 1 }}>
              ▸ RELATÓRIO FINAL DE ENTREGA
            </div>

            {([
              ["Código", ae.codigo],
              ["Modelo", ae.modelo],
              ["Tipo", ae.tipo],
              ["Capacidade", `${ae.capacidade} passageiros`],
              ["Alcance", `${ae.alcance.toLocaleString("pt-BR")} km`],
              ["Cliente", cliente || "—"],
              ["Data Entrega", data || "—"],
            ] as [string, string][]).map(([k, v]) => (
              <div key={k}>
                <span style={{ color: "#2a4a6a", display: "inline-block", width: 130 }}>{k.padEnd(14)}</span>
                <span style={{ color: "#cbd5e1" }}>{v}</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid #0f2035", marginTop: 16, paddingTop: 14, color: "#f59e0b", fontSize: 13 }}>
              PEÇAS UTILIZADAS ({aePecas.length})
            </div>
            {aePecas.map(p => (
              <div key={p.id}> ›  {p.nome} <span style={{ color: "#2a4a6a" }}>[{p.tipo}]</span> <span style={{ color: "#1a5020" }}>[{p.status}]</span></div>
            ))}
            {aePecas.length === 0 && <div style={{ color: "#1e3a5f" }}> (nenhuma peça associada)</div>}

            <div style={{ borderTop: "1px solid #0f2035", marginTop: 14, paddingTop: 14, color: "#f59e0b", fontSize: 13 }}>
              ETAPAS DE PRODUÇÃO ({aeEtapas.length})
            </div>
            {aeEtapas.map(e => (
              <div key={e.id}> ›  {e.nome} <span style={{ color: "#2a4a6a" }}>[prazo: {e.prazo}]</span> <span style={{ color: e.status === "CONCLUIDA" ? "#10b981" : "#f59e0b" }}>[{e.status}]</span></div>
            ))}
            {aeEtapas.length === 0 && <div style={{ color: "#1e3a5f" }}> (nenhuma etapa associada)</div>}

            <div style={{ borderTop: "1px solid #0f2035", marginTop: 14, paddingTop: 14, color: "#f59e0b", fontSize: 13 }}>
              RESULTADOS DE TESTES ({aeTestes.length})
            </div>
            {aeTestes.map(t => (
              <div key={t.id}> ›  {t.tipo.padEnd(12)} <span style={{ color: t.resultado === "APROVADO" ? "#10b981" : "#ef4444" }}>→ {t.resultado}</span></div>
            ))}
            {aeTestes.length === 0 && <div style={{ color: "#1e3a5f" }}> (nenhum teste registrado)</div>}

            <div style={{ borderTop: "1px solid #0f2035", marginTop: 14, paddingTop: 14, color: "#64748b", fontSize: 11.5 }}>
              FIM DO RELATÓRIO — AEROCODE v1.0.0
            </div>
          </div>
        </div>
      ) : (
        <div style={{ ...CARD_STYLE, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, color: "#0f2035", marginBottom: 12 }}>⬡</div>
            <div style={{ color: "#1e3a5f", fontSize: 13 }}>Preencha os parâmetros e clique em<br />Gerar Relatório Final</div>
          </div>
        </div>
      )}
    </div>
  );
}
