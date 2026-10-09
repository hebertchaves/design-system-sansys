<template>
<div class="nf-test" data-brand="water" :data-theme="theme">
<DssSectionTitle :level="1" label="Check-in NFAg · versão paralela"/>
<DssBanner variant="info">Dados fictícios para validação visual. Execução, relatório e histórico são demonstrativos, sem integração fiscal.</DssBanner>
<PgSection id="nf-frame" index="01" title="Preview Frame" desc="Composição Vue/DSS real em ambiente isolado" :count="1">
<div class="nf-controls"><DssSelect v-model="scenario" :options="scenarios" emit-value map-options label="Cenário"/><DssButton :label="theme==='light'?'Tema escuro':'Tema claro'" :icon="theme==='light'?'dark_mode':'light_mode'" variant="outline" @click="theme=theme==='light'?'dark':'light'"/></div>
<iframe :src="frameSrc" title="Preview Frame — Check-in NFAg paralelo" class="nf-frame"/>
</PgSection>
<PgSection id="nf-states" index="02" title="Estados de dados" desc="Vazio, carregando, erro, apto, alertas, falhas, incompleto e desatualizado" :count="scenarios.length"><div class="nf-controls"><DssButton v-for="s in scenarios" :key="s.value" :label="s.label" :variant="scenario===s.value?'unelevated':'flat'" @click="scenario=s.value"/></div></PgSection>
<PgSection id="nf-validation" index="03" title="Validação da entrega" desc="Revisão 02 · onze verificações · sem exposição de consultas" :count="3"><p>A versão anterior permanece disponível em Patterns › Check-in NFAg.</p><p>Valide a seleção de empresa, execução, filtros, expansão, atalhos e diálogos nos dois temas.</p><p>Integração Vue 2, execução fiscal, PDF/A e histórico persistente permanecem fora deste teste Vue 3.</p></PgSection>
</div>
</template>
