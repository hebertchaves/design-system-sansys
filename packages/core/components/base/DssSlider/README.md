# DssSlider

Controle de seleção de valor numérico por arrasto. Wrapper do `QSlider` do Quasar com governança total de tokens DSS.

## Quando usar

- Seleção de um valor em uma faixa numérica contínua (volume, brilho, temperatura, preço)
- O usuário precisa de feedback visual imediato da posição
- A precisão exata é menos importante que a experiência de arrasto

## Quando NÃO usar

- Seleção de valor exato → use `DssInput` com `type="number"`
- Seleção de intervalo (min–max) → use `DssRangeSlider` (Fase 2)
- Seleção entre opções discretas → use `DssSelect` ou `DssRadio`

## Quick Start

```vue
<DssSlider v-model="volume" :min="0" :max="100" aria-label="Volume" />
```

## Variantes e Props Principais

```vue
<!-- Com label tooltip -->
<DssSlider v-model="value" :label="true" :labelAlways="true" />

<!-- Com marcadores de passo -->
<DssSlider v-model="value" :step="10" :markers="true" :snap="true" />

<!-- Com hint -->
<DssSlider v-model="brightness" :min="0" :max="100" hint="Ajuste o brilho da tela" />

<!-- Com erro -->
<DssSlider
  v-model="value"
  :error="true"
  error-message="Valor fora do intervalo permitido"
/>

<!-- Dense -->
<DssSlider v-model="value" :dense="true" />

<!-- Com brand -->
<DssSlider v-model="value" brand="hub" />

<!-- Desabilitado -->
<DssSlider v-model="value" :disabled="true" />

<!-- Vertical (requer height no container) -->
<div style="height: 200px">
  <DssSlider v-model="value" :vertical="true" />
</div>
```

## Brandabilidade

```vue
<!-- Via prop brand -->
<DssSlider v-model="value" brand="hub" />
<DssSlider v-model="value" brand="water" />
<DssSlider v-model="value" brand="waste" />

<!-- Via contexto ancestral -->
<div data-brand="hub">
  <DssSlider v-model="value" />
</div>
```

## Acessibilidade

- `aria-label` **obrigatório** quando não houver label visual associado
- Navegação por teclado: Tab (foco), Arrow Left/Right (decremento/incremento), Home/End (min/max)
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` gerenciados pelo QSlider
- Error message associada via `aria-describedby`

## Tokens Principais

| Finalidade | Token |
|-----------|-------|
| Fill (trilha ativa) | `--dss-action-primary` |
| Thumb (indicador) | `--dss-action-primary` |
| Trilha de fundo | `--dss-surface-muted` |
| Erro | `--dss-feedback-error` |
| Desabilitado | `--dss-surface-disabled` / `--dss-gray-400` |
| Focus ring | `--dss-shadow-focus` |
| Touch target | `--dss-touch-target-md` (44px) |

## API Completa

→ Ver [DSSSLIDER_API.md](./DSSSLIDER_API.md)

## Links

- [Quasar QSlider](https://quasar.dev/vue-components/slider)
- [Golden Reference: DssToggle](../DssToggle/DssToggle.md)
- [Golden Context: DssInput](../DssInput/DssInput.md)
