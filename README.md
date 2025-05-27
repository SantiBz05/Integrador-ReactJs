# Frontend - React CRUD Productos y Usuarios

## Descripción
Aplicación frontend desarrollada con **React** y **Vite** que consume una API REST backend para manejar CRUDs de productos y usuarios. Utiliza axios para la comunicación HTTP y una librería UI para el diseño.

## Tecnologías
- React + Vite
- Axios
- Librería UI: Bootstrap (React-Bootstrap) / Tailwind CSS / PrimeReact (usar según elección)
- jspdf para exportar PDFs

## Funcionalidades
- **CRUD Productos**
  - Mostrar listado de productos
  - Formulario para crear producto
  - Editar producto con formulario
  - Eliminar producto con botón

- **CRUD Usuarios**
  - Listado de usuarios (nombre, email, edad)
  - Crear, editar y eliminar usuarios con formularios y botones

- **Exportación a PDF**
  - Botones para exportar listado de productos y listado de usuarios en formato PDF ordenado (tablas)

- **UI**
  - Componentes separados o pestañas para productos y usuarios
  - Diseño organizado, con colores, márgenes y botones bien definidos

## Instalación y ejecución
1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd frontend

2. Instalar dependencias:
    npm install

3. Ejecutar la app:
    npm run dev

### Uso
- Navegar entre pestañas de Productos y Usuarios.

- Crear, editar y eliminar registros.

- Exportar los listados a PDF con los botones correspondientes.

### Notas
- La UI utiliza [indicar la librería usada: React-Bootstrap, Tailwind CSS o PrimeReact].

- Para la exportación a PDF se usa la librería jspdf.

