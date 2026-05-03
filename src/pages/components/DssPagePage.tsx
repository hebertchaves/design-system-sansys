// @ts-nocheck
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  FileText as PageIcon,
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
import { PlaygroundButton } from "@/components/ui/PlaygroundButton";

// ============================================================================
// DADOS — Derivados de DssPage.ts.vue + pre_prompt_dss_page.md
// ============================================================================

const contentVolumes = [
  { name: "few", label: "Pouco", desc: "1 parágrafo (demonstra sticky footer)" },
  { name: "medium", label: "Médio", desc: "Conteúdo típico de uma página" },
  { name: "many", label: "Muito", desc: "Conteúdo extenso (página rola)" },
];

const propsData = [
  { category: "Layout", prop: "padding", type: "Boolean", default: "false", description: "Aplica --dss-container-padding em todos os lados" },
  { category: "Avançado", prop: "style-fn", type: "(offset, height) => Object", default: "undefined", description: "Sobrescreve cálculo nativo de min-height do Quasar" },
];

const blockedPropsData: { prop: string; reason: string }[] = [];

const eventsData = [
  { event: "—", payload: "—", description: "DssPage não emite eventos próprios. Componente estrutural não-interativo." },
];

const anatomyData = {
  structure: {
    files: ["1-structure/DssPage.ts.vue"],
    description: "Wrapper governado sobre QPage. Componente de Nível 4 (composição de terceiro grau): define a área de conteúdo principal da aplicação dentro de um DssLayout + DssPageContainer. O <q-page> é usado como elemento raiz (EXC-01) porque o Quasar injeta inline-style com min-height calculado via JavaScript a partir dos offsets do QLayout.",
    responsibilities: [
      "Encapsula <q-page> como raiz do template (EXC-01)",
      "Aplica role=\"main\" por padrão (WCAG — landmark)",
      "Aplica padding governado quando padding=true",
      "Repassa style-fn para QPage (sobrescrita avançada de min-height)",
      "Repassa $attrs (após role=\"main\") para permitir override consciente de role",
      "Inherits inheritAttrs: false para isolar binding de atributos",
    ],
    tokens: [],
    codeExample: `<template>
  <q-page
    :class="pageClasses"
    role="main"
    :style-fn="props.styleFn"
    v-bind="$attrs"
  >
    <slot />
  </q-page>
</template>`,
  },
  composition: {
    files: ["2-composition/_base.scss", "DssPage.module.scss"],
    description: "Estilos base — apenas governança de padding via token DSS quando a prop padding=true. Sem cor de fundo (herdada do DssLayout), sem variantes, sem brand.",
    responsibilities: [
      "Substitui .q-layout-padding nativo por --dss-container-padding (16px mobile / 24px desktop)",
      "Cor de fundo transparente (herda --dss-surface-muted do DssLayout)",
      "Cor de texto herdada (--dss-text-body)",
      "Não interfere no min-height calculado pelo QPage",
    ],
    tokens: ["--dss-container-padding", "--dss-spacing-4", "--dss-spacing-6"],
    codeExample: `.dss-page--padding {
  padding: var(--dss-container-padding);
}

@media (min-width: 1024px) {
  .dss-page--padding {
    padding: var(--dss-spacing-6);
  }
}`,
  },
  variants: {
    files: ["3-variants/_variant.scss", "3-variants/index.scss"],
    description: "Variantes mínimas — DssPage é um container estrutural. A única variação real é a presença/ausência do padding governado.",
    responsibilities: [
      "Modifier --padding (ativada pela prop padding=true)",
      "Sem variantes de cor, brand ou tamanho — responsabilidade de componentes filhos",
    ],
    tokens: ["--dss-container-padding"],
    codeExample: `// 3-variants/_variant.scss
.dss-page {
  // Sem variantes visuais adicionais.
  // Layout interno é responsabilidade do consumidor.
}`,
  },
  output: {
    files: ["4-output/_states.scss", "4-output/index.scss"],
    description: "Camada final: dark mode e forced-colors. Não há estados interativos (componente não-interativo).",
    responsibilities: [
      "Dark mode: cores herdadas do DssLayout via [data-theme='dark']",
      "Forced-colors: respeita system colors do navegador",
      "Sem hover, focus, active ou disabled (não-interativo)",
    ],
    tokens: ["--dss-surface-muted", "--dss-text-body"],
    codeExample: `[data-theme='dark'] .dss-page {
  // Cores herdadas — sem override necessário
  color: var(--dss-text-body);
}

@media (forced-colors: active) {
  .dss-page {
    background-color: Canvas;
    color: CanvasText;
  }
}`,
  },
};

