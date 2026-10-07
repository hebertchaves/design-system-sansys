# DssBrandLogo — Documento Normativo

> **Status:** `draft` (set/2026). Nasceu no Bloco 2 do plano de contêineres e casca, como
> insumo do `DssAppBar`.

## 1. Papel

Exibir a marca Sansys. **Só isso.** Não decide cor, não recebe interação, não posiciona.

## 2. As três decisões que definem o componente

### 2.1. Não existe prop de cor

A cor sai de `currentColor`. É a decisão central, e a que mais economiza no consumidor: o
mesmo desenho serve branco sobre a barra de marca e escuro sobre fundo claro, sem variante
por tema.

**Anti-pattern:** `<DssBrandLogo color="white" />`. Prenderia o logo a um valor e quebraria o
uso sobre fundo colorido — o caso mais comum no Sansys.

### 2.2. A marca é conteúdo, resolvida em JS

CSS não troca o `d` de um `<path>`. Por isso a marca é a única faceta da brandabilidade do
DSS que **não** sai por cascata.

Resolução: prop → ancestral `[data-brand]` **mais próximo** → nada.

O terceiro caso é deliberado: sem marca resolvida o componente não desenha. Chutar a marca
de um produto é pior que não desenhar.

### 2.3. `opacity` vem dos dados e é desenho

As formas do símbolo são parciais (0,4 a 0,7) e compõem a profundidade da marca sobre fundo
colorido. Não é decoração que o componente possa descartar — por isso viaja nos dados, em
`assets/brand/logos.ts`, e não em CSS.

## 3. Delta declarado em relação ao Golden Context (`DssIcon`)

| Aspecto | DssIcon | DssBrandLogo | Por quê |
|---|---|---|---|
| Nome acessível | `ariaLabel` **obrigatório** se informativo | nome natural, vindo dos dados | Ícone não tem nome; marca tem |
| Aviso em DEV | avisa se informativo sem nome | não avisa | O estado inválido não é alcançável: o nome sempre existe |
| Fonte do desenho | `name` → fonte de ícones | `brand` → dados no repositório | A marca é do produto, não de uma biblioteca |

## 4. Exceções de gate

Nenhuma.

## 5. O que o componente NÃO faz

- **Não pinta.** `currentColor`, sempre.
- **Não é link nem botão.** `pointer-events: none`; quem interage é quem embrulha.
- **Não escolhe marca sozinho** quando não há fonte — renderiza vazio.
- **Não deforma.** Quem manda é a altura; a largura acompanha a proporção do desenho.

## 6. Divergência registrada

O laranja do Hub no arquivo de origem (`site-jtech`) é `#ff7d14`; o token do DSS
(`--dss-hub-600`) é `#ef7a11`. **Não afeta este componente** — aqui o logo é `currentColor`.
Importa só se alguém criar uma variante colorida. Decisão de qual é a fonte: pendente.
