# Pré-prompt de Criação de Componente DSS: DssTabPanel

## 1. Classificação e Contexto
- **Nome do Componente:** `DssTabPanel`
- **Família:** Tabs
- **Nível de Composição:** Nível 1 (Independente)
- Golden Reference: `DssBadge` (como container de conteúdo)
- **Golden Context:** `DssTabPanels` (container pai obrigatório, Nível 2)
- **Componente Quasar Base:** `QTabPanel`

## 2. Riscos Arquiteturais e Gates de Responsabilidade

### 2.1. Risco Principal: Espaçamento Interno (Padding)
O `QTabPanel` nativo aplica um padding padrão que pode não estar alinhado com o sistema de espaçamento do DSS. O maior risco é ter painéis com paddings hardcoded que quebram a consistência do layout.
**Mitigação:** O `DssTabPanel` deve sobrescrever o padding nativo utilizando os tokens de espaçamento do DSS (ex: `var(--dss-spacing-4)` ou equivalente). A prop `disable` (se aplicável ao conteúdo) deve ser gerenciada com cuidado para não bloquear interações não intencionais.

### 2.2. Gate de Responsabilidade v2.4
O `DssTabPanel` é um **container estrutural não-interativo**. Ele não deve possuir estados de `:hover`, `:focus` ou `:active` no próprio painel. A interatividade pertence aos componentes filhos renderizados dentro do seu slot.

### 2.3. Gate de Composição v2.4
O componente deve ser um wrapper direto do `<q-tab-panel>`. Como é um componente de Nível 1, o uso do componente Quasar como raiz do template é permitido. Não deve haver lógica complexa de renderização, apenas o repasse de slots e props.

## 3. Mapeamento de API (Props e Eventos)

### 3.1. Props Expostas (Permitidas)
- `name` (String/Number, **Obrigatório**): Identificador único para o painel de abas. Essencial para o funcionamento do `v-model` no componente pai `DssTabPanels`, garantindo que a aba correta seja ativada e seu conteúdo exibido. Deve ser uma string ou um número que identifique de forma inequívoca este painel dentro do conjunto de abas.
- `disable` (Boolean, Opcional): Quando `true`, desabilita a interação com o painel e seu conteúdo. Embora o `DssTabPanel` seja um container não-interativo, esta prop pode ser útil para indicar visualmente que o conteúdo da aba não está disponível ou é inacessível no momento. A implementação deve garantir que a desabilitação seja apenas visual e não afete a acessibilidade de forma negativa, se o conteúdo for interativo.

### 3.2. Eventos Emitidos
- Nenhum evento customizado deve ser emitido diretamente pelo `DssTabPanel`, pois sua função é puramente de container de conteúdo. Eventos de interação devem ser tratados pelos componentes filhos dentro do slot padrão.

### 3.3. Props Bloqueadas (Governança DSS)
- `dark` - Bloqueado (o dark mode é governado globalmente pelo DSS via classe `.dss-theme-dark` ou atributo `data-theme`).

## 4. Governança de Tokens e CSS

- **Espaçamento:** O padding interno deve ser governado por tokens do DSS. O token adotado na implementação foi `--dss-spacing-6` (24px), e não `--dss-spacing-4` (16px) como sugerido inicialmente. Justificativa: 24px proporciona espaçamento mais generoso e adequado para conteúdo de painéis de abas, seguindo o padrão visual do `DssBadge` (Golden Reference). Esta decisão deve ser mantida em revisões futuras.
- **Background:** O background deve ser transparente por padrão (`--dss-surface-transparent`), herdando a cor do container pai (`DssTabPanels` ou `DssCard`), a menos que haja uma variante específica.
- **Tipografia:** Deve herdar a tipografia base do DSS (`--dss-text-body`).

## 5. Acessibilidade e Estados

- **Role:** O `QTabPanel` gerencia o `role="tabpanel"` nativamente.
- **Aria-labelledby:** Deve ser corretamente associado à aba correspondente (gerenciado pelo Quasar em conjunto com o `QTabPanels`).
- **Foco:** O painel em si não deve receber foco, mas seu conteúdo interativo sim.

## 6. Cenários de Uso Obrigatórios (Exemplos)

O arquivo `DssTabPanel.example.vue` deve cobrir:
1. **Básico:** Painel simples com texto.
2. **Conteúdo Rico:** Painel contendo outros componentes DSS (ex: `DssCard`, `DssButton`).
3. **Sem Padding:** Demonstração de como remover o padding (se houver uma classe utilitária ou prop para isso, ex: `.q-pa-none` substituída por utilitário DSS).

## 8. Superfície de Playground

### 8.1. Controles Obrigatórios
- `v-model` para controlar a aba ativa.
- Slot padrão para o conteúdo do painel.

### 8.2. Composite Logic
O `DssTabPanel` deve renderizar o conteúdo do slot apenas quando for a aba ativa, para otimizar a performance e evitar renderizações desnecessárias. A transição entre painéis deve ser suave, utilizando as transições padrão do Quasar, se aplicável, ou uma transição CSS simples.

### 8.3. Estados a Expor
| Estado | Descrição | Tipo | Trigger |
|--------|-----------|------|----------|
| `active` | Indica se o painel está visível e ativo. | Boolean | Mouse press / tecla Enter |
| `disabled` | Indica se o painel está desabilitado. | Boolean | Prop `disable=true` |
