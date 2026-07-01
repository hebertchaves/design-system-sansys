/**
 * ==========================================================================
 * VueCadrisMount — Runtime Vue 3 REAL embarcado em React
 * ==========================================================================
 *
 * Demonstra o `DssCadrisCard` composto exclusivamente por subcomponentes DSS
 * (DssToolbar, DssInput, DssSelect, DssBtn, DssTable, DssBadge, DssPagination)
 * registrados como componentes Vue reais — espelhando a arquitetura que seria
 * usada em um projeto Vue 3 / Quasar consumindo o Design System Sansys.
 *
 * Cada subcomponente é um SFC-like (template + setup) consumindo apenas
 * tokens semânticos `--dss-*`. NÃO há tags HTML nativas no template do Card.
 */

import { useEffect, useRef } from "react";

const VUE_ESM_URL = "https://esm.sh/vue@3.4.38/dist/vue.esm-browser.js";

let vuePromise: Promise<any> | null = null;
function loadVue() {
  if (!vuePromise) {
    vuePromise = import(/* @vite-ignore */ VUE_ESM_URL);
  }
  return vuePromise;
}

export function VueCadrisMount() {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    loadVue().then((Vue) => {
      if (cancelled || !hostRef.current) return;
      const { createApp, ref, computed } = Vue;

      // ============================================================
      // SUBCOMPONENTES DSS (Vue) — equivalentes aos do repositório
      // ============================================================

      const DssToolbar = {
        name: "DssToolbar",
        props: { dense: Boolean },
        template: `
          <header class="dss-toolbar" :class="{ 'dss-toolbar--dense': dense }">
            <slot />
          </header>
        `,
      };

      const DssToolbarTitle = {
        name: "DssToolbarTitle",
        template: `<h2 class="dss-toolbar__title"><slot /></h2>`,
      };

      const DssBtn = {
        name: "DssBtn",
        props: {
          color: { type: String, default: "primary" }, // primary | warning | neutral | flat
          icon: String,
          label: String,
          disable: Boolean,
          round: Boolean,
          flat: Boolean,
          size: { type: String, default: "md" },
          ariaLabel: String,
        },
        emits: ["click"],
        template: `
          <button
            class="dss-btn"
            :class="[
              'dss-btn--' + color,
              { 'dss-btn--round': round, 'dss-btn--flat': flat, 'dss-btn--icon-only': round && !label }
            ]"
            :disabled="disable"
            :aria-label="ariaLabel || label"
            @click="$emit('click', $event)"
          >
            <span v-if="icon" class="dss-btn__icon">{{ icon }}</span>
            <span v-if="icon && label" class="dss-btn__divider"></span>
            <span v-if="label" class="dss-btn__label">{{ label }}</span>
            <slot />
          </button>
        `,
      };

      const DssInput = {
        name: "DssInput",
        props: {
          modelValue: { type: [String, Number], default: "" },
          label: String,
          placeholder: String,
          dense: Boolean,
          disable: Boolean,
        },
        emits: ["update:modelValue"],
        template: `
          <label class="dss-field">
            <span v-if="label" class="dss-field__label">{{ label }}</span>
            <span class="dss-field__control">
              <input
                class="dss-field__input"
                :placeholder="placeholder || label"
                :value="modelValue"
                :disabled="disable"
                @input="$emit('update:modelValue', $event.target.value)"
              />
            </span>
          </label>
        `,
      };

      const DssSelect = {
        name: "DssSelect",
        props: {
          modelValue: { type: [String, Number, Object], default: null },
          label: String,
          options: { type: Array, default: () => [] },
          placeholder: String,
        },
        emits: ["update:modelValue"],
        template: `
          <label class="dss-field">
            <span v-if="label" class="dss-field__label">{{ label }}</span>
            <span class="dss-field__control">
              <select
                class="dss-field__input dss-field__input--select"
                :value="modelValue"
                @change="$emit('update:modelValue', $event.target.value)"
              >
                <option value="">{{ placeholder || label }}</option>
                <option v-for="opt in options" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
              <span class="dss-field__chevron" aria-hidden="true">▾</span>
            </span>
          </label>
        `,
      };

      const DssBadge = {
        name: "DssBadge",
        props: {
          color: { type: String, default: "positive" }, // positive | negative | neutral
          label: String,
        },
        template: `
          <span class="dss-badge" :class="'dss-badge--' + color">
            <span class="dss-badge__dot"></span>
            <span class="dss-badge__label"><slot>{{ label }}</slot></span>
          </span>
        `,
      };

      const DssTable = {
        name: "DssTable",
        props: {
          columns: { type: Array, required: true }, // [{ name, label, field, align?, classes? }]
          rows: { type: Array, required: true },
          rowKey: { type: String, default: "id" },
        },
        template: `
          <div class="dss-table-wrapper" role="region" aria-label="Tabela de dados">
            <table class="dss-table" role="table">
              <thead>
                <tr role="row">
                  <th
                    v-for="col in columns"
                    :key="col.name"
                    role="columnheader"
                    :class="['is-align-' + (col.align || 'left')]"
                  >{{ col.label }}</th>
                  <th role="columnheader" class="is-align-right" aria-label="Ações"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, idx) in rows"
                  :key="row[rowKey] ?? idx"
                  :class="{ 'is-odd': idx % 2 }"
                  role="row"
                >
                  <td
                    v-for="col in columns"
                    :key="col.name"
                    role="cell"
                    :class="['is-align-' + (col.align || 'left'), col.classes]"
                  >
                    <slot :name="'body-cell-' + col.name" :row="row" :value="row[col.field]">
                      {{ row[col.field] }}
                    </slot>
                  </td>
                  <td role="cell" class="is-align-right">
                    <slot name="row-actions" :row="row">
                      <DssBtn round flat color="flat" icon="▾" aria-label="Mais ações" />
                    </slot>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        components: { DssBtn },
      };

      const DssPagination = {
        name: "DssPagination",
        props: {
          modelValue: { type: Number, default: 1 }, // página atual
          rowsPerPage: { type: Number, default: 12 },
          rowsNumber: { type: Number, default: 0 },
        },
        emits: ["update:modelValue"],
        setup(props: any, { emit }: any) {
          const totalPages = computed(() =>
            Math.max(1, Math.ceil(props.rowsNumber / props.rowsPerPage))
          );
          const start = computed(() => (props.modelValue - 1) * props.rowsPerPage + 1);
          const end = computed(() =>
            Math.min(props.modelValue * props.rowsPerPage, props.rowsNumber)
          );
          const goPrev = () =>
            props.modelValue > 1 && emit("update:modelValue", props.modelValue - 1);
          const goNext = () =>
            props.modelValue < totalPages.value &&
            emit("update:modelValue", props.modelValue + 1);
          return { totalPages, start, end, goPrev, goNext };
        },
        components: { DssBtn },
        template: `
          <nav class="dss-pagination" aria-label="Paginação">
            <span class="dss-pagination__info">Linhas por página: {{ rowsPerPage }}</span>
            <span class="dss-pagination__range">{{ start }}-{{ end }} de {{ rowsNumber }}</span>
            <DssBtn round flat color="flat" icon="‹" :disable="modelValue === 1" aria-label="Página anterior" @click="goPrev" />
            <DssBtn round flat color="flat" icon="›" :disable="modelValue >= totalPages" aria-label="Próxima página" @click="goNext" />
          </nav>
        `,
      };

      // ============================================================
      // DssCadrisCard — composto APENAS por subcomponentes DSS
      // ============================================================
      const DssCadrisCard = {
        name: "DssCadrisCard",
        components: {
          DssToolbar, DssToolbarTitle, DssBtn,
          DssInput, DssSelect, DssBadge, DssTable, DssPagination,
        },
        props: {
          title: { type: String, default: "Cadris" },
          rows: { type: Array, required: true },
          documentoOptions: { type: Array, default: () => [] },
          aterroOptions: { type: Array, default: () => [] },
        },
        emits: ["close", "search", "update:page"],
        setup(props: any, { emit }: any) {
          const filters = ref({ cadri: "", gerador: "", documento: "", aterro: "" });
          const loading = ref(false);
          const page = ref(1);
          const rowsPerPage = 12;

          const totalRows = computed(() => props.rows.length);
          const pagedRows = computed(() =>
            props.rows.slice((page.value - 1) * rowsPerPage, page.value * rowsPerPage)
          );

          const columns = [
            { name: "cadri", label: "Cadri", field: "cadri" },
            { name: "gerador", label: "Gerador", field: "gerador" },
            { name: "aterro", label: "Aterro", field: "aterro" },
            { name: "vencimento", label: "Data vencimento", field: "vencimento" },
            { name: "diasFaltantes", label: "Dias Faltantes", field: "diasFaltantes" },
            { name: "mediaMensal", label: "Média mensal", field: "mediaMensal", classes: "is-bold" },
            { name: "ativo", label: "Ativo", field: "ativo" },
            { name: "residuos", label: "Resíduos", field: "residuos", classes: "is-truncate" },
          ];

          function onSearch() {
            loading.value = true;
            emit("search", { ...filters.value });
            setTimeout(() => (loading.value = false), 1200);
          }

          return { filters, loading, page, rowsPerPage, totalRows, pagedRows, columns, onSearch };
        },
        template: `
          <div class="dss-cadris-card" data-brand="water">
            <!-- 1) Toolbar -->
            <DssToolbar>
              <DssToolbarTitle>{{ title }}</DssToolbarTitle>
              <DssBtn round flat color="toolbar" icon="✕" aria-label="Fechar" @click="$emit('close')" />
            </DssToolbar>

            <!-- 2) Pesquisa -->
            <section class="dss-cadris-card__section">
              <h3 class="dss-cadris-card__section-title">Pesquisa</h3>
              <div class="dss-cadris-card__filters">
                <DssInput v-model="filters.cadri" label="Cadri" />
                <DssInput v-model="filters.gerador" label="Gerador" />
                <DssSelect v-model="filters.documento" label="Documento" :options="documentoOptions" />
                <DssSelect v-model="filters.aterro" label="Aterro" :options="aterroOptions" />
              </div>
              <div class="dss-cadris-card__search-action">
                <DssBtn
                  color="warning"
                  icon="⚠"
                  :label="loading ? 'Pesquisando…' : 'Pesquisar'"
                  :disable="loading"
                  @click="onSearch"
                />
              </div>
            </section>

            <!-- 3) Tabela -->
            <section class="dss-cadris-card__section">
              <h3 class="dss-cadris-card__section-title">Total Cadris</h3>

              <DssTable :columns="columns" :rows="pagedRows" row-key="id">
                <template #body-cell-diasFaltantes="{ value }">
                  {{ String(value).padStart(2, '0') }}
                </template>
                <template #body-cell-ativo="{ row }">
                  <DssBadge :color="row.ativo ? 'positive' : 'negative'" :label="row.ativo ? 'Sim' : 'Não'" />
                </template>
              </DssTable>

              <DssPagination
                v-model="page"
                :rows-per-page="rowsPerPage"
                :rows-number="totalRows"
              />
            </section>

            <!-- 4) Footer -->
            <footer class="dss-cadris-card__footer">
              <DssBtn color="neutral" label="FECHAR" disable />
            </footer>
          </div>
        `,
      };

      // ============================================================
      // App raiz
      // ============================================================
      const mockRows = Array.from({ length: 14 }).map((_, i) => ({
        id: i + 1,
        cadri: "0000000000",
        gerador: "00.000.000/0000-00",
        aterro: "Nome Aterro",
        vencimento: "00/00/0000",
        diasFaltantes: 0,
        mediaMensal: "0 ton",
        ativo: true,
        residuos: "Nomes Resíduos, Nomes Resíduos…",
      }));

      const documentoOptions = [
        { label: "CTF", value: "CTF" },
        { label: "MTR", value: "MTR" },
        { label: "CADRI", value: "CADRI" },
      ];
      const aterroOptions = [
        { label: "Aterro Beta", value: "beta" },
        { label: "Aterro Delta", value: "delta" },
      ];

      const RootApp = {
        components: { DssCadrisCard },
        template: `
          <DssCadrisCard
            :rows="rows"
            :documento-options="documentoOptions"
            :aterro-options="aterroOptions"
            @close="onClose"
            @search="onSearch"
          />
        `,
        setup() {
          const rows = ref(mockRows);
          return {
            rows,
            documentoOptions,
            aterroOptions,
            onClose: () => console.log("[Vue] close"),
            onSearch: (f: any) => console.log("[Vue] search", f),
          };
        },
      };

      const app = createApp(RootApp);
      app.mount(hostRef.current);
      appRef.current = app;
    });

    return () => {
      cancelled = true;
      if (appRef.current) {
        appRef.current.unmount();
        appRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <style>{`
        /* =========================================================
           DssCadrisCard — Container
           ========================================================= */
        .dss-cadris-card {
          width: 100%;
          overflow: hidden;
          background: var(--dss-surface-default, var(--dss-gray-50));
          border: 2px solid var(--dss-primary);
          border-radius: var(--dss-radius-md, 8px);
          box-shadow: var(--dss-shadow-md, 0 4px 12px rgba(0,0,0,0.08));
          font-family: inherit;
        }
        .dss-cadris-card__section { padding: 20px 24px 16px; }
        .dss-cadris-card__section-title {
          font-size: 14px; font-weight: 600; margin: 0 0 12px;
          color: var(--dss-text-primary, var(--dss-gray-900));
        }
        .dss-cadris-card__filters {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px;
        }
        @media (max-width: 768px) { .dss-cadris-card__filters { grid-template-columns: 1fr; } }
        .dss-cadris-card__search-action { display: flex; justify-content: center; margin-top: 20px; }
        .dss-cadris-card__footer {
          display: flex; justify-content: center; padding: 16px 24px;
          border-top: 1px solid var(--dss-gray-200);
          background: var(--dss-surface-default, var(--dss-gray-50));
        }

        /* =========================================================
           DssToolbar
           ========================================================= */
        .dss-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          height: 56px; padding: 0 24px;
          background: var(--dss-gray-800); color: var(--dss-gray-50);
        }
        .dss-toolbar--dense { height: 48px; }
        .dss-toolbar__title {
          margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 0.02em;
        }

        /* =========================================================
           DssInput / DssSelect (DssField)
           ========================================================= */
        .dss-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .dss-field__label {
          font-size: 12px; font-weight: 500;
          color: var(--dss-text-secondary, var(--dss-gray-700));
        }
        .dss-field__control {
          position: relative; display: flex; align-items: center;
          height: var(--dss-compact-control-height-md, 36px);
          border-bottom: 1px solid var(--dss-gray-400);
        }
        .dss-field__control:focus-within { border-bottom-color: var(--dss-primary); }
        .dss-field__input {
          width: 100%; background: transparent; border: 0; outline: none;
          font-size: 14px; padding: 0 24px 0 4px;
          color: var(--dss-text-primary, var(--dss-gray-900));
          appearance: none;
        }
        .dss-field__input--select { cursor: pointer; }
        .dss-field__chevron {
          position: absolute; right: 4px; pointer-events: none;
          color: var(--dss-primary); font-size: 12px;
        }

        /* =========================================================
           DssBtn
           ========================================================= */
        .dss-btn {
          display: inline-flex; align-items: center; gap: 8px;
          height: 36px; padding: 0 20px;
          border: 0; border-radius: var(--dss-radius-md, 6px);
          font-weight: 600; font-size: 14px; cursor: pointer;
          transition: background-color 150ms ease, opacity 150ms ease;
          font-family: inherit;
        }
        .dss-btn:disabled { cursor: not-allowed; opacity: 0.7; }
        .dss-btn:focus-visible { outline: 2px solid var(--dss-primary); outline-offset: 2px; }

        .dss-btn--warning {
          background: var(--dss-tertiary); color: var(--dss-gray-50);
          box-shadow: var(--dss-shadow-sm, 0 1px 3px rgba(0,0,0,0.12));
        }
        .dss-btn--warning:hover:not(:disabled) { background: var(--dss-tertiary-hover); }

        .dss-btn--neutral {
          background: var(--dss-gray-400); color: var(--dss-gray-50);
          letter-spacing: 0.05em; padding: 0 32px;
        }

        .dss-btn--toolbar {
          background: var(--dss-gray-700); color: var(--dss-gray-50);
        }
        .dss-btn--toolbar:hover:not(:disabled) { background: var(--dss-gray-600, var(--dss-gray-700)); }

        .dss-btn--flat { background: transparent; color: var(--dss-primary); box-shadow: none; }
        .dss-btn--flat:hover:not(:disabled) { background: var(--dss-surface-subtle, var(--dss-gray-100)); }

        .dss-btn--round {
          width: 28px; height: 28px; padding: 0; border-radius: 9999px;
          justify-content: center;
        }
        .dss-btn--icon-only { font-size: 12px; }

        .dss-btn__divider { width: 1px; height: 16px; background: currentColor; opacity: 0.4; }

        /* =========================================================
           DssTable
           ========================================================= */
        .dss-table-wrapper {
          width: 100%; overflow: hidden;
          border: 1px solid var(--dss-gray-300);
          border-radius: var(--dss-radius-sm, 4px);
        }
        .dss-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .dss-table thead {
          background: var(--dss-primary); color: var(--dss-gray-50);
        }
        .dss-table th {
          text-align: left; font-weight: 600; padding: 10px 12px; white-space: nowrap;
        }
        .dss-table td {
          padding: 8px 12px;
          color: var(--dss-text-primary, var(--dss-gray-900));
          border-top: 1px solid var(--dss-gray-200);
        }
        .dss-table tbody tr { background: var(--dss-surface-default, var(--dss-gray-50)); }
        .dss-table tbody tr.is-odd { background: var(--dss-surface-subtle, var(--dss-gray-100)); }
        .dss-table .is-bold { font-weight: 600; }
        .dss-table .is-truncate {
          max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .dss-table .is-align-right { text-align: right; }
        .dss-table .is-align-center { text-align: center; }
        .dss-table .is-align-left { text-align: left; }

        /* =========================================================
           DssBadge
           ========================================================= */
        .dss-badge { display: inline-flex; align-items: center; gap: 6px; }
        .dss-badge__dot {
          display: inline-block; width: 8px; height: 8px; border-radius: 9999px;
        }
        .dss-badge--positive .dss-badge__dot { background: var(--dss-positive); }
        .dss-badge--negative .dss-badge__dot { background: var(--dss-negative); }
        .dss-badge--neutral  .dss-badge__dot { background: var(--dss-gray-500); }

        /* =========================================================
           DssPagination
           ========================================================= */
        .dss-pagination {
          display: flex; align-items: center; justify-content: flex-end; gap: 16px;
          padding: 8px 12px; font-size: 12px;
          background: var(--dss-surface-subtle, var(--dss-gray-200));
          border-top: 1px solid var(--dss-gray-300);
          color: var(--dss-text-secondary, var(--dss-gray-700));
        }
      `}</style>
      <div ref={hostRef} />
    </>
  );
}
