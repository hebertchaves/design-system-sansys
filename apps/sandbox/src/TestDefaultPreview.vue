<template>
  <div class="preview-page" :data-brand="activeBrand || undefined">

    <!-- HEADER FIXO -->
    <header class="preview-header">
      <DssToolbar>
        <DssToolbarTitle>Defaults Preview — DSS v2.2</DssToolbarTitle>
        <DssSpace />
        <nav class="brand-nav" aria-label="Seletor de brand">
          <span class="brand-nav__label">Brand</span>
          <DssChip
            v-for="b in brands"
            :key="b.value"
            :label="b.label"
            clickable
            :selected="activeBrand === b.value"
            :class="`brand-chip--${b.value || 'none'}`"
            @click="activeBrand = b.value"
          />
        </nav>
        <DssBadge style="margin-left: var(--dss-spacing-2)">76</DssBadge>
      </DssToolbar>
    </header>

    <!-- CONTEÚDO PRINCIPAL -->
    <main
      class="preview-main"
      id="preview-main"
      data-grid-debug="preview-main"
    >
      <!-- __body: controla max-width via inspector (sem container-type para não travar position:fixed) -->
      <div
        class="preview__body"
        id="preview-body"
        data-grid-debug="preview-body"
      >
        <!-- __sections: ponto de entrada do GridOverlay — filhos diretos são as rows -->
        <div
          class="preview__sections"
          id="preview-sections"
          data-grid-rows
          data-grid-debug="preview-sections"
        >

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 1. AÇÕES                                          -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-acoes" class="preview-group" data-grid-debug="s-acoes">
        <DssCardSection class="group-header">
          <span class="group-title">1. Ações</span>
          <span class="group-desc">DssButton · DssChip · DssBtnGroup · DssBtnDropdown · DssBtnToggle · DssFab · DssFabAction</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid">

            <div class="demo-cell">
              <div class="demo-box">
                <DssButton>Ação Principal</DssButton>
              </div>
              <code class="demo-label">DssButton</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--gap">
                <DssButton variant="outlined">Outlined</DssButton>
                <DssButton variant="flat">Flat</DssButton>
              </div>
              <code class="demo-label">DssButton (variantes)</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--gap">
                <DssChip label="Chip" clickable />
                <DssChip label="Selecionado" clickable selected />
              </div>
              <code class="demo-label">DssChip</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssBtnGroup>
                  <DssButton>Dia</DssButton>
                  <DssButton>Semana</DssButton>
                  <DssButton>Mês</DssButton>
                </DssBtnGroup>
              </div>
              <code class="demo-label">DssBtnGroup</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssBtnDropdown label="Opções">
                  <DssList>
                    <DssItem clickable v-close-popup>
                      <DssItemSection><DssItemLabel>Editar</DssItemLabel></DssItemSection>
                    </DssItem>
                    <DssItem clickable v-close-popup>
                      <DssItemSection><DssItemLabel>Duplicar</DssItemLabel></DssItemSection>
                    </DssItem>
                    <DssSeparator />
                    <DssItem clickable v-close-popup>
                      <DssItemSection><DssItemLabel>Excluir</DssItemLabel></DssItemSection>
                    </DssItem>
                  </DssList>
                </DssBtnDropdown>
              </div>
              <code class="demo-label">DssBtnDropdown</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssBtnToggle
                  v-model="btnToggleValue"
                  :options="[
                    { label: 'Dia',   value: 'day'   },
                    { label: 'Semana', value: 'week' },
                    { label: 'Mês',   value: 'month' },
                  ]"
                />
              </div>
              <code class="demo-label">DssBtnToggle</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--fab">
                <DssFab icon="add" direction="right">
                  <DssFabAction icon="edit" />
                  <DssFabAction icon="delete" />
                </DssFab>
              </div>
              <code class="demo-label">DssFab + DssFabAction</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 2. INDICADORES E AVATARES                         -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-indicadores" class="preview-group" data-grid-debug="s-indicadores">
        <DssCardSection class="group-header">
          <span class="group-title">2. Indicadores e Avatares</span>
          <span class="group-desc">DssBadge · DssAvatar · DssIcon · DssSpinner · DssRating · DssKnob · DssTooltip</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid">

            <div class="demo-cell">
              <div class="demo-box demo-box--gap">
                <DssBadge>99+</DssBadge>
                <DssBadge class="bg-positive">Novo</DssBadge>
                <DssBadge class="bg-negative">!</DssBadge>
              </div>
              <code class="demo-label">DssBadge</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--gap">
                <DssAvatar>JS</DssAvatar>
                <DssAvatar icon="person" />
                <DssAvatar icon="person" size="sm" />
              </div>
              <code class="demo-label">DssAvatar</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--gap">
                <DssIcon name="home" />
                <DssIcon name="settings" />
                <DssIcon name="notifications" />
              </div>
              <code class="demo-label">DssIcon</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssSpinner />
              </div>
              <code class="demo-label">DssSpinner</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssRating v-model="ratingValue" :max="5" />
              </div>
              <code class="demo-label">DssRating</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssKnob v-model="knobValue" :min="0" :max="100" show-value />
              </div>
              <code class="demo-label">DssKnob</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssButton>
                  Hover aqui
                  <DssTooltip>Dica contextual padrão</DssTooltip>
                </DssButton>
              </div>
              <code class="demo-label">DssTooltip</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 3. FORMULÁRIOS — CAMPOS                           -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-form-campos" class="preview-group" data-grid-debug="s-form-campos">
        <DssCardSection class="group-header">
          <span class="group-title">3. Formulários — Campos</span>
          <span class="group-desc">DssInput · DssSelect · DssTextarea · DssFile</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">

            <div class="demo-cell">
              <div class="demo-box demo-box--stretch">
                <DssInput label="Campo de texto" class="demo-field" />
              </div>
              <code class="demo-label">DssInput</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--stretch">
                <DssInput label="Com valor" model-value="Valor preenchido" class="demo-field" />
              </div>
              <code class="demo-label">DssInput (com valor)</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--stretch">
                <DssSelect
                  v-model="selectValue"
                  :options="selectOptions"
                  label="Selecione uma opção"
                  class="demo-field"
                />
              </div>
              <code class="demo-label">DssSelect</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssTextarea label="Observações" class="demo-field" />
              </div>
              <code class="demo-label">DssTextarea</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--stretch">
                <DssFile v-model="fileValue" label="Anexar arquivo" class="demo-field" />
              </div>
              <code class="demo-label">DssFile</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 4. FORMULÁRIOS — CONTROLES                        -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-form-controles" class="preview-group" data-grid-debug="s-form-controles">
        <DssCardSection class="group-header">
          <span class="group-title">4. Formulários — Controles</span>
          <span class="group-desc">DssCheckbox · DssRadio · DssToggle · DssOptionGroup · DssSlider · DssRange</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">

            <!-- Checkbox: mostra repouso (borda cinza) + marcado (cor brand/primary) -->
            <div class="demo-cell">
              <div class="demo-box demo-box--states">
                <DssCheckbox v-model="checkboxOff" label="Desmarcado" />
                <DssCheckbox v-model="checkboxOn" label="Marcado" />
              </div>
              <code class="demo-label">DssCheckbox</code>
            </div>

            <!-- Radio: grupo com seleção — vê repouso vs selecionado -->
            <div class="demo-cell">
              <div class="demo-box demo-box--states">
                <DssRadio v-model="radioValue" val="a" label="Opção A" />
                <DssRadio v-model="radioValue" val="b" label="Opção B" />
                <DssRadio v-model="radioValue" val="c" label="Opção C" />
              </div>
              <code class="demo-label">DssRadio</code>
            </div>

            <!-- Toggle: mostra off (track cinza) + on (track brand/primary) -->
            <div class="demo-cell">
              <div class="demo-box demo-box--states">
                <DssToggle v-model="toggleOff" label="Desativado" />
                <DssToggle v-model="toggleOn"  label="Ativado"    />
              </div>
              <code class="demo-label">DssToggle</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--start">
                <DssOptionGroup
                  v-model="optionGroupValue"
                  :options="optionGroupOptions"
                  type="radio"
                />
              </div>
              <code class="demo-label">DssOptionGroup (radio)</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssSlider v-model="sliderValue" :min="0" :max="100" aria-label="Volume" class="demo-field" />
              </div>
              <code class="demo-label">DssSlider</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssRange v-model="rangeValue" :min="0" :max="100" aria-label="Faixa de valores" class="demo-field" />
              </div>
              <code class="demo-label">DssRange</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 5. PROGRESSO E FEEDBACK                           -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-progresso" class="preview-group" data-grid-debug="s-progresso">
        <DssCardSection class="group-header">
          <span class="group-title">5. Progresso e Feedback</span>
          <span class="group-desc">DssLinearProgress · DssCircularProgress · DssSkeleton · DssInnerLoading · DssAjaxBar</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch demo-box--col">
                <DssLinearProgress :value="0.65" />
                <DssLinearProgress :indeterminate="true" />
              </div>
              <code class="demo-label">DssLinearProgress (determinado · indeterminado)</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--gap">
                <DssCircularProgress :value="65" />
                <DssCircularProgress :indeterminate="true" />
              </div>
              <code class="demo-label">DssCircularProgress</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--start">
                <div class="skeleton-group">
                  <DssSkeleton type="text" width="80%" />
                  <DssSkeleton type="text" width="55%" />
                  <DssSkeleton type="rect" class="skeleton-rect" />
                </div>
              </div>
              <code class="demo-label">DssSkeleton</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--relative">
                <div class="inner-loading-host">Conteúdo abaixo do overlay</div>
                <DssInnerLoading :showing="true" />
              </div>
              <code class="demo-label">DssInnerLoading</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <span class="demo-note">Ativado por requisição HTTP — sem estado visual estático</span>
              </div>
              <code class="demo-label">DssAjaxBar</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 6. BANNERS E BARRAS                               -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-banners" class="preview-group" data-grid-debug="s-banners">
        <DssCardSection class="group-header">
          <span class="group-title">6. Banners e Barras</span>
          <span class="group-desc">DssBanner (4 tipos) · DssBar</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssBanner type="info">
                  <template #default>Mensagem informativa com ação disponível para o usuário.</template>
                  <template #actions>
                    <DssButton variant="flat">Entendido</DssButton>
                  </template>
                </DssBanner>
              </div>
              <code class="demo-label">DssBanner (type="info")</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssBanner type="success">
                  <template #default>Operação realizada com sucesso.</template>
                  <template #actions>
                    <DssButton variant="flat">Ok</DssButton>
                  </template>
                </DssBanner>
              </div>
              <code class="demo-label">DssBanner (type="success")</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssBanner type="warning">
                  <template #default>Atenção: esta ação não pode ser desfeita.</template>
                  <template #actions>
                    <DssButton variant="flat">Cancelar</DssButton>
                    <DssButton variant="flat">Continuar</DssButton>
                  </template>
                </DssBanner>
              </div>
              <code class="demo-label">DssBanner (type="warning")</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssBanner type="error">
                  <template #default>Erro ao processar a solicitação. Tente novamente.</template>
                  <template #actions>
                    <DssButton variant="flat">Tentar novamente</DssButton>
                  </template>
                </DssBanner>
              </div>
              <code class="demo-label">DssBanner (type="error")</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssBar>
                  <DssIcon name="info" />
                  <span style="margin-left: var(--dss-spacing-2)">Conteúdo da barra de sistema — comunicado global</span>
                  <DssSpace />
                  <DssButton variant="flat" size="sm">Ação</DssButton>
                </DssBar>
              </div>
              <code class="demo-label">DssBar</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 7. NAVEGAÇÃO                                      -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-navegacao" class="preview-group" data-grid-debug="s-navegacao">
        <DssCardSection class="group-header">
          <span class="group-title">7. Navegação</span>
          <span class="group-desc">DssTabs · DssTab · DssTabPanels · DssTabPanel · DssBreadcrumbs · DssBreadcrumbsEl · DssPagination · DssExpansionItem · DssMenu</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch demo-box--col demo-box--flush">
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
              <code class="demo-label">DssTabs + DssTab + DssTabPanels + DssTabPanel</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssBreadcrumbs>
                  <DssBreadcrumbsEl label="Home" href="#" />
                  <DssBreadcrumbsEl label="Serviços" href="#" />
                  <DssBreadcrumbsEl label="Detalhe" />
                </DssBreadcrumbs>
              </div>
              <code class="demo-label">DssBreadcrumbs + DssBreadcrumbsEl</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssPagination v-model="currentPage" :max="8" boundary-links />
              </div>
              <code class="demo-label">DssPagination</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssExpansionItem label="Seção expansível" icon="info">
                  <DssCardSection>
                    Conteúdo interno da seção expansível. Pode conter qualquer elemento DSS.
                  </DssCardSection>
                </DssExpansionItem>
              </div>
              <code class="demo-label">DssExpansionItem</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
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
              <code class="demo-label">DssMenu</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 8. STEPPER                                        -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-stepper" class="preview-group" data-grid-debug="s-stepper">
        <DssCardSection class="group-header">
          <span class="group-title">8. Stepper</span>
          <span class="group-desc">DssStepper · DssStep</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch demo-box--col">
                <DssStepper v-model="stepperStep" flat>
                  <DssStep name="step1" title="Dados pessoais" :done="stepperStep > 1" />
                  <DssStep name="step2" title="Endereço"       :done="stepperStep > 2" />
                  <DssStep name="step3" title="Confirmação" />
                </DssStepper>
                <div class="stepper-controls">
                  <DssButton variant="outlined" size="sm" :disable="stepperStep === 1" @click="stepperStep--">Anterior</DssButton>
                  <DssButton size="sm" :disable="stepperStep === 3" @click="stepperStep++">Próximo</DssButton>
                </div>
              </div>
              <code class="demo-label">DssStepper + DssStep</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 9. LISTAS E ESTRUTURA                             -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-listas" class="preview-group" data-grid-debug="s-listas">
        <DssCardSection class="group-header">
          <span class="group-title">9. Listas e Estrutura</span>
          <span class="group-desc">DssList · DssItem · DssItemSection · DssItemLabel · DssSlideItem · DssSeparator · DssSpace</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssList bordered separator class="list-sample">
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
                      <DssItemLabel caption>Item ativo</DssItemLabel>
                    </DssItemSection>
                    <DssItemSection side>
                      <DssIcon name="chevron_right" />
                    </DssItemSection>
                  </DssItem>
                </DssList>
              </div>
              <code class="demo-label">DssList + DssItem + DssItemSection + DssItemLabel</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssList bordered class="list-sample">
                  <DssSlideItem @right="() => {}" right-color="error">
                    <DssItemSection>
                      <DssItemLabel>Deslize para a esquerda para excluir</DssItemLabel>
                    </DssItemSection>
                    <template #right>
                      <DssIcon name="delete" color="white" />
                    </template>
                  </DssSlideItem>
                </DssList>
              </div>
              <code class="demo-label">DssSlideItem</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssSeparator />
              </div>
              <code class="demo-label">DssSeparator</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box demo-box--inline">
                <span class="space-label">Antes</span>
                <DssSpace />
                <span class="space-label">Depois</span>
              </div>
              <code class="demo-label">DssSpace</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 10. CARTÕES E SUPERFÍCIES                         -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-cartoes" class="preview-group" data-grid-debug="s-cartoes">
        <DssCardSection class="group-header">
          <span class="group-title">10. Cartões e Superfícies</span>
          <span class="group-desc">DssCard (4 variantes) · DssCardSection · DssCardActions · DssToolbar · DssToolbarTitle · DssMarkupTable</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid">

            <div class="demo-cell">
              <div class="demo-box">
                <DssCard class="card-sample">
                  <DssCardSection>
                    <strong>Elevated</strong>
                    <p class="card-desc">Default — com sombra (elevation-1)</p>
                  </DssCardSection>
                  <DssCardActions align="right">
                    <DssButton variant="flat" size="sm">Ação</DssButton>
                  </DssCardActions>
                </DssCard>
              </div>
              <code class="demo-label">DssCard (default)</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssCard variant="outlined" class="card-sample">
                  <DssCardSection>
                    <strong>Outlined</strong>
                    <p class="card-desc">Apenas borda</p>
                  </DssCardSection>
                </DssCard>
              </div>
              <code class="demo-label">DssCard variant="outlined"</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssCard variant="bordered" class="card-sample">
                  <DssCardSection>
                    <strong>Bordered</strong>
                    <p class="card-desc">Borda + sombra</p>
                  </DssCardSection>
                </DssCard>
              </div>
              <code class="demo-label">DssCard variant="bordered"</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssCard variant="flat" class="card-sample">
                  <DssCardSection>
                    <strong>Flat</strong>
                    <p class="card-desc">Sem elevação, sem borda</p>
                  </DssCardSection>
                </DssCard>
              </div>
              <code class="demo-label">DssCard variant="flat"</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssToolbar>
                  <DssButton variant="flat" icon="menu" />
                  <DssToolbarTitle>Título da Toolbar</DssToolbarTitle>
                  <DssSpace />
                  <DssButton variant="flat" icon="search" />
                  <DssButton variant="flat" icon="more_vert" />
                </DssToolbar>
              </div>
              <code class="demo-label">DssToolbar + DssToolbarTitle</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
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
              <code class="demo-label">DssMarkupTable</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 11. TIMELINE                                      -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-timeline" class="preview-group" data-grid-debug="s-timeline">
        <DssCardSection class="group-header">
          <span class="group-title">11. Timeline</span>
          <span class="group-desc">DssTimeline · DssTimelineEntry</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">
            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch demo-box--start">
                <DssTimeline>
                  <DssTimelineEntry title="Pedido criado" subtitle="10/05/2026 09:00" icon="add_circle" color="primary">
                    Pedido #1234 foi criado com sucesso.
                  </DssTimelineEntry>
                  <DssTimelineEntry title="Em processamento" subtitle="10/05/2026 10:30" icon="autorenew" color="primary">
                    Pedido em análise pela equipe.
                  </DssTimelineEntry>
                  <DssTimelineEntry title="Entregue" subtitle="12/05/2026 14:00" icon="check_circle" color="positive">
                    Pedido entregue ao destinatário.
                  </DssTimelineEntry>
                </DssTimeline>
              </div>
              <code class="demo-label">DssTimeline + DssTimelineEntry</code>
            </div>
          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 12. ÁRVORE                                        -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-arvore" class="preview-group" data-grid-debug="s-arvore">
        <DssCardSection class="group-header">
          <span class="group-title">12. Árvore</span>
          <span class="group-desc">DssTree</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">
            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch demo-box--start">
                <DssTree :nodes="treeNodes" node-key="id" label-key="label" default-expand-all />
              </div>
              <code class="demo-label">DssTree</code>
            </div>
          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 13. MÍDIA E SCROLL                                -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-midia" class="preview-group" data-grid-debug="s-midia">
        <DssCardSection class="group-header">
          <span class="group-title">13. Mídia e Scroll</span>
          <span class="group-desc">DssImg · DssScrollArea · DssSplitter</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid">

            <div class="demo-cell">
              <div class="demo-box">
                <DssImg
                  src="https://picsum.photos/240/140"
                  alt="Imagem de exemplo"
                  class="img-sample"
                />
              </div>
              <code class="demo-label">DssImg</code>
            </div>

            <div class="demo-cell">
              <div class="demo-box">
                <DssScrollArea class="scroll-sample">
                  <div v-for="i in 10" :key="i" class="scroll-row">
                    Item {{ i }} — conteúdo para demonstrar scroll vertical
                  </div>
                </DssScrollArea>
              </div>
              <code class="demo-label">DssScrollArea</code>
            </div>

            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--stretch">
                <DssSplitter v-model="splitterRatio" class="splitter-sample">
                  <template #before>
                    <div class="splitter-pane">Painel Esquerdo</div>
                  </template>
                  <template #after>
                    <div class="splitter-pane">Painel Direito</div>
                  </template>
                </DssSplitter>
              </div>
              <code class="demo-label">DssSplitter</code>
            </div>

          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 14. LAYOUT ESTRUTURAL                             -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-layout" class="preview-group" data-grid-debug="s-layout">
        <DssCardSection class="group-header">
          <span class="group-title">14. Layout Estrutural</span>
          <span class="group-desc">DssLayout · DssHeader · DssDrawer · DssPageContainer · DssPage · DssPageSticky · DssPageScroller · DssFooter</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection class="layout-section-intro">
          <DssBanner type="info">
            <template #default>
              Preview interativo com todos os componentes de layout aninhados em hierarquia de produção.
              Clique em <strong>Menu</strong> na toolbar para abrir/fechar o DssDrawer.
              Role o painel de conteúdo para acionar o DssPageScroller (aparece após 80 px de scroll).
            </template>
          </DssBanner>
        </DssCardSection>

        <!-- ░░░░  MINI-APP  ░░░░ -->
        <DssCardSection class="layout-section-frame">
          <div class="layout-app-frame" role="region" aria-label="Preview de aplicação DSS completa">

            <DssLayout view="hHh lpR fFf" container class="layout-dss" aria-label="Aplicação Sansys Hub">

              <!-- ── DssHeader ──────────────────────────────── -->
              <DssHeader elevated>
                <DssToolbar>
                  <DssButton
                    variant="flat"
                    icon="menu"
                    round
                    @click="layoutDrawerOpen = !layoutDrawerOpen"
                    aria-label="Alternar menu lateral"
                  />
                  <DssToolbarTitle>Sansys Hub — Painel de Controle</DssToolbarTitle>
                  <DssSpace />
                  <DssButton variant="flat" icon="search" round aria-label="Buscar" />
                  <DssButton variant="flat" icon="notifications" round aria-label="Notificações">
                    <DssBadge color="negative" floating>2</DssBadge>
                  </DssButton>
                  <DssAvatar size="sm" style="margin-left: var(--dss-spacing-2)">JC</DssAvatar>
                </DssToolbar>
              </DssHeader>

              <!-- ── DssDrawer ───────────────────────────────── -->
              <DssDrawer v-model="layoutDrawerOpen" :width="220" bordered side="left">
                <DssToolbar class="layout-drawer-header">
                  <DssIcon name="hexagon" style="margin-right: var(--dss-spacing-2)" />
                  <DssToolbarTitle class="layout-drawer-title">Sansys Hub</DssToolbarTitle>
                </DssToolbar>
                <DssSeparator />
                <DssScrollArea style="height: calc(100% - var(--dss-toolbar-height))">
                  <DssList padding>
                    <DssItem clickable @click="layoutActivePage = 'dashboard'" :active="layoutActivePage === 'dashboard'">
                      <DssItemSection avatar><DssIcon name="dashboard" /></DssItemSection>
                      <DssItemSection><DssItemLabel>Dashboard</DssItemLabel></DssItemSection>
                    </DssItem>
                    <DssItem clickable @click="layoutActivePage = 'leituras'" :active="layoutActivePage === 'leituras'">
                      <DssItemSection avatar><DssIcon name="water_drop" /></DssItemSection>
                      <DssItemSection>
                        <DssItemLabel>Leituras</DssItemLabel>
                        <DssItemLabel caption>Hidrômetros e Pressão</DssItemLabel>
                      </DssItemSection>
                      <DssItemSection side><DssBadge>8</DssBadge></DssItemSection>
                    </DssItem>
                    <DssItem clickable @click="layoutActivePage = 'ocorrencias'" :active="layoutActivePage === 'ocorrencias'">
                      <DssItemSection avatar><DssIcon name="warning" /></DssItemSection>
                      <DssItemSection><DssItemLabel>Ocorrências</DssItemLabel></DssItemSection>
                    </DssItem>
                    <DssSeparator spaced />
                    <DssItem clickable @click="layoutActivePage = 'relatorios'" :active="layoutActivePage === 'relatorios'">
                      <DssItemSection avatar><DssIcon name="bar_chart" /></DssItemSection>
                      <DssItemSection><DssItemLabel>Relatórios</DssItemLabel></DssItemSection>
                    </DssItem>
                    <DssItem clickable @click="layoutActivePage = 'configuracoes'" :active="layoutActivePage === 'configuracoes'">
                      <DssItemSection avatar><DssIcon name="settings" /></DssItemSection>
                      <DssItemSection><DssItemLabel>Configurações</DssItemLabel></DssItemSection>
                    </DssItem>
                    <DssSeparator spaced />
                    <DssItem clickable>
                      <DssItemSection avatar><DssIcon name="logout" /></DssItemSection>
                      <DssItemSection><DssItemLabel>Sair</DssItemLabel></DssItemSection>
                    </DssItem>
                  </DssList>
                </DssScrollArea>
              </DssDrawer>

              <!-- ── DssPageContainer → DssPage ──────────────── -->
              <DssPageContainer>
                <DssPage padding>

                  <!-- Breadcrumbs + título -->
                  <div class="layout-page-header">
                    <DssBreadcrumbs>
                      <DssBreadcrumbsEl label="Hub" href="#" />
                      <DssBreadcrumbsEl :label="layoutPageTitles[layoutActivePage]" />
                    </DssBreadcrumbs>
                    <div class="layout-page-title-row">
                      <h2 class="layout-page-title">{{ layoutPageTitles[layoutActivePage] }}</h2>
                      <DssButton size="sm" icon="add">Novo registro</DssButton>
                    </div>
                  </div>

                  <!-- Métricas rápidas -->
                  <div class="layout-stats-row">
                    <DssCard variant="outlined" class="layout-stat-card">
                      <DssCardSection class="layout-stat-content">
                        <DssCircularProgress :value="78" size="xs" :thickness="0.22" />
                        <div>
                          <div class="layout-stat-value">78%</div>
                          <div class="layout-stat-label">Eficiência</div>
                        </div>
                      </DssCardSection>
                    </DssCard>
                    <DssCard variant="outlined" class="layout-stat-card">
                      <DssCardSection class="layout-stat-content">
                        <DssIcon name="water_drop" style="font-size: var(--dss-spacing-7)" />
                        <div>
                          <div class="layout-stat-value">1.247</div>
                          <div class="layout-stat-label">Leituras hoje</div>
                        </div>
                      </DssCardSection>
                    </DssCard>
                    <DssCard variant="outlined" class="layout-stat-card">
                      <DssCardSection class="layout-stat-content">
                        <DssIcon name="warning" style="font-size: var(--dss-spacing-7)" />
                        <div>
                          <div class="layout-stat-value">3</div>
                          <div class="layout-stat-label">Alertas ativos</div>
                        </div>
                      </DssCardSection>
                    </DssCard>
                  </div>

                  <!-- Lista de registros (conteúdo scrollável) -->
                  <DssList bordered separator class="layout-records-list">
                    <DssItem v-for="rec in layoutRecords" :key="rec.id" clickable>
                      <DssItemSection avatar>
                        <DssAvatar :icon="rec.icon" size="sm" />
                      </DssItemSection>
                      <DssItemSection>
                        <DssItemLabel>{{ rec.title }}</DssItemLabel>
                        <DssItemLabel caption>{{ rec.subtitle }}</DssItemLabel>
                      </DssItemSection>
                      <DssItemSection side>
                        <DssBadge :color="rec.statusColor">{{ rec.status }}</DssBadge>
                      </DssItemSection>
                    </DssItem>
                  </DssList>

                </DssPage>
              </DssPageContainer>

              <!-- ── DssPageSticky — ajuda fixo bottom-left ──── -->
              <DssPageSticky position="bottom-left" :offset="[12, 12]">
                <DssButton round icon="help_outline" size="sm" aria-label="Ajuda contextual da página">
                  <DssTooltip>Ajuda contextual</DssTooltip>
                </DssButton>
              </DssPageSticky>

              <!-- ── DssPageScroller — back to top ───────────── -->
              <DssPageScroller position="bottom-right" :offset="[12, 12]" :scroll-offset="80">
                <DssButton round icon="keyboard_arrow_up" size="sm" aria-label="Voltar ao topo" />
              </DssPageScroller>

              <!-- ── DssFooter ──────────────────────────────── -->
              <DssFooter bordered>
                <DssToolbar>
                  <DssIcon name="hexagon" style="font-size: var(--dss-font-size-sm); margin-right: var(--dss-spacing-2)" />
                  <span class="layout-footer-text">Design System Sansys</span>
                  <DssSpace />
                  <span class="layout-footer-text">v2.2 · © 2026 Sansys</span>
                </DssToolbar>
              </DssFooter>

            </DssLayout>
          </div>
        </DssCardSection>

        <!-- Relatório de implementação -->
        <DssSeparator />
        <DssCardSection>
          <div class="layout-report">
            <div class="layout-report__title">Relatório de Implementação — Layout Estrutural</div>
            <div class="layout-report__grid">
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssLayout</strong><span>container + view="hHh lpR fFf" — padrão corporativo DSS ativo</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssHeader</strong><span>elevated — sombra via --dss-elevation-2; DssToolbar como filho exclusivo</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssDrawer</strong><span>v-model reativo + :width="220" + bordered; push-mode em desktop (behavior default)</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssPageContainer</strong><span>pass-through estrutural — offsets calculados via CSS vars do QLayout</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssPage</strong><span>padding=true — aplica --dss-container-padding em todos os lados</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssPageSticky</strong><span>position="bottom-left" + :offset="[12,12]" — filho direto de DssLayout</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssFooter</strong><span>bordered — borda superior sutil; DssToolbar como filho exclusivo</span></div>
              </div>
              <div class="layout-report__item layout-report__item--warn">
                <DssIcon name="info" class="report-icon report-icon--warn" />
                <div><strong>DssPageScroller</strong><span>:scroll-offset="80" — visibilidade condicional; em container reduzido pode requerer scroll manual para aparecer</span></div>
              </div>
              <div class="layout-report__item layout-report__item--warn">
                <DssIcon name="info" class="report-icon report-icon--warn" />
                <div><strong>DssDrawer — prop mini</strong><span>Não demonstrada: requer toggle state adicional; fora do escopo de defaults</span></div>
              </div>
              <div class="layout-report__item layout-report__item--warn">
                <DssIcon name="info" class="report-icon report-icon--warn" />
                <div><strong>DssDrawer — comportamento mobile</strong><span>Em container &lt; 600px o QDrawer aciona overlay automaticamente — container do preview pode variar</span></div>
              </div>
            </div>
          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 15. COMPONENTES CONTEXTUAIS                       -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard id="preview-s-contextuais" class="preview-group" data-grid-debug="s-contextuais">
        <DssCardSection class="group-header">
          <span class="group-title">15. Componentes Contextuais</span>
          <span class="group-desc">Componentes que requerem interação, dados externos ou contexto específico para renderização</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">

            <!-- ── DssVirtualScroll ──────────────────────────────────────── -->
            <div class="demo-cell">
              <div class="demo-box ctx-vs-box">
                <DssVirtualScroll
                  :items="ctxVirtualItems"
                  :item-size="36"
                  class="ctx-vs-list"
                  aria-label="Lista de sensores virtualizada"
                >
                  <template #default="{ item, ariaSetsize, ariaPosinset }">
                    <div
                      class="ctx-vs-item"
                      role="listitem"
                      :aria-setsize="ariaSetsize"
                      :aria-posinset="ariaPosinset"
                    >
                      <DssIcon name="sensors" class="ctx-vs-icon" />
                      <span class="ctx-vs-text">{{ item.label }}</span>
                      <DssBadge :color="item.status === 'OK' ? 'positive' : 'warning'">{{ item.status }}</DssBadge>
                    </div>
                  </template>
                </DssVirtualScroll>
              </div>
              <code class="demo-label">DssVirtualScroll</code>
            </div>

            <!-- ── DssInfiniteScroll ─────────────────────────────────────── -->
            <div class="demo-cell">
              <div class="demo-box ctx-inf-box">
                <div class="ctx-inf-wrapper">
                  <DssInfiniteScroll
                    :offset="60"
                    scroll-target=".ctx-inf-wrapper"
                    @load="onCtxInfiniteLoad"
                    aria-label="Lista de equipe com carregamento progressivo"
                  >
                    <DssItem
                      v-for="item in ctxInfiniteItems"
                      :key="item.id"
                    >
                      <DssItemSection avatar>
                        <DssAvatar size="sm" :color="item.color">{{ item.initials }}</DssAvatar>
                      </DssItemSection>
                      <DssItemSection>
                        <DssItemLabel>{{ item.name }}</DssItemLabel>
                        <DssItemLabel caption>{{ item.role }}</DssItemLabel>
                      </DssItemSection>
                    </DssItem>
                    <template #no-more>
                      <div class="ctx-inf-end">Todos os registros carregados</div>
                    </template>
                  </DssInfiniteScroll>
                </div>
              </div>
              <code class="demo-label">DssInfiniteScroll</code>
            </div>

            <!-- ── DssParallax ───────────────────────────────────────────── -->
            <div class="demo-cell demo-cell--full">
              <div class="demo-box ctx-parallax-box">
                <DssParallax
                  src="https://picsum.photos/seed/sansys-water/1200/400"
                  :height="180"
                  :speed="0.4"
                  decorative
                  scroll-target=".preview-main"
                  class="ctx-parallax"
                >
                  <div class="ctx-parallax-overlay">
                    <span class="ctx-parallax-title">Sansys Water</span>
                    <span class="ctx-parallax-sub">Gestão inteligente de recursos hídricos</span>
                  </div>
                </DssParallax>
              </div>
              <code class="demo-label">DssParallax</code>
            </div>

            <!-- ── DssVideo ──────────────────────────────────────────────── -->
            <div class="demo-cell">
              <div class="demo-box ctx-video-box">
                <DssVideo
                  src="https://www.youtube.com/embed/aqz-KE-bpKQ"
                  title="Apresentação Sansys Hub"
                  :ratio="16 / 9"
                  class="ctx-video"
                />
              </div>
              <code class="demo-label">DssVideo</code>
            </div>

            <!-- ── DssPullToRefresh ──────────────────────────────────────── -->
            <div class="demo-cell">
              <div class="demo-box ctx-pull-box">
                <div class="ctx-pull-hint">
                  <DssIcon name="swipe_down" class="ctx-pull-icon" />
                  <span>Arraste para baixo para atualizar</span>
                </div>
                <DssPullToRefresh @refresh="onCtxPullRefresh" class="ctx-pull-list">
                  <DssList bordered separator>
                    <DssItem v-for="item in ctxPullItems" :key="item.id">
                      <DssItemSection>
                        <DssItemLabel>{{ item.title }}</DssItemLabel>
                        <DssItemLabel caption>{{ item.time }}</DssItemLabel>
                      </DssItemSection>
                      <DssItemSection side>
                        <DssBadge :color="item.color">{{ item.status }}</DssBadge>
                      </DssItemSection>
                    </DssItem>
                  </DssList>
                </DssPullToRefresh>
              </div>
              <code class="demo-label">DssPullToRefresh</code>
            </div>

            <!-- ── DssPopupProxy ─────────────────────────────────────────── -->
            <div class="demo-cell">
              <div class="demo-box demo-box--col">
                <DssButton label="Abrir menu" icon="more_vert" variant="outlined">
                  <DssPopupProxy>
                    <DssList separator>
                      <DssItem clickable v-close-popup>
                        <DssItemSection avatar><DssIcon name="edit" /></DssItemSection>
                        <DssItemSection><DssItemLabel>Editar registro</DssItemLabel></DssItemSection>
                      </DssItem>
                      <DssItem clickable v-close-popup>
                        <DssItemSection avatar><DssIcon name="content_copy" /></DssItemSection>
                        <DssItemSection><DssItemLabel>Duplicar</DssItemLabel></DssItemSection>
                      </DssItem>
                      <DssSeparator />
                      <DssItem clickable v-close-popup>
                        <DssItemSection avatar><DssIcon name="delete" color="negative" /></DssItemSection>
                        <DssItemSection><DssItemLabel lines="1" class="text-negative">Remover</DssItemLabel></DssItemSection>
                      </DssItem>
                    </DssList>
                  </DssPopupProxy>
                </DssButton>
                <span class="demo-note">QMenu em desktop · QDialog em mobile (breakpoint: 450px)</span>
              </div>
              <code class="demo-label">DssPopupProxy</code>
            </div>

            <!-- ── DssField ──────────────────────────────────────────────── -->
            <div class="demo-cell demo-cell--full">
              <div class="demo-box demo-box--col">
                <div class="ctx-field-row">
                  <DssField label="Código de instalação" hint="Formato: ZN-000000" class="ctx-field">
                    <template #prepend><DssIcon name="tag" /></template>
                    <template #default="{ fieldId, ariaDescribedby }">
                      <input
                        :id="fieldId"
                        v-model="ctxFieldValue"
                        :aria-describedby="ariaDescribedby"
                        class="ctx-field-input"
                        placeholder="Ex: ZN-032145"
                        type="text"
                      />
                    </template>
                  </DssField>
                  <DssField label="E-mail do responsável" error error-message="Endereço de e-mail inválido" class="ctx-field">
                    <template #prepend><DssIcon name="email" /></template>
                    <template #default="{ fieldId, ariaDescribedby }">
                      <input
                        :id="fieldId"
                        :aria-describedby="ariaDescribedby"
                        class="ctx-field-input ctx-field-input--error"
                        value="usuario@invalido"
                        type="email"
                        aria-invalid="true"
                      />
                    </template>
                  </DssField>
                </div>
              </div>
              <code class="demo-label">DssField</code>
            </div>

            <!-- ── DssResponsive ─────────────────────────────────────────── -->
            <div class="demo-cell">
              <div class="demo-box demo-box--col">
                <DssResponsive>
                  <template #default="{ currentBreakpoint, isMobile, isDesktop }">
                    <div class="ctx-responsive-row">
                      <span class="ctx-responsive-label">Breakpoint atual:</span>
                      <DssChip :label="currentBreakpoint" />
                    </div>
                    <div class="ctx-responsive-row">
                      <DssChip
                        :label="isMobile ? 'Mobile' : 'Desktop'"
                        :color="isMobile ? 'warning' : 'positive'"
                      />
                      <DssChip
                        label="isDesktop"
                        :variant="isDesktop ? 'filled' : 'outlined'"
                      />
                    </div>
                  </template>
                </DssResponsive>
              </div>
              <code class="demo-label">DssResponsive</code>
            </div>

            <!-- ── DssAjaxBar ────────────────────────────────────────────── -->
            <div class="demo-cell">
              <div class="demo-box demo-box--col">
                <DssAjaxBar
                  ref="ctxAjaxBarRef"
                  position="top"
                  :skip-hijack="true"
                  size="3px"
                />
                <span class="demo-note">A barra aparece no topo da página — posição fixa nativa (skip-hijack ativo)</span>
                <div class="ctx-ajax-controls">
                  <DssButton label="Iniciar" size="sm" color="primary" :disable="ctxAjaxRunning" @click="startCtxAjaxBar" />
                  <DssButton label="Parar" size="sm" variant="outlined" :disable="!ctxAjaxRunning" @click="stopCtxAjaxBar" />
                  <DssBadge :color="ctxAjaxRunning ? 'positive' : 'grey-5'" class="ctx-ajax-badge">
                    {{ ctxAjaxRunning ? 'Carregando' : 'Ocioso' }}
                  </DssBadge>
                </div>
              </div>
              <code class="demo-label">DssAjaxBar</code>
            </div>

          </div>

          <!-- ── Relatório de implementação ──────────────────────────── -->
          <div class="layout-report ctx-report">
            <p class="layout-report__title">Relatório de implementação — Componentes Contextuais</p>
            <div class="layout-report__grid">
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssVirtualScroll</strong><span>150 itens virtualizados; slot scope com ariaSetsize/ariaPosinset; altura 220px</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssInfiniteScroll</strong><span>6 itens iniciais + batches de 4; scroll-target embedded; slot no-more ao fim</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssParallax</strong><span>scrollTarget=".preview-main"; decorative; overlay de conteúdo; fallback motion-reduced</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssVideo</strong><span>Embed YouTube; ratio=16/9; title para WCAG 4.1.2</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssPullToRefresh</strong><span>Gesto nativo touch/mouse; handler assíncrono com done(); lista rotativa a cada refresh</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssPopupProxy</strong><span>Auto-trigger no clique do botão pai; QMenu em desktop / QDialog em mobile (450px)</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssField</strong><span>Dois estados: normal (prepend + hint) e erro; fieldId + ariaDescribedby via slot scope</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssResponsive</strong><span>Slot scope expõe currentBreakpoint, isMobile e isDesktop reativos em tempo real</span></div>
              </div>
              <div class="layout-report__item layout-report__item--ok">
                <DssIcon name="check_circle" class="report-icon report-icon--ok" />
                <div><strong>DssAjaxBar</strong><span>skip-hijack=true; controle manual via defineExpose (start/stop); posição top nativa</span></div>
              </div>
              <div class="layout-report__item layout-report__item--warn">
                <DssIcon name="info" class="report-icon report-icon--warn" />
                <div><strong>DssDialog</strong><span>SELO v2.2 (Mai 2026) — requer trigger externo (v-model + DssButton); não exibível em estado estático</span></div>
              </div>
              <div class="layout-report__item layout-report__item--warn">
                <DssIcon name="info" class="report-icon report-icon--warn" />
                <div><strong>DssTimePicker</strong><span>SELO v2.2 (Mai 2026) — requer QDialog ou DssPopupProxy como wrapper; demonstração requer estado de abertura</span></div>
              </div>
              <div class="layout-report__item layout-report__item--warn">
                <DssIcon name="info" class="report-icon report-icon--warn" />
                <div><strong>DssDatePicker</strong><span>SELO v2.2 (Mai 2026) — requer QDialog ou DssPopupProxy como wrapper; demonstração requer estado de abertura</span></div>
              </div>
              <div class="layout-report__item layout-report__item--warn">
                <DssIcon name="info" class="report-icon report-icon--warn" />
                <div><strong>DssColorPicker</strong><span>SELO v2.2 (Mai 2026) — requer QDialog ou DssPopupProxy como wrapper; demonstração requer estado de abertura</span></div>
              </div>
              <div class="layout-report__item layout-report__item--warn">
                <DssIcon name="info" class="report-icon report-icon--warn" />
                <div><strong>DssRouteTab</strong><span>SELO v2.2 (Abr 2026) — requer vue-router com rotas configuradas; não disponível no dss-example standalone</span></div>
              </div>
            </div>
          </div>

        </DssCardSection>
      </DssCard>

        </div><!-- /preview__sections -->
      </div><!-- /preview__body -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ── Ações ──────────────────────────────────────────────────────────────────
