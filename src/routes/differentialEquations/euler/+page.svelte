<script lang="ts">
	// UI Imports
	import { Grid, NumberInput, Button, TextInput } from '@svelteuidev/core';
	import Info from '$lib/algorithms/differentialEquations/euler/Description.md';
	import { Euler } from '$lib/algorithms/differentialEquations/euler/algorithm';
	import ResultTable from '$lib/components/ResultTable.svelte';
	import { display } from 'mathlifier';
	import type { EulerStep } from '$lib/algorithms/differentialEquations/euler/type';

	// Algorithm related variables
	let f: string;
	let x0: number;
	let y0: number;
	let n: number;
	let x: number;
	let euler: Euler;
	let steps: Array<EulerStep>;
	let result: number;

	// Page configuration variables
	let title: string = 'Euler method';
	let headers: string[] = ['n', '\\frac{dy}{dx}[f(x_i, y_i)]', 'x', 'y'];
	let values: string[][];

	function solve() {
		euler = new Euler(f, x, x0, y0, n);
		steps = euler.steps();
		values = steps.map((step) => [
			step.iteration.toString(),
			step.iteration !== 0 ? step.evaluation.toFixed(6) : '',
			step.xi.toFixed(6),
			step.yi.toFixed(6)
		]);
		result = steps[steps.length - 1].yi;
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
			<TextInput label="dy/dx" placeholder="dy/dx" bind:value={f} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="Value of x to calculate" placeholder="x" bind:value={x} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="Number n of spaces" placeholder="n" bind:value={n} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="Value of x0" placeholder="x0" bind:value={x0} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="Value of y0" placeholder="y0" bind:value={y0} />
		</Grid.Col>
		<Grid.Col span={2}>
			<Button class="w-[100%]" on:click={solve}>Solve</Button>
		</Grid.Col>
	</Grid>
</div>

{#if result}
	<div class="result">
		<h2>Result</h2>

		{@html display(`y(${x}) \\approx ${result.toFixed(6)}`)}
		<ResultTable {headers} {values} />
	</div>
{/if}
