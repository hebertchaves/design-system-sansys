// @ts-nocheck
import React, { useState, useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Check,
  Code,
  FileText,
  Paperclip,
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  Shield,
  File as FileIcon,
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
  ToggleGroup,
  DSS_SEMANTIC_COLORS,
  DSS_BRAND_COLORS,
} from "@/components/ui/playground";

// ============================================================================
// DADOS DO COMPONENTE
// ============================================================================

const variants = [
  { name: "outlined", label: "Outlined", desc: "Borda visível (padrão Quasar)" },
  { name: "filled", label: "Filled", desc: "Background preenchido, sem borda" },
  { name: "standout", label: "Standout", desc: "Background com destaque no focus" },
  { name: "borderless", label: "Borderless", desc: "Sem borda, apenas linha inferior" },
];

const propsData = [
  { category: "Modelo", prop: "modelValue", type: "File | File[] | null", default: "null", description: "Arquivo(s) selecionado(s) (v-model)" },
  { category: "Seleção", prop: "multiple", type: "Boolean", default: "false", description: "Permite múltiplos arquivos" },
  { category: "Seleção", prop: "accept", type: "String", default: "undefined", description: "Tipos aceitos (MIME ou extensões)" },
  { category: "Seleção", prop: "maxFiles", type: "Number", default: "undefined", description: "Limite de arquivos no modo múltiplo" },
  { category: "Seleção", prop: "maxFileSize", type: "Number", default: "undefined", description: "Tamanho máximo por arquivo (bytes)" },
  { category: "Conteúdo", prop: "label", type: "String", default: "''", description: "Label flutuante do campo" },
  { category: "Conteúdo", prop: "placeholder", type: "String", default: "''", description: "Texto exibido quando vazio" },
  { category: "Conteúdo", prop: "hint", type: "String", default: "''", description: "Texto auxiliar abaixo do campo" },
  { category: "Conteúdo", prop: "errorMessage", type: "String", default: "''", description: "Mensagem de erro exibida abaixo" },
  { category: "Conteúdo", prop: "stackLabel", type: "Boolean", default: "false", description: "Label sempre visível no topo" },
  { category: "Variantes", prop: "variant", type: "'outlined' | 'filled' | 'standout' | 'borderless'", default: "'outlined'", description: "Estilo visual do campo" },
  { category: "Estados", prop: "error", type: "Boolean", default: "false", description: "Estado de erro" },
  { category: "Estados", prop: "disabled", type: "Boolean", default: "false", description: "Campo desabilitado" },
  { category: "Estados", prop: "readonly", type: "Boolean", default: "false", description: "Apenas leitura" },
  { category: "Features", prop: "clearable", type: "Boolean", default: "false", description: "Exibe botão de limpar" },
  { category: "Densidade", prop: "dense", type: "Boolean", default: "false", description: "Versão compacta" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Sansys" },
  { category: "Acessibilidade", prop: "ariaLabel", type: "String", default: "undefined", description: "Label ARIA customizado" },
  { category: "Acessibilidade", prop: "clearAriaLabel", type: "String", default: "'Remover arquivo selecionado'", description: "Label ARIA do botão de limpar" },
  { category: "Acessibilidade", prop: "tabindex", type: "Number | String | null", default: "null", description: "Tabindex customizado" },
];

const eventsData = [
  { event: "update:modelValue", payload: "File | File[] | null", desc: "Emitido quando a seleção muda (v-model)" },
  { event: "add", payload: "{ files: readonly File[]; index: number }[]", desc: "Emitido quando arquivos são adicionados" },
  { event: "remove", payload: "{ files: readonly File[]; index: number }[]", desc: "Emitido quando arquivos são removidos" },
  { event: "rejected", payload: "{ failedPropValidation: string; file: File }[]", desc: "Emitido quando arquivos são rejeitados (size/accept/maxFiles)" },
  { event: "focus", payload: "FocusEvent", desc: "Emitido quando o campo recebe foco" },
  { event: "blur", payload: "FocusEvent", desc: "Emitido quando o campo perde foco" },
  { event: "clear", payload: "void", desc: "Emitido quando a seleção é limpa via botão clear" },
];

const slotsData = [
  { slot: "prepend", desc: "Conteúdo dentro do campo, à esquerda", usage: "Ícone de anexo, badge de tipo de arquivo" },
  { slot: "append", desc: "Conteúdo dentro do campo, à direita", usage: "Botão de upload customizado" },
  { slot: "hint", desc: "Substituição da mensagem hint", usage: "Hints com formatação rica (links, ícones)" },
  { slot: "error", desc: "Substituição da mensagem de erro", usage: "Mensagens de erro com múltiplas linhas" },
];

const anatomyData = {
  structure: {
    files: ["DssFile.ts.vue"],
    description: "Wrapper controlado do QFile, define a estrutura HTML: container, label flutuante, área de drag-and-drop, slots e botão de limpar.",
    responsibilities: ["Template HTML semântico", "Props TypeScript tipadas", "Lógica de estados (focus, drag, hasValue)", "Acessibilidade ARIA"],
    tokens: [],
    codeExample: `<template>
  <div :class="wrapperClasses">
    <q-file v-model="modelValue" :multiple="multiple" :accept="accept">
      <template #prepend><slot name="prepend" /></template>
      <template #append>
        <slot name="append" />
        <button v-if="clearable && hasValue" @click="handleClear">×</button>
      </template>
    </q-file>
    <div class="dss-file__field">
      <label :class="labelClasses">{{ label }}</label>
      <div v-if="!hasValue" class="dss-file__drop-hint">
        <span>📎</span><span>{{ placeholder }}</span>
      </div>
    </div>
  </div>
</template>`,
  },
  composition: {
    files: ["_base.scss"],
    description: "Layout base do campo: flexbox, espaçamentos, tipografia, área de drop e overlay de drag.",
    responsibilities: ["Display flex e alinhamento", "Padding e gap internos", "Altura via tokens compactos"],
    tokens: ["--dss-spacing-*", "--dss-font-size-*", "--dss-compact-control-height-*"],
    codeExample: `.dss-file__field {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  min-height: var(--dss-compact-control-height-md);
  padding: 0 var(--dss-spacing-3);
}`,
  },
  variants: {
    files: ["_variant.scss"],
    description: "Variações visuais do campo: outlined, filled, standout, borderless e modo dense.",
    responsibilities: ["Estilos por variante", "Borda e background contextual", "Densidade compacta"],
    tokens: ["--dss-radius-*", "--dss-border-width-*"],
    codeExample: `.dss-file--outlined {
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-sm);
}`,
  },
  output: {
    files: ["_states.scss", "_brands.scss"],
    description: "Camada final: cores semânticas, estados (focus, error, drag, disabled), brandabilidade Hub/Water/Waste e dark mode.",
    responsibilities: ["Cores de focus por tema", "Overlay de drag ativo", "Paletas de marca", "Dark mode e high contrast"],
    tokens: ["--dss-action-*", "--dss-feedback-*", "--dss-hub-*", "--dss-water-*", "--dss-waste-*"],
    codeExample: `.dss-file--focused {
  border-color: var(--dss-action-primary);
  box-shadow: var(--dss-shadow-focus);
}
.dss-file__drag-overlay {
  background: hsl(var(--dss-action-primary) / 0.1);
}`,
  },
};

// ============================================================================
// COMPONENTE DE PREVIEW DO FILE
// ============================================================================

interface DssFilePreviewProps {
  variant: string;
  color: string;
  label: string;
  placeholder: string;
  multiple?: boolean;
  error?: boolean | string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  dense?: boolean;
  hint?: string;
  brand?: string | null;
  isDarkMode?: boolean;
  stackLabel?: boolean;
  prepend?: boolean;
  append?: boolean;
}

function DssFilePreview({
  variant,
  color,
  label,
  placeholder,
  multiple = false,
  error = false,
  disabled = false,
  readonly = false,
  clearable = false,
  dense = false,
  hint,
  brand = null,
  isDarkMode = false,
  stackLabel = false,
  prepend = false,
  append = false,
}: DssFilePreviewProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getColors = () => {
    if (error) {
      return { border: "#d8182e", focusShadow: "0 0 0 3px rgba(216,24,46,0.25)", labelColor: "#d8182e", iconColor: "#d8182e" };
    }
    if (brand && DSS_BRAND_COLORS[brand]) {
      const b = DSS_BRAND_COLORS[brand];
      return { border: b.principal, focusShadow: `0 0 0 3px ${b.principal}40`, labelColor: b.principal, iconColor: b.principal };
    }
    const c = DSS_SEMANTIC_COLORS[color];
    if (c) return { border: c.bg, focusShadow: `0 0 0 3px ${c.bg}40`, labelColor: c.bg, iconColor: c.bg };
    return { border: "#1f86de", focusShadow: "0 0 0 3px rgba(31,134,222,0.25)", labelColor: "#1f86de", iconColor: "#1f86de" };
  };

  const colors = getColors();
  const hasValue = files.length > 0;

  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "100%",
      minHeight: dense ? "36px" : "44px",
      padding: "0 12px",
      fontSize: "14px",
      color: disabled ? "#d4d4d4" : isDarkMode ? "#e5e5e5" : "#454545",
      backgroundColor: disabled ? (isDarkMode ? "#2a2a2a" : "#f5f5f5") : isDarkMode ? "#1a1a2e" : "#ffffff",
      borderRadius: "4px",
      transition: "all 150ms cubic-bezier(0.4,0,0.2,1)",
      cursor: disabled || readonly ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      position: "relative",
    };

    switch (variant) {
      case "outlined":
        return {
          ...base,
          border: focused || dragging ? `2px solid ${colors.border}` : `1px solid ${error ? "#d8182e" : isDarkMode ? "#404040" : "#d4d4d4"}`,
          boxShadow: focused || dragging ? colors.focusShadow : "none",
          borderStyle: dragging ? "dashed" : "solid",
        };
      case "filled":
        return {
          ...base,
          border: "none",
          borderBottom: focused || dragging ? `2px solid ${colors.border}` : `1px solid ${error ? "#d8182e" : isDarkMode ? "#404040" : "#d4d4d4"}`,
          backgroundColor: disabled ? (isDarkMode ? "#2a2a2a" : "#f5f5f5") : isDarkMode ? "#252538" : "#fafafa",
          borderRadius: "4px 4px 0 0",
        };
      case "standout":
        return {
          ...base,
          border: "none",
          backgroundColor: focused || dragging
            ? brand ? `${DSS_BRAND_COLORS[brand]?.principal}15` : `${colors.border}15`
            : disabled ? (isDarkMode ? "#2a2a2a" : "#f5f5f5") : isDarkMode ? "#252538" : "#f0f0f0",
          boxShadow: focused || dragging ? colors.focusShadow : "none",
        };
      case "borderless":
        return {
          ...base,
          border: "none",
          borderBottom: focused || dragging ? `2px solid ${colors.border}` : `1px solid transparent`,
          backgroundColor: "transparent",
          borderRadius: "0",
        };
      default:
        return base;
    }
  };

  const handlePick = () => {
    if (disabled || readonly) return;
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files || []);
    setFiles(multiple ? list : list.slice(0, 1));
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (disabled || readonly) return;
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    if (disabled || readonly) return;
    e.preventDefault();
    setDragging(false);
    const list = Array.from(e.dataTransfer.files);
    setFiles(multiple ? list : list.slice(0, 1));
  };

  const valueLabel = hasValue
    ? files.length === 1
      ? files[0].name
      : `${files.length} arquivos selecionados`
    : "";

  return (
    <div className="w-full max-w-sm">
      {label && (
        <label
          className={`block font-medium mb-1.5 ${stackLabel ? "text-xs uppercase tracking-wider" : "text-sm"}`}
          style={{
            color: error ? "#d8182e" : focused ? colors.labelColor : isDarkMode ? "#a0a0a0" : "#454545",
            transition: "color 150ms ease",
          }}
        >
          {label}
        </label>
      )}

      <div
        style={getVariantStyles()}
        onClick={handlePick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-disabled={disabled || undefined}
        aria-readonly={readonly || undefined}
      >
        {prepend && (
          <span style={{ color: focused ? colors.iconColor : isDarkMode ? "#606060" : "#737373", flexShrink: 0 }}>
            <Paperclip size={18} />
          </span>
        )}

        {hasValue ? (
          <span className="flex-1 truncate" style={{ color: disabled ? "#d4d4d4" : isDarkMode ? "#e5e5e5" : "#454545" }}>
            {valueLabel}
          </span>
        ) : (
          <span className="flex-1 flex items-center gap-2" style={{ color: isDarkMode ? "#707070" : "#a3a3a3" }}>
            <FileIcon size={16} />
            <span className="truncate">{placeholder || "Clique ou arraste arquivos aqui"}</span>
          </span>
        )}

        {append && (
          <span style={{ color: focused ? colors.iconColor : isDarkMode ? "#606060" : "#737373", flexShrink: 0 }}>
            <Upload size={18} />
          </span>
        )}

        {clearable && hasValue && !disabled && !readonly && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
            style={{ color: isDarkMode ? "#808080" : "#737373" }}
            aria-label="Remover arquivo selecionado"
          >
            <X size={16} />
          </button>
        )}

        {error && <AlertCircle size={18} style={{ color: "#d8182e", flexShrink: 0 }} />}

        {dragging && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none rounded"
            style={{
              backgroundColor: `${colors.border}20`,
              border: `2px dashed ${colors.border}`,
              fontSize: "13px",
              fontWeight: 500,
              color: colors.border,
            }}
          >
            Solte os arquivos aqui
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
        />
      </div>

      {(hint || (typeof error === "string" && error)) && (
        <p className="text-xs mt-1.5" style={{ color: error ? "#d8182e" : isDarkMode ? "#707070" : "#a3a3a3" }}>
          {typeof error === "string" ? error : hint}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function DssFilePage() {
  const [selectedVariant, setSelectedVariant] = useState("outlined");
  const [selectedColor, setSelectedColor] = useState<string | null>("primary");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [booleanStates, setBooleanStates] = useState({
    multiple: false,
    error: false,
    disabled: false,
    readonly: false,
    clearable: true,
    dense: false,
    stackLabel: false,
    prepend: false,
    append: false,
    hint: false,
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
    setBooleanStates((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  const effectiveColor = selectedBrand ? "primary" : selectedColor || "primary";

  const generateCode = () => {
    const props: string[] = [];
    if (selectedVariant !== "outlined") props.push(`variant="${selectedVariant}"`);
    if (selectedBrand) props.push(`brand="${selectedBrand}"`);
    props.push('label="Anexar documento"');
    if (booleanStates.multiple) props.push("multiple");
    props.push('accept=".pdf,.doc,.docx"');
    if (booleanStates.stackLabel) props.push("stack-label");
    if (booleanStates.error) props.push(':error="true"\n  error-message="Arquivo inválido"');
    if (booleanStates.disabled) props.push("disabled");
    if (booleanStates.readonly) props.push("readonly");
    if (booleanStates.clearable) props.push("clearable");
    if (booleanStates.dense) props.push("dense");
    if (booleanStates.hint) props.push('hint="Formatos aceitos: PDF, DOC (máx. 5MB)"');

    const hasSlots = booleanStates.prepend || booleanStates.append;
    let code = `<DssFile\n  ${props.join("\n  ")}\n  v-model="files"`;
    if (hasSlots) {
      code += ">\n";
      if (booleanStates.prepend) code += '  <template #prepend>\n    <q-icon name="attach_file" />\n  </template>\n';
      if (booleanStates.append) code += '  <template #append>\n    <q-icon name="cloud_upload" />\n  </template>\n';
      code += "</DssFile>";
    } else {
      code += "\n/>";
    }
    return code;
  };

  const stateOptions = [
    { name: "error", label: "Error" },
    { name: "disabled", label: "Disabled" },
    { name: "readonly", label: "Readonly" },
  ];

  const featureOptions = [
    { name: "multiple", label: "Multiple" },
    { name: "clearable", label: "Clearable" },
    { name: "dense", label: "Dense" },
    { name: "stackLabel", label: "Stack Label" },
  ];

  const slotOptions = [
    { name: "prepend", label: "Prepend" },
    { name: "append", label: "Append" },
    { name: "hint", label: "Hint" },
  ];

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* SEÇÃO 1: HEADER */}
      <PageHeader
        icon={Paperclip}
        badge="Componente Base"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssFile"
        subtitle="DssFile é o componente responsável pela seleção e upload de arquivos em formulários DSS. Wrapper controlado do QFile com suporte a drag-and-drop, validação de tipo e tamanho, múltiplos arquivos e identidade visual idêntica ao DssInput. Integra-se ao sistema de brandabilidade multi-marca e tokens DSS."
        subtitleHighlights={["drag-and-drop", "validação de arquivos", "brandabilidade multi-marca", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v1.0.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      {/* SEÇÃO 2: QUANDO USAR / NÃO USAR */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-5 rounded-lg border" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", borderColor: "var(--dss-positive)" }}>
          <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: "var(--dss-positive)" }}>
            <CheckCircle className="h-5 w-5" />
            Quando Usar
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "Upload de documentos em formulários (PDF, DOC, planilhas)",
              "Anexos em fluxos de cadastro ou abertura de chamados",
              "Importação de imagens, laudos ou comprovantes",
              "Seleção múltipla de arquivos com validação de tipo/tamanho",
              "Áreas de drag-and-drop integradas a formulários DSS",
              "Campos de upload em contextos multi-marca",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--dss-positive)" }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-lg border" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", borderColor: "var(--dss-negative)" }}>
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
                { scenario: "Entrada de texto livre", alt: "DssInput" },
                { scenario: "Upload em massa com fila/progresso por arquivo", alt: "DssUploader (composto)" },
                { scenario: "Captura de imagem direto da câmera", alt: "DssCameraCapture" },
                { scenario: "Edição de imagem após upload", alt: "DssImageEditor" },
                { scenario: "Importação de dados estruturados (CSV)", alt: "DssDataImport" },
              ].map((row, i) => (
                <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.scenario}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "var(--dss-jtech-accent)" }}>{row.alt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* SEÇÃO 3: PLAYGROUND */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <DssPlayground
        title="Configure o File"
        description="Selecione as props e veja o resultado em tempo real. Tente arrastar arquivos sobre o campo."
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
        previewMinHeight="320px"
        previewContent={
          <DssFilePreview
            variant={selectedVariant}
            color={effectiveColor}
            label="Anexar documento"
            placeholder="Clique ou arraste arquivos aqui"
            multiple={booleanStates.multiple}
            error={booleanStates.error ? "Arquivo inválido" : false}
            disabled={booleanStates.disabled}
            readonly={booleanStates.readonly}
            clearable={booleanStates.clearable}
            dense={booleanStates.dense}
            stackLabel={booleanStates.stackLabel}
            prepend={booleanStates.prepend}
            append={booleanStates.append}
            hint={booleanStates.hint ? "Formatos aceitos: PDF, DOC (máx. 5MB)" : undefined}
            brand={selectedBrand}
            isDarkMode={isDarkMode}
          />
        }
        controls={
          <ControlGrid columns={5}>
            <VariantSelector variants={variants} selectedVariant={selectedVariant} onSelect={setSelectedVariant} />
            <ColorPicker label="Color" colors={Object.values(DSS_SEMANTIC_COLORS)} selectedColor={selectedColor} onSelect={handleColorChange} />
            <BrandPicker brands={DSS_BRAND_COLORS} selectedBrand={selectedBrand} onSelect={handleBrandChange} />
            <ToggleGroup label="Estados" options={stateOptions} values={booleanStates} onToggle={toggleBooleanState} />
            <ToggleGroup label="Features" options={featureOptions} values={booleanStates} onToggle={toggleBooleanState} />
            <ToggleGroup label="Slots" options={slotOptions} values={booleanStates} onToggle={toggleBooleanState} />
          </ControlGrid>
        }
        codePreview={generateCode()}
      />

      {/* SEÇÃO 4: ESTADOS */}
      <SectionHeader title="Estados" titleAccent="Interativos" badge="Comportamento" />

      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}>
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
              { state: "Default", visual: "Borda neutra, ícone de anexo e placeholder", interaction: "Pronto para clique ou drag", tokens: "--dss-border-width-thin, --dss-gray-300", a11y: "role=button, tabindex=0" },
              { state: "Hover", visual: "Cursor pointer, borda levemente mais escura", interaction: "Pointer over", tokens: "--dss-duration-fast", a11y: "—" },
              { state: "Focus", visual: "Borda 2px na cor semântica, focus ring visível", interaction: "Teclado / clique", tokens: "--dss-shadow-focus, --dss-border-width-md", a11y: "WCAG 2.4.7" },
              { state: "Dragging", visual: "Borda dashed, overlay translúcido na cor focus", interaction: "Arquivo arrastado sobre o campo", tokens: "--dss-action-primary @ 10%", a11y: "aria-live: solte para upload" },
              { state: "HasValue", visual: "Nome do arquivo (ou contagem) substitui placeholder", interaction: "Após seleção", tokens: "--dss-text-primary", a11y: "—" },
              { state: "Error", visual: "Borda vermelha, ícone de alerta, mensagem abaixo", interaction: "Validação (size/accept/maxFiles)", tokens: "--dss-feedback-error", a11y: "aria-invalid, aria-describedby" },
              { state: "Disabled", visual: "Opacidade reduzida, cursor not-allowed", interaction: "Não interativo", tokens: "--dss-opacity-disabled", a11y: "aria-disabled" },
              { state: "Readonly", visual: "Aparência normal, sem novo upload", interaction: "Apenas leitura", tokens: "—", a11y: "aria-readonly" },
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

      {/* SEÇÃO 5: ANATOMIA */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />
      <AnatomySection componentName="DssFile" layers={anatomyData} />

      {/* SEÇÃO 6: PROPS API */}
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
                {eventsData.map((e, idx) => (
                  <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{e.event}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }}>{e.payload}</TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{e.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="pt-4">
            <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>Métodos Expostos (defineExpose)</h4>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Método</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Assinatura</TableHead>
                  <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { m: "pickFiles", sig: "() =&gt; void", d: "Abre o seletor de arquivos nativo" },
                  { m: "removeAtIndex", sig: "(index: number) =&gt; void", d: "Remove arquivo por índice (modo múltiplo)" },
                  { m: "removeFile", sig: "(file: File) =&gt; void", d: "Remove arquivo específico" },
                  { m: "focus", sig: "() =&gt; void", d: "Foca no campo" },
                  { m: "blur", sig: "() =&gt; void", d: "Remove foco do campo" },
                ].map((row, i) => (
                  <TableRow key={i} style={{ borderColor: "var(--jtech-card-border)" }}>
                    <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{row.m}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "var(--jtech-text-body)" }} dangerouslySetInnerHTML={{ __html: row.sig }} />
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{row.d}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CollapsibleSection>

      {/* SEÇÃO 7: SLOTS */}
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
              {slotsData.map((s, idx) => (
                <TableRow key={idx} style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableCell className="font-mono font-medium" style={{ color: "var(--dss-jtech-accent)" }}>{s.slot}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{s.desc}</TableCell>
                  <TableCell style={{ color: "var(--jtech-text-body)" }}>{s.usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleSection>

      {/* SEÇÃO 8: TOKENS */}
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
                { type: "Cores Semânticas", role: "Borda, focus ring e overlay de drag", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Feedback Tokens", role: "Estados de erro e rejeição de arquivo", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Brand Tokens", role: "Identidade multi-marca (Hub, Water, Waste)", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Compact Control Heights", role: "Altura mínima do campo (dense / padrão)", ref: "DSS_TOKEN_REFERENCE.md (7.13)" },
                { type: "Espaçamento", role: "Padding interno e gap entre ícones e label", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Tipografia", role: "Font-size do label, placeholder e valor", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Bordas", role: "Border-radius e espessura por variante", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Motion", role: "Transições de focus, drag e estados", ref: "DSS_TOKEN_REFERENCE.md" },
                { type: "Opacidade", role: "Opacidade no estado disabled e overlay de drag", ref: "DSS_TOKEN_REFERENCE.md" },
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

      {/* SEÇÃO 9: ACESSIBILIDADE */}
      <CollapsibleSection icon={CheckCircle} title="Acessibilidade" titleAccent="WCAG 2.1 AA">
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium" style={{ color: "var(--jtech-heading-tertiary)" }}>✅ Implementado</h4>
            <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
              {[
                "Label associado ao campo (clique no label abre o picker)",
                "aria-invalid quando em estado de erro",
                "aria-describedby vinculado à mensagem de erro/hint",
                "aria-disabled no estado desabilitado",
                "aria-readonly no estado somente leitura",
                "aria-label customizável no botão de limpar",
                "Focus ring visível com --dss-shadow-focus",
                "Tabindex configurável para integração em fluxos de teclado",
                "Touch target ≥ 44px (alcança 48px em dense:false)",
                "Suporte a navegação por teclado (Enter/Space abrem o picker)",
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
                  { criterion: "1.3.1 Informações e Relações", level: "A" },
                  { criterion: "1.4.3 Contraste (Mínimo)", level: "AA" },
                  { criterion: "2.1.1 Teclado", level: "A" },
                  { criterion: "2.4.7 Foco Visível", level: "AA" },
                  { criterion: "2.5.5 Tamanho do Alvo", level: "AAA" },
                  { criterion: "3.3.1 Identificação de Erro", level: "A" },
                  { criterion: "3.3.2 Labels ou Instruções", level: "A" },
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
          </div>
        </div>
      </CollapsibleSection>

      {/* SEÇÃO 10: ANTI-PATTERNS */}
      <CollapsibleSection icon={AlertTriangle} title="Anti-patterns" titleAccent="& Erros Comuns">
        <div className="space-y-4 pt-4">
          {[
            {
              title: "Input nativo de arquivo sem wrapper DSS",
              wrong: '<input type="file" multiple />',
              correct: '<DssFile v-model="files" multiple label="Anexar" />',
              reason: "O input nativo não respeita tokens, brandabilidade nem acessibilidade do DSS.",
            },
            {
              title: "Validação de tamanho/tipo no parent",
              wrong: 'if (file.size > 5MB) { showToast("erro") }',
              correct: '<DssFile :max-file-size="5242880" accept=".pdf" @rejected="onRejected" />',
              reason: "DssFile já valida via QFile e emite o evento `rejected` com o motivo da falha.",
            },
            {
              title: "Botão de limpar sem aria-label",
              wrong: '<button @click="clear">×</button>',
              correct: '<DssFile clearable clear-aria-label="Remover comprovante" />',
              reason: "Botões icon-only precisam de aria-label para leitores de tela. WCAG 4.1.2.",
            },
            {
              title: "Esconder o estado de drag",
              wrong: '<DssFile style="pointer-events: none on dragover" />',
              correct: '<DssFile /> <!-- overlay nativo já comunica o estado de drop -->',
              reason: "O overlay visual de drag é parte do contrato de UX e atende WCAG 1.4.1.",
            },
          ].map((pattern, idx) => (
            <div key={idx} className="p-4 rounded-lg border" style={{ backgroundColor: "var(--jtech-card-bg)", borderColor: "var(--jtech-card-border)" }}>
              <h4 className="font-medium mb-3" style={{ color: "var(--jtech-heading-tertiary)" }}>{pattern.title}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-negative)" }}>❌ Incorreto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono" style={{ backgroundColor: "rgba(216, 24, 46, 0.1)", color: "var(--jtech-text-body)" }}>{pattern.wrong}</pre>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: "var(--dss-positive)" }}>✅ Correto</span>
                  <pre className="mt-1 p-2 rounded text-xs font-mono" style={{ backgroundColor: "rgba(77, 210, 40, 0.1)", color: "var(--jtech-text-body)" }}>{pattern.correct}</pre>
                </div>
              </div>
              <p className="mt-2 text-sm" style={{ color: "var(--jtech-text-muted)" }}>
                <strong>Por quê:</strong> {pattern.reason}
              </p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* SEÇÃO 11: VINCULANTES */}
      <CollapsibleSection icon={Shield} title="Vinculantes" titleAccent="DSS v2.4">
        <div className="space-y-4 pt-4">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Regra</TableHead>
                <TableHead style={{ color: "var(--jtech-heading-tertiary)" }}>Aplicação no DssFile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rule: "Token First", application: "Sem valores hardcoded — todas as dimensões via var(--dss-*)" },
                { rule: "Cores Quasar-style", application: "Cores via classes utilitárias e computed, nunca no SCSS" },
                { rule: "Pseudo-elementos", application: "::before reservado para touch target; ::after para overlay de drag" },
                { rule: "Tokens de altura genéricos", application: "Usa --dss-compact-control-height-* (md/sm)" },
                { rule: "Brightness reuse", application: "Não utiliza brightness() — estados via opacidade tokenizada" },
                { rule: "Classificação", application: "Form Component (entrada de dados — file picker)" },
                { rule: "Entry Point Wrapper", application: "DssFile.vue é re-export puro de 1-structure/DssFile.ts.vue" },
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

      {/* SEÇÃO 12: REFERÊNCIAS */}
      <CollapsibleSection icon={BookOpen} title="Referências" titleAccent="Normativas">
        <div className="pt-4">
          <ul className="space-y-2 text-sm" style={{ color: "var(--jtech-text-body)" }}>
            {[
              "DSS_TOKEN_REFERENCE.md",
              "DSS_COMPONENT_ARCHITECTURE.md",
              "DSS_GOLDEN_COMPONENTS.md (DssInput como golden de forms)",
              "PLAYGROUND_STANDARD.md (v3.2)",
              "COMPONENT_PAGE_STRUCTURE.md (v2.3)",
              "Quasar QFile — https://quasar.dev/vue-components/file",
            ].map((ref, i) => (
              <li key={i} className="flex items-center gap-2">
                <FileText className="h-4 w-4 flex-shrink-0" style={{ color: "var(--dss-jtech-accent)" }} />
                <code className="text-sm font-mono" style={{ color: "var(--dss-jtech-accent)" }}>{ref}</code>
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleSection>
    </div>
  );
}
