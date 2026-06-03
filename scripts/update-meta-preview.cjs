'use strict'

/**
 * update-meta-preview.cjs
 *
 * Script CJS que lê todos os dss.meta.json em packages/core/components/ e injeta:
 *   - previewGroup  → qual dos 15 grupos do TestDefaultPreview o componente pertence
 *   - defaultPreview.demoSlots → conteúdo de slots para renderização dinâmica
 *   - defaultPreview.props (mesclagem com PROPS_PATCH)
 *
 * Uso: node scripts/update-meta-preview.cjs
 */

const fs   = require('fs')
const path = require('path')

// ─── Raiz do monorepo ──────────────────────────────────────────────────────────
const ROOT         = path.resolve(__dirname, '..')
const COMPONENTS   = path.join(ROOT, 'packages', 'core', 'components')

// ─── GROUP_MAP ─────────────────────────────────────────────────────────────────
const GROUP_MAP = {
  // acoes
  DssButton:      'acoes',
  DssChip:        'acoes',
  DssBtnGroup:    'acoes',
  DssBtnDropdown: 'acoes',
  DssBtnToggle:   'acoes',
  DssFab:         'acoes',
  DssFabAction:   'acoes',

  // indicadores
  DssBadge:           'indicadores',
  DssAvatar:          'indicadores',
  DssIcon:            'indicadores',
  DssSpinner:         'indicadores',
  DssRating:          'indicadores',
  DssKnob:            'indicadores',
  DssTooltip:         'indicadores',

  // form-campos
  DssInput:    'form-campos',
  DssSelect:   'form-campos',
  DssTextarea: 'form-campos',
  DssFile:     'form-campos',

  // form-controles
  DssCheckbox:    'form-controles',
  DssRadio:       'form-controles',
  DssToggle:      'form-controles',
  DssOptionGroup: 'form-controles',
  DssSlider:      'form-controles',
  DssRange:       'form-controles',

  // progresso
  DssLinearProgress:   'progresso',
  DssCircularProgress: 'progresso',
  DssSkeleton:         'progresso',
  DssInnerLoading:     'progresso',
  DssAjaxBar:          'progresso',

  // banners
  DssBanner: 'banners',
  DssBar:    'banners',

  // navegacao
  DssTabs:          'navegacao',
  DssTab:           'navegacao',
  DssTabPanels:     'navegacao',
  DssTabPanel:      'navegacao',
  DssBreadcrumbs:   'navegacao',
  DssBreadcrumbsEl: 'navegacao',
  DssPagination:    'navegacao',
  DssExpansionItem: 'navegacao',
  DssMenu:          'navegacao',
  DssRouteTab:      'navegacao',

  // stepper
  DssStepper: 'stepper',
  DssStep:    'stepper',

  // listas
  DssList:        'listas',
  DssItem:        'listas',
  DssItemSection: 'listas',
  DssItemLabel:   'listas',
  DssSlideItem:   'listas',
  DssSeparator:   'listas',
  DssSpace:       'listas',

  // cartoes
  DssCard:         'cartoes',
  DssToolbar:      'cartoes',
  DssToolbarTitle: 'cartoes',
  DssMarkupTable:  'cartoes',

  // timeline
  DssTimeline:      'timeline',
  DssTimelineEntry: 'timeline',

  // arvore
  DssTree: 'arvore',

  // midia
  DssImg:        'midia',
  DssScrollArea: 'midia',
  DssSplitter:   'midia',

  // layout
  DssLayout:        'layout',
  DssHeader:        'layout',
  DssFooter:        'layout',
  DssDrawer:        'layout',
  DssPage:          'layout',
  DssPageContainer: 'layout',
  DssPageSticky:    'layout',
  DssPageScroller:  'layout',

  // contextuais (explícitos)
  DssVirtualScroll:  'contextuais',
  DssInfiniteScroll: 'contextuais',
  DssParallax:       'contextuais',
  DssVideo:          'contextuais',
  DssPullToRefresh:  'contextuais',
  DssPopupProxy:     'contextuais',
  DssField:          'contextuais',
  DssResponsive:     'contextuais',
  DssDialog:         'contextuais',
  DssBottomSheet:    'contextuais',
  DssCarousel:       'contextuais',
  DssChatMessage:    'contextuais',
  DssColorPicker:    'contextuais',
  DssDatePicker:     'contextuais',
  DssForm:           'contextuais',
  DssPopupEdit:      'contextuais',
  DssTable:          'contextuais',
  DssTimePicker:     'contextuais',
  DssUploader:       'contextuais',
}

