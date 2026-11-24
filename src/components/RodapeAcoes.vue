<script setup>
import { limparComprados, restaurarPadrao, gerarTextoLista } from '../composables/useLista'

function compartilharWhatsApp() {
  window.open(`https://wa.me/?text=${encodeURIComponent(gerarTextoLista())}`, '_blank')
}

function copiarLista() {
  const texto = gerarTextoLista()
  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(texto)
      .then(() => alert('Lista copiada! Agora é só colar onde quiser.'))
      .catch(() => prompt('Copie manualmente:', texto))
  } else {
    prompt('Copie manualmente:', texto)
  }
}

function confirmarRestaurar() {
  if (confirm('Isso vai substituir sua lista atual pela lista padrão. Continuar?')) restaurarPadrao()
}
</script>

<template>
  <div class="rodape-acoes">
    <button class="btn-outline" @click="limparComprados">Limpar itens comprados</button>
    <button class="btn-outline" @click="compartilharWhatsApp">📤 Compartilhar no WhatsApp</button>
    <button class="btn-outline" @click="copiarLista">📋 Copiar lista</button>
    <button class="btn-texto" @click="confirmarRestaurar">↺ Restaurar lista padrão</button>
  </div>
</template>
