<template>
  <div class="ex">
    <!-- ═══════════════════════════════════════════════════════════════════
         1. O mínimo
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ex__item">
      <h2>1. O mínimo</h2>
      <p>Identificador e as informações. O trilho e o gatilho vêm por padrão.</p>
      <DssContextHeader identifier="652701-9" :groups="grupos" />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         2. Os dois modais
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ex__item">
      <h2>2. Os dois modais são DIFERENTES</h2>
      <p>
        O ícone do imóvel abre o modal de registros; o botão Detalhes abre outro.
        O badge conta os registros: zero desenha o <code>add_circle</code>, a
        partir de um vira o contador. O ícone não muda — o destino do clique é
        sempre o mesmo.
      </p>
      <DssContextHeader
        identifier="652701-9"
        :records-count="registros.length"
        :groups="grupos"
        @open-records="ultimo = 'open-records'"
        @open-details="ultimo = 'open-details'"
      />
      <p class="ex__log">Último evento: <code>{{ ultimo || '—' }}</code></p>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         3. Retração controlada
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ex__item">
      <h2>3. Retração controlada, com resumo declarado</h2>
      <p>
        Retraído, o cabeçalho mantém identidade, Detalhes e as informações de
        <code>summary</code>. Quais são elas muda por filial — por isso é
        declaração de quem monta a tela, não regra do componente.
      </p>
      <DssContextHeader
        v-model:collapsed="retraido"
        identifier="652701-9"
        :records-count="2"
        :groups="grupos"
        :summary="['morador', 'endereco']"
      />
      <DssButton
        variant="outline" color="primary" size="sm"
        :label="retraido ? 'Expandir' : 'Retrair'"
        @click="retraido = !retraido"
      />
      <p>
        A transição é a mesma por qualquer caminho — o gatilho do trilho ou o
        <code>v-model</code> daqui de fora. Quem anima é a altura da peça, e ela
        reage ao ESTADO, não ao clique.
      </p>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         3b. O tempo da retração
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ex__item">
      <h2>3b. Afinando o tempo da retração</h2>
      <p>
        Dois canais governam as três camadas da animação — altura, esmaecimento
        do conteúdo e giro do chevron. O composable lê a duração por
        <code>getComputedStyle</code>; o CSS usa as mesmas variáveis.
      </p>
      <div class="ex__lento">
        <DssContextHeader
          v-model:collapsed="retraidoLento"
          identifier="652701-9"
          :records-count="2"
          :groups="grupos"
          :summary="['morador', 'endereco']"
        />
      </div>
      <DssButton
        variant="outline" color="primary" size="sm"
        :label="retraidoLento ? 'Expandir devagar' : 'Retrair devagar'"
        @click="retraidoLento = !retraidoLento"
      />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         4. Ações de sessão
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ex__item">
      <h2>4. Ações de sessão, com a contagem de abertos</h2>
      <p>
        A contagem alimenta o badge <em>e</em> o nome acessível do botão — o
        badge é <code>aria-hidden</code>, então sem isso o leitor de tela nunca
        saberia que há dois atendimentos em aberto.
      </p>
      <DssContextHeader
        identifier="652701-9"
        :open-count="2"
        :groups="grupos"
        @switch="ultimo = 'switch'"
        @create="ultimo = 'create'"
      />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         5. Cadastro incompleto
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ex__item">
      <h2>5. Cadastro incompleto — o caso normal</h2>
      <p>
        A lista é servida por atendimento e varia entre clientes. O agrupamento
        é o que mantém o sentido quando falta dado: sem grupos, um campo ausente
        faria o primeiro item do assunto seguinte subir para o lugar dele.
      </p>
      <DssContextHeader
        identifier="904112-5"
        :groups="gruposParciais"
        :switchable="false"
        :creatable="false"
      />
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         6. Valor customizado por slot
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ex__item">
      <h2>6. Valor customizado pelo slot <code>item-[name]</code></h2>
      <p>
        O caso que foge do padrão sai pelo slot, não por mais uma prop. É o
        mesmo contrato do <code>body-cell-[coluna]</code> do DssTable.
      </p>
      <DssContextHeader identifier="652701-9" :groups="grupos">
        <template #item-debito="{ item }">
          <DssChip size="sm" variant="outline" color="negative" :label="item.value" />
        </template>
      </DssContextHeader>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         7. Marca
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ex__item">
      <h2>7. Marca</h2>
      <p>
        A prop emite <code>data-brand</code> e remapeia o token; ela não pinta
        elemento nenhum. O trilho e o botão Detalhes seguem sozinhos.
      </p>
      <DssContextHeader
        v-for="m in ['hub', 'water', 'waste']"
        :key="m"
        :brand="m"
        identifier="652701-9"
        :records-count="2"
        :open-count="3"
        :groups="[grupos[2]]"
      />
    </section>
  </div>
