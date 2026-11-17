import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    }
  },

  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,

    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "web.to-do-list.dev",
    ],

    // hmr: {
    //   protocol: "ws",
    //   host: "web.to-do-list.dev",
    //   clientPort: 443,
    // }
  }
})
