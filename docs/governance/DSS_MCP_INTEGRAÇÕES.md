# DSS — Guia de Integração MCP

Este documento descreve como configurar cada servidor MCP registrado no `.mcp.json` do projeto.

---

## Servidores Registrados

| Servidor | Tipo | Status | Pré-requisito |
|---|---|---|---|
| `dss` | stdio local | ✅ Ativo | Nenhum — build local |
| `github` | stdio via npx | ⚙️ Requer token | GitHub Personal Access Token |
| `figma-desktop` | HTTP local | ⚙️ Requer app | Figma Desktop com Dev Mode ativo |
| `storybook` | HTTP local | ⚙️ Requer dev server | Storybook rodando na porta 6006 |

---

## 1. DSS MCP (dss)

Servidor local do Design System Sansys. Não requer configuração adicional — o build já existe em `./mcp/build/index.js`.

**Verificação:** Ao abrir o Claude Code CLI na raiz do repositório, execute `/mcp` e confirme que `dss` aparece como `✔ connected`.

---

## 2. GitHub MCP (github)

Servidor oficial do GitHub que permite ao Claude gerenciar issues, PRs, commits e repositórios via linguagem natural.

### Configuração

1. Acesse [github.com/settings/tokens](https://github.com/settings/tokens) e crie um **Personal Access Token (Classic)** com os escopos:
   - `repo` (acesso completo ao repositório)
   - `read:org` (leitura de organização, se aplicável)
   - `workflow` (para gerenciar GitHub Actions)

2. Defina a variável de ambiente na sua máquina:

   **Windows (PowerShell):**
   ```powershell
   $env:GITHUB_PERSONAL_ACCESS_TOKEN = "ghp_seu_token_aqui"
   ```

   **WSL/Linux (permanente):**
   ```bash
   echo 'export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_seu_token_aqui"' >> ~/.bashrc
   source ~/.bashrc
   ```

3. Reinicie o Claude Code CLI. O servidor `github` será carregado automaticamente.

### Capacidades disponíveis

- Criar e gerenciar issues e PRs
- Ler e escrever arquivos no repositório
- Verificar status de GitHub Actions
- Pesquisar código e commits

---

## 3. Figma Desktop MCP (figma-desktop)

Servidor HTTP local exposto pelo aplicativo Figma Desktop quando o Dev Mode está ativo. Permite ao Claude ler componentes, variáveis e layouts diretamente dos arquivos Figma.

> **Nota:** O Figma também oferece um servidor remoto (recomendado para a maioria dos casos). Para instalá-lo via plugin oficial, execute no Claude Code CLI:
> ```
> claude plugin install figma@claude-plugins-official
> ```
> O servidor remoto é mais completo e não requer o Figma Desktop aberto.

### Configuração do servidor desktop (alternativa)

1. Abra o **Figma Desktop** (não o web).
2. Abra um arquivo de Design.
3. Clique no toggle **Dev Mode** na barra de ferramentas.
4. No painel direito, ative o **MCP Server**.
5. Copie a URL exibida (padrão: `http://127.0.0.1:3845/mcp`).
6. O servidor ficará ativo enquanto o Figma Desktop estiver aberto com Dev Mode ligado.

### Capacidades disponíveis

- Ler componentes, variáveis e tokens do arquivo Figma
- Gerar código a partir de frames selecionados
- Acessar Code Connect para alinhar design e implementação

---

## 4. Storybook MCP (storybook)

Servidor HTTP exposto pelo Storybook quando o dev server está rodando. Permite ao Claude consultar componentes documentados, gerar stories e executar testes de interação.

> **Atenção:** Atualmente o Storybook MCP suporta apenas projetos **React**. O DSS é Vue/Quasar — esta integração é experimental e pode ter suporte limitado.

### Configuração

1. Instale o addon no projeto Storybook do DSS:
   ```bash
   npx storybook add @storybook/addon-mcp
   ```

2. Inicie o Storybook:
   ```bash
   npm run storybook
   ```

3. O servidor MCP estará disponível em `http://localhost:6006/mcp`.

4. O Claude Code CLI detectará automaticamente o servidor quando o Storybook estiver rodando.

### Capacidades disponíveis

- Listar todos os componentes documentados
- Consultar props e exemplos de uso
- Gerar stories automaticamente
- Executar testes de interação

---

## Observações Importantes

**Servidores HTTP (Figma e Storybook)** só ficam disponíveis quando os respectivos serviços estão rodando. Se o Claude Code CLI for iniciado sem eles, os servidores aparecerão como `failed` no `/mcp` — isso é esperado e não impede o uso dos outros servidores.

**Variáveis de ambiente** como `GITHUB_PERSONAL_ACCESS_TOKEN` devem ser definidas no ambiente do terminal onde o Claude Code CLI é executado, não no `.mcp.json` (por segurança — o `.mcp.json` é commitado no repositório).

**Servidor remoto do Figma** (via `claude plugin install`) é a opção recomendada pela Figma e substitui o `figma-desktop` com mais funcionalidades e sem depender do app desktop aberto.
