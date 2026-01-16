# DSS — Checklist de Documentação de Componentes

Este documento define o **Checklist de Referência para Documentação de Componentes do Design System Sansys (DSS)**.

Ele é derivado da Seção 13.1 (Governança) do PRD e tem como objetivo:
- garantir **consistência documental**
- reduzir subjetividade em revisões
- permitir **escala saudável** do DSS

---

## 1️⃣ Princípios de Documentação

### Golden Sample

O **DSSButton** é o componente de referência oficial. Use-o como modelo para estrutura, profundidade e qualidade de documentação.

### Fonte da Verdade

A **documentação oficial do Quasar** do componente equivalente (q-btn, q-input, etc.) deve ser consultada como base. A documentação DSS complementa e adapta, não reinventa.

### Regra de Ouro

> ❗ **Nunca invente informação para preencher uma seção. Se não há conteúdo relevante, a seção pode ser omitida ou marcada como N/A.**

---

## 2️⃣ Checklist de Referência (11 Seções)

As seções abaixo servem como **guia de referência**. Preencha as seções que tiverem conteúdo relevante baseado na pesquisa do componente Quasar equivalente.

### 📘 1. Visão Geral
- [ ] Descrição clara do componente
- [ ] Responsabilidade principal definida

---

### 📘 2. Quando Usar / Quando Não Usar
- [ ] Casos de uso recomendados
- [ ] Casos de uso proibidos ou inadequados

---

### 📘 3. Anatomia do Componente
- [ ] Estrutura visual descrita
- [ ] Partes nomeadas claramente

---

### 📘 4. Tokens Utilizados
- [ ] Lista explícita de tokens consumidos
- [ ] Nenhum token específico de componente criado
- [ ] Fallbacks semânticos descritos

---

### 📘 5. API Pública
- [ ] Props documentadas
- [ ] Slots documentados (quando existirem)
- [ ] Eventos documentados

---

### 📘 6. Estados
- [ ] Estados suportados listados
- [ ] Prioridade entre estados definida

---

### 📘 7. Acessibilidade
- [ ] Considerações de teclado
- [ ] ARIA quando aplicável
- [ ] Estados de foco descritos

---

### 📘 8. Exemplos de Uso
- [ ] Exemplo básico
- [ ] Exemplo avançado (quando aplicável)

---

### 📘 9. Anti-patterns
- [ ] Uso incorreto documentado
- [ ] Justificativa do porquê é incorreto

---

### 📘 10. Troubleshooting
- [ ] Problemas comuns documentados
- [ ] Soluções recomendadas

---

### 📘 11. Governança do Componente
- [ ] Extensões permitidas
- [ ] Extensões proibidas
- [ ] Critérios para evolução

---

## 3️⃣ Fluxo de Documentação

```
1. Consultar documentação do Quasar (q-componente)
   ↓
2. Identificar seções com conteúdo relevante
   ↓
3. Adaptar e complementar para contexto DSS
   ↓
4. Omitir seções sem conteúdo (não inventar)
   ↓
5. Revisar usando DSSButton como referência
```

---

## 4️⃣ Regras de Governança

- O **DSSButton** é o Golden Sample oficial
- Consultar documentação Quasar é obrigatório antes de documentar
- Seções sem conteúdo relevante podem ser omitidas
- Exceções devem ser explicitadas na documentação
- Revisores validam qualidade, não quantidade de seções

---

## 5️⃣ Integração com PR Checklist

Nenhuma PR de componente DSS deve ser aprovada sem:
- [ ] Documentação criada seguindo este checklist como referência
- [ ] Consulta à documentação Quasar realizada
- [ ] Seções omitidas justificadas (quando questionado)
- [ ] Documentação revisada

---

## Regra Final

> ❗ **Documentação não é opcional no DSS. A qualidade importa mais que a quantidade de seções preenchidas.**

Este checklist é parte integrante da governança do Design System Sansys.
