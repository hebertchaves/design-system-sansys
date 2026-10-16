# DssCompositionGroup

Várias coleções (`DssComposition`) em abas, **sem tirar nenhuma do formulário**. Cada aba
mostra rótulo, contagem e obrigatoriedade, e acende quando a coleção é inválida.

Migração do `JtCompositions`. De-para e decisões:
[`../DssComposition/MIGRATION_JTECH_COMPOSITION.md`](../DssComposition/MIGRATION_JTECH_COMPOSITION.md).

## Quando usar

- Um cadastro tem **duas ou mais** coleções filhas.

## Quando NÃO usar

- **Uma coleção só.** Use a `DssComposition` sozinha — ela é um campo comum.
- **Abas de navegação de tela.** Use `DssTabs` + `DssTabPanels`.

## O que ele NÃO faz

- Não valida nem expõe `isValid()`: isso é do `DssForm` mestre.
- Não recebe configuração em array (o `compositions` do legado): as coleções são filhos.
- Não desmonta a coleção de aba inativa (risco 5).

## A divergência que governa o componente

Os painéis **não** usam `DssTabPanels`, que monta sob demanda: a coleção de uma aba nunca
aberta sairia do formulário e uma obrigatória vazia passaria no submit. Todas ficam montadas;
a inativa se esconde por `v-show`, e cada `DssComposition` é o próprio `tabpanel`. Exceção
declarada no meta (`EXC-M1-01`).

## API

Referência completa: [`DSSCOMPOSITIONGROUP_API.md`](./DSSCOMPOSITIONGROUP_API.md).

| Prop | Tipo | Padrão |
|---|---|---|
| `modelValue` | `string \| null` | `null` |
| `ariaLabel` | `string` | `'Coleções do cadastro'` |
| `dense` | `boolean` | `true` |
| `brand` | `'hub' \| 'water' \| 'waste' \| null` | `null` |

Eventos: `update:modelValue`. Slots: `default` (somente `DssComposition`). Métodos: nenhum.

## Estados

| Estado | Como aparece |
|---|---|
| coleção inválida | `alert` do `DssTab` + "com erro" no nome acessível da aba |
| aba ativa / hover / foco | do `DssTabs` |
| vazio, carregando, falha | de cada `DssComposition` |

## Tokens

`--dss-spacing-4` (respiro entre abas e painel). Cor nenhuma no SCSS.

## Acessibilidade

- `role="tablist"` vem do `DssTabs`; cada aba aponta o painel (`aria-controls`) e cada painel
  aponta a aba (`aria-labelledby`).
- O nome acessível **começa pelo rótulo visível** (WCAG 2.5.3): "Endereços, 0 registros,
  obrigatória, com erro".
- Setas movem entre as abas (do `DssTabs`).

## Exemplos

### 1 — Três coleções, uma obrigatória

```vue
<DssForm @submit="salvar">
  <DssCompositionGroup v-model="aba">
    <DssComposition name="contatos" label="Contatos" v-model="contatos" row-key="id" :columns="c" />
    <DssComposition name="enderecos" label="Endereços" v-model="enderecos" row-key="id" :columns="c" required />
    <DssComposition name="medidores" label="Medidores" v-model="medidores" row-key="id" :columns="c" readonly />
  </DssCompositionGroup>
</DssForm>
```

### 2 — Aba inicial escolhida

```vue
<DssCompositionGroup model-value="enderecos"> … </DssCompositionGroup>
```

### 3 — Com marca

```vue
<DssCompositionGroup brand="waste"> … </DssCompositionGroup>
```
