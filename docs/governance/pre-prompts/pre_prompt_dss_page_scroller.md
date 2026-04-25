# Pré-prompt de Criação de Componente DSS: DssPageScroller

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssPageScroller`
- **Família:** Layout Global (Composição de Terceiro Grau)
- **Nível de Composição:** Nível 4
- **Golden Reference:** `DssChip` (Golden Reference oficial para componentes interativos)
- **Golden Context:** `DssPageSticky` (baseline arquitetural — elemento flutuante com z-index)
- **Contexto Estrutural:** `DssPage` (container pai semântico obrigatório)
- **Componente Quasar Base:** `QPageScroller`
- **Dependências Diretas:** Nenhuma

**Justificativa da Fase 2:** O `DssPageScroller` é um componente utilitário que exibe um elemento flutuante (geralmente um botão "Voltar ao Topo") apenas quando o usuário rola a página além de um certo limite. O DSS adiciona governança sobre a duração da animação de scroll, o z-index e a elevação, garantindo consistência com o restante do sistema.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Inconsistência de Animação e Z-Index

O `QPageScroller` nativo possui valores hardcoded para a duração da animação de scroll e z-index. O risco é que o componente destoe das diretrizes de motion do DSS ou conflite com modais e dropdowns.

**Mitigação:** O `DssPageScroller` deve aplicar o token `--dss-duration-base` (250ms) como padrão para a animação de scroll e `--dss-z-index-sticky` (1020) para o z-index, alinhando-se ao `DssPageSticky`.

### 2.2. Gate de Responsabilidade v2.4

O `DssPageScroller` é um **container estrutural de comportamento de scroll**. Ele injeta a lógica de visibilidade baseada no scroll e a ação de clique para rolar a página.

Ele **não é responsável** por:
1. Aparência do botão (isso pertence ao conteúdo interno, ex: `DssButton`).
2. Lógica de layout da página (isso pertence ao `DssPage`).

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-page-scroller>`. O slot `default` é livre para receber qualquer conteúdo (geralmente um botão).

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

- `position` (String) - Posição na tela (ex: `bottom-right`). Repassada ao Quasar. Padrão: `bottom-right`.
- `offset` (Array) - Deslocamento `[x, y]` em pixels. Repassada ao Quasar. Padrão: `[18, 18]`.
- `scroll-offset` (Number) - Quantidade de pixels rolados antes do componente aparecer. Repassada ao Quasar. Padrão: `1000`.
- `duration` (Number) - Duração da animação de scroll em milissegundos. **Prop DSS:** O padrão deve ser mapeado para o valor do token `--dss-duration-base` (250).
- `reverse` (Boolean) - Se verdadeiro, o componente aparece quando rola para cima. Repassada ao Quasar. Padrão: `false`.

### 3.2. Props Bloqueadas (Governança DSS)

Nenhuma prop nativa precisa ser bloqueada.

## 4. Governança de Tokens e CSS

- **Z-Index:** O componente deve aplicar `z-index: var(--dss-z-index-sticky)` (1020) por padrão em sua classe base `.dss-page-scroller`.
- **Animação:** A prop `duration` deve ter como default o valor numérico correspondente a `--dss-duration-base` (250).

## 5. Acessibilidade e Estados

- **Role:** O conteúdo interno (botão) deve ter `aria-label` apropriado (ex: "Voltar ao topo"). O `DssPageScroller` em si gerencia apenas a visibilidade.
- **Touch Target:** Não aplicável ao wrapper (aplicável ao botão interno).
- **Estados aplicáveis:** Oculto (antes do threshold de scroll) e Visível (após o threshold).

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssPageScroller.example.vue` deve cobrir:

1. **Padrão (Voltar ao Topo):** `DssPageScroller` no canto inferior direito com um botão de seta para cima.
2. **Reverse (Aparece ao rolar para cima):** Demonstração da prop `reverse="true"`.
3. **Custom Offset:** Demonstração com `scroll-offset="200"` (aparece mais rápido).

*Nota: Todos os exemplos devem ser renderizados dentro de um `DssLayout`, `DssPageContainer` e `DssPage` completos, com conteúdo longo o suficiente para demonstrar o scroll.*

## 7. Exceções aos Gates v2.4

### EXC-01: QPageScroller como elemento raiz

- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (uso de primitivo Quasar como raiz).
- **Justificativa:** `DssPageScroller` usa `<q-page-scroller>` diretamente como raiz do template. O componente depende de lógica interna do Quasar para monitorar o scroll do container pai e injetar a transição de visibilidade. Envolver em `<div>` quebraria a detecção de scroll. Precedente canônico: `DssPageSticky`.

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios

- **Position**: Select com opções [`bottom-right`, `bottom-left`, `top-right`, `top-left`] — demonstra a flexibilidade de posicionamento.
- **Scroll Offset**: Slider [100, 500, 1000, 2000] — demonstra o limite de pixels para o componente aparecer.
- **Reverse**: [true, false] — demonstra o comportamento de aparecer ao rolar na direção oposta.
- **Duration**: Select [0, 250, 500, 1000] — demonstra a velocidade da animação de scroll.

### 8.2 Composite Logic

- O `DssPageScroller` **não pode ser testado isoladamente**. Ele exige a presença de um `DssLayout`, `DssPageContainer` e `DssPage` pai com conteúdo longo (scrollable).
- O playground **deve** renderizar uma página com altura suficiente (ex: 3000px) para que o usuário possa rolar e ver o componente aparecer e desaparecer.
- O clique no componente interno deve acionar o scroll suave de volta ao topo (ou à posição configurada).

### 8.3 Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Oculto** | Componente invisível antes do limite de scroll | Comportamental | Scroll < `scroll-offset` |
| **Visível** | Componente aparece após o limite de scroll | Comportamental | Scroll >= `scroll-offset` |
| **Animando** | Rolagem suave ao clicar | Comportamental | Clique no componente |
| **Reverse** | Aparece ao rolar para cima | Comportamental | `reverse="true"` + Scroll Up |
