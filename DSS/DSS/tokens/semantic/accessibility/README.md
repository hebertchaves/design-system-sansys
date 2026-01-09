# Accessibility Tokens

Este modulo contem todos os tokens relacionados a conformidade WCAG 2.1 AA.

## Estrutura

- `_focus.scss` - Focus rings (WCAG 2.4.7)
- `_contrast.scss` - Ratios de contraste (WCAG 1.4.3, 1.4.6)
- `_sizing.scss` - Touch targets (WCAG 2.5.5)
- `_typography.scss` - Tipografia acessivel (WCAG 1.4.4, 1.4.12)
- `index.scss` - Agregador principal

## Uso

```scss
@import 'tokens/semantic/accessibility';
```

Isso importa automaticamente todos os 4 arquivos de tokens de acessibilidade.

## Conformidade WCAG 2.1 AA

✅ **COMPLIANT** - Todos os criterios implementados e validados

### Criterios Cobertos

| Criterio | Nivel | Status | Arquivo |
|----------|-------|--------|---------|
| 2.4.7 Focus Visible | AA | ✅ | `_focus.scss` |
| 1.4.3 Contrast (Minimum) | AA | ✅ | `_contrast.scss` |
| 1.4.6 Contrast (Enhanced) | AAA | ✅ | `_contrast.scss` |
| 2.5.5 Target Size | AAA | ✅ | `_sizing.scss` |
| 1.4.4 Resize Text | AA | ✅ | `_typography.scss` |
| 1.4.12 Text Spacing | AA | ✅ | `_typography.scss` |

## Tokens Disponiveis

### Focus (43 tokens)
- 9 cores semanticas: primary, secondary, tertiary, accent, success, error, warning, info, dark
- Variantes RGB para manipulacao
- Box shadows compostos
- Variantes com offset
- Dark mode automatico
- Brandability (Hub, Water, Waste)

### Contrast (20+ tokens)
- Ratios minimos WCAG
- Combinacoes pre-validadas
- Status de aprovacao por combinacao

### Sizing (10+ tokens)
- Touch targets (44px, 48px, 52px)
- Espacamento minimo
- Tamanhos de fonte minimos

### Typography (15+ tokens)
- Tamanhos minimos
- Altura de linha
- Espacamento de letras

## Auditoria

Para verificar uso de tokens:

```bash
# Tokens focus
grep -r "dss-focus" components/

# Tokens contrast
grep -r "dss-contrast" components/

# Tokens sizing
grep -r "dss-touch-target" components/
```

## Documentacao Adicional

- `../../../ARQUITETURA_TOKENS_ACCESSIBILITY.md` - Analise arquitetural completa
- `../../../FOCUS_TOKENS_REFERENCIA.md` - Referencia detalhada de focus tokens
- `../../../DSS_IMPLEMENTATION_GUIDE.md` - Guia de implementacao geral

## Historico

- **Dez 2025**: Criacao dos tokens individuais
- **Dez 16, 2025**: Reorganizacao arquitetural (namespace dedicado)
- **Jan 2025**: Sistema focus unificado (339 linhas, 9 cores, WCAG compliant)
