// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Code, FileText, CheckCircle, XCircle, ArrowDownToLine } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import {
  DssPlayground, ControlGrid, VariantSelector, BrandPicker, ToggleGroup,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

const directionOptions = [
  { name: "forward", label: "Forward", desc: "Carrega ao chegar no fundo (default)" },
  { name: "reverse", label: "Reverse", desc: "Carrega ao chegar no topo (chats)" },
];

const offsetOptions = [
  { name: "100", label: "100px" },
  { name: "250", label: "250px" },
  { name: "500", label: "500px" },
  { name: "1000", label: "1000px" },
];

const propsData = [
  { category: "Trigger", prop: "offset", type: "Number", default: "500", description: "Distância em pixels antes do limite que aciona @load." },
  { category: "Trigger", prop: "debounce", type: "Number", default: "100", description: "Debounce em milissegundos para o evento de scroll." },
  { category: "Trigger", prop: "scrollTarget", type: "String | Element | null", default: "null", description: "Seletor ou ref DOM do container de scroll pai." },
  { category: "Paginação", prop: "initialIndex", type: "Number", default: "0", description: "Índice inicial passado para o primeiro @load." },
  { category: "Comportamento", prop: "reverse", type: "Boolean", default: "false", description: "Modo reverso: carrega ao atingir o topo." },
  { category: "Comportamento", prop: "disable", type: "Boolean", default: "false", description: "Desabilita a detecção de scroll e o @load." },
];

const eventsData = [
  { event: "load", payload: "(index: number, done: (stop?: boolean) => void)", desc: "Solicita carregamento. Chame done() ao finalizar; done(true) encerra o ciclo." },
];

const slotsData = [
  { slot: "default", desc: "Conteúdo da lista que cresce a cada carregamento." },
  { slot: "loading", desc: "Indicador de carregamento. Default: DssSpinner." },
  { slot: "no-more", desc: "Mensagem exibida quando done(true) é chamado — sem mais itens." },
];

const exposeData = [
  { method: "poll()", desc: "Verifica posição de scroll e carrega se necessário." },
  { method: "trigger()", desc: "Força carregamento independente da posição." },
  { method: "reset()", desc: "Reseta o índice para 0 e reativa o carregamento." },
  { method: "stop()", desc: "Para o funcionamento do infinite scroll." },
  { method: "resume()", desc: "Retoma e verifica posição." },
  { method: "setIndex(n)", desc: "Define o índice de paginação manualmente." },
  { method: "isLoading", desc: "Estado reativo: carregamento em progresso (readonly)." },
  { method: "noMore", desc: "Estado reativo: sem mais itens (readonly)." },
];

const anatomyData = {
  structure: {
    files: ["DssInfiniteScroll.ts.vue"],
    description: "Wrapper governado sobre QInfiniteScroll. QInfiniteScroll é o root element (EXC-Gate-01). Expõe API imperativa via defineExpose (poll/trigger/reset/stop/resume/setIndex + isLoading/noMore).",
    responsibilities: [
      "Template Vue + TypeScript",
      "Mapeamento de props e re-emissão de @load",
      "defineExpose com API imperativa",
      "Slots #loading (DssSpinner) e #no-more",
    ],
    tokens: [],
    codeExample: `<q-infinite-scroll
  v-bind="$attrs"
  :offset="offset"
  :debounce="debounce"
  :initial-index="initialIndex"
  :scroll-target="scrollTarget ?? undefined"
  :reverse="reverse"
  :disable="disable"
  @load="(i, done) => emit('load', i, done)"
  ref="qref"
>
  <slot />
  <template #loading>
    <slot name="loading"><DssSpinner /></slot>
  </template>
</q-infinite-scroll>`,
  },
  composition: {
    files: ["_base.scss"],
    description: "Container comportamental sem estilos visuais próprios. Layout e espaçamento dos itens são responsabilidade do consumidor.",
    responsibilities: [
      "Sem hover/focus/active (não interativo)",
      "Sem touch target (delegado a itens internos)",
      "Spinner centralizado nos slots #loading e #no-more",
    ],
    tokens: ["--dss-padding-md", "--dss-text-subtle"],
    codeExample: `.dss-infinite-scroll {
  &__loading,
  &__no-more {
    display: flex;
    justify-content: center;
    padding: var(--dss-padding-md);
    color: var(--dss-text-subtle);
  }
}`,
  },
  variants: {
    files: ["_variant.scss"],
    description: "Modificador --reverse inverte a direção visual do indicador. Sem outras variantes visuais — componente comportamental.",
    responsibilities: [
      "Modificador --reverse",
      "Modificador --disable (oculta loading)",
    ],
    tokens: [],
    codeExample: `.dss-infinite-scroll--reverse .dss-infinite-scroll__loading {
  order: -1;
}

.dss-infinite-scroll--disable .dss-infinite-scroll__loading {
  display: none;
}`,
  },
  output: {
    files: ["_states.scss", "_brands.scss"],
    description: "prefers-reduced-motion neutraliza o pulso do spinner; forced-colors usa CanvasText no texto de no-more. Brand pinta apenas o spinner via DssSpinner.",
    responsibilities: [
      "Reduced-motion no spinner",
      "Forced-colors no texto no-more",
      "Print: oculta loading e no-more",
    ],
    tokens: ["--dss-action-hub", "--dss-action-water", "--dss-action-waste"],
    codeExample: `@media (forced-colors: active) {
  .dss-infinite-scroll__no-more {
    color: CanvasText;
  }
}

@media print {
  .dss-infinite-scroll__loading,
  .dss-infinite-scroll__no-more {
    display: none;
  }
}`,
  },
};

