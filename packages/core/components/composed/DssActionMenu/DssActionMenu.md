# DssActionMenu

**Design System Sansys — Barra de Ações Composta (Fase 3)**

> 📦 Componente Composto DSS — documentação no Template 13.1.
> **Golden Context:** `DssMultiselectAutocomplete` · **Golden Reference:** `DssChip`

---

## 1. Visão Geral

Barra de comando que agrupa ações relacionadas, em que uma ação pode desdobrar em
sub-ações. Orquestra `DssToolbar` (faixa), `DssButton` (cada ação), `DssMenu` (painel)
e `DssList`/`DssItem` (sub-ações).

**Tipo:** Composto (Fase 3) — nasce da composição de primitivos DSS existentes, sem
base Quasar própria. O `QBtnDropdown` é *um* botão com menu; este é uma *barra*.

### Características

- ✅ Composição pura — nenhum primitivo reimplementado
- ✅ `role="toolbar"` com **roving tabindex** (uma parada de `Tab` para o conjunto)
- ✅ Estado do bloco por `provide/inject` tipado, não prop drilling
- ✅ Um sub-menu aberto por vez, por construção
- ✅ Foco devolvido ao gatilho ao fechar, por qualquer via

---

## 2. Quando Usar / Quando Não Usar

Ver `README.md` §*Quando usar* e §*Quando NÃO usar* — a fronteira com `DssBtnDropdown`,
`DssBtnGroup`, `DssMenu`, `DssTree` e `DssFab` está declarada lá.

---

## 3. Anatomia

```
┌─ DssToolbar  role="toolbar" aria-label ──────────────────────────┐
│  [DssButton]  [DssButton]  [DssButton]  [DssButton ▾]            │
│                                              │                    │
│                                    ┌─────────┴──────────┐         │
│                                    │ DssMenu            │         │
│                                    │  DssList role=menu │         │
│                                    │   DssItem menuitem │         │
│                                    │   DssItem menuitem │         │
│                                    └────────────────────┘         │
└───────────────────────────────────────────────────────────────────┘
```

O painel **teleporta para o `<body>`** (comportamento do QMenu). Tema e marca precisam
estar governados globalmente — é o risco arquitetural nº 1 do componente.

---

## 4. Tokens

Três, e a escassez é o ponto — ver `README.md` §*Tokens*.

---

## 5. API Pública

Ver `DSSACTIONMENU_API.md`.

---

## 6. Estados

Ver `README.md` §*Estados*.

---

## 7. Variantes

`flat` (default) · `outline` · `unelevated`.

**`elevated`, `push` e `glossy` ficaram de fora deliberadamente.** Uma fileira de
botões elevados compete consigo mesma — a barra deixa de ter hierarquia. Quem precisa
de destaque em uma ação usa `color`, não elevação.

---

## 8. Brandabilidade

`brand` no nó raiz vira `data-brand`, que desce por cascata de custom property até
`DssButton` e `DssMenu`. **O SCSS deste componente não pinta marca** — fazê-lo com
primitivo cru é o débito 🟡 aberto em 577 usos no catálogo.

---

## 9. Acessibilidade

Ver `README.md` §*Acessibilidade*.

> **Nota de origem:** o componente legado tinha **zero** `aria-*`, `role`, `tabindex` e
> `@keydown`. Nada da seção de acessibilidade é porte — tudo é construção sob a
> governança do DSS.

---

## 10. Exemplos

`DssActionMenu.example.vue` — cinco cenários, entre eles a barra em header fixo sobre
conteúdo rolável, que é onde o overlay quebra.

---

## 11. Anti-patterns

### ❌ Usar para um gatilho único
```vue
<!-- ERRADO -->
<DssActionMenu aria-label="Opções">
  <DssActionMenuItem name="mais" label="Mais"> … </DssActionMenuItem>
</DssActionMenu>

<!-- CERTO -->
<DssBtnDropdown label="Mais"> … </DssBtnDropdown>
```

### ❌ Sobrescrever a aparência por item
```vue
<!-- ERRADO — a barra perde homogeneidade -->
<DssActionMenuItem name="a" color="negative" size="lg" />
```
Cor, variante e tamanho são decididos **uma vez, na barra**. Foi assim que o componente
de origem acabou com `color="dark"` fixo em cada item.

### ❌ Omitir `ariaLabel`
Uma toolbar sem nome acessível não é anunciável. A prop é obrigatória por isso.

### ❌ `:deep()` para ajustar o painel
Proibido pelo Cartão Composto. O painel é do `DssMenu`; ajuste que ele precise é dele.

---

## 12. Governança

- **Permitido sem aprovação:** props públicas, slots, `data-brand`, tokens `--dss-*`
- **Exige RFC:** nova variante, overflow automático, aninhamento de segundo nível
- **Proibido:** QComponent cru no template, `:deep()` para layout, `$parent`/`$children`

---

## 13. Troubleshooting

**O sub-menu abre atrás do cabeçalho.** O `DssMenu` teleporta para o `<body>`; verifique
se o `[data-theme]` está no `<html>` e não numa div interna. É a mesma causa do defeito
corrigido no `PreviewSubject`.

**O menu abre mas os itens não fazem nada.** As sub-ações precisam de `clickable` e do
próprio `@click` — o `DssItem` não emite ação sozinho.

**As setas não movem o foco.** As ações precisam existir no DOM como
`[data-action-menu-item]`; conteúdo injetado fora do `DssActionMenuItem` não entra na roda.

---

**Última atualização:** setembro/2026
**Versão:** DSS v2.5
**Status:** 📦 Composto Fase 3 — draft, aguardando auditoria independente
