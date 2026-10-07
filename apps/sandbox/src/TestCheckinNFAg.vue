<template>
  <div class="cn-page" data-brand="water">

    <!-- ================================================================
         SANDBOX ONLY — seletor de estado de dados.
         Não faz parte da tela: existe para que os quatro estados exigidos
         pelo portão de prontidão (§2.5.2) sejam verificáveis no sandbox.
         ================================================================ -->
    <div class="cn-devbar" role="group" aria-label="Sandbox — estado de dados">
      <span class="cn-devbar__label">sandbox · estado</span>
      <DssButton
        v-for="e in estadosDemo"
        :key="e.id"
        :label="e.label"
        size="xs"
        :variant="estado === e.id ? 'unelevated' : 'flat'"
        color="primary"
        @click="estado = e.id"
      />
    </div>

    <!-- ================================================================
         DssLayout é obrigatório: DssHeader/DssPage dependem do contexto
         QLayout (offsets via provide/inject). Ver DssHeader/README.md.
         ================================================================ -->
    <DssLayout view="hHh lpR fFf" container class="cn-layout">

    <!-- ================================================================
         APP BAR — composto (Bloco 3.1)

         Era DssHeader + DssToolbar + 5 peças soltas + 55 linhas de CSS
         (.cn-appbar__left/right/brand/brand-alt/pipe/title).

         A ALTURA CONVERGIU, e é ganho, não regressão: esta tela usava 56px —
         o default do DssToolbar, que nunca foi medido em produção. O
         `DssAppBar` entrega 40px no `compact`, que é a barra do Sansys medida
         no grid master (Figma 1813:1328). As duas telas tinham duas alturas
         de barra por acidente de default; agora têm uma, por decisão.
         ================================================================ -->
    <DssAppBar
      brand="water"
      title="Check-in de Configuração NFAg"
      menu-aria-label="Abrir menu principal"
    >
      <template #actions>
        <DssButton variant="flat" round size="md" icon="help_outline" aria-label="Ajuda">
          <DssTooltip label="Central de ajuda" />
        </DssButton>
        <DssButton variant="flat" round size="md" icon="account_circle" aria-label="Minha conta">
          <DssTooltip label="Minha conta" />
        </DssButton>
      </template>
    </DssAppBar>

    <DssPageContainer>
    <DssPage class="cn-content">

    <!-- ================================================================
         BREADCRUMBS
         ================================================================ -->
    <nav class="cn-crumbs" aria-label="Trilha de navegação">
      <DssBreadcrumbs separator="›" gutter="sm">
        <DssBreadcrumbsEl label="Faturamento" icon="looks_one" />
        <DssBreadcrumbsEl label="NFAg" icon="looks_two" />
        <DssBreadcrumbsEl label="Check-in de Configuração" icon="looks_3" />
      </DssBreadcrumbs>
    </nav>

    <!-- ================================================================
         CABEÇALHO DA PÁGINA
         ================================================================ -->
    <div class="cn-pagehead">
      <DssSectionTitle :level="1" size="lg" label="Check-in de Configuração NFAg" />

      <div class="cn-pagehead__actions">
        <DssButton
          variant="outline"
          color="primary"
          size="sm"
          icon="description"
          label="Relatório PDF"
          :disabled="estado !== 'pronto'"
        />
        <DssButton
          variant="unelevated"
          color="primary"
          size="sm"
          :icon="executando ? '' : 'play_arrow'"
          :label="executando ? 'Executando…' : 'Executar verificação'"
          :loading="executando"
          :disabled="executando"
          @click="executarVerificacao"
        />
        <DssButton
          variant="flat"
          size="sm"
          icon="school"
          label="Tutorial"
          class="cn-pagehead__tutorial"
        />
      </div>
    </div>

    <!-- O trilho de conteúdo: teto de largura, respiro e ritmo vertical saíram
         da página para o `DssContainer`. Sobrou o rodapé alto, que é desta tela. -->
    <DssContainer tag="main" size="lg" padding="sm" gap="md" class="cn-main">

      <!-- ============================================================
           ESTADO: ERRO DE INFRAESTRUTURA
           ============================================================ -->
      <DssBanner
        v-if="estado === 'erro'"
        variant="error"
        icon="cloud_off"
        class="cn-banner"
      >
        <strong class="cn-banner__title">Verificação interrompida</strong>
        <span class="cn-banner__text">
          A réplica de leitura está indisponível. As verificações não concluídas
          ficam como “Não concluída”. Execute novamente em alguns minutos.
        </span>
        <template #actions>
          <DssButton
            variant="outline"
            color="negative"
            size="sm"
            icon="refresh"
            label="Executar novamente"
            @click="executarVerificacao"
          />
        </template>
      </DssBanner>

      <!-- ============================================================
           ESTADO: VAZIO — nenhuma execução para a empresa
           ============================================================ -->
      <DssCard v-else-if="estado === 'vazio'" variant="outlined" class="cn-card">
        <DssCardSection class="cn-empty">
          <DssEmptyState
            icon="fact_check"
            title="Nenhuma verificação executada para esta empresa"
            description="Execute o check-in para saber se o ambiente está apto à emissão da NFAg.
                         O resultado fica válido por 24 h."
          >
            <template #action>
              <DssButton
                variant="unelevated"
                color="primary"
                size="sm"
                icon="play_arrow"
                label="Executar verificação"
                @click="executarVerificacao"
              />
            </template>
          </DssEmptyState>
        </DssCardSection>
      </DssCard>

      <template v-else>

        <!-- ==========================================================
             CARD — RESULTADO DA VERIFICAÇÃO
             ========================================================== -->
        <DssCard variant="outlined" class="cn-card">
          <DssCardSection class="cn-result">
            <div class="cn-result__head">
              <div class="cn-result__ident">
                <span class="cn-eyebrow">Resultado da verificação</span>
                <h2 class="cn-result__title">Aderência do ambiente à emissão de NFAg</h2>
                <p class="cn-result__meta">
                  {{ empresa.nome }} · CNPJ {{ empresa.cnpj }} · UF {{ empresa.uf }} ·
                  município IBGE {{ empresa.ibge }} · última verificação {{ ultimaExecucao.dataHora }} ·
                  executada por {{ ultimaExecucao.usuario }}
                </p>
              </div>

              <DssChip
                :color="veredito.cor"
                :icon="veredito.icone"
                :label="veredito.rotulo"
                size="sm"
                class="cn-result__verdict"
              />
            </div>

            <!-- RF-13 — resultado desatualizado -->
            <DssBanner
              v-if="desatualizado && !executando"
              variant="warning"
              icon="schedule"
              dense
              class="cn-banner cn-banner--inline"
            >
              Verificação desatualizada — resultado com mais de 24 h.
              Execute uma nova verificação para confirmar o ambiente.
            </DssBanner>

            <!-- RF-05 — tiles clicáveis filtram a lista -->
            <div class="cn-tiles" role="group" aria-label="Filtrar verificações por situação">
              <button
                v-for="t in tiles"
                :key="t.id"
                type="button"
                class="cn-tile"
                :class="{ 'cn-tile--selected': filtro === t.id }"
                :aria-pressed="filtro === t.id"
                @click="filtro = t.id"
              >
                <span class="cn-tile__row">
                  <span class="cn-tile__label">{{ t.label }}</span>
                  <DssIcon :name="t.icone" size="xs" :color="t.cor" decorative />
                </span>
                <span class="cn-tile__value" :class="`cn-tile__value--${t.tom}`">
                  {{ estado === 'carregando' && t.id !== 'todas' ? '—' : t.valor }}
                </span>
                <span v-if="t.hint" class="cn-tile__hint">{{ t.hint }}</span>
              </button>
            </div>

            <div class="cn-progress">
              <DssLinearProgress
                :value="progresso"
                :indeterminate="executando && progresso === 0"
                :color="executando ? 'info' : veredito.progresso"
                size="sm"
                aria-label="Progresso da verificação"
              />
              <p class="cn-progress__caption" aria-live="polite">{{ legendaProgresso }}</p>
            </div>
          </DssCardSection>
        </DssCard>

        <!-- ==========================================================
             RF-09 — BANNER DE BLOQUEIO
             ========================================================== -->
        <DssBanner
          v-if="bloqueantes.length && !executando"
          variant="error"
          icon="block"
          class="cn-banner"
        >
          <strong class="cn-banner__title">Ambiente não apto para emissão</strong>
          <span
            v-for="b in bloqueantes"
            :key="b.n"
            class="cn-banner__text"
          >
            <strong>{{ b.n }}. {{ b.titulo }}:</strong> {{ b.impacto }}
          </span>
        </DssBanner>

        <!-- ==========================================================
             SEÇÃO — VERIFICAÇÕES
             ========================================================== -->
        <div class="cn-section">
          <div class="cn-section__left">
            <DssSectionTitle label="Verificações" />
            <DssBadge
              color="primary"
              outline
              :label="`${verificacoesFiltradas.length} de ${verificacoes.length}`"
            />
            <DssChip
              v-if="filtro !== 'todas'"
              variant="outline"
              color="primary"
              size="xs"
              icon="filter_alt"
              :label="rotuloFiltro"
              removable
              @remove="filtro = 'todas'"
            />
          </div>

          <div class="cn-section__right">
            <DssButton
              variant="flat"
              color="primary"
              size="sm"
              icon="unfold_more"
              label="Expandir tudo"
              @click="expandirTudo(true)"
            />
            <DssButton
              variant="flat"
              color="primary"
              size="sm"
              icon="unfold_less"
              label="Recolher tudo"
              @click="expandirTudo(false)"
            />
          </div>
        </div>

        <DssCard variant="outlined" class="cn-card cn-card--checks">
          <!-- filtro sem resultado -->
          <DssCardSection v-if="!verificacoesFiltradas.length" class="cn-empty">
            <DssEmptyState
              icon="filter_alt_off"
              :title="`Nenhuma verificação com ${rotuloFiltro.toLowerCase()}`"
              description="Remova o filtro para ver todas as verificações da última execução."
            >
              <template #action>
                <DssButton
                  variant="outline"
                  color="primary"
                  size="sm"
                  label="Limpar filtro"
                  @click="filtro = 'todas'"
                />
              </template>
            </DssEmptyState>
          </DssCardSection>

          <ul v-else class="cn-checks">
            <li v-for="c in verificacoesFiltradas" :key="c.n" class="cn-checks__item">
              <DssExpansionItem
                v-model="abertos[c.n]"
                :aria-label="`Verificação ${c.n} — ${c.titulo} — situação ${rotuloSituacao(c.situacao)}`"
                class="cn-check"
              >
                <template #header>
                  <div class="cn-check__header">
                    <span class="cn-check__num" :class="`cn-check__num--${c.situacao}`">
                      {{ c.n }}
                    </span>

                    <span class="cn-check__ident">
                      <span class="cn-check__line">
                        <span class="cn-check__title">{{ c.titulo }}</span>
                        <span v-if="c.bloqueia" class="cn-check__block">bloqueia emissão</span>
                      </span>
                      <span class="cn-check__func">Funcionalidade: {{ c.funcionalidade }}</span>
                    </span>

                    <span class="cn-check__aside">
                      <span class="cn-check__summary">{{ c.resumo }}</span>
                      <DssChip
                        :color="corSituacao(c.situacao)"
                        :icon="iconeSituacao(c.situacao)"
                        :label="rotuloSituacao(c.situacao)"
                        size="xs"
                      />
                    </span>
                  </div>
                </template>

                <div class="cn-panel">
                  <div class="cn-panel__cols">
                    <div class="cn-panel__col">
                      <span class="cn-eyebrow">O que é verificado</span>
                      <p class="cn-panel__text">{{ c.descricao }}</p>
                    </div>
                    <div class="cn-panel__col">
                      <span class="cn-eyebrow">Impacto na emissão</span>
                      <p class="cn-panel__text">{{ c.impacto }}</p>
                    </div>
                  </div>

                  <DssMarkupTable density="compact" flat class="cn-table">
                    <table>
                      <caption class="dss-visually-hidden">
                        Achados da verificação {{ c.n }} — {{ c.titulo }}
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Item verificado</th>
                          <th scope="col">Resultado</th>
                          <th scope="col" class="cn-table__right">Situação</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="a in c.achados" :key="a.item">
                          <td>{{ a.item }}</td>
                          <td>{{ a.resultado }}</td>
                          <td class="cn-table__right">
                            <DssChip
                              :color="corSituacao(a.situacao)"
                              :icon="iconeSituacao(a.situacao)"
                              :label="rotuloSituacao(a.situacao)"
                              size="xs"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </DssMarkupTable>

                  <div class="cn-panel__actions">
                    <DssButton
                      variant="outline"
                      color="primary"
                      size="sm"
                      icon="open_in_new"
                      :label="c.acao"
                    />
                  </div>
                </div>
              </DssExpansionItem>
            </li>
          </ul>
        </DssCard>

        <!-- ==========================================================
             RF-10 — HISTÓRICO DE EXECUÇÕES
             ========================================================== -->
        <div class="cn-section">
          <div class="cn-section__left">
            <DssSectionTitle label="Histórico de Execuções" />
          </div>
          <div class="cn-section__right">
            <span class="cn-section__note">nfag_checkin_execucao · últimas 5</span>
            <DssButton
              variant="flat"
              color="primary"
              size="sm"
              icon-right="chevron_right"
              label="Ver todas"
            />
          </div>
        </div>

        <DssCard variant="outlined" class="cn-card">
          <DssMarkupTable density="compact" flat class="cn-table cn-table--hist">
            <table>
              <caption class="dss-visually-hidden">
                Últimas cinco execuções do check-in para {{ empresa.nome }}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Data / hora</th>
                  <th scope="col">Executada por</th>
                  <th scope="col" class="cn-table__right">OK</th>
                  <th scope="col" class="cn-table__right">Alertas</th>
                  <th scope="col" class="cn-table__right">Falhas</th>
                  <th scope="col" class="cn-table__right">Duração</th>
                  <th scope="col">Resultado</th>
                  <th scope="col" class="cn-table__right">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="h in historico" :key="h.dataHora">
                  <td class="cn-table__num">{{ h.dataHora }}</td>
                  <td>{{ h.usuario }}</td>
                  <td class="cn-table__right cn-table__num cn-table__ok">{{ h.ok }}</td>
                  <td class="cn-table__right cn-table__num cn-table__alerta">{{ h.alertas }}</td>
                  <td class="cn-table__right cn-table__num cn-table__falha">{{ h.falhas }}</td>
                  <td class="cn-table__right cn-table__num cn-table__dur">{{ h.duracao }}</td>
                  <td>
                    <DssChip
                      :color="vereditos[h.veredito].cor"
                      :icon="vereditos[h.veredito].icone"
                      :label="vereditos[h.veredito].curto"
                      size="xs"
                    />
                  </td>
                  <td class="cn-table__right">
                    <DssButton
                      variant="flat"
                      color="primary"
                      size="xs"
                      icon="description"
                      label="PDF"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </DssMarkupTable>
        </DssCard>

      </template>
    </DssContainer>

    </DssPage>
    </DssPageContainer>
    </DssLayout>
  </div>
