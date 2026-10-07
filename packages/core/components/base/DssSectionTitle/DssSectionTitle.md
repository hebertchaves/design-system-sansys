# DssSectionTitle — Documento Normativo

> **Status:** `draft` (set/2026). Nasceu no Bloco 2 do plano de contêineres e casca.

## 1. Papel

Dar forma ao título de seção com o acento de marca. Não divide, não interage, não posiciona.

## 2. Por que existe

O mesmo CSS aparece **8×** nas duas telas Sansys de referência — `.gm-title`,
`.cn-section__title`, `.cn-result__title` e outros —, sempre com a mesma estrutura:

```scss
margin: 0;
font-weight: semibold;
line-height: tight;
border-bottom: 2px solid <cor>;
padding-bottom: <gap>;
```

Estrutura repetida que ninguém varia é candidata a componente. É o critério do §1.6 do guia
de Fase 3 aplicado ao menor nível.

## 3. As três decisões

### 3.1. A distância do traço é medida, não arbitrada

Ver o README para a tabela completa. Em resumo: medida a distância ótica (fim da tinta do
descendente → topo do traço) nos três tamanhos, `padding: 0` devolve 0,5px em `sm`, 1px em
`md` e 1,5px em `lg` — não encosta, mas meio pixel é colisão de subpixel. O token (2px) leva
a 2,5–3,5px: mínimo e estável em todos os tamanhos.

**Consequência de governança:** `line-height` não é livre neste componente. Trocar para
`normal` ou `relaxed` quebraria a conta, porque o respiro passaria a depender da
meia-entrelinha, que varia com o tamanho da fonte.

### 3.2. Nível e tamanho são eixos separados

`level` → tag; `size` → aparência. Unir os dois é o atalho que quebra a hierarquia de
cabeçalhos do documento.

### 3.3. O traço segue a marca por TOKEN

`--dss-action-primary` na Layer 2; a prop `brand` **remapeia** esse token na Layer 4. Pintar
a borda direto na Layer 4 é o anti-pattern do §K5 — e o `DssLinearProgress` já provou o custo.

## 4. Decisão fechada: o traço segue a MARCA, não o âmbar do Figma

**Resolvido no Bloco 3.1 (set/2026), por decisão de produto.** O âmbar do Figma está
descartado: o traço do título de seção acompanha a marca do produto, nas telas reais e no
default do componente.

O que havia antes: nas duas telas de referência o traço era `--dss-feedback-warning` — âmbar
—, com o comentário "acento do Figma: sublinhado âmbar sob o título".

Por que `brand` é o padrão, e agora também a prática:

1. é o que foi pedido ("Title com linha sublinhada seguindo o brand");
2. a Constituição #6 diz que o Figma é ferramenta integrável, **não** árbitro visual;
3. `accent="warning"` significa *"esta seção fala de um alerta"*. Usá-lo como identidade
   visual gastaria a cor de estado em nove títulos que não falam de estado nenhum — e
   quando uma seção realmente precisar alertar, não sobraria contraste semântico.

O âmbar continua alcançável por `accent="warning"` para o caso em que ele significa alerta,
que é o que a prop existe para dizer.

## 5. Exceções de gate

Nenhuma.

## 6. O que o componente NÃO faz

- **Não divide seções.** O traço tem a largura do texto. Régua que atravessa o container é
  `DssSeparator`.
- **Não aceita cor livre.** `accent` é enum fechado; cor livre abriria a porta para traço
  fora da paleta.
- **Não alinha.** Alinhamento é do container.
