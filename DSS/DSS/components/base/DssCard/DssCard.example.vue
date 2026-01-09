<template>
  <div class="dss-card-examples">
    <h1>DssCard - Exemplos de Uso</h1>

    <!-- Example 1: Elevated Card (padrão) -->
    <section>
      <h2>1. Elevated Card (Padrão)</h2>
      <DssCard variant="elevated">
        <DssCardSection>
          <h3>Card Title</h3>
          <p>This is an elevated card with default elevation shadow.</p>
        </DssCardSection>
        <DssCardActions align="right">
          <DssButton color="secondary" variant="flat">Cancel</DssButton>
          <DssButton color="primary">OK</DssButton>
        </DssCardActions>
      </DssCard>
    </section>

    <!-- Example 2: Flat Card -->
    <section>
      <h2>2. Flat Card</h2>
      <DssCard variant="flat">
        <DssCardSection>
          <h3>Flat Card</h3>
          <p>No elevation, clean look.</p>
        </DssCardSection>
      </DssCard>
    </section>

    <!-- Example 3: Bordered Card -->
    <section>
      <h2>3. Bordered Card</h2>
      <DssCard variant="bordered">
        <DssCardSection>
          <h3>Bordered Card</h3>
          <p>Has both border and elevation.</p>
        </DssCardSection>
      </DssCard>
    </section>

    <!-- Example 4: Outlined Card -->
    <section>
      <h2>4. Outlined Card</h2>
      <DssCard variant="outlined">
        <DssCardSection>
          <h3>Outlined Card</h3>
          <p>Border only, no elevation.</p>
        </DssCardSection>
      </DssCard>
    </section>

    <!-- Example 5: Clickable Card -->
    <section>
      <h2>5. Clickable Card</h2>
      <DssCard variant="elevated" clickable @click="handleCardClick">
        <DssCardSection>
          <h3>Clickable Card</h3>
          <p>Hover to see elevation increase. Click to trigger event.</p>
        </DssCardSection>
      </DssCard>
    </section>

    <!-- Example 6: Square Card -->
    <section>
      <h2>6. Square Card</h2>
      <DssCard variant="elevated" square>
        <DssCardSection>
          <h3>Square Card</h3>
          <p>No border radius (square corners).</p>
        </DssCardSection>
      </DssCard>
    </section>

    <!-- Example 7: Horizontal Section -->
    <section>
      <h2>7. Horizontal Section</h2>
      <DssCard variant="elevated">
        <DssCardSection horizontal>
          <img src="https://via.placeholder.com/100" alt="Placeholder" />
          <div>
            <h3>Image Card</h3>
            <p>Horizontal layout with image.</p>
          </div>
        </DssCardSection>
      </DssCard>
    </section>

    <!-- Example 8: Brand Cards -->
    <section>
      <h2>8. Brand Cards</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <DssCard variant="outlined" brand="hub">
          <DssCardSection>
            <h3>Hub Card</h3>
            <p>Orange brand accent.</p>
          </DssCardSection>
        </DssCard>

        <DssCard variant="outlined" brand="water">
          <DssCardSection>
            <h3>Water Card</h3>
            <p>Blue brand accent.</p>
          </DssCardSection>
        </DssCard>

        <DssCard variant="outlined" brand="waste">
          <DssCardSection>
            <h3>Waste Card</h3>
            <p>Green brand accent.</p>
          </DssCardSection>
        </DssCard>
      </div>
    </section>

    <!-- Example 9: Complex Card -->
    <section>
      <h2>9. Complex Card (Multiple Sections)</h2>
      <DssCard variant="elevated">
        <DssCardSection>
          <h3>Card Header</h3>
        </DssCardSection>

        <DssCardSection>
          <p>Main content area with detailed information.</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </DssCardSection>

        <DssCardSection horizontal>
          <span>Status:</span>
          <strong>Active</strong>
        </DssCardSection>

        <DssCardActions align="between">
          <DssButton color="negative" variant="outline">Delete</DssButton>
          <div style="display: flex; gap: 8px;">
            <DssButton color="secondary" variant="flat">Cancel</DssButton>
            <DssButton color="primary">Save</DssButton>
          </div>
        </DssCardActions>
      </DssCard>
    </section>

    <!-- Example 10: Vertical Actions -->
    <section>
      <h2>10. Vertical Actions</h2>
      <DssCard variant="elevated">
        <DssCardSection>
          <h3>Menu Card</h3>
          <p>Actions in vertical layout.</p>
        </DssCardSection>
        <DssCardActions vertical align="left">
          <DssButton color="primary" variant="flat" style="justify-content: flex-start;">Option 1</DssButton>
          <DssButton color="primary" variant="flat" style="justify-content: flex-start;">Option 2</DssButton>
          <DssButton color="primary" variant="flat" style="justify-content: flex-start;">Option 3</DssButton>
        </DssCardActions>
      </DssCard>
    </section>
  </div>
</template>

<script>
import { DssCard, DssCardSection, DssCardActions } from './index.js'
import { DssButton } from '../DssButton'

export default {
  name: 'DssCardExamples',

  components: {
    DssCard,
    DssCardSection,
    DssCardActions,
    DssButton
  },

  methods: {
    handleCardClick() {
      alert('Card clicked!')
    }
  }
}
</script>

<style scoped>
.dss-card-examples {
  padding: var(--dss-spacing-8);
  max-width: 1200px;
  margin: 0 auto;
}

section {
  margin-bottom: var(--dss-spacing-12);
}

h1 {
  font-size: var(--dss-font-size-2xl);
  margin-bottom: var(--dss-spacing-8);
  color: var(--dss-text-primary);
}

h2 {
  font-size: var(--dss-font-size-xl);
  margin-bottom: var(--dss-spacing-4);
  color: var(--dss-text-secondary);
}
</style>
