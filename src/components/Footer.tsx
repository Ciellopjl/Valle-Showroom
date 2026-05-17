import React from 'react';
import { Camera, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer id="footer" className="footer-section">
    <div className="footer-watermark">
      <img src="/logo valleshow.png" alt="" />
    </div>

    <div className="footer-content">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo valleshow.png" alt="" className="brand-emblem" />
            <span className="brand-wordmark">
              <span className="footer-logo-valle">Valle</span>
              <span className="footer-logo-dot">·</span>
              <span className="footer-logo-showroom">Showroom</span>
            </span>
          </div>
          <p className="footer-desc">
            Onde o vale encontra o inverno. Criamos vestimentas que respeitam a natureza brutal e poética da
            Cordilheira dos Andes.
          </p>
          <div className="footer-signature">Nascido nos vales do Chile</div>
        </div>

        <div className="footer-col">
          <h5 className="footer-title">Navegação</h5>
          <a href="#products" className="footer-link">
            Coleção
          </a>
          <a href="#features" className="footer-link">
            Atelier
          </a>
          <a href="#editorial" className="footer-link">
            Origens
          </a>
          <a href="#" className="footer-link">
            Termos
          </a>
        </div>

        <div className="footer-col">
          <h5 className="footer-title">Contato</h5>
          <span className="footer-text">
            <Mail size={15} />
            contacto@valleshowroom.cl
          </span>
          <span className="footer-text">
            <Phone size={15} />
            +56 9 1234 5678
          </span>
          <span className="footer-text">
            <MapPin size={15} />
            Santiago, Chile
          </span>
          <a
            href="https://www.instagram.com/valleshowroom/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            <Camera size={16} />
            Instagram
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Valle Showroom</span>
        <span>Todos os direitos reservados</span>
      </div>
    </div>
  </footer>
);
