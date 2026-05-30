# DssTimeline

Container de linha do tempo para exibição de eventos cronológicos. Wrapper DSS sobre `QTimeline`.

## Uso Básico

```vue
<DssTimeline layout="comfortable" side="right">
  <DssTimelineEntry
    title="Pedido Criado"
    subtitle="20 Mai 2026, 09:00"
    icon="shopping_cart"
  >
    Seu pedido foi recebido com sucesso.
  </DssTimelineEntry>
  <DssTimelineEntry
    title="Pagamento Confirmado"
    subtitle="20 Mai 2026, 09:15"
    icon="check_circle"
  >
    Pagamento aprovado.
  </DssTimelineEntry>
</DssTimeline>
```

## Com Heading Separator

```vue
<DssTimeline layout="comfortable" side="right">
  <DssTimelineEntry heading title="Março 2026" />
  <DssTimelineEntry title="Evento A" subtitle="01 Mar" icon="star">
    Primeiro evento do mês.
  </DssTimelineEntry>
</DssTimeline>
```

## Brand

```vue
<!-- Via data-brand no wrapper -->
<div data-brand="hub">
  <DssTimeline layout="comfortable">...</DssTimeline>
</div>

<!-- Via classe standalone -->
<DssTimeline class="dss-timeline--brand-water" layout="comfortable">
  ...
</DssTimeline>
```

## Links

- [Documentação completa](./DssTimeline.md)
- [API Reference](./DSSTIMELINE_API.md)
- [Exemplos](./DssTimeline.example.vue)
- [DssTimelineEntry](../DssTimelineEntry/README.md)
