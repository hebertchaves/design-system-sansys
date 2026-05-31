<template>
  <div class="dss-checkbox-examples">
    <!-- ================================================================== -->
    <!-- 1. BASIC USAGE -->
    <!-- ================================================================== -->
    <section>
      <h3>1. Basic Usage</h3>
      <DssCheckbox v-model="basic" label="Accept terms and conditions" />
      <p>Value: {{ basic }}</p>
    </section>

    <!-- ================================================================== -->
    <!-- 2. SIZES -->
    <!-- ================================================================== -->
    <section>
      <h3>2. Sizes</h3>
      <div style="display: flex; align-items: center; gap: 24px;">
        <DssCheckbox v-model="sizes.xs" size="xs" label="Extra Small" />
        <DssCheckbox v-model="sizes.sm" size="sm" label="Small" />
        <DssCheckbox v-model="sizes.md" size="md" label="Medium (default)" />
        <DssCheckbox v-model="sizes.lg" size="lg" label="Large" />
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- 3. COLORS -->
    <!-- ================================================================== -->
    <section>
      <h3>3. Semantic Colors</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        <DssCheckbox v-model="colors.primary" color="primary" label="Primary" />
        <DssCheckbox v-model="colors.secondary" color="secondary" label="Secondary" />
        <DssCheckbox v-model="colors.tertiary" color="tertiary" label="Tertiary" />
        <DssCheckbox v-model="colors.accent" color="accent" label="Accent" />
        <DssCheckbox v-model="colors.positive" color="positive" label="Positive" />
        <DssCheckbox v-model="colors.negative" color="negative" label="Negative" />
        <DssCheckbox v-model="colors.warning" color="warning" label="Warning" />
        <DssCheckbox v-model="colors.info" color="info" label="Info" />
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- 4. STATES -->
    <!-- ================================================================== -->
    <section>
      <h3>4. States</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        <DssCheckbox :model-value="false" label="Unchecked" />
        <DssCheckbox :model-value="true" label="Checked" />
        <DssCheckbox :model-value="null" label="Indeterminate" />
        <DssCheckbox :model-value="false" disable label="Disabled (unchecked)" />
        <DssCheckbox :model-value="true" disable label="Disabled (checked)" />
        <DssCheckbox :model-value="null" disable label="Disabled (indeterminate)" />
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- 5. LABEL POSITIONS -->
    <!-- ================================================================== -->
    <section>
      <h3>5. Label Positions</h3>
      <div style="display: flex; gap: 24px;">
        <DssCheckbox v-model="labelPos" label="Label on right (default)" />
        <DssCheckbox v-model="labelPos" left-label label="Label on left" />
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- 6. DENSE MODE -->
    <!-- ================================================================== -->
    <section>
      <h3>6. Dense Mode</h3>
      <div style="display: flex; gap: 16px;">
        <DssCheckbox v-model="denseVal" label="Normal" />
        <DssCheckbox v-model="denseVal" dense label="Dense" />
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- 7. THREE-STATE CYCLING -->
    <!-- ================================================================== -->
    <section>
      <h3>7. Three-State Cycling (toggleIndeterminate)</h3>
      <DssCheckbox
        v-model="triState"
        toggle-indeterminate
        label="Click to cycle: unchecked → checked → indeterminate"
      />
      <p>Value: {{ triState === null ? 'null (indeterminate)' : triState }}</p>
    </section>

    <!-- ================================================================== -->
    <!-- 8. GROUP MODE (Array Model) -->
    <!-- ================================================================== -->
    <section>
      <h3>8. Group Mode (Array Model)</h3>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <DssCheckbox v-model="fruits" val="apple" label="Apple" />
        <DssCheckbox v-model="fruits" val="banana" label="Banana" />
        <DssCheckbox v-model="fruits" val="cherry" label="Cherry" />
        <DssCheckbox v-model="fruits" val="date" label="Date" />
      </div>
      <p>Selected: {{ fruits.join(', ') || 'none' }}</p>
    </section>

    <!-- ================================================================== -->
    <!-- 9. CUSTOM VALUES -->
    <!-- ================================================================== -->
    <section>
      <h3>9. Custom Values</h3>
      <DssCheckbox
        v-model="customVal"
        true-value="yes"
        false-value="no"
        label="Custom true/false values"
      />
      <p>Value: "{{ customVal }}"</p>
    </section>

    <!-- ================================================================== -->
    <!-- 10. BRANDS -->
    <!-- ================================================================== -->
    <section>
      <h3>10. Brands</h3>

      <h4>Hub (Orange)</h4>
      <div data-brand="hub" style="display: flex; gap: 16px;">
        <DssCheckbox :model-value="true" brand="hub" color="primary" label="Primary" />
        <DssCheckbox :model-value="true" brand="hub" color="secondary" label="Secondary" />
        <DssCheckbox :model-value="true" brand="hub" color="accent" label="Accent" />
      </div>

      <h4>Water (Blue)</h4>
      <div data-brand="water" style="display: flex; gap: 16px;">
        <DssCheckbox :model-value="true" brand="water" color="primary" label="Primary" />
        <DssCheckbox :model-value="true" brand="water" color="secondary" label="Secondary" />
        <DssCheckbox :model-value="true" brand="water" color="accent" label="Accent" />
      </div>

      <h4>Waste (Green)</h4>
      <div data-brand="waste" style="display: flex; gap: 16px;">
        <DssCheckbox :model-value="true" brand="waste" color="primary" label="Primary" />
        <DssCheckbox :model-value="true" brand="waste" color="secondary" label="Secondary" />
        <DssCheckbox :model-value="true" brand="waste" color="accent" label="Accent" />
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- 11. ACCESSIBILITY -->
    <!-- ================================================================== -->
    <section>
      <h3>11. Accessibility</h3>
      <DssCheckbox
        v-model="a11yVal"
        aria-label="Enable notifications for this item"
        label="Notifications enabled"
      />
      <p>
        <em>Use Tab to navigate, Space to toggle. Focus ring visible on keyboard navigation.</em>
      </p>
    </section>

    <!-- ================================================================== -->
    <!-- 12. REAL-WORLD USE CASES -->
    <!-- ================================================================== -->
    <section>
      <h3>12. Real-World Use Cases</h3>

      <h4>Terms Acceptance</h4>
      <DssCheckbox
        v-model="terms"
        color="positive"
        label="I agree to the Terms of Service and Privacy Policy"
      />

      <h4>Feature Toggles</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <DssCheckbox v-model="features" val="darkMode" label="Dark Mode" />
        <DssCheckbox v-model="features" val="notifications" label="Push Notifications" />
        <DssCheckbox v-model="features" val="analytics" label="Usage Analytics" />
      </div>

      <h4>Settings Panel</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <DssCheckbox v-model="settings.autoSave" label="Auto-save documents" />
        <DssCheckbox v-model="settings.spellCheck" label="Enable spell check" />
        <DssCheckbox v-model="settings.darkMode" label="Dark mode" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * DssCheckbox - Example Showcase
 *
 * Demonstra todas as funcionalidades do DssCheckbox
 * com exemplos praticos e interativos.
 */
