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

Nenhuma prop específica do DSS é adicionada diretamente ao `DssPageContainer`. Sua função é estritamente estrutural, atuando como um **pass-through puro** para o `<q-page-container>` subjacente. Isso significa que ele não introduz novas propriedades que modifiquem seu comportamento visual ou lógico intrínseco. Quaisquer propriedades passadas para o `DssPageContainer` serão automaticamente repassadas para o `QPageContainer` nativo, garantindo compatibilidade e aderência ao comportamento esperado do Quasar.

**Exemplos de Props do Quasar que seriam repassadas (mas não são governadas pelo DSS):**
- `padding`: Embora o DSS gerencie o padding dinamicamente, se uma prop `padding` fosse explicitamente passada, ela seria repassada, mas com a ressalva de que o comportamento pode ser sobrescrito pelo motor de layout do Quasar.
- `class`: Classes CSS adicionais seriam aplicadas ao elemento raiz do `QPageContainer`.
- `style`: Estilos inline seriam aplicados ao elemento raiz do `QPageContainer`.

**Governança:** A ausência de props DSS explícitas reforça o papel do `DssPageContainer` como um elemento de composição de baixo nível, focado em orquestração de layout e não em personalização de conteúdo ou interação. A responsabilidade por props de conteúdo e interação recai sobre os componentes filhos, como `DssPage`.

### 3.2. Props Bloqueadas (Governança DSS)

O `QPageContainer` nativo, por sua natureza de container estrutural, não possui um conjunto extenso de props próprias documentadas na API do Quasar que controlem seu comportamento visual ou funcional de forma independente. Ele opera hubamente reagindo ao contexto de layout fornecido pelo `QLayout` pai, utilizando variáveis CSS para calcular seus offsets.

**Justificativa para não bloquear props:** Dada a ausência de props intrínsecas ao `QPageContainer` que pudessem introduzir comportamentos indesejados ou quebrar a governança do DSS, não há props específicas a serem explicitamente bloqueadas neste componente. A estratégia é permitir o repasse de `$attrs` e slots, garantindo que o `DssPageContainer` se comporte como um proxy transparente para o componente nativo do Quasar.

**Implicações:**
- **Flexibilidade:** Permite que desenvolvedores que necessitem de customizações muito específicas no `QPageContainer` nativo as apliquem diretamente, cientes de que estão operando fora da governança explícita do DSS para este componente.
- **Simplicidade:** Mantém o `DssPageContainer` leve e focado em sua responsabilidade principal de orquestração de layout, sem a complexidade de gerenciar um conjunto de props bloqueadas que não seriam intrínsecas a ele.
- **Alinhamento com Quasar:** Reforça a ideia de que o `DssPageContainer` é uma camada fina sobre o `QPageContainer`, mantendo o comportamento original do framework.

## 4. Governança de Tokens e CSS

O `DssPageContainer` é classificado como um componente estrutural "invisível" dentro da arquitetura do DSS. Sua principal função é a orquestração de layout, e não a apresentação visual direta. Portanto, ele adere a uma governança estrita que proíbe a aplicação de tokens de design próprios que alterem sua aparência.

### 4.1. Tokens de Cor e Superfície

- **Cor de Fundo:** O `DssPageContainer` deve manter um fundo transparente. Ele não deve aplicar tokens como `--dss-surface-base` ou `--dss-surface-sunken`. A cor de fundo visível para o usuário será herdada do `DssLayout` pai (tipicamente `--dss-surface-muted` ou similar, dependendo do tema ativo).
- **Bordas e Sombras:** É estritamente proibido aplicar bordas, sombras (box-shadow) ou qualquer outro efeito visual ao `DssPageContainer`. Ele deve permanecer visualmente indetectável.

### 4.2. Tokens de Espaçamento e Layout

- **Padding Dinâmico:** O padding do `DssPageContainer` é gerenciado exclusivamente e dinamicamente pelo motor de layout do Quasar. O Quasar injeta variáveis CSS específicas (como `--q-header-offset`, `--q-footer-offset`, `--q-drawer-left-offset`, `--q-drawer-right-offset`) no elemento raiz do layout, e o `QPageContainer` as utiliza para calcular seu padding interno.
- **Proibição de Sobrescrita:** O DSS **não deve**, sob nenhuma circunstância, sobrescrever essas variáveis CSS ou aplicar regras de `padding` ou `margin` fixas (ex: `--dss-spacing-4`) ao `DssPageContainer`. Fazer isso quebraria a responsividade e o cálculo dinâmico do layout da aplicação.
- **Alinhamento:** O alinhamento do conteúdo interno é responsabilidade do componente `DssPage` e não do `DssPageContainer`.

