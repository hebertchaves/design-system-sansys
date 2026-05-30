# DSSFIELD_API.md — DssField API Reference

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `'outlined' \| 'filled' \| 'borderless' \| 'standout'` | `'outlined'` | Estilo visual do campo |
| `size` | `'sm' \| 'md'` | `'md'` | Tamanho (sm = modo compacto/denso) |
| `brand` | `'hub' \| 'water' \| 'waste'` | — | Cor de destaque no foco. Herdado de `[data-brand]` ancestral se omitido |
| `label` | `String` | — | Rótulo do campo. Flutua ao focar quando `stackLabel=false` |
| `stackLabel` | `Boolean` | `false` | Quando true, label sempre empilhada acima do controle (sem flutuação) |
| `hasValue` | `Boolean` | `false` | Sinaliza externamente que o controle interno possui valor. Mantém label flutuante após perda de foco |
| `hint` | `String` | — | Texto de dica exibido abaixo do campo |
| `error` | `Boolean` | `false` | Ativa estado de erro (borda vermelha, exibe errorMessage) |
| `errorMessage` | `String` | — | Mensagem de erro exibida quando `error=true` |
| `prefix` | `String` | — | Texto antes do controle (ex: "R$"). aria-hidden |
| `suffix` | `String` | — | Texto após o controle (ex: "km"). aria-hidden |
| `disable` | `Boolean` | `false` | Desabilita o campo (opacity + pointer-events: none) |
| `readonly` | `Boolean` | `false` | Campo somente leitura (cursor default, borda atenuada) |
| `loading` | `Boolean` | `false` | Exibe spinner na área append. role=status |
| `fieldId` | `String` | auto-gerado | ID para associação `label[for]`. Auto-gerado se omitido. Disponível via slot scope `{ fieldId }` e `defineExpose` |

## Props Bloqueadas (QField → não mapeadas)

| Prop QField | Motivo |
|-------------|--------|
| `rules` | DssField não possui v-model interno — validação é responsabilidade do controle filho ou do formulário pai |
| `clearable` | Requer v-model no QField — não aplicável |
| `counter / maxlength` | Requer valor do controle interno — desconhecido sem v-model |
| `color` | Substituído por `brand` (sistema DSS) |
| `type / placeholder / autogrow` | Props do controle interno, fora do escopo do DssField |

## Slots

| Slot | Props expostas | Descrição |
|------|---------------|-----------|
| `default` | `{ fieldId: string; ariaDescribedby?: string }` | Controle principal. Use `:id="fieldId" :aria-describedby="ariaDescribedby"` para associação ARIA completa |
| `prepend` | — | Conteúdo antes do controle, dentro da borda (ícone, botão) |
| `append` | — | Conteúdo após o controle, dentro da borda (ícone, botão) |
| `before` | — | Conteúdo antes do campo, fora da borda |
| `after` | — | Conteúdo após o campo, fora da borda |
| `label` | — | Label personalizado (substitui prop `label`) |
| `hint` | — | Texto de dica personalizado (substitui prop `hint`) |
| `error` | — | Mensagem de erro personalizada (substitui prop `errorMessage`) |

## Events

DssField não emite eventos. É um container estrutural passivo.

O controle interno deve emitir seus próprios eventos (`update:modelValue`, etc.).

## Expose

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `fieldId` | `ComputedRef<string>` | ID gerado/fornecido para o controle interno |
| `hintId` | `string` | ID do elemento de hint — para `aria-describedby` manual |
| `errorId` | `string` | ID do elemento de erro — para `aria-describedby` manual |
| `ariaDescribedby` | `ComputedRef<string \| undefined>` | Valor calculado: `errorId` quando `error=true`, `hintId` quando há hint, `undefined` caso contrário |

## Tokens DSS Utilizados

| Token | Aplicação |
|-------|-----------|
| `--dss-font-family-sans` | Família tipográfica do campo |
| `--dss-font-size-md` | Tamanho do label no estado base |
| `--dss-font-size-sm` | Tamanho do label flutuante, hint e error |
| `--dss-line-height-normal` | Altura de linha do bottom area |
| `--dss-text-secondary` | Cor do label, hint, prepend/append |
| `--dss-error-600` | Cor da mensagem de erro e borda de erro |
| `--dss-surface-default` | Fundo do notch do label (variant outlined) |
| `--dss-gray-50` | Fundo disabled (outlined) |
| `--dss-gray-100` | Fundo filled/standout |
| `--dss-gray-200` | Hover filled/standout; Disabled filled |
| `--dss-gray-300` | Borda readonly (outlined); Borda spinner |
| `--dss-gray-400` | Borda default (outlined/filled) |
| `--dss-gray-600` | Borda hover (outlined) |
| `--dss-gray-700` | Borda active (outlined) |
| `--dss-gray-900` | Fundo filled dark mode |
| `--dss-action-primary` | Borda/shadow focus neutro; Cor label focus; Borda spinner |
| `--dss-border-width-thin` | Borda padrão e inner shadow focus |
| `--dss-border-width-md` | Borda focus/error e prefers-contrast |
| `--dss-border-width-thick` | Outline prefers-contrast: more |
| `--dss-radius-md` | Border-radius outlined/standout |
| `--dss-radius-full` | Border-radius spinner |
| `--dss-spacing-1` | Offset do outline; padding label notch |
| `--dss-spacing-2` | Gap interno; padding label float |
| `--dss-spacing-3` | Padding prepend/append/prefix/suffix denso |
| `--dss-spacing-4` | Padding control; left do label |
| `--dss-spacing-5` | min-height bottom area |
| `--dss-spacing-8` | max-width cálculo do label |
| `--dss-touch-target-md` | min-height da área de campo (WCAG 2.5.5) |
| `--dss-duration-200` | Duração de transições |
| `--dss-duration-500` | Duração da animação do spinner |
| `--dss-easing-standard` | Easing das transições |
| `--dss-opacity-disabled` | Opacidade no estado disabled (0.4) |
| `--dss-hub-600` | Borda/shadow focus brand hub |
| `--dss-hub-700` | Label e hint brand hub |
| `--dss-water-500` | Borda/shadow focus brand water |
| `--dss-water-600` | Label focus brand water |
| `--dss-water-700` | Hint brand water |
| `--dss-waste-600` | Borda/shadow focus brand waste |
| `--dss-waste-700` | Label focus brand waste |
| `--dss-waste-800` | Hint brand waste |

## Classes CSS

| Classe | Descrição |
|--------|-----------|
| `.dss-field` | Root element |
| `.dss-field--outlined` | Variante outlined (padrão) |
| `.dss-field--filled` | Variante filled |
| `.dss-field--borderless` | Variante borderless |
| `.dss-field--standout` | Variante standout |
| `.dss-field--dense` | Modo compacto (size="sm") |
| `.dss-field--focused` | Campo com foco ativo |
| `.dss-field--error` | Estado de erro |
| `.dss-field--disabled` | Estado desabilitado |
| `.dss-field--readonly` | Estado somente leitura |
| `.dss-field--loading` | Estado de carregamento |
| `.dss-field--stack-label` | Label sempre empilhada |
| `.dss-field--brand-hub` | Brand hub (via prop) |
| `.dss-field--brand-water` | Brand water (via prop) |
| `.dss-field--brand-waste` | Brand waste (via prop) |
