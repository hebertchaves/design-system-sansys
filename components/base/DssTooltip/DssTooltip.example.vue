<template>
  <div class="dss-tooltip-examples">
    <h1>DssTooltip - Exemplos Completos</h1>

    <!-- Uso Basico -->
    <section class="example-section">
      <h2>Uso Basico</h2>
      <p class="section-description">
        Tooltip com visibilidade controlada pelo elemento disparador.
        Associacao semantica via aria-describedby.
      </p>
      <div class="tooltip-row">
        <div class="tooltip-demo">
          <button
            class="demo-trigger"
            aria-describedby="basic-tip"
            @mouseenter="showBasic = true"
            @mouseleave="showBasic = false"
            @focus="showBasic = true"
            @blur="showBasic = false"
          >
            Passe o mouse
          </button>
          <DssTooltip
            id="basic-tip"
            :visible="showBasic"
            label="Informacao contextual"
          />
        </div>
      </div>
    </section>

    <!-- Cores Semanticas -->
    <section class="example-section">
      <h2>Cores Semanticas</h2>
      <div class="tooltip-row">
        <div class="tooltip-demo">
          <span class="color-label">dark (padrao)</span>
          <DssTooltip :visible="true" color="dark" label="Padrao" />
        </div>
        <div class="tooltip-demo">
          <span class="color-label">primary</span>
          <DssTooltip :visible="true" color="primary" label="Primary" />
        </div>
        <div class="tooltip-demo">
          <span class="color-label">secondary</span>
          <DssTooltip :visible="true" color="secondary" label="Secondary" />
        </div>
        <div class="tooltip-demo">
          <span class="color-label">accent</span>
          <DssTooltip :visible="true" color="accent" label="Accent" />
        </div>
      </div>
      <div class="tooltip-row">
        <div class="tooltip-demo">
          <span class="color-label">positive</span>
          <DssTooltip :visible="true" color="positive" label="Sucesso" />
        </div>
        <div class="tooltip-demo">
          <span class="color-label">negative</span>
          <DssTooltip :visible="true" color="negative" label="Erro" />
        </div>
        <div class="tooltip-demo">
          <span class="color-label">warning</span>
          <DssTooltip :visible="true" color="warning" label="Atencao" />
        </div>
        <div class="tooltip-demo">
          <span class="color-label">info</span>
          <DssTooltip :visible="true" color="info" label="Informacao" />
        </div>
      </div>
    </section>

    <!-- Multi-line -->
    <section class="example-section">
      <h2>Multi-line</h2>
      <p class="section-description">
        Tooltip com texto longo que quebra em multiplas linhas.
      </p>
      <div class="tooltip-row">
        <div class="tooltip-demo">
          <DssTooltip
            :visible="true"
            multi-line
            label="Esta funcionalidade permite configurar parametros avancados do sistema de forma segura."
          />
        </div>
      </div>
    </section>

    <!-- Com Slot -->
    <section class="example-section">
      <h2>Usando Slot Default</h2>
      <div class="tooltip-row">
        <div class="tooltip-demo">
          <DssTooltip :visible="true" color="dark">
            <strong>Importante:</strong> Campo obrigatorio
          </DssTooltip>
        </div>
        <div class="tooltip-demo">
          <DssTooltip :visible="true" color="info">
            Formato: DD/MM/AAAA
          </DssTooltip>
        </div>
      </div>
    </section>

    <!-- Brandabilidade -->
    <section class="example-section">
      <h2>Brandabilidade</h2>

      <h3>Hub (Laranja)</h3>
      <div class="tooltip-row">
        <DssTooltip brand="hub" :visible="true" label="Info Hub" />
      </div>

      <h3>Water (Azul)</h3>
      <div class="tooltip-row">
        <DssTooltip brand="water" :visible="true" label="Info Water" />
      </div>

      <h3>Waste (Verde)</h3>
      <div class="tooltip-row">
        <DssTooltip brand="waste" :visible="true" label="Info Waste" />
      </div>

      <h3>Via Contexto data-brand</h3>
      <div class="tooltip-row" data-brand="hub">
        <DssTooltip :visible="true" label="Herda brand Hub do contexto" />
      </div>
    </section>

    <!-- Exemplo Pratico: Campo de formulario -->
    <section class="example-section">
      <h2>Exemplo Pratico: Campo com Tooltip</h2>
      <div class="practical-example">
        <div class="field-wrapper">
          <label for="email-field">E-mail corporativo</label>
          <div class="input-with-tooltip">
            <input
              id="email-field"
              type="email"
              placeholder="nome@empresa.com.br"
              aria-describedby="email-tooltip"
              @focus="showEmailTip = true"
              @blur="showEmailTip = false"
            />
            <DssTooltip
              id="email-tooltip"
              :visible="showEmailTip"
              multi-line
              label="Use seu e-mail corporativo. E-mails pessoais nao sao aceitos."
              aria-label="Dica: use e-mail corporativo @empresa.com.br"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Exemplo Pratico: Icone com Tooltip -->
    <section class="example-section">
      <h2>Exemplo Pratico: Icone com Tooltip</h2>
      <div class="practical-example">
        <div class="icon-with-tooltip">
          <button
            class="icon-button"
            aria-describedby="icon-tooltip"
            @mouseenter="showIconTip = true"
            @mouseleave="showIconTip = false"
            @focus="showIconTip = true"
            @blur="showIconTip = false"
          >
            &#9432;
          </button>
          <DssTooltip
            id="icon-tooltip"
            :visible="showIconTip"
            color="info"
            label="Mais informacoes sobre este recurso"
          />
        </div>
      </div>
    </section>

    <!-- Acessibilidade -->
    <section class="example-section">
      <h2>Recursos de Acessibilidade</h2>
      <div class="accessibility-info">
        <ul>
          <li>role="tooltip" para leitores de tela</li>
          <li>Associacao via aria-describedby no disparador</li>
          <li>aria-label customizavel para contexto adicional</li>
          <li>Suporte a prefers-contrast: more</li>
          <li>Suporte a forced-colors (Windows High Contrast)</li>
          <li>Suporte a prefers-reduced-motion: reduce</li>
          <li>Oculto em impressao (@media print)</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import DssTooltip from './1-structure/DssTooltip.ts.vue'

