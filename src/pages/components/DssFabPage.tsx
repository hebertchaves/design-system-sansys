// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  Plus,
  X,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  Shield,
  Edit3,
  Trash2,
  Share2,
  Copy,
  Mail,
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
  ToggleGroup,
} from "@/components/ui/playground";
import { PlaygroundButton } from "@/components/ui/PlaygroundButton";

// ============================================================================
// DADOS — Derivados de DssFab.ts.vue + pre_prompt_dss_fab.md + DSSFAB_API.md
// ============================================================================

// Cores semânticas (mutuamente exclusivas no playground)
const colors = [
  { name: "primary", label: "Primary", desc: "Cor primária (padrão)" },
  { name: "secondary", label: "Secondary", desc: "Cor secundária" },
  { name: "positive", label: "Positive", desc: "Sucesso / confirmação" },
  { name: "negative", label: "Negative", desc: "Destrutivo / erro" },
  { name: "warning", label: "Warning", desc: "Atenção / cuidado" },
  { name: "info", label: "Info", desc: "Informativo" },
];

// Direções de expansão
const directions = [
  { name: "up", label: "Up", desc: "Expande para cima (padrão)" },
  { name: "down", label: "Down", desc: "Expande para baixo" },
  { name: "left", label: "Left", desc: "Expande para a esquerda" },
  { name: "right", label: "Right", desc: "Expande para a direita" },
];

// Brands (Sansys)
const brands = [
  { name: "none", label: "None", desc: "Sem brand (padrão)" },
  { name: "hub", label: "Hub", desc: "Sansys Hub (laranja)" },
  { name: "water", label: "Water", desc: "Sansys Water (azul)" },
  { name: "waste", label: "Waste", desc: "Sansys Waste (verde)" },
];

// Templates de composição (slot interno — DssFabAction temporário)
const compositionTemplates = [
  { name: "actions3", label: "3 Ações", desc: "edit / share / delete" },
  { name: "actions4", label: "4 Ações", desc: "edit / share / copy / mail" },
  { name: "noActions", label: "Sem Ações", desc: "FAB simples (apenas trigger)" },
];

// Props API — DssFab (fonte: fab.types.ts + pre_prompt + DSSFAB_API)
const propsData = [
  { category: "Estado", prop: "modelValue", type: "Boolean", default: "false", description: "Estado aberto/fechado (suporta v-model)" },
  { category: "Visual", prop: "color", type: "String", default: "'primary'", description: "Cor semântica do trigger" },
  { category: "Visual", prop: "text-color", type: "String", default: "undefined", description: "Cor do ícone/texto" },
  { category: "Visual", prop: "label", type: "String", default: "undefined", description: "Label → transforma em Extended FAB (pill)" },
  { category: "Visual", prop: "icon", type: "String", default: "'add'", description: "Ícone exibido quando fechado (Material Icons)" },
  { category: "Visual", prop: "active-icon", type: "String", default: "'close'", description: "Ícone exibido quando aberto" },
  { category: "Visual", prop: "hide-icon", type: "Boolean", default: "false", description: "Oculta o ícone do trigger" },
  { category: "Visual", prop: "hide-label", type: "Boolean", default: "false", description: "Oculta o label do trigger" },
  { category: "Comportamento", prop: "direction", type: "'up'|'down'|'left'|'right'", default: "'up'", description: "Direção de expansão das ações filhas" },
  { category: "Comportamento", prop: "vertical-actions-align", type: "'left'|'center'|'right'", default: "'center'", description: "Alinhamento das ações (direction up/down)" },
  { category: "Comportamento", prop: "persistent", type: "Boolean", default: "false", description: "Não fecha ao clicar fora" },
  { category: "Estado", prop: "disable", type: "Boolean", default: "false", description: "Desabilita o FAB" },
  { category: "Brand", prop: "brand", type: "'hub'|'water'|'waste'|null", default: "null", description: "Acento de marca Sansys" },
  { category: "Acessibilidade", prop: "aria-label", type: "String", default: "undefined", description: "Label acessível do trigger" },
];

