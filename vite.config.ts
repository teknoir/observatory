import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'import.meta.env.VITE_WS_SERVER': JSON.stringify(
        process.env.VITE_WS_SERVER || env.VITE_WS_SERVER
      ),
      'import.meta.env.VITE_HISTORIAN_DB_SERVER': JSON.stringify(
        process.env.VITE_HISTORIAN_DB_SERVER || env.VITE_HISTORIAN_DB_SERVER
      ),
      'import.meta.env.VITE_MEDIA_MP4_API': JSON.stringify(
        process.env.VITE_MEDIA_MP4_API || env.VITE_MEDIA_MP4_API
      ),
      'import.meta.env.VITE_MEDIA_JPEG_API': JSON.stringify(
        process.env.VITE_MEDIA_JPEG_API || env.VITE_MEDIA_JPEG_API
      ),
      'import.meta.env.VITE_USE_MOCK_HISTORIAN_DB':
        env.VITE_USE_MOCK_HISTORIAN_DB
          ? JSON.parse(env.VITE_USE_MOCK_HISTORIAN_DB)
          : false,
    },
    base: env.VITE_APP_BASENAME || '/',
    plugins: [react()],
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        context: path.resolve(__dirname, 'src/context'),
        enums: path.resolve(__dirname, 'src/enums'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        layouts: path.resolve(__dirname, 'src/layouts'),
        muiComponents: path.resolve(__dirname, 'src/muiComponents'),
        muiThemes: path.resolve(__dirname, 'src/muiThemes'),
        routes: path.resolve(__dirname, 'src/routes'),
        services: path.resolve(__dirname, 'src/services'),
        ts: path.resolve(__dirname, 'src/ts'),
        utils: path.resolve(__dirname, 'src/utils'),
      },
    },
    server: {
      host: true,
      port: 5173,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      testMatch: ['./**/*.test.tsx'],
      setupFiles: './tests/setup.ts',
    },
  };
});
