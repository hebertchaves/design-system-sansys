<script setup lang="ts">
// Isenção DSS — Policy DssSpace/DSS_IMPLEMENTATION_GUIDE.md: Arquivos .example.vue são isentos de Token First e Gate de Composição para scaffolding de contexto.
/**
 * DssBreadcrumbs — Exemplos de Uso
 *
 * Cenários cobertos:
 * 1. Básico: Trilha de navegação simples com separador padrão (/)
 * 2. Separador Customizado: Uso da prop separator com caractere diferente (>)
 * 3. Alinhamento: Demonstração da prop align (center, right)
 * 4. Com Ícones: Trilha onde os itens (DssBreadcrumbsEl) possuem ícones
 * 5. Brand: Trilha em contexto Hub, Water e Waste
 */
import DssBreadcrumbs from './DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '../DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 48px; padding: 24px;">

    <!-- ======================================================================
         CENÁRIO 1 — Básico
         Trilha de navegação simples com separador padrão (/).
         Demonstra o uso mínimo: DssBreadcrumbs + DssBreadcrumbsEl.
         aria-current="page" no último item (item atual).
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 1: Básico (separador padrão /)</p>

      <DssBreadcrumbs aria-label="Trilha de navegação básica">
        <DssBreadcrumbsEl to="/home" label="Início" />
        <DssBreadcrumbsEl to="/produtos" label="Produtos" />
        <DssBreadcrumbsEl label="Fone de Ouvido Pro" aria-current="page" />
      </DssBreadcrumbs>
    </section>

    <!-- ======================================================================
         CENÁRIO 2 — Separador Customizado
         Uso da prop `separator` com caractere diferente (>).
         Também demonstra gutter sm e lg para comparação.
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 2: Separador Customizado (>)</p>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">separator="&gt;" | gutter="sm" (8px):</p>
          <DssBreadcrumbs
            separator=">"
            gutter="sm"
            aria-label="Trilha separador customizado sm"
          >
            <DssBreadcrumbsEl to="/home" label="Início" />
            <DssBreadcrumbsEl to="/categoria" label="Eletrônicos" />
            <DssBreadcrumbsEl label="Fones" aria-current="page" />
          </DssBreadcrumbs>
        </div>

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">separator="›" | gutter="md" (12px, padrão):</p>
          <DssBreadcrumbs
            separator="›"
            gutter="md"
            aria-label="Trilha separador customizado md"
          >
            <DssBreadcrumbsEl to="/home" label="Início" />
            <DssBreadcrumbsEl to="/categoria" label="Eletrônicos" />
            <DssBreadcrumbsEl label="Fones" aria-current="page" />
          </DssBreadcrumbs>
        </div>

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">separator="|" | gutter="lg" (16px):</p>
          <DssBreadcrumbs
            separator="|"
            gutter="lg"
            aria-label="Trilha separador customizado lg"
          >
            <DssBreadcrumbsEl to="/home" label="Início" />
            <DssBreadcrumbsEl to="/categoria" label="Eletrônicos" />
            <DssBreadcrumbsEl label="Fones" aria-current="page" />
          </DssBreadcrumbs>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         CENÁRIO 3 — Alinhamento
         Demonstração da prop `align` com center e right.
         left é o padrão (não precisa declarar).
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 3: Alinhamento</p>

      <div style="display: flex; flex-direction: column; gap: 16px;">

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">align="left" (padrão):</p>
          <div style="border: 1px solid #eee; padding: 12px; border-radius: 4px;">
            <DssBreadcrumbs
              align="left"
              aria-label="Trilha alinhada à esquerda"
            >
              <DssBreadcrumbsEl to="/home" label="Início" />
              <DssBreadcrumbsEl to="/docs" label="Documentação" />
              <DssBreadcrumbsEl label="Guia" aria-current="page" />
            </DssBreadcrumbs>
          </div>
        </div>

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">align="center":</p>
          <div style="border: 1px solid #eee; padding: 12px; border-radius: 4px;">
            <DssBreadcrumbs
              align="center"
              aria-label="Trilha centralizada"
            >
              <DssBreadcrumbsEl to="/home" label="Início" />
              <DssBreadcrumbsEl to="/docs" label="Documentação" />
              <DssBreadcrumbsEl label="Guia" aria-current="page" />
            </DssBreadcrumbs>
          </div>
        </div>

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">align="right":</p>
          <div style="border: 1px solid #eee; padding: 12px; border-radius: 4px;">
            <DssBreadcrumbs
              align="right"
              aria-label="Trilha alinhada à direita"
            >
              <DssBreadcrumbsEl to="/home" label="Início" />
              <DssBreadcrumbsEl to="/docs" label="Documentação" />
              <DssBreadcrumbsEl label="Guia" aria-current="page" />
            </DssBreadcrumbs>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================================
         CENÁRIO 4 — Com Ícones
         Trilha onde os itens (DssBreadcrumbsEl) possuem ícones.
         Demonstra composição DssIcon dentro de DssBreadcrumbsEl.
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 4: Com Ícones</p>

      <DssBreadcrumbs aria-label="Trilha de navegação com ícones">
        <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
        <DssBreadcrumbsEl to="/produtos" icon="shopping_cart" label="Produtos" />
        <DssBreadcrumbsEl to="/eletronicos" icon="devices" label="Eletrônicos" />
        <DssBreadcrumbsEl
          icon="headphones"
          label="Fone de Ouvido Pro"
          aria-current="page"
        />
      </DssBreadcrumbs>
    </section>

    <!-- ======================================================================
         CENÁRIO 5 — Brand
         Demonstração em contextos Hub, Water e Waste.
         Cor dos separadores governada por _brands.scss.
         ====================================================================== -->
    <section>
      <p style="font-weight: 600; margin-bottom: 16px;">Cenário 5: Brands</p>

      <div style="display: flex; flex-direction: column; gap: 24px;">

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Brand Hub (laranja):</p>
          <div data-brand="hub">
            <DssBreadcrumbs aria-label="Trilha Hub">
              <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
              <DssBreadcrumbsEl to="/hub" label="Hub" />
              <DssBreadcrumbsEl label="Configurações" aria-current="page" />
            </DssBreadcrumbs>
          </div>
        </div>

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Brand Water (azul):</p>
          <div data-brand="water">
            <DssBreadcrumbs aria-label="Trilha Water">
              <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
              <DssBreadcrumbsEl to="/water" label="Water" />
              <DssBreadcrumbsEl label="Relatórios" aria-current="page" />
            </DssBreadcrumbs>
          </div>
        </div>

        <div>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Brand Waste (verde):</p>
          <div data-brand="waste">
            <DssBreadcrumbs aria-label="Trilha Waste">
              <DssBreadcrumbsEl to="/home" icon="home" label="Início" />
              <DssBreadcrumbsEl to="/waste" label="Waste" />
              <DssBreadcrumbsEl label="Coletas" aria-current="page" />
            </DssBreadcrumbs>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>
