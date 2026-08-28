# DssEmptyState

> O que a tela mostra quando **não há dados**.

Bloco não interativo que explica a ausência de conteúdo e — quando existe uma — oferece a saída.

---

## Por que este componente existe

O estado vazio era um vazio nas **duas** pontas do processo:

- **Lado da especificação:** `estado_dado.vazio` apareceu **0 vez em 3 de 3** specs medidas.
- **Lado do DSS:** não existia componente para ele. `empty` era apenas um **slot** do
  `DssVirtualScroll`, o que deixava o conteúdo por conta do consumidor — cada tela inventava o seu.

Registrado em [`DSS_JOIN_SPEC_CONTRATO.md`](../../../../../docs/governance/DSS_JOIN_SPEC_CONTRATO.md) §5
e no [`DEBITO_ABERTO.md`](../../../../../docs/governance/DEBITO_ABERTO.md).

---

## Quando usar

- A busca ou o filtro **retornou zero** resultados.
- O usuário chegou a uma área onde **ainda não criou** nada (primeiro acesso).
- Uma lista, tabela ou painel ficou vazio **depois** de uma exclusão.
- Uma área de anexos ou itens está aguardando o primeiro conteúdo.

## Quando **não** usar

| situação | use no lugar |
|---|---|
| A operação **falhou** | `error` / `errorMessage` no componente de campo ou lista — vazio ≠ erro |
| Ainda **carregando** | `DssSkeleton` ou `DssInnerLoading` — "zero" ≠ "ainda não sei" |
| Aviso pontual dentro de um fluxo | `DssBanner` |
| Sinalizar contagem zero num elemento | `DssBadge` |

A distinção importa: **estado vazio significa que a operação funcionou e o resultado é zero.**
Tratar falha como vazio esconde do usuário que algo quebrou.

---

## Uso

```vue
<script setup>
import { DssEmptyState, DssButton } from '@sansys/design-system'
</script>

<template>
  <DssEmptyState
    icon="search_off"
    title="Nenhuma solicitação encontrada"
    description="Nenhum registro corresponde aos filtros aplicados."
  >
    <template #action>
      <DssButton variant="outline" size="sm" @click="limparFiltros">
        Limpar filtros
      </DssButton>
    </template>
  </DssEmptyState>
</template>
```

---

## API

### Props

| prop | tipo | padrão | descrição |
|---|---|---|---|
| `icon` | `string` | `''` | Nome do ícone (Material Icons), renderizado via `DssIcon` como **decorativo** |
| `title` | `string` | `''` | Frase principal — diz o que não há, na linguagem do domínio |
| `description` | `string` | `''` | Explicação secundária: por que está vazio e o que fazer |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Densidade do bloco |
| `variant` | `'plain' \| 'bordered'` | `'plain'` | Tratamento do contêiner |
| `announce` | `boolean` | `true` | Emite `role="status"` + `aria-live="polite"` |
| `ariaLabel` | `string` | `''` | Rótulo acessível. ⚠️ **Só tem efeito com `announce=true`** — §8.2 |

### Slots

| slot | escopo | descrição |
|---|---|---|
| `icon` | — | Ilustração própria (SVG de marca). **Precede** a prop `icon` |
| `title` | — | Frase principal customizada (substitui a prop) |
| `description` | — | Explicação customizada (substitui a prop) |
| `action` | — | Ação que tira o usuário do vazio — normalmente um `DssButton` |
| `default` | — | Conteúdo adicional, abaixo da ação |

### Eventos

**Nenhum.** O componente não é interativo. A interação vive no que o consumidor coloca no
slot `action`, e esse componente emite os próprios eventos.

---

## Escala de tamanho

Não é escala tipográfica livre — são três contextos de uso reais.

| size | padding | ícone | título | descrição | quando |
|---|---|---|---|---|---|
| `sm` | 16px 12px | 24px | 16px | 14px | dentro de tabela, painel ou lista curta |
| `md` | 32px 16px | 32px | 18px | 16px | **padrão** — área de conteúdo de uma seção |
| `lg` | 48px 24px | 48px | 20px | 16px | página inteira vazia (primeiro acesso) |

---

## Tokens consumidos

