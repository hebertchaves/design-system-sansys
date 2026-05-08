# Pré-prompt: DssPagination

## 1. CLASSIFICAÇÃO E CONTEXTO

### Golden Reference
O `DssPagination` é um componente interativo, portanto, sua Golden Reference é o `DssChip`.

### Golden Context
O baseline específico de auditoria para o `DssPagination` é o `DssBtnGroup`. Ambos são containers de botões coordenados interativos: `DssBtnGroup` agrupa `DssButton` em linha, enquanto `DssPagination` gerencia uma série de botões de página numerados. A decisão de delegação de estados (hover, focus, active) para os botões internos, o padrão de `inline-flex` no container, e a abordagem de theming via CSS custom properties seguem o mesmo modelo arquitetural.

### Contexto do Componente
O componente `DssPagination` é essencial para a navegação eficiente em grandes conjuntos de dados, permitindo que os usuários percorram o conteúdo dividido em páginas. No contexto de um Design System baseado em Vue.js/Quasar, ele padroniza a experiência de paginação, garantindo consistência visual e funcional em toda a aplicação. Ele abstrai a complexidade da lógica de paginação e da renderização de elementos de navegação, oferecendo uma interface simples e configurável para desenvolvedores.

### Justificativa
A paginação é um padrão de UI fundamental para a usabilidade de aplicações que exibem listas, tabelas ou qualquer conteúdo extenso. A criação de um componente `DssPagination` garante que todas as instâncias de paginação sigam as diretrizes de design e acessibilidade do DSS, reduzindo o esforço de desenvolvimento e manutenção, e promovendo uma experiência de usuário coesa e otimizada.

## 2. RISCOS ARQUITETURAIS E GATES

### Riscos Arquiteturais

- **⚠️ CALCANHAR DE AQUILES — Motor QPagination sem slot API (CRÍTICO):** O `QPagination` do Quasar não fornece API de slot para botões individuais de página. Isso torna impossível substituir os botões internos por `DssButton`, exigindo obrigatoriamente uma exceção ao Gate de Composição v2.4 (EXC-01) no `dss.meta.json`. Todo o theming visual deve ser feito via sobreescrita de seletores CSS internos estáveis (EXC-Gate-01) e da propriedade CSS `--q-color-primary`. Anti-pattern: tentar reconstruir a lógica de paginação manualmente fora do QPagination. Padrão correto: usar QPagination como motor e aplicar theming via `--q-color-primary` + seletores `.q-pagination .q-btn`.
- **Performance**: Renderização de um grande número de botões de página pode impactar a performance em cenários extremos, exigindo otimizações ou estratégias de exibição condensada.
- **Acessibilidade**: Falha em implementar corretamente atributos ARIA (`role="navigation"`, `aria-label`, `aria-current="page"`) e navegação por teclado pode excluir usuários com deficiência. Atenção: QPagination usa `aria-current="page"` (não `"true"`) no botão ativo.
- **Flexibilidade**: Um design excessivamente rígido pode limitar a capacidade de adaptação a diferentes requisitos de paginação (ex: paginação infinita, carregamento sob demanda).
- **Sincronização de Estado**: Problemas na sincronização do estado da página atual entre o componente e o contexto da aplicação (Vuex, Pinia, etc.).

### Gates
- **Revisão de Design**: Validação do layout e comportamento com a equipe de design.
- **Testes de Performance**: Avaliação do desempenho com diferentes volumes de dados e configurações de página.
- **Auditoria de Acessibilidade**: Verificação de conformidade com WCAG, incluindo navegação por teclado e leitores de tela.
- **Testes de Unidade e Integração**: Cobertura abrangente para garantir a funcionalidade e a integração com a API do Quasar.

## 3. MAPEAMENTO DE API (QUASAR → DSS)

O `DssPagination` encapsulará o `QPagination` do Quasar, expondo e adaptando suas propriedades, eventos e slots principais.

| Propriedade Quasar (`QPagination`) | Propriedade DSS (`DssPagination`) | Descrição | Observações | Tipo | Padrão | Tokens DSS |
| `v-model` (current page) | `model-value` | Página atual selecionada. | Obrigatório para controle do estado. | `Number` | `1` | N/A |
| `max` (total pages) | `total-pages` | Número total de páginas. | Obrigatório. | `Number` | `1` | N/A |
| `max-pages` (visible buttons) | `visible-pages` | Número máximo de botões de página visíveis. | Controla a densidade da paginação. | `Number` | `5` | N/A |
| `direction-links` | `show-direction-links` | Exibe links para a primeira/última página. | | `Boolean` | `false` | N/A |
| `boundary-links` | `show-boundary-links` | Exibe links para a página anterior/próxima. | | `Boolean` | `false` | N/A |
| `ellipses` | `show-ellipses` | Exibe reticências para páginas ocultas. | | `Boolean` | `true` | N/A |
| `color` | `color` | Cor dos botões de paginação. | Mapear para tokens de cor do DSS. | `String` | `primary` | `--dss-color-primary` |
| `text-color` | `text-color` | Cor do texto dos botões. | Mapear para tokens de cor do texto do DSS. | `String` | `white` | `--dss-color-on-primary` |
| `size` | `size` | Tamanho dos botões de paginação. | Mapear para tokens de espaçamento do DSS. | `String` | `md` | `--dss-spacing-4` (altura) |
| `@update:model-value` | `@update:model-value` | Evento emitido quando a página atual muda. | | `Function` | N/A | N/A |

