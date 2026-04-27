import React, { useState, useEffect } from 'react';
import './ventas.css';

const ventasTable = () => {
  const [ventas, setVentas] = useState([]);
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

  return (
    <div className="ventas-container">
      <div className="table-card">
        <div className="table-header-container">
          <h2 className="table-title">Lista de Ventas</h2>
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
    </div>
  );
};

export default ventasTable;
