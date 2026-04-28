import { useState, useEffect } from 'react';
import './ventas.css';

const ventasTable = () => {
  const [ventas, setVentas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clienteId: '',
    Plan: '',
    Precio: '',
    incluyeTV: '',
    incluyeTelefonia: '',
    fechaVenta: '',
    fechaInstalacion: '',
    Estado: '',
    Asesor: '',
  });
  const API_URL = "http://localhost:3002";

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resVentas = await fetch(`${API_URL}/ventas`);

        if (resVentas.ok) {
          const dataVentas = await resVentas.json();
          setVentas(dataVentas);
        } else {
          console.error("Error al obtener los ventas");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    cargarDatos();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/ventas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const nuevaVenta = await response.json();
        setVentas([...ventas, nuevaVenta]);
        setIsModalOpen(false);
        setFormData({
          clienteId: '',
          Plan: '',
          Precio: '',
          incluyeTV: '',
          incluyeTelefonia: '',
          fechaVenta: '',
          fechaInstalacion: '',
          Estado: '',
          Asesor: '',
        });
      } else {
        console.error("Error al guardar el cliente");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="ventas-container">
      <div className="table-card">
        <div className="table-header-container">
          <h2 className="table-title">Lista de Ventas</h2>
          <button className="secondary-btn" onClick={() => setIsModalOpen(true)}>Nueva Venta</button>
        </div>

        <div className="table-responsive">
          <table className="ventas-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Plan</th>
                <th>Precio</th>
                <th>Incluye TV</th>
                <th>Incluye Telefonía</th>
                <th>Fecha Venta</th>
                <th>Fecha Instalación</th>
                <th>Estado</th>
                <th>Asesor</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((cargarDatos) => (
                <tr key={cargarDatos.id}>
                  <td>{cargarDatos.clienteId}</td>
                  <td className="font-medium">{cargarDatos.plan}</td>
                  <td>{cargarDatos.precio}</td>
                  <td><input type="checkbox" checked={cargarDatos.incluyeTV} readOnly /></td>
                  <td><input type="checkbox" checked={cargarDatos.incluyeTelefonia} readOnly /></td>
                  <td>{cargarDatos.fechaVenta}</td>
                  <td>{cargarDatos.fechaInstalacion}</td>
                  <td>
                    <span className={`estrato-badge estrato-${cargarDatos.estado}`}>
                      {cargarDatos.estado}
                    </span>
                  </td>
                  <td>{cargarDatos.asesor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            <h2 className="form-title">Registrar Nueva Venta</h2>

            <form onSubmit={handleSubmit} className="clientes-form">
              <div className="form-group">
                <label>ID del Cliente</label>
                <input type="text" name="clienteId" value={formData.clienteId} onChange={handleChange} required placeholder="Ej: CL-123" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Plan</label>
                  <select name="Plan" value={formData.Plan} onChange={handleChange} required>
                    <option value="">Seleccione un plan...</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Precio</label>
                  <input type="number" name="Precio" value={formData.Precio} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '20px', padding: '10px 0' }}>
                <div className="form-group-checkbox">
                  <label>
                    <input type="checkbox" name="incluyeTV" checked={formData.incluyeTV === 'true' || formData.incluyeTV === true}
                      onChange={(e) => setFormData(prev => ({ ...prev, incluyeTV: e.target.checked }))}
                    /> ¿Incluye TV?
                  </label>
                </div>
                <div className="form-group-checkbox">
                  <label>
                    <input type="checkbox" name="incluyeTelefonia" checked={formData.incluyeTelefonia === 'true' || formData.incluyeTelefonia === true}
                      onChange={(e) => setFormData(prev => ({ ...prev, incluyeTelefonia: e.target.checked }))}
                    /> ¿Incluye Telefonía?
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de Venta</label>
                  <input type="date" name="fechaVenta" value={formData.fechaVenta} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Fecha de Instalación</label>
                  <input type="date" name="fechaInstalacion" value={formData.fechaInstalacion} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Estado</label>
                  <select name="Estado" value={formData.Estado} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Instalado">Instalado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Asesor Responsable</label>
                  <input type="text" name="Asesor" value={formData.Asesor} onChange={handleChange} required />
                </div>
              </div>

              <button type="submit" className="primary-btn submit-btn">Guardar Venta</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ventasTable;
