<template>
  <div class="preview-page" :data-brand="activeBrand || undefined">

    <!-- ===== CABEÇALHO ===== -->
    <div class="preview-header">
      <DssToolbar>
        <DssToolbarTitle>Defaults Preview — DSS v2.2</DssToolbarTitle>
        <DssSpace />
        <div class="brand-selector">
          <span class="brand-label">Brand:</span>
          <button
            v-for="b in brands"
            :key="b.value"
            class="brand-btn"
            :class="[`brand-btn--${b.value || 'none'}`, { 'brand-btn--active': activeBrand === b.value }]"
            @click="activeBrand = b.value"
          >{{ b.label }}</button>
        </div>
        <DssBadge color="primary" class="q-ml-sm">76</DssBadge>
      </DssToolbar>
      <DssSeparator />
    </div>

    <!-- ===== CONTEÚDO PRINCIPAL ===== -->
    <div class="preview-content">

      <!-- ==================== GRUPO: AÇÕES ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Ações</span>
          <span class="group-desc">DssButton · DssChip · DssBtnGroup · DssBtnDropdown · DssBtnToggle · DssFab</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid">

            <div class="component-item">
              <div class="component-demo">
                <DssButton color="primary">Action</DssButton>
              </div>
              <code class="component-label">DssButton</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssChip label="Chip" />
              </div>
              <code class="component-label">DssChip</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssBtnGroup>
                  <DssButton color="primary">A</DssButton>
                  <DssButton color="primary">B</DssButton>
                  <DssButton color="primary">C</DssButton>
                </DssBtnGroup>
              </div>
              <code class="component-label">DssBtnGroup</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <span class="component-note">Overlay teleportado — painel visível somente ao acionar o botão</span>
              </div>
              <code class="component-label">DssBtnDropdown</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <span class="component-note">Grupo de alternância — requer :options e v-model em contexto isolado</span>
              </div>
              <code class="component-label">DssBtnToggle</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssFab icon="add" direction="right">
                  <DssFabAction icon="edit" />
                  <DssFabAction icon="delete" />
                </DssFab>
              </div>
              <code class="component-label">DssFab + DssFabAction</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== GRUPO: INDICADORES E AVATARES ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Indicadores e Avatares</span>
          <span class="group-desc">DssBadge · DssAvatar · DssIcon · DssSpinner · DssRating · DssKnob</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid">

            <div class="component-item">
              <div class="component-demo">
                <DssBadge color="primary">99+</DssBadge>
              </div>
              <code class="component-label">DssBadge</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssAvatar icon="person" />
              </div>
              <code class="component-label">DssAvatar</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssIcon name="home" />
              </div>
              <code class="component-label">DssIcon</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssSpinner />
              </div>
              <code class="component-label">DssSpinner</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssRating v-model="ratingValue" :max="5" />
              </div>
              <code class="component-label">DssRating</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssKnob v-model="knobValue" :min="0" :max="100" />
              </div>
              <code class="component-label">DssKnob</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== GRUPO: FORMULÁRIOS ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Formulários</span>
          <span class="group-desc">DssInput · DssSelect · DssCheckbox · DssRadio · DssToggle · DssSlider · DssRange · DssTextarea · DssOptionGroup · DssFile</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <div class="component-item">
              <div class="component-demo">
                <DssInput label="Campo de texto" />
              </div>
              <code class="component-label">DssInput</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <span class="component-note">Overlay teleportado — painel visível somente ao interagir</span>
              </div>
              <code class="component-label">DssSelect</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssCheckbox v-model="checkboxValue" label="Opção" />
              </div>
              <code class="component-label">DssCheckbox</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssRadio v-model="radioValue" val="a" label="Opção A" />
              </div>
              <code class="component-label">DssRadio</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssToggle v-model="toggleBool" label="Ativar" />
              </div>
              <code class="component-label">DssToggle</code>
            </div>

            <div class="component-item">
              <div class="component-demo component-demo--wide">
                <DssSlider v-model="sliderValue" :min="0" :max="100" />
              </div>
              <code class="component-label">DssSlider</code>
            </div>

            <div class="component-item">
              <div class="component-demo component-demo--wide">
                <DssRange v-model="rangeValue" :min="0" :max="100" />
              </div>
              <code class="component-label">DssRange</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssTextarea label="Descrição" />
              </div>
              <code class="component-label">DssTextarea</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssOptionGroup
                  v-model="optionGroupValue"
                  :options="optionGroupOptions"
                  type="radio"
                />
              </div>
              <code class="component-label">DssOptionGroup</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssFile v-model="fileValue" label="Arquivo" accept="*" />
              </div>
              <code class="component-label">DssFile</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== GRUPO: PROGRESSO E FEEDBACK ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Progresso e Feedback</span>
          <span class="group-desc">DssLinearProgress · DssCircularProgress · DssSkeleton · DssInnerLoading · DssAjaxBar</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssLinearProgress :value="0.6" />
              </div>
              <code class="component-label">DssLinearProgress</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssCircularProgress :value="0.6" />
              </div>
              <code class="component-label">DssCircularProgress</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssSkeleton type="rect" class="skeleton-sample" />
              </div>
              <code class="component-label">DssSkeleton</code>
            </div>

            <div class="component-item">
              <div class="component-demo component-demo--relative">
                <div class="inner-loading-host">Conteúdo</div>
                <DssInnerLoading :showing="true" />
              </div>
              <code class="component-label">DssInnerLoading</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <span class="component-note">Sem estado visual estático — ativado por requisição HTTP</span>
              </div>
              <code class="component-label">DssAjaxBar</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== GRUPO: BANNERS E BARRAS ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Banners e Barras</span>
          <span class="group-desc">DssBanner · DssBar</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssBanner>
                  <template #default>
                    Mensagem informativa com ação disponível
                  </template>
                  <template #actions>
                    <DssButton variant="flat" color="primary">Entendido</DssButton>
                  </template>
                </DssBanner>
              </div>
              <code class="component-label">DssBanner</code>
            </div>

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssBar>
                  <span>Conteúdo da barra de sistema</span>
                  <DssSpace />
                  <DssButton variant="flat" size="sm">Ação</DssButton>
                </DssBar>
              </div>
              <code class="component-label">DssBar</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== GRUPO: NAVEGAÇÃO ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Navegação</span>
          <span class="group-desc">DssTabs · DssBreadcrumbs · DssPagination · DssExpansionItem · DssMenu · DssTooltip</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssTabs v-model="activeTab" align="left">
                  <DssTab name="tab1" label="Geral" />
                  <DssTab name="tab2" label="Configurações" />
                  <DssTab name="tab3" label="Avançado" />
                </DssTabs>
              </div>
              <code class="component-label">DssTabs + DssTab</code>
            </div>

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssBreadcrumbs>
                  <DssBreadcrumbsEl label="Home" />
                  <DssBreadcrumbsEl label="Serviços" />
                  <DssBreadcrumbsEl label="Detalhe" />
                </DssBreadcrumbs>
              </div>
              <code class="component-label">DssBreadcrumbs + DssBreadcrumbsEl</code>
            </div>

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssPagination v-model="currentPage" :max="10" />
              </div>
              <code class="component-label">DssPagination</code>
            </div>

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssExpansionItem label="Item expansível — clique para abrir">
                  <DssCardSection>
                    Conteúdo revelado ao expandir o item.
                  </DssCardSection>
                </DssExpansionItem>
              </div>
              <code class="component-label">DssExpansionItem</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <span class="component-note">Overlay teleportado — visível somente ao acionar o gatilho</span>
              </div>
              <code class="component-label">DssMenu</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <span class="component-note">Overlay teleportado — visível somente no hover/focus do alvo</span>
              </div>
              <code class="component-label">DssTooltip</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== GRUPO: LISTAS E ESTRUTURA ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Listas e Estrutura</span>
          <span class="group-desc">DssList · DssItem · DssItemSection · DssItemLabel · DssSeparator · DssSpace</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid">

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssList bordered separator class="list-sample">
                  <DssItem>
                    <DssItemSection avatar>
                      <DssAvatar icon="person" />
                    </DssItemSection>
                    <DssItemSection>
                      <DssItemLabel>João Silva</DssItemLabel>
                      <DssItemLabel caption>Administrador</DssItemLabel>
                    </DssItemSection>
                  </DssItem>
                  <DssItem>
                    <DssItemSection avatar>
                      <DssAvatar icon="person" />
                    </DssItemSection>
                    <DssItemSection>
                      <DssItemLabel>Maria Santos</DssItemLabel>
                      <DssItemLabel caption>Operador</DssItemLabel>
                    </DssItemSection>
                  </DssItem>
                </DssList>
              </div>
              <code class="component-label">DssList + DssItem + DssItemSection + DssItemLabel</code>
            </div>

            <div class="component-item">
              <div class="component-demo component-demo--wide">
                <DssSeparator />
              </div>
              <code class="component-label">DssSeparator</code>
            </div>

            <div class="component-item">
              <div class="component-demo component-demo--inline">
                <span>Antes</span>
                <DssSpace />
                <span>Depois</span>
              </div>
              <code class="component-label">DssSpace</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== GRUPO: CARTÕES E SUPERFÍCIES ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Cartões e Superfícies</span>
          <span class="group-desc">DssCard (4 variantes) · DssToolbar · DssMarkupTable</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid">

            <div class="component-item">
              <div class="component-demo">
                <DssCard variant="elevated">
                  <DssCardSection>
                    <strong>Elevated</strong>
                    <p class="card-desc">Com elevação (sombra)</p>
                  </DssCardSection>
                </DssCard>
              </div>
              <code class="component-label">DssCard variant="elevated"</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssCard variant="outlined">
                  <DssCardSection>
                    <strong>Outlined</strong>
                    <p class="card-desc">Apenas borda</p>
                  </DssCardSection>
                </DssCard>
              </div>
              <code class="component-label">DssCard variant="outlined"</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssCard variant="bordered">
                  <DssCardSection>
                    <strong>Bordered</strong>
                    <p class="card-desc">Borda + sombra</p>
                  </DssCardSection>
                </DssCard>
              </div>
              <code class="component-label">DssCard variant="bordered"</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssCard variant="flat">
                  <DssCardSection>
                    <strong>Flat</strong>
                    <p class="card-desc">Sem elevação, sem borda</p>
                  </DssCardSection>
                </DssCard>
              </div>
              <code class="component-label">DssCard variant="flat"</code>
            </div>

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssToolbar>
                  <DssButton variant="flat" icon="menu" />
                  <DssToolbarTitle>Título da Toolbar</DssToolbarTitle>
                  <DssSpace />
                  <DssButton variant="flat" icon="search" />
                </DssToolbar>
              </div>
              <code class="component-label">DssToolbar + DssToolbarTitle</code>
            </div>

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssMarkupTable flat bordered>
                  <thead>
                    <tr>
                      <th>Componente</th>
                      <th>Fase</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>DssButton</td>
                      <td>1</td>
                      <td>Aprovado</td>
                    </tr>
                    <tr>
                      <td>DssBadge</td>
                      <td>1</td>
                      <td>Aprovado</td>
                    </tr>
                  </tbody>
                </DssMarkupTable>
              </div>
              <code class="component-label">DssMarkupTable</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== GRUPO: MÍDIA ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Mídia e Scroll</span>
          <span class="group-desc">DssImg · DssScrollArea · DssSplitter</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid">

            <div class="component-item">
              <div class="component-demo">
                <DssImg
                  src="https://picsum.photos/200/120"
                  alt="Imagem de exemplo"
                  class="img-sample"
                />
              </div>
              <code class="component-label">DssImg</code>
            </div>

            <div class="component-item">
              <div class="component-demo">
                <DssScrollArea class="scroll-sample">
                  <div v-for="i in 8" :key="i" class="scroll-row">
                    Item {{ i }} — conteúdo de lista longa
                  </div>
                </DssScrollArea>
              </div>
              <code class="component-label">DssScrollArea</code>
            </div>

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssSplitter v-model="splitterRatio" class="splitter-sample">
                  <template #before>
                    <div class="splitter-pane">Painel Esquerdo</div>
                  </template>
                  <template #after>
                    <div class="splitter-pane">Painel Direito</div>
                  </template>
                </DssSplitter>
              </div>
              <code class="component-label">DssSplitter</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== GRUPO: LAYOUT ESTRUTURAL (NOTA) ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Layout Estrutural</span>
          <span class="group-desc">Componentes de nível de aplicação — não demonstráveis inline</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <DssList bordered separator>
            <DssItem v-for="comp in layoutComponents" :key="comp.name">
              <DssItemSection>
                <DssItemLabel>{{ comp.name }}</DssItemLabel>
                <DssItemLabel caption>{{ comp.note }}</DssItemLabel>
              </DssItemSection>
            </DssItem>
          </DssList>
        </DssCardSection>
      </DssCard>

      <!-- ==================== GRUPO: COMPONENTES CONTEXTUAIS (NOTA) ==================== -->
      <DssCard variant="elevated" class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">Componentes Contextuais</span>
          <span class="group-desc">Requerem dados dinâmicos, router ou contexto específico</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <DssList bordered separator>
            <DssItem v-for="comp in contextualComponents" :key="comp.name">
              <DssItemSection>
                <DssItemLabel>{{ comp.name }}</DssItemLabel>
                <DssItemLabel caption>{{ comp.note }}</DssItemLabel>
              </DssItemSection>
            </DssItem>
          </DssList>
        </DssCardSection>
      </DssCard>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ── Ações ──────────────────────────────────────────────────────────────────