// Props bloqueadas — governança DSS
const blockedPropsData = [
  { prop: "glossy", reason: "Não faz parte da linguagem visual DSS v2.2" },
  { prop: "push", reason: "Não faz parte da linguagem visual DSS v2.2" },
  { prop: "flat", reason: "FAB no DSS é sempre elevado (Material Design baseline)" },
  { prop: "outline", reason: "Variante sem elevação não faz sentido semântico para FAB" },
  { prop: "unelevated", reason: "FAB no DSS é sempre elevado — variante removida" },
  { prop: "padding", reason: "Padding governado por tokens internos, não exposto" },
];

// Eventos
const eventsData = [
  { event: "update:modelValue", payload: "Boolean", description: "Estado aberto/fechado mudou (suporta v-model)" },
  { event: "click", payload: "MouseEvent", description: "Trigger clicado" },
  { event: "show", payload: "—", description: "Ações exibidas (após animação)" },
  { event: "hide", payload: "—", description: "Ações ocultadas (após animação)" },
  { event: "before-show", payload: "—", description: "Antes de exibir as ações" },
  { event: "before-hide", payload: "—", description: "Antes de ocultar as ações" },
];

// Anatomia 4 Camadas
const anatomyData = {
  structure: {
    files: ["1-structure/DssFab.ts.vue"],
    description: "Wrapper canônico sobre <q-fab>. Componente de Nível 2 (composição de primeiro grau): gerencia estado de expansão e orquestra a direção da animação das ações filhas. NÃO gerencia posicionamento (delegado ao DssPageSticky) nem executa ações finais (delegado aos DssFabAction).",
    responsibilities: [
      "Encapsula <q-fab> com inheritAttrs: false",
      "Bloqueia props glossy, push, flat, outline, unelevated, padding (governança DSS)",
      "Wrapper <div> separa classes DSS do elemento raiz QFab",
      "Repassa modelValue / update:modelValue para v-model",
      "Slot default reservado para DssFabAction (EXC-01 temporária)",
      "Aria-label repassado ao trigger interno do QFab",
    ],
    tokens: [],
    codeExample: `<template>
  <div :class="fabClasses" v-bind="$attrs">
    <q-fab
      class="dss-fab__qfab"
      :model-value="modelValue"
      :color="color"
      :icon="icon"
      :active-icon="activeIcon"
      :label="label"
      :direction="direction"
      :persistent="persistent"
      :disable="disable"
      @update:model-value="(v) => emit('update:modelValue', v)"
    >
      <slot />
    </q-fab>
  </div>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Override de border-radius, elevação e transição do QFab nativo. Apenas tokens genéricos — sem variantes, sem brand, sem estado.",
    responsibilities: [
      "Border-radius circular/pill via --dss-radius-full",
      "Elevação padrão via --dss-elevation-2",
      "Transição via --dss-duration-200 + --dss-easing-standard",
      "Override de seletores Quasar internos (.q-fab__trigger) — EXC-Gate documentada",
    ],
    tokens: ["--dss-radius-full", "--dss-elevation-2", "--dss-duration-200", "--dss-easing-standard"],
    codeExample: `.dss-fab .dss-fab__qfab .q-fab__trigger {
  border-radius: var(--dss-radius-full);
  box-shadow: var(--dss-elevation-2);
  transition:
    box-shadow var(--dss-duration-200) var(--dss-easing-standard),
    transform var(--dss-duration-200) var(--dss-easing-standard);
}`,
  },
  variants: {
    files: ["3-variants/_variant.scss", "3-variants/index.scss"],
    description: "Variantes visuais: Extended FAB (com label) e direções de expansão. Sem cor, sem brand, sem estado.",
    responsibilities: [
      "Extended (--extended): pill shape quando label preenchido",
      "Direction up/down/left/right: orquestra animação das ações filhas",
      "Vertical actions align: posicionamento horizontal das ações em direction up/down",
      "Mutuamente exclusivas por convenção (uma direction por vez)",
    ],
    tokens: ["--dss-radius-full", "--dss-spacing-3", "--dss-spacing-4"],
    codeExample: `.dss-fab--extended .q-fab__trigger {
  border-radius: var(--dss-radius-full); /* pill */
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
}

.dss-fab--direction-right .q-fab__actions {
  flex-direction: row;
}

.dss-fab--direction-down .q-fab__actions {
  flex-direction: column;
}`,
  },
  output: {
    files: ["4-output/_states.scss", "4-output/_brands.scss", "4-output/index.scss"],
    description: "Camada final: estados (hover, focus, active, disabled), dark mode, high contrast, forced-colors e brands Sansys (Hub, Water, Waste).",
    responsibilities: [
      "Hover: elevação aumenta para --dss-elevation-3",
      "Focus-visible: ring via --dss-focus-ring",
      "Disabled: opacidade --dss-opacity-disabled (0.4)",
      "Dark mode via [data-theme='dark']",
      "Brands aplicam acento via border-left-width: --dss-border-width-thick",
      "Forced-colors: 1px solid ButtonBorder (EXC-States-01)",
    ],
    tokens: ["--dss-elevation-3", "--dss-focus-ring", "--dss-opacity-disabled", "--dss-border-width-thick", "--dss-hub-600", "--dss-water-500", "--dss-waste-600"],
    codeExample: `.dss-fab .q-fab__trigger:hover {
  box-shadow: var(--dss-elevation-3);
}

.dss-fab--disabled {
  opacity: var(--dss-opacity-disabled);
  pointer-events: none;
}

.dss-fab--brand-hub .q-fab__trigger {
  background-color: var(--dss-hub-600);
}

@media (forced-colors: active) {
  .dss-fab .q-fab__trigger {
    border: 1px solid ButtonBorder;
  }
}`,
  },
};

// ============================================================================
// PREVIEW DO FAB (simulado em React, baseado nos tokens DSS)
// ============================================================================

interface DssFabPreviewProps {
  color?: string;
  label?: string;
  direction?: string;
  disable?: boolean;
  expanded?: boolean;
  brand?: string;
  template?: string;
  isDarkMode?: boolean;
}

function DssFabPreview({
  color = "primary",
  label = "",
  direction = "up",
  disable = false,
  expanded = true,
  brand = "none",
  template = "actions3",
  isDarkMode = false,
}: DssFabPreviewProps) {
  const pageBg = isDarkMode ? "hsl(0 0% 9%)" : "hsl(0 0% 96%)";
  const surfaceBg = isDarkMode ? "hsl(0 0% 14%)" : "hsl(0 0% 100%)";
  const dividerColor = isDarkMode ? "hsl(0 0% 22%)" : "hsl(0 0% 90%)";
  const subtleColor = isDarkMode ? "hsl(0 0% 60%)" : "hsl(0 0% 40%)";
  const textColor = isDarkMode ? "hsl(0 0% 88%)" : "hsl(0 0% 10%)";

  // Mapa simplificado de cores semânticas → HSL aproximada
  const colorMap: Record<string, string> = {
    primary: "hsl(220 90% 50%)",
    secondary: "hsl(280 60% 50%)",
    positive: "hsl(120 60% 38%)",
    negative: "hsl(0 75% 50%)",
    warning: "hsl(35 95% 50%)",
    info: "hsl(200 80% 45%)",
  };

  // Brand override (aplica acento por borda esquerda)
  const brandColorMap: Record<string, string> = {
    hub: "hsl(25 95% 50%)",
    water: "hsl(200 85% 45%)",
    waste: "hsl(140 60% 40%)",
  };

  const triggerBg = colorMap[color] || colorMap.primary;
  const isExtended = label.trim().length > 0;
  const showActions = expanded && !disable && template !== "noActions";

  const actionsByTemplate: Record<string, Array<{ icon: typeof Edit3; label: string; bg: string }>> = {
    actions3: [
      { icon: Edit3, label: "Editar", bg: "hsl(200 80% 45%)" },
      { icon: Share2, label: "Compartilhar", bg: "hsl(280 60% 50%)" },
      { icon: Trash2, label: "Excluir", bg: "hsl(0 75% 50%)" },
    ],
    actions4: [
      { icon: Edit3, label: "Editar", bg: "hsl(200 80% 45%)" },
      { icon: Share2, label: "Compartilhar", bg: "hsl(280 60% 50%)" },
      { icon: Copy, label: "Copiar", bg: "hsl(120 60% 38%)" },
      { icon: Mail, label: "Email", bg: "hsl(35 95% 50%)" },
    ],
    noActions: [],
  };

  const actions = actionsByTemplate[template] || actionsByTemplate.actions3;

  // Ícone do trigger
  const TriggerIcon = expanded ? X : Plus;

  // Estilo do trigger (FAB principal)
  const triggerSize = isExtended ? undefined : 56;
  const triggerStyle: React.CSSProperties = {
    backgroundColor: triggerBg,
    color: "#ffffff",
    width: triggerSize,
    height: triggerSize,
    minWidth: 56,
    minHeight: 56,
    borderRadius: 9999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: isExtended ? 8 : 0,
    padding: isExtended ? "0 20px" : 0,
    boxShadow: isDarkMode
      ? "0 4px 12px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)"
      : "0 4px 12px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.10)",
    cursor: disable ? "not-allowed" : "pointer",
    opacity: disable ? 0.4 : 1,
    border: brand !== "none" ? `3px solid ${brandColorMap[brand]}` : "none",
    transition: "all 200ms ease",
    fontWeight: 600,
    fontSize: 14,
    fontFamily: "inherit",
    position: "relative",
    zIndex: 2,
  };

  // Estilo das ações filhas
  const actionStyle = (bg: string): React.CSSProperties => ({
    backgroundColor: bg,
    color: "#ffffff",
    width: 44,
    height: 44,
    borderRadius: 9999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: isDarkMode
      ? "0 3px 8px rgba(0,0,0,0.5)"
      : "0 3px 8px rgba(0,0,0,0.18)",
    cursor: "pointer",
    transition: "all 150ms ease",
    border: "none",
  });

  // Layout do container de ações conforme direction
  const isVertical = direction === "up" || direction === "down";
  const actionsContainerStyle: React.CSSProperties = {
    display: showActions ? "flex" : "none",
    flexDirection: isVertical ? "column" : "row",
    gap: 12,
    alignItems: "center",
    position: "absolute",
    ...(direction === "up" && { bottom: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)" }),
    ...(direction === "down" && { top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)" }),
    ...(direction === "left" && { right: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)" }),
    ...(direction === "right" && { left: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)" }),
  };

  const orderedActions = direction === "up" || direction === "left" ? [...actions].reverse() : actions;

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
      aria-label="Preview de DssFab"
    >
      {/* Header simulando contexto de página */}
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
        Sansys Application — Conteúdo da página
      </div>

      {/* Área central — FAB renderizado no fluxo (não-fixed para fins do playground) */}
      <div
        style={{
          flex: 1,
          minHeight: 360,
          padding: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            type="button"
            style={triggerStyle}
            disabled={disable}
            aria-expanded={expanded}
            aria-label={label || "Ações"}
          >
            <TriggerIcon size={isExtended ? 18 : 22} />
            {isExtended && <span>{label}</span>}
          </button>

          {/* Ações filhas */}
          <div style={actionsContainerStyle} aria-hidden={!showActions}>
            {orderedActions.map((a, i) => {
              const ActionIcon = a.icon;
              return (
                <button
                  key={i}
                  type="button"
                  style={actionStyle(a.bg)}
                  aria-label={a.label}
                  title={a.label}
                >
                  <ActionIcon size={18} />
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 16,
            fontSize: 11,
            color: subtleColor,
            fontFamily: "monospace",
          }}
        >
          color=<code>{color}</code> · direction=<code>{direction}</code>
          {isExtended && <> · extended</>}
          {disable && <> · disabled</>}
          {brand !== "none" && <> · brand={brand}</>}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssFabPage() {
  const [selectedColor, setSelectedColor] = useState("primary");
  const [selectedDirection, setSelectedDirection] = useState("up");
  const [selectedBrand, setSelectedBrand] = useState("none");
  const [selectedTemplate, setSelectedTemplate] = useState("actions3");
  const [labelText, setLabelText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fabBooleans, setFabBooleans] = useState({
    expanded: true,
    disable: false,
    persistent: false,
  });

  const toggleFabBoolean = (name: string) => {
    setFabBooleans((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  // ===== Geração de código (PLAYGROUND_STANDARD v3.2) =====
  const generateCode = () => {
    const props: string[] = [];
    props.push(`v-model="fabOpen"`);
    if (selectedColor !== "primary") props.push(`color="${selectedColor}"`);
    if (labelText.trim()) props.push(`label="${labelText.trim()}"`);
    if (selectedDirection !== "up") props.push(`direction="${selectedDirection}"`);
    if (fabBooleans.persistent) props.push("persistent");
    if (fabBooleans.disable) props.push(":disable=\"true\"");
    if (selectedBrand !== "none") props.push(`brand="${selectedBrand}"`);
    props.push(`aria-label="Ações principais"`);

    const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";

    const actionTemplates: Record<string, string> = {
      actions3: `  <!-- EXC-01: <q-fab-action> temporário até DssFabAction (Nível 3) -->
  <q-fab-action color="info" icon="edit" label="Editar" />
  <q-fab-action color="secondary" icon="share" label="Compartilhar" />
  <q-fab-action color="negative" icon="delete" label="Excluir" />`,
      actions4: `  <q-fab-action color="info" icon="edit" label="Editar" />
  <q-fab-action color="secondary" icon="share" label="Compartilhar" />
  <q-fab-action color="positive" icon="content_copy" label="Copiar" />
  <q-fab-action color="warning" icon="mail" label="Email" />`,
      noActions: `  <!-- FAB simples sem ações filhas -->`,
    };

    return `<DssPageSticky position="bottom-right" :offset="[24, 24]">
  <DssFab${propsStr}>
${actionTemplates[selectedTemplate] || actionTemplates.actions3}
  </DssFab>
</DssPageSticky>`;
  };

  const fabToggles = [
    { name: "expanded", label: "Expanded (v-model)" },
    { name: "disable", label: "Disabled" },
    { name: "persistent", label: "Persistent" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: PAGE HEADER
       * ================================================================ */}
      <PageHeader
        icon={Plus}
        badge="v2.2.0"
        badgeVariant="info"
        title="Componente"
        titleAccent="DssFab"
        subtitle="DssFab é o Floating Action Button governado do DSS, wrapper sobre QFab. Componente de Nível 2 (composição de primeiro grau): gerencia estado de expansão (aberto/fechado) e orquestra a direção da animação das ações filhas. Sempre elevado por baseline Material Design — variantes flat, outline e unelevated são bloqueadas. Posicionamento fixo é responsabilidade do DssPageSticky."
        subtitleHighlights={["Nível 2", "sempre elevado", "DssPageSticky"]}
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
              "Ação principal e flutuante de uma tela (ex.: criar, adicionar)",
              "Múltiplas ações relacionadas que podem ser agrupadas em um único trigger",
              "Telas mobile-first onde a barra de ações fixa precisa ser destacada",
              "Quando o conteúdo da página rola e a ação primária precisa permanecer visível",
              "Extended FAB (com label) para reforçar a ação principal em desktop",
              "Ações contextuais por seção (com DssPageSticky scoped)",
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
                { scenario: "Ação inline em formulário ou tabela", alt: "DssButton" },
                { scenario: "Conjunto de ações horizontais agrupadas", alt: "DssBtnGroup" },
                { scenario: "Botão com menu suspenso de opções", alt: "DssBtnDropdown" },
                { scenario: "Mais de um FAB na mesma tela", alt: "Apenas 1 FAB primário por tela" },
                { scenario: "Ação destrutiva isolada sem contexto", alt: "DssButton color=\"negative\"" },
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
        title="Configure o FAB"
        description="Cor, label, direção, brand e estados do trigger. As ações filhas (DssFabAction) são simuladas via templates de composição."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="380px"
        previewContent={
          <DssFabPreview
            color={selectedColor}
            label={labelText}
            direction={selectedDirection}
            disable={fabBooleans.disable}
            expanded={fabBooleans.expanded}
            brand={selectedBrand}
            template={selectedTemplate}
            isDarkMode={isDarkMode}
          />
        }
        controls={
          <ControlGrid columns={4}>
            <VariantSelector
              label="FAB · Color"
              variants={colors}
              selectedVariant={selectedColor}
              onSelect={setSelectedColor}
            />

            <ControlSection label="Direction">
              {directions.map((d) => (
                <PlaygroundButton
                  key={d.name}
                  onClick={() => setSelectedDirection(d.name)}
                  isSelected={selectedDirection === d.name}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {d.label}
                </PlaygroundButton>
              ))}
            </ControlSection>

            <ControlSection label="Brand">
              {brands.map((b) => (
                <PlaygroundButton
                  key={b.name}
                  onClick={() => setSelectedBrand(b.name)}
                  isSelected={selectedBrand === b.name}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {b.label}
                </PlaygroundButton>
              ))}
            </ControlSection>

            <ToggleGroup
              label="Estados"
              options={fabToggles}
              values={fabBooleans}
              onToggle={toggleFabBoolean}
            />

            <ControlSection label="Label (Extended FAB)">
              <input
                type="text"
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                placeholder="ex.: Nova Ação"
                className="w-full px-3 py-2 rounded-md text-sm font-mono"
                style={{
                  backgroundColor: "var(--jtech-code-bg)",
                  color: "var(--jtech-text-body)",
                  border: "1px solid var(--jtech-card-border)",
                  outline: "none",
                }}
              />
              <p className="text-xs mt-1" style={{ color: "var(--jtech-text-muted)" }}>
                Preencher transforma o FAB em pill (Extended).
              </p>
            </ControlSection>

            <ControlSection label="Composição (Ações)">
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
              { state: "Default (colapsado)", visual: "Trigger circular (ou pill se extended) com ícone padrão", applicability: "modelValue=false", tokens: "--dss-elevation-2, --dss-radius-full" },
              { state: "Expanded", visual: "Active-icon visível + ações filhas em cascata", applicability: "modelValue=true", tokens: "Coreografia gerenciada pelo QFab" },
              { state: "Hover", visual: "Elevação aumentada", applicability: "Sempre (no trigger)", tokens: "--dss-elevation-3" },
              { state: "Focus", visual: "Ring de foco visível", applicability: "Navegação por teclado", tokens: "--dss-focus-ring (light), --dss-focus-ring-dark (dark)" },
              { state: "Active", visual: "Trigger com leve depressão", applicability: ":active", tokens: "Transform scale(0.96)" },
              { state: "Disabled", visual: "Opacidade reduzida, sem interação", applicability: "disable=true", tokens: "--dss-opacity-disabled (0.4)" },
              { state: "Extended", visual: "Pill shape com label visível", applicability: "label preenchido", tokens: "--dss-radius-full + padding interno" },
              { state: "Persistent", visual: "Não fecha ao clicar fora", applicability: "persistent=true", tokens: "Comportamento nativo QFab" },
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
      <AnatomySection componentName="DssFab" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS
       * ================================================================ */}

      {/* Props API */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Eventos">
        <div className="space-y-6 pt-4">
          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>DssFab — Props Expostas</h4>
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
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Prop QFab</TableHead>
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
                <TableCell style={{ color: "var(--jtech-text-body)" }}>DssFabAction (Nível 3 — futuro). Temporariamente aceita &lt;q-fab-action&gt; nativo (EXC-01).</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Proibido HTML nativo solto, DssButton ou texto direto. A composição é exclusiva de DssFabAction.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* Tokens */}
      <CollapsibleSection icon={Code} title="Tokens">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            DssFab consome os seguintes tipos de tokens DSS:
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
                { type: "Border Radius", role: "Shape circular (FAB padrão) / pill (Extended FAB) — --dss-radius-full", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Elevação", role: "Sombra padrão (--dss-elevation-2) e hover/active (--dss-elevation-3)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Duração e easing das transições (--dss-duration-200, --dss-easing-standard)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Opacidade", role: "Estado disabled (--dss-opacity-disabled = 0.4)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Foco", role: "Ring de foco WCAG 2.4.7 (--dss-focus-ring / --dss-focus-ring-dark)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Acento de marca via border-left-width (--dss-border-width-thick)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Hub (--dss-hub-600/400), Water (--dss-water-500/400), Waste (--dss-waste-600/500)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Cores Semânticas", role: "primary, secondary, positive, negative, warning, info — via prop color", ref: "Quasar palette + DSS overrides" },
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
                "aria-expanded e aria-haspopup gerenciados nativamente pelo QFab",
                "aria-label repassado ao trigger interno",
                "Touch target mínimo 56x56px (FAB padrão) / 48px de altura mínima (Extended)",
                "Focus-visible com ring via --dss-focus-ring (WCAG 2.4.7)",
                "Navegação por teclado: Tab para focar, Enter/Space para abrir, Esc para fechar",
                "Suporte a prefers-contrast: high (borda reforçada)",
                "Suporte a forced-colors: active (Windows High Contrast — EXC-States-01)",
                "Dark mode global respeitado via tokens",
                "Estado disabled bloqueia interação (pointer-events: none)",
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
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "1.4.11 Contraste de Componentes Não-Textuais", level: "AA" },
                  { criterion: "2.1.1 Teclado", level: "A" },
                  { criterion: "2.4.7 Foco Visível", level: "AA" },
                  { criterion: "2.5.5 Tamanho do Alvo (Target Size)", level: "AAA" },
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
  .dss-fab .q-fab__trigger {
    border: var(--dss-border-width-md) solid currentColor;
  }
}

@media (forced-colors: active) {
  .dss-fab .q-fab__trigger {
    border: 1px solid ButtonBorder; /* EXC-States-01 */
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
              title: "Usar DssButton ou HTML nativo no slot do DssFab",
              wrong: '<DssFab v-model="open">\n  <DssButton icon="edit" />\n  <button>Compartilhar</button>\n</DssFab>',
              correct: '<DssFab v-model="open">\n  <q-fab-action color="info" icon="edit" label="Editar" />\n  <q-fab-action color="secondary" icon="share" label="Compartilhar" />\n</DssFab>',
              reason: "Gate de Composição v2.4 — slot default do DssFab é exclusivo para DssFabAction (Nível 3). Enquanto não existe, EXC-01 permite <q-fab-action> nativo temporariamente.",
            },
            {
              title: "Aplicar variantes flat/outline/unelevated",
              wrong: '<DssFab flat color="primary" />\n<DssFab outline />\n<DssFab unelevated />',
              correct: '<DssFab color="primary" icon="add" aria-label="Nova ação" />',
              reason: "FAB no DSS é sempre elevado (Material Design baseline). As props flat, outline e unelevated estão bloqueadas — variantes sem elevação não fazem sentido semântico para uma ação flutuante primária.",
            },
            {
              title: "Posicionar o DssFab manualmente com style fixed",
              wrong: '<DssFab style="position: fixed; bottom: 24px; right: 24px" />',
              correct: '<DssPageSticky position="bottom-right" :offset="[24, 24]">\n  <DssFab color="primary" />\n</DssPageSticky>',
              reason: "Posicionamento fixo é responsabilidade do DssPageSticky (Nível 3). Posicionar via style inline quebra a governança de layout e não respeita safe-areas mobile.",
            },
            {
              title: "Múltiplos FABs primários na mesma tela",
              wrong: '<DssFab color="primary" icon="add" />\n<DssFab color="positive" icon="check" />\n<DssFab color="negative" icon="delete" />',
              correct: '<DssFab color="primary" icon="add" aria-label="Ações">\n  <q-fab-action color="positive" icon="check" />\n  <q-fab-action color="negative" icon="delete" />\n</DssFab>',
              reason: "Cada tela deve ter no máximo 1 FAB primário. Ações secundárias devem ser agrupadas como filhas do mesmo FAB, expandindo via direction.",
            },
            {
              title: "Omitir aria-label em FAB sem texto",
              wrong: '<DssFab icon="add" color="primary" />',
              correct: '<DssFab icon="add" color="primary" aria-label="Criar novo registro" />',
              reason: "FABs sem label visível dependem de aria-label para leitores de tela (WCAG 4.1.2 — Nome, Função, Valor). Sem ele, a ação fica anônima para usuários assistivos.",
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssFab</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Gate de Responsabilidade v2.4", application: "DssFab gerencia estado de expansão e direção da animação. NÃO posiciona (DssPageSticky) nem executa ações finais (DssFabAction)." },
                { rule: "Gate de Composição v2.4", application: "Slot default exclusivo para DssFabAction. EXC-01 permite <q-fab-action> nativo enquanto DssFabAction não existe." },
                { rule: "Pseudo-elementos (::before / ::after)", application: "::before reservado para touch target (WCAG 2.5.5). ::after disponível para overlays de hover/active se necessário." },
                { rule: "Uso de brightness()", application: "Não utilizado — variantes usam tokens de elevation diretamente." },
                { rule: "Classificação do componente", application: "Composição de Primeiro Grau (Nível 2). Golden Reference: DssChip. Golden Context: DssBtnDropdown (mesmo padrão de trigger + painel expansível)." },
                { rule: "Brandabilidade", application: "Própria — consome tokens --dss-hub-*, --dss-water-*, --dss-waste-* via prop brand. Acento aplicado por border-left-width (--dss-border-width-thick)." },
                { rule: "Tokens genéricos para altura", application: "FAB usa baseline Material Design (56x56) — touch target nativo. Não cria tokens específicos --dss-fab-size-*." },
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
                  { id: "EXC-01", value: "<q-fab-action> nativo em exemplos", reason: "DssFabAction (Nível 3) ainda não existe. Permitido usar <q-fab-action> nativo temporariamente em DssFab.example.vue. Será removida quando DssFabAction for selado." },
                  { id: "EXC-Gate", value: ".q-fab__trigger / .q-fab__actions", reason: "Seletores Quasar internos necessários para override de elevação, shape e layout das ações. Gate de Composição v2.4 não se aplica a internos Quasar. Precedente: DssBtnDropdown gateExceptions." },
                  { id: "EXC-States-01", value: "1px solid ButtonBorder", reason: "Forced-colors mode (Windows High Contrast) — system color keywords obrigatórios. Tokens CSS são ignorados neste modo. Padrão DssCard EXC-04." },
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
              "pre_prompt_dss_fab.md",
              "DssFab.ts.vue (1-structure)",
              "DSSFAB_API.md",
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md (Golden Reference: DssChip)",
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
