// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  Shield,
  MessageSquare,
  X as XIcon,
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

const positions = [
  { name: "standard", label: "Standard", desc: "Centralizado (padrão)" },
  { name: "top", label: "Top", desc: "Ancorado ao topo" },
  { name: "bottom", label: "Bottom", desc: "Bottom sheet style" },
  { name: "left", label: "Left", desc: "Painel lateral esquerdo" },
  { name: "right", label: "Right", desc: "Painel lateral direito" },
];

const sizes = [
  { name: "sm", label: "SM" },
  { name: "md", label: "MD" },
  { name: "lg", label: "LG" },
  { name: "xl", label: "XL" },
];

const propsData = [
  { category: "Modelo", prop: "open", type: "Boolean", default: "false", description: "Controla a visibilidade (v-model:open)." },
  { category: "Comportamento", prop: "persistent", type: "Boolean", default: "false", description: "Impede fechamento por clique no backdrop ou ESC." },
  { category: "Comportamento", prop: "seamless", type: "Boolean", default: "false", description: "Remove backdrop e permite interação com o conteúdo abaixo." },
  { category: "Layout", prop: "maximized", type: "Boolean", default: "false", description: "Exibe em tela cheia (100vw × 100vh)." },
  { category: "Layout", prop: "fullWidth", type: "Boolean", default: "false", description: "Ocupa 100% da largura disponível." },
  { category: "Layout", prop: "fullHeight", type: "Boolean", default: "false", description: "Ocupa 100% da altura disponível." },
  { category: "Layout", prop: "position", type: "'standard' | 'top' | 'bottom' | 'left' | 'right'", default: "'standard'", description: "Define a posição do diálogo na tela." },
  { category: "Animação", prop: "transitionEnter", type: "String", default: "'scale'", description: "Nome da transição de entrada (fade, slide-up, scale...)." },
  { category: "Animação", prop: "transitionLeave", type: "String", default: "'scale'", description: "Nome da transição de saída." },
  { category: "Acessibilidade", prop: "disableEsc", type: "Boolean", default: "false", description: "Desabilita fechamento via tecla ESC." },
  { category: "Acessibilidade", prop: "disableBackdropClick", type: "Boolean", default: "false", description: "Desabilita fechamento via clique no backdrop." },
];

const eventsData = [
  { event: "update:open", payload: "boolean", desc: "Emitido para atualizar o v-model:open." },
  { event: "open", payload: "—", desc: "Emitido quando o diálogo termina de abrir." },
  { event: "close", payload: "—", desc: "Emitido quando o diálogo termina de fechar." },
  { event: "before-open", payload: "—", desc: "Emitido antes do diálogo abrir (transição inicia)." },
  { event: "before-close", payload: "—", desc: "Emitido antes do diálogo fechar (transição inicia)." },
];

const slotsData = [
  { slot: "header", desc: "Cabeçalho do diálogo (título, botão fechar). Renderizado apenas se preenchido." },
  { slot: "default", desc: "Conteúdo principal do diálogo (body)." },
  { slot: "footer", desc: "Rodapé do diálogo (botões de ação). Renderizado apenas se preenchido." },
];

