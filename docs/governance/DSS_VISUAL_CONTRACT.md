> 📌 **Nota de Governança:** O contrato visual normativo e detalhado componente-a-componente foi consolidado em [DSS_REFERENCIA_VISUAL_ANALISE.md](./DSS_REFERENCIA_VISUAL_ANALISE.md). Este documento descreve exclusivamente a **estratégia e arquitetura de validação** (Camadas 1-3) desse contrato.

# DSS Visual Contract & Validation Strategy

> **📅 Criado:** Maio 2026
> **🎯 Objetivo:** Definir a estratégia de validação contínua para garantir que a documentação e os artefatos derivados correspondam à fonte de verdade visual: o **CSS do componente** (Constituição #6 do `CLAUDE.md` — CSS fonte de verdade).
> **⚠️ Revisão (Jun/2026 — Onda P0/T6):** o Figma foi rebaixado na hierarquia — é ferramenta integrável via MCP, sem autoridade normativa.

---

## 1. O Problema do Descompasso Visual

Historicamente, o DSS sofria de ambiguidades visuais porque o contrato de dimensões e espaçamentos residia apenas no código SCSS (`_base.scss`). Isso gerava dois problemas:
1. **Inferência por Agentes:** Agentes de IA precisavam inferir o aspecto visual a partir de tokens compostos.
2. **Desatualização Silenciosa:** Alterações no CSS não eram refletidas na documentação derivada sem que nenhum teste falhasse.

## 2. A Solução em 3 Camadas

Para resolver isso, o DSS implementa uma governança visual em três camadas:

### Camada 1: Contrato Estático (`defaultPreview`)
Todo componente DSS possui um campo `defaultPreview` em seu `dss.meta.json`. Este campo declara explicitamente as dimensões computadas, tokens aplicados e props padrão esperadas para a renderização canônica do componente.

### Camada 2: Árbitro Visual (CSS do componente)
O **CSS do componente** (`2-composition/_base.scss` e camadas seguintes) é declarado normativamente como a **fonte de verdade visual** (Constituição #6 do `CLAUDE.md`). Em caso de divergência entre o `defaultPreview` e o CSS, o CSS tem precedência. Agentes DEVEM consultar o CSS compilado em caso de ambiguidade. O Figma é ferramenta de apoio via MCP, sem autoridade decisória.

### Camada 3: Validação Contínua (Screenshot Testing)
A validação contínua garante que o contrato estático (`defaultPreview`) e a documentação derivada correspondam ao código renderizado — a fonte de verdade.

## 3. Estratégia de Validação Contínua

A validação contínua será implementada através de uma tool MCP dedicada: `validateVisualContract`.

### Como funciona:
1. A tool lê o `defaultPreview` do `dss.meta.json` do componente.
2. Ela renderiza o componente em um ambiente isolado (ex: Puppeteer/Playwright via script Node).
3. Extrai as dimensões computadas reais (height, width, padding, gap) do DOM renderizado.
4. Compara os valores reais com os valores declarados no `defaultPreview`.
5. Retorna um relatório de conformidade (Pass/Fail) com as divergências detalhadas.

### Benefícios:
- **Feedback Imediato:** Agentes recebem confirmação instantânea se o código SCSS que escreveram produz o resultado visual esperado.
- **Prevenção de Regressão:** Alterações acidentais em tokens globais que afetem componentes específicos serão detectadas.

## 4. Próximos Passos (Roadmap)

1. **Implementar `validateVisualContract`:** Desenvolver o script Node.js e a tool MCP correspondente.
2. **Integração CI/CD:** Adicionar a validação visual ao pipeline de CI do repositório.
3. **Sincronização CSS-JSON:** Explorar automação para atualizar o `defaultPreview` diretamente a partir do CSS compilado do componente (cadeia CSS → meta.json → contrato visual).
