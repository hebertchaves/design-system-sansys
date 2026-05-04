# Pré-prompt de Criação: DssFabAction (Nível 3)

**Objetivo:** Criar o componente `DssFabAction` no Design System Sansys (DSS) Fase 2, atuando como filho direto do `DssFab`.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssFabAction`
- **Nível Arquitetural:** Nível 3 (Composição com dependências)
- **Família:** FAB (Floating Action Button)
- **Golden Reference:** `DssChip` (Componente interativo com touch target próprio)
- **Golden Context:** `DssButton` (Botão interativo com ícone e label)
- **Dependências:** `DssIcon` (Nível 1)
- **Status:** Desbloqueado (aguardava `DssFab`)

**Justificativa da Fase 2:** O `DssFabAction` é um componente filho que só faz sentido dentro do contexto de um `DssFab` pai. Ele compõe ícone e texto, e interage com a coreografia de animação do pai, caracterizando comportamento de Fase 2.

## 2. Riscos Arquiteturais e Gates

### 2.1. Gate de Composição v2.4
- **Risco:** O `QFabAction` nativo injeta classes próprias e gerencia a transição de entrada/saída coordenada pelo `QFab` pai.
- **Estratégia:** O `DssFabAction` deve ser um wrapper direto do `<q-fab-action>`. Não tente reconstruir a lógica de transição ou a comunicação com o pai.
- **Exceção (EXC-Gate):** Os seletores `.q-fab__action` e `.q-fab__action-icon` são internos do Quasar e necessários para override de tokens. Isso deve ser documentado no `dss.meta.json` como exceção ao Gate de Composição (precedente: `DssFab`).

### 2.2. Gate de Responsabilidade v2.4
- O `DssFabAction` **deve** repassar o evento `@click` para que o consumidor execute a ação final.
- O `DssFabAction` **não deve** tentar fechar o `DssFab` pai manualmente. O Quasar já gerencia isso nativamente.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

**Visuais:**
- `color` (String) - Cor semântica (primary, secondary, etc.). Padrão: `primary`.
- `text-color` (String) - Cor do ícone/texto.
- `icon` (String) - Ícone da ação.
- `label` (String) - Texto descritivo da ação.
- `disable` (Boolean) - Desabilita a ação.

**Navegação:**
- `to` (String/Object) - Rota do Vue Router.
- `href` (String) - Link externo.

### 3.2. Props Bloqueadas (Governança DSS)
- `glossy`, `push`, `flat`, `outline`, `unelevated` → Assim como o pai, as ações do FAB são **sempre** elevadas.
- `padding` → O padding deve ser governado por tokens internos.

## 4. Governança de Tokens e CSS

- **Border Radius:** `border-radius: var(--dss-radius-full)` (sempre circular).
- **Elevação:** `box-shadow: var(--dss-elevation-1)` (padrão) e `var(--dss-elevation-2)` (hover/active). *Nota: A elevação das ações é menor que a do trigger pai.*
- **Transição:** `transition: all var(--dss-duration-200) var(--dss-easing-standard)`.
- **Dimensão Mínima (Touch Target):** `min-width` e `min-height` devem usar `var(--dss-spacing-10)` (40px) para as ações filhas (menores que o pai de 56px).
- **Focus Ring (Dark Mode):** O catálogo não possui `--dss-focus-ring-dark`. Usar `outline: 2px solid white` com exceção `EXC-States-02` documentada.

## 5. Acessibilidade e Estados

- **Touch Target:** O botão de ação deve ter no mínimo 40x40px (padrão Material Design para mini FAB).
- **Estados aplicáveis:** `default`, `hover`, `focus`, `active`, `disabled`.

**Tabela de Delegação de Estados:**
| Estado | Gerenciado por | Mecanismo |
|--------|----------------|-----------|
| `hover` | DSS (CSS) | Pseudo-classe `:hover` na ação |
| `focus` | DSS (CSS) | Pseudo-classe `:focus-visible` na ação |
| `active` | DSS (CSS) | Pseudo-classe `:active` na ação |
| `disabled` | Quasar | Prop `disable` repassada ao `QFabAction` |

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssFabAction.example.vue` deve cobrir:
1. **Padrão:** `DssFab` pai com 3 `DssFabAction` filhos (ícone + label).
2. **Apenas Ícone:** Ações sem label.
3. **Cores Semânticas:** Ações com cores diferentes (`primary`, `secondary`, `positive`).
4. **Disabled:** Pelo menos uma ação desabilitada.

## 7. Exceções aos Gates v2.4

### EXC-States-02: Focus Ring no Dark Mode
- **Regra Violada:** Uso de valor hardcoded (`white`) em vez de token.
- **Justificativa:** O catálogo DSS não possui um token shorthand para o focus ring no dark mode. O fallback explícito é necessário para garantir WCAG 2.4.7 (Focus Visible).

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios
- **Color**: Select com as cores semânticas [`primary`, `secondary`, `positive`, `negative`, `warning`, `info`].
- **Icon**: Input de texto para testar diferentes ícones.
- **Label**: Input de texto para testar o tooltip/label da ação.
- **Disabled**: Toggle [true, false].

### 8.2 Composite Logic
- O `DssFabAction` **não pode** ser testado isoladamente no playground. Ele **deve** ser renderizado dentro de um `DssFab` pai.
- O playground deve demonstrar que o clique em um `DssFabAction` emite o evento correto e (opcionalmente) fecha o FAB pai, dependendo da configuração.
- A demonstração deve provar que a elevação do `DssFabAction` (elevation-1) é visualmente distinta da elevação do `DssFab` pai (elevation-2).

### 8.3 Estados a Expor
| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Repouso** | Ação visível após expansão do pai | Visual | Padrão |
| **Hover** | Elevação aumentada (elevation-2) | Visual | Mouse over |
| **Focus** | Ring de foco visível | Visual | Navegação por teclado |
| **Disabled** | Opacidade reduzida, sem interatividade | Visual | Prop `disable="true"` |
