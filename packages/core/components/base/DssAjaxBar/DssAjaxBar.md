# DssAjaxBar — Documentação Normativa (Template 13.1)

## 1. Visão Geral e Classificação

**O que é:** `DssAjaxBar` é uma barra de progresso global e fixa que indica o estado de requisições assíncronas (XHR/Fetch) em andamento. Posiciona-se no viewport da aplicação (topo, base ou lateral) e aparece/desaparece automaticamente conforme o ciclo de vida das requisições interceptadas.

**Quando usar:**
- Feedback visual global de carregamento de dados assíncronos (SPA routes, API calls)
- Integração com Vue Router para indicar navegação entre rotas
- Operações assíncronas globais onde DssInnerLoading local não se aplica

**Quando NÃO usar:**
- Carregamento de componentes específicos (card, tabela, seção) — use `DssInnerLoading` ou `DssSkeleton`
- Operações com progresso determinístico (upload/download com % conhecida) — use `DssLinearProgress`
- Requisições de polling muito frequentes — use `hijackFilter` para excluí-las
- Múltiplas barras simultâneas — instanciar apenas uma por aplicação (no layout raiz)

**Classificação DSS:**
- **Tipo:** Não interativo — Feedback Visual Global
- **Categoria:** Progresso e Feedback
- **Fase:** 2 — Nível 1
- **Família:** Progresso e Feedback
- **Interativo:** Não
- **Quasar Base:** `QAjaxBar`
- **Golden Reference:** `DssBadge`
- **Golden Context:** `DssLinearProgress`

---

## 2. API Surface

### Props principais

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `position` | `AjaxBarPosition` | `'top'` | Posição no viewport |
| `size` | `String` | `'2px'` | Espessura da barra |
| `skipHijack` | `Boolean` | `false` | Desativa interceptação automática |
| `reverse` | `Boolean` | `false` | Inverte direção de animação |
| `hijackFilter` | `Function` | — | Filtra requisições a interceptar |
| `brand` | `AjaxBarBrand` | — | Contexto de brand Sansys |

**Slots:** Nenhum (barra de elemento único).

**Events:** `@start`, `@stop` (re-emissão dos eventos do QAjaxBar).

**API Imperativa:** `start(speed?)`, `stop()`, `increment(amount?)`, `setProgress(value)` — via `ref`.

*API completa em [DSSAJAXBAR_API.md](./DSSAJAXBAR_API.md)*

---

## 3. Comportamento e Estados

### Estados Aplicáveis

| Estado | Implementação | Detalhes |
|--------|--------------|---------|
| Carregando (hijack auto) | ✅ QAjaxBar nativo | Intercepta XHR/Fetch globalmente |
| Carregando (manual) | ✅ EXC-Expose-01 | `start()` / `stop()` via ref |
| Progresso determinístico | ✅ EXC-Expose-01 | `increment()` / `setProgress()` |
| Dark mode | ✅ Token cascade | `--dss-action-primary` adapta automaticamente |
| prefers-contrast: more | ✅ `outline: 1px solid currentColor` | Demarcar barra visualmente |
| prefers-reduced-motion | ✅ EX-States-01 | Suprime transição de progressão |
| forced-colors | ✅ EX-States-03 | `Highlight`, `ButtonText` |
| Print | ✅ EX-States-02 | `display: none` |

### Estados Explicitamente Não Aplicáveis

| Estado | Razão |
|--------|-------|
| hover | Componente não interativo — barra visual fixed, sem resposta a cursor |
| focus | Não recebe foco — elemento visual puro fora do fluxo de documento |
| active | Sem interação de pressão — não clicável por design |
| disabled | Semanticamente incoerente — barra AJAX representa atividade ativa; consumer controla exibição via skipHijack e API imperativa |
| error | Barra não representa erro — apenas progresso de requisição |

---

## 4. Tokens DSS

