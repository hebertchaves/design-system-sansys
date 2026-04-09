# Pré-prompt de Criação de Componente DSS: DssTabPanels

## 1. Classificação e Contexto
- **Nome do Componente:** `DssTabPanels`
- **Família:** Tabs
- **Nível de Composição:** Nível 2 (Composição de Primeiro Grau)
- **Golden Reference:** `DssCard` (como container de conteúdo estrutural)
- **Golden Context:** `DssTabs` — orquestrador irmão da família Tabs; o `DssTabPanels` é sempre usado em conjunto com `DssTabs` para garantir a sincronização do `v-model` entre abas e painéis.
- **Componente Quasar Base:** `QTabPanels`

> **Nota de Governança (GAP-05 — corrigido em 2026-04-09):** O Golden Context original declarava "Layouts de página ou DssCard" — ambíguo. A implementação do componente confirmou que o contexto canônico é `DssTabs`. O `DssCard` permanece como Golden Reference (container estrutural), não como Golden Context.

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Animações e Transições
O `QTabPanels` nativo suporta animações de transição entre painéis (`animated`, `transition-prev`, `transition-next`). O maior risco é o uso de transições que não estejam alinhadas com os tokens de motion do DSS ou que violem preferências de acessibilidade (`prefers-reduced-motion`).

**Mitigação:** O `DssTabPanels` deve governar as transições. Se `animated` for true, deve utilizar transições suaves (ex: fade direction-agnostic) que respeitem os tokens `--dss-duration-200` e `--dss-easing-standard`. O CSS deve desativar animações se `prefers-reduced-motion: reduce` estiver ativo, usando `--dss-duration-0`.

> **Nota de Governança (GAP-04 — corrigido em 2026-04-09):** Os tokens `--dss-motion-duration-standard` e `--dss-motion-easing-standard` **não existem** no catálogo DSS. Os tokens canônicos corretos são:
> - Duração: `--dss-duration-200` (animação padrão) e `--dss-duration-0` (reduced-motion)
> - Easing: `--dss-easing-standard`
> - Background transparente: usar a keyword CSS `transparent` diretamente — o token `--dss-surface-transparent` **não existe**.

### 2.2. Gate de Responsabilidade v2.4
O `DssTabPanels` é um **container orquestrador não-interativo**. Ele gerencia qual painel está visível (via `v-model`), mas não possui estados de `:hover`, `:focus` ou `:active` no próprio container. A interatividade pertence aos componentes filhos (`DssTabPanel` e seu conteúdo).

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper do `<q-tab-panels>`. Como é um componente de Nível 2, ele **DEVE** restringir seu slot default para aceitar apenas componentes `DssTabPanel`. O uso de tags HTML nativas ou outros componentes diretamente no slot do `DssTabPanels` é estritamente proibido.

**Exceção prevista (EXC-01):** O uso de `<q-tab-panels>` diretamente no template é uma exceção formal ao Gate de Composição v2.4 Regra 1. Justificativa: o `QTabPanels` gerencia a visibilidade dos painéis via `provide/inject` com os `QTabPanel` filhos — funcionalidade que não pode ser reimplementada sem o componente Quasar. Esta exceção deve ser registrada em `gateExceptions.compositionGateV24.templateStructure` no `dss.meta.json`.

**Exceção prevista (EXC-02):** O bloco `<style>` sem `scoped` é necessário para as classes de transição Vue (`.dss-tab-panels-enter-active`, etc.) que são aplicadas pelo Vue runtime nos filhos do slot — fora do escopo `data-v-xxx` do root. Esta exceção deve ser registrada em `gateExceptions.compositionGateV24.styleBlock` no `dss.meta.json`.

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

> **Atenção:** Use apenas tokens que existem no catálogo `DSS_TOKEN_REFERENCE.md`. Os tokens abaixo foram validados na implementação do componente.

- **Background:** O background deve ser `transparent` por padrão (keyword CSS direta — o token `--dss-surface-transparent` não existe no catálogo DSS).
- **Duração de transição:** `--dss-duration-200` (padrão) e `--dss-duration-0` (quando `prefers-reduced-motion: reduce`).
- **Easing de transição:** `--dss-easing-standard`.
- **Contraste forçado:** `1px solid ButtonText` (system keyword — EXC canônica do DSS, precedente em `DssTabs` e `DssCard`).

## 5. Acessibilidade e Estados

- **Role:** O `QTabPanels` não possui um role específico que exija sobrescrita, mas os painéis internos (`DssTabPanel`) gerenciam `role="tabpanel"`.
- **Motion:** É obrigatório respeitar `@media (prefers-reduced-motion: reduce)` desativando transições com `--dss-duration-0`.
- **Contraste:** Implementar `@media (forced-colors: active)` com `1px solid ButtonText` para garantir visibilidade em modo de alto contraste.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssTabPanels.example.vue` deve cobrir:
1. **Básico:** Navegação simples entre painéis (sem animação).
2. **Animado:** Navegação com a prop `animated` ativa.
3. **Swipeable:** Navegação por swipe (útil para mobile).
4. **Keep Alive:** Demonstração de preservação de estado em inputs dentro dos painéis.

> **Isenção DSS:** Arquivos `.example.vue` são isentos de Token First e Gate de Composição para scaffolding de contexto. Adicionar este comentário no `<script setup>` do arquivo de exemplo.
