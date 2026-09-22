/**
 * prop-category.mjs — categoria de PAPEL de cada prop, para o painel do Preview Frame.
 *
 * PROBLEMA (set/2026): o painel listava as props na ordem em que alguém as
 * declarou no `types/*.types.ts`, em dois baldes ("essenciais" e "o resto"). Não
 * havia o que prever: `brand` é a 14ª prop no DssChip e a 5ª no DssInput; `label`
 * é a 1ª no Chip e a 6ª no Input. Quem usa não conseguia adivinhar onde está o
 * controle que quer.
 *
 * DECISÃO: agrupar por PAPEL — Conteúdo · Aparência · Estado · Comportamento ·
 * Acessibilidade. É o eixo que a documentação do DSS já usa nas seções.
 *
 * COMO A CATEGORIA É OBTIDA — em ordem, a primeira que resolver vence:
 *
 *   1. api.json do QUASAR  (66% das props)
 *      O Quasar declara `category` em 100% das props, e os componentes DSS são
 *      wrappers. Herdar é melhor que anotar: 756 anotações à mão seriam 756
 *      pontos para divergir do Quasar quando ele mudar.
 *   2. NOME de a11y        (7,5%)   aria* / role / tabindex / *AriaLabel
 *   3. CSS do componente   (7,5%)   modificador em 4-output → Estado
 *                                   modificador em 3-variants → Aparência
 *                          É a Constituição #6: o CSS é fonte de verdade.
 *   4. vModel              (0,1%)   o valor que o componente carrega é Conteúdo
 *   5. EXCEÇÃO declarada   (18,7%)  props próprias do DSS, que o Quasar não conhece
 *
 * Sobrou sem nenhuma das cinco → 'Outros', e o gate reprova.
 */

/** Ordem CANÔNICA de exibição. Conteúdo primeiro porque é o que se vê primeiro. */
export const CATEGORIAS = ['Conteúdo', 'Aparência', 'Estado', 'Comportamento', 'Acessibilidade', 'Outros']

/**
 * Base Quasar de cada componente. A convenção `Dss<X>` → `Q<X>` resolve a maioria;
 * aqui ficam só os que fogem dela.
 * ⚠️ `DssTextarea` → `QInput`: NÃO existe QTextarea (é QInput com type=textarea).
 */
export const ANCHOR = {
  DssInput: 'QInput',
  DssTextarea: 'QInput',
  DssSelect: 'QSelect',
  DssFile: 'QFile',
  DssField: 'QField',
  DssButton: 'QBtn',
  DssChip: 'QChip',
  DssBtnToggle: 'QBtnToggle',
  DssBtnDropdown: 'QBtnDropdown',
  DssTimeline: 'QTimeline',
  DssTimelineEntry: 'QTimelineEntry',
  // Composto de Fase 3: envelopa o DssSelect, que envelopa o QSelect. Ancorar aqui
  // faz `options`/`optionValue`/`emitValue`/`clearable` herdarem a categoria do
  // Quasar em vez de virarem exceção à mão — a prop é dele, a categoria também.
  DssMultiselectAutocomplete: 'QSelect',
  // Primitivo NATIVO do DSS: o Quasar não tem equivalente para estado vazio.
  DssEmptyState: null,
}

/** Vocabulário do Quasar → eixo do DSS. Categoria composta ('behavior|state') usa a primeira. */
export const DE_QUASAR = {
  content: 'Conteúdo', label: 'Conteúdo', icons: 'Conteúdo', model: 'Conteúdo',
  options: 'Conteúdo', header: 'Conteúdo',
  style: 'Aparência', position: 'Aparência',
  state: 'Estado', validation: 'Estado', selection: 'Estado', filter: 'Estado',
  behavior: 'Comportamento', navigation: 'Comportamento', router: 'Comportamento', upload: 'Comportamento',
  accessibility: 'Acessibilidade',
}

/**
 * OVERRIDE — vence o Quasar.
 *
 * O Quasar categoriza pelo que a prop TOCA na implementação dele; aqui interessa
 * onde quem usa vai PROCURAR. Onde os dois divergem, manda o segundo — mas a
 * divergência fica declarada, com o que o Quasar diz ao lado, para ninguém achar
 * que foi descuido.
 */
