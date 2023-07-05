<script lang="ts">
	import {
		colorScheme,
		SvelteUIProvider,
		Stack,
		Switch,
		Text,
		Grid,
		fns,
		AppShell,
		Navbar,
		Header,
		Aside,
		Footer,
		ShellSection,
		TypographyProvider
	} from '@svelteuidev/core';
	import FaRegMoon from 'svelte-icons/fa/FaRegMoon.svelte';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import FaRegSun from 'svelte-icons/fa/FaRegSun.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';

	import NavbarContent from '$lib/components/NavbarContent.svelte';

	import '../app.css';

	let dark = true;

	function toggleTheme() {
		colorScheme.update((v) => {
			dark = !dark;
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

		<!-- <Aside slot="aside">
			<AsideContent />
		</Aside> -->

		<Footer slot="footer" height="5rem">
			<p class="mx-auto block w-fit leading-[5rem]">GitHub.com/RazielO/NumericalMethods</p>
		</Footer>
	</AppShell>
</SvelteUIProvider>
