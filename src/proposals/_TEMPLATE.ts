/**
 * MODELO DE ORÇAMENTO
 * 1. Copie este arquivo e renomeie (ex.: "199-nome-do-cliente.ts").
 * 2. Preencha os campos.
 * 3. Registre em src/proposals/index.ts.
 * O endereço da página será /{slug}.
 * Campos com "—" ou vazios não aparecem na página.
 */
import type { Proposal } from "./types";
import { DEFAULT_TERMOS } from "./defaults";

export const proposal: Proposal = {
  // Identificador da URL (só letras minúsculas, números e hífens). Ex.: "199-cafe-aurora"
  slug: "000-nome-do-cliente",
  // Número do orçamento. Use "—" se não houver.
  numero: "000",
  // Data de emissão (dd/mm/aaaa)
  emissao: "01/01/2026",
  // Validade do orçamento (dd/mm/aaaa)
  validoAte: "31/01/2026",

  cliente: {
    // Nome da empresa ou do cliente
    empresa: "Nome da empresa",
    // CPF ou CNPJ (opcional, apague a linha se não houver)
    documento: "00.000.000/0000-00",
    // Pessoa responsável pelo contato
    responsavel: "Nome",
    // WhatsApp do cliente, com DDI e DDD
    whatsapp: "+55 48 90000-0000",
    // E-mail (opcional, apague a linha se não houver)
    email: "contato@empresa.com",
    // Cidade - UF
    cidade: "Florianópolis - SC",
  },

  projeto: {
    // Nome do projeto (título grande da página)
    nome: "Nome do projeto",
    // Palavra ou expressão curta em itálico vermelho ao lado do título
    destaque: "destaque",
    // Parágrafo de apresentação abaixo do título
    resumo: "Resumo do projeto em uma ou duas frases.",
    // Comercial | Gastronomia | Automotivo | Documentário | Institucional | Evento | Outro
    tipo: "Comercial",
    // Data(s) de captação
    datas: "01/01/2026",
    // Horário (opcional)
    horario: "09:00 às 12:00",
    // Local da captação
    local: "Endereço",
    // Duração / diárias (ex.: "1 diária", "3 horas")
    diarias: "1 diária",
    // Resumo do que será entregue
    entregaveis: "01 vídeo...",
  },

  // Frase de abertura do escopo (opcional)
  escopoIntro: "Referência: ...",
  // Itens do escopo, numerados sozinhos (01, 02...). "bullets" é opcional.
  escopo: [
    {
      titulo: "Entrega",
      subtitulo: "O que você recebe",
      descricao: "",
      bullets: ["Item 1", "Item 2"],
    },
  ],

  // Tabela de investimento: total da linha, subtotal e total são calculados sozinhos.
  itens: [{ descricao: "Descrição do serviço", qtd: 1, valorUnit: 1000 }],
  // Desconto em reais (opcional)
  // desconto: 100,
  // Observação abaixo da tabela (opcional)
  // observacaoValores: "Valores válidos para pagamento via PIX.",

  // Condições
  pagamento: "50% na aprovação, 50% na entrega",
  prazoEntrega: "Até 7 dias após a captação",
  rodadasAjuste: "02",
  // Condições extras numeradas (opcional)
  // condicoes: [{ titulo: "Entrega", subtitulo: "Google Drive", descricao: "..." }],

  // Itens não inclusos (opcional)
  // naoIncluso: ["..."],

  // Termos e condições: use a lista padrão ou escreva a sua
  termos: DEFAULT_TERMOS,

  // Cláusula longa de pagamento e cancelamento (opcional). Parágrafos separados por linha em branco.
  // pagamentoCancelamento: "...",
};