| Token | Propriedade | Contexto |
|-------|-------------|----------|
| `--dss-action-primary` | `--q-color-primary` | Cor padrão (EXC-Gate-02) |
| `--dss-hub-600` | `--q-color-primary` | Brand hub |
| `--dss-water-500` | `--q-color-primary` | Brand water |
| `--dss-waste-600` | `--q-color-primary` | Brand waste |

---

## 5. Acessibilidade

- **`role="progressbar"` nativo do QAjaxBar:** QAjaxBar adiciona `role="progressbar"` ao elemento raiz automaticamente. Leitores de tela anunciam mudanças no progresso via ARIA `aria-valuenow`. DssAjaxBar não duplica nem sobrescreve este atributo.

- **`aria-busy` é responsabilidade do consumer:** O container pai que dispara as requisições deve ter `aria-busy="true"` enquanto a barra está ativa e `aria-busy="false"` ao concluir. Use os eventos `@start` e `@stop` para sincronizar.

- **WCAG 2.3.3 (Animação sob Solicitação — Nível AAA):** `prefers-reduced-motion: reduce` suprime a transição de progressão da barra (EX-States-01). Inclui `animation` e `transition`.

- **WCAG 1.4.11 (Contraste Não-Textual — Nível AA):** `forced-colors: active` aplica `background-color: Highlight` (cor de realce do sistema) e `border: 1px solid ButtonText`. `forced-color-adjust` não declarado (sem slot para proteger).

- **Nenhum touch target:** Componente não interativo. `::before` não implementado (Opção B — consistente com DssBadge e DssInnerLoading).

- **`inheritAttrs: false` + `v-bind="$attrs"`:** Atributos extras do consumer são forwarded ao QAjaxBar. `color` é sempre sobrescrito pela binding explícita DSS.

---

## 6. Comportamentos Implícitos

1. **QAjaxBar como root element** — `.dss-ajax-bar` e `.q-loading-bar` são o mesmo elemento. Não há wrapper externo (EXC-Gate-01).

2. **Interceptação automática de XHR/Fetch** — Por padrão, QAjaxBar monitora requisições globalmente. A barra aparece ao iniciar a primeira e desaparece quando a última conclui. Desabilite com `:skip-hijack="true"`.

3. **`color="primary"` + `--q-color-primary` override** — DSS não usa Quasar color names diretamente. Passamos `color="primary"` ao QAjaxBar e sobrescrevemos `--q-color-primary` com tokens DSS por brand context (EXC-Gate-02). O consumer não consegue sobrescrever a cor via `$attrs`.

4. **Posicionamento `fixed` ao viewport** — QAjaxBar é sempre posicionado fixo no viewport (não no container pai). Não é afetado por `overflow: hidden` ou `position: relative` no ancestral.

5. **`size` default `'2px'`** — Quando não passado, QAjaxBar usa `'2px'` como padrão (EX-Structural-01). Aceita qualquer valor CSS de tamanho.

6. **`hijackFilter` para exclusão de requisições** — Função `(url: string) => boolean`. Retorne `false` para ignorar a requisição (não acionar a barra). Útil para polling frequente.

7. **`defineEmits(['start', 'stop'])` declarado** — DssAjaxBar RE-EMITE eventos do QAjaxBar. Divergência intencional do padrão DssLinearProgress/DssCircularProgress (que não emitem). Justificativa: consumer precisa sincronizar `aria-busy`.

---

## 7. Paridade Golden Reference / Golden Context

| Aspecto | DssBadge (Ref) | DssLinearProgress (Context) | DssAjaxBar | Status |
|---------|---------------|-----------------------------|------------|--------|
| Interatividade | ❌ | ❌ | ❌ | ✅ Paridade |
| Touch Target | N/A Opção B | N/A Opção B | N/A | ✅ Paridade |
| Brand dual-selector | ✅ | ✅ | ✅ | ✅ Paridade |
| Quasar como root | ❌ | ✅ EXC-Gate-01 | ✅ EXC-Gate-01 | ✅ Paridade com Context |
| prefers-contrast: more | ✅ | ✅ | ✅ | ✅ Paridade |
| prefers-reduced-motion | ✅ | ✅ EX-States-01 | ✅ EX-States-01 | ✅ Paridade |
| forced-colors | ✅ | ✅ | ✅ EX-States-03 | ✅ Paridade |
| print display:none | ✅ | ✅ | ✅ EX-States-02 | ✅ Paridade |
| defineEmits | Omitido | Omitido | ✅ Declarado | ✅ Divergência intencional |
| defineExpose | — | — | ✅ EXC-Expose-01 | ✅ Divergência intencional |

