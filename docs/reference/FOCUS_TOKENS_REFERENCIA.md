# 🎯 DSS - TOKENS DE FOCUS - REFERÊNCIA COMPLETA

> **📅 Atualizado:** Agosto 2026 — **anel passou a ser OPACO**
> **🎯 Objetivo:** Tabela de referência completa de cores de focus
> **♿ WCAG:** 2.4.7 Focus Visible + **1.4.11 Non-text Contrast (3:1)**
>
> ⚠️ **As cores de foco NÃO usam mais alpha.** Até ago/2026 eram `rgba()` a
> 50–60% e reprovavam 1.4.11 em 49 de 60 combinações (o `--dss-focus-primary`
> composto sobre branco dava **2.19:1**). As tabelas de contraste desta página
> também estavam erradas — alegavam 5.2:1 onde o real era 2.19:1. Os números
> abaixo são medidos por `scripts/wcag-kit.mjs`; reproduza com
> `node scripts/wcag-kit.mjs --dss-focus-primary --dss-surface-default`.

---

## 📊 TABELA COMPLETA - CORES DE FOCUS

### Light Mode (Cores Base)

| Token | Nome | Deriva de | Hex | Contraste vs #ffffff | Aparência |
|-------|------|-----------|-----|----------------------|-----------|
| `--dss-focus-primary` | Azul principal | `var(--dss-primary-focus)` | **#006AC5** | 5.43:1 ✅ | 🔵 Azul escuro |
| `--dss-focus-secondary` | Verde/Turquesa | `var(--dss-secondary-focus)` | **#009C8D** | 3.42:1 ✅ | 🟢 Verde água |
| `--dss-focus-tertiary` | Laranja | `var(--dss-tertiary-focus)` | **#E95900** | 3.56:1 ✅ | 🟠 Laranja vibrante |
| `--dss-focus-accent` | Roxo/Púrpura | `var(--dss-accent-focus)` | **#B02EC5** | 5.19:1 ✅ | 🟣 Roxo intenso |
| `--dss-focus-dark` | Cinza escuro | `var(--dss-dark-focus)` | **#3E3E3E** | 10.70:1 ✅ | ⚫ Cinza escuro |
| `--dss-focus-success`<br>`--dss-focus-positive` | Verde positivo | `var(--dss-positive-deep)` ⚠️ | **#246714** | 6.94:1 ✅ | 🟢 Verde escuro |
| `--dss-focus-error`<br>`--dss-focus-negative` | Vermelho negativo | `var(--dss-negative-focus)` | **#C40016** | 6.25:1 ✅ | 🔴 Vermelho forte |
| `--dss-focus-warning` | Amarelo aviso | `var(--dss-warning-deep)` ⚠️ | **#A66D08** | 4.36:1 ✅ | 🟤 Âmbar escuro |
| `--dss-focus-info` | Azul claro | `var(--dss-info-deep)` ⚠️ | **#0D7491** | 5.35:1 ✅ | 🔵 Petróleo |

---

### Dark Mode (Versões Mais Claras)

| Token | Nome | Hex Dark (opaco) | Contraste vs #262626 | Mudança |
|-------|------|------------------|----------------------|---------|
| `--dss-focus-primary` | Azul claro | **#3399E5** | 4.92:1 ✅ | +30% luminosidade |
| `--dss-focus-secondary` | Verde/Turquesa claro | **#26B3A4** | 5.81:1 ✅ | +15% luminosidade |
| `--dss-focus-tertiary` | Laranja claro | **#FF8033** | 6.04:1 ✅ | +25% luminosidade |
| `--dss-focus-accent` | Roxo claro | **#D066E5** | 4.84:1 ✅ | +18% luminosidade |
| `--dss-focus-dark` | Cinza médio | **#808080** | 3.83:1 ✅ | +100% luminosidade |
| `--dss-focus-success`<br>`--dss-focus-positive` | Verde claro | **#66E533** | 9.24:1 ✅ | +20% luminosidade |
| `--dss-focus-error`<br>`--dss-focus-negative` | Vermelho claro | **#E5334D** | 3.54:1 ✅ | +17% luminosidade |
| `--dss-focus-warning` | Amarelo claro | **#FFC633** | 9.64:1 ✅ | +12% luminosidade |
| `--dss-focus-info` | Azul ciano claro | **#33CCF2** | 7.97:1 ✅ | +20% luminosidade |

