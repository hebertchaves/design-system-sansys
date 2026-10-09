<template>
<DssLayout v-bind="$attrs" view="hHh lpR fFf" container class="nf-layout" data-brand="water" data-theme="light">
<DssAppBar brand="water" title="Faturamento · NFAg" menu-aria-label="Abrir menu principal">
<template #actions>
<DssButton variant="flat" round size="md" icon="help_outline" aria-label="Ajuda" />
<DssButton variant="flat" round size="md" icon="notifications" aria-label="Notificações" />
<DssButton variant="flat" round size="md" icon="apps" aria-label="Aplicativos Sansys" />
<DssButton variant="flat" round size="md" icon="account_circle" aria-label="Minha conta" />
</template>
</DssAppBar>
<DssPageContainer><DssPage><DssPageShell rail-aria-label="Módulos do sistema">
<template #rail><DssPageShellRailItem v-for="m in modules" :key="m.label" :icon="m.icon" :label="m.label" :active="m.label==='Financeiro'" /></template>
<template #breadcrumb><DssBreadcrumbs separator="›" gutter="sm"><DssBreadcrumbsEl label="Faturamento"/><DssBreadcrumbsEl label="NFAg"/><DssBreadcrumbsEl label="Check-in de Configuração"/></DssBreadcrumbs></template>
<header class="nf-between"><div><DssSectionTitle :level="1" size="lg" label="Check-in de configuração NFAg"/><p class="text-secondary">Prontidão cadastral e tributária para a emissão.</p></div><div class="nf-actions"><DssButton label="Relatório PDF" icon="description" variant="outline" :disabled="running || !hasResult" @click="reportOpen=true"/><DssButton label="Executar verificação" icon="play_arrow" color="primary" :loading="running" :disabled="running" @click="execute"/></div></header>
<div class="nf-band" :class="{'nf-band--feedback':feedbackRows.length}">
<DssCard variant="outlined" class="nf-panel nf-summary" :class="`nf-tone--${result.tone}`" aria-live="polite" :aria-busy="running">
<DssSectionTitle :level="2" label="Resultado da verificação" :accent="result.tone"/>
<div class="nf-summary__body" :class="{'nf-summary__body--feedback':feedbackRows.length}"><div class="nf-result"><span class="nf-result__signal"><DssIcon :name="result.icon" size="lg" :color="result.color" decorative/></span><div><strong class="nf-result__title">{{ result.label }}</strong><p>{{ result.description }}</p></div></div>
<ul v-if="feedbackRows.length" class="nf-feedback" aria-label="Pendências da verificação">
<li v-for="row in feedbackRows" :key="row.id" class="nf-feedback__item" :class="`nf-tone--${tones[row.status]}`"><DssIcon :name="icons[row.status]" :color="colors[row.status]" size="sm" decorative/><div><strong>{{ row.title }}</strong><p>{{ row.summary }}</p><span class="nf-feedback__status">{{ row.blocking ? 'Bloqueia emissão' : labels[row.status] }}</span></div></li>
</ul></div>
<DssLinearProgress v-if="running || (scenario==='loading' && !history.length)" :value="completed/11" :indeterminate="scenario==='loading' && !running && !history.length" color="info" aria-label="Progresso da verificação"/>
<span v-if="hasResult" class="nf-meta">{{ history[0]?.time || 'Última execução demonstrativa' }}</span>
</DssCard>
<DssCard variant="flat" class="nf-panel nf-situations"><DssSectionTitle :level="2" label="Situação das verificações"/>
<div class="nf-kpis" role="group" aria-label="Filtrar verificações por situação">
<div v-for="kpi in kpis" :key="kpi.id" class="nf-kpi" :class="[`nf-tone--${kpi.tone}`,{'nf-kpi--selected':filter===kpi.id}]">
<div class="nf-between nf-kpi__head"><DssSectionTitle :level="3" size="sm" :accent="kpi.tone" :label="kpi.label"/><DssIcon :name="kpi.icon" size="sm" :color="kpi.color" decorative/></div>
<div class="nf-kpi__values"><strong class="nf-kpi__count">{{ kpi.value }}</strong><span v-if="kpi.hint" class="nf-kpi__hint">{{ kpi.hint }}</span></div>
<DssButton variant="flat" :color="kpi.color" class="nf-kpi__control" :aria-label="`Filtrar ${kpi.label.toLowerCase()}`" :aria-pressed="filter===kpi.id" aria-controls="nf-verifications" @click="filter=kpi.id"/>
</div></div></DssCard></div>
<DssBanner v-if="scenario==='error' && !running && !history.length" variant="error">Não foi possível recuperar a última execução. Execute novamente em alguns minutos.</DssBanner>
<DssBanner v-if="scenario==='stale' && !history.length" variant="warning">Resultado desatualizado. Execute novamente antes de emitir.</DssBanner>
<DssCard id="nf-verifications" variant="outlined" class="nf-panel">
<div class="nf-between"><div class="nf-actions"><DssSectionTitle :level="2" label="Verificações de configuração"/><span class="nf-meta" aria-live="polite">{{ filtered.length }} de {{ totals.all }}</span><DssChip v-if="filter!=='all'" :label="filters.find(f=>f.id===filter)?.label" variant="outline" color="primary" size="xs" removable @remove="filter='all'"/></div><div class="nf-actions"><DssButton label="Expandir tudo" icon="unfold_more" variant="flat" @click="expandAll(true)"/><DssButton label="Recolher tudo" icon="unfold_less" variant="flat" @click="expandAll(false)"/></div></div>
<div class="nf-checks">
<DssExpansionItem v-for="row in filtered" :key="row.id" v-model="expanded[row.id]" :aria-label="`Verificação ${row.id} — ${row.title} — ${labels[row.status]}`" class="nf-check">
<template #header><div class="nf-check__header">
<span class="nf-check__number" :class="`nf-tone--${tones[row.status]}`">{{ String(row.id).padStart(2,'0') }}</span>
<div class="nf-check__identity"><div class="nf-actions"><strong>{{ row.title }}</strong><span v-if="row.blocking" class="nf-check__blocking">Bloqueia emissão</span></div><span class="nf-meta">Funcionalidade: {{ row.destination }}</span></div>
<div class="nf-check__aside"><span class="nf-meta">{{ row.summary }}</span><DssChip :label="labels[row.status]" :color="colors[row.status]" :icon="icons[row.status]" size="xs"/></div>
</div></template>
<div class="nf-detail"><div class="nf-detail__columns"><section><DssSectionTitle :level="3" size="sm" label="O que é verificado"/><p>{{ row.rule }}</p></section><section><DssSectionTitle :level="3" size="sm" label="Impacto na emissão"/><p>{{ row.impact }}</p></section></div>
<DssMarkupTable v-if="row.findings.length" density="compact" flat wrap-cells class="nf-table"><table><caption class="dss-visually-hidden">Achados da verificação {{ row.id }} — {{ row.title }}</caption><thead><tr><th scope="col">Item verificado</th><th scope="col">Resultado</th><th scope="col" class="nf-table__right">Situação</th></tr></thead><tbody><tr v-for="finding in row.findings" :key="finding.item"><td>{{ finding.item }}</td><td>{{ finding.result }}</td><td class="nf-table__right"><DssChip :label="row.blocking?'Falha bloqueante':labels[row.status]" :color="colors[row.status]" :icon="icons[row.status]" size="xs"/></td></tr></tbody></table></DssMarkupTable>
<div v-if="row.findings.length" class="nf-detail__actions"><DssButton :label="row.destination" icon="open_in_new" variant="outline" @click="correction=row"/></div>
</div></DssExpansionItem>
</div>
<DssEmptyState v-if="!filtered.length" title="Nenhuma verificação neste filtro" description="As demais verificações estão disponíveis em Todas."><template #action><DssButton label="Limpar filtro" variant="outline" @click="filter='all'"/></template></DssEmptyState>
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
import { CHECKS, COMPANIES, makeRows, verdict, counts, filterRows } from './checkin-model.js'
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
import DssIcon from '@dss/DssIcon/DssIcon.vue'
import DssBanner from '@dss/DssBanner/DssBanner.vue'
import DssChip from '@dss/DssChip/DssChip.vue'
import DssLinearProgress from '@dss/DssLinearProgress/DssLinearProgress.vue'
import DssExpansionItem from '@dss/DssExpansionItem/DssExpansionItem.vue'
import DssMarkupTable from '@dss/DssMarkupTable/DssMarkupTable.vue'
import DssEmptyState from '@dss/DssEmptyState/DssEmptyState.vue'
import DssDialog from '@components/composed/DssDialog/DssDialog.vue'
defineOptions({inheritAttrs:false})
const props=defineProps({scenario:{type:String,default:'mixed'}})
const expanded=ref({})
const rows=ref(makeRows(['empty','loading','error'].includes(props.scenario)?'empty':props.scenario)), running=ref(false), completed=ref(0), filter=ref('all'), history=ref([]), reportOpen=ref(false), correction=ref(null), selectedHistory=ref(null)
const company=COMPANIES[0]
const hasResult=computed(()=>rows.value.some(r=>r.status!=='waiting') && !running.value)
const totals=computed(()=>counts(rows.value))
const labels={waiting:'Aguardando',ok:'Aprovada',warning:'Alerta',failure:'Falha',incomplete:'Incompleta',running:'Em andamento'}
const icons={waiting:'schedule',ok:'check_circle',warning:'warning_amber',failure:'error_outline',incomplete:'timer_off',running:'sync'}
const colors={waiting:'info',ok:'positive',warning:'warning',failure:'negative',incomplete:'warning',running:'info'}
const filters=[{id:'all',label:'Todas'},{id:'failure',label:'Falhas'},{id:'warning',label:'Alertas'},{id:'ok',label:'Aprovadas'}]
const tones={waiting:'info',ok:'success',warning:'warning',failure:'error',incomplete:'warning',running:'info'}
const filtered=computed(()=>filterRows(rows.value,filter.value))
const blocking=computed(()=>rows.value.filter(r=>r.status==='failure'&&r.blocking).length)
const feedbackRows=computed(()=>rows.value.filter(row=>['failure','warning','incomplete'].includes(row.status)))
const kpis=computed(()=>[
 {id:'all',label:'Todas',value:totals.value.all,tone:'info',color:'info',icon:'fact_check'},
 {id:'ok',label:'Aprovadas',value:totals.value.ok,tone:'success',color:'positive',icon:'check_circle'},
 {id:'warning',label:'Alertas',value:totals.value.warning,tone:'warning',color:'warning',icon:'warning_amber',hint:totals.value.warning?'Revise as pendências':''},
 {id:'failure',label:'Falhas',value:totals.value.failure,tone:'error',color:'negative',icon:'error_outline',hint:blocking.value?'Bloqueiam a emissão':''},
])
const result=computed(()=>{
 if(running.value)return {tone:'info',color:'info',icon:'sync',label:'Verificação em andamento',description:`${completed.value} de 11 verificações concluídas.`}
 if(!history.value.length&&props.scenario==='loading')return {tone:'info',color:'info',icon:'sync',label:'Carregando última execução',description:'Aguardando o resultado da leitura.'}
 if(!history.value.length&&props.scenario==='error')return {tone:'error',color:'negative',icon:'cloud_off',label:'Resultado indisponível',description:'Não foi possível recuperar a execução. Execute novamente.'}
 if(!history.value.length&&props.scenario==='stale')return {tone:'warning',color:'warning',icon:'schedule',label:'Resultado desatualizado',description:'Execute novamente antes de emitir.'}
 if(!hasResult.value)return {tone:'info',color:'info',icon:'fact_check',label:'Aguardando primeira verificação',description:'Inicie o check-in para conferir as configurações.'}
 if(blocking.value)return {tone:'error',color:'negative',icon:'block',label:verdict(rows.value),description:'Corrija os cadastros e repita a verificação.'}
 if(totals.value.warning||totals.value.failure)return {tone:'warning',color:'warning',icon:'warning_amber',label:verdict(rows.value),description:'Revise as pendências indicadas nas verificações.'}
 return {tone:'success',color:'positive',icon:'check_circle',label:verdict(rows.value),description:'Todas as configurações foram conferidas, sem inconsistências.'}
})
function expandAll(value){for(const row of filtered.value)expanded.value[row.id]=value}
const modules=[{icon:'public',label:'Mapa'},{icon:'shopping_cart',label:'Comercial'},{icon:'paid',label:'Financeiro'},{icon:'bar_chart',label:'Relatórios'},{icon:'smartphone',label:'Mobile'},{icon:'settings',label:'Configurações'},{icon:'account_tree',label:'Estrutura'}]
let timer, generation=0
function reset(){expanded.value={};generation++;clearInterval(timer);running.value=false;completed.value=0;filter.value='all';history.value=[];rows.value=makeRows(['empty','loading','error'].includes(props.scenario)?'empty':props.scenario)}
watch(()=>props.scenario,reset)
function execute(){if(running.value)return;running.value=true;completed.value=0;expanded.value={};const final=makeRows(['empty','loading','error','stale'].includes(props.scenario)?'mixed':props.scenario);rows.value=makeRows('empty');const token=++generation;timer=setInterval(()=>{if(token!==generation)return;const index=completed.value;if(index<CHECKS.length){rows.value[index]=final[index];completed.value++}if(completed.value===11){clearInterval(timer);running.value=false;history.value.unshift({id:Date.now(),company:company.label,result:verdict(rows.value),time:new Date().toLocaleString('pt-BR')})}},180)}
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
.nf-band{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:var(--dss-spacing-3);align-items:stretch}
.nf-panel{display:flex;flex-direction:column;gap:var(--dss-spacing-3);padding:var(--dss-spacing-2);min-width:0}
.nf-band--feedback{grid-template-columns:repeat(2,minmax(0,1fr))}
.nf-situations{overflow:visible}
.nf-summary__body{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--dss-spacing-3);flex:1}
.nf-summary__body--feedback{grid-template-columns:repeat(2,minmax(0,1fr))}
.nf-feedback{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--dss-spacing-2);border-inline-start:var(--dss-border-width-thin) solid var(--dss-border-subtle);padding-inline-start:var(--dss-spacing-3)}
.nf-feedback__item{display:flex;align-items:flex-start;gap:var(--dss-spacing-2);font-size:var(--dss-font-size-xs)}
.nf-feedback__status{color:var(--nf-text);font-weight:var(--dss-font-weight-semibold)}
.nf-table{border-radius:var(--dss-radius-sm);overflow:hidden}
.nf-table table{width:100%;border-collapse:collapse}
.nf-table thead th{background:var(--dss-action-primary);color:var(--dss-text-inverse);font-size:var(--dss-font-size-xs);text-transform:uppercase;font-weight:var(--dss-font-weight-semibold);text-align:left;padding:var(--dss-spacing-2) var(--dss-spacing-3)}
.nf-table tbody td{padding:var(--dss-spacing-2) var(--dss-spacing-3);border-bottom:var(--dss-border-width-thin) solid var(--dss-border-subtle);vertical-align:middle}
.nf-table tbody tr:last-child td{border-bottom:none}
.nf-table .nf-table__right{text-align:right}
.nf-checks{display:flex;flex-direction:column;gap:var(--dss-spacing-1)}
.nf-tone--info{--nf-color:var(--dss-feedback-info);--nf-tint:var(--dss-feedback-info-surface);--nf-text:var(--dss-feedback-info-text)}
.nf-tone--success{--nf-color:var(--dss-feedback-success);--nf-tint:var(--dss-feedback-success-surface);--nf-text:var(--dss-feedback-success-text)}
.nf-tone--warning{--nf-color:var(--dss-feedback-warning);--nf-tint:var(--dss-feedback-warning-surface);--nf-text:var(--dss-text-body)}
.nf-tone--error{--nf-color:var(--dss-feedback-error);--nf-tint:var(--dss-feedback-error-surface);--nf-text:var(--dss-feedback-error-text)}
.nf-summary{background:var(--nf-tint);border-inline-start:var(--dss-spacing-1) solid var(--nf-color)}
.nf-result{display:flex;align-items:center;gap:var(--dss-spacing-3);flex:1}
.nf-result__signal{flex-shrink:0;display:flex;align-items:center;justify-content:center;inline-size:var(--dss-touch-target-lg);block-size:var(--dss-touch-target-lg);border-radius:var(--dss-radius-circle);background:var(--nf-tint)}
.nf-result__title{font-size:var(--dss-font-size-lg);font-weight:var(--dss-font-weight-semibold);color:var(--nf-text)}
.nf-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--dss-spacing-2);flex:1}
.nf-kpi{position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:var(--dss-spacing-2);padding:var(--dss-spacing-2);min-width:0;min-height:var(--dss-touch-target-lg);border:var(--dss-border-width-thin) solid var(--dss-border-default);border-radius:var(--dss-radius-md);transition:background-color var(--dss-duration-fast) var(--dss-easing-standard)}
.nf-kpi--selected,.nf-kpi:has(.nf-kpi__control:hover){background:var(--nf-tint);border-color:var(--nf-color)}
.nf-kpi:has(.nf-kpi__control:focus-visible){outline:var(--dss-border-width-md) solid var(--dss-border-focus);outline-offset:var(--dss-spacing-px)}
.nf-kpi__control{position:absolute;inset:0;width:100%;height:100%;border-radius:inherit}
.nf-kpi__head,.nf-kpi__values{pointer-events:none;position:relative;z-index:1}
.nf-kpi__head{gap:var(--dss-spacing-1);flex-wrap:nowrap;align-items:flex-start}
.nf-kpi__values{display:flex;align-items:center;gap:var(--dss-spacing-2);flex-wrap:wrap;min-height:var(--dss-spacing-10)}
.nf-kpi__count{font-size:var(--dss-font-size-2xl);line-height:var(--dss-line-height-tight);font-weight:var(--dss-font-weight-semibold);font-variant-numeric:tabular-nums;color:var(--nf-text)}
.nf-kpi__hint{font-size:var(--dss-font-size-xs);color:var(--nf-text);flex:1;min-width:var(--dss-spacing-16)}
.nf-meta{font-size:var(--dss-font-size-xs);color:var(--dss-text-subtle)}
.nf-check{min-width:0;border:var(--dss-border-width-thin) solid var(--dss-border-subtle);border-radius:var(--dss-radius-md)}
.nf-check__header{display:grid;grid-template-columns:var(--dss-spacing-8) minmax(0,3fr) minmax(0,2fr);align-items:center;gap:var(--dss-spacing-3);width:100%;min-width:0}
.nf-check__number{display:flex;align-items:center;justify-content:center;width:var(--dss-spacing-8);height:var(--dss-spacing-8);border-radius:var(--dss-radius-circle);background:var(--nf-tint);color:var(--nf-text);font-weight:var(--dss-font-weight-semibold);font-variant-numeric:tabular-nums}
.nf-check__identity{display:flex;flex-direction:column;gap:var(--dss-spacing-1);min-width:0}
.nf-check__blocking{font-size:var(--dss-font-size-xs);color:var(--dss-feedback-error-text);font-weight:var(--dss-font-weight-semibold)}
.nf-check__aside{display:flex;justify-content:flex-end;align-items:center;gap:var(--dss-spacing-2);min-width:0;text-align:right}
.nf-detail{display:flex;flex-direction:column;gap:var(--dss-spacing-4);padding:var(--dss-spacing-4);overflow:auto;background:var(--dss-surface-subtle)}
.nf-detail__columns{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--dss-spacing-4)}
.nf-detail__actions{display:flex;justify-content:flex-end}
p{margin:var(--dss-spacing-1) 0 0}
p,td,th,span,strong{overflow-wrap:anywhere}
@media(max-width:1439px){.nf-band--feedback .nf-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.nf-summary__body--feedback{grid-template-columns:minmax(0,1fr)}.nf-feedback{border-inline-start:none;padding-inline-start:0;border-top:var(--dss-border-width-thin) solid var(--dss-border-subtle);padding-top:var(--dss-spacing-2)}}
@media(max-width:767px){.nf-band{grid-template-columns:minmax(0,1fr)}.nf-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.nf-check__header{grid-template-columns:var(--dss-spacing-8) minmax(0,1fr)}.nf-check__aside{grid-column:2;justify-content:flex-start;text-align:left;flex-wrap:wrap}.nf-detail__columns{grid-template-columns:minmax(0,1fr)}}
@media(prefers-reduced-motion:reduce){.nf-kpi{transition:none}}
</style>
