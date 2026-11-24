<script setup>
import { tema, alternarTema } from '../composables/useTema'
import { totalItens, feitos, progresso, totalEstimado, estadoSalvamento } from '../composables/useLista'
import { formatarMoeda } from '../utils'

defineEmits(['abrir-ajustes'])
</script>

<template>
  <header>
    <div class="wrap">
      <div class="head-top">
        <div>
          <p class="eyebrow">lista de compras da casa</p>
          <h1 class="serif">Minha Feira</h1>
        </div>
        <div>
          <div class="head-botoes">
            <button class="icon-btn" title="Alternar modo claro/escuro" @click="alternarTema">
              {{ tema === 'dark' ? '☀️' : '🌙' }}
            </button>
            <button class="icon-btn" title="Ajustes" @click="$emit('abrir-ajustes')">⚙️</button>
          </div>
          <p id="save-state" class="mono">{{ estadoSalvamento }}</p>
        </div>
      </div>

      <div class="barra-wrap">
        <div class="barra-info">
          <span>{{ feitos }} de {{ totalItens }} itens na cesta</span>
          <span class="mono" style="font-weight: 700">{{ progresso }}%</span>
        </div>
        <div class="barra-fundo">
          <div class="barra-preenchida" :style="{ width: progresso + '%' }"></div>
        </div>
        <p id="total-estimado" class="mono">
          <template v-if="totalEstimado > 0">
            Total estimado dos itens pendentes: {{ formatarMoeda(totalEstimado) }}
          </template>
        </p>
      </div>
    </div>
  </header>
</template>
