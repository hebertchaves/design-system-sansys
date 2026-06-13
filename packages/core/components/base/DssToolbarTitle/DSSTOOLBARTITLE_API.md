# DssToolbarTitle — API Reference

> Wrapper DSS governado sobre `QToolbarTitle`.  
> **Não** é 100% compatível com a API do Quasar — props de cor e estado foram bloqueadas por governança DSS.

---

## Props

### `shrink`

| Atributo   | Valor                    |
|------------|--------------------------|
| Tipo       | `Boolean`                |
| Padrão     | `false`                  |
| Obrigatório | Não                     |

Quando `true`, impede que o título cresça para ocupar o espaço disponível (`flex: 0 0 auto`).  
O comportamento padrão (`false`) é crescer para preencher o espaço (`flex: 1 1 0%` — herdado do QToolbarTitle).

**Quando usar:** Quando a mesma `DssToolbar` contiver múltiplos elementos flexíveis e o título não deve dominar o espaço.

---

## Props Bloqueadas (Governança DSS)

Estas props do `QToolbarTitle` **não estão disponíveis** no `DssToolbarTitle`:

| Prop         | Motivo                                                                                                |
|--------------|-------------------------------------------------------------------------------------------------------|
| `color`      | Cor governada por tokens do `DssToolbar` pai. Herdada automaticamente via cascata `[data-brand]`.    |
| `active`     | `DssToolbarTitle` não possui estado ativo. Navegação é responsabilidade de `DssTab` ou `DssMenu`.    |

---

## Slots

### `default`

Conteúdo principal do título. Aceita texto simples ou elementos inline.

```vue
<dss-toolbar-title>Título da Página</dss-toolbar-title>

<!-- Com elemento semântico para título principal de página -->
<dss-toolbar-title>
  <h1>Dashboard</h1>
</dss-toolbar-title>
```

> **Importante:** Componentes de bloco ou layouts complexos dentro do slot default violam a semântica tipográfica do componente.

---

### `subtitle`

Subtítulo exibido abaixo do conteúdo principal. Herdado do comportamento do `QToolbarTitle`.

```vue
<dss-toolbar-title>
  Sansys Hub
  <template #subtitle>Módulo de Monitoramento</template>
</dss-toolbar-title>
```

---

## Eventos

**Nenhum evento emitido.** `DssToolbarTitle` é estritamente não-interativo.

---

## Forwarding de Atributos

`DssToolbarTitle` implementa `inheritAttrs: false` com `v-bind="$attrs"` explícito no `<q-toolbar-title>`.

Atributos HTML padrão são repassados ao elemento raiz:

```vue
<dss-toolbar-title data-testid="page-title" aria-label="Título da aplicação">
  Sansys Hub
</dss-toolbar-title>
```

---

## Modificadores de Classe

| Classe                          | Condição              | Efeito                                         |
|---------------------------------|-----------------------|------------------------------------------------|
| `dss-toolbar-title`             | Sempre presente       | Identifica o componente                        |
| `dss-toolbar-title--shrink`     | `shrink === true`     | Aplica `flex: 0 0 auto` para não crescer       |

---

## Tokens CSS

### Aplicados diretamente

| Token                         | Propriedade       | Valor de Referência |
|-------------------------------|-------------------|---------------------|
| `--dss-font-family-sans`      | `font-family`     | Roboto, sans-serif  |
| `--dss-heading-4-size`        | `font-size`       | 20px                |
| `--dss-heading-4-weight`      | `font-weight`     | 500 (Medium)        |
| `--dss-heading-4-line-height` | `line-height`     | 1.3                 |

**Nota:** `letter-spacing` é explicitamente sobrescrito para `normal` (remove o `0.01em` nativo do QToolbarTitle).

### Herdados do DssToolbar pai

| Token                 | Contexto de Uso                                    |
|-----------------------|----------------------------------------------------|
| `--dss-text-body`     | Cor de texto padrão (sem brand ativa no pai)       |
| `--dss-text-inverse`  | Cor de texto quando pai tem brand colorida ativa   |

