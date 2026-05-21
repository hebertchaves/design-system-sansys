<script setup lang="ts">
import { ref } from 'vue'
import DssCarousel from './DssCarousel.vue'
import DssCarouselSlide from './DssCarouselSlide.vue'

// ─── Cenário 1: Default com paginação ────────────────────────────────────────
const slide1 = ref('first')

// ─── Cenário 2: Com setas + autoplay ─────────────────────────────────────────
const slide2 = ref('a')

// ─── Cenário 3: Brand Hub com thumbnails ─────────────────────────────────────
const slide3 = ref('img1')

// ─── Cenário 4: Galeria de imagens ───────────────────────────────────────────
const slide4 = ref('foto1')
const onSlideChange = (newSlide: string | number, oldSlide: string | number) => {
  console.log(`Slide: ${oldSlide} → ${newSlide}`)
}
</script>

<template>
  <div class="q-pa-md" style="display: flex; flex-direction: column; gap: var(--dss-spacing-8);">

    <!-- ─── Cenário 1: Padrão com pontos de paginação ──────────────────────── -->
    <section>
      <p class="text-subtitle2 q-mb-sm">1. Padrão — com pontos de paginação</p>
      <DssCarousel
        v-model="slide1"
        navigation
        height="200px"
        aria-label="Carrossel de destaque"
        style="width: 100%"
      >
        <DssCarouselSlide name="first">
          <div class="flex flex-center full-height full-width bg-primary text-white">
            <span class="text-h6">Slide 1</span>
          </div>
        </DssCarouselSlide>
        <DssCarouselSlide name="second">
          <div class="flex flex-center full-height full-width bg-secondary text-white">
            <span class="text-h6">Slide 2</span>
          </div>
        </DssCarouselSlide>
        <DssCarouselSlide name="third">
          <div class="flex flex-center full-height full-width bg-accent text-white">
            <span class="text-h6">Slide 3</span>
          </div>
        </DssCarouselSlide>
      </DssCarousel>
      <p class="text-caption q-mt-xs">Slide atual: {{ slide1 }}</p>
    </section>

    <!-- ─── Cenário 2: Setas + autoplay ───────────────────────────────────── -->
    <section>
      <p class="text-subtitle2 q-mb-sm">2. Com setas de navegação + autoplay (3s) + loop</p>
      <DssCarousel
        v-model="slide2"
        arrows
        navigation
        :autoplay="3000"
        infinite
        height="180px"
        aria-label="Destaques do produto com autoplay"
        style="width: 100%"
      >
        <DssCarouselSlide name="a">
          <div class="flex flex-center full-height full-width" style="background-color: var(--dss-surface-muted);">
            <span class="text-body1">Destaque A</span>
          </div>
        </DssCarouselSlide>
        <DssCarouselSlide name="b">
          <div class="flex flex-center full-height full-width" style="background-color: var(--dss-surface-subtle);">
            <span class="text-body1">Destaque B</span>
          </div>
        </DssCarouselSlide>
        <DssCarouselSlide name="c">
          <div class="flex flex-center full-height full-width" style="background-color: var(--dss-surface-default);">
            <span class="text-body1">Destaque C</span>
          </div>
        </DssCarouselSlide>
      </DssCarousel>
    </section>

    <!-- ─── Cenário 3: Brand Hub com thumbnails ───────────────────────────── -->
    <section data-brand="hub">
      <p class="text-subtitle2 q-mb-sm">3. Brand Hub — com thumbnails</p>
      <DssCarousel
        v-model="slide3"
        thumbnails
        arrows
        height="200px"
        aria-label="Galeria de imagens"
        style="width: 100%"
        @transition="onSlideChange"
      >
        <DssCarouselSlide
          name="img1"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
        />
        <DssCarouselSlide
          name="img2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        />
        <DssCarouselSlide
          name="img3"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
      </DssCarousel>
    </section>

    <!-- ─── Cenário 4: Conteúdo rico dentro dos slides ──────────────────────── -->
    <section>
      <p class="text-subtitle2 q-mb-sm">4. Conteúdo rico (DssCard dentro do slide)</p>
      <DssCarousel
        v-model="slide4"
        arrows
        navigation
        height="260px"
        aria-label="Depoimentos de clientes"
        style="width: 100%"
      >
        <DssCarouselSlide name="foto1">
          <q-card flat class="full-width full-height q-pa-md flex flex-center column">
            <q-avatar size="64px" color="primary" text-color="white" icon="person" />
            <p class="text-body1 q-mt-sm text-center">
              "O Design System agilizou muito nosso desenvolvimento."
            </p>
            <p class="text-caption" style="color: var(--dss-text-subtle);">— Ana Lima, Dev Frontend</p>
          </q-card>
        </DssCarouselSlide>
        <DssCarouselSlide name="foto2">
          <q-card flat class="full-width full-height q-pa-md flex flex-center column">
            <q-avatar size="64px" color="secondary" text-color="white" icon="person" />
            <p class="text-body1 q-mt-sm text-center">
              "A consistência visual melhorou significativamente."
            </p>
            <p class="text-caption" style="color: var(--dss-text-subtle);">— Carlos Melo, UX Designer</p>
          </q-card>
        </DssCarouselSlide>
      </DssCarousel>
    </section>

  </div>
</template>
