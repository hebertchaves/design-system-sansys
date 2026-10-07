<!--
  ==========================================================================
  DssAppBar — Exemplos de uso
  ==========================================================================

  Cada cenário vive dentro do próprio DssLayout: o DssHeader que a barra compõe
  não renderiza fora de um QLayout, e o sintoma é mudo — a barra simplesmente
  não aparece.
-->
<template>
  <div class="dss-app-bar-examples">

    <section>
      <h3>1. A casca do Sansys</h3>
      <p class="ex-nota">
        O caso real: marca, título do módulo e as quatro ações típicas. Uma prop de marca
        pinta a barra E resolve o logo — o <code>DssBrandLogo</code> não recebe nada.
      </p>
      <div class="ex-palco">
        <DssLayout view="hHh lpR fFf" container>
          <DssAppBar brand="water" title="Nome do Módulo" @menu="ultimoEvento = 'menu'">
            <template #actions>
              <DssButton v-for="a in ACOES" :key="a.icone"
                variant="flat" round size="md" :icon="a.icone" :aria-label="a.rotulo" />
            </template>
          </DssAppBar>
        </DssLayout>
      </div>
      <p v-if="ultimoEvento" class="ex-nota">último evento: <code>{{ ultimoEvento }}</code></p>
    </section>

    <section>
      <h3>2. As três marcas</h3>
      <p class="ex-nota">
        Mesmo markup, três produtos. O que muda é a prop <code>brand</code> — e com ela a
        cor do fundo e o desenho do logo.
      </p>
      <div v-for="m in MARCAS" :key="m" class="ex-palco">
        <DssLayout view="hHh lpR fFf" container>
          <DssAppBar :brand="m" :title="`Módulo ${m}`">
            <template #actions>
              <DssButton variant="flat" round size="md" icon="account_circle" aria-label="Minha conta" />
            </template>
          </DssAppBar>
        </DssLayout>
      </div>
    </section>

    <section>
      <h3>3. Sem título: o divisor some junto</h3>
      <p class="ex-nota">
        O divisor só existe quando há os dois lados para separar. Um traço sozinho na barra
        é lixo visual que ninguém pediu.
      </p>
      <div class="ex-palco">
        <DssLayout view="hHh lpR fFf" container>
          <DssAppBar brand="hub">
            <template #actions>
              <DssButton variant="flat" round size="md" icon="account_circle" aria-label="Minha conta" />
            </template>
          </DssAppBar>
        </DssLayout>
      </div>
    </section>

    <section>
      <h3>4. Densidade</h3>
      <p class="ex-nota">
        <code>compact</code> (40px) é o padrão porque é a barra real do Sansys.
        <code>standard</code> (64px) existe para contexto que pede mais respiro.
      </p>
      <div v-for="d in DENSIDADES" :key="d" class="ex-palco">
        <DssLayout view="hHh lpR fFf" container>
          <DssAppBar brand="waste" :density="d" :title="`density=&quot;${d}&quot;`">
            <template #actions>
              <DssButton variant="flat" round size="md" icon="apps" aria-label="Aplicativos" />
            </template>
          </DssAppBar>
        </DssLayout>
      </div>
    </section>

    <section>
      <h3>5. Logo como link para a home</h3>
      <p class="ex-nota">
        O logo é <code>decorative</code> por padrão — o nome do produto já é anunciado pelo
        título ao lado. Quando ele vira link, o nome acessível é do LINK, e o slot
        <code>brand</code> é o caminho.
      </p>
      <div class="ex-palco">
        <DssLayout view="hHh lpR fFf" container>
          <DssAppBar brand="water" title="Solicitações">
            <template #brand>
              <a href="#inicio" class="ex-link-marca" aria-label="Página inicial do Sansys Water">
                <DssBrandLogo size="lg" decorative />
              </a>
            </template>
            <template #actions>
              <DssButton variant="flat" round size="md" icon="account_circle" aria-label="Minha conta" />
            </template>
          </DssAppBar>
        </DssLayout>
      </div>
    </section>

    <section>
      <h3>6. Sem menu</h3>
      <p class="ex-nota">
        Tela sem navegação lateral — login, erro, impressão — dispensa o botão de menu.
      </p>
      <div class="ex-palco">
        <DssLayout view="hHh lpR fFf" container>
          <DssAppBar brand="hub" :menu="false" title="Acesso" />
        </DssLayout>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssAppBar from './DssAppBar.vue'
import DssLayout from '../../base/DssLayout/DssLayout.vue'
import DssButton from '../../base/DssButton/DssButton.vue'
import DssBrandLogo from '../../base/DssBrandLogo/DssBrandLogo.vue'

const MARCAS = ['water', 'hub', 'waste'] as const
const DENSIDADES = ['compact', 'standard'] as const
const ultimoEvento = ref('')

const ACOES = [
  { icone: 'help_outline', rotulo: 'Ajuda' },
  { icone: 'notifications', rotulo: 'Notificações' },
  { icone: 'apps', rotulo: 'Aplicativos Sansys' },
  { icone: 'account_circle', rotulo: 'Minha conta' },
]
</script>

<style scoped>
.dss-app-bar-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
}

.dss-app-bar-examples h3 {
  margin: 0 0 var(--dss-spacing-2);
  font-size: var(--dss-font-size-lg);
  font-weight: var(--dss-font-weight-semibold);
  line-height: var(--dss-line-height-snug);
  color: var(--dss-text-primary);
}

.ex-nota {
  margin: 0 0 var(--dss-spacing-3);
  max-width: 76ch;
  font-size: var(--dss-font-size-sm);
  line-height: var(--dss-line-height-relaxed);
  color: var(--dss-text-subtle);
}

/* O QLayout ocupa a VIEWPORT por padrão; dentro de uma página de exemplos isso
   o faria engolir tudo. A contenção vem da prop `container` do próprio
   DssLayout — e NÃO de um `:deep(.q-layout)` daqui.
   A diferença não é estilística: injetar CSS de layout no filho é o
   anti-pattern que o Cartão Composto proíbe, e é frágil — quebra no dia em que
   o filho trocar de classe interna. A prop é a API. */
.ex-palco {
  position: relative;
  margin-bottom: var(--dss-spacing-3);
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  border-radius: var(--dss-radius-md);
  overflow: hidden;
  /* `container` faz o layout preencher o pai — então o pai precisa ter altura. */
  min-block-size: var(--dss-spacing-16);
}

.ex-link-marca {
  display: inline-flex;
  padding: var(--dss-spacing-1);
  border-radius: var(--dss-radius-sm);
  color: inherit;
}

.ex-link-marca:focus-visible {
  outline: var(--dss-border-width-md) solid currentColor;
  outline-offset: var(--dss-spacing-1);
}
</style>