// ─── PROPS_PATCH ───────────────────────────────────────────────────────────────
const PROPS_PATCH = {
  DssChip:        { label: 'Chip' },
  DssIcon:        { name: 'star' },
  DssAvatar:      { icon: 'person' },
  DssCheckbox:    { label: 'Opção', modelValue: false },
  DssRadio:       { label: 'Opção', val: 'opcao', modelValue: null },
  DssToggle:      { label: 'Ativar', modelValue: false },
  DssBtnToggle:   { modelValue: 'opcao1', options: [{ label: 'A', value: 'opcao1' }, { label: 'B', value: 'opcao2' }, { label: 'C', value: 'opcao3' }] },
  DssOptionGroup: { modelValue: 'opt1', type: 'radio', options: [{ label: 'Opção 1', value: 'opt1' }, { label: 'Opção 2', value: 'opt2' }] },
  DssSlider:      { modelValue: 50 },
  DssRange:       { modelValue: { min: 25, max: 75 } },
  DssInput:       { label: 'Campo', placeholder: 'Digite aqui' },
  DssSelect:      { label: 'Seleção', options: ['Opção 1', 'Opção 2'] },
  DssTextarea:    { label: 'Mensagem', placeholder: 'Escreva aqui' },
  DssFile:        { label: 'Arquivo' },
  DssLinearProgress:   { value: 0.7 },
  DssCircularProgress: { value: 70 },
  DssSkeleton:         { type: 'text', width: '200px' },
  DssRating:      { modelValue: 3, max: 5 },
  DssKnob:        { modelValue: 50 },
  DssInnerLoading: { showing: true, label: 'Carregando...' },
  DssBanner:      { inline: true },
  DssExpansionItem: { label: 'Expansível', modelValue: true },
  DssPagination:  { modelValue: 1, max: 10 },
  DssTab:         { name: 'tab1', label: 'Aba' },
  DssTabs:        { modelValue: 'inicio' },
  DssTabPanels:   { modelValue: 'inicio' },
  DssTabPanel:    { name: 'inicio' },
  DssBreadcrumbsEl: { label: 'Página' },
  DssStep:        { name: 'passo1', title: 'Passo 1' },
  DssStepper:     { modelValue: 'passo1' },
  DssImg:         { src: 'https://placehold.co/200x120', alt: 'Imagem demonstrativa', width: '200px' },
  DssSplitter:    { modelValue: 50, style: 'height:80px;width:240px' },
  DssScrollArea:  { style: 'height:100px;width:200px' },
  DssTree: {
    nodes: [
      {
        label: 'Raiz',
        icon: 'folder',
        children: [
          { label: 'Filho 1', icon: 'description' },
          { label: 'Filho 2', icon: 'description' },
        ],
      },
    ],
  },
  DssRouteTab:   { name: 'inicio', label: 'Início', to: '/' },
  DssVideo:      { src: '' },
  DssParallax:   { src: 'https://placehold.co/600x200', height: 100 },
  DssDrawer:     { modelValue: true, persistent: true, width: 150 },
  DssPageSticky: { position: 'bottom-right', offset: [8, 8] },
  DssFab:        { icon: 'add', label: 'Adicionar' },
  DssFabAction:  { icon: 'mail', label: 'Email' },
  DssBar:        { rounded: true },
}

