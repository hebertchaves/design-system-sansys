<script setup lang="ts">
/**
 * DssPageScroller — Exemplos Interativos
 *
 * NOTA: .example.vue files são isentos de Token First e Gate de Composição
 * per DSS_IMPLEMENTATION_GUIDE.md policy (scaffolding context only).
 *
 * IMPORTANTE: DssPageScroller requer contexto DssLayout > DssPageContainer > DssPage
 * para funcionar corretamente. Os exemplos usam os wrappers DSS obrigatórios.
 */
import DssLayout from '../DssLayout/DssLayout.vue'
import DssPageContainer from '../DssPageContainer/DssPageContainer.vue'
import DssPage from '../DssPage/DssPage.vue'
import DssPageScroller from './DssPageScroller.vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">

    <!-- ============================================================
         Cenário 1: Padrão — Voltar ao Topo
         DssPageScroller com botão round no canto inferior direito.
         Aparece após 300px de scroll.
         ============================================================ -->
    <section>
      <h3>1. Padrão — Voltar ao Topo</h3>
      <p>Role a área abaixo para ver o botão aparecer após 300px.</p>

      <div style="position: relative; height: 400px; overflow-y: auto; border: 1px solid #ccc; border-radius: 8px;">
        <DssLayout view="hHh lpR fFf" style="min-height: 400px;">
          <DssPageContainer>
            <DssPage style="padding: 16px;">
              <DssPageScroller :scroll-offset="300" :duration="250">
                <q-btn
                  round
                  color="primary"
                  icon="keyboard_arrow_up"
                  aria-label="Voltar ao topo"
                />
              </DssPageScroller>

              <!-- Conteúdo longo para demonstrar scroll -->
              <div v-for="n in 20" :key="n" style="margin-bottom: 16px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
                <p>Parágrafo {{ n }} — Role para baixo para ver o botão aparecer.</p>
              </div>
            </DssPage>
          </DssPageContainer>
        </DssLayout>
      </div>
    </section>

    <!-- ============================================================
         Cenário 2: Reverse — Aparece ao rolar para cima
         DssPageScroller com reverse=true: visível ao rolar de volta
         ao topo, oculto ao rolar para baixo.
         ============================================================ -->
    <section>
      <h3>2. Reverse — Aparece ao rolar para cima</h3>
      <p>Role até o final, depois volte — o botão aparece ao rolar para cima.</p>

      <div style="position: relative; height: 400px; overflow-y: auto; border: 1px solid #ccc; border-radius: 8px;">
        <DssLayout view="hHh lpR fFf" style="min-height: 400px;">
          <DssPageContainer>
            <DssPage style="padding: 16px;">
              <DssPageScroller :scroll-offset="100" :duration="250" reverse>
                <q-btn
                  round
                  color="secondary"
                  icon="keyboard_arrow_down"
                  aria-label="Ir ao fim da página"
                />
              </DssPageScroller>

              <div v-for="n in 20" :key="n" style="margin-bottom: 16px; padding: 16px; background: #f0f4ff; border-radius: 4px;">
                <p>Parágrafo {{ n }} — Role até o final, depois volte.</p>
              </div>
            </DssPage>
          </DssPageContainer>
        </DssLayout>
      </div>
    </section>

    <!-- ============================================================
         Cenário 3: Custom Scroll Offset — Aparece rápido
         scroll-offset=200 faz o botão aparecer mais cedo.
         ============================================================ -->
    <section>
      <h3>3. Custom Scroll Offset (200px)</h3>
      <p>O botão aparece após apenas 200px de scroll — limiar reduzido.</p>

      <div style="position: relative; height: 400px; overflow-y: auto; border: 1px solid #ccc; border-radius: 8px;">
        <DssLayout view="hHh lpR fFf" style="min-height: 400px;">
          <DssPageContainer>
            <DssPage style="padding: 16px;">
              <DssPageScroller :scroll-offset="200" :duration="500" position="bottom-left">
                <q-btn
                  round
                  color="positive"
                  icon="vertical_align_top"
                  aria-label="Voltar ao topo"
                />
              </DssPageScroller>

              <div v-for="n in 20" :key="n" style="margin-bottom: 16px; padding: 16px; background: #f0fff4; border-radius: 4px;">
                <p>Parágrafo {{ n }} — Botão aparece após apenas 200px.</p>
              </div>
            </DssPage>
          </DssPageContainer>
        </DssLayout>
      </div>
    </section>

  </div>
</template>
