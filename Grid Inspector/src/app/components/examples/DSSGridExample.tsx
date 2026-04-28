import React from 'react';
import { GridPageWrapper } from '@/app/components/GridPageWrapper';
import { DssButton } from '@/app/components/dss/DssButton/DssButton';
import '@/app/components/dss/tokens/dss-tokens.css';

interface DSSGridExampleProps {
  showGrid: boolean;
  gridColumns: number;
  gridGutter: number;
  gridMargin: number;
  gridPadding: number;
  gridGutterY: number;
  gridMarginY: number;
  gridPaddingY: number;
  componentGutter: number;
  componentMargin: number;
  componentPadding: number;
  componentGutterY: number;
  componentMarginY: number;
  componentPaddingY: number;
  autoColumnWidth: boolean;
}

/**
 * DSSGridExample - Exemplo de Dashboard usando componentes DSS reais
 * 
 * Demonstra:
 * - Integração perfeita DSS + Grid Overlay
 * - Brandabilidade (Hub, Water, Waste)
 * - Alinhamento preciso com sistema de grid
 * - Uso de componentes DSS autênticos
 */
export function DSSGridExample({
  showGrid,
  gridColumns,
  gridGutter,
  gridMargin,
  gridPadding,
  gridGutterY,
  gridMarginY,
  gridPaddingY,
  componentGutter,
  componentMargin,
  componentPadding,
  componentGutterY,
  componentMarginY,
  componentPaddingY,
  autoColumnWidth,
}: DSSGridExampleProps) {
  return (
    <GridPageWrapper
      showGrid={showGrid}
      gridColumns={gridColumns}
      gridGutter={gridGutter}
      gridMargin={gridMargin}
      gridPadding={gridPadding}
      gridGutterY={gridGutterY}
      gridMarginY={gridMarginY}
      gridPaddingY={gridPaddingY}
      componentGutter={componentGutter}
      componentMargin={componentMargin}
      componentPadding={componentPadding}
      componentGutterY={componentGutterY}
      componentMarginY={componentMarginY}
      componentPaddingY={componentPaddingY}
      autoColumnWidth={autoColumnWidth}
    >
      {/* Header com DSS Buttons */}
      <div 
        style={{
          gridColumn: `1 / -1`,
          marginBottom: `${componentGutterY}px`,
          padding: `${componentPadding}px`,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: 'var(--dss-shadow-md)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--dss-gray-700)', marginBottom: '8px' }}>
              Dashboard Sansys
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--dss-gray-600)' }}>
              Gestão corporativa integrada usando DSS
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <DssButton variant="outline" color="dark" icon="refresh">
              Atualizar
            </DssButton>
            <DssButton color="primary" icon="add">
              Novo Item
            </DssButton>
          </div>
        </div>
      </div>

      {/* Cards de Métricas - Hub Brand */}
      <div
        style={{
          gridColumn: autoColumnWidth ? 'span 4' : `span ${Math.floor(gridColumns / 3)}`,
          padding: `${componentPadding}px`,
          backgroundColor: 'var(--dss-hub-50)',
          border: '2px solid var(--dss-hub-200)',
          borderRadius: '12px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--dss-hub-700)', textTransform: 'uppercase' }}>
            🟠 Hub
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--dss-hub-900)', marginTop: '8px' }}>
            1.247
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--dss-hub-600)' }}>
            Processos ativos
          </p>
        </div>
        <DssButton brand="hub" variant="flat" stretch iconRight="arrow_forward">
          Ver detalhes
        </DssButton>
      </div>

      {/* Cards de Métricas - Water Brand */}
      <div
        style={{
          gridColumn: autoColumnWidth ? 'span 4' : `span ${Math.floor(gridColumns / 3)}`,
          padding: `${componentPadding}px`,
          backgroundColor: 'var(--dss-water-50)',
          border: '2px solid var(--dss-water-200)',
          borderRadius: '12px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--dss-water-700)', textTransform: 'uppercase' }}>
            🔵 Water
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--dss-water-900)', marginTop: '8px' }}>
            89%
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--dss-water-600)' }}>
            Cobertura de saneamento
          </p>
        </div>
        <DssButton brand="water" variant="flat" stretch iconRight="arrow_forward">
          Ver detalhes
        </DssButton>
      </div>

      {/* Cards de Métricas - Waste Brand */}
      <div
        style={{
          gridColumn: autoColumnWidth ? 'span 4' : `span ${Math.floor(gridColumns / 3)}`,
          padding: `${componentPadding}px`,
          backgroundColor: 'var(--dss-waste-50)',
          border: '2px solid var(--dss-waste-200)',
          borderRadius: '12px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--dss-waste-700)', textTransform: 'uppercase' }}>
            🟢 Waste
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--dss-waste-900)', marginTop: '8px' }}>
            342t
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--dss-waste-600)' }}>
            Resíduos coletados
          </p>
        </div>
        <DssButton brand="waste" variant="flat" stretch iconRight="arrow_forward">
          Ver detalhes
        </DssButton>
      </div>

      {/* Painel Principal - 8 colunas */}
      <div
        style={{
          gridColumn: autoColumnWidth ? 'span 8' : `span ${Math.floor((gridColumns / 12) * 8)}`,
          padding: `${componentPadding}px`,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: 'var(--dss-shadow-md)',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--dss-gray-700)', marginBottom: '8px' }}>
            Ações Rápidas
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--dss-gray-600)' }}>
            Operações mais utilizadas do sistema
          </p>
        </div>

        {/* Grid de Ações */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '16px', backgroundColor: 'var(--dss-gray-100)', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--dss-gray-700)' }}>
              Novo Processo
            </h4>
            <DssButton brand="hub" size="sm" stretch icon="add">
              Criar
            </DssButton>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--dss-gray-100)', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--dss-gray-700)' }}>
              Registrar Coleta
            </h4>
            <DssButton brand="waste" size="sm" stretch icon="check_circle">
              Registrar
            </DssButton>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--dss-gray-100)', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--dss-gray-700)' }}>
              Análise de Água
            </h4>
            <DssButton brand="water" size="sm" stretch icon="science">
              Iniciar
            </DssButton>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--dss-gray-100)', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--dss-gray-700)' }}>
              Relatório Mensal
            </h4>
            <DssButton color="secondary" size="sm" stretch icon="download">
              Baixar
            </DssButton>
          </div>
        </div>

        {/* Botões de navegação */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <DssButton variant="outline" color="dark">
            Cancelar
          </DssButton>
          <DssButton color="primary" iconRight="save">
            Salvar alterações
          </DssButton>
        </div>
      </div>

      {/* Sidebar - 4 colunas */}
      <div
        style={{
          gridColumn: autoColumnWidth ? 'span 4' : `span ${Math.floor((gridColumns / 12) * 4)}`,
          padding: `${componentPadding}px`,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: 'var(--dss-shadow-md)',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--dss-gray-700)', marginBottom: '16px' }}>
          Notificações
        </h3>

        {/* Lista de notificações */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {[
            { brand: 'hub', text: 'Novo processo aprovado', icon: 'check_circle' },
            { brand: 'water', text: 'Análise de água concluída', icon: 'science' },
            { brand: 'waste', text: 'Coleta programada para amanhã', icon: 'event' },
          ].map((notif, index) => (
            <div
              key={index}
              style={{
                padding: '12px',
                backgroundColor: `var(--dss-${notif.brand}-50)`,
                border: `1px solid var(--dss-${notif.brand}-200)`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span className="material-symbols-outlined" style={{ color: `var(--dss-${notif.brand}-700)` }}>
                {notif.icon}
              </span>
              <span style={{ fontSize: '14px', color: `var(--dss-${notif.brand}-800)`, flex: 1 }}>
                {notif.text}
              </span>
            </div>
          ))}
        </div>

        <DssButton stretch variant="outline" color="dark" icon="visibility">
          Ver todas
        </DssButton>
      </div>

      {/* Footer - Full Width */}
      <div
        style={{
          gridColumn: `1 / -1`,
          padding: `${componentPadding}px`,
          backgroundColor: 'var(--dss-gray-100)',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '14px', color: 'var(--dss-gray-600)', marginBottom: '16px' }}>
          Este exemplo usa componentes <strong>DSS reais</strong> integrados ao sistema de grid
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <DssButton brand="hub" size="sm" variant="outline">
            🟠 Hub
          </DssButton>
          <DssButton brand="water" size="sm" variant="outline">
            🔵 Water
          </DssButton>
          <DssButton brand="waste" size="sm" variant="outline">
            🟢 Waste
          </DssButton>
        </div>
      </div>
    </GridPageWrapper>
  );
}