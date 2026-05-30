import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  MenuIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  Shield,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

import {
  DssPlayground,
  ControlGrid,
  ControlSection,
  ToggleGroup,
} from "@/components/ui/playground";

// ============================================================================
// DADOS ESPECÍFICOS DO DSSMENU
// ============================================================================

const anchorOptions = [
  { name: "bottom-left", label: "Bottom Left", value: "bottom left", isDefault: true },
  { name: "bottom-middle", label: "Bottom Middle", value: "bottom middle" },
  { name: "bottom-right", label: "Bottom Right", value: "bottom right" },
  { name: "top-left", label: "Top Left", value: "top left" },
  { name: "top-middle", label: "Top Middle", value: "top middle" },
  { name: "center-left", label: "Center Left", value: "center left" },
  { name: "center-right", label: "Center Right", value: "center right" },
];

const selfOptions = [
  { name: "top-left", label: "Top Left", value: "top left", isDefault: true },
  { name: "top-middle", label: "Top Middle", value: "top middle" },
  { name: "top-right", label: "Top Right", value: "top right" },
  { name: "bottom-left", label: "Bottom Left", value: "bottom left" },
  { name: "bottom-middle", label: "Bottom Middle", value: "bottom middle" },
  { name: "center-left", label: "Center Left", value: "center left" },
  { name: "center-right", label: "Center Right", value: "center right" },
];

const propsData = [
  { category: "Visibilidade", prop: "modelValue", type: "Boolean", default: "false", description: "Controle de visibilidade do menu (v-model)" },
  { category: "Layout", prop: "fit", type: "Boolean", default: "false", description: "Menu com mesma largura do elemento disparador" },
  { category: "Layout", prop: "cover", type: "Boolean", default: "false", description: "Menu cobre o elemento disparador" },
  { category: "Posicionamento", prop: "anchor", type: "MenuPosition", default: "undefined", description: "Ponto de ancoragem do trigger (ex: 'bottom left')" },
  { category: "Posicionamento", prop: "self", type: "MenuPosition", default: "undefined", description: "Ponto de alinhamento do menu (ex: 'top left')" },
  { category: "Posicionamento", prop: "offset", type: "[number, number]", default: "undefined", description: "Deslocamento [x, y] em pixels do ponto de ancoragem" },
];