</template>

<script setup lang="ts">
/**
 * ==========================================================================
 *  TestCheckinNFAg — Sansys Water · Faturamento › NFAg › Check-in
 * ==========================================================================
 *
 *  Fluxo real do Sansys Water montado sobre o DSS.
 *
 *  FONTES (em ordem de autoridade — Constituição #6):
 *  1. CSS/tokens do DSS e API real dos componentes  → árbitro
 *  2. RF001 Dashboard Configuração NFAg + PRD v1.1  → regra e conteúdo
 *  3. Figma "Check-in de Configuração NFAg"
 *     (node 60818:1664, Base Componentes — Sansys Water) → referência visual
 *
 *  DIVERGÊNCIAS CONHECIDAS — ver relatório de entrega:
 *  · O Figma traz 11 verificações; a spec (PRD §5.3 / RF001) descreve 10.
 *    A 11ª ("Configuração da integração de leitura NFAg") não consta da spec.
 *    Implementada como está no Figma e sinalizada para decisão de produto.
 *  · O protótipo Figma Make usa props que não existem no DSS
 *    (DssBanner tone/title, DssChip outline, DssMarkupTable dense,
 *    DssButton disable, DssTooltip text). Aqui vale a API real.
 *
 *  ==========================================================================
 *  RECONSTRUÇÃO SOBRE OS COMPOSTOS (Bloco 3.1, set/2026)
 *  ==========================================================================
 *
 *  | Era, aqui                                | Virou              |
 *  |------------------------------------------|--------------------|
 *  | `DssHeader`+`DssToolbar`+5 peças soltas  | `DssAppBar`        |
 *  | `.cn-pagehead__title` · `.cn-section__title` | `DssSectionTitle` |
 *  | `.cn-main` (teto, centragem, respiro)    | `DssContainer`     |
 *  | `.cn-sr-only`                            | `.dss-visually-hidden` (utilitária global) |
 *
 *  O `DssPageShell` NÃO foi usado, e a ausência é deliberada: esta tela não
 *  tem rail, e as faixas de trilha e de cabeçalho são full-bleed sobre o fundo
 *  rebaixado — o shell monta coluna única com board dentro. Forçá-lo aqui
 *  seria o risco "composto vira fachada" previsto no plano.
 *
 *  O traço do título de seção segue a MARCA, não o âmbar que estava aqui.
 *  Decisão de produto do Bloco 3.1, registrada em DssSectionTitle.md §4:
 *  `accent="warning"` significaria "esta seção fala de um alerta", o que é
 *  falso nos três títulos desta tela.
 *
 *  A ALTURA DA BARRA CONVERGIU para 40px. Esta tela usava 56px — o default do
 *  DssToolbar, que nunca foi medido em produção. Os 40px são a barra do Sansys
 *  medida no grid master. Duas telas tinham duas alturas por acidente de
 *  default; agora têm uma, por decisão.
 *
 *  Zero valor hardcoded: todo px/cor vem de var(--dss-*).
 */
