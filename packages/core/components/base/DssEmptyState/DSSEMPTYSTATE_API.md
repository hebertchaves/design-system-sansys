# DssEmptyState API — Referência Técnica

> `@sansys/design-system` v2.5.0 · componente base, Fase 1
> Doc normativa: [`DssEmptyState.md`](./DssEmptyState.md) · Guia de uso: [`README.md`](./README.md)

---

## Visão Geral

Bloco não interativo que comunica a **ausência de dados**. HTML próprio do DSS — **não**
envolve componente Quasar. O único subcomponente usado é o `DssIcon`.

```
<div class="dss-empty-state dss-empty-state--md dss-empty-state--plain"
     role="status" aria-live="polite">
```

---

## Props Completas

### Conteúdo

| prop | tipo | padrão | obrigatória | descrição |
|---|---|---|---|---|
| `icon` | `string` | `''` | não | Nome do ícone Material Icons. Renderizado via `<DssIcon :name inline decorative />`. Omita para um bloco só de texto. |
| `title` | `string` | `''` | não | Frase principal. Nomeie o **assunto** do domínio, não o mecanismo. |
| `description` | `string` | `''` | não | Explicação secundária: causa do vazio e o que fazer. |

> Todas as props de conteúdo são opcionais **de propósito**: um estado vazio só de título é
> legítimo, e um só de ícone (dentro de uma célula estreita) também.

### Visuais

| prop | tipo | valores | padrão | descrição |
|---|---|---|---|---|
| `size` | `EmptyStateSize` | `'sm'` · `'md'` · `'lg'` | `'md'` | Densidade do bloco |
| `variant` | `EmptyStateVariant` | `'plain'` · `'bordered'` | `'plain'` | Tratamento do contêiner |

**Efeito de `size`** — valores resolvidos:

| | `sm` | `md` | `lg` |
|---|---|---|---|
| padding | `16px 12px` | `32px 16px` | `48px 24px` |
| gap | `8px` | `12px` | `16px` |
| ícone | `24px` | `32px` | `48px` |
| título | `16px` | `18px` | `20px` |
| descrição | `14px` | `16px` | `16px` |
| medida de leitura | `384px` | `480px` | `480px` |

**Efeito de `variant`:**

| variant | borda | fundo |
|---|---|---|
| `plain` | nenhuma | transparente |
| `bordered` | `1px dashed var(--dss-border-default)`, raio `12px` | transparente |

### Acessibilidade

| prop | tipo | padrão | descrição |
|---|---|---|---|
| `announce` | `boolean` | `true` | Emite `role="status"` + `aria-live="polite"` no elemento raiz |
| `ariaLabel` | `string` | `''` | Emite `aria-label`. String vazia **não** emite o atributo. |

### Props que **não** existem — e por quê

| prop ausente | motivo |
|---|---|
| `color` | Estado vazio é informação neutra, não feedback — ver doc normativa §7.1 |
| `brand` | O bloco não se colore por marca — §7.2 |
| `loading` | Vazio ≠ carregando; use `DssSkeleton` ou `DssInnerLoading` |
| `error` | Vazio ≠ erro; use `error` no componente de campo ou lista |
| `clickable` / `@click` | O bloco não é interativo; a ação vive no slot `action` |

---

## Slots

| slot | escopo | precede a prop | descrição |
|---|---|---|---|
| `icon` | — | `icon` ✅ | Ilustração própria (SVG de marca, imagem). Dimensionada por `> svg` / `> img` conforme o `size`. |
| `title` | — | `title` ✅ | Frase principal customizada (rich text, `<strong>`) |
| `description` | — | `description` ✅ | Explicação customizada (com link, por exemplo) |
| `action` | — | — | Ação de saída — normalmente um `DssButton`. Envolvido por `.dss-empty-state__action` com `flex-wrap` (aceita mais de um botão). |
| `default` | — | — | Conteúdo adicional, renderizado **abaixo** da ação |

> **Regra de precedência (CCI §3.2):** o slot nomeado sempre vence a prop equivalente. Passar
> os dois não é erro — a prop é simplesmente ignorada.

---

## Eventos

**Nenhum.**

Declarado explicitamente, não omitido: o componente não é interativo. Os eventos vivem no que
o consumidor coloca no slot `action`. O teste `DssEmptyState.test.js` verifica a ausência, de
modo que uma emissão acidental futura reprove.

---

## Tipos TypeScript

```ts
import type {
  EmptyStateProps,
  EmptyStateSlots,
  EmptyStateSize,     // 'sm' | 'md' | 'lg'
  EmptyStateVariant,  // 'plain' | 'bordered'
} from '@sansys/design-system'
```

---

## Casos de Uso Comuns

### 1. Busca sem resultado — o caso dominante

