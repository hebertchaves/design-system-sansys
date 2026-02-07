Estrutura Padrão para Páginas de Componentes DSS

Versão 2.3 — Fevereiro 2026

Este documento define a estrutura normativa oficial para todas as páginas de documentação
de componentes do Design System Sansys (DSS) publicadas no repositório Lovable.

Natureza normativa e vinculante.
Este arquivo é a fonte única da verdade estrutural das páginas de componentes.
Nenhuma página pode divergir, simplificar ou reconstruir esta estrutura por inferência.

🔒 Princípios Fundamentais

O DSS é maduro e em produção

Este documento não cria arquitetura, apenas a expõe

Nenhuma informação normativa pode ser:

inferida

duplicada

parcialmente documentada

Omissão silenciosa é erro de auditoria

🧭 Referências Normativas e Precedência

Em caso de conflito, a seguinte hierarquia DEVE ser respeitada:

DSS_ARCHITECTURE.md

COMPONENT_PAGE_STRUCTURE.md (este documento)

DSS/docs/reference/DSS_COMPONENT_ARCHITECTURE.md

DSS/docs/reference/DSS_TOKEN_REFERENCE.md

DSS/docs/reference/DSS_TOKEN_GUIDELINES.md

DSS/docs/governance/DSS_GOLDEN_COMPONENTS.md

