import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000  // Cambia el puerto a 3000
  },test: {
    globals: true,
    environment: 'jsdom',
    include: ['__test__/**/*.test.{js,jsx,ts,tsx}'],
    setupFiles: '__test__/setupTests.js',
  },
});

