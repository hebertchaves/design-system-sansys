# DssActionMenu — API Reference

> Referência de API. Para quando usar, estados e racional de composição, ver `README.md` e `DssActionMenu.md`.

Barra de ações em que uma ação pode abrir sub-ações relacionadas.

> **Fase 3 — Componente Composto.** Orquestra `DssToolbar`, `DssButton`, `DssMenu`,
> `DssList` e `DssItem`. Não reimplementa nenhum deles.

## Quando usar

- Barra de comando sobre uma tabela, lista ou registro
- Conjunto de ações em que **algumas** desdobram em opções (Exportar → PDF / Planilha)
- Cabeçalho de página ou de cartão que concentra as operações disponíveis

## Quando NÃO usar

- **Um único gatilho com menu** → use `DssBtnDropdown`. Este componente é uma *barra*.
- **Botões agrupados sem sub-ações** → use `DssBtnGroup`, mais simples.
- **Menu de navegação** → use `DssMenu` diretamente, ou `DssTabs`.
- **Hierarquia em árvore** → use `DssTree`. Aqui o aninhamento para em um nível.
- **Ação flutuante sobre conteúdo** → use `DssFab`.

## O que ele NÃO faz

Declarado, não omitido:

- **Não navega.** Um item que leva a outra tela emite evento ou recebe `to`; o
  componente não conhece rota.
- **Não decide permissão.** `disabled` vem de fora. Ele não consulta perfil nem regra.
- **Não faz overflow automático.** Sem "mais ações" quando não cabe — as ações quebram
  linha. Esconder comando é pior que quebrar layout.
- **Não aninha além de um nível.** Sub-ação não abre sub-sub-ação.
- **Não tem `dense`.** Chegou a ser declarada e o gate pegou: o `DssToolbar` não
  expõe densidade, então a prop prometia o que a composição não entrega.

## API

| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `ariaLabel` | `string` | — | **Obrigatória.** Nome acessível da barra. |
| `variant` | `'flat' \| 'outline' \| 'unelevated'` | `'flat'` | Variante das ações. |
| `color` | cor semântica | `'primary'` | Cor decidida na barra, herdada pelas ações. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho compartilhado. |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` | Marca, via `data-brand`. |
| `disabled` | `boolean` | `false` | Desabilita a barra inteira. |

**`DssActionMenuItem`:** `name` (obrigatório), `label`, `icon`, `disabled`, `tooltip`.

**Slots:** `default` na barra (as ações) e `default` no item (as sub-ações — a presença
dele é o que transforma a ação em gatilho de menu).

**Eventos:** `@action` com o `name` da ação acionada. Payload plano.

**Métodos expostos:** `fechar()` — fecha qualquer sub-menu aberto.

## Estados

| Estado | Comportamento |
|---|---|
| Hover / Focus / Active | Do `DssButton` — o composto não pinta. |
| `disabled` na barra | Todas as ações desabilitadas **e** abertura bloqueada. |
| `disabled` no item | Só aquela ação. **Sai da navegação por seta** — ver nota abaixo. |
| Loading | Por ação, via `loading` do `DssButton`. A barra não tem estado próprio. |
| Vazio | Barra sem ações **não renderiza**. |

> ⚠️ **Divergência declarada do pré-prompt.** A §6 previa que a ação desabilitada
> permanecesse focável, para ser anunciada — é o que o padrão WAI-ARIA de toolbar
> recomenda. **Medido no navegador: não permanece.** O `DssButton` rende
> `<button disabled>`, e botão desabilitado nativo é inalcançável por foco; o efeito
> era o foco TRAVAR ao esbarrar numa ação desabilitada.
>
> Implementar o padrão exigiria trocar `disabled` por `aria-disabled` e reimplementar
> o bloqueio de acionamento — brigar com o primitivo, que o Cartão Composto proíbe.
> A navegação passou a **pular** o que não é focável. A ação desabilitada continua
> visível e com estado exposto; só não é alcançada por seta.
>
> *Reabrir isto é decisão do `DssButton`, não deste composto.*

## Acessibilidade

- `role="toolbar"` com `aria-label` obrigatório
- **Roving tabindex**: a barra inteira é *uma* parada de `Tab`; as setas movem dentro
- `←` `→` entre ações · `Home` / `End` aos extremos
- Gatilho com `aria-haspopup="menu"` e `aria-expanded`
- Painel com `role="menu"`; sub-ações com `role="menuitem"`
- `↑` `↓` entre sub-ações · `Esc` fecha **e devolve o foco ao gatilho**
- Alvo de toque ≥ **44px** (`--dss-touch-target-md`), herdado do `DssButton`

## Tokens

O composto consome apenas três, e por uma razão: quase tudo é das peças.

| Token | Onde |
|---|---|
| `--dss-spacing-1` | espaço entre as ações |
| `--dss-spacing-40` | largura mínima do painel de sub-ações |
| `--dss-touch-target-md` | altura da ação — **herdado do `DssButton`**, não declarado aqui |

Cor, variante, tema e marca **não** aparecem no SCSS deste componente. Declará-los
criaria uma segunda fonte de verdade para o que o `DssButton` já resolve.

## Origem

Internalização do `jtech-action-menu` (`framework-jtech/webcomponent-vue2js`), recriado
sob a governança do DSS. O pré-prompt foi escrito **antes** de reabrir o código legado —
ver `docs/governance/pre-prompts/pre_prompt_dss_action_menu.md`.

O que **não** foi portado: `flat`, `no-caps` e `stretch` como props (são decisão de
aparência do DSS, não configuração do consumidor), `color="dark"` literal, e um bloco
`<q-fab>` comentado que não correspondia ao template ativo.
