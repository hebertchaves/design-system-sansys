# 🎯 PRÉ-PROMPT ESPECÍFICO: DssTabs (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssTabs`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssTabs` |
| **Equivalente Quasar** | `QTabs` |
| **Fase** | Fase 2 (Componente Estrutural/Container) |
| **Nível de Execução** | Nível 2 — Composto |
| **Classificação** | Container de navegação/seleção de abas |
| **Golden Reference | `DssChip` |
| **Golden Context** | `DssCard` ou `DssHeader` (containers pai comuns) |

**Justificativa da Fase 2:** O `DssTabs` é um componente composto (Nível 2) que orquestra múltiplos `DssTab` (Nível 1). Ele gerencia o estado global de seleção (`v-model`), o alinhamento das abas e a navegação por setas quando o conteúdo excede a largura do container.

---

## 2. O GRANDE RISCO ARQUITETURAL: COMPOSIÇÃO E ALINHAMENTO

### 2.1 O Problema do QTabs
O `QTabs` nativo do Quasar possui controles complexos de alinhamento (`align`), setas de navegação (`left-icon`, `right-icon`) e indicadores de rolagem. Se não for rigorosamente governado, ele pode quebrar o layout do container pai ou exibir setas nativas do Material Design que conflitam com a iconografia do DSS.

**Decisão Arquitetural:**
O `DssTabs` fará o wrap direto do `<q-tabs>`, mas deve:
1. Forçar o uso dos ícones oficiais do DSS para as setas de navegação (ex: `dss-icon-chevron-left`, `dss-icon-chevron-right`).
2. Garantir que o alinhamento padrão (`align="left"`) seja respeitado, a menos que explicitamente sobrescrito.

### 2.2 Gate de Composição v2.4
O `DssTabs` **deve** aceitar apenas `DssTab` ou `DssRouteTab` em seu slot default. O uso de `<q-tab>` direto dentro do `DssTabs` é uma violação arquitetural.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

A API deve espelhar a do `QTabs`, focando em estado e layout.

### Props Expostas (Permitidas)
- `modelValue` (String | Number) → Estado de seleção global (v-model).
- `align` (String) → Alinhamento das abas (`left`, `center`, `right`, `justify`). Padrão: `left`.
- `breakpoint` (Number | String) → Ponto de quebra para exibir setas de navegação.
- `vertical` (Boolean) → Exibe as abas em layout vertical.
- `dense` (Boolean) → Reduz o padding interno do container (não afeta as abas individuais).

### Props Bloqueadas (Proibidas)
- `active-color`, `active-bg-color`, `indicator-color` → O DSS governa as cores de estado via tokens no `DssTab`. O container não deve forçar cores.
- `ripple` → Desativado por padrão, assim como no `DssTab`.
- `no-caps` → Governado por CSS/tokens.

---

## 4. GOVERNANÇA DE TOKENS

A responsabilidade do `DssTabs` é gerenciar o layout do grupo, não o estilo individual das abas. A aplicação correta dos tokens é vital para manter a consistência visual em toda a aplicação.

### 4.1 Tokens de Layout e Espaçamento
- **Background:** Transparente por padrão, herdando do container pai. Não deve aplicar cores de fundo próprias a menos que especificado em um contexto muito particular.
- **Borda Inferior (Opcional):** Se o design exigir uma linha separadora abaixo de todas as abas para delimitar a área de navegação do conteúdo, deve usar `var(--dss-border-width-sm)` e `var(--dss-border-subtle)`.
- **Setas de Navegação:** Devem usar a cor de texto water (`var(--dss-text-subtle)`) e reagir ao hover com `var(--dss-surface-hover)`.
- **Espaçamento Interno (Padding):** O container em si não deve ter padding interno que afete o alinhamento das abas com o conteúdo externo, a menos que a prop `dense` seja utilizada, o que pode aplicar um espaçamento reduzido como var(--dss-spacing-4)`.

### 4.2 Tokens de Interação e Estado
- **Foco de Teclado:** Quando o container ou as setas de navegação recebem foco via teclado, deve-se aplicar `outline: 2px solid white` para garantir a visibilidade e acessibilidade.
- **Transições:** Qualquer mudança de estado visual (como hover nas setas) deve utilizar os tokens de transição padrão do DSS, como `var(--dss-transition-default)`.

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

A acessibilidade é um pilar fundamental do DSS. O `DssTabs`, sendo o container do grupo de abas, tem responsabilidades específicas para garantir que a navegação seja utilizável por todos.

### 5.1 Papéis e Atributos ARIA
- O elemento raiz do `DssTabs` deve receber `role="tablist"` para identificar claramente sua função para tecnologias assistivas.
- O atributo `aria-label` ou `aria-labelledby` deve ser suportado para permitir que os desenvolvedores forneçam um nome acessível para o grupo de abas, descrevendo seu propósito.

### 5.2 Navegação por Teclado
- O componente deve gerenciar a navegação por teclado entre as abas filhas (`DssTab`). O comportamento nativo do Quasar (setas esquerda/direita para mover o foco e selecionar a aba) deve ser mantido e testado.
- Se o layout for vertical (`vertical="true"`), a navegação deve ser feita com as setas cima/baixo.
- O foco visual (`outline: 2px solid white`) deve ser claramente visível quando o usuário navega usando o teclado.

### 5.3 Setas de Rolagem
- As setas de rolagem (quando visíveis devido a muitas abas) devem ser acessíveis via teclado se forem a única forma de acessar abas ocultas.
- Se a rolagem puder ser feita focando nas abas ocultas (comportamento padrão), as setas podem ser consideradas decorativas e ocultas do leitor de tela com `aria-hidden="true"`.

---

## 6. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenContext": "DssCard",
  "subcomponents": ["DssTab"],
  "compositionRequirements": ["DssTab", "DssIcon"],
  "compositionFuture": ["DssTabPanels"]
}
```

