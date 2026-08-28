# Frente: a brandabilidade passa por fora da camada de token

**Status:** medido, **não iniciado** — aguardando decisão de escopo
**Origem:** descoberto ao verificar o alcance do alto contraste (`DSS_ALTO_CONTRASTE_SPIKE.md`)
**Raiz já conhecida:** é a mesma causa registrada em *"prop `brand` não remapeia `--dss-action-primary`"* — agora com consequência medida

---

## 1. O fato

O DSS tem **dois mecanismos de marca**, e eles não são equivalentes:

| mecanismo | como chega ao componente | passa pela camada de token? |
|---|---|---|
| atributo `[data-brand="hub"]` | `tokens/brand/_hub.scss` remapeia `--dss-action-primary` | ✅ sim |
| prop `brand="hub"` | gera a classe `.dss-x--brand-hub`, e o `4-output/_brands.scss` do componente pinta com `var(--dss-hub-600)` | ❌ não |

O bloco típico já casa os **dois seletores** — o problema não é o seletor, é o **valor**:

```scss
[data-brand="hub"],
.dss-badge--brand-hub {
  &.dss-badge {
    background-color: var(--dss-hub-600);   /* ← primitivo cru */
    color: var(--dss-gray-50);
  }
}
```

Como pinta o primitivo direto, **qualquer coisa que remapeie o token semântico não o alcança** — nem o alto contraste, nem um tema futuro, nem um override de marca local.

## 2. O tamanho

```
581  usos de var(--dss-{hub,water,waste}-NNN) em componentes
577  deles concentrados em 4-output/ (a camada de brands)
 92  componentes tem 4-output/_brands.scss
---
175  usos de var(--dss-action-primary*)  ← a minoria
```

**A maior parte da brandabilidade do DSS passa por fora da camada de token.**

## 3. A consequência medida

Verificado com `scripts/wcag-kit.mjs`, texto branco sobre o fundo de marca:

| mecanismo | tema claro | tema `hc` |
|---|---|---|
| atributo `[data-brand]` | 2.81 ❌ | **8.88 ✅** |
| prop `brand` (classe) | 2.81 ❌ | **2.81 ❌** |

O alto contraste corrige um caminho e não o outro. Como os produtos usam a prop, **é o caminho que mais importa que está descoberto**.

> **Correção de escopo:** o spike de alto contraste afirma "32 células AAA, 2 temas × 4 contextos". Aquelas medições foram todas pelo **atributo**. A afirmação vale para `[data-brand]`, não para a prop.

## 4. A forma da correção

Duas partes. A segunda **já tem precedente no repo**: `semantic/accessibility/_focus.scss` aliasa as classes de brand justamente para resolver este problema no anel de foco.

**(a) a classe remapeia o token** — em vez de só pintar:

```scss
[data-brand="hub"],
.dss-badge--brand-hub {
  --dss-action-primary: var(--dss-hub-600);       /* remapeia */
  &.dss-badge {
    background-color: var(--dss-action-primary);  /* usa o semântico */
  }
}
```

**(b) o componente consome o semântico**, nunca o primitivo de marca.

Feito isso, `[data-theme="hc"] .dss-badge--brand-hub` passa a alcançar — exatamente como já alcança `[data-theme="hc"] [data-brand="hub"]` hoje.

## 5. Riscos, e por que isso não é faxina

- **577 usos em 92 componentes.** Volume alto e mexe no coração da brandabilidade.
- **Quebra em silêncio.** Um componente com caso especial (gradiente de marca, borda em tom diferente do fundo, estado que usa outro passo da escala) não falha em gate nenhum — falha em tela.
- **Nem todo uso vira `action-primary`.** Muitos `_brands.scss` usam vários passos da escala (`hub-50` para fundo sutil, `hub-700` para hover, `hub-950` para texto). O mapeamento não é 1:1 com um único token semântico; parte vai precisar de tokens de marca semânticos que ainda não existem.
- **Interage com a paleta HC de marca.** Os passos que escolhi em `themes/hc/_brands.scss` assumem `--dss-action-primary`. Se a refatoração criar outros tokens semânticos de marca, o HC precisa cobri-los também.

## 6. Escopo sugerido

**Piloto primeiro, não big bang.** Três componentes que exercitam os casos distintos:

| componente | por que |
|---|---|
| `DssBadge` | caso simples: fundo + texto + variante outline |
| `DssButton` | caso completo: 4 variantes × estados × hover/active |
| `DssChip` | caso com múltiplos passos da escala no mesmo bloco |

Com o piloto fechado dá para medir o custo real por componente e decidir se os 89 restantes vão em lote ou por onda.

## 7. O que NÃO fazer

- Não migrar às cegas com `sed`. O mapeamento passo→token semântico **não é mecânico**.
- Não começar sem definir os tokens semânticos de marca que faltam (o equivalente a `-light`/`-hover`/`-deep` por marca).
- Não tratar como pré-requisito do alto contraste: o HC já funciona via atributo, e essa frente **melhora** o alcance dele, não o destrava.

## 8. Dependência registrada

`88e0b5a` migrou 9 usos de texto branco sobre fundo de marca para `--dss-text-on-primary`. Isso **melhora** o `hcdark` hoje (texto escuro sobre `hub-600` dá ~7.4:1 contra 2.81 do branco), mas o par texto/fundo só fica coerente quando o fundo também seguir o tema — ou seja, quando esta frente for executada.

---

## Reprodução

```bash
# o alcance de cada mecanismo
node scripts/wcag-kit.mjs --dss-text-on-primary --dss-action-primary hub hc   # 8.88 (atributo)
node scripts/wcag-kit.mjs --dss-text-on-primary --dss-hub-600 "" hc           # 2.81 (prop)

# o tamanho
grep -rhoE "var\(--dss-(hub|water|waste)-[0-9]+\)" packages/core/components --include=*.scss | wc -l
grep -rhoE "var\(--dss-action-primary[a-z-]*\)"     packages/core/components --include=*.scss | wc -l
```
