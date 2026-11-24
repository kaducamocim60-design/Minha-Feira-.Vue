<script setup>
import { computed, ref } from 'vue'
import ItemRow from './ItemRow.vue'
import {
  itens,
  itensDaCategoria,
  toggleItem,
  removerItem,
  marcarTodosCategoria,
} from '../composables/useLista'

const props = defineProps({
  cat: { type: Object, required: true },
})

const colapsada = ref(false)
const visiveis = computed(() => itensDaCategoria(props.cat.id))
const totalCat = computed(() => itens.value.filter((i) => i.cat === props.cat.id).length)
const feitosCat = computed(() => itens.value.filter((i) => i.cat === props.cat.id && i.feito).length)
</script>

<template>
  <section class="categoria">
    <div class="cat-header" :style="{ background: cat.cor }" @click="colapsada = !colapsada">
      <div class="cat-header-left">
        <div class="cat-icone">{{ cat.icone }}</div>
        <span class="cat-nome serif">{{ cat.nome }}</span>
        <span class="cat-contagem mono">{{ feitosCat }}/{{ totalCat }}</span>
      </div>
      <div class="cat-header-right">
        <button class="cat-marcar-tudo" @click.stop="marcarTodosCategoria(cat.id)">✓ tudo</button>
        <span class="chevron" :class="{ fechado: colapsada }">▾</span>
      </div>
    </div>

    <div v-if="!colapsada">
      <p v-if="!visiveis.length" class="vazio-cat">Nenhum item aqui ainda.</p>
      <template v-else>
        <ItemRow
          v-for="item in visiveis"
          :key="item.id"
          :item="item"
          :cor="cat.cor"
          @toggle="toggleItem(item.id)"
          @remover="removerItem(item.id)"
        />
      </template>
    </div>
  </section>
</template>