import { DssButton } from '../../components/base/DssButton'
import { DssChip } from '../../components/base/DssChip'
import { DssBtnGroup } from '../../components/base/DssBtnGroup'
import { DssFab } from '../../components/base/DssFab'
import { DssFabAction } from '../../components/base/DssFabAction'

// ── Indicadores ────────────────────────────────────────────────────────────
import { DssBadge } from '../../components/base/DssBadge'
import { DssAvatar } from '../../components/base/DssAvatar'
import { DssIcon } from '../../components/base/DssIcon'
import { DssSpinner } from '../../components/base/DssSpinner'
import { DssRating } from '../../components/base/DssRating'
import { DssKnob } from '../../components/base/DssKnob'

// ── Formulários ────────────────────────────────────────────────────────────
import { DssInput } from '../../components/base/DssInput'
import { DssCheckbox } from '../../components/base/DssCheckbox'
import { DssRadio } from '../../components/base/DssRadio'
import { DssToggle } from '../../components/base/DssToggle'
import { DssSlider } from '../../components/base/DssSlider'
import { DssRange } from '../../components/base/DssRange'
import { DssTextarea } from '../../components/base/DssTextarea'
import { DssOptionGroup } from '../../components/base/DssOptionGroup'
import { DssFile } from '../../components/base/DssFile'

