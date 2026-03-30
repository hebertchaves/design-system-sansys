# DssOptionGroup

**Design System Sansys v2.2 — Componente Fase 2**
**Categoria:** Container de Seleção — Grupo de Controles (Radio, Checkbox ou Toggle)
**Status:** Pré-auditoria

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| Nome | DssOptionGroup |
| Equivalente Quasar | QOptionGroup (não usado — ver §9.1) |
| Fase | 2 — Componente Composto |
| Golden Reference | DssChip (interativo) |
| Golden Context | DssBtnToggle (componente composto irmão de seleção) |
| Versão DSS | v2.2 |
| Abordagem | Construção Explícita — composição de DssRadio, DssCheckbox, DssToggle |

---

## 2. Descrição

O DssOptionGroup é um container de seleção que agrupa múltiplos controles de formulário (Radio, Checkbox ou Toggle) renderizados a partir de um array `options`. Gerencia o estado de seleção centralizado via `v-model`.

**Quando usar:**
- Selecionar uma opção entre um conjunto (exclusivo) → type="radio"
- Selecionar múltiplas opções independentes → type="checkbox"
- Ativar/desativar múltiplas configurações → type="toggle"
- Exibir opções side-by-side (compact) → prop `inline`

**Quando NÃO usar:**
- Seleção única com 2–5 opções em linha → usar `DssBtnToggle`
- Dropdown de seleção → usar `DssSelect`
- Radio/Checkbox isolado → usar `DssRadio`, `DssCheckbox` diretamente
- Mais de 7–8 opções → considerar `DssSelect` ou layout customizado

---

## 3. Justificativa da Fase 2

O DssOptionGroup é Fase 2 porque:
- Orquestra **múltiplos componentes da Fase 1** (DssRadio, DssCheckbox, DssToggle)
- Gerencia **estado de seleção centralizado** entre todos os filhos via v-model
- Coordena a **delegação de props** (color, disable, readonly, dense) para todos os filhos
- Para type="checkbox"/"toggle": gerencia um **array de seleção** complexo

---

## 4. API

### 4.1 Props Expostas

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `modelValue` | `any \| any[]` | — | Valor selecionado (v-model). Escalar para radio; array para checkbox/toggle |
| `options` | `OptionGroupItem[]` | — | Array de opções (**obrigatório**) |
| `type` | `'radio' \| 'checkbox' \| 'toggle'` | `'radio'` | Tipo de controle a renderizar |
| `color` | `string` | `undefined` | Cor padrão para todos os controles do grupo |
| `keepColor` | `boolean` | `false` | Mantém a cor quando o controle não está ativo |
| `inline` | `boolean` | `false` | Layout horizontal (side-by-side) |
| `disable` | `boolean` | `false` | Desabilita todo o grupo |
| `readonly` | `boolean` | `false` | Somente leitura — bloqueia interação sem remover foco visual |
| `dense` | `boolean` | `false` | Modo compacto — reduz o gap entre controles |
| `ariaLabel` | `string` | `undefined` | Label acessível para o container do grupo |
| `ariaLabelledby` | `string` | `undefined` | ID de elemento externo que serve como label do grupo |

### 4.2 Props Bloqueadas

| Prop Quasar | Motivo |
|-------------|--------|
| `dark` | DSS gerencia dark mode via `[data-theme="dark"]` global |
| `size` | Tamanhos controlados pelos tokens dos componentes da Fase 1 |
| `leftLabel` | Alinhamento de label deve seguir o padrão DSS (label à direita) |

### 4.3 Estrutura de `OptionGroupItem`

| Propriedade | Tipo | Obrigatório | Descrição |
|-------------|------|-------------|-----------|
| `label` | `string` | ✅ | Texto do label do controle |
| `value` | `any` | ✅ | Valor único da opção (primitive apenas — ver RES-01) |
| `disable` | `boolean?` | — | Desabilita apenas esta opção individualmente |
| `color` | `string?` | — | Cor específica deste controle (sobrescreve `color` global) |
| `keepColor` | `boolean?` | — | Mantém cor individual quando inativo |