import { ref, reactive } from 'vue'
import DssCheckbox from './1-structure/DssCheckbox.ts.vue'

// 1. Basic
const basic = ref(false)

// 2. Sizes
const sizes = reactive({
  xs: true,
  sm: true,
  md: true,
  lg: true
})

// 3. Colors
const colors = reactive({
  primary: true,
  secondary: true,
  tertiary: true,
  accent: true,
  positive: true,
  negative: true,
  warning: true,
  info: true
})

// 5. Label position
const labelPos = ref(false)

// 6. Dense
const denseVal = ref(false)

// 7. Three-state
const triState = ref<boolean | null>(false)

// 8. Group mode
const fruits = ref<string[]>(['apple', 'cherry'])

// 9. Custom values
const customVal = ref('no')

// 11. Accessibility
const a11yVal = ref(false)

// 12. Real-world
const terms = ref(false)
const features = ref<string[]>([])
const settings = reactive({
  autoSave: true,
  spellCheck: false,
  darkMode: false
})
</script>

<style scoped>
.dss-checkbox-examples {
  padding: 24px;
  max-width: 800px;
}

.dss-checkbox-examples section {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
}

.dss-checkbox-examples h3 {
  margin-bottom: 16px;
  color: #333;
}

.dss-checkbox-examples h4 {
  margin: 12px 0 8px;
  color: #666;
  font-size: 14px;
}

.dss-checkbox-examples p {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}
</style>