import { DssButton }      from '@components/base/DssButton'
import { DssChip }        from '@components/base/DssChip'
import { DssBtnGroup }    from '@components/base/DssBtnGroup'
import { DssBtnDropdown } from '@components/base/DssBtnDropdown'
import { DssBtnToggle }   from '@components/base/DssBtnToggle'
import { DssFab }         from '@components/base/DssFab'
import { DssFabAction }   from '@components/base/DssFabAction'

// ── Indicadores e Avatares ─────────────────────────────────────────────────
import { DssBadge }    from '@components/base/DssBadge'
import { DssAvatar }   from '@components/base/DssAvatar'
import { DssIcon }     from '@components/base/DssIcon'
import { DssSpinner }  from '@components/base/DssSpinner'
import { DssRating }   from '@components/base/DssRating'
import { DssKnob }     from '@components/base/DssKnob'
import { DssTooltip }  from '@components/base/DssTooltip'

// ── Formulários ────────────────────────────────────────────────────────────
import { DssInput }       from '@components/base/DssInput'
import { DssSelect }      from '@components/base/DssSelect'
import { DssTextarea }    from '@components/base/DssTextarea'
import { DssFile }        from '@components/base/DssFile'
import { DssCheckbox }    from '@components/base/DssCheckbox'
import { DssRadio }       from '@components/base/DssRadio'
import { DssToggle }      from '@components/base/DssToggle'
import { DssOptionGroup } from '@components/base/DssOptionGroup'
import { DssSlider }      from '@components/base/DssSlider'
import { DssRange }       from '@components/base/DssRange'