import { ref, reactive, computed } from 'vue'

import DssBadge         from '@components/base/DssBadge/DssBadge.vue'
import DssBanner        from '@components/base/DssBanner/DssBanner.vue'
import DssBreadcrumbs   from '@components/base/DssBreadcrumbs/DssBreadcrumbs.vue'
import DssBreadcrumbsEl from '@components/base/DssBreadcrumbsEl/DssBreadcrumbsEl.vue'
import DssButton        from '@components/base/DssButton/DssButton.vue'
import DssCard          from '@components/base/DssCard/DssCard.vue'
import { DssCardSection } from '@components/base/DssCard/index'
import DssChip          from '@components/base/DssChip/DssChip.vue'
import DssEmptyState    from '@components/base/DssEmptyState/DssEmptyState.vue'
import DssExpansionItem from '@components/base/DssExpansionItem/DssExpansionItem.vue'
import DssAppBar        from '@components/composed/DssAppBar/DssAppBar.vue'
import DssContainer     from '@components/base/DssContainer/DssContainer.vue'
import DssSectionTitle  from '@components/base/DssSectionTitle/DssSectionTitle.vue'
import DssLayout        from '@components/base/DssLayout/DssLayout.vue'
import DssPage          from '@components/base/DssPage/DssPage.vue'
import DssPageContainer from '@components/base/DssPageContainer/DssPageContainer.vue'
import DssIcon          from '@components/base/DssIcon/DssIcon.vue'
import DssLinearProgress from '@components/base/DssLinearProgress/DssLinearProgress.vue'
import DssMarkupTable   from '@components/base/DssMarkupTable/DssMarkupTable.vue'
import DssTooltip       from '@components/base/DssTooltip/DssTooltip.vue'

