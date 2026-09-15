/**
 * context-tokens.mjs — Registro dos tokens de CONTEXTO que o Preview Frame sabe dirigir.
 *
 * O PROBLEMA QUE ISTO RESOLVE (set/2026). O Preview Frame deriva os controles de
 * `api.props`. Isso cobre tudo que o componente recebe por prop — mas não o que
 * ele lê do AMBIENTE. Quando o `no-caps` do DssButton passou a ser um override
 * de `--dss-text-transform-control`, o knob virou um interruptor sem lâmpada:
 * dentro do iframe o token vale `none`, então ligar e desligar dava na mesma, e
 * o frame parecia quebrado enquanto a página de teste mostrava a prop
 * funcionando (lá o wrapper redefine o token).
 *
 * O frame JÁ tem a categoria certa para isso: tema e brand são exatamente isso —
 * contexto do palco, não prop do componente. Um token de ambiente é o terceiro
 * membro da família, e entra pela mesma porta.
 *
 * COMO UM TOKEN ENTRA AQUI. Este arquivo diz o que é DIRIGÍVEL; quem diz se o
 * componente é afetado é o CSS dele. O `emit-contract` compila o
 * `DssX.module.scss` e só emite `visual.contextTokens` para os tokens que o CSS
 * compilado realmente consome — nada é declarado à mão por componente, nada
 * pode divergir (Constituição #6: o CSS é a fonte). Um token listado aqui e não
 * usado por ninguém simplesmente não aparece em contrato nenhum.
 *
 * REQUISITOS para um token ser dirigível:
 *   - herdável e de ambiente (custom property lida por descendentes),
 *   - conjunto FECHADO de valores válidos (o widget é um <select>),
 *   - sem efeito colateral fora do sujeito.
 * Token de cor/escala arbitrária não entra: vira campo livre, e campo livre no
 * palco é bancada de teste, não contrato.
 */

export const CONTEXT_TOKENS = [
  {
    name: '--dss-text-transform-control',
    label: 'Capitalização',
    values: ['none', 'uppercase', 'capitalize', 'lowercase'],
    default: 'none',
  },
]

export const CONTEXT_TOKEN_NAMES = CONTEXT_TOKENS.map(t => t.name)
