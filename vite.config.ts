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
    // Bump the warning ceiling: this is a 3D app; three.js dominates the
    // vendor bundle and there is nothing meaningful to split off it.
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // All third-party code goes in ONE vendor chunk, separate from app
          // code. Splitting vendor libraries across multiple chunks triggered
          // CJS-interop init-order races (a consumer chunk evaluating before
          // the chunk that defines React / THREE), which threw
          // "Cannot read properties of undefined" and blanked the page. A
          // single vendor chunk keeps all third-party init order intra-chunk
          // (Rollup orders it correctly) while still letting the browser cache
          // vendor separately from frequently-changing app code.
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