// ── Progresso e Feedback ───────────────────────────────────────────────────
import { DssLinearProgress }   from '@components/base/DssLinearProgress'
import { DssCircularProgress } from '@components/base/DssCircularProgress'
import { DssSkeleton }         from '@components/base/DssSkeleton'
import { DssInnerLoading }     from '@components/base/DssInnerLoading'

// ── Banners e Barras ───────────────────────────────────────────────────────
import { DssBanner } from '@components/base/DssBanner'
import { DssBar }    from '@components/base/DssBar'

// ── Navegação ──────────────────────────────────────────────────────────────
import { DssTabs }          from '@components/base/DssTabs'
import { DssTab }           from '@components/base/DssTab'
import { DssTabPanels }     from '@components/base/DssTabPanels'
import { DssTabPanel }      from '@components/base/DssTabPanel'
import { DssBreadcrumbs }   from '@components/base/DssBreadcrumbs'
import { DssBreadcrumbsEl } from '@components/base/DssBreadcrumbsEl'
import { DssPagination }    from '@components/base/DssPagination'
import { DssExpansionItem } from '@components/base/DssExpansionItem'
import { DssMenu }          from '@components/base/DssMenu'

// ── Stepper ────────────────────────────────────────────────────────────────
import { DssStepper } from '@components/base/DssStepper'
import { DssStep }    from '@components/base/DssStep'