```vue
<DssEmptyState
  icon="search_off"
  title="Nenhuma solicitação encontrada"
  description="Nenhum registro corresponde aos filtros aplicados."
>
  <template #action>
    <DssButton variant="outline" size="sm" @click="limparFiltros">Limpar filtros</DssButton>
  </template>
</DssEmptyState>
```

A ação **desfaz a causa** do vazio. É o padrão mais útil e o mais esquecido.

### 2. Primeiro acesso — página inteira

```vue
<DssEmptyState
  size="lg"
  icon="inbox"
  title="Você ainda não tem solicitações"
  description="Quando alguém abrir uma solicitação para a sua equipe, ela aparece aqui."
>
  <template #action>
    <DssButton color="primary" icon="add">Nova solicitação</DssButton>
  </template>
</DssEmptyState>
```

### 3. Dentro de tabela

```vue
<DssEmptyState size="sm" icon="table_rows" title="Sem registros no período" />
```

### 4. Área de anexos (`bordered`)

```vue
<DssEmptyState
  variant="bordered"
  icon="attach_file"
  title="Nenhum anexo"
  description="Arraste arquivos para esta área ou use o botão abaixo."
>
  <template #action>
    <DssButton variant="outline" size="sm" icon="upload">Anexar arquivo</DssButton>
  </template>
</DssEmptyState>
```

### 5. Sem ação possível

```vue
<DssEmptyState icon="event_busy" title="Nenhum evento agendado para hoje" />
```

### 6. Ilustração própria

```vue
<DssEmptyState title="Nada por aqui">
  <template #icon>
    <svg viewBox="0 0 48 48" aria-hidden="true"><!-- ... --></svg>
  </template>
</DssEmptyState>
```

### 7. Conteúdo estático — sem anúncio

```vue
<DssEmptyState :announce="false" icon="folder_open" title="Esta pasta está vazia" />
```

Desligue `announce` **apenas** quando o bloco já nasce na tela e nunca muda.

---

## Integração com outros componentes

### Com `DssVirtualScroll` / `DssInfiniteScroll`

Ambos expõem um slot `empty`. Este componente é o **conteúdo** desse slot — era exatamente o
vazio que motivou sua criação.

```vue
<DssVirtualScroll :items="itens">
  <template #empty>
    <DssEmptyState size="sm" icon="inbox" title="Nada para exibir" />
  </template>
</DssVirtualScroll>
```

### Com `DssTable`

Substitui o corpo da tabela quando `rows` está vazio. Use `size="sm"`.

### Com `DssCard` / `DssPage`

Coloque dentro do contêiner que já tem contorno e mantenha `variant="plain"` — desenhar uma
segunda moldura dentro da primeira só adiciona ruído.

---

## Classes CSS Geradas

| classe | quando |
|---|---|
| `.dss-empty-state` | sempre |
| `.dss-empty-state--sm` · `--md` · `--lg` | conforme `size` (sempre uma) |
| `.dss-empty-state--plain` · `--bordered` | conforme `variant` (sempre uma) |
| `.dss-empty-state__icon` | prop `icon` **ou** slot `icon` |
| `.dss-empty-state__title` | prop `title` **ou** slot `title` |
| `.dss-empty-state__description` | prop `description` **ou** slot `description` |
| `.dss-empty-state__action` | slot `action` |

---

## Relação com Quasar

**Nenhuma.** O Quasar não tem componente equivalente, e este é HTML próprio do DSS. Não há
props herdadas, nem `inheritAttrs` a governar, nem cascata de terceiros a isolar.

---

## Layout — o que é responsabilidade do pai

O componente define a própria **densidade interna** (padding, gap, medida de leitura do texto).
Não define largura, altura nem centralização vertical na área — isso é decisão do contêiner,
conforme a regra de composição do DSS ("layout mora no pai").

```vue
<!-- centralizar verticalmente numa área alta: responsabilidade do pai -->
<div class="minha-area" style="display:grid; place-items:center; min-height:60vh">
  <DssEmptyState size="lg" icon="inbox" title="Você ainda não tem solicitações" />
</div>
```

---

## Acessibilidade — resumo verificável

| critério | nível | como é atendido | `verifiedBy` |
|---|---|---|---|
| 4.1.3 | AA | `role="status"` + `aria-live="polite"` quando `announce` | `aria` |
| 1.4.1 | A | informação no texto; ícone `decorative` | `aria` |
| 1.4.3 | AA | `--dss-text-primary` / `--dss-text-secondary` | `css` |
| 2.5.5 | — | não se aplica: sem alvo clicável | — |

**Alto contraste** (`prefers-contrast: more`): descrição e ícone sobem para
`--dss-text-primary`; moldura vira sólida.
**Forced colors**: moldura recebe `CanvasText`.
**Reduced motion**: não se aplica — o componente não anima.
