import { type CSSProperties, type ReactNode } from "react";

// ─── INTERFACES ───────────────────────────────────────────────────────────────

export interface Usuario {
  usuario: string;
  nome: string;
  nivel: string;
}

export interface Aeronave {
  codigo: string;
  modelo: string;
  tipo: string;
  capacidade: number;
  alcance: number;
}

export interface Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  nivelPermissao: string;
}

export interface Peca {
  id: number;
  aeronave: string;
  nome: string;
  tipo: string;
  fornecedor: string;
  status: string;
}

export interface Etapa {
  id: number;
  aeronave: string;
  nome: string;
  prazo: string;
  status: string;
  funcionarios: string[];
}

export interface Teste {
  id: number;
  aeronave: string;
  tipo: string;
  resultado: string;
}

// ─── ENUMS ───────────────────────────────────────────────────────────────────

export const TIPO_AERONAVE   = ["COMERCIAL", "MILITAR"];
export const TIPO_PECA       = ["NACIONAL", "IMPORTADA"];
export const STATUS_PECA     = ["EM_PRODUCAO", "EM_TRANSPORTE", "PRONTA"];
export const STATUS_ETAPA    = ["PENDENTE", "ANDAMENTO", "CONCLUIDA"];
export const NIVEL_PERMISSAO = ["ADMINISTRADOR", "ENGENHEIRO", "OPERADOR"];
export const TIPO_TESTE      = ["ELETRICO", "HIDRAULICO", "AERODINAMICO"];
export const RESULTADO_TESTE = ["APROVADO", "REPROVADO"];

// ─── DADOS MOCKADOS (aeronaves fictícias) ────────────────────────────────────

export const INIT_AERONAVES: Aeronave[] = [
  { codigo: "AX-200-ATL-001", modelo: "AX-200 Atlântico",   tipo: "COMERCIAL", capacidade: 200, alcance: 7200 },
  { codigo: "AX-120-PAM-002", modelo: "AX-120 Pampa",       tipo: "COMERCIAL", capacidade: 120, alcance: 4500 },
  { codigo: "MX-060-CON-003", modelo: "MX-60 Condor",       tipo: "MILITAR",   capacidade: 80,  alcance: 4000 },
  { codigo: "AX-090-MER-004", modelo: "AX-90 Meridional",   tipo: "COMERCIAL", capacidade: 90,  alcance: 3200 },
];

export const INIT_FUNCIONARIOS: Funcionario[] = [
  { id: "0001", nome: "Rafael Andrade",    telefone: "(12) 99210-3344", endereco: "São José dos Campos - SP", usuario: "rafael.adm",  nivelPermissao: "ADMINISTRADOR" },
  { id: "0002", nome: "Beatriz Carvalho",  telefone: "(12) 98822-1100", endereco: "São José dos Campos - SP", usuario: "beatriz.eng", nivelPermissao: "ENGENHEIRO"    },
  { id: "0003", nome: "Lucas Monteiro",    telefone: "(12) 97733-9988", endereco: "Jacareí - SP",             usuario: "lucas.op",    nivelPermissao: "OPERADOR"      },
  { id: "0004", nome: "Fernanda Souza",    telefone: "(12) 99100-5566", endereco: "Taubaté - SP",             usuario: "fernanda.eng",nivelPermissao: "ENGENHEIRO"    },
];

export const INIT_PECAS: Peca[] = [
  { id: 1, aeronave: "AX-200-ATL-001", nome: "Motor Turbofan TF-900",       tipo: "IMPORTADA", fornecedor: "MotorTech International",  status: "PRONTA"        },
  { id: 2, aeronave: "AX-200-ATL-001", nome: "Trem de Pouso Principal",     tipo: "NACIONAL",  fornecedor: "AeroPartes Brasil Ltda",   status: "EM_TRANSPORTE" },
  { id: 3, aeronave: "MX-060-CON-003", nome: "Sistema Hidráulico Central",  tipo: "IMPORTADA", fornecedor: "HydroAero Internacional",  status: "EM_PRODUCAO"   },
  { id: 4, aeronave: "AX-120-PAM-002", nome: "Conjunto Aviônico AV-4",      tipo: "NACIONAL",  fornecedor: "AvionicSul Tecnologia",    status: "PRONTA"        },
  { id: 5, aeronave: "AX-090-MER-004", nome: "Superfície de Controle Alar", tipo: "NACIONAL",  fornecedor: "AeroPartes Brasil Ltda",   status: "EM_PRODUCAO"   },
];