// ── Progresso e Feedback ───────────────────────────────────────────────────
import { DssLinearProgress } from '../../components/base/DssLinearProgress'
import { DssCircularProgress } from '../../components/base/DssCircularProgress'
import { DssSkeleton } from '../../components/base/DssSkeleton'
import { DssInnerLoading } from '../../components/base/DssInnerLoading'

// ── Banners ────────────────────────────────────────────────────────────────
import { DssBanner } from '../../components/base/DssBanner'
import { DssBar } from '../../components/base/DssBar'

// ── Navegação ──────────────────────────────────────────────────────────────
import { DssTabs } from '../../components/base/DssTabs'
import { DssTab } from '../../components/base/DssTab'
import { DssBreadcrumbs } from '../../components/base/DssBreadcrumbs'
import { DssBreadcrumbsEl } from '../../components/base/DssBreadcrumbsEl'
import { DssPagination } from '../../components/base/DssPagination'
import { DssExpansionItem } from '../../components/base/DssExpansionItem'

// ── Listas ─────────────────────────────────────────────────────────────────
import { DssList } from '../../components/base/DssList'
import { DssItem } from '../../components/base/DssItem'
import { DssItemSection } from '../../components/base/DssItemSection'
import { DssItemLabel } from '../../components/base/DssItemLabel'
import { DssSeparator } from '../../components/base/DssSeparator'
import { DssSpace } from '../../components/base/DssSpace'

