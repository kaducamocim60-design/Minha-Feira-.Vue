<script setup>
import { busca, filtro } from '../composables/useLista'

const opcoes = [
  ['todos', 'Tudo'],
  ['pendentes', 'Pendentes'],
  ['comprados', 'Comprados'],
]
</script>

<template>
  <div class="busca-filtros">
    <div class="busca">
      <span>🔍</span>
      <input v-model="busca" type="text" placeholder="Buscar item…" />
    </div>
    <div class="filtros">
      <button
        v-for="[valor, rotulo] in opcoes"
        :key="valor"
        class="filtro-btn"
        :class="{ ativo: filtro === valor }"
        @click="filtro = valor"
      >
        {{ rotulo }}
      </button>
    </div>
  </div>
</template>
