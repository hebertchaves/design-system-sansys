<template>
  <div class="test-index">
    <header class="index-header">
      <h1>🧪 Design System Sansys - Test Suite</h1>
      <p>Testes completos de todos os componentes v2.2.0</p>
    </header>

    <main class="index-content">
      <div class="component-grid">
        <!-- DssButton Test -->
        <router-link to="/test-button" class="component-card">
          <div class="card-icon">🔘</div>
          <h2>DssButton</h2>
          <p>Teste completo de todas as variações do DssButton</p>
          <ul class="feature-list">
            <li>✓ 6 variantes visuais</li>
            <li>✓ 8 cores semânticas</li>
            <li>✓ 5 tamanhos</li>
            <li>✓ 10 props de layout e interação</li>
            <li>✓ Loading com percentage</li>
            <li>✓ Ripple effect</li>
            <li>✓ Brandabilidade (hub/water/waste)</li>
          </ul>
          <div class="card-footer">
            <span class="badge">20 seções</span>
            <span class="badge">~100 variações</span>
          </div>
        </router-link>

        <!-- DssBadge Test -->
        <router-link to="/test-badge" class="component-card">
          <div class="card-icon">🏷️</div>
          <h2>DssBadge</h2>
          <p>Teste completo de todas as variações do DssBadge</p>
          <ul class="feature-list">
            <li>✓ 8 cores semânticas</li>
            <li>✓ Outline, transparent, rounded</li>
            <li>✓ Floating mode</li>
            <li>✓ Multi-line support</li>
            <li>✓ Dot indicators</li>
            <li>✓ Text color override</li>
            <li>✓ Integração com DssButton</li>
          </ul>
          <div class="card-footer">
            <span class="badge">14 seções</span>
            <span class="badge">~80 variações</span>
          </div>
        </router-link>

        <!-- DssAvatar Test -->
        <router-link to="/test-avatar" class="component-card">
          <div class="card-icon">👤</div>
          <h2>DssAvatar</h2>
          <p>Teste completo de todas as variações do DssAvatar</p>
          <ul class="feature-list">
            <li>✓ 8 cores semânticas</li>
            <li>✓ 5+ tamanhos customizáveis</li>
            <li>✓ Material Icons support</li>
            <li>✓ 3 formas (circular, square, rounded)</li>
            <li>✓ Avatar groups</li>
            <li>✓ Status indicators com badges</li>
            <li>✓ Font size override</li>
          </ul>
          <div class="card-footer">
            <span class="badge">20 seções</span>
            <span class="badge">~90 variações</span>
          </div>
        </router-link>
      </div>

      <!-- Estatísticas Globais -->
      <section class="stats-section">
        <h2>📊 Estatísticas do Test Suite</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">3</div>
            <div class="stat-label">Componentes Testados</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">54</div>
            <div class="stat-label">Seções de Teste</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">270+</div>
            <div class="stat-label">Variações Testadas</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">100%</div>
            <div class="stat-label">Cobertura de Props</div>
          </div>
        </div>
      </section>

      <!-- Guia de Uso -->
      <section class="guide-section">
        <h2>📖 Guia de Uso do Test Suite</h2>
        <div class="guide-content">
          <div class="guide-item">
            <h3>🎯 Objetivo</h3>
            <p>Validar visualmente todas as combinações de props, cores, tamanhos e estados de cada componente.</p>
          </div>
          <div class="guide-item">
            <h3>🔍 O que verificar</h3>
            <ul>
              <li>Cores corretas para cada variante semântica</li>
              <li>Tamanhos proporcionais e consistentes</li>
              <li>Espaçamentos internos (padding) corretos</li>
              <li>Bordas e sombras aplicadas adequadamente</li>
              <li>Ícones centralizados e proporcionais</li>
              <li>Estados de loading e disabled funcionando</li>
              <li>Responsividade em diferentes resoluções</li>
              <li>Acessibilidade (contraste, focus states)</li>
            </ul>
          </div>
          <div class="guide-item">
            <h3>🐛 Reportar Problemas</h3>
            <p>Ao identificar erros ou melhorias:</p>
            <ol>
              <li>Anote a seção específica do teste</li>
              <li>Documente o comportamento esperado vs. observado</li>
              <li>Tire screenshots se possível</li>
              <li>Teste em diferentes navegadores (Chrome, Firefox, Safari)</li>
            </ol>
          </div>
        </div>
      </section>

      <!-- Checklist de Validação -->
      <section class="checklist-section">
        <h2>✅ Checklist de Validação</h2>
        <div class="checklist-grid">
          <div class="checklist-card">
            <h3>Visual</h3>
            <ul>
              <li>[ ] Cores consistentes</li>
              <li>[ ] Tamanhos proporcionais</li>
              <li>[ ] Espaçamentos corretos</li>
              <li>[ ] Bordas e sombras</li>
              <li>[ ] Ícones centralizados</li>
              <li>[ ] Tipografia legível</li>
            </ul>
          </div>
          <div class="checklist-card">
            <h3>Funcionalidade</h3>
            <ul>
              <li>[ ] Props funcionando</li>
              <li>[ ] Estados (loading, disabled)</li>
              <li>[ ] Hover effects</li>
              <li>[ ] Click events</li>
              <li>[ ] Ripple animation</li>
              <li>[ ] Badge positioning</li>
            </ul>
          </div>
          <div class="checklist-card">
            <h3>Acessibilidade</h3>
            <ul>
              <li>[ ] Contraste de cores (WCAG AA)</li>
              <li>[ ] Navegação por teclado</li>
              <li>[ ] Focus indicators</li>
              <li>[ ] ARIA labels</li>
              <li>[ ] Screen reader support</li>
              <li>[ ] Touch targets ≥44px</li>
            </ul>
          </div>
          <div class="checklist-card">
            <h3>Responsividade</h3>
            <ul>
              <li>[ ] Desktop (1920px)</li>
              <li>[ ] Laptop (1366px)</li>
              <li>[ ] Tablet (768px)</li>
              <li>[ ] Mobile (375px)</li>
              <li>[ ] Layout adapta-se</li>
              <li>[ ] Texto não quebra</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <footer class="index-footer">
      <p>Design System Sansys v2.2.0 - Test Suite Completo</p>
      <p>Desenvolvido com ❤️ por Hebert Daniel Oliveira Chaves</p>
    </footer>
  </div>
