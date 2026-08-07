# DSS — Processo de Desenvolvimento Assistido

> **Status:** proposta de processo · v1.0 · ago/2026
> **Público:** análise, design, QA, desenvolvimento e liderança
> **Escopo:** como uma funcionalidade sai da spec e chega ao sistema, com o DSS assistindo o caminho

---

## 1. O que este documento é

Uma proposta de processo, ancorada em três coisas verificáveis: o **fluxo que a área de UX já desenhou** (Miro dez/2023, Figma mar/2024), **três specs reais** de módulos e autores diferentes, e o **ferramental do DSS que já existe e roda**.

**O que ele não é:** não é um fluxo determinístico, não substitui o julgamento das equipes, e não descreve ferramenta que ainda não funciona. Onde algo está planejado e não construído, o texto diz isso.

---

## 2. O problema, em números

### O que a IA erra

Em abril de 2026 uma IA construiu uma página complexa usando o DSS. Auditoria:

| Métrica | Valor |
|---|---|
| Veredito do MCP | `compliant`, zero findings |
| Auditoria humana | **5 não-conformidades bloqueantes**, 3 não-bloqueantes, 7 gaps, 20 pontos conformes |
| Exigiram re-arquitetura | **Nenhuma** |

Entre as bloqueantes: `border: 1px solid var(--dss-border-default)` — **esse token nunca existiu**. A IA inventou um nome plausível, o SCSS compilou sem erro e a borda simplesmente não renderiza. Também apareceu `<q-checkbox>` cru no lugar do DssCheckbox, e um `aria-label` sem binding Vue: o leitor de tela anunciaria `${statusCounts.onTime} ordens no prazo`, literalmente.

**A leitura correta:** a IA acertou estrutura, composição e fluxo. Errou em detalhes que **uma máquina pega**. Dos 8 achados, **3 hoje já são pegos automaticamente**.

### O que as specs não dizem

Três specs reais medidas por busca negativa — RF-0292D (Negativação), #85505 (Water/Fiscal), #33950 (Arrecadação/Rio):

| Conceito | 0292D | 85505 | 33950 |
|---|---|---|---|
| Estado vazio | 0 | 0 | 0 |
| Estado de carregamento | 0 | 0 | 0 |
| Volume esperado | 0 | 0 | 0 |
| Acessibilidade | 0 | 0 | 0 |

Mensagem ao usuário aparece **22 vezes somadas** — e **nenhuma** redige o texto final ou diz por qual veículo chega.

**As specs são boas.** Escopo negativo explícito, 41 cenários em Gherkin, 40 critérios de aceite. O que falta não é capricho do analista: **o template não tem onde colocar.** Ninguém preenche campo que não existe.

### E o design não é chamado

A seção de protótipo — o ponto de passagem para o design — está estruturalmente vazia:

- **#85505 §2.4:** cabeçalho **sem nenhum conteúdo**.
- **RF-0292D §2.4:** manda reprototipar *"no padrão do sistema"*, **sem apontar para lugar nenhum**.
- **#33950:** 40 imagens embutidas por requisito — material farto, mas como imagem, não como referência a um sistema.

**Em nenhuma das três o DSS é citado.**

---

## 3. A fronteira

O fluxo da área de UX tem três fases. A divisão de responsabilidade é limpa:

| Fase | O que produz | Quem conduz |
|---|---|---|
| **Descoberta** | Entendimento e escopo | Analista + Designer + Líderes (+ Infra) |
| **Solução** | **A spec validada** | Analista + Designer + Usuário/cliente |
| **Entrega** | O código no sistema | Designer + Dev + Usuário/cliente |

> **Descoberta e Solução são como a spec nasce. A Entrega é onde o DSS entra:** a spec é verificada e vira código.

Isso tem uma consequência que resolve o maior risco do processo — ver §5.

---

## 4. O processo, etapa a etapa

### Descoberta

| Etapa | Assistência do DSS | Estado |
|---|---|---|
| Pesquisa com usuário/cliente | — | — |
| Desenvolvimento de escopo (multidisciplinar) | — | — |
| **Storyboard das telas e fluxos** | `validate_composition` sobre a árvore de componentes | **funciona hoje** |

O **storyboard** é o primeiro momento em que existe uma árvore de componentes. Validar ali custa minutos e corrige antes de existir uma linha de código — é o ponto de correção mais barato do processo inteiro.

A RF-0292D já traz essa árvore, em prosa: *"título Análise do Contribuinte, identificação do contribuinte/documento, atribuição de responsabilidade, Status da Análise…"*. Escrita como **lista**, vira entrada de máquina.

### Solução

| Etapa | Assistência do DSS | Estado |
|---|---|---|
| Protótipo de baixa fidelidade | — | — |
| **Validação com analista** | **Relatório de prontidão da spec** | **funciona hoje** |
| Validação com usuário/cliente | — | — |

