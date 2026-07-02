# DssAjaxBar — API Reference

## Props

| Prop | Tipo | Default | Obrigatório | Descrição |
|------|------|---------|-------------|-----------|
| `position` | `AjaxBarPosition` | `'top'` (QAjaxBar) | — | Posição de ancoragem da barra no viewport |
| `size` | `String` | `'2px'` (QAjaxBar) | — | Espessura da barra (CSS size string) |
| `skipHijack` | `Boolean` | `false` (QAjaxBar) | — | Desativa interceptação automática de XHR/Fetch |
| `reverse` | `Boolean` | `false` (QAjaxBar) | — | Inverte a direção da animação de progressão |
| `hijackFilter` | `Function` | `null` (QAjaxBar) | — | Função para filtrar quais requisições são interceptadas |
| `brand` | `AjaxBarBrand` | — | — | Contexto de brand Sansys |

## Props Bloqueadas (não expostas ao consumidor)

| Prop Quasar | Motivo do Bloqueio |
|-------------|-------------------|
| `color` | Cor governada via CSS cascade com tokens DSS via `--q-color-primary` override. DSS não usa Quasar color names. Substituído pela prop `brand` DSS. |

### Tipos

#### `AjaxBarPosition`
```typescript
type AjaxBarPosition = 'top' | 'bottom' | 'left' | 'right'
```

| Valor | Descrição |
|-------|-----------|
| `top` | Barra ancorada no topo do viewport (padrão) |
| `bottom` | Barra ancorada na parte inferior |
| `left` | Barra ancorada na lateral esquerda (vertical) |
| `right` | Barra ancorada na lateral direita (vertical) |

#### `AjaxBarBrand`
```typescript
type AjaxBarBrand = 'hub' | 'water' | 'waste'
```

---

## Slots

**Nenhum slot exposto.** `DssAjaxBar` é uma barra de progresso fixa de elemento único — não aceita conteúdo via slot.

---

## Events

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `@start` | — | Emitido quando a barra inicia o carregamento (hijack ou manual) |
| `@stop` | — | Emitido quando a barra para o carregamento (todas as requisições concluídas) |

---

## API Imperativa (via `ref`)

DssAjaxBar expõe uma API imperativa via `defineExpose` para controle programático da barra.

```typescript
const ajaxBar = ref<InstanceType<typeof DssAjaxBar>>(null)

ajaxBar.value?.start(speed?)        // Inicia a barra (speed: intervalo em ms de auto-incremento)
ajaxBar.value?.stop()               // Para e oculta a barra
ajaxBar.value?.increment(amount?)   // Incrementa manualmente o progresso (0–100)
ajaxBar.value?.setProgress(value)   // Define o progresso para um valor específico (0–100)
```

| Método | Parâmetros | Descrição |
|--------|-----------|-----------|
| `start(speed?)` | `speed?: number` — ms de auto-incremento | Inicia a barra |
| `stop()` | — | Para e oculta a barra com animação de conclusão |
| `increment(amount?)` | `amount?: number` — unidades de progresso | Incrementa o progresso manualmente |
| `setProgress(value)` | `value: number` (0–100) | Define progresso para valor específico |

> **EXC-Expose-01**: API imperativa necessária para controle manual em cenários onde `skip-hijack=true` é usado. Padrão idêntico a DssInfiniteScroll (EXC-Expose-01).

---

## CSS Classes

| Classe | Quando aplicada |
|--------|----------------|
| `dss-ajax-bar` | Sempre (root — também é `.q-loading-bar`) |
| `dss-ajax-bar--pos-{position}` | Sempre (default: `pos-top`) |
| `dss-ajax-bar--brand-{brand}` | Quando prop `brand` é passada |

---

## Composable

### `useAjaxBarClasses(props: AjaxBarProps)`

Gera classes CSS reativas do componente.

```typescript
import { useAjaxBarClasses } from '@dss/components/DssAjaxBar'

const { rootClasses } = useAjaxBarClasses(props)
// rootClasses: ComputedRef<(string | Record<string, boolean>)[]>
```

---

## Tabela de Tokens DSS

