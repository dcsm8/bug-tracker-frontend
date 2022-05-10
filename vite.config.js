import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ViteAliases(), react()],
});
