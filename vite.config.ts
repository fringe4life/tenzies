import { defineConfig,} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ReactCompilerConfig = { target: "19"}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
          plugins: [
            ["babel-plugin-react-compiler", ReactCompilerConfig],
          ],
        },
      } ), tailwindcss()],
  build:{
    minify: 'terser',
    target: ['es2020'],
    terserOptions: {
      ecma: 2020,
      compress: {
        drop_console: true,
        drop_debugger: true,
        
      },
      format: {
        comments: false,
        ecma: 2020,
      },
      
    },
    rollupOptions: {
      input: ['index.html']
    }
  }
})
