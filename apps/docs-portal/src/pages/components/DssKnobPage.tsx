import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  SlidersHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
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
  ColorPicker,
  BrandPicker,
  SizeSelector,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

// ============================================================================
// DADOS ESPECÍFICOS DO DSSKNOB
// ============================================================================

const sizes = [
  { name: "xs", label: "XS", height: "48px", token: "--dss-compact-control-height-xs" },
  { name: "sm", label: "SM", height: "64px", token: "--dss-compact-control-height-sm" },
  { name: "md", label: "MD", height: "96px", token: "--dss-compact-control-height-md", isDefault: true },
  { name: "lg", label: "LG", height: "128px", token: "--dss-compact-control-height-lg" },
];

const thicknessOptions = [
  { name: "0.1", label: "10%", value: 0.1 },
  { name: "0.2", label: "20%", value: 0.2, isDefault: true },
  { name: "0.35", label: "35%", value: 0.35 },
  { name: "0.5", label: "50%", value: 0.5 },
];

const angleOptions = [
  { name: "0", label: "0°", value: 0, isDefault: true },
  { name: "90", label: "90°", value: 90 },
  { name: "180", label: "180°", value: 180 },
  { name: "270", label: "270°", value: 270 },
];

const propsData = [
  { category: "Valor", prop: "modelValue", type: "Number", default: "0", description: "Valor atual do knob (obrigatório, v-model)" },
  { category: "Valor", prop: "min", type: "Number", default: "0", description: "Valor mínimo permitido" },
  { category: "Valor", prop: "max", type: "Number", default: "100", description: "Valor máximo permitido" },
  { category: "Valor", prop: "innerMin", type: "Number", default: "undefined", description: "Mínimo interno (restringe modelo dentro da trilha)" },
  { category: "Valor", prop: "innerMax", type: "Number", default: "undefined", description: "Máximo interno (restringe modelo dentro da trilha)" },
  { category: "Valor", prop: "step", type: "Number", default: "1", description: "Incremento de valor por interação" },
  { category: "Comportamento", prop: "reverse", type: "Boolean", default: "false", description: "Inverte a direção do progresso" },
  { category: "Comportamento", prop: "instantFeedback", type: "Boolean", default: "false", description: "Desativa animação ao mudar valor" },
  { category: "Comportamento", prop: "readonly", type: "Boolean", default: "false", description: "Apenas leitura — não editável" },
  { category: "Comportamento", prop: "disable", type: "Boolean", default: "false", description: "Desabilitado — não interativo" },
  { category: "Visual", prop: "thickness", type: "Number", default: "0.2", description: "Espessura do arco (razão 0–1 do raio)" },
  { category: "Visual", prop: "angle", type: "Number", default: "0", description: "Ângulo inicial do arco em graus" },
  { category: "Visual", prop: "rounded", type: "Boolean", default: "false", description: "Terminações arredondadas no arco de progresso" },
  { category: "Visual", prop: "size", type: "String", default: "undefined", description: "Tamanho visual (CSS unit, ex: '48px')" },
  { category: "Visual", prop: "showValue", type: "Boolean", default: "true", description: "Exibe o valor no centro do knob" },
  { category: "Visual", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Contexto de marca Sansys" },
  { category: "Acessibilidade", prop: "tabindex", type: "Number | String", default: "null", description: "Índice de tabulação para navegação por teclado" },
  { category: "Acessibilidade", prop: "name", type: "String", default: "null", description: "Nome do campo para formulários nativos" },
];

const anatomyData = {
  structure: {
    files: ["DssKnob.ts.vue"],
    description: "Camada responsável pelo template Vue, definição de props e interface do componente.",
    responsibilities: [
      "Definição do template HTML semântico (QKnob como root element)",
      "Declaração de props com validação TypeScript",
      "Emissão de eventos (update:modelValue, change, drag-value)",
      "Binding de slots (default)",
      "Composables useKnobClasses",
    ],
    tokens: [],
    codeExample: `<template>
  <QKnob
    v-bind="$attrs"
    :class="rootClasses"
    :model-value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :reverse="reverse"
    :readonly="readonly"
    :disable="disable"
    :thickness="thickness"
    :angle="angle"
    :rounded="rounded"
    :size="size"
    :show-value="showValue"
    color="primary"
    track-color="grey-3"
    center-color="white"
    @update:model-value="emit('update:modelValue', $event)"
    @change="emit('change', $event)"
    @drag-value="emit('drag-value', $event)"
  >
    <slot>{{ modelValue }}</slot>
  </QKnob>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss"],
    description: "Estilos fundamentais que definem o layout e reset do componente circular.",
    responsibilities: [
      "Reset de estilos nativos do QKnob",
      "Override de stroke/fill dos arcos SVG via seletores descendentes",
      "Definição de touch target mínimo (::before reservado)",
    ],
    tokens: ["--dss-compact-control-height-xs/sm/md/lg", "--dss-radius-full"],
    codeExample: `.dss-knob {
  /* QKnob IS the root element — no wrapper div */
  /* SVG arcs overridden via descendant selectors */
  .q-circular-progress__circle {
    stroke: var(--dss-action-primary);
  }
  .q-circular-progress__track {
    stroke: var(--dss-surface-muted);
  }
}`,
  },
  variants: {
    files: ["3-variants/_brands.scss"],
    description: "Define as variações visuais do componente: brand colors.",
    responsibilities: [
      "Brand colors: Hub (laranja), Water (azul), Waste (verde)",
      "Override de stroke do arco de progresso por brand",
      "Variante rounded (terminações arredondadas do arco)",
    ],
    tokens: ["--dss-hub-600", "--dss-water-500", "--dss-waste-500"],
    codeExample: `.dss-knob--brand-hub {
  .q-circular-progress__circle {
    stroke: var(--dss-hub-600);
  }
}`,
  },
  output: {
    files: ["4-output/_states.scss", "_brands.scss"],
    description: "Camada final que aplica estados interativos e acessibilidade.",
    responsibilities: [
      "Estados hover, focus, active para knob interativo",
      "Focus ring circular com --dss-focus-ring (border-radius: 50%)",
      "Estado readonly/disable com opacidade reduzida",
      "Suporte a prefers-reduced-motion e forced-colors",
    ],
    tokens: ["--dss-focus-ring", "--dss-opacity-disabled", "--dss-transition-base"],
    codeExample: `.dss-knob:focus-visible {
  outline: 2px solid var(--dss-focus-ring);
  outline-offset: 4px;
  border-radius: 50%;
}

.dss-knob[aria-disabled="true"] {
  opacity: var(--dss-opacity-disabled);
  pointer-events: none;
}`,
  },
};

// ============================================================================
// COMPONENTE DE PREVIEW DO KNOB
// ============================================================================

interface DssKnobPreviewProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  thickness?: number;
  angle?: number;
  reverse?: boolean;
  readonly?: boolean;
  disable?: boolean;
  rounded?: boolean;
  size?: string;
  showValue?: boolean;
  colorKey?: string;
  brand?: string | null;
}

function DssKnobPreview({
  value = 45,
  min = 0,
  max = 100,
  step = 1,
  thickness = 0.2,
  angle = 0,
  reverse = false,
  readonly = false,
  disable = false,
  rounded = false,
  size = "md",
  showValue = true,
  colorKey = "primary",
  brand = null,
}: DssKnobPreviewProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const sizeData = sizes.find((s) => s.name === size) || sizes[2];
  const dimension = parseInt(sizeData.height);
  const strokeWidth = dimension * thickness;
  const radius = (dimension - strokeWidth) / 2;
  const center = dimension / 2;
  const circumference = 2 * Math.PI * radius;

  const normalizedValue = Math.max(min, Math.min(max, currentValue));
  const percentage = (normalizedValue - min) / (max - min);
  const dashOffset = reverse
    ? circumference * (1 - percentage)
    : circumference * (1 - percentage);

  const getColor = () => {
    if (brand && DSS_BRAND_COLORS[brand]) {
      return DSS_BRAND_COLORS[brand].principal;
    }
    if (DSS_SEMANTIC_COLORS[colorKey]) {
      return DSS_SEMANTIC_COLORS[colorKey].bg;
    }
    return "#1f86de";
  };

  const trackColor = disable ? "#d1d5db" : "#e5e7eb";
  const progressColor = disable ? "#9ca3af" : getColor();

  const handleMouseDown = () => {
    if (!disable && !readonly) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (disable || readonly) return;
    const rect = (e.target as SVGElement).closest("svg")?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - center;
    const y = e.clientY - rect.top - center;
    let deg = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    const newPercentage = deg / 360;
    const newValue = Math.round((min + newPercentage * (max - min)) / step) * step;
    setCurrentValue(Math.max(min, Math.min(max, newValue)));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative inline-flex items-center justify-center"
        style={{ width: dimension, height: dimension }}
      >
        <svg
          width={dimension}
          height={dimension}
          style={{ cursor: disable || readonly ? "not-allowed" : "pointer", transform: isDragging ? "scale(0.98)" : isHovered ? "scale(1.02)" : "scale(1)", transition: "transform 0.15s ease" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-label="Controle deslizante circular"
          tabIndex={disable ? -1 : 0}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
            strokeLinecap={rounded ? "round" : "butt"}
            transform={`rotate(${angle}, ${center}, ${center})`}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeLinecap={rounded ? "round" : "butt"}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(${angle}, ${center}, ${center})`}
            style={{ transition: "stroke-dashoffset 0.2s ease" }}
          />
        </svg>
        {showValue && (
          <span
            className="absolute inset-0 flex items-center justify-center font-semibold"
            style={{
              fontSize: dimension * 0.22,
              color: disable ? "#9ca3af" : "var(--jtech-heading-tertiary)",
              pointerEvents: "none",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {normalizedValue}
          </span>
        )}
      </div>
      {!disable && !readonly && (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={(e) => setCurrentValue(Number(e.target.value))}
          className="w-48"
        />
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssKnobPage() {
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedThickness, setSelectedThickness] = useState("0.2");
  const [selectedAngle, setSelectedAngle] = useState("0");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [booleanStates, setBooleanStates] = useState({
    reverse: false,
    instantFeedback: false,
    readonly: false,
    disable: false,
    rounded: false,
    showValue: true,
  });

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedBrand(null);
  };

  const handleBrandChange = (brand: string | null) => {
    if (brand) {
      setSelectedBrand(brand);
      setSelectedColor(null);
    }
  };

  const toggleBooleanState = (name: string) => {
    setBooleanStates((prev) => ({ ...prev, [name as keyof typeof prev]: !prev[name as keyof typeof prev] }));
  };

  const effectiveColor = selectedBrand ? "primary" : selectedColor || "primary";

  const generateCode = () => {
    const props: string[] = [];
    props.push(':model-value="currentValue"');
    if (selectedBrand) {
      props.push(`brand="${selectedBrand}"`);
    } else if (selectedColor && selectedColor !== "primary") {
      props.push(`color="${selectedColor}"`);
    }
    if (selectedSize !== "md") props.push(`size="${selectedSize}"`);
    if (selectedThickness !== "0.2") props.push(`:thickness="${selectedThickness}"`);
    if (selectedAngle !== "0") props.push(`:angle="${selectedAngle}"`);
    if (booleanStates.reverse) props.push("reverse");
    if (booleanStates.instantFeedback) props.push("instant-feedback");
    if (booleanStates.readonly) props.push("readonly");
    if (booleanStates.disable) props.push("disable");
    if (booleanStates.rounded) props.push("rounded");
    if (!booleanStates.showValue) props.push(':show-value="false"');
    return `<DssKnob\n  ${props.join("\n  ")}\n/>`;
  };

  const stateToggles = [
    { name: "reverse", label: "Reverse" },
    { name: "instantFeedback", label: "Instant" },
    { name: "readonly", label: "Readonly" },
    { name: "disable", label: "Disable" },
    { name: "rounded", label: "Rounded" },
    { name: "showValue", label: "Show Value" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO
       * ================================================================ */}
      <PageHeader
        icon={SlidersHorizontal}
        badge="Golden Context: DssRange"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssKnob"
        subtitle="DssKnob é o componente de controle deslizante circular, utilizado para ajustar valores numéricos em interfaces compactas como painéis de configuração, mixers e dashboards. Ele oferece interação por drag, teclado e touch, com representação visual em arco SVG e integração completa ao sistema de tokens DSS."
        subtitleHighlights={["controle deslizante circular", "interação drag/teclado/touch", "WCAG 2.1 AA"]}
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
              "Controles de volume, brilho ou intensidade em painéis",
              "Configurações numéricas em espaços visuais compactos",
              "Dashboards e widgets de KPI com interatividade",
              "Ajustes de parâmetros em interfaces de operação",
              "Controles de temperatura, pressão ou nível em sistemas industriais",
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
                { scenario: "Seleção de intervalo com min/max definidos", alt: "DssRange" },
                { scenario: "Seleção discreta de opções (poucos valores)", alt: "DssToggle ou DssCheckbox" },
                { scenario: "Entrada numérica precisa com texto", alt: "DssInput type=number" },
                { scenario: "Controles lineares em formulários longos", alt: "DssRange" },
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
        title="Configure o Knob"
        description="Ajuste as props e veja o resultado em tempo real com tokens DSS reais."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssKnobPreview
            value={45}
            min={0}
            max={100}
            step={1}
            thickness={thicknessOptions.find((t) => t.name === selectedThickness)?.value || 0.2}
            angle={angleOptions.find((a) => a.name === selectedAngle)?.value || 0}
            reverse={booleanStates.reverse}
            readonly={booleanStates.readonly}
            disable={booleanStates.disable}
            rounded={booleanStates.rounded}
            size={selectedSize}
            showValue={booleanStates.showValue}
            colorKey={effectiveColor}
            brand={selectedBrand}
          />
        }
        controls={
          <ControlGrid columns={4}>
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            <ColorPicker
              label="Color"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={selectedColor}
              onSelect={handleColorChange}
            />

            <BrandPicker
              brands={DSS_BRAND_COLORS}
              selectedBrand={selectedBrand}
              onSelect={handleBrandChange}
            />

            <ControlSection label="Thickness">
              {thicknessOptions.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedThickness(t.name)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: selectedThickness === t.name ? "var(--dss-jtech-accent)" : "transparent",
                    color: selectedThickness === t.name ? "#ffffff" : "var(--jtech-text-body)",
                    borderColor: selectedThickness === t.name ? "var(--dss-jtech-accent)" : "var(--jtech-card-border)",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </ControlSection>

            <ControlSection label="Angle">
              {angleOptions.map((a) => (
                <button
                  key={a.name}
                  onClick={() => setSelectedAngle(a.name)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all border"
                  style={{
                    backgroundColor: selectedAngle === a.name ? "var(--dss-jtech-accent)" : "transparent",
                    color: selectedAngle === a.name ? "#ffffff" : "var(--jtech-text-body)",
                    borderColor: selectedAngle === a.name ? "var(--dss-jtech-accent)" : "var(--jtech-card-border)",
                  }}
                >
                  {a.label}
                </button>
              ))}
            </ControlSection>

            <ToggleGroup
              label="Comportamento"
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
              { state: "Default", visual: "Arco de progresso com cor semântica", interaction: "Pronto para interação (drag/teclado)", tokens: "--dss-action-primary", a11y: "role=slider, aria-valuemin/max/now" },
              { state: "Hover", visual: "Scale 1.02, cursor pointer", interaction: "Pointer over", tokens: "--dss-transition-base", a11y: "—" },
              { state: "Focus", visual: "Focus ring circular visível", interaction: "Navegação por teclado (Tab)", tokens: "--dss-focus-ring", a11y: "WCAG 2.4.7" },
              { state: "Active", visual: "Scale 0.98 durante drag", interaction: "Clique / toque / drag", tokens: "--dss-state-active-scale", a11y: "—" },
              { state: "Disabled", visual: "Opacidade reduzida, arco cinza", interaction: "Não interativo", tokens: "--dss-opacity-disabled", a11y: "aria-disabled" },
              { state: "Readonly", visual: "Sem opacidade reduzida, sem interação", interaction: "Visual apenas, sem edição", tokens: "—", a11y: "aria-readonly" },
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
      <AnatomySection componentName="DssKnob" layers={anatomyData} />

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
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>number</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Emitido quando o valor muda durante interação (para v-model)</TableCell>
                </TableRow>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>change</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>number</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Emitido quando a interação finaliza (mouse/touch release)</TableCell>
                </TableRow>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>drag-value</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>number</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Emitido continuamente durante drag com o valor em tempo real</TableCell>
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
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo exibido no centro do knob. Default: valor numérico atual.</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Ícone, unidade de medida, texto contextual customizado</TableCell>
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
                { type: "Cores Semânticas", role: "Cor do arco de progresso (stroke)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Identidade visual Hub, Water e Waste no arco", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Dimensões", role: "Tamanhos visuais do knob (xs–lg) via --dss-compact-control-height-*", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Tipografia", role: "Texto do valor central", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Opacidade", role: "Estado desabilitado", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transições de hover e mudança de valor", ref: "DSS_TOKEN_REFERENCE.md" },
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
                "Touch target mínimo 48x48px (WCAG 2.5.5)",
                "Navegação por teclado completa (ArrowUp/Down/Left/Right, PageUp/Down, Home/End)",
                "Focus ring visível com :focus-visible (WCAG 2.4.7)",
                "ARIA role=slider com aria-valuemin/max/now/valuetext",
                "aria-disabled em estado desabilitado",
                "aria-readonly em estado somente leitura",
                "Contraste mínimo 4.5:1 no arco de progresso",
                "Respeita prefers-reduced-motion",
                "Suporte a prefers-contrast: more",
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
                  { criterion: "1.1.1 Conteúdo Não-Textual (slot default)", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "2.1.1 Teclado", level: "A" },
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
                          backgroundColor: item.level === "AAA" ? "rgba(180, 84, 196, 0.2)" : item.level === "AA" ? "rgba(77, 210, 40, 0.2)" : "rgba(31, 134, 222, 0.2)",
                          color: item.level === "AAA" ? "var(--dss-action-accent)" : item.level === "AA" ? "var(--dss-positive)" : "var(--dss-action-primary)",
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
              title: "Usar knob para valores binários (sim/não)",
              wrong: '<DssKnob v-model="ativo" :min="0" :max="1" />',
              correct: '<DssToggle v-model="ativo" label="Ativar recurso" />',
              reason: "Knob é para valores contínuos/graduais. Para estados binários, usar DssToggle ou DssCheckbox.",
            },
            {
              title: "Definir step muito grande para a faixa de valores",
              wrong: '<DssKnob v-model="volume" :min="0" :max="100" :step="25" />',
              correct: '<DssKnob v-model="volume" :min="0" :max="100" :step="1" />',
              reason: "Steps grandes reduzem a granularidade do controle e prejudicam a experiência do usuário.",
            },
            {
              title: "Sobrescrever cores do SVG via prop em vez de tokens",
              wrong: '<DssKnob color="primary" style="stroke: red" />',
              correct: '<DssKnob brand="hub" />',
              reason: "Cores hardcoded quebram brandabilidade, dark mode e contraste WCAG. Usar tokens DSS.",
            },
            {
              title: "Esquecer de documentar o valor no slot para screen readers",
              wrong: '<DssKnob v-model="temp" show-value>\\n  <span class="icon-thermo" />\\n</DssKnob>',
              correct: '<DssKnob v-model="temp" show-value>\\n  <span class="icon-thermo" aria-label={`Temperatura: ${temp}°C`} />\\n</DssKnob>',
              reason: "Quando o slot substitui o valor numérico, o conteúdo ARIA deve continuar descrevendo o valor atual.",
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssKnob</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "::before reservado para touch target (WCAG 2.5.5); ::after não utilizado — efeitos visuais aplicados via CSS no próprio SVG" },
                { rule: "Uso de brightness()", application: "Não utilizado — cores do arco são controladas via tokens de brand/semantic" },
                { rule: "Classificação do componente", application: "Visual / Form Component — controle de entrada numérico com representação gráfica" },
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