export const INIT_ETAPAS: Etapa[] = [
  { id: 1, aeronave: "AX-200-ATL-001", nome: "Montagem da Fuselagem",            prazo: "2025-06-30", status: "CONCLUIDA", funcionarios: ["Rafael Andrade", "Beatriz Carvalho"] },
  { id: 2, aeronave: "AX-200-ATL-001", nome: "Instalação de Sistemas Elétricos", prazo: "2025-08-15", status: "ANDAMENTO", funcionarios: ["Beatriz Carvalho", "Lucas Monteiro"]  },
  { id: 3, aeronave: "AX-200-ATL-001", nome: "Montagem das Asas",                prazo: "2025-10-30", status: "PENDENTE",  funcionarios: []                                       },
  { id: 4, aeronave: "MX-060-CON-003", nome: "Estrutura da Fuselagem Militar",   prazo: "2025-07-20", status: "ANDAMENTO", funcionarios: ["Rafael Andrade"]                       },
  { id: 5, aeronave: "AX-120-PAM-002", nome: "Instalação de Aviônicos",          prazo: "2025-09-10", status: "PENDENTE",  funcionarios: ["Fernanda Souza"]                       },
];

export const INIT_TESTES: Teste[] = [
  { id: 1, aeronave: "AX-200-ATL-001", tipo: "ELETRICO",     resultado: "APROVADO"  },
  { id: 2, aeronave: "AX-200-ATL-001", tipo: "HIDRAULICO",   resultado: "APROVADO"  },
  { id: 3, aeronave: "MX-060-CON-003", tipo: "AERODINAMICO", resultado: "REPROVADO" },
  { id: 4, aeronave: "AX-120-PAM-002", tipo: "ELETRICO",     resultado: "APROVADO"  },
  { id: 5, aeronave: "AX-090-MER-004", tipo: "HIDRAULICO",   resultado: "APROVADO"  },
];

// ─── BADGE CONFIG (paleta light) ─────────────────────────────────────────────

type BadgeEntry = { bg: string; color: string; border: string; label: string };

export const BADGE_CONFIG: Record<string, BadgeEntry> = {
  COMERCIAL:     { bg: "#e6f4f8", color: "#1d6a82", border: "#a8cdd8", label: "Comercial"     },
  MILITAR:       { bg: "#fef3e2", color: "#a05c08", border: "#f0c878", label: "Militar"       },
  NACIONAL:      { bg: "#e8f8f2", color: "#0a7a5a", border: "#90d4b8", label: "Nacional"      },
  IMPORTADA:     { bg: "#f0ecff", color: "#5b30b0", border: "#c0a8f0", label: "Importada"     },
  EM_PRODUCAO:   { bg: "#fef3e2", color: "#a05c08", border: "#f0c878", label: "Em Produção"   },
  EM_TRANSPORTE: { bg: "#e6f4f8", color: "#1d6a82", border: "#a8cdd8", label: "Em Transporte" },
  PRONTA:        { bg: "#e8f8f2", color: "#0a7a5a", border: "#90d4b8", label: "Pronta"        },
  PENDENTE:      { bg: "#f2f6f8", color: "#5a8496", border: "#b8cfd8", label: "Pendente"      },
  ANDAMENTO:     { bg: "#e6f4f8", color: "#1d6a82", border: "#a8cdd8", label: "Em Andamento"  },
  CONCLUIDA:     { bg: "#e8f8f2", color: "#0a7a5a", border: "#90d4b8", label: "Concluída"     },
  ADMINISTRADOR: { bg: "#fef3e2", color: "#a05c08", border: "#f0c878", label: "Admin"         },
  ENGENHEIRO:    { bg: "#e6f4f8", color: "#1d6a82", border: "#a8cdd8", label: "Engenheiro"    },
  OPERADOR:      { bg: "#f2f6f8", color: "#5a8496", border: "#b8cfd8", label: "Operador"      },
  ELETRICO:      { bg: "#e6f4f8", color: "#1d6a82", border: "#a8cdd8", label: "Elétrico"      },
  HIDRAULICO:    { bg: "#f0ecff", color: "#5b30b0", border: "#c0a8f0", label: "Hidráulico"    },
  AERODINAMICO:  { bg: "#e8f8f2", color: "#0a7a5a", border: "#90d4b8", label: "Aerodinâmico"  },
  APROVADO:      { bg: "#e8f8f2", color: "#0a7a5a", border: "#90d4b8", label: "Aprovado"      },
  REPROVADO:     { bg: "#fde8e8", color: "#b91c1c", border: "#f0a0a0", label: "Reprovado"     },
};

