<template>
<DssLayout v-bind="$attrs" container class="nf-layout" data-brand="water" :data-theme="theme">
<DssAppBar brand="water" title="Faturamento · NFAg" menu-aria-label="Abrir menu principal" />
<DssPageContainer><DssPage><DssContainer tag="main" size="lg" padding="md" gap="lg">
<header class="nf-between"><div><DssSectionTitle :level="1" size="lg" label="Check-in de configuração NFAg"/><p class="text-secondary">Prontidão cadastral e tributária para a emissão.</p></div><div class="nf-actions"><DssButton label="Relatório PDF" icon="description" variant="outline" :disabled="running || !hasResult" @click="reportOpen=true"/><DssButton label="Executar verificação" icon="play_arrow" color="primary" :loading="running" :disabled="running" @click="execute"/></div></header>
<section class="row q-col-gutter-md items-center" aria-label="Empresa emitente"><div class="col-12 col-md-5"><DssSelect v-model="companyId" :options="COMPANIES" emit-value map-options label="Empresa emitente" variant="outlined" :disabled="running"/></div><div class="col-12 col-md-7 nf-actions"><span>CNPJ {{ company.cnpj }}</span><span>{{ company.city }}</span><span>IBGE {{ company.ibge }}</span></div></section>
<DssBanner v-if="scenario==='error' && !running" variant="error">Não foi possível recuperar a última execução. Execute novamente em alguns minutos.</DssBanner>
<DssBanner v-if="scenario==='stale'" variant="warning">Resultado desatualizado. Execute novamente antes de emitir.</DssBanner>
