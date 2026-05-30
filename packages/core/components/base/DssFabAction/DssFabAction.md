# DssFabAction — Documentação Normativa

> **Template 13.1 — Componente DSS v2.2**  
> **Família:** FAB | **Fase:** 2 | **Nível:** 3  
> **Status:** Conformante  
> **Golden Reference:** DssChip | **Golden Context:** DssFab

---

## 1. Identidade do Componente

**Nome:** DssFabAction  
**CSS Class:** `.dss-fab-action`  
**Quasar base:** `QFabAction`

### O que é

DssFabAction é o botão de ação secundário do sistema FAB do Design System Sansys. Envolve o `QFabAction` do Quasar com governança de tokens DSS, touch target WCAG e brandabilidade.

### Quando usar

- Como filho direto do `DssFab` para expor ações secundárias específicas
- Quando o usuário precisa de acesso rápido a 2–5 ações relacionadas
- Em contextos onde o espaço de tela é limitado e as ações são frequentes

### Quando NÃO usar

- Fora do contexto do `DssFab` — use `DssButton` para ações em linha
- Para ações destrutivas que exigem confirmação — use dialogs
- Quando o número de ações excede 5 — prefira `DssMenu`
- Como substituto de navegação principal

---

## 2. Arquitetura

### Decisão: WRAP (não rebuild)

O DssFabAction envolve o `QFabAction` ao invés de reconstruir do zero.

**Justificativa:**
- `QFabAction` fornece animação de entrada/saída via QFab nativo
- Acessibilidade WAI-ARIA gerenciada pelo Quasar (role, aria-label)
- Navegação via `router-link` sem reimplementação
- Gerenciamento de label externo (`external-label`) nativo

**Estrutura DOM resultante:**
```html
<div class="dss-fab-action [modificadores]">         <!-- wrapper DSS -->
  <div class="dss-fab-action__qaction">              <!-- q-fab-action -->
    <button class="q-fab__action">                   <!-- gate exception -->
      <i class="q-fab__action-icon material-icons">  <!-- gate exception -->
        mail
      </i>
    </button>
  </div>
</div>
```

### Touch Target — Opção B

O DssFabAction adota a **Opção B** do DSS para touch target (WCAG 2.5.5):

| Abordagem | Quando usar | DssFabAction |
|-----------|-------------|--------------|
| Opção A | Tamanho visual ≥ 44px | ❌ (visual = 40px) |
| Opção B | Tamanho visual < 44px → `::before` | ✅ |

O `::before` em `.q-fab__action` expande a área tocável para `--dss-touch-target-md` (44px) sem alterar o tamanho visual (40px via `--dss-spacing-10`).

---

## 3. Props

### Expostas (governadas pelo DSS)

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `color` | `string` | `'primary'` | Cor do botão |
| `text-color` | `string` | — | Cor do ícone/texto |
| `icon` | `string` | — | Ícone Material Icons |
| `label` | `string` | — | Label inline (modo Extended) |
| `external-label` | `string` | — | Label flutuante externo |
| `label-position` | `FabActionLabelPosition` | `'left'` | Posição do label externo |
| `to` | `string\|object` | — | Rota Vue Router |
| `href` | `string` | — | URL externa |
| `target` | `string` | `'_self'` | Alvo do link |
| `disable` | `boolean` | `false` | Estado desabilitado |
| `brand` | `FabActionBrand\|null` | `null` | Acento de marca |
| `aria-label` | `string` | — | Label acessível |

### Bloqueadas (QFabAction API)

| Prop | Justificativa |
|------|---------------|
| `glossy` | Fora da linguagem visual DSS |
| `push` | Fora da linguagem visual DSS |
| `flat` | FabAction sempre elevado (Material Design) |
| `outline` | Idem flat |
| `unelevated` | Idem flat |
| `padding` | Governado por `--dss-padding-4` internamente |

---

## 4. Estados

### Hierarquia de estados DSS

`disabled` > `active` > `hover` > `focus` > `default`

### Implementação

| Estado | Mecanismo | Comportamento |
|--------|-----------|---------------|
| `default` | — | `--dss-elevation-1`, shape circular |
| `hover` | `:hover:not([disabled])` | `--dss-elevation-2` |
| `focus` | `:focus-visible` | `--dss-focus-ring` + `outline-offset: 2px` |
| `active` | `:active:not([disabled])` | `--dss-elevation-2` |
| `disabled` | `.dss-fab-action--disabled` | Opacidade 0.4, pointer-events none |

### Dark Mode (EXC-States-02)

```scss
[data-theme="dark"] {
  .dss-fab-action__qaction .q-fab__action:focus-visible {
    outline: 2px solid white; /* EXC-States-02 */
    outline-offset: 2px;
  }
}
```

**Justificativa:** Token `--dss-focus-ring-dark` não existe no catálogo DSS v2.2. Padrão idêntico ao DssFab (selado Mai 2026).

---

## 5. Brandabilidade

### Mecanismo

Acento de marca via `inset box-shadow` na borda inferior do botão circular. Funciona independentemente da cor do botão.

### Aplicação