// ── Tipos ────────────────────────────────────────────────────────────────
type Situacao   = 'ok' | 'alerta' | 'falha' | 'aguardando' | 'nao-concluida'
type Veredito   = 'apto' | 'apto-alertas' | 'nao-apto'
type EstadoTela = 'pronto' | 'carregando' | 'vazio' | 'erro'
type Filtro     = 'todas' | 'ok' | 'alerta' | 'falha'

interface Achado      { item: string; resultado: string; situacao: Situacao }
interface Verificacao {
  n: number
  titulo: string
  funcionalidade: string
  bloqueia: boolean
  situacao: Situacao
  resumo: string
  descricao: string
  impacto: string
  acao: string
  achados: Achado[]
}
interface Execucao {
  dataHora: string; usuario: string
  ok: number; alertas: number; falhas: number
  duracao: string; veredito: Veredito
}

// ── Estado da tela (§2.5.2) ──────────────────────────────────────────────
const estadosDemo = [
  { id: 'pronto'     as EstadoTela, label: 'Com resultado' },
  { id: 'carregando' as EstadoTela, label: 'Carregando' },
  { id: 'vazio'      as EstadoTela, label: 'Vazio' },
  { id: 'erro'       as EstadoTela, label: 'Erro' },
]
const estado = ref<EstadoTela>('pronto')
const executando = computed(() => estado.value === 'carregando')

// ── Empresa emitente e última execução ───────────────────────────────────
const empresa = {
  nome: 'SAAE Paranaguá',
  cnpj: '76.017.458/0001-15',
  uf: 'PR',
  ibge: '4118204',
}
const ultimaExecucao = { dataHora: '10/09/2026 08:42', usuario: 'ana.fiscal', duracao: '4,0 s' }
const desatualizado = true // RF-13 — resultado com mais de 24 h

