export function formatarMoeda(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
