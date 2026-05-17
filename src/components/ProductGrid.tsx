import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, type Variants } from 'framer-motion';
import { Eye, ShieldCheck, ShoppingBag, Snowflake, Thermometer, X } from 'lucide-react';
import { categoryLabels, products, type Product, type ProductCategory } from '../data/products';

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 180, damping: 24 },
  },
};

const categories: Array<ProductCategory | 'todos'> = ['todos', 'casacos', 'mantas', 'acessorios', 'calcados'];

const ProductArt: React.FC<{ product: Product }> = ({ product }) => (
  <div
    className={`product-art product-art-${product.category}`}
    style={{
      '--tone-a': product.palette[0],
      '--tone-b': product.palette[1],
      '--tone-c': product.palette[2],
    } as React.CSSProperties}
  >
    <div className="product-art-shadow" />
    <div className="product-art-piece" />
    <div className="product-art-line" />
  </div>
);

const ProductCard: React.FC<{
  product: Product;
  onInspect: (product: Product) => void;
  onReserve: () => void;
}> = ({ product, onInspect, onReserve }) => (
  <motion.article variants={cardVariants} className="product-card" layout>
    <div className="product-image-container">
      <ProductArt product={product} />
      <span className="product-badge">{product.badge}</span>
      <button className="product-inspect" onClick={() => onInspect(product)} aria-label={`Ver ${product.name}`}>
        <Eye size={17} />
      </button>
    </div>

    <div className="product-info">
      <div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-material">{product.material}</p>
      </div>
      <p className="product-price">{product.price}</p>
    </div>

    <div className="product-meta">
      <span>
        <Thermometer size={14} />
        {product.temperature}
      </span>
      <span>{product.origin}</span>
    </div>

    <button className="product-add-btn" onClick={onReserve}>
      <ShoppingBag size={16} />
      Reservar peça
    </button>
  </motion.article>
);

export const ProductGrid: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'todos'>('todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reservationCount, setReservationCount] = useState(0);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'todos') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="products" className="products-section">
      <div className="products-header">
        <span className="section-eyebrow">Curadoria Valle</span>
        <h2 className="products-title">A coleção que segura o frio</h2>
        <p className="products-intro">
          Uma seleção enxuta de peças térmicas, táteis e feitas para durar mais que uma estação.
        </p>
      </div>

      <div className="collection-toolbar">
        <div className="category-tabs" aria-label="Categorias">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
        <div className="reservation-pill">
          <ShoppingBag size={16} />
          <span>{reservationCount}</span>
        </div>
      </div>

      <motion.div
        ref={ref}
        variants={gridVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="products-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onInspect={setSelectedProduct}
              onReserve={() => setReservationCount((count) => count + 1)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.aside
            className="product-drawer"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 32 }}
            transition={{ duration: 0.24 }}
          >
            <button className="drawer-close" onClick={() => setSelectedProduct(null)} aria-label="Fechar">
              <X size={18} />
            </button>
            <div className="drawer-art">
              <ProductArt product={selectedProduct} />
            </div>
            <span className="product-badge drawer-badge">{selectedProduct.badge}</span>
            <h3>{selectedProduct.name}</h3>
            <p>{selectedProduct.detail}</p>
            <div className="drawer-specs">
              <span>
                <Snowflake size={15} />
                {selectedProduct.temperature}
              </span>
              <span>
                <ShieldCheck size={15} />
                {selectedProduct.stock}
              </span>
            </div>
            <dl>
              <div>
                <dt>Origem</dt>
                <dd>{selectedProduct.origin}</dd>
              </div>
              <div>
                <dt>Composição</dt>
                <dd>{selectedProduct.composition}</dd>
              </div>
            </dl>
            <button className="drawer-action" onClick={() => setReservationCount((count) => count + 1)}>
              <ShoppingBag size={16} />
              Reservar por {selectedProduct.price}
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
};