// ── Listas e Estrutura ─────────────────────────────────────────────────────
import { DssList }        from '@components/base/DssList'
import { DssItem }        from '@components/base/DssItem'
import { DssItemSection } from '@components/base/DssItemSection'
import { DssItemLabel }   from '@components/base/DssItemLabel'
import { DssSlideItem }   from '@components/base/DssSlideItem'
import { DssSeparator }   from '@components/base/DssSeparator'
import { DssSpace }       from '@components/base/DssSpace'

// ── Cartões e Superfícies ──────────────────────────────────────────────────
import { DssCard, DssCardSection, DssCardActions } from '@components/base/DssCard'
import { DssToolbar }      from '@components/base/DssToolbar'
import { DssToolbarTitle } from '@components/base/DssToolbarTitle'
import { DssMarkupTable }  from '@components/base/DssMarkupTable'

// ── Timeline ───────────────────────────────────────────────────────────────
import { DssTimeline }      from '@components/base/DssTimeline'
import { DssTimelineEntry } from '@components/base/DssTimelineEntry'

// ── Árvore ─────────────────────────────────────────────────────────────────
import { DssTree } from '@components/base/DssTree'

// ── Mídia e Scroll ─────────────────────────────────────────────────────────
import { DssImg }        from '@components/base/DssImg'
import { DssScrollArea } from '@components/base/DssScrollArea'
import { DssSplitter }   from '@components/base/DssSplitter'

