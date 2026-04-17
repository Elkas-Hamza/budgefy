import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const dark_light = (m) => {
  const savedMode = localStorage.getItem('mode')
  const mode = m ?? (savedMode === 'dark' ? 'light' : 'dark')
  document.documentElement.classList.toggle('dark', mode === 'dark')
  localStorage.setItem('mode', mode)
}

window.dark_light = dark_light
dark_light(localStorage.getItem('mode'))

createApp(App).use(router).mount('#app')

