# Pré-prompt de Criação: DssFabAction (Nível 3)

**Objetivo:** Criar o componente `DssFabAction` no Design System Sansys (DSS) Fase 2, atuando como filho direto do `DssFab`.

## 1. Classificação e Contexto

- **Nome do Componente:** `DssFabAction`
- **Nível Arquitetural:** Nível 3 (Composição com dependências)
- **Família:** FAB (Floating Action Button)
- **Golden Reference:** `DssChip` (Componente interativo com touch target próprio)
- **Golden Context:** `DssButton` (Botão interativo com ícone e label)
- **Dependências:** `DssIcon` (Nível 1)
- **Status:** Desbloqueado (aguardava `DssFab`)

**Justificativa da Fase 2:** O `DssFabAction` é um componente filho que só faz sentido dentro do contexto de um `DssFab` pai. Ele compõe ícone e texto, e interage com a coreografia de animação do pai, caracterizando comportamento de Fase 2. A sua existência isolada não possui valor semântico ou funcional no Design System, sendo estritamente acoplado ao ciclo de vida e estado de expansão do seu componente pai.

**Papel no Ecossistema:** Como parte da família FAB, o `DssFabAction` representa ações secundárias ou contextuais que são reveladas apenas quando o usuário interage com a ação principal (`DssFab`). Isso ajuda a manter a interface limpa e focada, ocultando opções menos frequentes até que sejam necessárias.

## 2. Riscos Arquiteturais e Gates

### 2.1. Gate de Composição v2.4
- **Risco:** O `QFabAction` nativo injeta classes próprias e gerencia a transição de entrada/saída coordenada pelo `QFab` pai. A tentativa de recriar essa coreografia de animação pode levar a dessincronização visual e bugs de renderização.
- **Estratégia:** O `DssFabAction` deve ser um wrapper direto do `<q-fab-action>`. Não tente reconstruir a lógica de transição ou a comunicação com o pai. A delegação de responsabilidade para o framework base garante estabilidade e manutenibilidade a longo prazo.
- **Exceção (EXC-Gate):** Os seletores `.q-fab__action` e `.q-fab__action-icon` são internos do Quasar e necessários para override de tokens. Isso deve ser documentado no `dss.meta.json` como exceção ao Gate de Composição (precedente: `DssFab`). O uso de seletores internos deve ser restrito apenas ao que é estritamente necessário para adequação visual ao DSS.

### 2.2. Gate de Responsabilidade v2.4
- O `DssFabAction` **deve** repassar o evento `@click` para que o consumidor execute a ação final. A lógica de negócio nunca deve residir dentro do componente de UI.
- O `DssFabAction` **não deve** tentar fechar o `DssFab` pai manualmente. O Quasar já gerencia isso nativamente através da injeção de dependência entre os componentes.
- O componente deve garantir que qualquer customização visual não interfira na acessibilidade ou no comportamento padrão esperado de um botão de ação flutuante.

## 3. Mapeamento de API (Props e Eventos)

A API do `DssFabAction` foi desenhada para ser o mais enxuta possível, delegando a maior parte da complexidade para o `DssFab` pai. O foco aqui é apenas na configuração visual e de navegação da ação individual, garantindo que o desenvolvedor consumidor tenha apenas as opções necessárias para implementar a interface sem quebrar as regras do Design System.

### 3.1. Props Expostas (Permitidas)

**Visuais:**
- `color` (String) - Cor semântica (`hub`, `water`, `waste`, `positive`, `negative`, `warning`, `info`). Padrão: `hub`. Define a cor de fundo da ação. A cor escolhida deve refletir a intenção da ação (ex: `negative` para deletar).
- `text-color` (String) - Cor do ícone/texto. Se não fornecida, o Quasar tentará calcular automaticamente com base na cor de fundo, mas é recomendado usar tokens do DSS explícitos para garantir contraste adequado.
- `icon` (String) - Ícone da ação. Deve usar a nomenclatura padrão do DSS (ex: `dss-icon-add`, `dss-icon-edit`). O ícone é o elemento visual primário de identificação da ação.
- `label` (String) - Texto descritivo da ação. Aparece ao lado do ícone quando o FAB é expandido. É crucial para acessibilidade e clareza, especialmente quando o ícone pode ser ambíguo.
- `disable` (Boolean) - Desabilita a ação, impedindo cliques e aplicando opacidade reduzida. Útil para ações que dependem de um estado específico da aplicação para estarem disponíveis.

