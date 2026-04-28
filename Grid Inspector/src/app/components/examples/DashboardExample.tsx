import { useState } from 'react';
import { GridPageWrapper } from '../GridPageWrapper';
import { GridSection } from '../GridSection';
import { DssButton } from '@/app/components/dss/DssButton/DssButton';
import { DssCard, DssCardSection, DssCardActions } from '@/app/components/dss/DssCard/DssCard';
import { DssBadge } from '@/app/components/dss/DssBadge/DssBadge';
import { DssAvatar } from '@/app/components/dss/DssAvatar/DssAvatar';
import { DssInput } from '@/app/components/dss/DssInput/DssInput';
import { DssCheckbox } from '@/app/components/dss/DssCheckbox/DssCheckbox';
import { DssRadio } from '@/app/components/dss/DssRadio/DssRadio';
import { DssToggle } from '@/app/components/dss/DssToggle/DssToggle';
import { DssChip } from '@/app/components/dss/DssChip/DssChip';
import { DssTooltip } from '@/app/components/dss/DssTooltip/DssTooltip';
import '@/app/components/dss/tokens/dss-tokens.css';
import { useGridSystem, useAdvancedGridSettings } from '@/hooks';

/**
 * DashboardExample - Dashboard 100% DSS COMPLETO
 * 
 * ✅ TODOS OS 10 COMPONENTES BASE DSS:
 * 1. DssButton
 * 2. DssCard (com DssCardSection e DssCardActions)
 * 3. DssBadge
 * 4. DssAvatar
 * 5. DssInput
 * 6. DssCheckbox
 * 7. DssRadio
 * 8. DssToggle
 * 9. DssChip
 * 10. DssTooltip
 */
