/**
 * ============================================================================
 * TESTES COMPLETOS: validate_grid_layout
 * ============================================================================
 *
 * Casos de teste para validação de grid layout conforme MCP Contract v0.1
 */

import { validateGridLayout } from '../src/tools/validateGridLayout';

// ============================================================================
// TEST SUITE
// ============================================================================

async function runTests() {
  console.log('🧪 INICIANDO TESTES: validate_grid_layout\n');
  console.log('='.repeat(80));

  await testCase1_CompliantConfig();
  await testCase2_InvalidSpacingTokens();
  await testCase3_OverlayLayoutMismatch();
  await testCase4_InvalidColumnCount();
  await testCase5_MobileOptimization();
  await testCase6_DesktopOptimization();
  await testCase7_CompleteViolations();
  await testCase8_OnlySuggestions();

  console.log('\n' + '='.repeat(80));
  console.log('✅ TODOS OS TESTES CONCLUÍDOS\n');
}

// ============================================================================
// TEST CASE 1: Configuração 100% Compliant
// ============================================================================

async function testCase1_CompliantConfig() {
  console.log('\n📋 TEST CASE 1: Configuração 100% Compliant');
  console.log('-'.repeat(80));

  const result = await validateGridLayout({
    overlay: {
      columns: 12,
      gutter: { x: 24, y: 24 },
      margin: { x: 16, y: 16 },
      padding: { x: 24, y: 24 },
    },
    layout: {
      gutter: { x: 24, y: 24 },
      margin: { x: 16, y: 16 },
      padding: { x: 24, y: 24 },
      autoColumnWidth: false,
    },
    viewportWidth: 1440,
  }, '.');

  console.log('Verdict:', result.verdict);
  console.log('Summary:', result.summary);
  console.log('Violations:', result.violations.length);
  console.log('Suggestions:', result.suggestions.length);

  // Assertions
  if (result.verdict !== 'compliant') {
    console.error('❌ FALHOU: Esperado "compliant", recebido:', result.verdict);
  } else {
    console.log('✅ PASSOU: Config compliant sem violations');
  }
}

// ============================================================================
// TEST CASE 2: Spacing Tokens Inválidos (CRITICAL)
// ============================================================================

async function testCase2_InvalidSpacingTokens() {
  console.log('\n📋 TEST CASE 2: Spacing Tokens Inválidos');
  console.log('-'.repeat(80));

  const result = await validateGridLayout({
    overlay: {
      columns: 12,
      gutter: { x: 15, y: 17 }, // ❌ 15 e 17 não são tokens
      margin: { x: 16, y: 16 },
      padding: { x: 23, y: 24 }, // ❌ 23 não é token
    },
    layout: {
      gutter: { x: 15, y: 17 }, // ❌ Mesmo valor inválido
      margin: { x: 16, y: 16 },
      padding: { x: 23, y: 24 },
      autoColumnWidth: false,
    },
    viewportWidth: 1440,
  }, '.');

  console.log('Verdict:', result.verdict);
  console.log('Summary:', result.summary);
  console.log('Violations críticas:', result.summary.critical);

  // Mostrar detalhes das violations
  result.violations
    .filter(v => v.severity === 'critical')
    .forEach(v => {
      console.log(`  - ${v.context.property}: ${v.context.actual}px → sugestão: ${v.context.suggestion.value}px (${v.context.suggestion.token})`);
    });

  // Assertions
  if (result.summary.critical !== 6) { // 3 no overlay + 3 no layout
    console.error('❌ FALHOU: Esperado 6 violations críticas, recebido:', result.summary.critical);
  } else {
    console.log('✅ PASSOU: Detectou todas as violations de spacing');
  }
}

// ============================================================================
// TEST CASE 3: Overlay vs Layout Mismatch (CRITICAL)
// ============================================================================

