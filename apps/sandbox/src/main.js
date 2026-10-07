import { createApp } from 'vue'
import App from './App.vue'
import '@core/index.scss'
import {
  Quasar,
  // Directives
  ClosePopup,
  Ripple,
  // Components needed by DSS wrappers
  QAjaxBar,
  QAvatar,
  QBadge,
  QBanner,
  QBar,
  QBreadcrumbs,
  QBreadcrumbsEl,
  QBtn,
  QBtnDropdown,
  QBtnGroup,
  QBtnToggle,
  QCard,
  QCardActions,
  QCardSection,
  QCheckbox,
  QChip,
  QCircularProgress,
  QColor,
  QDate,
  QDialog,
  QExpansionItem,
  QFab,
  QFabAction,
  QField,
  QFile,
  QFooter,
  QHeader,
  QIcon,
  QImg,
  QInfiniteScroll,
  QInnerLoading,
  QInput,
  QItem,
  QItemLabel,
  QItemSection,
  QKnob,
  QLayout,
  QLinearProgress,
  QList,
  QMarkupTable,
  QMenu,
  QOptionGroup,
  QPage,
  QPageContainer,
  QPageScroller,
  QPageSticky,
  QPagination,
  QParallax,
  QPopupEdit,
  QPopupProxy,
  QPullToRefresh,
  QRadio,
  QRange,
  QRating,
  QScrollArea,
  QSelect,
  QSeparator,
  QSkeleton,
  QSlider,
  QSlideItem,
  QSpace,
  QSpinner,
  QSplitter,
  QStep,
  QStepper,
  QTab,
  QTabPanel,
  QTabPanels,
  QTabs,
  QTime,
  QToggle,
  QToolbar,
  QToolbarTitle,
  QTooltip,
  QTree,
  QUploader,
  QVideo,
  QVirtualScroll,
} from 'quasar'

const app = createApp(App)

// Registrar Quasar com todos os componentes usados pelos wrappers DSS
// CSS já carregado via dss-full.css no index.html
app.use(Quasar, {
  config: {},
  components: {
    QAjaxBar, QAvatar, QBadge, QBanner, QBar, QBreadcrumbs, QBreadcrumbsEl,
    QBtn, QBtnDropdown, QBtnGroup, QBtnToggle,
    QCard, QCardActions, QCardSection, QCheckbox, QChip,
    QCircularProgress, QColor, QDate, QDialog, QExpansionItem,
    QFab, QFabAction, QField, QFile, QFooter, QHeader,
    QIcon, QImg, QInfiniteScroll, QInnerLoading, QInput,
    QItem, QItemLabel, QItemSection,
    QKnob, QLayout, QLinearProgress, QList, QMarkupTable, QMenu,
    QOptionGroup, QPage, QPageContainer, QPageScroller, QPageSticky,
    QPagination, QParallax, QPopupEdit, QPopupProxy, QPullToRefresh,
    QRadio, QRange, QRating, QScrollArea, QSelect, QSeparator,
    QSkeleton, QSlider, QSlideItem, QSpace, QSpinner, QSplitter,
    QStep, QStepper, QTab, QTabPanel, QTabPanels, QTabs,
    QTime, QToggle, QToolbar, QToolbarTitle, QTooltip,
    QTree, QUploader, QVideo, QVirtualScroll,
  },
  directives: { ClosePopup, Ripple },
})

app.mount('#app')

// Grid Inspector — SOB DEMANDA, nunca por padrão.
//
// Era injetado automaticamente em todo boot de desenvolvimento, e o float dele
// ficava permanente sobre o canto da tela. Isso é chrome de ferramenta
// sobreposto ao que está sendo avaliado: atrapalha a leitura do componente e
// disputa o mesmo canto que elementos flutuantes do próprio DS.
//
// Agora precisa ser pedido, de duas formas que valem o mesmo:
//
//   1. `?inspector` na URL — explícito e COMPARTILHÁVEL: a URL carrega o
//      estado, então "abre aí com o inspector" é um link, não uma instrução.
//   2. `localStorage.dssGridInspector = '1'` — para quem trabalha com ele
//      ligado por uma sessão inteira e não quer repetir o parâmetro.
//
// Segue fora do realm do iframe do Preview Frame mesmo quando pedido: lá o
// sujeito é o componente isolado, e o float só atrasaria o boot.
const params = new URLSearchParams(window.location.search)
const isPreviewFrame = params.has('frame')

let inspectorPedido = false
try {
  inspectorPedido = params.has('inspector') || localStorage.getItem('dssGridInspector') === '1'
} catch {
  // localStorage pode lançar (janela privada, cookies bloqueados). O parâmetro
  // de URL continua valendo; o inspector é ferramenta, não pode derrubar a app.
  inspectorPedido = params.has('inspector')
}

if (import.meta.env.DEV && !isPreviewFrame && inspectorPedido) {
  Promise.all([
    import('@sansys/grid-inspector'),
    import('@sansys/grid-inspector/styles').catch(() => {}),
  ]).then(([{ injectGridInspector }]) => {
    injectGridInspector({
      debug: false,
      config: {
        contentSelector: '.test-content',
        // Initial layout values that match the page's actual DSS spacing:
        // margin-x = --dss-spacing-5 (20px), gap-y = 0 (no row gap by default).
        // These ensure Layout tab sliders start from the real rendered state.
        layout: {
          // Valores que espelham os tokens DSS padrão das páginas de teste:
          // margin-x = --dss-spacing-5 (20px), margin-y = --dss-spacing-4 (16px)
          // gap-x = --dss-spacing-3 (12px), padding-x/y = --dss-spacing-3/2 (12px/8px)
          margin: { x: 20, y: 16 },
          gutter: { x: 12, y: 8 },
          padding: { x: 12, y: 8 },
        },
      },
    });
  });
}
