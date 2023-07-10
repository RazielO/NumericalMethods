<script lang="ts">
	import { menuItems } from '$lib/menuItems';
	import { Button, Menu } from '@svelteuidev/core';
</script>

<Menu style="overflow-">
	<Button slot="control" variant="subtle" ripple>Menu</Button>
	{#each menuItems as item}
		<Menu.Item>
			<Menu>
				<Button slot="control" variant="subtle" color="dark" class="text-left">
					<b>{item.title}</b>
				</Button>
				{#each item.links as link}
					<Menu.Item root="a" href="{item.folder}/{link.href}">{link.title}</Menu.Item>
				{/each}
			</Menu>
		</Menu.Item>
	{/each}
</Menu>