async function testCase3_OverlayLayoutMismatch() {
  console.log('\n📋 TEST CASE 3: Overlay vs Layout Desincronizados');
  console.log('-'.repeat(80));

  const result = await validateGridLayout({
    overlay: {
      columns: 12,
      gutter: { x: 16, y: 16 }, // Overlay com 16px
      margin: { x: 24, y: 24 },
      padding: { x: 32, y: 32 },
    },
    layout: {
      gutter: { x: 24, y: 24 }, // Layout com 24px ❌ MISMATCH!
      margin: { x: 16, y: 16 }, // ❌ MISMATCH!
      padding: { x: 24, y: 24 }, // ❌ MISMATCH!
      autoColumnWidth: false,
    },
    viewportWidth: 1440,
  }, '.');

  console.log('Verdict:', result.verdict);
  console.log('Summary:', result.summary);

  const syncViolations = result.violations.filter(v => v.category === 'sync');
  console.log('Sync violations:', syncViolations.length);

  syncViolations.forEach(v => {
    console.log(`  - ${v.message}`);
    console.log(`    Overlay: ${v.context.actual.overlay}px, Layout: ${v.context.actual.layout}px`);
  });

  // Assertions
  if (syncViolations.length !== 6) { // gutter.x, gutter.y, margin.x, margin.y, padding.x, padding.y
    console.error('❌ FALHOU: Esperado 6 sync violations, recebido:', syncViolations.length);
  } else {
    console.log('✅ PASSOU: Detectou todas as inconsistências overlay/layout');
  }
}

// ============================================================================
// TEST CASE 4: Número de Colunas Inválido (HIGH)
// ============================================================================

async function testCase4_InvalidColumnCount() {
  console.log('\n📋 TEST CASE 4: Número de Colunas Não-Standard');
  console.log('-'.repeat(80));

  const result = await validateGridLayout({
    overlay: {
      columns: 10, // ❌ Não é convenção (4, 8, 12, 16, 24)
      gutter: { x: 24, y: 24 },
      margin: { x: 16, y: 16 },
      padding: { x: 24, y: 24 },
    },
    layout: {
      gutter: { x: 24, y: 24 },
      margin: { x: 16, y: 16 },
      padding: { x: 24, y: 24 },
      autoColumnWidth: false,
    },
    viewportWidth: 1440,
  }, '.');

  console.log('Verdict:', result.verdict);
  console.log('Summary:', result.summary);

  const columnViolation = result.violations.find(v => v.category === 'columns');
  if (columnViolation) {
    console.log('Column violation:');
    console.log(`  Atual: ${columnViolation.context.actual} colunas`);
    console.log(`  Sugestão: ${columnViolation.context.suggestion} colunas`);
  }

  // Assertions
  if (!columnViolation || columnViolation.severity !== 'high') {
    console.error('❌ FALHOU: Esperado violation HIGH para colunas');
  } else {
    console.log('✅ PASSOU: Detectou column count não-standard');
  }
}

// ============================================================================
// TEST CASE 5: Otimizações Mobile (INFO)
// ============================================================================

async function testCase5_MobileOptimization() {
  console.log('\n📋 TEST CASE 5: Otimizações para Mobile');
  console.log('-'.repeat(80));

  const result = await validateGridLayout({
    overlay: {
      columns: 12, // Em mobile, 4-8 é melhor
      gutter: { x: 24, y: 24 }, // Em mobile, 16px é melhor
      margin: { x: 24, y: 24 }, // Em mobile, 16px é melhor
      padding: { x: 24, y: 24 },
    },
    layout: {
      gutter: { x: 24, y: 24 },
      margin: { x: 24, y: 24 },
      padding: { x: 24, y: 24 },
      autoColumnWidth: false, // Em mobile, true é melhor
    },
    viewportWidth: 375, // iPhone
  }, '.');

  console.log('Verdict:', result.verdict);
  console.log('Summary:', result.summary);
  console.log('Suggestions:', result.suggestions.length);

  result.suggestions.forEach(s => {
    console.log(`  💡 ${s.message}`);
    console.log(`     ${s.context.property}: ${JSON.stringify(s.context.actual)} → ${JSON.stringify(s.context.suggestion)}`);
  });

  // Assertions
  if (result.suggestions.length < 3) {
    console.error('❌ FALHOU: Esperado pelo menos 3 suggestions para mobile');
  } else {
    console.log('✅ PASSOU: Gerou suggestions de otimização mobile');
  }
}

// ============================================================================
// TEST CASE 6: Otimizações Desktop (INFO)
// ============================================================================

async function testCase6_DesktopOptimization() {
  console.log('\n📋 TEST CASE 6: Otimizações para Desktop');
  console.log('-'.repeat(80));

  const result = await validateGridLayout({
    overlay: {
      columns: 4, // Em desktop, 12-16 é melhor
      gutter: { x: 16, y: 16 }, // Em desktop, 24px é melhor
      margin: { x: 16, y: 16 }, // Em desktop, 24-32px é melhor
      padding: { x: 16, y: 16 },
    },
    layout: {
      gutter: { x: 16, y: 16 },
      margin: { x: 16, y: 16 },
      padding: { x: 16, y: 16 },
      autoColumnWidth: true, // Em desktop, false é melhor
    },
    viewportWidth: 1920, // Desktop wide
  }, '.');

  console.log('Verdict:', result.verdict);
  console.log('Summary:', result.summary);
  console.log('Suggestions:', result.suggestions.length);

  result.suggestions.forEach(s => {
    console.log(`  💡 ${s.message}`);
    console.log(`     ${s.context.property}: ${JSON.stringify(s.context.actual)} → ${JSON.stringify(s.context.suggestion)}`);
  });

  // Assertions
  if (result.suggestions.length < 3) {
    console.error('❌ FALHOU: Esperado pelo menos 3 suggestions para desktop');
  } else {
    console.log('✅ PASSOU: Gerou suggestions de otimização desktop');
  }
}

