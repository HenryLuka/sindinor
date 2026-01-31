
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/sindinor/',
    root: 'src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                admin: resolve(__dirname, 'src/admin/index.html'),
                noticias: resolve(__dirname, 'src/noticias.html'),
                parceiro: resolve(__dirname, 'src/parceiro.html')
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
});
