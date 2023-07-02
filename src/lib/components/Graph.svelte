<script lang="ts">
	import { Chart, type ChartConfiguration } from 'chart.js/auto';
	import { onMount } from 'svelte';

	export let height = '200px';
	export let width = '200px';
    export let config: ChartConfiguration;
	let graph: HTMLCanvasElement;

	onMount(() => {
		let ctx = graph.getContext('2d');
		// Initialize chart using default config set
		var chart = new Chart(ctx, config);
	});
</script>

<canvas bind:this={graph} class="h-[{height}] w-[{width}]" />
