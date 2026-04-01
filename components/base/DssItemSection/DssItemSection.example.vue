<template>
  <div class="dss-example-item-section">

    <!-- ================================================================
         CENÁRIO 1: Básico — Seção principal com texto simples
         ================================================================ -->
    <section>
      <h3>1. Básico — Seção principal</h3>
      <q-list bordered>
        <DssItem>
          <DssItemSection>
            <span>Item de lista com seção principal padrão</span>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection>
            <span>Segundo item com conteúdo textual</span>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection>
            <span>Terceiro item na lista</span>
          </DssItemSection>
        </DssItem>
      </q-list>
    </section>

    <!-- ================================================================
         CENÁRIO 2: Com Avatar — Seção leading + principal
         ================================================================ -->
    <section>
      <h3>2. Com Avatar (prop avatar)</h3>
      <q-list bordered>
        <DssItem>
          <DssItemSection avatar>
            <DssAvatar color="primary" icon="person" />
          </DssItemSection>
          <DssItemSection>
            <div>Ana Silva</div>
            <div class="text-caption">Administradora</div>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection avatar>
            <DssAvatar color="secondary" icon="engineering" />
          </DssItemSection>
          <DssItemSection>
            <div>Bruno Souza</div>
            <div class="text-caption">Desenvolvedor</div>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection avatar>
            <DssAvatar color="accent" icon="support_agent" />
          </DssItemSection>
          <DssItemSection>
            <div>Carla Mendes</div>
            <div class="text-caption">Suporte</div>
          </DssItemSection>
        </DssItem>
      </q-list>
    </section>

    <!-- ================================================================
         CENÁRIO 3: Ação Secundária — Seção principal + side com ação
         ================================================================ -->
    <section>
      <h3>3. Ação Secundária (prop side)</h3>
      <q-list bordered>
        <DssItem clickable>
          <DssItemSection>
            <div>Configurações do Perfil</div>
          </DssItemSection>
          <DssItemSection side>
            <DssIcon name="chevron_right" />
          </DssItemSection>
        </DssItem>
        <DssItem clickable>
          <DssItemSection>
            <div>Notificações</div>
          </DssItemSection>
          <DssItemSection side>
            <DssBadge color="negative" label="3" />
          </DssItemSection>
        </DssItem>
        <DssItem clickable>
          <DssItemSection>
            <div>Modo Escuro</div>
          </DssItemSection>
          <DssItemSection side>
            <DssToggle :model-value="darkMode" @update:model-value="darkMode = $event" />
          </DssItemSection>
        </DssItem>
      </q-list>
    </section>

    <!-- ================================================================
         CENÁRIO 4: Alinhamento ao Topo (prop top) — Item multi-linha
         ================================================================ -->
    <section>
      <h3>4. Alinhamento ao Topo (prop top)</h3>
      <q-list bordered>
        <DssItem>
          <DssItemSection avatar top>
            <DssAvatar color="primary" icon="article" />
          </DssItemSection>
          <DssItemSection>
            <div>Documentação de Instalação do Sistema</div>
            <div class="text-caption">
              Guia completo de instalação e configuração inicial do sistema Sansys.
              Inclui pré-requisitos, dependências e resolução de problemas comuns.
            </div>
          </DssItemSection>
          <DssItemSection side top>
            <div class="text-caption">há 2 dias</div>
          </DssItemSection>
        </DssItem>
        <DssItem>
          <DssItemSection avatar top>
            <DssAvatar color="secondary" icon="settings" />
          </DssItemSection>
          <DssItemSection>
            <div>Configurações Avançadas de Rede</div>
            <div class="text-caption">
              Parâmetros de configuração para ambientes corporativos com proxy,
              VPN e certificados customizados.
            </div>
          </DssItemSection>
          <DssItemSection side top>
            <div class="text-caption">há 5 dias</div>
          </DssItemSection>
        </DssItem>
      </q-list>
    </section>

    <!-- ================================================================
         CENÁRIO 5: noWrap — Texto longo sem quebra de linha
         ================================================================ -->
    <section>
      <h3>5. Sem Quebra de Linha (prop noWrap)</h3>
      <q-list bordered style="max-width: 400px">
        <DssItem>
          <DssItemSection no-wrap>
            <span>Este é um texto bastante longo que seria truncado sem a prop noWrap ativa aqui</span>
          </DssItemSection>
          <DssItemSection side>
            <DssIcon name="info" />
          </DssItemSection>
        </DssItem>
      </q-list>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DssItemSection from './DssItemSection.vue'
import DssItem from '../DssItem/DssItem.vue'
import DssAvatar from '../DssAvatar/DssAvatar.vue'
import DssIcon from '../DssIcon/DssIcon.vue'
import DssBadge from '../DssBadge/DssBadge.vue'
import DssToggle from '../DssToggle/DssToggle.vue'

const darkMode = ref(false)
</script>
