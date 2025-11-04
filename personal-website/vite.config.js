import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) =>({
  plugins: [react()],
  base: '/personal-website/',
  base: command === 'build' ? '/personal-website/' : '/', // '/' in dev
}))