| propriedade | token |
|---|---|
| padding (md) | `--dss-spacing-8` / `--dss-spacing-4` |
| padding (sm) | `--dss-spacing-4` / `--dss-spacing-3` |
| padding (lg) | `--dss-spacing-12` / `--dss-spacing-6` |
| gap | `--dss-spacing-3` (sm: `--dss-spacing-2` · lg: `--dss-spacing-4`) |
| respiro da ação (`margin-top`) | `--dss-spacing-1` |
| família tipográfica | `--dss-font-family-sans` |
| título — tamanho | `--dss-font-size-lg` (sm: `--dss-font-size-md` · lg: `--dss-font-size-xl`) |
| título — peso | `--dss-font-weight-semibold` |
| título — cor | `--dss-text-primary` |
| descrição — tamanho | `--dss-font-size-md` (sm: `--dss-font-size-sm`) |
| descrição — entrelinha | `--dss-line-height-relaxed` |
| descrição — cor | `--dss-text-secondary` |
| descrição — medida de leitura | `--dss-spacing-120` (480px · sm: `--dss-spacing-96`) |
| ícone — tamanho | `--dss-icon-size-lg` (sm: `--dss-icon-size-md` · lg: `--dss-icon-size-xl`) |
| ícone — cor | `--dss-text-secondary` |
| borda (`bordered`) | `--dss-border-width-thin` · `--dss-border-default` · `--dss-radius-lg` |

---

## Estados

O componente **não é interativo** — não tem hover, active, focus nem disabled próprios.
Isso é decisão de arquitetura, não omissão: o único elemento focável é o que o consumidor
coloca no slot `action`, e ele traz os próprios estados.

| estado | comportamento |
|---|---|
| hover / active / focus | **não existem** — o bloco não é clicável |
| disabled | **não existe** — não há nada para desabilitar |
| loading | **não existe** — para isso use `DssSkeleton` / `DssInnerLoading` |
| dark mode | resolvido pelos tokens semânticos de texto; sem override próprio |
| `prefers-contrast: more` | descrição e ícone sobem para `--dss-text-primary`; a moldura vira sólida |
| `forced-colors: active` | a moldura recebe `CanvasText` para não desaparecer |

---

## Brandabilidade

**O estado vazio não se colore por marca.** É decisão de design registrada em
`4-output/_brands.scss`, não ausência de implementação.

Ele é informação neutra — diz que não há dados, não chama para uma ação de marca. Pintar o
ícone ou o título com a cor do produto competiria com a **ação**, que é o lugar legítimo da marca.

> ⚠️ Medido em ago/2026: a ação **ainda não** segue a marca. A classe utilitária `.bg-primary`
> usa o primitivo `--dss-primary`, não o semântico `--dss-action-primary`. Defeito do sistema
> (ver `DEBITO_ABERTO`), não deste componente.

---

## Acessibilidade

- **WCAG 4.1.3 (AA) — claim rebaixada.** O componente **emite** `role="status"` +
  `aria-live="polite"` quando `announce=true`. Isso **não garante** que o leitor de tela anuncie:
  no uso canônico (`v-if` montando o componente) a região entra no DOM já preenchida, e várias
  ATs não anunciam nesse caso. **Para anúncio confiável, mantenha um contêiner `aria-live`
  persistente em volta da área que troca** — ver `DssEmptyState.md` §8.1.
- **WCAG 1.4.1 (A)** — a informação está no **texto** do título, nunca apenas no ícone. O ícone
  é emitido como decorativo e não é anunciado.
- **WCAG 1.4.3 (AA)** — título em `--dss-text-primary`, descrição em `--dss-text-secondary`.
  O ícone usa a mesma `--dss-text-secondary`. **Não** use `--dss-text-muted` aqui: apesar do
  nome, ele aponta para `--dss-dark-disable` (#D7D7D7), a cor de desabilitado — um ícone nesse
  tom lê como componente quebrado.
- **WCAG 2.5.5** — não se aplica: não há alvo clicável no bloco.

---

## Escrevendo o texto

O componente é uma casca; o que resolve o problema do usuário é a frase.

| ✅ | ❌ |
|---|---|
| "Nenhuma solicitação encontrada" | "Lista vazia" · "0 registros" |
| "Quando alguém abrir uma solicitação, ela aparece aqui" | "Sem dados disponíveis" |
| ação que **desfaz o filtro** que causou o vazio | botão genérico que não resolve nada |

Se não há ação possível, o `title` sozinho basta — estado vazio sem saída é legítimo;
inventar um botão inútil, não.

---

## Arquitetura

```
DssEmptyState/
├── 1-structure/DssEmptyState.ts.vue    Vue + TypeScript (implementação canônica)
├── 2-composition/_base.scss            layout + escala de tamanho
├── 3-variants/                         plain · bordered
├── 4-output/                           brands (decisão registrada) · states
├── composables/useEmptyStateClasses.ts
├── types/empty-state.types.ts
├── DssEmptyState.vue                   entry point: re-export puro
├── DssEmptyState.module.scss           orquestrador: L2 → L3 → L4
└── dss.meta.json · dss.contract.json
```

📖 [`DssEmptyState.md`](./DssEmptyState.md) — doc normativa ·
[`DSSEMPTYSTATE_API.md`](./DSSEMPTYSTATE_API.md) — API Reference ·
[`DssEmptyState.example.vue`](./DssEmptyState.example.vue) — 7 cenários
