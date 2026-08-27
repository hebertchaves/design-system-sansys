<template>
  <div class="test-suite" :class="{ 'is-collapsed': sidebarCollapsed }">
    <!-- Sidebar Navigation -->
    <div class="test-sidebar">
      <div class="sidebar-header">
        <span class="sidebar-logo">⬡</span>
        <div class="sidebar-title">DSS</div>
        <span class="version">v2.3</span>
        <button
          class="sidebar-collapse"
          type="button"
          :title="sidebarCollapsed ? 'Expandir menu' : 'Retrair menu'"
          :aria-label="sidebarCollapsed ? 'Expandir menu' : 'Retrair menu'"
          :aria-expanded="!sidebarCollapsed"
          @click="sidebarCollapsed = !sidebarCollapsed"
        >
          <span class="material-icons">{{ sidebarCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
        </button>
      </div>

      <nav class="sidebar-nav" @mouseover="onNavOver" @mouseout="onNavOut">
        <!-- Dashboard -->
        <div class="nav-section">
          <button
            @click="activeComponent = 'index'"
            :class="['nav-item', { active: activeComponent === 'index' }]"
          >
            <span class="nav-icon"><span class="material-icons">home</span></span>
            <span class="nav-label">Dashboard</span>
          </button>
        </div>

        <!-- Defaults Preview -->
        <div class="nav-section">
          <button
            @click="activeComponent = 'defaults-preview'"
            :class="['nav-item', { active: activeComponent === 'defaults-preview' }]"
          >
            <span class="nav-icon"><span class="material-icons">palette</span></span>
            <span class="nav-label">Defaults Preview</span>
            <span class="nav-badge">76</span>
          </button>
        </div>

        <!-- PREVIEW FRAME sem página de teste correspondente.
             Os demais Preview Frames moram aninhados sob o próprio componente,
             na árvore de COMPONENTS — este bloco guarda só os que não têm
             página de teste onde ancorar. Ao criar a página de teste destes
             dois, mova o item para baixo dela e apague esta seção. -->
        <div class="nav-section">
          <button
            @click="activeComponent = 'preview-frame-uploader'"
            :class="['nav-item', { active: activeComponent === 'preview-frame-uploader' }]"
          >
            <span class="nav-icon"><span class="material-icons">dvr</span></span>
            <span class="nav-label">Preview Frame · DssUploader</span>
          </button>
          <button
            @click="activeComponent = 'preview-frame-multiselect'"
            :class="['nav-item', { active: activeComponent === 'preview-frame-multiselect' }]"
          >
            <span class="nav-icon"><span class="material-icons">dvr</span></span>
            <span class="nav-label">Preview Frame · DssMultiselectAutocomplete</span>
          </button>
        </div>

        <!-- Foundation -->
        <div class="nav-section">
          <button
            @click="toggleCategory('foundation')"
            class="nav-category"
          >
            <span class="nav-icon"><span class="material-icons">bolt</span></span>
            <span class="nav-label">Foundation</span>
            <span class="chevron" :class="{ expanded: expandedCategories.foundation }">›</span>
          </button>

          <div v-show="expandedCategories.foundation" class="nav-submenu">
            <button
              @click="activeComponent = 'tokens'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'tokens' }]"
            >
              <span class="nav-icon"><span class="material-icons">style</span></span>
              <span class="nav-label">Design Tokens</span>
              <span class="nav-badge">112</span>
            </button>

            <button
              @click="activeComponent = 'colors'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'colors' }]"
            >
              <span class="nav-icon"><span class="material-icons">gradient</span></span>
              <span class="nav-label">Colors</span>
            </button>

            <button
              @click="activeComponent = 'typography'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'typography' }]"
            >
              <span class="nav-icon"><span class="material-icons">title</span></span>
              <span class="nav-label">Typography</span>
            </button>

            <button
              @click="activeComponent = 'spacing'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'spacing' }]"
            >
              <span class="nav-icon"><span class="material-icons">space_bar</span></span>
              <span class="nav-label">Spacing</span>
            </button>
          </div>
        </div>

        <!-- Components -->
        <div class="nav-section">
          <button
            @click="toggleCategory('components')"
            class="nav-category"
          >
            <span class="nav-icon"><span class="material-icons">widgets</span></span>
            <span class="nav-label">Components</span>
            <span class="chevron" :class="{ expanded: expandedCategories.components }">›</span>
          </button>

          <div v-show="expandedCategories.components" class="nav-submenu">
            <!-- Buttons & Actions -->
            <button @click="toggleCategory('buttonsActions')" class="nav-subcategory">
              <span class="nav-label">Buttons & Actions</span>
              <span class="chevron" :class="{ expanded: expandedCategories.buttonsActions }">›</span>
            </button>

            <div v-show="expandedCategories.buttonsActions" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'button'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'button' }]"
              >
                <span class="nav-icon"><span class="material-icons">smart_button</span></span>
                <span class="nav-label">DssButton</span>
                <span class="nav-badge">20</span>
              </button>

              <button
                @click="activeComponent = 'icon-button'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'icon-button' }]"
              >
                <span class="nav-icon"><span class="material-icons">radio_button_unchecked</span></span>
                <span class="nav-label">IconButton</span>
              </button>
            </div>

            <!-- Display & Feedback -->
            <button @click="toggleCategory('displayFeedback')" class="nav-subcategory">
              <span class="nav-label">Display & Feedback</span>
              <span class="chevron" :class="{ expanded: expandedCategories.displayFeedback }">›</span>
            </button>

            <div v-show="expandedCategories.displayFeedback" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'badge'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'badge' }]"
              >
                <span class="nav-icon"><span class="material-icons">sell</span></span>
                <span class="nav-label">DssBadge</span>
                <span class="nav-badge">14</span>
              </button>

              <button
                @click="activeComponent = 'chip'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'chip' }]"
              >
                <span class="nav-icon"><span class="material-icons">label</span></span>
                <span class="nav-label">DssChip</span>
              </button>

              <button
                @click="activeComponent = 'preview-frame-chip'"
                :class="['nav-item nav-previewitem', { active: activeComponent === 'preview-frame-chip' }]"
              >
                <span class="nav-icon"><span class="material-icons">dvr</span></span>
                <span class="nav-label">Preview Frame</span>
              </button>

              <button
                @click="activeComponent = 'preview-frame-empty-state'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'preview-frame-empty-state' }]"
              >
                <span class="nav-icon"><span class="material-icons">inbox</span></span>
                <span class="nav-label">DssEmptyState</span>
              </button>

              <button
                @click="activeComponent = 'alert'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'alert' }]"
              >
                <span class="nav-icon"><span class="material-icons">warning_amber</span></span>
                <span class="nav-label">DssAlert</span>
              </button>
            </div>

            <!-- Data Display -->
            <button @click="toggleCategory('dataDisplay')" class="nav-subcategory">
              <span class="nav-label">Data Display</span>
              <span class="chevron" :class="{ expanded: expandedCategories.dataDisplay }">›</span>
            </button>

            <div v-show="expandedCategories.dataDisplay" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'avatar'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'avatar' }]"
              >
                <span class="nav-icon"><span class="material-icons">account_circle</span></span>
                <span class="nav-label">DssAvatar</span>
                <span class="nav-badge">24</span>
              </button>

              <button
                @click="activeComponent = 'table'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'table' }]"
              >
                <span class="nav-icon"><span class="material-icons">table_chart</span></span>
                <span class="nav-label">DssTable</span>
              </button>

              <button
                @click="activeComponent = 'list'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'list' }]"
              >
                <span class="nav-icon"><span class="material-icons">format_list_bulleted</span></span>
                <span class="nav-label">DssList</span>
              </button>
            </div>

            <!-- Forms & Input -->
            <button @click="toggleCategory('formsInput')" class="nav-subcategory">
              <span class="nav-label">Forms & Input</span>
              <span class="chevron" :class="{ expanded: expandedCategories.formsInput }">›</span>
            </button>

            <div v-show="expandedCategories.formsInput" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'input'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'input' }]"
              >
                <span class="nav-icon"><span class="material-icons">edit</span></span>
                <span class="nav-label">DssInput</span>
              </button>
              <button
                @click="activeComponent = 'preview-frame'"
                :class="['nav-item nav-previewitem', { active: activeComponent === 'preview-frame' }]"
              >
                <span class="nav-icon"><span class="material-icons">dvr</span></span>
                <span class="nav-label">Preview Frame</span>
              </button>


              <button
                @click="activeComponent = 'select'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'select' }]"
              >
                <span class="nav-icon"><span class="material-icons">expand_circle_down</span></span>
                <span class="nav-label">DssSelect</span>
              </button>
              <button
                @click="activeComponent = 'preview-frame-select'"
                :class="['nav-item nav-previewitem', { active: activeComponent === 'preview-frame-select' }]"
              >
                <span class="nav-icon"><span class="material-icons">dvr</span></span>
                <span class="nav-label">Preview Frame</span>
              </button>


              <button
                @click="activeComponent = 'textarea'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'textarea' }]"
              >
                <span class="nav-icon"><span class="material-icons">notes</span></span>
                <span class="nav-label">DssTextarea</span>
              </button>
              <button
                @click="activeComponent = 'preview-frame-textarea'"
                :class="['nav-item nav-previewitem', { active: activeComponent === 'preview-frame-textarea' }]"
              >
                <span class="nav-icon"><span class="material-icons">dvr</span></span>
                <span class="nav-label">Preview Frame</span>
              </button>


              <button
                @click="activeComponent = 'file'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'file' }]"
              >
                <span class="nav-icon"><span class="material-icons">attach_file</span></span>
                <span class="nav-label">DssFile</span>
              </button>
              <button
                @click="activeComponent = 'preview-frame-file'"
                :class="['nav-item nav-previewitem', { active: activeComponent === 'preview-frame-file' }]"
              >
                <span class="nav-icon"><span class="material-icons">dvr</span></span>
                <span class="nav-label">Preview Frame</span>
              </button>


              <button
                @click="activeComponent = 'field'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'field' }]"
              >
                <span class="nav-icon"><span class="material-icons">crop_free</span></span>
                <span class="nav-label">DssField</span>
              </button>
              <button
                @click="activeComponent = 'preview-frame-field'"
                :class="['nav-item nav-previewitem', { active: activeComponent === 'preview-frame-field' }]"
              >
                <span class="nav-icon"><span class="material-icons">dvr</span></span>
                <span class="nav-label">Preview Frame</span>
              </button>

            </div>

            <!-- Controles de Seleção -->
            <button @click="toggleCategory('selectionControls')" class="nav-subcategory">
              <span class="nav-label">Controles de Seleção</span>
              <span class="chevron" :class="{ expanded: expandedCategories.selectionControls }">›</span>
            </button>

            <div v-show="expandedCategories.selectionControls" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'checkbox'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'checkbox' }]"
              >
                <span class="nav-icon"><span class="material-icons">check_box</span></span>
                <span class="nav-label">DssCheckbox</span>
              </button>
              <button
                @click="activeComponent = 'preview-frame-checkbox'"
                :class="['nav-item nav-previewitem', { active: activeComponent === 'preview-frame-checkbox' }]"
              >
                <span class="nav-icon"><span class="material-icons">dvr</span></span>
                <span class="nav-label">Preview Frame</span>
              </button>

              <button
                @click="activeComponent = 'radio'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'radio' }]"
              >
                <span class="nav-icon"><span class="material-icons">radio_button_checked</span></span>
                <span class="nav-label">DssRadio</span>
              </button>
              <button
                @click="activeComponent = 'preview-frame-radio'"
                :class="['nav-item nav-previewitem', { active: activeComponent === 'preview-frame-radio' }]"
              >
                <span class="nav-icon"><span class="material-icons">dvr</span></span>
                <span class="nav-label">Preview Frame</span>
              </button>

              <button
                @click="activeComponent = 'toggle'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'toggle' }]"
              >
                <span class="nav-icon"><span class="material-icons">toggle_on</span></span>
                <span class="nav-label">DssToggle</span>
              </button>
              <button
                @click="activeComponent = 'preview-frame-toggle'"
                :class="['nav-item nav-previewitem', { active: activeComponent === 'preview-frame-toggle' }]"
              >
                <span class="nav-icon"><span class="material-icons">dvr</span></span>
                <span class="nav-label">Preview Frame</span>
              </button>

            </div>

            <!-- Layout -->
            <button @click="toggleCategory('layout')" class="nav-subcategory">
              <span class="nav-label">Layout</span>
              <span class="chevron" :class="{ expanded: expandedCategories.layout }">›</span>
            </button>

            <div v-show="expandedCategories.layout" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'card'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'card' }]"
              >
                <span class="nav-icon"><span class="material-icons">crop_portrait</span></span>
                <span class="nav-label">DssCard</span>
                <span class="nav-badge">11</span>
              </button>

              <button
                @click="activeComponent = 'container'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'container' }]"
              >
                <span class="nav-icon"><span class="material-icons">inbox</span></span>
                <span class="nav-label">DssContainer</span>
              </button>

              <button
                @click="activeComponent = 'grid'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'grid' }]"
              >
                <span class="nav-icon"><span class="material-icons">grid_on</span></span>
                <span class="nav-label">DssGrid</span>
              </button>
            </div>

            <!-- Navigation -->
            <button @click="toggleCategory('navigation')" class="nav-subcategory">
              <span class="nav-label">Navigation</span>
              <span class="chevron" :class="{ expanded: expandedCategories.navigation }">›</span>
            </button>

            <div v-show="expandedCategories.navigation" class="nav-subsubmenu">
              <button
                @click="activeComponent = 'menu'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'menu' }]"
              >
                <span class="nav-icon"><span class="material-icons">menu</span></span>
                <span class="nav-label">DssMenu</span>
              </button>

              <button
                @click="activeComponent = 'tabs'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'tabs' }]"
              >
                <span class="nav-icon"><span class="material-icons">tab</span></span>
                <span class="nav-label">DssTabs</span>
              </button>

              <button
                @click="activeComponent = 'breadcrumb'"
                :class="['nav-item nav-subsubitem', { active: activeComponent === 'breadcrumb' }]"
              >
                <span class="nav-icon"><span class="material-icons">account_tree</span></span>
                <span class="nav-label">DssBreadcrumb</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Phase 3 — Compostos -->
        <div class="nav-section">
          <button
            @click="toggleCategory('phase3')"
            class="nav-category"
          >
            <span class="nav-icon"><span class="material-icons">science</span></span>
            <span class="nav-label">Fase 3 — Compostos</span>
            <span class="chevron" :class="{ expanded: expandedCategories.phase3 }">›</span>
          </button>

          <div v-show="expandedCategories.phase3" class="nav-submenu">
            <button
              @click="activeComponent = 'datacard'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'datacard' }]"
            >
              <span class="nav-icon"><span class="material-icons">view_agenda</span></span>
              <span class="nav-label">DssDataCard</span>
              <span class="nav-badge stress">stress</span>
            </button>

            <button
              @click="activeComponent = 'cadriscard'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'cadriscard' }]"
            >
              <span class="nav-icon"><span class="material-icons">article</span></span>
              <span class="nav-label">DssCadrisCard</span>
              <span class="nav-badge stress">stress</span>
            </button>

            <button
              @click="activeComponent = 'pagecomplexity'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'pagecomplexity' }]"
            >
              <span class="nav-icon"><span class="material-icons">schema</span></span>
              <span class="nav-label">PageComplexity</span>
              <span class="nav-badge stress">stress</span>
            </button>
          </div>
        </div>

        <!-- Patterns -->
        <div class="nav-section">
          <button
            @click="toggleCategory('patterns')"
            class="nav-category"
          >
            <span class="nav-icon"><span class="material-icons">flag</span></span>
            <span class="nav-label">Patterns</span>
            <span class="chevron" :class="{ expanded: expandedCategories.patterns }">›</span>
          </button>

          <div v-show="expandedCategories.patterns" class="nav-submenu">
            <button
              @click="activeComponent = 'parcelamento'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'parcelamento' }]"
            >
              <span class="nav-icon"><span class="material-icons">receipt_long</span></span>
              <span class="nav-label">Parcelamento</span>
              <span class="nav-badge stress">real</span>
            </button>

            <button
              @click="activeComponent = 'parcelamento-claude'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'parcelamento-claude' }]"
            >
              <span class="nav-icon"><span class="material-icons">receipt_long</span></span>
              <span class="nav-label">Parcelamento Claude</span>
              <span class="nav-badge stress">pixel</span>
            </button>

            <button
              @click="activeComponent = 'login'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'login' }]"
            >
              <span class="nav-icon"><span class="material-icons">lock</span></span>
              <span class="nav-label">Login Forms</span>
            </button>

            <button
              @click="activeComponent = 'dashboards'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'dashboards' }]"
            >
              <span class="nav-icon"><span class="material-icons">dashboard</span></span>
              <span class="nav-label">Dashboards</span>
            </button>

            <button
              @click="activeComponent = 'atender-solicitacoes'"
              :class="['nav-item nav-subitem', { active: activeComponent === 'atender-solicitacoes' }]"
            >
              <span class="nav-icon"><span class="material-icons">support_agent</span></span>
              <span class="nav-label">Atender Solicitações</span>
              <span class="nav-badge stress">real</span>
            </button>
          </div>
        </div>
      </nav>

      <div class="sidebar-footer">
        <p>Design System Sansys</p>
        <p class="author">Hebert Daniel Oliveira Chaves</p>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="test-content">
      <!-- Index/Dashboard View -->
      <div v-if="activeComponent === 'index'" class="component-view">
        <TestIndex />
      </div>

      <!-- PREVIEW FRAME (durável) — playground contract-driven, iframe do SFC real -->
      <div v-else-if="activeComponent === 'preview-frame'" class="component-view">
        <PreviewFrame component="DssInput" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-empty-state'" class="component-view">
        <PreviewFrame component="DssEmptyState" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-select'" class="component-view">
        <PreviewFrame component="DssSelect" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-uploader'" class="component-view">
        <PreviewFrame component="DssUploader" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-file'" class="component-view">
        <PreviewFrame component="DssFile" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-textarea'" class="component-view">
        <PreviewFrame component="DssTextarea" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-field'" class="component-view">
        <PreviewFrame component="DssField" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-checkbox'" class="component-view">
        <PreviewFrame component="DssCheckbox" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-radio'" class="component-view">
        <PreviewFrame component="DssRadio" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-toggle'" class="component-view">
        <PreviewFrame component="DssToggle" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-chip'" class="component-view">
        <PreviewFrame component="DssChip" />
      </div>
      <div v-else-if="activeComponent === 'preview-frame-multiselect'" class="component-view">
        <PreviewFrame component="DssMultiselectAutocomplete" />
      </div>

      <!-- DssButton Test View -->
      <div v-else-if="activeComponent === 'button'" class="component-view">
        <TestButton />
      </div>

      <!-- DssBadge Test View -->
      <div v-else-if="activeComponent === 'badge'" class="component-view">
        <TestBadge />
      </div>

      <!-- DssChip Test View -->
      <div v-else-if="activeComponent === 'chip'" class="component-view">
        <TestChip />
      </div>

      <!-- DssAvatar Test View -->
      <div v-else-if="activeComponent === 'avatar'" class="component-view">
        <TestAvatar />
      </div>

      <!-- DssInput Test View -->
      <div v-else-if="activeComponent === 'input'" class="component-view">
        <TestInput />
      </div>

      <!-- DssCheckbox Test View -->
      <div v-else-if="activeComponent === 'checkbox'" class="component-view">
        <TestCheckbox />
      </div>

      <!-- DssRadio Test View -->
      <div v-else-if="activeComponent === 'radio'" class="component-view">
        <TestRadio />
      </div>

      <!-- DssToggle Test View -->
      <div v-else-if="activeComponent === 'toggle'" class="component-view">
        <TestToggle />
      </div>

      <!-- DssSelect Test View -->
      <div v-else-if="activeComponent === 'select'" class="component-view">
        <TestSelect />
      </div>

      <!-- DssTextarea Test View -->
      <div v-else-if="activeComponent === 'textarea'" class="component-view">
        <TestTextarea />
      </div>

      <!-- DssFile Test View -->
      <div v-else-if="activeComponent === 'file'" class="component-view">
        <TestFile />
      </div>

      <!-- DssField Test View -->
      <div v-else-if="activeComponent === 'field'" class="component-view">
        <TestField />
      </div>

      <!-- DssCard Test View -->
      <div v-else-if="activeComponent === 'card'" class="component-view">
        <TestCard />
      </div>

      <!-- DssDataCard Stress Test View -->
      <div v-else-if="activeComponent === 'datacard'" class="component-view">
        <TestDataCard />
      </div>

      <!-- DssCadrisCard Stress Test View -->
      <div v-else-if="activeComponent === 'cadriscard'" class="component-view">
        <TestCadrisCard />
      </div>

      <!-- DssTestPageComplexity Stress Test View -->
      <div v-else-if="activeComponent === 'pagecomplexity'" class="component-view">
        <TestPageComplexity />
      </div>

      <!-- Parcelamento (Sansys Water) — pattern real -->
      <div v-else-if="activeComponent === 'parcelamento'" class="component-view">
        <TestParcelamento />
      </div>

      <!-- Parcelamento Claude — pixel-love fidelity -->
      <div v-else-if="activeComponent === 'parcelamento-claude'" class="component-view">
        <TestParcelamentoClaude />
      </div>

      <!-- Atender Solicitações -->
      <div v-else-if="activeComponent === 'atender-solicitacoes'" class="component-view">
        <TestAtenderSolicitacoes />
      </div>

      <!-- Defaults Preview View -->
      <div v-else-if="activeComponent === 'defaults-preview'" class="component-view">
        <TestDefaultPreview />
      </div>

      <!-- Design Tokens View -->
      <div v-else-if="activeComponent === 'tokens'" class="component-view">
        <TestTokens />
      </div>
    </div>

    <!-- Tooltip dos itens (modo retraído) — balão fixo à direita do item -->
    <div
      v-if="navTip.show"
      class="nav-tooltip"
      :style="{ top: navTip.y + 'px', left: navTip.x + 'px' }"
    >{{ navTip.text }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TestIndex from './TestIndex.vue'
// PREVIEW FRAME (durável) — playground contract-driven
import PreviewFrame from './preview/PreviewFrame.vue'
import TestDefaultPreview from './TestDefaultPreview.vue'
import TestButton from './TestButton.vue'
import TestBadge from './TestBadge.vue'
import TestChip from './TestChip.vue'
import TestAvatar from './TestAvatar.vue'
import TestInput from './TestInput.vue'
import TestCheckbox from './TestCheckbox.vue'
import TestRadio from './TestRadio.vue'
import TestToggle from './TestToggle.vue'
import TestSelect from './TestSelect.vue'
import TestTextarea from './TestTextarea.vue'
import TestFile from './TestFile.vue'
import TestField from './TestField.vue'
import TestCard from './TestCard.vue'
import TestTokens from './TestTokens.vue'
import TestDataCard from './TestDataCard.vue'
import TestCadrisCard from './TestCadrisCard.vue'
import TestPageComplexity from './TestPageComplexity.vue'
import TestParcelamento from './TestParcelamento.vue'
import TestParcelamentoClaude from './TestParcelamentoClaude.vue'
import TestAtenderSolicitacoes from './TestAtenderSolicitacoes.vue'

// Active component state
const activeComponent = ref('defaults-preview')

// Sidebar collapse state (retrair lateralmente)
const sidebarCollapsed = ref(false)

// Expanded categories state — todos os grupos expandidos por padrão
const expandedCategories = ref({
  foundation: true,
  components: true,
  buttonsActions: true,
  displayFeedback: true,
  dataDisplay: true,
  formsInput: true,
  selectionControls: true,
  layout: true,
  navigation: true,
  phase3: true,
  patterns: true
})

// Toggle category expansion
const toggleCategory = (category) => {
  expandedCategories.value[category] = !expandedCategories.value[category]
}

// Tooltip estilizado (à direita) nos itens da sidebar quando retraída — mesma
// aparência/velocidade do menu interno. Usa delegação de evento + 1 balão fixo:
// evita anotar ~31 botões e escapa do overflow:hidden via position: fixed.
const navTip = ref({ show: false, text: '', x: 0, y: 0 })
function onNavOver(e) {
  if (!sidebarCollapsed.value) return
  const item = e.target.closest?.('.nav-item')
  if (!item) return
  const label = item.querySelector('.nav-label')?.textContent?.trim()
  if (!label) return
  const r = item.getBoundingClientRect()
  navTip.value = { show: true, text: label, x: r.right + 10, y: r.top + r.height / 2 }
}
function onNavOut(e) {
  if (!e.relatedTarget?.closest?.('.nav-item')) navTip.value.show = false
}
</script>

<style scoped>
/* ========================================
   LAYOUT PRINCIPAL
   ======================================== */
.test-suite {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
}

/* ========================================
   SIDEBAR NAVIGATION
   ======================================== */
.test-sidebar {
  width: 248px;
  height: 100vh;
  overflow: hidden;
  background: #131313;
  color: #e2e2e2;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid #232323;
  position: relative;
  z-index: 100;
  transition: width 180ms ease;
}

.sidebar-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  height: 48px;
  border-bottom: 1px solid #1e1e1e;
}

