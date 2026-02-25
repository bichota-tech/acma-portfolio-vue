
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css' // Importa el archivo CSS principal que contiene los estilos globales de la aplicación

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

// Aplica el theme inicial
import { useThemeStore } from './stores/theme'
const themeStore = useThemeStore()
if (themeStore.isDark) {
    document.body.classList.add('dark-mode')
}