**Navegação:**
- `to` (String/Object) - Rota do Vue Router. Usado quando a ação deve navegar para uma rota interna da aplicação sem recarregar a página.
- `href` (String) - Link externo. Usado quando a ação deve abrir uma URL externa ou forçar um recarregamento completo.

**Eventos:**
- `@click` - Emitido quando a ação é clicada. O consumidor deve escutar este evento para executar a lógica de negócio correspondente à ação selecionada.

### 3.2. Props Bloqueadas (Governança DSS)
- `glossy`, `push`, `flat`, `outline`, `unelevated` → Assim como o pai, as ações do FAB são **sempre** elevadas. Não permitimos variações de estilo para manter a consistência visual e a metáfora de "camada flutuante" sobre o conteúdo principal.
- `padding` → O padding deve ser governado por tokens internos do DSS para garantir o touch target correto e a proporção visual adequada em relação ao FAB pai.
- `size` → O tamanho das ações é fixo (mini FAB) e não deve ser alterado pelo consumidor. Ações de tamanhos variados quebrariam a harmonia visual do menu expandido.

## 4. Governança de Tokens e CSS

A governança de tokens é estrita para garantir que o `DssFabAction` se comporte visualmente como um componente do DSS, mesmo sendo um wrapper do Quasar. A aplicação correta dos tokens garante que o componente responda adequadamente a mudanças de tema (Light/Dark mode) e densidade.

- **Border Radius:** `border-radius: var(--dss-radius-full)` (sempre circular). A forma circular é uma característica fundamental da família FAB.
- **Elevação:** `box-shadow: var(--dss-elevation-1)` (padrão) e `var(--dss-elevation-2)` (hover/active). *Nota: A elevação das ações é intencionalmente menor que a do trigger pai (`elevation-2` padrão) para estabelecer uma hierarquia visual clara, onde o pai está "acima" das ações filhas.*
- **Transição:** `transition: all var(--dss-duration-200) var(--dss-easing-standard)`. Garante animações suaves e consistentes de hover, focus e active, alinhadas com o restante do sistema.
- **Dimensão Mínima (Touch Target):** `min-width` e `min-height` devem usar `var(--dss-spacing-10)` (40px) para as ações filhas. Este tamanho é menor que o pai (56px) para reforçar a hierarquia, mas ainda atende aos requisitos mínimos de touch target.
- **Focus Ring (Dark Mode):** O catálogo não possui `outline: 2px solid white`. Usar `outline: 2px solid white` com exceção `EXC-States-02` documentada. O focus ring deve ter um offset adequado para não colar na borda do componente.
- **Cores de Fundo:** Devem mapear para os tokens de ação específicos, como `--dss-action-hub`, `--dss-action-water`, `--dss-action-waste`, etc.
- **Cores de Texto:** Devem mapear para `--dss-text-inverse` (para fundos escuros) ou `--dss-text-subtle` (para fundos claros), dependendo do contraste necessário para legibilidade.


## 5. Acessibilidade e Estados

A acessibilidade é uma prioridade no DSS. O `DssFabAction` deve garantir que todos os usuários, independentemente de suas capacidades motoras ou visuais, possam interagir com as ações de forma clara, previsível e segura.

- **Touch Target:** O botão de ação deve ter no mínimo 40x40px (padrão Material Design para mini FAB). Isso garante que seja facilmente clicável em dispositivos móveis e por usuários com tremores motores, reduzindo cliques acidentais em ações adjacentes.
- **Contraste:** As cores semânticas devem garantir um contraste mínimo de 4.5:1 para texto e ícones em relação ao fundo da ação, atendendo aos critérios AA das WCAG.
- **Navegação por Teclado:** O componente deve ser focável via `Tab` (quando o FAB pai estiver expandido) e ativável via `Enter` ou `Space`. A ordem de tabulação deve seguir a ordem visual das ações.
- **Aria Labels:** Se a prop `label` não for fornecida (ação apenas com ícone), a prop `icon` deve ser obrigatoriamente acompanhada de um `aria-label` descritivo para leitores de tela, explicando claramente o que a ação faz.

- **Estados aplicáveis:** `default`, `hover`, `focus`, `active`, `disabled`. A clareza visual entre esses estados é fundamental para o feedback interativo.

