# 🎯 PRÉ-PROMPT ESPECÍFICO: DssItemSection (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssItemSection`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssItemSection` |
| **Equivalente Quasar** | `QItemSection` |
| **Fase** | Fase 2 (Componente Estrutural) |
| **Nível de Execução** | Nível 2 — Dependente de DssItem |
| **Classificação** | Container de Layout Interno — coluna flex dentro do DssItem |
| **Golden Reference** | `DssAvatar` (para seções de mídia) |
| **Golden Context** | `DssList` (container pai da família) |

**Justificativa da Fase 2:** O `DssItemSection` é um container estrutural que orquestra o layout interno de um `DssItem`, gerenciando alinhamento e espaçamento de avatares, ícones, textos e ações secundárias.

**Justificativa do Golden Reference (DssAvatar):** `DssAvatar` é o componente canônico de mídia em seções de lista. `DssItemSection` frequentemente hospeda `DssAvatar` na posição leading, tornando-o a referência natural para decisões de layout de seção de mídia. Diverge do canônico global `DssBadge` por razão de domínio específico (seção de lista vs. elemento informativo genérico).

---

## 2. O GRANDE RISCO ARQUITETURAL: DELEGAÇÃO DE ESTADOS E RESPONSABILIDADES

### 2.1 Gate de Responsabilidade v2.4

`DssItemSection` é 100% não-interativo. Toda interatividade pertence ao `DssItem` pai.

| Responsabilidade | DssItemSection | DssItem | DssItemLabel |
|------------------|----------------|---------|--------------|
| Layout de coluna (flex) | ✅ | ❌ | ❌ |
| Alinhamento de avatar/thumbnail | ✅ | ❌ | ❌ |
| Espaçamento entre seções | ✅ | ❌ | ❌ |
| Hover / Focus / Active | ❌ | ✅ | ❌ |
| Touch target | ❌ | ✅ (se clickable) | ❌ |
| Tipografia estruturada | ❌ | ❌ | ✅ (futuro) |

### 2.2 Anti-Pattern Crítico

`DssItemSection` **NUNCA** deve ser usado fora de um `DssItem`. O layout flex só funciona dentro do contexto do container pai.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

### Props Expostas (Permitidas)
- `avatar` (Boolean) → Seção de avatar — largura e espaçamento ajustados via EXC-01
- `thumbnail` (Boolean) → Seção de thumbnail — min-width para imagem em miniatura (valor herdado do Quasar — não gerenciado por tokens DSS)
- `side` (Boolean) → Seção lateral — alinhamento à direita via EXC-01
- `top` (Boolean) → Alinha conteúdo ao topo — itens multi-linha
- `noWrap` (Boolean) → Impede quebra de linha interna

### Props Bloqueadas
- `dark` → Gerenciado globalmente via `[data-theme="dark"]`

---

## 4. EXCEÇÕES PRÉ-APROVADAS

### EXC-01: Seletores Compostos para Override Quasar (Gate de Composição v2.4)
- **Seletores:** `.dss-item-section.q-item__section--side` e `.dss-item-section.q-item__section--avatar`
- **Local:** `2-composition/_base.scss`
- **Justificativa:** O `QItemSection` aplica `padding-right` e `min-width` hardcoded nas classes internas. Seletores compostos são a única forma de sobrescrever CSS de terceiros com tokens DSS, sem criar dependências externas. Gate de Composição v2.4 — Regra 2 exception formalizada.
- **Tokens utilizados:** `--dss-spacing-3`, `--dss-spacing-4`, `--dss-compact-control-height-md`

### EXC-02: System Color Keyword `ButtonText` em Forced-Colors
- **Local:** `4-output/_states.scss`
- **Justificativa:** Forced-colors mode. System keywords obrigatórios — tokens CSS são ignorados pelo navegador neste modo. Padrão canônico DSS.

---

## 5. GOVERNANÇA DE TOKENS

Tokens obrigatórios para este componente:
- `--dss-font-family-sans` — Família tipográfica base
- `--dss-font-size-md` — Tamanho de fonte base
- `--dss-text-body` — Cor de texto padrão
- `--dss-text-inverse` — Cor de texto dark mode
- `--dss-spacing-3` — Padding-right seção avatar (EXC-01)
- `--dss-spacing-4` — Padding-right seção side (EXC-01)
- `--dss-compact-control-height-md` — Min-width calculado seção avatar (EXC-01)

---

## 6. ACESSIBILIDADE (WCAG 2.1 AA)

- **Touch target:** Option B (não-interativo) — sem `::before`, seguindo padrão `DssAvatar`
- **Role ARIA:** Nenhum role explícito — elemento de apresentação neutro (`div` genérico do QItemSection)
- **Interatividade:** Delegada ao `DssItem` pai

---

## 7. ESTADOS DO COMPONENTE

`DssItemSection` não possui estados interativos. Estados aplicáveis:
- `default` — único estado
- dark mode via `[data-theme="dark"]`
- forced-colors, high-contrast, print

---

## 8. COMPOSIÇÃO

```
DssList (container)
  └── DssItem (item)
       ├── DssItemSection [avatar] — zona leading
       ├── DssItemSection [main]   — zona principal
       └── DssItemSection [side]   — zona trailing
```

**Filhos idiomáticos DSS:**
- Leading (`avatar=true`): DssAvatar, DssIcon, DssCheckbox, DssRadio
- Principal (padrão): DssItemLabel (futuro), texto, DssIcon
- Trailing (`side=true`): DssIcon, DssBadge, DssButton, DssToggle

---

## 9. CENÁRIOS DE USO (Exemplos Obrigatórios — Mínimo 3)

1. **Básico** — Seção principal com texto simples
2. **Com Avatar** — Seção leading com `DssAvatar` + seção principal
3. **Ação Secundária** — Seção principal + seção side com `DssIcon`
4. **Alinhamento ao Topo** — Item multi-linha com prop `top`
5. **noWrap** — Conteúdo longo sem quebra de linha

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** que `DssItemSection` é um container não-interativo de layout (coluna flex)
2. **Confirmar** o Golden Reference: `DssAvatar` (divergência do canônico `DssBadge` justificada por domínio)
3. **Confirmar** o Golden Context: `DssList`
4. **Confirmar** EXC-01 pré-aprovado para override de espaçamentos Quasar
5. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**