### 4.4 Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `update:modelValue` | `any \| any[]` | Emitido quando a seleção muda. Escalar para radio; array para checkbox/toggle |

### 4.5 Slots

Nenhum slot exposto nesta versão. Conteúdo dos controles é definido via prop `options`.

---

## 5. Variantes Visuais

### 5.1 type="radio" (padrão)

Renderiza `DssRadio` para cada opção. Seleção exclusiva (apenas uma opção por vez). `modelValue` é um valor escalar.

```vue
<DssOptionGroup v-model="plano" :options="opcoesPlano" />
```

### 5.2 type="checkbox"

Renderiza `DssCheckbox` para cada opção. Seleção múltipla independente. `modelValue` deve ser um array.

```vue
<DssOptionGroup v-model="features" :options="opcoesFeatures" type="checkbox" />
```

### 5.3 type="toggle"

Renderiza `DssToggle` para cada opção. Semântica de ligar/desligar. `modelValue` deve ser um array.

```vue
<DssOptionGroup v-model="ativo" :options="opcoes" type="toggle" />
```

### 5.4 inline

Layout horizontal side-by-side. Aplica `flex-direction: row` e gap de `--dss-spacing-4`.

```vue
<DssOptionGroup v-model="dias" :options="opcoesDias" type="toggle" inline />
```

### 5.5 dense

Modo compacto. Reduz o gap vertical para `--dss-spacing-1` e horizontal para `--dss-spacing-2`. Repassado também aos filhos.

---

## 6. Estados

### 6.1 Estados Aplicáveis

| Estado | Proprietário | Implementação |
|--------|-------------|---------------|
| `default` | DssOptionGroup | Layout flex + gap padrão |
| `disabled` | Delegado aos filhos | Prop `disable: true` em todos os filhos |
| `readonly` | DssOptionGroup | `.dss-option-group--readonly` → `pointer-events: none` no container |

### 6.2 Estados Não Aplicáveis

| Estado | Justificativa |
|--------|---------------|
| `hover` | Pertence aos controles filhos (DssRadio, DssCheckbox, DssToggle) |
| `focus` | Pertence aos controles filhos |
| `active` | Pertence aos controles filhos |
| `error` | Não aplicável ao container — validação pertence ao formulário pai |
| `loading` | Fase 2 — sem operações assíncronas de seleção |
| `indeterminate` | Pertence ao DssCheckbox individual quando relevante |

---

## 7. Acessibilidade

### 7.1 ARIA

| Atributo | Valor | Fonte |
|----------|-------|-------|
| `role` | `radiogroup` (type=radio) / `group` (checkbox/toggle) | DssOptionGroup |
| `aria-label` | prop `ariaLabel` | Quando fornecido |
| `aria-labelledby` | prop `ariaLabelledby` | Quando fornecido |
| `aria-disabled` | `true` | DssOptionGroup (quando `disable: true`) |
| `aria-checked` | `true`/`false` | Delegado aos filhos DSS |

> ⚠️ **Altamente recomendado**: Fornecer `ariaLabel` ou `ariaLabelledby`. O grupo não possui label visual próprio por padrão.

### 7.2 Touch Target

**Opção B — Delegado aos filhos DSS.** DssRadio, DssCheckbox e DssToggle já implementam touch target via seus próprios mecanismos.

### 7.3 Navegação por Teclado

| Tecla | type="radio" | type="checkbox"/"toggle" |
|-------|-------------|--------------------------|
| `Tab` | Move foco entre grupos | Move foco entre controles |
| `↑` / `↓` | Alterna entre opções (nativo HTML via `name`) | — |
| `Space` | — | Marca/desmarca |
| `Enter` | — | Marca/desmarca |

---

## 8. Comportamentos Implícitos

### 8.1 Forwarding de Atributos

`inheritAttrs: false` com `v-bind="$attrs"` no container. Atributos não reconhecidos (data-*, event listeners customizados) chegam ao `<div>` raiz do DssOptionGroup.

### 8.2 Nome do Grupo de Rádio (name)