// ── Layout Estrutural ──────────────────────────────────────────────────────
import { DssLayout }        from '@components/base/DssLayout'
import { DssHeader }        from '@components/base/DssHeader'
import { DssFooter }        from '@components/base/DssFooter'
import { DssDrawer }        from '@components/base/DssDrawer'
import { DssPage }          from '@components/base/DssPage'
import { DssPageContainer } from '@components/base/DssPageContainer'
import { DssPageSticky }    from '@components/base/DssPageSticky'
import { DssPageScroller }  from '@components/base/DssPageScroller'

// ── Contextuais ────────────────────────────────────────────────────────────
import { DssVirtualScroll }  from '@components/base/DssVirtualScroll'
import { DssInfiniteScroll } from '@components/base/DssInfiniteScroll'
import { DssParallax }       from '@components/base/DssParallax'
import { DssVideo }          from '@components/base/DssVideo'
import { DssPullToRefresh }  from '@components/base/DssPullToRefresh'
import { DssPopupProxy }     from '@components/base/DssPopupProxy'
import { DssField }          from '@components/base/DssField'
import { DssResponsive }     from '@components/base/DssResponsive'
import { DssAjaxBar }        from '@components/base/DssAjaxBar'

// ── Brand selector ─────────────────────────────────────────────────────────
// Inicia neutro para exibir os defaults reais sem coloração de brand
const activeBrand = ref('')
const brands = [
  { value: 'hub',   label: 'Hub'   },
  { value: 'water', label: 'Water' },
  { value: 'waste', label: 'Waste' },
  { value: '',      label: 'Neutro' },
]

