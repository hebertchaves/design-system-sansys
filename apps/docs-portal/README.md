# @sansys/docs-portal

> Portal de **documentação** do Design System Sansys — site que apresenta componentes, tokens e diretrizes para consumidores do DSS.

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](../../LICENSE)

## Stack

- **React 18** + **Vite 5** + **TypeScript**
- **Tailwind CSS v4** para o layout do portal
- Tokens `--dss-*` sincronizados do core (ver abaixo)

## Desenvolvimento

```bash
# a partir da raiz do monorepo
npm run docs:dev      # servidor de desenvolvimento (Vite)
npm run docs:build    # build de produção → dist/
```

## Sincronização de tokens com o core

O portal **não mantém tokens próprios**: o bloco `--dss-*` de
`src/index.css` é gerado a partir de `packages/core/tokens/` pelo script:

```bash
npm run sync:portal-tokens
```

A região auto-gerada fica entre os marcadores
`/* BEGIN:DSS-TOKENS-AUTO-GENERATED */` e `/* END:... */` — **não editar à mão**.
Tokens próprios do portal (Tailwind/shadcn, Jtech UI, sidebar) ficam fora desse
bloco. Isso garante que o portal renderize com a **mesma paleta** do sistema real.

---

Software proprietário — © 2025–2026 JTECH - SOLUÇÕES EM INFORMÁTICA LTDA. Ver [LICENSE](../../LICENSE).
