<template>
  <div class="debug-section">
    <h2>🔍 Debug: DssButton Color Application</h2>

    <!-- Test 1: Componente DssButton com color prop -->
    <div class="test-group">
      <h3>Test 1: DssButton com color="primary"</h3>
      <DssButton color="primary">Primary Button</DssButton>
      <div class="debug-info">
        <strong>Classes computadas:</strong> <code>{{ debugClasses }}</code>
      </div>
    </div>

    <!-- Test 2: Inspeção detalhada -->
    <div class="test-group">
      <h3>Test 2: Inspeção de Props</h3>
      <table class="debug-table">
        <tr>
          <td><strong>Prop color:</strong></td>
          <td><code>{{ testColor }}</code></td>
        </tr>
        <tr>
          <td><strong>Prop variant:</strong></td>
          <td><code>{{ testVariant }}</code></td>
        </tr>
        <tr>
          <td><strong>Classes esperadas:</strong></td>
          <td><code>bg-{{ testColor }} text-white</code></td>
        </tr>
      </table>
    </div>

    <!-- Test 3: Botões com diferentes cores -->
    <div class="test-group">
      <h3>Test 3: Todas as Cores Semânticas</h3>
      <div class="button-row">
        <DssButton color="primary">Primary</DssButton>
        <DssButton color="secondary">Secondary</DssButton>
        <DssButton color="tertiary">Tertiary</DssButton>
        <DssButton color="accent">Accent</DssButton>
        <DssButton color="positive">Positive</DssButton>
        <DssButton color="negative">Negative</DssButton>
        <DssButton color="warning">Warning</DssButton>
        <DssButton color="info">Info</DssButton>
      </div>
    </div>

    <!-- Test 4: Comparação com HTML puro -->
    <div class="test-group">
      <h3>Test 4: Comparação - Vue vs HTML Puro</h3>
      <div class="comparison">
        <div>
          <p><strong>DssButton (Vue):</strong></p>
          <DssButton color="primary">Vue Component</DssButton>
        </div>
        <div>
          <p><strong>HTML Puro:</strong></p>
          <button class="dss-button dss-button--elevated bg-primary text-white dss-button--md">
            HTML Puro
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DssButton } from '@sansys/design-system'

export default {
  name: 'DebugButton',

  components: {
    DssButton
  },

  data() {
    return {
      testColor: 'primary',
      testVariant: 'elevated'
    }
  },

  computed: {
    // Replicar a lógica do buttonClasses para debug
    debugClasses() {
      let colorClasses = '';
      if (this.testVariant === 'flat' || this.testVariant === 'outline') {
        colorClasses = `text-${this.testColor}`;
      } else {
        colorClasses = `bg-${this.testColor} text-white`;
      }

      return [
        'dss-button',
        `dss-button--${this.testVariant}`,
        colorClasses,
        `dss-button--md`
      ].join(' ');
    }
  },

  mounted() {
    console.log('=== DEBUG BUTTON ===');
    console.log('Color prop:', this.testColor);
    console.log('Variant prop:', this.testVariant);
    console.log('Expected classes:', this.debugClasses);

    // Inspecionar o primeiro botão DssButton
    this.$nextTick(() => {
      const button = this.$el.querySelector('.dss-button');
      if (button) {
        console.log('Actual button classes:', button.className);
        console.log('Computed styles:');
        const styles = window.getComputedStyle(button);
        console.log('  - background-color:', styles.backgroundColor);
        console.log('  - color:', styles.color);
      }
    });
  }
}
</script>

<style scoped>
.debug-section {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  margin-top: 0;
  color: #333;
}

.test-group {
  margin-bottom: 30px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

h3 {
  margin-top: 0;
  color: #555;
  font-size: 16px;
}

.debug-info {
  margin-top: 15px;
  padding: 10px;
  background: #fef3c7;
  border-radius: 4px;
  border: 1px solid #fbbf24;
}

.debug-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.debug-table td {
  padding: 8px;
  border: 1px solid #e5e7eb;
}

.debug-table code {
  background: white;
  padding: 2px 6px;
  border-radius: 3px;
  color: #be123c;
}

.button-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.comparison > div {
  padding: 15px;
  background: white;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
  color: #be123c;
}
</style>