// ── Estado dos componentes interativos ─────────────────────────────────────
const ratingValue      = ref(3)
const knobValue        = ref(50)

// Checkbox: dois estados visíveis e interativos — repouso (cinza) e marcado (primary/brand)
const checkboxOff      = ref(false)
const checkboxOn       = ref(true)

// Radio: grupo com seleção ativa — vê repouso vs selecionado simultaneamente
const radioValue       = ref('a')

// Toggle: dois estados visíveis e interativos — off (track cinza) e on (track primary/brand)
const toggleOff        = ref(false)
const toggleOn         = ref(true)

const sliderValue      = ref(50)
const rangeValue       = ref({ min: 20, max: 80 })
const fileValue        = ref(null)
const selectValue      = ref(null)
const selectOptions    = ['Opção 1', 'Opção 2', 'Opção 3']
const optionGroupValue = ref('opt1')
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
          { id: '1-1-2', label: 'ETA Sul'   },
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
      { id: '2-2', label: 'Anual'  },
    ],
  },
]

// ── Layout Estrutural — estado reativo ────────────────────────────────────
const layoutDrawerOpen = ref(true)
const layoutActivePage = ref<string>('dashboard')
const layoutPageTitles: Record<string, string> = {
  dashboard:     'Dashboard',
  leituras:      'Leituras',
  ocorrencias:   'Ocorrências',
  relatorios:    'Relatórios',
  configuracoes: 'Configurações',
}
const layoutRecords = [
  { id: 1, title: 'Hidrômetro RM-0032', subtitle: 'Zona Norte · Última leitura: 09:42',  icon: 'water_drop', status: 'Normal',   statusColor: 'positive' },
  { id: 2, title: 'Reservatório R-07',   subtitle: 'ETA Central · Capacidade 85%',        icon: 'storage',    status: 'Alerta',   statusColor: 'warning'  },
  { id: 3, title: 'Bomba B-14',          subtitle: 'Estação Sul · Operacional',           icon: 'settings',   status: 'Normal',   statusColor: 'positive' },
  { id: 4, title: 'Sensor S-201',        subtitle: 'Rede de distribuição · Pressão OK',  icon: 'sensors',    status: 'Normal',   statusColor: 'positive' },
  { id: 5, title: 'Válvula V-09',        subtitle: 'Zona Leste · Manutenção agendada',   icon: 'settings',   status: 'Pendente', statusColor: 'warning'  },
  { id: 6, title: 'Adutora AD-03',       subtitle: 'Captação Norte · Vazão 340 m³/h',    icon: 'water',      status: 'Normal',   statusColor: 'positive' },
  { id: 7, title: 'ETA Norte — Filtro',  subtitle: 'Manutenção preventiva em atraso',    icon: 'warning',    status: 'Crítico',  statusColor: 'negative' },
  { id: 8, title: 'Poço P-12',           subtitle: 'Captação subterrânea · Nível OK',    icon: 'water_drop', status: 'Normal',   statusColor: 'positive' },
]

// ── Componentes Contextuais — estado reativo ────────────────────────────────

// DssVirtualScroll — 150 itens virtualizados sem Math.random (evita warnings de hidratação)
const ctxVirtualItems = Array.from({ length: 150 }, (_, i) => ({
  id:     i + 1,
  label:  `Sensor ${String(i + 1).padStart(3, '0')} — ${['ZN', 'ZS', 'ZL', 'ZO'][i % 4]}-${String(1000 + (i * 37) % 8999).padStart(4, '0')}`,
  status: i % 7 === 0 ? 'Alerta' : 'OK',
}))

