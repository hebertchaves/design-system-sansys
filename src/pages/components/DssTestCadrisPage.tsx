/**
 * ==========================================================================
 * DssTestCadrisPage - Página de Teste de Composição Complexa
 * ==========================================================================
 *
 * Esta página NÃO é um playground configurável.
 * É um demonstrativo real de um componente composto (estilo "Cadris"),
 * construído inteiramente com tokens DSS e simulando como ele seria
 * implementado em Vue usando os componentes do repositório
 * (DssCard, DssToolbar, DssInput, DssButton, DssTable, DssPagination, DssIcon).
 *
 * Objetivo:
 * - Validar aninhamento real de componentes DSS
 * - Validar uso exclusivo de tokens (zero hex hardcoded)
 * - Servir de referência visual para Fase 3 (componentes compostos complexos)
 *
 * Visual: baseado no print fornecido (header navy, header de tabela azul,
 * botão "Pesquisar" laranja, status verde "Ativo", footer cinza).
 */

import React, { useMemo, useState } from "react";
import {
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import { VueCadrisMount } from "@/components/vue-runtime/VueCadrisMount";

// ============================================================================
// MOCK DATA — simulando o retorno de uma API de Cadris
// ============================================================================

interface CadriRow {
  cadri: string;
  gerador: string;
  aterro: string;
  vencimento: string;
  diasFaltantes: number;
  mediaMensal: string;
  ativo: boolean;
  residuos: string;
}

const MOCK_ROWS: CadriRow[] = Array.from({ length: 14 }).map(() => ({
  cadri: "0000000000",
  gerador: "00.000.000/0000-00",
  aterro: "Nome Aterro",
  vencimento: "00/00/0000",
  diasFaltantes: 0,
  mediaMensal: "0 ton",
  ativo: true,
  residuos: "Nomes Resíduos, Nomes Resíduos...",
}));

// ============================================================================
// SUB-COMPONENTE: Campo de input "DSS-like"
// (simula DssInput em React usando apenas tokens DSS)
// ============================================================================

interface FieldProps {
  label: string;
  placeholder?: string;
  withChevron?: boolean;
  value?: string;
  onChange?: (v: string) => void;
}

function DssLikeField({ label, placeholder, withChevron, value, onChange }: FieldProps) {
  return (
    <div className="flex flex-col gap-[var(--dss-spacing-1)] min-w-0">
      <label
        className="text-xs font-medium"
        style={{ color: "var(--dss-text-secondary, var(--dss-gray-700))" }}
      >
        {label}
      </label>
      <div
        className="relative flex items-center"
        style={{
          height: "var(--dss-compact-control-height-md, 36px)",
          borderBottom: "1px solid var(--dss-gray-400)",
          background: "transparent",
        }}
      >
        <input
          type="text"
          placeholder={placeholder ?? label}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-transparent outline-none text-sm pr-6"
          style={{
            color: "var(--dss-text-primary, var(--dss-gray-900))",
            paddingLeft: "var(--dss-spacing-1)",
          }}
        />
        {withChevron && (
          <ChevronDown
            className="absolute right-1 h-4 w-4 pointer-events-none"
            style={{ color: "var(--dss-primary)" }}
          />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTE: O CARD DE CADRIS COMPLETO
// (simula DssCadrisCard.vue do repositório)
// ============================================================================

function DssCadrisCardDemo() {
  const [filters, setFilters] = useState({
    cadri: "",
    gerador: "",
    documento: "",
    aterro: "",
  });
  const [page, setPage] = useState(1);
  const totalRows = 65;
  const rowsPerPage = 12;
  const startRow = (page - 1) * rowsPerPage + 1;
  const endRow = Math.min(page * rowsPerPage, totalRows);

  const rows = useMemo(() => MOCK_ROWS.slice(0, rowsPerPage), []);

  const update = (key: keyof typeof filters) => (v: string) =>
    setFilters((prev) => ({ ...prev, [key]: v }));

  return (
    <div
      className="w-full overflow-hidden"
      data-brand="water"
      style={{
        background: "var(--dss-surface-default, var(--dss-gray-50))",
        border: "2px solid var(--dss-primary)",
        borderRadius: "var(--dss-radius-md, 8px)",
        boxShadow: "var(--dss-shadow-md, 0 4px 12px rgba(0,0,0,0.08))",
      }}
    >
      {/* ============================================================
       * 1) DssToolbar — Header "Cadris" (navy)
       * ============================================================ */}
      <header
        className="flex items-center justify-between px-6"
        style={{
          height: "56px",
          background: "var(--dss-gray-800)",
          color: "var(--dss-gray-50)",
        }}
      >
        <h2
          className="text-lg font-semibold tracking-wide"
          style={{ color: "var(--dss-gray-50)" }}
        >
          Cadris
        </h2>
        <button
          aria-label="Fechar"
          className="flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
          style={{
            width: "28px",
            height: "28px",
            background: "var(--dss-gray-700)",
            color: "var(--dss-gray-50)",
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      {/* ============================================================
       * 2) Pesquisa — DssCardSection com DssInputs
       * ============================================================ */}
      <section className="px-6 pt-5 pb-4">
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--dss-text-primary, var(--dss-gray-900))" }}
        >
          Pesquisa
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DssLikeField
            label="Cadri"
            value={filters.cadri}
            onChange={update("cadri")}
          />
          <DssLikeField
            label="Gerador"
            value={filters.gerador}
            onChange={update("gerador")}
          />
          <DssLikeField
            label="Documento"
            withChevron
            value={filters.documento}
            onChange={update("documento")}
          />
          <DssLikeField
            label="Aterro"
            withChevron
            value={filters.aterro}
            onChange={update("aterro")}
          />
        </div>

        {/* DssButton variant="primary" color="warning" */}
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 rounded-md font-semibold text-sm transition-colors"
            style={{
              height: "36px",
              background: "var(--dss-tertiary)",
              color: "var(--dss-gray-50)",
              boxShadow: "var(--dss-shadow-sm, 0 1px 3px rgba(0,0,0,0.12))",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--dss-tertiary-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--dss-tertiary)")
            }
          >
            <AlertCircle className="h-4 w-4" />
            <span
              className="h-4 w-px"
              style={{ background: "var(--dss-gray-50)", opacity: 0.5 }}
            />
            Pesquisar
          </button>
        </div>
      </section>

      {/* ============================================================
       * 3) Total Cadris — Tabela
       * ============================================================ */}
      <section className="px-6 pb-4">
        <h3
          className="text-sm font-semibold mb-2"
          style={{ color: "var(--dss-text-primary, var(--dss-gray-900))" }}
        >
          Total Cadris
        </h3>

        <div
          className="w-full overflow-hidden"
          style={{
            borderRadius: "var(--dss-radius-sm, 4px)",
            border: "1px solid var(--dss-gray-300)",
          }}
        >
          <table className="w-full text-xs" role="table">
            {/* Cabeçalho azul (DSS Water/Primary) */}
            <thead
              style={{
                background: "var(--dss-primary)",
                color: "var(--dss-gray-50)",
              }}
            >
              <tr>
                {[
                  "Cadri",
                  "Gerador",
                  "Aterro",
                  "Data vencimento",
                  "Dias Faltantes",
                  "Média mensal",
                  "Ativo",
                  "Resíduos",
                  "",
                ].map((h, i) => (
                  <th
                    key={i}
                    role="columnheader"
                    className="text-left font-semibold py-2.5 px-3 whitespace-nowrap"
                    style={{ color: "var(--dss-gray-50)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Linhas com zebra usando surface tokens */}
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    background:
                      idx % 2 === 0
                        ? "var(--dss-surface-default, var(--dss-gray-50))"
                        : "var(--dss-surface-subtle, var(--dss-gray-100))",
                    borderTop: "1px solid var(--dss-gray-200)",
                  }}
                >
                  <td
                    className="py-2 px-3"
                    style={{
                      color: "var(--dss-text-primary, var(--dss-gray-900))",
                    }}
                  >
                    {row.cadri}
                  </td>
                  <td
                    className="py-2 px-3"
                    style={{
                      color: "var(--dss-text-primary, var(--dss-gray-900))",
                    }}
                  >
                    {row.gerador}
                  </td>
                  <td
                    className="py-2 px-3"
                    style={{
                      color: "var(--dss-text-primary, var(--dss-gray-900))",
                    }}
                  >
                    {row.aterro}
                  </td>
                  <td
                    className="py-2 px-3"
                    style={{
                      color: "var(--dss-text-primary, var(--dss-gray-900))",
                    }}
                  >
                    {row.vencimento}
                  </td>
                  <td
                    className="py-2 px-3"
                    style={{
                      color: "var(--dss-text-primary, var(--dss-gray-900))",
                    }}
                  >
                    {String(row.diasFaltantes).padStart(2, "0")}
                  </td>
                  <td
                    className="py-2 px-3 font-semibold"
                    style={{
                      color: "var(--dss-text-primary, var(--dss-gray-900))",
                    }}
                  >
                    {row.mediaMensal}
                  </td>
                  <td className="py-2 px-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="inline-block rounded-full"
                        style={{
                          width: 8,
                          height: 8,
                          background: row.ativo
                            ? "var(--dss-positive)"
                            : "var(--dss-negative)",
                        }}
                      />
                      <span
                        style={{
                          color:
                            "var(--dss-text-primary, var(--dss-gray-900))",
                        }}
                      >
                        {row.ativo ? "Sim" : "Não"}
                      </span>
                    </span>
                  </td>
                  <td
                    className="py-2 px-3 max-w-[180px] truncate"
                    style={{
                      color: "var(--dss-text-primary, var(--dss-gray-900))",
                    }}
                  >
                    {row.residuos}
                  </td>
                  <td className="py-2 px-2 text-right">
                    <button
                      aria-label="Expandir linha"
                      className="inline-flex items-center justify-center rounded transition-colors"
                      style={{
                        width: 24,
                        height: 24,
                        color: "var(--dss-primary)",
                      }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer da tabela / Paginação (DssPagination) */}
          <div
            className="flex items-center justify-end gap-4 px-3 py-2"
            style={{
              background: "var(--dss-surface-subtle, var(--dss-gray-200))",
              borderTop: "1px solid var(--dss-gray-300)",
              color: "var(--dss-text-secondary, var(--dss-gray-700))",
              fontSize: "12px",
            }}
          >
            <div className="flex items-center gap-1">
              <span>Linhas por página:</span>
              <button className="inline-flex items-center gap-0.5">
                <span className="font-medium">{rowsPerPage}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <div>
              {startRow}-{endRow} de {totalRows}
            </div>
            <div className="flex items-center gap-1">
              <button
                aria-label="Página anterior"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center justify-center rounded disabled:opacity-40"
                style={{
                  width: 24,
                  height: 24,
                  color: "var(--dss-text-primary, var(--dss-gray-900))",
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Próxima página"
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex items-center justify-center rounded"
                style={{
                  width: 24,
                  height: 24,
                  color: "var(--dss-text-primary, var(--dss-gray-900))",
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
       * 4) DssCardActions — Footer com botão FECHAR
       * ============================================================ */}
      <footer
        className="flex justify-center px-6 py-4"
        style={{
          borderTop: "1px solid var(--dss-gray-200)",
          background: "var(--dss-surface-default, var(--dss-gray-50))",
        }}
      >
        <button
          type="button"
          className="px-8 rounded-md font-semibold text-sm tracking-wide"
          style={{
            height: "36px",
            background: "var(--dss-gray-400)",
            color: "var(--dss-gray-50)",
            cursor: "not-allowed",
          }}
          disabled
        >
          FECHAR
        </button>
      </footer>
    </div>
  );
}

// ============================================================================
// PÁGINA
// ============================================================================

const VUE_SOURCE = `<template>
  <DssCard variant="bordered" data-brand="water">
    <!-- 1) Header (DssToolbar) -->
    <DssToolbar inset class="bg-gray-800 text-gray-50">
      <DssToolbarTitle>Cadris</DssToolbarTitle>
      <DssBtn flat round dense icon="close" @click="$emit('close')" />
    </DssToolbar>

    <!-- 2) Pesquisa -->
    <DssCardSection>
      <h3 class="text-subtitle">Pesquisa</h3>
      <div class="row q-col-gutter-md">
        <DssInput v-model="filters.cadri"      label="Cadri"      class="col-3" />
        <DssInput v-model="filters.gerador"    label="Gerador"    class="col-3" />
        <DssSelect v-model="filters.documento" label="Documento"  class="col-3" />
        <DssSelect v-model="filters.aterro"    label="Aterro"     class="col-3" />
      </div>

      <div class="row justify-center q-mt-md">
        <DssBtn color="warning" icon="warning" @click="onSearch">
          Pesquisar
        </DssBtn>
      </div>
    </DssCardSection>

    <!-- 3) Total Cadris (DssTable) -->
    <DssCardSection>
      <h3 class="text-subtitle">Total Cadris</h3>
      <DssTable
        :rows="rows"
        :columns="columns"
        :pagination="pagination"
        :loading="loading"
        row-key="cadri"
      >
        <template v-slot:body-cell-ativo="props">
          <DssBadge :color="props.value ? 'positive' : 'negative'" dot>
            {{ props.value ? 'Sim' : 'Não' }}
          </DssBadge>
        </template>
      </DssTable>
    </DssCardSection>

    <!-- 4) Footer -->
    <DssCardActions align="center">
      <DssBtn color="dark" :disable="!hasChanges" @click="$emit('close')">
        FECHAR
      </DssBtn>
    </DssCardActions>
  </DssCard>
</template>`;

export default function DssTestCadrisPage() {
  return (
    <div className="space-y-8 px-8 py-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="Página de Teste — Composição Complexa"
        subtitle="Demonstração com runtime Vue 3 REAL embarcado (via ESM CDN). O DssCadrisCard abaixo é um componente Vue legítimo (template + setup + v-model + emits) executando no browser, consumindo exclusivamente tokens DSS."
      />

      <div className="space-y-3">
        <SectionHeader title="Demonstração: DssCadrisCard" />
        <p className="text-sm" style={{ color: "var(--dss-text-secondary, var(--dss-gray-700))" }}>
          Card composto por DssToolbar (header navy), DssInputs/DssSelects de pesquisa, DssBtn de feedback (warning), DssTable (header primary), DssBadge de status e DssPagination — tudo via tokens semânticos com data-brand=water.
        </p>

        <div
          className="rounded-lg p-6"
          style={{
            background: "var(--dss-surface-subtle, var(--dss-gray-100))",
            border: "1px dashed var(--dss-gray-300)",
          }}
        >
          <VueCadrisMount />
        </div>
      </div>

      <CollapsibleSection title="Tokens DSS consumidos" defaultOpen={false}>
        <ul
          className="text-sm space-y-1 list-disc pl-5"
          style={{ color: "var(--dss-text-secondary, var(--dss-gray-700))" }}
        >
          <li>
            <code>--dss-gray-800</code> → header "Cadris" (navy)
          </li>
          <li>
            <code>--dss-primary</code> → header da tabela (azul Water)
          </li>
          <li>
            <code>--dss-tertiary</code> / <code>--dss-tertiary-hover</code> →
            botão "Pesquisar"
          </li>
          <li>
            <code>--dss-positive</code> → status "Ativo"
          </li>
          <li>
            <code>--dss-surface-default</code> /{" "}
            <code>--dss-surface-subtle</code> → zebra das linhas
          </li>
          <li>
            <code>--dss-gray-400</code> → botão "FECHAR" desabilitado
          </li>
          <li>
            <code>--dss-radius-md</code>, <code>--dss-shadow-md</code>,{" "}
            <code>--dss-spacing-*</code>
          </li>
        </ul>
      </CollapsibleSection>

      <CollapsibleSection
        title="Equivalente Vue (componentes DSS reais)"
        defaultOpen={false}
      >
        <pre
          className="text-xs p-4 rounded overflow-x-auto"
          style={{
            background: "var(--dss-gray-900)",
            color: "var(--dss-gray-100)",
            fontFamily: "monospace",
          }}
        >
          <code>{VUE_SOURCE}</code>
        </pre>
      </CollapsibleSection>
    </div>
  );
}
