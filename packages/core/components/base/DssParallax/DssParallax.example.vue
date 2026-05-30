<script setup lang="ts">
import { ref } from 'vue'
import DssParallax from './DssParallax.vue'

// Imagem de demonstração pública (Unsplash — sem restrições)
const heroSrc = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80'
const citySrc  = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80'
const seaSrc   = 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80'

const heroHeight = ref(400)
const heroSpeed  = ref(0.5)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 32px;">

    <!-- ─── Cenário 1: Hero com overlay de texto ─────────────────────────── -->
    <section>
      <h3 style="margin-bottom: 8px;">1. Hero com overlay de texto</h3>
      <p style="margin-bottom: 16px; font-size: 14px; color: #666;">
        Uso mais comum: paralaxe como fundo de seção hero com conteúdo sobreposto.
      </p>
      <dss-parallax
        :src="heroSrc"
        :height="heroHeight"
        :speed="heroSpeed"
        alt="Vista panorâmica de montanhas cobertas de neve ao amanhecer"
      >
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 32px;">
          <h2 class="text-white text-h4" style="text-shadow: 0 2px 8px rgba(0,0,0,0.5);">
            Título de destaque
          </h2>
          <q-btn color="white" text-color="dark" label="Saiba mais" unelevated />
        </div>
      </dss-parallax>

      <div style="display: flex; gap: 24px; margin-top: 12px; align-items: center;">
        <label style="font-size: 14px;">
          Altura: {{ heroHeight }}px
          <input v-model.number="heroHeight" type="range" min="200" max="600" step="50" />
        </label>
        <label style="font-size: 14px;">
          Velocidade: {{ heroSpeed }}
          <input v-model.number="heroSpeed" type="range" min="0" max="1" step="0.1" />
        </label>
      </div>
    </section>

    <!-- ─── Cenário 2: Decorativo (sem alt text) ─────────────────────────── -->
    <section>
      <h3 style="margin-bottom: 8px;">2. Uso decorativo</h3>
      <p style="margin-bottom: 16px; font-size: 14px; color: #666;">
        Paralaxe puramente decorativa — sem conteúdo semântico na imagem de fundo.
        Use <code>:decorative="true"</code> para comunicar a intenção.
      </p>
      <dss-parallax
        :src="citySrc"
        :height="300"
        :speed="0.3"
        :decorative="true"
      >
        <q-card class="q-pa-lg" style="max-width: 400px; text-align: center;">
          <q-card-section>
            <div class="text-h6">Destaque de produto</div>
            <div class="text-body2 q-mt-sm text-grey-7">
              O efeito de paralaxe enriquece a apresentação visual sem comprometer a acessibilidade.
            </div>
          </q-card-section>
        </q-card>
      </dss-parallax>
    </section>

    <!-- ─── Cenário 3: Slot vazio (fundo puro) ─────────────────────────── -->
    <section>
      <h3 style="margin-bottom: 8px;">3. Sem overlay (fundo puro)</h3>
      <p style="margin-bottom: 16px; font-size: 14px; color: #666;">
        Paralaxe sem conteúdo de slot — usada como divisor visual entre seções de página.
      </p>
      <dss-parallax
        :src="seaSrc"
        :height="200"
        :speed="0.7"
        alt="Vista do oceano com ondas quebrando na orla"
      />
    </section>

    <!-- ─── Cenário 4: Brand Hub ─────────────────────────────────────────── -->
    <section data-brand="hub">
      <h3 style="margin-bottom: 8px;">4. Contexto Brand Hub</h3>
      <p style="margin-bottom: 16px; font-size: 14px; color: #666;">
        O componente é agnóstico de brand — a identidade do Hub é aplicada
        nos componentes filhos dentro do slot.
      </p>
      <dss-parallax
        :src="heroSrc"
        :height="280"
        :speed="0.4"
        alt="Cenário de montanhas — seção hero do produto Hub"
      >
        <div style="display: flex; gap: 12px;">
          <q-btn color="primary" label="Ação primária" />
          <q-btn color="primary" outline label="Ação secundária" />
        </div>
      </dss-parallax>
    </section>

  </div>
</template>