Para type="radio", o componente gera automaticamente um `name` único por instância usando um contador de módulo. Este `name` é repassado a cada `DssRadio` garantindo o agrupamento nativo para navegação por teclado (setas ↑↓).

### 8.3 Delegação de Props para Filhos

As props `color`, `keepColor`, `disable`, `readonly` e `dense` são repassadas a TODOS os filhos. Props por opção (`option.color`, `option.disable`) sobrescrevem as globais apenas para aquele controle.

### 8.4 Constraint de Mudança Dinâmica de type

Alterar a prop `type` em runtime sem atualizar o `modelValue` para o tipo correto (escalar vs array) pode causar comportamento inesperado. Documentado como RES-03.

---

## 9. Decisões Arquiteturais

### 9.1 Construção Explícita vs. Wrapper QOptionGroup ⚠️ CRÍTICO

**Decisão: NÃO usar `<q-option-group>`.**

O DssOptionGroup é construído do zero iterando sobre `options` e renderizando explicitamente os componentes DSS da Fase 1:

```vue
<!-- ✅ CORRETO: Composição explícita DSS -->
<DssRadio v-for="opt in options" :key="opt.value" ... />

<!-- ❌ INCORRETO: Wrapper Quasar perde a governança DSS -->
<q-option-group :options="options" ... />
```

**Justificativa:** Fazer wrap de `<q-option-group>` perderia toda a governança visual e de tokens já implementada em DssRadio, DssCheckbox e DssToggle (tokens de brand, estados de acessibilidade, touch target, etc.).

**Diferença vs. DssBtnToggle:** DssBtnToggle usa WRAP (QBtnToggle não tem equivalente DSS interno). DssOptionGroup usa Construção Explícita (tem DssRadio, DssCheckbox, DssToggle como filhos DSS).

### 9.2 Comunicação com Filhos

O DssOptionGroup usa **Props + Callbacks** (não provide/inject), pois:
- O número de filhos é determinado pelo array `options` (n dinâmico)
- Cada filho recebe props explícitas e emite eventos individualmente
- Sem necessidade de canal de comunicação bidirecional complexo

### 9.3 Estado de Seleção: Escalar vs. Array

| type | modelValue | Lógica de update |
|------|-----------|------------------|
| `radio` | Escalar (`any`) | Filho emite o `val` clicado → grupo re-emite diretamente |
| `checkbox` | Array (`any[]`) | `isChecked(val)` computa boolean por item; `onMultiChange()` atualiza o array |
| `toggle` | Array (`any[]`) | Mesmo padrão que checkbox |

---

## 10. Paridade com Golden Context (DssBtnToggle)

| Aspecto | DssBtnToggle | DssOptionGroup | Divergência |
|---------|-------------|----------------|-------------|
| Abordagem de criação | WRAP QBtnToggle | Construção Explícita | **Intencional** — filhos DSS existem |
| Renderização de filhos | Interna (Quasar via `options`) | Explícita via `v-for` + componentes DSS | **Intencional** |
| v-model | Valor escalar único | Escalar (radio) ou array (checkbox/toggle) | **Intencional** |
| Seleção múltipla | Não | Sim (checkbox/toggle) | **Diferença fundamental** |
| Layout | Horizontal (flexbox interno) | Vertical/Horizontal via `inline` | **Diferença intencional** |
| Variante visual | `variant` string (5 opções) | Sem variante visual própria | **Intencional** — filhos gerenciam |
| CSS no container | Seletores `.q-btn-item` (gate exception) | Nenhum seletor em filhos | **Melhor** — sem gate exceptions |
| `role` | `group` fixo | `radiogroup` ou `group` por `type` | **Mais semântico** |
| Gate exceptions | 2 (CSS + template) | Nenhuma | **Mais clean** |
| Brand accent | Box-shadow inset no container | Delegado aos filhos | **Diferente** |
| `-webkit-tap-highlight-color` | ✅ | ✅ | Igual |
| `inheritAttrs: false` + `v-bind="$attrs"` | ✅ | ✅ | Igual |
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Igual |

