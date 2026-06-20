/**
 * Playground Template — casca reutilizável das páginas de teste de componentes.
 *
 * Uso:
 *   import { PlaygroundLayout, PgSection, PgGrid, PgTile } from './playground'
 *
 *   <PlaygroundLayout title="DssX — Playground" code="base/DssX"
 *                     :sections="SECTIONS" :kpis="KPIS">
 *     <PgSection id="variantes" index="01" title="Variantes" :count="4" desc="...">
 *       <PgGrid>
 *         <PgTile code='variant="outlined"'><DssX variant="outlined" /></PgTile>
 *       </PgGrid>
 *     </PgSection>
 *   </PlaygroundLayout>
 *
 * Classes utilitárias globais disponíveis (playground.scss):
 *   .pg-slot-icon, .pg-brand-block(+__head/__dot/__title/__code),
 *   .pg-matrix-row(+__label/__items), .pg-matrix-field
 */
export { default as PlaygroundLayout } from './PlaygroundLayout.vue'
export { default as PgSection } from './PgSection.vue'
export { default as PgGrid } from './PgGrid.vue'
export { default as PgTile } from './PgTile.vue'
