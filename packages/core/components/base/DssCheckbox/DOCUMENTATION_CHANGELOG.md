# DssCheckbox - Changelog de Documentacao

Historico de alteracoes na documentacao do componente DssCheckbox.

---

## [2.4.0] - Junho 2026

### Alterado (Princípio #14 — Composição de Ícones / CCI, Fase 2)
- Renderização dos glifos internos `check` (marcado) e `remove` (indeterminate) migrada de `<span class="material-icons">` cru para composição via **`DssIcon`** (`inline decorative`). Os glifos são marcas visuais internas fixas — **não** há API pública de ícone (decisão travada #3 do CCI §7: zero props novos; sem `checked-icon`/`indeterminate-icon` neste refactor; paridade Quasar fica aditiva e futura).
- Removido `font-family: 'Material Icons'` e demais propriedades de fonte de `.dss-checkbox__check`/`__dash` em `2-composition/_base.scss` (proibido pelo CCI §3.4). Mantidos apenas sizing (`font-size`, que dimensiona o glifo `inline`), `line-height` e cor (`inherit`). Glifo agora resolvido por `DssIcon` → `QIcon`.
- Removida a exceção **EXC-03** (`font-weight: normal` — requisito da fonte de ícones), que deixou de existir no `_base.scss` por ser agora responsabilidade interna do `DssIcon`. Tabelas de exceções em `DssCheckbox.md` e `README.md` reindexadas; linhas de referência das exceções de `brightness` ajustadas.
- Seção "Subcomponentes DSS Utilizados" (`DssCheckbox.md`) corrigida de **"Nenhum"** para declarar a composição de `DssIcon` (factualmente correta após o refactor — CCI §5 item 7).
- Anatomia (`DssCheckbox.md`, `README.md`) e exemplo de estrutura acessível atualizados para refletir a composição via `DssIcon`.
- `DSSCHECKBOX_API.md`: nota adicionada na seção Slots esclarecendo que não há slot de ícone e que os glifos são internos fixos.
- Testes (`DssCheckbox.test.js`): asserções de classe `material-icons` e glifo cru substituídas por asserções de composição (`toContain('dss-icon')` + `dss-icon--inline` + `.dss-icon__inner`). API pública e a11y preservadas 100%.
- API pública (`v-model`, props, eventos, slot `default`) e acessibilidade (WCAG 2.1 AA, `aria-hidden`, touch target) **inalteradas**. Visual do check/dash idêntico.
- Ref.: `docs/governance/DSS_ICON_COMPOSITION_CONTRACT.md`

---

## Estrutura de Documentos

| Documento | Tipo | Proposito |
|-----------|------|-----------|
| **DssCheckbox.md** | Normativo | Governanca, anti-patterns, decisoes, regras |
| **DSSCHECKBOX_API.md** | Referencial | Props, eventos, tipos, exemplos de codigo |
| **README.md** | Onboarding | Quick start, estrutura de arquivos |
| **DOCUMENTATION_CHANGELOG.md** | Historico | Registro de alteracoes |
