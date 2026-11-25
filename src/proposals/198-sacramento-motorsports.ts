import type { Proposal } from "./types";
import { DEFAULT_TERMOS } from "./defaults";

export const proposal: Proposal = {
  slug: "198-sacramento-motorsports",
  numero: "198",
  emissao: "25/11/2026",
  validoAte: "30/12/2026",
  cliente: {
    empresa: "Sacramento Motorsports",
    documento: "32.312.666/0001-71",
    responsavel: "Ingrid",
    whatsapp: "+55 11 94552-9059",
    cidade: "São José - SC",
  },
  projeto: {
    nome: "Sacramento Motorsports",
    destaque: "aftermovie",
    resumo:
      "Cobertura do evento em um aftermovie vertical, com convidados, falas e depoimentos, pensado para Reels, TikTok e Stories.",
    tipo: "Evento",
    datas: "26/11/2026",
    local: "BR-101, km 209 - S/N - Praia Comprida",
    diarias: "3 horas",
    entregaveis: "01 vídeo Reels (vertical): cobertura do evento, convidados e depoimentos.",
  },
  escopoIntro:
    "Referência: aftermovie no formato do vídeo “Conexão, Negócios e Visão” (Proscale x Slashfi).",
  escopo: [
    {
      titulo: "Entrega",
      subtitulo: "Aftermovie vertical",
      descricao: "",
      bullets: [
        "1 aftermovie vertical 9:16 (1080 x 1920), com cerca de 1min30, pensado para Reels, TikTok e Stories",
        "Edição dinâmica no ritmo da trilha, alternando falas, público e detalhes do ambiente",
        "Trechos das falas de palestrantes e anfitriões, com áudio limpo e legendas",
        "Color grading cinematográfico que preserva o clima noturno e a luz ambiente do evento",
        "Abertura/encerramento com logos das marcas e parceiros do evento",
        "Trilha sonora licenciada para uso nas redes sociais",
      ],
    },
    {
      titulo: "Captação",
      subtitulo: "Cobertura do evento",
      descricao: "",
      bullets: [
        "Cobertura do evento da chegada dos convidados ao encerramento",
        "Momentos-chave: recepção, falas no palco, networking, brindes e detalhes de marca e ambiente",
        "Captação de áudio das falas para uso no vídeo",
        "Filmagem discreta, sem interferir na dinâmica do evento e na experiência dos convidados",
      ],
    },
    {
      titulo: "Processo",
      subtitulo: "Do alinhamento à entrega",
      descricao: "",
      bullets: [
        "Alinhamento prévio da pauta: pessoas, falas e momentos que não podem faltar",
        "Primeiro corte enviado no prazo combinado, com as rodadas de ajuste combinadas",
        "Entrega final em MP4 via link de download",
      ],
    },
  ],
  itens: [
    {
      descricao: "Vídeo Reels (vertical): cobertura do evento, convidados, depoimentos",
      qtd: 1,
      valorUnit: 2500,
    },
  ],
  pagamento: "50% na aprovação, 50% no dia do evento",
  prazoEntrega: "Até 3 dias após o evento",
  rodadasAjuste: "02",
  termos: DEFAULT_TERMOS,
};
