<script setup>
import { ref } from 'vue'
import { categoriasCustom, adicionarCategoria, removerCategoria } from '../composables/useLista'

const icone = ref('')
const nome = ref('')
const cor = ref('#4C7A3F')

function criar() {
  if (!adicionarCategoria({ nome: nome.value, icone: icone.value, cor: cor.value })) return
  nome.value = ''
  icone.value = ''
}

function remover(id) {
  if (!removerCategoria(id)) {
    alert('Essa categoria ainda tem itens. Mova ou remova os itens antes de excluir a categoria.')
  }
}
</script>

<template>
  <div class="aba-conteudo ativa">
    <p>
      Crie categorias extras (ex.: "Pet", "Bebê") além das já existentes. Categorias padrão não podem ser removidas.
    </p>
    <div class="linha-flex">
      <div style="max-width: 70px">
        <label>Ícone</label>
        <input v-model="icone" type="text" maxlength="2" placeholder="🐾" />
      </div>
      <div style="flex: 2">
        <label>Nome</label>
        <input v-model="nome" type="text" placeholder="Ex: Pet" @keyup.enter="criar" />
      </div>
      <div style="max-width: 70px">
        <label>Cor</label>
        <input v-model="cor" type="color" />
      </div>
    </div>
    <button class="btn-add" style="margin-top: 0.75rem" @click="criar">＋ Criar categoria</button>

    <div class="lista-cats-custom">
      <div v-for="c in categoriasCustom" :key="c.id" class="cat-custom-item">
        <span>{{ c.icone }}</span>
        <span style="flex: 1">{{ c.nome }}</span>
        <button class="item-remover" @click="remover(c.id)">✕</button>
      </div>
    </div>
  </div>
</template>
