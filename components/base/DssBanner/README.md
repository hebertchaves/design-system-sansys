# DssBanner

Componente de banner para exibição de mensagens informativas, de sucesso, aviso ou erro de forma proeminente e acessível.

## Instalação

```js
import { DssBanner } from '@dss/components'
```

## Uso Básico

```vue
<!-- Informativo -->
<DssBanner variant="info">
  Uma nova versão está disponível.
</DssBanner>

<!-- Erro com descarte -->
<DssBanner variant="error" dismissible @dismiss="bannerVisible = false">
  Não foi possível salvar as alterações.
</DssBanner>

<!-- Aviso com ações -->
<DssBanner variant="warning">
  <template #default>Sessão expira em 5 minutos.</template>
  <template #actions>
    <DssButton variant="flat" size="sm" label="Renovar sessão" />
  </template>
</DssBanner>
```

## Variantes

| Valor | Uso | role | aria-live |
|-------|-----|------|-----------|
| `default` | Mensagens neutras | `status` | `polite` |
| `info` | Informações gerais | `status` | `polite` |
| `success` | Operação concluída | `status` | `polite` |
| `warning` | Atenção necessária | `alert` | `assertive` |
| `error` | Falha ou problema crítico | `alert` | `assertive` |

## Quando Usar

- Mensagens de feedback global ou seccional
- Avisos de manutenção ou sistema
- Confirmação de operações concluídas
- Erros de validação de formulário em nível de seção

## Quando NÃO Usar

- Interações urgentes que bloqueiam o fluxo → use `DssDialog`
- Notificações temporárias que somem sozinhas → use `QNotify`/Toast
- Erros de campo individual → use feedback inline do `DssInput`
- Múltiplos avisos críticos simultâneos — considere consolidar em um único banner

## Links

- [Documentação completa](./DssBanner.md)
- [API Reference](./DSSBANNER_API.md)
- [Exemplos interativos](./DssBanner.example.vue)