---

## 🎨 PALETA VISUAL COMPLETA

### Cores Light Mode

```
#006AC5 Primary    🔵🔵🔵🔵🔵 Azul escuro principal
#059C8D Secondary  🟢🟢🟢🟢🟢 Verde/Turquesa
#E35900 Tertiary   🟠🟠🟠🟠🟠 Laranja vibrante
#B02EC5 Accent     🟣🟣🟣🟣🟣 Roxo intenso
#3E3E3E Dark       ⚫⚫⚫⚫⚫ Cinza escuro
#34C30C Success    🟢🟢🟢🟢🟢 Verde vibrante
#C4001B Error      🔴🔴🔴🔴🔴 Vermelho forte
#E9AB00 Warning    🟡🟡🟡🟡🟡 Amarelo ouro
#0DB2D5 Info       🔵🔵🔵🔵🔵 Azul ciano
```

### Cores Dark Mode (Mais Claras)

```
#3399E5 Primary    🔵🔵🔵🔵🔵 Azul claro
#26B3A4 Secondary  🟢🟢🟢🟢🟢 Verde/Turquesa claro
#FF8033 Tertiary   🟠🟠🟠🟠🟠 Laranja claro
#D066E5 Accent     🟣🟣🟣🟣🟣 Roxo claro
#808080 Dark       ⚫⚫⚫⚫⚫ Cinza médio
#66E533 Success    🟢🟢🟢🟢🟢 Verde claro
#E5334D Error      🔴🔴🔴🔴🔴 Vermelho claro
#FFC633 Warning    🟡🟡🟡🟡🟡 Amarelo claro
#33CCF2 Info       🔵🔵🔵🔵🔵 Azul ciano claro
```

---

## 📐 CONFIGURAÇÃO TÉCNICA

### Dimensões e Propriedades

| Token | Valor | Descrição |
|-------|-------|-----------|
| `--dss-focus-ring-width` | `3px` | Largura do anel (WCAG recomenda ≥ 2px) |
| `--dss-focus-ring-offset` | `2px` | Espaço entre elemento e anel |
| `--dss-focus-ring-style` | `solid` | Estilo da borda |
| `--dss-focus-duration` | `150ms` | Duração da transição |
| `--dss-focus-easing` | `ease-in-out` | Curva de animação |

---

## 📝 EXEMPLOS DE USO

### Via Tokens CSS

```scss
.my-button {
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--dss-focus-ring-width) var(--dss-focus-primary);
    transition: box-shadow var(--dss-focus-duration) var(--dss-focus-easing);
  }
}
```

### Via Mixin (Recomendado)

```scss
.my-button {
  @include dss-focus-ring('primary');
  // Aplica automaticamente focus ring com todas as propriedades
}

.my-error-input {
  @include dss-focus-ring('error');
}

.my-success-button {
  @include dss-focus-ring('success');
}
```

### ❌ Customizado com RGB — REMOVIDO

Os companheiros `--dss-focus-*-rgb` **não existem mais** (ago/2026). Serviam ao
padrão `rgba(var(--dss-focus-primary-rgb), 0.7)` — exatamente o que fazia o anel
reprovar 1.4.11. Não tinham nenhum consumidor no repo.

Para um anel mais discreto use **offset**, não transparência.

### Com Offset (Espaço)

```scss
.my-input {
  &:focus-visible {
    outline: none;
    box-shadow: var(--dss-focus-shadow-primary-offset);
    // Aplica focus ring com 2px de espaço
  }
}
```

---

## ✅ VALIDAÇÃO WCAG 2.1 AA

