# Pré-prompt de Criação de Componente DSS: DssToolbar

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.
>
> **Nota de Auditoria (2026-04-16):** Pré-prompt corrigido retroativamente após auditoria DSS v2.5. Gaps corrigidos: GAP-01 (Golden Context inválido), GAP-02 (tokens inexistentes), GAP-03 (Touch Target ausente), GAP-04 (estrutura props.blocked migrada para propsBlocked).

## 1. Classificação e Contexto

- **Nome do Componente:** `DssToolbar`
- **Família:** Estrutura de Página (Base)
- **Nível de Composição:** Nível 1 (Independente)
- **Golden Reference:** `DssCard` (como container estrutural não-interativo)
- **Golden Context:** `DssTabs` — container horizontal de navegação/ação com brandabilidade via `[data-brand]`, Selo DSS v2.2 (Abr 2026). `DssHeader` e `DssFooter` (contextos pais naturais) ainda não existem — registrados em `compositionFuture`. *(GAP-01 corrigido)*
- **Componente Quasar Base:** `QToolbar`
- **Dependências Diretas:** `DssButton`, `DssIcon` (para composição interna pelo consumidor)

**Justificativa da Fase 2:** O `DssToolbar` é a barra de ações horizontal fundamental do sistema. Ele serve como bloco de construção base para cabeçalhos (`DssHeader`), rodapés (`DssFooter`) e barras de ferramentas internas em cards ou modais.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Altura e Alinhamento

O `QToolbar` nativo possui uma altura mínima padrão (`min-height: 50px`) e gerencia o alinhamento dos itens via flexbox. O risco é que a altura não corresponda à escala de sizing do DSS e que o espaçamento interno (padding) não utilize os tokens de spacing corretos.

**Mitigação:** O `DssToolbar` deve sobrescrever a altura mínima e o padding nativos utilizando tokens DSS (`--dss-spacing-14` para altura padrão, `--dss-spacing-4` para padding horizontal).

### 2.2. Gate de Responsabilidade v2.4

O `DssToolbar` é um **container estrutural 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua única responsabilidade é fornecer o layout horizontal (flexbox) e o espaçamento correto para os elementos filhos (botões, títulos, ícones). A interatividade é responsabilidade exclusiva dos componentes inseridos nele.

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-toolbar>`. O slot `default` é destinado ao conteúdo da barra e pode receber qualquer componente DSS, sendo os mais comuns `DssButton` (variante `flat` ou `ghost`), `DssToolbarTitle` (futuro) e `DssIcon`.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

- `inset` (Boolean) — Adiciona espaçamento extra à esquerda (útil quando alinhado com menu lateral).
- `brand` (String) — Aplica cor de fundo baseada na brand selecionada (`hub`, `water`, `waste`).

### 3.2. Props Bloqueadas (Governança DSS) *(GAP-04 corrigido — estrutura top-level)*

```json
"propsBlocked": ["dark", "glossy", "color", "text-color"],
"propsBlockedJustification": {
  "dark": "Modo escuro governado globalmente pelo DSS via [data-theme='dark'], não por prop individual.",
  "glossy": "Efeito visual não utilizado no DSS — ausência de glossy é padrão.",
  "color": "Cor de fundo governada por tokens DSS + prop brand.",
  "text-color": "Cor de texto governada por tokens DSS (--dss-text-body / --dss-text-inverse conforme brand)."
}
```

### 3.3. Pass-through via `$attrs`

- `dense` — Não declarado como prop DSS; encaminhado via `$attrs` ao `QToolbar`, que aplica `.q-toolbar--dense` nativamente.

## 4. Governança de Tokens e CSS *(GAP-02 corrigido)*

O `DssToolbar` deve utilizar os seguintes tokens:

| Propriedade | Token Correto | Valor |
|---|---|---|
| Altura padrão (min-height) | `--dss-spacing-14` | 56px |
| Altura dense (min-height) | `--dss-spacing-10` | 40px |
| Padding horizontal padrão | `--dss-spacing-4` | 16px |
| Padding horizontal inset | `--dss-spacing-6` | 24px |
| Padding horizontal dense | `--dss-spacing-3` | 12px |
| Cor de texto padrão | `--dss-text-body` | — |
| Cor de texto com brand | `--dss-text-inverse` | — |
| Brand Hub | `--dss-hub-600` | — |
| Brand Water | `--dss-water-600` | — |
| Brand Waste | `--dss-waste-600` | — |

**Cor de fundo padrão:** `transparent` (o QToolbar não aplica background por padrão — não há token DSS para isso).

> Tokens inexistentes que NÃO devem ser usados: `--dss-size-14`, `--dss-size-16`, `--dss-surface-base`, `--dss-brand-*-500`.

## 5. Acessibilidade e Estados *(GAP-03 corrigido)*

- **Role:** O `QToolbar` nativamente recebe `role="toolbar"`. O `DssToolbar` deve preservar essa semântica.
- **Aria-label:** Recomendado via `$attrs`: `<DssToolbar aria-label="Ações do documento">`. O componente deve repassar `$attrs` corretamente.
- **Touch Target: Opção B** — `DssToolbar` é container não-interativo. Touch target é responsabilidade exclusiva dos componentes filhos (`DssButton`, etc.). A implementação via `::before` **não se aplica** ao container.
- **Estados aplicáveis:** `default`, `branded`. Nenhum estado de interação (`hover`, `focus`, `active`, `disabled`) aplica-se ao container.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssToolbar.example.vue` deve cobrir:

1. **Básico:** Toolbar simples com texto e um botão de ação.
2. **Com Brand Hub:** Toolbar com `brand="hub"` (fundo laranja, texto invertido).
3. **Com Brand Water:** Toolbar com `brand="water"` (fundo azul, texto invertido).
4. **Com Brand Waste:** Toolbar com `brand="waste"` (fundo verde, texto invertido).
5. **Com Inset:** Toolbar com a prop `inset` ativa (maior espaçamento à esquerda).
6. **Dense:** Toolbar compacta via `dense` pass-through.

## 7. Exceções aos Gates v2.4

### EXC-01: Sobrescrita de Padding e Min-Height Nativos

- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (L3 com `.q-toolbar--dense`).
- **Justificativa:** L2: O `QToolbar` aplica `min-height: 50px` e `padding: 0 12px` no `.q-toolbar`. Como `.dss-toolbar` é aplicado no mesmo elemento, o override é feito por cascata (mesma especificidade, ordem posterior) — sem seletor composto necessário. L3: O dense usa `.dss-toolbar.q-toolbar--dense` (seletor composto com classe Quasar) porque `dense` é gerenciado nativamente pelo `QToolbar` via `$attrs`, não via prop DSS explícita.
