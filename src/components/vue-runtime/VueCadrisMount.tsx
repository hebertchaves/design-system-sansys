/**
 * ==========================================================================
 * VueCadrisMount — Runtime Vue 3 REAL embarcado em React
 * ==========================================================================
 *
 * Este componente carrega Vue 3 via ESM CDN (esm.sh) em runtime e monta uma
 * aplicação Vue de verdade dentro de um container DOM controlado pelo React.
 *
 * O componente Vue renderizado simula o `DssCadrisCard` do repositório DSS,
 * usando exclusivamente tokens semânticos `--dss-*`. Isto NÃO é uma simulação
 * em JSX — é Vue 3 SFC-like (template + setup) executando no browser.
 *
 * Por que ESM CDN?
 *   - Evita adicionar Vue como dependência permanente do projeto React.
 *   - Permite demonstrar fielmente a sintaxe Vue (v-model, v-for, @click).
 *   - Isolado do ciclo de vida do React (mount/unmount manual).
 */

import { useEffect, useRef } from "react";

// URL do Vue 3 runtime + compiler (necessário para compilar templates string em runtime)
const VUE_ESM_URL = "https://esm.sh/vue@3.4.38/dist/vue.esm-browser.js";

// Cache do módulo Vue para não recarregar a cada montagem
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
      // Componente Vue REAL — DssCadrisCard (template + setup)
      // ============================================================
      const DssCadrisCard = {
        name: "DssCadrisCard",
        template: `
          <div class="dss-cadris-card" data-brand="water">
            <!-- 1) DssToolbar -->
            <header class="dss-cadris-card__toolbar">
              <h2 class="dss-cadris-card__title">{{ title }}</h2>
              <button
                class="dss-cadris-card__close-btn"
                aria-label="Fechar"
                @click="$emit('close')"
              >✕</button>
            </header>

            <!-- 2) Pesquisa -->
            <section class="dss-cadris-card__section">
              <h3 class="dss-cadris-card__section-title">Pesquisa</h3>
              <div class="dss-cadris-card__filters">
                <label v-for="f in fields" :key="f.key" class="dss-field">
                  <span class="dss-field__label">{{ f.label }}</span>
                  <span class="dss-field__control">
                    <input
                      type="text"
                      class="dss-field__input"
                      :placeholder="f.label"
                      v-model="filters[f.key]"
                    />
                    <span v-if="f.chevron" class="dss-field__chevron">▾</span>
                  </span>
                </label>
              </div>
              <div class="dss-cadris-card__search-action">
                <button
                  class="dss-btn dss-btn--warning"
                  :disabled="loading"
                  @click="onSearch"
                >
                  <span class="dss-btn__icon">⚠</span>
                  <span class="dss-btn__divider"></span>
                  <span>{{ loading ? 'Pesquisando…' : 'Pesquisar' }}</span>
                </button>
              </div>
            </section>

            <!-- 3) Tabela -->
            <section class="dss-cadris-card__section">
              <h3 class="dss-cadris-card__section-title">Total Cadris</h3>
              <div class="dss-table-wrapper">
                <table class="dss-table" role="table">
                  <thead>
                    <tr>
                      <th v-for="(c, i) in columns" :key="i" role="columnheader">{{ c }}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, idx) in pagedRows" :key="idx" :class="{ 'is-odd': idx % 2 }">
                      <td>{{ row.cadri }}</td>
                      <td>{{ row.gerador }}</td>
                      <td>{{ row.aterro }}</td>
                      <td>{{ row.vencimento }}</td>
                      <td>{{ String(row.diasFaltantes).padStart(2, '0') }}</td>
                      <td class="is-bold">{{ row.mediaMensal }}</td>
                      <td>
                        <span class="dss-badge">
                          <span class="dss-badge__dot" :class="row.ativo ? 'is-positive' : 'is-negative'"></span>
                          <span>{{ row.ativo ? 'Sim' : 'Não' }}</span>
                        </span>
                      </td>
                      <td class="is-truncate">{{ row.residuos }}</td>
                      <td class="is-right">
                        <button class="dss-icon-btn" aria-label="Expandir">▾</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="dss-pagination">
                  <span>Linhas por página: {{ rowsPerPage }} ▾</span>
                  <span>{{ startRow }}-{{ endRow }} de {{ totalRows }}</span>
                  <button class="dss-icon-btn" :disabled="page === 1" @click="page--">‹</button>
                  <button class="dss-icon-btn" @click="page++">›</button>
                </div>
              </div>
            </section>

            <!-- 4) Footer -->
            <footer class="dss-cadris-card__footer">
              <button class="dss-btn dss-btn--neutral" disabled>FECHAR</button>
            </footer>
          </div>
        `,
        emits: ["close", "search"],
        props: {
          title: { type: String, default: "Cadris" },
          rows: { type: Array, required: true },
        },
        setup(props: any, { emit }: any) {
          const filters = ref({ cadri: "", gerador: "", documento: "", aterro: "" });
          const loading = ref(false);
          const page = ref(1);
          const rowsPerPage = 12;
          const totalRows = computed(() => props.rows.length);
          const startRow = computed(() => (page.value - 1) * rowsPerPage + 1);
          const endRow = computed(() => Math.min(page.value * rowsPerPage, totalRows.value));
          const pagedRows = computed(() =>
            props.rows.slice((page.value - 1) * rowsPerPage, page.value * rowsPerPage)
          );

          const fields = [
            { key: "cadri", label: "Cadri" },
            { key: "gerador", label: "Gerador" },
            { key: "documento", label: "Documento", chevron: true },
            { key: "aterro", label: "Aterro", chevron: true },
          ];
          const columns = [
            "Cadri", "Gerador", "Aterro", "Data vencimento",
            "Dias Faltantes", "Média mensal", "Ativo", "Resíduos",
          ];

          function onSearch() {
            loading.value = true;
            emit("search", filters.value);
            setTimeout(() => (loading.value = false), 1200);
          }

          return {
            filters, loading, page, rowsPerPage, totalRows,
            startRow, endRow, pagedRows, fields, columns, onSearch,
          };
        },
      };

      // ============================================================
      // App Vue raiz que consome o DssCadrisCard
      // ============================================================
      const mockRows = Array.from({ length: 14 }).map(() => ({
        cadri: "0000000000",
        gerador: "00.000.000/0000-00",
        aterro: "Nome Aterro",
        vencimento: "00/00/0000",
        diasFaltantes: 0,
        mediaMensal: "0 ton",
        ativo: true,
        residuos: "Nomes Resíduos, Nomes Resíduos…",
      }));

      const RootApp = {
        components: { DssCadrisCard },
        template: `<DssCadrisCard :rows="rows" @close="onClose" @search="onSearch" />`,
        setup() {
          const rows = ref(mockRows);
          return {
            rows,
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
      {/* Estilos do componente Vue — escopados via classe raiz dss-cadris-card */}
      <style>{`
        .dss-cadris-card {
          width: 100%;
          overflow: hidden;
          background: var(--dss-surface-default, var(--dss-gray-50));
          border: 2px solid var(--dss-primary);
          border-radius: var(--dss-radius-md, 8px);
          box-shadow: var(--dss-shadow-md, 0 4px 12px rgba(0,0,0,0.08));
          font-family: inherit;
        }
        .dss-cadris-card__toolbar {
          display: flex; align-items: center; justify-content: space-between;
          height: 56px; padding: 0 24px;
          background: var(--dss-gray-800); color: var(--dss-gray-50);
        }
        .dss-cadris-card__title { font-size: 18px; font-weight: 600; letter-spacing: 0.02em; }
        .dss-cadris-card__close-btn {
          width: 28px; height: 28px; border-radius: 9999px; border: 0;
          background: var(--dss-gray-700); color: var(--dss-gray-50); cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center; font-size: 12px;
        }
        .dss-cadris-card__close-btn:hover { opacity: 0.85; }

        .dss-cadris-card__section { padding: 20px 24px 16px; }
        .dss-cadris-card__section-title {
          font-size: 14px; font-weight: 600; margin: 0 0 12px;
          color: var(--dss-text-primary, var(--dss-gray-900));
        }
        .dss-cadris-card__filters {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px;
        }
        @media (max-width: 768px) { .dss-cadris-card__filters { grid-template-columns: 1fr; } }

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
        .dss-field__input {
          width: 100%; background: transparent; border: 0; outline: none;
          font-size: 14px; padding: 0 24px 0 4px;
          color: var(--dss-text-primary, var(--dss-gray-900));
        }
        .dss-field__chevron {
          position: absolute; right: 4px; pointer-events: none;
          color: var(--dss-primary); font-size: 12px;
        }

        .dss-cadris-card__search-action { display: flex; justify-content: center; margin-top: 20px; }
        .dss-btn {
          display: inline-flex; align-items: center; gap: 8px;
          height: 36px; padding: 0 20px;
          border: 0; border-radius: var(--dss-radius-md, 6px);
          font-weight: 600; font-size: 14px; cursor: pointer;
          transition: background-color 150ms ease;
        }
        .dss-btn:disabled { cursor: not-allowed; opacity: 0.7; }
        .dss-btn--warning {
          background: var(--dss-tertiary); color: var(--dss-gray-50);
          box-shadow: var(--dss-shadow-sm, 0 1px 3px rgba(0,0,0,0.12));
        }
        .dss-btn--warning:hover:not(:disabled) { background: var(--dss-tertiary-hover); }
        .dss-btn--neutral {
          background: var(--dss-gray-400); color: var(--dss-gray-50);
          letter-spacing: 0.05em; padding: 0 32px;
        }
        .dss-btn__divider { width: 1px; height: 16px; background: var(--dss-gray-50); opacity: 0.5; }

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
        .dss-table td.is-bold { font-weight: 600; }
        .dss-table td.is-truncate {
          max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .dss-table td.is-right { text-align: right; }

        .dss-badge { display: inline-flex; align-items: center; gap: 6px; }
        .dss-badge__dot {
          display: inline-block; width: 8px; height: 8px; border-radius: 9999px;
        }
        .dss-badge__dot.is-positive { background: var(--dss-positive); }
        .dss-badge__dot.is-negative { background: var(--dss-negative); }

        .dss-icon-btn {
          width: 24px; height: 24px; border: 0; background: transparent;
          color: var(--dss-primary); cursor: pointer; border-radius: 4px;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .dss-icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .dss-pagination {
          display: flex; align-items: center; justify-content: flex-end; gap: 16px;
          padding: 8px 12px; font-size: 12px;
          background: var(--dss-surface-subtle, var(--dss-gray-200));
          border-top: 1px solid var(--dss-gray-300);
          color: var(--dss-text-secondary, var(--dss-gray-700));
        }

        .dss-cadris-card__footer {
          display: flex; justify-content: center; padding: 16px 24px;
          border-top: 1px solid var(--dss-gray-200);
          background: var(--dss-surface-default, var(--dss-gray-50));
        }
      `}</style>
      <div ref={hostRef} />
    </>
  );
}