export const OVERRIDE = {
  // Quasar: 'content' — mexem no conteúdo, mas o que mudam é o ARRANJO dele.
  // Quem procura "como alinho/empilho" vai em Aparência.
  align: 'Aparência', noCaps: 'Aparência', noWrap: 'Aparência',
  stack: 'Aparência', stretch: 'Aparência',
  // Quasar: 'style' — ripple é o FEEDBACK do toque, não a aparência em repouso.
  ripple: 'Comportamento',
  // Quasar: 'behavior|state' e 'behavior' — são o ESTADO em que o componente está.
  loading: 'Estado', percentage: 'Estado', darkPercentage: 'Estado',
  // Quasar: 'model' — no DSS `selected` é estado visual do chip, não o valor dele.
  'DssChip.selected': 'Estado',
  // Quasar: 'state' — habilitam INTERAÇÃO; quem procura por elas quer comportamento.
  clickable: 'Comportamento', removable: 'Comportamento',
  // `brand` precisa de OVERRIDE, não de exceção, e o motivo importa: a regra do
  // CSS vem ANTES das exceções, e o `_states.scss` do DssButton menciona
  // `--brand` uma vez (regra de estado sob marca). Resultado medido: `brand`
  // caía em Estado no Button e em Aparência no Chip e no Input — a MESMA prop em
  // grupos diferentes conforme o componente, que é exatamente a imprevisibilidade
  // que esta frente veio eliminar. No override, vale para todos.
  brand: 'Aparência',

  // ── Normalização entre componentes ─────────────────────────────────────────
  // A MESMA prop caía em grupos diferentes conforme o componente, porque o
  // Quasar a categoriza de um jeito em cada um. Para quem usa, isso reintroduz
  // a imprevisibilidade que esta frente veio eliminar — então unifica-se aqui.
  vertical: 'Aparência',   // orientação: Separator dizia Conteúdo, Slider Comportamento, Tabs Conteúdo
  side: 'Aparência',       // de que lado aparece: Timeline dizia Comportamento, ItemSection Conteúdo
  max: 'Conteúdo',         // limite do valor: Rating dizia Aparência, os demais Conteúdo
  visible: 'Estado',       // "está visível?": ScrollArea dizia Comportamento, Tooltip Estado
  title: 'Conteúdo',
  offset: 'Aparência',
  reverse: 'Aparência', multiLine: 'Aparência', padding: 'Aparência',
  inline: 'Aparência', inset: 'Aparência', lines: 'Aparência',
  tag: 'Comportamento', clearable: 'Comportamento', multiple: 'Comportamento',
  breakpoint: 'Comportamento', shrink: 'Comportamento',
  placeholder: 'Conteúdo',

  // ── Polissemia REAL — a prop significa coisas diferentes, e aí divergir é certo
  'DssVideo.title': 'Acessibilidade',        // atributo title do iframe, não texto exibido
  'DssInfiniteScroll.offset': 'Comportamento', // distância que DISPARA a carga, não posição
  'DssButton.type': 'Comportamento',         // submit/reset
  'DssInput.type': 'Comportamento',          // text/email/password
  'DssSpinner.type': 'Aparência',            // variante gráfica
  'DssSkeleton.type': 'Aparência',           // forma do esqueleto
  'DssOptionGroup.type': 'Aparência',        // radio vs checkbox: o que se VÊ
  'DssVirtualScroll.type': 'Comportamento',  // tipo semântico da lista (afeta role ARIA)
  'DssIcon.name': 'Conteúdo',                // o GLIFO exibido; nos demais, `name` é identificador
}

/**
 * As quatro props que sobram em categorias diferentes conforme o componente —
 * `type`, `title`, `name` e `offset` — divergem DE PROPÓSITO, porque significam
 * coisas diferentes. Todas estão declaradas acima com o motivo. Qualquer OUTRO
 * nome divergindo é inconsistência e deve ser normalizado aqui.
 */

/**
 * Props próprias do DSS — o Quasar não as conhece.
 * Chave `Componente.prop` tem precedência sobre `prop`, para o mesmo nome poder
 * significar coisas diferentes (ex.: `type` do DssButton é submit/reset =
 * Comportamento; o do DssSpinner é a forma do indicador = Aparência).
 */
