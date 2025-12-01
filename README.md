# AntonIA FrontEnd

Sistema web interno para Cesantoni

## 📁 Estructura del Proyecto

```
antonIAFrontEnd/
├── public/                      # Archivos estáticos públicos
│   ├── css/                     # Estilos globales
│   │   ├── base.css            # Variables CSS, reset, tipografía
│   │   └── components.css      # Componentes reutilizables (botones, inputs)
│   └── img/                     # Imágenes y logos
│
├── src/                         # Código fuente de la aplicación
│   ├── views/                   # Vistas/Páginas de la aplicación
│   │   ├── auth/               # Autenticación
│   │   │   ├── login/          # Vista de inicio de sesión
│   │   │   │   ├── login.html
│   │   │   │   ├── login.css
│   │   │   │   └── login.js
│   │   │   └── register/       # Vista de registro
│   │   │       ├── register.html
│   │   │       ├── register.css
│   │   │       └── register.js
│   │   └── dashboard/          # Panel principal
│   │       ├── chat-list/      # Lista de conversaciones
│   │       │   ├── chat-list.html
│   │       │   ├── chat-list.css
│   │       │   └── chat-list.js
│   │       └── chat-detail/    # Chat individual
│   │           ├── chat-detail.html
│   │           ├── chat-detail.css
│   │           └── chat-detail.js
│   │
│   ├── services/               # Servicios/API calls (futuro)
│   ├── utils/                  # Utilidades y helpers (futuro)
│   └── config/                 # Configuración (futuro)
│
└── README.md                    # Este archivo
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Python 3.x instalado

### Levantar el servidor local

```bash
# Navegar al directorio del proyecto
cd antonIAFrontEnd

# Iniciar servidor HTTP
python3 -m http.server 8000
```

### Acceder a las vistas

- **Página Principal**: http://localhost:8000/index.html
- **Login**: http://localhost:8000/src/views/auth/login/login.html
- **Registro**: http://localhost:8000/src/views/auth/register/register.html
- **Lista de Chats**: http://localhost:8000/src/views/dashboard/chat-list/chat-list.html
- **Chat Individual**: http://localhost:8000/src/views/dashboard/chat-detail/chat-detail.html

## 🎨 Diseño

- **Paleta de colores**: Marrón (#8B6F47) y Beige (#E8E4E0)
- **Modo oscuro**: Disponible en todas las vistas
- **Diseño**: Responsivo, minimalista, rectangular

## 📋 Características Actuales

✅ Sistema de inicio de sesión con selección de sucursal
✅ Registro de usuarios con validación
✅ Lista de conversaciones tipo app de mensajería
✅ Chat individual con AntonIA (asistente virtual)
✅ Búsqueda en tiempo real de conversaciones
✅ Anclar/desanclar conversaciones
✅ Crear nuevas conversaciones
✅ Botones de acción rápida (cotizar, recomendar)
✅ Manejo de errores con reintentos
✅ Registro de acciones del vendedor
✅ Modo claro/oscuro persistente
✅ Diseño responsive
✅ UI/UX según brand Cesantoni

## 🔄 Próximas Mejoras

- [ ] Integración con backend/API real
- [ ] Funcionalidad de cotización completa
- [ ] Sistema de recomendaciones de productos
- [ ] Consulta de políticas y garantías
- [ ] Gestión de inventario
- [ ] Reportes y analytics

## 🛠️ Tecnologías

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript Vanilla (ES6+)
- Python (servidor local)
