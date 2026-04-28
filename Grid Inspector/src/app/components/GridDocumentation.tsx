import { 
  Monitor, Tablet, Smartphone, Lightbulb, 
  Grid3x3, Layers, Maximize2, Eye 
} from 'lucide-react';

export function GridDocumentation() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Introdução */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-3">Documentação Completa</h1>
        <p className="text-lg opacity-90">
          Guia prático para implementar sistemas de grid em projetos de UI Design, 
          com foco em aplicações corporativas e heurísticas de UX.
        </p>
      </div>

      {/* Quando usar cada tipo de grid */}
      <section className="bg-white rounded-xl p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Grid3x3 className="text-purple-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Quando Usar Cada Tipo de Grid</h2>
        </div>

        <div className="grid gap-6">
          {/* Grid de 8 Colunas */}
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Grid de 8 Colunas</h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-blue-800 mb-1">✅ Use quando:</div>
                <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                  <li>Projetar para tablets (768px - 1024px)</li>
                  <li>Layouts mais simples com menos divisões</li>
                  <li>Aplicações mobile-first que escalam para tablet</li>
                  <li>Interfaces com 2 ou 4 colunas de conteúdo</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-blue-800 mb-1">❌ Evite quando:</div>
                <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                  <li>Precisar de divisões complexas (3, 5 ou 6 colunas)</li>
                  <li>Trabalhar com layouts desktop de alta densidade</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Grid de 12 Colunas */}
          <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200">
            <h3 className="text-lg font-semibold text-emerald-900 mb-3">Grid de 12 Colunas (Recomendado)</h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-emerald-800 mb-1">✅ Use quando:</div>
                <ul className="text-sm text-emerald-700 space-y-1 ml-4 list-disc">
                  <li>Projetar para desktop (1024px+)</li>
                  <li>Precisar de máxima flexibilidade (divisível por 2, 3, 4, 6)</li>
                  <li>Criar dashboards e painéis complexos</li>
                  <li>Seguir padrões estabelecidos (Bootstrap, Material Design)</li>
                  <li>Trabalhar em equipe com desenvolvedores front-end</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-emerald-800 mb-1">💡 Dica:</div>
                <p className="text-sm text-emerald-700">
                  Este é o padrão mais versátil e amplamente adotado. Use como base para 
                  99% dos projetos corporativos.
                </p>
              </div>
            </div>
          </div>

          {/* Grid de 16 Colunas */}
          <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Grid de 16 Colunas</h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-purple-800 mb-1">✅ Use quando:</div>
                <ul className="text-sm text-purple-700 space-y-1 ml-4 list-disc">
                  <li>Trabalhar com telas ultra-wide (1440px+)</li>
                  <li>Precisar de granularidade extra no posicionamento</li>
                  <li>Criar layouts editoriais complexos</li>
                  <li>Interfaces de dados com muitas colunas</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-purple-800 mb-1">⚠️ Atenção:</div>
                <p className="text-sm text-purple-700">
                  Maior complexidade para desenvolvedores. Use apenas quando 12 colunas 
                  não forem suficientes.
                </p>
              </div>
            </div>
          </div>

          {/* Grid Modular */}
          <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-900 mb-3">Grid Modular (Bidimensional)</h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-orange-800 mb-1">✅ Use quando:</div>
                <ul className="text-sm text-orange-700 space-y-1 ml-4 list-disc">
                  <li>Criar dashboards com widgets de tamanhos variados</li>
                  <li>Interfaces que permitem arrastar e soltar componentes</li>
                  <li>Layouts tipo "masonry" ou grade de fotos</li>
                  <li>Painéis de controle personalizáveis</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-orange-800 mb-1">💡 Exemplo:</div>
                <p className="text-sm text-orange-700">
                  Sistemas de BI, ferramentas de analytics, editores visuais.
                </p>
              </div>
            </div>
          </div>

          {/* Grid Assimétrico */}
          <div className="p-6 bg-cyan-50 rounded-lg border border-cyan-200">
            <h3 className="text-lg font-semibold text-cyan-900 mb-3">Grid Assimétrico</h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-cyan-800 mb-1">✅ Use quando:</div>
                <ul className="text-sm text-cyan-700 space-y-1 ml-4 list-disc">
                  <li>Criar hierarquia visual clara e intencional</li>
                  <li>Destacar uma área específica do layout</li>
                  <li>Designs editoriais ou criativos</li>
                  <li>Interfaces com sidebar + conteúdo principal</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-cyan-800 mb-1">💡 Exemplo:</div>
                <p className="text-sm text-cyan-700">
                  Sidebar de navegação (3fr) + Conteúdo principal (9fr), ou layouts tipo 
                  "hero section" com áreas de destaque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsividade */}
      <section className="bg-white rounded-xl p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Maximize2 className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Estratégias de Responsividade</h2>
        </div>

        <div className="space-y-6">
          {/* Mobile */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                <Smartphone className="text-slate-600" size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Mobile (320px - 767px)</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div><strong>Grid:</strong> 4 colunas ou stack vertical (1 coluna)</div>
                <div><strong>Margem:</strong> 16px</div>
                <div><strong>Gutter:</strong> 16px</div>
                <div><strong>Estratégia:</strong> Empilhar componentes verticalmente, priorizar conteúdo essencial</div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-blue-700">
                  <strong>💡 Dica UX:</strong> Cards devem ocupar 100% da largura. Evite scroll horizontal. 
                  Use accordions para economizar espaço.
                </div>
              </div>
            </div>
          </div>

          {/* Tablet */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                <Tablet className="text-slate-600" size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Tablet (768px - 1023px)</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div><strong>Grid:</strong> 8 colunas</div>
                <div><strong>Margem:</strong> 24-32px</div>
                <div><strong>Gutter:</strong> 24px</div>
                <div><strong>Estratégia:</strong> 2 colunas de cards, sidebar colapsável, navegação adaptativa</div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-blue-700">
                  <strong>💡 Dica UX:</strong> Aproveite o espaço extra para mostrar mais conteúdo, 
                  mas mantenha touch targets grandes (mínimo 44x44px).
                </div>
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                <Monitor className="text-slate-600" size={32} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Desktop (1024px+)</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div><strong>Grid:</strong> 12 colunas (padrão) ou 16 colunas (telas grandes)</div>
                <div><strong>Margem:</strong> 48px ou auto (centralizado com max-width: 1440px)</div>
                <div><strong>Gutter:</strong> 24-32px</div>
                <div><strong>Estratégia:</strong> Layouts complexos, múltiplas colunas, densidade de informação alta</div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-blue-700">
                  <strong>💡 Dica UX:</strong> Use a largura extra para sidebars, painéis laterais e 
                  navegação persistente. Evite linhas de texto muito longas (max 75 caracteres).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breakpoints Recomendados */}
        <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">Breakpoints Recomendados</h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-white rounded border border-slate-200">
              <div className="font-mono font-semibold text-slate-900 mb-1">xs</div>
              <div className="text-slate-600">0 - 639px</div>
              <div className="text-xs text-slate-500 mt-1">Mobile</div>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <div className="font-mono font-semibold text-slate-900 mb-1">sm</div>
              <div className="text-slate-600">640 - 767px</div>
              <div className="text-xs text-slate-500 mt-1">Mobile Large</div>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <div className="font-mono font-semibold text-slate-900 mb-1">md</div>
              <div className="text-slate-600">768 - 1023px</div>
              <div className="text-xs text-slate-500 mt-1">Tablet</div>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <div className="font-mono font-semibold text-slate-900 mb-1">lg</div>
              <div className="text-slate-600">1024 - 1279px</div>
              <div className="text-xs text-slate-500 mt-1">Desktop</div>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <div className="font-mono font-semibold text-slate-900 mb-1">xl</div>
              <div className="text-slate-600">1280 - 1535px</div>
              <div className="text-xs text-slate-500 mt-1">Desktop Large</div>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <div className="font-mono font-semibold text-slate-900 mb-1">2xl</div>
              <div className="text-slate-600">1536px+</div>
              <div className="text-xs text-slate-500 mt-1">Ultra Wide</div>
            </div>
          </div>
        </div>
      </section>

      {/* Heurísticas de UX */}
      <section className="bg-white rounded-xl p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Eye className="text-emerald-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Heurísticas de UX Relacionadas ao Grid</h2>
        </div>

        <div className="grid gap-4">
          <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2">1. Consistência e Padrões</h3>
            <p className="text-sm text-blue-700">
              Um sistema de grid consistente cria padrões visuais previsíveis. Usuários aprendem 
              rapidamente onde encontrar informações em diferentes páginas quando o grid é mantido.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-emerald-50 to-emerald-50/50 rounded-lg border-l-4 border-emerald-500">
            <h3 className="font-semibold text-emerald-900 mb-2">2. Hierarquia Visual</h3>
            <p className="text-sm text-emerald-700">
              Use o grid para criar hierarquia: elementos mais importantes ocupam mais colunas. 
              Exemplo: conteúdo principal (8 cols) vs sidebar (4 cols) comunica prioridade visualmente.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-purple-50 to-purple-50/50 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold text-purple-900 mb-2">3. Reconhecimento ao invés de Memorização</h3>
            <p className="text-sm text-purple-700">
              Alinhamentos claros do grid ajudam usuários a escanear e reconhecer padrões rapidamente, 
              reduzindo carga cognitiva. Cards alinhados são mais fáceis de processar.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-orange-50 to-orange-50/50 rounded-lg border-l-4 border-orange-500">
            <h3 className="font-semibold text-orange-900 mb-2">4. Estética e Design Minimalista</h3>
            <p className="text-sm text-orange-700">
              Grid bem aplicado cria "espaço negativo" estratégico (white space). Não preencha 
              todas as colunas - respire. Margens e gutters generosos melhoram legibilidade.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-cyan-50 to-cyan-50/50 rounded-lg border-l-4 border-cyan-500">
            <h3 className="font-semibold text-cyan-900 mb-2">5. Flexibilidade e Eficiência de Uso</h3>
            <p className="text-sm text-cyan-700">
              Grid responsivo adapta-se a diferentes dispositivos automaticamente. Usuários 
              experientes e iniciantes conseguem usar a interface com a mesma facilidade.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-pink-50 to-pink-50/50 rounded-lg border-l-4 border-pink-500">
            <h3 className="font-semibold text-pink-900 mb-2">6. Prevenção de Erros</h3>
            <p className="text-sm text-pink-700">
              Grid bem estruturado evita elementos "órfãos" ou mal alinhados que podem ser 
              ignorados. Formulários alinhados reduzem erros de preenchimento.
            </p>
          </div>
        </div>
      </section>

      {/* Dicas Práticas */}
      <section className="bg-white rounded-xl p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Lightbulb className="text-yellow-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Dicas Práticas para Implementação</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">✅ Comece com o Grid de 12 Colunas</h3>
            <p className="text-sm text-slate-600">
              É o mais versátil e amplamente suportado por frameworks (Bootstrap, Tailwind, Material-UI). 
              Só mude se houver necessidade específica.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">✅ Documente Gutters e Margens</h3>
            <p className="text-sm text-slate-600">
              Crie um sistema de spacing consistente (ex: 8px, 16px, 24px, 32px, 48px). 
              Use múltiplos de 8 para facilitar cálculos e implementação.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">✅ Use Max-Width em Desktops</h3>
            <p className="text-sm text-slate-600">
              Em telas muito largas (&gt;1440px), centralize o conteúdo com max-width. 
              Linhas de texto muito longas prejudicam a leitura.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">✅ Pense Mobile-First</h3>
            <p className="text-sm text-slate-600">
              Comece desenhando para mobile (4 colunas ou stack vertical), depois expanda 
              para tablet (8 cols) e desktop (12 cols). É mais fácil adicionar do que remover.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">✅ Teste com Conteúdo Real</h3>
            <p className="text-sm text-slate-600">
              Lorem ipsum esconde problemas. Teste o grid com conteúdo real: nomes longos, 
              imagens de tamanhos variados, dados reais.
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-2">⚠️ Não Seja Escravo do Grid</h3>
            <p className="text-sm text-amber-700">
              O grid é uma ferramenta, não uma regra absoluta. Quebre o grid intencionalmente 
              quando isso melhorar a experiência (ex: imagens full-width, hero sections).
            </p>
          </div>
        </div>
      </section>

      {/* Exportação para Figma */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <Layers className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold">Configurando Grid no Figma</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="font-semibold mb-2">1. Acesse Layout Grid</h3>
            <p className="text-sm text-slate-300">
              Selecione o frame → Painel direito → Layout Grid → Clique no "+"
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="font-semibold mb-2">2. Configure Grid de Colunas</h3>
            <p className="text-sm text-slate-300 mb-2">
              Tipo: Columns | Count: 12 | Gutter: 24px | Margin: 48px
            </p>
            <div className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded font-mono">
              Type: Columns, Count: 12, Width: Auto, Gutter: 24, Margin: 48
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="font-semibold mb-2">3. Salve como Style</h3>
            <p className="text-sm text-slate-300">
              Clique no ícone de 4 pontos → "Save layout grid style" → Nomeie (ex: "Grid 12 cols")
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="font-semibold mb-2">4. Reutilize em Outros Frames</h3>
            <p className="text-sm text-slate-300">
              Selecione frame → Layout Grid → Escolha o style salvo. Mantenha consistência em todo projeto.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist Final */}
      <section className="bg-white rounded-xl p-8 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Checklist de Validação</h2>
        
        <div className="space-y-3">
          {[
            'Grid está configurado para todos os breakpoints (mobile, tablet, desktop)?',
            'Margens e gutters são consistentes em todo o projeto?',
            'Elementos importantes estão alinhados ao grid?',
            'Conteúdo é legível em todos os tamanhos de tela?',
            'Touch targets têm pelo menos 44x44px em mobile?',
            'Linhas de texto têm no máximo 75 caracteres?',
            'Componentes se adaptam gracefully entre breakpoints?',
            'Grid está documentado para desenvolvedores?',
            'Espaçamento vertical segue um sistema consistente?',
            'Hierarchy visual está clara através do uso do grid?',
          ].map((item, i) => (
            <label key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
              <input type="checkbox" className="mt-0.5" />
              <span className="text-sm text-slate-700">{item}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Recursos */}
      <section className="bg-blue-50 rounded-xl p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Recursos e Referências</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-900 mb-3">Frameworks de Grid</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Bootstrap Grid System</li>
              <li>• Tailwind CSS Grid</li>
              <li>• CSS Grid Layout (nativo)</li>
              <li>• Material Design Layout Grid</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-blue-900 mb-3">Ferramentas</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Figma Layout Grids</li>
              <li>• Grid Calculator (gridcalculator.dk)</li>
              <li>• Grid Lover (para tipografia)</li>
              <li>• Modulz Grid Generator</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
