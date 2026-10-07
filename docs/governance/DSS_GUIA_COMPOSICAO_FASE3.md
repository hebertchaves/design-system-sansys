# DSS — Guia de Composição (Fase 3)

Este documento estabelece as regras arquiteturais obrigatórias para a criação de componentes compostos complexos (Fase 3) no Design System Sansys. Ele foi forjado a partir dos aprendizados do stress test do `DssDataCard` e visa garantir que componentes aninhados em profundidade funcionem sem quebras, vazamentos de CSS ou prop drilling excessivo.

## 1. Os 6 Padrões Obrigatórios de Composição

Qualquer componente que orquestre múltiplos componentes DSS internamente deve seguir estritamente estes 6 padrões.

### 1.1. `inheritAttrs: false` e Repasse Explícito

No Vue 3, atributos não declarados como `props` (como `class`, `style`, `data-test`) são aplicados automaticamente ao elemento raiz do template. Em componentes compostos, o elemento raiz frequentemente é um wrapper de layout (ex: uma `div` de grid), o que faz com que as classes do consumidor sejam aplicadas no lugar errado.

**Regra:** Todo componente da Fase 3 deve declarar `inheritAttrs: false` e repassar `$attrs` explicitamente para o componente DSS principal da composição.

```vue
<script setup lang="ts">
defineOptions({
  name: 'DssComplexComponent',
  inheritAttrs: false, // ⚠️ Obrigatório
})
</script>

<template>
  <!-- O v-bind="$attrs" garante que class/style cheguem aqui -->
  <DssCard v-bind="$attrs" class="dss-complex-component">
    <div class="dss-complex-component__header">...</div>
  </DssCard>
</template>
```

### 1.2. Propagação de Estado via `provide/inject` Tipado

Passar propriedades como `disabled`, `readonly` ou `loading` através de múltiplos níveis de componentes (Prop Drilling) torna o código frágil.

**Regra:** O componente raiz de um bloco complexo deve usar `provide` para expor seu estado global. Os componentes filhos devem usar `inject` para consumir esse estado, combinando-o com suas próprias props locais.

```typescript
// composables/useComplexComponent.ts
import { InjectionKey, Ref, provide, inject } from 'vue'

export const COMPLEX_DISABLED_KEY: InjectionKey<Ref<boolean>> = Symbol('complex-disabled')

export function provideComplexDisabled(disabled: Ref<boolean>) {
  provide(COMPLEX_DISABLED_KEY, disabled)
}

export function useComplexDisabled(localDisabled: Ref<boolean>) {
  const injectedDisabled = inject(COMPLEX_DISABLED_KEY, ref(false))
  return computed(() => localDisabled.value || injectedDisabled.value)
}
```

### 1.3. CSS Variables como Canal de Comunicação

Para propriedades puramente visuais (como `brand` ou `color`), o uso de `provide/inject` é desnecessário e custoso.

**Regra:** Propriedades visuais globais devem ser propagadas via atributos de dados (`data-*`) no elemento raiz, permitindo que os componentes filhos leiam as CSS Variables correspondentes via cascata natural do CSS.

```vue
<!-- Pai define o contexto -->
<DssCard :data-brand="brand">
  <!-- Filho consome automaticamente via CSS do DSS -->
  <DssToolbar>...</DssToolbar>
</DssCard>
```

### 1.4. Proibição Absoluta de `:deep()` para Layout

O uso de `:deep()` (ou `::v-deep`) para forçar margens, paddings ou larguras em componentes filhos quebra o encapsulamento e cria acoplamento forte.

**Regra:** O layout deve ser controlado exclusivamente pelo componente pai através de classes aplicadas a wrappers (ex: `.dss-complex__header`), nunca injetando CSS nos componentes filhos.

```scss
// ❌ ERRADO: Quebra o encapsulamento do DssToolbar
.dss-complex {
  :deep(.dss-toolbar) {
    margin-bottom: var(--dss-spacing-4);
  }
}

// ✅ CORRETO: O pai controla o próprio wrapper
.dss-complex {
  &__header {
    margin-bottom: var(--dss-spacing-4);
  }
}
```

### 1.5. Slots Dinâmicos e Tipados

