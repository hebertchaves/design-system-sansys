import { GridOverlay } from './GridOverlay';

export function GridVariations() {
  return (
    <div className="p-6 space-y-12 max-w-7xl mx-auto">
      {/* Introdução */}
      <section className="bg-white rounded-xl p-8 border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Variações de Grid</h2>
        <p className="text-slate-600 mb-6">
          Um sistema de grid bem estruturado é a base para criar layouts consistentes e escaláveis.
          Explore as diferentes variações de grid e entenda quando aplicar cada tipo.
        </p>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-900 mb-2">Grid Colunar</div>
            <p className="text-sm text-blue-700">
              Sistema baseado em colunas verticais. Ideal para layouts responsivos e conteúdo fluido.
            </p>
          </div>
          
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-900 mb-2">Grid Modular</div>
            <p className="text-sm text-emerald-700">
              Sistema bidimensional com módulos. Perfeito para dashboards e interfaces complexas.
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-900 mb-2">Grid Assimétrico</div>
            <p className="text-sm text-orange-700">
              Colunas com larguras variadas. Usado para criar hierarquia visual e layouts únicos.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de 8 Colunas */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Grid Colunar: 8 Colunas</h3>
          <p className="text-sm text-slate-600">
            <span className="font-semibold">Quando usar:</span> Tablets e telas médias (768px - 1024px). 
            Oferece flexibilidade para layouts mais simples.
          </p>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-slate-600"><strong>Gutter:</strong> 24px</span>
            <span className="text-slate-600"><strong>Margem:</strong> 48px</span>
            <span className="text-slate-600"><strong>Max Width:</strong> 1440px</span>
          </div>
        </div>
        <div className="relative h-80 bg-slate-50">
          <GridOverlay columns={8} showAnnotations={true} gutter={24} margin={48} rows={8} />
        </div>
      </section>

      {/* Grid de 12 Colunas */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Grid Colunar: 12 Colunas</h3>
          <p className="text-sm text-slate-600">
            <span className="font-semibold">Quando usar:</span> Desktop (1024px+). 
            O padrão mais versátil, permite divisões em 2, 3, 4 e 6 colunas.
          </p>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-slate-600"><strong>Gutter:</strong> 24px</span>
            <span className="text-slate-600"><strong>Margem:</strong> 48px</span>
            <span className="text-slate-600"><strong>Flexibilidade:</strong> ★★★★★</span>
          </div>
        </div>
        <div className="relative h-80 bg-slate-50">
          <GridOverlay columns={12} showAnnotations={true} gutter={24} margin={48} />
          
          {/* Exemplos de divisões */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-slate-200">
            <div className="text-xs text-slate-600">
              <strong>Divisões possíveis:</strong> 
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded">12/12</span>
              <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-700 rounded">6/6</span>
              <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-700 rounded">4/4/4</span>
              <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-700 rounded">3/3/3/3</span>
              <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-700 rounded">8/4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de 16 Colunas */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Grid Colunar: 16 Colunas</h3>
          <p className="text-sm text-slate-600">
            <span className="font-semibold">Quando usar:</span> Telas grandes e ultra-wide (1440px+). 
            Máxima granularidade para layouts complexos.
          </p>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-slate-600"><strong>Gutter:</strong> 24px</span>
            <span className="text-slate-600"><strong>Margem:</strong> 48px</span>
            <span className="text-slate-600"><strong>Precisão:</strong> Alta</span>
          </div>
        </div>
        <div className="relative h-80 bg-slate-50">
          <GridOverlay columns={16} showAnnotations={true} gutter={24} margin={48} />
        </div>
      </section>

      {/* Grid Modular */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Grid Modular (12 x 12)</h3>
          <p className="text-sm text-slate-600">
            <span className="font-semibold">Quando usar:</span> Dashboards, painéis de controle e interfaces com componentes de tamanhos variados. 
            Permite posicionamento preciso em X e Y.
          </p>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-slate-600"><strong>Módulo:</strong> 64x64px</span>
            <span className="text-slate-600"><strong>Gutter:</strong> 24px</span>
            <span className="text-slate-600"><strong>Uso:</strong> Dashboards complexos</span>
          </div>
        </div>
        <div className="relative h-96 bg-slate-50">
          <GridOverlay columns={12} showAnnotations={false} gutter={24} margin={48} type="modular" />
        </div>
      </section>

      {/* Grid Assimétrico */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Grid Assimétrico (2fr / 3fr / 2fr / 5fr)</h3>
          <p className="text-sm text-slate-600">
            <span className="font-semibold">Quando usar:</span> Criar hierarquia visual clara, destacar áreas importantes ou layouts editoriais. 
            Quebra a monotonia do grid uniforme.
          </p>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-slate-600"><strong>Proporções:</strong> Variáveis (fr units)</span>
            <span className="text-slate-600"><strong>Gutter:</strong> 24px</span>
            <span className="text-slate-600"><strong>Uso:</strong> Layouts únicos</span>
          </div>
        </div>
        <div className="relative h-80 bg-slate-50">
          <GridOverlay columns={4} showAnnotations={true} gutter={24} margin={48} type="asymmetric" />
        </div>
      </section>

      {/* Comparativo de Gutters e Margens */}
      <section className="bg-white rounded-xl p-8 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Anatomia do Grid: Gutters e Margens</h3>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Gutters (Espaçamento entre colunas)</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-16 text-sm font-mono text-slate-600">16px</div>
                <div className="flex-1 text-sm text-slate-600">Compacto - Mobile e tablets</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-sm font-mono text-slate-600">24px</div>
                <div className="flex-1 text-sm text-slate-600">Padrão - Desktop e aplicações web</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-sm font-mono text-slate-600">32px</div>
                <div className="flex-1 text-sm text-slate-600">Espaçoso - Telas grandes e conteúdo editorial</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Margens (Espaçamento lateral)</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-16 text-sm font-mono text-slate-600">16px</div>
                <div className="flex-1 text-sm text-slate-600">Mobile (320px - 767px)</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-sm font-mono text-slate-600">32px</div>
                <div className="flex-1 text-sm text-slate-600">Tablet (768px - 1023px)</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-sm font-mono text-slate-600">48px</div>
                <div className="flex-1 text-sm text-slate-600">Desktop (1024px+)</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-sm font-mono text-slate-600">Auto</div>
                <div className="flex-1 text-sm text-slate-600">Centralizado com max-width (1440px)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hierarquia Visual */}
      <section className="bg-white rounded-xl p-8 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Hierarquia Visual com Grid</h3>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="h-4 bg-slate-900 rounded" style={{ width: '100%' }}></div>
            <div className="text-xs text-slate-600 text-center">12 colunas = Conteúdo principal</div>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 h-4 bg-slate-700 rounded"></div>
              <div className="flex-1 h-4 bg-slate-400 rounded"></div>
            </div>
            <div className="text-xs text-slate-600 text-center">8 + 4 colunas = Conteúdo + Sidebar</div>
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 h-4 bg-slate-600 rounded"></div>
              <div className="flex-1 h-4 bg-slate-600 rounded"></div>
              <div className="flex-1 h-4 bg-slate-600 rounded"></div>
            </div>
            <div className="text-xs text-slate-600 text-center">4 + 4 + 4 colunas = Cards/Grid</div>
          </div>
        </div>
      </section>
    </div>
  );
}