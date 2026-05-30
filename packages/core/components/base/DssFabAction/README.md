# DssFabAction

Botão de ação secundário do sistema de FAB (Floating Action Button) do Design System Sansys.

**Família:** FAB | **Fase:** 2 | **Nível:** 3 | **Status:** Conformante

---

## Quick Start

```vue
<DssFab v-model="fabOpen" icon="add" active-icon="close">
  <DssFabAction color="primary" icon="mail" aria-label="Enviar e-mail" />
  <DssFabAction color="secondary" icon="alarm" aria-label="Criar alarme" />
</DssFab>
```

## Quando usar

- Dentro do slot `default` do `DssFab` para listar ações secundárias
- Quando o usuário precisa escolher entre múltiplas ações rápidas
- Para ações frequentes que precisam de acesso imediato sem ocupar espaço de tela fixo

## Quando NÃO usar

- Fora do contexto do `DssFab` — use `DssButton` para ações em linha
- Para ações destrutivas primárias — use dialogs de confirmação
- Quando há mais de 5 ações — prefira menus (`DssMenu`)

---

## Modos de exibição

| Modo | Prop | Descrição |
|------|------|-----------|
| Ícone (padrão) | `icon="mail"` | Botão circular apenas com ícone |
| Extended | `label="Enviar"` | Botão pill com ícone + texto inline |
| Label externo | `external-label="Enviar"` | Botão circular + texto flutuante ao lado |

---

## Props principais

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `color` | `string` | `'primary'` | Cor do botão (paleta Quasar/DSS) |
| `text-color` | `string` | — | Cor do ícone/texto |
| `icon` | `string` | — | Ícone Material Icons |
| `label` | `string` | — | Label inline (modo Extended) |
| `external-label` | `string` | — | Label externo flutuante |
| `label-position` | `'top'\|'right'\|'bottom'\|'left'` | `'left'` | Posição do label externo |
| `to` | `string\|object` | — | Rota Vue Router |
| `href` | `string` | — | URL externa |
| `target` | `string` | `'_self'` | Alvo do link |
| `disable` | `boolean` | `false` | Desabilita o botão |
| `brand` | `'hub'\|'water'\|'waste'\|null` | `null` | Acento de marca |
| `aria-label` | `string` | — | Label acessível |

## Props bloqueadas

As seguintes props do QFabAction são bloqueadas pelo DSS:

| Prop bloqueada | Motivo |
|----------------|--------|
| `glossy` | Não pertence à linguagem visual DSS |
| `push` | Não pertence à linguagem visual DSS |
| `flat` | FabAction é sempre elevado no DSS |
| `outline` | Idem flat |
| `unelevated` | Idem flat |
| `padding` | Governado por tokens internos |

---

## Tokens utilizados

| Token | Valor | Uso |
|-------|-------|-----|
| `--dss-radius-full` | 9999px | Borda circular |
| `--dss-elevation-1` | — | Elevação padrão |
| `--dss-elevation-2` | — | Elevação hover/active |
| `--dss-spacing-10` | 40px | Tamanho visual mínimo |
| `--dss-touch-target-md` | 44px | Touch target WCAG 2.5.5 |
| `--dss-duration-200` | 200ms | Transição |
| `--dss-easing-standard` | — | Curva de animação |
| `--dss-focus-ring` | — | Anel de foco (light mode) |
| `--dss-opacity-disabled` | 0.4 | Opacidade desabilitado |

---

## Eventos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `click` | `MouseEvent` | Emitido ao clicar no botão |

---

## Links

- [Documentação completa](./DssFabAction.md)
- [API Reference](./DSSFABACTION_API.md)
- [Exemplos](./DssFabAction.example.vue)
- [Componente pai: DssFab](../DssFab/README.md)
