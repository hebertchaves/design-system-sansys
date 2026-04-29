// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  PanelLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  Shield,
  Home,
  Settings,
  Bell,
  User,
  Layers,
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
  SizeSelector,
  ToggleGroup,
} from "@/components/ui/playground";
import { PlaygroundButton } from "@/components/ui/PlaygroundButton";

// ============================================================================
// DADOS — Derivados de DssDrawer.ts.vue + pre_prompt_dss_drawer.md
// ============================================================================

// Variantes de elevação visual (mutuamente exclusivas no playground)
const variants = [
  { name: "default", label: "Default", desc: "Sem sombra nem borda" },
  { name: "elevated", label: "Elevated", desc: "Sombra de elevação (--dss-elevation-2)" },
  { name: "bordered", label: "Bordered", desc: "Borda lateral sutil" },
];

// Lado do drawer
const sides = [
  { name: "left", label: "Left", desc: "Drawer à esquerda (padrão)" },
  { name: "right", label: "Right", desc: "Drawer à direita" },
];

// Templates de composição (slot interno)
const compositionTemplates = [
  { name: "navList", label: "Lista de Navegação", desc: "DssList com itens de navegação" },
  { name: "withHeader", label: "Com Cabeçalho", desc: "Cabeçalho de seção + lista" },
  { name: "miniIcons", label: "Apenas Ícones", desc: "Conteúdo otimizado para mini mode" },
];

const widthSizes = [
  { name: "sm", label: "224px", value: 224 },
  { name: "md", label: "256px", value: 256, isDefault: true },
  { name: "lg", label: "320px", value: 320 },
];

// Props API — DssDrawer (fonte: drawer.types.ts + pre_prompt)
const propsData = [
  { category: "Comportamento", prop: "modelValue", type: "Boolean", default: "true", description: "Controla visibilidade do drawer (v-model)" },
  { category: "Comportamento", prop: "side", type: "'left' | 'right'", default: "'left'", description: "Lado em que o drawer é ancorado" },
  { category: "Comportamento", prop: "overlay", type: "Boolean", default: "false", description: "Força sobreposição ao conteúdo (em vez de empurrar)" },
  { category: "Comportamento", prop: "mini", type: "Boolean", default: "false", description: "Modo minimizado — apenas ícones visíveis" },
  { category: "Dimensão", prop: "width", type: "Number", default: "256", description: "Largura do drawer em pixels (≈ --dss-spacing-64)" },
  { category: "Visual", prop: "elevated", type: "Boolean", default: "false", description: "Aplica sombra padrão (--dss-elevation-2)" },
  { category: "Visual", prop: "bordered", type: "Boolean", default: "false", description: "Aplica borda lateral sutil separando do conteúdo" },
];

// Props bloqueadas — governança DSS
const blockedPropsData = [
  { prop: "dark", reason: "Dark mode governado globalmente via [data-theme=\"dark\"]" },
  { prop: "behavior", reason: "Padronizado em 'default' — desktop=push, mobile=overlay" },
];

// Eventos
const eventsData = [
  { event: "update:modelValue", payload: "Boolean", description: "Emitido quando a visibilidade do drawer muda (suporta v-model)" },
];

