import { useEffect, useRef, useState, type ReactNode } from "react";
import logo from "@/assets/logo-lf-rec.png";

export const SITE = "https://lucasfortesrec.com";

export function BrandMark({ size = 48 }: { size?: number }) {
  return (
    <a href={SITE} className="logo-link flex items-center gap-4" aria-label="Lucas Fortes · Filmmaker">
      <img
        src={logo}
        alt="LF rec"
        className="logo-img"
        style={{ height: size, width: "auto" }}
        crossOrigin="anonymous"
      />
      <div className="leading-none">
        <p className="text-[0.82rem] font-normal uppercase tracking-[0.45em] text-foreground">Lucas Fortes</p>
        <p className="mt-2 text-[0.6rem] font-light uppercase tracking-[0.6em] text-muted-foreground">Filmmaker</p>
      </div>
    </a>
  );
}

export function RecLine({ className = "" }: { className?: string }) {
  return <div className={`rec-line ${className}`} aria-hidden />;
}

export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="inline-block size-1.5 shrink-0 rounded-full bg-primary" />
      <span className="shrink-0 text-[0.72rem] font-normal uppercase tracking-[0.3em] text-muted-foreground">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

/** Bloco que entra suavemente quando aparece na tela. */
export function Reveal({
  as: Tag = "section",
  className = "",
  children,
  pdf = true,
}: {
  as?: "section" | "header" | "footer" | "div";
  className?: string;
  children: ReactNode;
  pdf?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const props = {
    ref: ref as never,
    className: `${className} ${visible ? "is-visible" : ""}`,
    "data-reveal": "",
    ...(pdf ? { "data-pdf-block": "" } : {}),
  };
  return <Tag {...props}>{children}</Tag>;
}

export const labelCls = "text-[0.68rem] font-light uppercase tracking-[0.3em] text-muted-foreground";
export const titleCls = "font-display font-medium uppercase tracking-tight";
