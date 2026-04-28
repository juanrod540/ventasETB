# Gestión de Ventas ETB - Prueba Técnica

Este proyecto es un portal web moderno diseñado para la gestión de ventas de fibra óptica (FTTH) para ETB Hogar. Permite administrar clientes, registrar nuevas ventas con cálculos automáticos.

## Características

- **Gestión de Clientes**: Registro, visualización y edición de perfiles de clientes.
- **Control de Ventas**: Registro de ventas asociado a clientes existentes.
- **Cálculo Automático**: Selección de planes con carga automática de precios y servicios incluidos (TV/Telefonía).
- **Diseño Premium**: Interfaz moderna, responsiva y alineada con la identidad visual de ETB.
- **Filtrado y Orden**: Posibilidad de ordenar ventas por fecha de instalación.

## Tecnologías Utilizadas

- **Frontend**: React (Vite)
- **Estilos**: CSS3 Vanilla (Variables CSS, Flexbox, Grid)
- **Tipografía**: Lexend (Google Fonts)
- **Backend**: Mock API (json-server)

## Requisitos

- Tener instalado Node.js.

## Instalación y Uso

1. **Clonar el repositorio**
2. **Instalar dependencias**:
   ```bash
   cd frontend
   npm install
   ```
3. **Iniciar el servidor Mock**:
   ```bash
   cd mock-api
   npm start
   ```
4. **Iniciar el frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

---

## Respuestas a Preguntas Técnicas

### 5. Carga de datos de múltiples endpoints
Para que la app no se enredara, usé el hook `useEffect` por separado en cada página. Así, cuando entras a "Ventas", la app pide solo las ventas, y cuando entras a "Clientes", pide solo los clientes. Me pareció más ordenado hacerlo así para que cada parte de la página cargue solo lo que necesita apenas se abre.

### 6. Manejo de secuencia asíncrona de POST
Como todavía estoy aprendiendo a manejar procesos complejos, decidí que crear clientes y ventas fuera por aparte para no tener errores. En el formulario de ventas, usé funciones `async` y `await` para buscar si el cliente existe mientras escribes su ID. También puse bloques `try/catch` por si el servidor falla; así la app no se "traba" y puedo mostrar un mensaje de qué salió mal.

### 7. Cálculo automático del precio del plan
Para esto usé el evento `onChange` en el selector de planes. Apenas eliges un plan (como Fibra 300 Mb), el código busca en una lista que armé llamada `PLANES_CONFIG`. De ahí saca el precio y si tiene TV o no, y lo guarda en el estado de React. 