// Anatomia 4 Camadas — Derivado da estrutura real do componente
const anatomyData = {
  structure: {
    files: ["1-structure/DssDrawer.ts.vue"],
    description: "Wrapper canônico sobre <q-drawer>. Container lateral 100% não-interativo. Responsabilidade exclusiva de ancorar conteúdo de navegação na lateral da página e gerenciar elevação/borda visual. EXC-03: <q-drawer> é elemento raiz por exigência do QLayout.",
    responsibilities: [
      "Encapsula <q-drawer> com inheritAttrs: false",
      "Bloqueia props dark e behavior (governança DSS)",
      "Aplica role='navigation' por padrão (sobrescritível via $attrs)",
      "Slot default exclusivo para DssList, DssMenu ou cabeçalhos DSS",
      "Repassa modelValue / update:modelValue para v-model",
      "behavior='default' hardcoded — desktop empurra conteúdo, mobile overlay",
    ],
    tokens: [],
    codeExample: `<template>
  <q-drawer
    :class="drawerClasses"
    v-bind="drawerAttrs"
    :model-value="modelValue"
    :side="side"
    :overlay="overlay"
    :mini="mini"
    :width="width"
    behavior="default"
    @update:model-value="onUpdate"
  >
    <slot />
  </q-drawer>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Override do background-color do QDrawer nativo (que aplica branco fixo). Apenas tokens genéricos — sem variantes, sem brand.",
    responsibilities: [
      "Sobrescreve fundo padrão do QDrawer (EXC-02)",
      "Aplica --dss-surface-default como fundo padrão",
      "Aplica --dss-text-body como cor de texto",
      "Garante suporte a dark mode via token de superfície",
    ],
    tokens: ["--dss-surface-default", "--dss-text-body"],
    codeExample: `.dss-drawer {
  background-color: var(--dss-surface-default) !important;
  color: var(--dss-text-body) !important;
}

.dss-drawer .q-drawer__backdrop {
  opacity: var(--dss-opacity-backdrop);
}`,
  },
  variants: {
    files: ["3-variants/_variant.scss", "3-variants/index.scss"],
    description: "Variantes visuais de elevação e borda. Apenas estrutura de shadow/border — sem cor, sem brand, sem estado.",
    responsibilities: [
      "Elevated: box-shadow via --dss-elevation-2",
      "Bordered: borda lateral via --dss-border-width-thin + --dss-gray-200",
      "Borda direita quando side=left, esquerda quando side=right",
      "Mutuamente exclusivas por convenção (não tecnicamente)",
    ],
    tokens: ["--dss-elevation-2", "--dss-border-width-thin", "--dss-gray-200"],
    codeExample: `.dss-drawer--elevated {
  box-shadow: var(--dss-elevation-2);
}

.dss-drawer--bordered[data-side="left"] {
  border-right: var(--dss-border-width-thin) solid var(--dss-gray-200);
}

.dss-drawer--bordered[data-side="right"] {
  border-left: var(--dss-border-width-thin) solid var(--dss-gray-200);
}`,
  },
  output: {
    files: ["4-output/_states.scss", "4-output/_brands.scss", "4-output/index.scss"],
    description: "Camada final aplicando dark mode global, high contrast e forced-colors. Sem brands aplicadas no container — brand é responsabilidade do DssList/DssMenu interno.",
    responsibilities: [
      "Dark mode via [data-theme='dark']",
      "Suporte a prefers-contrast: high (borda reforçada)",
      "Suporte a forced-colors: active (Windows High Contrast)",
      "Brand NÃO é aplicado — delegado aos componentes filhos",
    ],
    tokens: ["--dss-surface-dark", "--dss-border-width-md", "--dss-opacity-backdrop"],
    codeExample: `[data-theme="dark"] .dss-drawer {
  background-color: var(--dss-surface-dark) !important;
  color: var(--dss-text-inverse) !important;
}

@media (prefers-contrast: high) {
  .dss-drawer--bordered {
    border-width: var(--dss-border-width-md);
  }
}`,
  },
};

// ============================================================================
// PREVIEW DO DRAWER (simulado em React, baseado nos tokens DSS)
// ============================================================================

interface DssDrawerPreviewProps {
  variant?: string;
  side?: string;
  width?: number;
  mini?: boolean;
  overlay?: boolean;
  open?: boolean;
  template?: string;
  isDarkMode?: boolean;
}

function DssDrawerPreview({
  variant = "default",
  side = "left",
  width = 256,
  mini = false,
  overlay = false,
  open = true,
  template = "navList",
  isDarkMode = false,
}: DssDrawerPreviewProps) {
  const surfaceBg = isDarkMode ? "hsl(0 0% 14%)" : "hsl(0 0% 100%)";
  const textColor = isDarkMode ? "hsl(0 0% 88%)" : "hsl(0 0% 10%)";
  const subtleColor = isDarkMode ? "hsl(0 0% 60%)" : "hsl(0 0% 40%)";
  const dividerColor = isDarkMode ? "hsl(0 0% 22%)" : "hsl(0 0% 90%)";
  const pageBg = isDarkMode ? "hsl(0 0% 9%)" : "hsl(0 0% 96%)";
  const itemHoverBg = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const activeBg = "rgba(196, 30, 58, 0.10)";
  const accent = "var(--dss-jtech-accent, #c41e3a)";

  const effectiveWidth = mini ? 64 : width;

  const drawerStyle: React.CSSProperties = {
    width: effectiveWidth,
    backgroundColor: surfaceBg,
    color: textColor,
    transition: "all 200ms ease",
    position: "relative",
    zIndex: overlay ? 3 : 2,
    flexShrink: 0,
  };

  if (variant === "elevated") {
    drawerStyle.boxShadow = isDarkMode
      ? side === "left" ? "2px 0 8px rgba(0,0,0,0.6)" : "-2px 0 8px rgba(0,0,0,0.6)"
      : side === "left" ? "2px 0 8px rgba(0,0,0,0.12)" : "-2px 0 8px rgba(0,0,0,0.12)";
  } else if (variant === "bordered") {
    if (side === "left") drawerStyle.borderRight = `1px solid ${dividerColor}`;
    else drawerStyle.borderLeft = `1px solid ${dividerColor}`;
  }

  const navItems = [
    { icon: Home, label: "Visão Geral", active: true },
    { icon: Layers, label: "Projetos", active: false },
    { icon: Bell, label: "Notificações", active: false },
    { icon: User, label: "Perfil", active: false },
    { icon: Settings, label: "Configurações", active: false },
  ];

  const NavItem = ({ icon: Icon, label, active }: { icon: typeof Home; label: string; active: boolean }) => (
    <div
      role="button"
      tabIndex={0}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: mini ? "10px" : "10px 14px",
        margin: mini ? "2px 8px" : "2px 8px",
        borderRadius: 6,
        cursor: "pointer",
        backgroundColor: active ? activeBg : "transparent",
        color: active ? accent : textColor,
        fontWeight: active ? 500 : 400,
        fontSize: 13,
        justifyContent: mini ? "center" : "flex-start",
        transition: "all 150ms ease",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = itemHoverBg;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <Icon size={16} style={{ color: active ? accent : subtleColor, flexShrink: 0 }} />
      {!mini && <span>{label}</span>}
    </div>
  );

  const renderHeader = () => (
    !mini && (
      <div
        style={{
          padding: "16px 16px 8px",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: subtleColor,
        }}
      >
        Navegação Principal
      </div>
    )
  );

  const renderContent = () => {
    if (template === "withHeader") {
      return (
        <>
          {renderHeader()}
          {navItems.slice(0, 4).map((it, i) => <NavItem key={i} {...it} />)}
        </>
      );
    }
    if (template === "miniIcons") {
      return navItems.map((it, i) => <NavItem key={i} {...it} />);
    }
    return navItems.map((it, i) => <NavItem key={i} {...it} />);
  };

  const drawer = (
    <nav
      style={drawerStyle}
      role="navigation"
      aria-label="Menu lateral"
      data-side={side}
      data-mini={mini || undefined}
    >
      <div style={{ padding: "12px 0" }}>{renderContent()}</div>
    </nav>
  );

  const content = (
    <div
      style={{
        flex: 1,
        padding: 20,
        minHeight: 320,
        color: subtleColor,
        fontSize: 12,
        position: "relative",
      }}
    >
      <p style={{ marginBottom: 8, color: textColor, fontWeight: 600, fontSize: 13 }}>
        Conteúdo da página
      </p>
      <p>
        Drawer{" "}
        <code>{variant}</code> · side=<code>{side}</code>
        {mini && <> · <code>mini</code></>}
        {overlay && <> · <code>overlay</code></>}
        · width=<code>{effectiveWidth}px</code>
      </p>
      <p style={{ marginTop: 12, opacity: 0.7 }}>
        {overlay
          ? "Modo overlay: o drawer sobrepõe o conteúdo com backdrop quando aberto."
          : "Modo push (padrão desktop): o drawer empurra o conteúdo lateralmente."}
      </p>

      {overlay && open && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.50)",
            zIndex: 2,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 720,
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${dividerColor}`,
        backgroundColor: pageBg,
        display: "flex",
        flexDirection: "column",
      }}
      role="region"
      aria-label="Preview de DssDrawer"
    >
      {/* Header simulando contexto de layout */}
      <div
        style={{
          padding: "10px 16px",
          backgroundColor: surfaceBg,
          color: textColor,
          borderBottom: `1px solid ${dividerColor}`,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        Sansys Application
      </div>

      {/* Layout: drawer + conteúdo */}
      <div style={{ display: "flex", position: "relative", minHeight: 320 }}>
        {open && side === "left" && drawer}
        {content}
        {open && side === "right" && drawer}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssDrawerPage() {
  const [selectedVariant, setSelectedVariant] = useState("elevated");
  const [selectedSide, setSelectedSide] = useState("left");
  const [selectedTemplate, setSelectedTemplate] = useState("withHeader");
  const [selectedWidth, setSelectedWidth] = useState("md");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [drawerBooleans, setDrawerBooleans] = useState({
    open: true,
    mini: false,
    overlay: false,
  });

  const toggleDrawerBoolean = (name: string) => {
    setDrawerBooleans((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  const widthValue = widthSizes.find((w) => w.name === selectedWidth)?.value ?? 256;

  // ===== Geração de código (PLAYGROUND_STANDARD v3.2) =====
  const generateCode = () => {
    const props: string[] = [];
    props.push(`v-model="drawerOpen"`);
    if (selectedSide !== "left") props.push(`side="${selectedSide}"`);
    if (selectedVariant === "elevated") props.push("elevated");
    if (selectedVariant === "bordered") props.push("bordered");
    if (drawerBooleans.mini) props.push(":mini=\"true\"");
    if (drawerBooleans.overlay) props.push(":overlay=\"true\"");
    if (widthValue !== 256) props.push(`:width="${widthValue}"`);

    const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";

    const contents: Record<string, string> = {
      navList: `  <DssList>
    <DssItem clickable v-ripple active>
      <DssItemSection avatar><DssIcon name="home" /></DssItemSection>
      <DssItemSection>Visão Geral</DssItemSection>
    </DssItem>
    <DssItem clickable v-ripple>
      <DssItemSection avatar><DssIcon name="folder" /></DssItemSection>
      <DssItemSection>Projetos</DssItemSection>
    </DssItem>
    <DssItem clickable v-ripple>
      <DssItemSection avatar><DssIcon name="settings" /></DssItemSection>
      <DssItemSection>Configurações</DssItemSection>
    </DssItem>
  </DssList>`,
      withHeader: `  <DssList>
    <DssItemLabel header>Navegação Principal</DssItemLabel>
    <DssItem clickable v-ripple active>
      <DssItemSection avatar><DssIcon name="home" /></DssItemSection>
      <DssItemSection>Visão Geral</DssItemSection>
    </DssItem>
    <DssItem clickable v-ripple>
      <DssItemSection avatar><DssIcon name="folder" /></DssItemSection>
      <DssItemSection>Projetos</DssItemSection>
    </DssItem>
  </DssList>`,
      miniIcons: `  <DssList>
    <DssItem clickable v-ripple active>
      <DssItemSection avatar><DssIcon name="home" /></DssItemSection>
    </DssItem>
    <DssItem clickable v-ripple>
      <DssItemSection avatar><DssIcon name="folder" /></DssItemSection>
    </DssItem>
    <DssItem clickable v-ripple>
      <DssItemSection avatar><DssIcon name="settings" /></DssItemSection>
    </DssItem>
  </DssList>`,
    };

    return `<DssLayout view="hHh lpR fFf">
  <DssHeader elevated>
    <DssToolbar>
      <DssToolbarTitle>Sansys Application</DssToolbarTitle>
    </DssToolbar>
  </DssHeader>

  <DssDrawer${propsStr} aria-label="Menu principal">
${contents[selectedTemplate] || contents.navList}
  </DssDrawer>

  <DssPageContainer>
    <!-- Conteúdo da página -->
  </DssPageContainer>
</DssLayout>`;
  };

  const drawerToggles = [
    { name: "open", label: "Aberto (v-model)" },
    { name: "mini", label: "Mini Mode" },
    { name: "overlay", label: "Overlay" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: PAGE HEADER
       * ================================================================ */}
      <PageHeader
        icon={PanelLeft}
        badge="v1.0.0"
        badgeVariant="info"
        title="Componente"
        titleAccent="DssDrawer"
        subtitle="DssDrawer é o painel lateral de navegação da página, wrapper governado sobre QDrawer. Componente de Nível 3 (composição de segundo grau), 100% não-interativo, ancora conteúdo de navegação na lateral do layout e orquestra DssList ou DssMenu internos. Variantes elevated e bordered controlam separação visual com o conteúdo principal, enquanto a brandabilidade é delegada aos componentes filhos."
        subtitleHighlights={["Nível 3", "100% não-interativo", "delegada aos componentes filhos"]}
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
              "Painel lateral de navegação primária em aplicações",
              "Menu fixo lateral em layouts desktop (push mode)",
              "Painel responsivo que vira overlay no mobile (comportamento padrão)",
              "Modo mini (apenas ícones) para maximizar área de conteúdo",
              "Layouts com DssLayout (Nível 4) que requerem landmark navigation",
              "Separar visualmente navegação do conteúdo via elevated ou bordered",
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
                { scenario: "Painel modal centralizado", alt: "DssDialog / DssModal" },
                { scenario: "Painel temporário com seleção", alt: "DssMenu (popup)" },
                { scenario: "Conteúdo com texto solto / HTML nativo", alt: "DssCard ou DssPage" },
                { scenario: "Múltiplos drawers no mesmo lado", alt: "Apenas 1 por side (left/right)" },
                { scenario: "Conteúdo arbitrário sem navegação", alt: "Use role=\"complementary\" via $attrs" },
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
        title="Configure o Drawer"
        description="Variantes, lado, dimensão e comportamento do Drawer (pai). Composição interna delegada a DssList / DssMenu."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="380px"
        previewContent={
          <DssDrawerPreview
            variant={selectedVariant}
            side={selectedSide}
            width={widthValue}
            mini={drawerBooleans.mini}
            overlay={drawerBooleans.overlay}
            open={drawerBooleans.open}
            template={selectedTemplate}
            isDarkMode={isDarkMode}
          />
        }
        controls={
          <ControlGrid columns={4}>
            <VariantSelector
              label="Drawer · Variant"
              variants={variants}
              selectedVariant={selectedVariant}
              onSelect={setSelectedVariant}
            />

            <ControlSection label="Side">
              {sides.map((s) => (
                <PlaygroundButton
                  key={s.name}
                  onClick={() => setSelectedSide(s.name)}
                  isSelected={selectedSide === s.name}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {s.label}
                </PlaygroundButton>
              ))}
            </ControlSection>

            <SizeSelector
              label="Width"
              sizes={widthSizes}
              selectedSize={selectedWidth}
              onSelect={setSelectedWidth}
            />

            <ToggleGroup
              label="Estados"
              options={drawerToggles}
              values={drawerBooleans}
              onToggle={toggleDrawerBoolean}
            />

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
              { state: "Default", visual: "Background --dss-surface-default, sem sombra/borda", applicability: "Sempre", tokens: "--dss-surface-default, --dss-text-body" },
              { state: "Elevated", visual: "Box-shadow lateral de elevação", applicability: "elevated=true", tokens: "--dss-elevation-2" },
              { state: "Bordered", visual: "Borda lateral sutil (lado oposto ao side)", applicability: "bordered=true", tokens: "--dss-border-width-thin, --dss-gray-200" },
              { state: "Mini", visual: "Largura reduzida (~64px), apenas ícones", applicability: "mini=true", tokens: "Comportamento nativo QDrawer" },
              { state: "Overlay", visual: "Drawer sobrepõe conteúdo + backdrop", applicability: "overlay=true ou breakpoint mobile", tokens: "--dss-opacity-backdrop (0.75)" },
              { state: "Closed", visual: "Drawer oculto; conteúdo ocupa 100%", applicability: "modelValue=false", tokens: "—" },
              { state: "Hover", visual: "N/A — container não-interativo", applicability: "Nunca (Gate v2.4)", tokens: "Estados de interação são dos itens (DssItem)" },
              { state: "Focus", visual: "N/A — container não-interativo", applicability: "Nunca (Gate v2.4)", tokens: "Foco é dos itens internos" },
              { state: "Disabled", visual: "N/A — container estrutural", applicability: "Nunca", tokens: "—" },
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
      <AnatomySection componentName="DssDrawer" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS
       * ================================================================ */}

      {/* Props API */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Eventos">
        <div className="space-y-6 pt-4">
          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>DssDrawer — Props Expostas</h4>
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
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Props Bloqueadas (Governança DSS)</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop QDrawer</TableHead>
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

          <div>
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
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{e.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                <TableCell style={{ color: "var(--jtech-text-body)" }}>DssList, DssMenu ou cabeçalhos de seção (DssItemLabel header)</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Proibido HTML nativo solto ou texto direto. Composição é exclusiva de componentes DSS de navegação.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* Tokens */}
      <CollapsibleSection icon={Code} title="Tokens">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            DssDrawer consome os seguintes tipos de tokens DSS:
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
                { type: "Surface", role: "Background do drawer (sobrescreve fundo branco fixo do QDrawer — EXC-02)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Texto", role: "Cor de texto padrão em light/dark mode", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Elevação", role: "Box-shadow da variante elevated", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Borda lateral da variante bordered", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Cinzas (gray scale)", role: "Cor da borda lateral em light mode", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Opacidade", role: "Backdrop em modo overlay/mobile (--dss-opacity-backdrop = 0.75)", ref: "DSS_TOKEN_REFERENCE.md §569" },
                { type: "Spacing", role: "Largura padrão (~256px = --dss-spacing-64)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "NÃO consome — brand é responsabilidade do DssList/DssMenu filho", ref: "Delegação arquitetural" },
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
                "role=\"navigation\" aplicado por padrão (sobrescritível via $attrs para complementary)",
                "aria-label recomendado via $attrs (ex.: \"Menu principal\")",
                "z-index nativo do Quasar preservado (coexistência com header/dialog)",
                "Suporte a prefers-contrast: high (borda reforçada)",
                "Suporte a forced-colors: active (Windows High Contrast)",
                "Cor de fundo respeita dark mode global ([data-theme=\"dark\"])",
                "Conteúdo interno (DssList/DssItem) governa foco e teclado",
                "Backdrop em overlay respeita --dss-opacity-backdrop (0.75)",
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
                  { criterion: "1.3.1 Informação e Relações (landmark navigation)", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "1.4.11 Contraste de Componentes Não-Textuais", level: "AA" },
                  { criterion: "2.4.1 Bypass Blocks (landmark navigation)", level: "A" },
                  { criterion: "2.4.3 Ordem do Foco", level: "A" },
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

            <h4 className="font-medium mt-4" style={{ color: "var(--jtech-heading-tertiary)" }}>📋 Media Queries</h4>
            <pre
              className="p-3 rounded-lg text-xs font-mono overflow-x-auto"
              style={{
                backgroundColor: "var(--jtech-code-bg)",
                color: "var(--jtech-heading-secondary)",
                border: "1px solid var(--jtech-card-border)",
              }}
            >
{`@media (prefers-contrast: high) {
  .dss-drawer--bordered {
    border-width: var(--dss-border-width-md);
  }
}

@media (forced-colors: active) {
  .dss-drawer {
    border-right: 2px solid ButtonText;
  }
}`}
            </pre>
          </div>
        </div>
      </CollapsibleSection>

      {/* Anti-patterns */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "HTML nativo direto no slot do DssDrawer",
              wrong: '<DssDrawer v-model="open">\n  <div class="meu-menu">Item 1</div>\n</DssDrawer>',
              correct: '<DssDrawer v-model="open">\n  <DssList>\n    <DssItem clickable>\n      <DssItemSection>Item 1</DssItemSection>\n    </DssItem>\n  </DssList>\n</DssDrawer>',
              reason: "Gate de Composição v2.4 — slot default do DssDrawer é exclusivo para DssList, DssMenu ou cabeçalhos DSS.",
            },
            {
              title: "Aplicar brand no DssDrawer",
              wrong: '<DssDrawer brand="hub">...</DssDrawer>',
              correct: '<DssDrawer>\n  <DssList brand="hub">...</DssList>\n</DssDrawer>',
              reason: "Brand é responsabilidade dos componentes filhos (DssList, DssMenu). DssDrawer é container neutro — não expõe prop brand.",
            },
            {
              title: "Sobrescrever z-index ou behavior",
              wrong: '<DssDrawer style="z-index: 9999" behavior="mobile">...</DssDrawer>',
              correct: '<DssDrawer v-model="open" :overlay="isMobile">...</DssDrawer>',
              reason: "QDrawer gerencia z-index automaticamente. A prop behavior está bloqueada — DSS padroniza comportamento responsivo (push em desktop, overlay em mobile).",
            },
            {
              title: "Múltiplos drawers no mesmo lado",
              wrong: '<DssDrawer side="left">A</DssDrawer>\n<DssDrawer side="left">B</DssDrawer>',
              correct: '<DssDrawer side="left">...</DssDrawer>\n<DssDrawer side="right">...</DssDrawer>',
              reason: "QLayout suporta no máximo 1 drawer por side. Drawers concorrentes do mesmo lado quebram a matemática de offset do layout.",
            },
            {
              title: "Usar dark prop manualmente",
              wrong: '<DssDrawer :dark="isDark">...</DssDrawer>',
              correct: '<DssDrawer>...</DssDrawer>\n<!-- Dark mode aplicado globalmente via [data-theme="dark"] -->',
              reason: "A prop dark está bloqueada. Dark mode é governado pelo atributo global [data-theme=\"dark\"] e tokens --dss-surface-*.",
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssDrawer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Gate de Responsabilidade v2.4", application: "DssDrawer é container 100% não-interativo. Sem hover, focus, active próprios. Estados são dos itens internos." },
                { rule: "Gate de Composição v2.4", application: "Slot default exclusivo para DssList, DssMenu ou cabeçalhos DSS. HTML nativo proibido." },
                { rule: "Pseudo-elementos (::before / ::after)", application: "Não utilizados — drawer não possui touch target nem efeitos visuais decorativos." },
                { rule: "Uso de brightness()", application: "Não utilizado — variantes usam tokens de elevation e border diretamente." },
                { rule: "Classificação do componente", application: "Container Estrutural Nível 3 (composição de segundo grau). Golden Reference: DssHeader (mesma família estrutural)." },
                { rule: "Brandabilidade", application: "Delegada — DssDrawer não consome brand. DssList/DssMenu interno aplica brand quando necessário." },
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
                  { id: "EXC-01", value: "<q-layout> no example.vue", reason: "DssLayout (Nível 4) ainda não existe. Permitido usar <q-layout> nativo apenas no arquivo de exemplo, para fornecer contexto de renderização ao drawer." },
                  { id: "EXC-02", value: "background-color !important", reason: "QDrawer aplica fundo branco fixo. Override do DSS exige !important para usar --dss-surface-default e suportar dark mode corretamente." },
                  { id: "EXC-03", value: "<q-drawer> como elemento raiz", reason: "QDrawer depende de provide/inject do QLayout pai para calcular offsets. Envolver em <div> quebraria a comunicação interna do QLayout. Precedente: DssHeader." },
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
              "pre_prompt_dss_drawer.md",
              "DssDrawer.ts.vue (1-structure)",
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md",
              "PLAYGROUND_STANDARD.md (v3.2)",
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
