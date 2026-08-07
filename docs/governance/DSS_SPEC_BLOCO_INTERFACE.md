# Bloco de Interface — complemento ao template de spec

> **Status:** normativo · v1.0 · **Dono do preenchimento:** Designer UX/UI
> **Valida com:** `npm run spec:check <arquivo.md>` · tool MCP `validate_spec_readiness`

Uma seção nova, para entrar no template de especificação funcional como **§2.5**, logo depois de *Protótipos*.

---

## Por que existe

Três specs reais, de autores e módulos diferentes, foram medidas por busca negativa. Quatro coisas deram **zero em três de três**: estado vazio, estado de carregamento, volume esperado e acessibilidade. E mensagem ao usuário aparece 22 vezes somadas, sem que nenhuma redija o texto final ou diga por onde ele chega.

**Isso não é descuido de analista.** O template não tem onde colocar. Ninguém preenche campo que não existe.

Este bloco cria os campos. É deliberadamente curto: sete itens, a maioria de uma linha.

---

## Quem preenche

**O designer**, junto com o analista, durante Descoberta e Solução.

A divisão é natural e quase não se sobrepõe. O analista domina regra, fluxo, domínio, permissão e integração — e as specs mostram que ele faz isso bem. O que falta é o eixo de comportamento de interface, que é o ofício do designer. **Este bloco é a contribuição do designer, itemizada.**

Por isso ele não desloca nada do que o analista já escreve: entra ao lado.

---

## O bloco

Copiar para a spec e preencher. Cada campo traz o que decide — se a resposta não muda nenhuma decisão, escrever "não se aplica" e seguir.

```markdown
**2.5 Interface**

**2.5.1 Superfície**
A funcionalidade será uma [página | modal | drawer | painel embutido].

**2.5.2 Estados de dados**
- **Vazio:** quando não houver registros, a tela deverá exibir …
- **Carregando:** enquanto os dados são carregados, a tela deverá exibir …
- **Erro:** em caso de falha, o usuário deverá ver …
- **Parcial:** se apenas parte dos dados retornar, …

**2.5.3 Mensagens ao usuário**
| Quando | Texto exato | Veículo |
| :---- | :---- | :---- |
| … | "…" | [inline \| toast \| banner \| dialog] |

**2.5.4 Volume esperado**
Típico: … · Máximo esperado: … registros.

**2.5.5 Responsividade**
Em telas pequenas (xs/sm), …

**2.5.6 Acessibilidade**
[Preenchimento opcional — registrado como débito, não bloqueia a entrega.]

**2.5.7 Elementos a preservar**
- …
- …
```

---

## O que cada campo decide

| Campo | Decide | Se ficar em branco |
|---|---|---|
| **Superfície** | Foco, tecla ESC, rolagem, largura, navegação | Quem prototipa escolhe sozinho. A RF-0292D diz "modal" na RF01 e "tela" em todo o resto — nunca resolvido |
| **Estados de dados** | O que existe na tela fora do caminho feliz | O caminho feliz é o único implementado, e o resto vira bug em produção |
| **Mensagens** | O que o sistema diz e por onde | O texto é inventado na hora do código. As specs descrevem a mensagem, nunca a redigem |
| **Volume** | Tabela, lista ou scroll virtual; paginação | 3 matrículas × 8 faturas e 40 × 200 são telas estruturalmente diferentes |
| **Responsividade** | O que acontece no celular | O DSS já tem resposta pronta que a spec nunca pergunta |
| **Acessibilidade** | — | Nada. É regime de **horizonte**: registrado, nunca reprova |
| **Elementos a preservar** | A árvore de composição | Vira frase corrida e nenhuma ferramenta lê |

### Sobre acessibilidade

Fica em **horizonte** por decisão explícita do dono do DSS. Os sistemas Sansys não praticam acessibilidade hoje; as premissas rígidas do DSS miram a refatoração de longo prazo. Cobrar na spec agora seria utópico e queimaria a ferramenta.

Isso **não afrouxa a Constituição #4** — WCAG 2.1 AA segue vinculante no nível do **componente**. O que muda é só a cobrança na spec.

### Sobre "Elementos a preservar"

A RF-0292D já traz esse conteúdo, em prosa: *"título Análise do Contribuinte, identificação do contribuinte/documento, atribuição de responsabilidade, Status da Análise…"*.

Como **lista**, isso vira a árvore de composição que a tool `validate_composition` consome — e passa a ser verificável antes de existir uma linha de código. Como frase, nenhuma ferramenta lê.

---

## O laço fechado

Preencher este bloco faz o portão de prontidão mudar de veredito. Não é promessa: é verificável em um comando.

```bash
npm run spec:check "RF-0292D.md"     # 🔴 incompleta — 5 lacunas bloqueantes
# preencher a §2.5
npm run spec:check "RF-0292D.md"     # ✅ pronta
```

Se o template e o portão discordarem, **o portão é o árbitro** — ele deriva da ontologia, que deriva das specs reais. Template que o portão não reconhece é template morto, e essa frente já enterrou um artefato assim.

---

## Referências

- `dss.ontology.json` — vocabulário e regimes
- `DSS_ONTOLOGIA_FUNCIONALIDADE.md` — método e evidência das lacunas
- `scripts/emit-spec.mjs` — o portão
- `DSS_UI_RULES.md` §3.2 — `validate_composition`, consumidor de "Elementos a preservar"