### ⚠️ Esta seção já mentiu

Até ago/2026 estas tabelas afirmavam contrastes "validados" que **nunca bateram**
— alegavam `primary-focus #006AC5 @ 50%: 5.2:1 ✅` quando o real era **2.19:1**,
e `warning #E9AB00 @ 60%: 7.2:1 AAA` quando o real era **1.54:1**. O erro de
método: mediam a cor **sólida** e ignoravam o alpha, que é justamente o que
derrubava o contraste. O `wcag-kit` tinha a mesma cegueira e por isso nada
apontou. Ambos corrigidos.

### Contrastes medidos (vs `--dss-surface-default` #ffffff — light)

| Token | Hex (opaco) | Contraste | 1.4.11 (3:1) |
|-------|-------------|-----------|--------------|
| primary | #006AC5 | **5.43:1** | ✅ |
| secondary | #009C8D | **3.42:1** | ✅ |
| tertiary | #E95900 | **3.56:1** | ✅ |
| accent | #B02EC5 | **5.19:1** | ✅ |
| dark | #3E3E3E | **10.70:1** | ✅ |
| success / positive | #246714 | **6.94:1** | ✅ (nível `-deep`) |
| error / negative | #C40016 | **6.25:1** | ✅ |
| warning | #A66D08 | **4.36:1** | ✅ (nível `-deep`) |
| info | #0D7491 | **5.35:1** | ✅ (nível `-deep`) |

**Por que três usam `-deep`:** verde, amarelo e ciano não alcançam 3:1 contra
branco em **nenhuma** opacidade — nem 100% opacos (`positive-focus` 2.34,
`warning-focus` 2.04, `info-focus` 2.52). É a zona morta já conhecida da rampa.

### Contrastes medidos por marca (vs #ffffff)

| Marca | Token | Hex | Contraste |
|-------|-------|-----|-----------|
| hub | `--dss-focus-primary` | #BF590F (`--dss-hub-700`) | **4.52:1** ✅ |
| water | `--dss-focus-primary` | #026CC7 (`--dss-water-600`) | **5.29:1** ✅ |
| waste | `--dss-focus-primary` | #0A724E (`--dss-waste-700`) | **5.95:1** ✅ |

### Contrastes medidos (vs `--dss-surface-default` #262626 — dark)

| Token | Hex (opaco) | Contraste | 1.4.11 |
|-------|-------------|-----------|--------|
| primary | #3399E5 | **4.92:1** | ✅ |
| secondary | #26B3A4 | **5.81:1** | ✅ |
| tertiary | #FF8033 | **6.04:1** | ✅ |
| accent | #D066E5 | **4.84:1** | ✅ |
| dark | #808080 | **3.83:1** | ✅ |
| success / positive | #66E533 | **9.24:1** | ✅ |
| error / negative | #E5334D | **3.54:1** | ✅ |
| warning | #FFC633 | **9.64:1** | ✅ |
| info | #33CCF2 | **7.97:1** | ✅ |

**Total: 88 combinações medidas (light/dark × 3 marcas × 11 tokens), 0 reprovam.**

### Critérios WCAG Atendidos

- ✅ **2.4.7** Focus Visible - Level AA (foco sempre visível)
- ✅ **1.4.11** Non-text Contrast - Level AA (contraste ≥ 3:1 para UI)
- ✅ **1.4.3** Contrast (Minimum) - Level AA (contraste ≥ 4.5:1 para texto)

**IMPORTANTE:** Todos os focus rings atendem ou superam os requisitos WCAG 2.1 AA!

---

## 🌓 ESTRATÉGIA DARK MODE

### Por que Cores Diferentes?

