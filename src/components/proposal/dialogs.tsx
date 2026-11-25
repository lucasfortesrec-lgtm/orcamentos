import { useState, type ReactNode } from "react";

import { computeTotals, formatBRL, has, pad2 } from "@/proposals/calc";
import type { Proposal } from "@/proposals/types";
import { labelCls, titleCls } from "@/components/brand";

const WHATSAPP = "5548998294750";
const OWNER_EMAIL = "lucasfortesrec@gmail.com";
const onlyDigits = (v: string) => v.replace(/\D/g, "");

export function formatDoc(v: string) {
  const d = onlyDigits(v).slice(0, 14);
  if (d.length <= 11) {
    return d
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
  }
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}
const docIsValid = (v: string) => [11, 14].includes(onlyDigits(v).length);

function nowBR() {
  const now = new Date();
  return {
    date: now.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    time: now.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" }),
  };
}

const numLabel = (p: Proposal) => (has(p.numero) ? ` Nº ${p.numero}` : "");

/** Resumo do orçamento em texto (usado no WhatsApp e no e-mail). */
function summaryLines(p: Proposal, full: boolean) {
  const t = computeTotals(p);
  return [
    `Projeto: ${p.projeto.nome}`,
    `Data(s): ${[p.projeto.datas, p.projeto.horario].filter(has).join(" · ")}`,
    has(p.projeto.local) ? `Local: ${p.projeto.local}` : "",
    `Entregáveis: ${p.projeto.entregaveis}`,
    "",
    ...(full
      ? [
          "ESCOPO",
          ...p.escopo.flatMap((s, i) => [
            `${pad2(i + 1)}. ${s.titulo} — ${s.subtitulo}${s.descricao ? `: ${s.descricao}` : ""}`,
            ...(s.bullets ?? []).map((b) => `   • ${b}`),
          ]),
          "",
        ]
      : []),
    "INVESTIMENTO",
    ...t.linhas.map((l) => `- ${l.descricao} · ${l.qtd} x ${formatBRL(l.valorUnit)} = ${formatBRL(l.total)}`),
    t.desconto ? `Desconto: - ${formatBRL(t.desconto)}` : "",
    `TOTAL: ${formatBRL(t.total)}`,
    "",
    "CONDIÇÕES",
    `Pagamento: ${p.pagamento}`,
    `Prazo de entrega: ${p.prazoEntrega}`,
    `Rodadas de ajuste inclusas: ${p.rodadasAjuste}`,
    ...(full ? (p.condicoes ?? []).map((c, i) => `${pad2(i + 1)}. ${c.titulo} — ${c.subtitulo}: ${c.descricao}`) : []),
    ...(full && p.naoIncluso?.length ? ["", "NÃO INCLUSO", ...p.naoIncluso.map((e) => `- ${e}`)] : []),
    ...(full ? ["", "TERMOS E CONDIÇÕES", ...p.termos.map((x, i) => `${i + 1}. ${x}`)] : []),
    ...(full && p.pagamentoCancelamento ? ["", "PAGAMENTO E CANCELAMENTO", p.pagamentoCancelamento] : []),
  ];
}

const tidy = (lines: string[]) =>
  lines.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n");

function buildApproval(p: Proposal, name: string, doc: string, company: string) {
  const { date, time } = nowBR();
  const empresa = p.cliente.empresa;
  const representation = company
    ? `representando a empresa ${company} (cliente ${empresa})`
    : `representando o cliente ${empresa}`;
  return tidy([
    `✅ APROVAÇÃO DE ORÇAMENTO${numLabel(p)} — LUCAS FORTES · FILMMAKER`,
    "",
    `Eu, ${name}, ${representation}, declaro que li e ACEITO o orçamento abaixo e tudo que nele está descrito.`,
    `Data da aceitação: ${date} às ${time} (horário de Brasília)`,
    `Link do orçamento: ${window.location.href}`,
    "",
    ...summaryLines(p, true),
    "",
    `Documento do responsável (CPF/CNPJ): ${doc}`,
    "",
    `Confirmado digitalmente por ${name}${company ? ` (${company})` : ""} — CPF/CNPJ ${doc} em ${date} às ${time}.`,
  ]);
}

function buildEmail(p: Proposal, name: string, doc: string, company: string) {
  const { date, time } = nowBR();
  return tidy([
    `Olá,`,
    "",
    `Segue o registro do orçamento${numLabel(p)} de Lucas Fortes · Filmmaker para ${p.cliente.empresa}.`,
    `O orçamento completo, com a opção de baixar em PDF, está neste link:`,
    window.location.href,
    "",
    ...summaryLines(p, false),
    "",
    `Solicitado por ${name}${company ? ` (${company})` : ""} — CPF/CNPJ ${doc} em ${date} às ${time}.`,
  ]);
}

