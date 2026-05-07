import { type CSSProperties, type ReactNode } from "react";

// INTERFACES DE DADOS

export interface Usuario {
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

// ENUMS

export const TIPO_AERONAVE = ["COMERCIAL", "MILITAR"];
export const TIPO_PECA = ["NACIONAL", "IMPORTADA"];
export const STATUS_PECA = ["EM_PRODUCAO", "EM_TRANSPORTE", "PRONTA"];
export const STATUS_ETAPA = ["PENDENTE", "ANDAMENTO", "CONCLUIDA"];
export const NIVEL_PERMISSAO = ["ADMINISTRADOR", "ENGENHEIRO", "OPERADOR"];
export const TIPO_TESTE = ["ELETRICO", "HIDRAULICO", "AERODINAMICO"];
export const RESULTADO_TESTE = ["APROVADO", "REPROVADO"];

// DADOS MOCKADOS

export const INIT_AERONAVES: Aeronave[] = [
    { codigo: "EMB-195-E2-001", modelo: "Embraer E195-E2", tipo: "COMERCIAL", capacidade: 146, alcance: 4800 },
    { codigo: "KC-390-002", modelo: "Embraer KC-390", tipo: "MILITAR", capacidade: 80, alcance: 2800 },
    { codigo: "EMB-170-003", modelo: "Embraer E170", tipo: "COMERCIAL", capacidade: 76, alcance: 3900 },
];

export const INIT_FUNCIONARIOS: Funcionario[] = [
    { id: "0001", nome: "Carlos Mendonça", telefone: "(12) 99123-4567", endereco: "São José dos Campos - SP", usuario: "carlos.adm", nivelPermissao: "ADMINISTRADOR" },
    { id: "0002", nome: "Ana Paula Ribeiro", telefone: "(12) 98765-3210", endereco: "São José dos Campos - SP", usuario: "ana.eng", nivelPermissao: "ENGENHEIRO" },
    { id: "0003", nome: "Roberto Lima", telefone: "(12) 97654-2109", endereco: "Jacareí - SP", usuario: "roberto.op", nivelPermissao: "OPERADOR" },
];

export const INIT_PECAS: Peca[] = [
    { id: 1, aeronave: "EMB-195-E2-001", nome: "Motor Pratt & Whitney GTF", tipo: "IMPORTADA", fornecedor: "Pratt & Whitney", status: "PRONTA" },
    { id: 2, aeronave: "EMB-195-E2-001", nome: "Trem de Pouso Principal", tipo: "NACIONAL", fornecedor: "Embraer Componentes", status: "EM_TRANSPORTE" },
    { id: 3, aeronave: "KC-390-002", nome: "Sistema Hidráulico Central", tipo: "IMPORTADA", fornecedor: "Parker Hannifin", status: "EM_PRODUCAO" },
    { id: 4, aeronave: "EMB-170-003", nome: "Avionics Suite Honeywell", tipo: "IMPORTADA", fornecedor: "Honeywell Aerospace", status: "PRONTA" },
];

export const INIT_ETAPAS: Etapa[] = [
    { id: 1, aeronave: "EMB-195-E2-001", nome: "Montagem da Fuselagem", prazo: "2025-06-30", status: "CONCLUIDA", funcionarios: ["Carlos Mendonça", "Ana Paula Ribeiro"] },
    { id: 2, aeronave: "EMB-195-E2-001", nome: "Instalação de Sistemas Elétricos", prazo: "2025-08-15", status: "ANDAMENTO", funcionarios: ["Ana Paula Ribeiro", "Roberto Lima"] },
    { id: 3, aeronave: "EMB-195-E2-001", nome: "Montagem das Asas", prazo: "2025-10-30", status: "PENDENTE", funcionarios: [] },
    { id: 4, aeronave: "KC-390-002", nome: "Estrutura da Fuselagem Militar", prazo: "2025-07-20", status: "ANDAMENTO", funcionarios: ["Carlos Mendonça"] },
];

export const INIT_TESTES: Teste[] = [
    { id: 1, aeronave: "EMB-195-E2-001", tipo: "ELETRICO", resultado: "APROVADO" },
    { id: 2, aeronave: "EMB-195-E2-001", tipo: "HIDRAULICO", resultado: "APROVADO" },
    { id: 3, aeronave: "KC-390-002", tipo: "AERODINAMICO", resultado: "REPROVADO" },
    { id: 4, aeronave: "EMB-170-003", tipo: "ELETRICO", resultado: "APROVADO" },
];

// BADGE CONFIG

type BadgeEntry = { bg: string; color: string; border: string; label: string };

export const BADGE_CONFIG: Record<string, BadgeEntry> = {
    COMERCIAL: { bg: "rgba(56,189,248,.12)", color: "#38bdf8", border: "rgba(56,189,248,.3)", label: "Comercial" },
    MILITAR: { bg: "rgba(245,158,11,.12)", color: "#f59e0b", border: "rgba(245,158,11,.3)", label: "Militar" },
    NACIONAL: { bg: "rgba(16,185,129,.12)", color: "#10b981", border: "rgba(16,185,129,.3)", label: "Nacional" },
    IMPORTADA: { bg: "rgba(139,92,246,.12)", color: "#a78bfa", border: "rgba(139,92,246,.3)", label: "Importada" },
    EM_PRODUCAO: { bg: "rgba(245,158,11,.12)", color: "#f59e0b", border: "rgba(245,158,11,.3)", label: "Em Produção" },
    EM_TRANSPORTE: { bg: "rgba(56,189,248,.12)", color: "#38bdf8", border: "rgba(56,189,248,.3)", label: "Em Transporte" },
    PRONTA: { bg: "rgba(16,185,129,.12)", color: "#10b981", border: "rgba(16,185,129,.3)", label: "Pronta" },
    PENDENTE: { bg: "rgba(100,116,139,.12)", color: "#64748b", border: "rgba(100,116,139,.3)", label: "Pendente" },
    ANDAMENTO: { bg: "rgba(56,189,248,.12)", color: "#38bdf8", border: "rgba(56,189,248,.3)", label: "Em Andamento" },
    CONCLUIDA: { bg: "rgba(16,185,129,.12)", color: "#10b981", border: "rgba(16,185,129,.3)", label: "Concluída" },
    ADMINISTRADOR: { bg: "rgba(245,158,11,.12)", color: "#f59e0b", border: "rgba(245,158,11,.3)", label: "Admin" },
    ENGENHEIRO: { bg: "rgba(56,189,248,.12)", color: "#38bdf8", border: "rgba(56,189,248,.3)", label: "Engenheiro" },
    OPERADOR: { bg: "rgba(100,116,139,.12)", color: "#94a3b8", border: "rgba(100,116,139,.3)", label: "Operador" },
    ELETRICO: { bg: "rgba(56,189,248,.12)", color: "#38bdf8", border: "rgba(56,189,248,.3)", label: "Elétrico" },
    HIDRAULICO: { bg: "rgba(139,92,246,.12)", color: "#a78bfa", border: "rgba(139,92,246,.3)", label: "Hidráulico" },
    AERODINAMICO: { bg: "rgba(16,185,129,.12)", color: "#10b981", border: "rgba(16,185,129,.3)", label: "Aerodinâmico" },
    APROVADO: { bg: "rgba(16,185,129,.12)", color: "#10b981", border: "rgba(16,185,129,.3)", label: "Aprovado" },
    REPROVADO: { bg: "rgba(239,68,68,.12)", color: "#ef4444", border: "rgba(239,68,68,.3)", label: "Reprovado" },
};

// COMPONENTES COMPARTILHADOS

interface BadgeProps { value: string; }
export function Badge({ value }: BadgeProps) {
    const c = BADGE_CONFIG[value] ?? { bg: "rgba(100,116,139,.12)", color: "#64748b", border: "rgba(100,116,139,.3)", label: value };
    return (
        <span style={{
            background: c.bg, color: c.color, border: `1px solid ${c.border}`,
            borderRadius: 5, padding: "2px 8px", fontSize: 11.5, fontWeight: 600,
            letterSpacing: 0.3, display: "inline-block", whiteSpace: "nowrap",
        }}>
            {c.label}
        </span>
    );
}

interface ModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
    width?: number;
}
export function Modal({ title, onClose, children, width = 520 }: ModalProps) {
    return (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal-box" style={{ width }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                    <h2 style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 20, fontWeight: 700, color: "#e2e8f0", letterSpacing: 0.5 }}>
                        {title}
                    </h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", color: "#3d5a78", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: 4 }}>✕</button>
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
    return <div style={{ marginBottom: 14 }}><label>{label}</label>{children}</div>;
}

interface ModalFooterProps {
    onClose: () => void;
    onConfirm: () => void;
    confirmLabel?: string;
    variant?: string;
}
export function ModalFooter({ onClose, onConfirm, confirmLabel = "Salvar", variant = "primary" }: ModalFooterProps) {
    return (
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24, paddingTop: 16, borderTop: "1px solid #0f2035" }}>
            <button className="btn-outline" onClick={onClose}>Cancelar</button>
            <button className={`btn-${variant}`} onClick={onConfirm}>{confirmLabel}</button>
        </div>
    );
}