// ─── SLOTS_MAP ─────────────────────────────────────────────────────────────────
const SLOTS_MAP = {
  DssButton: { default: 'Ação Principal' },
  DssBadge:  { default: '99+' },
  DssBtnGroup: {
    default: [
      { component: 'DssButton', children: 'Dia' },
      { component: 'DssButton', children: 'Semana' },
      { component: 'DssButton', children: 'Mês' },
    ],
  },
  DssBtnDropdown: {
    default: [
      {
        component: 'DssList',
        children: [
          {
            component: 'DssItem',
            props: { clickable: true },
            children: [{ component: 'DssItemSection', children: [{ component: 'DssItemLabel', children: 'Editar' }] }],
          },
          {
            component: 'DssItem',
            props: { clickable: true },
            children: [{ component: 'DssItemSection', children: [{ component: 'DssItemLabel', children: 'Duplicar' }] }],
          },
        ],
      },
    ],
  },
  DssFab: {
    default: [
      { component: 'DssFabAction', props: { icon: 'mail', label: 'Email' } },
      { component: 'DssFabAction', props: { icon: 'edit', label: 'Editar' } },
    ],
  },
  DssTooltip: { default: 'Informação adicional' },
  DssBanner: {
    default: 'Mensagem informativa do sistema.',
    action: [{ component: 'DssButton', props: { flat: true, color: 'primary', size: 'sm' }, children: 'Entendido' }],
  },
  DssBar: { default: 'Barra com conteúdo do sistema' },
  DssTabs: {
    default: [
      { component: 'DssTab', props: { name: 'inicio', label: 'Início' } },
      { component: 'DssTab', props: { name: 'perfil', label: 'Perfil' } },
      { component: 'DssTab', props: { name: 'config', label: 'Config' } },
    ],
  },
  DssTabPanels: {
    default: [
      { component: 'DssTabPanel', props: { name: 'inicio' }, children: 'Conteúdo Início' },
      { component: 'DssTabPanel', props: { name: 'perfil' }, children: 'Conteúdo Perfil' },
    ],
  },
  DssBreadcrumbs: {
    default: [
      { component: 'DssBreadcrumbsEl', props: { label: 'Home' } },
      { component: 'DssBreadcrumbsEl', props: { label: 'Produtos' } },
      { component: 'DssBreadcrumbsEl', props: { label: 'Detalhe' } },
    ],
  },
  DssExpansionItem: { default: 'Conteúdo expandido do item.' },
  DssMenu: {
    default: [
      {
        component: 'DssList',
        children: [
          {
            component: 'DssItem',
            props: { clickable: true },
            children: [{ component: 'DssItemSection', children: [{ component: 'DssItemLabel', children: 'Opção 1' }] }],
          },
          {
            component: 'DssItem',
            props: { clickable: true },
            children: [{ component: 'DssItemSection', children: [{ component: 'DssItemLabel', children: 'Opção 2' }] }],
          },
        ],
      },
    ],
  },
  DssStepper: {
    default: [
      { component: 'DssStep', props: { name: 'passo1', title: 'Dados', done: true }, children: 'Dados básicos.' },
      { component: 'DssStep', props: { name: 'passo2', title: 'Revisão' }, children: 'Revise os dados.' },
    ],
  },
  DssStep: { default: 'Conteúdo da etapa.' },
  DssList: {
    default: [
      {
        component: 'DssItem',
        props: { clickable: true },
        children: [{ component: 'DssItemSection', children: [{ component: 'DssItemLabel', children: 'Item 1' }] }],
      },
      {
        component: 'DssItem',
        props: { clickable: true },
        children: [{ component: 'DssItemSection', children: [{ component: 'DssItemLabel', children: 'Item 2' }] }],
      },
    ],
  },
  DssItem: {
    default: [
      { component: 'DssItemSection', children: [{ component: 'DssItemLabel', children: 'Rótulo do item' }] },
    ],
  },
  DssItemSection: { default: 'Conteúdo' },
  DssItemLabel:   { default: 'Rótulo' },
  DssSlideItem: {
    default: [
      { component: 'DssItemSection', children: [{ component: 'DssItemLabel', children: 'Deslize para ver ações' }] },
    ],
  },
  DssCard: {
    default: [
      {
        component: 'DssCardSection',
        children: 'Conteúdo do card com informações.',
      },
      {
        component: 'DssCardActions',
        props: { align: 'right' },
        children: [{ component: 'DssButton', props: { flat: true, size: 'sm' }, children: 'Ação' }],
      },
    ],
  },
  DssToolbar: {
    default: [
      { component: 'DssToolbarTitle', children: 'Título da Toolbar' },
      { component: 'DssSpace' },
    ],
  },
  DssToolbarTitle: { default: 'Título da Barra' },
  DssMarkupTable: {
    default: [
      { html: '<thead><tr><th>Nome</th><th>Valor</th></tr></thead><tbody><tr><td>Item A</td><td>100</td></tr><tr><td>Item B</td><td>200</td></tr></tbody>' },
    ],
  },
  DssTimeline: {
    default: [
      { component: 'DssTimelineEntry', props: { title: 'Evento 1', subtitle: 'Jan 2026', icon: 'check', color: 'primary' }, children: 'Primeiro evento.' },
      { component: 'DssTimelineEntry', props: { title: 'Evento 2', subtitle: 'Fev 2026', icon: 'star', color: 'secondary' }, children: 'Segundo evento.' },
    ],
  },
  DssTimelineEntry: { default: 'Conteúdo do evento.' },
  DssScrollArea: {
    default: [{ html: "<div style='height:80px;width:160px;padding:8px'>Conteúdo com scroll personalizado</div>" }],
  },
  DssSplitter: {
    before: [{ html: "<div style='padding:8px'>Esquerdo</div>" }],
    after:  [{ html: "<div style='padding:8px'>Direito</div>" }],
  },
  DssInnerLoading: {
    default: [{ html: "<div style='height:60px;width:120px;display:flex;align-items:center;justify-content:center'>Conteúdo</div>" }],
  },
  DssHeader: {
    default: [{ component: 'DssToolbar', children: [{ component: 'DssToolbarTitle', children: 'Cabeçalho DSS' }] }],
  },
  DssFooter: {
    default: [{ component: 'DssToolbar', children: [{ component: 'DssToolbarTitle', children: 'Rodapé DSS' }] }],
  },
  DssPage: {
    default: [{ html: "<div style='padding:16px'>Conteúdo da página</div>" }],
  },
  DssPageContainer: {
    default: [{ html: "<div style='padding:8px'>Container com offset automático</div>" }],
  },
  DssPageScroller: {
    default: [{ component: 'DssButton', props: { round: true, color: 'primary', icon: 'keyboard_arrow_up', size: 'sm' } }],
  },
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Recursivamente encontra todos os dss.meta.json sob um diretório.
 */
function findMetaFiles(dir) {
  const results = []
  if (!fs.existsSync(dir)) return results
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findMetaFiles(full))
    } else if (entry.name === 'dss.meta.json') {
      results.push(full)
    }
  }
  return results
}

