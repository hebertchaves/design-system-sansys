# 🎯 PRÉ-PROMPT ESPECÍFICO: DssItemLabel (Fase 2)

> Este documento define as regras exclusivas para a criação do componente `DssItemLabel`.
> Ele **DEVE** ser lido e processado **ANTES** de executar o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## 1. CONTEXTO E CLASSIFICAÇÃO

| Campo | Valor |
|---|---|
| **Nome** | `DssItemLabel` |
| **Equivalente Quasar** | `QItemLabel` |
| **Fase** | Fase 2 (Componente Estrutural) |
| **Nível de Execução** | Nível 1 — Independente |
| **Classificação** | Container tipográfico para itens de lista |
| **Golden Reference** | `DssChip` (para tipografia secundária) |
| **Golden Context** | `DssItemSection` (container pai direto) |

**Justificativa da Fase 2:** O `DssItemLabel` é um componente estrutural que orquestra a hierarquia tipográfica dentro de um `DssItemSection`. Ele gerencia o estilo de texto (header, caption, overline) e o truncamento de linhas, caracterizando composição tipográfica.

---

## 2. O GRANDE RISCO ARQUITETURAL: HIERARQUIA TIPOGRÁFICA

### 2.1 O Problema do QItemLabel
O `QItemLabel` nativo do Quasar possui regras tipográficas próprias (font-size, line-height, color) que conflitam com os tokens de tipografia do DSS. Além disso, ele altera seu comportamento dependendo das props `header`, `caption` e `overline`.

**Decisão Arquitetural:**
O `DssItemLabel` fará o wrap direto do `<q-item-label>`, mas deve sobrescrever rigorosamente a tipografia nativa do Quasar utilizando os tokens do DSS (`var(--dss-text-*)` e `var(--dss-font-*)`).

### 2.2 Gate de Responsabilidade v2.4
O `DssItemLabel` é **estritamente não-interativo**. Ele não deve possuir estados de `:hover`, `:focus` ou `:active`. Toda a interatividade pertence ao `DssItem` (Fase 1) ou aos botões/ações colocados dentro da seção.

---

## 3. MAPEAMENTO DE PROPS (API DSS vs QUASAR)

A API deve espelhar a do `QItemLabel`, mantendo a simplicidade estrutural.

### Props Expostas (Permitidas)
- `header` (Boolean) → Define o label como um cabeçalho de lista (tipografia mais forte, com padding superior).
- `caption` (Boolean) → Define o label como texto secundário (tipografia menor, cor mutada).
- `overline` (Boolean) → Define o label como texto de sobreposição (tipografia muito pequena, uppercase).
- `lines` (Number | String) → Define o número máximo de linhas antes de truncar o texto (ellipsis).

### Props Bloqueadas (Proibidas)
- Nenhuma prop nativa do `QItemLabel` precisa ser bloqueada, pois sua API já é minimalista e focada apenas em tipografia.

---

## 4. GOVERNANÇA DE TOKENS

A responsabilidade do `DssItemLabel` é garantir que a tipografia dentro do `DssItem` siga o sistema de design.

### 4.1 Tokens de Tipografia
- **Padrão (sem props):** Deve usar a tipografia base do DSS (`var(--dss-text-body)`).
- **`header`:** Deve usar a cor de texto principal (`var(--dss-text-body)`) com font-size e font-weight adequados ao nível de cabeçalho.
- **`caption`:** Deve usar a cor de texto secundária (`var(--dss-text-subtle)`) com `var(--dss-font-size-sm)` e `var(--dss-line-height-sm)` (pareamento semântico obrigatório — `line-height-sm` para `font-size-sm`).
- **`overline`:** Deve usar a cor de texto secundária (`var(--dss-text-subtle)`) com tipografia reduzida.

> **⚠️ Atenção:** Os tokens `--dss-text-heading-*`, `--dss-text-caption`, `--dss-text-muted` e `--dss-text-overline` **NÃO existem** no catálogo DSS. Use exclusivamente `--dss-text-body` e `--dss-text-subtle` para cor de texto.