### 4.3. Tipografia

- O `DssPageContainer` não deve aplicar nenhum token de tipografia (como `--dss-text-body` ou `--dss-font-weight-bold`). A tipografia deve ser gerenciada pelos componentes de conteúdo renderizados dentro da `DssPage`.

## 5. Acessibilidade e Estados

A acessibilidade no contexto do `DssPageContainer` é focada em não interferir na árvore de acessibilidade e permitir que os componentes filhos assumam a responsabilidade semântica.

### 5.1. Semântica e ARIA Roles

- **Role:** O `QPageContainer` nativo não aplica um role ARIA específico por padrão. O DSS mantém esse comportamento. A semântica principal de conteúdo (`role="main"`) deve ser aplicada no componente filho `DssPage`, que é o verdadeiro contêiner do conteúdo da página.
- **Aria-hidden:** O `DssPageContainer` não deve usar `aria-hidden="true"`, pois isso ocultaria todo o conteúdo da página de leitores de tela.
- **Foco:** Sendo um contêiner estrutural não-interativo, o `DssPageContainer` não deve receber foco (`tabindex="-1"` ou ausência de `tabindex`). O gerenciamento de foco deve ocorrer nos elementos interativos dentro da `DssPage`.

### 5.2. Estados Interativos e Visuais

- **Touch Target:** Não aplicável. O `DssPageContainer` não possui elementos interativos próprios, portanto, não há requisitos de tamanho mínimo de área de toque.
- **Estados aplicáveis:** O componente é 100% não-interativo. Ele não possui estados de `:hover`, `:focus`, `:active` ou `:disabled`.
- **Dark Mode:** O `DssPageContainer` reage passivamente ao dark mode. Como seu fundo é transparente, a transição para o modo escuro é gerenciada pela mudança de cor de fundo do `DssLayout` pai (ex: transição de `--dss-surface-muted` claro para escuro). Não há lógica interna no `DssPageContainer` para lidar com temas.

## 6. Cenários de Uso Obrigatórios (Exemplos)

Os cenários de uso documentados no arquivo `DssPageContainer.example.vue` são cruciais para demonstrar a capacidade do componente de reagir ao contexto do layout. Eles devem focar exclusivamente na orquestração de padding dinâmico.

### 6.1. Cenários a serem implementados

1. **Layout Completo (Básico):**
   - **Descrição:** Demonstra o `DssPageContainer` operando em sua capacidade máxima, dentro de um `DssLayout` que possui `DssHeader`, `DssFooter` e `DssDrawer` (esquerdo e direito) ativos.
   - **Objetivo:** Validar que o padding interno do container é calculado corretamente para evitar que o conteúdo seja sobreposto por todos os elementos fixos do layout.
   - **Implementação:** Utilizar uma `<q-page>` nativa temporária (EXC-02) com conteúdo suficiente para gerar scroll, evidenciando os limites do container.

2. **Layout Limpo (Sem Offsets):**
   - **Descrição:** Demonstra o `DssPageContainer` dentro de um `DssLayout` desprovido de Header, Footer ou Drawers.
   - **Objetivo:** Validar que, na ausência de elementos fixos, o padding dinâmico se ajusta a zero, permitindo que o conteúdo ocupe 100% da área disponível da viewport.

3. **Layout Dinâmico (Toggle de Elementos):**
   - **Descrição:** Um cenário interativo onde botões fora do container permitem alternar a visibilidade do Header, Footer e Drawers.
   - **Objetivo:** Demonstrar a reatividade em tempo real do `DssPageContainer` às mudanças de estado do `DssLayout` pai, recalculando o padding instantaneamente.

*Nota de Implementação:* Como o componente `DssPage` (Nível 5) é classificado como `compositionFuture` e ainda não está disponível, todos os exemplos devem utilizar a tag `<q-page>` nativa do Quasar temporariamente para envolver o conteúdo de demonstração. Esta é uma exceção formalizada (EXC-02).

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
