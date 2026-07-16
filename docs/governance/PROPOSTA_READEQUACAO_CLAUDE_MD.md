# 📐 Proposta de Readequação do CLAUDE.md — Alinhamento com o Modo de Execução de LLMs

> **Status:** Proposta (análise + desenho). **Não** altera o `CLAUDE.md` ainda.
> **Destinatário:** governança DSS + agentes que executarão a Onda de Readequação de Componentes.
> **Motivação:** o `CLAUDE.md` cresceu por acreção (cada onda somou princípios e regras ao topo, nada foi realocado ou removido). O volume normativo hoje **compete com a atenção do agente**, produzindo o sintoma observado nos testes: agentes que **deliram** (interpolam do prior genérico Quasar/Vue) ou **fogem do padrão** (aplicam a regra que "parece" próxima da tarefa, não a que o documento prioriza).
> **Objetivo:** reestruturar o documento para o modo como LLMs realmente executam, com foco explícito em **reduzir delírio e fuga de padrão**, e **preparar o vetor Fase 3** (composição), hoje coberto só por governança inicial de teste.

---

## Parte 1 — Como LLMs realmente executam (fundamentos que a estrutura precisa respeitar)

Antes do *de-para*, os fatos operacionais sobre agentes LLM que determinam se um documento normativo funciona ou falha:

| # | Mecânica do LLM | Consequência para um doc normativo |
|---|---|---|
| L1 | **Atenção é finita e enviesada por posição** ("lost in the middle"). O meio de um documento longo tem o menor peso. | Regras técnicas mais violáveis **não podem** ficar no meio de uma lista plana de 400 linhas. Hoje os Princípios #7–#13 (os mais específicos e esquecíveis) ficam exatamente na zona morta. |
| L2 | **Primazia e recência dominam.** Início e fim do contexto pesam mais. | O que precisa ser inviolável deve estar no **início** (constituição) e ser **reforçado no fim** (definition of done). |
| L3 | **Inflação de ênfase destrói triagem.** Se 14/14 itens gritam `VINCULANTE`/`NUNCA`/`⚠️`, o modelo não consegue distinguir o que é *load-bearing* agora. | Ênfase precisa ser **escassa** para significar algo. Reserve `VINCULANTE` para o núcleo universal; o resto é regra condicional, não grito. |
| L4 | **LLM é completador de padrão, não executor de regras.** Ele gera a continuação mais provável dado o contexto — não "consulta um livro de regras". | Uma proibição em prosa a 300 linhas de distância tem peso fraco na geração. Um **gate executável** (`grep`, `vitest`, `sass`) que o agente roda e vê falhar tem peso decisivo — é auto-corretivo. |
| L5 | **Delírio acontece nas lacunas.** Onde a regra é vaga ou a resposta não está à mão, o agente interpola do **prior de treino** (Quasar/Vue/CSS genérico). | O DSS é um **desvio** do Quasar genérico. O prior do agente **luta contra** o DSS. Todo ponto que diz "não infira, leia X" sem tornar X trivialmente alcançável **é um sítio de delírio**. |
| L6 | **Just-in-time vence just-in-case.** A regra tem peso máximo quando carregada no momento da ação que pode violá-la, não pré-carregada 300 linhas antes. | A tabela "Leitura por Tarefa" é o instinto certo. Os 14 princípios no topo são *just-in-case dumping* — devem migrar para junto da tarefa. |
| L7 | **Loop de verificação vence proibição.** "NUNCA faça X" é restrição mole. "Depois de editar, rode `grep …`; deve retornar zero" é restrição dura e checável. | Todo invariante duro precisa de um **como me verifico**. Se não é verificável, é diretriz — não gate. |

**Tese central:** o `CLAUDE.md` atual foi escrito para um *leitor humano cuidadoso* (que lê tudo, pondera, prioriza). LLMs não são esse leitor. Eles precisam de **pouco núcleo sempre-ligado + roteamento just-in-time + gates executáveis**. A readequação é traduzir o mesmo corpo normativo para esse modo.

---

## Parte 2 — Diagnóstico do CLAUDE.md atual (patologias, com evidência)

