/**
 * ==========================================================================
 * DssPlayground - Componente Unificado de Playground
 * ==========================================================================
 *
 * Componente principal que orquestra todo o playground:
 * - Layout consistente em duas colunas
 * - Área de preview padronizada
 * - Controles organizados por seção
 * - Geração de código automática
 *
 * @example
 * ```tsx
 * <DssPlayground
 *   title="Configure o Componente"
 *   description="Selecione as props e veja o resultado em tempo real."
 *   previewContent={<MyComponentPreview {...state} />}
 *   controls={<MyControls state={state} onChange={handleChange} />}
 *   codePreview={generateCode(state)}
 *   isDarkMode={isDarkMode}
 *   onDarkModeToggle={() => setIsDarkMode(!isDarkMode)}
 * />
 * ```
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code } from "lucide-react";
import { PlaygroundPreviewArea } from "./PlaygroundPreviewArea";
import { PlaygroundCodePreview } from "./PlaygroundCodePreview";
import { ThemeToggle } from "./PlaygroundControls";

interface DssPlaygroundProps {
  /** Título do playground */
  title?: string;
  /** Descrição do playground */
  description?: string;
  /** Conteúdo do preview (componente renderizado) */
  previewContent: React.ReactNode;
  /** Controles do playground */
  controls: React.ReactNode;
  /** Código gerado */
  codePreview: string;
  /** Token ativo (opcional) */
  activeToken?: string;
  /** Valor do token ativo (opcional) */
  tokenValue?: string;
  /** Modo escuro ativo */
  isDarkMode: boolean;
  /** Callback para toggle do tema */
  onDarkModeToggle: () => void;
  /** Altura mínima do preview */
  previewMinHeight?: string;
  /**
   * Layout do playground:
   * - "canonical": Padrão PLAYGROUND_STANDARD v3 (controles topo, preview+code lado a lado abaixo)
   * - "horizontal": Layout legacy (preview à esquerda, controles+code à direita)
   * - "vertical": Layout empilhado
   */
  layout?: "canonical" | "horizontal" | "vertical";
  /** Mostrar header do card */
  showHeader?: boolean;
  /** Classes adicionais para o container */
  className?: string;
  /** Proporção do preview no layout canonical (0.5 a 0.8, default 0.7) */
  previewRatio?: number;
}

export function DssPlayground({
  title = "Configure o Componente",
  description = "Selecione as props e veja o resultado em tempo real.",
  previewContent,
  controls,
  codePreview,
  activeToken,
  tokenValue,
  isDarkMode,
  onDarkModeToggle,
  previewMinHeight = "360px",
  layout = "canonical",
  showHeader = true,
  className = "",
  previewRatio = 0.7,
}: DssPlaygroundProps) {
  // Layout canônico: controles topo, preview+code lado a lado abaixo
  const isCanonical = layout === "canonical";
  const isHorizontal = layout === "horizontal";

  // Calcular grid template para layout canonical
  const previewCols = Math.round(previewRatio * 12);
  const codeCols = 12 - previewCols;

  return (
    <Card
      className={`overflow-hidden ${className}`}
      style={{
        backgroundColor: "var(--jtech-card-bg)",
        borderColor: "var(--dss-jtech-accent)",
        borderWidth: "2px",
      }}
    >
      {showHeader && (
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle
              className="flex items-center gap-2 text-lg"
              style={{ color: "var(--jtech-heading-secondary)" }}
            >
              <Code className="h-5 w-5" style={{ color: "var(--dss-jtech-accent)" }} />
              {title}
            </CardTitle>
            <CardDescription style={{ color: "var(--jtech-text-body)" }}>
              {description}
            </CardDescription>
          </div>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onDarkModeToggle} />
        </CardHeader>
      )}

      <CardContent className="p-6">
        {isCanonical ? (
          /* ========================================
           * LAYOUT CANÔNICO (PLAYGROUND_STANDARD v3)
           * ========================================
           * Estrutura:
           * ┌──────────────────────────────────────┐
           * │ CONTROLS ZONE (topo)                 │
           * └──────────────────────────────────────┘
           * ┌────────────────────────┬─────────────┐
           * │     PREVIEW AREA       │  CODE AREA  │
           * │    (widthRatio 0.7)    │ (ratio 0.3) │
           * └────────────────────────┴─────────────┘
           */
          <div className="space-y-6">
            {/* CONTROLS ZONE - Topo */}
            <div className="space-y-4">
              {!showHeader && (
                <ThemeToggle isDarkMode={isDarkMode} onToggle={onDarkModeToggle} />
              )}
              {controls}
            </div>

            {/* CONTENT ZONE - Preview + Code lado a lado */}
            <div 
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${previewCols}, 1fr) repeat(${codeCols}, 1fr)`,
              }}
            >
              {/* Preview Area - Maior */}
              <div style={{ gridColumn: `span ${previewCols}` }}>
                <PlaygroundPreviewArea isDarkMode={isDarkMode} minHeight={previewMinHeight}>
                  {previewContent}
                </PlaygroundPreviewArea>
              </div>

              {/* Code Area - Menor */}
              <div style={{ gridColumn: `span ${codeCols}` }} className="flex flex-col">
                <PlaygroundCodePreview
                  code={codePreview}
                  activeToken={activeToken}
                  tokenValue={tokenValue}
                  maxHeight="240px"
                />
              </div>
            </div>
          </div>
        ) : (
          /* ========================================
           * LAYOUT LEGACY (horizontal/vertical)
           * ======================================== */
          <div
            className={`gap-6 ${
              isHorizontal ? "grid grid-cols-1 lg:grid-cols-2" : "space-y-6"
            }`}
          >
            {/* Área de Preview */}
            <PlaygroundPreviewArea isDarkMode={isDarkMode} minHeight={previewMinHeight}>
              {previewContent}
            </PlaygroundPreviewArea>

            {/* Controles e Código */}
            <div className="space-y-5">
              {!showHeader && (
                <ThemeToggle isDarkMode={isDarkMode} onToggle={onDarkModeToggle} />
              )}
              {controls}
              <PlaygroundCodePreview
                code={codePreview}
                activeToken={activeToken}
                tokenValue={tokenValue}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==========================================================================
// RE-EXPORTS para facilitar importação
// ==========================================================================

export { PlaygroundPreviewArea } from "./PlaygroundPreviewArea";
export { PlaygroundCodePreview } from "./PlaygroundCodePreview";
export {
  ControlSection,
  ControlGrid,
  ThemeToggle,
  VariantSelector,
  ColorPicker,
  FeedbackColorPicker,
  BrandPicker,
  SizeSelector,
  ToggleGroup,
  IconSelector,
} from "./PlaygroundControls";

export type {
  SemanticColor,
  FeedbackColor,
  BrandColor,
  Variant,
  Size,
  PlaygroundState,
  PlaygroundConfig,
} from "./types";

export {
  DSS_SEMANTIC_COLORS,
  DSS_FEEDBACK_COLORS,
  DSS_BRAND_COLORS,
} from "./types";
