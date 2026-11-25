import type { Proposal } from "./types";
import { DEFAULT_TERMOS } from "./defaults";

export const proposal: Proposal = {
  slug: "proscale-club",
  numero: "—",
  emissao: "—",
  validoAte: "—",
  cliente: {
    empresa: "Proscale Club",
    responsavel: "",
    whatsapp: "",
    cidade: "",
  },
  projeto: {
    nome: "Proscale Club",
    destaque: "same-day",
    resumo:
      "Cobertura audiovisual e fotográfica completa do evento: vídeo de depoimentos entregue na mesma noite, trailer do evento (até 5 dias após) e fotos entregues via Google Drive.",
    tipo: "Evento",
    datas: "08/10/2026",
    horario: "20:00 às 00:00",
    local: "",
    diarias: "4 horas",
    entregaveis: "Depoimentos na noite + trailer em até 5 dias + fotos",
  },
  escopo: [
    {
      titulo: "Depoimentos",
      subtitulo: "Entrega na mesma noite",
      descricao:
        "Vídeo dos depoimentos dos convidados captados ao longo da noite, editados e entregues ainda durante o evento.",
    },
    {
      titulo: "Trailer do evento",
      subtitulo: "Entrega em até 5 dias após o evento",
      descricao:
        "Todo o material restante captado é usado para compor um único vídeo em formato de trailer do evento, entregue em até 5 dias após o evento.",
    },
    {
      titulo: "Fotógrafo dedicado",
      subtitulo: "100% dedicado ao evento",
      descricao:
        "Cobertura fotográfica completa do evento com fotógrafo exclusivo, além da cobertura em vídeo.",
    },
  ],
  itens: [{ descricao: "Cobertura audiovisual + fotografia de evento", qtd: 1, valorUnit: 4700 }],
  observacaoValores:
    "Referente à cobertura completa do evento, incluindo vídeo de depoimentos, trailer do evento (até 5 dias após) e fotógrafo dedicado. Ampliações de escopo durante o evento são reajustadas mediante acordo prévio.",
  pagamento: "50% de sinal na confirmação, 50% na entrega do último vídeo",
  prazoEntrega: "Depoimentos na mesma noite · trailer em até 5 dias",
  rodadasAjuste: "01 (apenas no trailer)",
  condicoes: [
    {
      titulo: "Prazo",
      subtitulo: "Mesma noite",
      descricao:
        "Vídeo dos depoimentos entregue ainda na noite do evento. O trailer do evento é entregue em até 5 dias após o evento.",
    },
    {
      titulo: "Entrega",
      subtitulo: "Google Drive",
      descricao: "Todo o material correspondente ao evento será entregue através de link no Google Drive.",
    },
    {
      titulo: "Revisões",
      subtitulo: "Aplicáveis apenas ao trailer",
      descricao: "Somente o vídeo final do trailer do evento terá direito a uma rodada de alteração.",
    },
    {
      titulo: "Escopo adicional",
      subtitulo: "Orçado à parte",
      descricao: "Pedidos além do descrito aqui são tratados como novo serviço, orçado separadamente.",
    },
  ],
  naoIncluso: [
    "Vídeos, cortes ou versões adicionais além dos descritos no escopo",
    "Revisões, alterações ou novas versões aplicadas ao vídeo de depoimentos",
    "Rodadas de alteração além da única rodada inclusa no trailer do evento",
    "Entregas em formatos, durações ou proporções adicionais não especificadas",
  ],
  termos: DEFAULT_TERMOS,
  pagamentoCancelamento: `Para garantir a reserva da data e a disponibilidade exclusiva da equipe técnica, 50% (cinquenta por cento) do valor total do serviço devem ser pagos como sinal de fechamento no mesmo dia da confirmação escrita desta proposta.

Os 50% (cinquenta por cento) restantes serão pagos na data combinada para a entrega do último vídeo proposto.

A data do evento só será considerada definitivamente reservada após a confirmação do pagamento do sinal. Caso o cliente cancele o serviço após o pagamento do sinal, o valor pago a título de reserva não será reembolsável, podendo, a critério do prestador, ser convertido em crédito para futuros serviços mediante nova negociação.

O atraso ou não pagamento das parcelas nas datas acordadas poderá resultar no adiamento das entregas até a total regularização do valor devido.`,
};
