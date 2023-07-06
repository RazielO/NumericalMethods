<script lang="ts">
	// UI Imports
	import { Grid, NumberInput, Button } from '@svelteuidev/core';
	import Info from '$lib/algorithms/interpolation/linear/Description.md';

	// Function imports
	import { display } from 'mathlifier';

	// Algorithm imports
	import { LinearInterpolation } from '$lib/algorithms/interpolation/linear/algorithm';

	// Page configuration variables
	let title = 'Linear interpolation';

	// Algorithm related variables
	let x0: number;
	let x1: number;
	let fx0: number;
	let fx1: number;
	let x: number;
	let real: number;
	let interpolated: number;
	let error: number | undefined;
	let interpolation: LinearInterpolation;

	function solve() {
		interpolation = new LinearInterpolation(x0, x1, fx0, fx1, x, real);
		interpolated = interpolation.interpolate();
		error = interpolation.error();
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
		<Grid.Col span={1}>
			<NumberInput precision={6} label="x0" bind:value={x0} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="f(x0)" bind:value={fx0} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="x1" bind:value={x1} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="f(x1)" bind:value={fx1} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="Value to interpolate (x)" bind:value={x} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="Real value of f(x) (optional)" bind:value={real} />
		</Grid.Col>
		<Grid.Col span={2}>
			<Button class="w-[100%]" on:click={solve}>Solve</Button>
		</Grid.Col>
	</Grid>
</div>

{#if interpolated}
	<div class="result">
		<h2>Result</h2>
		{@html display(`f(${x}) \\approx ${interpolated.toFixed(6)}`)}
		{#if error}
			{@html display(`\\text{Error:} \\; ${error.toFixed(6)}\\%`)}
		{/if}
	</div>
{/if}
