# DSS — Critérios de Avaliação Fase 2

> **Versão:** v2.4
> **Data:** 26 Mar 2026
> **Status:** Normativo vinculante
> **Aplica-se a:** Componentes DSS de Fase 2 (Compostos)

---

## O que é um Componente Fase 2

Componentes Fase 2 são **containers de composição** que gerenciam estado visual compartilhado entre dois ou mais componentes DSS filhos. Exemplos: `DssBtnGroup`, `DssCard` (com subcomponentes), `DssList`.

**Critério de classificação Fase 2:** O componente gerencia internamente a aparência ou layout de instâncias de outros componentes DSS. Isso o distingue de Fase 1 (componente atômico) e Fase 3 (sistema completo de telas).

---

## Os 5 Eixos Obrigatórios do Pré-prompt (Fase 2)

Todo componente Fase 2 **deve ter um pré-prompt que cubra os 5 eixos abaixo** antes da implementação. A ausência de qualquer eixo é Gap documentável — não bloqueante para o componente, mas bloqueante para o próximo componente da mesma família.

### Eixo 1 — Classificação e Contexto

O pré-prompt deve declarar explicitamente:
- **Fase** (1, 2 ou 3) com justificativa
- **Nível** (Golden Reference, Golden Context, componente regular)
- **Golden Context** — qual componente Fase 2 já selado serve de baseline de auditoria
- **Justificativa de Fase 2** — por que este componente é composto e não atômico

**Conforme quando:** Fase, Golden Context e justificativa de Fase 2 estão presentes e coerentes.

### Eixo 2 — O Grande Risco Arquitetural

O pré-prompt deve identificar o "calcanhar de Aquiles" do componente — o risco técnico mais provável de gerar uma NC. Para componentes Fase 2, os riscos típicos são:

- Captura de estados de filhos via CSS (Gate de Responsabilidade v2.4)
- Uso de seletores descendentes para modificar filhos DSS (Gate de Composição v2.4)
- Escopo de estilo incorreto (`<style scoped>` bloqueando child selectors)
- Prop sync não documentado (filhos que precisam replicar props do pai)

O pré-prompt deve incluir o anti-pattern e o padrão correto para cada risco identificado.

**Conforme quando:** Pelo menos 1 risco crítico identificado com anti-pattern e solução documentados.

### Eixo 3 — Mapeamento de API

O pré-prompt deve listar:
- Props **expostas** (com tipo, default e descrição)
- Props **bloqueadas** (props Quasar não suportadas) com justificativa explícita
- **Slots** disponíveis
- **Eventos** emitidos (ou declaração explícita de ausência)

**Conforme quando:** Tabelas de props expostas e bloqueadas presentes, com justificativas.

### Eixo 4 — Governança de Tokens

O pré-prompt deve mapear os tokens CSS específicos para:
- Bordas e separadores entre componentes filhos
- Espaçamento e margens contextuais de grupo
- Dimensões de container
- Tokens de brand (Hub, Water, Waste)

**Conforme quando:** Tabela de tokens com nome exato (`--dss-*`) e uso mapeado.

### Eixo 5 — Acessibilidade e Estados

O pré-prompt deve definir:
- **Role ARIA** do container (e.g., `role="group"`, `role="list"`)
- **Decisão de touch target** — Opção A (implementado) ou Opção B (delegado aos filhos) com justificativa
- **Delegação de estados** — quais estados (hover, focus, active, disabled) pertencem ao container vs. aos filhos
- **Estados não aplicáveis** — com justificativa explícita

**Conforme quando:** Role ARIA, decisão de touch target e delegação de estados declarados.

---

## Gate de Composição v2.4

**Aplicação:** Obrigatório para todos os componentes Fase 2.

### Regra 1 — Zero HTML Nativo Substituível

O componente **não pode** usar tags HTML nativas (`<button>`, `<a>`, `<input>`, `<img>`) se existir um componente DSS equivalente (`<DssButton>`, `<DssItem>`, `<DssInput>`, `<DssAvatar>`).

```vue
<!-- ❌ NÃO-CONFORMIDADE BLOQUEANTE -->
<template>
  <div class="dss-btn-group">
    <button class="dss-button">Ação</button>  <!-- usa <button> em vez de DssButton -->
  </div>
</template>

<!-- ✅ CONFORME -->
<template>
  <div class="dss-btn-group">
    <slot />  <!-- aceita DssButton via slot -->
  </div>
</template>
```

### Regra 2 — Zero Quebra de Encapsulamento

O componente pai **não pode** usar seletores CSS (`:deep()`, `::v-deep`, ou descendência direta) para alterar a aparência de um subcomponente DSS filho. Toda alteração visual no filho deve ser feita via props do próprio filho.