const inputCls =
  "mt-3 w-full rounded-full border border-border bg-background px-6 py-3.5 text-base outline-none transition-colors focus:border-primary/60";
const btnPrimary =
  "btn inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-primary-foreground hover:bg-[#b02a24] disabled:opacity-40";
const btnGhost =
  "btn inline-flex items-center gap-3 rounded-full border border-border px-8 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.24em] hover:border-primary/60";

function Fields(props: {
  name: string;
  setName: (v: string) => void;
  company: string;
  setCompany: (v: string) => void;
  doc: string;
  setDoc: (v: string) => void;
}) {
  return (
    <>
      <label className="mt-7 block">
        <span className={labelCls}>Seu nome completo</span>
        <input
          value={props.name}
          maxLength={120}
          onChange={(e) => props.setName(e.target.value)}
          placeholder="Nome do responsável"
          className={inputCls}
        />
      </label>
      <label className="mt-5 block">
        <span className={labelCls}>Nome da empresa</span>
        <input
          value={props.company}
          maxLength={120}
          onChange={(e) => props.setCompany(e.target.value)}
          placeholder="Empresa que representa"
          className={inputCls}
        />
      </label>
      <label className="mt-5 block">
        <span className={labelCls}>CPF ou CNPJ</span>
        <input
          value={formatDoc(props.doc)}
          onChange={(e) => props.setDoc(onlyDigits(e.target.value))}
          inputMode="numeric"
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          className={inputCls}
        />
        {props.doc.length > 0 && !docIsValid(props.doc) ? (
          <span className="mt-2 block text-xs text-primary">Informe um CPF (11 dígitos) ou CNPJ (14 dígitos).</span>
        ) : null}
      </label>
    </>
  );
}

function Shell({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div
      data-pdf-hide
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-6 py-10 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-8 text-left">
        {children}
      </div>
    </div>
  );
}

function useClientFields(p: Proposal) {
  const [name, setName] = useState(has(p.cliente.responsavel) ? p.cliente.responsavel : "");
  const [company, setCompany] = useState(p.cliente.empresa);
  const [doc, setDoc] = useState(onlyDigits(p.cliente.documento ?? ""));
  return { name, setName, company, setCompany, doc, setDoc };
}

export function ApproveDialog({ proposal, onClose }: { proposal: Proposal; onClose: () => void }) {
  const f = useClientFields(proposal);
  const send = () => {
    const text = buildApproval(proposal, f.name.trim(), formatDoc(f.doc), f.company.trim());
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    onClose();
  };
  return (
    <Shell onClose={onClose}>
      <p className={labelCls}>Confirmação de aprovação</p>
      <h3 className={`${titleCls} mt-4 text-3xl leading-none`}>Aprovar proposta</h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Ao confirmar, você declara que leu e aceita este orçamento e tudo que nele está descrito. O orçamento
        completo, com data e horário da aceitação, será enviado por WhatsApp.
      </p>
      <Fields {...f} />
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={send}
          disabled={f.name.trim().length < 3 || f.company.trim().length < 2 || !docIsValid(f.doc)}
          className={btnPrimary}
        >
          Confirmar e enviar
        </button>
        <button type="button" onClick={onClose} className={btnGhost}>
          Cancelar
        </button>
      </div>
    </Shell>
  );
}

export function EmailDialog({ proposal, onClose }: { proposal: Proposal; onClose: () => void }) {
  const f = useClientFields(proposal);
  const [email, setEmail] = useState(proposal.cliente.email ?? "");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const valid = emailValid && f.name.trim().length >= 3 && f.company.trim().length >= 2 && docIsValid(f.doc);

  const open = () => {
    if (!valid) return;
    const subject = `Orçamento${numLabel(proposal)} · ${proposal.cliente.empresa} — Lucas Fortes`;
    const body = buildEmail(proposal, f.name.trim(), formatDoc(f.doc), f.company.trim());
    const href =
      `mailto:${encodeURIComponent(email.trim())}` +
      `?cc=${encodeURIComponent(OWNER_EMAIL)}` +
      `&subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    onClose();
  };

  return (
    <Shell onClose={onClose}>
      <p className={labelCls}>Receber por e-mail</p>
      <h3 className={`${titleCls} mt-4 text-3xl leading-none`}>Enviar orçamento</h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Vamos abrir o seu aplicativo de e-mail com o orçamento já preenchido, endereçado a você e com cópia para o
        Lucas. É só tocar em enviar.
      </p>
      <Fields {...f} />
      <label className="mt-5 block">
        <span className={labelCls}>Seu e-mail</span>
        <input
          type="email"
          value={email}
          maxLength={255}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@empresa.com"
          className={inputCls}
        />
      </label>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={open} disabled={!valid} className={btnPrimary}>
          Abrir e-mail
        </button>
        <button type="button" onClick={onClose} className={btnGhost}>
          Fechar
        </button>
      </div>
    </Shell>
  );
}
