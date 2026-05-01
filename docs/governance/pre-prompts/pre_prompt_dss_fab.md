# Pré-prompt de Criação de Componente DSS: DssFab

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssFab`
- **Família:** FAB (Composição de Primeiro Grau)
- **Nível de Composição:** Nível 2
- **Golden Reference:** `DssChip` (Golden Reference oficial para componentes interativos)
- **Golden Context:** `DssBtnDropdown` (baseline arquitetural — botão que expande um painel/lista de ações)
- **Componente Quasar Base:** `QFab`
- **Dependências Diretas:** `DssButton`, `DssIcon`

**Justificativa da Fase 2:** O `DssFab` (Floating Action Button) foi reclassificado da Fase 1 para a Fase 2 porque gerencia estado interno (expandido/colapsado) e orquestra múltiplos filhos (`DssFabAction`). Ele não é um simples wrapper de primitivo, mas um container interativo de ações.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Inconsistência Visual com DssButton

O `QFab` nativo reconstrói parte do CSS de botões. O risco é que o `DssFab` destoe visualmente do `DssButton` (tamanho, tipografia, hover states, elevação).

**Mitigação:** O `DssFab` deve consumir os mesmos tokens de elevação (`--dss-elevation-2` padrão, `--dss-elevation-3` no hover), border-radius (`--dss-radius-full`) e cores semânticas que o `DssButton`.

### 2.2. Gate de Responsabilidade v2.4

O `DssFab` é responsável por:
1. Gerenciar o estado de expansão (aberto/fechado).
2. Orquestrar a direção da animação das ações filhas (`up`, `down`, `left`, `right`).
3. Fornecer o botão trigger principal.

Ele **não é responsável** por:
1. Posicionamento fixo na tela (isso pertence ao `DssPageSticky`).
2. Executar as ações finais (isso pertence aos `DssFabAction` filhos).

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-fab>`. O slot `default` é reservado exclusivamente para componentes `DssFabAction` (que será criado no Nível 3).

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

*Nota: O DssFab não emite eventos próprios além dos nativos do Vue (ex: `@click`), pois o estado de expansão é gerenciado via `v-model` (evento `update:model-value`).*

**Visuais (Alinhadas ao DssButton):**
- `color` (String) - Cor semântica (primary, secondary, etc.). Padrão: `primary`.
- `text-color` (String) - Cor do ícone/texto.
- `label` (String) - Texto exibido ao lado do ícone (Extended FAB).
- `icon` (String) - Ícone exibido quando fechado. Padrão: `add`.
- `active-icon` (String) - Ícone exibido quando aberto. Padrão: `close`.
- `hide-icon` (Boolean) - Oculta o ícone (útil para FABs apenas com texto).
- `hide-label` (Boolean) - Oculta o label.
- `disable` (Boolean) - Desabilita o FAB.

**Comportamentais (Dropdown/Expansão):**
- `model-value` / `v-model` (Boolean) - Estado aberto/fechado.
- `direction` (String) - Direção de expansão (`up`, `down`, `left`, `right`). Padrão: `up`.
- `persistent` (Boolean) - Não fecha ao clicar fora.
- `vertical-actions-align` (String) - Alinhamento das ações (`left`, `center`, `right`). Padrão: `center`.

### 3.2. Props Bloqueadas (Governança DSS)

- `glossy`, `push`, `flat`, `outline`, `unelevated` → O FAB no DSS é **sempre** elevado (Material Design baseline). Variantes flat/outline não fazem sentido semântico para uma ação flutuante primária.
- `padding` → O padding deve ser governado por tokens internos, não exposto.

## 4. Governança de Tokens e CSS

- **Border Radius:** `border-radius: var(--dss-radius-full)` (sempre circular ou pill).
- **Elevação:** `box-shadow: var(--dss-elevation-2)` (padrão) e `var(--dss-elevation-3)` (hover/active).
- **Transição:** `transition: all var(--dss-duration-200) var(--dss-easing-standard)`.

## 5. Acessibilidade e Estados

- **Role:** O Quasar gerencia os atributos `aria-expanded` e `aria-haspopup`.
- **Touch Target:** O botão trigger deve ter no mínimo 48x48px (garantido pelo tamanho padrão do FAB).
- **Estados aplicáveis:** `default`, `hover`, `focus`, `active`, `disabled`, `expanded`.

**Tabela de Delegação de Estados:**
| Estado | Gerenciado por | Mecanismo |
|--------|----------------|-----------|
| `hover` | DSS (CSS) | Pseudo-classe `:hover` no trigger |
| `focus` | DSS (CSS) | Pseudo-classe `:focus-visible` no trigger |
| `active` | DSS (CSS) | Pseudo-classe `:active` no trigger |
| `disabled` | Quasar | Prop `disable` repassada ao `QFab` |
| `expanded` | Quasar | Prop `model-value` / `v-model` |

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssFab.example.vue` deve cobrir:

1. **Padrão (Ícone apenas):** FAB circular com ícone `add`, expandindo para cima.
2. **Extended FAB (Ícone + Label):** FAB em formato pill com texto "Nova Ação".
3. **Direções:** Demonstração de expansão para `right` e `down`.
4. **Cores Semânticas:** Demonstração com `secondary` e `warning`.

*Nota: Como o `DssFabAction` ainda não existe, use `<q-fab-action>` nativo temporariamente nos exemplos para demonstrar a expansão, adicionando um comentário explicativo.*

## 7. Exceções aos Gates v2.4

### EXC-01: Uso de primitivo Quasar no exemplo

- **Regra Violada:** Gate de Composição v2.4 — Regra 2 (uso de primitivos Quasar em exemplos).
- **Justificativa:** O `DssFab` requer filhos para demonstrar seu comportamento de expansão. Como o `DssFabAction` (Nível 3) ainda não foi construído, o uso temporário de `<q-fab-action>` é necessário para a documentação visual. Esta exceção será removida quando o `DssFabAction` for selado.

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios

- **Color**: Select com as cores semânticas [`primary`, `secondary`, `positive`, `negative`, `warning`, `info`].
- **Label**: Input de texto (vazio por padrão). Preenchê-lo transforma o FAB em Extended FAB.
- **Direction**: Select [`up`, `down`, `left`, `right`] — demonstra a flexibilidade de layout.
- **Disabled**: Toggle [true, false].

### 8.2 Composite Logic

- O `DssFab` **não deve** ser testado com posicionamento fixo (`absolute`/`fixed`) no playground padrão. Ele deve ser renderizado no fluxo normal do documento para provar que a expansão funciona independentemente do container.
- O playground **deve** injetar pelo menos 3 ações filhas (usando `q-fab-action` temporariamente) para demonstrar a coreografia de animação em cascata.
- A alteração da prop `direction` deve reposicionar as ações filhas dinamicamente.

### 8.3 Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Colapsado** | Apenas o botão trigger visível | Visual | Padrão |
| **Expandido** | Ações filhas visíveis com ícone alterado | Comportamental | Clique no trigger |
| **Extended** | Formato pill com texto | Visual | Prop `label` preenchida |
| **Disabled** | Opacidade reduzida, sem interatividade | Visual | Prop `disable="true"` |
