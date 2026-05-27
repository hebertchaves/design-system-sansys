<template>
  <div class="preview-page" :data-brand="activeBrand || undefined">

    <!-- HEADER FIXO -->
    <header class="preview-header">
      <DssToolbar>
        <DssToolbarTitle>Defaults Preview — DSS v2.2</DssToolbarTitle>
        <DssSpace />
        <nav class="brand-nav" aria-label="Seletor de brand">
          <span class="brand-nav__label">Brand</span>
          <button
            v-for="b in brands"
            :key="b.value"
            class="brand-pill"
            :class="[`brand-pill--${b.value || 'none'}`, { 'is-active': activeBrand === b.value }]"
            @click="activeBrand = b.value"
          >{{ b.label }}</button>
        </nav>
        <DssBadge class="q-ml-sm">76</DssBadge>
      </DssToolbar>
    </header>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="preview-main">

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 1. AÇÕES                                          -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard class="preview-group">
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
      <DssCard class="preview-group">
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
                <DssBadge color="positive">Novo</DssBadge>
                <DssBadge color="negative">!</DssBadge>
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
      <DssCard class="preview-group">
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
      <DssCard class="preview-group">
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
      <DssCard class="preview-group">
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
      <DssCard class="preview-group">
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
                  <span class="q-ml-sm">Conteúdo da barra de sistema — comunicado global</span>
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
      <DssCard class="preview-group">
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
      <DssCard class="preview-group">
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
      <DssCard class="preview-group">
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
      <DssCard class="preview-group">
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
      <DssCard class="preview-group">
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
      <DssCard class="preview-group">
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
      <DssCard class="preview-group">
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
      <!-- 14. LAYOUT ESTRUTURAL (requer contexto de app)    -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">14. Layout Estrutural</span>
          <span class="group-desc">Componentes que exigem contexto de aplicação completo — não renderizáveis isoladamente</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">
            <div v-for="comp in layoutComponents" :key="comp.name" class="demo-cell">
              <div class="demo-box">
                <span class="demo-note">{{ comp.note }}</span>
              </div>
              <code class="demo-label">{{ comp.name }}</code>
            </div>
          </div>
        </DssCardSection>
      </DssCard>

      <!-- ══════════════════════════════════════════════════ -->
      <!-- 15. COMPONENTES CONTEXTUAIS                       -->
      <!-- ══════════════════════════════════════════════════ -->
      <DssCard class="preview-group">
        <DssCardSection class="group-header">
          <span class="group-title">15. Componentes Contextuais</span>
          <span class="group-desc">Componentes que requerem interação, dados externos ou contexto específico para renderização</span>
        </DssCardSection>
        <DssSeparator />
        <DssCardSection>
          <div class="demo-grid demo-grid--wide">
            <div v-for="comp in contextualComponents" :key="comp.name" class="demo-cell">
              <div class="demo-box">
                <span class="demo-note">{{ comp.note }}</span>
              </div>
              <code class="demo-label">{{ comp.name }}</code>
            </div>
          </div>
        </DssCardSection>
      </DssCard>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

// ── Componentes estruturais ────────────────────────────────────────────────
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

// ── Componentes contextuais ────────────────────────────────────────────────
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

.brand-pill {
  padding: var(--dss-spacing-1) var(--dss-spacing-3);
  font-size: var(--dss-font-size-xs);
  font-weight: var(--dss-font-weight-medium);
  font-family: var(--dss-font-family-sans);
  border: 1px solid var(--dss-gray-300);
  border-radius: var(--dss-radius-full);
  background: transparent;
  color: var(--dss-text-subtle);
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  line-height: 1.4;
  white-space: nowrap;
}

.brand-pill:hover {
  background: var(--dss-surface-muted);
}

.brand-pill--hub.is-active    { background: var(--dss-hub-600);   border-color: var(--dss-hub-600);   color: white; }
.brand-pill--water.is-active  { background: var(--dss-water-500); border-color: var(--dss-water-500); color: white; }
.brand-pill--waste.is-active  { background: var(--dss-waste-600); border-color: var(--dss-waste-600); color: white; }
.brand-pill--none.is-active   { background: var(--dss-gray-700);  border-color: var(--dss-gray-700);  color: white; }

/* ── Conteúdo principal ──────────────────────────────────────────────────── */
.preview-main {
  flex: 1;
  overflow-y: auto;
  padding: var(--dss-spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-4);
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
  gap: var(--dss-spacing-4);
}

.demo-grid--wide {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
  padding: var(--dss-spacing-3);
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
</style>