### P1 — Prioridade plana / inflação de ênfase
Os 14 princípios (linhas 78–187) estão todos marcados como igualmente críticos (`NÃO VIOLAR`, `VINCULANTE`, `⚠️`). Mas eles têm **altitudes radicalmente diferentes**:
- **Universais** (todo arquivo, toda vez): #1 Token First, #2 @import proibido, #4 4 camadas, #5 WCAG, #13 unlayered.
- **Condicionais** (só em situação específica): #7 alturas compactas, #8 `::before`/`::after`, #9 tabela de brightness — relevantes só ao escrever aquele CSS.
- **Vocabulário de auditoria** (não são regra de criação): #10 Golden Reference/Context/Sample.
- **Estruturais** (duplicam a seção "Arquitetura Obrigatória" abaixo): #11 wrapper, #14 ícone.

→ O agente não consegue triar. Sob pressão de contexto, ele aplica o princípio *mais parecido com a tarefa*, não o *mais prioritário*. **Isso é a "fuga de padrão".**

### P2 — Redundância que já gerou drift
A mesma regra aparece 3–4× em redações diferentes:
- *Token First*: Princípio #1 + Quickstart "30s" + Anti-Patterns + Gate Técnico.
- *4 camadas*: Princípio #4 + "Arquitetura Obrigatória" + Gate + Quickstart.

E a divergência **já ocorreu**: `AGENT_QUICKSTART.md:64` diz *"Princípios #1–#13"* enquanto o `CLAUDE.md` tem **14**. Uma regra com N cópias tende a N verdades. Isso é o mesmo "drift silencioso" que os prompts de consolidação de contrato visual combateram — mas aqui nas regras de operação.

### P3 — Acreção sem despejo (evidência estrutural)
A "Hierarquia de Autoridade" tem **numeração quebrada**: Nível 1 vai de 1→6 (linhas 226–242) e o Nível 2 **reinicia em 5,6,7,8** (linhas 251–261), gerando os números **5 e 6 duplicados** no mesmo bloco. Sintoma inequívoco de itens empilhados por ondas sucessivas sem ninguém reordenar o conjunto. O documento **só cresce**; nada nunca é rebaixado ou realocado.

### P4 — Proibições em prosa sem verificação
Dos 14 princípios, **só o #14** carrega um gate executável (`grep -rn "Material Icons" …`). Os demais são prosa `NUNCA/SEMPRE`. Justamente os mais esquecíveis (#7 alturas, #8 pseudo-elementos, #9 brightness) **não têm como o agente se auto-verificar** — então ele não se verifica, e erra. (Ver L4/L7.)

### P5 — Cegueira de Fase 3 (o ponto mais grave para a próxima onda)
Todo o núcleo sempre-ligado (14 princípios, "Arquitetura Obrigatória" de 4 camadas, Gate) é moldado para **componente base (Fase 1/2)**. Os invariantes reais de **composto (Fase 3)** — `inheritAttrs:false`, proibição de `:deep()` para layout, `provide/inject` tipado, `data-brand` por cascata, não-reimplementar primitivos — vivem em `DSS_GUIA_COMPOSICAO_FASE3.md` / `DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md`, que o agente só lê **se** consultar a tabela condicional.

→ Resultado: um agente fazendo trabalho de composto tem, sempre em contexto, a **lei errada** (Fase 1/2 como "a norma") e a **lei certa** (Fase 3) como leitura opcional. Para uma onda cujo foco é justamente evoluir a Fase 3, essa inversão é o maior gerador de delírio previsível.

### P6 — Mistura de "autoridade" com "leitura"
A seção "Hierarquia de Autoridade" (linha 216) tem título **"(LEITURA OBRIGATÓRIA)"** e lista ~10 documentos. Mas seu conteúdo real é **precedência em caso de conflito** — não uma lista de leitura. Ela **contradiz** a seção "Leitura por Tarefa" logo acima (que corretamente diz "não releia tudo toda vez"). O agente recebe dois sinais opostos sobre quanto precisa ler.

---

## Parte 3 — De-Para: necessidade do LLM → lacuna atual → alvo

