import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Check, Code, FileText, Image as ImageIcon, CheckCircle, XCircle,
  AlertTriangle, Info, BookOpen, Shield, ChevronLeft, ChevronRight,
  Pause, Play,
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
  SizeSelector,
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

// ============================================================================
// DADOS DO COMPONENTE
// ============================================================================

const transitionOptions = [
  { name: "slide", label: "Slide", desc: "Deslizamento horizontal clássico" },
  { name: "fade", label: "Fade", desc: "Dissolução suave entre slides" },
  { name: "scale", label: "Scale", desc: "Escala com fade" },
  { name: "jump-up", label: "Jump Up", desc: "Salto vertical" },
];

const aspectOptions = [
  { name: "16-9", label: "16:9", desc: "Widescreen", height: "180px" },
  { name: "4-3", label: "4:3", desc: "Standard", height: "240px" },
  { name: "1-1", label: "1:1", desc: "Quadrado", height: "300px" },
  { name: "21-9", label: "21:9", desc: "Ultrawide", height: "140px" },
];

const propsData = [
  { category: "Controle", prop: "modelValue", type: "String | Number", default: "0", description: "Índice do slide ativo (0-based)" },
  { category: "Controle", prop: "animated", type: "Boolean", default: "true", description: "Habilita transições animadas entre slides" },
  { category: "Controle", prop: "infinite", type: "Boolean", default: "true", description: "Navegação cíclica (último → primeiro)" },
  { category: "Controle", prop: "autoplay", type: "Boolean | Number", default: "false", description: "Avanço automático em ms (ex: 3000)" },
  { category: "Navegação", prop: "arrows", type: "Boolean", default: "true", description: "Exibe setas de navegação lateral" },
  { category: "Navegação", prop: "navigation", type: "Boolean", default: "true", description: "Exibe indicadores de posição (dots)" },
  { category: "Navegação", prop: "navigationIcon", type: "String", default: "undefined", description: "Ícone customizado para navegação" },
  { category: "Navegação", prop: "thumbnails", type: "Boolean", default: "false", description: "Exibe miniaturas em vez de dots" },
  { category: "Touch", prop: "swipeable", type: "Boolean", default: "true", description: "Permite navegação por swipe em touch" },
  { category: "Visual", prop: "height", type: "String", default: "'400px'", description: "Altura do carrossel (CSS unit)" },
  { category: "Visual", prop: "padding", type: "Boolean", default: "false", description: "Adiciona padding interno nos slides" },
  { category: "Transição", prop: "transitionPrev", type: "String", default: "'slide-right'", description: "Animação ao voltar slide" },
  { category: "Transição", prop: "transitionNext", type: "String", default: "'slide-left'", description: "Animação ao avançar slide" },
  { category: "Acessibilidade", prop: "ariaLabel", type: "String", default: "'Carrossel'", description: "Label ARIA para screen readers" },
];

const slidesData = [
  { id: 1, title: "Slide 1", color: "#c41e3a", content: "Conteúdo do primeiro slide" },
  { id: 2, title: "Slide 2", color: "#1e3a5f", content: "Segundo slide com informações" },
  { id: 3, title: "Slide 3", color: "#0d7a5f", content: "Terceiro slide do carrossel" },
  { id: 4, title: "Slide 4", color: "#6b3a2a", content: "Quarto e último slide" },
];

