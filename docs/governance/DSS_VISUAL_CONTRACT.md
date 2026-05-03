# DSS Visual Contract & Validation Strategy

> **📅 Criado:** Maio 2026
> **🎯 Objetivo:** Definir a estratégia de validação contínua para garantir que o código dos componentes DSS corresponda à fonte de verdade visual (Figma).

---

## 1. O Problema do Descompasso Visual

Historicamente, o DSS sofria de ambiguidades visuais porque o contrato de dimensões e espaçamentos residia apenas no código SCSS (`_base.scss`). Isso gerava dois problemas:
1. **Inferência por Agentes:** Agentes de IA precisavam inferir o aspecto visual a partir de tokens compostos.
2. **Desatualização Silenciosa:** Se um designer alterasse o Figma, o código ficava desatualizado sem que nenhum teste falhasse.

## 2. A Solução em 3 Camadas

Para resolver isso, o DSS implementa uma governança visual em três camadas:

### Camada 1: Contrato Estático (`defaultPreview`)
Todo componente DSS possui um campo `defaultPreview` em seu `dss.meta.json`. Este campo declara explicitamente as dimensões computadas, tokens aplicados e props padrão esperadas para a renderização canônica do componente.

### Camada 2: Árbitro Visual (Figma)
O Figma é declarado normativamente como a **fonte de verdade visual** (Princípio #11 do `CLAUDE.md`). Em caso de divergência entre o `defaultPreview` e o Figma, o Figma tem precedência. Agentes DEVEM consultar o Figma via MCP em caso de ambiguidade.

### Camada 3: Validação Contínua (Screenshot Testing)
A validação contínua garante que o código renderizado corresponda ao contrato estático e, por extensão, ao Figma.

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
3. **Sincronização Figma-JSON:** Explorar automação para atualizar o `defaultPreview` diretamente a partir de mudanças no Figma via API.
