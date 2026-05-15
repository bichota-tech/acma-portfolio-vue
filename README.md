# ACMA Portfolio Vue

Aplicación de portfolio personal desarrollada con Vue.js 3, diseñada para ser moderna, rápida e interactiva. El proyecto utiliza un stack tecnológico actualizado para asegurar el mejor rendimiento y una experiencia de usuario fluida, incluyendo animaciones temporales, modo oscuro/claro y transiciones suaves de página (SPA).

## 🚀 Tecnologías Principales

- **[Vue 3](https://vuejs.org/)** - Framework progresivo de JavaScript (Composition API)
- **[Vite](https://vitejs.dev/)** - Herramienta de compilación rápida y dev server
- **[Vue Router](https://router.vuejs.org/)** - Enrutamiento oficial para navegación rápida e ininterrumpida
- **[Pinia](https://pinia.vuejs.org/)** - Sistema de gestión de estado estructurado para Vue
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de utilidades CSS para diseño responsivo
- **[tsParticles](https://particles.js.org/)** - Sistema inteligente para la generación de fondos dinámicos interactivos
- **[Lucide Icons](https://lucide.dev/)** - Biblioteca de iconos modernos (lucide-vue-next)

## 🛠️ Herramientas de Desarrollo

- **Vitest** - Entorno de pruebas unitarias ultrarrápido
- **ESLint & Oxlint** - Análisis estático y linting de código
- **Prettier** - Formateador estricto de código
- **Firebase Hosting** - Preparación y despliegue rápido en producción

## 📂 Estructura del Proyecto

```text
├── .firebase/           # Caché e integración de despliegue
├── public/              # Recursos estáticos servidos directamente
├── src/
│   ├── assets/          # Hojas de estilo globales (variables, utilities), imágenes y fuentes
│   ├── components/      # Componentes UI encapsulados de Vue (layout, ui)
│   ├── composables/     # Hooks reutilizables (Composition API)
│   ├── plugins/         # Plugins y directivas para extender Vue
│   ├── router/          # Configuración de Vue Router y rutas
│   ├── stores/          # Módulos de Pinia (ej. theme, navigation)
│   ├── views/           # Vistas inyectadas por router (Home, About, Projects, etc.)
│   ├── App.vue          # Componente raíz con transiciones y layouts
│   └── main.js          # Entrada principal e inicialización
├── index.html           # Documento de entrada HTML base
├── package.json         # Manifest de dependencias y scripts NPM
├── vite.config.js       # Configuración global del bundler Vite
└── firebase.json        # Configuración predeterminada de Firebase Hosting
```

## 📋 Requisitos Previos

- Node.js `^20.19.0` o `>=22.12.0`
- npm (gestor de paquetes por defecto)
- pnpm (gestor de paquetes recomendado)

## 💻 Instalación y Ejecución Local

1. **Clona el repositorio e ingresa al directorio:**
   ```sh
   git clone <url-del-repositorio>
   git clone https://github.com/tu-usuario/acma-portfolio-vue.git
   cd acma-portfolio-vue
   ```

2. **Instala las dependencias necesarias:**
   ```sh
   npm install
   pnpm install
   ```

3. **Arranque del servidor en modo desarrollo (HMR continuo):**
   ```sh
   npm run dev
   ```
   *El programa facilitará una url local, típicamente `http://localhost:5173/`.*

## ⚙️ Scripts Disponibles

Desde la terminal en el directorio raíz:

- `npm run dev`: Levanta un servidor de desarrollo ultrarrápido por Vite.
- `npm run build`: Acopla, minimiza y prepara tu software para producción, guardándolo en la carpeta `dist/`.
- `npm run preview`: Arranca un servidor temporal que sirve la carpeta `dist/`, ideado para probar el build final de manera local.
- `npm run lint`: Ejecuta el análisis profundo del formato de los archivos.
- `npm run format`: Arregla automáticamente tu código mediante las reglas de Prettier.
- `npm run test:unit`: Evalúa funcionalidad de software mediante tests.
- `pnpm dev`: Levanta un servidor de desarrollo ultrarrápido por Vite.
- `pnpm build`: Acopla, minimiza y prepara tu software para producción, guardándolo en la carpeta `dist/`.
- `pnpm preview`: Arranca un servidor temporal que sirve la carpeta `dist/`, ideado para probar el build final de manera local.
- `pnpm lint`: Ejecuta el análisis profundo del formato de los archivos.
- `pnpm format`: Arregla automáticamente tu código mediante las reglas de Prettier.
- `pnpm test:unit`: Evalúa funcionalidad de software mediante tests.

## 🚀 Despliegue (Firebase)

El proyecto contiene la configuración base para publicarse en Firebase.

1. Asegura tener el CLI de Firebase global:
   ```sh
   npm install -g firebase-tools
   pnpm add -g firebase-tools
   ```
2. Realiza sesión hacia tus proyectos:
   ```sh
   firebase login
   ```
3. Ensambla y publica:
   ```sh
   npm run build
   pnpm build
   firebase deploy --only hosting
   ```
