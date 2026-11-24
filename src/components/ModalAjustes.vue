<script setup>
import { ref } from 'vue'
import AbaCategorias from './AbaCategorias.vue'
import AbaSync from './AbaSync.vue'
import AbaNotif from './AbaNotif.vue'

// v-model:aberto vindo do App.vue
const aberto = defineModel('aberto', { type: Boolean, default: false })

const aba = ref('categorias')
const abas = [
  ['categorias', 'Categorias'],
  ['sync', 'Sincronizar'],
  ['notif', 'Notificações'],
]
</script>

<template>
  <!-- v-if: o modal é criado do zero a cada abertura, então os status sempre aparecem atualizados -->
  <div v-if="aberto" class="overlay aberto" @click.self="aberto = false">
    <div class="modal">
      <div class="modal-header">
        <h2 class="serif">Ajustes</h2>
        <button class="modal-fechar" @click="aberto = false">✕</button>
      </div>

      <div class="abas">
        <button
          v-for="[id, rotulo] in abas"
          :key="id"
          class="aba-btn"
          :class="{ ativa: aba === id }"
          @click="aba = id"
        >
          {{ rotulo }}
        </button>
      </div>

      <AbaCategorias v-if="aba === 'categorias'" />
      <AbaSync v-else-if="aba === 'sync'" />
      <AbaNotif v-else />
    </div>
  </div>
</template>