const anatomyData = {
  structure: {
    files: ["DssCarrossel.ts.vue"],
    description: "Camada responsável pelo template Vue, definição de props e interface do componente wrapper sobre q-carousel.",
    responsibilities: [
      "Definição do template HTML semântico com q-carousel",
      "Declaração de props com validação TypeScript",
      "Emissão de eventos (@update:model-value)",
      "Binding de slots (default para slides)",
      "Composables useCarrosselClasses",
    ],
    tokens: [],
    codeExample: `<template>
  <q-carousel
    v-model="slide"
    :animated="props.animated"
    :infinite="props.infinite"
    :autoplay="props.autoplay"
    :arrows="props.arrows"
    :navigation="props.navigation"
    :swipeable="props.swipeable"
    :height="props.height"
    :transition-prev="props.transitionPrev"
    :transition-next="props.transitionNext"
  >
    <q-carousel-slide
      v-for="(s, i) in slides"
      :key="i"
      :name="i"
    >
      <slot :slide="s" :index="i" />
    </q-carousel-slide>
  </q-carousel>
</template>`,
  },
  composition: {
    files: ["2-composition/base.scss"],
    description: "Estilos fundamentais que definem o layout, dimensões e reset do carrossel.",
    responsibilities: [
      "Container com overflow hidden e position relative",
      "Dimensões via tokens (--dss-compact-control-height-*)",
      "Reset de estilos nativos do Quasar",
      "Base para indicadores de navegação",
    ],
    tokens: ["--dss-radius-lg", "--dss-shadow-md", "--dss-transition-base"],
    codeExample: `.dss-carrossel {
  position: relative;
  overflow: hidden;
  border-radius: var(--dss-radius-lg);
  box-shadow: var(--dss-shadow-md);

  &__slide {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}`,
  },
  variants: {
    files: ["3-variants/_navigation.scss", "3-variants/_transitions.scss"],
    description: "Define as variações visuais: estilos de navegação e tipos de transição.",
    responsibilities: [
      "Navegação: dots, thumbnails, setas customizadas",
      "Transições: slide, fade, scale, jump",
      "Posicionamento dos controles de navegação",
    ],
    tokens: ["--dss-action-primary", "--dss-text-inverse", "--dss-radius-full"],
    codeExample: `.dss-carrossel--thumbnails {
  .dss-carrossel__nav {
    display: flex;
    gap: var(--dss-spacing-xs);
    padding: var(--dss-spacing-sm);
  }
}

.dss-carrossel--arrows-outside {
  .q-carousel__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}`,
  },
  output: {
    files: ["4-output/DssCarrossel.scss", "_states.scss", "_accessibility.scss"],
    description: "Camada final que aplica estados interativos, dark mode e acessibilidade.",
    responsibilities: [
      "Estados hover/focus nos controles de navegação",
      "Indicador ativo com contraste suficiente",
      "Suporte a prefers-reduced-motion",
      "Suporte a prefers-contrast e forced-colors",
    ],
    tokens: ["--dss-focus-ring", "--dss-transition-base", "--dss-opacity-disabled"],
    codeExample: `.dss-carrossel__nav-dot:focus-visible {
  outline: 2px solid var(--dss-action-primary);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .dss-carrossel * {
    transition: none !important;
    animation: none !important;
  }
}`,
  },
};

// ============================================================================
// PREVIEW DO CARROSSEL
// ============================================================================

interface DssCarrosselPreviewProps {
  arrows: boolean;
  autoplay: boolean;
  navigation: boolean;
  thumbnails: boolean;
  swipeable: boolean;
  infinite: boolean;
  padding: boolean;
  aspectRatio: string;
  transitionType: string;
  darkMode: boolean;
}

