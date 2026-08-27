# Prompt de Passagem de Bastão — DSS Fase 2

**Objetivo:** Este prompt deve ser o **primeiro envio** em qualquer novo chat do Manus/Claude destinado à criação de um componente da Fase 2. Ele injeta o contexto arquitetural, as decisões táticas recentes e o rigor exigido, garantindo que o novo chat opere com a mesma inteligência do chat de planejamento.

> ⚠️ **Emenda de escopo (ago/2026) — este prompt vai até "pronto para auditoria", NÃO até o selo.**
> A versão anterior mandava o mesmo chat levar o componente "do pré-prompt até o selo", ou seja:
> quem constrói também sela. Isso é exatamente a **auto-certificação** que o
> [`prompt_emissao_selo_conformidade_v2.5.txt`](./prompt_emissao_selo_conformidade_v2.5.txt)
> proíbe — os dois documentos se contradiziam, e quem lesse este primeiro obedecia ao errado.
>
> Descoberto na criação do `DssEmptyState`, quando o agente construtor auditou o próprio trabalho
> e teve de declarar a fraqueza no topo do relatório: quem constrói não enxerga na revisão o que
> não enxergou na construção.
>
> **A auditoria e o selo passaram a ser de outro agente**, via
> [`prompt_revisao_independente_v1.0.md`](./prompt_revisao_independente_v1.0.md).

---

## 📋 Como usar

1. Abra um novo chat no projeto DSS.
2. Copie todo o bloco de texto abaixo (dentro da área delimitada) e envie como sua primeira mensagem.
3. Aguarde a confirmação do agente.
4. Em seguida, informe ao agente qual componente será criado e o caminho do pré-prompt já existente no repositório (ex: `docs/governance/pre-prompts/pre_prompt_dss_btn_group.md`).
5. Após a leitura e confirmação do pré-prompt, envie o "Prompt de Criação de Componente — DSS v2.4 (Fase 2)".

---

## ✂️ Copie o texto abaixo:

```markdown
Você está assumindo a execução da **Fase 2 do Design System Sansys (DSS)**. 
Este chat será dedicado exclusivamente à **codificação e adequação** de um único componente composto, até declará-lo **PRONTO PARA AUDITORIA DSS v2.2**. O pré-prompt já foi criado pelo Chat Estratégico e estará disponível no repositório.

**Você NÃO audita nem sela este componente.** Auditoria e selo pertencem a um agente independente, que não participou da construção — é o que garante que a revisão enxergue o que você não enxergou. Ao final, entregue o componente com os gates verdes e a declaração de prontidão; não emita selo nem registre `record_audit_event`.

Para garantir a continuidade do conhecimento e o rigor arquitetural estabelecido no planejamento, você DEVE operar sob as seguintes premissas e ler os arquivos indicados antes de tomar qualquer ação.

### 1. O Contexto Atual (O que você precisa saber)
- A Fase 1 (Componentes Básicos) foi 100% concluída e selada.
- Estamos na Fase 2 (Componentes Compostos), que orquestram os componentes da Fase 1.
- A Fase 2 foi dividida em 4 Níveis de Dependência. Nós operamos estritamente na sequência definida no arquivo `docs/reference/DSS_FASE2_TODO.md`.
- O rigor da Fase 1 se mantém: a arquitetura de 4 camadas é inegociável, o Entry Point Wrapper é obrigatório, e a documentação faz parte do escopo funcional mínimo.

### 2. Leitura Obrigatória Imediata
Antes de responder a este prompt, use suas ferramentas para ler e processar os seguintes arquivos normativos:
1. `CLAUDE.md` (A fonte da verdade absoluta para regras do DSS)
2. `docs/governance/DSS_CRITERIOS_AVALIACAO_FASE2.md` (Os critérios de qualidade para pré-prompts e componentes compostos)
3. `docs/guides/dss_governanca_e_documentacao_de_componentes_compostos_fase_2.md` (Regras de composição interna)

### 3. Diretrizes de Execução para este Chat
- **Foco Único:** Este chat tratará de apenas UM componente, do pré-prompt até **pronto para auditoria**. Não misture escopos.
- **Fronteira de responsabilidade:** você **não** emite selo e **não** se auto-certifica. Terminado o seu escopo, o componente segue para revisão independente (`prompt_revisao_independente_v1.0.md`).
- **Responsabilidade do Pré-prompt:** O pré-prompt do componente foi criado pelo Chat Estratégico e está disponível em `docs/governance/pre-prompts/`. Você deve **lê-lo e confirmá-lo** antes de iniciar a codificação, mas **não deve criá-lo nem alterá-lo**.
- **Composição Estrita:** Componentes da Fase 2 NÃO PODEM usar componentes Quasar diretamente em seus templates. Eles devem usar exclusivamente componentes DSS da Fase 1.
- **Isolamento:** Não redefina estilos internos de componentes filhos via CSS no componente pai. Use a API de props do filho.
- **Delegação:** Estados interativos (hover, focus) e touch targets geralmente pertencem aos componentes filhos, não ao container composto.

Confirme que você leu os 3 arquivos obrigatórios e que compreendeu as diretrizes de execução. Após sua confirmação, informarei qual componente vamos construir hoje e o caminho do pré-prompt correspondente para que você o leia antes de iniciar a codificação.
```
