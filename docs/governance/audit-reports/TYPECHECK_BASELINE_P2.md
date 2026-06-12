# Type-check do Core — Baseline da Onda P2 (G4.2)

**Gerado em:** 12/06/2026
**Comando:** `npm run type-check` (em `packages/core`) → `vue-tsc --noEmit -p tsconfig.json`

## Contexto

Até a Onda P2, o script `type-check` do core era um **stub** (`echo "type-check
disabled"`) — falso positivo permanente apontado pelo relatório A2 da Auditoria
Final. Esta onda criou o `tsconfig.json` real (strict, escopo: fontes dos
componentes — testes e examples excluídos) e religou o script ao `vue-tsc`.

## Baseline: 66 erros pré-existentes

A primeira execução da história expôs **66 erros de tipo**, majoritariamente
incompatibilidades entre os tipos DSS e os tipos oficiais do Quasar (o código
nunca havia sido checado contra eles). Por código TS:

         29 error TS2322
         11 error TS2769
          5 error TS7006
          5 error TS2440
          4 error TS2345
          4 error TS18046
          2 error TS2591
          2 error TS2551
          2 error TS2528
          1 error TS7053
          1 error TS2339

**Política:** o gate agora reporta a VERDADE (falha com os erros). A correção
caso a caso é a primeira tarefa da Onda P2.1 — nenhum erro novo deve ser
introduzido (comparar contra esta baseline).

## Lista completa