**Divergências intencionais:** `defineEmits` e `defineExpose` declarados — DssAjaxBar é o único componente de Progresso e Feedback que re-emite eventos e expõe API imperativa, porque QAjaxBar tem uma interface de controle programático necessária ao consumer.

---

## 8. Composição e Integração

### Uso recomendado: layout raiz

```vue
<!-- App.vue ou DssLayout -->
<template>
  <DssLayout>
    <!-- Uma única instância no layout raiz -->
    <DssAjaxBar position="top" brand="hub" />
    <router-view />
  </DssLayout>
</template>
```

### Uso com controle manual

```vue
<script setup>
import { ref } from 'vue'
const ajaxBar = ref(null)

async function fetchData() {
  ajaxBar.value?.start()
  try {
    const data = await api.getData()
    processData(data)
  } finally {
    ajaxBar.value?.stop()
  }
}
</script>

<template>
  <div :aria-busy="isLoading">
    <DssAjaxBar ref="ajaxBar" :skip-hijack="true" brand="water" />
    <button @click="fetchData">Carregar Dados</button>
  </div>
</template>
```

### Anti-patterns de composição

- ❌ **Múltiplas instâncias simultâneas** — instanciar apenas uma por aplicação no layout raiz
- ❌ **Usar dentro de DssInnerLoading** — sobreposição de padrões de loading
- ❌ **Para operações com % conhecido** — use DssLinearProgress com `:value`
- ❌ **Para carregamento de seção local** — use DssInnerLoading ou DssSkeleton

---

## 9. Exceções Registradas

| ID | Tipo | Localização | Valor | Justificativa |
|----|------|-------------|-------|---------------|
| EXC-Gate-01 | Gate Estrutural | `1-structure/DssAjaxBar.ts.vue` | QAjaxBar como root | QAjaxBar gerencia internamente posicionamento fixed, hijack XHR/fetch, animação e role=progressbar. Wrapper div seria redundante. |
| EXC-Gate-02 | Gate Estrutural | `2-composition/_base.scss` | `--q-color-primary: var(--dss-action-primary)` | QAjaxBar usa `background: var(--q-color-primary)`. DSS injeta cor de brand via override do CSS custom property de tema Quasar. Padrão DssPagination. |
| EXC-Expose-01 | Expose | `1-structure/DssAjaxBar.ts.vue` | `start, stop, increment, setProgress` | API imperativa necessária para controle manual. Padrão DssInfiniteScroll. |
| EX-States-01 | Estado | `4-output/_states.scss` | `transition:none !important; animation:none; 0.01ms; 1` | prefers-reduced-motion suprime animação de progressão do QAjaxBar. WCAG 2.3.3. |
| EX-States-02 | Estado | `4-output/_states.scss` | `display: none` | Print: barra de progresso AJAX oculta. |
| EX-States-03 | Estado | `4-output/_states.scss` | `Highlight`, `ButtonText` | forced-colors SystemColor keywords. `forced-color-adjust` NÃO declarado. WCAG 1.4.11. |
| EX-Structural-01 | Estrutural | Comportamento QAjaxBar | `'2px'` | Espessura padrão herdada do QAjaxBar. Valor estrutural canônico para barra slim. Sem token DSS correspondente. |

---

## 10. Changelog

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-05-18 | Claude (DSS Agent) | Criação inicial. Fase 2 Nível 1 — Família Progresso e Feedback. |
