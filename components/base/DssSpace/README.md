# DssSpace

Componente de preenchimento de espaço flexível. Ocupa o espaço disponível restante em um flex container, empurrando elementos para as extremidades.

## Instalação

```javascript
import { DssSpace } from '@dss/components/DssSpace'
```

## Uso Básico

```vue
<!-- Modo flex-grow: empurra elementos para as extremidades -->
<div style="display: flex">
  <span>Logo</span>
  <DssSpace />
  <button>Ação</button>
</div>

<!-- Modo tamanho fixo: 16px entre elementos -->
<div style="display: flex">
  <button>Cancelar</button>
  <DssSpace size="4" />
  <button>Confirmar</button>
</div>
```

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `size` | `SpaceSize` | — | Tamanho fixo (token de spacing). Sem size = flex-grow. |

## Casos de Uso Típicos

- Toolbars: logo + `<DssSpace />` + ações
- Headers: título + `<DssSpace />` + botões à direita
- Rodapés de modal: cancelar + `<DssSpace />` + confirmar
- Espaçamento preciso: `<DssSpace size="4" />` = 16px governado

## Quando NÃO usar

- Entre parágrafos ou cards → use `margin`/`padding`
- Fora de flex container → sem efeito
- Para criar gap uniforme entre múltiplos filhos → use `gap`

## Links

- [Documentação completa](./DssSpace.md)
- [API Reference](./DSSSPACE_API.md)
- [Exemplos interativos](./DssSpace.example.vue)
