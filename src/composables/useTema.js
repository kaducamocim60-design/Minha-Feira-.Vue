import { ref, watch } from 'vue'
import { CHAVES } from '../constants'

const salvo = localStorage.getItem(CHAVES.TEMA)
const prefereEscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

export const tema = ref(salvo || (prefereEscuro ? 'dark' : 'light'))

watch(
  tema,
  (t) => {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem(CHAVES.TEMA, t)
  },
  { immediate: true }
)

export function alternarTema() {
  tema.value = tema.value === 'dark' ? 'light' : 'dark'
}