interface PreviewProps {
  offset: number;
  direction: string;
  brand?: string | null;
  isDarkMode?: boolean;
  disable?: boolean;
  done?: boolean;
}

function DssInfiniteScrollPreview({
  offset, direction, brand = null, isDarkMode = false,
  disable = false, done = false,
}: PreviewProps) {
  const [items, setItems] = useState<number[]>(() => Array.from({ length: 8 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(done);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsDone(done); }, [done]);

  const accent = brand && DSS_BRAND_COLORS[brand]?.principal || "#1f86de";
  const surface = isDarkMode ? "#1a1a1a" : "#ffffff";
  const fg = isDarkMode ? "#e5e5e5" : "#454545";
  const muted = isDarkMode ? "#707070" : "#a3a3a3";
  const borderSubtle = isDarkMode ? "#404040" : "#e5e5e5";
  const itemBg = isDarkMode ? "#262626" : "#f4f4f5";

  const loadMore = () => {
    if (loading || isDone || disable) return;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => {
        const next = prev.length;
        const more = Array.from({ length: 4 }, (_, i) => next + i + 1);
        const result = direction === "reverse" ? [...more.reverse(), ...prev] : [...prev, ...more];
        if (result.length >= 24) setIsDone(true);
        return result;
      });
      setLoading(false);
    }, 700);
  };

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el || loading || isDone || disable) return;
    if (direction === "reverse") {
      if (el.scrollTop <= offset) loadMore();
    } else {
      if (el.scrollHeight - el.scrollTop - el.clientHeight <= offset) loadMore();
    }
  };

  const reset = () => {
    setItems(Array.from({ length: 8 }, (_, i) => i + 1));
    setIsDone(done);
    if (containerRef.current) containerRef.current.scrollTop = direction === "reverse" ? 9999 : 0;
  };

  const showSpinner = loading;
  const showNoMore = isDone && !loading;

  const loadingNode = (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", padding: 12, gap: 8,
      color: muted, fontSize: 12,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%",
        border: `2px solid ${borderSubtle}`, borderTopColor: accent,
        animation: "spin 0.8s linear infinite",
      }} />
      Carregando…
    </div>
  );

  const noMoreNode = (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 12, color: muted, fontSize: 12, fontStyle: "italic",
    }}>
      Fim da lista — sem mais itens.
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          width: "100%", maxWidth: 480, height: 320,
          overflowY: "auto",
          border: `1px solid ${borderSubtle}`,
          borderRadius: 8,
          backgroundColor: surface,
          padding: 8,
        }}
        role="feed"
        aria-busy={loading}
        aria-label="Lista com infinite scroll"
      >
        {direction === "reverse" && showSpinner && loadingNode}
        {direction === "reverse" && showNoMore && noMoreNode}
        {items.map((n) => (
          <div
            key={n}
            style={{
              padding: "10px 12px",
              marginBottom: 6,
              backgroundColor: itemBg,
              borderRadius: 6,
              fontSize: 13,
              color: fg,
              borderLeft: `3px solid ${accent}`,
            }}
          >
            Item #{n}
          </div>
        ))}
        {direction === "forward" && showSpinner && loadingNode}
        {direction === "forward" && showNoMore && noMoreNode}
      </div>
      <div className="flex items-center gap-3 text-xs" style={{ color: muted }}>
        <span>
          {items.length} itens · offset <strong style={{ color: fg }}>{offset}px</strong> ·{" "}
          <strong style={{ color: fg }}>{direction}</strong>
          {disable && " · disable"}
        </span>
        <button
          onClick={reset}
          style={{
            border: `1px solid ${borderSubtle}`, color: fg, background: "transparent",
            padding: "4px 10px", borderRadius: 4, fontSize: 11, cursor: "pointer",
          }}
        >
          reset()
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function DssInfiniteScrollPage() {
  const [selectedOffset, setSelectedOffset] = useState("250");
  const [selectedDirection, setSelectedDirection] = useState("forward");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [booleanStates, setBooleanStates] = useState({
    disable: false,
    done: false,
  });

  const toggle = (n: string) =>
    setBooleanStates((p) => ({ ...p, [n]: !p[n as keyof typeof p] }));

  const generateCode = () => {
    const props: string[] = [
      `@load="onLoad"`,
      `:offset="${selectedOffset}"`,
    ];
    if (selectedDirection === "reverse") props.push(`reverse`);
    if (booleanStates.disable) props.push(`disable`);
    if (selectedBrand) props.push(`brand="${selectedBrand}"`);
    return `<DssInfiniteScroll\n  ${props.join("\n  ")}\n>\n  <div v-for="item in items" :key="item.id">\n    {{ item.label }}\n  </div>\n</DssInfiniteScroll>`;
  };

  const flagOptions = [
    { name: "disable", label: "Disable" },
    { name: "done", label: "No more (done)" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      <PageHeader
        icon={ArrowDownToLine}
        badge="Componente Base"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssInfiniteScroll"
        subtitle="DssInfiniteScroll é o wrapper DSS governado sobre o QInfiniteScroll do Quasar. Container comportamental não interativo que dispara carregamento de mais conteúdo conforme o usuário rola a página, com suporte a modo reverso, debounce, offset configurável e API imperativa via defineExpose."
        subtitleHighlights={["scroll forward/reverse", "API imperativa", "debounce configurável", "WCAG aria-busy / feed"]}
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
              "Feeds longos e cronológicos (notícias, posts, atividades)",
              "Listas paginadas onde o usuário consome sequencialmente",
              "Chats e mensagens em modo reverse (carrega histórico ao subir)",
              "Galerias e timelines com grande volume de itens",
              "Quando a paginação tradicional cria fricção desnecessária",
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
                { s: "Listas curtas com total conhecido (< 50 itens)", a: "Render direto" },
                { s: "Navegação por páginas com âncoras compartilháveis", a: "DssPagination" },
                { s: "Tabelas com ordenação/filtros e total fixo", a: "DssTable + paginação" },
                { s: "Resultados de busca com SEO crítico", a: "DssPagination (URL com page=)" },
                { s: "Rodapé persistente abaixo do conteúdo", a: "Layout fixo (rodapé inalcançável com IS)" },
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
        title="Configure o Infinite Scroll"
        description="Role a lista até o limite para acionar o @load. Teste forward/reverse, offset, disable e estado done (sem mais itens)."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="420px"
        previewContent={
          <DssInfiniteScrollPreview
            offset={parseInt(selectedOffset, 10)}
            direction={selectedDirection}
            brand={selectedBrand}
            isDarkMode={isDarkMode}
            disable={booleanStates.disable}
            done={booleanStates.done}
          />
        }
        controls={
          <ControlGrid columns={4}>
            <VariantSelector label="Direction" variants={directionOptions} selectedVariant={selectedDirection} onSelect={setSelectedDirection} />
            <VariantSelector label="Offset" variants={offsetOptions} selectedVariant={selectedOffset} onSelect={setSelectedOffset} />
            <BrandPicker brands={DSS_BRAND_COLORS} selectedBrand={selectedBrand} onSelect={setSelectedBrand} />
            <ToggleGroup label="Estado" options={flagOptions} values={booleanStates} onToggle={toggle} />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssInfiniteScroll" layers={anatomyData} />

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

          <div>
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>API Imperativa (defineExpose)</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Método / Estado</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exposeData.map((m, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{m.method}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{m.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
                "role=\"feed\" e aria-busy gerenciados no container (recomendado)",
                "Spinner com aria-hidden — feedback acessível via aria-busy",
                "Suporte a reduced-motion (sem pulso no spinner)",
                "forced-colors usa CanvasText no texto no-more",
                "Modo disable: encerra detecção (útil para QA e testes)",
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
                "Garantir foco gerenciado ao inserir novos itens (não quebrar contexto)",
                "Anunciar novos itens via aria-live=\"polite\" quando relevante",
                "Prover botão fallback \"Carregar mais\" para usuários de teclado",
                "Chamar done(true) explicitamente ao final — evita loop infinito",
                "Considerar rodapé inalcançável — disponibilize navegação alternativa",
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
