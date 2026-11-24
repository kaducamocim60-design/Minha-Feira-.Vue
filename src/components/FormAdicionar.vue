<script setup>
import { ref, watch } from 'vue'
import { categoriasAtuais, adicionarItem } from '../composables/useLista'

const nome = ref('')
const qtd = ref('')
const preco = ref('')
const cat = ref(categoriasAtuais.value[0].id)
const nomeInput = ref(null) // referência ao <input> (substitui getElementById)

// se a categoria escolhida foi apagada, volta para a primeira
watch(categoriasAtuais, (lista) => {
  if (!lista.some((c) => c.id === cat.value)) cat.value = lista[0].id
})

function enviar() {
  const ok = adicionarItem({ nome: nome.value, qtd: qtd.value, preco: preco.value, cat: cat.value })
  if (!ok) return
  nome.value = ''
  qtd.value = ''
  preco.value = ''
  nomeInput.value.focus()
}
</script>

<template>
  <div class="card">
    <h2 class="serif">Adicionar item</h2>
    <div class="add-row">
      <input id="nome-item" ref="nomeInput" v-model="nome" type="text" placeholder="Nome do item" @keyup.enter="enviar" />
      <input id="qtd-item" v-model="qtd" type="text" placeholder="Qtd. (opcional)" @keyup.enter="enviar" />
      <input id="preco-item" v-model="preco" type="number" step="0.01" min="0" placeholder="Preço R$" @keyup.enter="enviar" />
      <select id="cat-item" v-model="cat">
        <option v-for="c in categoriasAtuais" :key="c.id" :value="c.id">{{ c.icone }} {{ c.nome }}</option>
      </select>
      <button class="btn-add" @click="enviar">＋ Adicionar</button>
    </div>
  </div>
</template>