export default {
  name: 'DssTooltipExamples',

  components: {
    DssTooltip
  },

  data() {
    return {
      showBasic: false,
      showEmailTip: false,
      showIconTip: false
    }
  }
}
</script>

<style lang="scss" scoped>
/* Importar estilos de showcase (apenas para exemplos) */
@import '../../../utils/example-showcase';

.dss-tooltip-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--dss-spacing-8, 32px);
  font-family: var(--dss-font-family-base, 'Inter', sans-serif);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: var(--dss-spacing-8, 32px);
  color: var(--dss-text-body);
}

h2 {
  font-size: 1.75rem;
  margin-top: var(--dss-spacing-8, 32px);
  margin-bottom: var(--dss-spacing-4, 16px);
  color: var(--dss-text-body);
  border-bottom: 2px solid var(--dss-border-default);
  padding-bottom: var(--dss-spacing-2, 8px);
}

h3 {
  font-size: 1.25rem;
  margin-top: var(--dss-spacing-6, 24px);
  margin-bottom: var(--dss-spacing-3, 12px);
  color: var(--dss-text-body);
}

.example-section {
  margin-bottom: var(--dss-spacing-10, 40px);
}

.section-description {
  color: var(--dss-text-subtle);
  margin-bottom: var(--dss-spacing-4, 16px);
}

.tooltip-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-6, 24px);
  margin-bottom: var(--dss-spacing-4, 16px);
  align-items: flex-start;
}

.tooltip-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dss-spacing-2, 8px);
  position: relative;
}

.color-label {
  font-size: 12px;
  color: var(--dss-text-subtle);
  font-family: monospace;
}

.demo-trigger {
  padding: var(--dss-spacing-2, 8px) var(--dss-spacing-4, 16px);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-input, 4px);
  background: var(--dss-surface-default);
  cursor: pointer;
  font-size: 14px;
}

.demo-trigger:hover {
  background: var(--dss-surface-subtle);
}

.practical-example {
  padding: var(--dss-spacing-6, 24px);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-card, 8px);
  background: var(--dss-surface-default);
  margin-bottom: var(--dss-spacing-4, 16px);
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2, 8px);
}

.field-wrapper label {
  font-weight: 500;
  color: var(--dss-text-body);
}

.input-with-tooltip {
  position: relative;
}

.input-with-tooltip input {
  width: 100%;
  padding: var(--dss-spacing-2, 8px) var(--dss-spacing-3, 12px);
  border: 1px solid var(--dss-border-default);
  border-radius: var(--dss-radius-input, 4px);
  font-size: 14px;
}

.icon-with-tooltip {
  position: relative;
  display: inline-block;
}

.icon-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--dss-border-default);
  background: var(--dss-surface-default);
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-button:hover {
  background: var(--dss-surface-subtle);
}

.accessibility-info {
  padding: var(--dss-spacing-6, 24px);
  background: var(--dss-surface-subtle);
  border-left: 4px solid var(--dss-action-primary);
  border-radius: var(--dss-radius-card, 8px);
}

.accessibility-info ul {
  margin: 0;
  padding-left: var(--dss-spacing-6, 24px);
}

.accessibility-info li {
  margin-bottom: var(--dss-spacing-2, 8px);
  color: var(--dss-text-body);
}
</style>
