import { useState } from "react";
import './login.css'

interface EyeIconProps {
  crossed: boolean;
}
 
const EyeIcon = ({ crossed }: EyeIconProps) =>
  crossed ? (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
 
export default function AeroCodeLogin() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
 
  const handleLogin = (): void => {
    if (!username || !password) {
      alert("Por favor, preencha usuário e senha.");
      return;
    }
    alert(`Bem-vindo, ${username}!`);
  };

  return (
    <>

      <div className="ac-container">
        {/* LEFT */}
        <div className="ac-left">
          <div className="ac-wave">
            <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,0 L600,0 L600,800 L0,800 Z" fill="white" />
              <path d="M0,120 Q80,300 0,500 L0,800 L400,800 Q250,600 280,400 Q310,200 150,0 Z" fill="#2a8a9e" />
            </svg>
          </div>
          <div className="ac-logo">
            <svg width="72" height="72" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,42 L30,20 L36,30 L20,40 Z" fill="white" opacity="0.9" />
              <path d="M10,42 L30,20 L38,36 L18,48 Z" fill="white" opacity="0.6" />
              <path d="M36,16 L52,56 L45,56 L40,42 L35,56 L28,56 Z" fill="white" />
              <path d="M32,46 L48,46 L46,40 L34,40 Z" fill="#2a8a9e" />
              <polyline points="14,60 22,60 26,50 30,68 34,54 38,60 66,60" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="ac-logo-text">
              AERO<span>CODE</span>
            </div>
          </div>
        </div>
 
        {/* RIGHT */}
        <div className="ac-right">
          <div className="ac-card">
            <div className="ac-title">L O G I N</div>
 
            {/* Usuário */}
            <div className="ac-field">
              <svg className="ac-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              />
            </div>
 
            {/* Senha */}
            <div className="ac-field">
              <svg className="ac-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 018 0v4" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <button
                className="ac-toggle-pw"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                <EyeIcon crossed={showPassword} />
              </button>
            </div>
 
            <div className="ac-forgot">
              <a href="#">Esqueceu Senha?</a>
            </div>
 
            <button className="ac-btn" onClick={handleLogin}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}