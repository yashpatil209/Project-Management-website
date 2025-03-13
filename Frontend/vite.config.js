import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env': process.env,
    global: "window",
  }
})
