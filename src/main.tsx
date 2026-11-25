import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { BrandMark, RecLine, SITE } from "@/components/brand";
import { ProposalPage } from "@/components/proposal/ProposalPage";
import { getProposal } from "@/proposals";
import { pageTitle } from "@/proposals/calc";

/** Rota: /{slug} relativo ao BASE_URL (ex.: /orcamentos/198-cliente). */
function currentSlug() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  let path = window.location.pathname;
  if (base && path.startsWith(base)) path = path.slice(base.length);
  return decodeURIComponent(path.replace(/^\/+|\/+$/g, ""));
}

function Centered({ title }: { title?: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 text-center font-sans text-foreground">
      <BrandMark size={64} />
      {title ? <h1 className="mt-2 text-2xl font-medium uppercase tracking-tight sm:text-3xl">{title}</h1> : null}
      <RecLine className="w-32" />
      <a
        href={SITE}
        className="text-[0.72rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
      >
        lucasfortesrec.com
      </a>
    </div>
  );
}

function App() {
  const slug = currentSlug();
  const proposal = slug ? getProposal(slug) : undefined;

  useEffect(() => {
    document.title = proposal
      ? pageTitle(proposal)
      : slug
        ? "Orçamento não encontrado — Lucas Fortes · Filmmaker"
        : "Lucas Fortes · Filmmaker";
  }, [proposal, slug]);

  if (!slug) return <Centered />;
  if (!proposal) return <Centered title="Orçamento não encontrado" />;
  return <ProposalPage proposal={proposal} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
