<script setup>
import { computed } from 'vue'
import { estado, cfgTexto, codigo, conectar, desconectar } from '../composables/useSync'

const status = computed(() => {
  if (estado.value === 'conectado') return { texto: '🟢 sincronizado com esta casa', classe: 'status-on' }
  if (estado.value === 'erro') return { texto: '⚠️ erro na sincronização — confira a configuração', classe: 'status-off' }
  return { texto: 'não sincronizado — a lista fica só neste aparelho', classe: 'status-off' }
})
</script>

<template>
  <div class="aba-conteudo ativa">
    <p>
      Sincronize a lista entre celulares da casa usando um projeto <strong>Firebase</strong> gratuito (Firestore).
      Crie um projeto em firebase.google.com/console, ative o Firestore em modo teste e cole aqui a configuração do
      app web (Project settings → seus apps → SDK config).
    </p>
    <label>Configuração do Firebase (JSON)</label>
    <textarea v-model="cfgTexto" placeholder='{"apiKey":"...","projectId":"...","...":"..."}'></textarea>

    <label>Código da casa (combine com quem mais usa)</label>
    <input v-model="codigo" type="text" placeholder="Ex: familia-silva-2026" />

    <div class="linha-flex" style="margin-top: 0.75rem">
      <button class="btn-add" @click="conectar()">🔗 Conectar</button>
      <button class="btn-outline" @click="desconectar">Desconectar</button>
    </div>
    <div class="status-pill" :class="status.classe">{{ status.texto }}</div>
  </div>
</template>
