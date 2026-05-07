import { useState } from 'react';
import { LoginPage } from './pages/login';
import { AeronavesPage } from './pages/aeronave';
import { PecasPage } from './pages/peca';
import { EtapasPage } from './pages/etapaProducao';
import { TestesPage } from './pages/teste';
import { FuncionariosPage } from './pages/funcionario';
import { RelatorioPage } from './pages/relatorio';
import { PAGE_META, NAV_ITEMS, type PageId } from './components/aside';
import {
  INIT_AERONAVES,
  INIT_PECAS,
  INIT_ETAPAS,
  INIT_TESTES,
  INIT_FUNCIONARIOS,
  type Usuario,
} from './enums/enum';
import './index.css';

function App() {
  const [usuario, setUsuario]           = useState<Usuario | null>(null);
  const [page, setPage]                 = useState<PageId>("aeronaves");
  const [aeronaves, setAeronaves]       = useState(INIT_AERONAVES);
  const [pecas, setPecas]               = useState(INIT_PECAS);
  const [etapas, setEtapas]             = useState(INIT_ETAPAS);
  const [testes, setTestes]             = useState(INIT_TESTES);
  const [funcionarios, setFuncionarios] = useState(INIT_FUNCIONARIOS);

  if (!usuario) {
    return <LoginPage onLogin={u => setUsuario(u)} />;
  }

  const meta = PAGE_META[page];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f0f7fa" }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside style={{
        width: 230, minWidth: 230,
        background: "#1d5c72",
        display: "flex", flexDirection: "column",
        boxShadow: "2px 0 12px rgba(29,92,114,.15)",
      }}>
        {/* Logo */}
        <div style={{ padding: "22px 22px 16px", borderBottom: "1px solid rgba(255,255,255,.1)", marginBottom: 8 }}>
          <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 21, fontWeight: 700, color: "#fff", letterSpacing: 2 }}>
            AEROCODE
          </div>
          <div style={{ fontSize: 9.5, color: "rgba(255,255,255,.45)", letterSpacing: 2.5, textTransform: "uppercase", marginTop: 3 }}>
            Gestão de Produção
          </div>
        </div>

        {/* Seção */}
        <div style={{ fontSize: 9.5, color: "rgba(255,255,255,.3)", letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700, padding: "14px 22px 6px" }}>
          Módulos
        </div>

        {/* Itens */}
        {NAV_ITEMS.map(n => (
          <div key={n.id} className={`nav-item${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
            <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>{n.icon}</span>
            {n.label}
          </div>
        ))}

        <div style={{ flex: 1 }} />

        {/* Usuário */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", padding: "16px 22px" }}>
          <div style={{ fontSize: 9.5, color: "rgba(255,255,255,.3)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Sessão Ativa</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "#fff" }}>{usuario.nome}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", marginTop: 2 }}>{usuario.nivel}</div>
          <button
            onClick={() => setUsuario(null)}
            style={{
              marginTop: 12, fontSize: 11.5, color: "rgba(255,255,255,.45)",
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontFamily: "DM Sans, sans-serif", transition: "color .15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.45)")}
          >
            ⏻ Sair do sistema
          </button>
        </div>
      </aside>

      {/* ── Conteúdo ────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #cde0e8",
          padding: "14px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0, boxShadow: "0 1px 4px rgba(43,122,145,.07)",
        }}>
          <div>
            <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 19, fontWeight: 700, color: "#1a3a48", letterSpacing: 0.3 }}>
              {meta.title}
            </div>
            <div style={{ fontSize: 12, color: "#8ab0bc", marginTop: 1 }}>{meta.sub}</div>
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#a0bec8" }}>
            {new Date().toLocaleDateString("pt-BR", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {page === "aeronaves"    && <AeronavesPage    aeronaves={aeronaves}       setAeronaves={setAeronaves}       />}
          {page === "pecas"        && <PecasPage         pecas={pecas}               setPecas={setPecas}               aeronaves={aeronaves} />}
          {page === "etapas"       && <EtapasPage        etapas={etapas}             setEtapas={setEtapas}             aeronaves={aeronaves} funcionarios={funcionarios} />}
          {page === "testes"       && <TestesPage        testes={testes}             setTestes={setTestes}             aeronaves={aeronaves} />}
          {page === "funcionarios" && <FuncionariosPage  funcionarios={funcionarios} setFuncionarios={setFuncionarios} />}
          {page === "relatorio"    && <RelatorioPage     aeronaves={aeronaves}       pecas={pecas}                     etapas={etapas} testes={testes} />}
        </div>
      </div>
    </div>
  );
}

export default App;
