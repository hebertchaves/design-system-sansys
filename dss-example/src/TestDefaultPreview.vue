<template>
  <div class="preview-page" :data-brand="activeBrand || undefined">

    <!-- ===== CABEÇALHO FIXO ===== -->
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
        <DssBadge class="q-ml-sm">{{ totalComponents }}</DssBadge>
      </DssToolbar>
      <DssSeparator />
    </div>

    <!-- ===== CONTEÚDO PRINCIPAL ===== -->
    <div class="preview-content">

      <!-- ==================== 1. AÇÕES ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">1. Ações</span>
          <span class="group-desc">DssButton · DssChip · DssBtnGroup · DssBtnDropdown · DssBtnToggle · DssFab · DssFabAction</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid">

            <!-- DssButton — default: variant="elevated" color="primary" -->
            <div class="component-item">
              <div class="component-demo">
                <DssButton>Ação Principal</DssButton>
              </div>
              <code class="component-label">DssButton</code>
            </div>

            <!-- DssChip — default: variant="filled" color="primary" -->
            <div class="component-item">
              <div class="component-demo">
                <DssChip label="Chip" />
              </div>
              <code class="component-label">DssChip</code>
            </div>

            <!-- DssBtnGroup -->
            <div class="component-item">
              <div class="component-demo">
                <DssBtnGroup>
                  <DssButton>A</DssButton>
                  <DssButton>B</DssButton>
                  <DssButton>C</DssButton>
                </DssBtnGroup>
              </div>
              <code class="component-label">DssBtnGroup</code>
            </div>

            <!-- DssBtnDropdown — default: color="primary" variant="elevated" -->
            <div class="component-item">
              <div class="component-demo">
                <DssBtnDropdown label="Opções">
                  <DssList>
                    <DssItem clickable v-close-popup>
                      <DssItemSection>
                        <DssItemLabel>Editar</DssItemLabel>
                      </DssItemSection>
                    </DssItem>
                    <DssItem clickable v-close-popup>
                      <DssItemSection>
                        <DssItemLabel>Excluir</DssItemLabel>
                      </DssItemSection>
                    </DssItem>
                  </DssList>
                </DssBtnDropdown>
              </div>
              <code class="component-label">DssBtnDropdown</code>
            </div>

            <!-- DssBtnToggle — default: color="primary" -->
            <div class="component-item">
              <div class="component-demo">
                <DssBtnToggle
                  v-model="btnToggleValue"
                  :options="[
                    { label: 'Dia', value: 'day' },
                    { label: 'Semana', value: 'week' },
                    { label: 'Mês', value: 'month' },
                  ]"
                />
              </div>
              <code class="component-label">DssBtnToggle</code>
            </div>

            <!-- DssFab + DssFabAction — default: color="primary" -->
            <div class="component-item">
              <div class="component-demo component-demo--fab">
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

      <!-- ==================== 2. INDICADORES E AVATARES ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">2. Indicadores e Avatares</span>
          <span class="group-desc">DssBadge · DssAvatar · DssIcon · DssSpinner · DssRating · DssKnob · DssTooltip</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid">

            <!-- DssBadge — default: color="primary" -->
            <div class="component-item">
              <div class="component-demo">
                <DssBadge>99+</DssBadge>
              </div>
              <code class="component-label">DssBadge</code>
            </div>

            <!-- DssAvatar com iniciais — default: color="primary" -->
            <div class="component-item">
              <div class="component-demo">
                <DssAvatar>JS</DssAvatar>
              </div>
              <code class="component-label">DssAvatar (iniciais)</code>
            </div>

            <!-- DssAvatar com ícone -->
            <div class="component-item">
              <div class="component-demo">
                <DssAvatar icon="person" />
              </div>
              <code class="component-label">DssAvatar (ícone)</code>
            </div>

            <!-- DssIcon -->
            <div class="component-item">
              <div class="component-demo">
                <DssIcon name="home" />
              </div>
              <code class="component-label">DssIcon</code>
            </div>

            <!-- DssSpinner — default: color="primary" -->
            <div class="component-item">
              <div class="component-demo">
                <DssSpinner />
              </div>
              <code class="component-label">DssSpinner</code>
            </div>

            <!-- DssRating -->
            <div class="component-item">
              <div class="component-demo">
                <DssRating v-model="ratingValue" :max="5" />
              </div>
              <code class="component-label">DssRating</code>
            </div>

            <!-- DssKnob -->
            <div class="component-item">
              <div class="component-demo">
                <DssKnob v-model="knobValue" :min="0" :max="100" />
              </div>
              <code class="component-label">DssKnob</code>
            </div>

            <!-- DssTooltip — via botão com tooltip embutido -->
            <div class="component-item">
              <div class="component-demo">
                <DssButton>
                  Hover aqui
                  <DssTooltip>Dica contextual</DssTooltip>
                </DssButton>
              </div>
              <code class="component-label">DssTooltip</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== 3. FORMULÁRIOS ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">3. Formulários</span>
          <span class="group-desc">DssInput · DssSelect · DssTextarea · DssFile · DssCheckbox · DssRadio · DssToggle · DssOptionGroup · DssSlider · DssRange</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <!-- DssInput — default: variant="outlined" -->
            <div class="component-item">
              <div class="component-demo component-demo--wide">
                <DssInput label="Campo de texto" />
              </div>
              <code class="component-label">DssInput</code>
            </div>

            <!-- DssSelect — default: variant="outlined" -->
            <div class="component-item">
              <div class="component-demo component-demo--wide">
                <DssSelect
                  v-model="selectValue"
                  :options="selectOptions"
                  label="Selecione"
                />
              </div>
              <code class="component-label">DssSelect</code>
            </div>

            <!-- DssTextarea — default: variant="outlined" -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssTextarea label="Observações" />
              </div>
              <code class="component-label">DssTextarea</code>
            </div>

            <!-- DssFile -->
            <div class="component-item">
              <div class="component-demo component-demo--wide">
                <DssFile v-model="fileValue" label="Anexar arquivo" />
              </div>
              <code class="component-label">DssFile</code>
            </div>

            <!-- DssCheckbox — default: color="primary" via root -->
            <div class="component-item">
              <div class="component-demo">
                <DssCheckbox v-model="checkboxValue" label="Opção" />
              </div>
              <code class="component-label">DssCheckbox</code>
            </div>

            <!-- DssRadio — default: color="primary" via root -->
            <div class="component-item">
              <div class="component-demo">
                <DssRadio v-model="radioValue" val="a" label="Opção A" />
              </div>
              <code class="component-label">DssRadio</code>
            </div>

            <!-- DssToggle — default: color="primary" via root -->
            <div class="component-item">
              <div class="component-demo">
                <DssToggle v-model="toggleBool" label="Ativar" />
              </div>
              <code class="component-label">DssToggle</code>
            </div>

            <!-- DssOptionGroup — default: color="primary" -->
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

            <!-- DssSlider — usa action-primary via SCSS -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssSlider v-model="sliderValue" :min="0" :max="100" aria-label="Volume" />
              </div>
              <code class="component-label">DssSlider</code>
            </div>

            <!-- DssRange — usa action-primary via SCSS -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssRange v-model="rangeValue" :min="0" :max="100" aria-label="Faixa de valores" />
              </div>
              <code class="component-label">DssRange</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== 4. PROGRESSO E FEEDBACK ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">4. Progresso e Feedback</span>
          <span class="group-desc">DssLinearProgress · DssCircularProgress · DssSkeleton · DssInnerLoading · DssAjaxBar</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <!-- DssLinearProgress determinado — default: color="primary" -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssLinearProgress :value="0.65" />
              </div>
              <code class="component-label">DssLinearProgress (value=0.65)</code>
            </div>

            <!-- DssLinearProgress indeterminado -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssLinearProgress />
              </div>
              <code class="component-label">DssLinearProgress (indeterminado)</code>
            </div>

            <!-- DssCircularProgress determinado — default: color="primary" -->
            <div class="component-item">
              <div class="component-demo">
                <DssCircularProgress :value="0.65" />
              </div>
              <code class="component-label">DssCircularProgress (value=0.65)</code>
            </div>

            <!-- DssCircularProgress indeterminado -->
            <div class="component-item">
              <div class="component-demo">
                <DssCircularProgress />
              </div>
              <code class="component-label">DssCircularProgress (indeterminado)</code>
            </div>

            <!-- DssSkeleton — usa surface-muted via SCSS -->
            <div class="component-item">
              <div class="component-demo">
                <div class="skeleton-group">
                  <DssSkeleton type="text" width="80%" />
                  <DssSkeleton type="text" width="60%" />
                  <DssSkeleton type="rect" class="skeleton-rect" />
                </div>
              </div>
              <code class="component-label">DssSkeleton</code>
            </div>

            <!-- DssInnerLoading -->
            <div class="component-item">
              <div class="component-demo component-demo--relative">
                <div class="inner-loading-host">Conteúdo carregando</div>
                <DssInnerLoading :showing="true" />
              </div>
              <code class="component-label">DssInnerLoading</code>
            </div>

            <!-- DssAjaxBar — sem estado visual estático -->
            <div class="component-item">
              <div class="component-demo">
                <span class="component-note">Ativado por requisição HTTP — sem estado visual estático</span>
              </div>
              <code class="component-label">DssAjaxBar</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== 5. BANNERS E BARRAS ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">5. Banners e Barras</span>
          <span class="group-desc">DssBanner (4 tipos) · DssBar</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssBanner type="info">
                  <template #default>Mensagem informativa com ação disponível para o usuário.</template>
                  <template #actions>
                    <DssButton variant="flat">Entendido</DssButton>
                  </template>
                </DssBanner>
              </div>
              <code class="component-label">DssBanner (type="info")</code>
            </div>

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssBanner type="success">
                  <template #default>Operação realizada com sucesso.</template>
                  <template #actions>
                    <DssButton variant="flat">Ok</DssButton>
                  </template>
                </DssBanner>
              </div>
              <code class="component-label">DssBanner (type="success")</code>
            </div>

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssBanner type="warning">
                  <template #default>Atenção: esta ação não pode ser desfeita.</template>
                  <template #actions>
                    <DssButton variant="flat">Cancelar</DssButton>
                    <DssButton variant="flat">Continuar</DssButton>
                  </template>
                </DssBanner>
              </div>
              <code class="component-label">DssBanner (type="warning")</code>
            </div>

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssBanner type="error">
                  <template #default>Erro ao processar a solicitação. Tente novamente.</template>
                  <template #actions>
                    <DssButton variant="flat">Tentar novamente</DssButton>
                  </template>
                </DssBanner>
              </div>
              <code class="component-label">DssBanner (type="error")</code>
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

      <!-- ==================== 6. NAVEGAÇÃO ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">6. Navegação</span>
          <span class="group-desc">DssTabs · DssTab · DssTabPanels · DssTabPanel · DssBreadcrumbs · DssBreadcrumbsEl · DssPagination · DssExpansionItem · DssMenu</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <!-- DssTabs + DssTab + DssTabPanels + DssTabPanel -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide component-demo--col">
                <DssTabs v-model="activeTab" align="left">
                  <DssTab name="tab1" label="Geral" />
                  <DssTab name="tab2" label="Configurações" />
                  <DssTab name="tab3" label="Avançado" />
                </DssTabs>
                <DssTabPanels v-model="activeTab">
                  <DssTabPanel name="tab1" class="tab-panel-content">Conteúdo da aba Geral</DssTabPanel>
                  <DssTabPanel name="tab2" class="tab-panel-content">Conteúdo da aba Configurações</DssTabPanel>
                  <DssTabPanel name="tab3" class="tab-panel-content">Conteúdo da aba Avançado</DssTabPanel>
                </DssTabPanels>
              </div>
              <code class="component-label">DssTabs + DssTab + DssTabPanels + DssTabPanel</code>
            </div>

            <!-- DssBreadcrumbs + DssBreadcrumbsEl -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssBreadcrumbs>
                  <DssBreadcrumbsEl label="Home" href="#" />
                  <DssBreadcrumbsEl label="Serviços" href="#" />
                  <DssBreadcrumbsEl label="Detalhe" />
                </DssBreadcrumbs>
              </div>
              <code class="component-label">DssBreadcrumbs + DssBreadcrumbsEl</code>
            </div>

            <!-- DssPagination -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssPagination v-model="currentPage" :max="8" boundary-links />
              </div>
              <code class="component-label">DssPagination</code>
            </div>

            <!-- DssExpansionItem -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssExpansionItem label="Seção expansível" icon="info">
                  <DssCardSection>
                    Conteúdo interno da seção expansível. Pode conter qualquer elemento DSS.
                  </DssCardSection>
                </DssExpansionItem>
              </div>
              <code class="component-label">DssExpansionItem</code>
            </div>

            <!-- DssMenu — via botão trigger -->
            <div class="component-item">
              <div class="component-demo">
                <DssButton>
                  Menu
                  <DssMenu>
                    <DssList>
                      <DssItem clickable v-close-popup>
                        <DssItemSection><DssItemLabel>Perfil</DssItemLabel></DssItemSection>
                      </DssItem>
                      <DssItem clickable v-close-popup>
                        <DssItemSection><DssItemLabel>Configurações</DssItemLabel></DssItemSection>
                      </DssItem>
                      <DssSeparator />
                      <DssItem clickable v-close-popup>
                        <DssItemSection><DssItemLabel>Sair</DssItemLabel></DssItemSection>
                      </DssItem>
                    </DssList>
                  </DssMenu>
                </DssButton>
              </div>
              <code class="component-label">DssMenu</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== 7. STEPPER ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">7. Stepper</span>
          <span class="group-desc">DssStepper · DssStep</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssStepper v-model="stepperStep" flat>
                  <DssStep name="step1" title="Dados pessoais" :done="stepperStep > 1" />
                  <DssStep name="step2" title="Endereço" :done="stepperStep > 2" />
                  <DssStep name="step3" title="Confirmação" />
                </DssStepper>
              </div>
              <code class="component-label">DssStepper + DssStep</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== 8. LISTAS E ESTRUTURA ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">8. Listas e Estrutura</span>
          <span class="group-desc">DssList · DssItem · DssItemSection · DssItemLabel · DssSlideItem · DssSeparator · DssSpace</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <!-- DssList + DssItem + DssItemSection + DssItemLabel -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssList class="list-sample" bordered separator>
                  <DssItem>
                    <DssItemSection avatar>
                      <DssAvatar icon="person" size="sm" />
                    </DssItemSection>
                    <DssItemSection>
                      <DssItemLabel>João Silva</DssItemLabel>
                      <DssItemLabel caption>Administrador</DssItemLabel>
                    </DssItemSection>
                    <DssItemSection side>
                      <DssBadge>3</DssBadge>
                    </DssItemSection>
                  </DssItem>
                  <DssItem>
                    <DssItemSection avatar>
                      <DssAvatar icon="person" size="sm" />
                    </DssItemSection>
                    <DssItemSection>
                      <DssItemLabel>Maria Santos</DssItemLabel>
                      <DssItemLabel caption>Operador</DssItemLabel>
                    </DssItemSection>
                  </DssItem>
                  <DssItem clickable active>
                    <DssItemSection avatar>
                      <DssAvatar icon="person" size="sm" />
                    </DssItemSection>
                    <DssItemSection>
                      <DssItemLabel>Carlos Mendes</DssItemLabel>
                      <DssItemLabel caption>Item ativo (active=true, color="primary")</DssItemLabel>
                    </DssItemSection>
                  </DssItem>
                </DssList>
              </div>
              <code class="component-label">DssList + DssItem + DssItemSection + DssItemLabel</code>
            </div>

            <!-- DssSlideItem -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssList class="list-sample" bordered>
                  <DssSlideItem
                    @right="() => {}"
                    right-color="error"
                  >
                    <DssItemSection>
                      <DssItemLabel>Deslize para a direita para excluir</DssItemLabel>
                    </DssItemSection>
                    <template #right>
                      <DssIcon name="delete" color="white" />
                    </template>
                  </DssSlideItem>
                </DssList>
              </div>
              <code class="component-label">DssSlideItem</code>
            </div>

            <!-- DssSeparator -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssSeparator />
              </div>
              <code class="component-label">DssSeparator</code>
            </div>

            <!-- DssSpace -->
            <div class="component-item">
              <div class="component-demo component-demo--inline">
                <span class="space-label">Antes</span>
                <DssSpace />
                <span class="space-label">Depois</span>
              </div>
              <code class="component-label">DssSpace</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== 9. CARTÕES E SUPERFÍCIES ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">9. Cartões e Superfícies</span>
          <span class="group-desc">DssCard (4 variantes) · DssCardSection · DssCardActions · DssToolbar · DssToolbarTitle · DssMarkupTable</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid">

            <!-- DssCard elevated (default) -->
            <div class="component-item">
              <div class="component-demo">
                <DssCard>
                  <DssCardSection>
                    <strong>Elevated</strong>
                    <p class="card-desc">Default — com sombra</p>
                  </DssCardSection>
                  <DssCardActions align="right">
                    <DssButton variant="flat" size="sm">Ação</DssButton>
                  </DssCardActions>
                </DssCard>
              </div>
              <code class="component-label">DssCard (default)</code>
            </div>

            <!-- DssCard outlined -->
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

            <!-- DssCard bordered -->
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

            <!-- DssCard flat -->
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

            <!-- DssToolbar -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssToolbar>
                  <DssButton variant="flat" icon="menu" />
                  <DssToolbarTitle>Título da Toolbar</DssToolbarTitle>
                  <DssSpace />
                  <DssButton variant="flat" icon="search" />
                  <DssButton variant="flat" icon="more_vert" />
                </DssToolbar>
              </div>
              <code class="component-label">DssToolbar + DssToolbarTitle</code>
            </div>

            <!-- DssMarkupTable -->
            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssMarkupTable flat bordered>
                  <thead>
                    <tr>
                      <th>Componente</th>
                      <th>Grupo</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>DssButton</td><td>Ações</td><td>Aprovado</td></tr>
                    <tr><td>DssInput</td><td>Formulários</td><td>Aprovado</td></tr>
                    <tr><td>DssCard</td><td>Superfícies</td><td>Aprovado</td></tr>
                  </tbody>
                </DssMarkupTable>
              </div>
              <code class="component-label">DssMarkupTable</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== 10. TIMELINE ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">10. Timeline</span>
          <span class="group-desc">DssTimeline · DssTimelineEntry</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssTimeline>
                  <DssTimelineEntry
                    title="Pedido criado"
                    subtitle="10/05/2026 09:00"
                    icon="add_circle"
                    color="primary"
                  >
                    Pedido #1234 foi criado com sucesso.
                  </DssTimelineEntry>
                  <DssTimelineEntry
                    title="Em processamento"
                    subtitle="10/05/2026 10:30"
                    icon="autorenew"
                    color="primary"
                  >
                    Pedido em análise pela equipe.
                  </DssTimelineEntry>
                  <DssTimelineEntry
                    title="Entregue"
                    subtitle="12/05/2026 14:00"
                    icon="check_circle"
                    color="positive"
                  >
                    Pedido entregue ao destinatário.
                  </DssTimelineEntry>
                </DssTimeline>
              </div>
              <code class="component-label">DssTimeline + DssTimelineEntry</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== 11. ÁRVORE ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">11. Árvore</span>
          <span class="group-desc">DssTree</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">

            <div class="component-item component-item--full">
              <div class="component-demo component-demo--wide">
                <DssTree
                  :nodes="treeNodes"
                  node-key="id"
                  label-key="label"
                  default-expand-all
                />
              </div>
              <code class="component-label">DssTree</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== 12. MÍDIA E SCROLL ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">12. Mídia e Scroll</span>
          <span class="group-desc">DssImg · DssScrollArea · DssSplitter</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid">

            <!-- DssImg -->
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

            <!-- DssScrollArea -->
            <div class="component-item">
              <div class="component-demo">
                <DssScrollArea class="scroll-sample">
                  <div v-for="i in 10" :key="i" class="scroll-row">
                    Item {{ i }} — conteúdo de lista longa para demonstrar scroll
                  </div>
                </DssScrollArea>
              </div>
              <code class="component-label">DssScrollArea</code>
            </div>

            <!-- DssSplitter -->
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

      <!-- ==================== 13. LAYOUT ESTRUTURAL (NOTA) ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">13. Layout Estrutural</span>
          <span class="group-desc">Componentes que exigem contexto de aplicação completo — não renderizáveis isoladamente</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">
            <div
              v-for="comp in layoutComponents"
              :key="comp.name"
              class="component-item"
            >
              <div class="component-demo">
                <span class="component-note">{{ comp.note }}</span>
              </div>
              <code class="component-label">{{ comp.name }}</code>
            </div>
          </div>
        </DssCardSection>
      </DssCard>

      <!-- ==================== 14. COMPONENTES CONTEXTUAIS (NOTA) ==================== -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">14. Componentes Contextuais</span>
          <span class="group-desc">Componentes que requerem interação, dados externos ou contexto específico para renderização</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="component-grid component-grid--wide">
            <div
              v-for="comp in contextualComponents"
              :key="comp.name"
              class="component-item"
            >
              <div class="component-demo">
                <span class="component-note">{{ comp.note }}</span>
              </div>
              <code class="component-label">{{ comp.name }}</code>
            </div>
          </div>
        </DssCardSection>
      </DssCard>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// ── Ações ──────────────────────────────────────────────────────────────────
