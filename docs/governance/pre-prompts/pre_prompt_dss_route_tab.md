# Pré-prompt de Criação de Componente DSS: DssRouteTab

## 1. Classificação e Contexto
- **Nome do Componente:** `DssRouteTab`
- **Família:** Tabs
- **Nível de Composição:** Nível 1 (Atômico)
- **Golden Reference:** `DssChip` (irmão arquitetural direto)
- **Golden Context:** `DssTabs` (container pai obrigatório)
- **Componente Quasar Base:** `QRouteTab`

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Duplicação de Lógica Visual
O `DssRouteTab` é visualmente idêntico ao `DssTab`. O maior risco é duplicar CSS, tokens e lógica de estados.
**Mitigação:** O `DssRouteTab` deve reutilizar o máximo possível da infraestrutura do `DssTab`. Se necessário, extraia a lógica visual compartilhada para um composable ou arquivo SCSS comum (ex: `_tab-shared.scss`), ou simplesmente importe os estilos do `DssTab` se a arquitetura permitir sem acoplamento frágil. A abordagem preferida é que o `DssRouteTab` aplique as mesmas classes CSS (`.dss-tab`) que o `DssTab`.

### 2.2. Gate de Responsabilidade v2.4
Como componente interativo, o `DssRouteTab` **deve** gerenciar seus próprios estados de `:hover`, `:focus-visible` e `:active`. Não delegue esses estados ao container `DssTabs`.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-route-tab>`. Como é um componente de Nível 1 (análogo ao `DssTab`), o uso do componente Quasar como raiz do template é permitido e esperado para manter a semântica de roteamento nativa do Vue Router/Quasar.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `name` (String/Number) - Identificador único da aba.
- `label` (String) - Texto da aba.
- `icon` (String) - Ícone da aba.
- `disable` (Boolean) - Estado desabilitado.
- `to` (String/Object) - Rota de destino (específico do QRouteTab).
- `exact` (Boolean) - Correspondência exata de rota.
- `replace` (Boolean) - Substituir histórico de navegação.
- `href` (String) - Link externo (fallback).
- `target` (String) - Target do link externo.
- `alert` (Boolean | String) - Indicador visual de alerta na aba. Em paridade com `DssTab` (Golden Reference). Quando `true`, exibe um ponto de alerta; quando `String`, exibe o valor como label do alerta.

> **Nota de Governança (GAP-02 — corrigido em 2026-04-10):** A prop `alert` foi implementada no componente em paridade com o `DssTab` (Golden Reference), mas estava ausente neste pré-prompt. A prop `alert-icon` permanece bloqueada.

### 3.2. Props Bloqueadas (Governança DSS)
- `ripple` - Forçado para `false` (DSS usa transições CSS puras).
- `no-caps` - Bloqueado (text-transform é governado por tokens tipográficos).
- `color`, `text-color` - Bloqueados (cores governadas por tokens/brands).
- `alert-icon` - Bloqueado (se necessário, usar composição com `DssBadge` no slot).

## 4. Governança de Tokens e CSS

O `DssRouteTab` deve utilizar exatamente os mesmos tokens que o `DssTab` (22 tokens confirmados na compilação SCSS):

- **Tipografia:** `--dss-font-size-sm`, `--dss-font-weight-medium`, `--dss-line-height-md`, `--dss-letter-spacing-wide`.
- **Texto:** `--dss-text-subtle` (estado padrão e desabilitado).
- **Superfícies:** `--dss-surface-hover`, `--dss-surface-active`.
- **Foco:** `outline: 2px solid white`; `--dss-focus-ring-offset`.
- **Transições:** `--dss-duration-150`, `--dss-easing-standard`.
- **Espaçamento:** `--dss-spacing-2`, `--dss-spacing-3`, `--dss-spacing-4`, `--dss-spacing-6`.
- **Borda:** `--dss-border-width-md`, `--dss-border-radius-sm`.
- **Touch Target:** `--dss-touch-target-md`.
- **Opacidade:** `--dss-opacity-disabled`.
- **Indicação de Seleção:** `--dss-action-hub-default`, `--dss-action-water-default`, `--dss-action-waste-default`, `--dss-action-dark-default`.

> **Nota de Governança (GAP-01 — corrigido em 2026-04-10):** O pré-prompt original listava tokens inválidos: `--dss-text-body-strong` (não existe no DSS), `--dss-motion-duration-fast` (nomenclatura incorreta — usar `--dss-duration-*`), `--dss-motion-easing-standard` (nomenclatura incorreta — usar `--dss-easing-standard`). Todos foram substituídos pelos tokens reais confirmados na compilação do componente.

## 5. Acessibilidade e Estados

- **Role:** O `QRouteTab` gerencia o `role="tab"` nativamente.
- **Aria-selected:** Gerenciado nativamente pelo Quasar em conjunto com o Vue Router.
- **Navegação por Teclado:** O foco deve ser visível (`:focus-visible`) e a ativação via `Enter`/`Space` deve acionar a navegação de rota.
- **High Contrast / Forced Colors:** Garantir que o estado selecionado seja distinguível sem depender apenas de cor (ex: borda inferior ou outline).

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssRouteTab.example.vue` deve cobrir:
1. **Básico:** Abas de rota simples (texto).
2. **Com Ícones:** Abas com ícone e texto.
3. **Desabilitado:** Aba de rota desabilitada.
4. **Navegação Exata vs Parcial:** Demonstração do uso da prop `exact`.
5. **Links Externos:** Uso de `href` e `target="_blank"`.

