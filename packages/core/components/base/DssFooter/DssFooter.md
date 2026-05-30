# DssFooter — Documentação Normativa DSS v2.2

> **Status:** ✅ CONFORME — Selo DSS v2.2 emitido em 2026-04-18
> **Versão DSS:** 2.2
> **Fase:** 2 — Container Estrutural / Superfície e Layout
> **Golden Reference:** DssCard
> **Golden Context:** DssHeader

---

## 1. Identidade do Componente

### 1.1 Nome e Classificação

- **Nome:** `DssFooter`
- **Família:** Superfícies e Layout
- **Nível de Composição:** Nível 3 (Composição de Segundo Grau)
- **Componente Quasar Base:** `QFooter`
- **Dependência Direta:** `DssToolbar` (Nível 1)

### 1.2 Papel Semântico

DssFooter é o container inferior de layout de página. Encapsula o `QFooter` do Quasar com governança DSS, bloqueando props de cor e aplicando `--dss-surface-default` como fundo padrão.

Como componente de Nível 3, ele **orquestra** DssToolbar (Nível 1) via slot, sem instanciar filhos automaticamente. A composição é responsabilidade do consumidor.

DssFooter é o **par simétrico inferior** do DssHeader. Compartilha a mesma arquitetura, com as adaptações necessárias para sua posição na base da página.

### 1.3 O Que Faz

- Fornece o container `<footer role="contentinfo">` fixo na base da página
- Aplica `--dss-surface-default` como cor de fundo (sobrescreve `bg-primary` do QFooter)
- Gerencia variantes de elevação visual (`elevated`, `bordered`)
- Repassa atributos extras (`reveal`, `aria-label`, etc.) via `$attrs` ao QFooter
- Propaga contexto de layout para DssToolbar e outros filhos

### 1.4 O Que NÃO Faz

- Não define brand/cor — responsabilidade do `DssToolbar` interno
- Não instancia filhos automaticamente
- Não estiliza componentes filhos internamente
- Não possui estados de interação (hover, focus, active)
- Não gerencia z-index (delegado ao Quasar)
- Não expõe prop `color` ou `height-hint` (bloqueadas)

---

## 2. Modelo Arquitetural

### 2.1 Quasar × DSS

- **Quasar** = camada de execução (layout engine, posicionamento fixo, z-index)
- **DSS** = camada de governança (tokens, visual, API controlada)

DssFooter **diverge da API QFooter** intencionalmente:
- Bloqueia `color` e `height-hint`
- Adiciona variantes semânticas (`elevated`, `bordered`)
- Remove comportamentos não utilizados no DSS

### 2.2 Hierarquia de Composição

```
DssLayout (Nível 4 — futuro)
└── DssFooter (Nível 3 — este componente)
    └── DssToolbar (Nível 1 — dependência direta)
        └── DssButton, DssIcon, DssSpace, DssSeparator (Nível 1)
```

---

## 3. API

### 3.1 Props Expostas

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `elevated` | `Boolean` | `false` | Sombra de elevação projetada para cima (EXC-05) |
| `bordered` | `Boolean` | `false` | Borda superior sutil |

### 3.2 Props Bloqueadas

| Prop QFooter | Motivo do Bloqueio |
|---|---|
| `color` | Cor de fundo governada por `--dss-surface-default`. Override via `!important` (EXC-02). |
| `height-hint` | Altura calculada automaticamente pelo Quasar com base no conteúdo. |

### 3.3 Props Repassadas via `$attrs`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `reveal` | `Boolean` | Oculta/exibe o footer ao rolar (nativo QFooter). |

### 3.4 Slots

| Slot | Tipo | Descrição |
|------|------|-----------|
| `default` | `void` | Conteúdo do footer. Deve conter exclusivamente `DssToolbar`. |

### 3.5 Eventos

Nenhum evento próprio. Eventos nativos do QFooter são repassados via `$attrs`.

---

## 4. Acessibilidade