---

## Exceções Documentadas

### EXC-01 — Sobrescrita de Tipografia Nativa Quasar

- **Gate violado:** Gate de Composição v2.4 — Regra 2 (Proibição de sobrescrever estilos internos do Quasar)
- **Seletor:** `.dss-toolbar-title.q-toolbar__title`
- **Justificativa:** O `QToolbarTitle` aplica `font-size: 21px`, `font-weight: normal` e `letter-spacing: 0.01em` hardcoded. A única forma de garantir a escala tipográfica DSS (Heading 4) é a sobrescrita via seletor composto.
- **Precedente canônico:** DssItemLabel (EXC-01)

### EXC-02 — Forced Colors Mode

- **Valor:** `ButtonText` (system color keyword)
- **Localização:** `4-output/_states.scss`
- **Justificativa:** Em modo `forced-colors`, tokens CSS são ignorados pelo SO. Keywords de sistema são obrigatórias para garantir legibilidade.

---

## Estados

| Estado        | Aplicável | Justificativa                                          |
|---------------|-----------|--------------------------------------------------------|
| Padrão        | ✅        | —                                                      |
| Hover         | ❌        | Componente não-interativo                              |
| Focus         | ❌        | Componente não-interativo                              |
| Active        | ❌        | Sem estado ativo (navegação pertence a DssTab/DssMenu) |
| Disabled      | ❌        | Responsabilidade do DssToolbar pai                     |
| Loading       | ❌        | Fase 1 — sem estado assíncrono                         |
| Error         | ❌        | Elemento tipográfico — sem estado de erro              |
| Indeterminate | ❌        | Não aplicável para elemento tipográfico linear         |

---

## Touch Target

**Não aplicável.** Componente estritamente não-interativo (Option B).

---

## Acessibilidade

- Nenhum `role` adicional aplicado — semântica é definida pelo conteúdo do slot
- Truncamento (`text-overflow: ellipsis`) preserva o texto completo para leitores de tela
- Cor herdada do `DssToolbar` garante contraste WCAG 2.1 AA sobre qualquer brand
- `aria-label` pode ser repassado via `$attrs` para contextos específicos

---

## Paridade com Golden Reference (DssItemLabel)

| Aspecto                              | DssItemLabel   | DssToolbarTitle | Diferença / Justificativa                                        |
|--------------------------------------|----------------|-----------------|------------------------------------------------------------------|
| `aria-hidden` em decorativos         | N/A            | N/A             | Nenhum elemento decorativo                                       |
| `defineOptions` presente             | ✅             | ✅              | —                                                                |
| `inheritAttrs: false` + forwarding   | ✅             | ✅              | —                                                                |
| `-webkit-tap-highlight-color`        | N/A            | N/A             | Ambos não-interativos (Option B)                                 |
| Touch target (WCAG 2.5.5)           | N/A            | N/A             | Ambos não-interativos                                            |
| Sobrescrita de tipografia nativa     | ✅ EXC-01      | ✅ EXC-01       | Mesmo padrão de seletor composto                                 |
| Cor não definida (herdada)           | ✅             | ✅              | Ambos herdam cor do pai via cascata                              |
| Brands via `_brands.scss` vazio      | ✅             | ✅              | Herança automática via tokens do pai                             |
| States: dark, forced-colors, print   | ✅             | ✅              | —                                                                |

**Divergência intencional:** `DssToolbarTitle` gerencia `flex` via prop `shrink`. `DssItemLabel` não expõe comportamento flex direto.

---

## Compatibilidade com Quasar

| Prop Quasar   | Disponível em DssToolbarTitle | Razão                              |
|---------------|-------------------------------|------------------------------------|
| `shrink`      | ✅ Sim                        | Mantida — relevante semanticamente |
| `color`       | ❌ Bloqueada                  | Governança DSS — herda do pai      |
| `active`      | ❌ Bloqueada                  | Sem estado ativo no DSS            |