import { DssButton }      from '../../components/base/DssButton'
import { DssChip }        from '../../components/base/DssChip'
import { DssBtnGroup }    from '../../components/base/DssBtnGroup'
import { DssBtnDropdown } from '../../components/base/DssBtnDropdown'
import { DssBtnToggle }   from '../../components/base/DssBtnToggle'
import { DssFab }         from '../../components/base/DssFab'
import { DssFabAction }   from '../../components/base/DssFabAction'

// ── Indicadores e Avatares ─────────────────────────────────────────────────
import { DssBadge }    from '../../components/base/DssBadge'
import { DssAvatar }   from '../../components/base/DssAvatar'
import { DssIcon }     from '../../components/base/DssIcon'
import { DssSpinner }  from '../../components/base/DssSpinner'
import { DssRating }   from '../../components/base/DssRating'
import { DssKnob }     from '../../components/base/DssKnob'
import { DssTooltip }  from '../../components/base/DssTooltip'

// ── Formulários ────────────────────────────────────────────────────────────
import { DssInput }       from '../../components/base/DssInput'
import { DssSelect }      from '../../components/base/DssSelect'
import { DssTextarea }    from '../../components/base/DssTextarea'
import { DssFile }        from '../../components/base/DssFile'
import { DssCheckbox }    from '../../components/base/DssCheckbox'
import { DssRadio }       from '../../components/base/DssRadio'
import { DssToggle }      from '../../components/base/DssToggle'
import { DssOptionGroup } from '../../components/base/DssOptionGroup'
import { DssSlider }      from '../../components/base/DssSlider'
import { DssRange }       from '../../components/base/DssRange'