| Token | Propriedade CSS | Contexto |
|-------|----------------|----------|
| `--dss-action-primary` | `--q-color-primary` | Cor padrão da barra (EXC-Gate-02) |
| `--dss-hub-600` | `--q-color-primary` | Brand hub |
| `--dss-water-500` | `--q-color-primary` | Brand water |
| `--dss-waste-600` | `--q-color-primary` | Brand waste |

**Valores Estruturais (não tokenizados — documentados como exceções):**
- `'2px'` — espessura padrão herdada do QAjaxBar (EX-Structural-01)
- `0.01ms` e `1` — valores canônicos em prefers-reduced-motion (EX-States-01)
- `Highlight`, `ButtonText` — SystemColor keywords em forced-colors (EX-States-03)

---

## Comportamentos Implícitos

1. **QAjaxBar como root**: DssAjaxBar é o QAjaxBar — o elemento `.dss-ajax-bar` também tem as classes `.q-loading-bar` e `.q-loading-bar--{position}`. Não há wrapper externo.

2. **Interceptação automática de XHR/Fetch**: Por padrão, QAjaxBar monitora todas as requisições XHR e Fetch globalmente. A barra aparece ao iniciar a primeira requisição e desaparece quando a última conclui. Desabilite com `:skip-hijack="true"`.

3. **`color="primary"` fixo + `--q-color-primary` override**: DSS sempre passa `color="primary"` ao QAjaxBar e sobrescreve `--q-color-primary` com tokens DSS de brand. O consumer não deve e não consegue sobrescrever a cor (EXC-Gate-02).

4. **`hijackFilter` para exclusão de requisições**: Função `(url: string) => boolean`. Retorne `true` para interceptar, `false` para ignorar. Útil para excluir polling frequente ou telemetria.

5. **`size` como string CSS**: Quando não passada, QAjaxBar usa `'2px'` como padrão (EX-Structural-01). Pode ser sobrescrita com qualquer valor CSS válido (ex: `'4px'`, `'0.5rem'`).

6. **`defineOptions({ inheritAttrs: false })` + `v-bind="$attrs"`**: Atributos extras do consumer são forwarded ao QAjaxBar. `color` é sempre sobrescrito pela binding explícita DSS.

7. **`@start` e `@stop` re-emitidos**: DssAjaxBar re-emite os eventos do QAjaxBar para que o consumer possa sincronizar outros elementos da UI (ex: atualizar `aria-busy` no container pai).

---

## Paridade Golden Reference (DssBadge) e Golden Context (DssLinearProgress)

| Aspecto | DssBadge (Ref) | DssLinearProgress (Context) | DssAjaxBar |
|---------|---------------|-----------------------------|------------|
| Interatividade | ❌ Não interativo | ❌ Não interativo | ❌ Não interativo |
| Touch Target | N/A (Opção B) | N/A (Opção B) | N/A — não interativo |
| `defineEmits` | Omitido | Omitido | ✅ Declarado (`start`, `stop`) |
| `defineExpose` | — | — | ✅ EXC-Expose-01 (4 métodos) |
| Brand dual-selector | ✅ | ✅ | ✅ |
| Quasar como root | ❌ | ✅ EXC-Gate-01 | ✅ EXC-Gate-01 |
| `--q-color-*` override | — | — | ✅ EXC-Gate-02 (DssPagination padrão) |
| prefers-contrast: more | ✅ border | ✅ | ✅ outline currentColor |
| prefers-reduced-motion | ✅ | ✅ EX-States-01 | ✅ EX-States-01 |
| forced-colors | ✅ | ✅ | ✅ EX-States-03 |
| print hidden | ✅ | ✅ | ✅ EX-States-02 |

**Divergências intencionais:**
- `defineEmits` declarado: DssAjaxBar emite `@start`/`@stop` (re-emissão dos eventos do QAjaxBar). Componentes anteriores (DssLinearProgress, DssCircularProgress, DssInnerLoading) não emitem. Justificativa: QAjaxBar emite esses eventos nativamente e o consumer precisa sincronizar `aria-busy`.
- `defineExpose` declarado: API imperativa para controle manual. Padrão DssInfiniteScroll (EXC-Expose-01). DssLinearProgress não tem.
