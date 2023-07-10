<script lang="ts">
	// UI Imports
	import { Grid, NumberInput, Button, TextInput, Tabs } from '@svelteuidev/core';
	import Info from '$lib/algorithms/differentialEquations/rungeKutta/Description.md';
	import ResultTable from '$lib/components/ResultTable.svelte';
	import { display } from 'mathlifier';

	// Algorithm related imports
	import { RungeKutta } from '$lib/algorithms/differentialEquations/rungeKutta/algorithm';
	import type {
		FourthOrderStep,
		SecondOrderStep
	} from '$lib/algorithms/differentialEquations/rungeKutta/type';

	// Algorithm related variables
	let f: string;
	let x0: number;
	let y0: number;
	let h: number;
	let x: number;
	let euler: RungeKutta;
	let steps2nd: Array<SecondOrderStep>;
	let result2nd: number;
	let steps4th: Array<FourthOrderStep>;
	let result4th: number;

	// Page configuration variables
	let title: string = 'Runge-Kutta method';
	let headers2nd: string[] = ['n', 'x', 'y', 'k_1', 'k_2'];
	let values2nd: string[][];
	let headers4th: string[] = ['n', 'x', 'y', 'k_1', 'k_2', 'k_3', 'k_4'];
	let values4th: string[][];

	function solve() {
		euler = new RungeKutta(f, x, x0, y0, h);
		steps2nd = euler.secondOrder();
		values2nd = steps2nd.map((step) => [
			step.iteration.toString(),
			step.xi.toFixed(6),
			step.yi.toFixed(6),
			step.iteration !== 0 ? step.k1.toFixed(6) : '',
			step.iteration !== 0 ? step.k2.toFixed(6) : ''
		]);
		result2nd = steps2nd[steps2nd.length - 1].yi;

		steps4th = euler.fourthOrder();
		values4th = steps4th.map((step) => [
			step.iteration.toString(),
			step.xi.toFixed(6),
			step.yi.toFixed(6),
			step.iteration !== 0 ? step.k1.toFixed(6) : '',
			step.iteration !== 0 ? step.k2.toFixed(6) : '',
			step.iteration !== 0 ? step.k3.toFixed(6) : '',
			step.iteration !== 0 ? step.k4.toFixed(6) : ''
		]);
		result4th = steps4th[steps4th.length - 1].yi;
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
			<NumberInput precision={6} label="Size h of step" placeholder="h" bind:value={h} />
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

{#if result2nd}
	<div class="result">
		<h2>Result</h2>

		<Tabs grow>
			<Tabs.Tab label="Second order">
				{@html display(`y(${x}) \\approx ${result2nd.toFixed(6)}`)}
				<ResultTable headers={headers2nd} values={values2nd} />
			</Tabs.Tab>

			<Tabs.Tab label="Fourth order">
				{@html display(`y(${x}) \\approx ${result4th.toFixed(6)}`)}
				<ResultTable headers={headers4th} values={values4th} />
			</Tabs.Tab>
		</Tabs>
	</div>
{/if}