A etapa de *Validação com analista* já previa, desde dez/2023, o método **"Validação do escopo · Aplicação de Heurísticas · Checklist de usabilidade"**.

O relatório de prontidão não é etapa nova a vender: **é o conteúdo que essa etapa nunca teve.**

### Entrega

| Etapa | Assistência do DSS | Estado |
|---|---|---|
| **Portão de prontidão** | `validate_spec_readiness` — libera ou não a passagem | **funciona hoje** |
| **Código / protótipo de alta** *(fundidos)* | MCP: contratos verificados, catálogo real, tokens | **funciona hoje** (hospedagem pendente) |
| **Verificação automática** | composição · vocabulário · tokens · paridade de API | parcial |
| Validação time de UX | recebe artefato já conforme; olha significado | — |
| Validação com usuário/cliente | sobre código real, cedo | — |
| **Injeção em produção** | — | **caixa que nunca existiu no fluxo** |

**A fusão é a única mudança que o ferramental novo torna possível.** O fluxo de 2024 já tratava desenvolvimento como *"codagem do protótipo"* — mas a codagem era manual, então protótipo e código tinham de ser caixas separadas, com um losango de validação entre elas. Com geração assistida pelo DSS, **as duas caixas viram uma** e o losango é substituído por verificação automática: mesma pergunta, resposta em segundos em vez de reunião.

---

## 5. Quem faz o quê — e por que isso não gera atrito

As lacunas das specs não são aleatórias. Elas mapeiam exatamente a divisão entre o que o analista sabe e o que o designer sabe:

| Eixo | Dono | Estado nas 3 specs |
|---|---|---|
| Regra, fluxo, domínio, permissão, integração | **Analista** | **forte** |
| Estado vazio · carregando · erro | **Designer** | ausente |
| Texto e veículo de mensagem | **Designer** | descrito, nunca redigido |
| Volume e densidade | **Designer + Dev** | ausente |
| Responsividade | **Designer** | ausente |
| Composição e padrão visual | **Designer + DSS** | DSS não citado |

As duas colunas quase não se tocam. **O designer não invade o território do analista** — ele preenche sete campos que hoje ninguém preenche. É o `DSS_SPEC_BLOCO_INTERFACE.md`, uma seção §2.5 que entra **ao lado** do que o analista já escreve.

### O relatório não fiscaliza ninguém

Como Descoberta e Solução são construção conjunta, a spec chega à Entrega **com dois donos**. O relatório de prontidão não julga o analista: diz **à dupla** que ela terminou.

Isso importa mais do que parece. Padronizar spec é mudança de cultura, e mudança de cultura morre quando o primeiro contato de quem escreve é uma reprovação. Aqui não há terceiro auditando — há uma dupla conferindo o próprio trabalho contra uma lista que ela mesma passa a usar.

