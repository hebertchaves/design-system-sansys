<script setup lang="ts">
import DssVideo from './DssVideo.vue'

const YT_URL   = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
const YT_SHORT = 'https://www.youtube.com/embed/9bZkp7q19f0'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: var(--dss-spacing-8); padding: var(--dss-spacing-6);">

    <!-- ─── Cenário 1: Básico — ratio 16:9, sem radius ──────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">
        1. Básico — proporção 16:9, sem border-radius
      </h3>
      <div style="max-width: 560px;">
        <DssVideo
          :src="YT_URL"
          title="Vídeo de demonstração do componente DssVideo"
          :ratio="16/9"
        />
      </div>
    </section>

    <!-- ─── Cenário 2: Variantes de radius ────────────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">2. Variantes de radius</h3>
      <div style="display: flex; gap: var(--dss-spacing-4); flex-wrap: wrap; align-items: flex-start;">
        <div v-for="r in ['none', 'sm', 'md', 'lg']" :key="r" style="flex: 0 0 260px;">
          <p style="text-align: center; margin-bottom: var(--dss-spacing-2); color: var(--dss-text-subtle); font-size: 12px;">
            radius="{{ r }}"
          </p>
          <DssVideo
            :src="YT_SHORT"
            :title="`Exemplo com radius ${r}`"
            :ratio="16/9"
            :radius="r"
          />
        </div>
      </div>
    </section>

    <!-- ─── Cenário 3: Proporção 4:3 ──────────────────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">3. Proporção 4:3 com radius md</h3>
      <div style="max-width: 400px;">
        <DssVideo
          :src="YT_URL"
          title="Vídeo em proporção 4:3"
          :ratio="4/3"
          radius="md"
        />
      </div>
    </section>

    <!-- ─── Cenário 4: Decorativo com overlay ─────────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">4. Decorativo com overlay</h3>
      <div style="max-width: 480px;">
        <DssVideo
          :src="YT_URL"
          :decorative="true"
          :ratio="16/9"
          radius="lg"
        >
          <div style="
            position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
            display: flex; align-items: flex-end;
            padding: var(--dss-spacing-4);
          ">
            <span style="color: white; font-weight: bold;">Legenda sobre o vídeo</span>
          </div>
        </DssVideo>
      </div>
      <p style="color: var(--dss-text-subtle); margin-top: var(--dss-spacing-2);">
        `decorative=true` + slot default para overlay. Leitores de tela ignoram o iframe.
      </p>
    </section>

    <!-- ─── Cenário 5: fetchpriority via $attrs ───────────────────────────── -->
    <section>
      <h3 style="margin-bottom: var(--dss-spacing-3);">5. fetchpriority="high" para vídeos above the fold</h3>
      <div style="max-width: 480px;">
        <DssVideo
          :src="YT_URL"
          title="Vídeo principal above the fold"
          :ratio="16/9"
          radius="sm"
          fetchpriority="high"
        />
      </div>
      <p style="color: var(--dss-text-subtle); margin-top: var(--dss-spacing-2);">
        `fetchpriority="high"` flui via `$attrs` para o iframe do QVideo.
      </p>
    </section>

  </div>
</template>
