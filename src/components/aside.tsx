// TIPOS 

export type PageId = "aeronaves" | "pecas" | "etapas" | "testes" | "funcionarios" | "relatorio";

interface PageMeta {
  title: string;
  sub: string;
}

interface NavItem {
  id: PageId;
  icon: string;
  label: string;
}

// METADADOS DAS PÁGINAS 

export const PAGE_META: Record<PageId, PageMeta> = {
  aeronaves: { title: "Aeronaves", sub: "Cadastro e gestão da frota de aeronaves" },
  pecas: { title: "Peças e Componentes", sub: "Controle de peças, fornecedores e status de produção" },
  etapas: { title: "Etapas de Produção", sub: "Acompanhamento das etapas e responsáveis" },
  testes: { title: "Testes", sub: "Registro e resultados dos testes realizados" },
  funcionarios: { title: "Funcionários", sub: "Equipe de produção e níveis de acesso" },
  relatorio: { title: "Relatório Final", sub: "Geração de relatório de entrega por aeronave" },
};

// ITENS DE NAVEGAÇÃO 

export const NAV_ITEMS: NavItem[] = [
  { id: "aeronaves", icon: "✈", label: "Aeronaves" },
  { id: "pecas", icon: "⚙", label: "Peças" },
  { id: "etapas", icon: "📋", label: "Etapas" },
  { id: "testes", icon: "🧪", label: "Testes" },
  { id: "funcionarios", icon: "👥", label: "Funcionários" },
  { id: "relatorio", icon: "📄", label: "Relatório Final" },
];