## 7. Detalhamento de Implementação e Boas Práticas

Para garantir a consistência e a qualidade do componente `DssRouteTab`, os desenvolvedores devem seguir estas diretrizes adicionais:

- **Semântica HTML:** O componente deve renderizar um elemento `<a>` ou `<router-link>` apropriado, dependendo se a prop `href` ou `to` for fornecida.
- **Performance:** Evite re-renderizações desnecessárias. Utilize `computed` properties para classes CSS dinâmicas.
- **Testes Unitários:** O componente deve ter cobertura de testes unitários para todas as props expostas e eventos emitidos.
- **Documentação:** A documentação do componente deve incluir exemplos claros de uso e uma tabela detalhada de props e eventos.
- **Revisão de Código:** Todas as alterações no componente devem passar por uma revisão de código rigorosa para garantir a conformidade com as diretrizes do DSS.
- **Feedback Visual:** Forneça feedback visual claro para todas as interações do usuário, incluindo hover, focus e active states.
- **Acessibilidade:** Certifique-se de que o componente seja totalmente acessível por teclado e leitores de tela.
- **Responsividade:** O componente deve se adaptar adequadamente a diferentes tamanhos de tela e dispositivos.
- **Manutenção:** Mantenha o código limpo, modular e bem documentado para facilitar a manutenção futura.
- **Consistência:** Garanta que o componente seja visualmente e funcionalmente consistente com outros componentes do DSS.

## 8. Superfície de Playground

### 8.1. Controles Obrigatórios

Para garantir a testabilidade e demonstração completa do `DssRouteTab` no Storybook ou ambiente de playground, os seguintes controles devem ser expostos:

- **`name`**: Permite definir o identificador único da aba, essencial para cenários de roteamento.
- **`label`**: Campo de texto para alterar o conteúdo textual da aba.
- **`icon`**: Seletor de ícones (preferencialmente de uma biblioteca de ícones DSS) para demonstrar a funcionalidade com ícones.
- **`disable`**: Toggle booleano para alternar o estado desabilitado do componente.
- **`to`**: Campo de texto para simular diferentes rotas de destino, permitindo testar a navegação.
- **`exact`**: Toggle booleano para testar a correspondência exata de rota.
- **`alert`**: Toggle booleano ou campo de texto para simular a presença de um alerta (ponto ou label).