// ── Progresso e Feedback ───────────────────────────────────────────────────
import { DssLinearProgress }   from '../../components/base/DssLinearProgress'
import { DssCircularProgress } from '../../components/base/DssCircularProgress'
import { DssSkeleton }         from '../../components/base/DssSkeleton'
import { DssInnerLoading }     from '../../components/base/DssInnerLoading'

// ── Banners e Barras ───────────────────────────────────────────────────────
import { DssBanner } from '../../components/base/DssBanner'
import { DssBar }    from '../../components/base/DssBar'

// ── Navegação ──────────────────────────────────────────────────────────────
import { DssTabs }          from '../../components/base/DssTabs'
import { DssTab }           from '../../components/base/DssTab'
import { DssTabPanels }     from '../../components/base/DssTabPanels'
import { DssTabPanel }      from '../../components/base/DssTabPanel'
import { DssBreadcrumbs }   from '../../components/base/DssBreadcrumbs'
import { DssBreadcrumbsEl } from '../../components/base/DssBreadcrumbsEl'
import { DssPagination }    from '../../components/base/DssPagination'
import { DssExpansionItem } from '../../components/base/DssExpansionItem'
import { DssMenu }          from '../../components/base/DssMenu'

// ── Stepper ────────────────────────────────────────────────────────────────
import { DssStepper } from '../../components/base/DssStepper'
import { DssStep }    from '../../components/base/DssStep'

