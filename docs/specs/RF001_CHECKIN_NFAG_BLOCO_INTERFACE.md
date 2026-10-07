# RF001 Dashboard Configuração NFAg — §2.5 Interface

> **Complemento** à especificação funcional `RF001_ Dashboard Configuração NFAg.md` (Sansys Water · Faturamento › NFAg).
> **Modelo:** [`DSS_SPEC_BLOCO_INTERFACE.md`](../governance/DSS_SPEC_BLOCO_INTERFACE.md) · **Dono do preenchimento:** Designer UX/UI
> **Valida com:** `npm run spec:check <spec + este bloco>` · tool MCP `validate_spec_readiness`
> **Fontes:** RF001 · PRD Check-in v1.1 · Figma *Check-in de Configuração NFAg* (node `60818:1664`, arquivo *Base Componentes — Sansys Water*) · CSS/tokens do DSS.

Por que este arquivo existe: o portão de prontidão reprovou o RF001 por duas lacunas — **estado de carregamento** e **superfície declarada**. Ambas são do eixo de interface, que é ofício do designer e não tinha campo no template. Este bloco cria os campos e os preenche.

---

**2.5 Interface**

**2.5.1 Superfície**

A funcionalidade será uma página do módulo Faturamento, na rota `/faturamento/nfag/check-in`, embutida no shell do Sansys Water (app bar, breadcrumbs e menu do hospedeiro). Conteúdo em coluna única, largura máxima de 1200 px, centralizado. Não é modal: a execução dura segundos, o resultado é consultado repetidamente e o usuário precisa navegar para as funcionalidades de correção sem perder a tela.

**2.5.2 Estados de dados**

- **Vazio:** quando não houver registros de execução para a empresa selecionada, a tela deverá exibir o estado vazio “Nenhuma verificação executada para esta empresa”, com o texto de apoio “Execute o check-in para saber se o ambiente está apto à emissão da NFAg. O resultado fica válido por 24 h.” e o botão **Executar verificação** em destaque. Os tiles de contagem exibem “—” e o histórico exibe “Sem informação”.
- **Carregando:** enquanto os dados são carregados na abertura da tela, a página deverá exibir esqueleto (*skeleton*) no card de resultado e na lista. Durante a execução, o estado é **carregando** com progresso determinado: barra de progresso e legenda “Executando verificação *n* de 11…”, atualizada a cada verificação concluída e anunciada por `aria-live="polite"`. O botão de execução fica desabilitado, com indicador de carregamento. Os tiles OK/Alertas/Falhas exibem “—” até o fim.
- **Erro:** em caso de falha de infraestrutura (réplica de leitura indisponível), o usuário deverá ver um **banner** negativo “Verificação interrompida — réplica de leitura indisponível”, com a ação **Executar novamente**. As verificações que não concluíram ficam com a situação “Não concluída”, que não bloqueia a emissão.
- **Parcial:** se apenas parte das verificações retornar (timeout de 10 s por verificação — RF10), a execução termina normalmente: as concluídas exibem seu resultado e as demais ficam “Não concluída” com a mensagem “Tempo excedido — repita a verificação fora do horário de pico”. O veredito é calculado apenas sobre as verificações concluídas e o cabeçalho sinaliza que o resultado é parcial.

**2.5.3 Mensagens ao usuário**

| Quando | Texto exato | Veículo |
| :---- | :---- | :---- |
| Há falha em verificação bloqueante | “Ambiente não apto para emissão” + a verificação ofensora e seu impacto | banner (negativo, topo do conteúdo) |
| Resultado com mais de 24 h | “Verificação desatualizada — resultado com mais de 24 h. Execute uma nova verificação para confirmar o ambiente.” | banner (aviso, dentro do card de resultado) |
| Réplica de leitura indisponível | “Verificação interrompida — réplica de leitura indisponível.” | banner (negativo, substitui o conteúdo) |
| Verificação excedeu 10 s | “Tempo excedido — repita a verificação fora do horário de pico.” | inline, na linha da verificação |
| Execução já em andamento (RF07) | “Verificação em andamento, iniciada por \<usuário\> às \<hora\>.” | toast |
| Execução concluída | “Verificação concluída: \<veredito\>.” | toast |
| Consulta copiada (perfil de suporte) | “Consulta copiada para a área de transferência.” | toast |
| Nenhuma verificação no filtro | “Nenhuma verificação com \<situação\>.” | estado vazio, dentro da lista |

**2.5.4 Volume esperado**

Típico: 11 verificações por execução e 5 execuções no histórico visível. Máximo esperado: 500 achados por verificação — acima disso a tabela é truncada, exibindo a contagem total e o link para a lista paginada (RF04). O histórico completo abre em lista paginada de 25 registros.

Decisão que este número determina: a lista de verificações é um **accordion de 11 itens**, não tabela nem *scroll* virtual; a tabela de achados dentro de cada item é uma tabela simples com truncamento, não paginação local.

**2.5.5 Responsividade**

