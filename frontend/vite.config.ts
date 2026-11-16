import react, { reactCompilerPreset } from '@vitejs/plugin-react'
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

  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,

    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "web.to-do-list.dev",
    ],

    hmr: {
      protocol: "wss",
      host: "web.to-do-list.dev",
      clientPort: 443,
    }
  }
})
