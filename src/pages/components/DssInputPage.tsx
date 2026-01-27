import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DssTabs, DssTabsContent, DssTabsList, DssTabsTrigger } from "@/components/ui/dss-tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlaygroundButton } from "@/components/ui/PlaygroundButton";
import { AnatomySection } from "@/components/ui/AnatomySection";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import {
  Copy,
  Check,
  Layers,
  Code,
  FileText,
  Eye,
  EyeOff,
  Search,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle2,
  Info,
  X,
  Calendar,
  Hash,
  Globe,
  Sun,
  Moon,
  Settings,
  Palette,
  Layout,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ============================================================================
// DATA STRUCTURES - Pattern v2.0
// ============================================================================

// Variantes Visuais do DssInput
const variants = [
  { name: "outlined", label: "Outlined", desc: "Borda visível (padrão Quasar)", hasOutline: true },
  { name: "filled", label: "Filled", desc: "Background preenchido, sem borda", hasOutline: false },
  { name: "standout", label: "Standout", desc: "Background com destaque no focus", hasOutline: false },
  { name: "borderless", label: "Borderless", desc: "Sem borda, apenas linha inferior", hasOutline: false },
];

// Tipos de Input
const inputTypes = [
  { name: "text", label: "Text", icon: FileText, desc: "Texto simples" },
  { name: "email", label: "Email", icon: Mail, desc: "Endereço de e-mail" },
  { name: "password", label: "Password", icon: Lock, desc: "Senha com toggle" },
  { name: "search", label: "Search", icon: Search, desc: "Campo de busca" },
  { name: "tel", label: "Telefone", icon: Phone, desc: "Número de telefone" },
  { name: "number", label: "Number", icon: Hash, desc: "Valores numéricos" },
  { name: "url", label: "URL", icon: Globe, desc: "Endereços web" },
  { name: "date", label: "Date", icon: Calendar, desc: "Seleção de data" },
];

// Cores Semânticas
const semanticColors = {
  primary: {
    name: "primary",
    label: "Primary",
    bg: "#1f86de",
    hover: "#0f5295",
    light: "#86c0f3",
    focus: "#006AC5",
    tokens: {
      base: "--dss-primary",
      focus: "--dss-primary-hover",
      light: "--dss-primary-light",
    },
  },
  secondary: {
    name: "secondary",
    label: "Secondary",
    bg: "#26a69a",
    hover: "#1c857e",
    light: "#6ddbcb",
    focus: "#009C8D",
    tokens: {
      base: "--dss-secondary",
      focus: "--dss-secondary-hover",
    },
  },
};

// Cores de Feedback
const feedbackColors = {
  positive: {
    name: "positive",
    label: "Success",
    icon: CheckCircle2,
    bg: "#4dd228",
    light: "#b9f2a4",
    tokens: {
      base: "--dss-positive",
      light: "--dss-positive-light",
    },
  },
  negative: {
    name: "negative",
    label: "Error",
    icon: AlertCircle,
    bg: "#d8182e",
    light: "#ffa0ab",
    tokens: {
      base: "--dss-negative",
      light: "--dss-negative-light",
    },
  },
  warning: {
    name: "warning",
    label: "Warning",
    icon: Info,
    bg: "#fabd14",
    light: "#fff488",
    tokens: {
      base: "--dss-warning",
      light: "--dss-warning-light",
    },
  },
};

// Paletas de Marca
const brandColors = {
  hub: {
    name: "hub",
    label: "Hub",
    icon: "🟠",
    principal: "#ef7a11",
    tokens: {
      principal: "--dss-hub-600",
      focus: "--dss-hub-700",
      light: "--dss-hub-100",
    },
  },
  water: {
    name: "water",
    label: "Water",
    icon: "🔵",
    principal: "#0e88e4",
    tokens: {
      principal: "--dss-water-500",
      focus: "--dss-water-600",
      light: "--dss-water-100",
    },
  },
  waste: {
    name: "waste",
    label: "Waste",
    icon: "🟢",
    principal: "#18b173",
    tokens: {
      principal: "--dss-waste-500",
      focus: "--dss-waste-600",
      light: "--dss-waste-100",
    },
  },
};

// Props API
const propsData = [
  { category: "Valor", prop: "modelValue", type: "String | Number", default: "''", description: "Valor do input (v-model)" },
  { category: "Valor", prop: "type", type: "'text' | 'email' | 'password' | ...", default: "'text'", description: "Tipo do input HTML" },
  { category: "Valor", prop: "placeholder", type: "String", default: "''", description: "Texto placeholder" },
  { category: "Label", prop: "label", type: "String", default: "''", description: "Label do campo" },
  { category: "Label", prop: "hint", type: "String", default: "''", description: "Texto de ajuda abaixo do input" },
  { category: "Variantes", prop: "variant", type: "'outlined' | 'filled' | 'standout' | 'borderless'", default: "'outlined'", description: "Estilo visual do input" },
  { category: "Variantes", prop: "color", type: "'primary' | 'secondary' | ...", default: "'primary'", description: "Cor semântica (focus)" },
  { category: "Estados", prop: "error", type: "Boolean | String", default: "false", description: "Estado de erro (string = mensagem)" },
  { category: "Estados", prop: "disabled", type: "Boolean", default: "false", description: "Estado desabilitado" },
  { category: "Estados", prop: "readonly", type: "Boolean", default: "false", description: "Apenas leitura" },
  { category: "Estados", prop: "loading", type: "Boolean", default: "false", description: "Exibe spinner de loading" },
  { category: "Ícones", prop: "prefix", type: "String | Slot", default: "null", description: "Ícone/conteúdo à esquerda" },
  { category: "Ícones", prop: "suffix", type: "String | Slot", default: "null", description: "Ícone/conteúdo à direita" },
  { category: "Ações", prop: "clearable", type: "Boolean", default: "false", description: "Exibe botão de limpar" },
  { category: "Brandabilidade", prop: "brand", type: "'hub' | 'water' | 'waste'", default: "null", description: "Tema de marca Veolia" },
  { category: "Densidade", prop: "dense", type: "Boolean", default: "false", description: "Versão compacta" },
];

// Tokens organizados por categoria (14 categorias)
const tokensUsed = [
  // Action
  { category: "Action", token: "--dss-action-primary", value: "#1f86de", usage: "Borda focus primary" },
  { category: "Action", token: "--dss-action-secondary", value: "#26a69a", usage: "Borda focus secondary" },
  // Feedback
  { category: "Feedback", token: "--dss-feedback-success", value: "#4dd228", usage: "Borda/ícone success" },
  { category: "Feedback", token: "--dss-feedback-error", value: "#d8182e", usage: "Borda/ícone error" },
  { category: "Feedback", token: "--dss-feedback-warning", value: "#fabd14", usage: "Borda/ícone warning" },
  // Brand Hub
  { category: "Brand Hub", token: "--dss-hub-600", value: "#ef7a11", usage: "Focus border Hub" },
  { category: "Brand Hub", token: "--dss-hub-100", value: "#fef2d6", usage: "Background filled Hub" },
  // Brand Water
  { category: "Brand Water", token: "--dss-water-500", value: "#0e88e4", usage: "Focus border Water" },
  { category: "Brand Water", token: "--dss-water-100", value: "#e0eefe", usage: "Background filled Water" },
  // Brand Waste
  { category: "Brand Waste", token: "--dss-waste-500", value: "#18b173", usage: "Focus border Waste" },
  { category: "Brand Waste", token: "--dss-waste-100", value: "#d3f8e2", usage: "Background filled Waste" },
  // Sizing
  { category: "Sizing", token: "--dss-touch-target-sm", value: "36px", usage: "Altura dense" },
  { category: "Sizing", token: "--dss-touch-target-md", value: "44px", usage: "Altura padrão WCAG" },
  { category: "Sizing", token: "--dss-input-icon-size", value: "20px", usage: "Tamanho dos ícones" },
  // Spacing
  { category: "Spacing", token: "--dss-spacing-2", value: "8px", usage: "Gap icon-text" },
  { category: "Spacing", token: "--dss-spacing-3", value: "12px", usage: "Padding horizontal" },
  { category: "Spacing", token: "--dss-spacing-4", value: "16px", usage: "Padding horizontal (lg)" },
  // Border Radius
  { category: "Border Radius", token: "--dss-radius-sm", value: "4px", usage: "Border-radius padrão" },
  { category: "Border Radius", token: "--dss-radius-md", value: "8px", usage: "Border-radius large" },
  // Borders
  { category: "Borders", token: "--dss-border-width-thin", value: "1px", usage: "Borda padrão" },
  { category: "Borders", token: "--dss-border-width-md", value: "2px", usage: "Borda no focus" },
  { category: "Borders", token: "--dss-border-gray-300", value: "#d4d4d4", usage: "Cor da borda default" },
  // Typography
  { category: "Typography", token: "--dss-font-size-sm", value: "14px", usage: "Texto do input" },
  { category: "Typography", token: "--dss-font-size-xs", value: "12px", usage: "Hint/Error text" },
  // Text
  { category: "Text", token: "--dss-text-body", value: "#454545", usage: "Texto do input" },
  { category: "Text", token: "--dss-text-subtle", value: "#737373", usage: "Placeholder text" },
  { category: "Text", token: "--dss-text-muted", value: "#a3a3a3", usage: "Hint text" },
  { category: "Text", token: "--dss-text-error", value: "#d8182e", usage: "Mensagem de erro" },
  // Motion
  { category: "Motion", token: "--dss-duration-fast", value: "150ms", usage: "Transição focus" },
  { category: "Motion", token: "--dss-easing-standard", value: "cubic-bezier(0.4,0,0.2,1)", usage: "Easing padrão" },
  // Surface
  { category: "Surface", token: "--dss-surface-default", value: "#ffffff", usage: "Background outlined" },
  { category: "Surface", token: "--dss-surface-subtle", value: "#fafafa", usage: "Background filled" },
  { category: "Surface", token: "--dss-surface-muted", value: "#f5f5f5", usage: "Background disabled" },
  // States
  { category: "States", token: "--dss-shadow-focus", value: "0 0 0 3px rgba(31,134,222,0.25)", usage: "Focus ring primary" },
  { category: "States", token: "--dss-shadow-focus-error", value: "0 0 0 3px rgba(216,24,46,0.25)", usage: "Focus ring error" },
  // Opacity
  { category: "Opacity", token: "--dss-opacity-disabled", value: "0.6", usage: "Opacidade disabled" },
];

// Anatomy Data
const anatomyData = {
  structure: {
    files: ["DssInput.ts.vue"],
    description: "Define a estrutura HTML do input: container, label, input nativo, slots (prepend/append), hint/error. Props tipadas, composables de state e classes.",
    responsibilities: ["Template HTML semântico", "Props TypeScript tipadas", "Lógica de estados (focus, error)", "Acessibilidade ARIA"],
    tokens: ["Nenhum token - apenas estrutura"],
    codeExample: `<template>
  <div :class="wrapperClasses">
    <label :for="inputId">{{ label }}</label>
    <div class="dss-input__field">
      <slot name="prepend" />
      <input :id="inputId" v-model="modelValue" />
      <slot name="append" />
    </div>
    <span v-if="hint">{{ hint }}</span>
  </div>
</template>`,
  },
  composition: {
    files: ["_composition.scss"],
    description: "Layout base do input: flexbox, espaçamentos, tipografia, reset de estilos nativos. Define a estrutura visual sem cores.",
    responsibilities: ["Display flex e alinhamento", "Padding e spacing internos", "Font-size e line-height", "Reset de estilos nativos"],
    tokens: ["--dss-spacing-*", "--dss-font-size-*", "--dss-touch-target-*"],
    codeExample: `.dss-input__field {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  height: var(--dss-touch-target-md);
  padding: 0 var(--dss-spacing-3);
  font-size: var(--dss-font-size-sm);
}`,
  },
  variants: {
    files: ["_variants.scss"],
    description: "Variações visuais do input: outlined (borda), filled (preenchido), standout (destaque), borderless (minimalista).",
    responsibilities: ["Estilos por variante", "Comportamento de borda", "Background por estado", "Border-radius"],
    tokens: ["--dss-radius-*", "--dss-border-*"],
    codeExample: `.dss-input--outlined {
  border: 1px solid var(--dss-gray-300);
  border-radius: var(--dss-radius-sm);
}

.dss-input--filled {
  background: var(--dss-surface-subtle);
  border-bottom: 1px solid var(--dss-gray-300);
}`,
  },
  output: {
    files: ["_states.scss", "_brands.scss"],
    description: "Camada final: cores semânticas, estados (focus, error, disabled), brandability (Hub, Water, Waste) e transições.",
    responsibilities: ["Cores de focus por tema", "Estados visuais (error, success)", "Paletas de marca", "Transições e animações"],
    tokens: ["--dss-action-*", "--dss-feedback-*", "--dss-hub-*", "--dss-water-*", "--dss-waste-*"],
    codeExample: `.dss-input--focused {
  border-color: var(--dss-action-primary);
  box-shadow: var(--dss-shadow-focus);
}

.dss-input--brand-hub.dss-input--focused {
  border-color: var(--dss-hub-600);
}`,
  },
};

// ============================================================================
// PREVIEW COMPONENT
// ============================================================================

interface InputPreviewProps {
  variant: string;
  color: string;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  error?: boolean | string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  dense?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  hint?: string;
  brand?: string | null;
  isFocused?: boolean;
  showPasswordToggle?: boolean;
  showToken?: boolean;
  isDarkMode?: boolean;
}

const DssInputPreview: React.FC<InputPreviewProps> = ({
  variant,
  color,
  label,
  placeholder,
  type,
  value,
  error = false,
  disabled = false,
  readonly = false,
  clearable = false,
  dense = false,
  prefix,
  suffix,
  hint,
  brand = null,
  isFocused = false,
  showPasswordToggle = false,
  showToken = false,
  isDarkMode = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const [focused, setFocused] = useState(isFocused);

  const getColors = () => {
    if (error) {
      return {
        border: "#d8182e",
        focusShadow: "0 0 0 3px rgba(216,24,46,0.25)",
        labelColor: "#d8182e",
        iconColor: "#d8182e",
      };
    }

    if (brand) {
      const brandData = brandColors[brand as keyof typeof brandColors];
      return {
        border: brandData?.principal || "#1f86de",
        focusShadow: `0 0 0 3px ${brandData?.principal}40`,
        labelColor: brandData?.principal || "#1f86de",
        iconColor: brandData?.principal || "#1f86de",
      };
    }

    const colorData = semanticColors[color as keyof typeof semanticColors];
    return {
      border: colorData?.bg || "#1f86de",
      focusShadow: `0 0 0 3px ${colorData?.bg}40`,
      labelColor: colorData?.bg || "#1f86de",
      iconColor: colorData?.bg || "#1f86de",
    };
  };

  const colors = getColors();

  const getVariantStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "100%",
      height: dense ? "36px" : "44px",
      padding: "0 12px",
      fontSize: "14px",
      fontFamily: "inherit",
      color: disabled ? "#d4d4d4" : isDarkMode ? "#e5e5e5" : "#454545",
      backgroundColor: disabled ? (isDarkMode ? "#2a2a2a" : "#f5f5f5") : isDarkMode ? "#1a1a2e" : "#ffffff",
      borderRadius: "4px",
      transition: "all 150ms cubic-bezier(0.4,0,0.2,1)",
      cursor: disabled ? "not-allowed" : "text",
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case "outlined":
        return {
          ...base,
          border: focused ? `2px solid ${colors.border}` : `1px solid ${error ? "#d8182e" : isDarkMode ? "#404040" : "#d4d4d4"}`,
          boxShadow: focused ? colors.focusShadow : "none",
        };
      case "filled":
        return {
          ...base,
          border: "none",
          borderBottom: focused ? `2px solid ${colors.border}` : `1px solid ${error ? "#d8182e" : isDarkMode ? "#404040" : "#d4d4d4"}`,
          backgroundColor: disabled ? (isDarkMode ? "#2a2a2a" : "#f5f5f5") : isDarkMode ? "#252538" : "#fafafa",
          borderRadius: "4px 4px 0 0",
        };
      case "standout":
        return {
          ...base,
          border: "none",
          backgroundColor: focused
            ? brand
              ? `${brandColors[brand as keyof typeof brandColors]?.principal}15`
              : `${colors.border}15`
            : disabled
              ? (isDarkMode ? "#2a2a2a" : "#f5f5f5")
              : isDarkMode ? "#252538" : "#f0f0f0",
          boxShadow: focused ? colors.focusShadow : "none",
        };
      case "borderless":
        return {
          ...base,
          border: "none",
          borderBottom: focused ? `2px solid ${colors.border}` : `1px solid transparent`,
          backgroundColor: "transparent",
          borderRadius: "0",
        };
      default:
        return base;
    }
  };

  const actualType = type === "password" && showPassword ? "text" : type;

  const tokenName = brand
    ? brandColors[brand as keyof typeof brandColors]?.tokens.principal
    : semanticColors[color as keyof typeof semanticColors]?.tokens.base;

  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium mb-1.5"
          style={{
            color: error ? "#d8182e" : focused ? colors.labelColor : isDarkMode ? "#a0a0a0" : "#454545",
            transition: "color 150ms ease",
          }}
        >
          {label}
        </label>
      )}

      <div style={getVariantStyles()}>
        {prefix && <span style={{ color: focused ? colors.iconColor : isDarkMode ? "#606060" : "#737373", flexShrink: 0 }}>{prefix}</span>}

        <input
          type={actualType}
          value={internalValue}
          onChange={(e) => setInternalValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          className="flex-1 bg-transparent outline-none border-none"
          style={{
            color: disabled ? "#d4d4d4" : isDarkMode ? "#e5e5e5" : "#454545",
            fontSize: "14px",
          }}
        />

        {clearable && internalValue && !disabled && !readonly && (
          <button
            onClick={() => setInternalValue("")}
            className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
            style={{ color: isDarkMode ? "#808080" : "#737373" }}
          >
            <X size={16} />
          </button>
        )}

        {type === "password" && showPasswordToggle && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
            style={{ color: isDarkMode ? "#808080" : "#737373" }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {suffix && <span style={{ color: focused ? colors.iconColor : isDarkMode ? "#606060" : "#737373", flexShrink: 0 }}>{suffix}</span>}

        {error && <AlertCircle size={18} style={{ color: "#d8182e", flexShrink: 0 }} />}
      </div>

      {(hint || (typeof error === "string" && error)) && (
        <p className="text-xs mt-1.5" style={{ color: error ? "#d8182e" : isDarkMode ? "#707070" : "#a3a3a3" }}>
          {typeof error === "string" ? error : hint}
        </p>
      )}

      {showToken && tokenName && (
        <code className="text-[10px] font-mono mt-1 block text-center" style={{ color: isDarkMode ? "#606060" : "var(--jtech-text-muted)" }}>
          {tokenName}
        </code>
      )}
    </div>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

const DssInputPage: React.FC = () => {
  // Playground States
  const [selectedVariant, setSelectedVariant] = useState("outlined");
  const [selectedColor, setSelectedColor] = useState("primary");
  const [selectedType, setSelectedType] = useState("text");
  const [inputLabel, setInputLabel] = useState("Email");
  const [inputPlaceholder, setInputPlaceholder] = useState("Digite seu email");
  const [showError, setShowError] = useState(false);
  const [errorMessage] = useState("Este campo é obrigatório");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isReadonly, setIsReadonly] = useState(false);
  const [isClearable, setIsClearable] = useState(false);
  const [isDense, setIsDense] = useState(false);
  const [showPrefix, setShowPrefix] = useState(false);
  const [showSuffix, setShowSuffix] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintText] = useState("Informe um email válido");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showPasswordToggle] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Clipboard
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, isToken = false) => {
    navigator.clipboard.writeText(text);
    if (isToken) {
      setCopiedToken(text);
      setTimeout(() => setCopiedToken(null), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Generate code
  const generateCode = () => {
    const props: string[] = [];

    if (selectedVariant !== "outlined") props.push(`variant="${selectedVariant}"`);
    if (selectedBrand) {
      props.push(`brand="${selectedBrand}"`);
    } else if (selectedColor !== "primary") {
      props.push(`color="${selectedColor}"`);
    }
    if (selectedType !== "text") props.push(`type="${selectedType}"`);
    if (inputLabel) props.push(`label="${inputLabel}"`);
    if (inputPlaceholder) props.push(`placeholder="${inputPlaceholder}"`);
    if (showError) props.push(`error="${errorMessage}"`);
    if (isDisabled) props.push("disabled");
    if (isReadonly) props.push("readonly");
    if (isClearable) props.push("clearable");
    if (isDense) props.push("dense");
    if (showHint && hintText) props.push(`hint="${hintText}"`);

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";

    let code = `<DssInput${propsStr.length > 1 ? propsStr : " "}v-model="value"`;

    if (showPrefix || showSuffix) {
      code += ">\n";
      if (showPrefix) code += '  <template #prepend>\n    <q-icon name="mail" />\n  </template>\n';
      if (showSuffix) code += '  <template #append>\n    <q-icon name="search" />\n  </template>\n';
      code += "</DssInput>";
    } else {
      code += " />";
    }

    return code;
  };

  // Token categories
  const tokenCategories = [...new Set(tokensUsed.map((t) => t.category))];

  // Get prefix icon
  const getPrefixIcon = () => {
    switch (selectedType) {
      case "email": return <Mail size={18} />;
      case "search": return <Search size={18} />;
      case "tel": return <Phone size={18} />;
      case "password": return <Lock size={18} />;
      case "url": return <Globe size={18} />;
      default: return <User size={18} />;
    }
  };

  // Handle brand selection with mutual exclusivity
  const handleBrandSelect = (brand: string | null) => {
    setSelectedBrand(brand);
  };

  // Handle color selection with mutual exclusivity
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedBrand(null);
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10" style={{ backgroundColor: "var(--dss-page-bg)" }}>
      {/* ================================================================
          HERO HEADER
          ================================================================ */}
      <PageHeader
        icon={FileText}
        badge="Componente Base"
        badgeVariant="accent"
        title="Componente"
        titleAccent="DssInput"
        subtitle="DssInput é o componente responsável pela entrada de dados do usuário em formulários e fluxos interativos. Oferece suporte a diferentes tipos de entrada, estados e feedbacks visuais, garantindo clareza, previsibilidade e boa experiência durante o preenchimento."
        subtitleHighlights={["tokens DSS", "brandability", "WCAG 2.1 AA"]}
        extraBadges={[
          { label: "v2.3.0", variant: "info" },
          { label: "Quasar Compatible", variant: "success" },
        ]}
      />

      {/* ================================================================
          INTERACTIVE PLAYGROUND
          ================================================================ */}
      <SectionHeader title="Playground" titleAccent="Interativo" badge="Live Preview" />

      <Card
        className="overflow-hidden"
        style={{
          backgroundColor: "var(--jtech-card-bg)",
          borderColor: "var(--dss-jtech-accent)",
          borderWidth: "2px",
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2" style={{ color: "var(--jtech-heading-secondary)" }}>
              <Code className="h-5 w-5" style={{ color: "var(--dss-jtech-accent)" }} />
              Configure o Input
            </CardTitle>
            <CardDescription style={{ color: "var(--jtech-text-body)" }}>
              Selecione as props e veja o resultado em tempo real.
            </CardDescription>
          </div>
          <PlaygroundButton
            onClick={() => setIsDarkMode(!isDarkMode)}
            isSelected={isDarkMode}
            selectedColor={isDarkMode ? "#6366f1" : undefined}
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            {isDarkMode ? "Light" : "Dark"}
          </PlaygroundButton>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview Area */}
          <div
            className="p-8 rounded-lg flex items-center justify-center min-h-[180px] relative transition-all duration-300"
            style={{
              backgroundColor: isDarkMode ? "#1a1a2e" : "#ffffff",
              backgroundImage: isDarkMode
                ? "radial-gradient(circle, #2d2d44 1px, transparent 1px)"
                : "radial-gradient(circle, #e5e5e5 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              border: `1px dashed ${isDarkMode ? "#404050" : "var(--jtech-card-border)"}`,
            }}
          >
            <div className="w-full max-w-sm">
              <DssInputPreview
                variant={selectedVariant}
                color={selectedColor}
                label={inputLabel}
                placeholder={inputPlaceholder}
                type={selectedType}
                value=""
                error={showError ? errorMessage : false}
                disabled={isDisabled}
                readonly={isReadonly}
                clearable={isClearable}
                dense={isDense}
                prefix={showPrefix ? getPrefixIcon() : undefined}
                suffix={showSuffix ? <Search size={18} /> : undefined}
                hint={showHint ? hintText : undefined}
                brand={selectedBrand}
                showPasswordToggle={selectedType === "password" && showPasswordToggle}
                showToken
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Variant */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--jtech-heading-tertiary)" }}>
                <Layout size={14} /> Variant
              </label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <PlaygroundButton
                    key={v.name}
                    onClick={() => setSelectedVariant(v.name)}
                    isSelected={selectedVariant === v.name}
                  >
                    {v.label}
                  </PlaygroundButton>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--jtech-heading-tertiary)" }}>
                <Settings size={14} /> Type
              </label>
              <div className="flex flex-wrap gap-2">
                {inputTypes.slice(0, 5).map((t) => (
                  <PlaygroundButton
                    key={t.name}
                    onClick={() => setSelectedType(t.name)}
                    isSelected={selectedType === t.name}
                  >
                    <t.icon size={12} />
                    {t.label}
                  </PlaygroundButton>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--jtech-heading-tertiary)" }}>
                <Palette size={14} /> Color
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(semanticColors).map((c) => (
                  <PlaygroundButton
                    key={c.name}
                    onClick={() => handleColorSelect(c.name)}
                    isSelected={selectedColor === c.name && !selectedBrand}
                    selectedColor={c.bg}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.bg }} />
                    {c.label}
                  </PlaygroundButton>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--jtech-heading-tertiary)" }}>
                Brand (Veolia)
              </label>
              <div className="flex flex-wrap gap-2">
                <PlaygroundButton
                  onClick={() => handleBrandSelect(null)}
                  isSelected={!selectedBrand}
                >
                  Nenhum
                </PlaygroundButton>
                {Object.values(brandColors).map((b) => (
                  <PlaygroundButton
                    key={b.name}
                    onClick={() => handleBrandSelect(b.name)}
                    isSelected={selectedBrand === b.name}
                    selectedColor={b.principal}
                  >
                    <span>{b.icon}</span>
                    {b.label}
                  </PlaygroundButton>
                ))}
              </div>
            </div>

            {/* States */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--jtech-heading-tertiary)" }}>
                Estados
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "error", label: "Error", active: showError, toggle: () => setShowError(!showError) },
                  { key: "disabled", label: "Disabled", active: isDisabled, toggle: () => setIsDisabled(!isDisabled) },
                  { key: "readonly", label: "Readonly", active: isReadonly, toggle: () => setIsReadonly(!isReadonly) },
                  { key: "clearable", label: "Clearable", active: isClearable, toggle: () => setIsClearable(!isClearable) },
                  { key: "dense", label: "Dense", active: isDense, toggle: () => setIsDense(!isDense) },
                ].map((item) => (
                  <PlaygroundButton
                    key={item.key}
                    onClick={item.toggle}
                    isSelected={item.active}
                    selectedColor="#4dd228"
                  >
                    {item.active && "✓ "}
                    {item.label}
                  </PlaygroundButton>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: "var(--jtech-heading-tertiary)" }}>
                Extras
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "prefix", label: "Prefix", active: showPrefix, toggle: () => setShowPrefix(!showPrefix) },
                  { key: "suffix", label: "Suffix", active: showSuffix, toggle: () => setShowSuffix(!showSuffix) },
                  { key: "hint", label: "Hint", active: showHint, toggle: () => setShowHint(!showHint) },
                ].map((item) => (
                  <PlaygroundButton
                    key={item.key}
                    onClick={item.toggle}
                    isSelected={item.active}
                    selectedColor="#6366f1"
                  >
                    {item.active && "✓ "}
                    {item.label}
                  </PlaygroundButton>
                ))}
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="relative">
            <pre
              className="p-4 rounded-lg text-sm overflow-x-auto font-mono"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                border: "1px solid var(--jtech-card-border)",
                color: "#e5e5e5",
              }}
            >
              {generateCode()}
            </pre>
            <button
              onClick={() => copyToClipboard(generateCode())}
              className="absolute top-3 right-3 p-2 rounded-lg transition-all hover:bg-white/10"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {copiedCode ? (
                <Check size={16} style={{ color: "#4dd228" }} />
              ) : (
                <Copy size={16} style={{ color: "#a3a3a3" }} />
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================
          ANATOMY SECTION
          ================================================================ */}
      <SectionHeader title="Anatomia" titleAccent="4 Camadas" badge="Arquitetura DSS" />

      <AnatomySection componentName="DssInput" layers={anatomyData} />

      {/* ================================================================
          TECHNICAL DOCUMENTATION
          ================================================================ */}
      <SectionHeader
        title="Documentação"
        titleAccent="Técnica"
        badge={`${propsData.length} props • ${tokensUsed.length} tokens`}
      />

      {/* Props API */}
      <CollapsibleSection
        icon={Code}
        title="Props API"
        titleAccent="& Eventos"
        defaultOpen={false}
      >
        <Card
          className="overflow-hidden"
          style={{
            backgroundColor: "var(--jtech-card-bg)",
            borderColor: "var(--jtech-card-border)",
          }}
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--jtech-card-border)" }}>
                  <TableHead style={{ color: "var(--jtech-text-muted)" }}>Categoria</TableHead>
                  <TableHead style={{ color: "var(--jtech-text-muted)" }}>Prop</TableHead>
                  <TableHead style={{ color: "var(--jtech-text-muted)" }}>Tipo</TableHead>
                  <TableHead style={{ color: "var(--jtech-text-muted)" }}>Default</TableHead>
                  <TableHead style={{ color: "var(--jtech-text-muted)" }}>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propsData.map((prop, index) => (
                  <TableRow
                    key={index}
                    style={{ borderColor: "var(--jtech-card-border)" }}
                    className="hover:bg-white/5"
                  >
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: "var(--jtech-card-border)",
                          color: "var(--jtech-text-muted)",
                        }}
                      >
                        {prop.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <code
                        className="text-sm font-mono px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: "var(--dss-jtech-accent)",
                        }}
                      >
                        {prop.prop}
                      </code>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono" style={{ color: "var(--jtech-text-body)" }}>
                        {prop.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <code
                        className="text-xs font-mono px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.2)",
                          color: "#a3a3a3",
                        }}
                      >
                        {prop.default}
                      </code>
                    </TableCell>
                    <TableCell style={{ color: "var(--jtech-text-body)" }}>{prop.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </CollapsibleSection>

      {/* Tokens DSS */}
      <CollapsibleSection
        icon={Layers}
        title="Tokens DSS"
        titleAccent="Utilizados"
        defaultOpen={false}
      >
        <DssTabs defaultValue={tokenCategories[0]} className="space-y-4">
          <DssTabsList className="flex-wrap">
            {tokenCategories.map((category) => (
              <DssTabsTrigger key={category} value={category} badge={tokensUsed.filter((t) => t.category === category).length}>
                {category}
              </DssTabsTrigger>
            ))}
          </DssTabsList>

          {tokenCategories.map((category) => (
            <DssTabsContent key={category} value={category}>
              <Card
                style={{
                  backgroundColor: "var(--jtech-card-bg)",
                  borderColor: "var(--jtech-card-border)",
                }}
              >
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tokensUsed
                      .filter((t) => t.category === category)
                      .map((token, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg group cursor-pointer transition-all hover:bg-white/5"
                          onClick={() => copyToClipboard(token.token, true)}
                          style={{
                            backgroundColor: "rgba(255,255,255,0.02)",
                            border: "1px solid var(--jtech-card-border)",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded flex-shrink-0"
                            style={{
                              backgroundColor:
                                token.value.startsWith("#") || token.value.startsWith("rgba")
                                  ? token.value
                                  : "transparent",
                              border:
                                token.value.startsWith("#") || token.value.startsWith("rgba")
                                  ? "none"
                                  : "1px dashed var(--jtech-card-border)",
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <code className="text-xs font-mono truncate" style={{ color: "var(--dss-jtech-accent)" }}>
                                {token.token}
                              </code>
                              {copiedToken === token.token ? (
                                <Check size={12} style={{ color: "#4dd228" }} />
                              ) : (
                                <Copy
                                  size={12}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  style={{ color: "var(--jtech-text-muted)" }}
                                />
                              )}
                            </div>
                            <p className="text-xs truncate" style={{ color: "var(--jtech-text-muted)" }}>
                              {token.usage}
                            </p>
                          </div>
                          <code className="text-xs font-mono flex-shrink-0" style={{ color: "var(--jtech-text-body)" }}>
                            {token.value}
                          </code>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </DssTabsContent>
          ))}
        </DssTabs>
      </CollapsibleSection>
    </div>
  );
};

export default DssInputPage;