const anatomyData = {
  structure: {
    files: ["DssDialog.ts.vue"],
    description: "Wrapper governado sobre QDialog do Quasar. Define teleport para body, mapeia v-model:open ↔ QDialog model-value, repassa props tipadas e expõe slots header/default/footer.",
    responsibilities: [
      "Template Vue + TypeScript",
      "Mapeamento de v-model:open ↔ QDialog",
      "Slots estruturais (header, body, footer)",
      "Repasse explícito de $attrs (inheritAttrs: false)",
    ],
    tokens: [],
    codeExample: `<template>
  <q-dialog
    :model-value="props.open"
    :persistent="props.persistent"
    :maximized="props.maximized"
    :position="props.position ?? 'standard'"
    @update:model-value="emit('update:open', $event)"
  >
    <div :class="dialogClasses">
      <div v-if="hasHeader" class="dss-dialog__header">
        <slot name="header" />
      </div>
      <div class="dss-dialog__body"><slot /></div>
      <div v-if="hasFooter" class="dss-dialog__footer">
        <slot name="footer" />
      </div>
    </div>
  </q-dialog>
</template>`,
  },
  composition: {
    files: ["_base.scss"],
    description: "Layout base do container: superfície, raio, sombra, padding interno do header/body/footer. Carregado globalmente via components/index.scss (conteúdo teleportado).",
    responsibilities: [
      "Surface, radius e elevation",
      "Padding e bordas das slots header/footer",
      "Largura mínima e máxima responsivas",
    ],
    tokens: [
      "--dss-surface-default",
      "--dss-radius-lg",
      "--dss-elevation-3",
      "--dss-padding-md",
      "--dss-padding-lg",
      "--dss-border-color-subtle",
    ],
    codeExample: `.dss-dialog {
  background-color: var(--dss-surface-default);
  border-radius: var(--dss-radius-lg);
  box-shadow: var(--dss-elevation-3);
  min-width: 320px;
  max-width: 560px;

  &__header,
  &__footer {
    padding: var(--dss-padding-md) var(--dss-padding-lg);
    border-color: var(--dss-border-color-subtle);
  }
}`,
  },
  variants: {
    files: ["_variant.scss"],
    description: "Variações de layout: maximized, full-width, full-height, seamless e variantes por position (standard, top, bottom, left, right) que ajustam border-radius nos cantos colados às bordas da tela.",
    responsibilities: [
      "Maximized → 100vw × 100vh sem radius",
      "Full-width / full-height",
      "Seamless (elevation reforçada, sem backdrop)",
      "Position → ajuste de radius por borda",
    ],
    tokens: ["--dss-radius-lg", "--dss-elevation-3"],
    codeExample: `.dss-dialog--maximized {
  border-radius: 0;
  min-width: 100vw !important;
  max-width: 100vw !important;
  min-height: 100vh !important;
  max-height: 100vh !important;
}

.dss-dialog--position-bottom {
  border-radius: var(--dss-radius-lg) var(--dss-radius-lg) 0 0;
}`,
  },
  output: {
    files: ["_states.scss", "_brands.scss"],
    description: "Camada final: dark mode via [data-theme=\"dark\"], high contrast via prefers-contrast: more, forced-colors (Windows HCM) com SystemColor keywords, reduced-motion e print.",
    responsibilities: [
      "Dark mode (surface e bordas)",
      "Forced colors (Canvas/CanvasText/ButtonText)",
      "Reduced motion (will-change: auto)",
      "Print (sem sombra, posição estática)",
      "Brandabilidade Hub/Water/Waste no header (acento)",
    ],
    tokens: [
      "--dss-surface-default",
      "--dss-text-body",
      "--dss-border-width-md",
      "--dss-hub-primary",
      "--dss-water-primary",
      "--dss-waste-primary",
    ],
    codeExample: `[data-theme="dark"] .dss-dialog {
  background-color: var(--dss-surface-default) !important;
}

@media (forced-colors: active) {
  .dss-dialog {
    background-color: Canvas !important;
    color: CanvasText;
    border: var(--dss-border-width-thin) solid ButtonText;
  }
}`,
  },
};

// ============================================================================
// PREVIEW
// ============================================================================

interface DssDialogPreviewProps {
  position: string;
  size: string;
  color: string;
  brand?: string | null;
  isDarkMode?: boolean;
  persistent?: boolean;
  seamless?: boolean;
  maximized?: boolean;
  withHeader?: boolean;
  withFooter?: boolean;
}

