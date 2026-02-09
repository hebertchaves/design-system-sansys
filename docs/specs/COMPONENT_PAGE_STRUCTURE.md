# Estrutura Padrão para Páginas de Componentes DSS

**Versão 2.3 — Fevereiro 2026**

Este documento define a **estrutura normativa, visual e semântica** para todas as páginas de componentes do **Design System Sansys (DSS)** publicadas no repositório Lovable.

> **Natureza vinculante.** Este arquivo é a **fonte da verdade** para a geração de páginas de componentes. A IA do Lovable DEVE seguir este documento literalmente, sem inferências, simplificações ou reorganizações estruturais.

---

## 🧭 Princípios Estruturais (Leitura Obrigatória)

Antes de aplicar a hierarquia abaixo, a IA DEVE respeitar os seguintes princípios:

1. **A estrutura da página é derivada da página DssAvatar**, que é a referência visual e estrutural atual do DSS.
2. **Não existe uma seção genérica chamada “Documentação Técnica”.**
3. Cada bloco colapsável representa **uma seção independente da página**, no mesmo nível hierárquico.
4. Seções técnicas **NÃO DEVEM ser agrupadas dentro de um único container colapsável**.
5. O objetivo da página é **orientar decisão, uso correto e implementação**, não apenas exibir API.

> ⚠️ Qualquer variação estrutural em relação a este documento é considerada **erro de conformidade**.

---

## 📋 Hierarquia Oficial de Seções

As páginas de componentes DEVEM seguir **exatamente** a ordem abaixo.

---

### 1. Badges de Metadados ⭐ OBRIGATÓRIO

Exibidos no topo da página:

* Versão do componente (ex: `v2.3.0`)
* Compatibilidade (ex: `Quasar Compatible`)
* Status normativo:

  * `Selo DSS v2.2`
  * `Golden Component (normativo)` (se aplicável)
* Links de referência normativa

#### Fonte de verdade dos selos de conformidade

A IA DEVE verificar explicitamente a existência de selos no caminho:

```
DSS/docs/compliance/seals/<NomeDoComponente>/<NOME_DO_COMPONENTE>_SELO_v2.2.md
```

Regras:

* Se o arquivo existir → exibir o badge correspondente
* Se o arquivo NÃO existir → NÃO inferir conformidade
* É proibido assumir selo ou status sem arquivo explícito

---

### 2. Título e Descrição do Componente ⭐ OBRIGATÓRIO

Usar o componente `PageHeader`.

#### 2.1 Título

* Nome do componente (ex: **DssAvatar**)
* Ícone representativo

#### 2.2 Descrição (Regra Reforçada)

A descrição é **parte crítica da documentação** e DEVE ser orientada a **produto e decisão de uso**.

A descrição DEVE responder, em texto corrido:

1. Qual o **papel do componente no produto**
2. Que tipo de **ação, informação ou identidade** ele representa
3. Em quais **contextos de interface** ele aparece
4. Como ele se **relaciona com outros componentes**

##### Exemplo correto (referência normativa):

> **DssButton** é o componente utilizado para representar ações na interface, como confirmar, cancelar, enviar ou navegar. Ele oferece variações visuais e comportamentais bem definidas para diferentes contextos de uso, podendo ser utilizado de forma isolada ou aninhado dentro de outros componentes interativos.

##### Exemplo incorreto (PROIBIDO):

> “Componente visual com suporte a tokens e WCAG.”

Regras:

* Mínimo de 2 frases
* Máximo de 4 frases
* Linguagem de UX + Produto
* Não listar features técnicas

---

### 3. Quando Usar / Quando NÃO Usar ⭐ OBRIGATÓRIO

Seção orientada à **decisão de produto**.

#### Formato obrigatório

```markdown
#### ✅ Quando Usar
- Caso de uso orientado a produto
- Caso de uso orientado a UX
- Caso de uso recorrente

#### ❌ Quando NÃO Usar
| Cenário | Alternativa Recomendada |
|--------|------------------------|
| Cenário inadequado | `OutroComponente` |
```

Regras:

* Mínimo de 3 itens em cada bloco
* Sempre indicar alternativa

---

### 4. Playground Interativo ⭐ OBRIGATÓRIO

* Preview central do componente
* Controles interativos relevantes
* Código gerado em tempo real
* Toggle Light / Dark Mode
* Exclusividade Brand ↔ Color