// ── As verificações ──────────────────────────────────────────────────────
const verificacoes = ref<Verificacao[]>([
  {
    n: 1,
    titulo: 'Cadastro cClass',
    funcionalidade: 'cClass (Código de Classificação)',
    bloqueia: true,
    situacao: 'ok',
    resumo: '27 códigos ativos · 6 grupos',
    descricao: 'Ao menos um código ativo por grupo usado no faturamento; nenhum código em uso por serviço ativo está inativo; os códigos constam da tabela cClass publicada.',
    impacto: 'Código de classificação ausente ou inativo impede a montagem do item da NFAg.',
    acao: 'Abrir cClass',
    achados: [
      { item: '27 códigos ativos', resultado: '6 grupos cobertos', situacao: 'ok' },
      { item: 'Códigos inativos em uso', resultado: 'nenhum', situacao: 'ok' },
    ],
  },
  {
    n: 2,
    titulo: 'Vínculo cClass × serviços',
    funcionalidade: 'cClass (Código de Classificação) › Código Serviço',
    bloqueia: true,
    situacao: 'falha',
    resumo: '3 serviços ativos sem cClass',
    descricao: 'Todo serviço ativo em tab_servico_definicao precisa de um vínculo ativo em tab_cclass_servico_vinculo, considerando o tipo de faturamento (1-Obrigatório, 2-Opcional, 3-Variável).',
    impacto: 'Serviço faturado sem cClass gera item sem classificação → rejeição da NFAg inteira. Bloqueia a emissão.',
    acao: 'Abrir vínculo de serviços',
    achados: [
      { item: 'Religação de água',       resultado: '1-Obrigatório · sem cClass', situacao: 'falha' },
      { item: 'Aferição de hidrômetro',  resultado: '2-Opcional · sem cClass',    situacao: 'falha' },
      { item: 'Taxa de vistoria',        resultado: '3-Variável · sem cClass',    situacao: 'falha' },
      { item: 'Demais 41 serviços ativos', resultado: 'vinculados',               situacao: 'ok'    },
    ],
  },
  {
    n: 3,
    titulo: 'CST + cClassTrib',
    funcionalidade: 'Tabela Tarifária Regras Impostos › Opção CST / CCLASSTRIB',
    bloqueia: true,
    situacao: 'ok',
    resumo: '11 cClassTrib ativos · todos com CST',
    descricao: 'Cada cClassTrib ativo tem CST ativo vinculado e as regras ativas referenciam cClassTrib e CST ativos, conforme a tabela nacional aplicável à NFAg.',
    impacto: 'Grupo IBSCBS incompleto reprova o item na validação de schema da SVRS.',
    acao: 'Abrir CST / cClassTrib',
    achados: [
      { item: '11 cClassTrib ativos', resultado: 'todos com CST ativo', situacao: 'ok' },
    ],
  },
  {
    n: 4,
    titulo: 'Cadastro de impostos',
    funcionalidade: 'Tabela Tarifária Regras Impostos › Opção Gerenciar Alíquotas',
    bloqueia: true,
    situacao: 'ok',
    resumo: '7 impostos ativos',
    descricao: 'IBS E (estadual), IBS M (municipal) e CBS existem e estão ativos. PIS/COFINS e variantes de alíquota reduzida são opcionais e apenas listados.',
    impacto: 'Imposto obrigatório ausente impede o cálculo do grupo IBSCBS.',
    acao: 'Abrir cadastro de impostos',
    achados: [
      { item: 'IBS E · IBS M · CBS', resultado: 'ativos',                situacao: 'ok' },
      { item: 'PIS / COFINS',        resultado: '4 registros opcionais', situacao: 'ok' },
    ],
  },
  {
    n: 5,
    titulo: 'Cadastros básicos NFAg',
    funcionalidade: 'Tabela Básica e Cadastrar Tipos de Substituição',
    bloqueia: true,
    situacao: 'ok',
    resumo: '13 origens · 8 motivos',
    descricao: 'Origem de consumo e motivo de substituição com registros ativos; toda origem usada em fat_nfag_item nos últimos 3 meses continua ativa.',
    impacto: 'Origem de consumo inativa em uso quebra a montagem do grupo gCons.',
    acao: 'Abrir tabela básica',
    achados: [
      { item: '13 origens de consumo',  resultado: 'ativas', situacao: 'ok' },
      { item: '8 motivos de substituição', resultado: 'ativos', situacao: 'ok' },
    ],
  },
  {
    n: 6,
    titulo: 'Vínculos básicos · campos obrigatórios',
    funcionalidade: 'Ocorrência de Leitura, Município, Estado, Tabela Básica',
    bloqueia: false,
    situacao: 'alerta',
    resumo: '2 municípios e 1 ocorrência sem vínculo',
    descricao: 'Ocorrências ativas com motivo de não leitura; municípios com unidades ativas e código IBGE; 27 UFs com código IBGE; empresa emitente com município IBGE.',
    impacto: 'Emitente sem IBGE bloqueia. Os demais vínculos geram alerta e podem reprovar itens isolados.',
    acao: 'Abrir cadastro de municípios',
    achados: [
      { item: 'Município 4118204 (emitente)', resultado: 'IBGE preenchido',  situacao: 'ok'     },
      { item: 'Município 4119905',            resultado: 'sem código IBGE',  situacao: 'alerta' },
      { item: 'Município 4104204',            resultado: 'sem código IBGE',  situacao: 'alerta' },
      { item: 'Ocorrência “Portão fechado”',  resultado: 'sem motivo de não leitura', situacao: 'alerta' },
    ],
  },
  {
    n: 7,
    titulo: 'Vínculos para substituição / alteração',
    funcionalidade: 'Motivo Tipo Alteração de Fatura',
    bloqueia: false,
    situacao: 'ok',
    resumo: '18 motivos vinculados',
    descricao: 'Todo motivo ativo aponta para um motivo de substituição NFAg ativo (finNFAg 3 com grupo gSub).',
    impacto: 'Motivo sem vínculo impede a emissão da nota de substituição.',
    acao: 'Abrir motivos de alteração',
    achados: [
      { item: '18 motivos ativos', resultado: 'todos vinculados', situacao: 'ok' },
    ],
  },
  {
    n: 8,
    titulo: 'Faturamento e emissão de fatura',
    funcionalidade: 'Categoria Tipo Tarifa e Parametrização Sistema',
    bloqueia: true,
    situacao: 'ok',
    resumo: 'Layout 105 · 6 categorias vinculadas',
    descricao: 'Toda categoria ativa tem tipo NFAg padrão e o layout de impressão simultânea está em {104, 105, 106}.',
    impacto: 'Layout fora da lista impede a impressão simultânea da fatura com a NFAg.',
    acao: 'Abrir parametrização do sistema',
    achados: [
      { item: 'CD_LAYOUT_GRADE_IMPRESSAO_SIMULTANEA', resultado: '105 · válido', situacao: 'ok' },
      { item: '6 categorias de tarifa',               resultado: 'com tipo NFAg', situacao: 'ok' },
    ],
  },
  {
    n: 9,
    titulo: 'Tabela tarifária de impostos / regras',
    funcionalidade: 'Tabela Tarifária Regras Impostos › Opção VIGÊNCIA REGRA IMPOSTOS',
    bloqueia: true,
    situacao: 'ok',
    resumo: 'Vigência 2026 · 14 regras ativas',
    descricao: 'Tabela vigente na data atual; alíquotas conferem com as do ano; regras ativas têm serviço, cClassTrib e CST.',
    impacto: 'Tabela vencida ou alíquota divergente reprova o cálculo de IBS/CBS.',
    acao: 'Abrir vigência de regras',
    achados: [
      { item: 'Vigência da tabela', resultado: '01/01/2026 a 31/12/2026', situacao: 'ok' },
      { item: 'IBS UF 0,10 % · IBS Mun 0,00 % · CBS 0,90 %', resultado: 'conferem com NT 2026.002 RTC', situacao: 'ok' },
    ],
  },
  {
    n: 10,
    titulo: 'Configuração de mensagens',
    funcionalidade: 'Mensagem Diversas na Fatura',
    bloqueia: false,
    situacao: 'ok',
    resumo: '4 mensagens · 12 variáveis',
    descricao: 'Ao menos uma mensagem ativa e toda variável referenciada em mensagens ativas existe e está ativa.',
    impacto: 'Variável inexistente sai literal no corpo da fatura.',
    acao: 'Abrir mensagens da fatura',
    achados: [
      { item: '4 mensagens ativas', resultado: '12 variáveis resolvidas', situacao: 'ok' },
    ],
  },
  {
    // ATENÇÃO: presente no Figma, ausente do PRD §5.3 e do RF001 (que descrevem 10).
    n: 11,
    titulo: 'Configuração da integração de leitura NFAg',
    funcionalidade: 'Parametrização Sistema › Configuração da API de Leitura NFAg',
    bloqueia: true,
    situacao: 'alerta',
    resumo: 'credenciais não informadas',
    descricao: 'Endpoint, credenciais e certificado da API de leitura da NFAg configurados na parametrização do sistema.',
    impacto: 'Sem credenciais a leitura de retorno da SVRS não é feita automaticamente.',
    acao: 'Abrir parametrização da API',
    achados: [
      { item: 'Endpoint',    resultado: 'configurado',     situacao: 'ok'     },
      { item: 'Credenciais', resultado: 'não informadas',  situacao: 'alerta' },
    ],
  },
])

