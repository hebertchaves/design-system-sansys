// @ts-nocheck
/**
 * ==========================================================================
 * DssFormPage - Documentação do Componente DssForm
 * ==========================================================================
 * Container de formulário do DSS. Orquestra validação, submissão,
 * agrupamento e densidade dos campos (DssInput, DssSelect, DssCheckbox,
 * DssRadio, DssToggle, etc.).
 *
 * Template v2.3 — playground v3.2 — Golden Context: DssCheckbox
 */

import React, { useState } from "react";
import {
  DssPlayground,
  ControlSection,
  ControlGrid,
  SizeSelector,
  ToggleGroup,
  ColorPicker,
  BrandPicker,
  type SemanticColor,
  type BrandColor,
  type Size,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground/DssPlayground";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  Check,
  X,
  AlertCircle,
  Info,
  ClipboardList as ClipboardListIcon,
} from "lucide-react";

// ==========================================================================
// TIPOS
// ==========================================================================

type FormLayout = "vertical" | "horizontal" | "inline";
type FormValidation = "eager" | "lazy" | "on-submit";
type FormGutter = "sm" | "md" | "lg";

interface DssFormState {
  layout: FormLayout;
  density: Size;
  gutter: FormGutter;
  validation: FormValidation;
  color: SemanticColor | null;
  brand: BrandColor | null;
  feedback: "info" | "positive" | "warning" | "negative" | null;
  noErrorIcon: boolean;
  noResetFocus: boolean;
  autofocus: boolean;
  greedy: boolean;
}

// ==========================================================================
// PREVIEW
// ==========================================================================

