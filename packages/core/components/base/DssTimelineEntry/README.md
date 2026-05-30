# DssTimelineEntry

Subcomponente de entrada da `DssTimeline`. Representa um evento individual na linha do tempo. Wrapper DSS sobre `QTimelineEntry`.

## Uso Básico

```vue
<DssTimeline layout="comfortable" side="right">
  <DssTimelineEntry
    title="Evento"
    subtitle="20 Mai 2026, 14:00"
    icon="event"
  >
    Descrição do evento.
  </DssTimelineEntry>
</DssTimeline>
```

## Heading Separator

```vue
<DssTimeline>
  <DssTimelineEntry heading title="Abril 2026" />
  <DssTimelineEntry title="Primeiro Evento" subtitle="01 Abr" icon="star" />
</DssTimeline>
```

## Slots Customizados

```vue
<DssTimelineEntry icon="person">
  <template #title>
    <span>Título</span> <DssBadge label="NOVO" />
  </template>
  <template #subtitle>
    <time datetime="2026-05-20T14:00">Hoje às 14:00</time>
  </template>
  Conteúdo do evento.
</DssTimelineEntry>
```

## Links

- [Documentação completa](./DssTimelineEntry.md)
- [API Reference](./DSSTIMELINEENTRY_API.md)
- [Exemplos](./DssTimelineEntry.example.vue)
- [DssTimeline (container)](../DssTimeline/README.md)
