# Pré-prompt de Criação: DssExpansionItem (Nível 2)

**Objetivo:** Criar o componente `DssExpansionItem` no Design System Sansys (DSS) Fase 2.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssExpansionItem`
- **Nível Arquitetural:** Nível 2 (Composição de base)
- **Família:** Expansão e Colapso
- **Golden Reference:** `DssChip` (Componente interativo com touch target próprio)
- **Golden Context:** `DssItem` (Item de lista interativo)
- **Status:** Desbloqueado

**Justificativa da Fase 2:** O `DssExpansionItem` é um componente composto que orquestra um header interativo (trigger) e um painel de conteúdo colapsável, gerenciando estado de expansão e animação.

## 2. Riscos Arquiteturais e Gates

### 2.1. Gate de Composição v2.4
- **Risco:** O `QExpansionItem` nativo injeta classes próprias e gerencia a transição de altura do painel.
- **Estratégia:** O `DssExpansionItem` deve ser um wrapper direto do `<q-expansion-item>`. Não tente reconstruir a lógica de transição de altura (accordion) do zero.
- **Exceção (EXC-Gate):** Os seletores `.q-expansion-item`, `.q-item` (interno do header) e `.q-expansion-item__content` são internos do Quasar e necessários para override de tokens. Isso deve ser documentado no `dss.meta.json` como exceção ao Gate de Composição.

### 2.2. Gate de Responsabilidade v2.4
- O `DssExpansionItem` **deve** gerenciar seu próprio estado de expansão (via `v-model` ou estado interno).
- O `DssExpansionItem` **não deve** forçar o comportamento de accordion (fechar outros itens) por conta própria. Isso é responsabilidade de um componente pai (ex: `DssList` ou um futuro `DssAccordion`) ou do consumidor usando a prop `group`.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

**Conteúdo do Header:**
- `label` (String) - Texto principal do header.
- `caption` (String) - Texto secundário do header.
- `icon` (String) - Ícone à esquerda.
- `expandIcon` (String) - Ícone customizado de expansão (à direita).

**Comportamento:**
- `modelValue` / `v-model` (Boolean) - Estado de expansão.
- `defaultOpened` (Boolean) - Estado inicial aberto.
- `group` (String) - Nome do grupo para comportamento de accordion.
- `disable` (Boolean) - Desabilita a interação.

**Visual:**
- `dense` (Boolean) - Reduz o padding do header.
- `brand` (String) - Aplica cor de brand ao header quando expandido.

### 3.2. Props Bloqueadas (Governança DSS)
- `dark` → O DSS gerencia o dark mode via CSS global (`body.body--dark`).
- `headerClass`, `headerStyle` → O visual do header é estritamente governado pelo DSS.
- `switchToggleSide` → O ícone de expansão deve ficar sempre à direita por padrão DSS.

## 4. Governança de Tokens e CSS

- **Background (Header):** `transparent` (padrão) e `var(--dss-surface-hover)` no hover.
- **Background (Expanded):** Quando expandido, o header pode receber um leve destaque visual (ex: `var(--dss-surface-subtle)`).
- **Tipografia:** `var(--dss-text-body)` para o label, `var(--dss-text-secondary)` para o caption.
- **Bordas:** O componente em si não deve ter bordas externas hardcoded. Se precisar de separadores, use `border-bottom: 1px solid var(--dss-border-gray-200)`.
- **Transição:** A animação de expansão deve usar `var(--dss-duration-250)` e `var(--dss-easing-standard)`.
- **Padding (Header):** `var(--dss-spacing-3)` vertical e `var(--dss-spacing-4)` horizontal.

## 5. Acessibilidade e Estados

- **Touch Target:** O header inteiro atua como touch target e deve ter no mínimo 48px de altura (padrão para itens de lista).
- **ARIA:** O Quasar já gerencia `aria-expanded` e `aria-controls`. O DSS deve garantir que o foco seja visível no header.
- **Estados aplicáveis:** `default`, `hover`, `focus`, `active`, `disabled`, `expanded`.

**Tabela de Delegação de Estados:**
| Estado | Gerenciado por | Mecanismo |
|--------|----------------|-----------|
| `hover` | DSS (CSS) | Pseudo-classe `:hover` no header |
| `focus` | DSS (CSS) | Pseudo-classe `:focus-visible` no header |
| `expanded` | Quasar | Classe `.q-expansion-item--expanded` |
| `disabled` | Quasar | Prop `disable` repassada ao `QExpansionItem` |

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssExpansionItem.example.vue` deve cobrir:
1. **Padrão:** Item simples com label e conteúdo.
2. **Completo:** Item com ícone, label, caption e conteúdo.
3. **Accordion:** Três itens com a mesma prop `group` para demonstrar exclusividade de expansão.
4. **Disabled:** Item desabilitado.
5. **Brand:** Item com prop `brand` aplicada.

## 7. Exceções aos Gates v2.4

### EXC-Gate-01: Override de classes internas do Quasar
- **Regra Violada:** Uso de seletores internos (`.q-expansion-item`, `.q-item`).
- **Justificativa:** Necessário para aplicar tokens de tipografia, espaçamento e hover do DSS ao header gerado pelo Quasar, garantindo consistência com o `DssItem`.

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios
- **Label**: Input de texto para o título.
- **Caption**: Input de texto para o subtítulo.
- **Icon**: Input de texto para testar ícones (ex: `settings`, `mail`).
- **Disabled**: Toggle [true, false].
- **Dense**: Toggle [true, false].

### 8.2 Composite Logic
- O playground **deve** injetar conteúdo real no slot padrão (ex: um parágrafo de texto ou um `DssCard`) para que a animação de expansão seja visível. Um `DssExpansionItem` sem conteúdo no slot não demonstra seu propósito.
- A demonstração deve provar que o clique no header alterna o estado de expansão e rotaciona o ícone de seta.

### 8.3 Estados a Expor
| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Colapsado** | Apenas o header visível | Visual | Padrão |
| **Expandido** | Header e conteúdo visíveis, seta rotacionada | Visual | Clique no header |
| **Hover** | Fundo do header levemente escurecido | Visual | Mouse over no header |
| **Focus** | Ring de foco visível no header | Visual | Navegação por teclado |
| **Disabled** | Opacidade reduzida, sem interatividade | Visual | Prop `disable="true"` |
