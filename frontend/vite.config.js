import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
	base: '/',
	plugins: [react(), viteTsconfigPaths()],
	server: {
		open: true,
		port: 3001,
	},

	css: {
		modules: {
			localsConvention: 'camelCase',
			generateScopedName: '[name]__[local]___[hash:base64:5]',
		},
		preprocessorOptions: {
			scss: {},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		sourcemap: true,
		cssCodeSplit: true,
	},
});