function DssFormPreview({
  layout,
  density,
  gutter,
  color,
  brand,
  feedback,
  noErrorIcon,
  isDarkMode,
}: DssFormState & { isDarkMode: boolean }) {
  const resolved = brand
    ? `var(--dss-${brand}-primary)`
    : feedback
    ? `var(--dss-${feedback})`
    : color
    ? `var(--dss-${color})`
    : "var(--dss-primary)";

  const gutterMap: Record<FormGutter, string> = {
    sm: "var(--dss-spacing-2)",
    md: "var(--dss-spacing-4)",
    lg: "var(--dss-spacing-6)",
  };

  const heightMap: Record<Size, string> = {
    xs: "28px",
    sm: "32px",
    md: "40px",
    lg: "48px",
  };

  const fontSize: Record<Size, string> = {
    xs: "var(--dss-font-size-xs)",
    sm: "var(--dss-font-size-sm)",
    md: "var(--dss-font-size-sm)",
    lg: "var(--dss-font-size-md)",
  };

  const surface = isDarkMode ? "#1c1c1f" : "#ffffff";
  const fieldBg = isDarkMode ? "#26262b" : "#ffffff";
  const border = isDarkMode ? "#3a3a40" : "#d4d4d8";
  const text = isDarkMode ? "#e4e4e7" : "#1a1a1a";
  const subtle = isDarkMode ? "#a1a1aa" : "#52525b";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: heightMap[density],
    padding: "0 12px",
    borderRadius: "var(--dss-radius-md)",
    border: `1px solid ${border}`,
    backgroundColor: fieldBg,
    color: text,
    fontSize: fontSize[density],
    fontFamily: "var(--dss-font-family-sans)",
    outline: "none",
    transition: "border-color var(--dss-duration-200) var(--dss-easing-standard)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "var(--dss-font-size-xs)",
    fontWeight: 600,
    color: subtle,
    marginBottom: "4px",
    fontFamily: "var(--dss-font-family-sans)",
  };

  const fieldContainer: React.CSSProperties =
    layout === "horizontal"
      ? { display: "flex", alignItems: "center", gap: "12px" }
      : { display: "block" };

  const formStyle: React.CSSProperties = {
    display: layout === "inline" ? "flex" : "flex",
    flexDirection: layout === "inline" ? "row" : "column",
    flexWrap: layout === "inline" ? "wrap" : "nowrap",
    alignItems: layout === "inline" ? "flex-end" : "stretch",
    gap: gutterMap[gutter],
    width: "100%",
    maxWidth: "520px",
    padding: "var(--dss-spacing-5)",
    borderRadius: "var(--dss-radius-lg)",
    backgroundColor: surface,
    border: `1px solid ${border}`,
    fontFamily: "var(--dss-font-family-sans)",
  };

  const labelW = layout === "horizontal" ? "120px" : "auto";

  return (
    <form
      style={formStyle}
      onSubmit={(e) => e.preventDefault()}
      noValidate
      aria-label="Formulário de exemplo DssForm"
    >
      <div style={fieldContainer}>
        <label style={{ ...labelStyle, minWidth: labelW }} htmlFor="dssform-name">
          Nome
        </label>
        <input
          id="dssform-name"
          type="text"
          placeholder="Digite seu nome"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = resolved)}
          onBlur={(e) => (e.currentTarget.style.borderColor = border)}
        />
      </div>

      <div style={fieldContainer}>
        <label style={{ ...labelStyle, minWidth: labelW }} htmlFor="dssform-email">
          E-mail
        </label>
        <div style={{ position: "relative", width: "100%" }}>
          <input
            id="dssform-email"
            type="email"
            defaultValue="email-invalido"
            style={{
              ...inputStyle,
              borderColor: feedback === "negative" ? resolved : border,
              paddingRight: feedback === "negative" && !noErrorIcon ? "32px" : "12px",
            }}
            aria-invalid={feedback === "negative"}
            aria-describedby={feedback === "negative" ? "dssform-email-err" : undefined}
          />
          {feedback === "negative" && !noErrorIcon && (
            <AlertCircle
              size={16}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: resolved,
              }}
              aria-hidden="true"
            />
          )}
          {feedback === "negative" && (
            <span
              id="dssform-email-err"
              style={{
                display: "block",
                marginTop: "4px",
                fontSize: "var(--dss-font-size-xs)",
                color: resolved,
              }}
            >
              E-mail inválido
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: text,
          fontSize: fontSize[density],
        }}
      >
        <span
          style={{
            display: "inline-flex",
            width: "16px",
            height: "16px",
            borderRadius: "var(--dss-radius-sm)",
            backgroundColor: resolved,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <Check size={12} strokeWidth={3} style={{ color: "#fff" }} />
        </span>
        <span>Aceito os termos de uso</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: layout === "horizontal" ? "flex-end" : "flex-start",
          marginTop: layout === "inline" ? 0 : "4px",
        }}
      >
        <button
          type="button"
          style={{
            height: heightMap[density],
            padding: "0 16px",
            borderRadius: "var(--dss-radius-md)",
            border: `1px solid ${border}`,
            backgroundColor: "transparent",
            color: text,
            cursor: "pointer",
            fontSize: fontSize[density],
            fontFamily: "var(--dss-font-family-sans)",
          }}
        >
          Reset
        </button>
        <button
          type="submit"
          style={{
            height: heightMap[density],
            padding: "0 20px",
            borderRadius: "var(--dss-radius-md)",
            border: "none",
            backgroundColor: resolved,
            color: "#fff",
            cursor: "pointer",
            fontSize: fontSize[density],
            fontWeight: 600,
            fontFamily: "var(--dss-font-family-sans)",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

// ==========================================================================
// CODE GEN
// ==========================================================================

function generateFormCode(s: DssFormState): string {
  const props: string[] = [];
  if (s.layout !== "vertical") props.push(`layout="${s.layout}"`);
  if (s.density !== "md") props.push(`density="${s.density}"`);
  if (s.gutter !== "md") props.push(`gutter="${s.gutter}"`);
  if (s.validation !== "eager") props.push(`validation="${s.validation}"`);
  if (s.brand) props.push(`brand="${s.brand}"`);
  else if (s.feedback) props.push(`color="${s.feedback}"`);
  else if (s.color && s.color !== "primary") props.push(`color="${s.color}"`);
  if (s.noErrorIcon) props.push("no-error-icon");
  if (s.noResetFocus) props.push("no-reset-focus");
  if (s.autofocus) props.push("autofocus");
  if (s.greedy) props.push("greedy");
  props.push("@submit=\"onSubmit\"");
  props.push("@reset=\"onReset\"");

  return `<DssForm\n  ${props.join("\n  ")}\n>\n  <DssInput v-model="form.name" label="Nome" :rules="[required]" />\n  <DssInput v-model="form.email" label="E-mail" type="email" :rules="[required, email]" />\n  <DssCheckbox v-model="form.terms" label="Aceito os termos" :rules="[required]" />\n  <div class="row q-gutter-sm justify-end">\n    <DssButton type="reset" flat label="Reset" />\n    <DssButton type="submit" color="primary" label="Enviar" />\n  </div>\n</DssForm>`;
}

// ==========================================================================
// PÁGINA
// ==========================================================================

export default function DssFormPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [state, setState] = useState<DssFormState>({
    layout: "vertical",
    density: "md",
    gutter: "md",
    validation: "eager",
    color: "primary",
    brand: null,
    feedback: null,
    noErrorIcon: false,
    noResetFocus: false,
    autofocus: false,
    greedy: false,
  });

  const handleChange = <K extends keyof DssFormState>(key: K, value: DssFormState[K]) => {
    setState((prev) => {
      // Exclusividade mútua Color / Brand / Feedback
      if (key === "brand" && value) return { ...prev, brand: value as any, color: null, feedback: null };
      if (key === "color" && value) return { ...prev, color: value as any, brand: null, feedback: null };
      if (key === "feedback" && value) return { ...prev, feedback: value as any, brand: null, color: null };
      return { ...prev, [key]: value };
    });
  };

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* 1. BADGES */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30">
          v2.3.0
        </Badge>
        <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/30">
          Quasar Compatible
        </Badge>
        <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/30">
          WCAG 2.1 AA
        </Badge>
        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
          Container · Form
        </Badge>
        <Badge variant="outline" className="bg-zinc-500/10 text-zinc-600 border-zinc-500/30">
          Ref: DssCheckbox
        </Badge>
      </div>

      {/* 2. HEADER */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <ClipboardListIcon size={28} style={{ color: "var(--dss-jtech-accent)" }} />
          <h1 className="text-3xl font-bold" style={{ color: "var(--jtech-heading-primary)" }}>
            DssForm
          </h1>
        </div>
        <p className="text-lg max-w-3xl" style={{ color: "var(--jtech-text-body)" }}>
          <strong>DssForm</strong> é o container responsável por orquestrar formulários no DSS. Ele coordena
          a submissão, a estratégia de validação e a densidade visual dos campos filhos
          (<code>DssInput</code>, <code>DssSelect</code>, <code>DssCheckbox</code>,{" "}
          <code>DssRadio</code>, <code>DssToggle</code>), garantindo navegação por teclado, feedback de erro acessível e
          alinhamento consistente em qualquer layout corporativo. Use-o sempre que houver coleta de dados do
          usuário — ele é o componente que transforma um conjunto de campos em uma unidade de submissão
          válida e auditável.
        </p>
      </div>

      {/* 3. WHEN / WHEN NOT */}
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="p-5 rounded-lg border-l-4"
          style={{ backgroundColor: "var(--jtech-card-bg)", borderLeftColor: "var(--dss-positive)" }}
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--dss-positive)" }}>
            <Check size={18} /> Quando Usar
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            <li>• Coleta de dados que exige submissão explícita (cadastro, login, checkout)</li>
            <li>• Fluxos que necessitam validação coordenada entre múltiplos campos</li>
            <li>• Formulários com reset, autofocus ou navegação por teclado padronizada</li>
            <li>• Containers de filtros avançados com botão "Aplicar"</li>
          </ul>
        </div>
        <div
          className="p-5 rounded-lg border-l-4"
          style={{ backgroundColor: "var(--jtech-card-bg)", borderLeftColor: "var(--dss-negative)" }}
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--dss-negative)" }}>
            <X size={18} /> Quando NÃO Usar
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cenário</TableHead>
                <TableHead>Alternativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Configuração com efeito imediato</TableCell>
                <TableCell><code>DssToggle</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fluxo em múltiplas etapas</TableCell>
                <TableCell><code>DssStepper</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Container apenas visual (sem submissão)</TableCell>
                <TableCell><code>DssCard</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Busca instantânea (sem submit)</TableCell>
                <TableCell><code>DssInput</code> standalone</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 4. PLAYGROUND */}
      <DssPlayground
        title="Configure o DssForm"
        description="Ajuste layout, densidade, gutter, validação e cor — o preview e o código atualizam em tempo real."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewContent={<DssFormPreview {...state} isDarkMode={isDarkMode} />}
        codePreview={generateFormCode(state)}
        controls={
          <ControlGrid columns={2}>
            <ControlSection label="Layout">
              <div className="flex gap-2 flex-wrap">
                {(["vertical", "horizontal", "inline"] as FormLayout[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleChange("layout", l)}
                    className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                    style={{
                      backgroundColor: state.layout === l ? "var(--dss-jtech-accent)" : "var(--jtech-card-bg)",
                      color: state.layout === l ? "#fff" : "var(--jtech-text-body)",
                      border: "1px solid var(--jtech-card-border)",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </ControlSection>

            <SizeSelector
              label="Density"
              sizes={[
                { name: "xs", label: "XS" },
                { name: "sm", label: "SM" },
                { name: "md", label: "MD", isDefault: true },
                { name: "lg", label: "LG" },
              ]}
              selectedSize={state.density}
              onSelect={(s) => handleChange("density", s as Size)}
            />

            <ControlSection label="Gutter">
              <div className="flex gap-2">
                {(["sm", "md", "lg"] as FormGutter[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => handleChange("gutter", g)}
                    className="px-3 py-1.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor: state.gutter === g ? "var(--dss-jtech-accent)" : "var(--jtech-card-bg)",
                      color: state.gutter === g ? "#fff" : "var(--jtech-text-body)",
                      border: "1px solid var(--jtech-card-border)",
                    }}
                  >
                    {g.toUpperCase()}
                  </button>
                ))}
              </div>
            </ControlSection>

            <ControlSection label="Estratégia de validação">
              <div className="flex gap-2 flex-wrap">
                {(["eager", "lazy", "on-submit"] as FormValidation[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => handleChange("validation", v)}
                    className="px-3 py-1.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor: state.validation === v ? "var(--dss-jtech-accent)" : "var(--jtech-card-bg)",
                      color: state.validation === v ? "#fff" : "var(--jtech-text-body)",
                      border: "1px solid var(--jtech-card-border)",
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </ControlSection>

            <ColorPicker
              label="Cor Semântica"
              colors={Object.values(DSS_SEMANTIC_COLORS)}
              selectedColor={state.color?.name || state.color}
              onSelect={(c) => handleChange("color", c as SemanticColor)}
            />

            <BrandPicker
              label="Brand (exclusivo)"
              brands={DSS_BRAND_COLORS}
              selectedBrand={state.brand?.name || state.brand}
              onSelect={(b) => handleChange("brand", b as BrandColor | null)}
            />

            <ControlSection label="Feedback (exclusivo)">
              <div className="flex gap-2 flex-wrap">
                {(["info", "positive", "warning", "negative"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => handleChange("feedback", state.feedback === f ? null : f)}
                    className="px-3 py-1.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor: state.feedback === f ? `var(--dss-${f})` : "var(--jtech-card-bg)",
                      color: state.feedback === f ? "#fff" : "var(--jtech-text-body)",
                      border: "1px solid var(--jtech-card-border)",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </ControlSection>

            <ToggleGroup
              label="Flags"
              options={[
                { name: "noErrorIcon", label: "no-error-icon" },
                { name: "noResetFocus", label: "no-reset-focus" },
                { name: "autofocus", label: "autofocus" },
                { name: "greedy", label: "greedy" },
              ]}
              values={{
                noErrorIcon: state.noErrorIcon,
                noResetFocus: state.noResetFocus,
                autofocus: state.autofocus,
                greedy: state.greedy,
              }}
              onToggle={(name) => handleChange(name as keyof DssFormState, !state[name as keyof DssFormState] as any)}
            />
          </ControlGrid>
        }
      />

      {/* 5. ESTADOS */}
      <div>
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--jtech-heading-primary)" }}>
          Estados Interativos
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estado</TableHead>
              <TableHead>Visual</TableHead>
              <TableHead>Interação</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>Acessibilidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><strong>Default</strong></TableCell>
              <TableCell>Container neutro com campos prontos</TableCell>
              <TableCell>Pronto para entrada</TableCell>
              <TableCell><code>--dss-surface-*</code></TableCell>
              <TableCell>—</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Validating</strong></TableCell>
              <TableCell>Campos avaliando regras em tempo real</TableCell>
              <TableCell>Blur / change conforme strategy</TableCell>
              <TableCell><code>--dss-duration-200</code></TableCell>
              <TableCell><code>aria-busy</code> no campo</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Invalid</strong></TableCell>
              <TableCell>Borda + ícone + mensagem de erro</TableCell>
              <TableCell>Bloqueia submit (validate())</TableCell>
              <TableCell><code>--dss-negative</code></TableCell>
              <TableCell><code>aria-invalid</code>, <code>aria-describedby</code></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Valid</strong></TableCell>
              <TableCell>Campos sem indicação de erro</TableCell>
              <TableCell>Submit permitido</TableCell>
              <TableCell><code>--dss-positive</code> (opcional)</TableCell>
              <TableCell>WCAG 3.3.1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Submitting</strong></TableCell>
              <TableCell>Botão com loading, campos bloqueados</TableCell>
              <TableCell>Aguardando resolução de submit</TableCell>
              <TableCell><code>--dss-opacity-disabled</code></TableCell>
              <TableCell><code>aria-busy="true"</code></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Disabled</strong></TableCell>
              <TableCell>Todos os campos esmaecidos</TableCell>
              <TableCell>Não interativo</TableCell>
              <TableCell><code>--dss-opacity-disabled</code></TableCell>
              <TableCell><code>aria-disabled</code></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* 6. ANATOMIA */}
      <AnatomySection
        componentName="DssForm"
        layers={{
          structure: {
            files: ["1-structure/DssForm.ts.vue"],
            description: "Elemento <form> semântico + ARIA + gestão de submit/reset/validate",
            responsibilities: [
              "Wrapper <form> com noValidate (DSS controla validação)",
              "Provê contexto reativo para campos filhos (density, color, brand)",
              "Coleta refs dos campos e expõe validate() / resetValidation()",
            ],
            tokens: [
              "--dss-spacing-2/4/6 (gutter)",
              "--dss-radius-lg (container)",
              "--dss-surface-default",
            ],
          },
          composition: {
            files: ["2-composition/_base.scss"],
            description: "Espaçamento entre campos e alinhamento por layout",
            responsibilities: [
              "Aplica gutter via tokens de spacing",
              "Define flex/grid conforme layout (vertical, horizontal, inline)",
              "Alinhamento de labels e ações",
            ],
          },
          variants: {
            files: ["3-variants/_density.scss", "3-variants/_layout.scss"],
            description: "Layouts (vertical/horizontal/inline) e densidades (xs–lg)",
            responsibilities: [
              "Propaga density para campos filhos via CSS vars",
              "Layout horizontal alinha label à esquerda",
              "Layout inline distribui campos em linha responsiva",
            ],
          },
          output: {
            files: ["4-output/_states.scss", "4-output/_brands.scss", "DssForm.module.scss"],
            description: "Dark mode, forced-colors, brands (Hub/Water/Waste)",
            responsibilities: [
              "Suporte completo a prefers-color-scheme",
              "forced-colors-mode com bordas explícitas",
              "Brand inheritance via [data-brand]",
            ],
          },
        }}
      />

      {/* 7. SEÇÕES TÉCNICAS COLAPSÁVEIS INDEPENDENTES */}

      {/* 7.1 Props & Eventos */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border hover:bg-muted/50 transition-colors">
          <span className="font-semibold" style={{ color: "var(--jtech-heading-secondary)" }}>
            7.1 Props API & Eventos
          </span>
          <ChevronDown className="h-5 w-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Tabs defaultValue="props">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="props">Props</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
            </TabsList>
            <TabsContent value="props" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-mono">layout</TableCell><TableCell className="font-mono">vertical | horizontal | inline</TableCell><TableCell>vertical</TableCell><TableCell>Organização dos campos</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">density</TableCell><TableCell className="font-mono">xs | sm | md | lg</TableCell><TableCell>md</TableCell><TableCell>Propagada para campos filhos</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">gutter</TableCell><TableCell className="font-mono">sm | md | lg</TableCell><TableCell>md</TableCell><TableCell>Espaçamento entre campos</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">validation</TableCell><TableCell className="font-mono">eager | lazy | on-submit</TableCell><TableCell>eager</TableCell><TableCell>Quando validar regras dos campos</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">greedy</TableCell><TableCell className="font-mono">boolean</TableCell><TableCell>false</TableCell><TableCell>Valida todos os campos antes de parar (vs. abortar no primeiro erro)</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">autofocus</TableCell><TableCell className="font-mono">boolean</TableCell><TableCell>false</TableCell><TableCell>Foca primeiro campo ao montar</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">noErrorIcon</TableCell><TableCell className="font-mono">boolean</TableCell><TableCell>false</TableCell><TableCell>Suprime ícone de erro nos campos</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">noResetFocus</TableCell><TableCell className="font-mono">boolean</TableCell><TableCell>false</TableCell><TableCell>Não move o foco ao resetar</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">color</TableCell><TableCell className="font-mono">SemanticColor</TableCell><TableCell>primary</TableCell><TableCell>Cor de submit / accent</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">brand</TableCell><TableCell className="font-mono">hub | water | waste</TableCell><TableCell>—</TableCell><TableCell>Brand override</TableCell></TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="events" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Payload</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-mono">submit</TableCell><TableCell className="font-mono">SubmitEvent</TableCell><TableCell>Emitido após validação bem-sucedida</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">reset</TableCell><TableCell className="font-mono">Event</TableCell><TableCell>Emitido após resetar campos e validação</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">validation-error</TableCell><TableCell className="font-mono">{`{ field, message }[]`}</TableCell><TableCell>Emitido quando validate() falha</TableCell></TableRow>
                  <TableRow><TableCell className="font-mono">validation-success</TableCell><TableCell className="font-mono">void</TableCell><TableCell>Emitido quando todos os campos passam</TableCell></TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CollapsibleContent>
      </Collapsible>

      {/* 7.2 Slots */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border hover:bg-muted/50 transition-colors">
          <span className="font-semibold" style={{ color: "var(--jtech-heading-secondary)" }}>
            7.2 Slots
          </span>
          <ChevronDown className="h-5 w-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Slot</TableHead>
                <TableHead>Props</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">default</TableCell>
                <TableCell>—</TableCell>
                <TableCell>Campos do formulário (Input, Select, Checkbox, Radio, etc.) e botões de ação</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>

      {/* 7.3 Tokens */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border hover:bg-muted/50 transition-colors">
          <span className="font-semibold" style={{ color: "var(--jtech-heading-secondary)" }}>
            7.3 Tokens
          </span>
          <ChevronDown className="h-5 w-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <p className="text-sm mb-3" style={{ color: "var(--jtech-text-body)" }}>
            DssForm é um <strong>consumer</strong> de tokens — declara apenas <em>capacidades</em>, não instâncias.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Token</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead>Referência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Espaçamentos</TableCell><TableCell>Gutter entre campos e fieldsets</TableCell><TableCell>DSS_TOKEN_REFERENCE.md</TableCell></TableRow>
              <TableRow><TableCell>Dimensões</TableCell><TableCell>Altura dos controles via density</TableCell><TableCell>DSS_TOKEN_REFERENCE.md</TableCell></TableRow>
              <TableRow><TableCell>Bordas</TableCell><TableCell>Container e estado focus</TableCell><TableCell>DSS_TOKEN_REFERENCE.md</TableCell></TableRow>
              <TableRow><TableCell>Cores Semânticas</TableCell><TableCell>Submit / accent / feedback de erro</TableCell><TableCell>DSS_TOKEN_REFERENCE.md</TableCell></TableRow>
              <TableRow><TableCell>Brand Tokens</TableCell><TableCell>Identidade Hub/Water/Waste</TableCell><TableCell>DSS_TOKEN_REFERENCE.md</TableCell></TableRow>
              <TableRow><TableCell>Motion</TableCell><TableCell>Transições de erro/validação</TableCell><TableCell>DSS_TOKEN_REFERENCE.md</TableCell></TableRow>
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>

      {/* 7.4 Acessibilidade */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border hover:bg-muted/50 transition-colors">
          <span className="font-semibold" style={{ color: "var(--jtech-heading-secondary)" }}>
            7.4 Acessibilidade WCAG
          </span>
          <ChevronDown className="h-5 w-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Critério</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Implementação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>1.3.1 Info &amp; Relationships</TableCell><TableCell>A</TableCell><TableCell>✓</TableCell><TableCell>Elemento &lt;form&gt; semântico + labels associadas via for/id</TableCell></TableRow>
              <TableRow><TableCell>2.4.6 Headings &amp; Labels</TableCell><TableCell>AA</TableCell><TableCell>✓</TableCell><TableCell>Toda field deve ter label visível e descritivo</TableCell></TableRow>
              <TableRow><TableCell>3.3.1 Error Identification</TableCell><TableCell>A</TableCell><TableCell>✓</TableCell><TableCell>aria-invalid + mensagem textual (nunca apenas cor)</TableCell></TableRow>
              <TableRow><TableCell>3.3.3 Error Suggestion</TableCell><TableCell>AA</TableCell><TableCell>✓</TableCell><TableCell>Mensagens descritivas com sugestão de correção</TableCell></TableRow>
              <TableRow><TableCell>4.1.2 Name, Role, Value</TableCell><TableCell>A</TableCell><TableCell>✓</TableCell><TableCell>aria-describedby para erros, aria-busy para submitting</TableCell></TableRow>
              <TableRow><TableCell>2.1.1 Keyboard</TableCell><TableCell>A</TableCell><TableCell>✓</TableCell><TableCell>Tab/Shift+Tab navega; Enter submete (fora de textarea)</TableCell></TableRow>
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>

      {/* 8. ANTI-PATTERNS */}
      <div
        className="p-5 rounded-lg border"
        style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--dss-warning)" }}
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--dss-warning)" }}>
          <AlertCircle size={18} /> Anti-patterns
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm" style={{ color: "var(--jtech-text-body)" }}>
          <div>
            <strong className="text-red-500">❌ Evite:</strong>
            <ul className="mt-2 space-y-1">
              <li>• Usar DssForm como container puramente visual (sem submit)</li>
              <li>• Indicar erro apenas com cor (sem texto / aria-invalid)</li>
              <li>• Mais de 15 campos sem agrupamento ou DssStepper</li>
              <li>• Botão submit habilitado durante submitting (duplo envio)</li>
              <li>• Validar somente no cliente, sem feedback do servidor</li>
            </ul>
          </div>
          <div>
            <strong className="text-green-500">✓ Prefira:</strong>
            <ul className="mt-2 space-y-1">
              <li>• <code>noValidate</code> + regras DSS (controle total do feedback)</li>
              <li>• Estratégia <code>lazy</code> em formulários longos</li>
              <li>• Agrupar campos relacionados via fieldsets / títulos</li>
              <li>• Mostrar loading no botão submit durante a requisição</li>
              <li>• Mensagens descritivas: "CPF deve conter 11 dígitos"</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 9. VINCULANTES DSS v2.2 */}
      <div
        className="p-5 rounded-lg border"
        style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
      >
        <h3 className="font-semibold mb-3" style={{ color: "var(--jtech-heading-secondary)" }}>
          Vinculantes DSS v2.2
        </h3>
        <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
          <li>• <strong>Classificação:</strong> Container (não interativo per se; orquestra interativos)</li>
          <li>• <strong>Pseudo-elementos:</strong> N/A — DssForm não usa <code>::before</code>/<code>::after</code> (touch target é responsabilidade dos campos)</li>
          <li>• <strong>brightness():</strong> N/A — variações visuais delegadas aos componentes filhos</li>
          <li>• <strong>Token First:</strong> nenhum valor hardcoded; gutter via <code>--dss-spacing-*</code></li>
          <li>• <strong>Brandabilidade:</strong> reage a <code>[data-brand]</code> propagando para filhos</li>
        </ul>
      </div>

      {/* 10. REFERÊNCIAS */}
      <div
        className="p-5 rounded-lg border"
        style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--jtech-heading-secondary)" }}>
          <Info size={18} /> Referências Normativas
        </h3>
        <ul className="space-y-1 text-sm" style={{ color: "var(--jtech-text-body)" }}>
          <li>• <code>docs/guides/ui-rules/04_FORMS_INPUTS.md</code> — Regras de formulário</li>
          <li>• <code>docs/reference/DSS_TOKEN_REFERENCE.md</code></li>
          <li>• <code>docs/reference/DSS_COMPONENT_ARCHITECTURE.md</code></li>
          <li>• <code>docs/governance/DSS_GOLDEN_COMPONENTS.md</code></li>
          <li>• Golden Context de auditoria: <strong>DssCheckbox</strong></li>
        </ul>
      </div>
    </div>
  );
}
