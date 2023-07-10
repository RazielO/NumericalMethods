import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from "mdsvex"
import rehypeKatexSvelte from "rehype-katex-svelte";
import remarkMath from 'remark-math'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [mdsvex({
		extensions: ['.md', '.svx'],
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatexSvelte],
	}), vitePreprocess()],
	extensions: ['.svelte', '.md', '.svx'],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
