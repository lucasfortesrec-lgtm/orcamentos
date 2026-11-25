import type { Proposal } from "./types";

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace(/ /g, " ");

export function computeTotals(p: Proposal) {
  const linhas = p.itens.map((i) => ({ ...i, total: i.qtd * i.valorUnit }));
  const subtotal = linhas.reduce((s, l) => s + l.total, 0);
  const desconto = p.desconto ?? 0;
  return { linhas, subtotal, desconto, total: Math.max(0, subtotal - desconto) };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Campo preenchido de verdade (ignora vazio e "—"). */
export const has = (v?: string) => !!v && v.trim() !== "" && v.trim() !== "—";

/** Título da aba / prévia do link. */
export const pageTitle = (p: Proposal) =>
  `Orçamento${has(p.numero) ? ` Nº ${p.numero}` : ""} · ${p.cliente.empresa} — Lucas Fortes · Filmmaker`;