.sidebar-logo {
  font-size: 1.125rem;
  line-height: 1;
  color: #1d4971;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #ffffff;
  flex: 1;
}

.version {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.06);
  padding: 0.125rem 0.4rem;
  border-radius: 4px;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

/* Botão retrair lateralmente */
.sidebar-collapse {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}
.sidebar-collapse:hover {
  background: rgba(29, 73, 113, 0.25);
  color: #ffffff;
}
.sidebar-collapse .material-icons {
  font-size: 16px;
  line-height: 1;
}

/* ── Estado COLAPSADO ──────────────────────────────────────────────── */
.test-suite.is-collapsed .test-sidebar {
  width: 52px;
}
.test-suite.is-collapsed .sidebar-title,
.test-suite.is-collapsed .version,
.test-suite.is-collapsed .nav-label,
.test-suite.is-collapsed .nav-badge,
.test-suite.is-collapsed .chevron,
.test-suite.is-collapsed .nav-category,
.test-suite.is-collapsed .nav-subcategory,
.test-suite.is-collapsed .sidebar-footer p {
  display: none;
}
.test-suite.is-collapsed .sidebar-header {
  flex-direction: column;
  height: auto;
  padding: 0.5rem 0;
  gap: 0.375rem;
}
.test-suite.is-collapsed .nav-item,
.test-suite.is-collapsed .nav-category,
.test-suite.is-collapsed .nav-subcategory {
  justify-content: center;
  padding: 0.4375rem;
}
/* Em colapso, todos os submenus ficam achatados na mesma coluna de ícones */
.test-suite.is-collapsed .nav-submenu,
.test-suite.is-collapsed .nav-subsubmenu {
  display: block !important;
}

