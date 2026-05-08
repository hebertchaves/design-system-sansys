// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  Shield,
  MoreHorizontal,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

import {
  DssPlayground,
  ControlGrid,
  VariantSelector,
  ColorPicker,
  BrandPicker,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

// ============================================================================
// DADOS
// ============================================================================

const variants = [
  { name: "default", label: "Default", desc: "Botão ativo preenchido (padrão)" },
  { name: "flat", label: "Flat", desc: "Sem fundo; ativo destacado pela cor de texto/peso" },
  { name: "outline", label: "Outline", desc: "Borda no botão ativo, fundo transparente" },
  { name: "round", label: "Round", desc: "Botões circulares (border-radius full)" },
];

const sizes = [
  { name: "xs", label: "XS" },
  { name: "sm", label: "SM" },
  { name: "md", label: "MD" },
  { name: "lg", label: "LG" },
];

const propsData = [
  { category: "Modelo", prop: "modelValue", type: "Number", default: "—", description: "Página atual selecionada (v-model). Obrigatório." },
  { category: "Modelo", prop: "max", type: "Number", default: "—", description: "Número total de páginas. Obrigatório." },
  { category: "Layout", prop: "maxPages", type: "Number", default: "5", description: "Máximo de botões de página visíveis simultaneamente." },
  { category: "Estados", prop: "disable", type: "Boolean", default: "false", description: "Desabilita toda a paginação (visual + interação)." },
  { category: "Estados", prop: "readonly", type: "Boolean", default: "false", description: "Bloqueia interação sem alterar aparência." },
  { category: "Densidade", prop: "size", type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: "Tamanho dos botões. Mapeia tokens compactos." },
  { category: "Layout", prop: "ellipses", type: "Boolean", default: "true", description: "Exibe reticências (…) para páginas fora da janela visível." },
  { category: "Layout", prop: "boundaryLinks", type: "Boolean", default: "false", description: "Botões para ir à primeira e última página." },
  { category: "Layout", prop: "directionLinks", type: "Boolean", default: "true", description: "Botões para página anterior e próxima." },
  { category: "Variantes", prop: "flat", type: "Boolean", default: "false", description: "Variante sem fundo no botão ativo." },
  { category: "Variantes", prop: "outline", type: "Boolean", default: "false", description: "Variante com borda no botão ativo." },
  { category: "Variantes", prop: "round", type: "Boolean", default: "false", description: "Variante com botões circulares." },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "—", description: "Tema de marca Sansys (sobrescreve --q-color-primary)." },
  { category: "Acessibilidade", prop: "ariaLabel", type: "String", default: "'Navegação por páginas'", description: "Label ARIA do container raiz (role=navigation)." },
];

const eventsData = [
  { event: "update:modelValue", payload: "number", desc: "Emitido quando o usuário seleciona uma nova página (v-model)." },
];

