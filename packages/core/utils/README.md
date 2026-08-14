# DSS Utils - Utilitários

Este diretório contém mixins, funções e helpers SASS para uso nos componentes DSS.

## Arquivos

### Funções (`_functions.scss`)
Funções SASS para conversões e cálculos:
- `dss-rem()` - Conversão px → rem
- `dss-contrast-ratio()` - Cálculo de contraste WCAG
- `dss-is-contrast-valid()` - Validação de contraste
- `dss-brand-token()` - Obter token de marca

### Mixins (`_mixins.scss`)
Mixins principais para componentes:
- `dss-focus-ring()` - Focus ring acessível
- `dss-transition()` - Transições com reduced-motion
- `dss-button-variant()` - Variantes de botões
- `dss-card()` - Cards brandáveis

### Mixins de Acessibilidade (`_accessibility-mixins.scss`)
- `dss-visually-hidden()` - Conteúdo só para leitor de tela

> ### ⚠️ 11 mixins REMOVIDOS em v2.5.0 — não voltar a documentá-los
>
> `dss-touch-target` · `dss-input-base` · `dss-text` · `dss-opacity` ·
> `dss-accessible-form` · `dss-accessible-modal` · `dss-accessible-tooltip` ·
> `dss-aria-live` · `dss-loading-state` · `dss-skip-link` · `dss-validate-contrast`
>
> Forense de git: nasceram no commit de bootstrap (`63e4e07`, jan/2026) e
> **nunca foram usados por componente algum, em commit nenhum** — `git log -S`
> deu 0 para os 11. Não eram legado que envelheceu; eram andaime especulativo.
> Vários apontavam para tokens inexistentes e resolviam para vazio; o
> `dss-aria-live` escrevia `aria-live` como **propriedade CSS**, que não existe.
>
> **Onde está o papel deles hoje:**
> | Removido | Substituto |
> |---|---|
> | `dss-touch-target` | `min-height: var(--dss-touch-target-md)` (44px), direto |
> | `dss-input-base` | **DssInput** (4 camadas) |
> | `dss-accessible-form` | **DssField** / **DssInput** |
> | `dss-accessible-modal` | **DssDialog** (composed) |
> | `dss-accessible-tooltip` | **DssTooltip** |
> | `dss-loading-state` | **DssSpinner** / **DssInnerLoading** |
> | `dss-validate-contrast` | `scripts/wcag-kit.mjs` (roda no CI, não depende de incluir mixin) |
> | `dss-opacity` · `dss-text` | tokens direto (`--dss-opacity-*`, `--dss-font-*`) |
> | `dss-skip-link` | **nada** — skip link não existe no DSS; lacuna real de a11y, registrada no `DEBITO_ABERTO.md` |
>
> Também saíram as classes `.dss-touch-target` e `.dss-touch-target-ideal`:
> eram API pública que não pintava nada.

### Helpers (`_helpers.scss`)
Classes utilitárias CSS disponíveis globalmente:
- Display: `.dss-flex`, `.dss-grid`, `.dss-block`
- Spacing: `.dss-p-*`, `.dss-m-*`
- Cores: `.dss-text-*`, `.dss-bg-*`
- Tipografia: `.dss-text-*`, `.dss-font-*`
- Bordas: `.dss-border-*`, `.dss-radius-*`

### Border Helpers (`_border-helpers.scss`)
Helpers específicos para bordas

### Layout Helpers (`_layout-helpers.scss`)
Helpers específicos para layout

### Example Showcase (`_example-showcase.scss`) ⚠️ ESPECIAL

**IMPORTANTE**: Este arquivo NÃO é importado em `utils/index.scss`!

#### Por quê?

Este arquivo contém classes CSS para estilizar arquivos `.example.vue` de componentes.
Se fosse importado globalmente, adicionaria ~290 linhas de CSS desnecessário em builds de produção.

#### Como usar?

Importe **apenas** nos arquivos `.example.vue`:

```vue
<style lang="scss" scoped>
/* Importar estilos de showcase */
@import '../../../utils/example-showcase';

/* Estilos adicionais específicos */
.my-custom-style {
  /* ... */
}
</style>
```

#### Classes disponíveis:

- `.dss-button-examples` - Container principal de exemplos
- `.example-section` - Seção de demonstração
- `.section-title` - Título de seção
- `.button-row` - Grid de botões/componentes
- `.brand-showcase` - Demonstração de brandabilidade
- `.accessibility-info` - Caixa de informações de acessibilidade

#### Quando usar?

- ✅ Em arquivos `*.example.vue`
- ✅ Em páginas de showcase/storybook
- ✅ Em documentação visual

#### Quando NÃO usar?

- ❌ Em componentes de produção
- ❌ Em builds finais da aplicação
- ❌ Importado globalmente via `utils/index.scss`

## Import

### Import Global (produção)
```scss
@import '@/dss/utils/index';
```

Isso importa:
- Funções
- Mixins
- Helpers
- Accessibility mixins
- Border helpers
- Layout helpers

**NÃO** importa:
- Example showcase (deve ser manual)

### Import Específico (exemplos)
```scss
@import '@/dss/utils/example-showcase';
```

Isso importa apenas as classes de showcase.
