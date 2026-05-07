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
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [page, setPage] = useState<PageId>("aeronaves");
  const [aeronaves, setAeronaves] = useState(INIT_AERONAVES);
  const [pecas, setPecas] = useState(INIT_PECAS);
  const [etapas, setEtapas] = useState(INIT_ETAPAS);
  const [testes, setTestes] = useState(INIT_TESTES);
  const [funcionarios, setFuncionarios] = useState(INIT_FUNCIONARIOS);

  if (!usuario) {
    return <LoginPage onLogin={u => setUsuario(u)} />;
  }

  const meta = PAGE_META[page];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#060c17" }}>
      {/*  Sidebar  */}
      <aside style={{ width: 230, minWidth: 230, background: "#080f1e", borderRight: "1px solid #0c1c30", display: "flex", flexDirection: "column" }}>
        {/* Logo */}
        <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid #0c1c30", marginBottom: 6 }}>
          <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 20, fontWeight: 700, color: "#38bdf8", letterSpacing: 2 }}>AEROCODE</div>
          <div style={{ fontSize: 9.5, color: "#1e3a5f", letterSpacing: 2.5, textTransform: "uppercase", marginTop: 2 }}>Gestão de Produção</div>
        </div>

        {/* Navegação */}
        <div style={{ fontSize: 9.5, color: "#1a3050", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, padding: "12px 22px 6px" }}>
          Módulos
        </div>
        {NAV_ITEMS.map(n => (
          <div
            key={n.id}
            className={`nav-item${page === n.id ? " active" : ""}`}
            onClick={() => setPage(n.id)}
          >
            <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>{n.icon}</span>
            {n.label}
          </div>
        ))}

        <div style={{ flex: 1 }} />

        {/* Usuário logado */}
        <div style={{ borderTop: "1px solid #0c1c30", padding: "14px 22px" }}>
          <div style={{ fontSize: 9.5, color: "#1a3050", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Sessão Ativa</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "#94a3b8" }}>{usuario.nome}</div>
          <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 2 }}>{usuario.nivel}</div>
          <button
            onClick={() => setUsuario(null)}
            style={{ marginTop: 10, fontSize: 11, color: "#1e3a5f", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "DM Sans, sans-serif" }}
          >
            ⏻ Sair do sistema
          </button>
        </div>
      </aside>

      {/*  Conteúdo Principal  */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: "#07101f", borderBottom: "1px solid #0c1c30", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 19, fontWeight: 700, color: "#e2e8f0", letterSpacing: 0.5 }}>{meta.title}</div>
            <div style={{ fontSize: 12, color: "#2a4a6a", marginTop: 1 }}>{meta.sub}</div>
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#1a3050" }}>
            {new Date().toLocaleDateString("pt-BR", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {page === "aeronaves" && <AeronavesPage aeronaves={aeronaves} setAeronaves={setAeronaves} />}
          {page === "pecas" && <PecasPage pecas={pecas} setPecas={setPecas} aeronaves={aeronaves} />}
          {page === "etapas" && <EtapasPage etapas={etapas} setEtapas={setEtapas} aeronaves={aeronaves} funcionarios={funcionarios} />}
          {page === "testes" && <TestesPage testes={testes} setTestes={setTestes} aeronaves={aeronaves} />}
          {page === "funcionarios" && <FuncionariosPage funcionarios={funcionarios} setFuncionarios={setFuncionarios} />}
          {page === "relatorio" && <RelatorioPage aeronaves={aeronaves} pecas={pecas} etapas={etapas} testes={testes} />}
        </div>
      </div>
    </div>
  );
}

export default App;