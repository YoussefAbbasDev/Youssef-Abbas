import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5000,
  },

  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',

    // Increase chunk size warning limit (R3F + Three.js are inherently large)
    chunkSizeWarningLimit: 2500,

    // Use terser for production minification (removes dead code aggressively)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,    // Remove all console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,             // Two passes for better compression
      },
      mangle: {
        safari10: true,        // Fix Safari 10 bug
      },
      format: {
        comments: false,       // Remove all comments from output
      }
    },

    rollupOptions: {
      output: {
        // Organize output files properly
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          if (/\.(png|jpe?g|gif|webp|svg|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(woff2?|ttf|otf|eot)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (/\.css$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },

        // Let Vite handle dynamic chunk splitting naturally so React and its ecosystem don't have circular dependency issues
      },
    },

    // Generate source maps only in dev (not production)
    sourcemap: false,

    // CSS code splitting for better caching
    cssCodeSplit: true,
  },

  // Pre-bundle frequently used dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'three',
      'clsx',
      'tailwind-merge',
    ],
    exclude: [
      '@splinetool/runtime', // Exclude heavy runtime from pre-bundling
    ],
  },
})
