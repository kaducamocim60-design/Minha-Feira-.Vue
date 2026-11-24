<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import FormAdicionar from './components/FormAdicionar.vue'
import Sugestoes from './components/Sugestoes.vue'
import BuscaFiltros from './components/BuscaFiltros.vue'
import CategoriaCard from './components/CategoriaCard.vue'
import RodapeAcoes from './components/RodapeAcoes.vue'
import ModalAjustes from './components/ModalAjustes.vue'
import { categoriasVisiveis, pendentes } from './composables/useLista'
import { tentarReconectarSalvo } from './composables/useSync'
import { verificarNotificacaoSexta } from './composables/useNotificacao'
import './composables/useTema' // só precisa ser carregado para aplicar o tema

const ajustesAberto = ref(false)

// contador no título da aba: "(5) Minha Feira"
watchEffect(() => {
  document.title = (pendentes.value > 0 ? `(${pendentes.value}) ` : '') + 'Minha Feira'
})

onMounted(() => {
  tentarReconectarSalvo()
  verificarNotificacaoSexta()
})
</script>

<template>
  <AppHeader @abrir-ajustes="ajustesAberto = true" />

  <main>
    <FormAdicionar />
    <Sugestoes />
    <BuscaFiltros />

    <div class="categorias">
      <CategoriaCard v-for="cat in categoriasVisiveis" :key="cat.id" :cat="cat" />
    </div>

    <RodapeAcoes />
  </main>

  <ModalAjustes v-model:aberto="ajustesAberto" />
</template>