// ── Cartões e Superfícies ──────────────────────────────────────────────────
import { DssCard, DssCardSection } from '../../components/base/DssCard'
import { DssToolbar } from '../../components/base/DssToolbar'
import { DssToolbarTitle } from '../../components/base/DssToolbarTitle'
import { DssMarkupTable } from '../../components/base/DssMarkupTable'

// ── Mídia e Scroll ─────────────────────────────────────────────────────────
import { DssImg } from '../../components/base/DssImg'
import { DssScrollArea } from '../../components/base/DssScrollArea'
import { DssSplitter } from '../../components/base/DssSplitter'

// ── Brand selector ─────────────────────────────────────────────────────────
const activeBrand = ref('water')
const brands = [
  { value: 'hub',   label: 'Hub'   },
  { value: 'water', label: 'Water' },
  { value: 'waste', label: 'Waste' },
  { value: '',      label: '—'     },
]

// ── Estado dos componentes interativos ─────────────────────────────────────
const ratingValue = ref(3)
const knobValue   = ref(50)

const checkboxValue     = ref(false)
const radioValue        = ref('a')
const toggleBool        = ref(false)
const sliderValue       = ref(50)
const rangeValue        = ref({ min: 20, max: 80 })
const fileValue         = ref(null)
const optionGroupValue  = ref('opt1')
const optionGroupOptions = [
  { label: 'Opção 1', value: 'opt1' },
  { label: 'Opção 2', value: 'opt2' },
]