/* Tooltip dos itens no modo retraído — à direita, mesma aparência/velocidade do
   menu interno (azul principal, tamanho intermediário, 200ms). */
.nav-tooltip {
  position: fixed;
  z-index: 1000;
  transform: translateY(-50%);
  background: #1d4971;
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1.4;
  padding: 3px 9px;
  border-radius: 5px;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
  animation: nav-tooltip-in 200ms ease;
}
@keyframes nav-tooltip-in {
  from { opacity: 0; transform: translateY(-50%) translateX(-5px); }
  to   { opacity: 1; transform: translateY(-50%) translateX(0); }
}

/* ========================================
   NAVIGATION MENU
   ======================================== */
.sidebar-nav {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0.5rem 0.5rem 1rem;
}

.nav-section {
  margin-bottom: 0.125rem;
}

/* Base Nav Item */
.nav-item,
.nav-category,
.nav-subcategory {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4375rem 0.625rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
  text-align: left;
  position: relative;
  border-radius: 6px;
  box-sizing: border-box;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.055);
  color: rgba(255, 255, 255, 0.85);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 56%;
  width: 2px;
  background: #1d4971;
  border-radius: 0 2px 2px 0;
}

/* Category Headers */
.nav-category {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  /* Token DSS mais próximo do branco sem ser branco (gray-50 = #fff): gray-100.
     Antes rgba(255,255,255,0.22) — cinza-escuro sem contraste no fundo #131313. */
  color: var(--dss-gray-100);
  padding: 0.75rem 0.625rem 0.25rem;
  cursor: default;
  border-radius: 0;
  gap: 0.375rem;
}

