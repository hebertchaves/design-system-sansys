# Pré-prompt: DssResponsive

## 1. CLASSIFICAÇÃO E CONTEXTO

**Fase:** 2 — **Nível 1 (Independente)**
*(Não depende de outros componentes da Fase 2. Pode ser criado em paralelo com outros Nível 1.)*

**Justificativa de Fase 2:** DssResponsive encapsula lógica de UI reativa (`$q.screen`) que precisaria ser replicada ad-hoc em múltiplos componentes. Por gerenciar estado de visibilidade e expô-lo via slot scope, vai além de um wrapper atômico Fase 1 — constitui um padrão reutilizável de UI/UX.

### Golden Reference
DssBadge — Golden Reference não-interativo oficial do DSS v2.2.

### Golden Context
**DssLayout** — baseline de auditoria. Justificativa: DssLayout é o wrapper estrutural mais próximo com SCSS intencionalmente vazio e sem tokens visuais próprios, arquitetura idêntica à de DssResponsive (pure-logic wrapper).

### Justificativa
A necessidade de uma experiência de usuário fluida e consistente em múltiplos dispositivos é primordial. O DssResponsive centraliza a lógica de responsividade, promovendo a reutilização de código, a manutenção simplificada e a aderência aos padrões de design estabelecidos, evitando implementações ad-hoc de responsividade que poderiam levar a inconsistências visuais e técnicas.

---

## 2. RISCOS ARQUITETURAIS E GATES

### "Calcanhar de Aquiles": Prioridade de props com comportamento ambíguo

O risco central do DssResponsive é o comportamento quando múltiplas props de visibilidade são passadas simultaneamente. A ausência de regra clara gera comportamento imprevisível.

**❌ Anti-pattern — Props conflitantes sem regra de prioridade:**
```vue
<!-- breakpoint e showOn passados juntos — qual prevalece? -->
<DssResponsive :breakpoint="['xs']" :show-on="['md']">
  <slot />
</DssResponsive>

<!-- showOn e hideOn com o mesmo breakpoint — resultado undefined? -->
<DssResponsive :show-on="['md']" :hide-on="['md']">
  <slot />
</DssResponsive>
```

**✅ Padrão correto — Regra de prioridade explícita e documentada:**
```typescript
// Prioridade: showOn > hideOn > breakpoint > (sempre visível)
// showOn e breakpoint são aliases — showOn prevalece se ambos presentes
// Se showOn=['md'] e hideOn=['md'] → AND logic → falso (oculto)
const showList = props.showOn ?? props.breakpoint
if (showList?.length) {
  const shown = showList.includes(bp)
  return props.hideOn?.length ? shown && !props.hideOn.includes(bp) : shown
}
if (props.hideOn?.length) return !props.hideOn.includes(bp)
return true
```

**Outros riscos:**
- **Performance:** Re-renderização do DOM em mudanças de breakpoint — usar `v-if` (não `v-show`) para remoção real do DOM, não apenas ocultação visual.
- **Compatibilidade:** `useQuasar()` requer Quasar Screen Plugin ativo. Em SSR, `$q.screen` não está disponível no servidor.
- **Conflito de Estilos:** O componente não deve interferir no layout dos filhos — wrapper deve ter CSS mínimo ou zero.

---

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O DssResponsive não envolve nenhum componente Quasar como root. Utiliza `useQuasar()` para acessar o Screen Plugin reativamente.

| Quasar API/Conceito | DssResponsive Equivalente/Abstração | Decisão |
| :--- | :--- | :--- |
| `$q.screen.xs/sm/md/lg/xl` | `currentBreakpoint` (slot scope + composable) | Exposto via slot scope e `useResponsiveState` |
| Classes `lt-sm`, `gt-md` | Props `showOn`, `hideOn`, `breakpoint` | API declarativa DSS em vez de classes imperativas |
| `QResizeObserver` | Não utilizado | `$q.screen` já é reativo — QResizeObserver redundante |
| `<component :is>` | Prop `tag` | Preserva semântica HTML do wrapper |

**Props expostas:**
- `showOn?: DssBreakpoint[]` — breakpoints onde o slot é exibido
- `hideOn?: DssBreakpoint[]` — breakpoints onde o slot é ocultado
- `breakpoint?: DssBreakpoint[]` — alias de `showOn`
- `tag?: string` — tag HTML do wrapper (default: `'div'`)

