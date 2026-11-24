import { ref, watch } from 'vue'
import { CHAVES } from '../constants'
import { itens } from './useLista'

const suportado = 'Notification' in window

export const notifSexta = ref(localStorage.getItem(CHAVES.NOTIF_SEXTA) === 'true')
export const permissao = ref(suportado ? Notification.permission : 'indisponivel')

watch(notifSexta, (v) => localStorage.setItem(CHAVES.NOTIF_SEXTA, v ? 'true' : 'false'))

export function atualizarPermissao() {
  permissao.value = suportado ? Notification.permission : 'indisponivel'
}

export function pedirPermissao() {
  if (!suportado) {
    alert('Seu navegador não suporta notificações.')
    return
  }
  Notification.requestPermission().then(atualizarPermissao)
}

export function verificarNotificacaoSexta() {
  if (!suportado || Notification.permission !== 'granted') return
  if (localStorage.getItem(CHAVES.NOTIF_SEXTA) !== 'true') return
  const hoje = new Date()
  if (hoje.getDay() !== 5) return // 5 = sexta-feira
  const pendentes = itens.value.filter((i) => !i.feito).length
  if (pendentes === 0) return
  const chaveDia = hoje.toDateString()
  if (localStorage.getItem(CHAVES.NOTIF_ULTIMA) === chaveDia) return
  new Notification('Minha Feira 🧺', {
    body: `Hoje é sexta! Você tem ${pendentes} ${pendentes === 1 ? 'item pendente' : 'itens pendentes'} na lista.`,
    icon: `${import.meta.env.BASE_URL}icon-192.png`,
  })
  localStorage.setItem(CHAVES.NOTIF_ULTIMA, chaveDia)
}