### 8.2. Composite Logic (Concreta, Não Genérica)

O `DssRouteTab` deve demonstrar a lógica de composição com outros componentes DSS. Um exemplo concreto é a integração com `DssBadge` para exibir notificações ou contadores.

```vue
<template>
  <DssRouteTab to="/profile" label="Perfil">
    <template #default>
      <div class="dss-route-tab__content">
        <span>Perfil</span>
        <DssBadge v-if="hasNotifications" label="3" color="hub" />
      </div>
    </template>
  </DssRouteTab>
</template>

<script setup>
import { ref } from 'vue';
import DssRouteTab from './DssRouteTab.vue';
import DssBadge from '../DssBadge/DssBadge.vue'; // Assumindo o caminho correto

const hasNotifications = ref(true);
</script>

<style lang="scss" scoped>
.dss-route-tab__content {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-4);
}
</style>
```

Neste exemplo, o `DssBadge` é utilizado para indicar notificações no `DssRouteTab`, demonstrando uma composição real e não apenas um placeholder genérico.

### 8.3. Estados a Expor

| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| Padrão | Estado inicial, sem interação. | Visual | `--dss-text-subtle`, `--dss-surface-default` |
| `:hover` | Quando o cursor está sobre a aba. | Visual | `--dss-surface-hover`, `--dss-text-default` |
| `:focus-visible` | Quando a aba está focada via teclado. | Visual | `outline: 2px solid white`, `--dss-focus-ring-offset` |
| `:active` | Durante o clique ou ativação. | Visual | `--dss-surface-active`, `--dss-text-default` |
| `disable` | Quando a aba está desabilitada. | Visual | `--dss-opacity-disabled`, `--dss-text-subtle` |
| `selected` | Quando a rota correspondente está ativa. | Visual | `--dss-action-hub-default`, `--dss-action-hub-surface` |
| `alert` | Quando a aba possui um indicador de alerta. | Visual | `--dss-status-warning-default` (para o ponto de alerta) |

## 9. Diretrizes de Evolução e Versionamento

### 9.1. Versionamento Semântico
Qualquer alteração na API pública do `DssRouteTab` (adição, remoção ou modificação de props, eventos ou slots) deve seguir as regras de versionamento semântico do DSS.
- **Major:** Quebra de compatibilidade (ex: remoção de uma prop suportada).
- **Minor:** Adição de nova funcionalidade de forma retrocompatível (ex: nova prop opcional).
- **Patch:** Correções de bugs e ajustes internos que não afetam a API pública.

### 9.2. Depreciação de Funcionalidades
Se uma funcionalidade precisar ser removida, ela deve primeiro ser marcada como depreciada (usando JSDoc `@deprecated` e avisos no console em ambiente de desenvolvimento) por pelo menos uma versão minor antes de ser efetivamente removida em uma versão major.

### 9.3. Contribuições e Pull Requests
Ao enviar um Pull Request para modificar o `DssRouteTab`, o desenvolvedor deve garantir que:
- Todos os testes unitários passam.
- A documentação foi atualizada, se necessário.
- O componente foi testado no Storybook em diferentes cenários e estados.
- As diretrizes de acessibilidade foram mantidas ou melhoradas.
- O código segue os padrões de estilo e linting do projeto.

## 10. Referências e Links Úteis
- [Documentação do Vue Router](https://router.vuejs.org/)
- [Documentação do Quasar QRouteTab](https://quasar.dev/vue-components/tabs#qroutetab-api)
- [Diretrizes de Acessibilidade W3C (WAI-ARIA)](https://www.w3.org/WAI/standards-guidelines/aria/)
- [Design System Sansys - Guia de Contribuição](https://github.com/sansys/design-system/blob/main/CONTRIBUTING.md)
- [Design System Sansys - Padrões de Nomenclatura](https://github.com/sansys/design-system/blob/main/docs/NOMENCLATURE.md)
