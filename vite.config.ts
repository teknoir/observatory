import * as path from 'path';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_APP_BASENAME || '/',
    plugins: [react()],
    resolve: {
      alias: {
        'assets': path.resolve(__dirname, 'src/assets'),
        'components': path.resolve(__dirname, 'src/components'),
        'context': path.resolve(__dirname, 'src/context'),
        'enums': path.resolve(__dirname, 'src/enums'),
        'layouts': path.resolve(__dirname, 'src/layouts'),
        'ts': path.resolve(__dirname, 'src/ts'),
        'muiComponents': path.resolve(__dirname, 'src/muiComponents'),
        'muiThemes': path.resolve(__dirname, 'src/muiThemes'),
        'services': path.resolve(__dirname, 'src/services'),
        'utils': path.resolve(__dirname, 'src/utils')
      },
    },
    server: {
      host: true,
      port: 5173
    }
  }
})
