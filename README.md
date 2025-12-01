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
│   │   └── dashboard/          # Panel principal (futuro)
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

- **Login**: http://localhost:8000/src/views/auth/login/login.html
- **Registro**: http://localhost:8000/src/views/auth/register/register.html

## 🎨 Diseño

- **Paleta de colores**: Marrón (#8B6F47) y Beige (#E8E4E0)
- **Modo oscuro**: Disponible en todas las vistas
- **Diseño**: Responsivo, minimalista, rectangular

## 📋 Características Actuales

✅ Sistema de inicio de sesión con selección de sucursal
✅ Registro de usuarios con validación
✅ Modo claro/oscuro persistente
✅ Diseño responsive
✅ UI/UX según brand Cesantoni

## 🔄 Próximas Mejoras

- [ ] Dashboard principal
- [ ] Integración con backend/API
- [ ] Gestión de inventario
- [ ] Sistema de recomendaciones de productos
- [ ] Reportes y analytics

## 🛠️ Tecnologías

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript Vanilla (ES6+)
- Python (servidor local)