interface StatCardProps {
    num: number | string;
    label: string;
    color?: string;
}
export function StatCard({ num, label, color = "#38bdf8" }: StatCardProps) {
    return (
        <div style={{ background: "#07101f", border: "1px solid #0f2035", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 30, fontWeight: 700, color, lineHeight: 1 }}>{num}</div>
            <div style={{ fontSize: 11, color: "#2a4a6a", textTransform: "uppercase", letterSpacing: 0.8, marginTop: 5 }}>{label}</div>
        </div>
    );
}

// ESTILOS coCOMPARTILHADOS

export const TH_STYLE: CSSProperties = {
    padding: "10px 18px", textAlign: "left", fontSize: 10.5, fontWeight: 600,
    color: "#2a4a6a", textTransform: "uppercase", letterSpacing: 1,
    borderBottom: "1px solid #0f2035", background: "#050a12", whiteSpace: "nowrap",
};
export const TD_STYLE: CSSProperties = {
    padding: "13px 18px", fontSize: 13.5, color: "#cbd5e1", borderBottom: "1px solid #080f1c",
};
export const CARD_STYLE: CSSProperties = {
    background: "#0a1525", border: "1px solid #0f2035", borderRadius: 12, overflow: "hidden",
};
export const CARD_HDR: CSSProperties = {
    padding: "14px 20px", borderBottom: "1px solid #0f2035",
    display: "flex", alignItems: "center", justifyContent: "space-between",
};
export const CARD_TTL: CSSProperties = {
    fontSize: 12, fontWeight: 600, color: "#3d5a78", textTransform: "uppercase", letterSpacing: 1,
};
export const MONO_CODE: CSSProperties = {
    fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#38bdf8",
};
