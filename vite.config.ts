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
        'components': path.resolve(__dirname, 'src/components'),
        'context': path.resolve(__dirname, 'src/context'),
        'enums': path.resolve(__dirname, 'src/enums'),
        'hooks': path.resolve(__dirname, 'src/hooks'),
        'layouts': path.resolve(__dirname, 'src/layouts'),
        'ts': path.resolve(__dirname, 'src/ts'),
        'muiComponents': path.resolve(__dirname, 'src/muiComponents'),
        'muiThemes': path.resolve(__dirname, 'src/muiThemes'),
        'services': path.resolve(__dirname, 'src/services')
      },
    },
    server: {
      host: true,
      port: 5173
    }
  }
})