**Tabela de Delegação de Estados:**
| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `hover` | DSS (CSS) | Visual | Pseudo-classe `:hover` na ação. Aumenta a elevação para `elevation-2` e pode aplicar um leve overlay de cor para indicar interatividade. |
| `focus` | DSS (CSS) | Visual | Pseudo-classe `:focus-visible` na ação. Aplica o focus ring padrão do DSS (ou o fallback documentado para dark mode), garantindo visibilidade clara para navegação por teclado. |
| `active` | DSS (CSS) | Visual | Pseudo-classe `:active` na ação. Reduz levemente a escala (efeito de "pressão") ou altera a cor de fundo para fornecer feedback tátil imediato. |
| `disabled` | Quasar | Visual | Prop `disable` repassada ao `QFabAction`. Aplica opacidade de 50% e `pointer-events: none`, removendo o componente da ordem de tabulação e impedindo interações. |


## 6. Cenários de Uso Obrigatórios (Exemplos)

Os cenários de uso servem como documentação viva e testes visuais de regressão. O arquivo `DssFabAction.example.vue` deve cobrir exaustivamente as variações permitidas, garantindo que futuras atualizações não quebrem os comportamentos esperados.

O arquivo `DssFabAction.example.vue` deve cobrir os seguintes cenários:
1. **Padrão (Ícone + Label):** `DssFab` pai com 3 `DssFabAction` filhos contendo ícone e label. Demonstra o uso mais comum e recomendado para clareza máxima.
2. **Apenas Ícone:** Ações sem label. Útil para interfaces mais compactas onde o ícone é universalmente compreendido (ex: ícone de disquete para salvar). Deve incluir validação de `aria-label`.
3. **Cores Semânticas:** Um FAB expandido exibindo ações com cores diferentes (`hub`, `water`, `waste`, `positive`, `negative`, `warning`, `info`). Valida o mapeamento correto de todos os tokens de cor de fundo e texto.
4. **Estado Disabled:** Pelo menos uma ação desabilitada misturada com ações habilitadas. Valida o estado visual (opacidade) e a ausência de interatividade (não emite eventos, não recebe foco).
5. **Navegação (Router e Externa):** Uma ação usando a prop `to` (navegação interna) e outra usando `href` (link externo). Valida a renderização correta das tags HTML subjacentes (`<a>` ou `<router-link>`) e o comportamento de clique.
6. **Ações Longas:** Uma ação com um label intencionalmente longo para validar o comportamento de truncamento (text-overflow: ellipsis) ou quebra de linha, garantindo que o layout não quebre.


## 7. Exceções aos Gates v2.4

### EXC-States-02: Focus Ring no Dark Mode
- **Regra Violada:** Uso de valor hardcoded (`white`) em vez de token.
- **Justificativa:** O catálogo DSS não possui um token shorthand para o focus ring no dark mode. O fallback explícito é necessário para garantir WCAG 2.4.7 (Focus Visible).

## 8. Superfície de Playground (independente da API)

> **Propósito**: Definir explicitamente o que o playground interativo deve demonstrar, separado da especificação técnica da API. O playground é um artefato de primeira classe que permite stakeholders entender e testar o componente.

### 8.1 Controles Obrigatórios
- **Color**: Select com as cores semânticas [`hub`, `water`, `waste`, `positive`, `negative`, `warning`, `info`].

- **Icon**: Input de texto para testar diferentes ícones.
- **Label**: Input de texto para testar o tooltip/label da ação.
- **Disabled**: Toggle [true, false].

### 8.2 Composite Logic
- O `DssFabAction` **não pode** ser testado isoladamente no playground. Ele **deve** ser renderizado dentro de um `DssFab` pai.
- O playground deve demonstrar que o clique em um `DssFabAction` emite o evento correto e (opcionalmente) fecha o FAB pai, dependendo da configuração.
- A demonstração deve provar que a elevação do `DssFabAction` (elevation-1) é visualmente distinta da elevação do `DssFab` pai (elevation-2).

### 8.3 Estados a Expor
| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|---------|
| **Repouso** | Ação visível após expansão do pai | Visual | Padrão |
| **Hover** | Elevação aumentada (elevation-2) | Visual | Mouse over |
| **Focus** | Ring de foco visível | Visual | Navegação por teclado |
| **Disabled** | Opacidade reduzida, sem interatividade | Visual | Prop `disable="true"` |
