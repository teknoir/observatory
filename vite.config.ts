import * as path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'context': path.resolve(__dirname, 'src/context'),
      'enums': path.resolve(__dirname, 'src/enums'),
      'layouts': path.resolve(__dirname, 'src/layouts'),
      'ts': path.resolve(__dirname, 'src/ts'),
      'muiComponents': path.resolve(__dirname, 'src/muiComponents'),
      'muiThemes': path.resolve(__dirname, 'src/muiThemes')
    },
  },
  server: {
    host: true,
    port: 5173
  }
})
