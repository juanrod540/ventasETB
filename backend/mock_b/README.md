# Mock API — Modelo B · Ventas FTTH Hogar

## Requisitos
- Node.js instalado

## Instalación y ejecución
```bash
npm install
npm start
```
La API queda disponible en: **http://localhost:3002**

---

## Recurso: /clientes

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| nombre | string | Sí | Nombre completo del cliente |
| documento | string | Sí | Cédula o NIT |
| telefono | string | Sí | Número de contacto |
| email | string | Sí | Correo electrónico |
| direccion | string | Sí | Dirección de instalación |
| barrio | string | Sí | Barrio en Bogotá |
| estrato | number | Sí | Estrato socioeconómico (1–6) |
| fechaRegistro | string | No | YYYY-MM-DD |

## Endpoints /clientes
| Método | URL | Descripción |
|---|---|---|
| GET | /clientes | Lista todos los clientes |
| GET | /clientes/:id | Obtiene un cliente por ID |
| POST | /clientes | Registra un nuevo cliente |
| PUT | /clientes/:id | Actualiza un cliente |

---

## Recurso: /ventas

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| clienteId | number | Sí | ID del cliente asociado |
| plan | string | Sí | Fibra 100 Mb \| 300 Mb \| 500 Mb \| 1 Gb |
| precio | number | Sí | Precio mensual en pesos COP |
| incluyeTV | boolean | Sí | true \| false |
| incluyeTelefonia | boolean | Sí | true \| false |
| fechaVenta | string | Sí | YYYY-MM-DD |
| fechaInstalacion | string | Sí | YYYY-MM-DD |
| estado | string | Sí | pendiente \| en_agenda \| instalado |
| asesor | string | Sí | Nombre del asesor comercial |

## Endpoints /ventas
| Método | URL | Descripción |
|---|---|---|
| GET | /ventas | Lista todas las ventas |
| GET | /ventas/:id | Obtiene una venta por ID |
| POST | /ventas | Registra una nueva venta |
| PUT | /ventas/:id | Actualiza una venta |

---

## Ejemplo POST /clientes
```json
{
  "nombre": "María Torres",
  "documento": "52123456",
  "telefono": "3109876543",
  "email": "maria@gmail.com",
  "direccion": "Cl 72 #10-34 Apto 501, Bogotá",
  "barrio": "Chapinero",
  "estrato": 4,
  "fechaRegistro": "2025-04-24"
}
```

## Ejemplo POST /ventas
```json
{
  "clienteId": 6,
  "plan": "Fibra 500 Mb",
  "precio": 79990,
  "incluyeTV": true,
  "incluyeTelefonia": false,
  "fechaVenta": "2025-04-24",
  "fechaInstalacion": "2025-05-01",
  "estado": "pendiente",
  "asesor": "Diana Moreno"
}
```
