import { useState } from "react";
import { type Usuario, Field } from "../enums/enum";

interface LoginPageProps {
  onLogin: (usuario: Usuario) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = () => {
    if (usuario === "admin" && senha === "admin123") {
      onLogin({ usuario, nome: "Carlos Mendonça", nivel: "ADMINISTRADOR" });
    } else {
      setErr("Usuário ou senha incorretos. Tente admin / admin123");
    }
  };

  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#060c17",
      backgroundImage: "radial-gradient(ellipse at 30% 60%, rgba(14,38,74,.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(3,25,50,.5) 0%, transparent 50%)",
    }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 36, fontWeight: 700, color: "#38bdf8", letterSpacing: 3 }}>
          AEROCODE
        </div>
        <div style={{ fontSize: 11, color: "#1e3a5f", letterSpacing: 4, textTransform: "uppercase", marginTop: 4 }}>
          Sistema de Gestão de Produção
        </div>
      </div>

      {/* Card */}
      <div style={{
        background: "#0a1525", border: "1px solid #1a3050",
        borderRadius: 14, padding: 36, width: 360, maxWidth: "92vw",
      }}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>Acesso ao Sistema</div>
          <div style={{ fontSize: 12.5, color: "#2a4a6a" }}>Insira suas credenciais para continuar</div>
        </div>

        <Field label="Usuário">
          <input
            value={usuario}
            onChange={e => { setUsuario(e.target.value); setErr(""); }}
            placeholder="Usuário"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </Field>
        <Field label="Senha">
          <input
            type="password"
            value={senha}
            onChange={e => { setSenha(e.target.value); setErr(""); }}
            placeholder="••••••••"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </Field>

        {err && (
          <div style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 7, padding: "9px 12px", fontSize: 12.5, color: "#ef4444", marginBottom: 14 }}>
            {err}
          </div>
        )}

        <button
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "11px", marginTop: 4, fontSize: 14 }}
          onClick={handleLogin}
        >
          Entrar
        </button>

        <div style={{ marginTop: 20, padding: "12px 14px", background: "rgba(56,189,248,.04)", border: "1px solid rgba(56,189,248,.1)", borderRadius: 8, fontSize: 12, color: "#2a4a6a" }}>
          Demo: <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#38bdf8" }}>admin</span>
          {" / "}
          <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#38bdf8" }}>admin123</span>
        </div>
      </div>

      <div style={{ marginTop: 28, fontSize: 11, color: "#0f2035" }}>
        Embraer Group — Aerocode v1.0.0
      </div>
    </div>
  );
}
