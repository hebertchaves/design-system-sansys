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
- `dss-touch-target()` - Touch targets 44×44px mínimo
- `dss-transition()` - Transições com reduced-motion
- `dss-button-variant()` - Variantes de botões
- `dss-card()` - Cards brandáveis

### Mixins de Acessibilidade (`_accessibility-mixins.scss`)
Mixins específicos para acessibilidade WCAG 2.1 AA:
- `dss-validate-contrast()` - Validação em tempo de compilação
- `dss-skip-link()` - Links de navegação
- `dss-aria-live()` - ARIA live regions
- `dss-loading-state()` - Estados de loading
- `dss-accessible-modal()` - Modais com focus trap

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
