<script lang="ts">
	// UI Imports
	import Info from '$lib/algorithms/integration/trapezoidal/Description.md';
	import { TextInput, NumberInput, Grid, Button } from '@svelteuidev/core';

	// Algorithm related imports
	import { Trapezoidal } from '$lib/algorithms/integration/trapezoidal/algorithm';

	// Function Imports
	import { parse } from 'mathjs';
	import { display } from 'mathlifier';

	// Page configuration variables
	let title = 'Trapezoidal Rule';

	// Algorithm related variables
	let f: string;
	let a: number;
	let b: number;
	let n: number;
	let trapezoidal: Trapezoidal;
	let result: number;

	function solve() {
		trapezoidal = new Trapezoidal(f, a, b, n);
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
			<NumberInput precision={6} label="Number n of trapezoids" bind:value={n} />
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