// ── Accordion ────────────────────────────────────────────────────────────
const abertos = reactive<Record<number, boolean>>(
  // RF-06: verificações com falha abrem automaticamente
  Object.fromEntries(verificacoes.value.map(c => [c.n, c.situacao === 'falha'])),
)
function expandirTudo(abrir: boolean) {
  verificacoes.value.forEach(c => { abertos[c.n] = abrir })
}

// ── Filtro (RF-05) ───────────────────────────────────────────────────────
const filtro = ref<Filtro>('todas')
const rotulosFiltro: Record<Filtro, string> = {
  todas: 'Todas', ok: 'Somente OK', alerta: 'Somente alertas', falha: 'Somente falhas',
}
const rotuloFiltro = computed(() => rotulosFiltro[filtro.value])
const verificacoesFiltradas = computed(() =>
  filtro.value === 'todas'
    ? verificacoes.value
    : verificacoes.value.filter(c => c.situacao === filtro.value),
)

// ── Contagens e veredito (RF-05 / §5.4) ──────────────────────────────────
const contagem = computed(() => ({
  total:  verificacoes.value.length,
  ok:     verificacoes.value.filter(c => c.situacao === 'ok').length,
  alerta: verificacoes.value.filter(c => c.situacao === 'alerta').length,
  falha:  verificacoes.value.filter(c => c.situacao === 'falha').length,
}))

const bloqueantes = computed(() =>
  verificacoes.value.filter(c => c.bloqueia && c.situacao === 'falha'),
)

const vereditos: Record<Veredito, {
  rotulo: string; curto: string; cor: 'positive' | 'warning' | 'negative'
  icone: string; progresso: 'success' | 'warning' | 'error'
}> = {
  'apto':         { rotulo: 'Apto para emissão',     curto: 'Apto',           cor: 'positive', icone: 'check_circle', progresso: 'success' },
  'apto-alertas': { rotulo: 'Apto com alertas',      curto: 'Apto c/ alertas', cor: 'warning',  icone: 'warning',      progresso: 'warning' },
  'nao-apto':     { rotulo: 'Não apto para emissão', curto: 'Não apto',        cor: 'negative', icone: 'error',        progresso: 'error'   },
}

const veredito = computed(() => {
  if (bloqueantes.value.length) return vereditos['nao-apto']
  if (contagem.value.alerta || contagem.value.falha) return vereditos['apto-alertas']
  return vereditos['apto']
})

// ── Tiles ────────────────────────────────────────────────────────────────
const tiles = computed(() => [
  { id: 'todas'  as Filtro, label: 'Verificações', valor: contagem.value.total,  icone: 'assignment',   cor: null,         tom: 'neutro',   hint: '' },
  { id: 'ok'     as Filtro, label: 'OK',           valor: contagem.value.ok,     icone: 'check_circle', cor: 'positive' as const, tom: 'positivo', hint: '' },
  { id: 'alerta' as Filtro, label: 'Alertas',      valor: contagem.value.alerta, icone: 'warning',      cor: 'warning'  as const, tom: 'alerta',   hint: '' },
  {
    id: 'falha' as Filtro, label: 'Falhas', valor: contagem.value.falha,
    icone: 'cancel', cor: 'negative' as const, tom: 'negativo',
    hint: bloqueantes.value.length ? `${bloqueantes.value.length} bloqueiam a emissão` : '',
  },
])

// ── Progresso ────────────────────────────────────────────────────────────
const concluidas = ref(verificacoes.value.length)
const progresso = computed(() => concluidas.value / verificacoes.value.length)

const legendaProgresso = computed(() => {
  if (executando.value) {
    return `Executando verificação ${Math.min(concluidas.value + 1, contagem.value.total)} de ${contagem.value.total}…`
  }
  const c = contagem.value
  return `${c.ok} de ${c.total} verificações OK · ${c.alerta} alerta · ${c.falha} falha · duração ${ultimaExecucao.duracao} · resultado válido por 24 h`
})

// ── Histórico (RF-10) ────────────────────────────────────────────────────
const historico = ref<Execucao[]>([
  { dataHora: '10/09/2026 08:42', usuario: 'ana.fiscal',    ok: 8,  alertas: 1, falhas: 1, duracao: '4,1 s', veredito: 'nao-apto' },
  { dataHora: '09/09/2026 17:30', usuario: 'ana.fiscal',    ok: 7,  alertas: 1, falhas: 2, duracao: '4,4 s', veredito: 'nao-apto' },
  { dataHora: '08/09/2026 09:05', usuario: 'suporte.jtech', ok: 7,  alertas: 2, falhas: 1, duracao: '3,9 s', veredito: 'nao-apto' },
  { dataHora: '01/09/2026 08:10', usuario: 'carlos.fat',    ok: 10, alertas: 0, falhas: 0, duracao: '3,7 s', veredito: 'apto' },
  { dataHora: '25/08/2026 14:52', usuario: 'carlos.fat',    ok: 9,  alertas: 1, falhas: 0, duracao: '3,8 s', veredito: 'apto-alertas' },
])

// ── Execução (RF-02: assíncrona, progresso ao vivo) ──────────────────────
let timer: ReturnType<typeof setInterval> | null = null
function executarVerificacao() {
  if (executando.value) return
  estado.value = 'carregando'
  concluidas.value = 0
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    concluidas.value += 1
    if (concluidas.value >= verificacoes.value.length) {
      if (timer) clearInterval(timer)
      timer = null
      estado.value = 'pronto'
    }
  }, 320)
}

