import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'

createApp(App).mount('#app')

// Service worker só em produção (no `npm run dev` o cache atrapalharia)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch((err) => console.warn('Service worker não registrado:', err))
  })
}
