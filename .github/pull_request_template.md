# DSS — Template Oficial de Pull Request (PR)

Este template deve ser utilizado em **todas as Pull Requests relacionadas ao Design System Sansys (DSS)**.

Seu objetivo é garantir clareza de contexto, revisão eficiente e aderência total às diretrizes, governança e padrões definidos no PRD do DSS.

---

## 📌 Descrição da PR

Descreva de forma objetiva **o que está sendo alterado** e **por quê**.

- Problema identificado:
- Solução proposta:
- Motivação / contexto:

---

## 🧩 Tipo de Mudança

Marque todas as opções aplicáveis:

- [ ] Token (criação / ajuste)
- [ ] Componente Básico DSS (wrapper Quasar)
- [ ] Componente Composto DSS
- [ ] Documentação
- [ ] Correção / Refino técnico

---

## 🎯 Impacto

- Produtos impactados:
  - [ ] Sansys Water
  - [ ] Sansys Waste
  - [ ] Sansys Hub

- Tipo de impacto:
  - [ ] Visual
  - [ ] Comportamental
  - [ ] API pública
  - [ ] Breaking change

> Caso seja breaking change, **descrever impacto e plano de migração**.

---

## 🎨 Tokens

- [ ] Todos os valores visuais utilizam tokens DSS
- [ ] Tokens novos/alterados estão documentados
- [ ] Tokens de branding possuem fallback semântico
- [ ] Não há valores hardcoded

---

## 🧱 Componentes DSS

### Componentes Básicos

- [ ] Wrapper explícito de componente Quasar
- [ ] API pública clara e consistente
- [ ] Estados documentados
- [ ] Alinhado ao padrão do DSSButton

### Componentes Compostos

- [ ] Usa exclusivamente componentes DSS internamente
- [ ] Encapsula padrão recorrente de layout/comportamento
- [ ] Não duplica responsabilidades de componentes básicos

---

## 📚 Documentação

- [ ] Documentação criada ou atualizada
- [ ] Estrutura segue o **Template Oficial DSS (Seção 13)**
- [ ] Tokens utilizados estão listados
- [ ] Estados centralizados
- [ ] Anti-patterns documentados
- [ ] Governança do componente definida

---

## ♿ Acessibilidade

- [ ] Navegação por teclado validada
- [ ] Estados de foco visíveis
- [ ] ARIA aplicado quando necessário
- [ ] Casos de uso acessíveis documentados

---

## 🏛️ Governança

- [ ] Alinhado às Diretrizes do DSS (Seção 6)
- [ ] Alinhado à Governança do DSS (Seção 7)
- [ ] Não introduz exceções não documentadas
- [ ] Guia de migração incluído (quando aplicável)

---

## 🔍 Checklist Final

> ⚠️ **Esta PR só deve ser aprovada se todos os itens acima estiverem atendidos.**

- [ ] Revisão técnica realizada
- [ ] Revisão de design realizada (quando aplicável)
- [ ] Aprovação do Core Team DSS

---

## 📎 Referências

- PRD — Design System Sansys
- Diretrizes do DSS
- Checklist Oficial de PR do DSS
- Documentação do componente (quando aplicável)
