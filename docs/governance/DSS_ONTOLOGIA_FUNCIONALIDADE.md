# DSS — Ontologia de Funcionalidade

> **Status:** descritiva, v0.2.0 · **Fonte de máquina:** [`dss.ontology.json`](./dss.ontology.json)
> **Amostra:** 3 specs reais, de autores, módulos e **gêneros** diferentes
>
> | Spec | Módulo | Linhas | Gênero |
> |---|---|---|---|
> | RF-0292D — SPC/Serasa | Negativação | 692 | especificação funcional |
> | #85505 / RF-0024.1 — Cobrança NFAg | Water / Fiscal | 428 | especificação funcional |
> | #33950 / EST0012406 — Baixa parcial jurídica | Arrecadação | 783 | lista de requisitos de mudança |

Vocabulário do que uma **especificação funcional Sansys** contém. Sem ele, nada acima do nível de componente é representável — e o que não se representa não se valida.

---

## 1. Por que isto existe

O DSS governa o **componente**: 76 contratos derivados, catálogo de tokens, 12 gates de pre-commit. Nada disso alcança o artefato que de fato inicia toda implementação — **a spec que o analista escreve**, e que hoje é o insumo direto dos agentes de IA que geram protótipo e código.

Esta ontologia é a camada 2 de 4 da governança da implementação (a 1 foi o consumidor do `ui-rules.schema.json`; a 3 é o `dss.spec.json`; a 4 é a superfície onde o analista escreve).

---

## 2. Método: descrever, não inventar

**Toda entidade carrega `evidencia` apontando onde ela aparece numa spec real. Entidade sem evidência não entra.**

Isso não é preciosismo. O `ui-rules.schema.json` passou três meses morto porque a documentação declarou uma realidade em vez de descrevê-la — o texto afirmava, no presente, um consumo pelo MCP que nunca existiu. Uma ontologia inventada repetiria o erro numa escala maior: um vocabulário que ninguém usa não é padrão, é ficção.

As lacunas seguem a mesma disciplina. Cada uma foi verificada por **busca negativa** — `grep` retornando zero em 692 linhas — e não por impressão de leitura.

---

## 2b. Não existe um template único — e isso muda o desenho

Aprendizado central da v0.2.0. Três specs reais produziram **três formatos diferentes**:

