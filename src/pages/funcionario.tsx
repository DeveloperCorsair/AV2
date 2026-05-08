import { useState } from "react";
import {
  type Funcionario,
  NIVEL_PERMISSAO,
  Badge, Modal, FormRow, Field, ModalFooter,
  CARD_STYLE, CARD_HDR, CARD_TTL, TH_STYLE, TD_STYLE, MONO_CODE,
} from "../enums/enum";

interface FuncionariosPageProps {
  funcionarios: Funcionario[];
  setFuncionarios: React.Dispatch<React.SetStateAction<Funcionario[]>>;
}

interface FuncForm { nome: string; telefone: string; endereco: string; usuario: string; nivelPermissao: string; }

export function FuncionariosPage({ funcionarios, setFuncionarios }: FuncionariosPageProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget]  = useState<Funcionario | null>(null);

  const blank: FuncForm = { nome: "", telefone: "", endereco: "", usuario: "", nivelPermissao: "OPERADOR" };
  const [form, setForm] = useState<FuncForm>(blank);

  const upd = (k: keyof FuncForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const openCreate = () => { setForm(blank); setCreateOpen(true); };
  const openEdit   = (fn: Funcionario) => {
    setForm({ nome: fn.nome, telefone: fn.telefone, endereco: fn.endereco, usuario: fn.usuario, nivelPermissao: fn.nivelPermissao });
    setEditTarget(fn);
  };

  const handleSave = () => {
    if (!form.nome.trim() || !form.usuario.trim()) { alert("Nome e usuário são obrigatórios."); return; }

    if (editTarget) {
      const conflito = funcionarios.find(f => f.usuario === form.usuario && f.id !== editTarget.id);
      if (conflito) { alert(`O usuário "${form.usuario}" já está em uso.`); return; }
      setFuncionarios(prev => prev.map(f => f.id === editTarget.id ? { ...f, ...form } : f));
      setEditTarget(null);
    } else {
      if (funcionarios.find(f => f.usuario === form.usuario)) { alert(`O usuário "${form.usuario}" já está em uso.`); return; }
      const id = String(funcionarios.length + 1).padStart(4, "0");
      setFuncionarios(prev => [...prev, { ...form, id }]);
      setForm(blank);
      setCreateOpen(false);
    }
  };

  const FuncForm = ({ isEdit }: { isEdit: boolean }) => (
    <>
      <FormRow>
        <Field label="Nome completo">
          <input value={form.nome} onChange={upd("nome")} placeholder="Carlos Mendonça" />
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
          <input value={form.usuario} onChange={upd("usuario")} placeholder="carlos.eng" />
        </Field>
        <Field label="Nível de permissão">
          <select value={form.nivelPermissao} onChange={upd("nivelPermissao")}>
            {NIVEL_PERMISSAO.map(n => <option key={n}>{n}</option>)}
          </select>
        </Field>
      </FormRow>
      {!isEdit && (
        <div style={{
          background: "#eef7fa", border: "1px solid #cde0e8", borderRadius: 8,
          padding: "10px 14px", fontSize: 12.5, color: "#2B7A91",
        }}>
          A senha inicial será definida pelo administrador do sistema via CLI.
        </div>
      )}
    </>
  );

  return (
    <div>
      <div style={CARD_STYLE}>
        <div style={CARD_HDR}>
          <span style={CARD_TTL}>Equipe de Produção</span>
          <button className="btn-primary" onClick={openCreate}>+ Novo Funcionário</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["ID", "Nome", "Telefone", "Endereço", "Usuário", "Nível de Acesso", "Ações"].map(h =>
              <th key={h} style={TH_STYLE}>{h}</th>
            )}</tr>
          </thead>
          <tbody>
            {funcionarios.map((fn, i) => (
              <tr key={fn.id} className="row-hover" style={{ background: i % 2 === 0 ? "transparent" : "rgba(43,122,145,.03)" }}>
                <td style={TD_STYLE}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11.5, color: "#8ab0bc" }}>{fn.id}</span>
                </td>
                <td style={{ ...TD_STYLE, fontWeight: 500, color: "#1a3a48" }}>{fn.nome}</td>
                <td style={{ ...TD_STYLE, color: "#5a8496" }}>{fn.telefone}</td>
                <td style={{ ...TD_STYLE, color: "#5a8496" }}>{fn.endereco}</td>
                <td style={TD_STYLE}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#2B7A91" }}>{fn.usuario}</span>
                </td>
                <td style={TD_STYLE}><Badge value={fn.nivelPermissao} /></td>
                <td style={TD_STYLE}>
                  <button className="btn-ghost" onClick={() => openEdit(fn)}>✎ Editar</button>
                </td>
              </tr>
            ))}
            {funcionarios.length === 0 && (
              <tr><td colSpan={7} style={{ ...TD_STYLE, textAlign: "center", color: "#a0bec8", padding: "36px 0" }}>Nenhum funcionário cadastrado</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: novo funcionário */}
      {createOpen && (
        <Modal title="Novo Funcionário" onClose={() => setCreateOpen(false)}>
          <FuncForm isEdit={false} />
          <ModalFooter onClose={() => setCreateOpen(false)} onConfirm={handleSave} />
        </Modal>
      )}

      {/* Modal: editar funcionário */}
      {editTarget && (
        <Modal title={`Editar — ${editTarget.nome}`} onClose={() => setEditTarget(null)}>
          <div style={{
            background: "#eef7fa", border: "1px solid #cde0e8", borderRadius: 8,
            padding: "10px 14px", marginBottom: 16, fontSize: 12.5, color: "#2B7A91",
          }}>
            ID do funcionário: <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>{editTarget.id}</span> — não pode ser alterado.
          </div>
          <FuncForm isEdit={true} />
          <ModalFooter onClose={() => setEditTarget(null)} onConfirm={handleSave} confirmLabel="Atualizar Dados" />
        </Modal>
      )}
    </div>
  );
}