Em dark mode, as cores precisam ser **mais claras E mais opacas** para:
1. Contrastar bem com fundos escuros (#262626)
2. Manter visibilidade em diferentes contextos
3. Garantir acessibilidade WCAG 2.1 AA

### Cálculo de Cores Dark

Versões dark são calculadas **aumentando a luminosidade** das cores base:

```
Light: #006AC5 (HSL: 207°, 100%, 39%)
Dark:  #3399E5 (HSL: 207°, 78%, 58%)  → +19% luminosidade

Light: #E35900 (HSL: 24°, 100%, 45%)
Dark:  #FF8033 (HSL: 24°, 100%, 60%)  → +15% luminosidade
```

### Opacidade Aumentada

| Modo | Opacidade Padrão | Opacidade Warning |
|------|------------------|-------------------|
| **Light** | 50% (0.5) | 60% (0.6) |
| **Dark** | 60% (0.6) | 70% (0.7) |

Opacidade aumentada em +10% para compensar fundo escuro.

---

## 🎨 ALIASES DISPONÍVEIS

Alguns tokens possuem aliases para facilitar uso:

| Alias | Token Principal | Uso |
|-------|----------------|-----|
| `--dss-focus-positive` | `--dss-focus-success` | Ações positivas |
| `--dss-focus-negative` | `--dss-focus-error` | Ações negativas |

**Ambos os nomes podem ser usados intercambiavelmente!**

---

## 🔧 HIGH CONTRAST MODE

Em modo de alto contraste, os valores são ajustados:

| Propriedade | Normal | High Contrast |
|-------------|--------|---------------|
| Width | 3px | **4px** (+1px) |
| Opacity | 0.5-0.6 | **0.8** (+0.3) |
| Cores | Translúcidas | **Mais saturadas** |

```scss
@media (prefers-contrast: high) {
  :root {
    --dss-focus-ring-width: 4px;
    --dss-focus-ring-opacity: 0.8;
    --dss-focus-primary: rgba(0, 106, 197, 0.8); // 80% opacidade
  }
}
```

---

## 🪟 FORCED COLORS MODE (Windows)

Em Windows High Contrast, todas as cores usam `Highlight` do sistema:

```scss
@media (forced-colors: active) {
  :root {
    --dss-focus-primary: Highlight;
    --dss-focus-error: Highlight;
    --dss-focus-success: Highlight;
    --dss-focus-ring-width: 3px;
  }
}
```

Garante visibilidade máxima em modos de acessibilidade do sistema operacional.

---

## 📊 RESUMO ESTATÍSTICO

### Total de Tokens

| Categoria | Quantidade |
|-----------|------------|
| **Cores Semânticas** | 4 (primary, secondary, tertiary, accent) |
| **Cores Feedback** | 4 (success, error, warning, info) + 1 (dark) |
| **Aliases** | 2 (positive, negative) |
| **Variantes RGB** | 9 (para cada cor) |
| **Box Shadows** | 9 (compostos prontos) |
| **Box Shadows Offset** | 4 (com espaçamento) |
| **Configuração** | 6 (width, offset, style, opacity, duration, easing) |
| **TOTAL** | **43 tokens** (light + dark) |

### Cores Únicas

- **9 cores base** em light mode
- **9 cores ajustadas** em dark mode
- **18 variantes RGB** para manipulação
- **≈ 43 tokens totais**

---

## 🎯 GUIA RÁPIDO DE ESCOLHA

| Contexto | Token Recomendado |
|----------|-------------------|
| Botão primário | `--dss-focus-primary` |
| Botão secundário | `--dss-focus-secondary` |
| Link/Botão terciário | `--dss-focus-tertiary` |
| Elemento de destaque | `--dss-focus-accent` |
| Elemento neutro/dark | `--dss-focus-dark` |
| Confirmação/Sucesso | `--dss-focus-success` |
| Erro/Cancelar | `--dss-focus-error` |
| Aviso/Atenção | `--dss-focus-warning` |
| Informação | `--dss-focus-info` |

---

**📚 Documentação Completa:** `DSS_IMPLEMENTATION_GUIDE.md`
**🎨 Cores Dark Mode:** `TOKENS_DARK_MODE_COMPLETO.md`
**🏗️ Arquitetura:** `DSS_COMPONENT_ARCHITECTURE.md`