// DssInfiniteScroll — paginação incremental (max 12 itens, batches de 4)
const CTX_INF_POOL = [
  { id:  1, name: 'Ana Ferreira',     role: 'Operadora de campo',    initials: 'AF', color: 'primary'  },
  { id:  2, name: 'Bruno Melo',       role: 'Engenheiro sênior',     initials: 'BM', color: 'secondary' },
  { id:  3, name: 'Carla Dias',       role: 'Analista de dados',     initials: 'CD', color: 'accent'   },
  { id:  4, name: 'Diego Santos',     role: 'Técnico de campo',      initials: 'DS', color: 'positive' },
  { id:  5, name: 'Elisa Cunha',      role: 'Coordenadora TI',       initials: 'EC', color: 'warning'  },
  { id:  6, name: 'Felipe Rocha',     role: 'Gestor de projetos',    initials: 'FR', color: 'info'     },
  { id:  7, name: 'Gabriela Lima',    role: 'Supervisora operações', initials: 'GL', color: 'primary'  },
  { id:  8, name: 'Hugo Alves',       role: 'Técnico de TI',         initials: 'HA', color: 'secondary' },
  { id:  9, name: 'Isabela Torres',   role: 'Analista de suporte',   initials: 'IT', color: 'accent'   },
  { id: 10, name: 'João Barbosa',     role: 'Operador de sistemas',  initials: 'JB', color: 'positive' },
  { id: 11, name: 'Karen Oliveira',   role: 'Gestora de qualidade',  initials: 'KO', color: 'warning'  },
  { id: 12, name: 'Lucas Pinto',      role: 'Dev frontend',          initials: 'LP', color: 'info'     },
]
const ctxInfiniteItems = ref(CTX_INF_POOL.slice(0, 4))

function onCtxInfiniteLoad(_index: number, done: (stop?: boolean) => void) {
  const loaded = ctxInfiniteItems.value.length
  const next   = CTX_INF_POOL.slice(loaded, loaded + 4)
  if (next.length === 0) { done(true); return }
  ctxInfiniteItems.value = [...ctxInfiniteItems.value, ...next]
  done(loaded + next.length >= CTX_INF_POOL.length)
}

// DssPullToRefresh — lista rotativa (6 eventos, exibe janela de 4)
const CTX_PTR_POOL = [
  { id: 1, title: 'Hidrômetro ZN-0032 — leitura concluída',  time: 'Agora mesmo', status: 'Normal',   color: 'positive' },
  { id: 2, title: 'Bomba B-07 — pressão normalizada',         time: 'há 2 min',    status: 'Normal',   color: 'positive' },
  { id: 3, title: 'Sensor S-101 — alerta de vazão',           time: 'há 5 min',    status: 'Alerta',   color: 'warning'  },
  { id: 4, title: 'ETA Norte — filtro #3 trocado',            time: 'há 12 min',   status: 'OK',       color: 'positive' },
  { id: 5, title: 'Válvula V-09 — manutenção iniciada',       time: 'há 20 min',   status: 'Pendente', color: 'warning'  },
  { id: 6, title: 'Reservatório R-02 — nível crítico',        time: 'há 28 min',   status: 'Crítico',  color: 'negative' },
]
const ctxPullItems = ref(CTX_PTR_POOL.slice(0, 4))
let _ptrShift = 0

function onCtxPullRefresh(done: () => void) {
  setTimeout(() => {
    _ptrShift = (_ptrShift + 1) % CTX_PTR_POOL.length
    ctxPullItems.value = [
      CTX_PTR_POOL[_ptrShift         % CTX_PTR_POOL.length],
      CTX_PTR_POOL[(_ptrShift + 1)   % CTX_PTR_POOL.length],
      CTX_PTR_POOL[(_ptrShift + 2)   % CTX_PTR_POOL.length],
      CTX_PTR_POOL[(_ptrShift + 3)   % CTX_PTR_POOL.length],
    ]
    done()
  }, 800)
}

// DssField
const ctxFieldValue = ref('')

// DssAjaxBar — controle manual via defineExpose (EXC-Expose-01)
const ctxAjaxBarRef = ref<{ start: (speed?: number) => void; stop: () => void } | null>(null)
const ctxAjaxRunning = ref(false)
let _ajaxTimer: ReturnType<typeof setTimeout> | null = null

function startCtxAjaxBar() {
  if (ctxAjaxRunning.value) return
  ctxAjaxRunning.value = true
  ctxAjaxBarRef.value?.start()
  _ajaxTimer = setTimeout(() => {
    ctxAjaxBarRef.value?.stop()
    ctxAjaxRunning.value = false
  }, 3000)
}

function stopCtxAjaxBar() {
  if (_ajaxTimer) { clearTimeout(_ajaxTimer); _ajaxTimer = null }
  ctxAjaxBarRef.value?.stop()
  ctxAjaxRunning.value = false
}
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

/* ── Brand nav ───────────────────────────────────────────────────────────── */
.brand-nav {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-1);
}

.brand-nav__label {
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  color: var(--dss-text-subtle);
  margin-right: var(--dss-spacing-1);
}

/* brand-chip: DssChip como seletor de brand — sobrescreve cor de seleção por brand */
.brand-chip--hub.dss-chip--selected    { --q-color-primary: var(--dss-hub-600); }
.brand-chip--water.dss-chip--selected  { --q-color-primary: var(--dss-water-500); }
.brand-chip--waste.dss-chip--selected  { --q-color-primary: var(--dss-waste-600); }
.brand-chip--none.dss-chip--selected   { --q-color-primary: var(--dss-gray-700); }

/* ── Conteúdo principal ──────────────────────────────────────────────────── */
.preview-main {
  flex: 1;
  overflow-y: auto;
  /* Dual-fallback: inspector var → DSS token. Em produção sempre usa o token. */
  padding: var(--dss-layout-padding-y, var(--dss-spacing-4)) var(--dss-layout-padding-x, var(--dss-spacing-4));
}

/* __body: controla max-width e centralização via inspector */
.preview__body {
  max-width: var(--dss-layout-max-width, 100%);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  /* SEM container-type: inline-size — evita travar DssAjaxBar (position:fixed) na seção 15 */
}

/* __sections: flex coluna com gap controlado pelo inspector */
.preview__sections {
  display: flex;
  flex-direction: column;
  gap: var(--dss-layout-gap-y, var(--dss-spacing-4));
  /* Margin lateral controlada pelo inspector */
  margin: 0 var(--dss-layout-margin-x, 0);
}

/* ── Grupo (card wrapper) ────────────────────────────────────────────────── */
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

/* ── Grid de demos ───────────────────────────────────────────────────────── */
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  /* Dual-fallback: var de elemento (inspector) → token DSS */
  gap: var(--dss-layout-gap-x, var(--dss-spacing-4));
}

.demo-grid--wide {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--dss-layout-gap-x, var(--dss-spacing-4));
}

/* ── Célula de demo ──────────────────────────────────────────────────────── */
.demo-cell {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  min-width: 0;
}

.demo-cell--full {
  grid-column: 1 / -1;
}

/* ── Demo box ────────────────────────────────────────────────────────────── */
.demo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 72px;
  /* Dual-fallback: var de elemento (inspector) → token DSS */
  padding: var(--dss-layout-padding-y, var(--dss-spacing-3)) var(--dss-layout-padding-x, var(--dss-spacing-3));
  background-color: var(--dss-surface-default);
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  box-sizing: border-box;
}

/* Filhos não são esticados pelo flex pai — respeita dimensões naturais */
.demo-box > * {
  min-width: 0;
  flex-shrink: 0;
}

/* Estira para ocupar largura total da célula */
.demo-box--stretch {
  width: 100%;
  justify-content: flex-start;
}

/* Organiza filhos em coluna */
.demo-box--col {
  flex-direction: column;
  align-items: stretch;
  gap: var(--dss-spacing-3);
}

.demo-box--col > * {
  flex-shrink: unset;
}

/* Exibe estados lado a lado com gap */
.demo-box--gap {
  gap: var(--dss-spacing-3);
}

/* Alinha filhos pelo topo (timeline, tree, skeleton) */
.demo-box--start {
  align-items: flex-start;
}

/* Row de estados: repouso + marcado / off + on */
.demo-box--states {
  flex-direction: column;
  align-items: flex-start;
  gap: var(--dss-spacing-3);
  justify-content: flex-start;
}

/* Inline (DssSpace demo) */
.demo-box--inline {
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0;
}

/* Relativo para overlays */
.demo-box--relative {
  position: relative;
  min-height: 88px;
}