| Necessidade do LLM | O que o CLAUDE.md faz hoje | Alvo da readequação |
|---|---|---|
| **Núcleo mínimo sempre-ligado** (L1/L2) | 14 princípios de altitudes misturadas, todos "sempre" | **Constituição** de ~5 invariantes universais, cada um com auto-check de 1 linha. O resto sai do núcleo. |
| **Ênfase escassa para significar** (L3) | `VINCULANTE`/`NUNCA` em quase tudo | `VINCULANTE` reservado à Constituição. Condicionais viram cartões neutros de tarefa. |
| **Regra carregada na hora da ação** (L6) | Regra técnica no topo, longe da tarefa | Regras condicionais (#7,#8,#9,#10,#11,#14) **realocadas** para o cartão da tarefa que as aciona. |
| **Auto-verificação executável** (L4/L7) | Só #14 tem gate; resto é prosa | **Todo invariante duro ganha um comando** (`grep`/`sass`/`vitest`). Sem comando ⇒ é diretriz, não gate. |
| **Roteamento por fase** (L5/L6) | Núcleo é Fase 1/2; Fase 3 é opcional | **Bifurcação explícita**: "base (F1/2)" vs "composto (F3)", cada uma com seu cartão de invariantes de 1ª classe. |
| **Fechar lacunas de delírio** (L5) | "não infira, leia X" sem tornar X alcançável | **Condições de PARADA** explícitas + ponteiro exato: quando não souber, PARE, leia o arquivo nomeado ou pergunte — nunca interpole do prior Quasar. |
| **Uma verdade por fato** (P2) | Regra repetida 3–4× | **Um fato, um lar.** CLAUDE.md aponta; não reafirma. Gate e Quickstart derivam, não duplicam. |
| **Prevenir acreção futura** (P3) | Só cresce | **Meta-regra**: todo invariante novo é (a) universal → Constituição c/ check, ou (b) condicional → cartão/doc externo. Nada novo entra na lista plana. |

---

## Parte 4 — Estrutura proposta para o novo CLAUDE.md

Cinco blocos, ordenados por primazia (o mais inviolável primeiro, o gate no fim por recência):

### A. Constituição (sempre em contexto — alvo: caber em ~1 tela)
Só os invariantes que valem para **toda edição, todo arquivo**, cada um com **auto-check de 1 linha**:

1. **Token First** — zero hardcode. `❯ grep -REn "#[0-9a-f]{3,6}|[0-9]+px" 2-composition/ 3-variants/ 4-output/` deve retornar zero (fora de comentário).
2. **Sass Modules** — `@import` proibido. `❯ grep -rn "@import" **/*.scss` deve retornar zero.
3. **CSS DSS unlayered / vendor em `@layer`** (Princ. #13) — DSS vence Quasar por não estar em layer.
4. **Acessibilidade AA** — focus visível, touch target ≥ 48px, teclado. Não é opcional.
5. **Fonte de verdade = CSS do componente + docs DSS; NUNCA o prior do Quasar/Vue.** Quando não souber como algo deve se comportar/parecer: **PARE, leia o doc nomeado no roteador, ou pergunte. Não infira.** *(este é o item anti-delírio de nível constituição — ver Parte 5).*

> Regra de ênfase: **só estes 5** carregam `VINCULANTE`. Todo o resto do documento é neutro.

### B. Roteador por tarefa (evolução da tabela atual "Leitura por Tarefa")
Mantido e reforçado, agora com **bifurcação de fase** no topo:

- **Vou criar/editar um componente BASE (Fase 1/2)** → Cartão C1 + docs.
- **Vou criar/editar/adequar um COMPOSTO (Fase 3)** → Cartão C2 + docs.
- (demais linhas da tabela condicional atual seguem: tokens, monorepo, ícone, preview, PR, selos…).

### C. Cartões de invariantes por fase (novo — o coração da mudança)
Cada cartão é lido **só** quando o roteador aponta para ele. As regras condicionais saem do topo e vêm para cá, **cada uma com seu gate**:

**Cartão C1 — Componente base (Fase 1/2)** *(realoca #7,#8,#9,#10,#11,#14 + Arquitetura de 4 camadas + Gate estrutural)*
- 4 camadas completas; wrapper re-export puro; ordem L2→L3→L4 no orquestrador.
- Alturas: `--dss-compact-control-height-*` (nunca token específico).
- Pseudo-elementos: `::before`=touch target, `::after`=efeito visual.
- Brightness: só a tabela canônica (0.85/0.90/0.92/0.95 · 1.10/1.20).
- Ícone: só via `DssIcon`; gate `grep "Material Icons"`=0.
- Golden Context declarado antes de auditar.

**Cartão C2 — Componente composto (Fase 3)** *(hoje "lei opcional", promovido a 1ª classe)*
- `inheritAttrs: false` + `v-bind="$attrs"` explícito no nó DSS correto.
- **Proibição absoluta de `:deep()` para layout** — layout mora no pai via wrapper/grid.
- Estado global do bloco via `provide/inject` tipado (não prop drilling).
- Brand/contexto visual via `data-*` + cascata de CSS var (não inject).
- **Não reimplementar primitivos** — compor DSS, nunca QComponent cru no template.
- Adequação: rodar `DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md` por peça interna.
- Golden Context de composto (ex.: `DssDataCard`).

### D. Definition of Done executável (evolui o "Gate de Validação Final")
O checklist atual vira uma **sequência de comandos que o agente roda e vê passar/falhar** (auto-correção, L7). Os comandos já existem no repo:
```
❯ npx sass <Comp>.module.scss           # compila sem erro
❯ npx vitest run --project unit          # (a partir de packages/core)
❯ grep -rn "@import" **/*.scss           # = 0
❯ grep -rn "Material Icons" **/*.scss    # = 0
❯ <check de hardcode / tokens>           # = 0
```
Diferença de mentalidade: hoje é uma lista de checkboxes que o agente *afirma* ter cumprido (e alucina o cumprimento). No alvo, é um script que ele *executa* — o disco é o árbitro, não a autodeclaração.

### E. Meta-regra anti-acreção (novo — evita reverter à bagunça)
Uma seção curta que governa **como o próprio documento evolui**:
- Todo invariante novo entra por **uma** de duas portas: (a) universal → Constituição, com auto-check obrigatório; (b) condicional → cartão de fase ou doc externo, referenciado pelo roteador.
- **Proibido** adicionar item novo à lista plana do topo.
- **Um fato, um lar**: se a regra já existe em doc de Nível 1/2, o CLAUDE.md **aponta**, não reescreve.
- A "Hierarquia de Autoridade" é renomeada para o que ela realmente é — **"Precedência em caso de conflito"** — e deixa de se disfarçar de lista de leitura (isso é papel do roteador).

---

## Parte 5 — Mecanismos anti-delírio (o pedido explícito: agentes não fugirem do padrão)

Quatro alavancas estruturais, em ordem de impacto:

1. **Cercar o prior do Quasar (L5).** O maior gerador de delírio é o agente completar com Vue/Quasar genérico onde o DSS diverge. Contramedida: a Constituição abre e o DoD fecha com a mesma frase — *"fonte de verdade é o CSS do componente + docs DSS; o prior do Quasar não é autoridade"* (primazia + recência, L2). E cada cartão nomeia o **desvio** específico do Quasar naquele contexto.

2. **Condições de PARADA explícitas.** Onde hoje há "não infira", o alvo tem um gatilho acionável: *"Se você não encontrou o valor/comportamento no CSS ou no doc nomeado em ≤ N tentativas: PARE. Não gere um valor plausível. Leia `<arquivo>` ou pergunte."* LLMs não param sozinhos — precisam de uma condição de parada escrita.

3. **Gates executáveis no lugar de prosa (L4/L7).** Toda regra que hoje é `NUNCA` em prosa e que puder ser checada por `grep`/`sass`/`vitest` ganha o comando. O agente que **roda e vê falhar** se corrige; o que **lê e concorda** segue reto.

4. **Carga just-in-time por fase (L6).** O agente de composto para de carregar a lei de base como "a norma". Ele recebe, no momento da tarefa, exatamente o cartão C2. Menos regra irrelevante em contexto = menos ruído competindo com a atenção = menos fuga de padrão.

---

## Parte 6 — Preservação da evolução do sistema (Fase 3 em especial)

- **Nada de conteúdo normativo é perdido** — é **realocado**. Os 14 princípios continuam existindo; migram de "lista plana no topo" para "Constituição (universais)" + "cartões de fase (condicionais)". Rastreabilidade: a proposta inclui uma **tabela de origem** (cada princípio atual → seu novo lar) para revisão antes de qualquer edição.
- **Fase 3 sai de "governança de teste" para caminho de 1ª classe** no roteador, sem inventar regra nova: o Cartão C2 apenas **promove** o que já está em `DSS_GUIA_COMPOSICAO_FASE3.md`, `DSS_ESTRATEGIA_FASE3_COMPLEXIDADE_IA.md` e `DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md`. Conforme a Fase 3 evoluir (Contrato de Interface, `validate_interface_contract` do MCP), o Cartão C2 é o ponto de extensão natural — em vez de engordar de novo o topo.
- **Compatível com o pipeline existente**: o DoD executável reusa os gates que já rodam no pre-commit (vitest, sass, api-docs) — não cria ferramenta nova.

---

## Parte 7 — Plano de migração (conservador, reversível — no padrão das ondas anteriores)

Sequência em commits isolados e reversíveis (como foi a 1ª higiene):

1. **Aprovar esta proposta** + a tabela de origem (14 princípios → novo lar). *Sem edição de código.*
2. **Commit 1 — Constituição**: extrair os ~5 universais para o topo, cada um com auto-check. Marcar o resto para realocação.
3. **Commit 2 — Cartões C1/C2**: mover #7–#14 para o Cartão C1; promover Fase 3 ao Cartão C2. Roteador ganha a bifurcação de fase.
4. **Commit 3 — DoD executável**: converter o Gate Final em sequência de comandos; sincronizar Quickstart (mata o drift "#1–#13").
5. **Commit 4 — Meta-regra + renome "Precedência"**: fechar a porta da acreção; corrigir a numeração 5,6/5,6,7,8.
6. **Validação**: rodar 1 componente base + 1 composto de ponta a ponta com o novo doc, medir se o agente reduz delírio (ex.: nº de valores hardcoded inventados, nº de `:deep()` de layout).

### O que NÃO tocar nesta onda
- Conteúdo dos docs de Nível 1/2 em si (arquitetura, tokens) — a proposta reorganiza **ponteiros e ênfase**, não reescreve os guias.
- A cadeia de verdade visual (CSS → meta.json → REFERENCIA_VISUAL) — intocada.
- Semântica de qualquer princípio — só muda **onde** ele mora e **como** é verificado, não **o que** ele exige.

---

## Anexo — Tabela de Origem (rastreabilidade: 14 princípios + seções → novo lar)

Nenhum conteúdo normativo é perdido. Este mapa mostra **para onde** cada item atual migra. Coluna "Gate" = o comando de auto-verificação que passa a acompanhar o item (— = não mecanicamente checável, permanece como diretriz).

### Os 14 Princípios Fundamentais

| # atual | Princípio | Altitude | Novo lar | Gate de auto-verificação |
|---|---|---|---|---|
| 1 | Token First | Universal | **Constituição** | `grep -REn "#[0-9a-f]{3,6}\|[0-9]+px" 2-composition 3-variants 4-output` = 0 |
| 2 | Sass Modules (`@import` proibido) | Universal | **Constituição** | `grep -rn "@import" **/*.scss` = 0 |
| 3 | Cores no padrão Quasar (utilitárias, não SCSS) | Universal | **Constituição** (fundido em Token First / "cores via classe") | `grep -rn "color:\|background:" 2-composition 3-variants` revisão |
| 4 | Arquitetura em 4 Camadas | Universal (base) | **Constituição** (regra) + **Cartão C1** (detalhe estrutural) | presença dos 4 diretórios |
| 5 | Acessibilidade AA | Universal | **Constituição** | — (revisão + axe futuro) |
| 6 | Brandabilidade (`data-brand`) | Transversal | **Constituição** *(se opção "5+Brand")* senão **Cartão C1** | — |
| 7 | Tokens genéricos de altura | Condicional | **Cartão C1** | `grep -rn "height-\(chip\|badge\|[a-z]*\)-" ` = 0 (tokens específicos) |
| 8 | Convenção `::before`/`::after` | Condicional | **Cartão C1** | `grep -n "::before" _*.scss` revisão (touch target only) |
| 9 | Tabela de brightness | Condicional | **Cartão C1** | `grep -rn "brightness(" ` ∈ {0.85,0.90,0.92,0.95,1.10,1.20} |
| 10 | Modelo Golden (Reference/Context/Sample) | Vocabulário de auditoria | **Cartão C1** (bloco "antes de auditar") + doc `DSS_GOLDEN_COMPONENTS` | — |
| 11 | Entry Point Wrapper | Estrutural (base) | **Cartão C1** (funde com "Arquitetura Obrigatória") | wrapper = re-export puro (sem `<template>`/`<style>`) |
| 12 | CSS como Fonte de Verdade Visual | Universal (anti-delírio) | **Constituição** (é a espinha do item #5 anti-delírio) | — (é regra de decisão, não de código) |
| 13 | Isolamento via Cascade Layers | Universal | **Constituição** | `grep -rn "@layer" ` → DSS fora de layer, vendor dentro |
| 14 | Composição de Ícones (`DssIcon`) | Estrutural/condicional | **Cartão C1** | `grep -rn "Material Icons" **/*.scss` = 0 |

### Seções não-princípio (hoje sempre-ligadas)

| Seção atual (linhas) | Novo lar |
|---|---|
| Contexto do Projeto (9–23) | Mantida no topo (curta, dá enquadramento) |
| Natureza Normativa (27–34) | Fundida em 1 parágrafo de abertura da Constituição |
| Leitura por Tarefa / Progressive Disclosure (38–74) | Vira o **Roteador (Bloco B)** + bifurcação de fase |
| Escopo Funcional Mínimo (191–212) | **Cartão C1** (é regra de entrega de componente) |
| Hierarquia de Autoridade (216–273) | Renomeada **"Precedência em caso de conflito"**; deixa de ser "leitura obrigatória"; corrige numeração 5,6/5,6,7,8 |
| Arquitetura Obrigatória — 4 camadas (276–309) | **Cartão C1** (funde com Princ. #4 e #11) |
| Piso Mínimo de Documentação (313–343) | **Cartão C1** (bloco de entrega) |
| Anti-Patterns Críticos (347–362) | Distribuídos: universais → Constituição; específicos → cartão correspondente (elimina a duplicação com os princípios) |
| Checklist de Validação Final (366–393) | **DoD executável (Bloco D)** |
| Regra Final "explicitar melhor" (397–402) | Mantida como fecho curto (recência) |

### Observações da migração
- **Duplicação eliminada**: Token First e 4-camadas hoje aparecem em 3–4 seções; passam a ter **um lar canônico** cada (Constituição) e são apenas *referenciados* no Cartão/DoD.
- **Fase 3 (Cartão C2)** não sai desta tabela porque **não existe hoje no CLAUDE.md** — é conteúdo *promovido* de `DSS_GUIA_COMPOSICAO_FASE3.md` / `DSS_UI_ADEQUACAO_CHECKLIST_COMPOSTOS.md`. Essa é exatamente a lacuna P5.
- Os gates marcados são **propostos** — na implementação cada um vira um comando validado contra o repo real (alguns podem virar script no `package.json`, ao lado dos gates já existentes de pre-commit).

---

## Decisões que preciso de você antes de implementar

1. **Profundidade da Constituição**: fico nos 5 universais que listei, ou você quer incluir/tirar algum?
2. **Fase 3**: promovo o Cartão C2 agora com o que já existe (promoção pura), ou você quer **evoluir a governança de Fase 3 primeiro** e só então refletir no CLAUDE.md?
3. **Formato de entrega**: quer que eu produza a **tabela de origem** (14 princípios → novo lar) como próximo passo revisável, antes de qualquer edição no CLAUDE.md?
