# DssAvatar - Changelog de Documentacao

Historico de alteracoes na documentacao do componente DssAvatar.

---

## [2.2.1] - Janeiro 2026

### Corrigido (Auditoria DSS v2.2)
- **NC-01 BLOQUEANTE**: `prefers-contrast: high` corrigido para `prefers-contrast: more` (CSS Level 5)
- **NC-02 BLOQUEANTE**: Adicionado bloco `@media (forced-colors: active)` (Windows High Contrast Mode)
- **NC-03**: `font-weight: 700` substituido por `var(--dss-font-weight-bold)`
- **NC-04/NC-05**: Border-widths tokenizados com `--dss-border-width-md/thick`
- **NC-06/NC-11**: Tamanhos sm/xl documentados como excecoes (sem token canonico)
- **NC-07**: `border: 2px solid white` substituido por tokens
- **NC-08**: Focus-visible documentado como excecao (EXC-03)
- **NC-09**: Status indicators documentados como excecao (EXC-05), border-width tokenizado
- **NC-10**: Breakpoint 768px documentado como excecao tecnica CSS (EXC-04)
- **NC-12**: Mapas TS documentados como excecao (EXC-06)
- **NC-13**: `@import` substituido por `@use`/`@forward` (Sass Module System)
- **NC-14**: Versao corrigida de v2.3.0 para v2.2 em todos os arquivos
- **NC-15**: Adicionada Secao 14 (Tabela de Excecoes) ao DssAvatar.md
- **GAP-01/02**: Tokens corrigidos para canonicos (`--dss-radius-full`, `--dss-font-family-sans`, `--dss-hub-600`, etc.)
- **GAP-03**: Uso de `--dss-touch-target-*` documentado como excecao (EXC-01)
- **GAP-04**: DssAvatar.vue (Options API) marcado como @deprecated
- **GAP-05**: Layer 4 reorganizada com `_states.scss`, `_brands.scss`, orchestrator

---

## [2.2.0] - Janeiro 2026 (pre-auditoria)

### Adicionado
- **DssAvatar.md**: Documentacao completa seguindo Template 13.1 (13 secoes)
- **DSSAVATAR_API.md**: Referencia tecnica atualizada com linguagem de governanca
- **README.md**: Documento de onboarding com quick start e exemplos
- **DOCUMENTATION_CHANGELOG.md**: Este arquivo de changelog

### Alterado
- **Linguagem de governanca**: Substituido "100% compativel" por "wrapper DSS baseado no QAvatar, com API publica governada pelo DSS"
- **Classificacao de recursos**: Adicionada tabela com Recomendado / Opcional / Fora de escopo DSS
- **Estrutura SCSS**: Criados arquivos em 3-variants/ (_brands.scss, _status.scss, index.scss)
- **Imports corrigidos**: 4-output/DssAvatar.scss agora importa 3-variants/index
- **TypeScript**: Adicionados tipos AvatarSize, AvatarBrand, AvatarStatus, AvatarEmits, AvatarExpose
- **Componente**: Adicionadas props brand, status, ariaLabel; evento click; expose rootRef

### Corrigido
- **3-variants vazia**: Pasta agora contem _brands.scss e _status.scss
- **Import quebrado**: @import '../3-variants/colors' corrigido para '../3-variants/index'
- **Status indicator**: Migrado de ::after pseudo-element para span element

---

## [2.2.0] - Dezembro 2025

### Adicionado
- Implementacao inicial do DssAvatar
- Suporte a tamanhos customizados
- Formas: circular, rounded, square
- Classes utilitarias para cores

---

## Estrutura de Documentos

| Documento | Tipo | Proposito |
|-----------|------|-----------|
| **DssAvatar.md** | Normativo | Governanca, anti-patterns, decisoes, regras |
| **DSSAVATAR_API.md** | Referencial | Props, eventos, tipos, exemplos de codigo |
| **README.md** | Onboarding | Quick start, estrutura de arquivos |
| **DOCUMENTATION_CHANGELOG.md** | Historico | Registro de alteracoes |

---

## Proximas Atualizacoes Planejadas

- [ ] Adicionar secao de testes unitarios
- [ ] Documentar integracao com DssBadge
- [ ] Adicionar exemplos de uso em formularios
- [ ] Criar visual showcase (DssAvatar.example.vue)
