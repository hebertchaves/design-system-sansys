import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

// Tokens DSS reais do globals.scss
const grayScale = [
  { token: "--dss-gray-50", value: "#ffffff", desc: "Branco puro" },
  { token: "--dss-gray-100", value: "#fafafa", desc: "Fundos claros" },
  { token: "--dss-gray-200", value: "#f5f5f5", desc: "Fundos sutis" },
  { token: "--dss-gray-300", value: "#e5e5e5", desc: "Bordas leves" },
  { token: "--dss-gray-400", value: "#d4d4d4", desc: "Bordas" },
  { token: "--dss-gray-500", value: "#a3a3a3", desc: "Texto desabilitado" },
  { token: "--dss-gray-600", value: "#737373", desc: "Texto secundário" },
  { token: "--dss-gray-700", value: "#525252", desc: "Texto terciário" },
  { token: "--dss-gray-800", value: "#262626", desc: "Texto principal" },
  { token: "--dss-gray-900", value: "#0a0a0a", desc: "Texto forte" },
  { token: "--dss-gray-950", value: "#000000", desc: "Preto puro" },
];

const brandHub = [
  { token: "--dss-hub-50", value: "#fff9ed", desc: "Fundo sutil" },
  { token: "--dss-hub-100", value: "#fef2d6", desc: "Fundo leve" },
  { token: "--dss-hub-200", value: "#fde2ab", desc: "Hover leve" },
  { token: "--dss-hub-300", value: "#fbcb76", desc: "Destaque" },
  { token: "--dss-hub-400", value: "#f8aa3f", desc: "Hover" },
  { token: "--dss-hub-500", value: "#f5911a", desc: "Cor principal" },
  { token: "--dss-hub-600", value: "#ef7a11", desc: "Pressed" },
  { token: "--dss-hub-700", value: "#bf590f", desc: "Escuro" },
  { token: "--dss-hub-800", value: "#984614", desc: "Mais escuro" },
  { token: "--dss-hub-900", value: "#7a3614", desc: "Texto escuro" },
  { token: "--dss-hub-950", value: "#421d08", desc: "Muito escuro" },
];

const brandWater = [
  { token: "--dss-water-50", value: "#f0f7ff", desc: "Fundo sutil" },
  { token: "--dss-water-100", value: "#e0eefe", desc: "Fundo leve" },
  { token: "--dss-water-200", value: "#badefd", desc: "Hover leve" },
  { token: "--dss-water-300", value: "#7dc4fc", desc: "Destaque" },
  { token: "--dss-water-400", value: "#38a6f8", desc: "Hover" },
  { token: "--dss-water-500", value: "#0e88e4", desc: "Cor principal" },
  { token: "--dss-water-600", value: "#026cc7", desc: "Pressed" },
  { token: "--dss-water-700", value: "#0356a1", desc: "Escuro" },
  { token: "--dss-water-800", value: "#074a85", desc: "Mais escuro" },
  { token: "--dss-water-900", value: "#0c3e6e", desc: "Texto escuro" },
  { token: "--dss-water-950", value: "#082749", desc: "Muito escuro" },
];

const brandWaste = [
  { token: "--dss-waste-50", value: "#edfcf4", desc: "Fundo sutil" },
  { token: "--dss-waste-100", value: "#d3f8e2", desc: "Fundo leve" },
  { token: "--dss-waste-200", value: "#abefcb", desc: "Hover leve" },
  { token: "--dss-waste-300", value: "#74e1ae", desc: "Destaque" },
  { token: "--dss-waste-400", value: "#3ccb8d", desc: "Hover" },
  { token: "--dss-waste-500", value: "#18b173", desc: "Cor principal" },
  { token: "--dss-waste-600", value: "#0b8154", desc: "Pressed" },
  { token: "--dss-waste-700", value: "#0a724e", desc: "Escuro" },
  { token: "--dss-waste-800", value: "#0a5b3e", desc: "Mais escuro" },
  { token: "--dss-waste-900", value: "#0a4a34", desc: "Texto escuro" },
  { token: "--dss-waste-950", value: "#042a1e", desc: "Muito escuro" },
];

