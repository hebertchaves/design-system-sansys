# Join spec ↔ contrato — esboço investigativo

> **Status:** esboço · ago/2026 · **não implementado**, nenhuma tool escrita
> **Pergunta que originou:** o conceito de *propagação* (que mantém a fonte única funcionando
> dentro do DSS) se estende à interface entre a spec e o código gerado por IA — ou seria forçar
> algo que outra funcionalidade resolveria?
> **Resposta curta:** parcialmente. Propagação **não** se estende à geração de código. Mas há um
> **cruzamento** entre dois artefatos que já são derivados, e ele cabe — como segunda entrada de
> uma tool que já existe, não como conceito novo.

---

## 1. O que propagação é, e por que isso limita a extensão

Os quatro passos de propagação do DSS têm a mesma forma:

```
CSS do componente   → dss.meta.json
Token SCSS          → DSS_TOKEN_REFERENCE.md
meta.json           → DSS_REFERENCIA_VISUAL_ANALISE.md
tokens/index.scss   → docs-portal/index.css
```

Uma fonte legível por máquina · transformação mecânica · **exatamente uma saída correta** · zero
julgamento. É essa última propriedade que dá o direito de regenerar sem revisar e de proibir
edição à mão no destino.

**Código a partir de spec não tem essa propriedade.** Uma spec admite muitas implementações
válidas; escolher entre elas é julgamento. Chamar isso de propagação custaria a saída única — e
sobraria um gerador que ninguém pode deixar de revisar, que é o oposto do ganho.

> Esta parte da ideia deve ser descartada explicitamente, para não voltar por outra porta.

---

## 2. O que de fato falta: um join entre dois derivados

Os dois lados **já são artefatos derivados**. Ninguém os cruza.

| artefato | derivado de | responde |
|---|---|---|
| `dss.contract.json` | CSS + `types/*.types.ts` | o que cada componente **pode** fazer |
| saída do `emit-spec.mjs` | markdown do analista | o que a tela **deve** fazer |
| `tree` da `validate_composition` | proposta do agente | o que a tela **vai** ter |

O cruzamento não exige julgamento novo: ambos os lados já foram derivados por processos
auditáveis. É por isso que ele é propagação-shaped, mesmo não sendo propagação.

---

## 3. A costura: presença × valor

O `emit-spec.mjs` declara na linha 90 que **deliberadamente não extrai** `campo`, `comando`,
`maquina_estado` e afins — porque exigem ler significado, o que é parecer probabilístico e por
isso não vira gate. Ele emite **presença/ausência** de classes de entidade.

Isso não é limitação a contornar. É a mesma costura que o projeto já desenhou entre
`validate_spec_readiness` (mecânico → gate) e `request_spec_parecer` (juízo → roteiro). **O join
se divide na mesma linha.**

### Nível P — presença · mecânico · pode ser gate

Cruzamento de conjunto. Verificado contra o repositório em ago/2026:

| a spec declara | exigir da árvore | verificação no contrato | componentes que atendem |
|---|---|---|---|
| `estado_dado.carregando` | ≥1 nó com `loading` | `api.props[].name` | 11 |
| `estado_dado.erro` | ≥1 nó com `error` | `api.props[].name` | 12 |
| `campo.obrigatorio_quando` | nó com `required` | `api.props[].name` | **4** (Input, Select, Textarea, File) |
| `campo.somente_leitura_quando` | nó com `readonly` | `api.props[].name` | 14 |
| `comando.habilitado_quando` | nó com `disable` | `api.props[].name` | 26 |
| `selecao.estado_parcial` | `indeterminateValue` | `api.props[].name` | **1** (DssCheckbox) |
| `anexo` | DssFile ou DssUploader | `identity.name` | 2 |
| `volume.maximo_esperado` > limiar | VirtualScroll / InfiniteScroll | `identity.name` | 2 |
| `acessibilidade` | claims do contrato | `a11y.wcag[]` | regime **horizonte** — nunca reprova |
| `estado_dado.vazio` | — | **não há resposta no DS** | ver §5 |

> As colunas de cobertura importam: onde o número é baixo (`required` = 4,
> `indeterminateValue` = 1), o join tende a reprovar por **falta de peça no DSS**, não por erro
> de quem compôs. Isso é informação útil, não ruído — mas precisa ser dito na mensagem de
> reprovação, senão vira frustração.

### Nível V — valor · exige juízo · **não** vira gate

`campo.dominio` → qual componente serve · `mensagem.texto` → onde aparece e se está correto ·
`validacao.condicao` → se a regra está certa · `comando.efeito`.

Estes vão para o **`request_spec_parecer`**, que já existe exatamente para isso: roteiro
determinístico, agente responde, humano confere, **citação literal obrigatória**.

Tentar transformá-los em gate repetiria o erro que o projeto já evitou uma vez.

---

## 4. O que falta construir (Nível P)

1. **Segunda entrada na `validate_composition`.** Hoje recebe `tree` + `context`; passaria a
   receber também as lacunas detectadas pelo `emit-spec`. **Não é tool nova** — é um campo a mais
   no input de uma tool existente, o que mantém o custo de manutenção onde já está.
2. **Um mapa curado pequeno:** `mensagem.veiculo` → componente (banner · inline · tooltip). É o
   único ponto com decisão de design, e ela acontece **uma vez, na tabela**, não a cada spec.
3. **Convenção para estado vazio** — ver §5.

---

## 5. Achado independente: o DSS não tem resposta para estado vazio

O esboço expôs um vazio nas **duas** pontas:

- **Lado da spec:** `estado_dado.vazio` aparece **0 vez em 3 de 3** specs medidas.
- **Lado do DSS:** não existe componente `DssEmpty*`. `empty` existe como **slot** em exatamente
  um componente (`DssVirtualScroll`), o que significa que o conteúdo é responsabilidade do
  consumidor — cada tela inventa o seu.

Ou seja, o join não teria contra o que verificar essa linha, e **não por falha de quem escreve a
spec**: o design system não oferece a peça. Registrado no `DEBITO_ABERTO.md` como item próprio,
porque é independente do join — existe hoje.

---

## 6. O limite, dito antes de alguém prometer

O Nível P confirma que **a peça existe na árvore**. Não confirma que ela foi usada corretamente,
nem que o texto dentro dela presta. É o mesmo teto de toda esta cadeia — e é por isso que ele
deve **conviver** com o parecer, não substituí-lo.

---

## 7. Verificação

Os números da tabela do Nível P foram obtidos assim:

```bash
# cobertura de uma prop no catálogo de contratos
grep -l '"name": "loading"' packages/core/components/*/*/dss.contract.json | wc -l

# entidades e campos do lado da spec
node -e "const o=require('./docs/governance/dss.ontology.json'); console.log(Object.keys(o.entidades).length)"

# o que o emit-spec de fato emite
grep -n "Deliberadamente NÃO" scripts/emit-spec.mjs
```

📖 Contexto: [`DSS_PROCESSO_DESENVOLVIMENTO_ASSISTIDO.md`](./DSS_PROCESSO_DESENVOLVIMENTO_ASSISTIDO.md) ·
[`DSS_ONTOLOGIA_FUNCIONALIDADE.md`](./DSS_ONTOLOGIA_FUNCIONALIDADE.md) ·
[`DEBITO_ABERTO.md`](./DEBITO_ABERTO.md)
