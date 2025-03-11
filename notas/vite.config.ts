import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Asegúrate de que esto apunte a la raíz del proyecto
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'public/index.html', // Cambia esto para apuntar al archivo correcto
    },
  },
});