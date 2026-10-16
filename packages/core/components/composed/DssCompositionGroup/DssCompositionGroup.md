# DssCompositionGroup — contrato normativo

## Decisão

O grupo **mostra**; não valida. Cada `DssComposition` é um campo registrado no `DssForm`
mestre, e o grupo só reflete, na aba, o estado que cada uma informa por provide/inject
tipado (`DSS_COMPOSITION_GROUP_KEY`).

## Risco 5 — aba nunca aberta

O `useFormChild` registra o campo no `onMounted` e o remove no `onBeforeUnmount`. Painel
montado sob demanda deixa a coleção de uma aba nunca aberta fora do formulário. O
`JtCompositions` tinha o mesmo furo (`isValid()` tratava `$ref` inexistente como válido).

**Mitigação:** todas montadas, inativa por `v-show`. **Prova:** com a coleção de aba inativa
fora da validação, o teste "coleção obrigatória vazia numa aba NUNCA ABERTA reprova o
mestre" falha.

## Registro, não varredura

As coleções se registram no grupo. O grupo não inspeciona VNodes do slot: a ordem de montagem
é a ordem das abas, e a forma do slot (v-for, v-if, fragmentos) não importa.

## Marca

`brand` vira `data-brand` na raiz e é repassado ao `DssTabs`. Nada é pintado em `_brands.scss`.

## Responsabilidade do consumidor

- Dar `name` único a cada `DssComposition` (aviso em DEV se faltar).
- Pôr só `DssComposition` no slot.