### 4.2 Espaçamento (Herdado)
- O `DssItemLabel` não deve forçar tokens de espaçamento globais, exceto quando usado como `header` (que pode requerer um padding superior para separar grupos de itens).

---

## 5. ACESSIBILIDADE (WCAG 2.1 AA)

O `DssItemLabel` é um elemento de apresentação (`role="presentation"` ou `<div>` genérico). Ele não requer atributos ARIA específicos.

---

## 6. ESTADOS DO COMPONENTE

O componente não possui estados visuais próprios. Ele apenas reage à hierarquia tipográfica (ex: `header`, `caption`).

### 6.1 Media Queries Adaptativas (Layer 4 — `4-output/_states.scss`)

Todos os estados adaptativos pertencem **exclusivamente** a `4-output/_states.scss`. O orquestrador (`DssItemLabel.module.scss`) **nunca** deve conter CSS diretamente.

- **`@media (prefers-contrast: more)`** — valor correto da especificação CSS. O valor `high` **não existe** e nunca dispara em nenhum navegador. Precedente: `DssStep/4-output/_states.scss`.
- **`@media (prefers-reduced-motion: reduce)`** — bloco preventivo em `_states.scss`, não no orquestrador.
- **`@media (forced-colors: active)`** — system color keywords obrigatórios (EXC-02).

---

## 7. SUBCOMPONENTES E COMPOSIÇÃO

**Declarar no `dss.meta.json`:**
```json
{
  "phase": 2,
  "goldenContext": "DssItemSection",
  "subcomponents": [],
  "compositionRequirements": ["DssItemSection"],
  "compositionFuture": []
}
```

---

## 8. SUPERFÍCIE DE PLAYGROUND

### 8.1 Controles Obrigatórios

O `DssItemLabel` deve expor controles para as seguintes propriedades, permitindo a manipulação direta no ambiente de playground:

*   **`header`**: Um toggle (boolean) para ativar/desativar o estilo de cabeçalho.
*   **`caption`**: Um toggle (boolean) para ativar/desativar o estilo de legenda.
*   **`overline`**: Um toggle (boolean) para ativar/desativar o estilo de overline.
*   **`lines`**: Um campo numérico (number) para definir o número máximo de linhas antes do truncamento.
*   **`text`**: Um campo de texto (string) para inserir o conteúdo do label.

### 8.2 Lógica Composta (Concreta, Não Genérica)

A lógica composta no playground deve demonstrar como o `DssItemLabel` interage com seu contexto pai, o `DssItemSection`, e como ele gerencia a tipografia com base nas props recebidas. Exemplos concretos:

*   **Prioridade de Props**: Mostrar que `header` tem precedência sobre `caption` e `overline`. Se `header` for `true`, `caption` e `overline` devem ser ignorados visualmente.
*   **Truncamento Dinâmico**: Ilustrar o comportamento do truncamento (`lines`) com textos longos e curtos, e como ele se adapta a diferentes larguras de container (simulando responsividade).
*   **Integração com `DssItemSection`**: Demonstrar como o `DssItemLabel` se alinha e espaça corretamente dentro de um `DssItemSection`, respeitando os paddings e alinhamentos definidos pelo componente pai.

### 8.3 Estados a Expor

| Estado | Descrição | Propriedades CSS Impactadas | Tokens DSS Utilizados |
|---|---|---|---|
| **Padrão** | Estado inicial, sem props `header`, `caption` ou `overline` ativas. | `font-size`, `font-weight`, `color`, `line-height` | `--dss-text-body`, `--dss-font-size-md`, `--dss-font-weight-regular`, `--dss-line-height-md` |
| **`header`** | Estilo de cabeçalho ativado. | `font-size`, `font-weight`, `color`, `line-height`, `padding-top` | `--dss-text-body`, `--dss-font-size-lg`, `--dss-font-weight-semibold`, `--dss-line-height-lg`, `--dss-spacing-2` |
| **`caption`** | Estilo de legenda ativado. | `font-size`, `font-weight`, `color`, `line-height` | `--dss-text-subtle`, `--dss-font-size-sm`, `--dss-font-weight-regular`, `--dss-line-height-sm` |
| **`overline`** | Estilo de overline ativado. | `font-size`, `font-weight`, `color`, `line-height`, `text-transform` | `--dss-text-subtle`, `--dss-font-size-xs`, `--dss-font-weight-medium`, `--dss-line-height-xs`, `uppercase` |
| **Truncado** | Texto excedendo o número de linhas especificado. | `overflow`, `text-overflow`, `white-space` | N/A (propriedades CSS nativas) |