// ── Vocabulário de situação ──────────────────────────────────────────────
const situacoes: Record<Situacao, { rotulo: string; cor: 'positive' | 'warning' | 'negative' | 'neutral'; icone: string }> = {
  'ok':            { rotulo: 'OK',             cor: 'positive', icone: 'check_circle' },
  'alerta':        { rotulo: 'Alerta',         cor: 'warning',  icone: 'warning' },
  'falha':         { rotulo: 'Falha',          cor: 'negative', icone: 'cancel' },
  'aguardando':    { rotulo: 'Aguardando',     cor: 'neutral',  icone: 'schedule' },
  'nao-concluida': { rotulo: 'Não concluída',  cor: 'warning',  icone: 'timer_off' },
}
const rotuloSituacao = (s: Situacao) => situacoes[s].rotulo
const corSituacao    = (s: Situacao) => situacoes[s].cor
const iconeSituacao  = (s: Situacao) => situacoes[s].icone
</script>

<style lang="scss" scoped>
// ==========================================================================
//  TestCheckinNFAg — Check-in de Configuração NFAg
//  Zero hardcode: toda cor, medida, raio e sombra vem de var(--dss-*).
// ==========================================================================

// ── Raiz ──────────────────────────────────────────────────────────────────
.cn-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--dss-text-body);
  font-family: var(--dss-font-family-sans);
  font-size: var(--dss-font-size-sm);
}

.cn-layout {
  flex: 1;
  min-height: 0;
}

.cn-content {
  background: var(--dss-surface-muted);
}

// ── Faixa de sandbox (não faz parte da tela) ─────────────────────────────
.cn-devbar {
  display: flex;
  align-items: center;
  gap: var(--dss-spacing-2);
  padding: var(--dss-spacing-1) var(--dss-spacing-5);
  background: var(--dss-surface-subtle);
  border-bottom: var(--dss-border-width-thin) dashed var(--dss-border-default);

  &__label {
    font-size: var(--dss-font-size-xs);
    text-transform: uppercase;
    letter-spacing: var(--dss-letter-spacing-wide);
    color: var(--dss-text-subtle);
    font-weight: var(--dss-font-weight-semibold);
  }
}

// ── Breadcrumbs ───────────────────────────────────────────────────────────
.cn-crumbs {
  flex-shrink: 0;
  padding: var(--dss-spacing-2) var(--dss-spacing-5);
  background: var(--dss-surface-default);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);
  font-size: var(--dss-font-size-xs);
}

// ── Cabeçalho da página ───────────────────────────────────────────────────
.cn-pagehead {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--dss-spacing-4);
  flex-wrap: wrap;
  padding: var(--dss-spacing-2) var(--dss-spacing-5);
  background: var(--dss-surface-default);
  border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--dss-spacing-2);
    flex-wrap: wrap;
  }

  &__tutorial {
    color: var(--dss-text-subtle);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────
// Teto de largura, centragem, respiro e ritmo vertical são do `DssContainer`
// (`size="lg"` · `padding="sm"` · `gap="md"`). O que sobrou é desta tela: o
// rodapé alto, que existe para a última seção não colar no fim da viewport.
.cn-main {
  flex: 1;
  padding-bottom: var(--dss-spacing-16);
}

// ── Utilitários ───────────────────────────────────────────────────────────
.cn-eyebrow {
  display: block;
  font-size: var(--dss-font-size-xs);
  text-transform: uppercase;
  letter-spacing: var(--dss-letter-spacing-wide);
  color: var(--dss-text-subtle);
  font-weight: var(--dss-font-weight-semibold);
}

// `.cn-sr-only` saiu: `.dss-visually-hidden` é utilitária GLOBAL do DSS
// (utils/_helpers.scss) e já estava carregada — a página reimplementava o que
// o sistema oferecia.

.cn-card {
  background: var(--dss-surface-default);
}

.cn-empty {
  display: flex;
  justify-content: center;
  padding: var(--dss-spacing-8) var(--dss-spacing-4);
}

// ── Banners ───────────────────────────────────────────────────────────────
.cn-banner {
  &__title {
    display: block;
    font-weight: var(--dss-font-weight-semibold);
    margin-bottom: var(--dss-spacing-1);
  }

  &__text {
    display: block;
    font-size: var(--dss-font-size-sm);
  }

  &--inline {
    margin-top: var(--dss-spacing-3);
  }
}

// ── Card de resultado ─────────────────────────────────────────────────────
.cn-result {
  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--dss-spacing-4);
    flex-wrap: wrap;
  }

  &__ident {
    flex: 1 1 var(--dss-spacing-96);
    min-width: 0;
  }

  &__title {
    margin: var(--dss-spacing-1) var(--dss-spacing-0) var(--dss-spacing-1);
    font-size: var(--dss-font-size-md);
    font-weight: var(--dss-font-weight-semibold);
    line-height: var(--dss-line-height-tight);
  }

  &__meta {
    margin: var(--dss-spacing-0);
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-subtle);
  }

  &__verdict { flex-shrink: 0; }
}

// ── Tiles de KPI (compostos — não usam a fixture DssDataCard) ────────────
.cn-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--dss-spacing-36), 1fr));
  gap: var(--dss-spacing-2);
  margin-top: var(--dss-spacing-4);
}

