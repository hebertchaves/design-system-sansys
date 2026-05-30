// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Code, FileText, CheckCircle, XCircle, Video as VideoIcon, Play } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import {
  DssPlayground, ControlGrid, VariantSelector, BrandPicker, ToggleGroup,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

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
  { name: "21/9", label: "21:9" },
];

const propsData = [
  { category: "Conteúdo", prop: "src", type: "String", default: "undefined", description: "URL do vídeo embedado (YouTube, Vimeo, etc.)." },
  { category: "Conteúdo", prop: "title", type: "String", default: "undefined", description: "Título acessível do vídeo — obrigatório se decorative=false (WCAG 4.1.2)." },
  { category: "Conteúdo", prop: "decorative", type: "Boolean", default: "false", description: "Marca o vídeo como decorativo; força title=\"\"." },
  { category: "Layout", prop: "ratio", type: "Number | String", default: "16 / 9", description: "Aspect ratio para reservar espaço (evita CLS)." },
  { category: "Variantes", prop: "radius", type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "undefined", description: "Border-radius via tokens DSS." },
];

const slotsData = [
  { slot: "default", desc: "Conteúdo opcional sobreposto ao player (ex.: legenda, créditos)." },
];

const anatomyData = {
  structure: {
    files: ["DssVideo.ts.vue"],
    description: "Wrapper governado sobre QVideo. QVideo é o root element (EXC-Gate-01). inheritAttrs:false com v-bind=\"$attrs\". Sistema dual title/decorative com dev warning para WCAG 4.1.2 (Name, Role, Value).",
    responsibilities: [
      "Template Vue + TypeScript",
      "computedTitle: title vs decorative=\"\" + dev warning",
      "Ratio default 16/9",
      "Sem estados interativos (responsabilidade do iframe interno)",
    ],
    tokens: [],
    codeExample: `<q-video
  v-bind="$attrs"
  :class="rootClasses"
  :src="src"
  :ratio="ratio"
  :title="computedTitle"
>
  <slot />
</q-video>`,
  },
  composition: {
    files: ["_base.scss"],
    description: "Container de mídia sem estilos interativos. QVideo já aplica position:relative + overflow:hidden internamente.",
    responsibilities: [
      "Sem hover/focus/active (delegado ao iframe)",
      "Sem touch target (não interativo)",
    ],
    tokens: [],
    codeExample: `.dss-video {
  /* QVideo já gerencia layout, overflow e ratio internamente. */
}`,
  },
  variants: {
    files: ["_variant.scss"],
    description: "Variantes de border-radius via tokens. Aplicado com overflow:hidden herdado do QVideo.",
    responsibilities: [
      "Modificadores --radius-{sm,md,lg,full}",
    ],
    tokens: ["--dss-radius-sm", "--dss-radius-md", "--dss-radius-lg", "--dss-radius-full"],
    codeExample: `.dss-video--radius-sm { border-radius: var(--dss-radius-sm); }
.dss-video--radius-md { border-radius: var(--dss-radius-md); }
.dss-video--radius-lg { border-radius: var(--dss-radius-lg); }`,
  },
  output: {
    files: ["_states.scss", "_brands.scss"],
    description: "forced-colors usa SystemColor keywords no outline; prefers-reduced-motion neutraliza animação opcional do wrapper. Brand não pinta o iframe (sandbox cross-origin) — apenas border opcional.",
    responsibilities: [
      "High-contrast (CanvasText outline)",
      "Reduced-motion (will-change: auto)",
      "Print: substitui por link textual",
    ],
    tokens: ["--dss-action-hub", "--dss-action-water", "--dss-action-waste"],
    codeExample: `@media (forced-colors: active) {
  .dss-video {
    outline: var(--dss-border-width-thin) solid CanvasText;
  }
}

@media print {
  .dss-video::after {
    content: "Vídeo disponível em: " attr(data-src);
  }
}`,
  },
};

interface PreviewProps {
  radius: string;
  ratio: string;
  brand?: string | null;
  isDarkMode?: boolean;
  decorative?: boolean;
  withOverlay?: boolean;
}

