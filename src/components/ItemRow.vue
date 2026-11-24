<script setup>
import { formatarMoeda } from '../utils'

defineProps({
  item: { type: Object, required: true },
  cor: { type: String, default: '#4C7A3F' },
})
defineEmits(['toggle', 'remover'])
</script>

<template>
  <div class="item-row">
    <button
      class="check"
      :style="{ borderColor: item.feito ? cor : '#C9BE9E', background: item.feito ? cor : 'transparent' }"
      @click="$emit('toggle')"
    >
      {{ item.feito ? '✓' : '' }}
    </button>
    <span
      class="item-nome"
      :style="item.feito ? { textDecoration: 'line-through', color: 'var(--apagado)' } : null"
    >{{ item.nome }}</span>
    <span v-if="item.qtd" class="item-qtd">{{ item.qtd }}</span>
    <span v-if="typeof item.preco === 'number'" class="item-preco">{{ formatarMoeda(item.preco) }}</span>
    <button class="item-remover" @click="$emit('remover')">✕</button>
  </div>
</template>