const semanticPrimary = [
  { token: "--dss-primary-disable", value: "#b3dcff", desc: "Estado desabilitado" },
  { token: "--dss-primary-light", value: "#86c0f3", desc: "Variante clara" },
  { token: "--dss-primary", value: "#1f86de", desc: "Cor principal" },
  { token: "--dss-primary-hover", value: "#0f5295", desc: "Estado hover" },
  { token: "--dss-primary-deep", value: "#0a3a6a", desc: "Variante escura" },
  { token: "--dss-primary-focus", value: "#006AC5", desc: "Estado focus" },
];

const semanticSecondary = [
  { token: "--dss-secondary-disable", value: "#b5ece4", desc: "Estado desabilitado" },
  { token: "--dss-secondary-light", value: "#6ddbcb", desc: "Variante clara" },
  { token: "--dss-secondary", value: "#26a69a", desc: "Cor principal" },
  { token: "--dss-secondary-hover", value: "#1c857e", desc: "Estado hover" },
  { token: "--dss-secondary-deep", value: "#116761", desc: "Variante escura" },
  { token: "--dss-secondary-focus", value: "#009C8D", desc: "Estado focus" },
];

const semanticTertiary = [
  { token: "--dss-tertiary-disable", value: "#ffd2b5", desc: "Estado desabilitado" },
  { token: "--dss-tertiary-light", value: "#ff9452", desc: "Variante clara" },
  { token: "--dss-tertiary", value: "#ff6607", desc: "Cor principal" },
  { token: "--dss-tertiary-hover", value: "#de5500", desc: "Estado hover" },
  { token: "--dss-tertiary-deep", value: "#ad4200", desc: "Variante escura" },
  { token: "--dss-tertiary-focus", value: "#E95900", desc: "Estado focus" },
];

const semanticAccent = [
  { token: "--dss-accent-disable", value: "#f0ddf4", desc: "Estado desabilitado" },
  { token: "--dss-accent-light", value: "#e3bceb", desc: "Variante clara" },
  { token: "--dss-accent", value: "#b454c4", desc: "Cor principal" },
  { token: "--dss-accent-hover", value: "#883b90", desc: "Estado hover" },
  { token: "--dss-accent-deep", value: "#642f6a", desc: "Variante escura" },
  { token: "--dss-accent-focus", value: "#B02EC5", desc: "Estado focus" },
];

const semanticDark = [
  { token: "--dss-dark-disable", value: "#d7d7d7", desc: "Estado desabilitado" },
  { token: "--dss-dark-light", value: "#b0b0b0", desc: "Variante clara" },
  { token: "--dss-dark", value: "#454545", desc: "Cor principal" },
  { token: "--dss-dark-hover", value: "#313131", desc: "Estado hover" },
  { token: "--dss-dark-deep", value: "#1d1d1d", desc: "Variante escura" },
  { token: "--dss-dark-focus", value: "#3E3E3E", desc: "Estado focus" },
];

const feedbackColors = [
  { token: "--dss-positive", value: "#4dd228", desc: "Sucesso" },
  { token: "--dss-positive-light", value: "#b9f2a4", desc: "Sucesso leve" },
  { token: "--dss-positive-hover", value: "#27910D", desc: "Sucesso hover" },
  { token: "--dss-positive-deep", value: "#246714", desc: "Sucesso escuro" },
  { token: "--dss-negative", value: "#d8182e", desc: "Erro" },
  { token: "--dss-negative-light", value: "#ffa0ab", desc: "Erro leve" },
  { token: "--dss-negative-hover", value: "#a01424", desc: "Erro hover" },
  { token: "--dss-negative-deep", value: "#720e19", desc: "Erro escuro" },
  { token: "--dss-warning", value: "#fabd14", desc: "Atenção" },
  { token: "--dss-warning-light", value: "#fff488", desc: "Atenção leve" },
  { token: "--dss-warning-hover", value: "#dd8e02", desc: "Atenção hover" },
  { token: "--dss-warning-deep", value: "#a66d08", desc: "Atenção escuro" },
  { token: "--dss-info", value: "#0cc4e9", desc: "Informação" },
  { token: "--dss-info-light", value: "#a7effa", desc: "Info leve" },
  { token: "--dss-info-hover", value: "#0c8bae", desc: "Info hover" },
  { token: "--dss-info-deep", value: "#0d7491", desc: "Info escuro" },
];