// ─── COMPONENTES COMPARTILHADOS ───────────────────────────────────────────────

interface BadgeProps { value: string; }
export function Badge({ value }: BadgeProps) {
  const c = BADGE_CONFIG[value] ?? { bg: "#f2f6f8", color: "#5a8496", border: "#b8cfd8", label: value };
  return (
    <span style={{
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
      borderRadius: 5, padding: "2px 9px", fontSize: 11.5, fontWeight: 600,
      letterSpacing: 0.2, display: "inline-block", whiteSpace: "nowrap",
    }}>
      {c.label}
    </span>
  );
}

interface ModalProps { title: string; onClose: () => void; children: ReactNode; width?: number; }
export function Modal({ title, onClose, children, width = 520 }: ModalProps) {
  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, background: "rgba(15,50,70,.22)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        backdropFilter: "blur(2px)",
      }}
    >
      <div style={{
        background: "#fff", border: "1px solid #cde0e8", borderRadius: 14,
        padding: 28, width, maxWidth: "94vw", boxShadow: "0 8px 40px rgba(43,122,145,.12)",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 20, fontWeight: 700, color: "#1a3a48", letterSpacing: 0.3 }}>
            {title}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#8ab0bc", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: 4 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

interface FormRowProps { children: ReactNode; }
export function FormRow({ children }: FormRowProps) {
  const count = Array.isArray(children) ? children.length : 1;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${count}, 1fr)`, gap: 12 }}>
      {children}
    </div>
  );
}

interface FieldProps { label: string; children: ReactNode; }
export function Field({ label, children }: FieldProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#5a8496", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

interface ModalFooterProps { onClose: () => void; onConfirm: () => void; confirmLabel?: string; variant?: string; }
export function ModalFooter({ onClose, onConfirm, confirmLabel = "Salvar", variant = "primary" }: ModalFooterProps) {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24, paddingTop: 16, borderTop: "1px solid #e8f2f6" }}>
      <button className="btn-outline" onClick={onClose}>Cancelar</button>
      <button className={`btn-${variant}`} onClick={onConfirm}>{confirmLabel}</button>
    </div>
  );
}

interface StatCardProps { num: number | string; label: string; color?: string; }
export function StatCard({ num, label, color = "#2B7A91" }: StatCardProps) {
  return (
    <div style={{ background: "#fff", border: "1px solid #cde0e8", borderRadius: 10, padding: "16px 20px", boxShadow: "0 1px 4px rgba(43,122,145,.06)" }}>
      <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 32, fontWeight: 700, color, lineHeight: 1 }}>{num}</div>
      <div style={{ fontSize: 11, color: "#8ab0bc", textTransform: "uppercase", letterSpacing: 0.8, marginTop: 6 }}>{label}</div>
    </div>
  );
}

// ─── ESTILOS COMPARTILHADOS (light theme) ────────────────────────────────────

export const TH_STYLE: CSSProperties = {
  padding: "10px 18px", textAlign: "left", fontSize: 10.5, fontWeight: 700,
  color: "#5a9ab0", textTransform: "uppercase", letterSpacing: 1,
  borderBottom: "1px solid #daeaf0", background: "#f4f9fb", whiteSpace: "nowrap",
};
export const TD_STYLE: CSSProperties = {
  padding: "13px 18px", fontSize: 13.5, color: "#2a4a58", borderBottom: "1px solid #eef4f7",
};
export const CARD_STYLE: CSSProperties = {
  background: "#ffffff", border: "1px solid #cde0e8", borderRadius: 12, overflow: "hidden",
  boxShadow: "0 1px 6px rgba(43,122,145,.07)",
};
export const CARD_HDR: CSSProperties = {
  padding: "14px 20px", borderBottom: "1px solid #daeaf0",
  display: "flex", alignItems: "center", justifyContent: "space-between",
  background: "#f9fcfd",
};
export const CARD_TTL: CSSProperties = {
  fontSize: 12, fontWeight: 700, color: "#2B7A91", textTransform: "uppercase", letterSpacing: 1,
};
export const MONO_CODE: CSSProperties = {
  fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#2B7A91",
};
