# DssPageShell — Documento Normativo

> **Status:** `draft` (set/2026). Nasceu no Bloco 2 do plano de contêineres e casca, como a
> última peça da Frente 2.

## 1. Papel

Fixar o arranjo do miolo da tela Sansys: rail de módulos, trilha, board. Não decide conteúdo,
não é a casca inteira.

## 2. O recorte

| Camada | Componente |
|---|---|
| casca externa | `DssLayout` — de quem monta a tela |
| barra superior | `DssAppBar` |
| **miolo** | **`DssPageShell`** |
| conteúdo | slots |

O shell **não** absorve `DssLayout` nem `DssPage`. Absorver travaria o componente num único
arranjo de página e o tornaria inútil em modal, aba ou preview — e o `DssLayout` do Quasar já
tem a própria regra de viewport, que é dele.

## 3. Subcomponente

`DssPageShellRailItem` mora em `1-structure/` e é exportado pelo barrel — mesmo padrão de
`DssCardSection` e `DssCardActions`. O contrato cobre a família, também como no `DssCard`.

Ele existe porque a alternativa era o consumidor escrever `<button>` cru com um `DssIcon`
dentro, que é o que as telas faziam — e sem nome acessível.

## 4. Os defeitos da tela de origem que o componente corrige

Três, todos medidos:

1. **Os separadores do rail não existiam.** A tela escrevia
   `border-bottom: 1px solid var(--dss-border-water-700)`, e `--dss-border-water-700` é um
   **shorthand completo** (`1px solid <cor>`). A declaração virava `1px solid 1px solid
   #0356a1` — inválida, descartada pelo navegador, sem erro. Medido:
   `border-bottom-width: 0px`.
2. **O rail estava preso à marca Water.** Mesmo token. Numa tela Hub ou Waste o separador
   sairia azul. O componente usa `--dss-action-primary-hover`, que `[data-brand]` remapeia.
3. **`height: 100vh` no rail.** A viewport inteira ignora que existe uma barra de aplicação
   acima, e o rail transbordava exatamente a altura dela. O componente usa
   `position: sticky` + `align-self: flex-start` + `max-block-size: 100vh`, que resolve sem a
   conta.

Mais um de higiene: a tela reimplementava `.gm-sr-only` à mão, embora o DSS já tenha o mixin
`dss-visually-hidden`.

## 5. Exceções de gate

Nenhuma.

## 6. O que o componente NÃO faz

- **Não é a casca.** Sem `DssLayout`, sem `DssAppBar`.
- **Não aceita módulos como dados.** Lista de módulos em prop seria reimplementar slot, mal.
- **Não tem largura de rail configurável.** 52px é a medida da casca Sansys, e sai de
  `--dss-touch-target-lg` porque o rail **é** feito de alvos de toque.
- **Não decide a marca.** Consome os tokens de ação; `[data-brand]` faz o resto.
