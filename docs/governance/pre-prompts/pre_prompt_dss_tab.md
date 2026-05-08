# 🎯 PRÉ-PROMPT ESPECÍFICO: DssTab (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssTab`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssTab` |
| **Equivalente Quasar** | `QTab` |
| **Fase** | Fase 2 (Componente Estrutural/Interativo) |
| **Nível de Execução** | Nível 1 — Independente |
| **Classificação** | Aba individual de navegação/seleção |
| **Golden Reference** | `DssChip` (para interatividade e estados) |
| **Golden Context** | `DssTabs` (container pai futuro) |

**Justificativa da Fase 2:** O `DssTab` é um componente interativo que compõe ícones, labels e badges internamente. Ele gerencia estados de seleção (`active`) e foco, e serve como bloco de construção fundamental para o `DssTabs` (Nível 2).

---

## 2. O GRANDE RISCO ARQUITETURAL: ESTADOS E INDICADORES

### 2.1 O Problema do QTab
O `QTab` nativo do Quasar possui um indicador de seleção (a linha inferior) que é renderizado via pseudo-elementos ou divs internas (`.q-tab__indicator`). A cor, espessura e animação desse indicador podem conflitar com os tokens de borda e animação do DSS.

**Decisão Arquitetural:**
O `DssTab` fará o wrap direto do `<q-tab>`, mas deve sobrescrever rigorosamente o indicador nativo do Quasar utilizando os tokens do DSS (`var(--dss-border-width-*)` e `var(--dss-brand-*)`).

### 2.2 Gate de Responsabilidade v2.4
O `DssTab` é **altamente interativo**. Ele deve possuir estados claros de `:hover`, `:focus-visible` e `:active` (selecionado). A responsabilidade de gerenciar qual aba está ativa pertence ao `DssTabs` (pai), mas o `DssTab` deve reagir visualmente quando a prop `active` (ou classe equivalente do Quasar) for aplicada.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

A API do `DssTab` deve ser cuidadosamente projetada para espelhar a do `QTab` do Quasar, garantindo compatibilidade e facilidade de migração, mas com um foco rigoroso na governança do Design System Sansys (DSS). Isso significa que, embora as props básicas sejam as mesmas, a implementação interna e os valores padrão devem aderir estritamente aos tokens e diretrizes do DSS. O objetivo é fornecer uma interface familiar para desenvolvedores que já usam Quasar, ao mesmo tempo em que impõe a consistência visual e comportamental do DSS. A seguir, detalhamos as props permitidas e bloqueadas, juntamente com a justificativa para cada decisão.

### 3.1 Props Expostas (Permitidas)

Estas são as propriedades que o `DssTab` expõe e que são essenciais para sua funcionalidade e integração com o `DssTabs` (componente pai). Elas foram selecionadas para permitir a flexibilidade necessária sem comprometer a integridade do design.

- `name` (String | Number) → Identificador único da aba (obrigatório para o v-model do pai).
- `label` (String) → Texto principal da aba.
- `icon` (String) → Ícone a ser exibido acima ou ao lado do label.
- `alert` (Boolean | String) → Exibe um ponto de alerta (vermelho ou cor customizada).
- `disable` (Boolean) → Desabilita a interação com a aba.

### 3.2 Props Bloqueadas (Proibidas)

Para manter a consistência e evitar conflitos com as diretrizes do DSS, certas propriedades do `QTab` são explicitamente bloqueadas. A tentativa de usar essas props deve resultar em um aviso ou erro durante o desenvolvimento, ou ser ignorada silenciosamente, com a estilização do DSS prevalecendo.

- `ripple` → O DSS possui sua própria política de feedback visual (geralmente background mutado no hover/active), o ripple nativo do Material Design deve ser desativado por padrão (`:ripple="false"`).
- `no-caps` → O DSS governa a tipografia. Se as abas devem ser uppercase ou sentence case, isso será definido via CSS/tokens, não via prop.

---

## 4. GOVERNANÇA DE TOKENS

A governança de tokens para o `DssTab` é crucial para assegurar que o componente se integre perfeitamente ao ecossistema do Design System Sansys, mantendo a consistência visual e funcional. Todos os aspectos de cor, espaçamento, tipografia e interatividade devem ser derivados dos tokens de design definidos globalmente, evitando a introdução de valores hardcoded ou estilos que não estejam em conformidade. Esta seção detalha como os tokens devem ser aplicados para cada estado e elemento do `DssTab`.

### 4.1 Tokens de Cor e Estado

Os tokens de cor e estado são fundamentais para comunicar o status interativo do `DssTab` ao usuário. A aplicação correta desses tokens garante que o componente seja intuitivo e acessível, seguindo as diretrizes de WCAG 2.1 AA para contraste e feedback visual.

