# 🤖 PRÉ-PROMPT: {NomeDoComponente} (Fase 3)

> **Contexto:** Este é o Contrato de Interface para um componente composto complexo da Fase 3 do DSS. Ele orquestra múltiplos componentes DSS internos e gerencia estado compartilhado.

## 1️⃣ CLASSIFICAÇÃO E CONTEXTO
- **Nome:** `{NomeDoComponente}`
- **Fase:** Fase 3 — Componente Composto Complexo
- **Golden Context:** `DssDataCard` (referência para composição profunda)
- **Justificativa:** {Por que este componente existe e o que ele orquestra}

## 2️⃣ CONTRATO DE INTERFACE (NOVO FASE 3)
### 2.1. Casos de Uso Negativos
O que este componente **NÃO** deve fazer:
- ❌ {Ex: Não deve gerenciar paginação internamente, deve delegar via evento}
- ❌ {Ex: Não deve permitir scroll horizontal no container principal}

### 2.2. Matriz de Composição
Quais componentes DSS são permitidos internamente:
- ✅ `{ComponenteDSS_1}` (para {função})
- ✅ `{ComponenteDSS_2}` (para {função})
- ❌ Proibido usar tags HTML nativas (`<div>`, `<span>`) para layout interno; usar `DssRow`/`DssSpace` se necessário.

### 2.3. Estado de Falha e Loading
- **Loading:** {Como o componente se comporta durante carregamento? Skeleton? Spinner?}
- **Falha/Empty:** {Como exibe estado vazio ou erro de dados?}

## 3️⃣ O GRANDE RISCO ARQUITETURAL
- **Risco:** {Qual a maior armadilha técnica deste componente? Ex: Prop drilling de disabled, quebra de z-index em overlays}
- **Mitigação:** {Como resolver? Ex: Usar provide/inject tipado, inheritAttrs: false}

## 4️⃣ MAPEAMENTO DE API (DSS vs QUASAR)
| Prop/Slot/Event | Origem | Ação DSS | Justificativa / Tipo |
|---|---|---|---|
| `{prop}` | Quasar | Expor | {Justificativa} |
| `{prop}` | Quasar | Bloquear | {Justificativa} |
| `{nova_prop}` | DSS | Criar | {Justificativa} |

## 5️⃣ GOVERNANÇA DE TOKENS E COMPOSIÇÃO
- **Layout:** Proibido usar `:deep()`. O layout interno deve ser controlado por classes no wrapper do componente pai.
- **Atributos:** `inheritAttrs: false` é **obrigatório**. Repassar `$attrs` para o nó raiz correto via `v-bind="$attrs"`.
- **Comunicação Visual:** Propagar `brand` via `data-brand` no elemento raiz.
- **Comunicação de Estado:** Propagar `disabled`/`readonly` via `provide/inject` tipado no composable.

## 6️⃣ ACESSIBILIDADE E ESTADOS
- **ARIA Roles:** {Quais roles ARIA o container principal deve ter?}
- **Gerenciamento de Foco:** {Como o foco se comporta dentro da composição?}

## 7️⃣ SUPERFÍCIE DE PLAYGROUND
O playground (`.example.vue`) deve demonstrar a orquestração completa:
1. **Fluxo Principal:** {Cenário de uso mais comum}
2. **Propagação de Estado:** Demonstrar `disabled` e `loading` afetando toda a árvore interna.
3. **Slots Dinâmicos:** Demonstrar injeção de conteúdo customizado nos slots expostos.
4. **Brand Hub:** Demonstrar a propagação da prop `brand` para todos os filhos.