**Sequência que respeita isso:** valor primeiro, template depois. O DSS lê a spec **como ela é** (por isso a ontologia tem o conceito de gênero — a #33950 não segue o template e é um documento legítimo). A mudança de template vem puxada por quem viu as mesmas lacunas voltarem, não empurrada por processo.

---

## 6. O ferramental — o que roda hoje

| Camada | Artefato | Verificação |
|---|---|---|
| **Composição** | `validate_composition` — 9 regras | Reproduz sozinha o `<q-checkbox>` cru do stress test |
| **Vocabulário** | `dss.ontology.json` v0.2.0 — 33 entidades | 33/33 com evidência em spec real |
| **Prontidão** | `emit-spec.mjs` + `validate_spec_readiness` | 3 specs → todas `incompleta`, mesmas 5 lacunas |
| **Template** | `DSS_SPEC_BLOCO_INTERFACE.md` §2.5 | RF-0292D + §2.5 → `incompleta` vira **`pronta`** |
| **Entrega remota** | MCP por HTTP, 15 tools | 24 KB de markdown por HTTP → veredito correto |

Uso hoje, sem integração nenhuma:

```bash
npm run spec:check "spec-exportada-do-docs.md"
```

### Um princípio que o ferramental respeita

**Nada é autorado; tudo é derivado.** O analista não escreve JSON. O `dss.spec.json` é extraído do markdown que ele já produz — mesma disciplina do contrato de componente. E cada ferramenta delega à fonte única em vez de reimplementar regra: duas cópias da mesma regra divergem em silêncio, que é como um artefato de governança deste repositório passou três meses morto sem ninguém notar.

---

## 7. Limites — o que o DSS não faz

Ler esta seção antes de prometer qualquer coisa a qualquer pessoa.

**Não valida se a regra de negócio está certa.** Detecta que a spec não diz o que acontece com a lista vazia. Não detecta que o prazo deveria ser 5 dias e não 3.

**Presença ≠ qualidade.** O portão vê que a spec *fala* de estado vazio. Não avalia se o que ela diz faz sentido.

**Entidades semânticas não são extraídas.** Campo, comando, máquina de estado exigem leitura de significado — isso é parecer probabilístico, e parecer probabilístico **não pode virar gate**. Vai errar às vezes; vendê-lo como determinístico destrói a confiança na primeira falha.

**Acessibilidade é registrada, não cobrada.** Decisão explícita: os sistemas Sansys não praticam acessibilidade hoje, e as premissas rígidas do DSS miram a refatoração de longo prazo. Cobrar na spec agora seria utópico. **Isso não afrouxa a Constituição #4** — WCAG 2.1 AA segue vinculante no nível do **componente**.

**O artefato gerado não é o sistema em produção.** Ele nasce no ambiente do DSS. O produto tem roteamento, estado global, camada de API e telas legadas. A tradução é real e tem custo.

**Os gates protegem o DSS, não o produto.** O pre-commit cobre `packages/core`, `apps/sandbox`, `apps/docs-portal` e `docs/` — tudo dentro deste monorepo. **No repositório do produto não existe nenhum.** Levá-los para lá é o que transforma "o DSS valida" de promessa em fato.

---

## 8. Riscos

| Risco | Mitigação |
|---|---|
| **Resistência a mudar o template** | O DSS lê a spec como ela é. Template muda depois, puxado por quem viu valor |
| **Amostra pequena** | 3 specs separam o sistêmico do individual, mas não fecham tudo. Ampliar |
| **Vender "a IA entrega pronto"** | Queima o processo no primeiro sprint. A tradução para produção é real |
| **Dev virar revisor de caixa-preta** | Ele entra na Descoberta, em duas perguntas: *este dado existe e por qual API?* e *que restrição de integração o desenho precisa respeitar?* |
| **Falso verde** | O portão tem padrões de controle: se o extrator quebrar, o veredito é `inconclusivo`, nunca "aprovado" |

Sobre o último: **isso já se pagou.** Na primeira execução, um controle acusou zero onde era impossível — um `\b` em regex não casa depois de letra acentuada. Sem os controles, um regex quebrado teria **aprovado as três specs em silêncio**.

---

## 9. Medição

A missão é reduzir bug e layout fora do padrão. Sem número antes de começar, em seis meses vira discussão de opinião.

**Linha de base disponível:** o stress test mediu **8 não-conformidades numa tela**, 5 bloqueantes, das quais **3 hoje já caem por máquina**.

Três métricas por tela entregue:

1. **NCs encontradas em revisão** — separando as que máquina pega das que exigem julgamento
2. **Ciclos de ida e volta até aprovar** — o fluxo tem 6 losangos de decisão com laço de retorno
3. **Componentes divergentes do DSS** — quantos foram reinventados em vez de compostos

---

## 10. O que falta construir

| # | Item | Estado |
|---|---|---|
| 1 | Validação de composição | ✅ funciona |
| 2 | Ontologia de funcionalidade | ✅ v0.2.0, 3 specs |
| 3 | Portão de prontidão | ✅ funciona |
| 4 | Superfície onde o analista escreve | 🟡 template pronto; integração depende do item 6 |
| 5 | Parecer semântico via LLM | 🔜 **probabilístico — parecer, nunca gate** |
| 6 | MCP hospedado | 🟡 pré-requisitos e segurança feitos; falta a infra |
| 7 | Sinais de runtime dos produtos | 🔜 **depende de os times aceitarem instrumentação** |

Os itens 5 e 7 têm natureza diferente dos demais: um é probabilístico por construção; o outro é negociação organizacional, não decisão técnica.

**A caixa de injeção em produção continua sem desenho** — e é a fronteira onde a divergência reentra.

---

## 11. Como começar

Uma spec real, com o designer, sem automação nenhuma:

1. O designer preenche a **§2.5 Interface** durante a Solução.
2. Exporta o documento como Markdown.
3. Roda `npm run spec:check`.
4. Antes de gerar código, valida a árvore de composição do storyboard.

Se o bloco atrapalhar na prática — se sete campos forem demais, se a redação não couber no jeito da equipe — **é muito melhor descobrir com um comando manual do que depois de um add-on aprovado pelo administrador**.

---

## Referências

`DSS_ONTOLOGIA_FUNCIONALIDADE.md` · `dss.ontology.json` · `DSS_SPEC_BLOCO_INTERFACE.md` · `scripts/emit-spec.mjs` · `DSS_UI_RULES.md` §3.2 · `RELATORIO_STRESS_TEST_FASE3.md` · `DEBITO_ABERTO.md`
