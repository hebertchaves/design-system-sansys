# Estratégia DSS Fase 3 — Complexidade, Aninhamento e IA em Escala

**Data:** Abril 2026  
**Status:** Documento Estratégico e Normativo  
**Autor:** Manus AI

## 1. Visão Geral e Desafios da Fase 3

A Fase 3 do Design System Sansys (DSS) marca a transição de componentes isolados (Fases 1 e 2) para **interfaces complexas, layouts dinâmicos e padrões de composição de alto nível**. Neste estágio, o DSS deixa de ser apenas uma biblioteca de UI e passa a ser a fundação estrutural de produtos inteiros.

Com a adoção massiva de Inteligência Artificial (IA) no ciclo de vida de desenvolvimento (Figma Make, Claude Code, Cursor), surgem dois desafios críticos que podem comprometer a escalabilidade do sistema se não forem mitigados desde o início:

1. **Comunicação e Especificação:** A ambiguidade humana na definição de requisitos leva a IAs gerando componentes que funcionam isoladamente, mas quebram quando integrados.
2. **Aninhamento e Conflitos (Vue/Quasar):** Componentes complexos exigem aninhamento profundo. O encapsulamento de CSS e a passagem de propriedades no Vue 3, combinados com a arquitetura do Quasar, criam armadilhas técnicas severas.

Este documento estabelece as diretrizes, mecanismos de controle e expansões do MCP necessários para garantir que a Fase 3 seja executada com segurança e eficiência.

---

## 2. Riscos Técnicos de Aninhamento (Vue 3 + Quasar)

A composição de componentes complexos revela limitações nas ferramentas base. Os seguintes riscos foram mapeados e devem ser tratados como **Anti-patterns** na Fase 3.

### 2.1. Quebra de Encapsulamento CSS (Specificity Wars)
**O Risco:** Ao aninhar componentes (ex: `DssCard` dentro de `DssDialog` dentro de `DssLayout`), o uso de CSS Scoped (`<style scoped>`) no Vue 3 impede que o componente pai estilize elementos internos do filho sem o uso do seletor `:deep()`. O uso excessivo de `:deep()` cria acoplamento forte e quebra a previsibilidade do design system [1].
**A Solução DSS:**
- **Proibição de `:deep()` para layout:** O layout (margens, posicionamento) deve ser controlado pelo componente pai usando classes utilitárias ou componentes de grid (`DssSpace`, `DssRow`), nunca injetando CSS no filho.
- **Tokens de Contexto:** Utilizar CSS Variables globais que os componentes filhos consomem nativamente, permitindo que o pai altere o valor da variável sem tocar no CSS do filho.

### 2.2. Prop Drilling vs. Provide/Inject
**O Risco:** Passar propriedades (ex: `disabled`, `readonly`, `brand`) através de 4 ou 5 níveis de componentes (Prop Drilling) torna o código frágil e difícil de manter.
**A Solução DSS:**
- **Adoção de `provide/inject` tipado:** Para estados globais de um bloco complexo (ex: um formulário inteiro em modo `readonly`), o componente raiz (ex: `DssForm`) deve usar `provide`, e os componentes folha (`DssInput`) devem usar `inject` com valores default seguros [2].
- **Validação no MCP:** O MCP deve auditar se propriedades de contexto estão sendo passadas manualmente em árvores profundas e sugerir o uso de injeção de dependência.

### 2.3. Conflitos de Slots e `inheritAttrs`
**O Risco:** No Vue 3, atributos não declarados como `props` são automaticamente aplicados ao elemento raiz do componente. Em componentes wrapper do Quasar, isso pode sobrescrever classes internas ou quebrar a acessibilidade (ARIA attributes aplicados no lugar errado) [3].
**A Solução DSS:**
- **`inheritAttrs: false` obrigatório:** Todos os componentes compostos da Fase 3 devem desabilitar a herança automática e repassar os atributos (`v-bind="$attrs"`) explicitamente para o nó correto da árvore.

---

## 3. Evolução da Governança e Comunicação (Humanos ↔ IA)

Para mitigar o problema de "não saber o que se quer", o processo de criação deve exigir rigor na entrada de dados.

### 3.1. O "Contrato de Interface" (Interface Contract)
Antes de qualquer código ser gerado, o Chat Estratégico deve produzir um **Contrato de Interface**. Este documento é mais rigoroso que o pré-prompt da Fase 2 e exige:
1. **Casos de Uso Negativos:** O que o componente *não* deve fazer.
2. **Matriz de Composição:** Quais componentes DSS são permitidos dentro de seus slots.
3. **Estado de Falha:** Como o componente se comporta se a rede falhar ou os dados forem inválidos.

### 3.2. Expansão do MCP: Validador de Contratos
O MCP Fase 4/5 deve incluir uma ferramenta `validate_interface_contract` que analisa a especificação humana e aponta ambiguidades, dependências circulares ou violações das diretrizes do DSS antes de permitir a geração do scaffold.

---

## 4. Expansão do MCP e Integrações Externas

O MCP deixará de ser apenas um assistente de código para se tornar o **Orquestrador de Qualidade** de todo o ciclo de vida.

### 4.1. Integração com Figma (Design ↔ Code)
- **Figma MCP:** O Claude Code poderá ler os tokens e a estrutura diretamente do Figma.
- **Validação Bidirecional:** O MCP comparará a árvore de nós do Figma com a árvore de componentes Vue gerada, alertando se o desenvolvedor (ou a IA) omitiu um wrapper ou usou um componente incorreto.

### 4.2. Integração com Ferramentas de Qualidade
- **Storybook MCP:** Geração automática de stories interativas baseadas no `dss.meta.json`, garantindo que todo estado complexo seja visualizável.
- **Acessibilidade Contínua:** O MCP integrará regras do `axe-core` para validar se a composição de componentes não quebrou a hierarquia de navegação por teclado ou o contraste dinâmico.

### 4.3. Observabilidade de IA (AI Observability)
Conforme definido em `DSS_OBSERVABILITY_SIGNALS.md`, o MCP emitirá sinais (`token_resolution`, `composition_violation`) sempre que uma IA tomar uma decisão arquitetural. Isso cria uma trilha de auditoria: se um componente quebrar em produção, será possível rastrear exatamente qual regra do DSS a IA interpretou de forma incorreta.

---

## 5. Próximos Passos e Ações Imediatas

Para preparar o terreno para a Fase 3, as seguintes ações devem ser priorizadas:

1. **Auditoria de Tokens de Layout:** Revisar se os tokens de espaçamento e grid são suficientes para layouts complexos sem necessidade de CSS customizado.
2. **Prova de Conceito (PoC) de Aninhamento:** Criar um componente "stress test" (ex: um `DssComplexTable` com filtros, paginação e expansão) usando apenas componentes Fase 1 e 2, para identificar gargalos de performance e CSS.
3. **Atualização do Prompt de Criação:** Incorporar as regras de `inheritAttrs: false` e proibição de `:deep()` no prompt de execução das IAs.

---
**Referências:**
[1] Vue.js Core Documentation: Scoped CSS and Deep Selectors.
[2] Vue.js Core Documentation: Provide / Inject.
[3] Vue.js Core Documentation: Fallthrough Attributes.