</template>

<script setup>
// Nenhuma lógica necessária - apenas navegação
</script>

<style scoped>
.test-index {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
}

.index-header {
  color: white;
  padding: 3rem 2rem;
  text-align: center;
}

.index-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: -0.5px;
}

.index-header p {
  margin: 0;
  font-size: 1.125rem;
  opacity: 0.95;
}

.index-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.component-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(227, 30, 36, 0.1);
}

.component-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(227, 30, 36, 0.2);
  border-color: #E31E24;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.component-card h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #0a0a0a;
  font-weight: 700;
}

.component-card > p {
  margin: 0 0 1rem 0;
  color: #666;
  line-height: 1.5;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  flex: 1;
}

.feature-list li {
  padding: 0.5rem 0;
  color: #555;
  font-size: 0.875rem;
}

.card-footer {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.badge {
  background: #E31E24;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stats-section,
.guide-section,
.checklist-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.stats-section h2,
.guide-section h2,
.checklist-section h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  color: #0a0a0a;
  font-weight: 700;
  border-bottom: 2px solid #E31E24;
  padding-bottom: 0.75rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #E31E24 0%, #B01519 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(227, 30, 36, 0.3);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(227, 30, 36, 0.4);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.95;
}

.guide-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.guide-item h3 {
  margin: 0 0 0.5rem 0;
  color: #E31E24;
  font-size: 1.125rem;
  font-weight: 600;
}

.guide-item p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.guide-item ul,
.guide-item ol {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
  color: #666;
  line-height: 1.8;
}

.checklist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.checklist-card {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #E31E24;
}

.checklist-card h3 {
  margin: 0 0 1rem 0;
  color: #0a0a0a;
  font-size: 1.125rem;
  font-weight: 600;
}

.checklist-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.checklist-card li {
  padding: 0.5rem 0;
  color: #666;
  font-size: 0.875rem;
}

.index-footer {
  background: #0a0a0a;
  color: white;
  text-align: center;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.index-footer p {
  margin: 0.25rem 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .component-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .checklist-grid {
    grid-template-columns: 1fr;
  }

  .index-header h1 {
    font-size: 2rem;
  }
}
</style>
