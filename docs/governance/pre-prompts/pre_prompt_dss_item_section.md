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
| **Golden Reference** | `DssBadge` (para componentes não-interativos) |
| **Golden Context** | `DssList` (container pai da família) |

**Justificativa da Fase 2:** O `DssItemSection` é um container estrutural que orquestra o layout interno de um `DssItem`, gerenciando alinhamento e espaçamento de avatares, ícones, textos e ações secundárias.

**Justificativa do Golden Reference (DssBadge): `DssBadge` é a referência canônica para componentes não-interativos no DSS. Embora `DssItemSection` possa hospedar outros elementos, a escolha de `DssBadge` como Golden Reference reforça seu papel como um container de layout não-interativo, alinhado com a governança geral de componentes do Design System Sansys..

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

O mapeamento de propriedades entre a API do Design System Sansys (DSS) e o framework subjacente (Quasar) é estrito. Apenas as propriedades explicitamente listadas abaixo são permitidas. Qualquer outra propriedade nativa do `QItemSection` será ignorada ou bloqueada para garantir a consistência visual e comportamental do sistema.

### Props Expostas (Permitidas)
- `avatar` (Boolean) → Define a seção como um container para avatares. A largura e o espaçamento são ajustados via EXC-01 para garantir alinhamento perfeito com o `DssAvatar`.
- `thumbnail` (Boolean) → Define a seção como um container para miniaturas (thumbnails). Aplica um `min-width` específico para imagens em miniatura (valor herdado do Quasar, não gerenciado por tokens DSS no momento).
- `side` (Boolean) → Define a seção como lateral (trailing). O alinhamento à direita e o espaçamento são ajustados via EXC-01.
- `top` (Boolean) → Alinha o conteúdo ao topo da seção. Essencial para itens multi-linha onde o conteúdo principal se expande verticalmente.
- `noWrap` (Boolean) → Impede a quebra de linha interna do conteúdo. Útil para textos curtos que devem permanecer em uma única linha, forçando o truncamento (ellipsis) se necessário.

### Props Bloqueadas
- `dark` → O gerenciamento de tema escuro é feito globalmente via atributo `[data-theme="dark"]` no elemento raiz ou em containers específicos. O uso da prop `dark` nativa do Quasar é estritamente proibido.
- `floating` → O conceito de seção flutuante não existe no DSS.
- `thumbnail` (String) → Apenas o tipo Boolean é suportado.



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

A governança de tokens para o `DssItemSection` é focada em tipografia e espaçamento, dado seu papel como container estrutural. O uso de cores é mínimo e restrito a heranças ou exceções específicas.

### Tokens Tipográficos
- `--dss-font-family-sans` — Família tipográfica base para qualquer texto renderizado diretamente na seção (embora o uso de `DssItemLabel` seja recomendado).
- `--dss-font-size-md` — Tamanho de fonte base padrão.

### Tokens de Cor
- `--dss-text-body` — Cor de texto padrão para conteúdo textual.
- `--dss-text-inverse` — Cor de texto para o modo escuro (dark mode).

### Tokens de Espaçamento e Layout (via EXC-01)
- `--dss-spacing-3` — Define o `padding-right` para a seção de avatar, garantindo o respiro correto entre o avatar e o conteúdo principal.
- `--dss-spacing-4` — Define o `padding-right` para a seção lateral (side), separando-a adequadamente do conteúdo principal.
- `--dss-compact-control-height-md` — Utilizado para calcular o `min-width` da seção de avatar, mantendo a proporção correta independentemente do conteúdo.



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

## 8. SUPERFÍCIE DE PLAYGROUND

### 8.1 Controles Obrigatórios

`DssItemSection` não possui controles interativos próprios. Sua função é puramente de layout e organização de conteúdo dentro de um `DssItem`. Quaisquer controles visuais ou interativos (como `DssCheckbox`, `DssRadio`, `DssIcon` clicável, `DssButton`) devem ser filhos diretos de um `DssItemSection` e ter sua interatividade gerenciada pelo `DssItem` pai ou pelo próprio componente filho, não pelo `DssItemSection`.

### 8.2 Lógica Composta (Concreta)

