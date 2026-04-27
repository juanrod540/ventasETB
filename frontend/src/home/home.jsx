import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="hero-content">
                <h1 className="hero-title">
                    Bienvenido a el portal de ventas de ETB
                </h1>
                <p className="hero-subtitle">
                    Gestiona tus clientes, planes de televisión, internet y telefonía con nuestra plataforma de ventas rápida, moderna e intuitiva.
                </p>
                <div className="hero-actions">
                    <button className="primary-btn" onClick={() => navigate('/ventas')}>Gestionar Ventas</button>
                    <button className="secondary-btn" onClick={() => navigate('/clientes')}>Ver Clientes</button>
                </div>
            </div>
            <div className="feature-card">
                <h3>Bienvenido a el portal de ventas de ETB</h3>
                <p>Aquí podras gestionar tus clientes, planes de internet con nuestra plataforma de ventas rápida, moderna e intuitiva.</p>
            </div>
        </div>
    );
};

export default Home;
