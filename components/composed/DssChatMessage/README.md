# DssChatMessage

Componente DSS para exibição de mensagens individuais em interfaces de chat e conversação.

## Instalação

```js
import { DssChatMessage } from '@dss/components'
```

## Uso Básico

```vue
<!-- Mensagem recebida -->
<DssChatMessage
  message="Olá! Como você está?"
  sender-name="Maria Silva"
  timestamp="10:30"
  status="read"
/>

<!-- Mensagem enviada -->
<DssChatMessage
  message="Estou bem, obrigado!"
  :is-mine="true"
  timestamp="10:31"
  status="read"
/>
```

## Com Avatar

```vue
<DssChatMessage
  message="Mensagem com avatar"
  sender-name="João Costa"
  avatar-src="https://example.com/avatar.jpg"
  timestamp="10:00"
/>
```

## Com Ações Contextuais

```vue
<DssChatMessage
  message="Mensagem com ações"
  sender-name="Ana"
  timestamp="10:00"
  @click="handleClick"
  @long-press="handleLongPress"
>
  <template #actions>
    <DssButton flat size="sm" @click.stop="reply">Responder</DssButton>
    <DssButton flat size="sm" @click.stop="forward">Encaminhar</DssButton>
  </template>
</DssChatMessage>
```

## Contêiner de Lista (acessibilidade obrigatória)

```vue
<!-- IMPORTANTE: O contêiner pai DEVE ter role="list" ou role="feed" -->
<div role="list" aria-label="Conversa">
  <DssChatMessage v-for="msg in messages" :key="msg.id" v-bind="msg" />
</div>
```

## Modos

| Prop | Comportamento |
|------|---------------|
| `isMine: false` (padrão) | Alinhamento esquerdo, fundo neutro (`--dss-surface-default`) |
| `isMine: true` | Alinhamento direito, fundo brand primary (com brand context) ou cinza (sem brand) |
| `compact: true` | Espaçamento reduzido, fonte menor — para alta densidade de mensagens |
| `selected: true` | Outline de seleção na bolha |
| `disable: true` | Interações desabilitadas, opacidade reduzida |

## Links

- [Documentação completa](./DssChatMessage.md)
- [API Reference](./DSSCHATMESSAGE_API.md)
- [Exemplos](./DssChatMessage.example.vue)
- [Testes](./DssChatMessage.test.js)
