import { Routes, Route } from 'react-router-dom'
import Home from './home/home'
import HomeClientes from './cliente/homeCli'
import HomeVentas from './venta/homeVen'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ventas" element={<HomeVentas />} />
      <Route path="/clientes" element={<HomeClientes />} />
    </Routes>
  )
}

export default App