// ── Listas e Estrutura ─────────────────────────────────────────────────────
import { DssList }        from '../../components/base/DssList'
import { DssItem }        from '../../components/base/DssItem'
import { DssItemSection } from '../../components/base/DssItemSection'
import { DssItemLabel }   from '../../components/base/DssItemLabel'
import { DssSlideItem }   from '../../components/base/DssSlideItem'
import { DssSeparator }   from '../../components/base/DssSeparator'
import { DssSpace }       from '../../components/base/DssSpace'

// ── Cartões e Superfícies ──────────────────────────────────────────────────
import { DssCard, DssCardSection, DssCardActions } from '../../components/base/DssCard'
import { DssToolbar }      from '../../components/base/DssToolbar'
import { DssToolbarTitle } from '../../components/base/DssToolbarTitle'
import { DssMarkupTable }  from '../../components/base/DssMarkupTable'

// ── Timeline ───────────────────────────────────────────────────────────────
import { DssTimeline }      from '../../components/base/DssTimeline'
import { DssTimelineEntry } from '../../components/base/DssTimelineEntry'

// ── Árvore ─────────────────────────────────────────────────────────────────
import { DssTree } from '../../components/base/DssTree'

// ── Mídia e Scroll ─────────────────────────────────────────────────────────
import { DssImg }        from '../../components/base/DssImg'
import { DssScrollArea } from '../../components/base/DssScrollArea'
import { DssSplitter }   from '../../components/base/DssSplitter'

