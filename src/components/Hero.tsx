import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.25 },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

const SnowCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const updateSize = () => {
      const scale = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.55 + 0.16,
      opacity: Math.random() * 0.45 + 0.25,
      angle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.angle += 0.008;
        particle.y += particle.speed;
        particle.x += Math.sin(particle.angle) * 0.28;

        if (particle.y > height + 8) {
          particle.y = -8;
          particle.x = Math.random() * width;
        }

        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="snow-canvas" />;
};

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const mountainParallax = useParallax(scrollY, 220, 0.45);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-ambient" />
      <motion.div style={{ y: mountainParallax }} className="hero-mountains">
        <svg viewBox="0 0 1440 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 520L182 298L314 374L518 154L704 410L913 202L1104 342L1440 120V520H0Z" fill="#111822" />
          <path d="M0 520L256 346L458 430L690 238L910 428L1160 268L1440 360V520H0Z" fill="#0b1018" />
          <path d="M0 520L410 392L626 468L838 328L1044 438L1264 334L1440 420V520H0Z" fill="#171d28" opacity="0.76" />
          <path d="M182 298L211 333L314 374L518 154L546 194L704 410L913 202L943 246L1104 342L1440 120" stroke="#d4af68" strokeWidth="1.4" opacity="0.32" />
        </svg>
      </motion.div>

      <SnowCanvas />

      <motion.div style={{ opacity: textOpacity, y: textY }} className="hero-content">
        <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible" className="hero-copy">
          <motion.div variants={lineVariants} className="hero-kicker">
            <Sparkles size={16} />
            Inverno 2026
          </motion.div>
          <motion.h1 variants={lineVariants} className="hero-title">
            Valle
            <span>Showroom</span>
          </motion.h1>
          <motion.p variants={lineVariants} className="hero-subtitle">
            Peças de frio com lã, couro e fibra andina para quem prefere elegância com temperatura real.
          </motion.p>
          <motion.div variants={lineVariants} className="hero-actions">
            <a href="#products" className="hero-primary">
              Explorar coleção
            </a>
            <a href="#editorial" className="hero-secondary">
              Ver origens
            </a>
          </motion.div>
        </motion.div>

        <motion.aside
          className="hero-showpiece"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          aria-label="Atelier Valle Showroom"
        >
          <div className="hero-emblem-wrap">
            <img src="/logo valleshow.png" alt="" />
          </div>
          <div className="hero-product-note">
            <span>Atelier Chile</span>
            <strong>62 artesãos</strong>
          </div>
          <p>Pequenos lotes, fibras rastreadas e acabamento manual.</p>
        </motion.aside>
      </motion.div>

      <a href="#products" className="hero-scroll" aria-label="Descer para coleção">
        <ArrowDown size={18} />
      </a>
    </section>
  );
};
