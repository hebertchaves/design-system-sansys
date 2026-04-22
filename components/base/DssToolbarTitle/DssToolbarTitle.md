# DssToolbarTitle

> **Classificação:** Elemento Tipográfico Estrutural não-interativo — Fase 2  
> **Status:** Pré-auditoria  
> **Golden Reference:** DssItemLabel  
> **Golden Context:** DssToolbar  
> **Quasar Base:** QToolbarTitle  
> **Versão:** 1.0.0

---

## 1. Visão Geral

O `DssToolbarTitle` é um wrapper DSS governado sobre o `QToolbarTitle` do Quasar. Ele encapsula o comportamento de título flexível dentro de uma barra de ferramentas (`DssToolbar`), substituindo a tipografia nativa hardcoded do Quasar pelos tokens semânticos da escala Heading 4 do DSS.

### Papel Semântico

O `DssToolbarTitle` é o **container tipográfico** da `DssToolbar`. Ele:

- Ocupa o espaço disponível na barra (`flex: 1 1 0%`) por padrão
- Trunca automaticamente textos longos (`text-overflow: ellipsis`)
- Herda a cor de texto do `DssToolbar` pai (sem definir cor própria)

### O que NÃO faz

- Não gerencia interatividade (hover, focus, active)
- Não define cor de texto (herdada do `DssToolbar` pai)
- Não gerencia alinhamento vertical (responsabilidade do `DssToolbar` pai)
- Não serve como elemento de navegação (usar `DssTab` ou `DssMenu`)

---

## 2. Escopo Funcional

| Responsabilidade                     | DssToolbarTitle | DssToolbar pai |
|--------------------------------------|:-:|:-:|
| Container flex do título             | ✅ | — |
| Tipografia Heading 4 (tokens DSS)    | ✅ | — |
| Truncamento de texto (ellipsis)      | ✅ | — |
| Cor de texto                         | — | ✅ (via [data-brand]) |
| Alinhamento vertical dos filhos      | — | ✅ |
| Brand e seus tokens                  | — | ✅ |
| Interatividade dos filhos            | — | filhos |

---

## 3. API

### Props

| Prop     | Tipo    | Padrão  | Descrição                                                             |
|----------|---------|---------|-----------------------------------------------------------------------|
| `shrink` | Boolean | `false` | Quando `true`, o título não cresce para ocupar espaço disponível. Aplica `flex: 0 0 auto`. |

### Props Bloqueadas

| Prop         | Razão DSS                                                             |
|--------------|-----------------------------------------------------------------------|
| `color`      | Cor governada pelo `DssToolbar` pai via tokens `[data-brand]`.        |
| `active`     | Sem estado ativo. Navegação é responsabilidade de `DssTab`/`DssMenu`. |

### Slots

| Slot       | Descrição                                                                                      |
|------------|------------------------------------------------------------------------------------------------|
| `default`  | Conteúdo textual do título. Texto simples ou elementos inline recomendados.                   |
| `subtitle` | Subtítulo abaixo do título principal. Herdado de `QToolbarTitle`.                             |

### Eventos

Nenhum. Componente estritamente não-interativo.

---

## 4. Estados

| Estado        | Aplicável | Razão                                                      |
|---------------|-----------|------------------------------------------------------------|
| Padrão        | ✅        | —                                                          |
| Hover         | ❌        | Não-interativo                                             |
| Focus         | ❌        | Não-interativo                                             |
| Active        | ❌        | Sem estado ativo — navegação é de DssTab/DssMenu           |
| Disabled      | ❌        | Não possui comportamento de desabilitação                  |
| Loading       | ❌        | Fase 1 — sem estado assíncrono                             |
| Error         | ❌        | Elemento tipográfico — sem validação                       |
| Indeterminate | ❌        | Não aplicável para elemento linear                         |

### Estados Adaptativos (Passivos)

| Ambiente                   | Comportamento                                                         |
|----------------------------|-----------------------------------------------------------------------|
| Dark mode                  | Herda cor do `DssToolbar` pai. Nenhum override necessário.            |
| Alto contraste             | `color: inherit` — força herança do contraste do pai                 |
| Forced Colors              | `color: ButtonText` (EXC-02)                                         |
| Reduced motion             | Nenhuma animação — sem override necessário                           |
| Print                      | `white-space: normal`, `overflow: visible`, `text-overflow: clip`     |

