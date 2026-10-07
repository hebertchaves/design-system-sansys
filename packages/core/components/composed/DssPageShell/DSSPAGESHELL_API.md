# DssPageShell — API Reference

## Props — `DssPageShell`

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `board` | `boolean` | `true` | Envolve o conteúdo na superfície do board |
| `railAriaLabel` | `string` | `'Módulos do sistema'` | Nome acessível do `<nav>` do rail |

## Props — `DssPageShellRailItem`

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `icon` | `string` | — | **Obrigatório.** Ícone do módulo |
| `label` | `string` | — | **Obrigatório.** Nome do módulo — vira o nome acessível e o `title` |
| `active` | `boolean` | `false` | Módulo atual: pinta e marca `aria-current="page"` |
| `disabled` | `boolean` | `false` | Desabilita o item |

## Events

| Evento | Payload | Emitido por | Quando |
|---|---|---|---|
| `click` | `MouseEvent` | `DssPageShellRailItem` | Clique no módulo |

O `DssPageShell` em si não emite.

## Slots — `DssPageShell`

| Slot | Descrição |
|---|---|
| `rail` | Itens do rail. Use `DssPageShellRailItem` |
| `breadcrumb` | Trilha de navegação |
| `default` | Conteúdo da página |

## Props deliberadamente ausentes

| Prop | Por que não existe | Alternativa |
|---|---|---|
| `railWidth` | 52px é a medida da casca Sansys, e sai do alvo de toque | — |
| `modules` (array) | Lista como dados é reimplementar slot | slot `rail` |
| `railBrand` | O rail consome os tokens de ação | `[data-brand]` no ancestral |

## Tokens

| Token | Camada | Uso |
|---|---|---|
| `--dss-touch-target-lg` | L2 | Largura do rail (52px) |
| `--dss-touch-target-md` | L2 | Altura mínima do item (44px) |
| `--dss-surface-muted` | L2 | Fundo rebaixado da página |
| `--dss-surface-default` | L3 | Superfície do board |
| `--dss-action-primary-deep` | L2 | Fundo do rail |
| `--dss-action-primary-hover` | L2, L4 | Separador dos itens e hover |
| `--dss-action-primary` | L4 | Item ativo |
| `--dss-text-inverse` | L2, L4 | Ícone do rail e anel de foco |
| `--dss-border-subtle` / `--dss-radius-md` | L3 | Moldura do board |
| `--dss-opacity-disabled` | L4 | Item desabilitado |
| `--dss-duration-fast` / `--dss-easing-standard` | L2 | Transição do hover |
