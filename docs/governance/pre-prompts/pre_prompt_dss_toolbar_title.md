# Pré-prompt de Criação de Componente DSS: DssToolbarTitle

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssToolbarTitle`
- **Família:** Estrutura de Página (Composição de Primeiro Grau)
- **Nível de Composição:** Nível 2
- **Golden Reference:** `DssBadge` (Golden Reference oficial para componentes não-interativos)
- **Golden Context:** `DssItemLabel` (baseline de auditoria — tipográfico, não-interativo, EXC-01 precedente)
- **Contexto Estrutural:** `DssToolbar` (container pai semântico — não é Golden Context arquitetural)
- **Componente Quasar Base:** `QToolbarTitle`
- **Dependências Diretas:** Nenhuma (depende apenas de tipografia)

**Justificativa da Fase 2:** O `DssToolbarTitle` é um componente tipográfico projetado especificamente para viver dentro do `DssToolbar`. Ele encapsula o `QToolbarTitle` do Quasar, substituindo a tipografia nativa hardcoded pelos tokens semânticos do DSS, garantindo consistência visual em cabeçalhos e barras de ferramentas.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Herança de Tipografia Incorreta

O `QToolbarTitle` nativo aplica estilos tipográficos próprios (`font-size: 21px`, `font-weight: normal`, `letter-spacing: 0.01em`). O risco é que o `DssToolbarTitle` não sobrescreva esses valores corretamente, resultando em uma tipografia que não pertence à escala do DSS.

**Mitigação:** O `DssToolbarTitle` deve sobrescrever explicitamente a tipografia nativa usando os tokens de heading do DSS (ex: `--dss-heading-4-size`, `--dss-heading-4-weight`).

### 2.2. Gate de Responsabilidade v2.4

O `DssToolbarTitle` é responsável por:
1. Fornecer o container de texto flexível (`flex: 1 1 0%`) dentro da toolbar.
2. Aplicar a tipografia correta do DSS para títulos de página/seção.
3. Gerenciar o truncamento de texto (ellipsis) quando o espaço for insuficiente.

Ele **não é responsável** por:
1. Cor do texto (herdada do `DssToolbar` pai via cascata ou `[data-brand]`).
2. Interatividade (não possui hover, focus ou active).
3. Alinhamento vertical (gerenciado pelo `DssToolbar` pai).

### 2.3. Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-toolbar-title>`. O slot `default` é destinado a texto simples ou elementos inline. O uso de componentes de bloco ou layouts complexos dentro do `DssToolbarTitle` viola sua semântica tipográfica.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)

O `DssToolbarTitle` expõe um conjunto limitado de propriedades para garantir sua integridade e propósito como um título tipográfico dentro do `DssToolbar`. As props permitidas são cuidadosamente selecionadas para oferecer flexibilidade sem comprometer a governança do Design System.

- **`shrink`** (Boolean, padrão: `false`)
  - **Descrição:** Esta propriedade booleana controla o comportamento de flexibilidade do título dentro do `DssToolbar`. Quando `true`, o `DssToolbarTitle` permite que seu conteúdo encolha para ocupar apenas o espaço mínimo necessário, em vez de expandir para preencher o espaço disponível. Isso é particularmente útil em cenários onde múltiplos elementos flexíveis coexistem na mesma barra de ferramentas, como um título que deve ceder espaço a botões de ação ou outros componentes interativos.
  - **Exemplo de Uso:** Em uma `DssToolbar` com um `DssToolbarTitle` e um `DssButton` alinhados, `shrink` pode ser usado para garantir que o título não force o botão para fora da tela em larguras menores.
  - **Mapeamento Interno:** Esta prop geralmente se traduz em uma classe CSS ou estilo inline que ajusta as propriedades `flex-grow` e `flex-shrink` do elemento raiz do componente, como `flex: 0 1 auto` quando `shrink` é `true`.

- **`tag`** (String, padrão: `'div'`)
  - **Descrição:** Permite especificar a tag HTML semântica que será renderizada como o elemento raiz do `DssToolbarTitle`. Isso é crucial para a acessibilidade e SEO, permitindo que o título seja marcado como um `<h1>`, `<h2>`, etc., dependendo de sua importância hierárquica na página.
  - **Exemplo de Uso:** Para o título principal de uma página, o uso de `<DssToolbarTitle tag="h1">Meu Título</DssToolbarTitle>` é recomendado.
  - **Considerações:** O uso desta prop deve ser feito com cautela para manter a estrutura semântica correta da página. O DSS garante que a tipografia visual permaneça consistente, independentemente da tag semântica escolhida.