- **Padrão:** Cor de texto secundária (`var(--dss-text-subtle)`).
- **Hover/Focus:** Background sutil (`var(--dss-surface-hover)`) e cor de texto principal (`var(--dss-text-body)`).
- **Active (Selecionado):** Cor de texto da brand ativa (`var(--dss-brand-hub-500)` ou equivalente) e indicador inferior visível.
- **Disabled:** Opacidade reduzida (`var(--dss-opacity-disabled)`) e cursor `not-allowed`.

### 4.2 Indicador (Border)

O indicador visual de seleção, geralmente uma linha na parte inferior da aba, é um elemento chave para a navegação. Sua estilização deve ser rigorosamente controlada por tokens para manter a identidade visual do DSS e garantir que ele se destaque adequadamente quando a aba estiver ativa.

- O indicador de seleção deve usar a espessura definida pelo DSS (`var(--dss-border-width-md)` ou `lg`) e a cor da brand ativa.

### 4.3 Espaçamento e Layout

O espaçamento interno e externo do `DssTab` deve ser governado pelos tokens de espaçamento do DSS para garantir que as abas tenham uma área de clique adequada e estejam alinhadas com o grid do sistema.

- **Padding Interno:** O preenchimento interno da aba deve utilizar `var(--dss-spacing-4)` para garantir uma área de toque confortável.
- **Margem:** O espaçamento entre abas adjacentes (quando aplicável) deve ser gerenciado pelo componente pai (`DssTabs`), mas o `DssTab` deve estar preparado para se adaptar a diferentes contextos de layout.

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

O `DssTab` é um elemento interativo de navegação.
- Deve receber `role="tab"`.
- O estado de seleção deve ser refletido via `aria-selected="true|false"`.
- Deve suportar navegação por teclado (foco visível via `:focus-visible` com `outline: 2px solid white` ou padrão do DSS).

---

## 6. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenContext": "DssTabs",
  "subcomponents": [],
  "compositionRequirements": ["DssIcon", "DssBadge"],
  "compositionFuture": ["DssTabs", "DssRouteTab"]
}
```

---

## 7. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 4)

1. **Básico** — Aba apenas com texto (`label`).
2. **Com Ícone** — Aba com `icon` e `label`.
3. **Com Alerta/Badge** — Aba com a prop `alert` ativa ou contendo um `DssBadge` no slot.
4. **Estados** — Demonstração de abas ativas, inativas e desabilitadas (`disable`).

---

## 8. SUPERFÍCIE DE PLAYGROUND

### 8.1 Controles Obrigatórios
- `v-model` (para controle de seleção da aba ativa)
- `label` (para o texto da aba)
- `icon` (opcional, para ícone da aba)
- `disable` (para desabilitar a aba)
- `alert` (opcional, para indicar alerta na aba)

### 8.2 Composite Logic (Concreta, Não Genérica)
- O `DssTab` deve ser renderizado dentro de um container `DssTabs` (futuro componente pai) que gerenciará o estado ativo. A lógica interna do `DssTab` deve reagir à prop `active` (ou classe equivalente do Quasar) para aplicar os estilos visuais de seleção.
- O indicador de seleção inferior deve ser estilizado via CSS para sobrescrever o padrão do Quasar, utilizando `var(--dss-border-width-md)` para a espessura e `var(--dss-brand-hub-500)` para a cor quando ativo.
- O feedback visual de `:hover` e `:focus-visible` deve ser implementado com transições suaves de `background-color` e `color` utilizando tokens do DSS, como `var(--dss-surface-hover)` e `var(--dss-text-body)`.

### 8.3 Estados a Expor

| Estado | Descrição | Tokens/Estilos Aplicados |
|---|---|---|
| **Padrão (Inativo)** | Aba não selecionada, aguardando interação. | `color: var(--dss-text-subtle)` |
| **Hover** | Cursor sobre a aba. | `background-color: var(--dss-surface-hover)`; `color: var(--dss-text-body)` |
| **Focus-Visible** | Aba focada via teclado. | `outline: 2px solid var(--dss-action-water-500)`; `background-color: var(--dss-surface-hover)`; `color: var(--dss-text-body)` |
| **Active (Selecionado)** | Aba atualmente selecionada. | `color: var(--dss-brand-hub-500)`; `border-bottom: var(--dss-border-width-md) solid var(--dss-brand-hub-500)` |
| **Disabled** | Aba desabilitada, sem interação. | `opacity: var(--dss-opacity-disabled)`; `cursor: not-allowed` |

---

## 9. EXCEÇÕES PREVISTAS

### EXC-01: Sobrescrita do Indicador Quasar
- **Justificativa:** O Quasar utiliza a classe `.q-tab__indicator` para renderizar a linha de seleção. O DSS precisa sobrescrever essa classe interna para aplicar a espessura e cor governadas por tokens (`var(--dss-border-width-*)`). Isso é uma exceção válida ao Gate de Composição v2.4 (Regra 2).

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento de que o componente é interativo e deve gerenciar estados visuais claros (hover, focus, active).
2. **Confirmar** a necessidade de desativar o ripple nativo e sobrescrever o indicador do Quasar (EXC-01).
3. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.