.cn-tile {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-1);
  min-height: var(--dss-touch-target-lg);
  padding: var(--dss-spacing-3) var(--dss-spacing-4);
  background: var(--dss-surface-default);
  border: var(--dss-border-width-thin) solid var(--dss-border-default);
  border-radius: var(--dss-radius-md);
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: background-color var(--dss-duration-fast) var(--dss-easing-standard),
              border-color var(--dss-duration-fast) var(--dss-easing-standard);

  &:hover { background: var(--dss-surface-hover); }

  &:focus-visible {
    outline: var(--dss-border-width-md) solid var(--dss-border-focus);
    outline-offset: var(--dss-spacing-px);
  }

  &--selected {
    background: var(--dss-surface-selected);
    border-color: var(--dss-border-selected);
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--dss-spacing-2);
  }

  &__label {
    font-size: var(--dss-font-size-xs);
    text-transform: uppercase;
    letter-spacing: var(--dss-letter-spacing-wide);
    color: var(--dss-text-subtle);
    font-weight: var(--dss-font-weight-semibold);
  }

  &__value {
    font-size: var(--dss-font-size-2xl);
    font-weight: var(--dss-font-weight-semibold);
    line-height: var(--dss-line-height-tight);
    font-variant-numeric: tabular-nums;

    &--neutro   { color: var(--dss-text-body); }
    &--positivo { color: var(--dss-feedback-success-deep); }
    &--alerta   { color: var(--dss-feedback-warning-deep); }
    &--negativo { color: var(--dss-feedback-error-deep); }
  }

  &__hint {
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-subtle);
  }
}

// ── Progresso ─────────────────────────────────────────────────────────────
.cn-progress {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);
  margin-top: var(--dss-spacing-4);

  &__caption {
    margin: var(--dss-spacing-0);
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-subtle);
  }
}

// ── Cabeçalho de seção ────────────────────────────────────────────────────
.cn-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--dss-spacing-3);
  flex-wrap: wrap;
  margin-top: var(--dss-spacing-2);

  &__left,
  &__right {
    display: flex;
    align-items: center;
    gap: var(--dss-spacing-2);
    flex-wrap: wrap;
  }

  &__note {
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-subtle);
  }
}

// ── Lista de verificações ─────────────────────────────────────────────────
.cn-card--checks {
  padding: var(--dss-spacing-2);
}

.cn-checks {
  list-style: none;
  margin: var(--dss-spacing-0);
  padding: var(--dss-spacing-0);
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-2);

  &__item { min-width: 0; }
}

.cn-check {
  border-radius: var(--dss-radius-md);
  overflow: hidden;
  border: var(--dss-border-width-thin) solid var(--dss-border-subtle);

  &__header {
    display: grid;
    grid-template-columns: var(--dss-spacing-7) minmax(0, 1fr) minmax(0, auto);
    align-items: center;
    gap: var(--dss-spacing-3);
    width: 100%;
    min-width: 0;
  }

  &__num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--dss-spacing-7);
    height: var(--dss-spacing-7);
    border-radius: var(--dss-radius-circle);
    font-size: var(--dss-font-size-xs);
    font-weight: var(--dss-font-weight-bold);
    color: var(--dss-text-inverse);
    font-variant-numeric: tabular-nums;

    &--ok     { background: var(--dss-feedback-success); }
    &--alerta { background: var(--dss-feedback-warning); }
    &--falha  { background: var(--dss-feedback-error); }
    &--aguardando,
    &--nao-concluida { background: var(--dss-border-gray-500); }
  }

  &__ident {
    display: flex;
    flex-direction: column;
    gap: var(--dss-spacing-px);
    min-width: 0;
  }

  &__line {
    display: flex;
    align-items: center;
    gap: var(--dss-spacing-2);
    flex-wrap: wrap;
  }

  &__title {
    font-weight: var(--dss-font-weight-semibold);
    color: var(--dss-text-body);
  }

  &__block {
    font-size: var(--dss-font-size-xs);
    text-transform: uppercase;
    letter-spacing: var(--dss-letter-spacing-wide);
    font-weight: var(--dss-font-weight-semibold);
    color: var(--dss-feedback-error-deep);
  }

  &__func {
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-subtle);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__aside {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--dss-spacing-3);
    flex-wrap: wrap;
  }

  &__summary {
    font-size: var(--dss-font-size-xs);
    color: var(--dss-text-subtle);
    text-align: right;
  }
}

// ── Painel expandido ──────────────────────────────────────────────────────
.cn-panel {
  display: flex;
  flex-direction: column;
  gap: var(--dss-spacing-3);
  padding: var(--dss-spacing-4) var(--dss-spacing-5) var(--dss-spacing-5);
  background: var(--dss-surface-subtle);

  &__cols {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--dss-spacing-64), 1fr));
    gap: var(--dss-spacing-4);
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: var(--dss-spacing-1);
  }

  &__text {
    margin: var(--dss-spacing-0);
    font-size: var(--dss-font-size-sm);
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}

// ── Tabelas ───────────────────────────────────────────────────────────────
.cn-table {
  border-radius: var(--dss-radius-sm);
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead th {
    background: var(--dss-action-primary);
    color: var(--dss-text-inverse);
    font-size: var(--dss-font-size-xs);
    text-transform: uppercase;
    letter-spacing: var(--dss-letter-spacing-wide);
    font-weight: var(--dss-font-weight-semibold);
    text-align: left;
    padding: var(--dss-spacing-2) var(--dss-spacing-3);
    white-space: nowrap;
  }

  tbody td {
    padding: var(--dss-spacing-2) var(--dss-spacing-3);
    border-bottom: var(--dss-border-width-thin) solid var(--dss-border-subtle);
    vertical-align: middle;
  }

  tbody tr:last-child td { border-bottom: none; }

  &__right { text-align: right; }

  &__num { font-variant-numeric: tabular-nums; }

  &__ok     { color: var(--dss-feedback-success-deep); font-weight: var(--dss-font-weight-semibold); }
  &__alerta { color: var(--dss-feedback-warning-deep); font-weight: var(--dss-font-weight-semibold); }
  &__falha  { color: var(--dss-feedback-error-deep);   font-weight: var(--dss-font-weight-semibold); }
  &__dur    { color: var(--dss-text-subtle); }
}

// ── Responsividade (§2.5.5) ───────────────────────────────────────────────
@media (max-width: 1023px) {
  .cn-check__header {
    grid-template-columns: var(--dss-spacing-7) minmax(0, 1fr);
  }

  .cn-check__aside {
    grid-column: 2;
    justify-content: flex-start;
  }

  .cn-check__summary { text-align: left; }

  .cn-table--hist {
    overflow-x: auto;

    table { min-width: var(--dss-container-md); }
  }
}
</style>