## 4. GOVERNANÇA DE TOKENS E CSS

O `DssPagination` utilizará exclusivamente tokens numéricos/padrão do DSS para estilização, garantindo a consistência visual e a aderência ao Design System. Abaixo estão exemplos de tokens a serem utilizados:

- **Espaçamento:** `--dss-spacing-4` (para padding interno dos botões, espaçamento entre botões), `--dss-spacing-2` (para espaçamento menor).
- **Raio de Borda:** `--dss-radius-md` (para os botões de página).
- **Cores de Superfície:** `--dss-surface-default` (para o fundo dos botões inativos), `--dss-surface-primary` (para o fundo do botão ativo).
- **Cores de Texto:** `--dss-text-on-surface` (para texto em botões inativos), `--dss-text-on-primary` (para texto em botão ativo).
- **Duração de Transição:** `--dss-duration-250` (para transições de hover/focus).

**Tokens de Exemplo:**

```css
.dss-pagination-button {
  padding: var(--dss-spacing-4);
  border-radius: var(--dss-radius-md);
  background-color: var(--dss-surface-default);
  color: var(--dss-text-on-surface);
  transition: background-color var(--dss-duration-250) ease;
}

.dss-pagination-button--active {
  background-color: var(--dss-surface-primary);
  color: var(--dss-text-on-primary);
}
```

## 5. ACESSIBILIDADE E ESTADOS

O `DssPagination` deve ser totalmente acessível, seguindo as diretrizes WCAG. Isso inclui:

- **Navegação por Teclado**: Usuários devem ser capazes de navegar entre os botões de paginação usando `Tab` e ativar com `Enter` ou `Space`.
- **Leitores de Tela**: Utilização de atributos ARIA apropriados, como `aria-label` para descrever a função de cada botão (ex: "Página 1", "Próxima página"), e `aria-current="page"` para indicar a página ativa.
- **Estados Visuais**: Os estados `hover`, `focus`, `active` e `disabled` devem ser claramente distinguíveis visualmente, utilizando tokens de cor e sombra do DSS.

### Estados Previstos
- **Default**: Botões de página inativos.
- **Hover**: Botão de página sob o cursor.
- **Focus**: Botão de página focado via teclado.
- **Active**: Botão de página atualmente selecionado.
- **Disabled**: Botões de navegação (anterior/próximo, primeira/última) desabilitados quando não aplicável (ex: na primeira página, o botão "Anterior" é desabilitado).

## 6. DEPENDÊNCIAS E COMPOSIÇÃO

### Dependências
- **Quasar Framework**: `QPagination` (componente base).
- **DSS Core**: Tokens de design (cores, espaçamento, tipografia, raio de borda).

### Composição
O `DssPagination` é um componente autônomo, mas pode ser composto com outros componentes do DSS para formar layouts mais complexos, como:
- `DssTable`: Para paginar os resultados de uma tabela.
- `DssList`: Para paginar itens em uma lista.
- `DssSelect` ou `DssInput`: Para permitir que o usuário selecione o número de itens por página.

## 7. EXCEÇÕES PREVISTAS

- **Número de Páginas Inválido**: Se `total-pages` for menor que 1, a paginação não deve ser exibida ou deve ser desabilitada.
- **Página Atual Fora do Intervalo**: Se `model-value` for maior que `total-pages` ou menor que 1, o componente deve ajustar automaticamente para a página mais próxima válida (ex: 1 ou `total-pages`).
- **Customização de Ícones**: Embora o Quasar permita customização de ícones, o `DssPagination` deve restringir o uso a ícones da biblioteca de ícones do DSS para manter a consistência.

## 8. SUPERFÍCIE DE PLAYGROUND

### Controles
- `model-value` (Número): Slider para alterar a página atual.
- `total-pages` (Número): Input para definir o número total de páginas.
- `visible-pages` (Número): Slider para ajustar o número de botões visíveis.
- `show-direction-links` (Checkbox): Ativar/desativar links de direção.
- `show-boundary-links` (Checkbox): Ativar/desativar links de limite.
- `show-ellipses` (Checkbox): Ativar/desativar reticências.
- `color` (Select): Selecionar cor primária (ex: `primary`, `secondary`, `accent`).
- `size` (Select): Selecionar tamanho (ex: `sm`, `md`, `lg`).

### Composite Logic
O playground deve demonstrar a interação do `DssPagination` com um componente simulado que exibe dados paginados. Ao alterar a página no `DssPagination`, o conteúdo exibido no componente simulado deve ser atualizado para refletir os dados da nova página.

### Estados a Expor
- **Página Atual**: Exibir o valor de `model-value` em tempo real.
- **Estado dos Links de Navegação**: Indicar quando os links "Anterior", "Próximo", "Primeira" e "Última" estão desabilitados.
- **Configuração de Tokens Aplicados**: Mostrar os tokens de espaçamento, raio e cor que estão sendo aplicados ao componente com base nas seleções dos controles.