// ─── Main ──────────────────────────────────────────────────────────────────────
function main() {
  const metaFiles = findMetaFiles(COMPONENTS)
  console.log(`Encontrados ${metaFiles.length} arquivo(s) dss.meta.json`)

  let updated = 0
  let skipped = 0

  for (const filePath of metaFiles) {
    let raw
    try {
      raw = fs.readFileSync(filePath, 'utf-8')
    } catch (err) {
      console.warn(`  WARN: não foi possível ler ${filePath}: ${err.message}`)
      skipped++
      continue
    }

    let data
    try {
      data = JSON.parse(raw)
    } catch (err) {
      console.warn(`  WARN: JSON inválido em ${filePath}: ${err.message}`)
      skipped++
      continue
    }

    // Determina o nome do componente (campo "component" ou "name")
    const componentName = data.component || data.name

    // ── Normaliza campo "component" ────────────────────────────────────────────
    // Componentes que usam "name" ao invés de "component" recebem o campo
    // "component" para compatibilidade com o filtro do TestDefaultPreview.
    // Exceções: componentes de stress-test/complexidade que não têm .vue wrapper.
    const SKIP_COMPONENT_NORMALIZATION = new Set(['DssTestPageComplexity', 'DssCadrisCard'])
    if (!data.component && data.name && !SKIP_COMPONENT_NORMALIZATION.has(data.name)) {
      data.component = data.name
    }

    // ── previewGroup ──────────────────────────────────────────────────────────
    const group = GROUP_MAP[componentName] || 'contextuais'
    data.previewGroup = group

    // ── defaultPreview ────────────────────────────────────────────────────────
    if (!data.defaultPreview || typeof data.defaultPreview !== 'object') {
      data.defaultPreview = {}
    }

    // Mesclar PROPS_PATCH
    if (PROPS_PATCH[componentName]) {
      data.defaultPreview.props = Object.assign(
        {},
        data.defaultPreview.props || {},
        PROPS_PATCH[componentName]
      )
    }

    // demoSlots: usar SLOTS_MAP se existir, caso contrário null
    if (Object.prototype.hasOwnProperty.call(SLOTS_MAP, componentName)) {
      data.defaultPreview.demoSlots = SLOTS_MAP[componentName]
    } else {
      // Só adiciona null se ainda não existir o campo, para não sobrescrever
      // casos onde um componente já definiu seus próprios demoSlots
      if (!Object.prototype.hasOwnProperty.call(data.defaultPreview, 'demoSlots')) {
        data.defaultPreview.demoSlots = null
      }
    }

    // Grava de volta
    const newContent = JSON.stringify(data, null, 2) + '\n'
    try {
      fs.writeFileSync(filePath, newContent, 'utf-8')
      console.log(`  OK: ${path.relative(ROOT, filePath)} (group: ${group})`)
      updated++
    } catch (err) {
      console.warn(`  WARN: não foi possível gravar ${filePath}: ${err.message}`)
      skipped++
    }
  }

  console.log(`\nResumo: ${updated} atualizado(s), ${skipped} ignorado(s).`)
}

main()
