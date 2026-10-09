<template>
<DssLayout v-bind="$attrs" view="hHh lpR fFf" container class="nf-layout" data-brand="water" data-theme="light">
<DssAppBar brand="water" title="Faturamento · NFAg" menu-aria-label="Abrir menu principal" />
<DssPageContainer><DssPage><DssPageShell rail-aria-label="Módulos do sistema">
<template #rail><DssPageShellRailItem v-for="m in modules" :key="m.label" :icon="m.icon" :label="m.label" :active="m.label==='Financeiro'" /></template>
<template #breadcrumb><DssBreadcrumbs separator="›" gutter="sm"><DssBreadcrumbsEl label="Faturamento"/><DssBreadcrumbsEl label="NFAg"/><DssBreadcrumbsEl label="Check-in de Configuração"/></DssBreadcrumbs></template>
<header class="nf-between"><div><DssSectionTitle :level="1" size="lg" label="Check-in de configuração NFAg"/><p class="text-secondary">Prontidão cadastral e tributária para a emissão.</p></div><div class="nf-actions"><DssButton label="Relatório PDF" icon="description" variant="outline" :disabled="running || !hasResult" @click="reportOpen=true"/><DssButton label="Executar verificação" icon="play_arrow" color="primary" :loading="running" :disabled="running" @click="execute"/></div></header>
<div class="nf-band"><DssCard variant="outlined" class="nf-panel"><DssSectionTitle :level="2" label="Empresa emitente"/><div class="nf-company"><DssSelect v-model="companyId" :options="COMPANIES" emit-value map-options label="Empresa emitente" variant="outlined" dense :disabled="running"/></div><div class="nf-actions"><span>CNPJ {{ company.cnpj }}</span><span>{{ company.city }}</span><span>IBGE {{ company.ibge }}</span></div></DssCard>
<DssCard variant="outlined" class="nf-panel nf-summary" aria-live="polite" :aria-busy="running"><DssSectionTitle :level="2" label="Resultado da verificação"/><strong>{{ running?'Verificação em andamento':scenario==='loading'&&!history.length?'Carregando última execução':scenario==='stale'&&!history.length?'Resultado desatualizado':hasResult?verdict(rows):'Aguardando primeira verificação' }}</strong><p>{{ running?`${completed} de 11 verificações concluídas`:hasResult?'Última execução demonstrativa · agora':'Selecione a empresa e inicie o check-in.' }}</p><DssLinearProgress v-if="running || (scenario==='loading' && !history.length)" :value="completed/11" :indeterminate="scenario==='loading' && !running && !history.length" color="primary"/></DssCard>
<DssCard variant="outlined" class="nf-panel"><DssSectionTitle :level="2" label="Situação das verificações"/><DssChip :label="`${totals.ok} aprovadas`" color="positive"/><DssChip :label="`${totals.warning} alertas`" color="warning"/><DssChip :label="`${totals.failure} falhas`" color="negative"/></DssCard></div>
<DssBanner v-if="scenario==='error' && !running && !history.length" variant="error">Não foi possível recuperar a última execução. Execute novamente em alguns minutos.</DssBanner>
<DssBanner v-if="scenario==='stale' && !history.length" variant="warning">Resultado desatualizado. Execute novamente antes de emitir.</DssBanner>
<DssCard variant="outlined" class="nf-panel"><div class="nf-between"><DssSectionTitle :level="2" label="Verificações de configuração"/><div class="nf-actions"><DssButton v-for="f in filters" :key="f.id" :label="f.label" :variant="filter===f.id?'unelevated':'flat'" color="primary" @click="filter=f.id"/></div></div>
<DssExpansionItem v-for="row in filtered" :key="row.id" :label="`${String(row.id).padStart(2,'0')} · ${row.title} — ${labels[row.status]}`" :caption="row.summary" :icon="icons[row.status]" class="nf-check">
<div class="nf-detail"><DssChip :label="row.blocking?'Falha bloqueante':labels[row.status]" :color="colors[row.status]"/><p>{{ row.rule }}</p><p>{{ row.impact }}</p><p class="text-secondary">Funcionalidade para correção: {{ row.destination }}</p>
<DssMarkupTable v-if="row.findings.length" density="compact" flat><thead><tr><th scope="col">Cadastro</th><th scope="col">Inconsistência</th></tr></thead><tbody><tr v-for="finding in row.findings" :key="finding.item"><td>{{ finding.item }}</td><td>{{ finding.result }}</td></tr></tbody></DssMarkupTable>
<DssButton v-if="row.findings.length" :label="row.destination" icon="open_in_new" variant="outline" @click="correction=row"/>
</div></DssExpansionItem>
<DssEmptyState v-if="!filtered.length" title="Nenhuma verificação neste filtro" description="As demais verificações estão disponíveis em Todas."/>
</DssCard>
<DssCard variant="outlined" class="nf-panel"><DssSectionTitle :level="2" label="Histórico de execuções"/><DssEmptyState v-if="!history.length" title="Nenhuma execução nesta sessão" description="Execute o check-in para consultar o resultado demonstrativo."/><DssMarkupTable v-else density="compact" flat><thead><tr><th scope="col">Empresa</th><th scope="col">Situação</th><th scope="col">Conclusão</th><th scope="col">Detalhes</th></tr></thead><tbody><tr v-for="h in history" :key="h.id"><td>{{ h.company }}</td><td>{{ h.result }}</td><td>{{ h.time }}</td><td><DssButton label="Consultar" variant="flat" icon="visibility" @click="selectedHistory=h"/></td></tr></tbody></DssMarkupTable></DssCard>
</DssPageShell></DssPage></DssPageContainer>
<DssDialog v-model:open="reportOpen" aria-label="Relatório demonstrativo" data-brand="water" data-theme="light"><template #header>Relatório de verificação</template><p>Prévia demonstrativa: {{ company.label }}.</p><p>{{ verdict(rows) }} · {{ totals.all }} verificações.</p><p>A geração de PDF/A depende da integração com o Sansys Water e não está disponível neste teste.</p><template #footer><DssButton label="Fechar" @click="reportOpen=false"/></template></DssDialog>
<DssDialog :open="Boolean(correction)" @update:open="v=>{if(!v) correction=null}" aria-label="Destino da correção" data-brand="water" data-theme="light"><template #header>{{ correction?.title }}</template><p>{{ correction?.destination }}</p><p>O atalho será conectado à funcionalidade do Sansys Water. Nenhuma navegação de produção é executada neste teste.</p><template #footer><DssButton label="Fechar" @click="correction=null"/></template></DssDialog>
<DssDialog :open="Boolean(selectedHistory)" @update:open="v=>{if(!v) selectedHistory=null}" aria-label="Detalhes da execução" data-brand="water" data-theme="light"><template #header>Execução demonstrativa</template><p>{{ selectedHistory?.company }}</p><p>{{ selectedHistory?.result }}</p><p>{{ selectedHistory?.time }}</p><template #footer><DssButton label="Fechar" @click="selectedHistory=null"/></template></DssDialog>
</DssLayout>
</template>
<script setup>
import { ref, computed, watch, onBeforeUnmount, onMounted } from 'vue'
import { CHECKS, COMPANIES, makeRows, verdict, counts } from './checkin-model.js'
import DssLayout from '@dss/DssLayout/DssLayout.vue'
import DssPageContainer from '@dss/DssPageContainer/DssPageContainer.vue'
import DssPage from '@dss/DssPage/DssPage.vue'
import DssPageShell from '@components/composed/DssPageShell/DssPageShell.vue'
import DssPageShellRailItem from '@components/composed/DssPageShell/DssPageShellRailItem.vue'
import DssBreadcrumbs from '@dss/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@dss/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssCard from '@dss/DssCard/DssCard.vue' 
import DssAppBar from '@components/composed/DssAppBar/DssAppBar.vue'
import DssSectionTitle from '@dss/DssSectionTitle/DssSectionTitle.vue'
import DssButton from '@dss/DssButton/DssButton.vue'
import DssSelect from '@dss/DssSelect/DssSelect.vue'
import DssBanner from '@dss/DssBanner/DssBanner.vue'
import DssChip from '@dss/DssChip/DssChip.vue'
import DssLinearProgress from '@dss/DssLinearProgress/DssLinearProgress.vue'
import DssExpansionItem from '@dss/DssExpansionItem/DssExpansionItem.vue'
import DssMarkupTable from '@dss/DssMarkupTable/DssMarkupTable.vue'
import DssEmptyState from '@dss/DssEmptyState/DssEmptyState.vue'
import DssDialog from '@components/composed/DssDialog/DssDialog.vue'
defineOptions({inheritAttrs:false})
const props=defineProps({scenario:{type:String,default:'mixed'}})
const companyId=ref(COMPANIES[0].value), rows=ref(makeRows(['empty','loading','error'].includes(props.scenario)?'empty':props.scenario)), running=ref(false), completed=ref(0), filter=ref('all'), history=ref([]), reportOpen=ref(false), correction=ref(null), selectedHistory=ref(null)
const company=computed(()=>COMPANIES.find(c=>c.value===companyId.value)||COMPANIES[0])
const hasResult=computed(()=>rows.value.some(r=>r.status!=='waiting') && !running.value)
const totals=computed(()=>counts(rows.value))
const labels={waiting:'Aguardando',ok:'Aprovada',warning:'Alerta',failure:'Falha',incomplete:'Incompleta',running:'Em andamento'}
const icons={waiting:'schedule',ok:'check_circle',warning:'warning_amber',failure:'error_outline',incomplete:'timer_off',running:'sync'}
const colors={waiting:'info',ok:'positive',warning:'warning',failure:'negative',incomplete:'warning',running:'info'}
const filters=[{id:'all',label:'Todas'},{id:'failure',label:'Falhas'},{id:'warning',label:'Alertas'},{id:'ok',label:'Aprovadas'}]
const filtered=computed(()=>rows.value.filter(r=>filter.value==='all'||r.status===filter.value||(filter.value==='warning'&&r.status==='incomplete')))
const modules=[{icon:'public',label:'Mapa'},{icon:'shopping_cart',label:'Comercial'},{icon:'paid',label:'Financeiro'},{icon:'bar_chart',label:'Relatórios'},{icon:'smartphone',label:'Mobile'},{icon:'settings',label:'Configurações'},{icon:'account_tree',label:'Estrutura'}]
let timer, generation=0
function reset(){generation++;clearInterval(timer);running.value=false;completed.value=0;filter.value='all';history.value=[];rows.value=makeRows(['empty','loading','error'].includes(props.scenario)?'empty':props.scenario)}
watch(()=>props.scenario,reset);watch(companyId,()=>{reset();rows.value=makeRows('empty')})
function execute(){if(running.value)return;running.value=true;completed.value=0;filter.value='all';const final=makeRows(['empty','loading','error','stale'].includes(props.scenario)?'mixed':props.scenario);rows.value=makeRows('empty');const token=++generation;timer=setInterval(()=>{if(token!==generation)return;const index=completed.value;if(index<CHECKS.length){rows.value[index]=final[index];completed.value++}if(completed.value===11){clearInterval(timer);running.value=false;history.value.unshift({id:Date.now(),company:company.value.label,result:verdict(rows.value),time:new Date().toLocaleString('pt-BR')})}},180)}
let previousTheme, previousBrand
onMounted(()=>{
 previousTheme=document.documentElement.getAttribute('data-theme')
 previousBrand=document.documentElement.getAttribute('data-brand')
 document.documentElement.setAttribute('data-theme','light')
 document.documentElement.setAttribute('data-brand','water')
})
onBeforeUnmount(()=>{
 generation++;clearInterval(timer)
 if(previousTheme===null)document.documentElement.removeAttribute('data-theme');else if(previousTheme!==undefined)document.documentElement.setAttribute('data-theme',previousTheme)
 if(previousBrand===null)document.documentElement.removeAttribute('data-brand');else if(previousBrand!==undefined)document.documentElement.setAttribute('data-brand',previousBrand)
})
</script>
<style scoped>
.nf-layout{flex:1;min-height:0;color:var(--dss-text-body);font-family:var(--dss-font-family-sans);font-size:var(--dss-font-size-sm)}
.nf-between{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--dss-spacing-4)}
.nf-actions{display:flex;align-items:center;flex-wrap:wrap;gap:var(--dss-spacing-2)}
.nf-band{display:grid;grid-template-columns:minmax(0,5fr) minmax(var(--dss-spacing-48),2fr) minmax(var(--dss-spacing-64),2fr);gap:var(--dss-spacing-3);align-items:stretch}
.nf-panel{display:flex;flex-direction:column;gap:var(--dss-spacing-2);padding:var(--dss-spacing-2);min-width:0}
.nf-check{min-width:0}
.nf-detail{display:flex;flex-direction:column;align-items:flex-start;gap:var(--dss-spacing-4);padding:var(--dss-spacing-4);overflow:auto}
.nf-company{min-width:0}
p,td,th,span,strong{overflow-wrap:anywhere}
@media(max-width:1439px){.nf-band{grid-template-columns:minmax(0,1fr)}}
</style>
