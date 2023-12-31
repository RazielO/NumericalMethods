<script lang="ts">
	// UI Imports
	import { TextInput, NumberInput, Button, Grid, Tabs } from '@svelteuidev/core';
	import { InfoCircled, Table, BarChart, LightningBolt } from 'radix-icons-svelte';
	import Graph from '$lib/components/Graph.svelte';

	// Chart imports
	import Chart, { type ChartConfiguration } from 'chart.js/auto';
	import annotationPlugin from 'chartjs-plugin-annotation';

	// Function imports
	import { evaluate } from 'mathjs';
	import { range } from '$lib/functions';
	import { math } from 'mathlifier';

	// Algorithm imports
	import { NewtonRaphson } from '$lib/algorithms/rootFinding/newtonRaphson/algorithm';
	import type { NewtonRaphsonStep } from '$lib/algorithms/rootFinding/newtonRaphson/type';
	import Info from '$lib/algorithms/rootFinding/newtonRaphson/Description.md';
	import ResultTable from '$lib/components/ResultTable.svelte';

	// Page configuration variables
	let title = 'Newton-Raphson Method';
	let show: boolean = false;
	let config: ChartConfiguration;
	const precision: number = 6;
	const headers: string[] = ['n', 'x_0', 'x_1', 'error'];
	let values: string[][];

	// Algorithm related variables
	let newtonRaphson: NewtonRaphson;
	let x0: number;
	let error: number;
	let func: string;
	let derivative: string;
	let steps: Array<NewtonRaphsonStep>;
	let lastStep: NewtonRaphsonStep;

	function findRoot() {
		newtonRaphson = new NewtonRaphson(x0, error, func, derivative);
		steps = newtonRaphson.steps();
		lastStep = steps[steps.length - 1];

		values = steps.map((step) => [
			step.iteration.toString(),
			step.x0.toFixed(precision),
			step.x1.toFixed(precision),
			step.error.toFixed(precision)
		]);

		show = true;
		let xValues = range(lastStep.x1 - 5, lastStep.x1 + 5, 0.1);

		const graphData = {
			labels: xValues.map((x) => x.toFixed(1)),
			datasets: [
				{
					type: 'scatter',
					label: 'Root',
					data: [{ x: lastStep.x0, y: lastStep.fx0 }],
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
				},
				{
					type: 'line',
					label: `f'(x) = ${derivative}`,
					data: xValues.map((x) => evaluate(derivative, { x: x })),
					fill: false,
					borderColor: 'rgb(75, 192, 75)',
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

	Chart.register(annotationPlugin);
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
		<Grid.Col xs={2} sm={1}>
			<TextInput placeholder="E.g. x^3" label="Function f(x)" bind:value={func} />
		</Grid.Col>
		<Grid.Col xs={2} sm={1}>
			<TextInput placeholder="E.g. 3x^2" label="Derivative f'(x)" bind:value={derivative} />
		</Grid.Col>
		<Grid.Col xs={2} sm={1}>
			<NumberInput
				placeholder="E.g. -2"
				label="First fixed point (x0)"
				bind:value={x0}
				precision={4}
			/>
		</Grid.Col>
		<Grid.Col xs={2} sm={1}>
			<NumberInput
				placeholder="E.g. 0.01"
				label="Allowed error (ep)"
				step={0.01}
				precision={4}
				bind:value={error}
			/>
		</Grid.Col>
		<Grid.Col xs={3} sm={3}><Button on:click={findRoot}>Find root</Button></Grid.Col>
	</Grid>
</div>

<div class="result py-[2rem]">
	{#if steps}
		<Tabs grow on:click={() => console.log('idx')}>
			<Tabs.Tab label="Result" icon={LightningBolt}>
				<p class="text-center text-lg py-[1rem]">
					{#if lastStep.error <= error || lastStep.fx0 === 0}
						Root found on {@html math(lastStep.x1.toFixed(precision))}
					{:else}
						Root not found for {@html math(func)}
					{/if}
				</p>
			</Tabs.Tab>
			<Tabs.Tab label="Graph" icon={BarChart}>
				{#key config}
					<Graph {config} />
				{/key}
			</Tabs.Tab>
			<Tabs.Tab label="Iterations" icon={Table}>
				<h3>Result Table</h3>

				<ResultTable {headers} {values} />
			</Tabs.Tab>
		</Tabs>
	{/if}
</div>