const anatomyData = {
  structure: {
    files: ["DssPagination.ts.vue"],
    description: "Wrapper em torno de QPagination. Define o container semântico com role=navigation e aria-label, repassa props tipadas e emite update:modelValue.",
    responsibilities: ["Template HTML semântico", "Props TypeScript tipadas", "Emissão de evento de mudança de página", "ARIA navigation"],
    tokens: [],
    codeExample: `<template>
  <div
    :class="rootClasses"
    :data-brand="brand ?? undefined"
    role="navigation"
    :aria-label="ariaLabel"
  >
    <q-pagination
      :model-value="modelValue"
      :max="max"
      :max-pages="maxPages"
      :ellipses="ellipses"
      :direction-links="directionLinks"
      :boundary-links="boundaryLinks"
      :flat="flat"
      :outline="outline"
      :round="round"
      :size="size"
      color="primary"
      active-color="primary"
      unelevated
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>`,
  },
  composition: {
    files: ["_base.scss"],
    description: "Layout base: alinhamento horizontal, gap entre botões, alturas via tokens compactos e tipografia.",
    responsibilities: ["Display flex e gap entre botões", "Mapeamento size → altura compacta", "Tipografia dos números"],
    tokens: ["--dss-gap-1", "--dss-compact-control-height-*", "--dss-font-size-xs/sm/md", "--dss-font-weight-medium"],
    codeExample: `.dss-pagination {
  display: inline-flex;
  align-items: center;
  gap: var(--dss-gap-1);

  .q-pagination .q-btn {
    min-height: var(--dss-compact-control-height-md);
    font-weight: var(--dss-font-weight-medium);
    border-radius: var(--dss-radius-md);
  }
}`,
  },
  variants: {
    files: ["_variant.scss"],
    description: "Variações visuais: flat, outline e round. EXC-Gate-01: sobrescreve internos do QPagination com tokens DSS.",
    responsibilities: ["Variante flat (ativo sem fundo)", "Variante outline (borda no ativo)", "Variante round (border-radius full)"],
    tokens: ["--dss-action-primary", "--dss-radius-full", "--dss-border-width-thin", "--dss-font-weight-bold"],
    codeExample: `.dss-pagination--outline {
  .q-pagination .q-btn[aria-current="page"] {
    background-color: transparent !important;
    border: var(--dss-border-width-thin) solid var(--dss-action-primary);
    color: var(--dss-action-primary);
  }
}`,
  },
  output: {
    files: ["_states.scss", "_brands.scss"],
    description: "Camada final: estados (hover, focus, disabled), brandabilidade Hub/Water/Waste via --q-color-primary e suporte a dark mode / forced-colors.",
    responsibilities: ["Hover/focus/active dos botões", "Brand override via --q-color-primary", "Dark mode e high contrast"],
    tokens: ["--dss-hub-primary", "--dss-water-primary", "--dss-waste-primary", "--dss-opacity-disabled", "--dss-shadow-focus"],
    codeExample: `[data-brand="water"] .dss-pagination,
.dss-pagination[data-brand="water"] {
  --q-color-primary: var(--dss-water-primary);
}`,
  },
};

// ============================================================================
// PREVIEW
// ============================================================================

interface DssPaginationPreviewProps {
  variant: string;
  size: string;
  color: string;
  brand?: string | null;
  isDarkMode?: boolean;
  ellipses?: boolean;
  boundaryLinks?: boolean;
  directionLinks?: boolean;
  disable?: boolean;
  max?: number;
  maxPages?: number;
}