- **`ellipsis`** (Boolean, padrão: `true`)
  - **Descrição:** Controla se o texto do título deve ser truncado com reticências (`...`) quando excede a largura disponível. Quando `false`, o texto pode quebrar linha ou ser cortado, dependendo do comportamento padrão do navegador e do container pai.
  - **Exemplo de Uso:** Em casos raros onde o truncamento não é desejado, esta prop pode ser definida como `false`.
  - **Mapeamento Interno:** Ativa ou desativa as propriedades CSS `text-overflow: ellipsis`, `white-space: nowrap` e `overflow: hidden`.

### 3.2. Props Bloqueadas (Governança DSS)

A governança do DSS impõe restrições rigorosas sobre quais propriedades podem ser expostas para garantir a consistência visual e funcional dos componentes. As props listadas abaixo são explicitamente bloqueadas para o `DssToolbarTitle`.

```json
"propsBlocked": [
  "active",
  "color",
  "align",
  "dense"
],
"propsBlockedJustification": {
  "active": "O DssToolbarTitle é um componente puramente tipográfico e não possui estados interativos como 'ativo'. A interatividade e navegação são gerenciadas por componentes irmãos ou pais, como `DssTab` ou `DssMenu`.",
  "color": "A cor do texto do `DssToolbarTitle` é intencionalmente herdada do `DssToolbar` pai. Isso garante que o título sempre tenha o contraste adequado em relação ao fundo da toolbar, que pode variar com a `brand` (hub, water, waste) e o tema (claro/escuro). Definir uma cor diretamente no título violaria essa regra de contraste e a hierarquia visual.",
  "align": "O alinhamento do texto dentro do `DssToolbarTitle` é controlado pelo `DssToolbar` pai através de suas propriedades de layout flexbox. Permitir que o título defina seu próprio alinhamento introduziria inconsistências e dificultaria a manutenção do layout geral da toolbar.",
  "dense": "A propriedade `dense` geralmente afeta o espaçamento e o tamanho de componentes para uma versão mais compacta. No caso do `DssToolbarTitle`, seu tamanho e espaçamento são intrínsecos à sua tipografia (Heading 4) e ao contexto do `DssToolbar`. Modificar isso diretamente no título comprometeria a escala tipográfica do DSS."
}
```

## 4. Governança de Tokens e CSS

O `DssToolbarTitle` é um exemplo primordial de como o DSS impõe sua escala tipográfica sobre componentes base de frameworks. Para garantir a adesão total ao Design System, o `DssToolbarTitle` deve sobrescrever explicitamente os estilos padrão do `QToolbarTitle` do Quasar utilizando os tokens de design semânticos do DSS. Esta abordagem garante que qualquer atualização nos tokens do DSS seja refletida automaticamente no componente, mantendo a consistência.

Os tokens tipográficos essenciais a serem aplicados são:

- **`--dss-font-family-sans`**
  - **Propósito:** Define a família de fontes principal para o texto do título, garantindo que a fonte padrão do DSS seja utilizada em vez de qualquer fonte definida pelo Quasar ou pelo navegador.
  - **Valor Esperado:** Geralmente uma pilha de fontes como `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`.

- **`--dss-heading-4-size`** (20px)
  - **Propósito:** Define o tamanho da fonte para o título, substituindo o valor nativo de 21px do `QToolbarTitle`. Isso alinha o título com a escala de `Heading 4` do DSS.
  - **Mecanismo:** Aplica `font-size: var(--dss-heading-4-size);`.

- **`--dss-heading-4-weight`** (Medium/500)
  - **Propósito:** Define o peso da fonte, alterando o `normal/400` nativo para `Medium/500`, conforme especificado para `Heading 4` no DSS.
  - **Mecanismo:** Aplica `font-weight: var(--dss-heading-4-weight);`.

- **`--dss-heading-4-line-height`** (1.2)
  - **Propósito:** Garante que a altura da linha do título esteja em conformidade com as diretrizes tipográficas do DSS para `Heading 4`, otimizando a legibilidade.
  - **Mecanismo:** Aplica `line-height: var(--dss-heading-4-line-height);`.

