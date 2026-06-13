# Pré-prompt Oficial — DssFooter
**Versão do Pré-prompt:** 1.0
**Data de Criação:** 2026-04-18
**Status:** Aprovado (componente selado em 2026-04-18)
**Família:** Superfícies e Layout
**Nível:** 3 — Composição de Segundo Grau

---

## 1. Classificação e Contexto

- **Nome do Componente:** DssFooter
- **Família:** Superfícies e Layout
- **Nível de Composição:** Nível 3 (Composição de Segundo Grau)
- **GGolden Reference: DssBadge (como componente não-interativo de layout))
- **Golden Context:** DssHeader (selado 2026-04-17) — par simétrico de mesma arquitetura
  > ⚠️ **Nota de Correção:** O pré-prompt original (entregue inline) declarou "Golden Context: DssLayout (container pai futuro, Nível 4)". Isso era uso incorreto da terminologia. DssLayout não existe e não tem Selo DSS v2.2. O Golden Context efetivo, conforme `DSS_GOLDEN_COMPONENTS.md` (componente com Selo v2.2 de proximidade semântica máxima), é **DssHeader**. Corrigido neste arquivo.
- **Componente Quasar Base:** QFooter
- **Dependência Direta:** DssToolbar (Nível 1)

**Justificativa de Fase 2:** DssFooter é o container inferior de layout de página, par simétrico do DssHeader. Como componente de Nível 3, ele orquestra componentes de Nível 1 (DssToolbar) e interage diretamente com o sistema de layout do Quasar (QLayout). Encapsula primitivo de layout (`<q-footer>`) sem reimplementar sua lógica.

---

## 2. Grande Risco Arquitetural

### Risco Principal: Injeção de Layout e Z-Index

Assim como o QHeader, o QFooter nativo injeta variáveis CSS no QLayout pai para calcular o offset do conteúdo da página e gerencia seu próprio z-index para ficar sobreposto ao conteúdo rolado. O risco é que a sobrescrita de estilos quebre a matemática de layout do Quasar ou cause problemas de empilhamento (z-index) com modais e drawers.

**Mitigação:** O DssFooter não deve alterar o z-index nativo nem as propriedades de posicionamento (`position: fixed/absolute`) aplicadas pelo Quasar. As customizações devem se restringir a bordas, sombras (elevation) e cores de fundo.

### Risco Secundário: bg-hub !important do QFooter

O QFooter aplica `bg-hub !important` como fundo padrão. Para sobrescrever com `--dss-surface-default`, é necessário usar `!important` no CSS do DssFooter. Documentado como EXC-02.

**Padrão correto (✅):**
```scss
/* 2-composition/_base.scss */
.dss-footer {
  background-color: var(--dss-surface-default) !important;
  color: var(--dss-text-body) !important;
}
```

**Anti-pattern (❌):**
```scss
/* NÃO sobrescrever z-index ou position */
.dss-footer {
  z-index: 9999;
  position: sticky; /* quebra a matemática de layout do Quasar */
}
```

### Gate de Responsabilidade v2.4

O DssFooter é um container estrutural de layout 100% não-interativo. Ele não possui estados de `:hover`, `:focus` ou `:active`. Sua responsabilidade é ancorar o conteúdo no rodapé da página e gerenciar a elevação visual (sombra/borda) em relação ao conteúdo rolado.

### Gate de Composição v2.4

O componente deve ser um wrapper direto do `<q-footer>`. O slot default é destinado exclusivamente a componentes DssToolbar (ou DssTabs em cenários específicos de navegação global de baixo). O uso de HTML nativo ou texto solto diretamente no DssFooter viola a governança de Nível 3.

---

## 3. Mapeamento de API (DSS vs Quasar)

### Props Expostas (Permitidas)

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `elevated` | `Boolean` | `false` | Aplica sombra de elevação projetada para cima (EXC-05) |
| `bordered` | `Boolean` | `false` | Aplica borda superior sutil (`border-top`) |

### Props Bloqueadas (Governança DSS)

| Prop QFooter | Motivo |
|--------------|--------|
| `color` | Fundo governado por `--dss-surface-default` + EXC-02 |
| `height-hint` | Altura calculada automaticamente pelo Quasar |
| `dark` | Modo escuro governado globalmente via `[data-theme="dark"]` |

