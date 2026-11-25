# Orçamentos · Lucas Fortes · Filmmaker

Página de orçamento white label da LUCASFORTES.REC. Cada cliente tem um link próprio
(`/{slug}`), com aprovação por WhatsApp, envio por e-mail e download em PDF igual à página.

## Criar um orçamento novo

1. Copie `src/proposals/_TEMPLATE.ts` para um arquivo novo, por exemplo `src/proposals/199-cafe-aurora.ts`.
2. Preencha os campos. Os comentários explicam cada um. Campos vazios ou com "—" não aparecem.
3. Registre o arquivo em `src/proposals/index.ts` (importe e coloque na lista).
4. Envie para o GitHub (commit na branch `main`). O GitHub Actions publica sozinho em 1 a 2 minutos.

O link do cliente fica `{endereço do site}/{slug}`.

## Rodar no computador

```bash
npm install
npm run dev
```

## Como funciona

- Vite + React + Tailwind, site 100% estático publicado pelo GitHub Pages (`.github/workflows/deploy.yml`).
- `scripts/prerender.ts` gera uma página por orçamento com título e prévia de link próprios.
- PDF: `src/components/proposal/pdf.ts` (html2canvas-pro + jsPDF), A4 escuro, sem cortar blocos.
- Nenhuma página aparece em buscadores (`noindex` + `robots.txt`).
- Identidade: fundo #121110, creme #F3EDE3, vermelho REC #C8312A só em detalhes, areia #B5A693, Jost + Playfair Display itálico.
