import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { isoImport } from 'vite-plugin-iso-import'

export default defineConfig({
	plugins: [isoImport(), sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
				silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'abs-percent'],
			},
		},
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
