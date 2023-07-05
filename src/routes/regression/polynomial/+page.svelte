<script lang="ts">
	// UI Imports
	import { display } from 'mathlifier';
	import Info from '$lib/algorithms/regression/polynomial/Description.md';
	import Graph from '$lib/components/Graph.svelte';
	import { Grid, Button, NumberInput } from '@svelteuidev/core';

	// Chart imports
	import Chart, { type ChartConfiguration } from 'chart.js/auto';

	// Function imports
	import { range } from '$lib/functions';
	import { evaluate, max, min, simplify } from 'mathjs';

	// Algorithm imports
	import { Polynomial } from '$lib/algorithms/regression/polynomial/algorithm';

	// Page configuration variables
	let title = 'Polynomial Method';
	let show: boolean = false;
	let config: ChartConfiguration;

	// Algorithm related variables
	let x: number[] = [];
	let y: number[] = [];
	let leastSquares: Polynomial;
	let func: string;
	let texFunc: string;
	let rValue: number;
	let degree: number = 2;

	function addPoint() {
		x.push(0);
		y.push(0);
		x = x;
	}

	function removePoint() {
		x = x.slice(0, x.length - 1);
		y = y.slice(0, y.length - 1);
	}

	function solve() {
		leastSquares = new Polynomial(x, y, degree);
		func = leastSquares.getFunction();
		texFunc = simplify(func).toTex();
		rValue = leastSquares.rValue();

		show = true;
		let end = (x: number) => (x > 0 ? x * 1.2 : x + x * 0.2);
		let start = (x: number) => (x > 0 ? x - x * 0.2 : x * 1.2);
		let xValues = range(start(min(x)), end(max(x)), 0.1);

		const graphData = {
			labels: xValues.map((x) => x.toFixed(1)),
			datasets: [
				{
					type: 'scatter',
					label: 'Data Points',
					data: x.map((val, i) => {
						return { x: val, y: y[i] };
					}),
					borderColor: 'rgb(255, 0, 0)',
					backgroundColor: 'rgb(255, 0, 0)',
					radius: 3
				},
				{
					type: 'line',
					label: `f(x) = ${func}`,
					data: xValues.map((x) => evaluate(func, { x: x })),
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.1,
					pointRadius: 0
				}
			]
		};

		const graphOptions = {
			scales: {
				x: {
					type: 'linear',
					position: 'bottom'
				},
				y: {
					type: 'linear'
				}
			}
		};

		config = {
			type: 'line',
			data: graphData,
			options: graphOptions
		};
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

<div class="calculator mb-[2rem]">
	<h2>Calculator</h2>

	<Grid cols={2} class="sm:mx-[25vw]">
		<Grid.Col span={2}>
			<NumberInput min={1} label="Degree of the polynomial" placeholder="Degree" bind:value={degree} />
		</Grid.Col>

		{#each x as item, i}
			<Grid.Col span={1}>
				<NumberInput precision={4} label="x{i + 1}" bind:value={item} />
			</Grid.Col>
			<Grid.Col span={1}>
				<NumberInput precision={4} label="y{i + 1}" bind:value={y[i]} />
			</Grid.Col>
		{/each}

		<Grid.Col span={1}>
			<Button class="w-[100%]" color="violet" on:click={addPoint}>Add Point</Button>
		</Grid.Col>
		<Grid.Col span={1}>
			<Button class="w-[100%]" color="red" on:click={removePoint}>Remove Last Point</Button>
		</Grid.Col>
		<Grid.Col span={2}>
			<Button class="w-[100%]" on:click={solve}>Solve</Button>
		</Grid.Col>
	</Grid>
</div>

<div class="result">
	{#if func}
		<h2>Result</h2>

		{@html display(`f(x) = ${texFunc}`)}
		{@html display(`r = ${rValue.toFixed(6)}`)}
		{#key config}
			<Graph {config} />
		{/key}
	{/if}
</div>
