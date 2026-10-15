# DssDataGrid — contrato normativo

## Decisão

`DssDataGrid` é um composto Fase 3 que apresenta registros como **fichas**. Não é uma variante do `DssTable` nem usa `q-table grid`: a estrutura é lista, não tabela, e essa é a decisão central do componente.

**Por que não reaproveitar a tabela.** A origem (`JtDataGrid`) montava um `q-table grid` e vestia cada linha de card por CSS. O resultado visual é o mesmo; o resultado semântico não. Uma tabela com uma coluna anuncia-se como tabela de uma coluna, e os rótulos dos campos — que na ficha são a informação principal — ficam como texto solto ao lado do valor. `<dl>` resolve o vínculo sem ARIA.

**Quando a tabela é a escolha certa.** Comparar valores entre registros exige colunas alinhadas; ficha não alinha. Para isso existe o `DssDataTable`. Este componente serve o caso oposto: ler um registro por vez.

## Campos secundários

`visibility: 'hidden'` significa "atrás do revelador", não "ausente". A origem declarava a intenção e não a cumpria — empurrava um campo sintético `showhide` rotulado `MORE` no array do pai e nada o renderizava. O revelador aqui é por ficha, com `aria-expanded` no botão e `aria-controls` apontando para o bloco.

O bloco revelado usa `v-show`. Com `v-if`, o `aria-controls` apontaria para um id ausente do DOM enquanto recolhido — que é pior do que não declarar a relação.

## Fronteira de dados

Não busca, não filtra, não ordena. `rows` chega filtrada; `total` é o denominador da contagem. Com `rowsNumber` informado a paginação é remota: `rows` **já é a página** e o componente não refatia — refatiar esconderia registros que o servidor mandou.

É a mesma fronteira que o pattern "Solicitações" documenta para o `DssDataBoard`: quem filtra é a página.

## O que não se herda da origem

| Da origem | Aqui | Motivo |
|---|---|---|
| mutação de `fields` e de `rows` | tudo derivado | a origem reescrevia os objetos da prop, dava `push` no array do pai e `Object.assign` nas linhas |
| `isPaginated: false` → `rowsPerPage = 9999` | `paginated: false` | 9999 é "paginado com página gigante", não "sem paginação" |
| três booleanos de seleção | `selection` | eram mutuamente exclusivos e nada impedia os três juntos |
| `row.name` como rótulo do checkbox | `titleField` + `<h3>` | amarrava o componente a um campo chamado `name` e fazia o título existir só como nome de controle |
| `transform: scale(0.95)` no selecionado | tinte + borda | deslocamento some em `prefers-reduced-motion` e não existe para quem não enxerga |
| `col-6` fixo (2 colunas) | `auto-fill` com piso, `columnsPerRow` como teto | largura fixa espreme a ficha em container estreito |

## Aninhamento

O grid vive dentro de um `DssCard` que é o **primeiro container** sob o `DssPageShell`, como no pattern "Solicitações". A ficha de cada registro é um segundo nível de card.

Isso é aninhamento de card, e é aceito: `docs/guides/ui-rules/03_CARD_PATTERNS.md` §3.1 proíbe aninhar **"sem necessidade"** — aqui a necessidade existe nos dois níveis, o bloco precisa de container e o registro precisa de ficha. O que a regra ataca é borda sobre borda sem função.

⚠️ **O `validate_composition` reprova esta árvore (R5) por defeito do detector, não por defeito da tela.** O schema declara `forbidden_children: ["DssCard[variant=elevated]"]`, mas a regra dispara para `outlined` dentro de `outlined`, enquanto `flat` dentro de `flat` passa — nenhuma das duas árvores usa `elevated`. Até o detector ser corrigido, este CRITICAL é falso positivo conhecido para esta composição.

## Marca

Superfície de conteúdo: os controles seguem o peso semântico. A marca pinta um traço no cabeçalho do bloco com `--dss-brand-primary` — tier de indicador, piso 3:1 (`DSS_MODELO_PROPAGACAO_MARCA.md` §9.4).

## Responsabilidade do consumidor

Filtrar e informar `total`; responder a `request` em remoto; declarar quais campos são secundários; fornecer `titleField` quando o primeiro campo visível não for o nome do registro; traduzir rótulos do domínio.