DSS/docs/compliance/seals/**

Nenhuma página de componente pode sobrepor essas fontes.

🏷️ Badges, Golden Components e Selos DSS
Golden Component

Um componente SÓ PODE declarar-se Golden Component se estiver listado em:

DSS/docs/governance/DSS_GOLDEN_COMPONENTS.md


A ausência do badge não impede publicação.

Selo DSS v2.2

A conformidade DSS NÃO é inferencial.

📁 Caminho canônico obrigatório do selo:

DSS/docs/compliance/seals/<NomeDoComponente>/<NOME_DO_COMPONENTE>_SELO_v2.2.md


Regras:

Sem selo → sem badge

Código similar ≠ conformidade

Componentes sem selo podem ser documentados, mas não são normativos

🤖 Modo de Operação da IA (Vinculante)

Qualquer IA (Lovable, Claude, etc.) que gere ou edite páginas de componentes DEVE:

Usar este arquivo como referência estrutural

NÃO criar templates paralelos

NÃO inferir:

tokens

WCAG

conformidade

classificação

Declarar explicitamente:

“Não aplicável”

“Não suportado”

“Não utilizado”

Regra de Não-Redundância

Inventários globais vivem em documentos globais

Páginas de componentes referenciam, não duplicam

📋 Hierarquia Oficial das Seções

Todas as páginas de componentes DEVEM seguir a ordem abaixo.

1. Badges de Metadados

Versão

Compatibilidade

Status

Golden Component (se aplicável)

Selo DSS v2.2 (se aplicável)

2. Título do Componente

PageHeader

Ícone

Nome do componente

3. Descrição do Componente ⭐ OBRIGATÓRIO

Esta seção DEVE descrever o **papel funcional do componente na interface**,
orientando **decisões de produto e UX**.

A descrição NÃO é uma definição técnica nem uma lista de capacidades.
Ela deve responder à pergunta:

> “Que tipo de ação ou informação este componente representa para o usuário final?”

#### Estrutura obrigatória da descrição

A descrição DEVE seguir o formato abaixo:

1. **Frase 1 — Papel principal**
   - Declare claramente **o que o componente representa na interface**
   - Use linguagem orientada a ação ou função de UX
   - Comece preferencialmente com:
     - “DssX é o componente utilizado para…”

2. **Frase 2 — Contextos de uso**
   - Indique **quais tipos de ações, decisões ou situações** ele cobre
   - Cite exemplos de uso reais (ex: confirmar, navegar, selecionar, indicar estado)

3. **Frase 3 — Comportamento ou integração**
   - Explique como o componente **se comporta no fluxo**
   - Ou como **se integra a outros componentes**
   - Ex: pode ser aninhado, disparar ações, representar estado, etc.

#### Regras obrigatórias

- Máximo de **3 frases**
- Linguagem de **produto e UX**, não técnica
- ❌ NÃO listar:
  - WCAG
  - Tokens
  - Brandability
  - Governança
- ❌ NÃO usar verbos genéricos como:
  - “representa visualmente”
  - “suporta”
  - “permite”
- ❌ NÃO definir o componente pelo nome ou pela tecnologia

---

#### Exemplos de referência

**Exemplo correto:**

> DssButton é o componente utilizado para representar ações na interface, como confirmar, cancelar, enviar ou navegar.  
> Ele oferece variações visuais e comportamentais bem definidas para diferentes contextos de uso.  
> Pode ser utilizado de forma isolada ou aninhado em outros componentes acionáveis.

**Exemplo incorreto:**

> DssAvatar é o componente para representação visual de usuários, entidades ou placeholders.  
> Suporta brandabilidade multi-marca, status indicators e conformidade WCAG 2.1 AA.

---

> ⚠️ Descrições que não sigam esta estrutura devem ser tratadas como **erro de auditoria**.

4. Quando Usar / Quando NÃO Usar ⭐ OBRIGATÓRIO

Decisão de produto, nunca técnica.

5. Playground Interativo ⭐ OBRIGATÓRIO

Preview

Controles

Código em tempo real

Toggle Light / Dark

Siga as indicações contidas no arquivo DSS/docs/PLAYGROUND_STANDARD.md

6. Estados Interativos ⭐ OBRIGATÓRIO

Tabela única:

Default

Hover

Focus

Active

Disabled

Loading (se aplicável)

Com:

Tokens

WCAG

ARIA

8. Galeria de Variantes (Opcional)

Tabs visuais, sem redundância textual.

9. Anatomia 4 Camadas ⭐ OBRIGATÓRIO

Structure

Composition

Variants

Output

10. Documentação Técnica (Colapsável)
10.1 Props API
10.2 Eventos
10.3 Slots

Ausência deve ser declarada explicitamente.

10.4 Tokens ⭐ (Substitui “Tokens Utilizados”)

Esta seção NÃO lista tokens individualmente, exceto quando o conjunto é fechado.

O que documentar:

Categorias de tokens aceitas

Restrições reais

Relação funcional com o componente

Exemplo:

Cores Semânticas

Brand Tokens

Sizing / Touch Target

Border Radius

Typography

Motion

States

📌 Fonte única da verdade:

DSS/docs/reference/DSS_TOKEN_REFERENCE.md

10.5 Acessibilidade WCAG ⭐ OBRIGATÓRIO

Tabela WCAG completa

Touch Target vs Altura Visual

Media queries:

prefers-reduced-motion

prefers-contrast

forced-colors

11. Anti-patterns ⭐ OBRIGATÓRIO

Mín. 3

Exemplo incorreto + correto

Combinações proibidas (se aplicável)

12. Vinculantes DSS v2.2 ⭐ OBRIGATÓRIO
12.1 Pseudo-elementos

::before → somente touch target

::after → efeitos visuais

Uso indevido = erro bloqueante.

12.2 brightness() — Tabela Canônica

Somente valores aprovados.
Fora da tabela = proibido.

12.3 Classificação do Componente

Action Control

Compact Control

Visual / Identity

Define:

Touch target

Estados obrigatórios

Tokens aplicáveis

✅ Checklist de Validação

(permanece igual, pois já está correto e completo)

📚 Referências Oficiais

DSS/docs/governance/DSS_GOLDEN_COMPONENTS.md

DSS/docs/reference/DSS_TOKEN_REFERENCE.md

DSS/docs/reference/DSS_COMPONENT_ARCHITECTURE.md

DSS/docs/compliance/seals/**

src/pages/components/DssButtonPage.tsx

Mantido por: Equipe Design System Sansys
Versão: 2.3.0
Status: Fonte normativa ativa