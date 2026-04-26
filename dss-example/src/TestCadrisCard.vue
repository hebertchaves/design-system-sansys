<template>
  <div class="test-wrap">

    <!-- ======================================================================
         CONTROLES DO CADRIS CARD
         ====================================================================== -->
    <div class="test-controls">
      <label><input type="checkbox" v-model="isLoading" /> Loading</label>
      <label><input type="checkbox" v-model="isEmpty" /> Vazio</label>
      <label><input type="checkbox" v-model="isDisabled" /> Disabled</label>
      <span v-if="lastEvent" class="test-event">→ {{ lastEvent }}</span>
    </div>

    <!-- ======================================================================
         COMPONENTE 1 — DssCadrisCard
         ====================================================================== -->
    <DssCadrisCard
      :rows="currentRows"
      :loading="isLoading"
      :pagination="pagination"
      :disable="isDisabled"
      :documento-options="documentoOptions"
      :aterro-options="aterroOptions"
      @search="handleSearch"
      @close="handleClose"
      @update:pagination="handlePagination"
    />

    <!-- ======================================================================
         COMPONENTE 2 — Profile Card (DssCard composto)
         ====================================================================== -->
    <div class="test-section-label">Profile Card — composição DssCard</div>

    <DssCard variant="elevated" class="profile-card">

      <!-- Seção horizontal: avatar + dados do colaborador -->
      <DssCardSection horizontal>
        <DssAvatar size="lg" icon="person" color="primary" class="profile-avatar" />
        <div class="profile-info">
          <h3 class="profile-name">Carlos Mendes</h3>
          <DssBadge color="info" class="profile-badge">Tech Lead</DssBadge>
          <p class="profile-team">Equipe de Engenharia</p>
        </div>
      </DssCardSection>

      <!-- Seção de chips de tecnologia -->
      <DssCardSection class="profile-chips">
        <DssChip>Vue.js</DssChip>
        <DssChip>Node.js</DssChip>
        <DssChip color="primary">DSS</DssChip>
      </DssCardSection>

      <!-- Ações alinhadas à direita -->
      <DssCardActions align="right">
        <DssButton variant="flat">Projetos</DssButton>
        <DssButton color="primary">Contatar</DssButton>
      </DssCardActions>

    </DssCard>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// DssCadrisCard (stress-test)
import DssCadrisCard from '../../components/stress-test/DssCadrisCard/DssCadrisCard.vue'
import type { CadrisRow, CadrisPagination, CadrisFilters, SelectOption } from '../../components/stress-test/DssCadrisCard/types/cadriscard.types'

// DSS base components para o Profile Card
import DssCard from '../../components/base/DssCard/DssCard.vue'
import { DssCardSection, DssCardActions } from '../../components/base/DssCard/index.js'
import DssAvatar from '../../components/base/DssAvatar/DssAvatar.vue'
import DssBadge from '../../components/base/DssBadge/DssBadge.vue'
import DssChip from '../../components/base/DssChip/DssChip.vue'
import DssButton from '../../components/base/DssButton/DssButton.vue'

// --------------------------------------------------------------------------
// DssCadrisCard — dados e estado
// --------------------------------------------------------------------------

