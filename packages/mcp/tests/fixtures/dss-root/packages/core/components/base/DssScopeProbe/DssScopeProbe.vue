<script>
import DssScopeProbe from './1-structure/DssScopeProbe.ts.vue'
export default DssScopeProbe
</script>

<style>
/*
  FORA das camadas de estilo — mas o Gate de Composição NÃO é escopado.
  Quebrar encapsulamento é errado em qualquer arquivo.

  Esta regra tem hex cravado DE PROPÓSITO: o teste exige que ela produza
  exatamente UM achado (o :deep()), não dois. É o que separa "escopo do Token
  First" de "isenção do arquivo inteiro".
*/
:deep(.x) { color: #123456; }
</style>
