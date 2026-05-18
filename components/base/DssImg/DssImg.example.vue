<script setup lang="ts">
import { ref } from 'vue'
import DssImg from './DssImg.vue'

// URLs de exemplo (substituir por imagens reais do projeto)
const VALID_URL   = 'https://picsum.photos/seed/dss/800/600'
const BROKEN_URL  = 'https://broken.invalid/image.jpg'
const PLACEHOLDER = 'https://picsum.photos/seed/placeholder/80/60'
const PORTRAIT    = 'https://picsum.photos/seed/portrait/400/600'

// Controle de estado para Cenário 5
const currentSrc   = ref(VALID_URL)
const showBroken   = ref(false)
const loadCount    = ref(0)
const errorCount   = ref(0)

function toggleBroken() {
  showBroken.value = !showBroken.value
  currentSrc.value = showBroken.value ? BROKEN_URL : VALID_URL
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-8); padding: var(--dss-spacing-6);">

    <!-- ─── Cenário 1: Básico — ratio, fit, radius ─────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        1. Básico — proporção 16:9, radius md, fit cover (padrão)
      </h3>
      <div style="max-width: 480px;">
        <DssImg
          :src="VALID_URL"
          alt="Paisagem de exemplo para demonstrar o componente DssImg"
          :ratio="16/9"
          radius="md"
        />
      </div>
      <p style="color: var(--dss-text-subtle); margin-top: var(--dss-spacing-2);">
        lazy loading ativo. Role a página para acionar o carregamento.
      </p>
    </section>

    <!-- ─── Cenário 2: Variantes de radius ────────────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">2. Variantes de radius</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); flex-wrap: wrap; align-items: flex-start;">
        <div v-for="r in ['none', 'sm', 'md', 'lg', 'full']" :key="r" style="flex: 0 0 auto;">
          <p style="text-align: center; margin-bottom: var(--dss-spacing-2); color: var(--dss-text-subtle); font-size: 12px;">
            radius="{{ r }}"
          </p>
          <DssImg
            :src="PORTRAIT"
            :alt="`Exemplo com radius ${r}`"
            :ratio="1"
            :radius="r"
            style="width: 80px;"
          />
        </div>
      </div>
    </section>

    <!-- ─── Cenário 3: Estado de erro e fallback ───────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">3. Estado de erro — com e sem fallback</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); align-items: flex-start;">
        <div>
          <p style="margin-bottom: var(--dss-spacing-2); color: var(--dss-text-subtle);">
            Sem fallback → ícone broken_image
          </p>
          <DssImg
            :src="BROKEN_URL"
            alt="Imagem que falha ao carregar"
            :ratio="4/3"
            radius="sm"
            style="width: 200px;"
          />
        </div>
        <div>
          <p style="margin-bottom: var(--dss-spacing-2); color: var(--dss-text-subtle);">
            Com fallback-src → exibe imagem alternativa
          </p>
          <DssImg
            :src="BROKEN_URL"
            alt="Imagem com fallback"
            :ratio="4/3"
            radius="sm"
            :fallback-src="PLACEHOLDER"
            style="width: 200px;"
          />
        </div>
      </div>
    </section>

    <!-- ─── Cenário 4: Imagem decorativa e overlay ─────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">4. Overlay e imagem decorativa</h3>
      <div style="max-width: 400px;">
        <DssImg
          :src="VALID_URL"
          :decorative="true"
          :ratio="16/9"
          radius="lg"
          loading="eager"
        >
          <div style="
            position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
            display: flex; align-items: flex-end;
            padding: var(--dss-spacing-4);
          ">
            <span style="color: white; font-weight: bold;">Legenda sobre a imagem</span>
          </div>
        </DssImg>
      </div>
      <p style="color: var(--dss-text-subtle); margin-top: var(--dss-spacing-2);">
        `decorative=true` + slot default para overlay. `loading="eager"` para imagens above the fold.
      </p>
    </section>

    <!-- ─── Cenário 5: Eventos @load / @error ──────────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">5. Eventos @load / @error e troca de src</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); align-items: flex-start; flex-wrap: wrap;">
        <div style="flex: 0 0 240px;">
          <DssImg
            :src="currentSrc"
            alt="Imagem com monitoramento de eventos"
            :ratio="16/9"
            radius="md"
            :fallback-src="PLACEHOLDER"
            @load="loadCount++"
            @error="errorCount++"
          />
          <div style="margin-top: var(--dss-spacing-3); display: flex; gap: var(--dss-spacing-2);">
            <button
              style="padding: var(--dss-spacing-2) var(--dss-spacing-3); border-radius: var(--dss-radius-sm); border: 1px solid var(--dss-surface-disabled);"
              @click="toggleBroken"
            >
              {{ showBroken ? 'Restaurar src válida' : 'Quebrar src' }}
            </button>
          </div>
        </div>
        <div style="color: var(--dss-text-subtle);">
          <p>✅ @load disparado: <strong>{{ loadCount }}x</strong></p>
          <p>❌ @error disparado: <strong>{{ errorCount }}x</strong></p>
          <p>src atual: <code>{{ showBroken ? 'BROKEN' : 'VALID' }}</code></p>
        </div>
      </div>
    </section>

    <!-- ─── Cenário 6: Brand Hub ────────────────────────────────────────────── -->
    <section data-brand="hub">
      <h3 style="margin-bottom: var(--dss-spacing-3);">6. Brand Hub — ícone de erro usa cor hub</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); align-items: flex-start;">
        <div>
          <p style="margin-bottom: var(--dss-spacing-2); color: var(--dss-text-subtle);">Estado de erro em brand hub</p>
          <DssImg
            :src="BROKEN_URL"
            alt="Imagem em brand hub com erro"
            :ratio="4/3"
            radius="md"
            style="width: 180px;"
          />
        </div>
        <div>
          <p style="margin-bottom: var(--dss-spacing-2); color: var(--dss-text-subtle);">Imagem válida em brand hub</p>
          <DssImg
            :src="VALID_URL"
            alt="Imagem em brand hub"
            :ratio="4/3"
            radius="md"
            style="width: 180px;"
          />
        </div>
      </div>
    </section>

  </div>
</template>
