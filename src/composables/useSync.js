import { ref } from 'vue'
import { CHAVES } from '../constants'
import { itens, categoriasCustom, aplicarRemoto, aoSalvar } from './useLista'

export const estado = ref('desconectado') // desconectado | conectado | erro
export const cfgTexto = ref(localStorage.getItem(CHAVES.FIREBASE_CFG) || '')
export const codigo = ref(localStorage.getItem(CHAVES.CODIGO_CASA) || '')

let firebaseApp = null
let docRef = null
let unsubscribe = null
let ultimoUpdateLocal = 0

async function salvarNoFirestore() {
  if (!docRef) return
  try {
    const { setDoc } = await import('firebase/firestore')
    const updatedAt = Date.now()
    ultimoUpdateLocal = updatedAt
    // clone puro: tira o "proxy" reativo do Vue e qualquer undefined (que o Firestore recusa)
    const dados = JSON.parse(
      JSON.stringify({ itens: itens.value, categoriasCustom: categoriasCustom.value, updatedAt })
    )
    await setDoc(docRef, dados)
  } catch (err) {
    console.error('Erro ao sincronizar:', err)
  }
}

// depois de cada salvamento local, manda para a nuvem (se estiver conectado)
aoSalvar(() => {
  if (estado.value === 'conectado') salvarNoFirestore()
})

export async function conectar(salvarCredenciais = true) {
  const cfgT = cfgTexto.value.trim()
  const cod = codigo.value.trim()
  if (!cfgT || !cod) {
    alert('Preencha a configuração do Firebase e um código da casa.')
    return
  }
  let cfg
  try {
    cfg = JSON.parse(cfgT)
  } catch {
    alert('Configuração inválida. Cole o JSON exatamente como o Firebase fornece.')
    return
  }

  try {
    // Firebase só é baixado quando a pessoa realmente usa a sincronização
    const [{ initializeApp }, { getAuth, signInAnonymously }, { getFirestore, doc, onSnapshot }] =
      await Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore')])

    if (!firebaseApp) firebaseApp = initializeApp(cfg)
    await signInAnonymously(getAuth(firebaseApp))

    docRef = doc(getFirestore(firebaseApp), 'minha-feira-lares', cod)
    if (unsubscribe) unsubscribe()
    unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data()
          if (data.updatedAt && data.updatedAt !== ultimoUpdateLocal) {
            ultimoUpdateLocal = data.updatedAt
            aplicarRemoto(data)
          }
        } else {
          salvarNoFirestore()
        }
      },
      (err) => {
        console.error(err)
        estado.value = 'erro'
      }
    )

    if (salvarCredenciais) {
      localStorage.setItem(CHAVES.FIREBASE_CFG, cfgT)
      localStorage.setItem(CHAVES.CODIGO_CASA, cod)
    }
    estado.value = 'conectado'
    salvarNoFirestore()
  } catch (err) {
    alert('Erro ao conectar: ' + err.message)
    estado.value = 'erro'
  }
}

export function desconectar() {
  if (unsubscribe) unsubscribe()
  unsubscribe = null
  docRef = null
  estado.value = 'desconectado'
  localStorage.removeItem(CHAVES.FIREBASE_CFG)
  localStorage.removeItem(CHAVES.CODIGO_CASA)
}

export function tentarReconectarSalvo() {
  if (cfgTexto.value && codigo.value) conectar(false)
}