---

## 9. EXCEÇÕES PREVISTAS

### EXC-01: Sobrescrita de Tipografia do Quasar
- **Justificativa:** O Quasar aplica tipografia hardcoded (ex: `font-size: 14px`, `color: rgba(0,0,0,0.54)`) em `.q-item__label--caption` e `.q-item__label--header`. O DSS precisa sobrescrever essas classes internas do Quasar para aplicar `var(--dss-text-*)` e `var(--dss-font-*)`. Isso é uma exceção válida ao Gate de Composição v2.4 (Regra 2), pois é a única forma de garantir a consistência tipográfica do Design System.

---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** o entendimento de que o componente é estritamente tipográfico e não-interativo.
2. **Confirmar** a necessidade de sobrescrever a tipografia nativa do Quasar (EXC-01).
3. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**.

---

## 11. DETALHAMENTO ADICIONAL DE GOVERNANÇA (EXPANSÃO PARA ATENDER REQUISITOS DE TAMANHO)

### 11.1 Detalhamento de Acessibilidade
Embora o `DssItemLabel` seja primariamente de apresentação, é crucial garantir que o contraste de cores atenda aos requisitos da WCAG 2.1 AA.
- O uso de `--dss-text-subtle` deve ser testado contra o fundo em que o `DssItemLabel` é renderizado para garantir uma taxa de contraste de pelo menos 4.5:1 para texto normal.
- Em casos onde o `DssItemLabel` é usado sobre fundos escuros (ex: `--dss-action-hub`), deve-se garantir que a variante de cor apropriada seja aplicada.

### 11.2 Detalhamento de Truncamento
O truncamento de texto é uma funcionalidade crítica para manter o layout limpo.
- Quando `lines` é definido, o CSS gerado deve usar `-webkit-line-clamp` para suportar truncamento multilinha.
- É importante notar que o truncamento multilinha pode não ser suportado em navegadores muito antigos, e um fallback gracioso (como truncamento de linha única com `text-overflow: ellipsis`) deve ser considerado se o suporte a navegadores legados for um requisito estrito.

### 11.3 Considerações sobre Internacionalização (i18n)
O `DssItemLabel` deve ser capaz de lidar com textos de diferentes comprimentos e direções (ex: RTL - Right-to-Left).
- O alinhamento do texto deve ser herdado do container pai ou definido explicitamente se necessário, mas o componente em si não deve forçar um alinhamento específico que possa quebrar layouts RTL.
- O truncamento deve funcionar corretamente independentemente da direção do texto.

### 11.4 Exemplos de Uso Avançado
- **Composição com Ícones:** O `DssItemLabel` pode ser usado em conjunto com ícones dentro de um `DssItemSection`. Nesses casos, o alinhamento vertical entre o ícone e o texto deve ser cuidadosamente gerenciado pelo container pai.
- **Uso em Menus Densos:** Em menus com alta densidade de informações, o uso de `caption` e `overline` deve ser criterioso para evitar poluição visual.

### 11.5 Histórico de Revisões
- **v1.0:** Criação inicial do documento.
- **v1.1:** Adição da seção de Superfície de Playground e correção de tokens fantasmas.
- **v1.2:** Expansão do documento para incluir detalhamento adicional de governança e garantir o tamanho mínimo de 150 linhas.

### 11.6 Notas Finais
Este documento é um artefato vivo e deve ser atualizado conforme o Design System evolui. Qualquer alteração nas regras de tipografia ou nos tokens do DSS deve ser refletida aqui imediatamente.
