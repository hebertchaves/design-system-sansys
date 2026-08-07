# DSS MCP — empacotamento portável e deploy

> **Status:** empacotamento pronto · hospedagem **não decidida** · ago/2026
> **Substitui na prática:** as Etapas 1–2 do `DSS_MCP_FASE4_PLANO_TECNICO.md`

Este documento torna o servidor MCP executável em qualquer lugar. **Onde hospedar continua uma decisão em aberto** — e é de infraestrutura, não de código.

---

## 1. O fato que o plano original não previu

O `DSS_MCP_FASE4_PLANO_TECNICO.md` propõe AWS Lambda + API Gateway e trata o servidor como aplicação sem estado. **Ele não é.**

As tools leem o repositório em runtime: `DSS_ROOT` aponta para a raiz e as tools abrem `docs/`, `packages/core/components`, `packages/core/tokens` e `scripts/` a cada chamada. São **~18 MB de conteúdo** que precisam viajar com o código.

> Sem esse conteúdo, o servidor sobe e responde `/health` — mas toda tool devolve "não encontrado". O pior modo de falha: parece funcionar.

Duas notas menores sobre o plano: ele cita `serverless-http` para "envelopar Express/Fastify", mas o servidor usa `node:http` puro; e sugere API Key no API Gateway, que já está implementada na aplicação (Bearer via `DSS_MCP_TOKEN`).

---

## 2. Como empacotar

A partir da **raiz do repositório**:

```bash
docker build -f packages/mcp/Dockerfile \
  --build-arg GIT_SHA=$(git rev-parse --short HEAD) \
  --build-arg GIT_DATE=$(git log -1 --format=%cI) \
  -t dss-mcp:$(git rev-parse --short HEAD) .
```

```bash
docker run -p 3001:3001 -e DSS_MCP_TOKEN=<segredo> dss-mcp:<sha>
```

Build em dois estágios: o primeiro compila o bundle, o segundo carrega só o runtime e o conteúdo lido. Roda como usuário `node`, não root.

---

## 3. Versão do conteúdo — o ponto que decide a confiança

Um MCP que responde sobre um DSS de três semanas atrás **é pior que MCP nenhum: ele mente com confiança**.

Por isso a imagem carimba o commit e o `/health` o expõe:

```json
{
  "status": "ok",
  "content": { "sha": "abc1234", "builtAt": "2026-08-07T10:00:00Z" },
  "remote": true,
  "authRequired": false
}
```

Assim a defasagem é **visível**, não suposta: basta comparar o `sha` com o `HEAD` da main.

**Consequência operacional:** o deploy precisa ser automático a cada merge na main. Deploy manual drifta, e serviço que drifta vira fonte de erro em vez de fonte de verdade.

---

## 4. Segurança — o que já está na aplicação

Não depende da nuvem escolhida:

| Proteção | Como | Verificado |
|---|---|---|
| **Autenticação** | Bearer via `DSS_MCP_TOKEN`; `/health` livre (liveness não pode exigir token) | sem token → 401 · com → 200 |
| **Caminho confinado** | `DSS_MCP_REMOTE=1` recusa caminho fora da raiz do DSS | `specPath=/etc/passwd` → recusado |
| **Escrita bloqueada** | `record_audit_event` se recusa em modo remoto sem token | recusado; `meta.json` intacto |

> A terceira não é hipótese. Durante o desenvolvimento, uma chamada HTTP não autenticada **mutou de verdade** o `dss.meta.json` do DssButton, inserindo 12 linhas em `auditHistory`. Revertido. É o cenário exato que a hospedagem criaria em escala.

`DSS_MCP_REMOTE=1` já vem fixo na imagem.

---

## 5. Variáveis de ambiente

| Variável | Efeito |
|---|---|
| `DSS_HTTP_PORT` | Porta (padrão 3001) |
| `DSS_MCP_TOKEN` | Se definido, exige `Authorization: Bearer`. **Sem ele, as tools de escrita se recusam a rodar** |
| `DSS_MCP_REMOTE` | `1` = confina caminhos. Já fixo na imagem |
| `DSS_BUILD_SHA` · `DSS_BUILD_DATE` | Preenchidas pelo build; aparecem em `/health` |

---

## 6. Onde hospedar — em aberto

A imagem roda em qualquer um destes. A escolha não é técnica apenas:

| Opção | A favor | Contra |
|---|---|---|
| **Lambda (container)** | Custo zero ocioso; está no plano | Cold start; limite de tamanho de imagem |
| **ECS / Cloud Run** | Simples para servidor longo | Custo contínuo |
| **VM interna Veolia** | Sem exposição na internet; padrão corporativo | Alguém precisa operar |
| **Kubernetes** | Se já existe cluster | Só faz sentido se já houver |

**Três perguntas que não são minhas nem do time de design:**

1. A Veolia tem padrão de nuvem? Um MCP corporativo provavelmente não deveria viver em conta pessoal.
2. Internet aberta com token, ou só rede interna? O conteúdo não é segredo — é documentação de design system — mas é propriedade da empresa.
3. Quem opera e responde quando cair?

---

## 7. Endpoints

| Rota | Uso |
|---|---|
| `GET /health` | Liveness + versão do conteúdo. **Única sem auth** |
| `GET /tools` | Lista as tools (derivada do registro real) |
| `POST /mcp` | Streamable HTTP — clientes MCP modernos |
| `GET /sse` · `POST /messages` | SSE — clientes legados |

---

## 8. O que isto destrava

- **Item 4** — validar dentro do Google Docs. Apps Script não roda Node; um add-on só valida chamando endpoint hospedado. A alternativa seria reimplementar as regras em Apps Script, criando a segunda fonte de verdade que esta frente combate.
- **Item 7a** — destino dos sinais de runtime. O `sendToMcp` do grid-inspector já tem o gancho `isMcpConnected()` esperando um servidor num endereço fixo.

---

## 9. Limite honesto

**O Dockerfile não foi construído nem executado** — não há Docker no ambiente onde foi escrito. O que foi verificado:

- todo caminho de `COPY` existe no repositório;
- a ontologia lida pelo emissor está sob `docs/`, portanto acompanha;
- o `/health` novo responde com SHA, data, modo remoto e exigência de auth;
- o comando exato do `HEALTHCHECK` retorna 0 contra o servidor rodando.

**O primeiro `docker build` pode exigir ajuste** — provavelmente na etapa de `npm ci` com workspaces. Vale rodar antes de planejar a infra em cima dele.
