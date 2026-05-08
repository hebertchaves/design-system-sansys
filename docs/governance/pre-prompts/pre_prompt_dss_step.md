# Pré-prompt de Criação de Componente DSS: DssStep

## 1. Classificação e Contexto
- **Nome do Componente:** `DssStep`
- **Família:** Navegação (Stepper)
- **Nível de Composição:** Nível 1 (Independente)
- **Golden Reference:** `DssChip` (para estados de seleção e interatividade)
- **Golden Context:** `DssTabs` (selado v2.2, Abr 2026 — container de navegação mais próximo disponível; DssStepper é compositionFuture)
- **Componente Quasar Base:** `QStep`
- **Dependências Diretas:** `DssIcon` (interno ao Quasar)

**Justificativa da Fase 2:** O `DssStep` é o bloco de construção fundamental para fluxos de assistente (wizards) e processos guiados passo a passo. Ele gerencia seu próprio estado visual (ativo, concluído, erro, desabilitado) e o encapsulamento do conteúdo interno, mas depende estritamente do `DssStepper` (ou do `QStepper` base durante a transição) para a orquestração global de navegação. O componente deve ser altamente flexível para acomodar diferentes tipos de conteúdo em seu slot principal (formulários, resumos, confirmações), mantendo a consistência visual rigorosa do Design System em todas as suas variações de estado.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Ícones e Conectores Nativos
O `QStep` nativo renderiza ícones de status (check, edit, error) e linhas conectoras entre os passos usando classes internas (`.q-stepper__dot`, `.q-stepper__line`). O risco arquitetural primário é que esses elementos não utilizem as cores semânticas e a tipografia do DSS, resultando em uma interface inconsistente que quebra a identidade visual da marca.
**Mitigação:** O `DssStep` deve sobrescrever os estilos desses elementos internos via CSS descendente, garantindo o uso de tokens semânticos como `--dss-feedback-success` para passos concluídos e `--dss-feedback-error` para passos com erro. A injeção de estilos deve ser precisa para evitar vazamento de CSS.

### 2.2. Gate de Responsabilidade v2.4
O `DssStep` é um componente **híbrido**: a área do cabeçalho (título, caption e ícone/dot) é interativa (se o stepper for configurado como navegável), enquanto a área de conteúdo (painel) é um container estático. O componente deve garantir estados claros de `:hover` e `:focus-visible` apenas na área clicável (`.q-stepper__tab`), sem afetar o painel de conteúdo. O foco deve ser visível, acessível e seguir as diretrizes de acessibilidade do DSS.

### 2.3. Gate de Composição v2.4
O componente deve atuar como um wrapper direto e transparente do `<q-step>`. O slot `default` é destinado exclusivamente ao conteúdo do passo e pode receber qualquer componente DSS. O `DssStep` não deve tentar gerenciar o estado global do stepper, delegando essa responsabilidade ao componente pai. A comunicação de estado deve fluir de cima para baixo (props) e de baixo para cima (eventos, se aplicável).

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `name` (String | Number) - Identificador único do passo (obrigatório). Usado pelo stepper pai para controle de navegação e determinação do passo ativo.
- `title` (String) - Título principal do passo. Deve ser conciso, descritivo e indicar claramente a ação ou fase do processo.
- `caption` (String) - Texto secundário exibido abaixo do título. Útil para fornecer contexto adicional, status detalhado ou instruções breves.
- `icon` (String) - Ícone customizado para o passo (sobrescreve o número sequencial padrão). Deve utilizar a biblioteca de ícones oficial do DSS.
- `active-icon` (String) - Ícone específico exibido quando o passo está no estado ativo.
- `done-icon` (String) - Ícone específico exibido quando o passo está no estado concluído (geralmente um checkmark).
- `error-icon` (String) - Ícone específico exibido quando o passo está no estado de erro (geralmente um alerta ou x).
- `done` (Boolean) - Marca o passo como concluído. Altera a aparência visual do dot e do texto para indicar sucesso na etapa.
- `error` (Boolean) - Marca o passo com estado de erro. Altera a aparência visual para indicar falha, exigindo atenção do usuário.
- `disable` (Boolean) - Desabilita a interação com o passo. O passo não poderá ser clicado, focado ou navegado, e sua opacidade será reduzida.