Largura mínima suportada: 1024 px (RNF de compatibilidade). Abaixo de 1024 px o cabeçalho da verificação passa de três para duas colunas — o resumo e o chip de situação descem para a segunda linha, alinhados à esquerda — e a tabela do histórico ganha rolagem horizontal própria, sem que a página role na horizontal. Os tiles de contagem usam grade fluida (`auto-fit`, mínimo de 160 px), quebrando de quatro para duas colunas.

**2.5.6 Acessibilidade**

*(Regime de horizonte — registrado, não bloqueia a entrega. WCAG 2.1 AA segue vinculante no nível do componente, por Constituição #4.)*

- Situação transmitida por **texto além da cor**: todo chip traz o rótulo (“OK”, “Alerta”, “Falha”), e o número da verificação tem o rótulo acessível completo no cabeçalho do accordion.
- Accordion operável por teclado e com `aria-expanded` — herdado do `DssExpansionItem`, que não é reconstruído.
- Progresso anunciado por `aria-live="polite"`.
- Tiles de filtro são `<button>` com `aria-pressed`, alvo de toque ≥ 44 px.
- Tabelas com `<caption>` (visualmente oculto) e `scope` nas colunas.

**2.5.7 Elementos a preservar**

Árvore de composição consumida por `validate_composition`:

- `DssHeader` › `DssToolbar` — app bar do Sansys Water (menu, marca, título, ajuda, avatar)
- `DssBreadcrumbs` › `DssBreadcrumbsEl` — Faturamento › NFAg › Check-in de Configuração
- Cabeçalho da página: título + `DssButton` **Relatório PDF**, **Executar verificação**, **Tutorial**
- `DssCard` › `DssCardSection` — resultado da verificação: identificação da empresa, `DssChip` de veredito, `DssBanner` de resultado desatualizado, quatro tiles de contagem clicáveis, `DssLinearProgress` + legenda
- `DssBanner` — bloqueio do ambiente (somente com falha bloqueante)
- Cabeçalho de seção: título + `DssBadge` de contagem + `DssChip` removível do filtro + `DssButton` expandir/recolher
- `DssCard` › `DssExpansionItem` (×11) — cada verificação: número, título, marcador “bloqueia emissão”, funcionalidade de correção, resumo, `DssChip` de situação; no painel, “O que é verificado”, “Impacto na emissão”, `DssMarkupTable` de achados e `DssButton` **Abrir \<funcionalidade\>**
- `DssCard` › `DssMarkupTable` — histórico das últimas cinco execuções, com `DssChip` de veredito e `DssButton` **PDF**
- `DssEmptyState` — estado vazio da tela e do filtro sem resultado

**Não usar:** `DssDataCard` (fixture de `stress-test`, não é componente de produção) — os tiles de contagem são compostos com `DssCard` e tipografia tokenizada.

---

## Divergências registradas (não resolvidas por este bloco)

| # | Divergência | Onde | Encaminhamento |
|---|---|---|---|
| 1 | **A contagem de verificações se contradiz dentro do próprio RF001** — não é divergência Figma × spec. RF06 diz “conjunto fixo de **dez** verificações”; o BDD do mesmo RF diz “As **onze** verificações do item 5.1 são executadas”; CA26 e CA33 dizem “as **onze** verificações”. O PRD §5.3 enumera 10. O Figma desenha 11, alinhado com os critérios de aceite. | RF001 interno (+ PRD) | Decisão de Produto: fixar a contagem. A implementação segue **11**, que é o que os critérios de aceite exigem. |
| 1b | **`RF21: 5.1 Conjunto de verificações` está vazio** — “Caminho: A definir · Descrição: A definir”. É a seção que todo BDD e todo critério de aceite referencia (“item 5.1”), e ela nunca enumera as verificações. A lista real só existe no PRD §5.3 e no Figma. | RF001 interno | Bloqueia o refinamento técnico: sem ela, a contagem (10 × 11) não tem árbitro dentro da spec. |
| 2 | A 11ª verificação está marcada como **bloqueia emissão** mas com situação **Alerta**, combinação que a regra de veredito (§5.4) não prevê. | Figma | Decisão de Produto: rever a severidade. |
| 3 | O PRD §5.2 prevê **seletor “Empresa emitente”** no cabeçalho (RF-12); o Figma não o desenha — a empresa aparece só como texto no card de resultado. | Figma × PRD | Decisão de Design: desenhar o seletor ou registrar que a v1 é de empresa única. |
| 4 | O protótipo `Check-in Configuracao NFAg.dc.html` (Figma Make) usa props inexistentes no DSS: `DssBanner tone`/`title`, `DssChip outline`, `DssMarkupTable dense`, `DssButton disable`, `DssTooltip text`; e pendura filhos diretamente no `DssHeader`, contra a regra R3. | Protótipo | Sem ação: o protótipo é referência de intenção. A implementação usa a API real. |

---

## Deltas de adequação encontrados ao montar a tela

Cinco componentes usados por esta tela estão como **⬜ adequação não iniciada** em
[`DSS_ESTADO_ADEQUACAO_UI.md`](../governance/DSS_ESTADO_ADEQUACAO_UI.md): `DssBanner`,
`DssExpansionItem`, `DssLinearProgress`, `DssMarkupTable` e `DssToolbar`. Montar o fluxo
sobre eles produziu os achados abaixo — entrada para a onda de adequação, não correções
feitas aqui (quem constrói não sela).

| # | Componente | Achado | Evidência |
|---|---|---|---|
| A | `DssLinearProgress` | **A prop `color` é ignorada dentro de qualquer página com `[data-brand]`.** A regra de brand tem especificidade `(0,3,0)` e vence a regra de cor `(0,2,0)`, então `color="error"` renderiza azul-marca. Como toda tela Sansys é brandeada, a prop `color` é inerte em produção. | `4-output/_brands.scss:44` — `[data-brand="water"] .dss-linear-progress { .q-linear-progress__model { background-color: var(--dss-water-500) } }` × `3-variants/_colors.scss:32` — `&--color-error .q-linear-progress__model`. Computado no navegador: `rgb(14,136,228)` (`--dss-water-500`) onde era esperado `#d8182e` (`--dss-feedback-error`). Mesmo padrão em `DssCircularProgress`, `DssInnerLoading` e `DssSeparator`. |
| B | `DssExpansionItem` | **Não há variante de ênfase para o header.** O componente fixa `--dss-surface-subtle` no header expandido e `--dss-surface-hover` no hover. O desenho do Sansys Water pede header em superfície escura (`--dss-action-primary-deep`) com texto inverso. A tela seguiu o componente (Constituição #6) e o desenho ficou por atender. | `2-composition/_base.scss:101` — `.dss-expansion-item .q-expansion-item--expanded .q-item { background-color: var(--dss-surface-subtle) }`. Atendê-lo pela tela exigiria injetar CSS no filho, vedado pelo Cartão Composto. |
| C | `DssHeader` | **Exige contexto `QLayout` e falha em silêncio fora dele** — não renderiza nada, sem aviso em console. O próprio README o declara (“Fora de um contexto de `QLayout`” está na lista de não-usos), mas nada no runtime sinaliza. | Primeira montagem da tela: `DssHeader` presente no template, ausente do DOM. Resolvido envolvendo em `DssLayout` › `DssPageContainer` › `DssPage`. |
| D | `DssToolbar` | Sem achado. `brand="water"` pinta a barra com `--dss-water-600` e remapeia `--dss-action-primary` para `--dss-text-inverse` nos filhos — o app bar azul sai do contrato do componente, sem override na tela. | `4-output/_brands.scss:76` |
| E | Catálogo / `validate_composition` | **Subcomponentes são invisíveis ao catálogo.** `DssCardSection` é acusado como `CRITICAL — não existe no catálogo DSS (93 componentes)`, mas existe e é exportado. O catálogo indexa pasta de componente; `DssCardSection` e `DssCardActions` vivem dentro de `DssCard/1-structure/`. Falso positivo permanente em qualquer árvore de Fase 3 que use seção de card. | `packages/core/components/index.ts:62` — `export { DssCard, DssCardSection, DssCardActions } from './base/DssCard'` |
| F | `emit-spec.mjs` (portão de prontidão) | **Não reconhece Gherkin em inglês nem “Premissa” no singular.** O RF001 tem 119 cenários BDD com `**Given** / **When** / **Then**`; o detector procura `**Dado/Quando/Então**` e conta 0. A seção `3.2 Premissa` não casa com `/Premissas/`. As duas “seções obrigatórias ausentes” do veredito são artefatos do detector, não lacunas da spec. | `scripts/emit-spec.mjs:65` (`GHERKIN`) e `:109` (`premissa`). Contagem no RF001: `**BDD**` 119 · `**Given**` 119 · `**When**` 119 · `**Then**` 119 · `**Dado/Quando/Então**` 0. |
| G | `DssBanner` · `DssBreadcrumbsEl` | **Padrão, não caso isolado: componentes compõem `DssIcon` com `aria-hidden="true"` em vez da prop `decorative` que o Contrato de Composição de Ícone exige** — e o `DssIcon` avisa em DEV a cada renderização: *“`ariaLabel` é obrigatório para ícones não-decorativos (WCAG 1.1.1 · CCI §2.1)”*. O resultado de acessibilidade está correto (o ícone é ocultado), mas o console de qualquer tela com banner ou breadcrumb com ícone nunca fica limpo — e **console limpo é item do gate visual de fechamento da adequação**. Os dois estão como ⬜ adequação não iniciada. | `DssBanner/1-structure/DssBanner.ts.vue:54-60` e `DssBreadcrumbsEl/1-structure/DssBreadcrumbsEl.ts.vue:77-82`, contra `DssIcon/1-structure/DssIcon.ts.vue:137`. Medido: 2 banners → 2 avisos na tela de Check-in; 3 breadcrumbs → 3 avisos no Grid Master. |