### Props Repassadas via $attrs

| Prop QFooter | Descrição |
|--------------|-----------|
| `reveal` | Oculta/exibe o footer ao rolar a página |
| `reveal-offset` | Offset em pixels para acionar o reveal |

---

## 4. Governança de Tokens

| Token | Uso |
|-------|-----|
| `--dss-surface-default` | Cor de fundo (sobrescreve `bg-hub !important`) |
| `--dss-text-body` | Cor de texto padrão |
| `--dss-border-width-thin` | Espessura da borda superior na variante `bordered` |
| `--dss-gray-200` | Cor da borda superior na variante `bordered` |
| `--dss-border-width-md` | Borda reforçada em `prefers-contrast: more` |

> ⚠️ **Nota de Correção:** O pré-prompt original referenciava o token `--dss-shadow-2`, que **não existe** no catálogo DSS v2.2. O token correto para a sombra equivalente é `--dss-shadow-md` (= `--dss-elevation-2`). Como não existe token `--dss-elevation-up-*` para sombras projetadas para cima, a variante `elevated` usa EXC-05 (valor hardcoded `0 -4px 6px rgba(0,0,0,0.30)` = invertido de `--dss-shadow-md`).

**Diferenças em relação ao DssHeader:**
- DssHeader usa `--dss-elevation-2` diretamente (sombra para baixo, visível abaixo do header)
- DssFooter usa EXC-05 (sombra invertida para cima, visível acima do footer)
- DssHeader usa `border-bottom` na variante bordered; DssFooter usa `border-top`

---

## 5. Acessibilidade e Estados

### Role ARIA

- `role="contentinfo"` aplicado nativamente pelo QFooter
- Deve haver apenas **um** DssFooter por página (landmark único)
- `aria-label` recomendado via `$attrs`

### Decisão Touch Target

**Opção B — não implementado.** DssFooter é container não-interativo. Touch targets são responsabilidade exclusiva dos filhos (DssButton dentro de DssToolbar).

### Delegação de Estados

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `hover` | `hover` | Visual | Mouse over |
| `focus` | `focus` | Visual | Navegação por teclado (Tab) |
| `active` | `active` | Visual | Mouse press / tecla Enter |
| `disabled` | `disabled` | Visual | Prop `disable=true` |
| `loading` | `loading` | Funcional | Prop `loading=true` |
| `error` | `error` | Funcional | Prop `error=true` ou validação |

### Estados do DssFooter

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `elevated` | Sombra upward via EXC-05 | Visual | — |
| `bordered` | Border-top via `--dss-border-width-thin` | Visual | — |
| `dark mode` | Via `[data-theme="dark"]` | Visual | `[data-theme="dark"]` ativo |
| `forced-colors` | System keywords (EXC-03) | Visual | Media query `forced-colors: active` |
| `print` | Hardcoded + position: static (EXC-04) | Visual | Media query `print` |

---

## 6. Exceções Formais Previstas

| ID | Descrição | Arquivo |
|----|-----------|---------|
| EXC-01 | `<q-layout>` no exemplo (DssLayout Nível 4 inexistente) | `DssFooter.example.vue` |
| EXC-02 | `!important` em background (sobrescreve `bg-hub !important` do QFooter) | `2-composition/_base.scss` |
| EXC-03 | System color keywords em forced-colors | `4-output/_states.scss` |
| EXC-04 | Valores hardcoded em print incluindo `position: static` | `4-output/_states.scss` |
| EXC-05 | Sombra upward `0 -4px 6px rgba(0,0,0,0.30)` — equivalente invertido de `--dss-shadow-md` | `3-variants/_elevated.scss` |

---

## 7. Cenários de Uso Obrigatórios

1. **Básico** — Footer simples com DssToolbar + copyright e links
2. **Elevated** — Prop `elevated` com sombra projetada para cima
3. **Bordered** — Prop `bordered` com borda superior
4. **Com Brand** — DssToolbar com `brand="hub"` (cor vem do toolbar, não do footer)
5. **Múltiplos Toolbars** — Dois DssToolbar empilhados (links + copyright)

> **Nota sobre exemplos:** Como DssLayout (Nível 4) ainda não existe, os exemplos usam `<q-layout>` nativo temporariamente (EXC-01). Isenção formal conforme DSS_IMPLEMENTATION_GUIDE.md.

