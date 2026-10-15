# 🤖 PRÉ-PROMPT: DssCompositionGroup (Fase 3)

> **Contexto:** Contrato de Interface do container de abas que migra o `JtCompositions`.
> Peça principal: `pre_prompt_dss_composition.md`. De-para e decisões:
> `docs/specs/MIGRACAO_JTECH_COMPOSITION.md`.

## 1️⃣ CLASSIFICAÇÃO E CONTEXTO
- **Nome:** `DssCompositionGroup`
- **Fase:** Fase 3 — Componente Composto
- **Classificação:** `Action` (interativo: navegação por abas)
- **Golden Reference:** `DssChip` (interativo)
- **Golden Context:** `DssTabs` (as abas são dele)
- **Justificativa:** um cadastro com várias coleções filhas mostra uma por aba, com a
  contagem de registros e a marca de obrigatória no rótulo. O grupo **não valida nada**:
  cada `DssComposition` é um campo registrado no `DssForm`. O grupo só mostra, na aba, qual
  coleção está inválida.

## 2️⃣ CONTRATO DE INTERFACE

### 2.1. Casos de Uso Negativos
- ❌ Não recebe configuração em array (o `compositions` do legado). As coleções são filhos
  `DssComposition` no slot.
- ❌ Não valida nem expõe `isValid()`: isso é do `DssForm` mestre.
- ❌ Não desmonta coleção de aba inativa (Risco 5).
- ❌ Não esconde as setas de rolagem das abas com CSS de vendor (o legado fazia com
  `display: none !important`).

### 2.2. Matriz de Composição
- ✅ `DssTabs` + `DssTab` — as abas; rótulo `label (n)`, `*` quando obrigatória, `alert`
  quando inválida
- ✅ `DssComposition` — os filhos, no slot `default`
- ❌ `DssTabPanels`/`DssTabPanel` — montam o painel sob demanda, o que tira a coleção do
  formulário (Risco 5)

### 2.3. Estado de Falha e Loading
- **Falha:** a aba de uma coleção inválida recebe o `alert` do `DssTab`, e o rótulo
  acessível diz "com erro" — a falha não vive só na cor.
- **Loading / vazio:** de cada `DssComposition`; o grupo não tem estado próprio.

## 3️⃣ O GRANDE RISCO ARQUITETURAL
- **Risco 5 — coleção em aba não visitada não é validada.** O `useFormChild` registra o
  campo no `onMounted` e remove no `onBeforeUnmount` (conferido em
  `quasar/src/composables/use-form/use-form-child.js`). Painel montado sob demanda deixa a
  coleção de uma aba nunca aberta **fora do formulário**: obrigatória e vazia, ela passa no
  submit. O `JtCompositions` tinha o mesmo furo (o `isValid()` tratava `$ref` inexistente
  como válido).
  **Mitigação:** todas as coleções ficam montadas; a inativa é escondida (`v-show`). Como
  isso dispensa o `DssTabPanels`, o grupo assume a semântica de painel (`role="tabpanel"`,
  `aria-labelledby` da aba). **Exceção a "não reimplementar primitivo", declarada aqui e
  registrada no meta** — o primitivo existe, mas o comportamento dele (montar sob demanda)
  contradiz a decisão 3. **Provar no spike.**
- **Comunicação filho → grupo:** cada `DssComposition` informa ao grupo nome, rótulo,
  contagem, obrigatoriedade e erro por **provide/inject tipado** (Cartão Composto).

## 4️⃣ MAPEAMENTO DE API (DSS vs LEGADO)

| Prop/Slot/Evento | Origem | Ação DSS | Justificativa / Tipo |
|---|---|---|---|
| `modelValue` | legado (`tab` interno) | Criar | nome da aba ativa; v-model opcional |
| `ariaLabel` | DSS | Criar | nome da lista de abas |
| `brand` | DSS | Criar | `data-brand` no contêiner raiz |
| `dense` | legado (`dense` fixo) | Expor | repassado ao `DssTabs` |
| `compositions` | legado | Bloquear | vira filhos no slot |
| `buttonHidden` | legado | Bloquear | vira `readonly` em cada `DssComposition` |
| slot `default` | DSS | Criar | só `DssComposition` (aviso em dev para outro filho) |
| `update:modelValue` | DSS | Criar | troca de aba |
| `isValid()` / `resetValidation()` | legado | Bloquear | do `DssForm` mestre |

## 5️⃣ GOVERNANÇA DE TOKENS E COMPOSIÇÃO
- Sem `:deep()`; sem `!important` em classe de vendor.
- `inheritAttrs: false` + `v-bind="$attrs"` no contêiner raiz.
- Marca por `data-brand` no contêiner raiz.
- Tokens: `--dss-spacing-4` (respiro entre abas e painel). Nenhuma cor no SCSS.

## 6️⃣ ACESSIBILIDADE E ESTADOS
- **ARIA:** `role="tablist"` vem do `DssTabs`; o painel de cada coleção é
  `role="tabpanel"` com `aria-labelledby` apontando a aba.
- **Estado de erro:** além do `alert` visual, o nome acessível da aba inclui o erro.
- **Contagem:** está no **nome** da aba ("Endereços, 3 registros"), não só no texto visual.
- **Teclado:** setas entre abas, do `DssTabs`.
- Afirmações a11y nascem ancoradas e provadas por mutação.

## 7️⃣ SUPERFÍCIE DE PLAYGROUND
1. **Fluxo principal:** cadastro mestre com três coleções em abas, uma obrigatória.
2. **Risco 5 visível:** submeter sem abrir a aba da obrigatória — a aba acende com erro.
3. **Marca:** Hub, Water e Waste, claro e escuro.

## 1️⃣1️⃣ REQUISITOS DE TESTES UNITÁRIOS 🔒 BLOQUEANTE
Os quatro domínios do `TEMPLATE_FASE3.md`, mais:
- [ ] Coleção obrigatória vazia numa aba **nunca aberta** faz o `validate()` do mestre
  responder `false` (**mutação:** com painel montado sob demanda, o teste falha).
- [ ] A aba da coleção inválida recebe `alert` e o nome acessível com o erro.
- [ ] A contagem acompanha o `modelValue` de cada coleção.