function DssDialogPreview({
  position,
  size,
  color,
  brand = null,
  isDarkMode = false,
  persistent = false,
  seamless = false,
  maximized = false,
  withHeader = true,
  withFooter = true,
}: DssDialogPreviewProps) {
  const [open, setOpen] = useState(true);

  const sizeMap: Record<string, { w: number }> = {
    sm: { w: 320 },
    md: { w: 480 },
    lg: { w: 640 },
    xl: { w: 800 },
  };
  const dim = sizeMap[size] || sizeMap.md;

  const getAccent = () => {
    if (brand && DSS_BRAND_COLORS[brand]) return DSS_BRAND_COLORS[brand].principal;
    const c = DSS_SEMANTIC_COLORS[color];
    return c?.bg || "#1f86de";
  };
  const accent = getAccent();

  const surface = isDarkMode ? "#1a1a1a" : "#ffffff";
  const fg = isDarkMode ? "#e5e5e5" : "#454545";
  const heading = isDarkMode ? "#ffffff" : "#1a1a1a";
  const muted = isDarkMode ? "#707070" : "#a3a3a3";
  const borderSubtle = isDarkMode ? "#404040" : "#e5e5e5";
  const stageBg = isDarkMode ? "#0a0a0a" : "#f4f4f5";

  // posição dentro do palco
  const justify =
    position === "left"
      ? "flex-start"
      : position === "right"
      ? "flex-end"
      : "center";
  const align =
    position === "top"
      ? "flex-start"
      : position === "bottom"
      ? "flex-end"
      : "center";

  const isSidePanel = position === "left" || position === "right";
  const radius = maximized
    ? 0
    : position === "top"
    ? "0 0 12px 12px"
    : position === "bottom"
    ? "12px 12px 0 0"
    : position === "left"
    ? "0 12px 12px 0"
    : position === "right"
    ? "12px 0 0 12px"
    : "12px";

  const dialogStyle: React.CSSProperties = {
    backgroundColor: surface,
    color: fg,
    borderRadius: typeof radius === "number" ? `${radius}px` : radius,
    boxShadow: seamless
      ? "0 16px 48px rgba(0,0,0,0.35)"
      : "0 12px 32px rgba(0,0,0,0.25)",
    width: maximized ? "100%" : isSidePanel ? `${Math.min(dim.w, 360)}px` : `${dim.w}px`,
    maxWidth: maximized ? "100%" : "92%",
    height: maximized ? "100%" : isSidePanel ? "100%" : "auto",
    maxHeight: maximized ? "100%" : "92%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div
        className="relative w-full rounded-md overflow-hidden border"
        style={{
          backgroundColor: stageBg,
          borderColor: borderSubtle,
          height: 360,
          display: "flex",
          alignItems: align as any,
          justifyContent: justify as any,
          padding: position === "standard" ? 16 : 0,
        }}
        aria-label="Palco de visualização do diálogo"
      >
        {/* Backdrop */}
        {open && !seamless && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={() => !persistent && setOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Conteúdo simulado por trás (visível em seamless) */}
        {seamless && (
          <div
            className="absolute inset-0 flex items-center justify-center text-xs"
            style={{ color: muted }}
          >
            Conteúdo da página (interativo em modo seamless)
          </div>
        )}

        {/* Dialog */}
        {open && (
          <div
            role="dialog"
            aria-modal={!seamless}
            aria-labelledby={withHeader ? "dss-dialog-title" : undefined}
            style={{ ...dialogStyle, position: "relative", zIndex: 1 }}
          >
            {withHeader && (
              <div
                className="flex items-center justify-between"
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${borderSubtle}`,
                }}
              >
                <h3
                  id="dss-dialog-title"
                  className="font-semibold"
                  style={{
                    color: heading,
                    fontSize: 15,
                    margin: 0,
                    borderLeft: `3px solid ${accent}`,
                    paddingLeft: 10,
                  }}
                >
                  Confirmar ação
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar diálogo"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: muted,
                    padding: 4,
                    borderRadius: 4,
                    display: "inline-flex",
                  }}
                >
                  <XIcon size={16} />
                </button>
              </div>
            )}

            <div
              style={{
                padding: 16,
                fontSize: 13,
                lineHeight: 1.5,
                flex: 1,
                overflow: "auto",
              }}
            >
              <p style={{ margin: 0, color: fg }}>
                Esta ação não pode ser desfeita. Deseja prosseguir com a
                operação selecionada? Confirme abaixo para continuar.
              </p>
            </div>

            {withFooter && (
              <div
                className="flex items-center justify-end gap-2"
                style={{
                  padding: "10px 16px",
                  borderTop: `1px solid ${borderSubtle}`,
                  backgroundColor: isDarkMode ? "#141414" : "#fafafa",
                }}
              >
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: fg,
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "6px 12px",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    backgroundColor: accent,
                    color: "#ffffff",
                    border: "none",
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "6px 14px",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Confirmar
                </button>
              </div>
            )}
          </div>
        )}

        {!open && (
          <div className="relative z-10">
            <button
              onClick={() => setOpen(true)}
              style={{
                backgroundColor: accent,
                color: "#ffffff",
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Abrir Diálogo
            </button>
          </div>
        )}
      </div>

      <div className="text-xs" style={{ color: muted }}>
        Estado:{" "}
        <strong style={{ color: fg }}>
          {open ? "aberto" : "fechado"}
        </strong>{" "}
        · posição <strong style={{ color: fg }}>{position}</strong>
        {persistent && " · persistent"}
        {seamless && " · seamless"}
        {maximized && " · maximized"}
      </div>
    </div>
  );
}

// ============================================================================
// PÁGINA
// ============================================================================

export default function DssDialogPage() {
  const [selectedPosition, setSelectedPosition] = useState("standard");
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [booleanStates, setBooleanStates] = useState({
    persistent: false,
    seamless: false,
    maximized: false,
    withHeader: true,
    withFooter: true,
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
    const props: string[] = ['v-model:open="isOpen"'];
    if (selectedPosition !== "standard") props.push(`position="${selectedPosition}"`);
    if (booleanStates.persistent) props.push("persistent");
    if (booleanStates.seamless) props.push("seamless");
    if (booleanStates.maximized) props.push("maximized");
    if (selectedBrand) props.push(`brand="${selectedBrand}"`);

    const header = booleanStates.withHeader
      ? `\n  <template #header>\n    <h3>Confirmar ação</h3>\n    <DssButton icon="close" flat round dense @click="isOpen = false" />\n  </template>\n`
      : "";
    const footer = booleanStates.withFooter
      ? `\n  <template #footer>\n    <DssButton label="Cancelar" flat @click="isOpen = false" />\n    <DssButton label="Confirmar" color="${selectedBrand ?? effectiveColor}" @click="handleConfirm" />\n  </template>`
      : "";

    return `<DssDialog\n  ${props.join("\n  ")}\n>${header}\n  <p>Esta ação não pode ser desfeita.</p>${footer}\n</DssDialog>`;
  };

  const behaviorOptions = [
    { name: "persistent", label: "Persistent" },
    { name: "seamless", label: "Seamless" },
    { name: "maximized", label: "Maximized" },
  ];
  const slotOptions = [
    { name: "withHeader", label: "Header" },
    { name: "withFooter", label: "Footer" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* HEADER */}
      <PageHeader
        icon={MessageSquare}
        badge="Componente Composto"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssDialog"
        subtitle="DssDialog é o componente DSS para janelas modais e overlays. Wrapper governado sobre o QDialog do Quasar, oferece slots estruturais (header/body/footer), múltiplas posições, modos persistent e seamless, e total compatibilidade com brandabilidade, dark mode, forced-colors e WCAG 2.1 AA."
        subtitleHighlights={["modal acessível", "5 posições", "brandabilidade multi-marca", "WCAG 2.1 AA"]}
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
              "Confirmar ações destrutivas ou irreversíveis",
              "Capturar entrada do usuário em formulários focalizados",
              "Apresentar conteúdo crítico que exige atenção imediata",
              "Mostrar detalhes adicionais sem mudar de página",
              "Fluxos passo-a-passo curtos (até 3 etapas)",
              "Bottom sheets em layouts mobile (position=\"bottom\")",
              "Painéis laterais de filtros ou configurações (position=\"left|right\")",
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
                { scenario: "Notificações temporárias e não-bloqueantes", alt: "DssToast / DssNotify" },
                { scenario: "Dicas contextuais sobre um elemento", alt: "DssTooltip" },
                { scenario: "Menus de ações curtas a partir de gatilho", alt: "DssBtnDropdown / DssMenu" },
                { scenario: "Navegação principal lateral persistente", alt: "DssDrawer" },
                { scenario: "Formulários longos com múltiplas seções", alt: "Página dedicada" },
                { scenario: "Conteúdo informativo sem urgência", alt: "DssCard / DssBanner" },
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
        title="Configure o Dialog"
        description="Teste posições, tamanhos, brand, persistent, seamless, maximized e composição de slots. Clique no botão para reabrir o diálogo após fechá-lo."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="420px"
        previewContent={
          <DssDialogPreview
            position={selectedPosition}
            size={selectedSize}
            color={effectiveColor}
            brand={selectedBrand}
            isDarkMode={isDarkMode}
            persistent={booleanStates.persistent}
            seamless={booleanStates.seamless}
            maximized={booleanStates.maximized}
            withHeader={booleanStates.withHeader}
            withFooter={booleanStates.withFooter}
          />
        }
        controls={
          <ControlGrid columns={5}>
            <VariantSelector label="Position" variants={positions} selectedVariant={selectedPosition} onSelect={setSelectedPosition} />
            <VariantSelector label="Size" variants={sizes} selectedVariant={selectedSize} onSelect={setSelectedSize} />
            <ColorPicker label="Color" colors={Object.values(DSS_SEMANTIC_COLORS)} selectedColor={selectedColor} onSelect={handleColorChange} />
            <BrandPicker brands={DSS_BRAND_COLORS} selectedBrand={selectedBrand} onSelect={handleBrandChange} />
            <ToggleGroup label="Behavior" options={behaviorOptions} values={booleanStates} onToggle={toggle} />
            <ToggleGroup label="Slots" options={slotOptions} values={booleanStates} onToggle={toggle} />
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
              { state: "Closed", visual: "Diálogo não renderizado no DOM", interaction: "Aguarda gatilho (open=true)", tokens: "—", a11y: "—" },
              { state: "Opening", visual: "Transição de entrada (scale/fade/slide)", interaction: "before-open emitido", tokens: "--dss-duration-md, --dss-easing-out", a11y: "aria-modal=true definido" },
              { state: "Open", visual: "Surface elevada, backdrop visível", interaction: "Foco gerenciado pelo QDialog", tokens: "--dss-surface-default, --dss-elevation-3, --dss-radius-lg", a11y: "role=dialog, focus trap" },
              { state: "Persistent", visual: "Idêntico a Open", interaction: "Bloqueia ESC e clique no backdrop", tokens: "—", a11y: "Foco permanece no diálogo" },
              { state: "Seamless", visual: "Sem backdrop; conteúdo abaixo interativo", interaction: "Permite cliques no fundo", tokens: "--dss-elevation-3 reforçada", a11y: "aria-modal=false" },
              { state: "Maximized", visual: "Tela cheia (100vw × 100vh), radius=0", interaction: "Idêntico a Open", tokens: "border-radius: 0", a11y: "Foco trapped na viewport inteira" },
              { state: "Closing", visual: "Transição de saída", interaction: "before-close emitido", tokens: "--dss-duration-md, --dss-easing-in", a11y: "Foco devolvido ao trigger" },
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
      <AnatomySection componentName="DssDialog" layers={anatomyData} />

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
      <CollapsibleSection icon={Code} title="Slots" titleAccent="Estruturais">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Slot</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slotsData.map((s, idx) => (
                <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>#{s.slot}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{s.desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-4 text-xs" style={{ color: "var(--jtech-text-muted)" }}>
            A composição (títulos, botões, ícones) é responsabilidade do consumidor — o DssDialog
            apenas garante a estrutura, as bordas e o espaçamento entre header/body/footer.
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
                { type: "Surfaces", role: "Background do diálogo (--dss-surface-default)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Elevation / Shadows", role: "Sombra do container (--dss-elevation-3)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius do container e divisores de header/footer", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Espaçamento", role: "Padding interno de header/body/footer (--dss-padding-md/lg)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Tipografia", role: "Tamanho e peso do título (governado pelo consumidor)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Duração e easing das transições (entry/leave)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Acento opcional no header via --q-color-primary", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Z-index", role: "Camada de overlay (gerenciada pelo QDialog)", ref: "DSS_TOKEN_REFERENCE.md" },
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
                "role=\"dialog\" e aria-modal aplicados pelo QDialog",
                "Focus trap automático enquanto o diálogo está aberto",
                "Foco devolvido ao elemento gatilho ao fechar",
                "Fechamento via tecla ESC (configurável via disableEsc)",
                "Fechamento via clique no backdrop (configurável via disableBackdropClick)",
                "Modo persistent para fluxos críticos (impede fechamento acidental)",
                "Suporte a forced-colors / Windows High Contrast Mode (SystemColor keywords)",
                "prefers-contrast: more reforça outline e bordas internas",
                "prefers-reduced-motion neutraliza transições (will-change: auto)",
                "Slots header/footer permitem aria-labelledby e ações com touch target ≥ 48px",
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
                  { criterion: "1.4.11 Contraste Não-textual", level: "AA" },
                  { criterion: "2.1.1 Teclado", level: "A" },
                  { criterion: "2.1.2 Sem Bloqueio do Teclado", level: "A" },
                  { criterion: "2.4.3 Ordem do Foco", level: "A" },
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
              title: "Reimplementar modal com div + position: fixed",
              wrong: '<div v-if="open" class="modal-overlay"> ... </div>',
              correct: '<DssDialog v-model:open="open"> ... </DssDialog>',
              reason: "Implementação manual perde focus trap, ESC, ARIA, teleport, z-index governado e suporte a forced-colors.",
            },
            {
              title: "Usar persistent em diálogos não-críticos",
              wrong: '<DssDialog v-model:open="open" persistent>Filtros opcionais</DssDialog>',
              correct: '<DssDialog v-model:open="open">Filtros opcionais</DssDialog>',
              reason: "persistent deve ser reservado a ações destrutivas ou fluxos com perda de dados — frustra o usuário em contextos triviais.",
            },
            {
              title: "Combinar seamless com persistent",
              wrong: '<DssDialog seamless persistent>...</DssDialog>',
              correct: '<DssDialog seamless>...</DssDialog>',
              reason: "Seamless remove backdrop e permite interação com a página; persistent faz sentido apenas quando há bloqueio modal real.",
            },
            {
              title: "Colocar formulário longo dentro de um Dialog md",
              wrong: '<DssDialog v-model:open="open">  <!-- form com 20 campos --></DssDialog>',
              correct: '<DssDialog v-model:open="open" maximized>...</DssDialog>  <!-- ou navegar para uma página dedicada -->',
              reason: "Diálogos pequenos com scroll interno extenso prejudicam a usabilidade; prefira maximized ou uma rota dedicada.",
            },
            {
              title: "Omitir botão de fechar visível",
              wrong: '<DssDialog v-model:open="open"> conteúdo </DssDialog>',
              correct: '<DssDialog v-model:open="open"> <template #header><h3>Título</h3><DssButton icon="close" @click="open = false" /></template> ... </DssDialog>',
              reason: "Mesmo com ESC e clique no backdrop disponíveis, um botão de fechar explícito é exigido pela diretriz de descoberta visual.",
            },
          ].map((pattern, idx) => (
            <div key={idx} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}>
              <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>{pattern.title}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-negative)" }}>❌ Incorreto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono whitespace-pre-wrap" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>{pattern.wrong}</pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono whitespace-pre-wrap" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>{pattern.correct}</pre>
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssDialog</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Token First", application: "Surface, radius, elevation, padding e bordas via var(--dss-*) — zero hardcode" },
                { rule: "Cores Quasar-style", application: "Acento de header via brand tokens; sem cores no SCSS por componente" },
                { rule: "Pseudo-elementos", application: "::before reservado para touch targets dos botões consumidos no header/footer" },
                { rule: "Tokens de altura genéricos", application: "Não aplicável — diálogo é container; controles internos usam --dss-compact-control-height-*" },
                { rule: "Brightness reuse", application: "Não utiliza brightness() — estados visuais via tokens semânticos" },
                { rule: "Teleport para body", application: "Estilos carregados globalmente via components/index.scss; <style scoped> proibido" },
                { rule: "Props bloqueadas", application: "dark (governado por [data-theme]) e square (viola --dss-radius-lg) NÃO são repassadas" },
                { rule: "Classificação", application: "Overlay/Dialog (Fase 2 — Nível 1)" },
                { rule: "Entry Point Wrapper", application: "DssDialog.vue é re-export puro de 1-structure/DssDialog.ts.vue" },
                { rule: "Golden Reference", application: "DssChip (interativo) + Golden Context: DssCard (estrutura header/body/footer)" },
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
              "DSSDIALOG_API.md (API Reference)",
              "PLAYGROUND_STANDARD.md (v3.2)",
              "COMPONENT_PAGE_STRUCTURE.md (v2.3)",
              "Quasar QDialog — https://quasar.dev/vue-components/dialog",
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
