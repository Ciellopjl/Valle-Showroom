import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
import { useParallax } from '../hooks/useParallax';

const stats = [
  { value: 3200, unit: 'm', label: 'altitude' },
  { value: -18, unit: '°C', label: 'testado' },
  { value: 62, unit: '', label: 'artesãos' },
];

const StatCounter: React.FC<{ target: number; unit: string; label: string; inView: boolean }> = ({
  target,
  unit,
  label,
  inView,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(ease * target));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <div className="stat-item">
      <span className="stat-value">
        {target < 0 ? '-' : ''}
        {Math.abs(count).toLocaleString('pt-BR')}
        {unit}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

export const Editorial: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useParallax(scrollY, 140, 0.38);

  return (
    <section id="editorial" ref={ref} className="editorial-section">
      <div className="editorial-grid">
        <div className="editorial-visual">
          <motion.div style={{ y: parallaxY }} className="editorial-parallax">
            <div className="loom-scene">
              <span />
              <span />
              <span />
            </div>
          </motion.div>
          <div className="editorial-caption">
            <strong>Atelier de inverno</strong>
            <span>Lotes curtos, fibras rastreadas e acabamento manual.</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 44 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 44 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="editorial-content"
        >
          <div className="editorial-tag">
            <span className="editorial-tag-line" />
            <span className="editorial-tag-text">Origens</span>
          </div>

          <h2 className="editorial-quote">O vale guarda o frio que nos veste.</h2>

          <p className="editorial-text">
            Nossa herança nasce no silêncio profundo das cordilheiras. Cada fio carrega a resiliência de um
            ecossistema moldado pelo gelo e pelo vento, tecido por mãos que conhecem a montanha há gerações.
          </p>

          <div className="editorial-stats">
            {stats.map((stat) => (
              <StatCounter key={stat.label} target={stat.value} unit={stat.unit} label={stat.label} inView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
