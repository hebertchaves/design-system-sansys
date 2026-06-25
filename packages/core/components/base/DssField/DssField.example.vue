<script setup lang="ts">
import { ref } from 'vue'
import { DssField } from './index'

const nome = ref('')
const email = ref('')
const telefone = ref('+55 11 9')
const descricao = ref('')
const hasEmailError = ref(false)
const ctxVal = ref('')
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 48px; padding: 32px; font-family: sans-serif; max-width: 800px;">

    <!-- Cenário 1: Outlined (padrão) — label flutuante com controle nativo -->
    <div style="display: flex; flex-direction: column; gap: 8px; width: 300px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Outlined — controle nativo</p>
      <DssField
        label="Nome completo"
        hint="Digite seu nome e sobrenome"
        :has-value="!!nome"
        brand="hub"
      >
        <template #default="{ fieldId }">
          <input
            :id="fieldId"
            v-model="nome"
            type="text"
            style="border: none; outline: none; background: transparent; width: 100%; font-size: 16px; padding-top: 20px; padding-bottom: 4px;"
          />
        </template>
      </DssField>
    </div>

    <!-- Cenário 2: Filled + Water -->
    <div style="display: flex; flex-direction: column; gap: 8px; width: 300px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Filled + brand water</p>
      <DssField
        variant="filled"
        label="Email"
        :error="hasEmailError"
        error-message="Email inválido. Use o formato nome@dominio.com"
        :has-value="!!email"
        brand="water"
      >
        <template #default="{ fieldId }">
          <input
            :id="fieldId"
            v-model="email"
            type="email"
            style="border: none; outline: none; background: transparent; width: 100%; font-size: 16px; padding-top: 20px; padding-bottom: 4px;"
            @blur="hasEmailError = email.length > 0 && !email.includes('@')"
          />
        </template>
        <template #append>
          <span style="font-size: 20px; cursor: pointer;" @click="hasEmailError = !hasEmailError">⚠</span>
        </template>
      </DssField>
    </div>

    <!-- Cenário 3: Outlined + stack-label + prefix/suffix -->
    <div style="display: flex; flex-direction: column; gap: 8px; width: 300px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Stack-label + prefix/suffix</p>
      <DssField
        label="Telefone"
        stack-label
        prefix="+55"
        suffix="BR"
        :has-value="!!telefone"
        brand="waste"
      >
        <template #default="{ fieldId }">
          <input
            :id="fieldId"
            v-model="telefone"
            type="tel"
            style="border: none; outline: none; background: transparent; width: 100%; font-size: 16px;"
          />
        </template>
      </DssField>
    </div>

    <!-- Cenário 4: Borderless — dentro de card -->
    <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; width: 300px; display: flex; flex-direction: column; gap: 8px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Borderless — em card</p>
      <DssField
        variant="borderless"
        label="Observações"
        hint="Máx. 200 caracteres"
        :has-value="!!descricao"
      >
        <template #default="{ fieldId }">
          <textarea
            :id="fieldId"
            v-model="descricao"
            rows="3"
            style="border: none; outline: none; background: transparent; width: 100%; resize: none; font-size: 16px; padding-top: 20px; font-family: inherit;"
          />
        </template>
      </DssField>
    </div>

    <!-- Cenário 5: Disabled -->
    <div style="display: flex; flex-direction: column; gap: 8px; width: 300px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Disabled</p>
      <DssField
        label="ID do registro"
        stack-label
        disable
        has-value
      >
        <template #default="{ fieldId }">
          <input
            :id="fieldId"
            value="USR-2026-00042"
            type="text"
            disabled
            style="border: none; outline: none; background: transparent; width: 100%; font-size: 16px;"
          />
        </template>
      </DssField>
    </div>

    <!-- Cenário 6: Standout + brand via contexto ancestral -->
    <div data-brand="waste" style="padding: 16px; background: #f5f5f5; border-radius: 8px; width: 300px; display: flex; flex-direction: column; gap: 8px;">
      <p style="margin: 0; font-size: 12px; color: #666;">Standout + [data-brand="waste"]</p>
      <DssField
        variant="standout"
        label="Pesquisa"
        :has-value="!!ctxVal"
      >
        <template #prepend>
          <span style="font-size: 20px;">🔍</span>
        </template>
        <template #default="{ fieldId }">
          <input
            :id="fieldId"
            v-model="ctxVal"
            type="search"
            style="border: none; outline: none; background: transparent; width: 100%; font-size: 16px; padding-top: 20px; padding-bottom: 4px;"
          />
        </template>
      </DssField>
    </div>

  </div>
</template>