// ── Brand selector ─────────────────────────────────────────────────────────
const activeBrand = ref('water')
const brands = [
  { value: 'hub',   label: 'Hub'   },
  { value: 'water', label: 'Water' },
  { value: 'waste', label: 'Waste' },
  { value: '',      label: '—'     },
]

// ── Contagem total de componentes renderizados ─────────────────────────────
const totalComponents = computed(() => 76)

// ── Estado dos componentes interativos ─────────────────────────────────────
const ratingValue       = ref(3)
const knobValue         = ref(50)
const checkboxValue     = ref(false)
const radioValue        = ref('a')
const toggleBool        = ref(false)
const sliderValue       = ref(50)
const rangeValue        = ref({ min: 20, max: 80 })
const fileValue         = ref(null)
const selectValue       = ref(null)
const selectOptions     = ['Opção 1', 'Opção 2', 'Opção 3']
const optionGroupValue  = ref('opt1')
const optionGroupOptions = [
  { label: 'Opção 1', value: 'opt1' },
  { label: 'Opção 2', value: 'opt2' },
  { label: 'Opção 3', value: 'opt3' },
]
const activeTab      = ref('tab1')
const currentPage    = ref(3)
const splitterRatio  = ref(50)
const btnToggleValue = ref('week')
const stepperStep    = ref(2)

