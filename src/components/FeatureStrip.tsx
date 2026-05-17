import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Hand, MountainSnow, Ruler, Truck } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 22 },
  },
};

const features = [
  {
    icon: MountainSnow,
    title: 'Frio testado',
    desc: 'Camadas pensadas para vento, neve urbana e quedas bruscas de temperatura.',
  },
  {
    icon: Hand,
    title: 'Feito em pequena escala',
    desc: 'Cada lote nasce com artesãos parceiros e controle de acabamento peça a peça.',
  },
  {
    icon: Ruler,
    title: 'Caimento preciso',
    desc: 'Modelagens amplas onde precisam respirar e justas onde precisam aquecer.',
  },
  {
    icon: Truck,
    title: 'Envio protegido',
    desc: 'Embalagem rígida, rastreio e primeira troca simplificada para todo o Brasil.',
  },
];

export const FeatureStrip: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="features-section">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="features-grid"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.title} variants={itemVariants} className="feature-item">
              <div className="feature-icon">
                <Icon size={22} />
              </div>
              <h4 className="feature-title">{feature.title}</h4>
              <p className="feature-desc">{feature.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
