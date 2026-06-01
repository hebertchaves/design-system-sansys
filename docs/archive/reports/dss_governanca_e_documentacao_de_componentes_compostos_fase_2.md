# DSS — Governança e Documentação de Componentes Compostos
## Fase 2 do Design System Sansys

Este documento define as **regras oficiais de governança, decisão e documentação** para **Componentes Compostos do DSS**, conforme a Fase 2 do PRD.

Componentes compostos representam **padrões de interface reutilizáveis**, formados exclusivamente por componentes DSS, com responsabilidade maior que um componente básico, porém **menor que uma feature ou produto**.

---

## 1️⃣ O que é um Componente Composto DSS

Um componente composto é um componente que:
- Orquestra **dois ou mais componentes DSS** internamente
- Resolve um **padrão recorrente de UI/UX**
- Possui responsabilidade de layout + comportamento
- Não representa lógica de negócio específica

### Exemplos
- DSSForm
- DSSPageHeader
- DSSCardComplex
- DSSFilterPanel

---

## 2️⃣ O que NÃO é um Componente Composto

❌ Feature de produto
❌ Fluxo de negócio
❌ Tela completa
❌ Componente que depende de serviços externos
❌ Wrapper de lógica específica de um produto

> Se depende de regras de negócio → **não é DSS**.

---

## 3️⃣ Quando Criar um Componente Composto

Um componente composto **só deve existir** se:

- [ ] O padrão aparece em **2 ou mais produtos Sansys**
- [ ] A composição se repete de forma consistente
- [ ] A ausência do componente gera duplicação significativa
- [ ] A solução não pode ser resolvida apenas com componentes básicos

---

## 4️⃣ Regras de Composição Interna

- Deve usar **exclusivamente componentes DSS**
- Não pode usar componentes Quasar diretamente
- Não pode redefinir estilos internos dos componentes filhos
- Tokens são consumidos apenas indiretamente (via componentes básicos)

---

## 5️⃣ Customização Permitida

### Permitido
- Slots estruturais documentados
- Configuração de comportamento
- Composição flexível dentro de limites claros

### Proibido
- Exposição de tokens via API
- Customização visual direta
- Sobrescrita de estilos internos

---

## 6️⃣ Documentação Obrigatória (Fase 2)

Todo componente composto **DEVE** ter:

- Visão Geral
- Problema que resolve
- Estrutura de composição (diagrama ou descrição)
- Componentes DSS utilizados
- API pública
- Exemplos de uso
- Anti-patterns
- Limites de responsabilidade
- Governança do componente

> O Checklist Mestre da Fase 1 se aplica **no que for pertinente**, mas não substitui este documento.

---

## 7️⃣ Anti-patterns Específicos

- Componentes compostos gigantes
- API excessivamente configurável
- Mistura de layout e regra de negócio
- Dependência implícita de contexto externo

---

## 8️⃣ Governança e Aprovação

- Componentes compostos exigem aprovação do **Core Team DSS**
- Devem ser propostos via RFC ou issue formal
- Avaliação obrigatória de impacto em Water, Waste e Hub

---

## 9️⃣ Relação com a Fase 1

- Componentes da Fase 1 são pré-requisito
- Nenhum componente composto deve existir sem base sólida
- A Fase 2 **não cria novos tokens**, apenas compõe

---

## Regra Final

> ❗ **Componentes compostos são ativos estratégicos do DSS. Devem ser poucos, bem definidos e fortemente governados.**

Este documento é parte integrante da governança do Design System Sansys.