---

## 8. Superfície de Playground

A Superfície de Playground do DssFooter é um ambiente controlado para testar e validar o comportamento do componente em diferentes configurações e com diversos conteúdos. Ela deve permitir a manipulação dos controles obrigatórios e a observação dos estados expostos, garantindo que o componente se comporte conforme as especificações do Design System Sansys v2.2.

### Controles Obrigatórios

Para garantir a auditabilidade e testabilidade do DssFooter, os seguintes controles devem estar disponíveis no playground. Estes controles refletem as `props` expostas e as capacidades de slot do componente:

- **`elevated` (Boolean):** Um toggle para ativar ou desativar a sombra de elevação projetada para cima (conforme EXC-05). Isso permite visualizar o impacto visual da elevação em relação ao conteúdo da página.
- **`bordered` (Boolean):** Um toggle para ativar ou desativar a borda superior sutil. Essencial para verificar a aplicação correta do token `--dss-border-width-thin` e `--dss-gray-200`.
- **`aria-label` (String):** Um campo de texto para definir o `aria-label` do footer. Crucial para testar a acessibilidade e garantir que o landmark `contentinfo` seja corretamente identificado por tecnologias assistivas.
- **Conteúdo do Slot Padrão:** Um editor de texto ou área de arrastar e soltar para injetar conteúdo HTML ou outros componentes DSS (como DssToolbar ou DssTabs) dentro do slot padrão do DssFooter. Isso simula cenários de uso reais e valida a governança de composição de Nível 3.

### Composite Logic (Lógica Composta Concreta)

A lógica composta do DssFooter é relativamente simples, pois ele atua primariamente como um container de layout, delegando a maior parte da interatividade aos seus filhos. No entanto, existem aspectos concretos de sua lógica que devem ser observados:

- **Gerenciamento de Elevação:** Quando `elevated` é `true`, o componente aplica a sombra definida em EXC-05. A lógica garante que esta sombra seja projetada para cima, diferenciando-o visualmente do DssHeader. Isso é implementado via CSS, mas a ativação é controlada pela prop.
- **Aplicação de Borda:** Quando `bordered` é `true`, o DssFooter aplica uma borda superior. A lógica garante que os tokens `--dss-border-width-thin` e `--dss-gray-200` sejam utilizados, e que a borda seja visível e consistente com o restante do Design System.
- **Integração com QFooter:** O DssFooter encapsula o `QFooter` do Quasar. Sua lógica garante que as `props` repassadas via `$attrs` (como `reveal` e `reveal-offset`) funcionem corretamente, sem interferir na injeção de layout e z-index do Quasar (conforme mitigação do Risco Principal).
- **Tratamento de `!important`:** A lógica interna do componente, ou a folha de estilo associada, deve lidar com a sobrescrita de `bg-hub !important` do QFooter, aplicando `--dss-surface-default !important` para garantir a cor de fundo correta (EXC-02).

### Estados a Expor

Os estados a seguir devem ser facilmente observáveis e testáveis na Superfície de Playground, seja visualmente ou através de ferramentas de inspeção do navegador:

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Padrão | DssFooter sem elevação ou borda. | Visual | Estado inicial do componente. |
| Elevado | DssFooter com sombra projetada para cima. | Visual | Ativar o controle `elevated`. |
| Com Borda | DssFooter com borda superior. | Visual | Ativar o controle `bordered`. |
| Modo Escuro | DssFooter renderizado no tema escuro. | Visual | Alternar o tema global da aplicação para escuro (`[data-theme="dark"]`). |
| Forced Colors | DssFooter adaptado para modos de alto contraste. | Visual | Ativar o modo de alto contraste do sistema operacional. |
| Com Conteúdo | DssFooter contendo componentes filhos (ex: DssToolbar). | Visual | Injetar conteúdo no slot padrão. |
| Revelado/Oculto | DssFooter que aparece/desaparece ao rolar a página. | Visual | Simular rolagem da página com a prop `reveal` ativada. |

## 9. Histórico

| Data | Evento |
|------|--------|
| 2026-04-18 | Pré-prompt criado e componente implementado |
| 2026-04-18 | Auditoria DSS v2.5 executada — 0 NCs, 5 GAPs identificados |
| 2026-04-18 | GAPs resolvidos — Selo DSS v2.2 emitido |