const mockRows: CadrisRow[] = [
  { id: 1,  numeroCadri: '0000000001', gerador: '00.000.000/0001-00', aterro: 'Aterro Beta S.A.', dataVencimento: '31/12/2025', diasFaltantes: 120, mediaMonsal: '12 ton', ativo: true,  residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 2,  numeroCadri: '0000000002', gerador: '00.000.000/0002-00', aterro: 'Aterro Delta',     dataVencimento: '30/06/2025', diasFaltantes: 45,  mediaMonsal: '8 ton',  ativo: true,  residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 3,  numeroCadri: '0000000003', gerador: '00.000.000/0003-00', aterro: 'Aterro Zeta',      dataVencimento: '15/03/2024', diasFaltantes: 0,   mediaMonsal: '0 ton',  ativo: false, residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 4,  numeroCadri: '0000000004', gerador: '00.000.000/0004-00', aterro: 'Aterro Theta',     dataVencimento: '28/02/2026', diasFaltantes: 450, mediaMonsal: '35 ton', ativo: true,  residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 5,  numeroCadri: '0000000005', gerador: '00.000.000/0005-00', aterro: 'Aterro Kappa',     dataVencimento: '31/10/2025', diasFaltantes: 215, mediaMonsal: '5 ton',  ativo: true,  residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 6,  numeroCadri: '0000000006', gerador: '00.000.000/0006-00', aterro: 'Aterro Mu',        dataVencimento: '01/01/2024', diasFaltantes: 0,   mediaMonsal: '0 ton',  ativo: false, residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 7,  numeroCadri: '0000000007', gerador: '00.000.000/0007-00', aterro: 'Aterro Xi',        dataVencimento: '30/09/2025', diasFaltantes: 184, mediaMonsal: '18 ton', ativo: true,  residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 8,  numeroCadri: '0000000008', gerador: '00.000.000/0008-00', aterro: 'Aterro Beta S.A.', dataVencimento: '15/08/2025', diasFaltantes: 77,  mediaMonsal: '22 ton', ativo: true,  residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 9,  numeroCadri: '0000000009', gerador: '00.000.000/0009-00', aterro: 'Aterro Delta',     dataVencimento: '20/11/2025', diasFaltantes: 174, mediaMonsal: '3 ton',  ativo: false, residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 10, numeroCadri: '0000000010', gerador: '00.000.000/0010-00', aterro: 'Aterro Zeta',      dataVencimento: '05/04/2026', diasFaltantes: 510, mediaMonsal: '9 ton',  ativo: true,  residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 11, numeroCadri: '0000000011', gerador: '00.000.000/0011-00', aterro: 'Aterro Theta',     dataVencimento: '12/07/2025', diasFaltantes: 33,  mediaMonsal: '14 ton', ativo: true,  residuos: 'Nomes Resíduos, Nomes Resíduos...' },
  { id: 12, numeroCadri: '0000000012', gerador: '00.000.000/0012-00', aterro: 'Aterro Kappa',     dataVencimento: '28/02/2025', diasFaltantes: 0,   mediaMonsal: '0 ton',  ativo: false, residuos: 'Nomes Resíduos, Nomes Resíduos...' },
]

const documentoOptions: SelectOption[] = [
  { label: 'CTF',   value: 'CTF'   },
  { label: 'MTR',   value: 'MTR'   },
  { label: 'CADRI', value: 'CADRI' },
]

const aterroOptions: SelectOption[] = [
  { label: 'Aterro Beta S.A.', value: 'Aterro Beta S.A.' },
  { label: 'Aterro Delta',     value: 'Aterro Delta'     },
  { label: 'Aterro Zeta',      value: 'Aterro Zeta'      },
  { label: 'Aterro Theta',     value: 'Aterro Theta'     },
  { label: 'Aterro Kappa',     value: 'Aterro Kappa'     },
  { label: 'Aterro Mu',        value: 'Aterro Mu'        },
  { label: 'Aterro Xi',        value: 'Aterro Xi'        },
]

const isLoading  = ref(false)
const isEmpty    = ref(false)
const isDisabled = ref(false)
const lastEvent  = ref('')

const currentRows = computed(() => isEmpty.value ? [] : mockRows)

const pagination = ref<CadrisPagination>({
  page: 1,
  rowsPerPage: 12,
  rowsNumber: 65,
})

function handleSearch(filters: CadrisFilters) {
  lastEvent.value = `@search — cadri: "${filters.cadri}", gerador: "${filters.gerador}"`
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    lastEvent.value = 'Pesquisa concluída'
  }, 1500)
}

function handleClose() {
  lastEvent.value = '@close'
}

function handlePagination(p: CadrisPagination) {
  pagination.value = p
  lastEvent.value = `@update:pagination — page: ${p.page}, rowsPerPage: ${p.rowsPerPage}`
}
</script>

<style scoped>
.test-wrap {
  padding: 32px;
  min-height: 100vh;
  background: var(--dss-surface-default, #f5f5f5);
  font-family: Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Controles do CadrisCard */
.test-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  background: var(--dss-surface-subtle, #fafafa);
  border: 1px solid var(--dss-gray-200, #e5e5e5);
  border-radius: 6px;
  font-size: 0.875rem;
}

.test-controls label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: var(--dss-text-body, #454545);
}

.test-event {
  margin-left: auto;
  font-size: 0.8125rem;
  color: var(--dss-text-subtle, #b0b0b0);
  font-style: italic;
}

/* Label separador de seção */
.test-section-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--dss-text-subtle, #b0b0b0);
  padding-top: 8px;
}

/* Profile Card */
.profile-card {
  max-width: 400px;
}

.profile-avatar {
  flex-shrink: 0;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 16px;
}

.profile-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--dss-text-body, #454545);
  line-height: 1.3;
}

.profile-badge {
  align-self: flex-start;
}

.profile-team {
  margin: 0;
  font-size: 0.875rem;
  color: var(--dss-text-subtle, #b0b0b0);
}

.profile-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
