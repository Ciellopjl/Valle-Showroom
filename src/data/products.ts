export type ProductBadge = 'novo' | 'exclusivo' | 'limitado';
export type ProductCategory = 'casacos' | 'mantas' | 'acessorios' | 'calcados';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  material: string;
  price: string;
  badge: ProductBadge;
  palette: [string, string, string];
  origin: string;
  temperature: string;
  stock: string;
  detail: string;
  composition: string;
}

export const categoryLabels: Record<ProductCategory | 'todos', string> = {
  todos: 'Todos',
  casacos: 'Casacos',
  mantas: 'Mantas',
  acessorios: 'Acessórios',
  calcados: 'Calçados',
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Manta Valle',
    category: 'mantas',
    material: 'Lã merino andina',
    price: 'R$ 890',
    badge: 'novo',
    palette: ['#d7dde8', '#8ea1b7', '#2a3443'],
    origin: 'Puerto Varas',
    temperature: '-12 °C',
    stock: '18 peças',
    detail: 'Trama dupla com toque seco, feita para caber no sofá, na cabine e no inverno de verdade.',
    composition: '92% lã merino, 8% poliamida reciclada',
  },
  {
    id: 'p2',
    name: 'Casaco Cordilheira',
    category: 'casacos',
    material: 'Lã patagônica forrada',
    price: 'R$ 1.650',
    badge: 'exclusivo',
    palette: ['#f4f0e6', '#b99d67', '#24313f'],
    origin: 'Punta Arenas',
    temperature: '-18 °C',
    stock: '9 peças',
    detail: 'Silhueta longa, gola estruturada e forro acetinado para atravessar vento frio sem perder presença.',
    composition: '80% lã patagônica, 20% viscose premium',
  },
  {
    id: 'p3',
    name: 'Poncho Mapuche',
    category: 'mantas',
    material: 'Fibra de alpaca',
    price: 'R$ 1.240',
    badge: 'limitado',
    palette: ['#c8b28a', '#6f5842', '#151b22'],
    origin: 'Araucanía',
    temperature: '-10 °C',
    stock: '12 peças',
    detail: 'Peça ampla com queda pesada e grafismos discretos inspirados em padrões do sul do Chile.',
    composition: '70% alpaca, 30% lã fria',
  },
  {
    id: 'p4',
    name: 'Luvas Nevada',
    category: 'acessorios',
    material: 'Couro artesanal',
    price: 'R$ 420',
    badge: 'novo',
    palette: ['#f0f4f8', '#7d8fa4', '#111820'],
    origin: 'Valle Nevado',
    temperature: '-8 °C',
    stock: '24 pares',
    detail: 'Couro macio por fora, lã escovada por dentro e punho justo para conservar calor.',
    composition: 'Couro legítimo, forro 100% lã',
  },
  {
    id: 'p5',
    name: 'Cachecol Inca',
    category: 'acessorios',
    material: 'Seda e lã jacquard',
    price: 'R$ 560',
    badge: 'exclusivo',
    palette: ['#e4d3a2', '#8d6e35', '#293241'],
    origin: 'San Pedro',
    temperature: '-6 °C',
    stock: '15 peças',
    detail: 'Jacquard leve com brilho baixo, pensado para camadas elegantes e noites frias.',
    composition: '45% seda, 55% lã merino',
  },
  {
    id: 'p6',
    name: 'Botas del Valle',
    category: 'calcados',
    material: 'Couro impermeável',
    price: 'R$ 2.100',
    badge: 'limitado',
    palette: ['#dfe7ef', '#a78352', '#0c1016'],
    origin: 'Osorno',
    temperature: '-20 °C',
    stock: '7 pares',
    detail: 'Solado tratorado, couro hidrofugado e acabamento interno térmico para neve urbana.',
    composition: 'Couro impermeável, sola Vibram, forro térmico',
  },
];