```scss
/* ❌ NÃO-CONFORMIDADE — altera aparência do filho via CSS descendente */
.dss-btn-group > .dss-button {
  color: red;
  background: blue;
}

/* ✅ CONFORME — alterações via props do filho */
/* (no template) <DssButton color="primary" /> */
```

**Exceções documentadas:** Ver regime de exceções formais abaixo.

### Regra 3 — Importação Correta

Componentes DSS internos **devem** ser importados via seus wrappers na raiz, nunca via `1-structure`.

```js
// ❌ INCORRETO
import DssButton from '../DssButton/1-structure/DssButton.ts.vue'

// ✅ CORRETO
import DssButton from '../DssButton/DssButton.vue'
```

---

## Gate de Responsabilidade v2.4

**Aplicação:** Obrigatório para todos os componentes Fase 2.

### Regra 1 — Delegação de Estados Interativos

Componentes container **não podem** capturar estados interativos (`:hover`, `:focus`, `:active`) que semanticamente pertencem aos filhos.

```scss
/* ❌ NÃO-CONFORMIDADE BLOQUEANTE — pai captura estado do filho */
.dss-btn-group > .dss-button:hover {
  background-color: var(--dss-surface-hover);
}

/* ✅ CONFORME — estado gerenciado pelo próprio filho (DssButton) */
```

**Exceção documentada:** Uso de `z-index`/`position` em `:hover`/`:focus-visible` para gerenciamento de empilhamento de grupo (não altera aparência visual do botão) — ver `dss.meta.json > gateExceptions > responsibilityGateV24` do DssBtnGroup como precedente.

### Regra 2 — Sem Lógica de Negócio

O componente deve resolver exclusivamente um padrão de UI/UX. Não deve haver lógica condicional no `<script>` que dependa de regras de negócio específicas de um produto (Hub, Water, Waste) em vez de props genéricas.

```typescript
// ❌ NÃO-CONFORMIDADE — lógica de negócio de produto no componente
if (product === 'hub') { applyHubSpecificBehavior() }

// ✅ CONFORME — comportamento controlado por prop genérica
if (props.brand === 'hub') { applyBrandAccent() }
```

### Regra 3 — Limites Documentados

A documentação (`.md`) **deve** declarar explicitamente:
- O que o componente faz
- O que ele **delega** aos filhos

Ausência dessa declaração é Gap documentável.

---

## Regime de Exceções Formais

Quando uma das regras dos Gates v2.4 precisa ser violada por necessidade técnica legítima, a exceção deve ser:

### 1. Registrada em `dss.meta.json`

```json
"gateExceptions": {
  "responsibilityGateV24": {
    "location": "caminho/do/arquivo.scss",
    "justification": "Descrição técnica precisa do motivo pelo qual a exceção é necessária e por que a alternativa sem exceção criaria impacto maior."
  },
  "compositionGateV24": {
    "location": "caminho/do/arquivo.scss",
    "justification": "Idem."
  }
}
```

### 2. Documentada em `DssNomeComponente.md` (seção Exceções)

A seção de exceções deve incluir uma subseção "Exceções aos Gates v2.4" com:
- Nome do gate violado
- Arquivo onde ocorre
- Justificativa técnica
- Decisão arquitetural (quem aprovou e quando)

### 3. Aprovada explicitamente

A exceção deve ter registro de aprovação. Para fins deste framework, o registro no `dss.meta.json` + documentação no `.md` constituem a aprovação formal.

---

## Critérios de Status Final

| Status | Condição |
|--------|----------|
| ✅ **Elegível para Selo** | Zero NCs bloqueantes; Gates v2.4 conformes ou com exceções formais registradas; 5 eixos do pré-prompt cobertos |
| 🟡 **Condicional** | NCs não-bloqueantes pendentes; Gates v2.4 com tensão não registrada; pré-prompt cobrindo < 5 eixos |
| 🔴 **Não Elegível** | Qualquer NC bloqueante sem exceção formal; Gate v2.4 violado sem documentação |

---

## Referências

- `CLAUDE.md` — Regras normativas para agentes de IA
- `DSS_GOLDEN_COMPONENTS.md` — Modelo Golden (Reference, Context, Sample)
- `DSS_COMPONENT_ARCHITECTURE.md` — Arquitetura de 4 camadas e anti-patterns
- `DssBtnGroup/dss.meta.json` — Precedente de exceções Gates v2.4 (Março 2026)

---

*Criado: 26 Mar 2026 — DSS v2.4 — Framework de Auditoria Fase 2*