```
components/base/DssBreadcrumbs/1-structure/DssBreadcrumbs.ts.vue(139,19): error TS2339: Property 'separator' does not exist on type 'Readonly<BreadcrumbsSlots> & BreadcrumbsSlots'.
components/base/DssBtnDropdown/1-structure/DssBtnDropdown.ts.vue(37,8): error TS2322: Type 'string' is not assignable to type '"top left" | "top middle" | "top right" | "top start" | "top end" | "center left" | "center middle" | "center right" | "center start" | "center end" | "bottom left" | "bottom middle" | "bottom right" | "bottom start" | "bottom end" | undefined'.
components/base/DssBtnDropdown/1-structure/DssBtnDropdown.ts.vue(38,8): error TS2322: Type 'string' is not assignable to type '"top left" | "top middle" | "top right" | "top start" | "top end" | "center left" | "center middle" | "center right" | "center start" | "center end" | "bottom left" | "bottom middle" | "bottom right" | "bottom start" | "bottom end" | undefined'.
components/base/DssBtnDropdown/1-structure/DssBtnDropdown.ts.vue(45,8): error TS2322: Type '(e: MouseEvent) => void' is not assignable to type '(evt: Event) => void'.
components/base/DssCheckbox/DssCheckbox.vue(11,10): error TS2528: A module cannot have multiple default exports.
components/base/DssFabAction/1-structure/DssFabAction.ts.vue(38,8): error TS2322: Type 'string | undefined' is not assignable to type 'boolean | undefined'.
components/base/DssFabAction/1-structure/DssFabAction.ts.vue(45,8): error TS2322: Type '(e: MouseEvent) => void' is not assignable to type '(evt: Event) => void'.
components/base/DssFile/1-structure/DssFile.ts.vue(26,14): error TS7006: Parameter 'files' implicitly has an 'any' type.
components/base/DssFile/1-structure/DssFile.ts.vue(27,17): error TS7006: Parameter 'files' implicitly has an 'any' type.
components/base/DssFile/1-structure/DssFile.ts.vue(29,8): error TS2322: Type '(event: FocusEvent) => void' is not assignable to type '(evt: Event) => void'.
components/base/DssFile/1-structure/DssFile.ts.vue(30,8): error TS2322: Type '(event: FocusEvent) => void' is not assignable to type '(evt: Event) => void'.
components/base/DssFile/composables/useFileActions.ts(40,5): error TS18046: 'emit' is of type 'unknown'.
components/base/DssFile/composables/useFileActions.ts(49,5): error TS18046: 'emit' is of type 'unknown'.
components/base/DssFile/composables/useFileActions.ts(56,5): error TS18046: 'emit' is of type 'unknown'.
components/base/DssFile/composables/useFileActions.ts(57,5): error TS18046: 'emit' is of type 'unknown'.
components/base/DssInnerLoading/1-structure/DssInnerLoading.ts.vue(54,10): error TS2440: Import declaration conflicts with local declaration of 'defineOptions'.
components/base/DssInnerLoading/1-structure/DssInnerLoading.ts.vue(54,25): error TS2440: Import declaration conflicts with local declaration of 'defineProps'.
components/base/DssInnerLoading/1-structure/DssInnerLoading.ts.vue(54,38): error TS2440: Import declaration conflicts with local declaration of 'withDefaults'.
components/base/DssInnerLoading/1-structure/DssInnerLoading.ts.vue(54,52): error TS2440: Import declaration conflicts with local declaration of 'defineSlots'.
components/base/DssOptionGroup/1-structure/DssOptionGroup.ts.vue(121,10): error TS2322: Type 'string' is not assignable to type 'RadioColor | undefined'.
components/base/DssPopupProxy/1-structure/DssPopupProxy.ts.vue(7,6): error TS2322: Type 'string | boolean | Element | null | undefined' is not assignable to type 'string | boolean | Element | undefined'.
components/base/DssRange/1-structure/DssRange.ts.vue(99,5): error TS2591: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
components/base/DssScrollArea/1-structure/DssScrollArea.ts.vue(117,26): error TS2551: Property 'scrollTo' does not exist on type 'QScrollArea'. Did you mean 'vScroll'?
components/base/DssScrollArea/1-structure/DssScrollArea.ts.vue(126,26): error TS2551: Property 'scrollBy' does not exist on type 'QScrollArea'. Did you mean 'vScroll'?
components/base/DssScrollArea/1-structure/DssScrollArea.ts.vue(169,6): error TS2322: Type '(payload: ScrollPayload) => void' is not assignable to type '(info: { ref: QScrollArea; verticalPosition: number; verticalPercentage: number; verticalSize: number; verticalContainerSize: number; verticalContainerInnerSize: number; horizontalPosition: number; horizontalPercentage: number; horizontalSize: number; horizontalContainerSize: number; horizontalContainerInnerSize: nu...'.
components/base/DssSelect/1-structure/DssSelect.ts.vue(217,6): error TS2322: Type '(event: FocusEvent) => void' is not assignable to type '(evt: Event) => void'.
components/base/DssSelect/1-structure/DssSelect.ts.vue(218,6): error TS2322: Type '(event: FocusEvent) => void' is not assignable to type '(evt: Event) => void'.
components/base/DssSelect/composables/useSelectActions.ts(32,10): error TS2345: Argument of type '"focus"' is not assignable to parameter of type 'never'.
components/base/DssSelect/composables/useSelectActions.ts(40,10): error TS2345: Argument of type '"blur"' is not assignable to parameter of type 'never'.
components/base/DssSkeleton/1-structure/DssSkeleton.ts.vue(29,8): error TS2322: Type 'string' is not assignable to type '"QAvatar" | "QBadge" | "QBtn" | "QCheckbox" | "QChip" | "QInput" | "QRadio" | "QRange" | "QSlider" | "QToggle" | "QToolbar" | "circle" | "rect" | "text" | undefined'.
components/base/DssSkeleton/1-structure/DssSkeleton.ts.vue(30,8): error TS2322: Type 'string' is not assignable to type '"blink" | "none" | "pulse" | "wave" | "pulse-x" | "pulse-y" | "fade" | undefined'.
components/base/DssSlider/1-structure/DssSlider.ts.vue(170,7): error TS2591: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
components/base/DssSlider/1-structure/DssSlider.ts.vue(216,28): error TS2769: No overload matches this call.
components/base/DssSpace/1-structure/DssSpace.ts.vue(31,10): error TS2440: Import declaration conflicts with local declaration of 'defineOptions'.
components/base/DssStep/1-structure/DssStep.ts.vue(54,6): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
components/base/DssTextarea/1-structure/DssTextarea.ts.vue(132,3): error TS2345: Argument of type 'TextareaEmits' is not assignable to parameter of type '(event: string, ...args: any[]) => void'.
components/base/DssTextarea/1-structure/DssTextarea.ts.vue(213,6): error TS2322: Type '(event: FocusEvent) => void' is not assignable to type '(evt: Event) => void'.
components/base/DssTextarea/1-structure/DssTextarea.ts.vue(214,6): error TS2322: Type '(event: FocusEvent) => void' is not assignable to type '(evt: Event) => void'.
components/base/DssToggle/DssToggle.vue(11,10): error TS2528: A module cannot have multiple default exports.
components/base/DssTree/1-structure/DssTree.ts.vue(17,6): error TS2322: Type '((node: DssTreeNode, filter: string, update: (fn: () => void) => void) => boolean) | undefined' is not assignable to type '((node: any, filter: string) => boolean) | undefined'.
components/base/DssTree/1-structure/DssTree.ts.vue(24,28): error TS2769: No overload matches this call.
components/base/DssTree/1-structure/DssTree.ts.vue(25,26): error TS2769: No overload matches this call.
components/base/DssTree/1-structure/DssTree.ts.vue(27,23): error TS2769: No overload matches this call.
components/base/DssTree/1-structure/DssTree.ts.vue(28,37): error TS2769: No overload matches this call.
components/base/DssVideo/1-structure/DssVideo.ts.vue(29,6): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
components/composed/DssColorPicker/1-structure/DssColorPicker.ts.vue(44,6): error TS2322: Type '"rgb" | "hex" | "hexa" | "rgba" | "hsl" | "hsla" | "hsv" | "hsva" | undefined' is not assignable to type '"auto" | "rgb" | "hex" | "hexa" | "rgba" | undefined'.
components/composed/DssDatePicker/1-structure/DssDatePicker.ts.vue(67,24): error TS2769: No overload matches this call.
components/composed/DssDatePicker/1-structure/DssDatePicker.ts.vue(68,35): error TS2769: No overload matches this call.
components/composed/DssForm/1-structure/DssForm.ts.vue(9,14): error TS2769: No overload matches this call.
components/composed/DssForm/1-structure/DssForm.ts.vue(10,13): error TS2769: No overload matches this call.
components/composed/DssForm/1-structure/DssForm.ts.vue(11,6): error TS2322: Type '(el: any, tabIndex: any, index: any) => void' is not assignable to type '(ref: Component) => void'.
components/composed/DssForm/1-structure/DssForm.ts.vue(11,25): error TS7006: Parameter 'el' implicitly has an 'any' type.
components/composed/DssForm/1-structure/DssForm.ts.vue(11,29): error TS7006: Parameter 'tabIndex' implicitly has an 'any' type.
components/composed/DssForm/1-structure/DssForm.ts.vue(11,39): error TS7006: Parameter 'index' implicitly has an 'any' type.
components/composed/DssPopupEdit/1-structure/DssPopupEdit.ts.vue(11,6): error TS2322: Type 'string | undefined' is not assignable to type '"top left" | "top middle" | "top right" | "top start" | "top end" | "center left" | "center middle" | "center right" | "center start" | "center end" | "bottom left" | "bottom middle" | "bottom right" | "bottom start" | "bottom end" | undefined'.
components/composed/DssPopupEdit/1-structure/DssPopupEdit.ts.vue(12,6): error TS2322: Type 'string | undefined' is not assignable to type '"top left" | "top middle" | "top right" | "top start" | "top end" | "center left" | "center middle" | "center right" | "center start" | "center end" | "bottom left" | "bottom middle" | "bottom right" | "bottom start" | "bottom end" | undefined'.
components/composed/DssPopupEdit/1-structure/DssPopupEdit.ts.vue(17,6): error TS2322: Type '((value: unknown) => string | boolean) | undefined' is not assignable to type '((value: any) => boolean) | undefined'.
components/composed/DssTable/1-structure/DssTable.ts.vue(26,28): error TS2769: No overload matches this call.
components/composed/DssTable/1-structure/DssTable.ts.vue(29,35): error TS2769: No overload matches this call.
components/composed/DssTable/1-structure/DssTable.ts.vue(43,13): error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Readonly<DssTableSlots> & DssTableSlots'.
components/composed/DssTestPageComplexity/1-structure/DssTestPageComplexity.ts.vue(217,18): error TS2322: Type 'string' is not assignable to type 'Booleanish | "mixed" | undefined'.
components/composed/DssTestPageComplexity/1-structure/DssTestPageComplexity.ts.vue(228,18): error TS2322: Type 'string' is not assignable to type 'Booleanish | "mixed" | undefined'.
components/composed/DssTestPageComplexity/1-structure/DssTestPageComplexity.ts.vue(239,18): error TS2322: Type 'string' is not assignable to type 'Booleanish | "mixed" | undefined'.
components/composed/DssTimePicker/1-structure/DssTimePicker.ts.vue(56,52): error TS2345: Argument of type 'string | null' is not assignable to parameter of type 'string'.
components/composed/DssUploader/1-structure/DssUploader.ts.vue(205,8): error TS2322: Type 'Record<string, string> | { name: string; value: string; }[] | undefined' is not assignable to type '{ name: string; value: string; }[] | ((files: readonly any[]) => string) | undefined'.
components/composed/DssUploader/1-structure/DssUploader.ts.vue(209,8): error TS2322: Type 'UploaderFactory | undefined' is not assignable to type 'QUploaderFactoryFn | undefined'.
```
