import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import externalGlobals from 'rollup-plugin-external-globals'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Base configuration that's common to both builds
  const baseConfig = {
    plugins: [vue()],
  }
  
  // If building the library (when mode === 'library')
  if (mode === 'library') {
    return {
      ...baseConfig,
      build: {
        lib: {
          entry: resolve(__dirname, 'src/lib.js'),
          name: 'DrawerRoutingPlugin',
          fileName: (format) => `drawer-routing.${format}.js`
        },
        rollupOptions: {
          external: ['vue', 'vue-router'],
          output: {
            globals: {
              vue: 'Vue',
              'vue-router': 'VueRouter'
            }
          },
          plugins: [
            externalGlobals({
                bootstrap: 'bootstrap',
            }),
          ],
        },
        outDir: 'dist-lib'
      }
    }
  }
  
  // Otherwise, return the base configuration for the app build
  return baseConfig
})