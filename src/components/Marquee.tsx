import React from 'react';
import { motion, type Variants } from 'framer-motion';

const marqueeItems = [
  'Valle Showroom',
  'Chile',
  'Inverno 2026',
  'Lã merino',
  'Torres del Paine',
  'Artesãos andinos',
  'Frete grátis acima de R$ 600',
];

const marqueeVariants: Variants = {
  animate: {
    x: ['0%', '-50%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 22,
        ease: 'linear',
      },
    },
  },
};

export const Marquee: React.FC = () => (
  <div className="marquee-container">
    <motion.div variants={marqueeVariants} animate="animate" className="marquee-content">
      {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
        <div key={`${item}-${i}`} className="marquee-item">
          <span className="marquee-text">{item}</span>
          <span className="marquee-dot">·</span>
        </div>
      ))}
    </motion.div>
  </div>
);
