import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '.',
    sourcemap: true,
    lib: {
      entry: './index.tsx',
      name: '@eduzz/ui-layout',
      formats: ['es'],
      fileName: format => `ui-layout.${format}.js`
    },
    rollupOptions: {
      external: [/node_modules/],
      output: {
        preserveModules: true,
        preserveModulesRoot: '.',
        inlineDynamicImports: false,
        entryFileNames: ({ name: fileName }) => `${fileName}.js`,
        exports: 'named'
      }
    }
  },
  plugins: [react(), cssInjectedByJsPlugin({ topExecutionPriority: true }), dts({ copyDtsFiles: true })]
});