function DssCarrosselPreview({
  arrows,
  autoplay,
  navigation,
  thumbnails,
  swipeable,
  infinite,
  padding,
  aspectRatio,
  transitionType,
  darkMode,
}: DssCarrosselPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const aspect = aspectOptions.find((a) => a.name === aspectRatio) || aspectOptions[0];

  useEffect(() => {
    if (!autoplay) {
      setIsAutoPlaying(false);
      return;
    }
    setIsAutoPlaying(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (infinite) {
          return (prev + 1) % slidesData.length;
        }
        return Math.min(prev + 1, slidesData.length - 1);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [autoplay, infinite]);

  const goTo = (index: number) => {
    if (infinite) {
      setActiveIndex((index + slidesData.length) % slidesData.length);
    } else {
      setActiveIndex(Math.max(0, Math.min(index, slidesData.length - 1)));
    }
  };

  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swipeable) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!swipeable || touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    setTouchStartX(null);
  };

  const getTransitionStyle = () => {
    const base = { transition: "all 0.4s ease-in-out" };
    switch (transitionType) {
      case "fade": return { ...base, opacity: 1 };
      case "scale": return { ...base, transform: "scale(1)" };
      default: return { ...base, transform: "translateX(0)" };
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{
        height: aspect.height,
        backgroundColor: darkMode ? "#1a1a2e" : "#f5f5f5",
        border: `1px solid ${darkMode ? "#333" : "#ddd"}`,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrossel de demonstração"
    >
      {/* Slides */}
      <div className="relative w-full h-full overflow-hidden">
        {slidesData.map((slide, idx) => {
          const isActive = idx === activeIndex;
          const isPrev = idx === (infinite
            ? (activeIndex - 1 + slidesData.length) % slidesData.length
            : activeIndex - 1);
          const isNext = idx === (infinite
            ? (activeIndex + 1) % slidesData.length
            : activeIndex + 1);

          let transform = "translateX(100%)";
          let opacity = 0;
          if (isActive) { transform = "translateX(0)"; opacity = 1; }
          else if (isPrev && transitionType === "slide") { transform = "translateX(-100%)"; }
          else if (isNext && transitionType === "slide") { transform = "translateX(100%)"; }

          if (transitionType === "fade") {
            transform = "translateX(0)";
            opacity = isActive ? 1 : 0;
          }

          if (transitionType === "scale") {
            transform = isActive ? "scale(1)" : "scale(0.9)";
            opacity = isActive ? 1 : 0;
          }

          return (
            <div
              key={slide.id}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                transform,
                opacity,
                transition: "all 0.4s ease-in-out",
                padding: padding ? "16px" : "0",
                backgroundColor: slide.color,
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={slide.title}
              aria-hidden={!isActive}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{slide.title}</h3>
              <p className="text-white/80 text-sm">{slide.content}</p>
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      {arrows && (
        <>
          <button
            onClick={goPrev}
            disabled={!infinite && activeIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            disabled={!infinite && activeIndex === slidesData.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Navigation dots / thumbnails */}
      {navigation && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1.5 rounded-full"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          role="tablist"
          aria-label="Navegação do carrossel"
        >
          {slidesData.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goTo(idx)}
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Ir para slide ${idx + 1}`}
              className="transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-full"
              style={{
                width: thumbnails ? "40px" : "10px",
                height: thumbnails ? "28px" : "10px",
                borderRadius: thumbnails ? "4px" : "50%",
                backgroundColor: idx === activeIndex
                  ? "white"
                  : "rgba(255,255,255,0.4)",
                transform: idx === activeIndex ? "scale(1.1)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssCarrosselPage() {
  const [arrows, setArrows] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [navigation, setNavigation] = useState(true);
  const [thumbnails, setThumbnails] = useState(false);
  const [swipeable, setSwipeable] = useState(true);
  const [infinite, setInfinite] = useState(true);
  const [padding, setPadding] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("16-9");
  const [transitionType, setTransitionType] = useState("slide");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleState = (setter: React.Dispatch<React.SetStateAction<boolean>>) =>
    setter((prev) => !prev);

  const generateCode = () => {
    const props: string[] = [];
    if (!arrows) props.push(':arrows="false"');
    if (autoplay) props.push('autoplay="3000"');
    if (!navigation) props.push(':navigation="false"');
    if (thumbnails) props.push("thumbnails");
    if (!swipeable) props.push(':swipeable="false"');
    if (!infinite) props.push(':infinite="false"');
    if (padding) props.push("padding");
    if (aspectRatio !== "16-9") props.push(`height="${aspectOptions.find((a) => a.name === aspectRatio)?.height || "400px"}"`);
    if (transitionType !== "slide") {
      props.push(`transition-prev="${transitionType}-right"`);
      props.push(`transition-next="${transitionType}-left"`);
    }

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}` : "";
    return `<DssCarrossel${propsStr}\n>
  <DssCarrosselSlide name="1">Slide 1</DssCarrosselSlide>
  <DssCarrosselSlide name="2">Slide 2</DssCarrosselSlide>
  <DssCarrosselSlide name="3">Slide 3</DssCarrosselSlide>
</DssCarrossel>`;
  };

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* ================================================================
       * SEÇÃO 1: BADGES + TÍTULO
       * ================================================================ */}
      <PageHeader
        icon={ImageIcon}
        badge="Golden Context: DssTabs"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssCarrossel"
        subtitle="DssCarrossel é o componente de apresentação de conteúdo em sequência, utilizado para exibir imagens, banners, depoimentos ou qualquer conteúdo em formato de slides navegáveis. Ele oferece transições suaves, navegação por touch, autoplay e múltiplos padrões de indicadores, sendo composto junto a DssImg, DssCard e DssButton para criar experiências de conteúdo ricas."
        subtitleHighlights={["transições suaves", "navegação por touch", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.2", variant: "info" },
          { label: "Quasar Compatible", variant: "info" },
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
              "Banners promocionais e hero images em landing pages",
              "Galerias de fotos e portfolios com navegação intuitiva",
              "Depoimentos e quotes rotativos em seções de conteúdo",
              "Onboarding e tutoriais em steps visuais",
              "Apresentação de produtos com múltiplas imagens/ângulos",
              "Notícias e destaques em portais de conteúdo",
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
                { scenario: "Conteúdo tabulado com categorias", alt: "DssTabs" },
                { scenario: "Grid de imagens visualizáveis ao mesmo tempo", alt: "DssImg em Grid" },
                { scenario: "Navegação entre páginas", alt: "DssPagination" },
                { scenario: "Lista rolável de itens infinita", alt: "DssInfiniteScroll" },
                { scenario: "Conteúdo que exige comparação lado a lado", alt: "Layout em colunas" },
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
        title="Configure o Carrossel"
        description="Selecione as props e veja o resultado em tempo real com tokens DSS reais."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssCarrosselPreview
            arrows={arrows}
            autoplay={autoplay}
            navigation={navigation}
            thumbnails={thumbnails}
            swipeable={swipeable}
            infinite={infinite}
            padding={padding}
            aspectRatio={aspectRatio}
            transitionType={transitionType}
            darkMode={isDarkMode}
          />
        }
        controls={
          <ControlGrid columns={4}>
            <VariantSelector
              label="Proporção"
              variants={aspectOptions.map((a) => ({ name: a.name, label: a.label, desc: a.desc }))}
              selectedVariant={aspectRatio}
              onSelect={setAspectRatio}
            />

            <VariantSelector
              label="Transição"
              variants={transitionOptions}
              selectedVariant={transitionType}
              onSelect={setTransitionType}
            />

            <ToggleGroup
              label="Navegação"
              options={[
                { name: "arrows", label: "Setas" },
                { name: "navigation", label: "Dots" },
                { name: "thumbnails", label: "Thumbnails" },
              ]}
              values={{ arrows, navigation, thumbnails }}
              onToggle={(name) => {
                if (name === "arrows") toggleState(setArrows);
                if (name === "navigation") toggleState(setNavigation);
                if (name === "thumbnails") toggleState(setThumbnails);
              }}
            />

            <ToggleGroup
              label="Comportamento"
              options={[
                { name: "autoplay", label: "Autoplay" },
                { name: "swipeable", label: "Swipe" },
                { name: "infinite", label: "Infinito" },
                { name: "padding", label: "Padding" },
              ]}
              values={{ autoplay, swipeable, infinite, padding }}
              onToggle={(name) => {
                if (name === "autoplay") toggleState(setAutoplay);
                if (name === "swipeable") toggleState(setSwipeable);
                if (name === "infinite") toggleState(setInfinite);
                if (name === "padding") toggleState(setPadding);
              }}
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
              { state: "Default", visual: "Slide ativo em destaque, controles visíveis", interaction: "Pronto para navegação", tokens: "--dss-radius-lg", a11y: "aria-roledescription=\"carousel\"" },
              { state: "Hover", visual: "Controles de navegação com opacidade aumentada", interaction: "Pointer over nos controles", tokens: "--dss-transition-base", a11y: "—" },
              { state: "Focus", visual: "Focus ring visível nos botões de navegação", interaction: "Navegação por teclado (Tab, Enter, Setas)", tokens: "--dss-focus-ring", a11y: "WCAG 2.4.7" },
              { state: "Active", visual: "Botão de navegação pressionado com feedback visual", interaction: "Clique / toque", tokens: "--dss-transition-base", a11y: "—" },
              { state: "Autoplay", visual: "Slides avançando automaticamente", interaction: "Pausa ao hover/focus (quando suportado)", tokens: "--dss-transition-base", a11y: "aria-live=\"polite\"" },
              { state: "Disabled", visual: "Controle inativo (ex: seta no início sem infinite)", interaction: "Não interativo", tokens: "--dss-opacity-disabled", a11y: "aria-disabled=\"true\"" },
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
      <AnatomySection componentName="DssCarrossel" layers={anatomyData} />

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
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>update:modelValue</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>String | Number</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>Emitido quando o slide ativo muda</TableCell>
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
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Slides do carrossel (q-carousel-slide)</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Conteúdo de cada slide: imagens, textos, cards</TableCell>
              </TableRow>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>control</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Slot para controles de navegação customizados</TableCell>
                <TableCell style={{ color: "var(--jtech-text-body)" }}>Substituir os controles padrão do Quasar</TableCell>
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
                { type: "Cores Semânticas", role: "Indicadores de navegação ativa/inativa", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Cor de destaque nos controles (opcional)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Dimensões", role: "Altura do carrossel e touch targets dos controles", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius do container e controles", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Sombras", role: "Sombra do container principal", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transições entre slides e hover nos controles", ref: "DSS_TOKEN_REFERENCE.md" },
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
                'role="region" com aria-roledescription="carousel"',
                'Slides com role="group" e aria-roledescription="slide"',
                "Controles de navegação com aria-label descritivo",
                "Indicadores como role=\"tablist\" com aria-selected",
                "Navegação completa por teclado (Tab, Enter, Setas)",
                "Contraste mínimo 4.5:1 nos controles",
                "Suporte a prefers-reduced-motion (pausa animações)",
                "Suporte a forced-colors: active",
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
                  { criterion: "1.3.1 Info e Relações", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "2.1.1 Teclado", level: "A" },
                  { criterion: "2.2.2 Pausa/Parar/Esconder", level: "A" },
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
              title: "Carrossel sem controles de navegação acessíveis",
              wrong: '<DssCarrossel :navigation="false" :arrows="false" />',
              correct: '<DssCarrossel navigation arrows swipeable />',
              reason: "WCAG 2.1.1 e 2.2.2 exigem mecanismos de navegação e controle de movimento. Sem controles, usuários de teclado e screen readers ficam presos.",
            },
            {
              title: "Autoplay sem mecanismo de pausa",
              wrong: '<DssCarrossel autoplay="5000" />',
              correct: '<DssCarrossel autoplay="5000" @mouseenter="pause" @mouseleave="resume" />',
              reason: "WCAG 2.2.2 exige que conteúdo em movimento possa ser pausado. O autoplay contínuo pode causar distração ou náusea em usuários com vestibulares.",
            },
            {
              title: "Conteúdo crítico exclusivo do carrossel",
              wrong: 'Banner de alerta dentro de DssCarrossel',
              correct: 'Conteúdo crítico em DssAlert ou fora do carrossel',
              reason: "Conteúdo essencial não deve depender de interação para ser descoberto. Screen readers podem não anunciar slides não visíveis automaticamente.",
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
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssCarrossel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Pseudo-elementos (::before / ::after)", application: "::before nos botões de navegação para touch target ≥ 48px; ::after no indicador ativo para efeito visual" },
                { rule: "Uso de brightness()", application: "Não utilizado — estados dos controles usam tokens de opacidade e cores semânticas" },
                { rule: "Classificação do componente", application: "Visual Component (apresentação de conteúdo, interação secundária)" },
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
              "Quasar API: q-carousel — https://quasar.dev/vue-components/carousel",
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