// ============================================================================
// PREVIEW DA PÁGINA (simulando DssLayout + DssHeader + DssPage + DssFooter)
// ============================================================================

interface DssPagePreviewProps {
  padding?: boolean;
  contentVolume?: string;
  isDarkMode?: boolean;
}

function DssPagePreview({
  padding = false,
  contentVolume = "few",
  isDarkMode = false,
}: DssPagePreviewProps) {
  const pageBg = isDarkMode ? "hsl(0 0% 9%)" : "hsl(0 0% 96%)";
  const surfaceBg = isDarkMode ? "hsl(0 0% 14%)" : "hsl(0 0% 100%)";
  const dividerColor = isDarkMode ? "hsl(0 0% 22%)" : "hsl(0 0% 90%)";
  const subtleColor = isDarkMode ? "hsl(0 0% 60%)" : "hsl(0 0% 40%)";
  const textColor = isDarkMode ? "hsl(0 0% 88%)" : "hsl(0 0% 10%)";
  const accentColor = "hsl(220 90% 50%)";

  const paragraphsByVolume: Record<string, number> = {
    few: 1,
    medium: 4,
    many: 18,
  };
  const numParagraphs = paragraphsByVolume[contentVolume] ?? 1;

  const containerHeight = 420;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 720,
        height: containerHeight,
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${dividerColor}`,
        backgroundColor: pageBg,
        display: "flex",
        flexDirection: "column",
      }}
      role="region"
      aria-label="Preview de DssPage dentro de DssLayout"
    >
      {/* Header simulado (DssHeader) */}
      <div
        style={{
          padding: "10px 16px",
          backgroundColor: surfaceBg,
          color: textColor,
          borderBottom: `1px solid ${dividerColor}`,
          fontSize: 13,
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        DssHeader
      </div>

      {/* Área scrollável — DssPageContainer + DssPage */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: pageBg,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* DssPage — flex:1 simula o min-height calculado pelo QPage */}
        <div
          role="main"
          style={{
            flex: 1,
            padding: padding ? 24 : 0,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Indicador visual da área da página */}
          <div
            style={{
              position: "absolute",
              top: 6,
              right: 8,
              fontSize: 10,
              fontFamily: "monospace",
              color: subtleColor,
              backgroundColor: surfaceBg,
              padding: "2px 6px",
              borderRadius: 4,
              border: `1px solid ${dividerColor}`,
              zIndex: 1,
            }}
          >
            &lt;DssPage padding={String(padding)}&gt; · role="main"
          </div>

          {/* Conteúdo */}
          <div
            style={{
              flex: 1,
              backgroundColor: padding ? surfaceBg : "transparent",
              border: padding ? `1px dashed ${accentColor}` : "none",
              borderRadius: padding ? 6 : 0,
              padding: padding ? 16 : 16,
              color: textColor,
              fontSize: 13,
              lineHeight: 1.55,
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: 12,
                fontSize: 15,
                fontWeight: 600,
                color: textColor,
              }}
            >
              Conteúdo principal
            </h3>
            {Array.from({ length: numParagraphs }).map((_, i) => (
              <p key={i} style={{ margin: "0 0 10px 0", color: subtleColor }}>
                Parágrafo {i + 1}. Este é o conteúdo renderizado dentro do slot
                default do DssPage. O cálculo de min-height do QPage garante
                que, com pouco conteúdo, o footer permaneça colado na parte
                inferior da tela (sticky footer).
              </p>
            ))}
          </div>
        </div>

        {/* Footer simulado (DssFooter) */}
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: surfaceBg,
            color: subtleColor,
            borderTop: `1px solid ${dividerColor}`,
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          DssFooter — sempre no rodapé (sticky via min-height do QPage)
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssPagePage() {
  const [contentVolume, setContentVolume] = useState("few");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pageBooleans, setPageBooleans] = useState({
    padding: false,
  });

  const togglePageBoolean = (name: string) => {
    setPageBooleans((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  const generateCode = () => {
    const props: string[] = [];
    if (pageBooleans.padding) props.push("padding");

    const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";

    const contentByVolume: Record<string, string> = {
      few: `    <p>Conteúdo curto — observe que o footer permanece no rodapé.</p>`,
      medium: `    <h1>Título da Página</h1>
    <p>Parágrafo introdutório explicando o contexto.</p>
    <p>Conteúdo principal da página.</p>
    <p>Mais alguns parágrafos de conteúdo.</p>`,
      many: `    <h1>Título da Página</h1>
    <!-- Conteúdo extenso — a página rola normalmente -->
    <p v-for="n in 20" :key="n">Parágrafo {{ n }}…</p>`,
    };

    return `<DssLayout>
  <DssHeader>...</DssHeader>

  <DssPageContainer>
    <DssPage${propsStr}>
${contentByVolume[contentVolume] ?? contentByVolume.few}
    </DssPage>
  </DssPageContainer>

  <DssFooter>...</DssFooter>
</DssLayout>`;
  };

  const pageToggles = [{ name: "padding", label: "Padding (token DSS)" }];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* SEÇÃO 1: PAGE HEADER */}
      <PageHeader
        icon={PageIcon}
        badge="v1.0.0"
        badgeVariant="info"
        title="Componente"
        titleAccent="DssPage"
        subtitle={'DssPage é o componente que define a área de conteúdo principal da aplicação. Wrapper governado sobre QPage (Nível 4 — composição de terceiro grau), garante o cálculo dinâmico de min-height para o padrão de sticky footer e aplica role="main" por padrão para acessibilidade. Deve ser usado dentro de um DssLayout + DssPageContainer e é responsável apenas pela área da página — cor de fundo, scrollbars e layout interno são delegados a outros componentes.'}
        subtitleHighlights={["área de conteúdo principal", "Nível 4", "sticky footer", 'role="main"']}
        extraBadges={[
          { label: "Quasar Compatible", variant: "success" },
          { label: "TypeScript", variant: "info" },
          { label: "WCAG 2.1 AA", variant: "success" },
        ]}
      />

      {/* SEÇÃO 2: QUANDO USAR */}
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
              "Toda página de conteúdo principal dentro de um DssLayout",
              "Quando precisar do comportamento sticky footer (footer colado no rodapé com pouco conteúdo)",
              "Para garantir o landmark role=\"main\" (acessibilidade — leitores de tela)",
              "Quando precisar do padding governado por tokens DSS (padding=true)",
              "Em dashboards e layouts edge-to-edge (padding=false)",
              "Como container semântico do conteúdo principal (substitui <main>)",
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
                { scenario: "Estrutura raiz da aplicação (header + footer + drawer)", alt: "DssLayout" },
                { scenario: "Container intermediário entre layout e página", alt: "DssPageContainer" },
                { scenario: "Card ou seção dentro de uma página", alt: "DssCard" },
                { scenario: "Drawer/sidebar lateral", alt: "DssDrawer" },
                { scenario: "Cabeçalho fixo no topo", alt: "DssHeader" },
                { scenario: "Área scrollável independente", alt: "DssScrollArea" },
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

      {/* SEÇÃO 3: PLAYGROUND */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure a Página"
        description="Alterna o padding governado e o volume de conteúdo. Observe que com pouco conteúdo, o footer permanece colado no rodapé (sticky footer via min-height calculado pelo QPage)."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="460px"
        previewContent={
          <DssPagePreview
            padding={pageBooleans.padding}
            contentVolume={contentVolume}
            isDarkMode={isDarkMode}
          />
        }
        controls={
          <ControlGrid columns={4}>
            <ToggleGroup
              label="Layout"
              options={pageToggles}
              values={pageBooleans}
              onToggle={togglePageBoolean}
            />

            <ControlSection label="Volume de Conteúdo">
              {contentVolumes.map((v) => (
                <PlaygroundButton
                  key={v.name}
                  onClick={() => setContentVolume(v.name)}
                  isSelected={contentVolume === v.name}
                  selectedBg="var(--dss-jtech-accent)"
                  selectedColor="#ffffff"
                >
                  {v.label}
                </PlaygroundButton>
              ))}
            </ControlSection>
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* SEÇÃO 4: ESTADOS */}
      <SectionHeader title="Estados" titleAccent="Visuais" badge="Comportamento" />

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
              { state: "Edge-to-edge", visual: "Conteúdo ocupa 100% da largura, sem padding", applicability: "padding=false (default)", tokens: "Sem padding aplicado" },
              { state: "Conteúdo contido", visual: "Conteúdo com padding interno governado", applicability: "padding=true", tokens: "--dss-container-padding (16px mobile / 24px desktop)" },
              { state: "Sticky footer", visual: "Footer permanece colado no rodapé com pouco conteúdo", applicability: "Sempre (cálculo nativo do QPage)", tokens: "min-height inline-style calculado em JS" },
              { state: "Scrollable", visual: "Página rola naturalmente quando excede viewport", applicability: "Conteúdo > altura disponível", tokens: "Comportamento nativo do navegador" },
              { state: "Dark mode", visual: "Cores herdadas do DssLayout (surface-muted)", applicability: "[data-theme='dark']", tokens: "--dss-surface-muted, --dss-text-body" },
              { state: "Forced-colors", visual: "Canvas / CanvasText (Windows High Contrast)", applicability: "@media (forced-colors: active)", tokens: "System colors" },
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

      {/* SEÇÃO 5: ANATOMIA */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssPage" layers={anatomyData} />

      {/* Props API */}
      <CollapsibleSection icon={FileText} title="Props API" titleAccent="& Eventos">
        <div className="space-y-6 pt-4">
          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>DssPage — Props Expostas</h4>
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
            <p className="text-sm" style={{ color: "var(--jtech-text-muted)" }}>
              Nenhuma prop nativa do QPage é bloqueada. DssPage expõe apenas <code className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>padding</code> e <code className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>style-fn</code> — as demais propriedades nativas não foram identificadas como necessárias para o escopo mínimo do componente.
            </p>
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
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo principal da página: cards, grids, formulários, dashboards, tabelas, etc.</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Slot livre — sem restrições de tipo. O layout interno é responsabilidade do consumidor.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* Tokens */}
      <CollapsibleSection icon={Code} title="Tokens">
        <div className="pt-4">
          <p className="text-sm mb-4" style={{ color: "var(--jtech-text-body)" }}>
            DssPage consome um conjunto reduzido de tokens DSS — é um container estrutural, não-interativo:
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
                { type: "Espaçamento", role: "Padding interno governado (--dss-container-padding) quando padding=true", ref: "DSS_TOKEN_REFERENCE.md §7.5" },
                { type: "Surfaces", role: "Cor de fundo herdada do DssLayout (--dss-surface-muted)", ref: "DSS_TOKEN_REFERENCE.md §3" },
                { type: "Texto", role: "Cor de texto herdada (--dss-text-body)", ref: "DSS_TOKEN_REFERENCE.md §4" },
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
                "role=\"main\" aplicado por padrão (landmark navigation — WCAG 1.3.1)",
                "Override consciente de role via $attrs (após o default), respeitando intenção do consumidor",
                "Contraste de texto herdado garante WCAG 1.4.3 (AA)",
                "Sem captura de foco — não interfere na navegação por teclado",
                "Compatível com leitores de tela (estrutura semântica)",
                "Suporte nativo a forced-colors (Canvas / CanvasText)",
                "Compatível com prefers-reduced-motion (sem animações próprias)",
                "Não-interativo — sem necessidade de focus ring, ARIA states ou gerenciamento de teclado",
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
                  { criterion: "1.3.1 Informação e Relações", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "2.4.1 Pular Blocos (landmark main)", level: "A" },
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

            <h4 className="font-medium mt-4" style={{ color: "var(--jtech-heading-tertiary)" }}>📋 Touch Target</h4>
            <p className="text-sm" style={{ color: "var(--jtech-text-muted)" }}>
              Não aplicável — DssPage é um componente estrutural não-interativo (sem hover, focus, click ou disabled).
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Anti-patterns */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Envolver DssPage em uma <div> extra",
              wrong: '<DssPageContainer>\n  <div class="my-wrapper">\n    <DssPage>...</DssPage>\n  </div>\n</DssPageContainer>',
              correct: '<DssPageContainer>\n  <DssPage>...</DssPage>\n</DssPageContainer>',
              reason: "O Quasar injeta inline-style com min-height calculado no <q-page>. Envolver em <div> aplica a altura mínima ao wrapper, mas o <q-page> interno não expande — quebrando o sticky footer. EXC-01: <q-page> deve ser o elemento raiz do template.",
            },
            {
              title: "Aplicar cor de fundo direto no DssPage",
              wrong: '<DssPage style="background-color: white">...</DssPage>',
              correct: '<!-- Cor de fundo é responsabilidade do DssLayout -->\n<DssLayout>\n  <DssPageContainer>\n    <DssPage>...</DssPage>\n  </DssPageContainer>\n</DssLayout>',
              reason: "Cor de fundo da aplicação é definida pelo DssLayout (--dss-surface-muted). O DssPage é transparente por design para herdar a superfície correta em light/dark mode.",
            },
            {
              title: "Usar DssPage fora de DssLayout + DssPageContainer",
              wrong: '<template>\n  <DssPage>Conteúdo</DssPage>\n</template>',
              correct: '<template>\n  <DssLayout>\n    <DssHeader />\n    <DssPageContainer>\n      <DssPage>Conteúdo</DssPage>\n    </DssPageContainer>\n  </DssLayout>\n</template>',
              reason: "O cálculo de min-height do QPage depende dos offsets injetados pelo QLayout (header/footer). Sem DssLayout, o sticky footer não funciona e o role=\"main\" perde contexto semântico.",
            },
            {
              title: "Usar padding hardcoded no DssPage",
              wrong: '<DssPage style="padding: 20px">...</DssPage>',
              correct: '<DssPage padding>...</DssPage>',
              reason: "A prop padding aplica --dss-container-padding (token DSS, responsivo: 16px mobile / 24px desktop). Valores hardcoded violam Token First e quebram a responsividade governada.",
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

      {/* Vinculantes */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.4">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssPage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Gate de Responsabilidade v2.4", application: "DssPage gerencia apenas a área de conteúdo principal e o landmark role=\"main\". NÃO gerencia cor de fundo (DssLayout), scrollbars (DssScrollArea), nem layout interno (responsabilidade do consumidor)." },
                { rule: "Gate de Composição v2.4", application: "Wrapper direto sobre <q-page>. Slot default livre — sem restrições de conteúdo." },
                { rule: "Pseudo-elementos (::before / ::after)", application: "Não utilizados. Componente não-interativo, sem touch target ou overlays." },
                { rule: "Uso de brightness()", application: "Não utilizado." },
                { rule: "Classificação do componente", application: "Composição de Terceiro Grau (Nível 4) — Visual / Estrutural. Golden Reference: DssBadge (não-interativo). Golden Context: DssLayout (baseline arquitetural)." },
                { rule: "Brandabilidade", application: "Não aplicável — container estrutural transparente. Brand é aplicada por componentes filhos." },
                { rule: "Tokens genéricos para altura", application: "Não cria tokens próprios. Min-height é calculado dinamicamente pelo Quasar (inline-style)." },
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
                  { id: "EXC-01", value: "<q-page> como elemento raiz do template", reason: "QPage recebe inline-style com min-height calculado em JavaScript a partir dos offsets do QLayout pai (--q-header-offset, --q-footer-offset). Envolver em <div> aplicaria a altura mínima ao wrapper, mas o <q-page> interno não expandiria — quebrando o sticky footer. Precedente canônico: DssLayout, DssPageContainer." },
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
              "pre_prompt_dss_page.md",
              "DssPage.ts.vue (1-structure)",
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md (Golden Reference: DssBadge · Golden Context: DssLayout)",
              "PLAYGROUND_STANDARD.md (v3.2)",
              "PLAYGROUND_COMPLIANCE_CHECKLIST.md",
              "01_PAGE_LAYOUT.md (regras de container e ritmo vertical)",
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
