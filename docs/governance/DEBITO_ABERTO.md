# DSS — Índice de Débito Aberto

> Ponto único de consulta do que está **em aberto** no DSS, para não depender de varrer a memória/histórico.
> Criado 2026-07-02 @ `import/dss-v2.4.0`. **Manter enxuto:** ao fechar um item, mover para "Resolvidos"
> (com commit) ou remover. Cada item aponta a fonte de detalhe (doc de governança ou arquivo de memória).

## Legenda
🔴 ativo (frente em curso) · 🟡 débito de fundo (consciente, não urgente) · ⏳ aguardando terceiro · 🔍 verificar

---

## Frentes desta onda (cadeia de fonte única / contraste)

- ✅ **(a) Escalar `dss.contract.json`** — **CONCLUÍDO (76/76)**, `--all --strict` exit 0. Todos os
  grupos (Form/Input 23, Feedback 1, Navigation 9, Overlay 1, Data 3, Layout 10, Outros 27) emitidos,
  schema-válidos, a11y verificada. Relatórios em `relatorios/CONTRATOS_*.md`. `classification` é enum
  enforçado (Action|Compact|Visual); prosa→`classificationNote`. Runbook histórico: `HANDOFF_ESCALA_CONTRATOS.md`.
  - ⚠️ **Mapeamentos de `classification` ambíguos p/ revisão humana** (nos relatórios): DssItem,
    DssBreadcrumbsEl (Action×Visual), DssCard (clickable), DssSlideItem (gesto), DssBanner (dispensar),
    **DssUploader (Visual×Action — root não-interativo, mas propósito é fluxo de upload interativo)**.
  - ⚠️ **Débito de componente descoberto na emissão** (fora do escopo, tratar em Higiene): progressbars
    sem `aria-valuenow` tipado; cobertura de `alt`/`decorative` nos testes de imagem. + focus-ring (já listado).
- ⏳ **(c1) Contraste WCAG da paleta default** — auditoria + tabela de rotas (A escurecer / B texto escuro)
  prontas; **aguardando decisão da equipe** por cor. NÃO tocar `globals.scss` até o retorno.
  `[[project_color_ramp_a11y]]`. (c0 — reconciliação da rampa com o Figma — **feito**, commit `6a4baa6`.)
  - 📌 **Evidência medida de campo** (2026-08-13, chips `filled` no dark, texto branco): `positive`
    **1,99:1** e `primary` **3,80:1** reprovam AA para texto normal; `negative` 5,13:1 passa. Confirma a
    auditoria com número de componente real — `positive` é o caso mais grave e o candidato natural a
    abrir a lista quando a decisão vier.

## Débito de fundo (ondas anteriores)

- ✅ **DssChip sem cor neutra/token + DssSelect não consome DssChip — RESOLVIDO** (`886b083`, ago/2026).
  `ChipColor` ganhou `'neutral'` (aditiva; o default segue `primary`) e o `DssSelect` passou a preencher o
  slot `selected-item` com `<DssChip color="neutral" size="xs">` — acabou a divergência de duas linguagens
  visuais para o mesmo dado. `[[project_multiselect_autocomplete]]`.

- 🟡 **`meta.visualProperties` staleness = GERIDO via checklist (automação total impossível)** — o gate
  não pode pegar drift da *lista de tokens*: o validador não distingue "token aplicado via classe Quasar
  (`bg-primary`)" de "token removido" — `--validate-strict` deu **129 falsos-positivos em 88 comp**. Mesma
  cegueira atinge o contrato (deriva do SCSS compilado, não vê Quasar-applied). Correção da premissa:
  `meta.visualProperties` (curado, inclui Quasar-applied) é **complementar** ao contrato, não legado
  inferior. **Resolvido como:** passo de propagação no `DSS_UI_ADEQUACAO_CHECKLIST.md` (sync:token-values
  p/ value dimensional + revisão curatorial da lista + reverificar meta.a11y). Não há mais gate a construir
  aqui — é curadoria humana consciente. *(Opção estratégica adiada: validador Quasar-aware p/ resolver
  bg-primary→token; ou aposentar a REFERENCIA em favor do contrato.)*

