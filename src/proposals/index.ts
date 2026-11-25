import type { Proposal } from "./types";
import { proposal as proscaleClub } from "./proscale-club";
import { proposal as sacramento198 } from "./198-sacramento-motorsports";

/**
 * Registre aqui cada novo orçamento.
 * 1. Copie _TEMPLATE.ts para um arquivo novo (ex.: 199-nome-do-cliente.ts) e preencha.
 * 2. Importe o arquivo acima e coloque na lista abaixo.
 * O endereço da página será /{slug}.
 */
export const list: Proposal[] = [proscaleClub, sacramento198];

export const proposals: Record<string, Proposal> = Object.fromEntries(list.map((p) => [p.slug, p]));

export function getProposal(slug: string): Proposal | undefined {
  return Object.prototype.hasOwnProperty.call(proposals, slug) ? proposals[slug] : undefined;
}

export type { Proposal } from "./types";
