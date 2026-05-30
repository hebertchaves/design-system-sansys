<template>
  <!-- ==========================================================================
    DssSpace — Exemplos de uso
    ========================================================================== -->

  <div style="display: flex; flex-direction: column; gap: 48px; padding: 24px; font-family: Roboto, sans-serif;">

    <!-- =========================================================
      EXEMPLO 1 — Toolbar básica (caso de uso principal)
      Logo à esquerda, botão de ação à direita.
      DssSpace ocupa todo o espaço disponível restante.
      ========================================================= -->
    <section>
      <h3 style="margin: 0 0 12px; font-size: 14px; color: #666;">1. Toolbar básica — logo + DssSpace + ação</h3>
      <div
        style="
          display: flex;
          align-items: center;
          padding: 0 16px;
          height: 56px;
          background: #1976d2;
          border-radius: 4px;
          color: white;
        "
      >
        <span style="font-weight: 500; font-size: 20px;">MyApp</span>
        <DssSpace />
        <button style="background: rgba(255,255,255,0.15); border: none; color: white; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          Login
        </button>
      </div>
    </section>

    <!-- =========================================================
      EXEMPLO 2 — Header com navegação
      Título à esquerda, múltiplas ações à direita.
      ========================================================= -->
    <section>
      <h3 style="margin: 0 0 12px; font-size: 14px; color: #666;">2. Header com título e ações</h3>
      <div
        style="
          display: flex;
          align-items: center;
          padding: 0 16px;
          height: 56px;
          background: #ffffff;
          border-bottom: 1px solid #e0e0e0;
          border-radius: 4px;
        "
      >
        <span style="font-weight: 500; font-size: 18px; color: #212121;">Relatórios</span>
        <DssSpace />
        <button style="background: none; border: 1px solid #1976d2; color: #1976d2; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-right: 8px;">
          Exportar
        </button>
        <button style="background: #1976d2; border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
          Novo
        </button>
      </div>
    </section>

    <!-- =========================================================
      EXEMPLO 3 — Linha de ações: cancelar + DssSpace + confirmar
      Padrão para rodapés de modal e formulários.
      ========================================================= -->
    <section>
      <h3 style="margin: 0 0 12px; font-size: 14px; color: #666;">3. Linha de ações — cancelar à esquerda, confirmar à direita</h3>
      <div
        style="
          display: flex;
          align-items: center;
          padding: 16px;
          background: #fafafa;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
        "
      >
        <button style="background: none; border: 1px solid #9e9e9e; color: #616161; padding: 8px 20px; border-radius: 4px; cursor: pointer;">
          Cancelar
        </button>
        <DssSpace />
        <button style="background: #1976d2; border: none; color: white; padding: 8px 20px; border-radius: 4px; cursor: pointer;">
          Confirmar
        </button>
      </div>
    </section>

    <!-- =========================================================
      EXEMPLO 4 — DssSpace com size fixo (modo tamanho fixo)
      Cria um espaço governado de 16px (spacing-4) entre dois elementos.
      ========================================================= -->
    <section>
      <h3 style="margin: 0 0 12px; font-size: 14px; color: #666;">4. DssSpace com size fixo (size="4" = 16px)</h3>
      <div style="display: flex; align-items: center;">
        <button style="background: #1976d2; border: none; color: white; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          Salvar
        </button>
        <!-- Espaço fixo de 16px (var(--dss-spacing-4)) entre os botões -->
        <DssSpace size="4" />
        <button style="background: none; border: 1px solid #9e9e9e; color: #616161; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          Visualizar
        </button>
        <!-- Espaço maior: 24px (var(--dss-spacing-6)) -->
        <DssSpace size="6" />
        <button style="background: #c62828; border: none; color: white; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          Excluir
        </button>
      </div>
    </section>

    <!-- =========================================================
      EXEMPLO 5 — Comparativo: COM DssSpace vs SEM DssSpace
      Demonstra o efeito visual do componente.
      ========================================================= -->
    <section>
      <h3 style="margin: 0 0 12px; font-size: 14px; color: #666;">5. Comparativo — com DssSpace vs sem DssSpace</h3>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- COM DssSpace -->
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: #888;">COM DssSpace:</p>
          <div
            style="
              display: flex;
              align-items: center;
              padding: 0 16px;
              height: 48px;
              background: #e3f2fd;
              border-radius: 4px;
              border: 1px solid #90caf9;
            "
          >
            <span style="font-weight: 500; color: #1565c0;">Logo</span>
            <DssSpace />
            <span style="color: #1565c0;">Menu</span>
            <DssSpace />
            <span style="color: #1565c0;">Ação</span>
          </div>
        </div>

        <!-- SEM DssSpace -->
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: #888;">SEM DssSpace (itens colados à esquerda):</p>
          <div
            style="
              display: flex;
              align-items: center;
              padding: 0 16px;
              height: 48px;
              background: #fce4ec;
              border-radius: 4px;
              border: 1px solid #f48fb1;
            "
          >
            <span style="font-weight: 500; color: #880e4f; margin-right: 16px;">Logo</span>
            <span style="color: #880e4f; margin-right: 16px;">Menu</span>
            <span style="color: #880e4f;">Ação</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { DssSpace } from './index.js'
</script>
