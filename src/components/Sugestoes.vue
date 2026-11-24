<script setup>
import { sugestoes, categoriaPorId, adicionarSugestao } from '../composables/useLista'
</script>

<template>
  <div v-if="sugestoes.length" class="sugestoes">
    <p>Você costuma comprar também:</p>
    <div class="chip-lista">
      <button v-for="s in sugestoes" :key="s.nome + s.cat" class="chip" @click="adicionarSugestao(s)">
        ＋ {{ categoriaPorId(s.cat)?.icone ?? '🗂️' }} {{ s.nome }}
      </button>
    </div>
  </div>
</template>