### 3.2. Props Bloqueadas (Governança DSS)
- `color` / `active-color` / `done-color` / `error-color` - Bloqueadas. As cores de estado são estritamente governadas pelo CSS do DSS. O uso de cores arbitrárias quebra a consistência do sistema (brand para ativo, success para done, error para erro).
- `prefix` - Bloqueado. O DSS utiliza apenas números sequenciais ou ícones no dot, não permitindo prefixos textuais customizados para manter o alinhamento visual.
- `header-nav` - Bloqueado no nível do passo. A navegação pelo cabeçalho deve ser controlada globalmente pelo stepper pai, não por passos individuais, garantindo um comportamento uniforme.

### 3.3. Eventos Expostos
- O `DssStep` não emite eventos próprios de navegação. A interação de clique no cabeçalho é interceptada e gerenciada pelo `QStepper` pai, que emite os eventos de mudança de passo (`@update:model-value`).

## 4. Governança de Tokens e CSS

O `DssStep` deve utilizar os seguintes tokens rigorosamente para garantir a conformidade com o Design System:

### 4.1. Tipografia
- **Título:** `--dss-text-body`, `--dss-font-weight-medium`. O título deve ter destaque hierárquico adequado.
- **Caption:** `--dss-text-subtle`, `--dss-font-size-sm`. O caption deve ser visualmente subordinado ao título.
- **Conteúdo:** A tipografia do conteúdo interno deve herdar as configurações padrão do DSS, sem forçar estilos específicos no wrapper, permitindo flexibilidade máxima.

### 4.2. Cores de Estado (Dot/Ícone)
- **Ativo:** `--dss-action-hub` (ou a brand ativa via `[data-brand]`, como `hub`, `water`, `waste`). O passo ativo deve refletir a identidade da marca atual.
- **Concluído (`done`):** `--dss-feedback-success`. Indica que a etapa foi finalizada sem problemas.
- **Erro (`error`):** `--dss-feedback-error`. Indica que há pendências ou validações falhas na etapa.
- **Inativo:** `--dss-surface-muted` (dot) ou `--dss-text-subtle` (texto). Indica passos futuros que ainda não foram alcançados.

### 4.3. Espaçamento e Layout
- **Padding Interno:** O conteúdo do passo deve utilizar `--dss-spacing-4` para garantir respiro adequado e alinhamento com a grade do sistema.
- **Conectores (Linhas):** `--dss-gray-300` (light mode) / `--dss-gray-600` (dark mode). As linhas que conectam os passos devem ser sutis e não competir visualmente com os dots.

### 4.4. Interatividade e Foco
- **Hover:** O cabeçalho interativo deve apresentar um background sutil no hover, utilizando `--dss-action-hub-surface` com opacidade reduzida, fornecendo feedback visual imediato.
- **Focus:** A área clicável do passo (`.q-stepper__tab`) deve receber o focus ring padrão quando navegada por teclado. Em fundos escuros, usar `outline: 2px solid white` para garantir visibilidade.

## 5. Acessibilidade e Estados

