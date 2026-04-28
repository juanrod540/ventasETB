import logo from '../image/logo ETB-02.png';
import './header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-logo-container">
        <img src={logo} alt="ETB Logo" className="header-logo-img" />
      </div>
      <div className="header-info">
        <div className="header-dept">Dirección de Desarrollo · ETB · 2026</div>
        <div className="header-subtitle">
          eTb Prueba Técnica · Modelo B — Ventas FTTH Hogar Confidencial
        </div>
      </div>
    </header>
  );
};

export default Header;
