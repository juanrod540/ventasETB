import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="hero-content">
                <h1 className="hero-title">
                    Bienvenido al portal de ventas de ETB
                </h1>
                <p className="hero-subtitle">
                    Gestiona tus clientes, planes de televisión, internet y telefonía con nuestra plataforma de ventas rápida, moderna e intuitiva.
                </p>
                <div className="hero-actions">
                    <button className="btn btn-primary" onClick={() => navigate('/ventas')}>Gestionar Ventas</button>
                    <button className="btn btn-accent" onClick={() => navigate('/clientes')}>Ver Clientes</button>
                </div>
            </div>
            <div className="card feature-card">
                <h3>Acceso Rápido</h3>
                <p>Aquí podrás gestionar tus clientes y planes de internet con nuestra plataforma de ventas rápida, moderna e intuitiva.</p>
            </div>
        </div>
    );
};

export default Home;
