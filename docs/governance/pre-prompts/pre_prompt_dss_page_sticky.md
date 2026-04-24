# Pré-prompt de Criação de Componente DSS: DssPageSticky

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssPageSticky`
- **Família:** Layout Global (Composição de Terceiro Grau)
- **Nível de Composição:** Nível 4
- **Golden Reference:** `DssBadge` (Golden Reference oficial para componentes não-interativos)
- **Golden Context:** `DssHeader` (baseline arquitetural — elemento fixo com z-index e elevação)
- **Contexto Estrutural:** `DssPage` (container pai semântico obrigatório)
- **Componente Quasar Base:** `QPageSticky`
- **Dependências Diretas:** Nenhuma

**Justificativa da Fase 2:** O `DssPageSticky` é um componente utilitário de layout que permite fixar elementos (como botões FAB, banners de cookie ou CTAs) em posições específicas da tela, mantendo-os visíveis enquanto o usuário rola a página. O DSS adiciona governança sobre o z-index e a elevação (sombra) para garantir que o elemento flutuante não conflite com modais, dropdowns ou headers.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Conflito de Z-Index (Stacking Context)

O `QPageSticky` nativo usa `position: fixed` ou `position: sticky` dependendo da configuração. O risco principal é que o elemento flutuante fique acima de modais (`DssDialog`), popovers (`DssMenu`) ou tooltips, quebrando a hierarquia visual da aplicação.

**Mitigação:** O `DssPageSticky` deve aplicar o token `--dss-z-index-sticky` (1020) como padrão. Este valor garante que ele fique acima do conteúdo da página (base = 1), mas abaixo de dropdowns (1000), modais (1050) e tooltips (1070).

### 2.2. Gate de Responsabilidade v2.4

O `DssPageSticky` é um **container estrutural de posicionamento**. Ele não possui estados de `:hover`, `:focus` ou `:active` próprios.

Ele **não é responsável** por:
1. Interatividade (cliques, hover) — isso pertence ao conteúdo interno (ex: `DssButton`).
2. Cor de fundo ou tipografia — ele é apenas um wrapper de posicionamento.

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-page-sticky>`. O slot `default` é livre para receber qualquer conteúdo.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

- `position` (String) - Posição na tela (ex: `top-right`, `bottom-right`, `bottom`, etc.). Repassada ao Quasar. Padrão: `bottom-right`.
- `offset` (Array) - Deslocamento `[x, y]` em pixels a partir da posição definida. Repassada ao Quasar. Padrão: `[18, 18]`.
- `expand` (Boolean) - Se verdadeiro, o elemento expande para ocupar toda a largura/altura da posição. Repassada ao Quasar. Padrão: `false`.
- `elevated` (Boolean) - **Prop DSS exclusiva.** Aplica uma sombra de elevação (`--dss-elevation-2`) ao container sticky. Padrão: `false`.

### 3.2. Props Bloqueadas (Governança DSS)

Nenhuma prop nativa precisa ser bloqueada, pois o `QPageSticky` é estritamente utilitário.

## 4. Governança de Tokens e CSS

- **Z-Index:** O componente deve aplicar `z-index: var(--dss-z-index-sticky)` (1020) por padrão em sua classe base `.dss-page-sticky`.
- **Elevação:** Quando `elevated="true"`, deve aplicar `box-shadow: var(--dss-elevation-2)` (equivalente a shadow-md, ideal para elementos flutuantes).

## 5. Acessibilidade e Estados

- **Role:** Não requer role específico, pois é apenas um utilitário de posicionamento. A semântica pertence ao conteúdo interno.
- **Touch Target:** Não aplicável (componente não-interativo).
- **Estados aplicáveis:** Nenhum estado interativo.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssPageSticky.example.vue` deve cobrir:

1. **FAB (Bottom Right):** `DssPageSticky` posicionado no canto inferior direito com um botão (simulando um FAB).
2. **Banner (Bottom Expand):** `DssPageSticky` com `position="bottom"` e `expand="true"`, simulando um banner de cookies ou CTA persistente.
3. **Elevated:** Exemplo demonstrando a prop `elevated="true"` com uma sombra visível.

*Nota: Todos os exemplos devem ser renderizados dentro de um `DssLayout`, `DssPageContainer` e `DssPage` completos, com conteúdo suficiente para demonstrar o scroll.*

## 7. Exceções aos Gates v2.4

### EXC-01: QPageSticky como elemento raiz

- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (uso de primitivo Quasar como raiz).
- **Justificativa:** `DssPageSticky` usa `<q-page-sticky>` diretamente como raiz do template. O componente depende de lógica interna do Quasar para calcular posições fixas relativas ao layout. Envolver em `<div>` quebraria o posicionamento. Precedente canônico: `DssLayout`, `DssPageContainer`, `DssPage`.

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios

- **Position**: Select com opções [`top-right`, `bottom-right`, `bottom-left`, `top-left`, `top`, `bottom`] — demonstra a flexibilidade de posicionamento.
- **Expand**: [true, false] — demonstra o comportamento de ocupar toda a largura/altura.
- **Elevated**: [true, false] — demonstra a aplicação da sombra governada pelo DSS.
- **Conteúdo Interno**: Select [`Botão FAB`, `Banner de Texto`] — injeta conteúdos diferentes no slot para demonstrar casos de uso reais.

### 8.2 Composite Logic

- O `DssPageSticky` **não pode ser testado isoladamente**. Ele exige a presença de um `DssLayout`, `DssPageContainer` e `DssPage` pai para que o posicionamento fixo funcione corretamente em relação às margens da página.
- O playground **deve** renderizar uma página com conteúdo longo (scrollable) para provar que o elemento permanece fixo enquanto o resto da página rola.

### 8.3 Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **FAB Padrão** | Elemento flutuante no canto inferior direito | Visual | `position="bottom-right"` |
| **Banner Expandido** | Elemento ocupando toda a largura inferior | Visual | `position="bottom"`, `expand="true"` |
| **Elevado** | Elemento com sombra destacando-o do fundo | Visual | `elevated="true"` |
| **Persistência de Scroll** | Elemento fixo durante a rolagem da página | Comportamental | Scroll na página de demonstração |
