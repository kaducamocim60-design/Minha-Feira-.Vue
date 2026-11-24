import { ref, computed, watch } from 'vue'
import { CATS_PADRAO, DEFAULT_ITEMS, CHAVES } from '../constants'
import { formatarMoeda } from '../utils'

const clone = (v) => JSON.parse(JSON.stringify(v))

function ler(chave, padrao) {
  try {
    const raw = localStorage.getItem(chave)
    return raw ? JSON.parse(raw) : padrao
  } catch {
    return padrao
  }
}

function carregarItens() {
  const salvos = ler(CHAVES.ITENS, null)
  return Array.isArray(salvos) && salvos.length ? salvos : clone(DEFAULT_ITEMS)
}

/* ---------------- estado (único, compartilhado por todos os componentes) ---------------- */
export const itens = ref(carregarItens())
export const categoriasCustom = ref(ler(CHAVES.CATS_CUSTOM, []))
export const historico = ref(ler(CHAVES.HISTORICO, {})) // chave: nome|cat -> {nome,cat,qtd,vezes}
export const busca = ref('')
export const filtro = ref('todos') // todos | pendentes | comprados
export const estadoSalvamento = ref('salvo ✓')

/* ---------------- salvar automaticamente no localStorage ---------------- */
let timer = null
let pularSync = false
const ouvintesSalvo = []

// Quem quiser ser avisado depois de cada salvamento (ex.: a sincronização) se registra aqui
export function aoSalvar(fn) {
  ouvintesSalvo.push(fn)
}

watch(
  [itens, categoriasCustom, historico],
  () => {
    estadoSalvamento.value = 'salvando…'
    clearTimeout(timer)
    timer = setTimeout(() => {
      try {
        localStorage.setItem(CHAVES.ITENS, JSON.stringify(itens.value))
        localStorage.setItem(CHAVES.CATS_CUSTOM, JSON.stringify(categoriasCustom.value))
        localStorage.setItem(CHAVES.HISTORICO, JSON.stringify(historico.value))
        estadoSalvamento.value = 'salvo ✓'
        const pular = pularSync
        pularSync = false
        if (!pular) ouvintesSalvo.forEach((fn) => fn())
      } catch {
        estadoSalvamento.value = 'erro ao salvar'
      }
    }, 300)
  },
  { deep: true }
)

// Dados que chegaram de outro celular: aplica sem mandar de volta pro Firestore (evita loop)
export function aplicarRemoto(data) {
  if (!data.itens && !data.categoriasCustom) return
  pularSync = true
  if (data.itens) itens.value = data.itens
  if (data.categoriasCustom) categoriasCustom.value = data.categoriasCustom
}

/* ---------------- valores derivados (computed) ---------------- */
export const categoriasAtuais = computed(() => [...CATS_PADRAO, ...categoriasCustom.value])
export const totalItens = computed(() => itens.value.length)
export const feitos = computed(() => itens.value.filter((i) => i.feito).length)
export const pendentes = computed(() => totalItens.value - feitos.value)
export const progresso = computed(() =>
  totalItens.value ? Math.round((feitos.value / totalItens.value) * 100) : 0
)
export const totalEstimado = computed(() =>
  itens.value.reduce(
    (soma, i) => (i.feito || typeof i.preco !== 'number' ? soma : soma + i.preco),
    0
  )
)

const itensFiltrados = computed(() => {
  const termo = busca.value.trim().toLowerCase()
  return itens.value.filter((i) => {
    if (termo && !i.nome.toLowerCase().includes(termo)) return false
    if (filtro.value === 'pendentes' && i.feito) return false
    if (filtro.value === 'comprados' && !i.feito) return false
    return true
  })
})

export function itensDaCategoria(catId) {
  return itensFiltrados.value.filter((i) => i.cat === catId)
}

