import * as path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'enums': path.resolve(__dirname, 'src/enums'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'ts': path.resolve(__dirname, 'src/ts'),
      'muiComponents': path.resolve(__dirname, 'src/muiComponents')
    },
  },
})
