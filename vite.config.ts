import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server:{
  //   proxy:{
  //     'http://127.0.0.1:8080/api':{
  //       target:'http://localhost:8080',
  //       changeOrigin: true, 
  //       rewrite: path => path.replace('/api', '')
  //     }
  //   }
  // }
})
