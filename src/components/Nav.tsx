import React, { useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Camera, Menu, ShoppingBag, X } from 'lucide-react';

const navVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const links = [
  { name: 'Coleção', href: '#products' },
  { name: 'Atelier', href: '#features' },
  { name: 'Origens', href: '#editorial' },
  { name: 'Contato', href: '#footer' },
];

export const Nav: React.FC = () => {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const backgroundColor = useTransform(scrollY, [0, 120], ['rgba(8, 8, 10, 0)', 'rgba(8, 8, 10, 0.9)']);
  const borderColor = useTransform(scrollY, [0, 120], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.08)']);
  const backdropFilter = useTransform(scrollY, [0, 120], ['blur(0px)', 'blur(18px)']);

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      style={{ backgroundColor, backdropFilter, borderColor }}
      className="nav-container"
    >
      <a className="nav-logo" href="#" aria-label="Valle Showroom">
        <img src="/logo valleshow.png" alt="" className="brand-emblem" />
        <span className="brand-wordmark">
          <span className="nav-logo-valle">Valle</span>
          <span className="nav-logo-dot">·</span>
          <span className="nav-logo-showroom">Showroom</span>
        </span>
      </a>

      <div className="nav-desktop">
        <ul className="nav-links">
          {links.map((link, i) => (
            <li
              key={link.name}
              className="nav-item"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a href={link.href}>{link.name}</a>
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    layoutId="nav-underline"
                    className="nav-underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <a
          href="https://www.instagram.com/valleshowroom/"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
          aria-label="Instagram"
        >
          <Camera size={18} />
        </a>
        <a className="nav-reserve" href="#products">
          <ShoppingBag size={16} />
          Reservar
        </a>
      </div>

      <button className="nav-menu-button" onClick={() => setIsOpen((value) => !value)} aria-label="Abrir menu">
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