| | RF-0292D | #85505 | #33950 |
|---|---|---|---|
| Como/Quero/**Para** | 18 | **0** | **0** |
| Cenários Gherkin | 82 | 18 | **0** |
| Critérios de aceite | 40 | sim | **0** |
| Rastreio requisito→estória | 0 | 0 | **12** |
| Log de revisão do doc | não | não | **sim** |
| Convenção de heading | `## **1\. X**` | `**1\. X**` | `1. # **X**` |

Um validador que exigisse a estrutura da RF-0292D **reprovaria a #33950 por cerca de quinze seções ausentes**. Reprovação em massa é o caminho mais curto para a ferramenta ser desligada — e é a segunda vez nesta frente que esse risco aparece.

Por isso a ontologia declara **gêneros**, e o regime de várias entidades é condicionado a ele:

- **`especificacao-funcional`** — exige estória, premissa, restrição, cenário e critério de aceite.
- **`lista-requisitos-mudanca`** — exige estória, regra e rastreio; **não** exige cenário nem critério de aceite.

Detecção: presença de critérios de aceite e/ou marcadores Gherkin → funcional. Ausência de ambos somada a campo `Relação` por requisito → lista de mudança.

---

## 3. Regimes de aplicação

O ponto mais delicado do desenho. Existem dois mundos a reconciliar:

- **O que os sistemas Sansys fazem hoje em produção.**
- **O que o DSS estabelece como alvo**, mirando uma refatoração de longo prazo.

Um validador que reprova toda spec por um alvo que ainda não é praticado é ignorado em duas semanas. Por isso cada campo declara seu regime:

| Regime | Efeito | Critério de entrada |
|---|---|---|
| **`obrigatorio`** | Ausência reprova | Custa quase nada escrever **e** evita retrabalho imediato |
| **`recomendado`** | Aponta, não bloqueia | Melhora muito, mas exige decisão que o analista pode não ter |
| **`horizonte`** | **Registra como débito, nunca reprova** | Alvo do DSS que a produção ainda não pratica |

### Acessibilidade é `horizonte` — por decisão explícita

Decisão do dono do DSS, ago/2026: os sistemas Sansys não trabalham acessibilidade hoje, e as premissas rígidas do DSS existem para a refatoração de longo prazo. Cobrar isso na spec agora seria utópico e queimaria a ferramenta.

**Isso não afrouxa a Constituição #4.** WCAG 2.1 AA segue **vinculante no nível do componente** — todo componente DSS continua obrigado a foco visível, touch target e navegação por teclado. O que muda é só a cobrança na *spec de funcionalidade*: ela é registrada como débito, aparece no backlog de refatoração e **nunca** entra como erro.

---

## 4. As entidades

**Extraídas da spec real** — o analista já escreve todas, com vocabulário próprio e consistente:

| Entidade | O que é | Evidência em RF-0292D |
|---|---|---|
| `funcionalidade` | Raiz, com objetivo e **escopo negativo** | §1 — 11 itens fora de escopo |
| `tela` | Superfície + como se chega nela | §2 — via ação Analisar na grid |
| `estoria` | Como / Quero / Para | §2.1 — EST01–09 |
| `premissa` · `restricao` | Pré-condições e proibições | §2.2 (17) · §2.3 (14) |
| `regra` · `cenario` · `criterio_aceite` | RF, BDD Gherkin, CA | §4 (RF01–16, BDD01–41) · §5 (CA01–40) |
| `campo` | Campo + domínio + obrigatoriedade condicional | BDD10 — 6 valores de status |
| `comando` | Ação disparável | §2.4 — Anterior, Fechar, Salvar, Próximo |
| `estado_tela` | Modo e o que o determina | RF04 — status do lote → somente leitura |
| `permissao` | Perfil **+ vínculo** | RF05 — perfil não basta, exige atribuição |
| `entidade_dado` · `hierarquia_dado` | Domínio e encadeamento | §3.2 — caso → contribuinte → matrícula → fatura |
| `agrupamento` · `selecao` | Organização visual e seleção múltipla | RF13, RF14 — inclui estado indeterminado |
| `calculo` | Valor derivado, revalidado no servidor | RF15 |
| `validacao` · `guarda_navegacao` | Bloqueio e proteção de alterações | RF05, RF08 · BDD29 |
| `anexo` · `rastreabilidade` | Upload com escopo · trilha de auditoria | RF09 · RF16 |
| `referencia_visual` | A que o protótipo deve obedecer | §2.4 |

**Descobertas na v0.2.0**, ao comparar as três:

| Entidade | Regime | Origem |
|---|---|---|
| `maquina_estado` | `obrigatorio` | **Promovida** — governa comportamento de tela nas 3. #85505 opera duplo controle: Situação Fiscal × Financeira |
| `rastreio` | `recomendado` | **Melhor prática da amostra** — #33950 amarra 12 requisitos à estória de origem via `Relação` |
| `contexto_negocio` | `recomendado` | "Premissas" tem 2 semânticas: pré-condição (0292D) × justificativa de negócio (#33950, "11 milhões parados em juízo") |
| `integracao` | condicional | #85505 — payload, retornos e **tratamento de falha** |
| `parametrizacao` | `recomendado` | #33950 — chave por cliente. Tela parametrizada tem **duas** composições; a spec descreve uma |
| `historico_documento` | `recomendado` | #33950 — 6 revisões em 18 meses, com emendas em linha |
| `regra.motivo` | `recomendado` | Rationale que impede o implementador de "simplificar" a regra |

**Derivadas por ausência** — verificadas por busca negativa nas três:

| Entidade | Regime | 0292D | 33950 | 85505 | Veredito |
|---|---|---|---|---|---|
| `estado_dado.vazio` | `obrigatorio` | 0 | 0 | 0 | **sistêmico** |
| `estado_dado.carregando` | `obrigatorio` | 0 | 0 | 0 | **sistêmico** |
| `volume` | `recomendado` | 0 | 0 | 0 | **sistêmico** |
| `acessibilidade` | `horizonte` | 0 | 0 | 0 | **sistêmico** |
| `responsividade` | `recomendado` | checklist | 0 | checklist | ausente no corpo |
| `mensagem` (texto · veículo) | `obrigatorio` | 8 | 9 | 5 | falam sempre, **nunca redigem** |
| `estado_dado.erro` | `obrigatorio` | — | — | **trata** | #85505 é o modelo |

> Os padrões de controle — mensagem, validação, permissão, protótipo — retornaram valores altos e variados nas mesmas buscas. Isso prova que o extrator funciona e que os zeros acima são ausência real, não falha de regex.

---

## 5. O que a análise da amostra revelou

**A spec é boa.** RF-0292D tem escopo negativo explícito, 41 cenários em Gherkin e 40 critérios de aceite — acima da média da indústria. Qualquer narrativa de "o analista deixa pontas soltas" cai por terra ao abrir o arquivo.

**As lacunas são do template, não da pessoa.** Não existe campo para estado vazio, carregamento, erro, texto de mensagem, volume ou responsividade. O analista não pode preencher um campo que não existe. Problema de artefato se conserta e se automatiza; problema de pessoa, não.

**A árvore de composição já está lá — em prosa.** §2.4 "Elementos a preservar" lista título, identificação do contribuinte, atribuição, Status, Legitimidade, Observações, histórico em painéis e os quatro comandos. É exatamente o input que a tool `validate_composition` consome. Como frase corrida, nada lê.

**"Padrão do sistema" não aponta para lugar nenhum.** §2.4 manda reprototipar "no padrão do sistema" — e o DSS não é citado. É o ponto exato onde ele deveria ser a resposta.

**O checklist não é legível por máquina.** A convenção de tachado precisa ser inferida; a linha decisiva é `Bug externo?`, onde só uma leitura é compatível com o conteúdo do documento. A parte mais estruturada da spec — uma tabela — exige adivinhação.

---

### O handoff para o design está estruturalmente vazio

O achado mais forte da v0.2.0, e o que sustenta a apresentação:

- **#85505 §2.4 "Protótipos" — cabeçalho sem nenhum conteúdo.**
- **RF-0292D §2.4** — declara que não há protótipo aprovado e manda "reprototipar **no padrão do sistema**", sem apontar para lugar nenhum.
- **#33950** — 40 imagens de protótipo, embutidas por requisito. Material farto, mas como *imagem*, não como referência a um sistema.

**Em nenhuma das três o DSS é citado.** É exatamente o ponto do processo em que ele deveria ser a resposta.

E há um efeito colateral: quando a spec entrega imagem em vez de referência, o agente de IA que gera o protótipo lê pixels, não contrato — e devolve componentes reinventados. É a mesma fábrica de divergência do portal, agora na entrada do processo.

---

## 6. Limite honesto desta versão

**Amostra de 3.** Suficiente para separar o sistêmico do individual — as quatro lacunas com zero em 3 de 3 são do processo, não de um autor. Insuficiente para fechar `cardinalidade` e para afirmar que existem só dois gêneros; uma quarta spec de outro módulo pode revelar um terceiro.

**Uma lacuna não se confirmou.** A contradição "modal × tela" só apareceu na RF-0292D. Fica registrada como achado daquela spec, não como padrão.

**A ontologia não julga regra de negócio.** Ela representa que existe uma regra e verifica se a spec diz o que precisa dizer sobre ela. Se o prazo deveria ser 5 dias e não 3, isso está fora do alcance de qualquer validador — e prometer o contrário destrói a confiança na ferramenta.

---

## 7. Referências

- `dss.ontology.json` — vocabulário legível por máquina (fonte desta prosa)
- `DEBITO_ABERTO.md` — governança da implementação, camadas 1–4
- `DSS_BLUEPRINT_CADEIA_FONTE_UNICA.md` §4.2 — política de tiers, origem conceitual dos regimes
- `DSS_UI_RULES.md` §3.2 — `validate_composition`, consumidor da camada 1
