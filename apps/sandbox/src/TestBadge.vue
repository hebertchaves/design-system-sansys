<template>
  <div class="test-container">
    <header class="test-header">
      <h1>🏷️ DssBadge - Teste Completo de Variações</h1>
      <p>Todas as combinações possíveis de props, cores, tamanhos e estados</p>
    </header>

    <main class="test-content">
      <!-- ========== SEÇÃO 1: CORES PADRÃO ========== -->
      <section class="test-section">
        <h2>1. Cores Semânticas (8 variantes)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssBadge color="primary" label="Primary" />
            <code>color="primary"</code>
          </div>
          <div class="test-item">
            <DssBadge color="secondary" label="Secondary" />
            <code>color="secondary"</code>
          </div>
          <div class="test-item">
            <DssBadge color="tertiary" label="Tertiary" />
            <code>color="tertiary"</code>
          </div>
          <div class="test-item">
            <DssBadge color="accent" label="Accent" />
            <code>color="accent"</code>
          </div>
          <div class="test-item">
            <DssBadge color="positive" label="Positive" />
            <code>color="positive"</code>
          </div>
          <div class="test-item">
            <DssBadge color="negative" label="Negative" />
            <code>color="negative"</code>
          </div>
          <div class="test-item">
            <DssBadge color="warning" label="Warning" />
            <code>color="warning"</code>
          </div>
          <div class="test-item">
            <DssBadge color="info" label="Info" />
            <code>color="info"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 2: VARIANTE OUTLINE ========== -->
      <section class="test-section">
        <h2>2. Variante Outline (8 cores)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssBadge outline color="primary" label="Primary" />
            <code>outline color="primary"</code>
          </div>
          <div class="test-item">
            <DssBadge outline color="secondary" label="Secondary" />
            <code>outline color="secondary"</code>
          </div>
          <div class="test-item">
            <DssBadge outline color="tertiary" label="Tertiary" />
            <code>outline color="tertiary"</code>
          </div>
          <div class="test-item">
            <DssBadge outline color="accent" label="Accent" />
            <code>outline color="accent"</code>
          </div>
          <div class="test-item">
            <DssBadge outline color="positive" label="Positive" />
            <code>outline color="positive"</code>
          </div>
          <div class="test-item">
            <DssBadge outline color="negative" label="Negative" />
            <code>outline color="negative"</code>
          </div>
          <div class="test-item">
            <DssBadge outline color="warning" label="Warning" />
            <code>outline color="warning"</code>
          </div>
          <div class="test-item">
            <DssBadge outline color="info" label="Info" />
            <code>outline color="info"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 3: VARIANTE TRANSPARENT ========== -->
      <section class="test-section">
        <h2>3. Variante Transparent (8 cores)</h2>
        <div class="test-grid" style="background: #f0f0f0; padding: 20px; border-radius: 8px;">
          <div class="test-item">
            <DssBadge transparent color="primary" label="Primary" />
            <code>transparent color="primary"</code>
          </div>
          <div class="test-item">
            <DssBadge transparent color="secondary" label="Secondary" />
            <code>transparent color="secondary"</code>
          </div>
          <div class="test-item">
            <DssBadge transparent color="tertiary" label="Tertiary" />
            <code>transparent color="tertiary"</code>
          </div>
          <div class="test-item">
            <DssBadge transparent color="accent" label="Accent" />
            <code>transparent color="accent"</code>
          </div>
          <div class="test-item">
            <DssBadge transparent color="positive" label="Positive" />
            <code>transparent color="positive"</code>
          </div>
          <div class="test-item">
            <DssBadge transparent color="negative" label="Negative" />
            <code>transparent color="negative"</code>
          </div>
          <div class="test-item">
            <DssBadge transparent color="warning" label="Warning" />
            <code>transparent color="warning"</code>
          </div>
          <div class="test-item">
            <DssBadge transparent color="info" label="Info" />
            <code>transparent color="info"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 4: VARIANTE ROUNDED ========== -->
      <section class="test-section">
        <h2>4. Variante Rounded (8 cores)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssBadge rounded color="primary" label="Primary" />
            <code>rounded color="primary"</code>
          </div>
          <div class="test-item">
            <DssBadge rounded color="secondary" label="Secondary" />
            <code>rounded color="secondary"</code>
          </div>
          <div class="test-item">
            <DssBadge rounded color="tertiary" label="Tertiary" />
            <code>rounded color="tertiary"</code>
          </div>
          <div class="test-item">
            <DssBadge rounded color="accent" label="Accent" />
            <code>rounded color="accent"</code>
          </div>
          <div class="test-item">
            <DssBadge rounded color="positive" label="Positive" />
            <code>rounded color="positive"</code>
          </div>
          <div class="test-item">
            <DssBadge rounded color="negative" label="Negative" />
            <code>rounded color="negative"</code>
          </div>
          <div class="test-item">
            <DssBadge rounded color="warning" label="Warning" />
            <code>rounded color="warning"</code>
          </div>
          <div class="test-item">
            <DssBadge rounded color="info" label="Info" />
            <code>rounded color="info"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 5: DOT INDICATORS (VAZIO) ========== -->
      <section class="test-section">
        <h2>5. Dot Indicators (Badge vazio - 8 cores)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssBadge color="primary" />
            <code>color="primary" (vazio)</code>
          </div>
          <div class="test-item">
            <DssBadge color="secondary" />
            <code>color="secondary" (vazio)</code>
          </div>
          <div class="test-item">
            <DssBadge color="tertiary" />
            <code>color="tertiary" (vazio)</code>
          </div>
          <div class="test-item">
            <DssBadge color="accent" />
            <code>color="accent" (vazio)</code>
          </div>
          <div class="test-item">
            <DssBadge color="positive" />
            <code>color="positive" (vazio)</code>
          </div>
          <div class="test-item">
            <DssBadge color="negative" />
            <code>color="negative" (vazio)</code>
          </div>
          <div class="test-item">
            <DssBadge color="warning" />
            <code>color="warning" (vazio)</code>
          </div>
          <div class="test-item">
            <DssBadge color="info" />
            <code>color="info" (vazio)</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 6: MULTI-LINE ========== -->
      <section class="test-section">
        <h2>6. Multi-Line (texto longo)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssBadge multi-line color="primary" label="Texto muito longo que precisa quebrar em múltiplas linhas" style="max-width: 150px;" />
            <code>multi-line (primary)</code>
          </div>
          <div class="test-item">
            <DssBadge multi-line color="positive" label="Mensagem de sucesso com texto extenso" style="max-width: 150px;" />
            <code>multi-line (positive)</code>
          </div>
          <div class="test-item">
            <DssBadge multi-line color="negative" label="Erro detalhado com descrição longa" style="max-width: 150px;" />
            <code>multi-line (negative)</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 7: TEXT COLOR OVERRIDE ========== -->
      <section class="test-section">
        <h2>7. Text Color Override</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssBadge color="primary" text-color="white" label="White Text" />
            <code>text-color="white"</code>
          </div>
          <div class="test-item">
            <DssBadge color="secondary" text-color="black" label="Black Text" />
            <code>text-color="black"</code>
          </div>
          <div class="test-item">
            <DssBadge color="accent" text-color="primary" label="Primary Text" />
            <code>text-color="primary"</code>
          </div>
          <div class="test-item">
            <DssBadge color="positive" text-color="negative" label="Negative Text" />
            <code>text-color="negative"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 8: ALIGN VERTICAL ========== -->
      <section class="test-section">
        <h2>8. Align Vertical (inline com texto)</h2>
        <div class="test-item">
          <p style="font-size: 18px; line-height: 2;">
            Texto normal
            <DssBadge align="top" color="primary" label="Top" />
            mais texto
            <DssBadge align="middle" color="secondary" label="Middle" />
            continuação
            <DssBadge align="bottom" color="accent" label="Bottom" />
            final
          </p>
          <code>align="top|middle|bottom"</code>
        </div>
      </section>

      <!-- ========== SEÇÃO 9: BADGES NUMÉRICOS ========== -->
      <section class="test-section">
        <h2>9. Badges Numéricos (diferentes tamanhos)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssBadge color="primary" :label="1" />
            <code>:label="1"</code>
          </div>
          <div class="test-item">
            <DssBadge color="negative" :label="5" />
            <code>:label="5"</code>
          </div>
          <div class="test-item">
            <DssBadge color="warning" :label="99" />
            <code>:label="99"</code>
          </div>
          <div class="test-item">
            <DssBadge color="info" :label="999" />
            <code>:label="999"</code>
          </div>
          <div class="test-item">
            <DssBadge color="positive" label="99+" />
            <code>label="99+"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 10: BADGES COM ÍCONES (SLOTS) ========== -->
      <section class="test-section">
        <h2>10. Badges com Ícones (usando slots)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssBadge color="positive">
              <span class="material-icons" style="font-size: 16px;">check</span>
            </DssBadge>
            <code>slot: check icon</code>
          </div>
          <div class="test-item">
            <DssBadge color="negative">
              <span class="material-icons" style="font-size: 16px;">close</span>
            </DssBadge>
            <code>slot: close icon</code>
          </div>
          <div class="test-item">
            <DssBadge color="warning">
              <span class="material-icons" style="font-size: 16px;">warning</span>
            </DssBadge>
            <code>slot: warning icon</code>
          </div>
          <div class="test-item">
            <DssBadge color="info">
              <span class="material-icons" style="font-size: 16px;">info</span>
            </DssBadge>
            <code>slot: info icon</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 11: FLOATING BADGES (COM BOTÕES) ========== -->
      <section class="test-section">
        <h2>11. Floating Badges (posição absoluta)</h2>
        <div class="test-grid" style="gap: 3rem;">
          <div class="test-item">
            <DssButton icon="mail">
              Email
              <DssBadge floating color="primary" label="5" />
            </DssButton>
            <code>floating + button</code>
          </div>
          <div class="test-item">
            <DssButton icon="notifications">
              Notificações
              <DssBadge floating color="negative" label="12" />
            </DssButton>
            <code>floating + negative</code>
          </div>
          <div class="test-item">
            <DssButton icon="shopping_cart">
              Carrinho
              <DssBadge floating color="accent" label="3" />
            </DssButton>
            <code>floating + accent</code>
          </div>
          <div class="test-item">
            <DssButton icon="favorite">
              Favoritos
              <DssBadge floating color="positive" />
            </DssButton>
            <code>floating dot</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 12: COMBINAÇÕES DE PROPS ========== -->
      <section class="test-section">
        <h2>12. Combinações de Props</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssBadge outline rounded color="primary" label="Outline + Rounded" />
            <code>outline + rounded</code>
          </div>
          <div class="test-item">
            <DssBadge transparent rounded color="secondary" label="Transparent + Rounded" />
            <code>transparent + rounded</code>
          </div>
          <div class="test-item">
            <DssBadge outline multi-line color="accent" label="Outline + Multi-line texto longo" style="max-width: 120px;" />
            <code>outline + multi-line</code>
          </div>
          <div class="test-item">
            <DssBadge rounded text-color="white" color="positive" label="Rounded + Text Color" />
            <code>rounded + text-color</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 13: BADGES EM LISTA ========== -->
      <section class="test-section">
        <h2>13. Badges em Listas (caso de uso real)</h2>
        <div class="list-demo">
          <div class="list-item">
            <span>Mensagens</span>
            <DssBadge color="primary" label="3" />
          </div>
          <div class="list-item">
            <span>Comentários</span>
            <DssBadge color="info" label="8" />
          </div>
          <div class="list-item">
            <span>Tarefas Pendentes</span>
            <DssBadge color="warning" label="5" />
          </div>
          <div class="list-item">
            <span>Erros Críticos</span>
            <DssBadge color="negative" label="2" />
          </div>
          <div class="list-item">
            <span>Tudo OK</span>
            <DssBadge color="positive" label="✓" />
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 14: STRESS TEST (MUITOS BADGES) ========== -->
      <section class="test-section">
        <h2>14. Stress Test (renderização de múltiplos badges)</h2>
        <div class="stress-test">
          <DssBadge v-for="n in 50" :key="n"
            :color="colors[n % colors.length]"
            :label="n"
          />
        </div>
      </section>

    </main>

    <footer class="test-footer">
      <p>✅ Teste completo de DssBadge - Design System Sansys v2.2.0</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colors = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info']
</script>

<style scoped>
.test-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.test-header {
  background: linear-gradient(135deg, #FF6B00 0%, #FF8C33 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.test-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
}

.test-header p {
  margin: 0;
  opacity: 0.95;
}

.test-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.test-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.test-section h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  border-left: 4px solid #FF6B00;
  padding-left: 1rem;
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.test-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.test-item code {
  font-size: 0.75rem;
  color: #666;
  background: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-family: 'Courier New', monospace;
}

.list-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.list-item span {
  font-weight: 500;
  color: #333;
}

.stress-test {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
}

.test-footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1.5rem;
}

.test-footer p {
  margin: 0;
}

@media (max-width: 768px) {
  .test-grid {
    grid-template-columns: 1fr;
  }
}
</style>
