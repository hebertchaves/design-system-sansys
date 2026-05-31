# DssItemSection

Container de layout interno para itens de lista. Orquestra o alinhamento e o espaçamento de avatares, ícones, textos e ações secundárias dentro de um `DssItem`.

## Quando Usar

- Para estruturar o layout interno de um `DssItem` com múltiplas zonas (leading, main, trailing)
- Quando a seção deve conter um avatar ou ícone (prop `avatar`)
- Quando a seção deve estar alinhada à direita com ações secundárias (prop `side`)
- Quando o item possui múltiplas linhas e a seção lateral deve ancorar ao topo (prop `top`)

## Quando NÃO Usar

- **Não usar** fora de um `DssItem`
- **Não usar** para layouts que não sejam de lista (usar containers genéricos)
- **Não usar** `avatar=true` e `side=true` simultaneamente no mesmo elemento
- **Não usar** `avatar=true` e `thumbnail=true` simultaneamente

## Instalação

```js
import { DssItemSection } from '@dss/components/base/DssItemSection'
```

## Uso Básico

```vue
<DssItem>
  <DssItemSection avatar>
    <DssAvatar color="primary" icon="person" />
  </DssItemSection>
  <DssItemSection>
    <span>Ana Silva</span>
  </DssItemSection>
  <DssItemSection side>
    <DssIcon name="chevron_right" />
  </DssItemSection>
</DssItem>
```

## Exemplos

### Seção Principal com Texto

```vue
<DssItem>
  <DssItemSection>
    <span>Conteúdo principal da lista</span>
  </DssItemSection>
</DssItem>
```

### Com Avatar + Texto

```vue
<DssItem>
  <DssItemSection avatar>
    <DssAvatar color="primary" icon="person" />
  </DssItemSection>
  <DssItemSection>
    <div>Nome do Usuário</div>
    <div>Cargo</div>
  </DssItemSection>
</DssItem>
```

### Ação Secundária (side)

```vue
<DssItem clickable>
  <DssItemSection>
    <span>Item com navegação</span>
  </DssItemSection>
  <DssItemSection side>
    <DssIcon name="chevron_right" />
  </DssItemSection>
</DssItem>
```

### Alinhamento ao Topo (top) — Multi-linha

```vue
<DssItem>
  <DssItemSection avatar top>
    <DssAvatar color="primary" icon="article" />
  </DssItemSection>
  <DssItemSection>
    <div>Título do Documento</div>
    <div>Descrição longa do documento com múltiplas linhas de texto explicativo.</div>
  </DssItemSection>
  <DssItemSection side top>
    <span>há 2 dias</span>
  </DssItemSection>
</DssItem>
```

## API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `avatar` | `Boolean` | `false` | Seção de avatar — ajusta largura e espaçamento para DssAvatar/DssIcon |
| `thumbnail` | `Boolean` | `false` | Seção de thumbnail — ajusta largura para imagem em miniatura |
| `side` | `Boolean` | `false` | Seção lateral — alinhamento à direita para ações secundárias |
| `top` | `Boolean` | `false` | Alinha o conteúdo ao topo (útil em itens multi-linha) |
| `noWrap` | `Boolean` | `false` | Impede quebra de linha do conteúdo interno |

### Slots

| Slot | Descrição |
|------|-----------|
| `default` | Conteúdo da seção. Aceita DssAvatar, DssIcon, DssItemLabel, DssBadge, DssButton, etc. |

### Eventos

Nenhum. DssItemSection é não-interativo.

## Acessibilidade

- Elemento de apresentação (`div` genérico sem role ARIA explícito)
- Sem touch target próprio — interatividade pertence ao DssItem pai
- Conteúdo interativo dentro da seção gerencia sua própria acessibilidade
- Compatível com leitores de tela via estrutura semântica do DssItem

## Tokens Utilizados

**Base:** `--dss-font-family-sans` · `--dss-font-size-md` · `--dss-text-body` · `--dss-text-inverse`

**Espaçamento (Override Quasar — EXC-01):** `--dss-spacing-3` · `--dss-spacing-4`

**Layout:** `--dss-compact-control-height-md`

## Referências

- [Contexto pai: DssItem](../DssItem/README.md)
- [Container pai: DssList](../DssList/README.md)
- [Componente futuro: DssItemLabel](../DssItemLabel/README.md)
- [Golden Reference: DssAvatar](../DssAvatar/README.md)