```vue
<!-- Via prop brand no DssFabAction -->
<DssFabAction color="primary" icon="mail" brand="hub" />

<!-- Via data-brand no container pai -->
<div data-brand="hub">
  <DssFab v-model="open" icon="add">
    <DssFabAction color="primary" icon="mail" />
  </DssFab>
</div>
```

### Tokens de Brand (por marca)

| Marca | Light | Dark |
|-------|-------|------|
| Hub | `--dss-hub-600` | `--dss-hub-400` |
| Water | `--dss-water-500` | `--dss-water-400` |
| Waste | `--dss-waste-600` | `--dss-waste-500` |

---

## 6. Acessibilidade

### WCAG 2.5.5 — Touch Target

- **Requisito:** Área tocável mínima 44×44px
- **Implementação:** `::before` pseudo-element em `.q-fab__action`
- **Token:** `--dss-touch-target-md` (44px)
- **Nota:** `::before` é EXCLUSIVAMENTE para touch target no DSS (Princípio #7)

### WCAG 2.4.7 — Focus Visível

- **Light mode:** `--dss-focus-ring` via `outline`
- **Dark mode:** `outline: 2px solid white` (EXC-States-02)

### Navegação por Teclado

Gerenciada pelo QFab pai:
- `Tab` — navega entre DssFabActions expostos
- `Enter` / `Space` — ativa a ação
- `Escape` — fecha o DssFab (colapsa as ações)

### Screen Readers

- `aria-label` disponível para contextos sem texto visível (ícone sem `label` ou `external-label`)
- **Recomendação:** Sempre fornecer `aria-label` quando apenas `icon` é exibido

### ⚠️ Comportamento de `$attrs` — ARIA Attributes

O componente usa `inheritAttrs: false` com `v-bind="$attrs"` no `<div>` wrapper externo.

**Consequência:** atributos ARIA passados diretamente pelo consumidor (ex.: `aria-labelledby`, `aria-describedby`) serão aplicados ao `<div>` wrapper (role implícito: `none`), **não** ao `<button>` interno renderizado pelo QFabAction.

```vue
<!-- ❌ Risco: aria-labelledby vai para o <div>, não para o <button> -->
<DssFabAction aria-labelledby="label-externo" icon="mail" />

<!-- ✅ Correto: usar a prop ariaLabel -->
<DssFabAction aria-label="Enviar e-mail" icon="mail" />
```

**Regra:** Use **sempre a prop `ariaLabel`** para rotular DssFabActions acessivelmente. Não passe atributos ARIA diretamente como atributos do componente. Este comportamento é herdado do DssFab (selado Mai 2026 com o mesmo padrão).

---

## 7. Gate de Composição v2.4

### Exceções documentadas

Os seletores abaixo acessam elementos DOM internos do QFabAction (Quasar Framework), **não** subcomponentes DSS. O Gate de Composição v2.4 aplica-se exclusivamente a componentes DSS filhos.

| Seletor | Tipo | Justificativa |
|---------|------|---------------|
| `.dss-fab-action__qaction .q-fab__action` | Quasar internal | Necessário para touch target, elevação e focus ring |
| `.dss-fab-action__qaction .q-fab__action-icon` | Quasar internal | Potencial ajuste de ícone em variantes futuras |

**Precedente:** DssFab `gateExceptions → .q-fab__trigger` (selado Mai 2026).

---

## 8. Variantes

### Standard (padrão)

Botão circular com ícone apenas.

```vue
<DssFabAction color="primary" icon="mail" aria-label="E-mail" />
```

### Extended

Botão pill com ícone + label inline. Ativado via prop `label`.

```vue
<DssFabAction color="primary" icon="mail" label="E-mail" />
```

### Label Externo

Botão circular com label flutuante ao lado. Ativado via `external-label`.

```vue
<DssFabAction
  color="primary"
  icon="mail"
  external-label="Enviar e-mail"
  label-position="left"
/>
```

---

## 9. Relação com DssFab

DssFabAction é projetado exclusivamente como filho do DssFab:

```vue
<DssFab v-model="fabOpen" icon="add" active-icon="close">
  <!-- Slot default → DssFabAction -->
  <DssFabAction color="primary" icon="mail" aria-label="E-mail" />
  <DssFabAction color="secondary" icon="alarm" aria-label="Alarme" />
</DssFab>
```

**Responsabilidades:**

| Responsabilidade | DssFab | DssFabAction |
|-----------------|--------|--------------|
| Estado de expansão | ✅ | ❌ |
| Direção de animação | ✅ | ❌ |
| Posicionamento | ❌ (DssPageSticky) | ❌ |
| Executar ação | ❌ | ✅ |
| Navegação | ❌ | ✅ |

---

## 10. Reservas técnicas

1. **Brand tokens numéricos** — tokens semânticos de brand ainda não existem no catálogo v2.2. Padrão consistente com DssFab, DssCard, DssBtnDropdown.
2. **`labelPosition` default `'left'`** — compatível com `direction="up"` (padrão do DssFab). Consumidores com outras direções devem ajustar `labelPosition` explicitamente.
3. **Sem unit tests** — componentes DSS não têm testes unitários automatizados em v2.2.