/* Fab: precisa de espaço para o botão expandido */
.demo-box--fab {
  min-height: 88px;
  position: relative;
  align-items: flex-end;
  justify-content: flex-start;
}

/* Remove padding interno para componentes que tem borda própria (tabs, etc.) */
.demo-box--flush {
  padding: 0;
  overflow: hidden;
}

/* Campo de formulário ocupa toda a largura da caixa */
.demo-field {
  width: 100%;
}

/* ── Label do componente ─────────────────────────────────────────────────── */
.demo-label {
  display: inline-block;
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  font-family: monospace;
  color: var(--dss-text-subtle);
  background-color: var(--dss-gray-100);
  padding: 2px var(--dss-spacing-2);
  border-radius: var(--dss-radius-sm);
  line-height: var(--dss-line-height-normal);
}

/* ── Nota (componente sem estado visual) ─────────────────────────────────── */
.demo-note {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  font-style: italic;
  text-align: center;
  line-height: var(--dss-line-height-normal);
  padding: var(--dss-spacing-1) var(--dss-spacing-2);
}

/* ── Tab panel ───────────────────────────────────────────────────────────── */
.tab-panel-content {
  padding: var(--dss-spacing-3);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
}

/* ── Stepper controls ────────────────────────────────────────────────────── */
.stepper-controls {
  display: flex;
  gap: var(--dss-spacing-2);
  justify-content: flex-end;
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
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
  user-select: none;
}

/* ── Lista ───────────────────────────────────────────────────────────────── */
.list-sample {
  width: 100%;
  border-radius: var(--dss-radius-md);
}

/* ── Card interno (no demo do DssCard) ───────────────────────────────────── */
.card-sample {
  min-width: 160px;
}

.card-desc {
  margin: var(--dss-spacing-1) 0 0;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  line-height: var(--dss-line-height-normal);
}

/* ── Img ─────────────────────────────────────────────────────────────────── */
.img-sample {
  width: 240px;
  height: 140px;
  border-radius: var(--dss-radius-md);
  object-fit: cover;
}

/* ── ScrollArea ──────────────────────────────────────────────────────────── */
.scroll-sample {
  width: 100%;
  height: 136px;
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
}

.scroll-row {
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  border-bottom: 1px solid var(--dss-gray-100);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
  line-height: var(--dss-line-height-normal);
  white-space: nowrap;
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

/* ── Layout Estrutural — mini-app frame ─────────────────────────────────── */
.layout-section-intro {
  padding-bottom: 0;
}

.layout-section-frame {
  padding-top: var(--dss-spacing-3);
}

.layout-app-frame {
  width: 100%;
  height: 560px;
  border: 1px solid var(--dss-gray-200);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
  position: relative;
  background: var(--dss-surface-default);
}

.layout-dss {
  width: 100% !important;
  height: 100% !important;
}

.layout-drawer-header {
  background: var(--dss-surface-muted);
  min-height: 49px;
}

.layout-drawer-title {
  font-size: var(--dss-font-size-sm) !important;
  font-weight: var(--dss-font-weight-semibold);
}

.layout-page-header {
  margin-bottom: var(--dss-spacing-4);
}

.layout-page-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--dss-spacing-3);
  margin-top: var(--dss-spacing-2);
}

.layout-page-title {
  margin: 0;
  font-size: var(--dss-font-size-xl);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  line-height: var(--dss-line-height-tight);
}

.layout-stats-row {
  display: flex;
  gap: var(--dss-spacing-3);
  margin-bottom: var(--dss-spacing-4);
  flex-wrap: wrap;
}

.layout-stat-card {
  flex: 1;
  min-width: 100px;
}

.layout-stat-content {
  display: flex !important;
  align-items: center;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-3) !important;
}

.layout-stat-value {
  font-size: var(--dss-font-size-xl);
  font-weight: var(--dss-font-weight-bold);
  color: var(--dss-text-body);
  line-height: 1;
}

.layout-stat-label {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
  margin-top: var(--dss-spacing-1);
}

.layout-records-list {
  border-radius: var(--dss-radius-sm);
}

.layout-footer-text {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

/* ── Relatório de implementação ─────────────────────────────────────────── */
.layout-report {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

.layout-report__title {
  font-size: var(--dss-font-size-sm);
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
}

.layout-report__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--dss-spacing-2);
}

.layout-report__item {
  display: flex;
  align-items: flex-start;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  border-radius: var(--dss-radius-sm);
  font-size: var(--dss-font-size-xs);
  line-height: var(--dss-line-height-normal);
  border-left: var(--dss-border-width-thick) solid transparent;
}

.layout-report__item strong {
  display: block;
  font-weight: var(--dss-font-weight-semibold);
  color: var(--dss-text-body);
  margin-bottom: var(--dss-spacing-0_5);
}

.layout-report__item span {
  color: var(--dss-text-subtle);
}

.layout-report__item--ok {
  background: var(--dss-surface-muted);
  border-left-color: var(--dss-feedback-success);
}

.layout-report__item--warn {
  background: var(--dss-surface-muted);
  border-left-color: var(--dss-feedback-warning);
}

.report-icon--ok {
  color: var(--dss-feedback-success);
  flex-shrink: 0;
  margin-top: var(--dss-spacing-px);
}

.report-icon--warn {
  color: var(--dss-feedback-warning);
  flex-shrink: 0;
  margin-top: var(--dss-spacing-px);
}

/* ── Contextuais — espaço acima do relatório ──────────────────────────────── */
.ctx-report {
  margin-top: var(--dss-spacing-5);
}

/* ── DssVirtualScroll ────────────────────────────────────────────────────── */
.ctx-vs-box {
  padding: 0;
  overflow: hidden;
}
.ctx-vs-list {
  width: 100%;
  height: 220px;
}
.ctx-vs-item {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  padding: 0 var(--dss-spacing-3);
  border-bottom: 1px solid var(--dss-gray-100);
  height: 36px;
  box-sizing: border-box;
}
.ctx-vs-icon {
  color: var(--dss-text-subtle);
  font-size: var(--dss-icon-size-xs) !important;
  flex-shrink: 0;
}
.ctx-vs-text {
  flex: 1;
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-body);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── DssInfiniteScroll ───────────────────────────────────────────────────── */
.ctx-inf-box {
  padding: 0;
  overflow: hidden;
}
.ctx-inf-wrapper {
  width: 100%;
  height: 240px;
  overflow-y: auto;
}
.ctx-inf-end {
  text-align: center;
  padding: var(--dss-spacing-3);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

/* ── DssParallax ─────────────────────────────────────────────────────────── */
.ctx-parallax-box {
  padding: 0;
  overflow: hidden;
}
.ctx-parallax {
  width: 100%;
}
.ctx-parallax-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  background: var(--dss-overlay-dark-medium);
  gap: var(--dss-spacing-1);
  padding: var(--dss-spacing-4);
}
.ctx-parallax-title {
  font-size: var(--dss-font-size-xl);
  font-weight: var(--dss-font-weight-bold);
  color: white;
  line-height: var(--dss-line-height-tight);
}
.ctx-parallax-sub {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-overlay-text-on-dark);
  text-align: center;
}

/* ── DssVideo ────────────────────────────────────────────────────────────── */
.ctx-video-box {
  padding: 0;
  overflow: hidden;
}
.ctx-video {
  width: 100%;
  border-radius: var(--dss-radius-md);
  overflow: hidden;
}

/* ── DssPullToRefresh ────────────────────────────────────────────────────── */
.ctx-pull-box {
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  gap: 0;
}
.ctx-pull-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--dss-spacing-1);
  padding: var(--dss-spacing-2) var(--dss-spacing-3);
  background: var(--dss-surface-muted);
  border-bottom: 1px solid var(--dss-gray-200);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}
.ctx-pull-icon {
  font-size: var(--dss-icon-size-xs) !important;
  color: var(--dss-text-subtle);
  flex-shrink: 0;
}
.ctx-pull-list {
  width: 100%;
}

/* ── DssField ────────────────────────────────────────────────────────────── */
.ctx-field-row {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
  width: 100%;
}
.ctx-field {
  width: 100%;
}
.ctx-field-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  padding: var(--dss-spacing-2) 0;
  line-height: var(--dss-line-height-normal);
}
.ctx-field-input--error {
  color: var(--dss-feedback-error);
}

/* ── DssResponsive ───────────────────────────────────────────────────────── */
.ctx-responsive-row {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  flex-wrap: wrap;
}
.ctx-responsive-row + .ctx-responsive-row {
  margin-top: var(--dss-spacing-2);
}
.ctx-responsive-label {
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-subtle);
  white-space: nowrap;
}

/* ── DssAjaxBar ──────────────────────────────────────────────────────────── */
.ctx-ajax-controls {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  flex-wrap: wrap;
}
.ctx-ajax-badge {
  margin-left: auto;
}
</style>
