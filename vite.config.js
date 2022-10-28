import path from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
    plugins: [reactRefresh()],
    // base: '/basiir/test3/',

    // base: '', localhost
    base: '',
    build: {
        chunkSizeWarningLimit: 1600,
    },
})
