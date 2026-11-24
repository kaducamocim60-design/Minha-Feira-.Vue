# Minha Feira 🧺 (versão Vue 3 + Vite)

Mesmo app da versão em HTML, reorganizado em componentes Vue.

## Rodar no seu computador

```bash
npm install
npm run dev      # abre em http://localhost:5173
```

## Gerar a versão para publicar

```bash
npm run build    # cria a pasta dist/
npm run preview  # testa o build localmente
```

Para o GitHub Pages, publique o **conteúdo da pasta `dist/`** (o `vite.config.js` já usa `base: './'`).

## Estrutura

```
src/
├── main.js                 → liga o Vue na página (#app) e registra o service worker
├── App.vue                 → monta a tela juntando os componentes
├── constants.js            → categorias padrão, itens padrão, chaves do localStorage
├── utils.js                → formatarMoeda
├── assets/style.css        → o CSS original
├── composables/            → a lógica (antes tudo no app.js)
│   ├── useLista.js         → itens, categorias, busca/filtro, sugestões, salvar no localStorage
│   ├── useTema.js          → modo claro/escuro
│   ├── useSync.js          → sincronização com Firebase
│   └── useNotificacao.js   → lembrete de sexta-feira
└── components/
    ├── AppHeader.vue, FormAdicionar.vue, Sugestoes.vue, BuscaFiltros.vue,
    │   CategoriaCard.vue, ItemRow.vue, RodapeAcoes.vue
    └── ModalAjustes.vue + AbaCategorias.vue, AbaSync.vue, AbaNotif.vue
public/                     → manifest.json, sw.js e ícones (copiados como estão para o build)
```