**Props bloqueadas / não expostas:**
- Nenhuma prop Quasar direta — o componente usa `$q.screen` internamente sem expor a API do plugin.

---

## 4. GOVERNANÇA DE TOKENS E CSS

O DssResponsive não deve introduzir estilos visuais diretos. Sua função é orquestrar a exibição de outros componentes.

- **Espaçamento:** N/A — gerenciado pelos componentes filhos.
- **Raio:** N/A.
- **Duração/Animação:** N/A — sem transições próprias.
- **Superfície:** N/A — sem background próprio.
- **Tokens utilizados:** **Nenhum** — `tokensUsed: []` no `dss.meta.json`.

O SCSS das 4 camadas existe mas é intencionalmente vazio — conforme precedente DssLayout (bloco SCSS vazio = sem CSS = decisão documentada, não omissão).

**Exemplo correto de uso no playground (`example.vue`):**
```html
<!-- ✅ Token DSS para contexto visual dos exemplos -->
<div style="background: var(--dss-surface-subtle); border: 1px solid var(--dss-gray-200)">
  ...
</div>

<!-- ❌ Classes Quasar de cor (bg-blue-1, bg-green-1) -->
<div class="bg-blue-1">...</div>
```

---

## 5. ACESSIBILIDADE E ESTADOS

### Acessibilidade

- **Touch target:** N/A — não interativo. Sem `::before` de touch target.
- **Role ARIA:** Nenhum atributo ARIA adicionado pelo componente. `aria-hidden` desnecessário porque `v-if` remove o nó do DOM (WCAG 1.3.1 conforme).
- **Conteúdo oculto:** Usar `v-if` (remoção do DOM), NÃO `v-show` (apenas `display: none` — acessível por leitores de tela).
- **Foco:** O componente NÃO redireciona foco automaticamente. O consumidor é responsável pelo gerenciamento de foco quando conteúdo aparece reativamente após resize.

### Delegação de estados

| Estado | Pertence ao | Decisão |
|---|---|---|
| hover | Filhos (via slot) | Não capturado pelo wrapper |
| focus | Filhos (via slot) | Não capturado pelo wrapper |
| active | Filhos (via slot) | Não capturado pelo wrapper |
| disabled | N/A | Não aplicável — wrapper não interativo |
| loading | N/A | Não aplicável |
| isVisible | DssResponsive | Controlado por props + `$q.screen` via `v-if` |

### Estados expostos via slot scope

| Estado | Tipo | Descrição |
|---|---|---|
| `currentBreakpoint` | `'xs'|'sm'|'md'|'lg'|'xl'` | Breakpoint ativo |
| `isXs`, `isSm`, `isMd`, `isLg`, `isXl` | `Boolean` | Flags individuais |
| `isMobile` | `Boolean` | `xs` ou `sm` |
| `isDesktop` | `Boolean` | `md`, `lg` ou `xl` |

---

## 6. PLAYGROUND E EXEMPLOS OBRIGATÓRIOS

O `example.vue` deve cobrir no mínimo:

1. `showOn` com breakpoints desktop
2. `showOn` com breakpoints mobile
3. `hideOn`
4. Slot scope com `currentBreakpoint`, `isMobile`, `isDesktop`
5. `breakpoint` (alias) + slot scope combinados
6. Prop `tag` customizado (`section`, `aside`)
7. Sem constraints — sempre visível

**Regra:** Usar `DssButton` (não `q-btn`) e tokens DSS (não classes de cor Quasar) nos exemplos.

---

## 7. EXCEÇÕES PREVISTAS

- **Nenhuma exceção DSS formal** — o componente não envolve componentes Quasar como root e não aplica estilos.
- **SCSS vazio intencional** — conforme precedente DssLayout. Documentado em `dss.meta.json > phaseDescription`.

---

## 8. CONSIDERAÇÕES FINAIS

DssResponsive é uma ferramenta poderosa para criar interfaces adaptáveis, mas deve ser usado com moderação. O uso excessivo de renderização condicional pode levar a um DOM complexo e difícil de manter. Sempre que possível, prefira o uso de CSS (media queries, flexbox, grid) para resolver problemas de layout responsivo, reservando o DssResponsive para casos onde a lógica de exibição ou o comportamento do componente precisam mudar significativamente com base no tamanho da tela.