const anatomyData = {
  structure: {
    files: ["DssMenu.ts.vue"],
    description: "Camada responsável pelo template Vue, definição de props e interface do componente.",
    responsibilities: [
      "Definição do template HTML semântico (q-menu como root element)",
      "Declaração de props com validação TypeScript",
      "Emissão de eventos (update:modelValue, show, hide)",
      "Binding de slots (default)",
      "Composables useMenuClasses",
      "inheritAttrs: false com v-bind=\"$attrs\" para repasse ao q-menu",
    ],
    tokens: [],
    codeExample: `<template>
  <q-menu
    :class="menuClasses"
    :model-value="props.modelValue"
    :fit="props.fit"
    :cover="props.cover"
    :anchor="props.anchor"
    :self="props.self"
    :offset="props.offset"
    v-bind="$attrs"
    @update:model-value="emit('update:modelValue', $event)"
    @show="emit('show', $event)"
    @hide="emit('hide', $event)"
  >
    <slot />
  </q-menu>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Estilos fundamentais que definem o layout do menu overlay.",
    responsibilities: [
      "Background com --dss-surface-default",
      "Border-radius com --dss-radius-md",
      "Box-shadow com --dss-elevation-3 para overlay",
      "Reset de estilos nativos do q-menu",
    ],
    tokens: ["--dss-surface-default", "--dss-radius-md", "--dss-elevation-3", "--dss-border-width-thin"],
    codeExample: `.dss-menu {
  background-color: var(--dss-surface-default);
  border-radius: var(--dss-radius-md);
  box-shadow: var(--dss-elevation-3);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  min-width: 160px;
}`,
  },
  variants: {
    files: ["3-variants/_positions.scss"],
    description: "Define as variações de posicionamento do menu em relação ao trigger.",
    responsibilities: [
      "Ajustes de margin/padding para diferentes posições de anchor/self",
      "Animações de entrada/saída por direção (via transition-show/hide)",
    ],
    tokens: ["--dss-spacing-1", "--dss-spacing-2", "--dss-duration-fast"],
    codeExample: `/* Posicionamento gerenciado pelo Quasar (QMenu) */
/* DSS aplica tokens de spacing e border-radius consistentes */`,
  },
  output: {
    files: ["4-output/_states.scss", "_brands.scss"],
    description: "Camada final que aplica estados de tema e acessibilidade ao menu teleportado.",
    responsibilities: [
      "Dark mode via [data-theme=\"dark\"] no body (teleportado)",
      "Estilos de itens ativos/hover dentro do menu",
      "Suporte a prefers-reduced-motion nas transições",
    ],
    tokens: ["--dss-surface-overlay", "--dss-text-primary", "--dss-transition-base"],
    codeExample: `@media (prefers-reduced-motion: reduce) {
  .dss-menu {
    transition: none !important;
  }
}`,
  },
};

// ============================================================================
// COMPONENTE DE PREVIEW DO MENU
// ============================================================================

interface DssMenuPreviewProps {
  anchor?: string;
  self?: string;
  fit?: boolean;
  cover?: boolean;
  offset?: [number, number];
}

function DssMenuPreview({
  anchor = "bottom left",
  self = "top left",
  fit = false,
  cover = false,
  offset = [0, 8],
}: DssMenuPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "relative",
      display: "inline-block",
    };
    return base;
  };

  const getMenuStyles = (): React.CSSProperties => {
    const menuStyle: React.CSSProperties = {
      position: "absolute",
      backgroundColor: "var(--jtech-card-bg)",
      border: "1px solid var(--jtech-card-border)",
      borderRadius: "8px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      minWidth: fit ? "100%" : "180px",
      zIndex: 1000,
      padding: "8px 0",
      transition: "opacity 0.15s ease, transform 0.15s ease",
    };

    // Simple position mapping for demo
    if (anchor.includes("bottom") && self.includes("top")) {
      menuStyle.top = "calc(100% + " + offset[1] + "px)";
      menuStyle.left = offset[0] + "px";
    } else if (anchor.includes("top") && self.includes("bottom")) {
      menuStyle.bottom = "calc(100% + " + offset[1] + "px)";
      menuStyle.left = offset[0] + "px";
    } else if (anchor.includes("center") && self.includes("center")) {
      menuStyle.top = "50%";
      menuStyle.left = "50%";
      menuStyle.transform = "translate(-50%, -50%)";
    } else {
      menuStyle.top = "calc(100% + " + offset[1] + "px)";
      menuStyle.left = offset[0] + "px";
    }

    if (cover) {
      menuStyle.top = 0;
      menuStyle.left = 0;
      menuStyle.width = "100%";
    }

    return menuStyle;
  };

  return (
    <div className="flex items-center justify-center min-h-[240px]">
      <div style={getPositionStyles()}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 rounded-md font-medium text-sm transition-all"
          style={{
            backgroundColor: isOpen ? "var(--dss-jtech-accent)" : "var(--jtech-card-bg)",
            color: isOpen ? "#ffffff" : "var(--jtech-text-body)",
            border: "1px solid var(--jtech-card-border)",
            cursor: "pointer",
          }}
        >
          Abrir Menu
        </button>
        {isOpen && (
          <div style={getMenuStyles()}>
            <div className="px-3 py-2 text-sm font-medium" style={{ color: "var(--jtech-heading-tertiary)", borderBottom: "1px solid var(--jtech-card-border)" }}>
              Menu de Ações
            </div>
            {[
              { label: "Editar", icon: "✏️" },
              { label: "Duplicar", icon: "📋" },
              { label: "Excluir", icon: "🗑️", danger: true },
            ].map((item, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2"
                style={{
                  color: item.danger ? "var(--dss-negative)" : "var(--jtech-text-body)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = "var(--jtech-hover-bg, rgba(255,255,255,0.05))";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <div
              className="absolute inset-0"
              style={{ zIndex: -1 }}
              onClick={() => setIsOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssMenuPage() {
  const [selectedAnchor, setSelectedAnchor] = useState("bottom-left");
  const [selectedSelf, setSelectedSelf] = useState("top-left");
  const [selectedOffset, setSelectedOffset] = useState<[number, number]>([0, 8]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({
    fit: false,
    cover: false,
  });

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({ ...prev, [name as keyof typeof prev]: !prev[name as keyof typeof prev] }));
  };

  const currentAnchor = anchorOptions.find((a) => a.name === selectedAnchor)?.value || "bottom left";
  const currentSelf = selfOptions.find((s) => s.name === selectedSelf)?.value || "top left";

  const generateCode = () => {
    const props: string[] = [];
    if (booleanStates.fit) props.push("fit");
    if (booleanStates.cover) props.push("cover");
    if (currentAnchor !== "bottom left") props.push(`anchor="${currentAnchor}"`);
    if (currentSelf !== "top left") props.push(`self="${currentSelf}"`);
    if (selectedOffset[0] !== 0 || selectedOffset[1] !== 8) {
      props.push(`:offset="[${selectedOffset[0]}, ${selectedOffset[1]}]"`);
    }
    return `<DssButton label="Ações">
  <DssMenu${props.length > 0 ? "\n    " + props.join("\n    ") : ""}
  >
    <DssList>
      <DssItem label="Editar" clickable v-close-popup />
      <DssItem label="Duplicar" clickable v-close-popup />
      <DssItem label="Excluir" clickable v-close-popup />
    </DssList>
  </DssMenu>
</DssButton>`;
  };

  const stateToggles = [
    { name: "fit", label: "Fit" },
    { name: "cover", label: "Cover" },
  ];

  const offsetOptions = [
    { name: "default", label: "[0, 8]", value: [0, 8] as [number, number] },
    { name: "spread", label: "[8, 12]", value: [8, 12] as [number, number] },
    { name: "tight", label: "[0, 4]", value: [0, 4] as [number, number] },
    { name: "far", label: "[16, 24]", value: [16, 24] as [number, number] },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO
       * ================================================================ */}
      <PageHeader
        icon={MenuIcon}
        badge="Golden Reference: DssTooltip"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssMenu"
        subtitle="DssMenu é o componente overlay de navegação contextual, utilizado para exibir listas de ações e opções acionadas a partir de um elemento disparador. Ele teleporta seu conteúdo para o body, garantindo correta renderização sobre qualquer z-index, e se integra naturalmente a DssButton, DssList e DssItem para menus dropdown completos."
        subtitleHighlights={["overlay de navegação contextual", "teleport para body", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v1.0.0", variant: "info" },
          { label: "DSS Selo Aprovado", variant: "success" },
        ]}
      />

      {/* ================================================================
       * SEÇÃO 2: QUANDO USAR / QUANDO NÃO USAR
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
              "Menus dropdown de ações em botões e icon buttons",
              "Context menus em listas, tabelas e cards",
              "Menus de usuário em headers e avatares",
              "Seleção de opções em filtros e ordenação",
              "Menus de configuração rápida em widgets",
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
                { scenario: "Navegação principal da aplicação", alt: "DssDrawer ou DssTabs" },
                { scenario: "Seleção única com poucas opções visíveis", alt: "DssSelect ou DssToggle" },
                { scenario: "Diálogo com formulário complexo", alt: "DssDialog" },
                { scenario: "Tooltip informativo sem ações", alt: "DssTooltip" },
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
       * SEÇÃO 3: PLAYGROUND INTERATIVO
       * ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o Menu"
        description="Ajuste as props de posicionamento e veja o resultado em tempo real."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssMenuPreview
            anchor={currentAnchor}
            self={currentSelf}
            fit={booleanStates.fit}
            cover={booleanStates.cover}
            offset={selectedOffset}
          />
        }
        controls={
          <ControlGrid columns={4}>
            <ControlSection label="Anchor (Trigger)">
              {anchorOptions.map((a) => (
                <button
                  key={a.name}
                  onClick={() => setSelectedAnchor(a.name)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: selectedAnchor === a.name ? "var(--dss-jtech-accent)" : "transparent",
                    color: selectedAnchor === a.name ? "#ffffff" : "var(--jtech-text-body)",
                    borderColor: selectedAnchor === a.name ? "var(--dss-jtech-accent)" : "var(--jtech-card-border)",
                  }}
                >
                  {a.label}
                </button>
              ))}
            </ControlSection>

            <ControlSection label="Self (Menu)">
              {selfOptions.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setSelectedSelf(s.name)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: selectedSelf === s.name ? "var(--dss-jtech-accent)" : "transparent",
                    color: selectedSelf === s.name ? "#ffffff" : "var(--jtech-text-body)",
                    borderColor: selectedSelf === s.name ? "var(--dss-jtech-accent)" : "var(--jtech-card-border)",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </ControlSection>

            <ControlSection label="Offset">
              {offsetOptions.map((o) => (
                <button
                  key={o.name}
                  onClick={() => setSelectedOffset(o.value)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: selectedOffset[0] === o.value[0] && selectedOffset[1] === o.value[1] ? "var(--dss-jtech-accent)" : "transparent",
                    color: selectedOffset[0] === o.value[0] && selectedOffset[1] === o.value[1] ? "#ffffff" : "var(--jtech-text-body)",
                    borderColor: selectedOffset[0] === o.value[0] && selectedOffset[1] === o.value[1] ? "var(--dss-jtech-accent)" : "var(--jtech-card-border)",
                  }}
                >
                  {o.label}
                </button>
              ))}
            </ControlSection>

            <ToggleGroup
              label="Layout"
              options={stateToggles}
              values={booleanStates}
              onToggle={toggleBooleanState}
            />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* ================================================================
       * SEÇÃO 4: ESTADOS INTERATIVOS
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
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Interação</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Tokens Aplicados</TableHead>
              <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Acessibilidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { state: "Default", visual: "Menu fechado, trigger visível", interaction: "Pronto para abertura", tokens: "—", a11y: "—" },
              { state: "Open", visual: "Menu exposto com shadow e border-radius", interaction: "Click no trigger ou programático", tokens: "--dss-elevation-3, --dss-radius-md", a11y: "aria-expanded=true no trigger" },
              { state: "Hover Item", visual: "Background sutil no item sob cursor", interaction: "Pointer over item", tokens: "--dss-surface-hover", a11y: "—" },
              { state: "Active Item", visual: "Item pressionado", interaction: "Clique no item", tokens: "--dss-state-active", a11y: "—" },
              { state: "Closed", visual: "Menu oculto com transição de fade", interaction: "Click fora ou seleção de item", tokens: "--dss-duration-fast", a11y: "aria-expanded=false" },
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

      {/* ================================================================
       * SEÇÃO 5: ANATOMIA 4 CAMADAS
       * ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssMenu" layers={anatomyData} />

      {/* ================================================================
       * SEÇÕES TÉCNICAS COLAPSÁVEIS INDEPENDENTES
       * ================================================================ */}

      {/* 7.1 Props API & Eventos */}
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
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>
                    {p.prop}
                  </TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>
                    {p.type}
                  </TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>
                    {p.default}
                  </TableCell>
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
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>update:modelValue</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>boolean</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Sincronização de v-model (abertura/fechamento)</TableCell>
                </TableRow>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>show</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>Event</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Emitido quando o menu termina de abrir</TableCell>
                </TableRow>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>hide</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>Event</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Emitido quando o menu termina de fechar</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7.2 Slots */}
      <CollapsibleSection icon={Code} title="Slots">
        <div className="pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Slot</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Uso Recomendado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>default</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo do menu. Deve conter exclusivamente DssList com DssItems.</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Lista de ações, itens de navegação, opções de configuração</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* 7.3 Tokens */}
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
                { type: "Superfícies", role: "Background do menu overlay", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Elevação", role: "Box-shadow do menu (overlay flutuante)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius e border do menu", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Dimensões", role: "Largura mínima, padding e spacing interno", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Tipografia", role: "Texto dos itens do menu", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transições de abertura/fechamento", ref: "DSS_TOKEN_REFERENCE.md" },
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

      {/* 7.4 Acessibilidade WCAG */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "Foco gerenciado automaticamente pelo Quasar (QMenu)",
                "Escape fecha o menu (WCAG 2.1.1)",
                "Click fora fecha o menu",
                "aria-expanded no trigger",
                "Navegação por teclado entre itens (ArrowUp/Down, Tab)",
                "Contraste mínimo 4.5:1 no texto dos itens",
                "Respeita prefers-reduced-motion",
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
                  { criterion: "2.1.1 Teclado", level: "A" },
                  { criterion: "2.4.3 Ordem do Foco", level: "A" },
                  { criterion: "2.4.7 Foco Visível", level: "AA" },
                  { criterion: "4.1.2 Nome, Função, Valor", level: "A" },
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
          </div>
        </div>
      </CollapsibleSection>

      {/* ================================================================
       * SEÇÃO 8: ANTI-PATTERNS
       * ================================================================ */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Usar DssMenu sem DssList como container",
              wrong: "<DssMenu><div>Item 1</div><div>Item 2</div></DssMenu>",
              correct: "<DssMenu><DssList><DssItem label=\"Item 1\" clickable /><DssItem label=\"Item 2\" clickable /></DssList></DssMenu>",
              reason: "O menu espera uma lista estruturada para navegação por teclado e semântica ARIA. Items soltos quebram acessibilidade.",
            },
            {
              title: "Aninhar menus multi-níveis sem composição DSS",
              wrong: "<DssMenu><DssMenu>...</DssMenu></DssMenu>",
              correct: "Usar DssList com DssItem expandable para sub-menus controlados",
              reason: "Menus aninhados diretos criam z-index conflicts e comportamentos de foco imprevisíveis.",
            },
            {
              title: "Esquecer de propagar eventos show/hide para analytics",
              wrong: "<DssMenu v-model=\"open\"><DssList>...</DssList></DssMenu>",
              correct: "<DssMenu v-model=\"open\" @show=\"onMenuOpen\" @hide=\"onMenuClose\"><DssList>...</DssList></DssMenu>",
              reason: "Eventos show/hide são essenciais para rastreamento de uso e analytics de interface.",
            },
            {
              title: "Usar v-model sem tratamento de fechamento externo",
              wrong: "<DssMenu v-model=\"menuOpen\" persistent><DssList>...</DssList></DssMenu>",
              correct: "<DssMenu v-model=\"menuOpen\"><DssList><DssItem v-close-popup /></DssList></DssMenu>",
              reason: "persistent sem mecanismo de fechamento interno trapaça o usuário. Usar v-close-popup nos itens.",
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
                  <pre className="mt-1 p-2 rounded text-xs font-mono" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>
                    {pattern.wrong}
                  </pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>
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

      {/* ================================================================
       * SEÇÃO 9: VINCULANTES DSS v2.2
       * ================================================================ */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.2">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssMenu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "Não aplicável — DssMenu é container overlay não-interativo. Interatividade pertence aos filhos (DssItem, DssButton)." },
                { rule: "Uso de brightness()", application: "Não utilizado — estados de item são controlados via tokens de superfície (--dss-surface-hover)" },
                { rule: "Classificação do componente", application: "Overlay de Navegação (Nível 2 — Composição de Primeiro Grau)" },
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

      {/* ================================================================
       * SEÇÃO 10: REFERÊNCIAS NORMATIVAS
       * ================================================================ */}
      <CollapsibleSection icon={BookOpen} title="Referências" titleAccent="Normativas">
        <div className="pt-4">
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md",
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