---

## 11. Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-spacing-2` | L2 | Gap vertical (padrão) |
| `--dss-spacing-4` | L2 | Gap horizontal (inline) |
| `--dss-spacing-1` | L3 | Gap vertical dense |
| `--dss-spacing-2` | L3 | Gap horizontal dense (reutilizado) |

> **Nota:** Todos os tokens visuais (cores, bordas, tipografia, touch target) são responsabilidade dos filhos DSS.

---

## 12. Exceções Documentadas

Nenhuma. A abordagem de Construção Explícita elimina a necessidade de seletores CSS em elementos Quasar internos.

---

## 13. Gate Exceptions v2.4

Nenhuma. DssOptionGroup é um container de layout puro sem seletores em DOM Quasar interno e sem uso direto de componentes Quasar no template.

---

## 14. Reservas

| ID | Descrição | Severidade | Bloqueante |
|----|-----------|-----------|-----------|
| RES-01 | Comparação de valores por igualdade estrita (`Array.includes`) — usar apenas primitivos como `option.value` | baixa | não |
| RES-02 | Sem testes unitários | baixa | não |
| RES-03 | Mudança dinâmica de `type` sem atualizar `modelValue` pode causar comportamento inesperado | baixa | não |

---

## 15. Estrutura de Arquivos

```
DssOptionGroup/
├── 1-structure/DssOptionGroup.ts.vue     ← Implementação canônica
├── 2-composition/_base.scss              ← Flexbox, gap, readonly
├── 3-variants/
│   ├── _dense.scss                       ← Gap reduzido (dense)
│   └── index.scss
├── 4-output/
│   ├── _states.scss                      ← Delegado aos filhos (doc)
│   ├── _brands.scss                      ← Delegado aos filhos (doc)
│   └── index.scss
├── composables/
│   ├── useDssOptionGroupClasses.ts
│   └── index.ts
├── types/
│   └── option-group.types.ts
├── DssOptionGroup.module.scss            ← Orquestrador L2→L3→L4
├── DssOptionGroup.vue                    ← Entry Point Wrapper (re-export puro)
├── DssOptionGroup.example.vue            ← 5 cenários
├── DssOptionGroup.md                     ← Este arquivo
├── DSSOPTIONGROUP_API.md                 ← API Reference
├── dss.meta.json                         ← Metadados + reservas
├── index.js                              ← Barrel export
└── README.md
```

---

## 16. Matriz de Composição DSS

### 16.1 Papel Estrutural

O DssOptionGroup é um **State Manager Container** — gerencia o estado de seleção centralizado e renderiza os filhos DSS corretos. Não tem identidade visual própria.

### 16.2 Componentes DSS Utilizados

| Componente | Relação | Status |
|------------|---------|--------|
| DssRadio | Filho (type="radio") | ✅ Selado Fase 1 |
| DssCheckbox | Filho (type="checkbox") | ✅ Selado Fase 1 |
| DssToggle | Filho (type="toggle") | ✅ Selado Fase 1 |
| DssBtnToggle | Irmão de seleção (Fase 2) | ✅ Selado Mar 2026 |

### 16.3 Componentes DSS Relacionados (Não Usados Internamente)

| Componente | Relação |
|------------|---------|
| DssSelect | Alternativa para muitas opções (>7–8) |
| DssBtnToggle | Alternativa para seleção exclusiva visual (2–5 opções em linha) |

### 16.4 Anti-Patterns de Composição

- ❌ Colocar `<q-radio>`, `<q-checkbox>` ou `<q-toggle>` dentro do DssOptionGroup
- ❌ Usar `DssOptionGroup` como substituto de `DssBtnToggle` (semântica diferente)
- ❌ Usar `type` dinamicamente sem atualizar `modelValue` para o tipo correto
- ❌ Passar objetos como `option.value` (comparação por referência quebra isChecked)
- ❌ Passar `dark` prop → DSS gerencia dark mode globalmente

---

*Design System Sansys — DSS v2.2 — DssOptionGroup*
*Status: Pré-auditoria*