O `DssItemSection` atua como um flex container (`display: flex`, `flex-direction: column`) que gerencia o alinhamento vertical e o espaçamento entre seus filhos. Quando a prop `avatar` ou `side` é ativada, ele aplica estilos específicos para otimizar o layout de elementos como `DssAvatar` ou `DssIcon` na zona leading/trailing, respectivamente. Por exemplo, `avatar=true` ajusta o `padding-right` e `min-width` para acomodar o `DssAvatar` de forma consistente, conforme detalhado na EXC-01. A prop `top` ajusta o `align-items` para `flex-start` em cenários multi-linha, garantindo que o conteúdo comece no topo da seção.

### 8.3 Estados a Expor

| Estado | Descrição | Observações |
|---|---|---|
| `default` | Estado padrão do componente, sem interatividade ou modificadores visuais. | Único estado intrínseco ao `DssItemSection`. |
| `[data-theme="dark"]` | Aplica estilos de tema escuro, herdados do `DssItem` ou globalmente. | Não é um estado próprio, mas uma variação visual. |
| `forced-colors` | Modo de alto contraste do sistema operacional. | Estilos aplicados pelo navegador, tokens DSS ignorados. |
| `high-contrast` | Modo de alto contraste (ex: Windows High Contrast Mode). | Estilos aplicados pelo navegador, tokens DSS ignorados. |
| `print` | Otimização para impressão. | Estilos específicos para mídia impressa. |



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

Os cenários de uso abaixo demonstram as aplicações mais comuns e aprovadas do `DssItemSection` dentro do ecossistema DSS.

### 1. Básico — Seção principal com texto simples
O uso mais comum, onde o `DssItemSection` atua como o container principal para o texto do item da lista.
```html
<DssItem>
  <DssItemSection>
    Texto do item da lista
  </DssItemSection>
</DssItem>
```

### 2. Com Avatar — Seção leading com `DssAvatar` + seção principal
Utilizado para listas de contatos, usuários ou entidades que possuem representação visual.
```html
<DssItem>
  <DssItemSection avatar>
    <DssAvatar src="user.png" />
  </DssItemSection>
  <DssItemSection>
    Nome do Usuário
  </DssItemSection>
</DssItem>
```

### 3. Ação Secundária — Seção principal + seção side com `DssIcon`
Comum em menus de navegação ou listas de opções onde há uma ação secundária ou indicador de navegação.
```html
<DssItem clickable>
  <DssItemSection>
    Configurações
  </DssItemSection>
  <DssItemSection side>
    <DssIcon name="chevron_right" />
  </DssItemSection>
</DssItem>
```

### 4. Alinhamento ao Topo — Item multi-linha com prop `top`
Necessário quando o conteúdo principal possui múltiplas linhas e o ícone ou avatar lateral deve permanecer alinhado ao topo.
```html
<DssItem>
  <DssItemSection avatar top>
    <DssIcon name="info" />
  </DssItemSection>
  <DssItemSection>
    <DssItemLabel>Título Longo</DssItemLabel>
    <DssItemLabel caption>Descrição detalhada que ocupa várias linhas e requer que o ícone fique no topo.</DssItemLabel>
  </DssItemSection>
</DssItem>
```

### 5. noWrap — Conteúdo longo sem quebra de linha
Garante que o texto não quebre em múltiplas linhas, útil para layouts restritos.
```html
<DssItem>
  <DssItemSection noWrap>
    Este é um texto muito longo que não deve quebrar de linha sob nenhuma circunstância.
  </DssItemSection>
</DssItem>
```



---

## 10. INSTRUÇÃO DE EXECUÇÃO

Após ler e compreender este pré-prompt, o agente de execução deve:
1. **Confirmar** que `DssItemSection` é um container não-interativo de layout (coluna flex)
2. **Confirmar** o Golden Reference: `DssBadge` (componente não-interativo)
3. **Confirmar** o Golden Context: `DssList`
4. **Confirmar** EXC-01 pré-aprovado para override de espaçamentos Quasar
5. Iniciar a geração do componente seguindo estritamente o **"Prompt de Criação de Componente — DSS v2.4 (Fase 2)"**