function DssVideoPreview({
  radius, ratio, brand = null, isDarkMode = false,
  decorative = false, withOverlay = false,
}: PreviewProps) {
  const radiusMap: Record<string, string> = {
    none: "0", sm: "4px", md: "8px", lg: "16px", full: "9999px",
  };
  const [w, h] = ratio.split("/").map(Number);
  const aspect = w / h;
  const accent = brand && DSS_BRAND_COLORS[brand]?.principal || "#1f86de";
  const fg = isDarkMode ? "#e5e5e5" : "#454545";
  const muted = isDarkMode ? "#707070" : "#a3a3a3";
  const borderSubtle = isDarkMode ? "#404040" : "#e5e5e5";
  const playerBg = isDarkMode ? "#0a0a0a" : "#171717";

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div
        style={{
          width: 420,
          maxWidth: "100%",
          aspectRatio: aspect,
          borderRadius: radiusMap[radius],
          overflow: "hidden",
          border: `1px solid ${borderSubtle}`,
          backgroundColor: playerBg,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        role={decorative ? "presentation" : undefined}
        aria-label={decorative ? undefined : "Tour institucional Sansys"}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(https://images.unsplash.com/photo-1518176258769-f227c798150e?w=900&h=520&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.55,
          }}
        />
        <button
          aria-label="Reproduzir vídeo"
          style={{
            position: "relative",
            zIndex: 1,
            width: 64, height: 64,
            borderRadius: "50%",
            backgroundColor: accent,
            color: "#fff",
            border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          <Play size={26} fill="#fff" />
        </button>
        {withOverlay && (
          <div
            style={{
              position: "absolute", left: 12, bottom: 12, zIndex: 2,
              color: "#fff", fontSize: 12, fontWeight: 600,
              backgroundColor: "rgba(0,0,0,0.45)",
              padding: "4px 8px", borderRadius: 4,
            }}
          >
            Tour institucional · 2:14
          </div>
        )}
      </div>
      <div className="text-xs" style={{ color: muted }}>
        ratio <strong style={{ color: fg }}>{ratio}</strong> · radius{" "}
        <strong style={{ color: fg }}>{radius}</strong>
        {decorative && " · decorative"}
      </div>
    </div>
  );
}

export default function DssVideoPage() {
  const [selectedRadius, setSelectedRadius] = useState("md");
  const [selectedRatio, setSelectedRatio] = useState("16/9");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [booleanStates, setBooleanStates] = useState({
    decorative: false,
    withOverlay: false,
  });

  const toggle = (n: string) =>
    setBooleanStates((p) => ({ ...p, [n]: !p[n as keyof typeof p] }));

  const generateCode = () => {
    const props: string[] = [
      `src="https://www.youtube.com/embed/dQw4w9WgXcQ"`,
      booleanStates.decorative ? `:decorative="true"` : `title="Tour institucional Sansys"`,
      `:ratio="${selectedRatio}"`,
    ];
    if (selectedRadius !== "none") props.push(`radius="${selectedRadius}"`);
    if (selectedBrand) props.push(`brand="${selectedBrand}"`);
    return `<DssVideo\n  ${props.join("\n  ")}\n/>`;
  };

  const flagOptions = [
    { name: "decorative", label: "Decorative" },
    { name: "withOverlay", label: "Overlay" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      <PageHeader
        icon={VideoIcon}
        badge="Componente Base"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssVideo"
        subtitle="DssVideo é o wrapper DSS governado sobre o QVideo do Quasar. Container de mídia não interativo para vídeos embedados (YouTube, Vimeo, etc.) com aspect ratio fixo, sistema dual title/decorative e total compatibilidade com WCAG 4.1.2."
        subtitleHighlights={["WCAG 4.1.2", "aspect-ratio sem CLS", "iframe acessível", "5 radius"]}
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
              "Embedar vídeos hospedados (YouTube, Vimeo, Wistia)",
              "Tour institucional, demonstrações de produto e tutoriais",
              "Hero com vídeo de fundo decorativo (decorative=true)",
              "Mídia rica em landing pages e páginas de marketing",
              "Conteúdo educacional com legendas/captions providos pelo host",
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
                { s: "Imagens estáticas (raster ou vetor)", a: "DssImg / DssIcon" },
                { s: "Vídeo nativo HTML5 com controles customizados", a: "<video> wrapper dedicado" },
                { s: "Streams ao vivo com chat / overlay interativo", a: "Player customizado" },
                { s: "Áudio sem vídeo (podcast, narração)", a: "DssAudio (futuro)" },
                { s: "Animações curtas (Lottie, GIF leve)", a: "DssLottie / DssImg" },
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
        title="Configure o Player"
        description="Teste ratio, radius, modo decorativo e overlay sobre o player. O play é apenas demonstrativo — o iframe real é gerenciado pelo QVideo."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="380px"
        previewContent={
          <DssVideoPreview
            radius={selectedRadius}
            ratio={selectedRatio}
            brand={selectedBrand}
            isDarkMode={isDarkMode}
            decorative={booleanStates.decorative}
            withOverlay={booleanStates.withOverlay}
          />
        }
        controls={
          <ControlGrid columns={4}>
            <VariantSelector label="Ratio" variants={ratioOptions} selectedVariant={selectedRatio} onSelect={setSelectedRatio} />
            <VariantSelector label="Radius" variants={radiusOptions} selectedVariant={selectedRadius} onSelect={setSelectedRadius} />
            <BrandPicker brands={DSS_BRAND_COLORS} selectedBrand={selectedBrand} onSelect={setSelectedBrand} />
            <ToggleGroup label="Flags" options={flagOptions} values={booleanStates} onToggle={toggle} />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssVideo" layers={anatomyData} />

      <CollapsibleSection icon={FileText} title="Props API">
        <div className="pt-4">
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
        </div>
      </CollapsibleSection>

      <CollapsibleSection icon={Code} title="Slots">
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
                "Sistema dual title / decorative — WCAG 4.1.2 (Name, Role, Value)",
                "Dev warning quando title e decorative estão ausentes",
                "decorative=true força title=\"\" (iframe sem nome acessível)",
                "Suporte a forced-colors / Windows High Contrast Mode (outline)",
                "prefers-reduced-motion neutraliza animação opcional do wrapper",
                "Print: substitui o iframe por link textual com a URL",
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
                "Garantir que o vídeo tenha legendas/captions (WCAG 1.2.2 — Nível A)",
                "Prover descrição em áudio para conteúdo visual relevante (WCAG 1.2.5)",
                "Não usar autoplay com som (WCAG 1.4.2)",
                "Fornecer transcrição textual para áudio crítico",
                "Title descritivo (não \"vídeo\" ou ID do YouTube)",
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