.nav-category:hover {
  background: transparent;
  color: var(--dss-gray-50);
  cursor: pointer;
}

/* Subcategory */
.nav-subcategory {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--dss-gray-100);
  padding: 0.3125rem 0.625rem 0.3125rem 0.75rem;
  gap: 0.375rem;
}

.nav-subcategory:hover {
  background: transparent;
  color: var(--dss-gray-50);
}

/* Sub-items */
.nav-subitem {
  padding-left: 0.75rem;
  font-size: 0.75rem;
}

.nav-subsubitem {
  padding-left: 1rem;
  font-size: 0.75rem;
}

/* Preview Frame — filho do componente (um nível abaixo do item do componente).
   Recuo maior + rótulo mais discreto para ler como "página do componente", e
   não como um componente irmão. */
.nav-previewitem {
  padding-left: 1.75rem;
  font-size: 0.6875rem;
  opacity: 0.85;
}

.nav-previewitem .nav-label {
  letter-spacing: 0.02em;
}

/* Remove hover layout-shift */
.nav-subitem:hover,
.nav-subsubitem:hover {
  padding-left: inherit;
}

/* O .nav-previewitem fica FORA do reset acima de propósito: `padding-left:
   inherit` no hover resolve para o padding do menu pai (0), o que colapsaria o
   recuo justamente no hover. Aqui o recuo é o que sinaliza o aninhamento. */
