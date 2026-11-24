<script setup>
import { computed, onMounted } from 'vue'
import { notifSexta, permissao, atualizarPermissao, pedirPermissao } from '../composables/useNotificacao'

onMounted(atualizarPermissao)

const textoStatus = computed(() => {
  switch (permissao.value) {
    case 'granted': return 'Notificações permitidas ✓'
    case 'denied': return 'Notificações bloqueadas nas configurações do navegador.'
    case 'indisponivel': return 'Notificações não são suportadas neste navegador.'
    default: return 'Notificações ainda não permitidas.'
  }
})
</script>

<template>
  <div class="aba-conteudo ativa">
    <p>
      Receba um lembrete no navegador quando abrir o app numa sexta-feira e ainda houver itens pendentes. Funciona
      só com o app aberto (sem servidor de notificação, não dá pra avisar com o app fechado).
    </p>
    <div class="toggle-linha">
      <span>Ativar lembrete de sexta-feira</span>
      <input v-model="notifSexta" type="checkbox" class="switch" />
    </div>
    <button class="btn-outline" style="margin-top: 0.5rem" @click="pedirPermissao">
      Permitir notificações do navegador
    </button>
    <p style="margin-top: 0.5rem">{{ textoStatus }}</p>
  </div>
</template>
