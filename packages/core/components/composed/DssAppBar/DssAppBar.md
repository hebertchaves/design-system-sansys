# DssAppBar — Documento Normativo

> **Status:** `draft` (set/2026). Nasceu no Bloco 2 do plano de contêineres e casca, como a
> primeira peça da Frente 2.

## 1. Papel

Fixar a **estrutura invariante** da barra de aplicação Sansys. Não pinta, não decide
conteúdo, não sabe o que o menu abre.

## 2. A decisão de existir (§1.6 do guia de Fase 3)

A pergunta que originou a frente era: *criar componentes específicos mais "completos", ou
deixar o default com variações por prop?*

A resposta não é nem uma nem outra — **o eixo de variação decide**. Aqui:

- a cor muda entre produtos → **token**, via `brand`
- o logo e os ícones mudam → **dados e slot**
- a ordem das cinco peças **não muda** → **composto**

Estrutura invariante é exatamente o que `components/composed/` existe para ser. A alternativa
— `DssHeader` com `burgerIcon`, `logoSrc`, `actions[]` — seria reimplementar slots, mal, e é
o anti-pattern que o §1.6 nomeia.

## 3. O que o composto NÃO fez

Nenhuma destas, e a ausência é deliberada:

- **Não reimplementou primitivo.** Compõe `DssHeader`, `DssToolbar`, `DssButton` e
  `DssBrandLogo`. Nenhum QComponent cru no template.
- **Não usou `:deep()` para layout.** O layout mora no pai (2-composition), que posiciona os
  blocos. Os filhos não sabem que estão numa barra.
- **Não criou prop de cor.** A pele é inteira do `DssToolbar`. Repetir a regra de marca na
  Layer 4 criaria dois donos para a mesma cor — a armadilha que o `DssContainer` pagou.
- **Não usou `provide/inject`.** Não há estado de bloco. O contexto visual vai por `data-*`,
  que é o §1.3.

## 4. O divisor

Não é `DssSeparator`, e não é omissão: a regra R3 do `ui-rules` não admite `DssSeparator`
dentro de `DssToolbar`. A regra está certa — aqui o traço é decoração de barra, não separação
semântica entre grupos, e sai da árvore de acessibilidade.

Ele existe **condicionalmente**: sem título não há o que separar, e um traço sozinho na barra
é lixo visual.

## 5. Exceções de gate

Nenhuma.

## 6. Débito conhecido

O `DssHeader` exige `QLayout` ancestral e **falha em silêncio** sem ele — a barra não
aparece, sem erro. Está documentado no README dele como não-use e repetido aqui, mas nenhum
gate pega. É o mesmo tipo de defeito mudo que a Frente 1 encontrou quatro vezes.