.nav-previewitem:hover,
.nav-previewitem.active {
  opacity: 1;
}

/* Submenu Containers */
.nav-submenu,
.nav-subsubmenu {
  overflow: hidden;
}

/* Icons — flat duocolor container */
.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.05);
  transition: background 120ms ease;
}

.nav-icon .material-icons {
  font-size: 13px !important;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1;
  transition: color 120ms ease;
  font-family: 'Material Icons';
  font-style: normal;
  display: block;
}

.nav-item:hover .nav-icon {
  background: rgba(29, 73, 113, 0.18);
}

.nav-item:hover .nav-icon .material-icons {
  color: rgba(111, 168, 220, 0.95);
}

.nav-item.active .nav-icon {
  background: rgba(29, 73, 113, 0.24);
}

.nav-item.active .nav-icon .material-icons {
  color: #6fa8dc;
}

.nav-category .nav-icon {
  background: transparent;
}

.nav-category .nav-icon .material-icons {
  color: rgba(255, 255, 255, 0.2);
}

.nav-category:hover .nav-icon .material-icons {
  color: rgba(255, 255, 255, 0.35);
}

.nav-label {
  flex: 1;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1;
}

/* Chevron */
.chevron {
  font-size: 0.75rem;
  transition: transform 180ms ease;
  opacity: 0.35;
  line-height: 1;
  flex-shrink: 0;
}

