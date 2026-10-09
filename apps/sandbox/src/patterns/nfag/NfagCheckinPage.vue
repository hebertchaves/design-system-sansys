<template>
<DssLayout v-bind="$attrs" container class="nf-layout" data-brand="water" :data-theme="theme">
<DssAppBar brand="water" title="Faturamento · NFAg" menu-aria-label="Abrir menu principal" />
<DssPageContainer><DssPage><DssContainer tag="main" size="lg" padding="md" gap="lg">
<header class="nf-between"><div><DssSectionTitle :level="1" size="lg" label="Check-in de configuração NFAg"/><p class="text-secondary">Prontidão cadastral e tributária para a emissão.</p></div><div class="nf-actions"><DssButton label="Relatório PDF" icon="description" variant="outline" :disabled="running || !hasResult" @click="reportOpen=true"/><DssButton label="Executar verificação" icon="play_arrow" color="primary" :loading="running" :disabled="running" @click="execute"/></div></header>
<section class="row q-col-gutter-md items-center" aria-label="Empresa emitente"><div class="col-12 col-md-5"><DssSelect v-model="companyId" :options="COMPANIES" emit-value map-options label="Empresa emitente" variant="outlined" :disabled="running"/></div><div class="col-12 col-md-7 nf-actions"><span>CNPJ {{ company.cnpj }}</span><span>{{ company.city }}</span><span>IBGE {{ company.ibge }}</span></div></section>
<DssBanner v-if="scenario==='error' && !running" variant="error">Não foi possível recuperar a última execução. Execute novamente em alguns minutos.</DssBanner>
<DssBanner v-if="scenario==='stale'" variant="warning">Resultado desatualizado. Execute novamente antes de emitir.</DssBanner>
<section class="nf-summary" aria-live="polite" :aria-busy="running"><small class="text-secondary">SITUAÇÃO DO AMBIENTE</small><h2>{{ running?'Verificação em andamento':hasResult?verdict(rows):'Aguardando primeira verificação' }}</h2><p>{{ running?`${completed} de 11 verificações concluídas`:hasResult?'Última execução demonstrativa · agora':'Selecione a empresa e inicie o check-in.' }}</p><DssLinearProgress v-if="running || scenario==='loading'" :value="completed/11" color="primary"/><div v-else class="nf-actions"><DssChip :label="`${totals.ok} aprovadas`" color="positive"/><DssChip :label="`${totals.warning} alertas`" color="warning"/><DssChip :label="`${totals.failure} falhas`" color="negative"/></div></section>
<section><div class="nf-between"><DssSectionTitle :level="2" label="Verificações de configuração"/><div class="nf-actions"><DssButton v-for="f in filters" :key="f.id" :label="f.label" :variant="filter===f.id?'unelevated':'flat'" color="primary" @click="filter=f.id"/></div></div>
<DssExpansionItem v-for="row in filtered" :key="row.id" :label="`${String(row.id).padStart(2,'0')} · ${row.title} — ${labels[row.status]}`" :caption="row.summary" :icon="icons[row.status]" class="nf-check">
<div class="nf-detail"><DssChip :label="row.blocking?'Falha bloqueante':labels[row.status]" :color="colors[row.status]"/><p>{{ row.rule }}</p><p>{{ row.impact }}</p><p class="text-secondary">Funcionalidade para correção: {{ row.destination }}</p>
<DssMarkupTable v-if="row.findings.length" flat><thead><tr><th>Cadastro</th><th>Inconsistência</th></tr></thead><tbody><tr v-for="finding in row.findings" :key="finding.item"><td>{{ finding.item }}</td><td>{{ finding.result }}</td></tr></tbody></DssMarkupTable>
<DssButton v-if="row.findings.length" label="Abrir funcionalidade de correção" icon="open_in_new" variant="outline" @click="correction=row"/>
</div></DssExpansionItem>
<DssEmptyState v-if="!filtered.length" title="Nenhuma verificação neste filtro" description="As demais verificações estão disponíveis em Todas."/>
</section>
<section><DssSectionTitle :level="2" label="Histórico de execuções"/><DssEmptyState v-if="!history.length" title="Nenhuma execução nesta sessão" description="Execute o check-in para consultar o resultado demonstrativo."/><DssMarkupTable v-else flat><thead><tr><th>Empresa</th><th>Situação</th><th>Conclusão</th><th>Detalhes</th></tr></thead><tbody><tr v-for="h in history" :key="h.id"><td>{{ h.company }}</td><td>{{ h.result }}</td><td>{{ h.time }}</td><td><DssButton label="Consultar" variant="flat" icon="visibility" @click="selectedHistory=h"/></td></tr></tbody></DssMarkupTable></section>
</DssContainer></DssPage></DssPageContainer>
<DssDialog v-model:open="reportOpen" aria-label="Relatório demonstrativo" data-brand="water" :data-theme="theme"><template #header>Relatório de verificação</template><p>Prévia demonstrativa: {{ company.label }}.</p><p>{{ verdict(rows) }} · {{ totals.all }} verificações.</p><p>A geração de PDF/A depende da integração com o Sansys Water e não está disponível neste teste.</p><template #footer><DssButton label="Fechar" @click="reportOpen=false"/></template></DssDialog>
<DssDialog :open="Boolean(correction)" @update:open="v=>{if(!v) correction=null}" aria-label="Destino da correção" data-brand="water" :data-theme="theme"><template #header>{{ correction?.title }}</template><p>{{ correction?.destination }}</p><p>O atalho será conectado à funcionalidade do Sansys Water. Nenhuma navegação de produção é executada neste teste.</p><template #footer><DssButton label="Fechar" @click="correction=null"/></template></DssDialog>
<DssDialog :open="Boolean(selectedHistory)" @update:open="v=>{if(!v) selectedHistory=null}" aria-label="Detalhes da execução" data-brand="water" :data-theme="theme"><template #header>Execução demonstrativa</template><p>{{ selectedHistory?.company }}</p><p>{{ selectedHistory?.result }}</p><p>{{ selectedHistory?.time }}</p><template #footer><DssButton label="Fechar" @click="selectedHistory=null"/></template></DssDialog>
</DssLayout>
</template>
<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { CHECKS, COMPANIES, makeRows, verdict, counts } from './checkin-model.js'
import DssLayout from '@dss/DssLayout/DssLayout.vue'
import DssPageContainer from '@dss/DssPageContainer/DssPageContainer.vue'
import DssPage from '@dss/DssPage/DssPage.vue'
import DssContainer from '@dss/DssContainer/DssContainer.vue'
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
const props=defineProps({scenario:{type:String,default:'mixed'},theme:{type:String,default:'light'}})
const companyId=ref(COMPANIES[0].value), rows=ref(makeRows(props.scenario)), running=ref(false), completed=ref(0), filter=ref('all'), history=ref([]), reportOpen=ref(false), correction=ref(null), selectedHistory=ref(null)
const company=computed(()=>COMPANIES.find(c=>c.value===companyId.value)||COMPANIES[0])
const hasResult=computed(()=>!['empty','loading','error'].includes(props.scenario) && rows.value.some(r=>r.status!=='waiting') || history.value.length>0)
const totals=computed(()=>counts(rows.value))
const labels={waiting:'Aguardando',ok:'Aprovada',warning:'Alerta',failure:'Falha',incomplete:'Incompleta',running:'Em andamento'}
const icons={waiting:'schedule',ok:'check_circle',warning:'warning_amber',failure:'error_outline',incomplete:'timer_off',running:'sync'}
const colors={waiting:'info',ok:'positive',warning:'warning',failure:'negative',incomplete:'warning',running:'info'}
const filters=[{id:'all',label:'Todas'},{id:'failure',label:'Falhas'},{id:'warning',label:'Alertas'},{id:'ok',label:'Aprovadas'}]
const filtered=computed(()=>rows.value.filter(r=>filter.value==='all'||r.status===filter.value||(filter.value==='warning'&&r.status==='incomplete')))
let timer, generation=0
function reset(){generation++;clearInterval(timer);running.value=false;completed.value=0;filter.value='all';history.value=[];rows.value=makeRows(['empty','loading','error'].includes(props.scenario)?'empty':props.scenario)}
watch(()=>props.scenario,reset);watch(companyId,reset)
function execute(){if(running.value)return;running.value=true;completed.value=0;filter.value='all';const final=makeRows(['empty','loading','error','stale'].includes(props.scenario)?'mixed':props.scenario);rows.value=makeRows('empty');const token=++generation;timer=setInterval(()=>{if(token!==generation)return;const index=completed.value;if(index<CHECKS.length){rows.value[index]=final[index];completed.value++}if(completed.value===11){clearInterval(timer);running.value=false;history.value.unshift({id:Date.now(),company:company.value.label,result:verdict(rows.value),time:new Date().toLocaleString('pt-BR')})}},180)}
onBeforeUnmount(()=>{generation++;clearInterval(timer)})
</script>
<style scoped>
.nf-layout{height:100%;min-height:var(--dss-spacing-192)}
.nf-between{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--dss-spacing-4)}
.nf-actions{display:flex;align-items:center;flex-wrap:wrap;gap:var(--dss-spacing-3)}
.nf-summary{display:flex;flex-direction:column;gap:var(--dss-spacing-3);padding-block:var(--dss-spacing-6);border-block:var(--dss-border-width-thin) solid var(--dss-border-default)}
.nf-summary h2{font-size:var(--dss-font-size-2xl);margin:0}
.nf-check{margin-top:var(--dss-spacing-3)}
.nf-detail{display:flex;flex-direction:column;align-items:flex-start;gap:var(--dss-spacing-4);padding:var(--dss-spacing-4);overflow:auto}
p,td,th,span{overflow-wrap:anywhere}
</style>
