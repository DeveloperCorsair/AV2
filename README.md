# ✈️ AeroCode — Sistema de Gestão da Produção de Aeronaves (GUI)

<p>
Este projeto é a interface gráfica (GUI) do sistema de gestão da produção de aeronaves da AeroCode, desenvolvida como uma <strong>Single-Page Application (SPA)</strong> utilizando React e TypeScript. A aplicação permite gerenciar aeronaves, peças, etapas de produção, testes, funcionários e gerar relatórios finais, tudo em uma interface web moderna, responsiva e sem recarregamento de página.
</p>

---

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (incluído com o Node.js)

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório e entre na pasta do projeto

```bash
cd AV2
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 4. Acesse no navegador

```
http://localhost:5173
```

### 🔑 Login padrão

| Usuário | Senha    | Nível          |
| :-----: | :------: | :------------: |
| admin   | admin123 | Administrador  |

---

## 🖥️ Como Usar

Após fazer login, utilize o **menu lateral (sidebar)** para navegar entre os módulos:

```
✈  Aeronaves
⚙  Peças
📋 Etapas de Produção
🧪 Testes
👥 Funcionários
📄 Relatório Final
```

### Operações disponíveis por módulo:

- **Aeronaves** — Cadastrar novas aeronaves com código único, modelo, tipo, capacidade e alcance. Editar registros existentes. Visualizar KPIs totais da frota.
- **Peças** — Cadastrar peças por aeronave com tipo (Nacional/Importada) e fornecedor. Atualizar o status de produção (Em Produção → Em Transporte → Pronta).
- **Etapas de Produção** — Cadastrar etapas com prazo e aeronave vinculada. Avançar status (Pendente → Em Andamento → Concluída). Associar funcionários responsáveis.
- **Testes** — Registrar testes técnicos (Elétrico, Hidráulico, Aerodinâmico) com resultado (Aprovado/Reprovado). Visualizar taxa de aprovação global.
- **Funcionários** — Cadastrar membros da equipe com nível de permissão (Administrador, Engenheiro, Operador) e dados de contato.
- **Relatório Final** — Selecionar uma aeronave, informar cliente e data de entrega. Gerar um relatório consolidado com peças, etapas e testes.

---

## 📁 Estrutura do projeto

```
├── 📁 relatorio
|   └── 📕 relatorio_aerocode.pdf
├── 📁 src
│   ├── 📁 components
│   │   └── 📄 aside.ts          
│   ├── 📁 enums
│   │   └── 📄 enum.tsx          
│   ├── 📁 pages
│   │   ├── 📄 aeronave.tsx      
│   │   ├── 📄 etapaProducao.tsx 
│   │   ├── 📄 funcionario.tsx   
│   │   ├── 📄 login.tsx         
│   │   ├── 📄 peca.tsx          
│   │   ├── 📄 relatorio.tsx     
│   │   └── 📄 teste.tsx         
│   ├── 📄 App.tsx               
│   ├── 📄 index.css             
│   ├── 📄 login.css             
|   ├── 🖼️ logo.png
│   └── 📄 main.tsx
├── 📁 wireframe
│   ├── 🖼️ etapas.png
│   ├── 🖼️ funcionarios.png
│   ├── 🖼️ home.png
│   ├── 🖼️ login.png
│   ├── 🖼️ modal-cadastro.png
│   ├── 🖼️ modal-testes.png
│   ├── 🖼️ peças.png
│   ├── 🖼️ relatório-final.png
│   ├── 🖼️ relatório.png
│   ├── 🖼️ testes.png
|   └── 🖼️ wireframe_completo.png
├── ⚙️ index.html
├── ⚙️ package.json
├── ⚙️ tsconfig.json
└── ⚙️ vite.config.ts
```

---

## 📦 O que foi implementado

- **Aeronaves** — cadastro com código único, modelo, tipo (COMERCIAL/MILITAR), capacidade e alcance. Edição de registros com proteção de código. KPIs com totais da frota.
- **Peças** — nome, tipo (NACIONAL/IMPORTADA), fornecedor e status com atualização via modal dedicado.
- **Etapas de Produção** — criação de etapas com prazo, avanço de status sequencial, associação de funcionários responsáveis.
- **Testes** — Elétrico, Hidráulico e Aerodinâmico com resultado Aprovado/Reprovado. Barra de progresso com taxa de aprovação global.
- **Funcionários** — cadastro completo com níveis de permissão e geração automática de ID sequencial.
- **Relatório Final** — geração dinâmica com dados consolidados de peças, etapas e testes por aeronave.
- **Autenticação** — tela de login com validação de credenciais, sessão por estado React e logout disponível na sidebar.
- **Permissões** — três níveis de acesso refletidos nos dados de sessão (Administrador, Engenheiro, Operador).
- **Componentes reutilizáveis** — `Badge`, `Modal`, `Field`, `FormRow`, `ModalFooter` e `StatCard` centralizados em `enum.tsx`.
- **Enumerações** — todos os tipos de aeronave, peça, status, permissão, teste e resultado implementados como constantes tipadas.
- **Tipagem estrita** — todas as interfaces, props de componentes e handlers de evento tipados com TypeScript.

---

## 🎨 Tecnologias Utilizadas

| Tecnologia       | Finalidade                                              |
| :--------------: | :-----------------------------------------------------: |
| React 18+        | Framework principal da SPA                             |
| TypeScript 5+    | Tipagem estática em todo o projeto                     |
| Vite 5+          | Build tool e servidor de desenvolvimento               |
| CSS (inline + módulos) | Estilos por componente sem conflitos globais      |
| Google Fonts     | DM Sans (corpo), Rajdhani (títulos), JetBrains Mono (códigos) |

---

## 🗂️ Scripts disponíveis

| Comando         | Descrição                          |
| :-------------: | :--------------------------------: |
| `npm run dev`   | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção em `/dist` |
| `npm run preview` | Pré-visualiza o build de produção |