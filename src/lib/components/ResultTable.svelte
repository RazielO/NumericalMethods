<script lang="ts">
	import { math } from 'mathlifier';

	export let headers: string[];
	export let values: string[][];
</script>

<table>
	<thead>
		{#each headers as header}
			<th style="text-align: center;">{@html math(header)}</th>
		{/each}
	</thead>
	<tbody>
		{#each values as step}
			<tr>
				{#each step as item}
					<td class="text-center">{@html math(item)}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
