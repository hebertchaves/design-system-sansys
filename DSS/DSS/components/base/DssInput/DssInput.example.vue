<template>
  <div class="dss-input-examples">
    <h1>DssInput - Exemplos de Uso</h1>

    <!-- Example 1: Outlined (padrão) -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>1. Outlined Input (Padrão)</h2>
        <DssInput
          v-model="example1"
          variant="outlined"
          label="Nome completo"
          placeholder="Digite seu nome"
        />
        <p class="value">Valor: {{ example1 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 2: Filled -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>2. Filled Input</h2>
        <DssInput
          v-model="example2"
          variant="filled"
          label="Email"
          type="email"
          placeholder="exemplo@email.com"
        />
        <p class="value">Valor: {{ example2 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 3: Standout -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>3. Standout Input</h2>
        <DssInput
          v-model="example3"
          variant="standout"
          label="Buscar"
          placeholder="Digite para buscar..."
        />
        <p class="value">Valor: {{ example3 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 4: Borderless -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>4. Borderless Input</h2>
        <DssInput
          v-model="example4"
          variant="borderless"
          label="Comentário"
          placeholder="Adicione um comentário..."
        />
        <p class="value">Valor: {{ example4 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 5: With Hint -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>5. Input com Hint</h2>
        <DssInput
          v-model="example5"
          variant="outlined"
          label="Username"
          hint="Mínimo de 6 caracteres"
          placeholder="Escolha um username"
        />
        <p class="value">Valor: {{ example5 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 6: With Error -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>6. Input com Erro</h2>
        <DssInput
          v-model="example6"
          variant="outlined"
          label="CPF"
          :error="example6.length > 0 && example6.length < 11"
          error-message="CPF deve ter 11 dígitos"
          placeholder="000.000.000-00"
        />
        <p class="value">Valor: {{ example6 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 7: Dense -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>7. Input Dense (Compacto)</h2>
        <DssInput
          v-model="example7"
          variant="outlined"
          label="Código"
          dense
          placeholder="Digite o código"
        />
        <p class="value">Valor: {{ example7 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 8: Clearable -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>8. Input Clearable</h2>
        <DssInput
          v-model="example8"
          variant="filled"
          label="Pesquisa"
          clearable
          placeholder="Digite para pesquisar..."
        />
        <p class="value">Valor: {{ example8 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 9: With Prepend Icon -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>9. Input com Ícone (Prepend)</h2>
        <DssInput
          v-model="example9"
          variant="outlined"
          label="Telefone"
          placeholder="(00) 00000-0000"
        >
          <template #prepend>
            <span class="icon">📞</span>
          </template>
        </DssInput>
        <p class="value">Valor: {{ example9 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 10: With Append Icon (usando DssButton) -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>10. Input com Ícone (Append)</h2>
        <DssInput
          v-model="example10"
          variant="outlined"
          label="Senha"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Digite sua senha"
        >
          <template #append>
            <DssButton
              variant="flat"
              color="secondary"
              size="sm"
              icon-only
              round
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </DssButton>
          </template>
        </DssInput>
        <p class="value">Valor: {{ example10 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 11: Disabled -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>11. Input Disabled</h2>
        <DssInput
          v-model="example11"
          variant="outlined"
          label="Campo Desabilitado"
          disabled
          placeholder="Não editável"
        />
      </DssCardSection>
    </DssCard>

    <!-- Example 12: Readonly -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>12. Input Readonly</h2>
        <DssInput
          v-model="example12"
          variant="filled"
          label="Campo Somente Leitura"
          readonly
        />
      </DssCardSection>
    </DssCard>

    <!-- Example 13: Loading -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>13. Input Loading</h2>
        <DssInput
          v-model="example13"
          variant="outlined"
          label="Verificando..."
          loading
          placeholder="Aguarde..."
        />
      </DssCardSection>
    </DssCard>

    <!-- Example 14: Stack Label -->
    <DssCard variant="flat" class="example-card">
      <DssCardSection>
        <h2>14. Input com Label Empilhado</h2>
        <DssInput
          v-model="example14"
          variant="outlined"
          label="Endereço"
          stack-label
          placeholder="Rua, número, bairro"
        />
        <p class="value">Valor: {{ example14 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 15: Hub Brand -->
    <DssCard variant="outlined" brand="hub" class="example-card">
      <DssCardSection>
        <h2>15. Input com Brand Hub (Orange)</h2>
        <DssInput
          v-model="example15"
          variant="outlined"
          label="Hub Input"
          brand="hub"
          hint="Accent color laranja no focus"
          placeholder="Digite algo..."
        />
        <p class="value">Valor: {{ example15 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 16: Water Brand -->
    <DssCard variant="outlined" brand="water" class="example-card">
      <DssCardSection>
        <h2>16. Input com Brand Water (Blue)</h2>
        <DssInput
          v-model="example16"
          variant="filled"
          label="Water Input"
          brand="water"
          hint="Accent color azul no focus"
          placeholder="Digite algo..."
        />
        <p class="value">Valor: {{ example16 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 17: Waste Brand -->
    <DssCard variant="outlined" brand="waste" class="example-card">
      <DssCardSection>
        <h2>17. Input com Brand Waste (Green)</h2>
        <DssInput
          v-model="example17"
          variant="outlined"
          label="Waste Input"
          brand="waste"
          hint="Accent color verde no focus"
          placeholder="Digite algo..."
        />
        <p class="value">Valor: {{ example17 }}</p>
      </DssCardSection>
    </DssCard>

    <!-- Example 18: Complex (All Features) -->
    <DssCard variant="elevated" class="example-card">
      <DssCardSection>
        <h2>18. Input Complexo (Múltiplas Features)</h2>
        <DssInput
          v-model="example18"
          variant="outlined"
          label="Campo Avançado"
          placeholder="Digite aqui..."
          clearable
          :error="example18.length > 50"
          error-message="Limite de 50 caracteres excedido"
          hint="Máximo 50 caracteres"
        >
          <template #prepend>
            <span class="icon">✏️</span>
          </template>
          <template #append>
            <span class="char-count">{{ example18.length }}/50</span>
          </template>
        </DssInput>
        <p class="value">Valor: {{ example18 }}</p>
      </DssCardSection>
    </DssCard>
  </div>
</template>

<script>
import { DssInput } from './index.js'
import { DssCard, DssCardSection } from '../DssCard'
import { DssButton } from '../DssButton'

export default {
  name: 'DssInputExamples',

  components: {
    DssInput,
    DssCard,
    DssCardSection,
    DssButton
  },

  data() {
    return {
      example1: '',
      example2: '',
      example3: '',
      example4: '',
      example5: '',
      example6: '',
      example7: '',
      example8: 'Texto inicial',
      example9: '',
      example10: '',
      example11: 'Não pode editar',
      example12: 'Somente leitura',
      example13: '',
      example14: '',
      example15: '',
      example16: '',
      example17: '',
      example18: '',
      showPassword: false
    }
  }
}
</script>

<style scoped>
.dss-input-examples {
  padding: var(--dss-spacing-8);
  max-width: 800px;
  margin: 0 auto;
}

.example-card {
  margin-bottom: var(--dss-spacing-6);
}

h1 {
  font-size: var(--dss-font-size-2xl);
  margin-bottom: var(--dss-spacing-8);
  color: var(--dss-text-primary);
}

h2 {
  font-size: var(--dss-font-size-lg);
  margin-bottom: var(--dss-spacing-4);
  color: var(--dss-text-secondary);
}

.value {
  margin-top: var(--dss-spacing-2);
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
  font-family: monospace;
}

.icon {
  font-size: var(--dss-font-size-lg);
}

.char-count {
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-secondary);
}
</style>
