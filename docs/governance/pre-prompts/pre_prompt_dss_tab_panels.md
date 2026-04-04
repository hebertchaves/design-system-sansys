# Pré-prompt de Criação de Componente DSS: DssTabPanels

## 1. Classificação e Contexto
- **Nome do Componente:** `DssTabPanels`
- **Família:** Tabs
- **Nível de Composição:** Nível 2 (Composição de Primeiro Grau)
- **Golden Reference:** `DssCard` (como container de conteúdo)
- **Golden Context:** Layouts de página ou `DssCard`
- **Componente Quasar Base:** `QTabPanels`

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Animações e Transições
O `QTabPanels` nativo suporta animações de transição entre painéis (`animated`, `transition-prev`, `transition-next`). O maior risco é o uso de transições que não estejam alinhadas com os tokens de motion do DSS ou que violem preferências de acessibilidade (`prefers-reduced-motion`).
**Mitigação:** O `DssTabPanels` deve governar as transições. Se `animated` for true, deve utilizar transições suaves (ex: fade) que respeitem os tokens `--dss-motion-duration-*` e `--dss-motion-easing-*`. O CSS deve desativar animações se `prefers-reduced-motion: reduce` estiver ativo no sistema do usuário.

### 2.2. Gate de Responsabilidade v2.4
O `DssTabPanels` é um **container orquestrador não-interativo**. Ele gerencia qual painel está visível (via `v-model`), mas não possui estados de `:hover`, `:focus` ou `:active` no próprio container. A interatividade pertence aos componentes filhos (`DssTabPanel` e seu conteúdo).

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper do `<q-tab-panels>`. Como é um componente de Nível 2, ele **DEVE** restringir seu slot default para aceitar apenas componentes `DssTabPanel`. O uso de tags HTML nativas ou outros componentes diretamente no slot do `DssTabPanels` é estritamente proibido.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `modelValue` (String/Number) - O painel ativo (v-model).
- `animated` (Boolean) - Habilita transições entre painéis.
- `swipeable` (Boolean) - Permite navegação por swipe (touch).
- `infinite` (Boolean) - Navegação infinita (ao chegar no último, volta ao primeiro).
- `keep-alive` (Boolean) - Mantém o estado dos painéis inativos na memória.

### 3.2. Props Bloqueadas (Governança DSS)
- `dark` - Bloqueado (o dark mode é governado globalmente pelo DSS).
- `transition-prev`, `transition-next` - Bloqueados (as transições são padronizadas pelo DSS quando `animated` é true).

## 4. Governança de Tokens e CSS

- **Background:** O background deve ser transparente por padrão (`--dss-surface-transparent`), herdando a cor do container pai, a menos que haja uma variante específica.
- **Transições:** Quando `animated` for true, as transições devem usar `--dss-motion-duration-standard` e `--dss-motion-easing-standard`.

## 5. Acessibilidade e Estados

- **Role:** O `QTabPanels` não possui um role específico que exija sobrescrita, mas os painéis internos (`DssTabPanel`) gerenciam `role="tabpanel"`.
- **Motion:** É obrigatório respeitar `@media (prefers-reduced-motion: reduce)` desativando transições.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssTabPanels.example.vue` deve cobrir:
1. **Básico:** Navegação simples entre painéis (sem animação).
2. **Animado:** Navegação com a prop `animated` ativa.
3. **Swipeable:** Navegação por swipe (útil para mobile).
4. **Keep Alive:** Demonstração de preservação de estado em inputs dentro dos painéis.
