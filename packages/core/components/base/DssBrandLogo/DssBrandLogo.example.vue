<!--
  ==========================================================================
  DssBrandLogo — Exemplos de uso
  ==========================================================================

  Seis cenários. O fio que liga todos: o componente NÃO decide cor. Em cada
  bloco quem define a cor é o contexto, e o mesmo desenho acompanha.
-->
<template>
  <div class="dss-brand-logo-examples">

    <section>
      <h3>1. As três marcas</h3>
      <p class="ex-nota">
        Desenhos diferentes, não apenas matizes diferentes — é o que faz a marca sobreviver
        ao alto contraste e à impressão em preto e branco.
      </p>
      <div class="ex-linha">
        <DssBrandLogo v-for="m in MARCAS" :key="m" :brand="m" size="lg" />
      </div>
    </section>

    <section>
      <h3>2. A cor é de quem hospeda</h3>
      <p class="ex-nota">
        O mesmo <code>&lt;DssBrandLogo brand="water" /&gt;</code> nos três blocos. Nenhum
        recebe prop de cor: o <code>currentColor</code> herda do contexto.
      </p>
      <div class="ex-contextos">
        <div class="ex-ctx ex-ctx--marca">
          <DssBrandLogo brand="water" size="md" />
          <span class="ex-ctx__rotulo">sobre a cor da marca</span>
        </div>
        <div class="ex-ctx ex-ctx--claro">
          <DssBrandLogo brand="water" size="md" />
          <span class="ex-ctx__rotulo">sobre fundo claro</span>
        </div>
        <div class="ex-ctx ex-ctx--escuro">
          <DssBrandLogo brand="water" size="md" />
          <span class="ex-ctx__rotulo">sobre fundo escuro</span>
        </div>
      </div>
    </section>

    <section>
      <h3>3. Tamanhos</h3>
      <p class="ex-nota">
        Quem manda é a altura — a largura acompanha a proporção. Os degraus saem dos
        contextos reais: rail, app bar de 40px, header de 64px, tela de abertura.
      </p>
      <div class="ex-linha ex-linha--base">
        <div v-for="t in TAMANHOS" :key="t" class="ex-tamanho">
          <DssBrandLogo brand="hub" :size="t" />
          <code>{{ t }}</code>
        </div>
      </div>
    </section>

    <section>
      <h3>4. Recorte do desenho</h3>
      <p class="ex-nota">
        <code>icon</code> serve ao rail retraído; <code>wordmark</code>, a quando o símbolo
        já aparece ao lado.
      </p>
      <div class="ex-linha ex-linha--base">
        <div v-for="v in RECORTES" :key="v" class="ex-tamanho">
          <DssBrandLogo brand="waste" :variant="v" size="lg" />
          <code>{{ v }}</code>
        </div>
      </div>
    </section>

    <section>
      <h3>5. A marca vem do ancestral</h3>
      <p class="ex-nota">
        Nenhum dos três declara <code>brand</code>: cada um resolve pelo
        <code>[data-brand]</code> mais próximo. É o que dispensa repetir a marca em toda
        tela de um produto.
      </p>
      <div class="ex-linha">
        <div v-for="m in MARCAS" :key="m" :data-brand="m" class="ex-heranca">
          <DssBrandLogo size="md" />
          <code>[data-brand="{{ m }}"]</code>
        </div>
      </div>
    </section>

    <section>
      <h3>6. Logo como link para a home</h3>
      <p class="ex-nota">
        O logo não recebe clique — <code>pointer-events</code> está desligado. Quem interage
        é quem o embrulha, e aí o nome acessível é do LINK: o logo vai
        <code>decorative</code> para não duplicar a leitura.
      </p>
      <a href="#inicio" class="ex-link" aria-label="Página inicial do Sansys Water">
        <DssBrandLogo brand="water" size="md" decorative />
      </a>
    </section>

  </div>
</template>

<script setup lang="ts">
import DssBrandLogo from './DssBrandLogo.vue'

const MARCAS = ['water', 'hub', 'waste'] as const
const TAMANHOS = ['sm', 'md', 'lg', 'xl'] as const
const RECORTES = ['full', 'icon', 'wordmark'] as const
</script>

<style scoped>
.dss-brand-logo-examples {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-6);
}

.dss-brand-logo-examples h3 {
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

.ex-linha {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--dss-spacing-6);
  color: var(--dss-text-body);
}

.ex-linha--base {
  align-items: flex-end;
}

.ex-tamanho,
.ex-heranca {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--dss-spacing-2);
  font-size: var(--dss-font-size-xs);
  color: var(--dss-text-subtle);
}

.ex-contextos {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dss-spacing-3);
}

.ex-ctx {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-4);
  border-radius: var(--dss-radius-md);
  min-width: var(--dss-spacing-48);
}

.ex-ctx__rotulo {
  font-size: var(--dss-font-size-xs);
  opacity: var(--dss-opacity-80);
}

/* Os três contextos definem COR — e é só isso que muda entre eles. */
.ex-ctx--marca {
  background: var(--dss-action-primary);
  color: var(--dss-text-on-primary);
}

.ex-ctx--claro {
  background: var(--dss-surface-subtle);
  color: var(--dss-text-body);
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);
}

.ex-ctx--escuro {
  background: var(--dss-gray-900);
  color: var(--dss-text-inverse);
}

.ex-link {
  display: inline-flex;
  padding: var(--dss-spacing-2);
  border-radius: var(--dss-radius-sm);
  color: var(--dss-text-body);
}

.ex-link:focus-visible {
  outline: var(--dss-border-width-md) solid var(--dss-action-primary);
  outline-offset: var(--dss-spacing-1);
}
</style>
