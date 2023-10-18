import * as path from 'path';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'import.meta.env.VITE_WS_SERVER': JSON.stringify(process.env.VITE_WS_SERVER || env.VITE_WS_SERVER),
      'import.meta.env.VITE_HISTORIAN_DB_SERVER': JSON.stringify(process.env.VITE_HISTORIAN_DB_SERVER || env.VITE_HISTORIAN_DB_SERVER),
    },
    base: env.VITE_APP_BASENAME || '/',
    plugins: [react()],
    resolve: {
      alias: {
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
