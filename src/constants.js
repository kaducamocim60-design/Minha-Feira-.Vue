export const CATS_PADRAO = [
  { id:"horti",   nome:"Hortifruti",   icone:"🥕", cor:"#4C7A3F", padrao:true },
  { id:"prot",    nome:"Proteínas",    icone:"🥩", cor:"#C4472B", padrao:true },
  { id:"latic",   nome:"Laticínios",   icone:"🥛", cor:"#3B7A9C", padrao:true },
  { id:"padaria", nome:"Padaria",      icone:"🌾", cor:"#B8863B", padrao:true },
  { id:"mantim",  nome:"Mantimentos",  icone:"🧺", cor:"#E8AE3D", padrao:true },
  { id:"bebidas", nome:"Bebidas",      icone:"☕", cor:"#6B4A3A", padrao:true },
  { id:"congel",  nome:"Congelados",   icone:"❄️", cor:"#3B8FA3", padrao:true },
  { id:"limpeza", nome:"Limpeza",      icone:"✨", cor:"#7A5C9C", padrao:true },
  { id:"higiene", nome:"Higiene",      icone:"💧", cor:"#C46B9C", padrao:true },
];

export const DEFAULT_ITEMS = [
  ["horti","Banana","1 penca"],["horti","Maçã","6 un"],["horti","Tomate","1 kg"],
  ["horti","Cebola","1 kg"],["horti","Alho","1 cabeça"],["horti","Batata","1 kg"],
  ["horti","Cenoura","500 g"],["horti","Alface","1 un"],["horti","Limão","6 un"],
  ["horti","Laranja","1 kg"],
  ["prot","Peito de frango","1 kg"],["prot","Carne moída","500 g"],["prot","Ovos","1 dz"],
  ["prot","Filé de peixe","500 g"],["prot","Linguiça","500 g"],
  ["latic","Leite","1 l"],["latic","Queijo mussarela","300 g"],["latic","Iogurte","4 un"],
  ["latic","Manteiga","200 g"],["latic","Requeijão","1 un"],
  ["padaria","Pão francês","500 g"],["padaria","Pão de forma","1 un"],["padaria","Bolo","1 un"],
  ["mantim","Arroz","5 kg"],["mantim","Feijão","1 kg"],["mantim","Açúcar","1 kg"],
  ["mantim","Sal","1 kg"],["mantim","Óleo de soja","900 ml"],["mantim","Macarrão","500 g"],
  ["mantim","Farinha de trigo","1 kg"],["mantim","Café","500 g"],
  ["bebidas","Água mineral","6 un"],["bebidas","Suco","1 l"],["bebidas","Refrigerante","2 l"],
  ["congel","Sorvete","1 un"],["congel","Legumes congelados","1 pct"],
  ["limpeza","Detergente","1 un"],["limpeza","Sabão em pó","1 kg"],["limpeza","Desinfetante","1 un"],
  ["limpeza","Papel higiênico","1 pct"],
  ["higiene","Shampoo","1 un"],["higiene","Sabonete","3 un"],["higiene","Pasta de dente","1 un"],
].map(([cat,nome,qtd],i)=>({id:"d"+i, cat, nome, qtd, feito:false, preco:null}));

export const CHAVES = {
  ITENS: "minha-feira-itens-v2",
  CATS_CUSTOM: "minha-feira-categorias-custom-v1",
  HISTORICO: "minha-feira-historico-v1",
  TEMA: "minha-feira-tema",
  FIREBASE_CFG: "minha-feira-firebase-config",
  CODIGO_CASA: "minha-feira-codigo-casa",
  NOTIF_SEXTA: "minha-feira-notif-sexta",
  NOTIF_ULTIMA: "minha-feira-notif-ultima",
};