</template>

<script setup>
/**
 * DssContextHeader — Exemplos de uso
 *
 * O cabeçalho que acompanha o atendente por toda a jornada.
 */
import { ref } from 'vue'
import DssContextHeader from './DssContextHeader.vue'
import DssButton from '../../base/DssButton/DssButton.vue'
import DssChip from '../../base/DssChip/DssChip.vue'

const VISUALIZAR = { icon: 'badge', label: 'Visualizar cliente' }

const grupos = [
  {
    name: 'pessoas',
    label: 'Pessoas e endereço',
    span: 2,
    items: [
      { name: 'proprietario', label: 'Proprietário', value: '(CPF: 000.000.000-00) - Nome e Sobrenome', action: VISUALIZAR },
      { name: 'morador', label: 'Morador', value: '(CPF: 000.000.000-00) - Nome e Sobrenome', action: VISUALIZAR },
      { name: 'endereco', label: 'Endereço', value: 'Rua logradouro do Usuário, 123 - 00000-000 - Bairro, Cidade - UF' },
    ],
  },
  {
    name: 'cadastro',
    label: 'Dados técnicos',
    items: [
      { name: 'rota', label: 'Rota Leitura', value: '0000.00.00' },
      { name: 'localizacao', label: 'Localização', value: '00.00.0000.0000.0000' },
      { name: 'cobranca', label: 'Tipo de Cobrança', value: 'Pagamento Caixa' },
    ],
  },
  {
    name: 'situacao',
    label: 'Situação das ligações',
    items: [
      { name: 'agua', label: 'Ligação água', value: 'Ativa', tone: 'positive' },
      { name: 'esgoto', label: 'Ligação esgoto', value: 'Inativa', tone: 'negative' },
      { name: 'debito', label: 'Débito', value: 'Em negociação', tone: 'info' },
    ],
  },
]

const gruposParciais = [
  {
    name: 'pessoas',
    items: [
      { name: 'morador', label: 'Morador', value: 'Cadastro incompleto' },
      { name: 'endereco', label: 'Endereço', value: 'Rua Sem Número, s/n' },
    ],
  },
]

const registros = [{ id: 1 }, { id: 2 }]
const retraido = ref(false)
const retraidoLento = ref(false)
const ultimo = ref('')
</script>

<style scoped>
.ex {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-8);
  padding: var(--dss-spacing-6);
  background: var(--dss-surface-muted);
}

.ex__item {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
}

.ex__item h2 {
  margin: 0;
  font-size: var(--dss-font-size-lg);
  color: var(--dss-text-body);
}

.ex__item p {
  margin: 0;
  max-inline-size: 70ch;
  font-size: var(--dss-font-size-sm);
  color: var(--dss-text-secondary);
}

.ex__log {
  font-size: var(--dss-font-size-sm);
}

/* Os canais de movimento são remapeáveis pelo host — o componente não precisa
   de prop nenhuma para isso. */
.ex__lento {
  --dss-collapse-duration: var(--dss-duration-slower);
  --dss-collapse-easing: var(--dss-easing-decelerate);
}
</style>
