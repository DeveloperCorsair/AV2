import { useState } from "react";
import { type Usuario } from "../enums/enum";

interface LoginPageProps {
  onLogin: (u: Usuario) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [usuario, setUsuario] = useState("");
  const [senha,   setSenha]   = useState("");
  const [verSenha,setVerSenha]= useState(false);
  const [erro,    setErro]    = useState("");

  const handleLogin = () => {
    if (usuario === "admin" && senha === "admin123") {
      onLogin({ nome: "Carlos Mendonça", nivel: "ADMINISTRADOR" });
    } else {
      setErro("Usuário ou senha incorretos.");
      setTimeout(() => setErro(""), 3000);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      fontFamily: "DM Sans, sans-serif",
      background: "#fff",
      overflow: "hidden",
    }}>

      {/* ── Painel esquerdo (teal) com onda no lado direito ── */}
      <div style={{ position: "relative", width: "45%", flexShrink: 0 }}>

        {/* Fundo teal */}
        <div style={{
          position: "absolute", inset: 0,
          background: "#1d5c72",
        }} />

        {/* Onda SVG no lado direito do painel */}
        <svg
          viewBox="0 0 120 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: 0, right: -1,
            height: "100%", width: 120,
            display: "block",
          }}
        >
          <path
            d="M0,0 L60,0 Q120,200 60,400 Q0,600 60,800 L0,800 Z"
            fill="#1d5c72"
          />
        </svg>

        {/* Logo centralizado no painel */}
        <div style={{
          position: "relative", zIndex: 1,
          height: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", justifyContent: "center",
          padding: "0 10% 0 12%",
        }}>
          {/* Ícone/logo placeholder — substitua pelo SVG/img real se tiver */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            {/* Ícone estilizado */}
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="56" height="56" rx="14" fill="rgba(255,255,255,.12)" />
              <path d="M12 32 L22 18 L28 26 L34 14 L44 32" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M18 38 L28 26 L38 38" stroke="rgba(255,255,255,.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <div>
              <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 32, fontWeight: 700, color: "#fff", letterSpacing: 3, lineHeight: 1 }}>
                AEROCODE
              </div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.55)", letterSpacing: 2, marginTop: 4 }}>
                Gestão de Produção
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 280 }}>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>
              Sistema integrado de gerenciamento para produção de aeronaves civis e militares.
            </p>
          </div>
        </div>
      </div>

      {/* ── Painel direito (formulário) ── */}
      <div style={{
        flex: 1,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 8%",
        background: "#fff",
      }}>
        <div style={{ width: "100%", maxWidth: 360 }}>

          <h1 style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: 32, fontWeight: 600,
            color: "#1a3a48", letterSpacing: 6,
            marginBottom: 36, textAlign: "center",
          }}>
            LOGIN
          </h1>

          {/* Campo: Usuário */}
          <div style={{ position: "relative", marginBottom: 18 }}>
            <span style={{
              position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
              color: "#8ab0bc", fontSize: 16, pointerEvents: "none",
            }}>👤</span>
            <input
              value={usuario}
              onChange={e => { setUsuario(e.target.value); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Usuário"
              style={{
                width: "100%", border: "none", borderBottom: "1.5px solid #cde0e8",
                borderRadius: 0, padding: "10px 10px 10px 30px",
                fontSize: 14.5, color: "#1a3a48", background: "transparent", outline: "none",
                fontFamily: "DM Sans, sans-serif",
              }}
            />
          </div>

          {/* Campo: Senha */}
          <div style={{ position: "relative", marginBottom: 8 }}>
            <span style={{
              position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
              color: "#8ab0bc", fontSize: 16, pointerEvents: "none",
            }}>🔒</span>
            <input
              type={verSenha ? "text" : "password"}
              value={senha}
              onChange={e => { setSenha(e.target.value); setErro(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Senha"
              style={{
                width: "100%", border: "none", borderBottom: "1.5px solid #cde0e8",
                borderRadius: 0, padding: "10px 36px 10px 30px",
                fontSize: 14.5, color: "#1a3a48", background: "transparent", outline: "none",
                fontFamily: "DM Sans, sans-serif",
              }}
            />
            <button
              onClick={() => setVerSenha(v => !v)}
              style={{
                position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer",
                color: "#8ab0bc", fontSize: 16, padding: 4,
              }}
              title={verSenha ? "Ocultar senha" : "Mostrar senha"}
            >
              {verSenha ? "🙈" : "👁"}
            </button>
          </div>

          {/* Esqueceu senha */}
          <div style={{ textAlign: "right", marginBottom: 28 }}>
            <span style={{ fontSize: 12, color: "#8ab0bc", cursor: "pointer" }}>
              Esqueceu Senha?
            </span>
          </div>

          {/* Erro */}
          {erro && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 7,
              padding: "9px 14px", fontSize: 12.5, color: "#dc2626", marginBottom: 16,
            }}>
              {erro}
            </div>
          )}

          {/* Botão */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%", padding: "13px",
              background: "#1d5c72", color: "#fff",
              border: "none", borderRadius: 8,
              fontSize: 15, fontWeight: 600,
              cursor: "pointer", fontFamily: "DM Sans, sans-serif",
              letterSpacing: 0.5, transition: "background .15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#174f62")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1d5c72")}
          >
            Entrar
          </button>

          {/* Demo hint */}
          <div style={{ marginTop: 28, textAlign: "center", fontSize: 12, color: "#b0cdd6" }}>
            Demo:{" "}
            <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#2B7A91" }}>admin</span>
            {" / "}
            <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#2B7A91" }}>admin123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
