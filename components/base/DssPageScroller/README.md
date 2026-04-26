# DssPageScroller

Wrapper DSS governado sobre `QPageScroller`. Exibe um elemento flutuante
(geralmente um botão "Voltar ao Topo") apenas quando o usuário rola a página
além de um limite configurável.

## Instalação

```js
import { DssPageScroller } from '@dss/components'
```

## Uso Básico

```vue
<DssLayout>
  <DssPageContainer>
    <DssPage>
      <DssPageScroller :scroll-offset="1000" :duration="250">
        <q-btn
          round
          color="primary"
          icon="keyboard_arrow_up"
          aria-label="Voltar ao topo"
        />
      </DssPageScroller>

      <!-- Conteúdo longo da página -->
    </DssPage>
  </DssPageContainer>
</DssLayout>
```

## Contexto Estrutural Obrigatório

DssPageScroller **deve** ser usado dentro da cadeia:
```
DssLayout > DssPageContainer > DssPage > DssPageScroller
```

Fora dessa hierarquia, o QPageScroller não detecta o scroll corretamente.

## Props Principais

| Prop | Padrão | Descrição |
|------|--------|-----------|
| `position` | `'bottom-right'` | Posição na tela |
| `scroll-offset` | `1000` | Pixels de scroll antes de aparecer |
| `duration` | `250` | Duração da animação de scroll (ms) |
| `reverse` | `false` | Aparecer ao rolar para cima |

## Acessibilidade

- `aria-label` deve ser definido no **botão interno** (slot default), não no DssPageScroller.
- `prefers-reduced-motion: reduce` → scroll instantâneo (`duration` forçado a 0ms). WCAG 2.3.3.
- Touch target: não aplicável ao wrapper — responsabilidade do conteúdo no slot.

## Modos de Uso

### Voltar ao Topo (Padrão)
```vue
<DssPageScroller :scroll-offset="1000">
  <q-btn round color="primary" icon="keyboard_arrow_up" aria-label="Voltar ao topo" />
</DssPageScroller>
```

### Aparecer ao Rolar para Cima (Reverse)
```vue
<DssPageScroller :scroll-offset="200" reverse>
  <q-btn round color="secondary" icon="keyboard_arrow_down" aria-label="Ir ao fim" />
</DssPageScroller>
```

### Com Brand Hub
```vue
<div data-brand="hub">
  <DssPageScroller :scroll-offset="500">
    <q-btn round color="primary" icon="keyboard_arrow_up" aria-label="Voltar ao topo" />
  </DssPageScroller>
</div>
```

## Links

- [Documentação completa](./DssPageScroller.md)
- [API Reference](./DSSPAGESCROLLER_API.md)
- [Exemplos](./DssPageScroller.example.vue)