### 4.1 Role e Landmark

- `role="contentinfo"` — aplicado nativamente pelo `QFooter`
- Identifica o rodapé principal da página (landmark HTML5 `<footer>`)
- **Deve existir apenas um `DssFooter` por página** (landmark único)

### 4.2 Atributos Recomendados

```vue
<DssFooter aria-label="Rodapé principal">
```

`$attrs` é encaminhado corretamente via `v-bind="$attrs"`.

### 4.3 Touch Target

Opção B — Não implementado. DssFooter é container estrutural não-interativo. Touch targets são responsabilidade dos filhos (`DssToolbar > DssButton`).

---

## 5. Comportamentos Implícitos

### 5.1 Forwarding de `$attrs`

`inheritAttrs: false` + `v-bind="$attrs"` no `<q-footer>`. Todo atributo não declarado como prop é encaminhado ao QFooter nativo.

### 5.2 Brand via Herança CSS

DssFooter é transparente para brand. O atributo `[data-brand]` é aplicado pelo `DssToolbar` interno e herdado automaticamente pelos seus filhos via seletor CSS descendente.

### 5.3 Z-Index e Position

DssFooter **não altera** `z-index` nem `position` do QFooter. O posicionamento fixo na base da viewport é responsabilidade do Quasar via `QLayout`.

---

## 6. Variantes

### 6.1 Padrão (sem decoração)

Footer sem sombra nem borda. Fundo `--dss-surface-default`.

```vue
<DssFooter>
  <DssToolbar>...</DssToolbar>
</DssFooter>
```

### 6.2 Elevated

Aplica sombra projetada para cima para destacar o footer do conteúdo ao rolar.

> **EXC-05:** Valor `0 -4px 6px rgba(0,0,0,0.30)` — equivalente invertido de `--dss-shadow-md`. O token `--dss-elevation-up-*` não existe no catálogo DSS v2.2.

```vue
<DssFooter elevated>
  <DssToolbar>...</DssToolbar>
</DssFooter>
```

### 6.3 Bordered

Aplica borda superior (`border-top`) sutil como alternativa flat à sombra.

```vue
<DssFooter bordered>
  <DssToolbar>...</DssToolbar>
</DssFooter>
```

---

## 7. Estados

### 7.1 Estados Aplicáveis

| Estado | Classe CSS | Descrição |
|--------|-----------|-----------|
| `default` | `.dss-footer` | Estado padrão sem decoração |
| `elevated` | `.dss-footer--elevated` | Com sombra upward |
| `bordered` | `.dss-footer--bordered` | Com borda superior |

### 7.2 Estados NÃO Aplicáveis

| Estado | Justificativa |
|--------|--------------|
| `hover` | Container estrutural não-interativo |
| `focus` | Container estrutural não-interativo |
| `active` | Container estrutural não-interativo |
| `disabled` | Não aplicável a containers de layout de página |
| `loading` | Não aplicável (Fase 1 síncrona) |
| `error` | Não aplicável a containers de layout |
| `indeterminate` | Não aplicável |

---

## 8. Tokens Utilizados

| Token | Camada | Uso |
|-------|--------|-----|
| `--dss-surface-default` | L2 base | Cor de fundo (sobrescreve bg-primary) |
| `--dss-text-body` | L2 base | Cor de texto padrão |
| `--dss-border-width-thin` | L3 bordered | Espessura da borda superior |
| `--dss-gray-200` | L3 bordered | Cor da borda superior |
| `--dss-border-width-md` | L4 states | Borda reforçada (prefers-contrast) |

---

## 9. Exceções aos Gates v2.4

