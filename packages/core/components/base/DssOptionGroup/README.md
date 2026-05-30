# DssOptionGroup

**Design System Sansys — Container de Seleção em Grupo**

Container de seleção que agrupa múltiplos controles (Radio, Checkbox ou Toggle) gerenciando o estado via `v-model`. Renderiza explicitamente DssRadio, DssCheckbox ou DssToggle (Fase 1) — sem wrapper de QOptionGroup.

---

## Quando usar

- Selecionar uma opção exclusiva (radio group)
- Selecionar múltiplas opções independentes (checkbox group)
- Ativar/desativar configurações (toggle group)

## Quando NÃO usar

- Seleção visual compacta (2–5 opções em botões) → usar `DssBtnToggle`
- Muitas opções (>8) → usar `DssSelect`
- Controle único → usar `DssRadio`, `DssCheckbox` ou `DssToggle` diretamente

---

## Uso Básico

```vue
<!-- Radio Group (padrão) -->
<DssOptionGroup
  v-model="selecionado"
  :options="[
    { label: 'Opção A', value: 'a' },
    { label: 'Opção B', value: 'b' },
    { label: 'Opção C', value: 'c' },
  ]"
  aria-label="Escolha uma opção"
/>
```

## Checkbox Múltiplo

```vue
<DssOptionGroup
  v-model="selecionados"
  :options="opcoes"
  type="checkbox"
  aria-label="Selecione as funcionalidades"
/>
<!-- selecionados: ['a', 'c'] -->
```

## Toggle Horizontal

```vue
<DssOptionGroup
  v-model="ativos"
  :options="opcoes"
  type="toggle"
  inline
  aria-label="Configurações ativas"
/>
```

---

## API Resumida

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `v-model` | `any \| any[]` | — | Valor selecionado |
| `options` | `OptionGroupItem[]` | — | Array de opções (**obrigatório**) |
| `type` | `string` | `'radio'` | Tipo de controle: `radio`, `checkbox`, `toggle` |
| `color` | `string` | — | Cor dos controles |
| `inline` | `boolean` | `false` | Layout horizontal |
| `dense` | `boolean` | `false` | Modo compacto |
| `disable` | `boolean` | `false` | Desabilita o grupo |
| `readonly` | `boolean` | `false` | Somente leitura |
| `aria-label` | `string` | — | Label acessível (**recomendado**) |

Documentação completa: [DssOptionGroup.md](./DssOptionGroup.md) | API: [DSSOPTIONGROUP_API.md](./DSSOPTIONGROUP_API.md)
