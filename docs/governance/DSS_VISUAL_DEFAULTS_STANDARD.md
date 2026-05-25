# DSS Visual Defaults Standard v1.0
> Padrões visuais de default para todos os componentes DSS.
> Baseado em: Material Design 3, IBM Carbon, Salesforce Lightning.
> Aprovado em: 2026-05-25

## Princípios Visuais

1. **Cor Primary como âncora** — `--dss-action-primary` é a cor principal de ação em todos os componentes interativos.
2. **Radius consistente por categoria** — Controles: `--dss-radius-md` (8px). Cards/Superfícies: `--dss-radius-lg` (12px). Chips/Badges: `--dss-radius-full`. Modais: `--dss-radius-xl` (16px).
3. **Altura de controles** — Form controls: `--dss-form-control-height-md` (44px). Compact controls (chips, badges): 28–32px visual.
4. **Transições suaves** — Todos os controles usam `--dss-transition-fast` (150ms, ease-out).
5. **Sombra semântica** — Elevated: `--dss-elevation-1`. Hover: `--dss-elevation-2`. Modal: `--dss-elevation-4`.
6. **Tipografia** — `--dss-font-family-sans` (Inter). Botões: `--dss-font-size-sm` (14px), `--dss-font-weight-medium` (500). Labels: `--dss-font-size-sm`.

## Padrões por Categoria

### Controles Interativos (Button, Chip, Fab)
- Cor default: `--dss-action-primary` (background) + `--dss-text-inverse` (texto)
- Radius: `--dss-radius-md` para retangulares, `--dss-radius-full` para pills/round
- Altura: `--dss-touch-target-md` (44px)
- Hover: `--dss-action-primary-hover`
- Disabled: `--dss-action-primary-disable` + opacity 50%

### Formulários (Input, Select, Textarea, File)
- Variant default: `outlined`
- Border default: `1px solid var(--dss-gray-400)`
- Border focus: `2px solid var(--dss-action-primary)` + focus shadow
- Radius: `--dss-radius-md` (8px)
- Altura: `--dss-form-control-height-md` (44px)
- Label color: `--dss-text-subtle`
- Background: `--dss-surface-default`

### Compact Controls (Checkbox, Radio, Toggle)
- Cor checked: `--dss-action-primary`
- Cor unchecked border: `--dss-gray-400`
- Radius checkbox: `--dss-radius-sm` (4px)
- Radius radio: `--dss-radius-full`
- Toggle track: `--dss-action-primary` quando ativo

### Indicadores (Badge, Chip informativo)
- Cor default: `--dss-action-primary` para estado ativo/selecionado
- Cor neutro: `--dss-gray-200` background + `--dss-text-body` texto
- Radius: `--dss-radius-full`

### Superfícies (Card, Dialog, Drawer)
- Background: `--dss-surface-default`
- Border: `1px solid var(--dss-gray-200)` (flat/outlined)
- Radius: `--dss-radius-lg` (12px) para cards, `--dss-radius-xl` (16px) para modais
- Sombra elevated: `--dss-elevation-1`
- Sombra hover: `--dss-elevation-2`

### Navegação (Tabs, Breadcrumbs, Stepper, Pagination)
- Item ativo: `--dss-action-primary`
- Indicador ativo: `--dss-action-primary`
- Item inativo: `--dss-text-subtle`
- Hover: `--dss-action-primary-surface` (8% opacity)

### Progresso e Feedback (LinearProgress, CircularProgress, Skeleton)
- Cor de progresso: `--dss-action-primary`
- Track: `--dss-gray-200`
- Skeleton: `--dss-gray-200` com shimmer `--dss-gray-300`

## Tokens Proibidos
- ❌ Nunca usar valores hardcoded (hex, px direto)
- ❌ Nunca usar `--dss-dark` como cor de ação principal
- ❌ Nunca usar `--dss-gray-*` como cor de destaque/ativo

## Pontos de Atenção Identificados
- ⚠️ `--dss-compact-control-height-*` não está definido nos tokens — componentes usam esse token mas ele não existe no arquivo de tokens. Deve ser adicionado ou substituído por `--dss-touch-target-*`.
- ⚠️ `--dss-error-600` usado em alguns componentes mas não existe nos tokens globais — deve ser `--dss-negative`.
- ⚠️ `--dss-shadow-active` usado no Card mas não está definido nos tokens de shadow.
- ⚠️ `--dss-border-width-thin`, `--dss-border-width-md`, `--dss-border-width-thick` — verificar se existem nos tokens de border-widths.