- **Role:** O `QStep` gerencia a semântica de abas/painéis nativamente quando inserido em um `QStepper`. O atributo `role="tabpanel"` é aplicado ao conteúdo, enquanto o cabeçalho atua como `role="tab"`.
- **Foco:** A área clicável do passo (`.q-stepper__tab`) deve ser plenamente acessível via teclado (teclas Tab e setas direcionais) e ativável via Enter ou Space.
- **Contraste:** Garantir que os ícones brancos ou números dentro dos dots coloridos (success, error, brand) tenham contraste mínimo de 3:1 (WCAG AA para elementos gráficos e textos grandes).
- **Aria-labels:** O componente deve garantir que estados críticos como `done` e `error` sejam comunicados de forma clara a leitores de tela, possivelmente adicionando texto visualmente oculto (sr-only) se a implementação base do Quasar não o fizer de forma satisfatória.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssStep.example.vue` deve cobrir exaustivamente os seguintes cenários (simulando um stepper pai simples ou usando o componente isolado se possível, para fins de documentação):

1. **Básico:** Passo inativo padrão, exibindo apenas o número sequencial e o título.
2. **Ativo:** Passo atualmente selecionado, destacando a cor da brand (`hub`, `water`, `waste`) no dot e no texto.
3. **Concluído:** Passo com a prop `done` ativa, exibindo o ícone de sucesso e a cor `--dss-feedback-success`.
4. **Erro:** Passo com a prop `error` ativa, exibindo o ícone de erro e a cor `--dss-feedback-error`.
5. **Com Caption:** Passo exibindo título e subtítulo para fornecer contexto adicional ao usuário.
6. **Desabilitado:** Passo com a prop `disable` ativa, demonstrando a opacidade reduzida e a ausência total de interatividade.
7. **Ícones Customizados:** Passo utilizando as props `icon`, `active-icon`, `done-icon` e `error-icon` para substituir os ícones padrão por alternativas semânticas.

## 7. Exceções aos Gates v2.4

### EXC-01: Seletores de Classe Interna do Quasar (Gate de Composição)
- **Regra Violada:** Regra 1 (Proibição de seletores CSS que referenciam classes internas do Quasar).
- **Justificativa:** O `QStep` renderiza uma estrutura DOM complexa que inclui o cabeçalho (`.q-stepper__tab`), o dot do ícone (`.q-stepper__dot`), o título (`.q-stepper__title`) e o painel de conteúdo (`.q-stepper__step-content`). Para aplicar a tipografia correta, as cores de estado (success/error) e o focus ring customizado do DSS, é estritamente necessário usar seletores descendentes como `.dss-step .q-stepper__dot`. Esta é uma exceção formal e documentada para garantir a fidelidade visual do Design System, visto que o Quasar não expõe slots suficientes para substituir completamente esses nós internos.

## 8. Superfície de Playground

A documentação interativa do `DssStep` deve expor controles claros e abrangentes para que os desenvolvedores possam testar todos os estados, variações e comportamentos do componente em tempo real.

### 8.1. Controles Obrigatórios
- **Brand (Contexto):** Seletor global para testar o componente sob diferentes marcas do ecossistema (`hub`, `water`, `waste`), garantindo que as cores de estado ativo se adaptem corretamente.
- **Estado do Passo:** Controles booleanos (toggles) para alternar dinamicamente entre os estados `done`, `error` e `disable`.
- **Conteúdo Textual:** Campos de texto (inputs) para editar livremente o `title` e o `caption`, permitindo testar o comportamento do layout com textos longos.
- **Ícones:** Seletores (dropdowns) para definir `icon`, `active-icon`, `done-icon` e `error-icon`, validando a integração com a biblioteca de ícones.

### 8.2. Composite Logic
A lógica de composição no playground deve demonstrar de forma concreta como o `DssStep` reage a mudanças de estado injetadas pelo componente pai (`QStepper` ou `DssStepper`), ilustrando um fluxo de navegação real.

```vue
<template>
  <q-stepper v-model="currentStep" :data-brand="selectedBrand" animated>
    <dss-step
      :name="1"
      title="Informações Básicas"
      caption="Preencha seus dados pessoais"
      :done="currentStep > 1"
      :error="hasValidationError"
    >
      <div class="q-pa-md">
        <p>Conteúdo interativo do passo 1. Aqui iria um formulário.</p>
      </div>
    </dss-step>
    
    <dss-step
      :name="2"
      title="Revisão e Confirmação"
      caption="Verifique os dados antes de enviar"
      :disable="!isStep1Valid"
    >
      <div class="q-pa-md">
        <p>Conteúdo do passo 2. Resumo das informações.</p>
      </div>
    </dss-step>
  </q-stepper>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(1)
const selectedBrand = ref('hub')
const hasValidationError = ref(false)
const isStep1Valid = ref(true)
</script>
```

### 8.3. Estados a Expor

A tabela abaixo define os estados predefinidos que devem estar disponíveis como presets no playground, facilitando a visualização rápida das variações do componente.

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Inativo Padrão | Estado padrão de um passo futuro, aguardando navegação. | Visual | `name="1"`, `title="Passo 1"` |
| Ativo (Hub) | Passo atual, destacado com a cor da brand Hub. | Visual | `name="1"`, `title="Passo 1"`, `data-brand="hub"` |
| Ativo (Water) | Passo atual, destacado com a cor da brand Water. | Visual | `name="1"`, `title="Passo 1"`, `data-brand="water"` |
| Ativo (Waste) | Passo atual, destacado com a cor da brand Waste. | Visual | `name="1"`, `title="Passo 1"`, `data-brand="waste"` |
| Concluído | Passo finalizado com sucesso, utilizando o token `--dss-feedback-success`. | Visual | `done: true` |
| Erro de Validação | Passo com validação falha, utilizando o token `--dss-feedback-error`. | Funcional | `error: true` |
| Desabilitado | Passo inacessível, com opacidade reduzida e sem eventos de ponteiro. | Visual | `disable: true` |
| Com Caption Longo | Passo exibindo informações secundárias extensas para validar o layout. | Visual | `caption="Texto auxiliar muito longo para testar quebra de linha"` |
| Ícone Customizado | Passo utilizando um ícone específico em vez do número sequencial padrão. | Visual | `icon="dss-icon-settings"` |
