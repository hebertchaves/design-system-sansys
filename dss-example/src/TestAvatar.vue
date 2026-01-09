<template>
  <div class="test-container">
    <header class="test-header">
      <h1>👤 DssAvatar - Teste Completo de Variações</h1>
      <p>Todas as combinações possíveis de props, cores, tamanhos, formas e ícones</p>
    </header>

    <main class="test-content">
      <!-- ========== SEÇÃO 1: CORES COM INICIAIS ========== -->
      <section class="test-section">
        <h2>1. Cores Semânticas com Iniciais (8 cores)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary">JD</DssAvatar>
            <code>color="primary"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary">AB</DssAvatar>
            <code>color="secondary"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="tertiary">XY</DssAvatar>
            <code>color="tertiary"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent">MK</DssAvatar>
            <code>color="accent"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="positive">OK</DssAvatar>
            <code>color="positive"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="negative">ER</DssAvatar>
            <code>color="negative"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="warning">WN</DssAvatar>
            <code>color="warning"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="info">IF</DssAvatar>
            <code>color="info"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 2: TAMANHOS (5 variantes) ========== -->
      <section class="test-section">
        <h2>2. Tamanhos (xs, sm, md, lg, xl)</h2>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssAvatar color="primary" size="32px">XS</DssAvatar>
            <code>size="32px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary" size="40px">SM</DssAvatar>
            <code>size="40px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent">MD</DssAvatar>
            <code>48px (default)</code>
          </div>
          <div class="test-item">
            <DssAvatar color="positive" size="64px">LG</DssAvatar>
            <code>size="64px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="info" size="80px">XL</DssAvatar>
            <code>size="80px"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 3: TAMANHOS COM ÍCONES ========== -->
      <section class="test-section">
        <h2>3. Tamanhos com Ícones Material</h2>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssAvatar icon="person" color="primary" size="32px" />
            <code>32px + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="account_circle" color="secondary" size="40px" />
            <code>40px + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="face" color="accent" />
            <code>48px + icon (default)</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="group" color="positive" size="64px" />
            <code>64px + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="business" color="info" size="80px" />
            <code>80px + icon</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 4: ÍCONES MATERIAL (VARIADOS) ========== -->
      <section class="test-section">
        <h2>4. Ícones Material Diversos</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar icon="person" color="primary" />
            <code>icon="person"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="account_circle" color="secondary" />
            <code>icon="account_circle"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="face" color="accent" />
            <code>icon="face"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="group" color="positive" />
            <code>icon="group"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="business" color="info" />
            <code>icon="business"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="work" color="warning" />
            <code>icon="work"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="admin_panel_settings" color="negative" />
            <code>icon="admin_panel_settings"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="supervised_user_circle" color="tertiary" />
            <code>icon="supervised_user_circle"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 5: FORMAS (circular, square, rounded) ========== -->
      <section class="test-section">
        <h2>5. Formas (circular, square, rounded)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary">JD</DssAvatar>
            <code>circular (default)</code>
          </div>
          <div class="test-item">
            <DssAvatar square color="secondary">AB</DssAvatar>
            <code>square</code>
          </div>
          <div class="test-item">
            <DssAvatar rounded color="accent">XY</DssAvatar>
            <code>rounded</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 6: FORMAS COM ÍCONES ========== -->
      <section class="test-section">
        <h2>6. Formas com Ícones</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar icon="person" color="primary" />
            <code>circular + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar square icon="business" color="secondary" />
            <code>square + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar rounded icon="group" color="accent" />
            <code>rounded + icon</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 7: FONT SIZE CUSTOMIZADO ========== -->
      <section class="test-section">
        <h2>7. Font Size Customizado</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary" size="64px" font-size="12px">S</DssAvatar>
            <code>fontSize="12px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary" size="64px" font-size="16px">M</DssAvatar>
            <code>fontSize="16px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent" size="64px" font-size="24px">L</DssAvatar>
            <code>fontSize="24px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="positive" size="64px" font-size="32px">XL</DssAvatar>
            <code>fontSize="32px"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 8: TEXT COLOR OVERRIDE ========== -->
      <section class="test-section">
        <h2>8. Text Color Override</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary" text-color="white">WT</DssAvatar>
            <code>text-color="white"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary" text-color="black">BK</DssAvatar>
            <code>text-color="black"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent" text-color="negative">RD</DssAvatar>
            <code>text-color="negative"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="person" color="positive" text-color="primary" />
            <code>icon + text-color</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 9: AVATARS COM BADGES (STATUS) ========== -->
      <section class="test-section">
        <h2>9. Avatars com Badges (Indicadores de Status)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary">
              JD
              <DssBadge floating color="positive" />
            </DssAvatar>
            <code>badge online (dot)</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary">
              AB
              <DssBadge floating color="warning" />
            </DssAvatar>
            <code>badge away (dot)</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent">
              XY
              <DssBadge floating color="negative" label="3" />
            </DssAvatar>
            <code>badge notifications</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="person" color="info">
              <DssBadge floating color="primary" label="!" />
            </DssAvatar>
            <code>badge alert</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 10: AVATAR GROUP (SOBREPOSIÇÃO) ========== -->
      <section class="test-section">
        <h2>10. Avatar Group (Sobreposição)</h2>
        <div class="test-item">
          <div class="dss-avatar-group">
            <DssAvatar color="primary">JD</DssAvatar>
            <DssAvatar color="secondary">AB</DssAvatar>
            <DssAvatar color="accent">XY</DssAvatar>
            <DssAvatar color="positive">MK</DssAvatar>
            <DssAvatar color="info">+5</DssAvatar>
          </div>
          <code>dss-avatar-group</code>
        </div>
      </section>

      <!-- ========== SEÇÃO 11: AVATAR GROUP COM ÍCONES ========== -->
      <section class="test-section">
        <h2>11. Avatar Group com Ícones</h2>
        <div class="test-item">
          <div class="dss-avatar-group">
            <DssAvatar icon="person" color="primary" />
            <DssAvatar icon="face" color="secondary" />
            <DssAvatar icon="account_circle" color="accent" />
            <DssAvatar icon="group" color="positive" />
            <DssAvatar color="info">+12</DssAvatar>
          </div>
          <code>group + icons</code>
        </div>
      </section>

      <!-- ========== SEÇÃO 12: AVATARS GRANDES (PERFIL) ========== -->
      <section class="test-section">
        <h2>12. Avatars Grandes (Páginas de Perfil)</h2>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssAvatar color="primary" size="96px" font-size="36px">JD</DssAvatar>
            <code>size="96px"</code>
          </div>
          <div class="test-item">
            <DssAvatar icon="person" color="secondary" size="96px" />
            <code>96px + icon</code>
          </div>
          <div class="test-item">
            <DssAvatar square icon="business" color="accent" size="96px" />
            <code>96px + square + icon</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 13: COMBINAÇÕES DE PROPS ========== -->
      <section class="test-section">
        <h2>13. Combinações de Props</h2>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssAvatar square color="primary" size="64px" font-size="24px">SQ</DssAvatar>
            <code>square + size + fontSize</code>
          </div>
          <div class="test-item">
            <DssAvatar rounded icon="business" color="secondary" size="64px" />
            <code>rounded + icon + size</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent" text-color="white" size="64px">TC</DssAvatar>
            <code>textColor + size</code>
          </div>
          <div class="test-item">
            <DssAvatar square icon="work" color="positive" size="64px" text-color="primary" />
            <code>square + icon + textColor</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 14: AVATARS EM LISTA (CASO DE USO) ========== -->
      <section class="test-section">
        <h2>14. Avatars em Lista de Usuários</h2>
        <div class="list-demo">
          <div class="list-item">
            <DssAvatar color="primary">JD</DssAvatar>
            <div class="user-info">
              <strong>John Doe</strong>
              <p>Software Engineer</p>
            </div>
            <DssBadge color="positive" label="Online" />
          </div>
          <div class="list-item">
            <DssAvatar icon="person" color="secondary" />
            <div class="user-info">
              <strong>Alice Brown</strong>
              <p>Product Manager</p>
            </div>
            <DssBadge color="warning" label="Away" />
          </div>
          <div class="list-item">
            <DssAvatar color="accent">XY</DssAvatar>
            <div class="user-info">
              <strong>Xavier Young</strong>
              <p>UX Designer</p>
            </div>
            <DssBadge color="info" label="Busy" />
          </div>
          <div class="list-item">
            <DssAvatar icon="face" color="positive" />
            <div class="user-info">
              <strong>Maria Kim</strong>
              <p>Frontend Developer</p>
            </div>
            <DssBadge color="negative" label="Offline" />
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 15: AVATARS QUADRADOS (LOGOS) ========== -->
      <section class="test-section">
        <h2>15. Avatars Quadrados para Logos/Empresas</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar square icon="business" color="primary" size="64px" />
            <code>square company 1</code>
          </div>
          <div class="test-item">
            <DssAvatar square icon="work" color="secondary" size="64px" />
            <code>square company 2</code>
          </div>
          <div class="test-item">
            <DssAvatar square icon="corporate_fare" color="accent" size="64px" />
            <code>square company 3</code>
          </div>
          <div class="test-item">
            <DssAvatar square color="positive" size="64px">CO</DssAvatar>
            <code>square initials</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 16: AVATARS COM SLOTS (CONTEÚDO CUSTOMIZADO) ========== -->
      <section class="test-section">
        <h2>16. Avatars com Slots (Conteúdo Customizado)</h2>
        <div class="test-grid">
          <div class="test-item">
            <DssAvatar color="primary">
              <strong>JD</strong>
            </DssAvatar>
            <code>slot: &lt;strong&gt;</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary">
              <span style="font-size: 24px;">👤</span>
            </DssAvatar>
            <code>slot: emoji</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent">
              <div style="display: flex; flex-direction: column; align-items: center; font-size: 12px;">
                <div>J</div>
                <div>D</div>
              </div>
            </DssAvatar>
            <code>slot: complex</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 17: TAMANHOS CUSTOMIZADOS (UNIDADES DIFERENTES) ========== -->
      <section class="test-section">
        <h2>17. Tamanhos Customizados (diferentes unidades CSS)</h2>
        <div class="test-grid" style="align-items: center;">
          <div class="test-item">
            <DssAvatar color="primary" size="3rem">3R</DssAvatar>
            <code>size="3rem"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="secondary" size="4em">4E</DssAvatar>
            <code>size="4em"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="accent" size="100px">PX</DssAvatar>
            <code>size="100px"</code>
          </div>
          <div class="test-item">
            <DssAvatar color="positive" size="10vh">VH</DssAvatar>
            <code>size="10vh"</code>
          </div>
        </div>
      </section>

      <!-- ========== SEÇÃO 18: STRESS TEST (RENDERIZAÇÃO) ========== -->
      <section class="test-section">
        <h2>18. Stress Test (renderização de múltiplos avatars)</h2>
        <div class="stress-test">
          <DssAvatar
            v-for="n in 30"
            :key="n"
            :color="colors[n % colors.length]"
          >
            {{ n }}
          </DssAvatar>
        </div>
      </section>

      <!-- ========== SEÇÃO 19: STRESS TEST COM ÍCONES ========== -->
      <section class="test-section">
        <h2>19. Stress Test com Ícones</h2>
        <div class="stress-test">
          <DssAvatar
            v-for="n in 30"
            :key="n"
            :icon="icons[n % icons.length]"
            :color="colors[n % colors.length]"
          />
        </div>
      </section>

      <!-- ========== SEÇÃO 20: AVATAR GROUP GRANDE ========== -->
      <section class="test-section">
        <h2>20. Avatar Group Grande (muitos usuários)</h2>
        <div class="test-item">
          <div class="dss-avatar-group">
            <DssAvatar v-for="n in 8" :key="n" :color="colors[n % colors.length]">
              {{ String.fromCharCode(65 + n) }}{{ String.fromCharCode(66 + n) }}
            </DssAvatar>
            <DssAvatar color="info">+25</DssAvatar>
          </div>
          <code>large avatar group</code>
        </div>
      </section>

    </main>

    <footer class="test-footer">
      <p>✅ Teste completo de DssAvatar - Design System Sansys v2.2.0</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colors = ['primary', 'secondary', 'tertiary', 'accent', 'positive', 'negative', 'warning', 'info']
const icons = ['person', 'account_circle', 'face', 'group', 'business', 'work', 'supervised_user_circle', 'admin_panel_settings']
</script>

<style scoped>
.test-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.test-header {
  background: linear-gradient(135deg, #2196F3 0%, #42A5F5 100%);
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
  border-left: 4px solid #2196F3;
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
  text-align: center;
}

.list-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.user-info {
  flex: 1;
}

.user-info strong {
  display: block;
  color: #333;
  margin-bottom: 0.25rem;
}

.user-info p {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}

.stress-test {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 8px;
  align-items: center;
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