export function DashboardExample() {
  const {
    overlay,
    component,
    showGrid,
    showRows
  } = useGridSystem();

  // 🆕 LER CONFIGURAÇÕES AVANÇADAS (Container Type, Auto Column Width)
  const { getGridTemplateColumns } = useAdvancedGridSettings();

  // Estados para demonstrar interatividade
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reportType, setReportType] = useState('monthly');
  const [selectedFilters, setSelectedFilters] = useState({
    hub: true,
    water: false,
    waste: true
  });

  const getColSpan = (ratio: number) => {
    return Math.round(overlay.columns * ratio);
  };

  // 🎨 COMPONENTE DE METRIC CARD - 100% DSS
  const MetricCard = ({ 
    brand, 
    brandColor, 
    icon, 
    label, 
    value, 
    change, 
    colSpan 
  }: {
    brand: string;
    brandColor: 'hub' | 'water' | 'waste';
    icon: string;
    label: string;
    value: string;
    change: string;
    colSpan: number;
  }) => (
    <div style={{ gridColumn: `span ${colSpan}` }}>
      <DssCard variant="elevated" brand={brandColor}>
        <DssCardSection 
          style={{
            paddingLeft: `${component.padding.x}px`,
            paddingRight: `${component.padding.x}px`,
            paddingTop: `${component.padding.y}px`,
            paddingBottom: `${component.padding.y}px`,
            gap: `${component.gutter.y}px`,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header com avatar e badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <DssAvatar 
              icon={icon} 
              size="md" 
              brand={brandColor}
            />
            <DssBadge 
              label={brand}
              variant="filled"
              brand={brandColor}
              size="sm"
            />
          </div>

          {/* Conteúdo */}
          <div style={{ flex: 1 }}>
            <p style={{ 
              fontSize: '12px', 
              fontWeight: 600,
              color: `var(--dss-${brandColor}-700)`,
              marginBottom: 'var(--dss-spacing-xs)',
              textTransform: 'uppercase',
              lineHeight: 1.2
            }}>
              {label}
            </p>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 700, 
              color: `var(--dss-${brandColor}-900)`,
              lineHeight: 1,
              marginBottom: 'var(--dss-spacing-xs)'
            }}>
              {value}
            </h2>
            <p style={{ 
              fontSize: '13px', 
              fontWeight: 600, 
              color: 'var(--dss-positive)',
              lineHeight: 1.2
            }}>
              {change}
            </p>
          </div>

          {/* Ação com Tooltip */}
          <DssTooltip content="Ver relatório detalhado" position="top" brand={brandColor}>
            <div>
              <DssButton brand={brandColor} variant="flat" stretch size="sm" iconRight="arrow_forward">
                Ver detalhes
              </DssButton>
            </div>
          </DssTooltip>
        </DssCardSection>
      </DssCard>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--dss-gray-100)' }}>
      <GridPageWrapper
        showGrid={showGrid}
        gridColumns={overlay.columns}
        gridGutter={overlay.gutter.x}
        gridMargin={overlay.margin.x}
        gridPadding={overlay.padding.x}
        gridGutterY={overlay.gutter.y}
        gridMarginY={overlay.margin.y}
        gridPaddingY={overlay.padding.y}
        layoutGutterY={component.gutter.y}
        layoutMarginY={component.margin.y}
        showRows={showRows}
      >
        <div 
          style={{ 
            paddingLeft: `${component.margin.x}px`,
            paddingRight: `${component.margin.x}px`,
            paddingTop: `${component.margin.y}px`,
            paddingBottom: `${component.margin.y}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: `${component.gutter.y}px`
          }}
        >
          {/* ========================================
              ROW 1: HEADER COM FILTROS E CHIPS
              ======================================== */}
          <GridSection showSpacing={showGrid} paddingY={overlay.padding.y} gutterY={overlay.gutter.y} isFirst={true}>
            <DssCard variant="elevated">
              <DssCardSection
                style={{
                  paddingLeft: `${component.padding.x}px`,
                  paddingRight: `${component.padding.x}px`,
                  paddingTop: `${component.padding.y}px`,
                  paddingBottom: `${component.padding.y}px`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--dss-spacing-md)'
                }}
              >
                {/* Título e ações */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h1 style={{ 
                      fontSize: '24px', 
                      fontWeight: 700, 
                      color: 'var(--dss-gray-700)',
                      marginBottom: 'var(--dss-spacing-xs)',
                      lineHeight: 1.3
                    }}>
                      Dashboard Corporativo Sansys
                    </h1>
                    <p style={{ 
                      fontSize: '14px', 
                      color: 'var(--dss-gray-600)',
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      Sistema de Gestão de Saneamento - Fevereiro 2026
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: `${component.gutter.x}px` }}>
                    <DssTooltip content="Atualizar dados" position="bottom">
                      <div>
                        <DssButton variant="outline" color="secondary" icon="refresh" size="sm">
                          Atualizar
                        </DssButton>
                      </div>
                    </DssTooltip>
                    <DssButton color="primary" icon="add" size="sm">
                      Novo
                    </DssButton>
                  </div>
                </div>

                {/* Filtros com Chips deletáveis */}
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: 'var(--dss-spacing-sm)',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dss-gray-700)' }}>
                    Filtros ativos:
                  </span>
                  <DssChip 
                    label="Hub" 
                    icon="dashboard"
                    brand="hub" 
                    variant="filled"
                    onDelete={() => console.log('Removed Hub')}
                  />
                  <DssChip 
                    label="Waste" 
                    icon="recycling"
                    brand="waste" 
                    variant="filled"
                    onDelete={() => console.log('Removed Waste')}
                  />
                  <DssChip 
                    label="Último mês" 
                    icon="calendar_month"
                    color="info" 
                    variant="outlined"
                    onDelete={() => console.log('Removed date filter')}
                  />
                </div>
              </DssCardSection>
            </DssCard>
          </GridSection>

          {/* ========================================
              ROW 2: METRIC CARDS (3 colunas - 33/33/33)
              ======================================== */}
          <GridSection showSpacing={showGrid} paddingY={overlay.padding.y} gutterY={overlay.gutter.y}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: getGridTemplateColumns(overlay.columns, 100),
              gap: `${component.gutter.x}px`,
            }}>
              <MetricCard 
                brand="🟠 Hub"
                brandColor="hub"
                icon="📊"
                label="Processos Ativos"
                value="1.247"
                change="↑ +12.5% vs mês anterior"
                colSpan={getColSpan(0.333)}
              />
              <MetricCard 
                brand="🔵 Water"
                brandColor="water"
                icon="💧"
                label="Volume Distribuído"
                value="847.2k m³"
                change="↑ +8.3% vs mês anterior"
                colSpan={getColSpan(0.333)}
              />
              <MetricCard 
                brand="🟢 Waste"
                brandColor="waste"
                icon="♻️"
                label="Resíduos Coletados"
                value="342 ton"
                change="↑ +15.7% vs mês anterior"
                colSpan={getColSpan(0.333)}
              />
            </div>
          </GridSection>

          {/* ========================================
              ROW 3: FORMULÁRIO COM INPUT E CHECKBOXES (50% + 50%)
              ======================================== */}
          <GridSection showSpacing={showGrid} paddingY={overlay.padding.y} gutterY={overlay.gutter.y}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: getGridTemplateColumns(overlay.columns, 100),
              gap: `${component.gutter.x}px`,
            }}>
              {/* Card 1: Busca e filtros */}
              <div style={{ gridColumn: `span ${getColSpan(0.5)}` }}>
                <DssCard variant="elevated">
                  <DssCardSection
                    title="Buscar Processos"
                    style={{
                      paddingLeft: `${component.padding.x}px`,
                      paddingRight: `${component.padding.x}px`,
                      paddingTop: `${component.padding.y}px`,
                      paddingBottom: `${component.padding.y}px`,
                      gap: 'var(--dss-spacing-md)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <DssInput 
                      variant="outlined"
                      placeholder="Digite o ID ou nome do processo"
                      iconPrefix="search"
                      label="Buscar"
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dss-spacing-xs)' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dss-gray-700)', marginBottom: 'var(--dss-spacing-xs)' }}>
                        Filtrar por sistema:
                      </p>
                      <DssCheckbox 
                        label="Hub (Gestão Geral)"
                        brand="hub"
                        checked={selectedFilters.hub}
                        onChange={(e) => setSelectedFilters({...selectedFilters, hub: e.target.checked})}
                      />
                      <DssCheckbox 
                        label="Water (Saneamento)"
                        brand="water"
                        checked={selectedFilters.water}
                        onChange={(e) => setSelectedFilters({...selectedFilters, water: e.target.checked})}
                      />
                      <DssCheckbox 
                        label="Waste (Resíduos)"
                        brand="waste"
                        checked={selectedFilters.waste}
                        onChange={(e) => setSelectedFilters({...selectedFilters, waste: e.target.checked})}
                      />
                    </div>
                  </DssCardSection>
                  <DssCardActions align="right" style={{
                    paddingLeft: `${component.padding.x}px`,
                    paddingRight: `${component.padding.x}px`,
                    paddingTop: `${component.padding.y}px`,
                    paddingBottom: `${component.padding.y}px`,
                  }}>
                    <DssButton variant="text" color="dark">Limpar</DssButton>
                    <DssButton color="primary">Aplicar Filtros</DssButton>
                  </DssCardActions>
                </DssCard>
              </div>

              {/* Card 2: Configurações com Radio e Toggle */}
              <div style={{ gridColumn: `span ${getColSpan(0.5)}` }}>
                <DssCard variant="elevated">
                  <DssCardSection
                    title="Preferências de Relatório"
                    style={{
                      paddingLeft: `${component.padding.x}px`,
                      paddingRight: `${component.padding.x}px`,
                      paddingTop: `${component.padding.y}px`,
                      paddingBottom: `${component.padding.y}px`,
                      gap: 'var(--dss-spacing-md)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dss-spacing-xs)' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dss-gray-700)', marginBottom: 'var(--dss-spacing-xs)' }}>
                        Tipo de relatório:
                      </p>
                      <DssRadio 
                        name="reportType"
                        label="Mensal"
                        value="monthly"
                        color="primary"
                        checked={reportType === 'monthly'}
                        onChange={(e) => setReportType(e.target.value)}
                      />
                      <DssRadio 
                        name="reportType"
                        label="Trimestral"
                        value="quarterly"
                        color="primary"
                        checked={reportType === 'quarterly'}
                        onChange={(e) => setReportType(e.target.value)}
                      />
                      <DssRadio 
                        name="reportType"
                        label="Anual"
                        value="yearly"
                        color="primary"
                        checked={reportType === 'yearly'}
                        onChange={(e) => setReportType(e.target.value)}
                      />
                    </div>

                    <div style={{ 
                      borderTop: '1px solid var(--dss-gray-200)',
                      paddingTop: 'var(--dss-spacing-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--dss-spacing-sm)'
                    }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dss-gray-700)' }}>
                        Notificações:
                      </p>
                      <DssToggle 
                        label="Ativar alertas em tempo real"
                        color="positive"
                        checked={notificationsEnabled}
                        onChange={(e) => setNotificationsEnabled(e.target.checked)}
                      />
                      <DssToggle 
                        label="Relatórios automáticos por email"
                        color="info"
                      />
                    </div>
                  </DssCardSection>
                </DssCard>
              </div>
            </div>
          </GridSection>

          {/* ========================================
              ROW 4: TABELA COM STATUS BADGES
              ======================================== */}
          <GridSection showSpacing={showGrid} paddingY={overlay.padding.y} gutterY={overlay.gutter.y}>
            <DssCard variant="elevated">
              <div style={{
                paddingLeft: `${component.padding.x}px`,
                paddingRight: `${component.padding.x}px`,
                paddingTop: `${component.padding.y}px`,
                paddingBottom: `${component.padding.y}px`,
                borderBottom: '1px solid var(--dss-gray-300)',
                backgroundColor: 'var(--dss-gray-100)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: 700, 
                  color: 'var(--dss-gray-700)',
                  lineHeight: 1.3,
                  margin: 0
                }}>
                  Operações Recentes
                </h3>
                <div style={{ display: 'flex', gap: 'var(--dss-spacing-xs)' }}>
                  <DssBadge label="24 Ativas" color="positive" variant="filled" size="sm" />
                  <DssBadge label="8 Pendentes" color="warning" variant="filled" size="sm" />
                </div>
              </div>

              {/* Cabeçalhos */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr 150px 150px 120px',
                paddingLeft: `${component.padding.x}px`,
                paddingRight: `${component.padding.x}px`,
                paddingTop: 'var(--dss-spacing-sm)',
                paddingBottom: 'var(--dss-spacing-sm)',
                backgroundColor: 'var(--dss-gray-100)',
                borderBottom: '2px solid var(--dss-gray-300)',
                gap: 'var(--dss-spacing-sm)'
              }}>
                {['ID', 'Descrição', 'Sistema', 'Status', 'Ações'].map((header) => (
                  <span key={header} style={{ 
                    fontSize: '12px', 
                    fontWeight: 700, 
                    color: 'var(--dss-gray-700)',
                    textTransform: 'uppercase'
                  }}>
                    {header}
                  </span>
                ))}
              </div>

              {/* Linhas com Chips e Badges */}
              {[
                { id: '#1234', desc: 'Manutenção preventiva', system: 'hub', status: 'Concluído', statusColor: 'positive' as const },
                { id: '#1235', desc: 'Análise de qualidade da água', system: 'water', status: 'Em andamento', statusColor: 'info' as const },
                { id: '#1236', desc: 'Coleta de resíduos zona norte', system: 'waste', status: 'Pendente', statusColor: 'warning' as const },
                { id: '#1237', desc: 'Inspeção de rede', system: 'water', status: 'Concluído', statusColor: 'positive' as const },
              ].map((row, idx) => (
                <div key={idx} style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr 150px 150px 120px',
                  paddingLeft: `${component.padding.x}px`,
                  paddingRight: `${component.padding.x}px`,
                  paddingTop: 'var(--dss-spacing-sm)',
                  paddingBottom: 'var(--dss-spacing-sm)',
                  borderBottom: idx < 3 ? '1px solid var(--dss-gray-200)' : 'none',
                  backgroundColor: idx % 2 === 0 ? 'var(--dss-gray-50)' : 'white',
                  gap: 'var(--dss-spacing-sm)',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dss-gray-700)' }}>
                    {row.id}
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--dss-gray-700)' }}>
                    {row.desc}
                  </span>
                  <div>
                    <DssChip 
                      label={row.system === 'hub' ? 'Hub' : row.system === 'water' ? 'Water' : 'Waste'}
                      brand={row.system as 'hub' | 'water' | 'waste'}
                      variant="filled"
                    />
                  </div>
                  <div>
                    <DssBadge 
                      label={row.status}
                      color={row.statusColor}
                      variant="outlined"
                      size="sm"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--dss-spacing-xs)' }}>
                    <DssTooltip content="Ver detalhes" position="top">
                      <div>
                        <DssButton variant="text" size="sm" icon="visibility" color="dark" />
                      </div>
                    </DssTooltip>
                    <DssTooltip content="Editar" position="top">
                      <div>
                        <DssButton variant="text" size="sm" icon="edit" color="primary" />
                      </div>
                    </DssTooltip>
                  </div>
                </div>
              ))}
            </DssCard>
          </GridSection>

          {/* ========================================
              ROW 5: FORMULÁRIO DE CADASTRO COMPLETO
              ======================================== */}
          <GridSection showSpacing={showGrid} paddingY={overlay.padding.y} gutterY={overlay.gutter.y}>
            <DssCard variant="elevated">
              <DssCardSection
                title="Cadastrar Nova Operação"
                subtitle="Preencha os campos abaixo para registrar uma nova operação no sistema"
                style={{
                  paddingLeft: `${component.padding.x}px`,
                  paddingRight: `${component.padding.x}px`,
                  paddingTop: `${component.padding.y}px`,
                  paddingBottom: `${component.padding.y}px`,
                  gap: 'var(--dss-spacing-md)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--dss-spacing-md)' }}>
                  <DssInput 
                    label="Título da operação"
                    placeholder="Ex: Manutenção preventiva"
                    variant="outlined"
                    required
                  />
                  <DssInput 
                    label="Responsável"
                    placeholder="Nome do responsável"
                    variant="outlined"
                    iconPrefix="person"
                    required
                  />
                </div>

                <DssInput 
                  label="Descrição"
                  placeholder="Descreva os detalhes da operação"
                  variant="outlined"
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--dss-spacing-md)' }}>
                  <DssInput 
                    label="Data de início"
                    type="date"
                    variant="outlined"
                    iconPrefix="calendar_today"
                  />
                  <DssInput 
                    label="Prioridade"
                    placeholder="Ex: Alta, Média, Baixa"
                    variant="outlined"
                    iconPrefix="flag"
                  />
                </div>

                <div style={{ 
                  backgroundColor: 'var(--dss-gray-100)', 
                  padding: 'var(--dss-spacing-md)',
                  borderRadius: 'var(--dss-radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--dss-spacing-sm)'
                }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--dss-gray-700)' }}>
                    Selecione o sistema:
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--dss-spacing-md)' }}>
                    <DssRadio name="system" label="🟠 Hub" value="hub" brand="hub" />
                    <DssRadio name="system" label="🔵 Water" value="water" brand="water" />
                    <DssRadio name="system" label="🟢 Waste" value="waste" brand="waste" />
                  </div>
                </div>
              </DssCardSection>

              <DssCardActions align="right" style={{
                paddingLeft: `${component.padding.x}px`,
                paddingRight: `${component.padding.x}px`,
                paddingTop: `${component.padding.y}px`,
                paddingBottom: `${component.padding.y}px`,
              }}>
                <DssButton variant="outline" color="dark">Cancelar</DssButton>
                <DssButton color="positive" icon="check">Cadastrar</DssButton>
              </DssCardActions>
            </DssCard>
          </GridSection>

          {/* ========================================
              ROW 6: FOOTER COM TODOS OS COMPONENTES
              ======================================== */}
          <GridSection showSpacing={showGrid} paddingY={overlay.padding.y} gutterY={overlay.gutter.y}>
            <DssCard variant="filled">
              <DssCardSection
                style={{
                  paddingLeft: `${component.padding.x}px`,
                  paddingRight: `${component.padding.x}px`,
                  paddingTop: `${component.padding.y}px`,
                  paddingBottom: `${component.padding.y}px`,
                  textAlign: 'center',
                  gap: 'var(--dss-spacing-md)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <p style={{ fontSize: '14px', color: 'var(--dss-gray-700)', marginBottom: 'var(--dss-spacing-xs)' }}>
                  Dashboard construído 100% com <strong>Design System Sansys (DSS)</strong>
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dss-spacing-xs)', justifyContent: 'center' }}>
                  <DssBadge label="DssButton" color="primary" variant="outlined" size="sm" />
                  <DssBadge label="DssCard" color="secondary" variant="outlined" size="sm" />
                  <DssBadge label="DssBadge" color="tertiary" variant="outlined" size="sm" />
                  <DssBadge label="DssAvatar" color="accent" variant="outlined" size="sm" />
                  <DssBadge label="DssInput" color="positive" variant="outlined" size="sm" />
                  <DssBadge label="DssCheckbox" color="info" variant="outlined" size="sm" />
                  <DssBadge label="DssRadio" color="primary" variant="outlined" size="sm" />
                  <DssBadge label="DssToggle" color="secondary" variant="outlined" size="sm" />
                  <DssBadge label="DssChip" color="warning" variant="outlined" size="sm" />
                  <DssBadge label="DssTooltip" color="dark" variant="outlined" size="sm" />
                </div>

                <p style={{ fontSize: '12px', color: 'var(--dss-gray-600)', margin: 0 }}>
                  ✅ 10/10 Componentes Base • 100% Brandabilidade • Zero Props Customizadas
                </p>
              </DssCardSection>
            </DssCard>
          </GridSection>
        </div>
      </GridPageWrapper>
    </div>
  );
}