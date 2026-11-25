import { useRef, useState } from "react";

import { BrandMark, RecLine, Reveal, SectionLabel, labelCls, titleCls } from "@/components/brand";
import { computeTotals, formatBRL, has, pad2 } from "@/proposals/calc";
import type { Proposal, ProposalItem } from "@/proposals/types";
import { ApproveDialog, EmailDialog } from "./dialogs";
import { downloadProposalPdf } from "./pdf";

function RowList({ items }: { items: ProposalItem[] }) {
  return (
    <div className="mt-8 border-t border-border">
      {items.map((s, i) => (
        <div
          key={i}
          className="row-hover grid gap-4 border-b border-border py-8 md:grid-cols-[3.5rem_1fr_1.2fr] md:items-start md:gap-10 md:py-10"
        >
          <span className="row-num font-accent text-lg italic text-primary md:pt-2">{pad2(i + 1)}</span>
          <div>
            <h3 className={`${titleCls} row-title text-2xl leading-none sm:text-3xl`}>{s.titulo}</h3>
            <p className={`${labelCls} mt-3`}>{s.subtitulo}</p>
          </div>
          <div className="max-w-xl text-base leading-relaxed text-muted-foreground">
            {s.descricao ? <p>{s.descricao}</p> : null}
            {s.bullets?.length ? (
              <ul className={s.descricao ? "mt-4 space-y-2.5" : "space-y-2.5"}>
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-[0.6em] inline-block size-1 shrink-0 rounded-full bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function KV({ k, v }: { k: string; v?: string }) {
  if (!has(v)) return null;
  return (
    <div className="fact-hover border-b border-border py-5">
      <dt className={labelCls}>{k}</dt>
      <dd className="mt-2 text-base">{v}</dd>
    </div>
  );
}

export function ProposalPage({ proposal: p }: { proposal: Proposal }) {
  const [open, setOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const t = computeTotals(p);
  const c = p.cliente;
  const pr = p.projeto;

  const meta = [
    has(p.numero) ? `Nº ${p.numero}` : "",
    has(p.emissao) ? `Emissão ${p.emissao}` : "",
    has(p.validoAte) ? `Válido até ${p.validoAte}` : "",
  ].filter(Boolean);

  const facts = [
    { k: "Cliente", v: c.empresa },
    { k: "Data(s)", v: [pr.datas, pr.horario].filter(has).join(" · ") },
    { k: "Local", v: pr.local },
    { k: "Entrega", v: pr.entregaveis },
  ].filter((f) => has(f.v));

  const condRows = [
    { k: "Pagamento", v: p.pagamento },
    { k: "Prazo de entrega", v: p.prazoEntrega },
    { k: "Rodadas de ajuste inclusas", v: p.rodadasAjuste },
  ].filter((f) => has(f.v));

  const downloadPdf = async () => {
    if (!rootRef.current) return;
    setPdfBusy(true);
    try {
      const nome = [`Orçamento${has(p.numero) ? ` ${p.numero}` : ""}`, c.empresa, "LF.REC"].join(" - ");
      await downloadProposalPdf(rootRef.current, `${nome}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Não foi possível gerar o PDF agora. Tente novamente.");
    } finally {
      setPdfBusy(false);
    }
  };

  const btn =
    "btn inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.72rem] font-medium uppercase tracking-[0.24em] disabled:opacity-50";

  return (
    <div className="min-h-screen bg-background font-sans text-[1.0625rem] text-foreground antialiased">
      <div
        data-pdf-hide
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "var(--glow-red)" }}
        aria-hidden
      />

      <div ref={rootRef} className="mx-auto max-w-6xl bg-background px-6">
        <Reveal as="header" className="flex flex-wrap items-center justify-between gap-6 py-8">
          <BrandMark />
          <div className="brand-head text-left sm:text-right">
            <p className={`${titleCls} text-xl tracking-[0.25em]`}>Orçamento</p>
            <RecLine className="mt-2 sm:ml-auto" />
            {meta.length ? <p className={`${labelCls} mt-3`}>{meta.join(" · ")}</p> : null}
          </div>
        </Reveal>

        <main className="pb-16">
          <Reveal className="border-t border-border pt-10">
            <p className={`${labelCls} flex items-center gap-3`}>
              <span className="inline-block size-1.5 rounded-full bg-primary" />
              Orçamento — {pr.tipo}
            </p>
            <h1 className={`${titleCls} mt-5 text-5xl leading-[0.95] sm:text-7xl`}>
              {pr.nome}{" "}
              <span className="font-accent font-normal normal-case italic tracking-normal text-primary">
                {pr.destaque}
              </span>
            </h1>
            <RecLine className="mt-7 w-40 sm:w-56" />
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">{pr.resumo}</p>

            <dl className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((f) => (
                <div key={f.k} className="fact-hover border-b border-border py-7 lg:pr-6">
                  <dt className={labelCls}>{f.k}</dt>
                  <dd className={`${titleCls} mt-3 text-base leading-snug md:text-lg`}>{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {[c.empresa, c.documento, c.responsavel, c.whatsapp, c.email, c.cidade].filter(has).length > 1 ? (
            <Reveal className="mt-16">
              <SectionLabel>Cliente</SectionLabel>
              <dl className="mt-4 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                <KV k="Empresa" v={c.empresa} />
                <KV k="CPF/CNPJ" v={c.documento} />
                <KV k="Responsável" v={c.responsavel} />
                <KV k="WhatsApp" v={c.whatsapp} />
                <KV k="E-mail" v={c.email} />
                <KV k="Cidade" v={c.cidade} />
              </dl>
            </Reveal>
          ) : null}

          {p.escopo.length ? (
            <Reveal className="mt-16">
              <SectionLabel>Escopo do serviço</SectionLabel>
              {p.escopoIntro ? (
                <p className="mt-6 max-w-3xl text-base italic text-muted-foreground">{p.escopoIntro}</p>
              ) : null}
              <RowList items={p.escopo} />
            </Reveal>
          ) : null}

          {p.itens.length ? (
            <Reveal className="mt-16">
              <SectionLabel>Investimento</SectionLabel>
              <div className="mt-8 hidden border-t border-border md:block">
                <div
                  className={`${labelCls} grid grid-cols-[1fr_5rem_10rem_10rem] gap-6 border-b border-border py-4`}
                >
                  <span>Item / descrição</span>
                  <span className="text-center">Qtd</span>
                  <span className="text-right">Valor unit.</span>
                  <span className="text-right">Total</span>
                </div>
                {t.linhas.map((l, i) => (
                  <div
                    key={i}
                    className="inv-row grid grid-cols-[1fr_5rem_10rem_10rem] gap-6 border-b border-border py-5 text-base"
                  >
                    <span>
                      <span className="mr-3 font-accent italic text-primary">{pad2(i + 1)}</span>
                      {l.descricao}
                    </span>
                    <span className="text-center">{l.qtd}</span>
                    <span className="text-right text-muted-foreground">{formatBRL(l.valorUnit)}</span>
                    <span className="text-right">{formatBRL(l.total)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3 md:hidden">
                {t.linhas.map((l, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-5">
                    <p className="text-base">
                      <span className="mr-2 font-accent italic text-primary">{pad2(i + 1)}</span>
                      {l.descricao}
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className={labelCls}>Qtd</p>
                        <p className="mt-1">{l.qtd}</p>
                      </div>
                      <div>
                        <p className={labelCls}>Unit.</p>
                        <p className="mt-1">{formatBRL(l.valorUnit)}</p>
                      </div>
                      <div className="text-right">
                        <p className={labelCls}>Total</p>
                        <p className="mt-1">{formatBRL(l.total)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 ml-auto max-w-md space-y-3">
                <div className="flex justify-between px-1 text-base">
                  <span className={labelCls}>Subtotal</span>
                  <span>{formatBRL(t.subtotal)}</span>
                </div>
                {t.desconto ? (
                  <div className="flex justify-between px-1 text-base">
                    <span className={labelCls}>Desconto</span>
                    <span>− {formatBRL(t.desconto)}</span>
                  </div>
                ) : null}
                <div className="total-card flex items-center justify-between rounded-xl border border-border bg-card px-6 py-5">
                  <span className="flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.3em]">
                    <span className="total-dot inline-block size-2 rounded-full bg-primary" />
                    Total
                  </span>
                  <span className={`${titleCls} text-3xl`}>{formatBRL(t.total)}</span>
                </div>
              </div>
              {p.observacaoValores ? (
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{p.observacaoValores}</p>
              ) : null}
            </Reveal>
          ) : null}

          {condRows.length || p.condicoes?.length ? (
            <Reveal className="mt-16">
              <SectionLabel>Condições</SectionLabel>
              <dl className="mt-4 grid gap-x-10 sm:grid-cols-3">
                {condRows.map((r) => (
                  <KV key={r.k} k={r.k} v={r.v} />
                ))}
              </dl>
              {p.condicoes?.length ? <RowList items={p.condicoes} /> : null}
            </Reveal>
          ) : null}

          {p.naoIncluso?.length ? (
            <Reveal className="mt-16">
              <SectionLabel>O que não está incluído</SectionLabel>
              <ul className="mt-6 border-t border-border">
                {p.naoIncluso.map((e) => (
                  <li key={e} className="row-hover flex gap-5 border-b border-border py-5 text-base text-muted-foreground">
                    <span className="row-num text-primary">—</span>
                    <span className="max-w-2xl">{e}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {p.termos.length ? (
            <Reveal className="mt-16">
              <SectionLabel>Termos e condições</SectionLabel>
              <ol className="mt-6 border-t border-border">
                {p.termos.map((x, i) => (
                  <li
                    key={i}
                    className="row-hover grid grid-cols-[3rem_1fr] border-b border-border py-4 text-base text-muted-foreground"
                  >
                    <span className="row-num font-accent italic text-primary">{pad2(i + 1)}</span>
                    <span className="max-w-3xl">{x}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}

          {p.pagamentoCancelamento ? (
            <Reveal className="mt-16">
              <SectionLabel>Pagamento e cancelamento</SectionLabel>
              <div className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {p.pagamentoCancelamento.split("\n\n").map((para, i) => (
                  <p key={i} className={i ? "mt-5" : ""}>
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          ) : null}

          <Reveal className="relative mt-16 overflow-hidden py-12 text-center sm:py-16">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{ background: "var(--glow-red-center)" }}
              aria-hidden
            />
            <p className={labelCls}>Investimento total</p>
            <h2 className={`${titleCls} mt-5 text-5xl leading-[0.9] sm:text-7xl lg:text-8xl`}>{formatBRL(t.total)}</h2>
            <p className="mt-3 font-accent text-3xl italic text-primary sm:text-5xl">{pr.destaque}</p>
            <RecLine className="mx-auto mt-8 w-40" />
            <div data-pdf-hide className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={`${btn} bg-primary text-primary-foreground hover:bg-[#b02a24]`}
              >
                <span className="btn-dot" />
                Aprovar proposta
              </button>
              <button
                type="button"
                onClick={() => setEmailOpen(true)}
                className={`${btn} border border-border hover:border-primary/60`}
              >
                <span className="btn-dot text-primary" />
                Enviar por e-mail
              </button>
              <button
                type="button"
                onClick={downloadPdf}
                disabled={pdfBusy}
                className={`${btn} border border-border hover:border-primary/60`}
              >
                <span className="btn-dot text-primary" />
                {pdfBusy ? "Gerando PDF…" : "Baixar PDF"}
              </button>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <SectionLabel>Aprovação</SectionLabel>
            <div className="mt-16 grid gap-14 sm:grid-cols-2">
              {[`Cliente — ${c.empresa}`, "Lucas Fortes · Filmmaker"].map((who) => (
                <div key={who}>
                  <div className="grid grid-cols-[2fr_1fr] gap-6">
                    <div className="h-px bg-foreground/40" />
                    <div className="h-px bg-foreground/40" />
                  </div>
                  <div className={`${labelCls} mt-3 grid grid-cols-[2fr_1fr] gap-6`}>
                    <span>{who}</span>
                    <span>Data</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </main>

        <Reveal as="footer" className="border-t border-border">
          <div className="flex flex-wrap items-center justify-between gap-3 py-8">
            <span className="text-[0.72rem] uppercase tracking-[0.45em]">Lucas Fortes · Filmmaker</span>
            <span className={labelCls}>Florianópolis · lucasfortesrec.com · 48 9 9829 4750</span>
          </div>
        </Reveal>
      </div>

      {open ? <ApproveDialog proposal={p} onClose={() => setOpen(false)} /> : null}
      {emailOpen ? <EmailDialog proposal={p} onClose={() => setEmailOpen(false)} /> : null}
    </div>
  );
}