| ID | Regra Violada | Local | Justificativa |
|----|---------------|-------|---------------|
| EXC-01 | Gate de Composição v2.4 — Proibição de Quasar no template | `.example.vue` | `DssLayout` (Nível 4) inexistente. `<q-layout>` usado temporariamente no arquivo de exemplo. Isenção formal: scaffolding. Precedente: DssHeader EXC-01. |
| EXC-02 | — (documentado para clareza) | L2 + L4 | `QFooter` aplica `bg-primary !important`. `!important` necessário para override via `--dss-surface-default`. Prop `color` bloqueada. Precedente: DssHeader EXC-02. |
| EXC-03 | — (documentado para clareza) | L4 forced-colors | System color keywords obrigatórios em `forced-colors` mode. Padrão canônico DSS. |
| EXC-04 | — (documentado para clareza) | L4 print | Valores hardcoded para impressão monocromática. `position: static` cancela `fixed` do QFooter. Precedente: DssHeader EXC-04. |
| EXC-05 | Token First | L3 elevated | Token `--dss-elevation-up-*` inexistente. Valor `0 -4px 6px rgba(0,0,0,0.30)` = invertido de `--dss-shadow-md`. Substituir quando token disponível. |

---

## 10. Matriz de Composição DSS

### 10.1 Papel Estrutural

DssFooter é o **âncora inferior do layout de página**, responsável por:
- Fixar conteúdo de rodapé na base da viewport
- Garantir separação visual entre conteúdo principal e informações de rodapé
- Orquestrar a área de navegação/informação inferior da aplicação

### 10.2 Componentes DSS Recomendados

| Componente | Status | Uso |
|-----------|--------|-----|
| `DssToolbar` | ✅ Existente | Conteúdo primário — copyright, links, ações |
| `DssSeparator` | ✅ Existente | Divisão entre toolbars empilhados |
| `DssSpace` | ✅ Existente | Espaçamento flexível dentro do DssToolbar |
| `DssButton` | ✅ Existente | Ações e links dentro do DssToolbar |
| `DssIcon` | ✅ Existente | Ícones decorativos dentro do DssToolbar |
| `DssTabs` | ✅ Existente | Bottom navigation em cenários específicos |
| `DssLayout` | 🟡 Fase 4 | Container pai futuro (orquestração Header + Footer + Drawer) |

### 10.3 Padrões de Layout

```vue
<!-- Padrão básico: copyright simples -->
<DssFooter>
  <DssToolbar>
    <span class="text-caption">© 2026 Sansys</span>
    <DssSpace />
    <DssButton flat dense label="Privacidade" no-caps />
  </DssToolbar>
</DssFooter>

<!-- Dois toolbars: links + copyright -->
<DssFooter elevated>
  <DssToolbar>
    <DssButton flat dense label="Sobre" no-caps />
    <DssButton flat dense label="Suporte" no-caps />
    <DssSpace />
    <DssButton flat round icon="settings" aria-label="Configurações" />
  </DssToolbar>
  <DssToolbar dense>
    <span class="text-caption">© 2026 Sansys Sistemas de Saneamento</span>
  </DssToolbar>
</DssFooter>

<!-- Com brand no toolbar -->
<DssFooter>
  <DssToolbar brand="hub">
    <span class="text-caption">Sansys Hub — Portal do Operador</span>
  </DssToolbar>
</DssFooter>
```

### 10.4 Anti-Patterns de Composição

- ❌ Usar HTML nativo (`<nav>`, `<div>`) diretamente no DssFooter
- ❌ Adicionar texto ou botões diretamente no slot sem DssToolbar intermediário
- ❌ Usar DssFooter fora de um contexto QLayout
- ❌ Sobrescrever `z-index` ou `position` do QFooter
- ❌ Instanciar múltiplos DssFooter por página (viola `role="contentinfo"`)
- ❌ Aplicar brand via prop `color` (bloqueada — usar DssToolbar com `brand`)

### 10.5 Limites de Responsabilidade

- DssFooter **NÃO** define brand/cor — essa responsabilidade é do `DssToolbar` interno
- DssFooter **NÃO** estiliza seus filhos via `::v-deep`
- DssFooter **NÃO** assume presença de componentes específicos no slot
- Máximo recomendado: **2 DssToolbars** empilhados

