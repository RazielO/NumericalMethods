<script lang="ts">
	import {
		colorScheme,
		SvelteUIProvider,
		Switch,
		AppShell,
		Header,
		Footer,
		TypographyProvider
	} from '@svelteuidev/core';
	import FaRegMoon from 'svelte-icons/fa/FaRegMoon.svelte';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import FaRegSun from 'svelte-icons/fa/FaRegSun.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';

	import NavbarContent from '$lib/components/NavbarContent.svelte';

	import '../app.css';

	let dark = true;

	function toggleTheme() {
		colorScheme.update((v) => {
			dark = v === 'light' ? true : false;
			return v === 'light' ? 'dark' : 'light';
		});
	}
</script>

<SvelteUIProvider withGlobalStyles themeObserver={$colorScheme}>
	<AppShell fixed navbarOffsetBreakpoint="sm" asideOffsetBreakpoint="sm">
		<Header fixed slot="header" height="3rem" class="flex justify-around">
			<div class="my-auto">
				<NavbarContent />
			</div>

			<div class="w-[6rem] flex justify-center h-[3-rem]">
				<div class="flex-auto h-[1.2rem] my-[0.9rem]">
					{#if !dark}
						<FaSun />
					{:else}
						<FaRegSun />
					{/if}
				</div>
				<div class="flex-auto my-[0.9rem]">
					<Switch on:change={toggleTheme} />
				</div>
				<div class="flex-auto h-[1.2rem] my-[0.9rem]">
					{#if !dark}
						<FaRegMoon />
					{:else}
						<FaMoon />
					{/if}
				</div>
			</div>
		</Header>

		<div class="px-[1rem] py-[2rem] md:py-[4rem] md:px-[2rem]">
			<TypographyProvider>
				<slot />
			</TypographyProvider>
		</div>

		<Footer slot="footer" height="3rem">
			<div class="footer flex w-fit gap-[1rem] justify-center items-center my-[auto]">
				<div class="h-[2rem] my-[0.9rem]">
					<GoMarkGithub />
				</div>

				<a class:dark={dark} href="https://github.com/RazielO/NumericalMethods"> RazielO/NumericalMethods </a>
			</div>
		</Footer>
	</AppShell>
</SvelteUIProvider>

<style>
	.footer {
		margin: 0 auto;
	}

	.footer a {
		color: rgb(34, 139, 230);
		text-decoration: underline;
	}
	.footer a.dark {
		
		color: rgb(77, 171, 247);
	}
</style>