- 🟡 **Governança da IMPLEMENTAÇÃO (o que o produto constrói) — camada 1 de 4 entregue** (2026-08).
  > 🔻 **A árvore paralela desta frente foi encerrada em 2026-08-10** (worktree `DSS-governanca` +
  > branch `work/dss-governanca-implementacao`, ambas removidas após atualização do SO). **Nada se perdeu:**
  > os 13 commits que já existiram nela foram verificados um a um como contidos em
  > `work/dss-selection-controls` (merge `67838e5`), incluindo o último — a apresentação à diretoria
  > (`DSS_APRESENTACAO_DIRETORIA.html`), que estava fora do git desde 07/ago.
  > **Os itens abertos abaixo continuam abertos**; o que acabou foi a árvore
  > separada, não o trabalho. Daqui em diante esta frente anda na árvore principal.
  📖 **Visão consolidada do processo: `DSS_PROCESSO_DESENVOLVIMENTO_ASSISTIDO.md`** (fronteira Descoberta+Solução =
  como a spec nasce / Entrega = onde o DSS entra; divisão analista×designer; o que roda hoje; limites; medição).
  Contexto: as frentes do DSS governam o *componente*; **nada governava a implementação**. Causa de origem: D4
  do blueprint tirou `purpose.*`/`examples[]` do contrato (correto — proveniência não certificável), mas a
  orientação de uso não entrou em nenhum lugar com gate.
  - ✅ **(1) `ui-rules.schema.json` ressuscitado** — de 28/abr a 05/ago/2026 sem consumidor algum (forense de git:
    o schema nasceu 1 mês ANTES do MCP; os planos das Fases 1–4 do MCP nunca o citaram; `DSS_UI_RULES.md` §3.2
    declarava o consumo no presente como fato consumado). Agora tem consumidor real: tool **`validate_composition`**
    (9 regras: vocabulário DSS, allowed/forbidden children, forbidden_contexts, auto-aninhamento, Matryoshka,
    required_props, estados de dados, densidade de formulário). Schema → v1.2.0 (`applies_to`/`field_components`:
    as regras de tela existiam sem dizer a QUEM se aplicam, logo eram inexecutáveis). **Anti-apodrecimento:** nada
    transcrito para constante — vocabulário existence-checked a cada chamada contra o catálogo real e a escala real
    de spacing; resultado em `schemaIntegrity`. Reproduz o NC-03 do stress test (`<q-checkbox>` cru) sozinho.
  - ⏳ **Pendente decidir: gate de pre-commit** para `schemaIntegrity` (hoje o schema só se anuncia se alguém
    CHAMAR a tool — é o mesmo modo de falha que o matou). Único ponto que fecha o anti-apodrecimento de vez.
  - ✅ **(2) Ontologia de funcionalidade** — `DSS_ONTOLOGIA_FUNCIONALIDADE.md` + `dss.ontology.json` (v0.1.0,
    27 entidades, 83 campos, **27/27 com `evidencia`** apontando spec real). Derivada de RF-0292D (SPC/Serasa,
    692 linhas). **Método: descrever, não inventar** — entidade sem evidência não entra; lacuna só entra
    verificada por busca negativa (grep=0), não por impressão. **`regime` é o conceito central** (obrigatorio/
    recomendado/**horizonte**): reconcilia o que a produção Sansys faz HOJE com o alvo do DSS. **Acessibilidade
    = `horizonte` por decisão explícita do dono (ago/2026)** — registrada como débito, NUNCA reprova a spec;
    NÃO afrouxa a Constituição #4, que segue vinculante no nível do COMPONENTE. Achados: a spec é BOA (escopo
    negativo, 41 BDD Gherkin, 40 CA) — as lacunas são do **template**, não do analista (não há campo para
    estado vazio/carregando/erro, texto de mensagem, volume, responsividade); §2.4 "Elementos a preservar" é a
    árvore de composição escrita em prosa (input direto da `validate_composition`); §2.4 manda reprototipar "no
    padrão do sistema" **sem citar o DSS**; o checklist exige inferir a convenção de tachado (não é legível por
    máquina). **v0.2.0 revalidada contra +2 specs** (#85505 fiscal/Water, #33950 jurídico/Rio — autores e módulos
    distintos): 33 entidades, 97 campos, 33/33 com evidência. Aprendizado central: **NÃO existe template único**
    (3 specs = 3 formatos) → criado o conceito de **`genero`** e regimes `condicional:genero`; exigir a estrutura
    da RF-0292D reprovaria a #33950 por ~15 seções. Rebaixados: `cenario` e `criterio_aceite` (Gherkin 82/18/**0**;
    CA 40/sim/**0**) e `estoria.para` (Como/Quero/Para só existe na 0292D). Novas: `maquina_estado` (promovida — o que
    mais governa tela nas 3), `rastreio` (melhor prática da amostra: #33950 amarra 12 requisitos à estória),
    `contexto_negocio` ('Premissas' tem 2 semânticas), `integracao`, `parametrizacao` (tela com flag por cliente tem
    DUAS composições; a spec descreve uma), `historico_documento`, `regra.motivo`. **Lacunas confirmadas SISTÊMICAS
    (0 em 3/3):** estado vazio · carregando · volume · **acessibilidade** (os hits eram falsos positivos — base64 e a
    palavra 'gost*aria*'). Mensagem: 22 menções somadas, **nenhuma** redige texto final ou diz o veículo. **Handoff de
    design estruturalmente vazio:** §2.4 da #85505 é cabeçalho SEM CONTEÚDO; a da 0292D manda reprototipar 'no padrão
    do sistema' sem apontar nada; a #33950 dá 40 imagens. **O DSS não é citado em nenhuma das 3.** ⚠️ Amostra=3 fecha
    o sistêmico vs individual, mas não `cardinalidade` nem o número de gêneros. 'modal×tela' NÃO se repetiu (é da 0292D).
  - ✅ **(3) Portão de prontidão da spec** — `scripts/emit-spec.mjs` + tool MCP **`validate_spec_readiness`**.
    **DERIVADO, nunca autorado (D1):** lê o markdown que o analista JÁ escreve; ele não redige nenhum JSON —
    era a mudança cultural que encontraria resistência. Detecta o `genero` e só cobra o que aquele gênero exige
    (a #33950 não é reprovada por não ter critério de aceite). Reporta por regime: bloqueantes · recomendados ·
    **horizonte (acessibilidade, nunca reprova)**. A tool DELEGA ao emissor em vez de reimplementar as regras —
    duas fontes de verdade divergiriam em silêncio. **Enquadramento:** Descoberta+Solução são construção conjunta
    designer+analista, então o relatório NÃO fiscaliza ninguém — diz à DUPLA quando a spec pode atravessar para a
    Entrega. **Verificado nas 3 specs reais:** todas `incompleta`, com as mesmas 5 lacunas bloqueantes.
    ⚠️ **Mecanismo de controle provou seu valor na 1ª execução:** o padrão de controle `deverá` deu 0 nas 3 specs
    porque `\b` em JS deriva de `\w` = `[A-Za-z0-9_]` e **não casa depois de letra acentuada** — sem os controles,
    um regex quebrado teria APROVADO as 3 em silêncio. Veredito `inconclusivo` ≠ aprovação.
    **Limites declarados:** verifica completude/coerência estrutural, NUNCA correção de regra de negócio; entidades
    semânticas (campo, comando, `maquina_estado`) não são extraídas — exigem leitura de significado, que é parecer
    probabilístico (item 5) e por isso não vira gate.
  - ⏳ **Pendente decidir: o portão entra em pre-commit/CI?** Hoje roda sob demanda (`npm run spec:check`). Specs
    vivem fora do repo (Desktop/Confluence), então o gate natural não é o pre-commit do DSS — é a superfície do
    item 4.
  - 🟡 **(4) Superfície onde o analista escreve — METADE entregue.** ✅ **Template:** `DSS_SPEC_BLOCO_INTERFACE.md`
    — uma seção **§2.5 Interface**, dona = **designer**, que entra AO LADO do que o analista já escreve (não desloca
    nada). 7 campos: superfície · estados de dados · mensagens (texto exato + veículo) · volume · responsividade ·
    acessibilidade (horizonte) · elementos a preservar. **Laço fechado e verificado:** RF-0292D real + §2.5 preenchida
    → portão vira `incompleta` (5 bloqueantes) em **`pronta`**; as 3 specs originais seguem `incompleta` (sem aprovação
    falsa). Fechar o laço expôs divergência template↔portão: o detector de volume não reconhecia a redação do PRÓPRIO
    template ("Máximo esperado: N") — corrigido no `emit-spec.mjs`. ⏳ **Integração (validar na ferramenta) BLOQUEADA
    por fato desconhecido:** as 3 specs têm assinatura de exportação **Google Docs → Markdown** (imagens em referência
    + base64 no rodapé, escapes de ponto, pseudo-cabeçalhos em negrito), mas isso é INFERÊNCIA — falta confirmar onde
    o analista escreve de fato, quem administra e se a organização autoriza integração. Existe MCP de Google Drive
    disponível, não testado. **Não construir integração para ferramenta suposta.**
  - 🔜 ✅ **(5) Parecer semântico — ROTEIRO, não gate.** `scripts/spec-parecer.mjs` + tool
    **`request_spec_parecer`** + `npm run spec:parecer`. **Decisão de arquitetura: o DSS NÃO chama LLM.** O MCP não
    faz chamada de rede alguma e o `MCP_READ_ONLY_CONTRACT` §3 exige que ele "observe e explique, nunca decida" —
    juízo probabilístico embutido o tornaria criativo/não-reprodutível e daria à opinião aparência de veredito da
    ferramenta. Divisão: **DSS monta o roteiro (determinístico) · agente responde (juízo) · humano confere**.
    8 perguntas que busca textual não alcança: contradição interna · referência órfã · cobertura regra↔cenário↔CA ·
    vagueza que decide comportamento · termo inconsistente · estado sem transição · caminho infeliz sem contrapartida ·
    escopo negativo furado. **Disciplina anti-achismo:** toda observação exige **citação literal** (mesmo princípio do
    `verifiedBy`) — sem âncora é opinião e se descarta; com âncora o humano confere em segundos. O roteiro **importa
    o resultado do portão e manda NÃO repetir** o que já foi apontado por ausência. Verificado: `isGate:false`, sem
    campo de veredito, exit 0 sempre, portão inalterado. **Dogfood — achado real e novo (fora dos exemplos de
    calibragem):** na RF-0292D, BDD07 (lote somente-leitura: Enviado/Negativado/Cancelado) e BDD08 (lote editável:
    Em Análise/Neg. Aprovada/Neg. Reprovada) **não cobrem "Pendente"**, que consta na lista de status (BDD10, CA11) —
    a spec não diz se um lote Pendente abre travado ou editável. ⚠️ **Limite estrutural:** parecer pode errar; ausência
    de observação NÃO significa spec correta. ·
    **(6) MCP servido a ferramentas externas — PRÉ-REQUISITOS FEITOS, hospedagem
    pendente.** A descrição "transporte pronto, falta hospedar" era otimista: o transporte funciona (via `/mcp`,
    protocolo MCP real, 15/15 tools respondem), mas expor exigia 4 correções, TODAS feitas e verificadas:
    (a) **`/tools` mentia** — array escrito à mão que já driftou (anunciava 13; servidor registrava 15, faltando
    `validate_composition` e `validate_spec_readiness`). Agora deriva de `TOOL_DEFINITIONS`;
    (b) **leitura de arquivo arbitrário** — `validate_spec_readiness` aceitava QUALQUER caminho absoluto; hospedado
    = ler `/etc/passwd`. Servidores HTTP marcam `DSS_MCP_REMOTE=1` e caminho fora da raiz é recusado;
    (c) **remoto era inútil** — o `.md` do analista não existe no servidor. Adicionado `specContent` (+ `--stdin` no
    emissor, mantendo fonte única). Verificado: 24 KB por HTTP → veredito correto;
    (d) **tool de ESCRITA exposta sem auth** — `record_audit_event` grava no `dss.meta.json`. **Comprovado na prática:
    um teste meu MUTOU o `dss.meta.json` do DssButton via HTTP não autenticado** (revertido). Agora: Bearer opcional
    (`DSS_MCP_TOKEN`, `/health` livre) e a escrita se RECUSA em modo remoto sem token.
    ✅ **Empacotamento portável pronto:** `packages/mcp/Dockerfile` + `.dockerignore` + **`DSS_MCP_DEPLOY.md`**.
    **O plano Fase 4 tratava o MCP como stateless e ELE NÃO É** — as tools leem o repo em runtime (docs/, components/,
    tokens/, scripts/): **~18 MB viajam com o código**; sem eles o servidor sobe, responde /health e TODA tool devolve
    "não encontrado" (falha que parece sucesso). Imagem multi-stage, usuário não-root, `DSS_MCP_REMOTE=1` fixo.
    **`/health` agora carimba `content.sha` + `builtAt`** — MCP defasado mente com confiança; agora a defasagem é
    visível (comparar com HEAD da main) → **deploy precisa ser automático a cada merge**. ⚠️ **Docker não existe no
    ambiente: a imagem NÃO foi construída.** Verificado: todo `COPY` existe · ontologia sob docs/ acompanha · /health
    novo responde · comando do HEALTHCHECK retorna 0. Primeiro `docker build` pode exigir ajuste no `npm ci` com
    workspaces. ⏳ **Falta:** escolher ONDE hospedar — infra, não código; 3 perguntas em `DSS_MCP_DEPLOY.md` §6
    (padrão de nuvem Veolia? internet+token ou rede interna? quem opera?). **Item 4 (add-on no Google Docs) DEPENDE deste**: Apps Script não roda Node, então validar
    dentro do Docs exige endpoint hospedado — senão duplicaria as regras. · **(7) sinais de
    runtime** (depende dos times de produto). Refs.: `DSS_BLUEPRINT_CADEIA_FONTE_UNICA.md` §D4 + §4.2 ·
    `DSS_OBSERVABILITY_SIGNALS.md` (v0.1, 6 sinais especificados e **não instrumentados**) · `RELATORIO_STRESS_TEST_FASE3.md`.

- 🟡 **Visual Height do DssInput (issues #3/#4)** — auto-height do Quasar: label ~2.5px fora do centro em
  repouso (#3); com valor, a label flutuante **sobrepõe** o valor centralizado no native (#4). Tensão:
  altura compacta (zero padding vertical) × reserva de topo p/ label flutuante. `[[project_visual_height_propagacao]]`.
- 🟡 **Propagação CSS→meta — lotes 2–6** — catálogo com 38 divergências de *value* + 6 dimensionais
  pendentes (`sync-token-values.js`). Mesma fonte acima.
- 🟡 **`--dss-text-secondary` reprova AA** — `#B0B0B0` ≈ 2.6:1, sistêmico. DssInput já migrou p/ gray-600
  no label; **demais componentes ainda usam o token frouxo**. → **tratar junto com (c1)** (mesmo tema).
- 🟡 **Gate a11y — verificação de âncora é COARSE em `aria`/`test`** — descoberto no teste de fluxo do
  DssUploader (2026-07). `verifiedBy: "css"` (contraste/focus) é **calculado de verdade** pelo wcag-kit;
  mas `verifiedBy: "aria"` passa só por existir prop `aria*`/`required`, e `verifiedBy: "test"` passa só
  por existir `*.test.js` — **presença, não que o teste exerça o claim**. Logo o "impossível escrever p/
  passar" vale **plenamente só para `css`**; `aria`/`test` são gameáveis. (O executor cobriu por honestidade
  — não declarou 2.1.1/teclado porque o teste não exercita.) **Decisão futura:** endurecer (aria→checar
  atributo no DOM renderizado; test→casar o critério a um `it()` nomeado) ou aceitar como presence-gate assumido.
- 🟡 **DssUploader disabled usa `opacity: 0.4` (não o padrão cor-based F1)** — escalado, não forçado. Seguro
  AQUI (Quasar `.q-uploader--disable` só aplica `pointer-events:none`, sem empilhar → não ocorre o 0.24 do F1),
  mas não é o padrão. Migrar = redesenho multi-camada num componente selado → decisão humana. `[[project_adequacao_ui_recorrencias]]`.
- 🟡 **Composto com `classification`-objeto precisa `meta.category` no top-level** — o emissor lê
  `meta.category` (raiz); na convenção antiga de composto a `category` fica DENTRO do objeto `classification`.
  Ao emitir contrato dos próximos compostos, **promover `category` para o topo** (senão `--write` dá gap).
- 🟡 **Focus ring ausente no CSS próprio — de 6 sobrou 1** (reverificado 2026-08-11, direto no SCSS).
  Checkbox, Radio e Toggle declaram `outline: … var(--dss-focus-primary)`; Range e Slider usam
  `box-shadow: var(--dss-shadow-focus)`. **Só o `DssField` segue sem anel próprio** — tem apenas
  `.dss-field--focused` na variante `outlined`, que é classe de estado do Quasar e não `:focus-visible`.
  Risco WCAG 2.4.7 restrito a ele. **Onda Higiene.** `relatorios/CONTRATOS_FORM_INPUT.md`.
  *(A ser confirmado no Range/Slider: se o `box-shadow` está de fato preso a `:focus-visible` e não a
  `:focus` — a distinção importa para não exibir anel em clique de mouse.)*
- 🟡 **Higiene `!important` — estados não-default** — disabled/erro/hover reais não são validáveis na
  sandbox (injeção sintética de classe Quasar dá artefato). Risco residual baixo. `[[project_important_audit]]`.
- 🟡 **`tokens/brand/index.scss` = código morto (T4)** — ~149 `!important` inócuos (arquivo não importado)
  + feature de override local de marca parcialmente entregue. T4 BLOQUEADO (limpar seria maquiagem).
  Alerta em `ALERTA_BRAND_INDEX_NAO_IMPORTADO.md`. `[[project_brand_index_dead_code]]`.

- ⏳ **DECISÃO EM ABERTO: a escala de tonalidade de marca (`--dss-brand-*`) deve ser cabeada?**
  (levantado 2026-08-13, a partir de observação do dono durante o DssChip). **Existem DUAS famílias de
  token de marca, com significados diferentes**, e só uma está viva:
  | Família | `secondary` sob Hub | Significado |
  |---|---|---|
  | `--dss-action-*` | `--dss-secondary` (verde-azulado) | outra MATIZ, com carga semântica própria |
  | `--dss-brand-*` | `--dss-hub-300` (#fbcb76) | MESMA matiz da marca, outra luminosidade |
  - **Estado real medido:** `--dss-brand-{secondary,tertiary,accent}` têm **ZERO consumidores** em todo
    o `packages/core` — definidos nas três marcas, ninguém lê. `--dss-brand-primary` é consumido, mas só
    em `themes/` para alimentar `--quasar-primary`. Ou seja: **a escala está especificada e não cabeada**,
    mesma natureza da entrega parcial do item acima.
  - ⚠️ **CUSTO DURO da adoção (calculado, não estimado).** Se o `filled` passasse a usar a escala com
    texto branco, **6 dos 9 casos reprovam AA** — porque 300 e 400 são tons claros:

    | | secondary (300) | tertiary (800) | accent (400) |
    |---|---|---|---|
    | Hub | **1,51:1** ❌ | 6,52:1 ✅ | **1,94:1** ❌ |
    | Water | **1,88:1** ❌ | 9,02:1 ✅ | **2,63:1** ❌ |
    | Waste | **1,60:1** ❌ | 8,14:1 ✅ | **2,08:1** ❌ |

    Só os `tertiary` (800) passam. Adotar exigiria **inverter o texto para escuro** nos tons claros —
    isso é redesenho da variante, não troca de token. Some-se que as três cores passariam a ser tons da
    MESMA matiz, perdendo a distinção semântica entre elas.
  - **Nada do que está no DssChip depende disto**: ele consome `--dss-action-*`, a família viva. A decisão
    é de sistema (todos os componentes), não do chip.
  - 🔲 **Decidir:** (a) cabear a escala e redesenhar o contraste das variantes claras; (b) manter
    `--dss-action-*` como única via e **remover** `--dss-brand-{secondary,tertiary,accent}`, que hoje só
    sugerem uma capacidade inexistente; (c) manter como está, documentando que são reserva de futuro.

- ✅ **Ponto cego do gate de tokens fantasma — FECHADO** (2026-08-13). O `validate-scss-tokens.cjs` varria
  só `components/`; `themes/` e `tokens/` nunca foram olhados, então o baseline "vazio = qualquer fantasma
  bloqueia" cobria menos do que o nome sugeria. Descoberto via `--dss-brand-primary-hover` (consumido em
  10 lugares de `themes/`, nunca definido — nem no `dist/style.css`; os arquivos de marca definem
  `--dss-brand-hover`, sem o `primary-`). Escopo estendido aos três diretórios + gatilho do pre-commit
  ampliado para `themes/` (sem isso o gate só rodaria por acaso, quando um `.scss` de componente caísse
  no mesmo commit — foi assim que o fantasma sobreviveu).
  - **Baseline agora é POR ESCOPO.** Uma lista plana de nomes faria com que perdoar um fantasma em
    `themes/` o perdoasse também em `components/`, diluindo a garantia de baseline vazio conquistada em
    `b49b6e0`. **Controle negativo verificado:** injetando `--dss-touch-target-min` (baselinado em
    `themes/`) num componente, o gate reprova com exit 1 e rotula `(20× · components)`.
  - 🟡 **Débito novo rastreado: 35 fantasmas em 82 referências** (20 em `utils/`, 11 em `themes/`,
    4 em `tokens/`). Baselinados, não corrigidos — porque **corrigir não é trocar o nome do token**,
    ver abaixo.
  - 🔴 **`utils/` era um QUARTO ponto cego — e o pior deles.** Incluído na mesma onda, revelou **20
    fantasmas**. O caso emblemático: o mixin `dss-touch-target` (`utils/_mixins.scss:63`) tem os **três**
    ramos apontando para tokens inexistentes — `'min'`, `'ideal'` e `'large'`; só a escala `-{xs..xl}`
    existe. **O mixin nunca funcionou.** Mitigante: nenhum componente o invoca — as 3 chamadas vivem
    dentro do próprio `utils/` (`_helpers.scss:311,315` · `_mixins.scss:143`), então o estrago é contido.
    Também reapareceu ali `--dss-focus-ring` (1×), o fantasma de a11y que a onda `b49b6e0` zerou em
    `components/` (27 usos) — `utils/` ficou para trás por estar fora do escopo.
    ⚠️ **VERIFICADO (2026-08-14) — `utils/` NÃO é código morto. A hipótese anterior estava errada**
    (eu havia escrito "majoritariamente código morto"; não é). Medido compilando o fonte atual, porque
    o `dist/style.css` está **defasado desde 25/jun** e mostrava o estado *anterior* ao `b49b6e0`:
    - **Vivo:** importado por `packages/core/index.scss:10` (entry point) **e por 18 SCSS de componente**.
      Cinco arquivos emitem CSS que **chega ao bundle** — `_helpers`, `_colors`, `_colors-hover`,
      `_border-helpers`, `_layout-helpers` (todos os seletores amostrados presentes). Dois mixins são
      load-bearing: **`dss-focus-ring` (16 usos)** e **`dss-transition` (16 usos)**.
    - **Morto:** `_example-showcase.scss` (0/6 seletores no bundle) — e morto **de propósito**, o
      `utils/index.scss` documenta que ele fica fora para não levar CSS de demo à produção.
    - **Morto por símbolo:** **12 dos 16 mixins têm ZERO uso externo**, incluindo o quebrado
      `dss-touch-target`. Usados: `dss-focus-ring`, `dss-transition`, `dss-button-variant` (1),
      `dss-card` (1), `dss-visually-hidden` (1).
    - 🔴 **27 declarações QUEBRADAS chegam ao CSS de produção** (contadas no bundle compilado agora):
      `--dss-touch-target-min` 19× · `-ideal` 4× · `--dss-touch-spacing-min` 2× · `--dss-border-error`
      e `-success` 2×. Destas, **4 são classes utilitárias públicas de `utils/_helpers.scss`** —
      `.dss-touch-target`, `.dss-touch-target-ideal` e seus `::after`: **quem aplicar
      `class="dss-touch-target"` não recebe nada.** O resto vem de `themes/` (`.q-btn`, `.q-tab`,
      `.q-item`, `.q-chip`, `.dss-pagination__item`, `.dss-sidebar-accessible …`).
    🔲 **Decidir, agora com base medida:** as 4 classes utilitárias públicas quebradas são o alvo de
    maior valor (baixo risco, some código que promete e não entrega). Os 12 mixins sem uso são candidatos
    a remoção, não a conserto — consertar símbolo sem consumidor é maquiagem (o erro já evitado no
    `brand/index.scss`, T4 BLOQUEADO).

- 🟡 **`dist/style.css` DEFASADO ~2 meses** (25/jun contra commits de ago) — descoberto ao investigar
  `utils/`. Quem inspecionar o `dist` lê o estado **anterior** ao `b49b6e0`: ele ainda mostra
  `--dss-focus-ring` 27×, o fantasma de a11y já zerado no fonte. Não é bug de código, é artefato de
  build versionado e não regenerado. **Decidir:** regenerar no CI a cada merge, ou parar de versionar o
  `dist` (o mesmo raciocínio já aplicado ao `build/` do MCP em `47a8182`).

- 🟡 **Estilo de componente morando em `themes/`** — achado de passagem: `.dss-pagination` e
  `.dss-pagination__item` são declarados em `themes/_quasar-utilities.scss:494`, **não** nas 4 camadas do
  DssPagination (o SCSS do componente não tem nenhuma regra para eles). Fere o Cartão Base e explica por
  que um fantasma de `themes/` aparece pintando classe de componente. Verificar se há outros casos ao
  passar por cada componente na onda de adequação.
    - ✅ **Divergência 48px × 44px — RESOLVIDA na fonte normativa** (2026-08-13). A Constituição #4 do
      `CLAUDE.md` exigia "≥ 48px", valor que **não existe na escala** (32/36/44/52/64) e que vinha do
      Material, não do WCAG. Os componentes sempre entregaram 44px (`--dss-touch-target-md`), e a
      divergência estava mascarada por comentários `/* 48px */` escritos ao lado do token de 44.
      **A decisão já existia:** o selo do DssInput registrava como risco **R-04** que "governança definiu
      44px" e pedia "alinhamento de CLAUDE.md na próxima revisão normativa" — ação que nunca ocorreu.
      Agora: `CLAUDE.md` corrigido para 44px + **19 citações do token fantasma e 46 valores `48px`**
      corrigidos em Checkbox/Radio/Toggle/Chip (`.md`, `README`, `_base.scss`), mais **10 citações e 11
      valores nos SELOS** desses quatro — eram afirmação falsa em documento de certificação.
      ✅ **Varredura estendida (2026-08-13):** `DSS_CATALOG_2026.md` · `dss_system_handoff_v_2.md` ·
      e os **5 normativos de Nível 1/2** — `DSS_TOKEN_REFERENCE` (7), `DSS_COMPONENT_ARCHITECTURE` (20),
      `DSS_ARCHITECTURE` (6), `DSS_IMPLEMENTATION_GUIDE` (23), `DSS_UI_RULES` (1). Estes eram os que
      mais importavam: são o que o agente lê ao **criar componente do zero**, e ensinavam
      `@include dss-touch-target('ideal')` — o mixin que nunca funcionou.
      - **Não foi busca-e-troca.** Dos 11 hits do TOKEN_REFERENCE, **4 eram 48px legítimos**
        (`--dss-spacing-12`, `--dss-layout-header-height-dense`, `--dss-icon-size-xl`,
        `--dss-switch-track-width-sm`) e ficaram. Vários exemplos tinham `min-height: 48px` **hardcoded**,
        violando Token First — passaram a usar o token.
      - **Correção de norma, não só de número:** `DSS_UI_RULES` afirmava "48x48px (WCAG 2.5.5) **ou**
        44x44px (WCAG 2.1 AA)" — duplamente errado. 44×44 é o WCAG **2.5.5**, nível **AAA**; o WCAG 2.1
        **não tem** critério de alvo em AA (o 2.5.8, 24×24 em AA, é do WCAG 2.2); e 48px é Material, não
        WCAG. Mesma imprecisão corrigida em `--dss-min-h-md`, que é 48px legítimo (piso do **MD3**) mas
        se anunciava como "piso MD3/**WCAG 2.5.5**".
      - **Cadeia respeitada:** a descrição de `--dss-min-h-md` vive em `tokens/semantic/_dimensions.scss`
        e alimenta tabela AUTO-GENERATED; corrigi na **fonte** e rodei `sync:tokens-to-reference`.
      🔲 **Sobra:** selos de outros componentes (DssBar, DssItem, DssFab, DssExpansionItem,
      DssChatMessage, DssSlideItem), `pre-prompts/`, `audit-prompts/` e `specs/`. `docs/archive/` e
      `docs/audits/` **não** devem ser reescritos — são registro do que se acreditava à época.
    - 🔴 **`--dss-touch-target-min` (19 usos) — guarda de WCAG 2.5.5 que NUNCA funcionou.** A escala real
      é `xs/sm/md/lg/xl` (o mínimo WCAG de 44px é o `md`); `-min` não existe. Logo
      `.q-btn { min-height: var(--dss-touch-target-min) !important }` é **no-op**. ⚠️ **Apontá-lo para
      `--dss-touch-target-md` não é cosmético: passaria a aplicar `min-height: 44px !important` em TODO
      `.q-btn`**, mudando altura em cascata no sistema inteiro. Exige decisão + verificação visual ampla.
    - ✅ **`--dss-input-height-min` — RESOLVIDO** (2026-08-13), o bug de
      `[[project_qfield_height_token_bug]]`, que até agora não tinha gate. **A regra foi REMOVIDA, não
      reapontada.** Medido `min-height: 0px` no navegador: o `!important` nunca aplicou nada, então
      remover não mudou pixel algum — Select 54 campos (38–48px), Textarea 52 (36–122), File 49 (36–69),
      idênticos antes e depois. ⚠️ **Não apontar para `--dss-form-control-height-md` (44px)**: isso a
      tornaria viva e forçaria 44px em todo `.q-field__control`, atropelando a escala densa que o próprio
      DSS oferece (`-xs` 32px, `-sm` 36px) — os 4 campos hoje em 36–38px são exatamente as densas.
      O comentário `KEEP: load-bearing` que a acompanhava era falso e saiu junto. *(Nota: DssInput foi
      reconstruído com DOM próprio — `dss-input__control` — e não passa por `.q-field`; o alcance da regra
      era só Select/Textarea/File.)*
    - Demais: `--dss-brand-primary-hover`, `--dss-{button,input}-padding-{x,y}`,
      `--dss-radius-{button,input,card,modal}`, `--dss-touch-target-ideal` (themes) e
      `--dss-opacity-{8,12,16,24}` (tokens — quebram a cadeia de `--dss-opacity-brand-*`).

- 🟡 **Decisão: label flutuante vs estática** — Material (flutuante, atual) vs shadcn/Make (estática acima).
  Usuário optou por **manter flutuante por enquanto**. `[[project_make_vs_dss_contrato_visual]]`.
- 🟡 **Consolidação documental (5→1)** — `COMPONENT_PAGE_STRUCTURE` já absorve 5 docs; **remoção física**
  dos superados é etapa pós-POC, ainda não executada. `[[project_sandbox_source_of_truth]]`.
- 🟡 **`example.vue` non-normativos (90)** — rotular como demo ilustrativo (item M do blueprint); backfill
  de prosa verificável (a11y) por componente é parte de (a). `[[project_sandbox_source_of_truth]]`.
- 🟡 **Adequação LLM-eficiente dos 4 docs-gigantes de referência** — `DSS_IMPLEMENTATION_GUIDE` (3059 linhas),
  `DSS_TOKEN_REFERENCE` (2338), `DSS_COMPONENT_ARCHITECTURE` (2084), `DSS_ARCHITECTURE` (1591) carregam o vício
  de acreção/lista-plana que o CLAUDE.md já superou. **Fora do caminho crítico da adequação de base** (o Roteador
  manda o agente ao checklist de 208 linhas, não a eles) — mas **tratar ANTES de reabrir "criar componente do
  zero"**, que é quando o agente realmente os lê. Ref.: `PROPOSTA_READEQUACAO_CLAUDE_MD.md` (mesma tese: núcleo
  enxuto + gates + índice para lookup). `[[project_claudemd_higiene]]`.

- 🔴 **Eixo visual da adequação — cobertura muito abaixo da regra** (medido 2026-08-11). O
  `DSS_UI_ADEQUACAO_CHECKLIST.md` exige, por componente adequado, **página Playground**
  (`apps/sandbox/src/Test‹Nome›.vue`) **e** **Preview Frame** registrado — é o que torna possível a
  análise visual, o passo que FECHA a adequação. Estado real:
  - **Página Playground: 13 de 76** componentes base *(+DssChip, `97c517e`)*.
  - **Preview Frame: 11** registrados (Input, Select, Textarea, Field, File, Checkbox, Radio, Toggle,
    Uploader, MultiselectAutocomplete, **Chip**).
  - Não é dívida de um componente: é a regra valendo só onde a adequação já passou. **Cada componente
    adequado daqui em diante entra com os dois** — e a fila de não-adequados carrega o resto.
  - ⚠️ **Sem gate automatizado.** Hoje é item de checklist marcado à mão. Um gate desses reprovaria 64/76
    de saída, então precisaria de baseline/ratchet como o de tokens fantasma. **Decisão pendente:**
    construir o ratchet ou manter curadoria manual.
  - ⚠️ **Não chamar esse gate de `validate:portal-pages`** — o nome JÁ EXISTE e significa outra coisa:
    `scripts/validate-portal-pages.cjs` (no pre-commit, §3c) valida as páginas **React do docs-portal**
    (`apps/docs-portal/src/pages/components/‹Comp›Page.tsx`) para componentes **SELADOS**. Eixo diferente
    (portal ≠ sandbox; selado ≠ adequado). Um gate do eixo visual precisa de outro nome
    (ex.: `validate:sandbox-pages`), senão colide.

- ✅ **`modelValue` não admitia os valores de `trueValue`/`falseValue` — RESOLVIDO** (`17715e9`,
  2026-08-11) em **DssCheckbox E DssToggle** — a verificação pedida confirmou que o Toggle tinha o mesmo
  defeito. Tipo alargado para `any`, espelhando o Quasar (`model-value`: `Any | Array`); o **DssRadio já
  era `any`**, então o fix alinhou a família ao irmão. Não-breaking (só admite mais).
  **Nuance que vale reter:** o comportamento sempre esteve correto — os testes já exerciam
  `modelValue: 'no'` + `trueValue: 'yes'` e **passavam**, porque Vue warn não reprova o vitest. O defeito
  era só o runtime check que o compilador do Vue deriva do tipo. Por isso o teste de regressão asserta
  sobre o **warn** (`console.warn` espiado, filtro `Invalid prop`), não sobre o comportamento — com
  controle negativo verificado. Console real conferido no sandbox: zero warn.
  ⚠️ **Padrão a generalizar:** qualquer prop tipada estreita cujo valor venha de outra prop `any`
  (`val`, `trueValue`, `falseValue`, `indeterminateValue`) tem esse mesmo risco. Vale varrer a base na
  Onda Higiene — o sintoma é silencioso em teste e só aparece no console.

- ✅ **`leftLabel` não funcionava em DssRadio e DssToggle — RESOLVIDO** (`64cf911`, 2026-08-11). A label
  seguia à direita. Causa: **dupla-inversão** — o template já renderiza a label ANTES do controle quando
  `leftLabel=true`, e o CSS revertia de novo com `flex-direction: row-reverse`. Duas inversões se
  cancelam. **O DssCheckbox já tinha corrigido isso** e carrega o comentário de aviso no `_base.scss`;
  Radio e Toggle nasceram com a regra CSS e ganharam a inversão no template depois. O comentário foi
  replicado nos dois para o próximo da família não reintroduzir.

- 🔴 **MODO DE FALHA RECORRENTE DE TESTE: asserção sobre PROXY, não sobre RESULTADO** (2 casos em
  2026-08-11, vale varrer na Onda Higiene). Os dois defeitos acima tinham teste passando:
  - `leftLabel`: o teste afirmava `classes()).toContain('dss-*--left-label')` — a **classe aplicada**,
    não a **ordem real**. A classe existia; o layout estava errado.
  - `modelValue`: o teste exercia o valor customizado, mas Vue warn não reprova o vitest.
  **Regra prática:** asserte o efeito observável (ordem no DOM, o warn, o atributo final), não o
  intermediário que você mesmo produziu. **Limite honesto a respeitar:** jsdom não aplica SCSS — defeito
  que mora só no CSS (como o `row-reverse`) **não é capturável em teste unitário**; quem o pega é o
  `dss.contract.json` (derivado do SCSS, versionado → aparece no diff) e a verificação visual. Isso
  reforça o item do eixo visual acima: ele não é redundante com os testes, cobre o que eles não alcançam.

- 🟡 **Contrato visual do DssToggle MUDOU** (2026-08-12) — reformulação aprovada pelo dono para alcançar a
  qualidade visual do QToggle **com tokens DSS**. Fonte: `node_modules/quasar/src/components/toggle/QToggle.sass`
  (v2.19.3), lida direto em vez do site. O que mudou:
  - **Proporção:** o thumb passou a ser MAIOR que a espessura do trilho (md: 20px sobre 14px, 1:1,43 — a
    razão exata do Quasar). Antes era 16px dentro de um trilho de 20px. Vale nas 5 variantes (1,33–1,50).
    A altura visual do componente virou a do thumb, que coincide com o control do DssCheckbox → o
    alinhamento em linha de formulário se preservou.
  - **Trilho:** de sólido `surface-muted` + borda 2px para **translúcido** via `color-mix` (40% desligado,
    55% ligado), sem borda. `opacity` não serviria: no DSS o thumb é FILHO do trilho (no Quasar são irmãos).
  - **Thumb:** ganhou elevação (`--dss-shadow-sm`) e **inverteu a lógica de cor** — branco no desligado,
    sólido na cor no ligado (antes: cinza no desligado, branco no ligado).
  - **Hover:** o `filter: brightness(0.95)` no trilho saiu; entrou halo no THUMB (anel translúcido de meio
    thumb via `box-shadow`, dobrando o diâmetro aparente). Feito com sombra e não com pseudo-elemento
    porque `::before` é reservado ao touch target e um `::after` pintaria por cima do próprio thumb.
  - ⚠️ **`4-output/_brands.scss` do Toggle foi esvaziado** (o arquivo permanece pela arquitetura de 4
    camadas). As regras de lá pintavam o trilho SÓLIDO e, por especificidade, venciam a L2 nova — além de
    cobrirem só 3 das 8 cores. A cor de marca já chega pela L2 via `--dss-action-*`, que é brand-aware.
    **O mesmo esvaziamento cabe em DssCheckbox e DssRadio** (lá é só redundância, não conflito) — pendente.
  - 🔍 **`DSS_VISUAL_DEFAULTS_STANDARD.md` NÃO EXISTE** e é citado como autoridade em 4 arquivos SCSS
    (DssButton ×3, DssToggle ×1). O `PROMPT_DIRECIONADOR_CONSOLIDACAO_CONTRATO_VISUAL.md` previa mesclá-lo
    no canônico e arquivar, e a referência ficou pendurada. **Decidir:** recriar, ou reapontar as 4 citações
    para o doc que absorveu o conteúdo.

- 🟡 **Meio pixel: `line-height` sem unidade gera altura FRACIONADA e desalinha controle circular**
  (achado 2026-08-12, investigando "o ponto do DssRadio está torto"). **A geometria do componente estava
  exata** — a 5× de zoom os círculos são concêntricos e redondos em todos os tamanhos, e o ponto centra em
  offsets inteiros. O artefato era de **rasterização**: a página do playground posicionava as linhas em
  Y fracionado (`.875` numa seção, `.188` noutra), e círculo em meio pixel antialiasa torto. Isso explica a
  anomalia que abriu o caso: SM e MD têm o MESMO tamanho e pareciam diferentes — estavam em **fases
  sub-pixel diferentes**.
  - **Origem:** `line-height: 1.2` hardcoded no `pg-section__title` (16px × 1,2 = 19,2px). A fração subia
    pelo cabeçalho da seção e empurrava tudo abaixo. Corrigido para `--dss-line-height-tight` (1,25 → 20px):
    os 86 controles da página passaram de **todos** fracionados para **zero**.
  - ⚠️ **O problema é sistêmico, não do sandbox.** Vários pares token×tamanho do próprio DSS dão altura
    fracionada — `xs`(1,4)×16px = 22,4 · `sm`(1,45)×14px = 20,3 · `lg`(1,55)×16px = 24,8 · `xl`(1,6)×16px =
    25,6 · `tight`(1,25)×14px = 17,5 · `snug`(1,375)×14px = 19,25. Onde isso cair acima de um radio/toggle,
    o círculo volta a rasterizar torto. **Só `--dss-line-height-normal` (1,5) é seguro em toda a escala de
    fontes** (12/14/16/20/24 → todos inteiros).
  - ✅ **RESOLVIDO pela rota C** (2026-08-12): escala pareada em px. Ver entrada abaixo.

- ✅ **Rota C — escala de `line-height` pareada em px — CONCLUÍDA** (2026-08-12). Substitui as razões
  sem unidade que fracionavam. **Achado que reduziu o escopo pela metade:** `normal` (1,5) é a ÚNICA razão
  segura em toda a escala — todas as font-sizes do DSS são pares, então 1,5 sempre fecha inteiro. Ela
  NÃO foi depreciada e continua sendo a ferramenta certa para elemento cujo font-size **varia por
  variante** (ex.: label de Checkbox/Radio/Toggle, de 12px no xs a 18px no xl) — px fixo estaria errado ali.
  Assim, dos 54 usos só **13 eram inseguros** e precisaram migrar; os 39 de `normal` ficaram como estavam.
  - **Novos tokens:** tier confortável (`--dss-line-height-{xs,sm,md,base,lg,xl,2xl,3xl,4xl}`, = 1,5 em px)
    e tier compacto (`--dss-line-height-{xs,sm,md,lg,xl}-tight`, ~1,25), mais `--dss-line-height-md-relaxed`
    (26px) para o único uso relaxado (DssCard), que já era inteiro.
  - **Valores escolhidos preservando o que já renderizava inteiro** — a migração é quase inerte. Único
    delta real: `tight`×14px de 17,5 → 18px, em Button, Chip, Tab e Item.
  - **Medido antes×depois** nos 89 componentes do Defaults Preview: line-heights fracionados **36 → 12**, e
    os 12 restantes são do QUASAR (razões 1,715 e 1,2), não do DSS. Alturas de componente inalteradas
    (button 44, chip 28 — `min-height` domina); `dss-tab` passou de 20,3 para 21 e `dss-tabs` de 21,3 para 22
    (ambos saíram de fracionário para inteiro).
  - 🟡 **Depreciados, ainda definidos:** `tight`, `snug`, `relaxed`, `loose` — consumo interno ZERO, mantidos
    para não quebrar consumidor externo. **Remover quando houver certeza de que ninguém fora do repo usa.**
  - ⚠️ **Resíduo de terceiros:** os 12 fracionados restantes vêm do CSS do Quasar. Não dá para corrigir por
    token; se algum deles cair acima de um controle circular, o remédio é local (fixar o line-height naquele
    ponto), não sistêmico.

## Verificar (pode já estar resolvido)

- 🔍 **`DssResponsive`** — lista scope-props do slot default como slots (baixa prioridade). Mesmo arquivo.

## Frente em curso

- 🔴 **Gates de componente no MCP** (branch `work/dss-selection-controls`, NÃO empurrado). Commits
  `a2722fe`→`4460c93`: Gate Estrutural (4 camadas, wrapper puro, barrel, orquestrador) · escopo do gate de
  higiene por REGRA e não por arquivo · `validate_component_code` implementa o regime de exceções da
  Constituição #1 (fallback de `var()`, px em `@media`/`@container`, bloco `forced-colors`) · Token First
  escopado às camadas de ESTILO (`2-composition`/`3-variants`/`4-output`), mesmo contorno do grep do DoD —
  o `<style>` de `.example.vue` é andaime de demo. Gate de Composição (`:deep()`) segue valendo em TODO
  arquivo. Medido: DssChip 7→0, DssMultiselectAutocomplete 2→0, DssSelect 0 — o ruído acabou.
  **Runner de teste criado** (`packages/mcp` não tinha nenhum): vitest, `npm test`, 8 casos, fixture
  = dssRoot em miniatura sob `tests/fixtures/` (fora de `components/`, senão viraria componente-fantasma
  em catálogo/contrato/selo). Controle negativo verificado.
  - ⚠️ **`build/` do MCP precisa de rebuild + RESTART do servidor** para o comportamento novo valer na tool
    — `build/` deixou de ser versionado em `47a8182`, então cada clone/sessão reconstrói.
  - 🔲 **Hardcode real descoberto pelo validador limpo** (agora que não há ruído): **DssButton 12**
    (`3-variants/_glossy.scss`, `_push.scss`, `4-output/_states.scss`) e **DssInput 1**
    (`2-composition/_base.scss`). São candidatos DENTRO das camadas de estilo → **Onda Higiene**.
  - 🔲 **`tests/validateGridLayout.test.ts` fora do runner** — anterior a ele: script de console que
    imprime em vez de asserir; sob vitest falharia por não declarar suíte. Converter ou aposentar.
  - 🔲 **`tests/` não é type-checked** — `tsconfig.json` do MCP tem `include: ["src/**/*"]` + `rootDir: src`;
    o vitest transpila sem checar tipo. Erro de tipo no `.spec.ts` passa batido.

- ⏳ **MR !6 — consistência da família de campos** (`work/dss-continuidade` → `main`, aberto 2026-07-22).
  16 commits: brand no anel de foco (rotas A/B + dark), label×placeholder padrão B, base font 16 + ícone
  20px + paridade pixel-perfect do prepend, slot `error` fiel ao `getBottom` do Quasar, anel de foco do
  DssFile, + Preview Frames Textarea/Field e seletor de ícone no sandbox. Gates verdes, testes 5/5.
  Reviewer `@joao-henrique.vieira`; aguardando review + CI.

- ✅ **Família Controles de Seleção — FECHADA** (2026-08-12, branch `work/dss-selection-controls`).
  Fechamento em duas ondas: **paridade de API** (jul/ago) e **qualidade visual** (ago/12), esta última
  disparada pela comparação com os controles do Quasar. Gates no fechamento: vitest 222/222 nos três ·
  SCSS compila · `--all --strict` exit 0 (78) · api-docs 0 divergência · type-check 0 · tokens fantasma 0 ·
  estrutura 91/91 · barrels · variant-naming · field-conventions. Os três têm página Playground e
  Preview Frame (o eixo visual que o checklist exige).
  - **Correções de contrato:** `modelValue` passou a admitir os valores de `trueValue`/`falseValue`
    (`17715e9`) · `leftLabel` voltou a funcionar no Radio e no Toggle — dupla-inversão template×CSS
    (`64cf911`) · dark mode passou a seguir `[data-theme]` e não `prefers-color-scheme` (`14a8b37`) ·
    `error` implementado no Checkbox, que não tinha a prop (`bd772c6`) · erro passou a PREENCHER em vez de
    só contornar (`485a744`).
  - **Cor brand-aware** (`6bdcc92`): a cor saiu das utilities do Quasar (não brand-aware e `!important`
    em layer) para o SCSS do DSS com `--dss-action-*`. Sob brand GLOBAL o fundo ficava azul fixo com ícone
    laranja. Consequência: **`4-output/_brands.scss` dos TRÊS ficou sem regras de cor** — era redundante
    (a L2 já resolve as 8 cores nos dois caminhos) e em parte inerte. Os arquivos permanecem pela
    arquitetura de 4 camadas.
  - **Qualidade visual** (`c04d42b`, `43a22f1`, `e489846`): Toggle reformulado com as proporções do
    QToggle (thumb maior que o trilho, trilho translúcido, elevação, halo, thumb branco↔colorido) ·
    halo de hover/foco no Checkbox e no Radio no lugar do `brightness(0.95)` chapado · Radio com
    **geometria proporcional** — anel 8,3%, ponto 50%, folga 16,7% em todos os tamanhos, as mesmas razões
    do SVG do QRadio.
  - 🔍 **Aprendizados que valem para os próximos componentes** (não são débito deste, são método):
    - Teste que asserta PROXY (classe aplicada) passa com a feature quebrada — asserte o resultado.
    - `border-width` é arredondado para pixel inteiro pelo navegador; espessura fracionada exige
      `box-shadow: inset`.
    - Proporção que não escala junto (borda fixa contra dimensão variável) faz cada tamanho virar um
      desenho diferente — foi o defeito real do Radio, e o mesmo risco existe em qualquer componente com
      borda fixa e 5 tamanhos.
    - Medir contra o elemento pai esconde deslocamento absoluto; medir a fração da posição na tela.

- ✅ **DssChip — adequação de UI FECHADA** (2026-08-13, `9965b90` · `8262f83` · `97c517e`). Entra com os
  dois itens do eixo visual (Playground + Preview Frame), como a regra passou a exigir.
  - **Altura fiel à escala de compact control.** O `lg` estourava o token — padding vertical `spacing-2`
    (8px) + fonte 16px davam **34px** contra os 32px de `--dss-compact-control-height-lg`. Causa de fundo:
    o `line-height` era declarado UMA vez na base, pareado com 14px, e os modificadores trocavam só o
    `font-size` — o par só fechava no `md`. Cada tamanho passou a declarar o seu par, usando a escala
    compacta em px da Rota C. Medido: **20 / 24 / 28 / 32**, todos inteiros (não reintroduz a rasterização
    fracionada de `ae81a89`).
  - **`.bg-neutral` não seguia o tema** — usava o primitivo `--dss-gray-100`, que não inverte, enquanto o
    par `.text-neutral` usa `--dss-text-primary`, que inverte. No dark: fundo #fafafa com texto #f5f5f5,
    **1,04:1 medido** — o chip sumia. Com `--dss-surface-subtle`: **7,17:1** no dark e 9,19:1 no light
    (inalterado). Raio de alcance conferido: a classe só é emitida pelo `useChipClasses`; Select e
    MultiselectAutocomplete herdam o fix por comporem `<DssChip color="neutral">`.
  - 🔍 **Padrão a generalizar:** par de utilitárias em que o **fundo é primitivo e o texto é semântico**
    quebra em dark por construção. Vale varrer as demais `.bg-*`/`.text-*` de `_quasar-overrides.scss`
    na Onda Higiene — o sintoma é invisível no light, que é onde quase toda inspeção acontece.
  - **`PgTile` ganhou `align`** (opt-in; default `stretch` inalterado). Detalhe que custou tempo:
    `inline-flex` no root **não** protege — item de flex é blockificado, então o componente estica assim
    mesmo; só o alinhamento do stage resolve. Verificado que os 8 consumidores existentes não regridem.
  - **2ª rodada (2026-08-13, `36bf0fe` · `de4ca8b` · `19367c0`)** — três achados do dono, dos quais
    **um era CSS stale** (`dense` "mais alto": medido 24px contra 28px, sempre esteve certo). Fica o
    lembrete de método: no WSL2 o HMR falha em `/mnt/c`, então **hard refresh antes de reportar** —
    mas o hard refresh **zera os knobs do Preview Frame**, o que fez um defeito real *parecer* resolvido.
    - **`round` removida** (breaking, uso em produção zero). Vinha `true` de fábrica e aplicava regra
      byte-idêntica ao default da base: inerte ligada **e** desligada. O QChip também só tem `square`.
    - **Cor tinha DUAS fontes** → dois defeitos. Com `brand` + 6 das 9 cores nada casava e o chip ficava
      **preto** (`rgb(0,0,0)` medido); e o **ícone era sequestrado** pela marca. Unificado em
      `3-variants/_colors.scss` (9 cores); `_brands.scss` esvaziado, como já ocorrera na família.
    - 🔍 **ACHADO SISTÊMICO — `[data-brand] .dss-icon` é regra GLOBAL.** Mora em
      `DssIcon/4-output/_brands.scss` e casa **direto no elemento** do ícone (0,2,0), vencendo qualquer
      cor apenas **herdada** do componente pai. Sob marca global, um `filled` ficava com fundo e ícone
      na mesma cor — o glifo sumia. **Qualquer componente que componha `DssIcon` e conte com herança
      para colorir o ícone tem esse defeito**, e ele é invisível sem marca ativa. O DssCheckbox já o
      havia encontrado e documentado o remédio (declarar a cor no próprio ícone, ≥3 classes de
      especificidade); Chip é o segundo caso. **Vale varrer a base na Onda Higiene** — o candidato
      natural é todo componente com prop de ícone. *(Alternativa de fundo, mais limpa e mais arriscada:
      restringir a regra global do DssIcon a ícones que não estejam dentro de outro componente DSS.)*
    - ⚠️ **Correção de premissa registrada:** eu havia escrito que as 4 cores de AÇÃO acompanham a
      marca. **Não acompanham** — `tokens/brand/_{hub,water,waste}.scss` declaram `secondary`,
      `tertiary` e `accent` como "Mantém … semântico" nas três marcas; **só `--dss-action-primary` é
      remapeada**. Quem governa isso é o token, não o componente.

- ⏳ **Histórico da família (contexto das decisões acima)** (branch `work/dss-selection-controls`).
  **DssCheckbox fechado** (4 commits `816ed41`→`fba32a2`): leftLabel (dupla-inversão template×CSS),
  example §12 (estado inicial vazio→variedade), `defineExpose(focus/blur/toggle/inputRef)` (paridade
  campo), Preview Frame nascia indeterminate (seed `null`==`indeterminateValue:null` → semear do
  `@default` do vModel via contrato), `size="xl"` (28px, token). Preview Frame + TestCheckbox
  feitos. **DECISÕES DO DONO RESOLVIDAS + IMPLEMENTADAS (2026-07-24, ainda não commitado):**
  - ✅ **Props de ícone → escopo `checked`+`indeterminate`** (CCI §7, mudança aditiva). `checkedIcon`
    (`'check'`) e `indeterminateIcon` (`'remove'`) compostos via `DssIcon`; desmarcado permanece vazio
    (SEM `unchecked-icon`). Template usa `:name` binding. **`size` px arbitrário = REJEITADO POR TIPO**
    (união literal `xs|sm|md|lg|xl`, não `string`) — precedente da família registrado.
  - ✅ **`keepColor` adotado** (escape hatch opt-in; default cinza inalterado). Impl. em 3 camadas: type
    `keepColor?: boolean`; composable adiciona classe `dss-checkbox--keep-color` no root + `text-{color}`
    no control desmarcado (non-brand); `_brands.scss` estende o mixin p/ colorir o stroke desmarcado por
    variante (primary/secondary/accent) atrás de `.dss-checkbox--keep-color`. Racional/mecanismo detalhado
    ↓ resolvidos. **A11y:** 3:1 (WCAG 1.4.11) por brand×tema continua exigido; `forced-colors` vence.
  - **Gates (75 testes, +12):** SCSS compila · vitest 75/75 · @import/Material Icons/hardcode limpos ·
    contrato re-emitido (18 props, schema-válido, a11y 4) · `--all --strict` exit 0 · api-docs 0 diverg. ·
    type-check exit 0. **PENDENTE:** verificação visual no Preview Frame (dev server estava down; knobs já
    derivam do contrato) + **commit**. `[[project_adequacao_ui_recorrencias]]`.
  - **Verificação visual (2026-07-24, chrome-devtools no 5173):** keepColor ✅ colore o stroke em
    repouso; props de ícone ✅ (`checkedIcon`/`indeterminateIcon` renderizaram "star" no checkbox real —
    `indeterminateIcon` só aparece no estado indeterminate, alcançável via `toggleIndeterminate`+ciclo).
  - 🟡 **keepColor herda a inconsistência de brand global da família** (2026-07-24, provado por CSS):
    o stroke do keepColor segue o **brand-prop** (`_brands.scss` → `var(--dss-action-*)`, brand-aware)
    mas **não** o `[data-brand]` GLOBAL — porque no path non-brand usa a utility `.text-primary` do
    Quasar, que **não** é brand-aware (fixa em `rgb(31,134,222)` sob hub/water/waste). NÃO é regressão do
    keepColor: o **fill do estado marcado** (`bg-primary`) tem a MESMA cegueira; só o focus ring segue o
    global (mecanismo à parte). Consistente com o componente → **não corrigir isoladamente** (faria o
    stroke desmarcado seguir o global enquanto o fill marcado não → pior). Fix correto = sistêmico/família
    (componente inteiro brand-aware sob `[data-brand]` global). `[[project_brand_prop_vs_data_brand_focus]]`.
  - ✅ **MELHORIA DE SANDBOX (Preview Frame): knob de ícone ganhou autocomplete** (2026-07-24). Os knobs
    cujo nome casa `/icon/i` (`checkedIcon`/`indeterminateIcon`/`*Icon`) agora renderizam
    `input list="pv-icon-suggestions"` — o MESMO datalist do slot prepend/append (reaproveitado; movido p/
    fora do bloco de slots). 112 sugestões varridas dos `*.example.vue`. Input continua livre (só sugere),
    mas guia p/ nomes válidos e evita o glifo-em-branco. `PreviewFrame.vue`. Doc alertada
    (`DSSCHECKBOX_API.md` §Icon). *(Contexto: nome ausente do "Material Icons" clássico renderiza em branco
    pois o font não tem glifo de letra — NÃO é bug do componente; passthrough correto p/ DssIcon→QIcon.)*
  - 🟡 **MELHORIA DE SANDBOX (infra): carregar Material Symbols** — o sandbox só carrega `Material Icons`
    clássico (Google Fonts `family=Material+Icons`). Nomes novos falham. Decisão: carregar também
    Material Symbols (suporta os nomes novos) ou manter só o clássico + o picker acima. Escopo sandbox.
  - ✅ **Aplicar à FAMÍLIA — FEITO** (2026-08-11, `8b057a0` DssRadio + `d929e21` DssToggle). `keepColor`,
    `checkedIcon` e `size` união-literal com `xl` nos três. Aditivo: quem não passa as props novas não vê
    diferença. **Os dois não foram cópia** — cada um exigiu decisão própria, registrada nos commits:
    - **Radio:** o indicador é o PONTO, não um glifo. `checkedIcon` ficou SEM default e *substitui* o ponto;
      omitir preserva a convenção. Sem `indeterminateIcon` — conferido na `api.json` do Quasar que o próprio
      q-radio não o oferece (radio não tem estado indeterminado).
    - **Toggle:** o track é pílula PREENCHIDA — colorir no desligado apagaria a distinção ligado×desligado.
      Como o track usa `border: … currentColor` + fundo `surface-muted`, o `keepColor` colore **só a borda**.
      Teste trava o invariante (exige `text-primary` E ausência de `bg-primary`).
    - **Toggle, dívida estrutural encontrada de brinde:** era o único da família sem aliases de tipo —
      `color` era `string` ABERTO. Agora exporta `ToggleColor`/`ToggleSize`/`ToggleBrand`. **Estreitamento
      = breaking em tempo de compilação**, aplicado após medir: os 37 usos de `color=` no repo já estavam
      nas 8 semânticas e o type-check passa intacto.
  - ✅ **Colisão de seed do Preview — VERIFICADA, não ocorre** no Radio nem no Toggle. Em ambos `null`/`false`
    significa "nada selecionado", que é correto; o bug do Checkbox era `null` ser lido como *indeterminate*,
    estado que nenhum dos dois possui.
  - 🟡 **`keepColor` do Radio e do Toggle herdam a MESMA cegueira de brand global** já registrada acima para
    o Checkbox (a utility `.text-{color}` do Quasar não é brand-aware). Consistente com o componente →
    não corrigir isoladamente; o fix é sistêmico. `[[project_brand_prop_vs_data_brand_focus]]`.

## Resolvidos nesta onda (para não reabrir por engano)

- ✅ **Merge da v2.4.0 para `main` — CONCLUÍDO** (2026-07-17). As 3 branches penduradas
  (`import/dss-v2.4.0`, `chore/apidocs-passthrough`, `chore/eol-normalization`) foram consolidadas
  numa branch de review (`review/merge-v2.4.0-apidocs-eol`, conflitos resolvidos) e mergeadas via
  **MR !5** (merge commit `7fb36d5`, por `@joaoVittorDevvv`). Auditoria de integridade no MR: 36
  arquivos apidocs 100% idênticos + 492 só-EOL + 0 mudança de conteúdo real; baseline de tokens
  fantasma = 0 preservado; CI-Lint válido. MRs !2/!4 auto-marcados merged; !3 fechado como superseded
  (EOL já em `main`). As 3 branches-fonte foram removidas do remoto; trabalho segue em `work/dss-continuidade`.

- ✅ **Tokens SCSS fantasma ZERADOS — baseline 34→0, gate DURO** (`b49b6e0` e antecessores). Todo
  `var(--dss-*)` no SCSS de componente resolvia p/ token INEXISTENTE escapava (o sync só valida o meta).
  Novo gate `validate-scss-tokens.cjs` (ratchet c/ baseline) + varreu 34 fantasmas: `--dss-error-*`→
  `--dss-feedback-error*`; `--dss-focus-ring` (27×, a11y invisível)→`--dss-focus-primary`; brand theming
  (`--dss-{hub,water,waste}-*` literal + interpolado em mixins Checkbox/Chip/Radio/Toggle)→`--dss-action-*`
  brand-aware + colapso de blocos `[data-brand]` redundantes (codemod `collapse-brand-blocks.mjs`); e o
  lote final (typos `border-width-medium`/`touch-target-min`/`line-height-md`/`neutral-*`/`spacing-1-5`,
  theme-aware `surface-dark`/`text-primary-dark`, tokens-de-componente-sem-def→fallback direto). Baseline
  agora **VAZIO** = qualquer `var(--dss-*)` inexistente bloqueia. `[[project_undefined_error_scale]]`.

- ✅ **Teste do fluxo de adequação (DssUploader, composto)** — validado ponta a ponta: Roteador→Cartão
  Composto, fonte-de-verdade-CSS resolveu Fase A sem alucinação, gate do contrato fechou Fase B com
  âncoras verificadas; julgamentos (F1, classification) escalados não forçados. 77 contratos, `--all
  --strict` exit 0. Commits `01e0b4d` (DoD) + `dbcb934` (DssUploader). DoD do CLAUDE.md agora inclui o passo do contrato.
- ✅ **DssUploader tem teste** (30 casos) — o débito de cobertura da memória estava DESATUALIZADO (o teste existe).
- ✅ **c0 — rampa de cores reconciliada com o Figma** (focus ausente/deep duplicado; 54/54) — `6a4baa6`.
- ✅ **Cadeia de fonte única**: schema + emissor + gates N/O/F + Preview Frame + gate CI — provados em DssInput/DssSelect.
- ✅ **Gate api-docs (30→0)** — **mergeado em `main` via MR !5** (v2.4.0); gate `validate:api-docs` verde. Verificação 🔍 fechada.
- ✅ **Normalização EOL** — `.gitattributes` **mergeado em `main` via MR !5** (v2.4.0).