Componentes complexos frequentemente precisam expor slots de seus componentes internos (ex: as abas de um `DssTabs` dentro de um `DssDataCard`).

**Regra:** Use geração dinâmica de slots (`v-for` com `<slot :name="...">`) para repassar áreas de conteúdo de forma transparente ao consumidor.

```vue
<DssTabPanels>
  <DssTabPanel v-for="tab in tabs" :key="tab.name" :name="tab.name">
    <!-- Expõe um slot específico para cada aba -->
    <slot :name="`tab-${tab.name}`" />
  </DssTabPanel>
</DssTabPanels>
```

### 1.6. O Eixo de Variação decide: composto, token ou slot

A pergunta recorrente ao montar tela é *"crio um componente específico mais completo, ou
deixo o default com variações por prop?"*. **Não se decide por gosto — decide-se pelo que
varia.**

| O que varia entre Water / Hub / Waste | Mecanismo | Por quê |
|---|---|---|
| **Pele** — cor, marca | token, via `[data-brand]` **e** prop `brand` | A marca é remapeamento de token, não estrutura nova |
| **Conteúdo** — quais ícones, qual título, qual logo | **slot** | Conteúdo em prop vira reimplementação de slot, sempre pior |
| **Estrutura** — a ordem e a composição das peças | **composto novo** (`components/composed/`) | Estrutura invariante é exatamente o que um composto é |

**Evidência que fixou a regra (set/2026).** No Grid Master, o app bar azul do Sansys Water
saiu de `DssToolbar brand="water"` — **sem uma linha de override na página**: o
`4-output/_brands.scss` do componente pinta com `--dss-water-600` e remapeia
`--dss-action-primary` para os filhos. Pele por token funciona e não pede componente novo.

No sentido oposto, o `DssButton` já pagou o preço de tratar conteúdo como prop: `label` era
*fallback* do slot e **descartava conteúdo em silêncio** — 54 usos ficaram sem nome acessível.
A correção foi mesclar, como o QBtn sempre fez.

E a estrutura é o caso em que o composto se justifica: a app bar do Sansys é sempre
`burger → logo → divisor → título → espaçador → ações`. Expressar essa ordem como props
(`burgerIcon`, `logoSrc`, `actions[]`) seria reimplementar slots mal — e reimplementar
primitivo é vedado pelo Cartão Composto do `CLAUDE.md`.

**Cláusula obrigatória.** Composto novo só nasce com a cadeia fechada: contrato emitido,
página Playground, Preview Frame com semente e `validate:sandbox-nav` verde. Sem isso o que
nasce é promessa — foi assim que o menu do sandbox ganhou um item `IconButton` para um
componente que nunca existiu, e que a doc do próprio `DssButton` passou a recomendar.

## 2. Riscos Conhecidos e Mitigações

Durante a construção de componentes da Fase 3, os seguintes riscos devem ser ativamente monitorados:

### 2.1. Quebra de Cascata em Overlays

Componentes como `DssDialog`, `DssDrawer` e `DssMenu` usam `teleport` para renderizar seu conteúdo diretamente no `<body>`. Isso quebra a cascata de CSS Variables e o contexto de `provide/inject` do componente pai.

**Mitigação:** Se um componente da Fase 3 orquestrar um overlay, ele deve repassar explicitamente o contexto (ex: `brand`) para o overlay, pois a herança automática falhará.

### 2.2. Overflow e Scroll Indesejado

A composição de múltiplos containers (ex: `DssCard` > `DssTabPanels` > `DssScrollArea`) pode gerar barras de rolagem duplas ou conteúdo cortado se as alturas não forem rigidamente controladas.

**Mitigação:** O componente composto deve definir claramente em sua documentação qual elemento é responsável pelo scroll e se ele exige uma altura fixa (`height` ou `max-height`) do consumidor.

### 2.3. Acessibilidade (ARIA) em Profundidade

Ao aninhar componentes interativos, a hierarquia de foco do teclado pode se tornar confusa.

**Mitigação:** O componente raiz deve gerenciar os atributos `aria-*` globais (ex: `aria-busy` quando em loading) e garantir que o foco não fique preso em elementos internos desabilitados.

---
**Autor:** Manus AI
**Data:** Abril 2026
