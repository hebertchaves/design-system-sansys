// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  Wrench,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  Shield,
  Menu,
  Search,
  Bell,
  User,
  MoreVertical,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

import {
  DssPlayground,
  ControlGrid,
  ControlSection,
  VariantSelector,
  ColorPicker,
  FeedbackColorPicker,
  BrandPicker,
  SizeSelector,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_FEEDBACK_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";
import { PlaygroundButton } from "@/components/ui/PlaygroundButton";

// ============================================================================
// DADOS — Derivados de DssToolbar.ts.vue + toolbar.types.ts + pre_prompt
// ============================================================================

// "Variant" no DssToolbar = densidade visual (mutuamente exclusivas no playground)
const variants = [
  { name: "default", label: "Default", desc: "Altura padrão (--dss-spacing-14 = 56px)" },
  { name: "dense", label: "Dense", desc: "Compacto via $attrs (.q-toolbar--dense, ~40px)" },
];

// Templates de composição (conteúdo interno do toolbar)
const compositionTemplates = [
  { name: "title", label: "Título + Ação", desc: "Menu + título + botão de ação" },
  { name: "withSearch", label: "Com Busca", desc: "Título + input de busca + ações" },
  { name: "actions", label: "Ações Globais", desc: "Menu + título + notif + perfil + overflow" },
  { name: "minimal", label: "Mínimo", desc: "Apenas texto e um botão" },
];

// Props API — DssToolbar (fonte: toolbar.types.ts)
const propsData = [
  { category: "Layout", prop: "inset", type: "Boolean", default: "false", description: "Padding-inline-start ampliado (--dss-spacing-6 = 24px) para alinhar com drawer/menu lateral" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "undefined", description: "Aplica cor de fundo da brand e propaga [data-brand] aos filhos. Texto muda para --dss-text-inverse" },
];

// Props bloqueadas — governança DSS (fonte: pre_prompt seção 3.2)
const blockedPropsData = [
  { prop: "dark", reason: "Modo escuro governado globalmente via [data-theme=\"dark\"], não por prop individual" },
  { prop: "glossy", reason: "Efeito visual não utilizado no DSS — ausência de glossy é padrão" },
  { prop: "color", reason: "Cor de fundo governada por tokens DSS + prop brand" },
  { prop: "text-color", reason: "Cor de texto governada por tokens (--dss-text-body / --dss-text-inverse conforme brand)" },
];

// Pass-through ($attrs)
const passThroughData = [
  { prop: "dense", type: "Boolean", description: "Aplica .q-toolbar--dense nativamente (altura ~40px)" },
  { prop: "aria-label", type: "String", description: "Rótulo acessível recomendado para a toolbar" },
];

// Anatomia 4 Camadas — derivada da estrutura real
const anatomyData = {
  structure: {
    files: ["1-structure/DssToolbar.ts.vue"],
    description: "Wrapper canônico sobre <q-toolbar>. Container horizontal estrutural 100% não-interativo. Bloqueia color/text-color/dark/glossy e propaga [data-brand] para herança nos filhos.",
    responsibilities: [
      "Encapsula <q-toolbar> com inheritAttrs: false",
      "Bloqueia props color, text-color, dark, glossy",
      "Repassa $attrs ao QToolbar (incluindo dense)",
      "Aplica [data-brand] no elemento raiz quando brand está definido",
      "Slot default — composição livre (DssButton, DssIcon, texto)",
    ],
    tokens: [],
    codeExample: `<template>
  <q-toolbar
    :class="toolbarClasses"
    v-bind="{ ...$attrs, ...brandAttr }"
  >
    <slot />
  </q-toolbar>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Estilos base — sobrescreve min-height (50px) e padding (0 12px) nativos do QToolbar via cascata CSS (EXC-01). Apenas tokens genéricos.",
    responsibilities: [
      "min-height: --dss-spacing-14 (56px)",
      "padding-inline: --dss-spacing-4 (16px)",
      "display: flex / row / align-items: center",
      "background: transparent (padrão sem brand)",
      "color: --dss-text-body",
      "Variante inset: padding-inline-start --dss-spacing-6 (24px)",
    ],
    tokens: ["--dss-spacing-14", "--dss-spacing-4", "--dss-spacing-6", "--dss-text-body"],
    codeExample: `.dss-toolbar {
  min-height: var(--dss-spacing-14);
  padding-inline: var(--dss-spacing-4);
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  color: var(--dss-text-body);

  &.dss-toolbar--inset {
    padding-inline-start: var(--dss-spacing-6);
  }
}`,
  },
  variants: {
    files: ["3-variants/_dense.scss"],
    description: "Variante de densidade. Aplicada via $attrs (Quasar nativo) com override de padding usando seletor composto .dss-toolbar.q-toolbar--dense (EXC-01).",
    responsibilities: [
      "Dense via .q-toolbar--dense (Quasar nativo)",
      "Override de padding: --dss-spacing-3 (12px)",
      "Min-height: --dss-spacing-10 (40px)",
    ],
    tokens: ["--dss-spacing-10", "--dss-spacing-3"],
    codeExample: `.dss-toolbar.q-toolbar--dense {
  min-height: var(--dss-spacing-10);
  padding-inline: var(--dss-spacing-3);
}`,
  },
  output: {
    files: ["4-output/_brands.scss", "4-output/_states.scss", "4-output/index.scss"],
    description: "Brands (Hub/Water/Waste) com fundo colorido + texto invertido. Suporta padrão dual: herança via [data-brand] no pai E modificador direto .dss-toolbar--brand-*. Estados aplicáveis: default e branded.",
    responsibilities: [
      "Hub: --dss-hub-600 + --dss-text-inverse (contraste ~2.8:1 para texto bold)",
      "Water: --dss-water-600 + --dss-text-inverse (~7.0:1, AAA)",
      "Waste: --dss-waste-600 + --dss-text-inverse (~5.0:1, AA)",
      "Padrão dual: [data-brand] e .dss-toolbar--brand-*",
      "Sem hover/focus/active (Gate v2.4)",
    ],
    tokens: ["--dss-hub-600", "--dss-water-600", "--dss-waste-600", "--dss-text-inverse"],
    codeExample: `[data-brand='hub'] .dss-toolbar--brand-hub,
.dss-toolbar.dss-toolbar--brand-hub {
  background-color: var(--dss-hub-600);
  color: var(--dss-text-inverse);
}`,
  },
};

// ============================================================================
// PREVIEW DO TOOLBAR
// ============================================================================

interface DssToolbarPreviewProps {
  variant?: string;
  brand?: string | null;
  color?: string | null;
  feedback?: string | null;
  size?: string;
  inset?: boolean;
  disabled?: boolean;
  loading?: boolean;
  template?: string;
  isDarkMode?: boolean;
}

function DssToolbarPreview({
  variant = "default",
  brand = null,
  color = null,
  feedback = null,
  size = "md",
  inset = false,
  disabled = false,
  loading = false,
  template = "actions",
  isDarkMode = false,
}: DssToolbarPreviewProps) {
  const surfaceBg = isDarkMode ? "hsl(0 0% 14%)" : "hsl(0 0% 100%)";
  const textColor = isDarkMode ? "hsl(0 0% 88%)" : "hsl(0 0% 10%)";
  const subtleColor = isDarkMode ? "hsl(0 0% 60%)" : "hsl(0 0% 40%)";
  const dividerColor = isDarkMode ? "hsl(0 0% 22%)" : "hsl(0 0% 90%)";
  const pageBg = isDarkMode ? "hsl(0 0% 9%)" : "hsl(0 0% 96%)";

  // ===== COLOR APPLICATION DOMAIN v3.2 =====
  // Mutual exclusion: brand > feedback > color (resolução determinística no preview).
  // A UI já garante mutex no estado (handleBrandSelect / handleFeedbackSelect / handleColorSelect).
  let resolvedBg: string | null = null;
  if (brand && DSS_BRAND_COLORS[brand]) {
    resolvedBg = DSS_BRAND_COLORS[brand].principal;
  } else if (feedback && DSS_FEEDBACK_COLORS[feedback]) {
    resolvedBg = DSS_FEEDBACK_COLORS[feedback].bg;
  } else if (color && DSS_SEMANTIC_COLORS[color]) {
    resolvedBg = DSS_SEMANTIC_COLORS[color].bg;
  }

  const isDense = variant === "dense";
  const minHeight =
    isDense ? 40 :
    size === "sm" ? 48 :
    size === "lg" ? 64 : 56;

  const paddingInline = isDense ? 12 : 16;
  const paddingInlineStart = inset ? 24 : paddingInline;

  const bg = resolvedBg || "transparent";
  const fg = resolvedBg ? "#ffffff" : textColor;
  const subtle = resolvedBg ? "rgba(255,255,255,0.75)" : subtleColor;
  const iconHoverBg = resolvedBg
    ? "rgba(255,255,255,0.15)"
    : isDarkMode
    ? "rgba(255,255,255,0.08)"
    : "rgba(0,0,0,0.06)";

  const opacity = disabled ? 0.5 : 1;
  const pointerEvents: React.CSSProperties["pointerEvents"] = disabled ? "none" : "auto";

  const iconSize = isDense ? 16 : 18;
  const iconBtnSize = isDense ? 30 : 36;
  const titleSize = isDense ? 13 : 14;

  const IconBtn = ({ icon: Icon, label }: { icon: typeof Menu; label: string }) => (
    <button
      type="button"
      aria-label={label}
      className="rounded-full transition-colors flex items-center justify-center flex-shrink-0"
      style={{ width: iconBtnSize, height: iconBtnSize, backgroundColor: "transparent", color: "inherit" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = iconHoverBg)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      <Icon size={iconSize} />
    </button>
  );

  const renderTitle = () => (
    <>
      <IconBtn icon={Menu} label="Menu" />
      <span style={{ fontWeight: 600, fontSize: titleSize }}>Título da Página</span>
      <div style={{ flex: 1 }} />
      <IconBtn icon={MoreVertical} label="Mais opções" />
    </>
  );

  const renderWithSearch = () => (
    <>
      <span style={{ fontWeight: 600, fontSize: titleSize }}>Dashboard</span>
      <div style={{ flex: 1 }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 10px",
          height: isDense ? 28 : 32,
          width: 200,
          borderRadius: 6,
          backgroundColor: resolvedBg ? "rgba(255,255,255,0.15)" : (isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"),
          color: subtle,
          fontSize: 12,
          flexShrink: 0,
        }}
      >
        <Search size={14} />
        <span>Buscar...</span>
      </div>
      <IconBtn icon={Bell} label="Notificações" />
    </>
  );

  const renderActions = () => (
    <>
      <IconBtn icon={Menu} label="Menu" />
      <span style={{ fontWeight: 600, fontSize: titleSize }}>Sansys Application</span>
      <div style={{ flex: 1 }} />
      <IconBtn icon={Bell} label="Notificações" />
      <IconBtn icon={User} label="Perfil" />
      <IconBtn icon={MoreVertical} label="Mais" />
    </>
  );

  const renderMinimal = () => (
    <>
      <span style={{ fontWeight: 500, fontSize: titleSize }}>Toolbar mínimo</span>
      <div style={{ flex: 1 }} />
      <button
        type="button"
        className="rounded-md transition-colors flex-shrink-0"
        style={{
          padding: isDense ? "4px 10px" : "6px 12px",
          fontSize: 13,
          fontWeight: 500,
          backgroundColor: resolvedBg ? "rgba(255,255,255,0.18)" : (isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"),
          color: "inherit",
          border: "none",
        }}
      >
        Ação
      </button>
    </>
  );

  const templateMap: Record<string, () => React.ReactNode> = {
    title: renderTitle,
    withSearch: renderWithSearch,
    actions: renderActions,
    minimal: renderMinimal,
  };

  const activeColorLabel =
    brand ? `brand="${brand}"` :
    feedback ? `feedback (demo)="${feedback}"` :
    color ? `color (demo)="${color}"` : "neutro (transparent)";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 720,
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${dividerColor}`,
        backgroundColor: pageBg,
      }}
      role="region"
      aria-label="Preview de DssToolbar"
    >
      {/* Surface ao redor para contextualizar (toolbar dentro de header/card) */}
      <div style={{ backgroundColor: surfaceBg, color: textColor }}>
        <div
          role="toolbar"
          aria-label="Toolbar de demonstração"
          aria-disabled={disabled || undefined}
          aria-busy={loading || undefined}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: isDense ? 8 : 12,
            paddingInline,
            paddingInlineStart,
            minHeight,
            width: "100%",
            backgroundColor: bg,
            color: fg,
            opacity,
            pointerEvents,
            position: "relative",
            transition: "all 200ms ease",
          }}
          {...(brand ? { "data-brand": brand } : {})}
        >
          {(templateMap[template] || renderActions)()}
          {loading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: resolvedBg ? "rgba(0,0,0,0.18)" : (isDarkMode ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.55)"),
                backdropFilter: "blur(1px)",
              }}
            >
              <Loader2 size={18} className="animate-spin" style={{ color: fg }} />
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo simulado da página */}
      <div style={{ padding: 20, minHeight: 120, color: subtleColor, fontSize: 12 }}>
        <p style={{ marginBottom: 8, color: textColor, fontWeight: 600, fontSize: 13 }}>
          Conteúdo abaixo do toolbar
        </p>
        <p style={{ opacity: 0.85 }}>
          Toolbar: <code>{activeColorLabel}</code>
          {isDense && <> · <code>dense</code></>}
          {!isDense && size !== "md" && <> · <code>size={size}</code> (demo)</>}
          {inset && <> · <code>inset</code></>}
          {disabled && <> · <code>disabled (demo)</code></>}
          {loading && <> · <code>loading (demo)</code></>}
        </p>
        <p style={{ marginTop: 8, opacity: 0.6, fontSize: 11 }}>
          ⚠️ Color, Feedback, Size, Disabled e Loading são <strong>demo surface</strong> —
          não fazem parte da API canônica do DssToolbar (apenas <code>inset</code> e <code>brand</code>).
          A API real expõe demonstração visual desses estados via classes utilitárias / composição com filhos.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssToolbarPage() {
  const [selectedVariant, setSelectedVariant] = useState("default");
  const [selectedTemplate, setSelectedTemplate] = useState("actions");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ===== Color Application Domain v3.2: mutual exclusion =====
  const [color, setColor] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [size, setSize] = useState<string>("md");
  const [booleans, setBooleans] = useState({
    inset: false,
    disabled: false,
    loading: false,
  });

  const handleColorSelect = (c: string) => {
    setColor((prev) => (prev === c ? null : c));
    setBrand(null);
    setFeedback(null);
  };
  const handleBrandSelect = (b: string | null) => {
    setBrand((prev) => (prev === b ? null : b));
    setColor(null);
    setFeedback(null);
  };
  const handleFeedbackSelect = (f: string) => {
    setFeedback((prev) => (prev === f ? null : f));
    setColor(null);
    setBrand(null);
  };
  const toggleBoolean = (name: string) => {
    setBooleans((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  // ===== Geração de código (PLAYGROUND_STANDARD v3.2) =====
  const generateCode = () => {
    const props: string[] = [];
    if (brand) props.push(`brand="${brand}"`);
    if (booleans.inset) props.push("inset");
    if (selectedVariant === "dense") props.push("dense"); // pass-through via $attrs
    const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";

    // Comentários sobre demo-only
    const demoNotes: string[] = [];
    if (color) demoNotes.push(`<!-- color="${color}" — demo: aplicar via classe utilitária bg-${color} no filho -->`);
    if (feedback) demoNotes.push(`<!-- feedback="${feedback}" — demo: aplicar via DssBadge/DssIcon dentro do toolbar -->`);
    if (size !== "md" && selectedVariant !== "dense") demoNotes.push(`<!-- size="${size}" — demo: ajustar via min-height customizado ou usar dense -->`);
    if (booleans.disabled) demoNotes.push(`<!-- disabled (demo) — toolbar é container; aplicar em filhos interativos -->`);
    if (booleans.loading) demoNotes.push(`<!-- loading (demo) — aplicar via overlay no contexto pai -->`);
    const notesBlock = demoNotes.length > 0 ? demoNotes.join("\n") + "\n" : "";

    const templates: Record<string, string> = {
      title: `  <DssButton flat round icon="menu" aria-label="Menu" />
  <DssToolbarTitle>Título da Página</DssToolbarTitle>
  <DssSpace />
  <DssButton flat round icon="more_vert" aria-label="Mais opções" />`,
      withSearch: `  <DssToolbarTitle>Dashboard</DssToolbarTitle>
  <DssSpace />
  <DssInput dense outlined placeholder="Buscar..." />
  <DssButton flat round icon="notifications" aria-label="Notificações" />`,
      actions: `  <DssButton flat round icon="menu" aria-label="Menu" />
  <DssToolbarTitle>Sansys Application</DssToolbarTitle>
  <DssSpace />
  <DssButton flat round icon="notifications" aria-label="Notificações" />
  <DssButton flat round icon="account_circle" aria-label="Perfil" />
  <DssButton flat round icon="more_vert" aria-label="Mais" />`,
      minimal: `  <DssToolbarTitle>Toolbar mínimo</DssToolbarTitle>
  <DssSpace />
  <DssButton flat label="Ação" />`,
    };

    return `${notesBlock}<DssToolbar${propsStr} aria-label="Ações do documento">
${templates[selectedTemplate] || templates.actions}
</DssToolbar>`;
  };

  const toolbarSizes = [
    { name: "sm", label: "SM" },
    { name: "md", label: "MD", isDefault: true },
    { name: "lg", label: "LG" },
  ];
  const toolbarToggles = [
    { name: "inset", label: "Inset" },
    { name: "disabled", label: "Disabled (demo)" },
    { name: "loading", label: "Loading (demo)" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: PAGE HEADER
       * ================================================================ */}
      <PageHeader
        icon={Wrench}
        badge="v1.0.0"
        badgeVariant="info"
        title="Componente"
        titleAccent="DssToolbar"
        subtitle="DssToolbar é a barra de ferramentas horizontal fundamental do DSS, wrapper governado sobre QToolbar. Componente de Nível 1 (independente), 100% não-interativo, fornece layout flexbox e espaçamento padronizado para botões, títulos e ícones. Aplica brandabilidade via prop brand (Hub/Water/Waste) com herança automática para filhos via [data-brand]."
        subtitleHighlights={["Nível 1", "100% não-interativo", "herança via [data-brand]"]}
        extraBadges={[
          { label: "Quasar Compatible", variant: "success" },
          { label: "TypeScript", variant: "info" },
          { label: "WCAG 2.1 AA", variant: "success" },
        ]}
      />

      {/* ================================================================
       * SEÇÃO 2: QUANDO USAR / NÃO USAR
       * ================================================================ */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="p-5 rounded-lg border"
          style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", borderColor: "var(--dss-positive)" }}
        >
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-positive)" }}>
            <CheckCircle className="h-5 w-5" />
            Quando Usar
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "Barra de ferramentas dentro de DssHeader (slot exclusivo)",
              "Barra de ações em DssCard ou DssDialog",
              "Toolbar de seção com título + ações secundárias",
              "Aplicar identidade de marca via brand=\"hub|water|waste\" com fundo colorido",
              "Composição de múltiplos toolbars empilhados (ex: navegação + ferramentas)",
              "Container horizontal padronizado para botões flat/ghost, ícones e texto",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="p-5 rounded-lg border"
          style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", borderColor: "var(--dss-negative)" }}
        >
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
                { scenario: "Cabeçalho fixo de página com landmark banner", alt: "DssHeader (que contém DssToolbar)" },
                { scenario: "Agrupamento de botões relacionados", alt: "DssBtnGroup" },
                { scenario: "Navegação por abas", alt: "DssTabs" },
                { scenario: "Trilha de navegação hierárquica", alt: "DssBreadcrumbsEl" },
                { scenario: "Layout vertical de ações empilhadas", alt: "DssCardActions vertical" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.scenario}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>
                    {row.alt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ================================================================
       * SEÇÃO 3: PLAYGROUND
       * ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o Toolbar"
        description="Variantes, brandabilidade e composição. Cores são mutuamente exclusivas (Color Application Domain v3.2). Color/Feedback/Size/Disabled/Loading são demo surface — não fazem parte da API canônica."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="280px"
        previewContent={
          <DssToolbarPreview
            variant={selectedVariant}
            brand={brand}
            color={color}
            feedback={feedback}
            size={size}
            inset={booleans.inset}
            disabled={booleans.disabled}
            loading={booleans.loading}
            template={selectedTemplate}
            isDarkMode={isDarkMode}
          />
        }
        controls={
          <ControlGrid columns={4}>
            {/* Variant (densidade) */}
            <VariantSelector
              label="Densidade"
              variants={variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
            />

            {/* Composição interna */}
            <ControlSection label="Composição">
              {compositionTemplates.map((t) => (
                <PlaygroundButton
                  key={t.name}
                  onClick={() => setSelectedTemplate(t.name)}
                  isSelected={selectedTemplate === t.name}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {t.label}
                </PlaygroundButton>
              ))}
            </ControlSection>

            {/* Brand — API canônica */}
            <BrandPicker
              label="Brand (API canônica)"
              brands={DSS_BRAND_COLORS}
              selectedBrand={brand}
              onSelect={handleBrandSelect}
            />

            {/* Color — Demo surface */}
            <ColorPicker
              label="Color (demo)"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={color}
              onSelect={handleColorSelect}
            />

            {/* Feedback — Demo surface */}
            <FeedbackColorPicker
              label="Feedback (demo)"
              colors={DSS_FEEDBACK_COLORS as any}
              selectedColor={feedback}
              onSelect={handleFeedbackSelect}
            />

            {/* Size — Demo surface */}
            <SizeSelector
              label="Size (demo)"
              sizes={toolbarSizes}
              selectedSize={size}
              onSelect={setSize}
            />

            {/* Estados / Booleans */}
            <ToggleGroup
              label="Estados / Layout"
              options={toolbarToggles}
              values={booleans}
              onToggle={toggleBoolean}
            />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* ================================================================
       * SEÇÃO 4: ESTADOS
       * ================================================================ */}
      <SectionHeader title="Estados" titleAccent="Interativos" badge="Comportamento" />

      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Estado</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Visual</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicabilidade</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tokens / Notas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { state: "Default", visual: "Background transparente, texto --dss-text-body", applicability: "Sempre (sem brand)", tokens: "--dss-spacing-14, --dss-spacing-4, --dss-text-body" },
              { state: "Inset", visual: "Padding-inline-start ampliado (24px)", applicability: "inset=true (alinhar com drawer)", tokens: "--dss-spacing-6" },
              { state: "Dense", visual: "Altura compacta (40px), padding 12px", applicability: "dense via $attrs", tokens: "--dss-spacing-10, --dss-spacing-3" },
              { state: "Branded (Hub)", visual: "Fundo laranja + texto branco", applicability: "brand=\"hub\"", tokens: "--dss-hub-600, --dss-text-inverse" },
              { state: "Branded (Water)", visual: "Fundo azul + texto branco", applicability: "brand=\"water\"", tokens: "--dss-water-600, --dss-text-inverse" },
              { state: "Branded (Waste)", visual: "Fundo verde + texto branco", applicability: "brand=\"waste\"", tokens: "--dss-waste-600, --dss-text-inverse" },
              { state: "Hover", visual: "N/A — container não-interativo", applicability: "Nunca (Gate v2.4)", tokens: "Estados são dos filhos (DssButton)" },
              { state: "Focus", visual: "N/A — container não-interativo", applicability: "Nunca (Gate v2.4)", tokens: "Foco é dos botões/inputs internos" },
              { state: "Active", visual: "N/A — container não-interativo", applicability: "Nunca (Gate v2.4)", tokens: "—" },
              { state: "Disabled", visual: "N/A — container estrutural", applicability: "Nunca", tokens: "Aplicar em filhos interativos" },
              { state: "Loading", visual: "N/A — container estrutural", applicability: "Nunca", tokens: "Loading é responsabilidade do contexto pai" },
            ].map((row, i) => (
              <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.state}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.visual}</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.applicability}</TableCell>
                <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.tokens}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================================================================
       * SEÇÃO 5: ANATOMIA 4 CAMADAS
       * ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssToolbar" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS
       * ================================================================ */}

      {/* Props API */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Eventos">
        <div className="space-y-6 pt-4">
          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>DssToolbar — Props Expostas (API Canônica)</h4>
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
          </div>

          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Pass-through (via $attrs)</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Atributo</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Type</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {passThroughData.map((p, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{p.prop}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{p.type}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Props Bloqueadas (Governança DSS)</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop QToolbar</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Motivo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blockedPropsData.map((p, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-negative)" }}>{p.prop}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="pt-2">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Eventos</h4>
            <p className="text-sm" style={{ color: "var(--jtech-text-muted)" }}>
              DssToolbar não emite eventos próprios — é um container estrutural não-interativo (Gate v2.4). Eventos são responsabilidade dos componentes filhos (DssButton, DssInput, etc.).
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Slots */}
      <CollapsibleSection icon={Code} title="Slots">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Slot</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Conteúdo Esperado</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Restrição (Gate v2.4)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>default</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>DssButton (flat/ghost), DssToolbarTitle (futuro), DssIcon, DssInput, DssSpace, texto</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Composição livre — DssToolbar não instancia filhos automaticamente. Responsabilidade do consumidor.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* Tokens */}
      <CollapsibleSection icon={Code} title="Tokens">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            DssToolbar consome os seguintes tipos de tokens DSS:
          </p>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tipo</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Papel no Componente</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Referência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { type: "Spacing", role: "Min-height (padrão e dense), padding-inline (padrão, dense, inset)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Texto", role: "Cor padrão (sem brand) e cor invertida (com brand)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Background quando brand=\"hub|water|waste\" + propagação [data-brand]", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Surface", role: "NÃO consome — fundo padrão é transparent (toolbar herda do contexto pai)", ref: "Decisão arquitetural" },
                { type: "Elevação / Bordas", role: "NÃO consome — separação visual é responsabilidade do contexto pai (DssHeader, DssCard)", ref: "Decisão arquitetural" },
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

      {/* Acessibilidade */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "role=\"toolbar\" aplicado nativamente pelo QToolbar",
                "Suporte a aria-label via $attrs (recomendado para identificar a toolbar)",
                "Touch target Opção B — responsabilidade dos filhos (DssButton ≥48px)",
                "Contraste branded: Water 7.0:1 (AAA), Waste 5.0:1 (AA), Hub 2.8:1 (AA texto grande/bold)",
                "Cor de fundo respeita dark mode global ([data-theme=\"dark\"])",
                "Conteúdo interno (DssButton) governa foco e teclado",
                "Propagação [data-brand] para herança consistente nos filhos",
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
                  { criterion: "1.3.1 Informação e Relações (role toolbar)", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "1.4.11 Contraste de Componentes Não-Textuais", level: "AA" },
                  { criterion: "2.5.5 Tamanho do Alvo (delegado aos filhos)", level: "AAA" },
                ].map((item, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{item.criterion}</TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: item.level === "AA" ? "rgba(77, 210, 40, 0.2)" : "rgba(31, 134, 222, 0.2)",
                          color: item.level === "AA" ? "var(--dss-positive)" : "var(--dss-action-primary)",
                        }}
                      >
                        {item.level}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <h4 className="font-medium mt-4" style={{ color: "var(--jtech-heading-tertiary)" }}>📋 Nota de Contraste — Brand Hub</h4>
            <p className="text-xs" style={{ color: "var(--jtech-text-muted)" }}>
              Hub (#ef7a11) sobre texto branco: 2.8:1 — atende WCAG AA apenas para texto grande (≥18pt) ou texto bold (≥14pt).
              Garanta que o conteúdo do toolbar com brand=&quot;hub&quot; use peso semibold/bold ou tamanho adequado.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Anti-patterns */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Aplicar cor diretamente via prop color/text-color",
              wrong: '<DssToolbar color="primary" text-color="white">\n  ...\n</DssToolbar>',
              correct: '<DssToolbar brand="water">\n  ...\n</DssToolbar>',
              reason: "Props color e text-color são bloqueadas. Cores são governadas via tokens + prop brand.",
            },
            {
              title: "Forçar dark mode local",
              wrong: '<DssToolbar dark>\n  ...\n</DssToolbar>',
              correct: '<!-- Dark mode global -->\n<html data-theme="dark">\n  <DssToolbar>...</DssToolbar>',
              reason: "Dark mode é governado globalmente via [data-theme=\"dark\"] — nunca por prop individual.",
            },
            {
              title: "Adicionar hover/focus no container",
              wrong: '.dss-toolbar:hover {\n  background: var(--dss-hover);\n}',
              correct: '/* Hover é dos filhos */\n.dss-toolbar .dss-button:hover {\n  /* governado pelo DssButton */\n}',
              reason: "Gate de Responsabilidade v2.4 — DssToolbar é container 100% não-interativo.",
            },
            {
              title: "Compor toolbar dentro de outro toolbar",
              wrong: '<DssToolbar>\n  <DssToolbar>...</DssToolbar>\n</DssToolbar>',
              correct: '<DssHeader>\n  <DssToolbar>Global</DssToolbar>\n  <DssToolbar>Seção</DssToolbar>\n</DssHeader>',
              reason: "Toolbars são pares — empilhe dentro de DssHeader/DssCard, nunca aninhe.",
            },
          ].map((pattern, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border"
              style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
            >
              <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>{pattern.title}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-negative)" }}>❌ Incorreto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono whitespace-pre-wrap" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>
                    {pattern.wrong}
                  </pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono whitespace-pre-wrap" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>
                    {pattern.correct}
                  </pre>
                </div>
              </div>
              <p className="mt-2 text-sm" style={{ color: "var(--jtech-text-muted)" }}>
                <strong>Por quê:</strong> {pattern.reason}
              </p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Vinculantes DSS */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.4">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssToolbar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Gate de Responsabilidade v2.4", application: "DssToolbar é container 100% não-interativo. Sem hover, focus, active próprios. Estados são dos filhos." },
                { rule: "Gate de Composição v2.4", application: "Slot default — composição livre (DssButton flat, DssIcon, texto). Não instancia filhos automaticamente." },
                { rule: "Pseudo-elementos (::before / ::after)", application: "Não utilizados — toolbar não possui touch target nem efeitos visuais decorativos." },
                { rule: "Uso de brightness()", application: "Não utilizado — brands aplicam tokens diretos (--dss-{brand}-600)." },
                { rule: "Classificação do componente", application: "Container Estrutural Nível 1 (independente). Golden Reference: DssCard. Golden Context: DssTabs." },
                { rule: "Brandabilidade", application: "Aplica brand via prop + propaga [data-brand] para herança nos filhos. Padrão dual de seletor." },
                { rule: "Tokens Genéricos", application: "Usa --dss-spacing-* e --dss-{brand}-600. Nenhum token específico --dss-toolbar-*." },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>{row.rule}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.application}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="pt-2">
            <h4 className="font-medium mb-2" style={{ color: "var(--jtech-heading-tertiary)" }}>Exceções Documentadas</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>ID</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Valor</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Justificativa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "EXC-01", value: "Sobrescrita de min-height + padding nativos do QToolbar", reason: "QToolbar aplica min-height: 50px e padding: 0 12px na .q-toolbar. .dss-toolbar é aplicada no mesmo elemento, override por cascata. Dense usa seletor composto .dss-toolbar.q-toolbar--dense pois dense é gerenciado nativamente via $attrs." },
                  { id: "EXC-02", value: "Contraste Hub 2.8:1", reason: "Hub (#ef7a11) com texto branco atende WCAG AA apenas para texto grande/bold. O consumidor deve garantir peso semibold/bold no conteúdo do toolbar com brand=\"hub\"." },
                ].map((exc, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{exc.id}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{exc.value}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{exc.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* Referências */}
      <CollapsibleSection icon={BookOpen} title="Referências" titleAccent="Normativas">
        <div className="pt-4">
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "toolbar.types.ts",
              "pre_prompt_dss_toolbar.md",
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md",
              "PLAYGROUND_STANDARD.md (v3.2)",
              "PLAYGROUND_COMPLIANCE_CHECKLIST.md",
            ].map((ref, i) => (
              <li key={i} className="flex items-center gap-2">
                <FileText className="h-4 w-4 flex-shrink-0" style={{ color: "var(--dss-jtech-accent)" }} />
                <span className="font-mono text-xs">{ref}</span>
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleSection>
    </div>
  );
}
