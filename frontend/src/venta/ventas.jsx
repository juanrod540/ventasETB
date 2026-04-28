import { useState, useEffect } from 'react';
import './ventas.css';

// Configuración de planes según db.json
const PLANES_CONFIG = {
  'Fibra 100 Mb':  { precio: 44990,  incluyeTV: false, incluyeTelefonia: true  },
  'Fibra 300 Mb':  { precio: 59990,  incluyeTV: false, incluyeTelefonia: false },
  'Fibra 500 Mb':  { precio: 79990,  incluyeTV: true,  incluyeTelefonia: true  },
  'Fibra 1 Gb':    { precio: 109990, incluyeTV: true,  incluyeTelefonia: false },
};

const ventasTable = () => {
  const [ventas, setVentas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clienteId: '',
    plan: '',
    precio: '',
    incluyeTV: false,
    incluyeTelefonia: false,
    fechaVenta: new Date().toISOString().split('T')[0],
    fechaInstalacion: '',
    estado: '',
    asesor: '',
  });
  const [clienteInfo, setClienteInfo] = useState({ nombre: '', encontrado: null });

  // Estado para editar
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState(null);
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
  const buscarCliente = async (id) => {
    if (!id) {
      setClienteInfo({ nombre: '', encontrado: null });
      return;
    }
    try {
      const res = await fetch(`${API_URL}/clientes/${id}`);
      if (res.ok) {
        const cliente = await res.json();
        setClienteInfo({ nombre: cliente.nombre, encontrado: true });
      } else {
        setClienteInfo({ nombre: '', encontrado: false });
      }
    } catch {
      setClienteInfo({ nombre: '', encontrado: false });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'clienteId') {
      setFormData(prev => ({ ...prev, clienteId: value }));
      buscarCliente(value);
    } else if (name === 'plan' && PLANES_CONFIG[value]) {
      const plan = PLANES_CONFIG[value];
      setFormData(prev => ({
        ...prev,
        plan: value,
        precio: plan.precio,
        incluyeTV: plan.incluyeTV,
        incluyeTelefonia: plan.incluyeTelefonia,
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
          plan: '',
          precio: '',
          incluyeTV: false,
          incluyeTelefonia: false,
          fechaVenta: new Date().toISOString().split('T')[0],
          fechaInstalacion: '',
          estado: '',
          asesor: '',
        });
        setClienteInfo({ nombre: '', encontrado: null });
      } else {
        console.error("Error al guardar el cliente");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const abrirEditar = (venta) => {
    setEditId(venta.id);
    setEditData({ ...venta });
    setEditOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/ventas/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        const actualizada = await res.json();
        setVentas(ventas.map(v => v.id === editId ? actualizada : v));
        setEditOpen(false);
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'plan' && PLANES_CONFIG[value]) {
      const p = PLANES_CONFIG[value];
      setEditData(prev => ({ ...prev, plan: value, precio: p.precio, incluyeTV: p.incluyeTV, incluyeTelefonia: p.incluyeTelefonia }));
    } else {
      setEditData(prev => ({ ...prev, [name]: value }));
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
                <th>Acciones</th>
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
                  <td>
                    <button
                      onClick={() => abrirEditar(cargarDatos)}
                      style={{ background: '#004c8f', color: 'white', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer' }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal para agregar ventas */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            <h2 className="form-title">Registrar Nueva Venta</h2>

            <form onSubmit={handleSubmit} className="clientes-form">
              <div className="form-group">
                <label>ID del Cliente</label>
                <input type="number" name="clienteId" value={formData.clienteId} onChange={handleChange} required placeholder="Ej: 1, 2, 3..." />
                {clienteInfo.encontrado === true && (
                  <span style={{ display: 'block', marginTop: '6px', color: '#22c55e', fontWeight: '600', fontSize: '0.9rem' }}>
                    {clienteInfo.nombre}
                  </span>
                )}
                {clienteInfo.encontrado === false && (
                  <span style={{ display: 'block', marginTop: '6px', color: '#ef4444', fontWeight: '600', fontSize: '0.9rem' }}>
                    Cliente no encontrado
                  </span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Plan</label>
                  <select name="plan" value={formData.plan} onChange={handleChange} required>
                    <option value="">Seleccione un plan...</option>
                    {Object.keys(PLANES_CONFIG).map(plan => (
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Precio</label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    readOnly={!!formData.plan}
                    required
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '20px', padding: '10px 0' }}>
                <div className="form-group-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="incluyeTV"
                      checked={formData.incluyeTV === true}
                      readOnly
                      style={{ cursor: 'not-allowed' }}
                    /> ¿Incluye TV?
                  </label>
                </div>
                <div className="form-group-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="incluyeTelefonia"
                      checked={formData.incluyeTelefonia === true}
                      readOnly
                      style={{ cursor: 'not-allowed' }}
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
                  <select name="estado" value={formData.estado} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="pendiente">pendiente</option>
                    <option value="instalado">instalado</option>
                    <option value="en_agenda">en_agenda</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Asesor Responsable</label>
                  <input type="text" name="asesor" value={formData.asesor} onChange={handleChange} required />
                </div>
              </div>  

              <button type="submit" className="primary-btn submit-btn">Guardar Venta</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Venta */}
      {editOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setEditOpen(false)}>×</button>
            <h2 className="form-title">Editar Venta #{editId}</h2>
            <form onSubmit={handleUpdate} className="clientes-form">
              <div className="form-group">
                <label>ID del Cliente</label>
                <input type="number" name="clienteId" value={editData.clienteId} onChange={handleEditChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Plan</label>
                  <select name="plan" value={editData.plan} onChange={handleEditChange} required>
                    <option value="">Seleccione...</option>
                    {Object.keys(PLANES_CONFIG).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Precio</label>
                  <input type="number" name="precio" value={editData.precio} readOnly />
                </div>
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '20px', padding: '10px 0' }}>
                <div className="form-group-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="incluyeTV"
                      checked={editData.incluyeTV === true}
                      readOnly
                      style={{ cursor: 'not-allowed' }}
                    /> ¿Incluye TV?
                  </label>
                </div>
                <div className="form-group-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="incluyeTelefonia"
                      checked={editData.incluyeTelefonia === true}
                      readOnly
                      style={{ cursor: 'not-allowed' }}
                    /> ¿Incluye Telefonía?
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha Venta</label>
                  <input type="date" name="fechaVenta" value={editData.fechaVenta} onChange={handleEditChange} required />
                </div>
                <div className="form-group">
                  <label>Fecha Instalación</label>
                  <input type="date" name="fechaInstalacion" value={editData.fechaInstalacion} onChange={handleEditChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Estado</label>
                  <select name="estado" value={editData.estado} onChange={handleEditChange} required>
                    <option value="">Seleccione...</option>
                    <option value="pendiente">pendiente</option>
                    <option value="instalado">instalado</option>
                    <option value="en_agenda">en_agenda</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Asesor</label>
                  <input type="text" name="asesor" value={editData.asesor} onChange={handleEditChange} required />
                </div>
              </div>
              <button type="submit" className="primary-btn submit-btn">Actualizar Venta</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ventasTable;
