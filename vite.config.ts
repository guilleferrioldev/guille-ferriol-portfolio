import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

declare const process: { env: Record<string, string | undefined> }

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Run `ANALYZE=1 pnpm build` to emit dist/stats.html (bundle size report).
    process.env.ANALYZE
      ? visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true })
      : undefined,
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // Keep ALL of three (incl. examples/jsm + three-stdlib) in ONE chunk.
          // Splitting three creates duplicate THREE instances and breaks r3f
          // instanceof checks at runtime.
          if (
            id.includes('/three/') ||
            id.includes('three-stdlib') ||
            id.includes('three-mesh-bvh')
          )
            return 'three'
          if (id.includes('@react-three') || id.includes('@react-spring'))
            return 'r3f'
          // Must come before the react-vendor catch-all (react-i18next).
          if (id.includes('i18next')) return 'i18n'
          if (id.includes('gsap')) return 'gsap'
          if (
            id.includes('react-dom') ||
            id.includes('/scheduler/') ||
            id.includes('/react/')
          )
            return 'react-vendor'
        },
      },
    },
  },
})