function DssPaginationPreview({
  variant,
  size,
  color,
  brand = null,
  isDarkMode = false,
  ellipses = true,
  boundaryLinks = false,
  directionLinks = true,
  disable = false,
  max = 12,
  maxPages = 5,
}: DssPaginationPreviewProps) {
  const [page, setPage] = useState(1);

  const sizeMap: Record<string, { h: number; fs: number; pad: number }> = {
    xs: { h: 24, fs: 11, pad: 6 },
    sm: { h: 32, fs: 12, pad: 8 },
    md: { h: 36, fs: 13, pad: 10 },
    lg: { h: 44, fs: 15, pad: 12 },
  };
  const dim = sizeMap[size] || sizeMap.md;

  const getActiveColor = () => {
    if (brand && DSS_BRAND_COLORS[brand]) return DSS_BRAND_COLORS[brand].principal;
    const c = DSS_SEMANTIC_COLORS[color];
    return c?.bg || "#1f86de";
  };

  const activeColor = getActiveColor();
  const fg = isDarkMode ? "#e5e5e5" : "#454545";
  const muted = isDarkMode ? "#707070" : "#a3a3a3";
  const borderNeutral = isDarkMode ? "#404040" : "#d4d4d4";

  // Build page list with ellipses (Quasar-like)
  const buildPages = (): (number | "…")[] => {
    if (max <= maxPages) return Array.from({ length: max }, (_, i) => i + 1);
    const half = Math.floor(maxPages / 2);
    let start = Math.max(2, page - half);
    let end = Math.min(max - 1, start + maxPages - 3);
    start = Math.max(2, end - (maxPages - 3));
    const list: (number | "…")[] = [1];
    if (ellipses && start > 2) list.push("…");
    for (let i = start; i <= end; i++) list.push(i);
    if (ellipses && end < max - 1) list.push("…");
    list.push(max);
    return list;
  };

  const pages = buildPages();

  const btnStyle = (active: boolean): React.CSSProperties => {
    const isRound = variant === "round";
    const isOutline = variant === "outline";
    const isFlat = variant === "flat";

    const base: React.CSSProperties = {
      minWidth: `${dim.h}px`,
      height: `${dim.h}px`,
      padding: `0 ${dim.pad}px`,
      fontSize: `${dim.fs}px`,
      fontWeight: active && isFlat ? 700 : 500,
      borderRadius: isRound ? "9999px" : "4px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: disable ? "not-allowed" : "pointer",
      transition: "all 150ms cubic-bezier(0.4,0,0.2,1)",
      border: "1px solid transparent",
      backgroundColor: "transparent",
      color: fg,
      opacity: disable ? 0.5 : 1,
      userSelect: "none",
    };

    if (active) {
      if (isFlat) {
        return { ...base, backgroundColor: "transparent", color: activeColor };
      }
      if (isOutline) {
        return {
          ...base,
          backgroundColor: "transparent",
          borderColor: activeColor,
          color: activeColor,
        };
      }
      return { ...base, backgroundColor: activeColor, color: "#ffffff" };
    }
    return base;
  };

  const navBtnStyle: React.CSSProperties = {
    ...btnStyle(false),
    color: muted,
  };

  const handleGo = (p: number | "…") => {
    if (disable || p === "…") return;
    if (p < 1 || p > max) return;
    setPage(p);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div
        className="inline-flex items-center"
        style={{ gap: "4px" }}
        role="navigation"
        aria-label="Navegação por páginas"
      >
        {boundaryLinks && (
          <button
            style={navBtnStyle}
            onClick={() => handleGo(1)}
            disabled={disable || page === 1}
            aria-label="Primeira página"
          >
            <ChevronsLeft size={dim.fs + 4} />
          </button>
        )}
        {directionLinks && (
          <button
            style={navBtnStyle}
            onClick={() => handleGo(page - 1)}
            disabled={disable || page === 1}
            aria-label="Página anterior"
          >
            <ChevronLeft size={dim.fs + 4} />
          </button>
        )}

        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`e-${i}`}
              style={{ ...navBtnStyle, cursor: "default" }}
              aria-hidden="true"
            >
              <MoreHorizontal size={dim.fs + 2} />
            </span>
          ) : (
            <button
              key={p}
              style={btnStyle(p === page)}
              onClick={() => handleGo(p)}
              disabled={disable}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Página ${p}`}
            >
              {p}
            </button>
          )
        )}

        {directionLinks && (
          <button
            style={navBtnStyle}
            onClick={() => handleGo(page + 1)}
            disabled={disable || page === max}
            aria-label="Próxima página"
          >
            <ChevronRight size={dim.fs + 4} />
          </button>
        )}
        {boundaryLinks && (
          <button
            style={navBtnStyle}
            onClick={() => handleGo(max)}
            disabled={disable || page === max}
            aria-label="Última página"
          >
            <ChevronsRight size={dim.fs + 4} />
          </button>
        )}
      </div>

      <div className="text-xs" style={{ color: muted }}>
        Página <strong style={{ color: fg }}>{page}</strong> de {max}
      </div>
    </div>
  );
}

// ============================================================================
// PÁGINA
// ============================================================================

export default function DssPaginationPage() {
  const [selectedVariant, setSelectedVariant] = useState("default");
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [booleanStates, setBooleanStates] = useState({
    ellipses: true,
    boundaryLinks: false,
    directionLinks: true,
    disable: false,
  });

  const handleColorChange = (c: string) => {
    setSelectedColor(c);
    setSelectedBrand(null);
  };
  const handleBrandChange = (b: string | null) => {
    if (b) {
      setSelectedBrand(b);
      setSelectedColor(null);
    }
  };
  const toggle = (n: string) =>
    setBooleanStates((prev) => ({ ...prev, [n]: !prev[n as keyof typeof prev] }));

  const effectiveColor = selectedBrand ? "primary" : selectedColor || "primary";

  const generateCode = () => {
    const props: string[] = ['v-model="page"', ":max=\"12\""];
    if (selectedSize !== "md") props.push(`size="${selectedSize}"`);
    if (selectedVariant === "flat") props.push("flat");
    if (selectedVariant === "outline") props.push("outline");
    if (selectedVariant === "round") props.push("round");
    if (selectedBrand) props.push(`brand="${selectedBrand}"`);
    if (!booleanStates.ellipses) props.push(":ellipses=\"false\"");
    if (booleanStates.boundaryLinks) props.push("boundary-links");
    if (!booleanStates.directionLinks) props.push(":direction-links=\"false\"");
    if (booleanStates.disable) props.push("disable");
    return `<DssPagination\n  ${props.join("\n  ")}\n/>`;
  };

  const layoutOptions = [
    { name: "ellipses", label: "Ellipses" },
    { name: "directionLinks", label: "Direction Links" },
    { name: "boundaryLinks", label: "Boundary Links" },
  ];
  const stateOptions = [{ name: "disable", label: "Disable" }];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* HEADER */}
      <PageHeader
        icon={MoreHorizontal}
        badge="Componente Base"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssPagination"
        subtitle="DssPagination é o componente responsável por navegar entre páginas em listas, tabelas e resultados de busca dentro do DSS. Wrapper sobre QPagination que aplica tokens semânticos, brandabilidade e ARIA navigation, mantendo a lógica de janela de páginas e elipses gerenciada pelo Quasar."
        subtitleHighlights={["navegação paginada", "brandabilidade multi-marca", "ARIA navigation", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v1.0.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      {/* QUANDO USAR */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-5 rounded-lg border" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", borderColor: "var(--dss-positive)" }}>
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-positive)" }}>
            <CheckCircle className="h-5 w-5" />
            Quando Usar
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "Listagens com grande volume de registros divididos em páginas",
              "Tabelas de dados com paginação server-side ou client-side",
              "Resultados de busca com navegação numérica explícita",
              "Galerias de imagens ou cards paginados",
              "Quando o total de páginas é conhecido e relativamente pequeno (<200)",
              "Contextos onde o usuário precisa pular para uma página específica",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-lg border" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", borderColor: "var(--dss-negative)" }}>
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-negative)" }}>
            <XCircle className="h-5 w-5" />
            Quando NÃO Usar
          </h4>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Cenário</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Alternativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { scenario: "Feeds infinitos / scroll contínuo", alt: "DssInfiniteScroll" },
                { scenario: "Total de páginas desconhecido", alt: "DssLoadMore" },
                { scenario: "Navegação entre etapas de fluxo", alt: "DssStepper" },
                { scenario: "Apenas próximo/anterior, sem números", alt: "DssBtnGroup (prev/next)" },
                { scenario: "Carrosséis de mídia", alt: "DssCarousel" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.scenario}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.alt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PLAYGROUND */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure a Pagination"
        description="Teste variantes, tamanhos, brand e comportamentos. Clique nos números para navegar entre páginas."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="220px"
        previewContent={
          <DssPaginationPreview
            variant={selectedVariant}
            size={selectedSize}
            color={effectiveColor}
            brand={selectedBrand}
            isDarkMode={isDarkMode}
            ellipses={booleanStates.ellipses}
            boundaryLinks={booleanStates.boundaryLinks}
            directionLinks={booleanStates.directionLinks}
            disable={booleanStates.disable}
            max={12}
            maxPages={5}
          />
        }
        controls={
          <ControlGrid columns={5}>
            <VariantSelector variants={variants} selectedVariant={selectedVariant} onSelect={setSelectedVariant} />
            <VariantSelector
              label="Size"
              variants={sizes}
              selectedVariant={selectedSize}
              onSelect={setSelectedSize}
            />
            <ColorPicker label="Color" colors={Object.values(DSS_SEMANTIC_COLORS)} selectedColor={selectedColor} onSelect={handleColorChange} />
            <BrandPicker brands={DSS_BRAND_COLORS} selectedBrand={selectedBrand} onSelect={handleBrandChange} />
            <ToggleGroup label="Layout" options={layoutOptions} values={booleanStates} onToggle={toggle} />
            <ToggleGroup label="Estados" options={stateOptions} values={booleanStates} onToggle={toggle} />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* ESTADOS */}
      <SectionHeader title="Estados" titleAccent="Interativos" badge="Comportamento" />
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Estado</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Visual</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Interação</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tokens Aplicados</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Acessibilidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { state: "Default", visual: "Botões neutros, ativo destacado por --dss-action-primary", interaction: "Pronto para clique", tokens: "--dss-text-primary, --dss-radius-md", a11y: "role=navigation, aria-label" },
              { state: "Hover", visual: "Botão inativo recebe leve fundo de hover", interaction: "Pointer over", tokens: "--dss-action-primary @ 8%", a11y: "—" },
              { state: "Focus", visual: "Focus ring visível em volta do botão", interaction: "Tab no teclado", tokens: "--dss-shadow-focus", a11y: "WCAG 2.4.7" },
              { state: "Active (selected)", visual: "Botão da página atual em destaque", interaction: "aria-current=page", tokens: "--dss-action-primary, --dss-text-on-primary", a11y: "aria-current=page" },
              { state: "Disabled", visual: "Toda paginação opaca, cursor not-allowed", interaction: "Não interativo", tokens: "--dss-opacity-disabled", a11y: "aria-disabled" },
              { state: "Readonly", visual: "Visual idêntico ao default", interaction: "Bloqueia onclick", tokens: "—", a11y: "aria-readonly" },
            ].map((row, i) => (
              <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.state}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.visual}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.interaction}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.tokens}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{row.a11y}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ANATOMIA */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssPagination" layers={anatomyData} />

      {/* PROPS API */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Eventos">
        <div className="space-y-6 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Categoria</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Type</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Default</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propsData.map((p, idx) => (
                <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-muted)" }}>{p.category}</TableCell>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{p.prop}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{p.type}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{p.default}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Eventos</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Evento</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Payload</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventsData.map((e, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{e.event}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{e.payload}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{e.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* SLOTS */}
      <CollapsibleSection icon={Code} title="Slots">
        <div className="pt-4 space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
          <p>
            <strong>Nenhum slot disponível.</strong> QPagination é utilizado como motor e não expõe API de slot para botões individuais
            (ver EXC-01 em <code className="font-mono" style={{ color: "var(--dss-jtech-accent)" }}>dss.meta.json</code>).
          </p>
          <p style={{ color: "var(--jtech-text-muted)" }}>
            Para casos que exigem botões customizados (ícones próprios, tooltips por página), use uma composição com{" "}
            <code className="font-mono" style={{ color: "var(--dss-jtech-accent)" }}>DssBtnGroup</code> + <code className="font-mono" style={{ color: "var(--dss-jtech-accent)" }}>DssButton</code>.
          </p>
        </div>
      </CollapsibleSection>

      {/* TOKENS */}
      <CollapsibleSection icon={Code} title="Tokens">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            Este componente aceita os seguintes tipos de tokens DSS:
          </p>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tipo de Token</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Papel no Componente</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Referência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { type: "Cores Semânticas", role: "Cor do botão ativo, texto e ícones de navegação", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Identidade multi-marca via --q-color-primary", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Compact Control Heights", role: "Altura mínima dos botões por size (xs/sm/md/lg)", ref: "DSS_TOKEN_REFERENCE.md (7.13)" },
                { type: "Tipografia", role: "Font-size e peso dos números de página", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius padrão e full (round); espessura no outline", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Espaçamento", role: "Gap entre botões (--dss-gap-1)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transições de hover, focus e active", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Feedback", role: "Opacidade no estado disabled", ref: "DSS_TOKEN_REFERENCE.md" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.type}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.role}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.ref}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* ACESSIBILIDADE */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "Container raiz com role=navigation e aria-label configurável",
                "aria-current=\"page\" no botão da página ativa (gerenciado pelo QPagination)",
                "Botões de navegação com aria-label descritivo (Anterior, Próxima, Primeira, Última)",
                "Focus ring visível via --dss-shadow-focus em :focus-visible",
                "Navegação por teclado (Tab entre botões, Enter/Space para ativar)",
                "Estado disabled aplica pointer-events: none + aria-disabled",
                "Touch target ≥ 44px nas sizes md/lg; xs/sm reservados para densidade compacta",
                "Suporte a forced-colors / high contrast",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>📋 Critérios WCAG Atendidos</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Critério</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Nível</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { criterion: "1.3.1 Informações e Relações", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "2.1.1 Teclado", level: "A" },
                  { criterion: "2.4.4 Finalidade do Link (em Contexto)", level: "A" },
                  { criterion: "2.4.7 Foco Visível", level: "AA" },
                  { criterion: "2.5.5 Tamanho do Alvo", level: "AAA" },
                  { criterion: "4.1.2 Nome, Função, Valor", level: "A" },
                ].map((item, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{item.criterion}</TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: item.level === "AA" || item.level === "AAA" ? "rgba(77, 210, 40, 0.2)" : "rgba(31, 134, 222, 0.2)",
                          color: item.level === "AA" || item.level === "AAA" ? "var(--dss-positive)" : "var(--dss-action-primary)",
                        }}
                      >
                        {item.level}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* ANTI-PATTERNS */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Reimplementar paginação com botões soltos",
              wrong: '<DssButton v-for="p in 12" :key="p">{{ p }}</DssButton>',
              correct: '<DssPagination v-model="page" :max="12" />',
              reason: "Reimplementação manual perde elipses, ARIA navigation, brandabilidade e gestão de janela de páginas.",
            },
            {
              title: "Esconder direction-links sem alternativa",
              wrong: '<DssPagination :direction-links="false" :max="50" />',
              correct: '<DssPagination :max="50" boundary-links />',
              reason: "Em volumes altos é necessário oferecer ao menos prev/next ou first/last para navegação eficiente.",
            },
            {
              title: "Omitir aria-label em contexto repetido",
              wrong: '<!-- duas paginações na mesma página, ambas com label padrão -->',
              correct: '<DssPagination aria-label="Paginação de pedidos" /> <DssPagination aria-label="Paginação de notas" />',
              reason: "Quando há mais de uma navegação na página, cada uma precisa de um aria-label único (WCAG 2.4.6).",
            },
            {
              title: "Combinar variantes mutuamente exclusivas",
              wrong: '<DssPagination flat outline round />',
              correct: '<DssPagination outline round />  <!-- escolha uma estilização ativa, round é apenas forma -->',
              reason: "flat e outline são exclusivos para o estilo do botão ativo; usar ambos gera resultado indefinido.",
            },
          ].map((pattern, idx) => (
            <div key={idx} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}>
              <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>{pattern.title}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-negative)" }}>❌ Incorreto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>{pattern.wrong}</pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>{pattern.correct}</pre>
                </div>
              </div>
              <p className="mt-2 text-sm" style={{ color: "var(--jtech-text-muted)" }}>
                <strong>Por quê:</strong> {pattern.reason}
              </p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* VINCULANTES */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.4">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssPagination</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Token First", application: "Sem valores hardcoded — alturas, gaps e bordas via var(--dss-*)" },
                { rule: "Cores Quasar-style", application: "Brand sobrescreve --q-color-primary; sem cores no SCSS por componente" },
                { rule: "Pseudo-elementos", application: "::before reservado para touch target dos botões (≥48px em md/lg)" },
                { rule: "Tokens de altura genéricos", application: "Usa --dss-compact-control-height-{xs,sm,md,lg}" },
                { rule: "Brightness reuse", application: "Não utiliza brightness() — hover/active via opacidade tokenizada" },
                { rule: "EXC-01 (Motor QPagination)", application: "QPagination usado como motor; não expõe slots para botões internos" },
                { rule: "EXC-Gate-01 (Seletores internos)", application: ".q-pagination .q-btn é sobrescrito com tokens DSS na L3" },
                { rule: "Classificação", application: "Navigation Component (navegação entre páginas)" },
                { rule: "Entry Point Wrapper", application: "DssPagination.vue é re-export puro de 1-structure/DssPagination.ts.vue" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.rule}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.application}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* REFERÊNCIAS */}
      <CollapsibleSection icon={BookOpen} title="Referências" titleAccent="Normativas">
        <div className="pt-4">
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md",
              "DSSPAGINATION_API.md (API Reference)",
              "PLAYGROUND_STANDARD.md (v3.2)",
              "COMPONENT_PAGE_STRUCTURE.md (v2.3)",
              "Quasar QPagination — https://quasar.dev/vue-components/pagination",
            ].map((ref, i) => (
              <li key={i} className="flex items-center gap-2">
                <FileText className="h-4 w-4 flex-shrink-0" style={{ color: "var(--dss-jtech-accent)" }} />
                <code className="text-sm font-mono" style={{ color: "var(--dss-jtech-accent)" }}>{ref}</code>
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleSection>
    </div>
  );
}
