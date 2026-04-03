import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')


const dark_light = (m) => {
    const mode = m ?? (localStorage.mode === 'dark' ? 'light' : 'dark')
    document.documentElement.classList.toggle('dark', mode === 'dark')
    localStorage.mode = mode
  }
dark_light(localStorage.mode)
window.dark_light = dark_light

