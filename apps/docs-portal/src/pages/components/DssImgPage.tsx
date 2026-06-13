// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Code, FileText, CheckCircle, XCircle, Image as ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import {
  DssPlayground, ControlGrid, VariantSelector, BrandPicker, ToggleGroup,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

const fitOptions = [
  { name: "cover", label: "Cover", desc: "Preenche cortando excesso (default)" },
  { name: "contain", label: "Contain", desc: "Cabe totalmente, preserva ratio" },
  { name: "fill", label: "Fill", desc: "Estica para preencher" },
  { name: "none", label: "None", desc: "Tamanho natural, sem ajuste" },
  { name: "scale-down", label: "Scale-down", desc: "Menor entre none e contain" },
];

const radiusOptions = [
  { name: "none", label: "None" },
  { name: "sm", label: "SM" },
  { name: "md", label: "MD" },
  { name: "lg", label: "LG" },
  { name: "full", label: "Full" },
];

const ratioOptions = [
  { name: "16/9", label: "16:9" },
  { name: "4/3", label: "4:3" },
  { name: "1/1", label: "1:1" },
  { name: "3/4", label: "3:4" },
];

const propsData = [
  { category: "Conteúdo", prop: "src", type: "String", default: "undefined", description: "URL da imagem a carregar." },
  { category: "Conteúdo", prop: "alt", type: "String", default: "undefined", description: "Texto alternativo — obrigatório se decorative=false (WCAG 1.1.1)." },
  { category: "Conteúdo", prop: "decorative", type: "Boolean", default: "false", description: "Marca como puramente decorativa; força alt=\"\"." },
  { category: "Conteúdo", prop: "fallbackSrc", type: "String", default: "undefined", description: "Imagem exibida quando src falha." },
  { category: "Conteúdo", prop: "placeholderSrc", type: "String", default: "undefined", description: "LQIP exibido durante o carregamento." },
  { category: "Layout", prop: "ratio", type: "Number | String", default: "undefined", description: "Aspect ratio para reservar espaço (evita CLS)." },
  { category: "Layout", prop: "fit", type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'", default: "'cover'", description: "Object-fit aplicado ao <img> interno." },
  { category: "Layout", prop: "position", type: "String", default: "undefined", description: "Equivalente a background-position." },
  { category: "Variantes", prop: "radius", type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "undefined", description: "Border-radius via tokens DSS." },
  { category: "Performance", prop: "loading", type: "'lazy' | 'eager'", default: "'lazy'", description: "Estratégia de carregamento nativa." },
  { category: "Performance", prop: "noTransition", type: "Boolean", default: "false", description: "Desativa o fade-in ao carregar." },
];

const eventsData = [
  { event: "load", payload: "—", desc: "Disparado quando a imagem carrega com sucesso." },
  { event: "error", payload: "—", desc: "Disparado quando o carregamento falha (após src e fallbackSrc)." },
];

const slotsData = [
  { slot: "default", desc: "Overlay renderizado sobre a imagem carregada." },
  { slot: "loading", desc: "Indicador de carregamento. Default: DssSpinner size=\"sm\"." },
  { slot: "error", desc: "Estado de erro. Default: DssIcon name=\"broken_image\"." },
];

const anatomyData = {
  structure: {
    files: ["DssImg.ts.vue"],
    description: "Wrapper governado sobre QImg. QImg é o root element (EXC-Gate-01). inheritAttrs:false com v-bind=\"$attrs\" repassado. Sistema dual alt/decorative com dev warning para WCAG 1.1.1.",
    responsibilities: [
      "Template Vue + TypeScript",
      "computedAlt: alt vs decorative=\"\" + dev warning",
      "Slots #loading (DssSpinner) e #error (DssIcon)",
      "Eventos passivos @load e @error",
    ],
    tokens: [],
    codeExample: `<q-img
  v-bind="$attrs"
  :class="rootClasses"
  :src="src"
  :alt="computedAlt"
  :ratio="ratio"
  :fit="fit"
  :loading="loading"
  :error-src="fallbackSrc"
  :placeholder-src="placeholderSrc"
  @load="onLoad"
  @error="onError"
>
  <template #loading><DssSpinner size="sm" /></template>
  <template #error><DssIcon name="broken_image" /></template>
</q-img>`,
  },
  composition: {
    files: ["_base.scss"],
    description: "Estilos base do container __loading e __error. QImg já aplica overflow:hidden internamente — necessário para clip do border-radius.",
    responsibilities: [
      "Containers __loading e __error centralizados",
      "Surface de fallback para placeholder",
      "Sem estilos no root (delegado ao QImg)",
    ],
    tokens: ["--dss-surface-disabled", "--dss-text-subtle"],
    codeExample: `.dss-img {
  &__loading,
  &__error {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--dss-surface-disabled);
    color: var(--dss-text-subtle);
  }
}`,
  },
  variants: {
    files: ["_variant.scss"],
    description: "Variantes de border-radius via tokens. Quando radius=\"full\" o container fica circular (ideal para avatares).",
    responsibilities: [
      "Modificadores --radius-{sm,md,lg,full}",
      "Border-radius tokenizado",
    ],
    tokens: ["--dss-radius-sm", "--dss-radius-md", "--dss-radius-lg", "--dss-radius-full"],
    codeExample: `.dss-img--radius-sm   { border-radius: var(--dss-radius-sm); }
.dss-img--radius-md   { border-radius: var(--dss-radius-md); }
.dss-img--radius-lg   { border-radius: var(--dss-radius-lg); }
.dss-img--radius-full { border-radius: var(--dss-radius-full); }`,
  },
  output: {
    files: ["_states.scss", "_brands.scss"],
    description: "prefers-contrast:more reforça currentColor no ícone de erro; forced-colors usa SystemColor keywords; print oculta __loading. Brand pinta o ícone de erro.",
    responsibilities: [
      "High-contrast (currentColor)",
      "Forced-colors (Canvas / CanvasText)",
      "Print: __loading display:none",
      "Brand hub/water/waste no __error",
    ],
    tokens: ["--dss-action-hub", "--dss-action-water", "--dss-action-waste"],
    codeExample: `[data-brand="hub"] .dss-img .dss-img__error {
  color: var(--dss-action-hub);
}

@media (forced-colors: active) {
  .dss-img__error {
    color: CanvasText;
    background-color: Canvas;
  }
}`,
  },
};

interface PreviewProps {
  fit: string;
  radius: string;
  ratio: string;
  brand?: string | null;
  isDarkMode?: boolean;
  decorative?: boolean;
  showError?: boolean;
  showLoading?: boolean;
  withOverlay?: boolean;
}

function DssImgPreview({
  fit, radius, ratio, brand = null, isDarkMode = false,
  decorative = false, showError = false, showLoading = false, withOverlay = false,
}: PreviewProps) {
  const radiusMap: Record<string, string> = {
    none: "0", sm: "4px", md: "8px", lg: "16px", full: "9999px",
  };
  const [w, h] = ratio.split("/").map(Number);
  const aspect = w / h;
  const accent = brand && DSS_BRAND_COLORS[brand]?.principal || "#1f86de";
  const surface = isDarkMode ? "#1a1a1a" : "#ffffff";
  const fg = isDarkMode ? "#e5e5e5" : "#454545";
  const muted = isDarkMode ? "#707070" : "#a3a3a3";
  const borderSubtle = isDarkMode ? "#404040" : "#e5e5e5";
  const errorBg = isDarkMode ? "#262626" : "#f4f4f5";

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div
        style={{
          width: 320,
          aspectRatio: aspect,
          borderRadius: radiusMap[radius],
          overflow: "hidden",
          border: `1px solid ${borderSubtle}`,
          position: "relative",
          backgroundColor: showError || showLoading ? errorBg : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        role={decorative ? "presentation" : undefined}
        aria-label={decorative ? undefined : "Paisagem montanhosa ao amanhecer"}
      >
        {showError ? (
          <div style={{ color: muted, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <ImageIcon size={28} />
            <span style={{ fontSize: 11 }}>broken_image</span>
          </div>
        ) : showLoading ? (
          <div
            style={{
              width: 28, height: 28, borderRadius: "50%",
              border: `3px solid ${borderSubtle}`,
              borderTopColor: accent,
              animation: "spin 0.8s linear infinite",
            }}
          />
        ) : (
          <>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop"
              alt={decorative ? "" : "Paisagem"}
              style={{
                width: "100%", height: "100%",
                objectFit: fit as any,
              }}
            />
            {withOverlay && (
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent 50%)",
                  display: "flex", alignItems: "flex-end", padding: 12,
                  color: "#fff", fontSize: 13, fontWeight: 600,
                }}
              >
                Overlay no slot default
              </div>
            )}
          </>
        )}
      </div>
      <div className="text-xs" style={{ color: muted }}>
        ratio <strong style={{ color: fg }}>{ratio}</strong> · fit{" "}
        <strong style={{ color: fg }}>{fit}</strong> · radius{" "}
        <strong style={{ color: fg }}>{radius}</strong>
        {decorative && " · decorative"}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function DssImgPage() {
  const [selectedFit, setSelectedFit] = useState("cover");
  const [selectedRadius, setSelectedRadius] = useState("md");
  const [selectedRatio, setSelectedRatio] = useState("16/9");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [booleanStates, setBooleanStates] = useState({
    decorative: false,
    showError: false,
    showLoading: false,
    withOverlay: false,
  });

  const toggle = (n: string) =>
    setBooleanStates((p) => ({ ...p, [n]: !p[n as keyof typeof p] }));

  const generateCode = () => {
    const props: string[] = [
      `src="/img/landscape.jpg"`,
      booleanStates.decorative ? `:decorative="true"` : `alt="Paisagem montanhosa ao amanhecer"`,
      `:ratio="${selectedRatio}"`,
      `fit="${selectedFit}"`,
    ];
    if (selectedRadius !== "none") props.push(`radius="${selectedRadius}"`);
    if (selectedBrand) props.push(`brand="${selectedBrand}"`);
    const overlay = booleanStates.withOverlay
      ? `\n  <div class="caption">Overlay</div>\n`
      : "";
    return `<DssImg\n  ${props.join("\n  ")}\n>${overlay}</DssImg>`;
  };

  const flagOptions = [
    { name: "decorative", label: "Decorative" },
    { name: "withOverlay", label: "Overlay slot" },
  ];
  const stateOptions = [
    { name: "showLoading", label: "Loading" },
    { name: "showError", label: "Error" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      <PageHeader
        icon={ImageIcon}
        badge="Componente Base"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssImg"
        subtitle="DssImg é o wrapper DSS governado sobre o QImg do Quasar. Container de mídia não interativo com aspect ratio, lazy loading nativo, placeholder LQIP, fallback automático e sistema dual alt/decorative para garantir WCAG 1.1.1."
        subtitleHighlights={["WCAG 1.1.1", "aspect-ratio sem CLS", "lazy loading nativo", "5 fits + 5 radius"]}
        extraBadges={[
          { label: "v1.0.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-5 rounded-lg border" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", borderColor: "var(--dss-positive)" }}>
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-positive)" }}>
            <CheckCircle className="h-5 w-5" /> Quando Usar
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "Renderizar imagens raster (JPG/PNG/WebP/AVIF) em layouts responsivos",
              "Avatares, thumbs e capas com aspect ratio fixo",
              "Hero/banner com lazy loading nativo e LQIP",
              "Imagens com fallback automático quando src falha",
              "Imagens decorativas que devem ser ignoradas por leitores de tela (decorative=true)",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-lg border" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", borderColor: "var(--dss-negative)" }}>
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-negative)" }}>
            <XCircle className="h-5 w-5" /> Quando NÃO Usar
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
                { s: "Ícones vetoriais decorativos ou de UI", a: "DssIcon" },
                { s: "Avatares de usuário com fallback de iniciais", a: "DssAvatar" },
                { s: "Vídeos embedados (YouTube, Vimeo)", a: "DssVideo" },
                { s: "Imagens com interatividade própria (zoom, lightbox)", a: "Wrapper customizado" },
                { s: "SVG inline com manipulação de cores", a: "Componente SVG dedicado" },
              ].map((r, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{r.s}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{r.a}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />
      <DssPlayground
        title="Configure a Imagem"
        description="Teste fit, ratio, radius, slots loading/error, overlay no slot default e modo decorativo."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="380px"
        previewContent={
          <DssImgPreview
            fit={selectedFit}
            radius={selectedRadius}
            ratio={selectedRatio}
            brand={selectedBrand}
            isDarkMode={isDarkMode}
            decorative={booleanStates.decorative}
            showError={booleanStates.showError}
            showLoading={booleanStates.showLoading}
            withOverlay={booleanStates.withOverlay}
          />
        }
        controls={
          <ControlGrid columns={5}>
            <VariantSelector label="Fit" variants={fitOptions} selectedVariant={selectedFit} onSelect={setSelectedFit} />
            <VariantSelector label="Ratio" variants={ratioOptions} selectedVariant={selectedRatio} onSelect={setSelectedRatio} />
            <VariantSelector label="Radius" variants={radiusOptions} selectedVariant={selectedRadius} onSelect={setSelectedRadius} />
            <BrandPicker brands={DSS_BRAND_COLORS} selectedBrand={selectedBrand} onSelect={setSelectedBrand} />
            <ToggleGroup label="Flags" options={flagOptions} values={booleanStates} onToggle={toggle} />
            <ToggleGroup label="Estado" options={stateOptions} values={booleanStates} onToggle={toggle} />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssImg" layers={anatomyData} />

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
              {propsData.map((p, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-muted)" }}>{p.category}</TableCell>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{p.prop}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{p.type}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-muted)" }}>{p.default}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{p.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
                {eventsData.map((e, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
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
              {slotsData.map((s, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>#{s.slot}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{s.desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "Sistema dual alt / decorative — WCAG 1.1.1 (Nível A)",
                "Dev warning quando alt e decorative estão ausentes",
                "decorative=true força alt=\"\" (ignorado por leitores de tela)",
                "aria-hidden=\"true\" nos containers de loading e error",
                "Suporte a forced-colors / Windows High Contrast Mode",
                "prefers-contrast: more reforça currentColor no ícone de erro",
                "Print: estado de loading oculto (sem significado em papel)",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>⚠️ Responsabilidade do consumidor</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "Fornecer alt descritivo e contextual (não \"imagem\" ou nome do arquivo)",
                "Garantir contraste ≥ 4.5:1 entre overlay e imagem de fundo",
                "Para interatividade (zoom, link), envolver com elemento pai semântico",
                "Servir formatos otimizados (WebP/AVIF) com srcset via $attrs",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-warning)" }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
