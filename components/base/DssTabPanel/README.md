# DssTabPanel

Container de conteúdo de aba do Design System Sansys.

Wrapper DSS governado sobre `QTabPanel`. Deve ser usado dentro de `DssTabPanels` (quando implementado) ou `QTabPanels`, sempre em conjunto com `DssTabs` + `DssTab`.

---

## Uso Básico

```vue
<DssTabs v-model="tab">
  <DssTab name="info" label="Informações" />
  <DssTab name="config" label="Configurações" />
</DssTabs>

<q-tab-panels v-model="tab" animated>
  <DssTabPanel name="info">
    <p>Conteúdo de Informações</p>
  </DssTabPanel>
  <DssTabPanel name="config">
    <p>Conteúdo de Configurações</p>
  </DssTabPanel>
</q-tab-panels>
```

> ⚠️ Use `DssTabPanels` quando disponível (Fase 2 — roadmap). Até lá, `QTabPanels` é o container pai.

---

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `string \| number` | — | **Obrigatório.** Identificador do painel (deve ser único no grupo) |
| `disable` | `boolean` | `false` | Desabilita o painel |

---

## Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo livre do painel |

---

## Quando usar

- ✅ Como container de conteúdo associado a uma `DssTab`
- ✅ Dentro de `DssTabs` / `DssTab` / `DssTabPanels` (família Tabs)
- ✅ Para agrupar qualquer conteúdo DSS: formulários, listas, cards

## Quando NÃO usar

- ❌ Fora de um contexto de abas (`DssTabs` + `DssTab`)
- ❌ Como substituto de `DssCard` para superfícies genéricas
- ❌ Como substituto de `DssDrawer` ou `DssDialog` para painéis laterais

---

## Estados

| Estado | Suporte |
|--------|---------|
| `disabled` | ✅ Via prop `disable` |
| `hover` / `focus` / `active` | ❌ Pertencem aos filhos |

---

## Tokens Principais

| Token | Uso |
|-------|-----|
| `--dss-spacing-6` | Padding interno |
| `--dss-opacity-disabled` | Estado disabled |

---

## Links

- [API Completa](./DSSTABPANEL_API.md)
- [Documentação Normativa](./DssTabPanel.md)
- [Exemplos](./DssTabPanel.example.vue)
- [DssTabs](../DssTabs/README.md)