- **`letter-spacing: normal`**
  - **Propósito:** Remove qualquer espaçamento de letra (`letter-spacing`) padrão que possa ser aplicado pelo `QToolbarTitle` (como `0.01em`), garantindo que o espaçamento seja o padrão `normal` para `Heading 4`.
  - **Mecanismo:** Aplica `letter-spacing: normal;`.

- **`text-transform: none`**
  - **Propósito:** Garante que o texto do título não seja transformado automaticamente para maiúsculas ou outras formas, respeitando o caso original do conteúdo fornecido.
  - **Mecanismo:** Aplica `text-transform: none;`.

**Governança de Cores:**

A cor do texto (`color`) do `DssToolbarTitle` é um aspecto crítico da governança de tokens. Ela **não deve ser definida diretamente** no componente. Em vez disso, o `DssToolbarTitle` deve herdar sua cor do `DssToolbar` pai. O `DssToolbar` é responsável por gerenciar a `brand` (hub, water, waste) e o tema (claro/escuro), e ele aplicará os tokens de cor apropriados, como `--dss-text-body` (para fundos claros) ou `--dss-text-inverse` (para fundos escuros/coloridos), garantindo o contraste acessível e a consistência visual em todo o sistema.

## 5. Acessibilidade e Estados

- **Role:** O `QToolbarTitle` não aplica um role específico. O texto deve ser semanticamente claro. Se for o título principal da página, o consumidor deve envolvê-lo em uma tag `<h1>` via slot, ou o componente deve permitir a prop `tag="h1"`.
- **Touch Target:** Não aplicável (componente não-interativo).
- **Estados aplicáveis:** Nenhum estado interativo. O componente reage passivamente ao dark mode e alto contraste herdando as cores do pai.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssToolbarTitle.example.vue` deve cobrir:

1. **Básico:** `DssToolbarTitle` padrão dentro de um `DssToolbar` com botões nas extremidades.
2. **Truncamento (Ellipsis):** Título muito longo em uma toolbar estreita para demonstrar o truncamento automático.
3. **Com Shrink:** Uso da prop `shrink` ao lado de outro elemento flexível.
4. **Com Brand:** `DssToolbarTitle` dentro de um `DssToolbar brand="hub"` para demonstrar a herança correta da cor do texto (branco sobre fundo colorido).

## 7. Exceções aos Gates v2.4

### EXC-01: Sobrescrita de Tipografia Nativa

- **Regra Violada:** Gate de Composição v2.4 — Regra 2 (Proibição de sobrescrever estilos internos do Quasar).
- **Justificativa:** O `QToolbarTitle` aplica estilos tipográficos hardcoded na classe `.q-toolbar__title`. A única forma de garantir que o título use a escala tipográfica do DSS (Heading 4) é sobrescrevendo essas propriedades via CSS no `.dss-toolbar-title`. Precedente canônico: `DssItemLabel` (EXC-01).

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios

- **Texto do Título**: [Input de texto] — permite testar diferentes comprimentos de string e o comportamento de truncamento.
- **Shrink**: [true, false] — permite testar o comportamento flexbox do título (prop `shrink`).
- **Contexto (Brand do Pai)**: [default, hub, water, waste] — controle externo que altera a prop `brand` do `DssToolbar` pai para demonstrar a herança de cor.
- **Largura do Container**: [100%, 300px, 200px] — controle externo para forçar o truncamento do texto (ellipsis).

### 8.2 Composite Logic

- O `DssToolbarTitle` é estritamente um componente filho do `DssToolbar`.
- Ele **não possui cor própria**; herda a cor do texto do `DssToolbar` pai (que alterna entre `--dss-text-body` e `--dss-text-inverse` dependendo da brand ativa).
- O comportamento de truncamento (ellipsis) é nativo, mas depende do contexto flexbox fornecido pelo `DssToolbar` pai.

### 8.3 Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Repouso** | Título com tipografia Heading 4 do DSS | Visual | Padrão |
| **Truncado (Ellipsis)** | Título longo cortado com "..." no final | Visual | Reduzir largura do container ou inserir texto longo |
| **Shrink Ativo** | Título ocupa apenas o espaço necessário | Visual | Prop `shrink=true` |
| **Sobre Brand (Inverso)** | Texto branco sobre fundo colorido | Visual | Configurar `brand` no DssToolbar pai |
| **Modo Escuro** | Cor do texto ajustada automaticamente via herança | Visual | Toggle de tema |
| **Alto Contraste** | Tipografia legível em modo de alto contraste | Visual | Ativar prefers-contrast |
