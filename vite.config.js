import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true },
  preview: { 
    port: 4173, 
    host: true,
    allowedHosts: ['peterbilt-primrose-flow-chart.onrender.com']
  },
  build: {
    chunkSizeWarningLimit: 1000 // Set to 1000kb, or whatever you prefer
  }
});