export const categoriasVisiveis = computed(() => {
  const filtrando = busca.value.trim() !== '' || filtro.value !== 'todos'
  return categoriasAtuais.value.filter((cat) => {
    const visiveis = itensFiltrados.value.some((i) => i.cat === cat.id)
    if (filtrando) return visiveis
    // esconde categoria personalizada vazia
    const temItens = itens.value.some((i) => i.cat === cat.id)
    return cat.padrao || temItens
  })
})

export const sugestoes = computed(() => {
  const nomesAtuais = new Set(itens.value.map((i) => i.nome.trim().toLowerCase()))
  return Object.values(historico.value)
    .filter((h) => h.vezes >= 2 && !nomesAtuais.has(h.nome.trim().toLowerCase()))
    .sort((a, b) => b.vezes - a.vezes)
    .slice(0, 6)
})

export function categoriaPorId(id) {
  return categoriasAtuais.value.find((c) => c.id === id)
}

/* ---------------- ações sobre itens ---------------- */
export function toggleItem(id) {
  const it = itens.value.find((i) => i.id === id)
  if (it) it.feito = !it.feito
}

export function removerItem(id) {
  itens.value = itens.value.filter((i) => i.id !== id)
}

export function adicionarItem({ nome, qtd, preco, cat }) {
  const nomeLimpo = (nome || '').trim()
  if (!nomeLimpo) return false
  const p = parseFloat(preco)
  itens.value.push({
    id: 'u' + Date.now(),
    cat,
    nome: nomeLimpo,
    qtd: (qtd || '').trim(),
    feito: false,
    preco: p && !isNaN(p) ? p : null,
  })
  return true
}

export function marcarTodosCategoria(catId) {
  itens.value.forEach((i) => {
    if (i.cat === catId) i.feito = true
  })
}

export function limparComprados() {
  itens.value
    .filter((i) => i.feito)
    .forEach((i) => {
      const chave = i.nome.trim().toLowerCase() + '|' + i.cat
      const registro = historico.value[chave] || { nome: i.nome, cat: i.cat, qtd: i.qtd, vezes: 0 }
      registro.vezes += 1
      registro.qtd = i.qtd || registro.qtd
      historico.value[chave] = registro
    })
  itens.value = itens.value.filter((i) => !i.feito)
}

export function restaurarPadrao() {
  itens.value = clone(DEFAULT_ITEMS)
}

export function adicionarSugestao(s) {
  itens.value.push({
    id: 's' + Date.now() + Math.random().toString(36).slice(2, 6),
    cat: s.cat,
    nome: s.nome,
    qtd: s.qtd || '',
    feito: false,
    preco: null,
  })
}

/* ---------------- categorias personalizadas ---------------- */
export function adicionarCategoria({ nome, icone, cor }) {
  const nomeLimpo = (nome || '').trim()
  if (!nomeLimpo) return false
  const slug = nomeLimpo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
  categoriasCustom.value.push({
    id: 'c_' + slug + '_' + Date.now().toString(36),
    nome: nomeLimpo,
    icone: (icone || '').trim() || '🗂️',
    cor: cor || '#4C7A3F',
    padrao: false,
  })
  return true
}

// devolve false se a categoria ainda tem itens
export function removerCategoria(id) {
  if (itens.value.some((i) => i.cat === id)) return false
  categoriasCustom.value = categoriasCustom.value.filter((c) => c.id !== id)
  return true
}

/* ---------------- texto para compartilhar ---------------- */
export function gerarTextoLista() {
  const linhas = ['🛒 *Minha Feira*', '']
  categoriasAtuais.value.forEach((cat) => {
    const its = itens.value.filter((i) => i.cat === cat.id && !i.feito)
    if (!its.length) return
    linhas.push(`${cat.icone} *${cat.nome}*`)
    its.forEach((i) => linhas.push(`- ${i.nome}${i.qtd ? ' (' + i.qtd + ')' : ''}`))
    linhas.push('')
  })
  if (totalEstimado.value > 0) linhas.push(`Total estimado: ${formatarMoeda(totalEstimado.value)}`)
  return linhas.join('\n').trim()
}