const activeTab     = ref('tab1')
const currentPage   = ref(1)
const splitterRatio = ref(50)

// ── Dados das notas de componentes estruturais ─────────────────────────────
const layoutComponents = [
  { name: 'DssLayout',         note: 'Container raiz Quasar — envolve toda a aplicação com DssHeader/DssDrawer/DssFooter' },
  { name: 'DssPage',           note: 'Filho direto de DssLayout — define a área de conteúdo principal' },
  { name: 'DssPageContainer',  note: 'Centra e limita largura do conteúdo dentro de DssPage' },
  { name: 'DssPageSticky',     note: 'Elemento fixo dentro de DssPage (topo/rodapé)' },
  { name: 'DssPageScroller',   note: 'Botão flutuante de volta ao topo — filho de DssPage' },
  { name: 'DssHeader',         note: 'Barra de aplicação superior — filho de DssLayout' },
  { name: 'DssFooter',         note: 'Barra de aplicação inferior — filho de DssLayout' },
  { name: 'DssDrawer',         note: 'Painel lateral deslizante — filho de DssLayout' },
]

const contextualComponents = [
  { name: 'DssDialog',          note: 'Overlay modal — ativado via v-model ou plugin $q.dialog' },
  { name: 'DssPopupProxy',      note: 'Utilitário de popup responsivo (menu em desktop, dialog em mobile)' },
  { name: 'DssRouteTab',        note: 'Aba com vue-router — requer configuração de rotas ativas' },
  { name: 'DssVirtualScroll',   note: 'Renderização virtual de listas longas — requer array de dados' },
  { name: 'DssInfiniteScroll',  note: 'Carregamento sob demanda — requer callback assíncrono' },
  { name: 'DssParallax',        note: 'Efeito parallax — depende de scroll do container pai' },
  { name: 'DssVideo',           note: 'Iframe de vídeo — requer URL de embed (YouTube/Vimeo)' },
  { name: 'DssPullToRefresh',   note: 'Atualização por gesto de toque — mobile only' },
  { name: 'DssTimePicker',      note: 'Seletor de horário — normalmente usado dentro de DssPopupProxy' },
  { name: 'DssDatePicker',      note: 'Seletor de data — normalmente usado dentro de DssPopupProxy' },
  { name: 'DssColorPicker',     note: 'Seletor de cor — normalmente usado dentro de DssPopupProxy' },
  { name: 'DssTimeline',        note: 'Lista cronológica — requer DssTimelineEntry como filhos' },
  { name: 'DssTimelineEntry',   note: 'Item de linha do tempo — filho de DssTimeline' },
  { name: 'DssTree',            note: 'Árvore hierárquica — requer estrutura de nós com children' },
  { name: 'DssSlideItem',       note: 'Item deslizável com ações — usado dentro de DssList' },
  { name: 'DssResponsive',      note: 'Wrapper responsivo — renderiza slot via QResponsive' },
  { name: 'DssField',           note: 'Campo base reutilizável — base para DssInput/DssSelect/etc.' },
  { name: 'DssStepper',         note: 'Container de stepper — requer DssStep como filhos' },
  { name: 'DssStep',            note: 'Etapa do stepper — filho de DssStepper' },
  { name: 'DssTabPanels',       note: 'Container de painéis de abas — sincronizado com DssTabs' },
  { name: 'DssTabPanel',        note: 'Painel de conteúdo de aba — filho de DssTabPanels' },
  { name: 'DssUploader',        note: 'Uploader de arquivos com progresso — requer endpoint HTTP' },
]
</script>