export const EXCECOES = {
  // ── Aparência ──────────────────────────────────────────────────────────────
  variant: 'Aparência', brand: 'Aparência', square: 'Aparência', align: 'Aparência',
  vertical: 'Aparência', horizontal: 'Aparência', size: 'Aparência', density: 'Aparência',
  color: 'Aparência', textColor: 'Aparência', maxHeight: 'Aparência', maxWidth: 'Aparência',
  radius: 'Aparência', lines: 'Aparência', orientation: 'Aparência', rows: 'Aparência',
  iconSize: 'Aparência', itemSize: 'Aparência', fit: 'Aparência', cover: 'Aparência',
  anchor: 'Aparência', self: 'Aparência', offset: 'Aparência',
  'DssRating.max': 'Aparência',            // nº de estrelas: define a escala visual
  'DssSpinner.type': 'Aparência',          // forma do indicador
  // ── Conteúdo ───────────────────────────────────────────────────────────────
  label: 'Conteúdo', placeholder: 'Conteúdo', icon: 'Conteúdo', alt: 'Conteúdo',
  title: 'Conteúdo', description: 'Conteúdo', caption: 'Conteúdo', hint: 'Conteúdo',
  fallbackSrc: 'Conteúdo',
  // ── Estado ─────────────────────────────────────────────────────────────────
  errorMessage: 'Estado', disable: 'Estado', disabled: 'Estado', required: 'Estado',
  readonly: 'Estado', loading: 'Estado', status: 'Estado', hasValue: 'Estado',
  open: 'Estado', visible: 'Estado',
  // ── Comportamento ──────────────────────────────────────────────────────────
  dismissible: 'Comportamento', closeOnEsc: 'Comportamento', announce: 'Comportamento',
  href: 'Comportamento', target: 'Comportamento', delay: 'Comportamento',
  persistent: 'Comportamento', noFocus: 'Comportamento', noRefocus: 'Comportamento',
  autoClose: 'Comportamento', transitionShow: 'Comportamento', transitionHide: 'Comportamento',
  scrollTarget: 'Comportamento', barDelay: 'Comportamento', showOn: 'Comportamento',
  hideOn: 'Comportamento', tag: 'Comportamento', breakpoint: 'Comportamento',
  type: 'Comportamento',                   // submit/reset (Button), text/email (Input)
  name: 'Comportamento',                   // identificador que o PAI usa para casar painel/aba
  // ── Props que o Quasar não tem ou categoriza de forma que não ajuda aqui ───
  sliceSize: 'Comportamento',           // ajuste de virtualização
  loadOptions: 'Comportamento',         // busca assíncrona
  loadMore: 'Comportamento',            // carregamento incremental
  chipsRemovable: 'Comportamento',
  showSelectedSummary: 'Aparência',     // seção fixa no topo do painel
  // DIVERGÊNCIA DELIBERADA do Quasar: ele classifica `input-debounce` como
  // 'content'. Debounce é quando a busca dispara, não o que ela mostra — quem
  // procura por ele vai a Comportamento.
  inputDebounce: 'Comportamento',
  // ── Acessibilidade ─────────────────────────────────────────────────────────
  decorative: 'Acessibilidade',            // controla aria-hidden
  leadingDecorative: 'Acessibilidade', trailingDecorative: 'Acessibilidade',
  dismissLabel: 'Acessibilidade',          // nome acessível do botão de dispensar
  fieldId: 'Acessibilidade',               // associação label↔controle
}

/** Nome do componente Quasar que serve de base, ou null se não houver. */
export function baseQuasar(componente) {
  if (componente in ANCHOR) return ANCHOR[componente]
  return 'Q' + componente.replace(/^Dss/, '')
}

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/**
 * @returns {{ category: string, source: string }}
 */
export function derivarCategoria({ componente, prop, quasarProps, scssVariants = '', scssStates = '', scssBrands = '', vModel = null }) {
  // OVERRIDE primeiro: é o único jeito de discordar do Quasar de propósito.
  const ov = OVERRIDE[`${componente}.${prop}`] ?? OVERRIDE[prop]
  if (ov) return { category: ov, source: 'override' }

  const qp = quasarProps && (quasarProps[prop] || quasarProps[kebab(prop)])
  const cq = qp?.category && DE_QUASAR[String(qp.category).split('|')[0]]
  if (cq) return { category: cq, source: 'quasar' }

  if (/^aria|^role$|^tabindex$|AriaLabel$/.test(prop)) return { category: 'Acessibilidade', source: 'nome-a11y' }
  if (prop === vModel) return { category: 'Conteúdo', source: 'vmodel' }

  const mod = new RegExp('--' + kebab(prop) + '\\b')
  // ⚠️ `4-output/` tem DOIS arquivos com papéis diferentes: `_states.scss` e
  // `_brands.scss`. Ler a pasta inteira como "estado" mandava `brand` para
  // Estado — foi o que a primeira medição mostrou no DssButton.
  if (mod.test(scssStates)) return { category: 'Estado', source: 'css-states' }
  if (mod.test(scssBrands)) return { category: 'Aparência', source: 'css-brands' }
  if (mod.test(scssVariants)) return { category: 'Aparência', source: 'css-variants' }

  const exc = EXCECOES[`${componente}.${prop}`] ?? EXCECOES[prop]
  if (exc) return { category: exc, source: 'excecao' }

  return { category: 'Outros', source: 'nenhuma' }
}
