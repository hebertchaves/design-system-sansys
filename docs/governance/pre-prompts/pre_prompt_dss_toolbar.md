# Pré-prompt de Criação de Componente DSS: DssToolbar

> **Nota sobre o Prompt v2.5:** Este pré-prompt foi elaborado para ser consumido pelo agente executor operando sob o "Prompt de Criação de Componente — DSS v2.5". O agente executor utilizará o MCP Fase 3 para gerar o scaffold inicial do componente.

## 1. Classificação e Contexto
- **Nome do Componente:** `DssToolbar`
- **Família:** Estrutura de Página (Base)
- **Nível de Composição:** Nível 1 (Independente)
- **Golden Reference:** `DssCard` (como container estrutural)
- **Golden Context:** `DssHeader` / `DssFooter` (containers pais futuros, Nível 3)
- **Componente Quasar Base:** `QToolbar`
- **Dependências Diretas:** `DssButton`, `DssIcon` (para composição interna pelo consumidor)

**Justificativa da Fase 2:** O `DssToolbar` é a barra de ações horizontal fundamental do sistema. Ele serve como bloco de construção base para cabeçalhos (`DssHeader`), rodapés (`DssFooter`) e barras de ferramentas internas em cards ou modais.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Altura e Alinhamento
O `QToolbar` nativo possui uma altura mínima padrão (`min-height: 50px`) e gerencia o alinhamento dos itens via flexbox. O risco é que a altura não corresponda à escala de sizing do DSS e que o espaçamento interno (padding) não utilize os tokens de spacing corretos.
**Mitigação:** O `DssToolbar` deve sobrescrever a altura mínima e o padding nativos utilizando tokens DSS (ex: `--dss-size-12` para altura, `--dss-spacing-4` para padding horizontal).

### 2.2. Gate de Responsabilidade v2.4
O `DssToolbar` é um **container estrutural 100% não-interativo**. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua única responsabilidade é fornecer o layout horizontal (flexbox) e o espaçamento correto para os elementos filhos (botões, títulos, ícones). A interatividade é responsabilidade exclusiva dos componentes inseridos nele.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-toolbar>`. O slot `default` é destinado ao conteúdo da barra e pode receber qualquer componente DSS, sendo os mais comuns `DssButton` (variante `flat` ou `ghost`), `DssToolbarTitle` (futuro) e `DssIcon`.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `inset` (Boolean) - Adiciona um espaçamento extra à esquerda (útil quando alinhado com um menu lateral).
- `brand` (String) - Aplica a cor de fundo baseada na brand selecionada (ex: `primary`, `hub`, `admin`).

### 3.2. Props Bloqueadas (Governança DSS)
- `dark` - Bloqueada. O modo escuro é governado globalmente pelo DSS via `body.body--dark`, não por prop individual.
- `glossy` - Bloqueada. O DSS não utiliza o efeito glossy do Quasar.
- `color` / `text-color` - Bloqueadas. As cores são governadas pelos tokens DSS e pela prop `brand`.

## 4. Governança de Tokens e CSS

O `DssToolbar` deve utilizar os seguintes tokens:
- **Altura (Min-height):** `--dss-size-14` (56px) ou `--dss-size-16` (64px) dependendo da densidade desejada.
- **Padding Horizontal:** `--dss-spacing-4` (16px) padrão; `--dss-spacing-6` (24px) quando `inset` for true.
- **Cor de Fundo (Background):**
  - Padrão: `--dss-surface-base` ou `transparent`.
  - Com Brand: `--dss-brand-*-500` (ex: `--dss-brand-primary-500`).
- **Cor de Texto:**
  - Padrão: `--dss-text-body`.
  - Com Brand (fundo escuro): `--dss-text-inverse`.

## 5. Acessibilidade e Estados

- **Role:** O `QToolbar` nativamente recebe `role="toolbar"`. O `DssToolbar` deve preservar essa semântica.
- **Aria-label:** É altamente recomendado que o consumidor forneça um `aria-label` para identificar o propósito da barra de ferramentas (ex: "Ações do documento"). O componente deve repassar `$attrs` corretamente.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssToolbar.example.vue` deve cobrir:
1. **Básico:** Toolbar simples com texto e um botão de ação.
2. **Com Brand:** Toolbar utilizando a prop `brand="primary"` (fundo colorido, texto invertido).
3. **Com Inset:** Toolbar com a prop `inset` ativa (maior espaçamento à esquerda).
4. **Composição Completa:** Toolbar contendo um botão de menu à esquerda, um título no centro (texto simples ou `DssToolbarTitle` se já existir), e botões de ação à direita.

## 7. Exceções aos Gates v2.4

### EXC-01: Sobrescrita de Padding e Min-Height Nativos
- **Regra Violada:** Regra 1 (Proibição de seletores CSS que referenciam classes internas do Quasar).
- **Justificativa:** O `QToolbar` aplica `min-height` e `padding` diretamente na classe base `.q-toolbar`. Para garantir que o componente respeite a escala de sizing e spacing do DSS, é estritamente necessário sobrescrever essas propriedades na classe raiz `.dss-toolbar`. Esta é uma exceção formal e documentada para garantir a fidelidade visual do Design System.
