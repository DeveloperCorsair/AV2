import { useState } from "react";
import {
  type Funcionario,
  NIVEL_PERMISSAO,
  Badge, Modal, FormRow, Field, ModalFooter,
  CARD_STYLE, CARD_HDR, CARD_TTL, TH_STYLE, TD_STYLE,
} from "../enums/enum";

interface FuncionariosPageProps {
  funcionarios: Funcionario[];
  setFuncionarios: React.Dispatch<React.SetStateAction<Funcionario[]>>;
}

interface FuncionarioForm {
  nome: string; telefone: string; endereco: string; usuario: string; nivelPermissao: string;
}

export function FuncionariosPage({ funcionarios, setFuncionarios }: FuncionariosPageProps) {
  const [createOpen, setCreateOpen] = useState(false);

  const blank: FuncionarioForm = { nome: "", telefone: "", endereco: "", usuario: "", nivelPermissao: "OPERADOR" };
  const [form, setForm] = useState<FuncionarioForm>(blank);

  const upd = (k: keyof FuncionarioForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    if (!form.nome.trim() || !form.usuario.trim()) { alert("Nome e usuário são obrigatórios."); return; }
    if (funcionarios.find(f => f.usuario === form.usuario)) { alert(`O usuário "${form.usuario}" já está em uso.`); return; }
    const id = String(funcionarios.length + 1).padStart(4, "0");
    setFuncionarios(prev => [...prev, { ...form, id }]);
    setForm(blank);
    setCreateOpen(false);
  };

  return (
    <div>
      <div style={CARD_STYLE}>
        <div style={CARD_HDR}>
          <span style={CARD_TTL}>Equipe de Produção</span>
          <button className="btn-primary" onClick={() => { setForm(blank); setCreateOpen(true); }}>+ Novo Funcionário</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["ID", "Nome", "Telefone", "Endereço", "Usuário", "Nível de Acesso"].map(h =>
              <th key={h} style={TH_STYLE}>{h}</th>
            )}</tr>
          </thead>
          <tbody>
            {funcionarios.map((fn, i) => (
              <tr key={fn.id} className="row-hover" style={{ background: i % 2 === 0 ? "transparent" : "rgba(43,122,145,.03)" }}>
                <td style={TD_STYLE}><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#8ab0bc" }}>{fn.id}</span></td>
                <td style={{ ...TD_STYLE, fontWeight: 500 }}>{fn.nome}</td>
                <td style={{ ...TD_STYLE, color: "#5a8496" }}>{fn.telefone}</td>
                <td style={{ ...TD_STYLE, color: "#5a8496" }}>{fn.endereco}</td>
                <td style={TD_STYLE}><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#2B7A91" }}>{fn.usuario}</span></td>
                <td style={TD_STYLE}><Badge value={fn.nivelPermissao} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {createOpen && (
        <Modal title="Novo Funcionário" onClose={() => setCreateOpen(false)}>
          <FormRow>
            <Field label="Nome completo">
              <input value={form.nome} onChange={upd("nome")} placeholder="Rafael Andrade" />
            </Field>
            <Field label="Telefone">
              <input value={form.telefone} onChange={upd("telefone")} placeholder="(12) 99000-0000" />
            </Field>
          </FormRow>
          <Field label="Endereço">
            <input value={form.endereco} onChange={upd("endereco")} placeholder="São José dos Campos - SP" />
          </Field>
          <FormRow>
            <Field label="Usuário (login)">
              <input value={form.usuario} onChange={upd("usuario")} placeholder="rafael.eng" />
            </Field>
            <Field label="Nível de permissão">
              <select value={form.nivelPermissao} onChange={upd("nivelPermissao")}>
                {NIVEL_PERMISSAO.map(n => <option key={n}>{n}</option>)}
              </select>
            </Field>
          </FormRow>
          <div style={{ background: "#eef7fa", border: "1px solid #a8cdd8", borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: "#1d6a82", marginBottom: 4 }}>
            A senha inicial será definida pelo administrador do sistema via CLI.
          </div>
          <ModalFooter onClose={() => setCreateOpen(false)} onConfirm={handleSave} />
        </Modal>
      )}
    </div>
  );
}
