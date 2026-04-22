# Pré-prompt de Criação de Componente DSS: DssPageContainer

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssPageContainer`
- **Família:** Layout Global (Composição de Terceiro Grau)
- **Nível de Composição:** Nível 4
- **Golden Reference:** `DssBadge` (Golden Reference oficial para componentes não-interativos)
- **Golden Context:** `DssLayout` (baseline arquitetural — container estrutural raiz com provide/inject)
- **Contexto Estrutural:** `DssLayout` (container pai semântico obrigatório)
- **Componente Quasar Base:** `QPageContainer`
- **Dependências Diretas:** Nenhuma (mas orquestra `DssPage` via slot)

**Justificativa da Fase 2:** O `DssPageContainer` é o componente estrutural que envolve o conteúdo principal da página. Ele atua como um "receptor" das dimensões calculadas pelo `DssLayout` (offsets de header, footer e drawer) e aplica o padding necessário para que o conteúdo da página (`DssPage`) não fique oculto sob esses elementos fixos.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Quebra do Layout Engine do Quasar

O `QPageContainer` nativo depende de variáveis CSS (`--q-header-offset`, `--q-footer-offset`, etc.) injetadas pelo `QLayout` pai para calcular seu padding. O risco é que o `DssPageContainer` seja envolvido em uma `<div>` extra ou que suas classes CSS sobrescrevam as regras de padding dinâmico do Quasar, quebrando o layout da aplicação.

**Mitigação:** O `DssPageContainer` deve ser um wrapper direto do `<q-page-container>` (EXC-01), sem elementos HTML adicionais ao redor. Ele não deve aplicar estilos de `padding`, `margin` ou `position` que interfiram no motor de layout do Quasar.

### 2.2. Gate de Responsabilidade v2.4

O `DssPageContainer` é um **container estrutural 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua única responsabilidade é repassar o contexto de layout do `DssLayout` para a `DssPage`.

Ele **não é responsável** por:
1. Cor de fundo (herdada do `DssLayout` via `--dss-surface-muted`).
2. Scroll (gerenciado pela janela ou pela `DssPage`).
3. Padding interno do conteúdo (responsabilidade da `DssPage`).

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-page-container>`. O slot `default` é destinado **exclusivamente** a componentes `DssPage`. O uso de HTML nativo ou texto solto diretamente no `DssPageContainer` viola a governança de Nível 4.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

Nenhuma prop específica do DSS é adicionada. O componente atua como um pass-through estrutural puro.

### 3.2. Props Bloqueadas (Governança DSS)

O `QPageContainer` nativo não possui props próprias documentadas na API do Quasar (ele apenas reage ao contexto do `QLayout`). Portanto, não há props a bloquear. O componente deve apenas repassar `$attrs` e slots.

## 4. Governança de Tokens e CSS

O `DssPageContainer` é um componente estrutural "invisível". Ele não aplica tokens de cor, tipografia ou espaçamento próprios.

- **Cor de Fundo:** Transparente (herda `--dss-surface-muted` do `DssLayout`).
- **Padding:** Gerenciado dinamicamente pelo Quasar via variáveis CSS (`--q-header-offset`, etc.). O DSS não deve sobrescrever isso.

## 5. Acessibilidade e Estados

- **Role:** O `QPageContainer` não aplica um role específico. A semântica principal (`role="main"`) será aplicada no componente filho `DssPage`.
- **Touch Target:** Não aplicável (componente não-interativo).
- **Estados aplicáveis:** Nenhum estado interativo. Reage passivamente ao dark mode herdando o fundo do `DssLayout`.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssPageContainer.example.vue` deve cobrir:

1. **Básico:** `DssPageContainer` dentro de um `DssLayout` completo (com Header, Footer e Drawer), contendo uma `q-page` nativa temporária (EXC-02) para demonstrar o cálculo correto dos offsets.
2. **Sem Header/Footer:** `DssPageContainer` em um layout limpo para demonstrar que o padding dinâmico se ajusta a zero.

*Nota: Como o `DssPage` ainda não existe, os exemplos devem usar `<q-page>` nativo temporariamente.*

## 7. Exceções aos Gates v2.4

### EXC-01: QPageContainer como elemento raiz

- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (uso de primitivo Quasar como raiz).
- **Justificativa:** `DssPageContainer` usa `<q-page-container>` diretamente como raiz do template. O componente depende de `provide/inject` interno do `QLayout` pai para receber offsets via variáveis CSS. Envolver em `<div>` quebraria essa comunicação. Precedente canônico: `DssLayout`, `DssHeader`, `DssDrawer`.

### EXC-02: Uso de q-page nativo no arquivo de exemplo

- **Regra Violada:** Gate de Composição v2.4 — Regra 1 (somente no arquivo de exemplo).
- **Justificativa:** `DssPage` é `compositionFuture`. O `DssPageContainer` requer uma página filha para demonstrar o cálculo de offsets. O `<q-page>` nativo é usado **exclusivamente em `DssPageContainer.example.vue`** para fins de demonstração. Isenção formal conforme `DSS_IMPLEMENTATION_GUIDE.md`. Precedente: `DssLayout` (EXC-05).

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios

- **Header Visível**: [true, false] — controle externo que alterna a presença de um `DssHeader` no layout pai para demonstrar o recálculo do padding superior.
- **Footer Visível**: [true, false] — controle externo que alterna a presença de um `DssFooter` no layout pai para demonstrar o recálculo do padding inferior.
- **Drawer Visível**: [true, false] — controle externo que alterna a presença de um `DssDrawer` no layout pai para demonstrar o recálculo do padding lateral.

### 8.2 Composite Logic

- O `DssPageContainer` é estritamente um componente filho do `DssLayout` e pai do `DssPage`.
- Ele **não possui estado próprio**; seu comportamento (padding dinâmico) é inteiramente derivado da presença e dimensões dos componentes irmãos (`DssHeader`, `DssFooter`, `DssDrawer`) orquestrados pelo `DssLayout` pai.
- O playground deve renderizar um `DssLayout` completo ao redor do `DssPageContainer` para que ele funcione. Testá-lo isoladamente resultará em comportamento quebrado.

### 8.3 Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Repouso (Layout Completo)** | Container com padding aplicado nos 4 lados | Visual | Layout com Header, Footer e Drawers ativos |
| **Layout Limpo** | Container sem padding (ocupa 100% do espaço) | Visual | Layout sem Header, Footer ou Drawers |
| **Recálculo Dinâmico** | Transição suave do padding ao abrir/fechar um Drawer | Interativo | Toggle do Drawer lateral |