---

## 5. Acessibilidade

### Touch Target

**Não aplicável.** `DssToolbarTitle` é não-interativo (Option B — mesmo padrão do `DssItemLabel` e `DssBadge`).

### Semântica

- Nenhum `role` adicional. A semântica é definida pelo conteúdo do slot `default`.
- Para títulos principais de página, o consumidor deve usar `<h1>` dentro do slot.
- O truncamento por `text-overflow: ellipsis` não remove o texto do DOM — leitores de tela têm acesso ao conteúdo completo.

### Contraste

- Cor de texto herdada do `DssToolbar` pai.
- `DssToolbar` com `brand="hub|water|waste"` aplica `--dss-text-inverse` (branco) sobre fundo colorido.
- `DssToolbar` padrão usa `--dss-text-body` sobre fundo neutro.
- Ambos atendem WCAG 2.1 AA (contraste ≥ 4.5:1 para texto normal).

### Teclado

Não aplicável — sem interação por teclado.

---

## 6. Tipografia (Sobrescrita Nativa — EXC-01)

O `QToolbarTitle` aplica os seguintes estilos hardcoded:

```css
/* Quasar nativo — sobrescrito pelo DssToolbarTitle */
.q-toolbar__title {
  font-size: 21px;
  font-weight: normal;
  letter-spacing: 0.01em;
}
```

O `DssToolbarTitle` sobrescreve esses valores via seletor composto (EXC-01):

```scss
.dss-toolbar-title.q-toolbar__title {
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-heading-4-size);      /* 20px */
  font-weight: var(--dss-heading-4-weight);  /* 500 (Medium) */
  line-height: var(--dss-heading-4-line-height); /* 1.3 */
  letter-spacing: normal;                    /* Remove 0.01em nativo */
}
```

---

## 7. Tokens Utilizados

### Aplicados Diretamente

| Token                         | Propriedade       |
|-------------------------------|-------------------|
| `--dss-font-family-sans`      | `font-family`     |
| `--dss-heading-4-size`        | `font-size`       |
| `--dss-heading-4-weight`      | `font-weight`     |
| `--dss-heading-4-line-height` | `line-height`     |

### Herdados (via DssToolbar pai)

| Token                 | Uso                                                |
|-----------------------|----------------------------------------------------|
| `--dss-text-body`     | Cor padrão (sem brand no pai)                      |
| `--dss-text-inverse`  | Cor sobre brand colorida (hub, water, waste)        |

---

## 8. Exceções DSS

### EXC-01 — Sobrescrita de Tipografia Nativa Quasar

| Atributo       | Valor                                                               |
|----------------|---------------------------------------------------------------------|
| ID             | EXC-01                                                              |
| Gate violado   | Gate de Composição v2.4 — Regra 2                                   |
| Seletor        | `.dss-toolbar-title.q-toolbar__title`                               |
| Localização    | `2-composition/_base.scss`                                          |
| Justificativa  | Única forma de garantir tokens DSS sobre CSS Quasar hardcoded.      |
| Precedente     | DssItemLabel (EXC-01)                                               |

### EXC-02 — Forced Colors Mode

| Atributo       | Valor                                               |
|----------------|-----------------------------------------------------|
| ID             | EXC-02                                              |
| Valor          | `ButtonText`                                        |
| Localização    | `4-output/_states.scss`                             |
| Justificativa  | System color keyword obrigatório em forced-colors.  |

---

## 9. Comportamentos Implícitos

### Forwarding de Atributos

`DssToolbarTitle` usa `inheritAttrs: false` com `v-bind="$attrs"` explícito no `<q-toolbar-title>`. Atributos HTML não declarados como props (ex.: `data-*`, `aria-*`) são repassados ao elemento raiz.

### Herança de Cor

`DssToolbarTitle` **não define** `color`. A cor de texto é herdada via cascata CSS a partir do `DssToolbar` pai. O `DssToolbar` aplica `--dss-text-body` (padrão) ou `--dss-text-inverse` (brand colorida) no elemento raiz, e o `DssToolbarTitle` herda via `color: inherit`.

### Truncamento Automático

