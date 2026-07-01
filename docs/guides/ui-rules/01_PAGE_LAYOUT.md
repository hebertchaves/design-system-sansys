# Módulo 1: Page Layout & Estrutura Base

> **Status:** Normativo
> **Integração:** Grid Inspector (Figma) & MCP

Este módulo define as regras fundamentais para a estruturação de páginas e o ritmo vertical/horizontal das interfaces construídas com o DSS.

## 1.1. Regras de Container

O `DssPageContainer` é o elemento raiz obrigatório para qualquer conteúdo de página.

- **✅ OBRIGATÓRIO:** Todo conteúdo principal deve estar dentro de um `DssPageContainer`.
- **✅ OBRIGATÓRIO:** O padding interno do container deve usar `--dss-spacing-4` (16px) em mobile e `--dss-spacing-6` (24px) em desktop.
- **❌ PROIBIDO:** Usar larguras fixas (ex: `width: 1200px`) para o container principal. O DSS usa larguras fluidas com limites máximos (max-width) definidos pelos breakpoints.
- **❌ PROIBIDO:** Remover o padding do container para fazer elementos "sangrarem" nas bordas. Se um elemento precisa ocupar 100% da largura, ele deve estar fora do `DssPageContainer` ou usar margens negativas controladas.

## 1.2. Ritmo Vertical (Vertical Rhythm)

O ritmo vertical define o espaçamento entre blocos de conteúdo de cima para baixo.

- **✅ OBRIGATÓRIO:** O espaçamento entre seções principais (ex: entre um Header e um Card, ou entre dois Cards grandes) deve ser `--dss-spacing-6` (24px) ou `--dss-spacing-8` (32px).
- **✅ OBRIGATÓRIO:** O espaçamento entre elementos relacionados dentro de uma mesma seção (ex: título e parágrafo) deve ser `--dss-spacing-2` (8px) ou `--dss-spacing-3` (12px).
- **❌ PROIBIDO:** Usar valores arbitrários como `margin-top: 15px` ou `margin-bottom: 20px`. Apenas os tokens da escala `--dss-spacing-*` são permitidos.
- **❌ PROIBIDO:** Misturar margens superiores e inferiores de forma inconsistente. **Regra de Ouro:** Aplique margens apenas em uma direção (preferencialmente `margin-bottom` ou `margin-top`, mas não ambos no mesmo elemento) para evitar colapso de margens imprevisível. O uso de `gap` em flexbox/grid é preferível a margens.

## 1.3. Sistema de Grid e Colunas

O DSS utiliza o sistema de grid flexbox do Quasar (`row`, `col-*`), mas com regras estritas de espaçamento (gutters).

- **✅ OBRIGATÓRIO:** Usar as classes utilitárias do Quasar (`q-col-gutter-*`) mapeadas para os tokens do DSS.
- **✅ OBRIGATÓRIO:** O gutter padrão entre colunas em formulários e cards de dados é `--dss-spacing-4` (16px) (`q-col-gutter-md`).
- **✅ OBRIGATÓRIO:** Em layouts densos (ex: painéis de controle), o gutter pode ser reduzido para `--dss-spacing-2` (8px) (`q-col-gutter-sm`).
- **❌ PROIBIDO:** Criar grids customizados com `display: grid` e `gap` hardcoded quando o sistema flexbox do Quasar atende à necessidade.
- **❌ PROIBIDO:** Aninhar grids excessivamente (mais de 3 níveis de profundidade) sem necessidade, pois isso degrada a performance de renderização e complica a manutenção.

## 1.4. Responsividade e Breakpoints

As interfaces devem se adaptar fluidamente aos breakpoints definidos no `DSS_TOKEN_REFERENCE.md`.

- **✅ OBRIGATÓRIO:** Projetar primeiro para mobile (Mobile First) e usar as classes `col-sm-*`, `col-md-*`, etc., para ajustar o layout em telas maiores.
- **✅ OBRIGATÓRIO:** Em telas mobile (xs), colunas de formulário e cards devem, por padrão, ocupar 100% da largura (`col-12`), empilhando-se verticalmente.
- **❌ PROIBIDO:** Ocultar conteúdo crítico em telas menores usando `display: none` (classes `hidden` ou `mobile-hide`) apenas para "fazer caber". O conteúdo deve ser reorganizado ou colocado em menus/drawers.

## 1.5. Validação no Grid Inspector

O Grid Inspector do Figma verificará automaticamente:
1. Se as margens e paddings correspondem aos valores exatos da escala `--dss-spacing-*`.
2. Se os gutters das colunas estão alinhados com a escala permitida (8px, 16px, 24px).
3. Se o alinhamento dos elementos respeita a grade de 8px (ou 4px para elementos densos).
