export type ProposalTipo =
  | "Comercial"
  | "Gastronomia"
  | "Automotivo"
  | "Documentário"
  | "Institucional"
  | "Evento"
  | "Outro";

/** Linha numerada (escopo ou condição extra). */
export interface ProposalItem {
  titulo: string;
  subtitulo: string;
  descricao: string;
  bullets?: string[];
}

/** Linha da tabela de investimento. */
export interface InvestmentItem {
  descricao: string;
  qtd: number;
  valorUnit: number;
}

export interface Proposal {
  slug: string;
  numero: string;
  emissao: string;
  validoAte: string;
  cliente: {
    empresa: string;
    documento?: string;
    responsavel: string;
    whatsapp: string;
    email?: string;
    cidade: string;
  };
  projeto: {
    nome: string;
    destaque: string;
    resumo: string;
    tipo: ProposalTipo;
    datas: string;
    horario?: string;
    local: string;
    diarias: string;
    entregaveis: string;
  };
  escopoIntro?: string;
  escopo: ProposalItem[];
  itens: InvestmentItem[];
  desconto?: number;
  observacaoValores?: string;
  pagamento: string;
  prazoEntrega: string;
  rodadasAjuste: string;
  condicoes?: ProposalItem[];
  naoIncluso?: string[];
  termos: string[];
  pagamentoCancelamento?: string;
}