`overflow: hidden` + `text-overflow: ellipsis` + `white-space: nowrap` são aplicados via EXC-01 sobre a classe nativa `.q-toolbar__title`. O texto completo permanece no DOM (acessível para leitores de tela), apenas a exibição visual é truncada.

---

## 10. Padrões de Uso

### Básico

```vue
<dss-toolbar>
  <q-btn flat round dense icon="menu" aria-label="Menu" />
  <dss-toolbar-title>Sansys Hub</dss-toolbar-title>
  <q-space />
  <q-btn flat round dense icon="more_vert" aria-label="Mais opções" />
</dss-toolbar>
```

### Com Brand (herança de cor)

```vue
<dss-toolbar brand="hub">
  <dss-toolbar-title>Sansys Hub — Dashboard</dss-toolbar-title>
</dss-toolbar>
```

### Com Shrink

```vue
<dss-toolbar>
  <dss-toolbar-title :shrink="true">Filtros ativos</dss-toolbar-title>
  <q-space />
  <dss-toolbar-title>234 resultados</dss-toolbar-title>
</dss-toolbar>
```

### Título Semântico de Página

```vue
<dss-toolbar>
  <dss-toolbar-title>
    <h1>Painel de Controle</h1>
  </dss-toolbar-title>
</dss-toolbar>
```

---

## 11. Anti-Patterns

| Anti-Pattern                                          | Solução                                               |
|-------------------------------------------------------|-------------------------------------------------------|
| Usar fora de `DssToolbar`                             | `DssToolbarTitle` é filho semântico de `DssToolbar`  |
| Aplicar prop `color` diretamente                      | Cor herdada automaticamente do `DssToolbar` pai       |
| Inserir componentes de bloco no slot `default`        | Slot é para texto simples ou elementos inline         |
| Usar para navegação (`@click`, `<router-link>`)       | Usar `DssTab` ou `DssMenu` para navegação             |
| Múltiplos `DssToolbarTitle` sem `shrink` nos menores  | Usar `shrink=true` nos títulos secundários            |

---

## 12. Matriz de Composição DSS

### Papel Estrutural

`DssToolbarTitle` é **filho direto** de `DssToolbar`. Não contém outros componentes DSS internamente.

### Componentes Recomendados no Mesmo Contexto (DssToolbar)

| Componente    | Papel                                        | Status DSS  |
|---------------|----------------------------------------------|-------------|
| DssToolbar    | Container pai obrigatório                    | ✅ Selado   |
| DssButton     | Ações nas extremidades da toolbar            | ✅ Selado   |
| DssSpace      | Espaço flexível entre elementos              | ✅ Selado   |
| DssIcon       | Ícone inline no slot default                 | ✅ Selado   |

### Limites de Responsabilidade

- `DssToolbarTitle` gerencia: tipografia, flexbox do título, truncamento
- `DssToolbar` gerencia: layout geral, brand, alinhamento vertical
- Componentes filhos no slot gerenciam: sua própria interatividade

---

## 13. Paridade com Golden Context (DssItemLabel)

| Aspecto                              | DssItemLabel | DssToolbarTitle | Divergência / Justificativa                     |
|--------------------------------------|:---:|:---:|--------------------------------------------------|
| `defineOptions` com `name`           | ✅  | ✅  | —                                                |
| `inheritAttrs: false`                | ✅  | ✅  | —                                                |
| `v-bind="$attrs"` explícito          | ✅  | ✅  | —                                                |
| Sem touch target (Option B)          | ✅  | ✅  | Ambos não-interativos                            |
| Sobrescrita de tipografia (EXC-01)   | ✅  | ✅  | Mesmo padrão de seletor composto                 |
| Cor não definida (herdada)           | ✅  | ✅  | Ambos herdam cor do pai                          |
| `_brands.scss` vazio (auto-herança)  | ✅  | ✅  | —                                                |
| States: dark, forced-colors, print   | ✅  | ✅  | —                                                |
| Composable para classes              | ✅  | ✅  | —                                                |
| Prop `shrink` para flex              | ❌  | ✅  | `DssToolbarTitle` expõe comportamento flex direto |

---

## 14. Histórico de Versões

| Versão | Data       | Mudança                              |
|--------|------------|--------------------------------------|
| 1.0.0  | 2026-04-21 | Criação inicial — DSS v2.5 Protocol  |
