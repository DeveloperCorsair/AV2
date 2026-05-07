import { useState } from "react";
import {
  type Aeronave, type Peca, type Etapa, type Teste,
  Field, Badge,
  CARD_STYLE, CARD_HDR, CARD_TTL,
} from "../enums/enum";

interface RelatorioPageProps {
  aeronaves: Aeronave[];
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];
}

export function RelatorioPage({ aeronaves, pecas, etapas, testes }: RelatorioPageProps) {
  const [sel,      setSel]      = useState(aeronaves[0]?.codigo ?? "");
  const [cliente,  setCliente]  = useState("");
  const [data,     setData]     = useState("");
  const [gerado,   setGerado]   = useState(false);

  const ae        = aeronaves.find(a => a.codigo === sel);
  const aePecas   = pecas.filter(p => p.aeronave === sel);
  const aeEtapas  = etapas.filter(e => e.aeronave === sel);
  const aeTestes  = testes.filter(t => t.aeronave === sel);
  const aprovados = aeTestes.filter(t => t.resultado === "APROVADO").length;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#2B7A91", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, paddingBottom: 6, borderBottom: "1.5px solid #cde0e8" }}>
        {title}
      </div>
      {children}
    </div>
  );

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: "flex", padding: "6px 0", borderBottom: "1px solid #f0f7fa", alignItems: "baseline" }}>
      <span style={{ width: 160, fontSize: 12, color: "#8ab0bc", fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 13.5, color: "#1a3a48" }}>{value}</span>
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, alignItems: "start" }}>
      {/* Painel de parâmetros */}
      <div style={CARD_STYLE}>
        <div style={CARD_HDR}><span style={CARD_TTL}>Parâmetros</span></div>
        <div style={{ padding: 20 }}>
          <Field label="Aeronave">
            <select value={sel} onChange={e => { setSel(e.target.value); setGerado(false); }}>
              {aeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo}</option>)}
            </select>
          </Field>
          <Field label="Nome do Cliente">
            <input value={cliente} onChange={e => setCliente(e.target.value)} placeholder="Ex: Azul Linhas Aéreas" />
          </Field>
          <Field label="Data de Entrega">
            <input type="date" value={data} onChange={e => setData(e.target.value)} />
          </Field>
          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "10px" }}
            onClick={() => setGerado(true)}
          >
            Gerar Relatório
          </button>
        </div>

        {ae && (
          <div style={{ borderTop: "1px solid #daeaf0", padding: "16px 20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#8ab0bc", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Resumo</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { l: "Peças",     v: aePecas.length,  c: "#2B7A91" },
                { l: "Etapas",    v: aeEtapas.length, c: "#2B7A91" },
                { l: "Testes",    v: aeTestes.length, c: "#2B7A91" },
                { l: "Aprovados", v: aprovados,        c: "#0e9068" },
              ].map(({ l, v, c }) => (
                <div key={l} style={{ background: "#f4f9fb", border: "1px solid #daeaf0", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 24, fontWeight: 700, color: c }}>{v}</div>
                  <div style={{ fontSize: 11, color: "#8ab0bc" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Área do relatório */}
      {gerado && ae ? (
        <div style={CARD_STYLE}>
          <div style={CARD_HDR}>
            <span style={CARD_TTL}>Relatório de Entrega — {ae.codigo}</span>
            <span style={{ fontSize: 11, color: "#8ab0bc" }}>
              Gerado em {new Date().toLocaleDateString("pt-BR")}
            </span>
          </div>
          <div style={{ padding: 24 }}>

            <Section title="Identificação da Aeronave">
              <Row label="Código"     value={ae.codigo} />
              <Row label="Modelo"     value={ae.modelo} />
              <Row label="Tipo"       value={ae.tipo} />
              <Row label="Capacidade" value={`${ae.capacidade} passageiros`} />
              <Row label="Alcance"    value={`${ae.alcance.toLocaleString("pt-BR")} km`} />
              <Row label="Cliente"    value={cliente || "—"} />
              <Row label="Data de Entrega" value={data ? new Date(data + "T12:00:00").toLocaleDateString("pt-BR") : "—"} />
            </Section>

            <Section title={`Peças Utilizadas (${aePecas.length})`}>
              {aePecas.length === 0 ? (
                <div style={{ fontSize: 13, color: "#a0bec8" }}>Nenhuma peça associada</div>
              ) : (
                aePecas.map(p => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f7fa" }}>
                    <div>
                      <span style={{ fontSize: 13.5, color: "#1a3a48", fontWeight: 500 }}>{p.nome}</span>
                      <span style={{ fontSize: 12, color: "#8ab0bc", marginLeft: 8 }}>{p.fornecedor}</span>
                    </div>
                    <Badge value={p.status} />
                  </div>
                ))
              )}
            </Section>

            <Section title={`Etapas de Produção (${aeEtapas.length})`}>
              {aeEtapas.length === 0 ? (
                <div style={{ fontSize: 13, color: "#a0bec8" }}>Nenhuma etapa associada</div>
              ) : (
                aeEtapas.map(e => (
                  <div key={e.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f7fa" }}>
                    <div>
                      <span style={{ fontSize: 13.5, color: "#1a3a48", fontWeight: 500 }}>{e.nome}</span>
                      <span style={{ fontSize: 12, color: "#8ab0bc", marginLeft: 8, fontFamily: "JetBrains Mono, monospace" }}>{e.prazo}</span>
                    </div>
                    <Badge value={e.status} />
                  </div>
                ))
              )}
            </Section>

            <Section title={`Resultados de Testes (${aeTestes.length})`}>
              {aeTestes.length === 0 ? (
                <div style={{ fontSize: 13, color: "#a0bec8" }}>Nenhum teste registrado</div>
              ) : (
                aeTestes.map(t => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f7fa" }}>
                    <span style={{ fontSize: 13.5, color: "#1a3a48" }}>{t.tipo.charAt(0) + t.tipo.slice(1).toLowerCase()}</span>
                    <Badge value={t.resultado} />
                  </div>
                ))
              )}
            </Section>

            <div style={{ background: "#f4f9fb", border: "1px solid #cde0e8", borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#8ab0bc", textAlign: "center" }}>
              Documento gerado pelo sistema AeroCode v1.0.0
            </div>
          </div>
        </div>
      ) : (
        <div style={{ ...CARD_STYLE, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, color: "#cde0e8", marginBottom: 14 }}>📄</div>
            <div style={{ color: "#a0bec8", fontSize: 13.5 }}>Preencha os parâmetros e clique em<br /><strong style={{ color: "#2B7A91" }}>Gerar Relatório</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}