interface ColorSwatchProps {
  token: string;
  value: string;
  desc: string;
}

function ColorSwatch({ token, value, desc }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${token})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLight = (hex: string) => {
    const c = hex.replace('#', '');
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 180;
  };

  return (
    <div 
      className="flex items-center gap-4 p-3 rounded-lg border border-dss-gray-300 hover:border-dss-primary transition-colors group cursor-pointer"
      onClick={handleCopy}
    >
      <div 
        className="h-12 w-12 rounded-md border border-dss-gray-400 flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105"
        style={{ backgroundColor: value }}
      >
        {copied && (
          <Check 
            size={16} 
            className={isLight(value) ? "text-dss-gray-800" : "text-white"} 
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <code className="text-sm font-mono text-dss-gray-800">{token}</code>
        <p className="text-sm text-dss-gray-600">{desc}</p>
      </div>
      <div className="flex items-center gap-2">
        <code className="text-xs text-dss-gray-500 font-mono uppercase">
          {value}
        </code>
        <Copy size={14} className="text-dss-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

interface ColorPaletteProps {
  colors: ColorSwatchProps[];
  title: string;
  description: string;
}

function ColorPalette({ colors, title, description }: ColorPaletteProps) {
  return (
    <Card className="border-dss-gray-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-dss-gray-900">{title}</CardTitle>
        <CardDescription className="text-dss-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {colors.map((color) => (
            <ColorSwatch key={color.token} {...color} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BrandPreview({ name, colors, className }: { name: string; colors: ColorSwatchProps[]; className?: string }) {
  return (
    <Card className={`overflow-hidden border-dss-gray-300 ${className}`}>
      <div className="flex">
        {colors.slice(0, 6).map((color, i) => (
          <div 
            key={color.token}
            className="flex-1 h-16"
            style={{ backgroundColor: color.value }}
            title={color.token}
          />
        ))}
      </div>
      <div className="flex">
        {colors.slice(6).map((color, i) => (
          <div 
            key={color.token}
            className="flex-1 h-8"
            style={{ backgroundColor: color.value }}
            title={color.token}
          />
        ))}
      </div>
      <CardContent className="p-4 bg-dss-gray-100">
        <p className="font-semibold text-dss-gray-900">{name}</p>
        <code className="text-xs text-dss-gray-600">{colors[5]?.value}</code>
      </CardContent>
    </Card>
  );
}

export default function ColorsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-dss-gray-600">
          <Link to="/" className="hover:text-dss-primary transition-colors">Início</Link>
          <span>/</span>
          <Link to="/tokens/cores" className="hover:text-dss-primary transition-colors">Fundações</Link>
          <span>/</span>
          <span className="text-dss-gray-900 font-medium">Cores</span>
        </div>
        
        <h1 className="text-3xl font-bold text-dss-gray-900">
          Tokens de Cor
        </h1>
        
        <p className="text-lg text-dss-gray-600 max-w-3xl">
          Sistema de cores do DSS baseado em tokens CSS globais. Inclui escalas de cinza, 
          paletas de marca (Hub, Water, Waste) e cores semânticas para estados e feedback.
        </p>
      </section>

      {/* Brand Palettes Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-dss-gray-900">Paletas de Marca</h2>
        <p className="text-dss-gray-600">Cada marca possui sua própria escala de cores de 50 a 950.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BrandPreview name="Sansys Hub" colors={brandHub} />
          <BrandPreview name="Sansys Water" colors={brandWater} />
          <BrandPreview name="Sansys Waste" colors={brandWaste} />
        </div>
      </section>

      {/* Tabs */}
      <Tabs defaultValue="gray" className="space-y-6">
        <TabsList className="bg-dss-gray-200 p-1">
          <TabsTrigger value="gray" className="data-[state=active]:bg-white">Escala de Cinza</TabsTrigger>
          <TabsTrigger value="brands" className="data-[state=active]:bg-white">Marcas</TabsTrigger>
          <TabsTrigger value="semantic" className="data-[state=active]:bg-white">Semânticas</TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-white">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="gray" className="space-y-6">
          <ColorPalette 
            title="Escala de Cinza" 
            description="Cores neutras para textos, fundos, bordas e elementos de interface."
            colors={grayScale}
          />
        </TabsContent>

        <TabsContent value="brands" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ColorPalette 
              title="Hub (Laranja)" 
              description="Paleta da marca Sansys Hub."
              colors={brandHub}
            />
            <ColorPalette 
              title="Water (Azul)" 
              description="Paleta da marca Sansys Water."
              colors={brandWater}
            />
          </div>
          <ColorPalette 
            title="Waste (Verde)" 
            description="Paleta da marca Sansys Waste."
            colors={brandWaste}
          />
        </TabsContent>

        <TabsContent value="semantic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ColorPalette 
              title="Primary (Azul)" 
              description="Cor principal para ações e elementos de destaque."
              colors={semanticPrimary}
            />
            <ColorPalette 
              title="Secondary (Verde/Turquesa)" 
              description="Cor secundária para ações alternativas."
              colors={semanticSecondary}
            />
            <ColorPalette 
              title="Tertiary (Laranja)" 
              description="Cor terciária para destaques e CTAs."
              colors={semanticTertiary}
            />
            <ColorPalette 
              title="Accent (Roxo)" 
              description="Cor de destaque para elementos especiais."
              colors={semanticAccent}
            />
          </div>
          <ColorPalette 
            title="Dark (Cinza)" 
            description="Escala escura para elementos neutros e textos."
            colors={semanticDark}
          />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <ColorPalette 
            title="Cores de Feedback" 
            description="Cores para estados de sucesso, erro, atenção e informação."
            colors={feedbackColors}
          />
        </TabsContent>
      </Tabs>

      {/* Usage */}
      <Card className="border-dss-gray-300">
        <CardHeader>
          <CardTitle className="text-dss-gray-900">Como Usar</CardTitle>
          <CardDescription className="text-dss-gray-600">
            Utilize as variáveis CSS para garantir consistência em todo o sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-2 text-dss-gray-800">CSS Variables</p>
            <pre className="bg-dss-gray-900 text-dss-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{`.my-element {
  background-color: var(--dss-primary);
  color: var(--dss-gray-50);
  border-color: var(--dss-gray-300);
}

.my-element:hover {
  background-color: var(--dss-primary-hover);
}

.my-element:disabled {
  background-color: var(--dss-primary-disable);
}`}</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 text-dss-gray-800">Classes Tailwind (configuradas)</p>
            <pre className="bg-dss-gray-900 text-dss-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{`<!-- Usando tokens DSS via Tailwind -->
<div class="bg-dss-primary text-dss-gray-50 border-dss-gray-300">
  Conteúdo
</div>

<!-- Cores de feedback -->
<span class="text-dss-positive">Sucesso</span>
<span class="text-dss-negative">Erro</span>
<span class="text-dss-warning">Atenção</span>`}</code>
            </pre>
          </div>

          <div>
            <p className="text-sm font-medium mb-2 text-dss-gray-800">Trocando Marca Dinamicamente</p>
            <pre className="bg-dss-gray-900 text-dss-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">{`<!-- Aplica tema da marca ao container -->
<div class="dss-brand-hub">
  <!-- Elementos usam cores Hub -->
</div>

<div class="dss-brand-water">
  <!-- Elementos usam cores Water -->
</div>

<div class="dss-brand-waste">
  <!-- Elementos usam cores Waste -->
</div>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