.chevron.expanded {
  transform: rotate(90deg);
}

/* Badges */
.nav-badge {
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  background: rgba(29, 73, 113, 0.20);
  color: #6fa8dc;
  text-transform: uppercase;
  flex-shrink: 0;
}

.nav-badge.stress {
  background: rgba(245, 158, 11, 0.15);
  color: rgba(245, 158, 11, 0.85);
}

/* ========================================
   MINI STATISTICS — removidas do nav
   ======================================== */
.stats-mini {
  display: none;
}

.stat-item,
.stat-value,
.stat-label {
  display: none;
}

/* ========================================
   SIDEBAR FOOTER
   ======================================== */
.sidebar-footer {
  flex-shrink: 0;
  padding: 0.625rem 1rem;
  border-top: 1px solid #1e1e1e;
}

.sidebar-footer p {
  margin: 0;
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.18);
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.author {
  color: rgba(255, 255, 255, 0.13) !important;
}

/* ========================================
   MAIN CONTENT AREA
   ======================================== */
.test-content {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  background: #f5f5f5;
}

.component-view {
  height: 100%;
  overflow-y: auto;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========================================
   SCROLLBAR CUSTOMIZATION
   ======================================== */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

.component-view::-webkit-scrollbar {
  width: 10px;
}

.component-view::-webkit-scrollbar-track {
  background: #e0e0e0;
}

.component-view::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 5px;
}

.component-view::-webkit-scrollbar-thumb:hover {
  background: #777;
}

/* ========================================
   RESPONSIVE DESIGN
   ======================================== */
@media (max-width: 768px) {
  .test-sidebar {
    width: 220px;
  }
}

@media (max-width: 480px) {
  .test-sidebar {
    width: 48px;
  }

  .sidebar-title,
  .version,
  .nav-label,
  .nav-badge,
  .sidebar-footer p {
    display: none;
  }

  .sidebar-header {
    justify-content: center;
    padding: 0;
  }

  .sidebar-logo {
    margin: auto;
  }

  .nav-item,
  .nav-category,
  .nav-subcategory {
    justify-content: center;
    padding: 0.625rem;
  }

  .nav-icon {
    font-size: 1rem;
    opacity: 1;
  }
}
</style>