---

## 11. Paridade com Golden Context (DssHeader)

| Aspecto | DssHeader | DssFooter | Diferença |
|---------|-----------|-----------|-----------|
| Primitivo Quasar | `QHeader` | `QFooter` | Esperada |
| Role ARIA | `banner` | `contentinfo` | Esperada |
| `defineOptions({ name, inheritAttrs })` | ✅ | ✅ | Igual |
| `withDefaults(defineProps<...>())` | ✅ | ✅ | Igual |
| `v-bind="$attrs"` | ✅ | ✅ | Igual |
| 4 camadas SCSS | ✅ | ✅ | Igual |
| Override `bg-primary !important` | EXC-02 | EXC-02 | Igual |
| Forced-colors keywords | EXC-03 | EXC-03 | Igual |
| Print hardcoded + `position: static` | EXC-04 | EXC-04 | Igual |
| Variante `bordered` — borda | `border-bottom` | `border-top` | **Intencional** — posição invertida |
| Variante `elevated` — sombra | `--dss-elevation-2` ↓ | `rgba()` ↑ EXC-05 | **Intencional** — direção invertida |
| Delegação de brand para DssToolbar | ✅ | ✅ | Igual |
| Touch target | Opção B | Opção B | Igual |
| Container não-interativo | ✅ | ✅ | Igual |

---

## 12. Debugging e Troubleshooting

### 12.1 Footer não aparece

- Verificar se está dentro de um `QLayout` com a view configurada (ex: `"hHh lpR fFf"`)
- A view do QLayout deve incluir `F` (footer) para renderizar DssFooter

### 12.2 Sombra não visível

- Verificar se a variante `elevated` está ativa
- A sombra é projetada para cima (`0 -4px 6px ...`) — certifique-se que há conteúdo acima do footer

### 12.3 Fundo não é branco/superfície padrão

- O override de `bg-primary` via `!important` está em `2-composition/_base.scss`
- Verificar se o SCSS foi compilado corretamente: `npx sass DssFooter.module.scss`

### 12.4 Brand aparecendo no footer mas não deveria

- Brand é responsabilidade do `DssToolbar` interno — passar `brand` no `DssToolbar`, não no `DssFooter`
- Verificar que `[data-brand]` não está sendo aplicado ao container DssFooter diretamente

---

## 13. Checklist de Conformidade (Gate Estrutural DSS)

### Gate Estrutural
- [x] 4 camadas existem em completude (`1-structure/`, `2-composition/`, `3-variants/`, `4-output/`)
- [x] Entry Point Wrapper (`DssFooter.vue`) existe e é re-export puro
- [x] Orchestrador SCSS (`DssFooter.module.scss`) importa L2 → L3 → L4 na ordem
- [x] Barrel export (`index.js`) exporta componente, types e composables
- [x] `dss.meta.json` existe com `goldenReference` e `goldenContext` declarados

### Gate Técnico
- [x] Nenhum valor hardcoded não documentado (Token First)
- [x] Cores via classes utilitárias (não no SCSS)
- [x] Estados implementados e documentados
- [x] Acessibilidade: `role="contentinfo"`, `aria-label` via `$attrs`, sem touch target próprio
- [x] SCSS compila sem erros

### Gate Documental
- [x] Tokens listados com nomes exatos (1:1 com SCSS)
- [x] README completo
- [x] Documentação normativa (esta) com Template 13.x
- [x] API Reference (`DSSFOOTER_API.md`) atualizada
- [x] Exemplo funcional com 5 cenários
- [x] Paridade com Golden Context documentada
- [x] Comportamentos implícitos documentados
- [x] Exceções documentadas com ID, valor, local e justificativa

---

**Componente PRONTO PARA AUDITORIA DSS v2.2**

> 🚫 Este documento NÃO emite selo. A certificação de conformidade é responsabilidade exclusiva do processo de auditoria DSS.
