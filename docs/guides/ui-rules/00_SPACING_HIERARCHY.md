# Módulo 0: Hierarquia de Espaçamento

> **Status:** Normativo
> **Integração:** Grid Inspector (Figma) & MCP

Este módulo define a regra fundamental de espaçamento do DSS: **a hierarquia de aninhamento**. Quanto maior a área do componente e seu nível na cascata, maiores devem ser os gaps, margins e paddings.

## 0.1. A Regra da Cascata de Espaçamento

O espaçamento no DSS não é arbitrário; ele obedece a uma lógica de "bonecas russas" (Matryoshka). Um container externo sempre deve ter um padding/gap maior ou igual ao de seus filhos internos.

- **❌ PROIBIDO:** Um elemento filho ter um padding ou gap maior que o seu container pai.
- **✅ OBRIGATÓRIO:** Seguir os 4 níveis de hierarquia de espaçamento descritos abaixo.

## 0.2. Os 4 Níveis de Hierarquia

### Nível 1: Raiz (Page, Layout, Drawer)
A camada mais externa da aplicação. Define o respiro principal da tela.
- **Componentes típicos:** `DssPageContainer`, `DssDrawer`, `DssLayout`.
- **Padding esperado:** `--dss-spacing-4` (16px) em mobile, `--dss-spacing-6` (24px) em desktop.
- **Gap esperado (entre seções):** `--dss-spacing-6` (24px) a `--dss-spacing-8` (32px).

### Nível 2: Seções Principais (Cards raiz, Panels)
Os grandes blocos de conteúdo dentro da página.
- **Componentes típicos:** `DssCard` (nível 1), `DssTabPanel`, `DssExpansionItem` (raiz).
- **Padding esperado:** `--dss-spacing-4` (16px) a `--dss-spacing-6` (24px).
- **Gap esperado (entre elementos do card):** `--dss-spacing-4` (16px) a `--dss-spacing-6` (24px).

### Nível 3: Sub-seções (Cards internos, Listas, Formulários)
Agrupamentos lógicos dentro de uma seção principal.
- **Componentes típicos:** `DssList`, `DssForm`, `DssCard` (aninhado - *evitar se possível*).
- **Padding esperado:** `--dss-spacing-3` (12px) a `--dss-spacing-4` (16px).
- **Gap esperado (entre itens da lista/form):** `--dss-spacing-3` (12px) a `--dss-spacing-4` (16px).

### Nível 4: Elementos Atômicos (Inputs, Buttons, Chips)
A menor unidade de agrupamento.
- **Componentes típicos:** `DssInput`, `DssButton`, `DssChip`, `DssBadge`.
- **Padding esperado:** Definido internamente pelo componente (ex: `--dss-spacing-2` a `--dss-spacing-4`).
- **Gap esperado (entre botões ou chips adjacentes):** `--dss-spacing-1` (4px) a `--dss-spacing-2` (8px).

## 0.3. Exemplo Prático de Cascata

```html
<!-- NÍVEL 1: Page Container (Padding: spacing-6) -->
<div class="dss-page-container q-pa-md-xl q-pa-sm-md">
  
  <!-- NÍVEL 2: Card Principal (Padding: spacing-5, Gap interno: spacing-5) -->
  <dss-card class="q-pa-lg">
    <h2 class="text-h5 q-mb-lg">Detalhes do Usuário</h2>
    
    <!-- NÍVEL 3: Formulário (Gap entre campos: spacing-4) -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <dss-input label="Nome" />
      </div>
      <div class="col-12 col-md-6">
        <dss-input label="Email" />
      </div>
    </div>

    <!-- NÍVEL 4: Ações (Gap entre botões: spacing-2) -->
    <div class="row justify-end q-gutter-sm q-mt-lg">
      <dss-button label="Cancelar" variant="flat" />
      <dss-button label="Salvar" variant="unelevated" color="primary" />
    </div>
  </dss-card>
</div>
```

## 0.4. Validação Programática (MCP e Grid Inspector)

Esta hierarquia está codificada no arquivo `ui-rules.schema.json`. O Grid Inspector e o MCP validarão a árvore DOM/Figma para garantir que a regra `Padding(Pai) >= Padding(Filho)` seja respeitada em toda a interface.
