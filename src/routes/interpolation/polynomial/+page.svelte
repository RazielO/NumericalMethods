<script lang="ts">
	// UI Imports
	import { Grid, NumberInput, Button } from '@svelteuidev/core';
	import Info from '$lib/algorithms/interpolation/polynomial/Description.md';

	// Function imports
	import { display } from 'mathlifier';

	// Algorithm imports
	import { PolynomialInterpolation } from '$lib/algorithms/interpolation/polynomial/algorithm';

	// Page configuration variables
	let title = 'Polynomial interpolation';

	// Algorithm related variables
	let degree: number = 2;
	let x: number[] = new Array(degree + 1).fill(0);
	let fx: number[] = new Array(degree + 1).fill(0);
	let xInt: number;
	let real: number;
	let interpolated: number;
	let interpolation: PolynomialInterpolation;

	function solve() {
		interpolation = new PolynomialInterpolation(x, fx, degree, xInt);
		interpolated = interpolation.interpolate();
	}

	function updateDegree() {
		x = new Array(degree + 1).fill(0);
		fx = new Array(degree + 1).fill(0);
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
			<NumberInput
				min={1}
				label="Degree of interpolation"
				bind:value={degree}
				on:change={updateDegree}
			/>
		</Grid.Col>
		{#each x as xi, i}
			<Grid.Col span={1}>
				<NumberInput precision={6} label="x{i}" bind:value={xi} />
			</Grid.Col>
			<Grid.Col span={1}>
				<NumberInput precision={6} label="f(x{i})" bind:value={fx[i]} />
			</Grid.Col>
		{/each}
		<Grid.Col span={1}>
			<NumberInput precision={6} label="Value to interpolate (x)" bind:value={xInt} />
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
		{@html display(`f(${xInt}) \\approx ${interpolated.toFixed(6)}`)}
	</div>
{/if}
