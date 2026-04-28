import { Routes, Route } from 'react-router-dom'
import Home from './home/home'
import HomeClientes from './cliente/homeCli'
import HomeVentas from './venta/homeVen'
import Header from './components/header'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ padding: '40px', flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ventas" element={<HomeVentas />} />
          <Route path="/clientes" element={<HomeClientes />} />
        </Routes>
      </main>
    </div>
  )
}

export default App