<style scoped>
/* ── Estrutura da página ─────────────────────────────────────────────────── */
.preview-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: var(--dss-surface-subtle);
}

.preview-header {
  flex-shrink: 0;
}

/* ── Seletor de brand ────────────────────────────────────────────────────── */
.brand-selector {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-1);
}

.brand-label {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-subtle);
  margin-right: var(--dss-spacing-1);
}

.brand-btn {
  padding: 4px 10px;
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  font-family: var(--dss-font-family-sans);
  border: 1px solid var(--dss-gray-300);
  border-radius: var(--dss-radius-full);
  background: transparent;
  color: var(--dss-text-secondary);
  cursor: pointer;
  transition: all 150ms ease;
  line-height: 1.4;
}
.brand-btn:hover { background: var(--dss-surface-muted); }

.brand-btn--hub.brand-btn--active    { background: var(--dss-hub-600);   border-color: var(--dss-hub-600);   color: white; }
.brand-btn--water.brand-btn--active  { background: var(--dss-water-500); border-color: var(--dss-water-500); color: white; }
.brand-btn--waste.brand-btn--active  { background: var(--dss-waste-600); border-color: var(--dss-waste-600); color: white; }
.brand-btn--none.brand-btn--active   { background: var(--dss-gray-700);  border-color: var(--dss-gray-700);  color: white; }

.preview-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--dss-spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
}

/* ── Grupos de componentes ───────────────────────────────────────────────── */
.preview-group {
  width: 100%;
}

.group-header {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1);
}

.group-title {
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  line-height: var(--dss-line-height-tight);
}

.group-desc {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  line-height: var(--dss-line-height-normal);
}

/* ── Grid de componentes ─────────────────────────────────────────────────── */
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--dss-spacing-48), 1fr));
  gap: var(--dss-spacing-4);
}

.component-grid--wide {
  grid-template-columns: repeat(auto-fill, minmax(var(--dss-spacing-72), 1fr));
}

/* ── Item de componente ──────────────────────────────────────────────────── */
.component-item {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
}

.component-item--full {
  grid-column: 1 / -1;
}

.component-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--dss-spacing-16);
  padding: var(--dss-spacing-3);
  background-color: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}

.component-demo--wide {
  width: 100%;
  justify-content: flex-start;
}

.component-demo--relative {
  position: relative;
  min-height: var(--dss-spacing-20);
}

.component-demo--inline {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.component-label {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-subtle);
  background-color: var(--dss-gray-100);
  padding: var(--dss-spacing-0_5) var(--dss-spacing-2);
  border-radius: var(--dss-radius-sm);
  font-family: monospace;
  display: inline-block;
  line-height: var(--dss-line-height-normal);
}

/* ── Nota de componente sem estado visual ────────────────────────────────── */
.component-note {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  font-style: italic;
  text-align: center;
  line-height: var(--dss-line-height-normal);
}

/* ── Exemplos específicos ────────────────────────────────────────────────── */
.skeleton-sample {
  width: var(--dss-spacing-40);
  height: var(--dss-spacing-8);
  border-radius: var(--dss-radius-sm);
}

.inner-loading-host {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dss-text-subtle);
  font-size: var(--dss-font-size-sm);
}

.list-sample {
  width: 100%;
  border-radius: var(--dss-radius-md);
}

.card-desc {
  margin: var(--dss-spacing-1) 0 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  line-height: var(--dss-line-height-normal);
}

.img-sample {
  width: var(--dss-spacing-48);
  height: var(--dss-spacing-32);
  border-radius: var(--dss-radius-md);
}

.scroll-sample {
  width: 100%;
  height: var(--dss-spacing-32);
  border: var(--dss-border-width-thin) solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}

.scroll-row {
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-gray-100);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
  line-height: var(--dss-line-height-normal);
}

.splitter-sample {
  width: 100%;
  height: var(--dss-spacing-20);
  border: var(--dss-border-width-thin) solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

.splitter-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  padding: var(--dss-spacing-2);
  line-height: var(--dss-line-height-normal);
}
</style>