> O playground DEVE aparecer **antes** de anatomia e documentação técnica.

---

### 5. Estados Interativos ⭐ OBRIGATÓRIO

Os estados DEVEM ser documentados em **uma tabela única**, clara e comparável.

#### Formato obrigatório

```markdown
| Estado | Visual | Interação | Tokens Aplicados | Acessibilidade |
|-------|--------|-----------|------------------|----------------|
| Default | Aparência padrão | Pronto para interação | `--dss-*` | — |
| Hover | Alteração visual | Pointer over | Tokens de hover | — |
| Focus | Focus ring visível | Teclado | `--dss-focus-ring` | WCAG 2.4.7 |
| Active | Pressionado | Clique / toque | Tokens de active | — |
| Disabled | Opacidade reduzida | Não interativo | `--dss-opacity-disabled` | `aria-disabled` |
| Loading | Feedback visual | Bloqueia interação | Tokens de estado | `aria-busy` |
```

Regras:

* Loading é obrigatório apenas se aplicável
* Tokens e critérios WCAG DEVEM ser explícitos

---

### 6. Anatomia 4 Camadas ⭐ OBRIGATÓRIO

Usar o componente `AnatomySection` com as camadas:

1. Structure
2. Composition
3. Variants
4. Output

Cada camada DEVE declarar:

* Responsabilidades
* Arquivos relacionados
* Tipos de tokens envolvidos

---

## 7. Seções Técnicas (Colapsáveis e Independentes) ⭐ OBRIGATÓRIO

Cada item abaixo é uma **seção colapsável independente**, no mesmo nível hierárquico.

> ❌ É proibido agrupar essas seções dentro de um container genérico.

---

### 7.1 Props API & Eventos

* Tabela de Props (agrupadas por categoria)
* Tabela de Eventos emitidos

Regras:

* Se não houver eventos, declarar explicitamente a ausência

---

### 7.2 Slots

* Tabela de slots disponíveis
* Uso recomendado

Regras:

* Se não houver slots, declarar explicitamente

---

### 7.3 Tokens ⭐ OBRIGATÓRIO

Esta seção documenta **capacidade**, não instância.

❌ PROIBIDO listar tokens individuais

✅ OBRIGATÓRIO declarar **TIPOS DE TOKENS aceitos** pelo componente

#### Estrutura obrigatória

```markdown
### Tokens

Este componente aceita os seguintes tipos de tokens DSS:

| Tipo de Token | Papel no Componente | Referência |
|--------------|---------------------|------------|
| Cores Semânticas | Estados e feedback | DSS_TOKEN_REFERENCE.md |
| Brand Tokens | Identidade visual | DSS_TOKEN_REFERENCE.md |
| Dimensões | Tamanhos e touch targets | DSS_TOKEN_REFERENCE.md |
| Tipografia | Texto auxiliar | DSS_TOKEN_REFERENCE.md |
| Bordas | Forma visual | DSS_TOKEN_REFERENCE.md |
| Motion | Transições | DSS_TOKEN_REFERENCE.md |
```

---

### 7.4 Acessibilidade WCAG ⭐ OBRIGATÓRIO

* Tabela de conformidade WCAG
* Touch Target vs Altura Visual
* Media queries de acessibilidade

---

### 8. Anti-patterns ⭐ OBRIGATÓRIO

* Mínimo de 3 usos incorretos
* Exemplo incorreto + correto
* Combinações não permitidas (se aplicável)

---

### 9. Vinculantes DSS v2.2 ⭐ OBRIGATÓRIO

* Uso de pseudo-elementos (`::before` / `::after`)
* Declaração de `brightness()` (ou não uso)
* Classificação do componente (Action / Compact / Visual)

---

### 10. Referências Normativas ⭐ OBRIGATÓRIO

Links explícitos para:

* DSS_TOKEN_REFERENCE.md
* DSS_COMPONENT_ARCHITECTURE.md
* DSS_GOLDEN_COMPONENTS.md
* Selo de conformidade do componente (se existir)

---

### 11. Modo de Operação da IA (Lovable) ⭐ OBRIGATÓRIO

A IA DEVE:

* ❌ Não inferir tokens, selos ou status
* ❌ Não simplificar seções
* ✅ Referenciar sempre documentos oficiais

---

**Mantido por:** Hebert Chaves
**Status:** Documento Normativo
**Versão:** 2.3.0
**Atualizado em:** Fevereiro 2026
