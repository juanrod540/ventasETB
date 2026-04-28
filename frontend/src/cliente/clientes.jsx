import { useState, useEffect } from 'react';
import './clientes.css';

const ClientesTable = () => {
  const [clientes, setClientes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    email: '',
    direccion: '',
    barrio: '',
    estrato: '',
    fechaRegistro: new Date().toISOString().split('T')[0]
  });

  // Estado para editar
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState(null);
  const API_URL = "http://localhost:3002";

  useEffect(() => {
    const cargarDatosClientes = async () => {
      try {
        const resClientes = await fetch(`${API_URL}/clientes`);
        
        if (resClientes.ok) {
          const dataClientes = await resClientes.json();
          setClientes(dataClientes);
        } else {
          console.error("Error al obtener los clientes");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    cargarDatosClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const nuevoCliente = await response.json();
        setClientes([...clientes, nuevoCliente]);
        setIsModalOpen(false);
        setFormData({
          nombre: '', documento: '', telefono: '', email: '', 
          direccion: '', barrio: '', estrato: '', 
          fechaRegistro: new Date().toISOString().split('T')[0]
        });
      } else {
        console.error("Error al guardar el cliente");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  const abrirEditar = (cliente) => {
    setEditId(cliente.id);
    setEditData({ ...cliente });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/clientes/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        const actualizado = await res.json();
        setClientes(clientes.map(c => c.id === editId ? actualizado : c));
        setEditOpen(false);
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div className="clientes-container">
      <div className="card">
        <div className="table-header-container">
          <h2 className="table-title">Lista de Clientes</h2>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Nuevo Cliente</button>
        </div>
        
        <div className="table-responsive">
          <table className="clientes-table">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Documento</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Barrio</th>
                <th>Estrato</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cargarDatosClientes) => (
                <tr key={cargarDatosClientes.id}>
                  <td className="font-medium">{cargarDatosClientes.nombre}</td>
                  <td>{cargarDatosClientes.documento}</td>
                  <td>{cargarDatosClientes.telefono}</td>
                  <td>{cargarDatosClientes.email}</td>
                  <td>{cargarDatosClientes.direccion}</td>
                  <td>{cargarDatosClientes.barrio}</td>
                  <td>
                    <span className={`estrato-badge estrato-${cargarDatosClientes.estrato}`}>
                      {cargarDatosClientes.estrato}
                    </span>
                  </td>
                  <td>{cargarDatosClientes.fechaRegistro}</td>
                  <td>
                    <button
                      onClick={() => abrirEditar(cargarDatosClientes)}
                      className="btn btn-outline"
                      style={{ padding: '5px 12px', fontSize: '0.85rem' }}
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

      {/*Modal para agregar clientes*/}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            <h2 className="form-title">Registro de Cliente</h2>
            <form onSubmit={handleSubmit} className="clientes-form">
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Documento de Identidad</label>
                  <input type="number" name="documento" value={formData.documento} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="number" name="telefono" value={formData.telefono} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" name="email" value={formData.email } onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Barrio</label>
                  <input type="text" name="barrio" value={formData.barrio} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Estrato</label>
                  <select name="estrato" value={formData.estrato} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Fecha de Registro</label>
                <input type="date" name="fechaRegistro" value={formData.fechaRegistro} onChange={handleChange} required />
              </div>

               <button type="submit" className="btn btn-primary submit-btn" style={{ width: '100%', marginTop: '20px' }}>Guardar Cliente</button>
            </form>
          </div>
        </div>
      )}
      {/* Modal Editar Cliente */}
      {editOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setEditOpen(false)}>×</button>
            <h2 className="form-title">Editar Cliente #{editId}</h2>
            <form onSubmit={handleUpdate} className="clientes-form">
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" name="nombre" value={editData.nombre || ''} onChange={handleEditChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Documento de Identidad</label>
                  <input type="number" name="documento" value={editData.documento || ''} onChange={handleEditChange} required />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="number" name="telefono" value={editData.telefono || ''} onChange={handleEditChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" name="email" value={editData.email || ''} onChange={handleEditChange} required />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input type="text" name="direccion" value={editData.direccion || ''} onChange={handleEditChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Barrio</label>
                  <input type="text" name="barrio" value={editData.barrio || ''} onChange={handleEditChange} required />
                </div>
                <div className="form-group">
                  <label>Estrato</label>
                  <select name="estrato" value={editData.estrato || ''} onChange={handleEditChange} required>
                    <option value="">Seleccione...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Fecha de Registro</label>
                <input type="date" name="fechaRegistro" value={editData.fechaRegistro || ''} onChange={handleEditChange} required />
              </div>
               <button type="submit" className="btn btn-primary submit-btn" style={{ width: '100%', marginTop: '20px' }}>Actualizar Cliente</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesTable;
