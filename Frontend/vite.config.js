import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
// https://vite.dev/config/
// configuration for vuetify //
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/storage': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
},
)
