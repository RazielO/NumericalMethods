<script lang="ts">
	import { menuItems } from '$lib/menuItems';
	import { Grid } from '@svelteuidev/core';

	let title = ' Numerical Method Collection';
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1 class="text-center mb-[2rem]">
    {title}
</h1>

<Grid cols={6}>
	{#each menuItems as item, i}
		<Grid.Col xs={3} sm={2}>
			<b>{i + 1}. {item.title}</b>
			<ul>
				{#each item.links as link}
					<li>
						<a href="{item.folder}/{link.href}">{link.title}</a>
					</li>
				{/each}
			</ul>
		</Grid.Col>
	{/each}
</Grid>

<!-- <li>
			<b>{item.title}</b>
			<ul>
				{#each item.links as link}
					<li>
						<a href="{item.folder}/{link.href}">{link.title}</a>
					</li>
				{/each}
			</ul>
		</li> -->
