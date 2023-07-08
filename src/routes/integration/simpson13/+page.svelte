<script lang="ts">
	// UI Imports
	import Info from '$lib/algorithms/integration/simpson13/Description.md';
	import { TextInput, NumberInput, Grid, Button } from '@svelteuidev/core';

	// Algorithm related imports
	import { Simpson13 } from '$lib/algorithms/integration/simpson13/algorithm';

	// Function Imports
	import { parse } from 'mathjs';
	import { display } from 'mathlifier';

	// Page configuration variables
	let title = 'Simpson 1/3';

	// Algorithm related variables
	let f: string;
	let a: number;
	let b: number;
	let trapezoidal: Simpson13;
	let result: number;

	function solve() {
		trapezoidal = new Simpson13(f, a, b);
		result = trapezoidal.integrate();
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1 class="text-center">{title}</h1>

<div class="description">
	<h2>Description</h2>

	<Info />
</div>

<div class="calculator">
	<h2>Calculator</h2>

	<Grid cols={2}>
		<Grid.Col span={2}>
			<TextInput label="f(x)" bind:value={f} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="Start of integration a" bind:value={a} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="End of integration b" bind:value={b} />
		</Grid.Col>
		<Grid.Col span={2}>
			<Button class="w-[100%]" on:click={solve}>Solve</Button>
		</Grid.Col>
	</Grid>
</div>

{#if result}
	<div class="result">
		<h2>Result</h2>
		{@html display(`\\int_{${a}}^{${b}} ${parse(f).toTex()} \\approx ${result.toFixed(6)}`)}
	</div>
{/if}