// ============================================================================
// TEST CASE 7: Múltiplas Violations Simultâneas
// ============================================================================

async function testCase7_CompleteViolations() {
  console.log('\n📋 TEST CASE 7: Múltiplas Violations (Worst Case)');
  console.log('-'.repeat(80));

  const result = await validateGridLayout({
    overlay: {
      columns: 7, // ❌ Não-standard
      gutter: { x: 13, y: 19 }, // ❌ Não são tokens
      margin: { x: 21, y: 25 }, // ❌ Não são tokens
      padding: { x: 27, y: 31 }, // ❌ Não são tokens
    },
    layout: {
      gutter: { x: 24, y: 24 }, // ❌ Mismatch com overlay
      margin: { x: 16, y: 16 }, // ❌ Mismatch com overlay
      padding: { x: 24, y: 24 }, // ❌ Mismatch com overlay
      autoColumnWidth: true,
    },
    viewportWidth: 1440,
  }, '.');

  console.log('Verdict:', result.verdict);
  console.log('\n📊 RESUMO COMPLETO:');
  console.log('  CRITICAL:', result.summary.critical);
  console.log('  HIGH:', result.summary.high);
  console.log('  MEDIUM:', result.summary.medium);
  console.log('  LOW:', result.summary.low);
  console.log('  INFO:', result.summary.info);
  console.log('  TOTAL:', result.summary.total);

  console.log('\n🔴 VIOLATIONS CRÍTICAS:');
  result.violations
    .filter(v => v.severity === 'critical')
    .forEach((v, i) => {
      console.log(`  ${i + 1}. [${v.category}] ${v.message}`);
    });

  console.log('\n🟠 VIOLATIONS HIGH:');
  result.violations
    .filter(v => v.severity === 'high')
    .forEach((v, i) => {
      console.log(`  ${i + 1}. [${v.category}] ${v.message}`);
    });

  // Assertions
  if (result.verdict === 'compliant') {
    console.error('❌ FALHOU: Config claramente non-compliant foi aceito');
  } else {
    console.log('✅ PASSOU: Detectou múltiplas violations corretamente');
  }
}

// ============================================================================
// TEST CASE 8: Apenas Suggestions (sem violations)
// ============================================================================

async function testCase8_OnlySuggestions() {
  console.log('\n📋 TEST CASE 8: Compliant com Suggestions');
  console.log('-'.repeat(80));

  const result = await validateGridLayout({
    overlay: {
      columns: 12, // ✅ Valid
      gutter: { x: 16, y: 16 }, // ✅ Token válido (mas não otimizado para desktop)
      margin: { x: 16, y: 16 }, // ✅ Token válido
      padding: { x: 24, y: 24 }, // ✅ Token válido
    },
    layout: {
      gutter: { x: 16, y: 16 }, // ✅ Sincronizado
      margin: { x: 16, y: 16 }, // ✅ Sincronizado
      padding: { x: 24, y: 24 }, // ✅ Sincronizado
      autoColumnWidth: false, // ✅ Correto para desktop
    },
    viewportWidth: 1440, // Desktop
  }, '.');

  console.log('Verdict:', result.verdict);
  console.log('Summary:', result.summary);
  console.log('Violations:', result.violations.length);
  console.log('Suggestions:', result.suggestions.length);

  console.log('\n💡 SUGGESTIONS:');
  result.suggestions.forEach(s => {
    console.log(`  - ${s.message}`);
  });

  // Assertions
  if (result.verdict !== 'suggestions-only' && result.verdict !== 'compliant') {
    console.error('❌ FALHOU: Esperado "suggestions-only" ou "compliant"');
  } else {
    console.log('✅ PASSOU: Config válido com suggestions de otimização');
  }
}

// ============================================================================
// EXECUTAR TODOS OS TESTES
// ============================================================================

runTests().catch(console.error);