---

## 7. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 4)

Para garantir a robustez do componente, os seguintes cenários de uso devem ser implementados e testados no Storybook ou ambiente de documentação:

1. **Básico (Default):**
   - Um grupo de abas simples com 3 a 4 opções.
   - Demonstração do controle de estado via `v-model`.
   - Alinhamento padrão (`left`).

2. **Alinhamento e Distribuição:**
   - Demonstração do uso de `align="center"` para centralizar as abas.
   - Demonstração do uso de `align="justify"` para distribuir as abas igualmente por toda a largura do container.

3. **Rolagem (Scrollable) com Setas:**
   - Um grupo com muitas abas (ex: 10+) que excede a largura típica de um container.
   - Verificação da exibição correta das setas de navegação personalizadas do DSS.
   - Teste da rolagem ao clicar nas setas e ao focar em abas fora da área visível.

4. **Layout Vertical:**
   - Demonstração do uso de `vertical="true"`.
   - Verificação do alinhamento e espaçamento das abas quando empilhadas verticalmente.
   - Teste da navegação por teclado (setas cima/baixo).

5. **Integração com DssTabPanels (Cenário Completo):**
   - Demonstração do `DssTabs` controlando o conteúdo exibido em um `DssTabPanels` correspondente, validando a sincronização do `v-model`.

---

## 8. SUPERFÍCIE DE PLAYGROUND

### 8.1 Controles Obrigatórios
- `v-model`: Para controlar a aba ativa.
- `align`: Para definir o alinhamento das abas (e.g., `left`, `center`, `right`, `justify`).
- `vertical`: Para alternar entre layout horizontal e vertical.

### 8.2 Composite Logic (Lógica Concreta)
- **Gerenciamento de Estado Ativo:** O `DssTabs` deve gerenciar internamente qual `DssTab` está ativo com base no `v-model`, aplicando as classes ou estilos apropriados para destacar a aba selecionada.
- **Navegação por Teclado:** Implementar ou garantir o comportamento nativo de navegação por setas (esquerda/direita para horizontal, cima/baixo para vertical) entre as abas, focando na usabilidade para acessibilidade.
- **Renderização Condicional de Setas de Rolagem:** As setas de navegação (chevrons) devem aparecer apenas quando o conteúdo das abas exceder a largura disponível do container, e devem ser estilizadas com os ícones e tokens do DSS.
- **Propagação de Contexto:** O `DssTabs` deve ser capaz de injetar contexto (como o estado ativo ou propriedades de layout) para seus `DssTab` filhos, permitindo que eles reajam de forma inteligente sem duplicação de lógica.

### 8.3 Estados a Expor

| Estado | Descrição | Exemplo de Uso | Tokens Relevantes |
|---|---|---|---|
| **Ativo** | A aba atualmente selecionada. | `v-model="tab-name"` | `--dss-action-hub`, `--dss-action-hub-surface` |
| **Inativo** | Abas não selecionadas. | `DssTab` padrão | `--dss-text-subtle`, `--dss-surface-water` |
| **Hover** | Estado de foco do mouse sobre uma aba. | `:hover` | `--dss-surface-hover` |
| **Foco** | Estado de foco via teclado. | `:focus-visible` | `outline: 2px solid white` |
| **Desabilitado** | Aba não clicável. | `:disabled` | `--dss-text-disabled`, `--dss-surface-disabled` |

---

## 9. EXCEÇÕES PREVISTAS

### EXC-01: Sobrescrita de Setas de Navegação
- **Justificativa:** O Quasar utiliza classes internas (`.q-tabs__arrow`) para renderizar as setas de rolagem. O DSS precisa sobrescrever essas classes para aplicar tokens de cor e hover (`var(--dss-text-subtle)`, `var(--dss-surface-hover)`). Isso é uma exceção válida ao Gate de Composição v2.4 (Regra 2).

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento de que o componente é um container (Nível 2) e deve orquestrar o estado global das abas.
2. **Confirmar** a necessidade de bloquear props de cor nativas do Quasar, delegando o estilo visual ao `DssTab`.
3. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
