<template>
  <div class="dss-separator-examples">

    <!-- =====================================================================
         EXEMPLO 1 — Defaults (horizontal, thin, default color)
         ===================================================================== -->
    <section>
      <h3>1. Default (horizontal)</h3>
      <div style="padding: 16px; background: white;">
        <p>Parágrafo acima do separador</p>
        <DssSeparator />
        <p>Parágrafo abaixo do separador</p>
      </div>
    </section>

    <!-- =====================================================================
         EXEMPLO 2 — Cores semânticas
         ===================================================================== -->
    <section>
      <h3>2. Cores</h3>
      <div style="display: flex; flex-direction: column; gap: 8px; padding: 16px;">
        <DssSeparator color="subtle" />
        <span style="font-size: 12px;">subtle (gray-100)</span>

        <DssSeparator color="default" />
        <span style="font-size: 12px;">default (gray-200)</span>

        <DssSeparator color="strong" />
        <span style="font-size: 12px;">strong (gray-300)</span>

        <DssSeparator color="primary" />
        <span style="font-size: 12px;">primary</span>

        <DssSeparator color="secondary" />
        <span style="font-size: 12px;">secondary</span>
      </div>
    </section>

    <!-- =====================================================================
         EXEMPLO 3 — Espessuras
         ===================================================================== -->
    <section>
      <h3>3. Espessuras (size)</h3>
      <div style="display: flex; flex-direction: column; gap: 8px; padding: 16px;">
        <DssSeparator size="hairline" color="strong" />
        <span style="font-size: 12px;">hairline (0.5px)</span>

        <DssSeparator size="thin" />
        <span style="font-size: 12px;">thin — default (1px)</span>

        <DssSeparator size="md" />
        <span style="font-size: 12px;">md (2px)</span>

        <DssSeparator size="thick" color="primary" />
        <span style="font-size: 12px;">thick (3px)</span>
      </div>
    </section>

    <!-- =====================================================================
         EXEMPLO 4 — Orientação vertical
         ===================================================================== -->
    <section>
      <h3>4. Vertical</h3>
      <div style="display: flex; align-items: stretch; height: 48px; gap: 8px; padding: 16px;">
        <span>Esquerda</span>
        <DssSeparator vertical />
        <span>Centro</span>
        <DssSeparator vertical color="primary" size="md" />
        <span>Direita</span>
      </div>
    </section>

    <!-- =====================================================================
         EXEMPLO 5 — Spaced (margem ao redor)
         ===================================================================== -->
    <section>
      <h3>5. Spaced</h3>
      <div style="padding: 16px;">
        <p>Conteúdo acima</p>
        <DssSeparator spaced />
        <p>Conteúdo com respiro (16px acima e abaixo)</p>
        <DssSeparator spaced color="primary" />
        <p>Conteúdo abaixo</p>
      </div>
    </section>

    <!-- =====================================================================
         EXEMPLO 6 — Inset (indentação)
         ===================================================================== -->
    <section>
      <h3>6. Inset</h3>
      <div style="padding: 16px;">
        <DssSeparator :inset="true" />
        <span style="font-size: 12px;">inset=true (16px)</span>

        <DssSeparator inset="item" />
        <span style="font-size: 12px;">inset='item' (56px — alinha com texto de lista)</span>

        <DssSeparator inset="item-thumbnail" />
        <span style="font-size: 12px;">inset='item-thumbnail' (64px — alinha após avatar)</span>
      </div>
    </section>

    <!-- =====================================================================
         EXEMPLO 7 — Decorativo (aria-hidden)
         ===================================================================== -->
    <section>
      <h3>7. Decorativo (aria-hidden)</h3>
      <div style="padding: 16px;">
        <!--
          Quando o separador é puramente visual e não agrega semântica
          ao fluxo de leitura do screen reader, use aria-hidden="true".
        -->
        <DssSeparator aria-hidden="true" color="subtle" />
      </div>
    </section>

    <!-- =====================================================================
         EXEMPLO 8 — Brand context
         ===================================================================== -->
    <section>
      <h3>8. Brand context</h3>
      <div data-brand="hub" style="padding: 16px; background: #fff3e0;">
        <p>Contexto Hub (laranja)</p>
        <DssSeparator color="primary" />
      </div>
      <div data-brand="water" style="padding: 16px; background: #e3f2fd; margin-top: 8px;">
        <p>Contexto Water (azul)</p>
        <DssSeparator color="primary" />
      </div>
      <div data-brand="waste" style="padding: 16px; background: #e8f5e9; margin-top: 8px;">
        <p>Contexto Waste (verde)</p>
        <DssSeparator color="primary" />
      </div>
    </section>

  </div>
</template>

<script setup>
import DssSeparator from './DssSeparator.vue'
</script>