// ── Dados da DssTree ───────────────────────────────────────────────────────
const treeNodes = [
  {
    id: '1',
    label: 'Sistemas',
    children: [
      {
        id: '1-1',
        label: 'Abastecimento',
        children: [
          { id: '1-1-1', label: 'ETA Norte' },
          { id: '1-1-2', label: 'ETA Sul' },
        ],
      },
      {
        id: '1-2',
        label: 'Esgotamento',
        children: [
          { id: '1-2-1', label: 'ETE Central' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Relatórios',
    children: [
      { id: '2-1', label: 'Mensal' },
      { id: '2-2', label: 'Anual' },
    ],
  },
]

// ── Componentes estruturais (não renderizáveis isoladamente) ───────────────
const layoutComponents = [
  { name: 'DssLayout',        note: 'Container raiz — envolve toda a aplicação com DssHeader/DssDrawer/DssFooter' },
  { name: 'DssPage',          note: 'Filho direto de DssLayout — define a área de conteúdo principal' },
  { name: 'DssPageContainer', note: 'Centra e limita largura do conteúdo dentro de DssPage' },
  { name: 'DssPageSticky',    note: 'Elemento fixo dentro de DssPage (topo/rodapé)' },
  { name: 'DssPageScroller',  note: 'Botão flutuante de volta ao topo — filho de DssPage' },
  { name: 'DssHeader',        note: 'Barra de aplicação superior — filho de DssLayout' },
  { name: 'DssFooter',        note: 'Barra de aplicação inferior — filho de DssLayout' },
  { name: 'DssDrawer',        note: 'Painel lateral deslizante — filho de DssLayout' },
]

// ── Componentes contextuais (requerem interação ou dados externos) ─────────
const contextualComponents = [
  { name: 'DssDialog',         note: 'Overlay modal — ativado via v-model ou plugin $q.dialog' },
  { name: 'DssPopupProxy',     note: 'Popup responsivo — menu em desktop, dialog em mobile' },
  { name: 'DssRouteTab',       note: 'Aba com vue-router — requer configuração de rotas ativas' },
  { name: 'DssVirtualScroll',  note: 'Renderização virtual de listas longas — requer array de dados' },
  { name: 'DssInfiniteScroll', note: 'Carregamento sob demanda — requer callback assíncrono' },
  { name: 'DssParallax',       note: 'Efeito parallax — depende de scroll do container pai' },
  { name: 'DssVideo',          note: 'Iframe de vídeo — requer URL de embed (YouTube/Vimeo)' },
  { name: 'DssPullToRefresh',  note: 'Atualização por gesto de toque — mobile only' },
  { name: 'DssTimePicker',     note: 'Seletor de horário — normalmente usado dentro de DssPopupProxy' },
  { name: 'DssDatePicker',     note: 'Seletor de data — normalmente usado dentro de DssPopupProxy' },
  { name: 'DssColorPicker',    note: 'Seletor de cor — normalmente usado dentro de DssPopupProxy' },
  { name: 'DssField',          note: 'Campo base reutilizável — base para DssInput/DssSelect/etc.' },
  { name: 'DssResponsive',     note: 'Wrapper responsivo — renderiza slot via QResponsive' },
  { name: 'DssAjaxBar',        note: 'Barra de progresso HTTP — ativada automaticamente por requisições' },
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
  padding: var(--dss-spacing-1) var(--dss-spacing-3);
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  font-family: var(--dss-font-family-sans);
  border: 1px solid var(--dss-gray-300);
  border-radius: var(--dss-radius-full);
  background: transparent;
  color: var(--dss-text-subtle);
  cursor: pointer;
  transition: all 150ms ease;
  line-height: 1.4;
}

.brand-btn:hover {
  background: var(--dss-surface-muted);
}

.brand-btn--hub.brand-btn--active    { background: var(--dss-hub-600);   border-color: var(--dss-hub-600);   color: white; }
.brand-btn--water.brand-btn--active  { background: var(--dss-water-500); border-color: var(--dss-water-500); color: white; }
.brand-btn--waste.brand-btn--active  { background: var(--dss-waste-600); border-color: var(--dss-waste-600); color: white; }
.brand-btn--none.brand-btn--active   { background: var(--dss-gray-700);  border-color: var(--dss-gray-700);  color: white; }

/* ── Conteúdo principal ──────────────────────────────────────────────────── */
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--dss-spacing-4);
}

.component-grid--wide {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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

/* ── Demo box ────────────────────────────────────────────────────────────── */
.component-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
  padding: var(--dss-spacing-3);
  background-color: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}

.component-demo--wide {
  width: 100%;
  justify-content: flex-start;
}

.component-demo--col {
  flex-direction: column;
  align-items: stretch;
}

.component-demo--relative {
  position: relative;
  min-height: 80px;
}

.component-demo--inline {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.component-demo--fab {
  min-height: 80px;
  position: relative;
}

/* ── Label do componente ─────────────────────────────────────────────────── */
.component-label {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-subtle);
  background-color: var(--dss-gray-100);
  padding: 2px var(--dss-spacing-2);
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
  padding: var(--dss-spacing-2);
}

/* ── Tab panel ───────────────────────────────────────────────────────────── */
.tab-panel-content {
  padding: var(--dss-spacing-3);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
}

/* ── Skeleton ────────────────────────────────────────────────────────────── */
.skeleton-group {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  width: 100%;
}

.skeleton-rect {
  width: 100%;
  height: 48px;
  border-radius: var(--dss-radius-sm);
}

/* ── InnerLoading host ───────────────────────────────────────────────────── */
.inner-loading-host {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dss-text-subtle);
  font-size: var(--dss-font-size-sm);
}

/* ── Lista ───────────────────────────────────────────────────────────────── */
.list-sample {
  width: 100%;
  border-radius: var(--dss-radius-md);
}

/* ── Card desc ───────────────────────────────────────────────────────────── */
.card-desc {
  margin: var(--dss-spacing-1) 0 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  line-height: var(--dss-line-height-normal);
}

/* ── Img ─────────────────────────────────────────────────────────────────── */
.img-sample {
  width: 200px;
  height: 120px;
  border-radius: var(--dss-radius-md);
}

/* ── ScrollArea ──────────────────────────────────────────────────────────── */
.scroll-sample {
  width: 100%;
  height: 128px;
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}

.scroll-row {
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  border-bottom: 1px solid var(--dss-gray-100);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
  line-height: var(--dss-line-height-normal);
}

/* ── Splitter ────────────────────────────────────────────────────────────── */
.splitter-sample {
  width: 100%;
  height: 80px;
  border: 1px solid var(--dss-gray-200);
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
}

/* ── Space demo ──────────────────────────────────────────────────────────── */
.space-label {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  white-space: nowrap;
}
</style>
