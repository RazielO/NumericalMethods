<script lang="ts">
	// UI Imports
	import {
		TextInput,
		NumberInput,
		Button,
		Grid,
		Modal,
		Group,
		TypographyProvider,
		Tabs
	} from '@svelteuidev/core';
	import { InfoCircled, Table, BarChart, LightningBolt } from 'radix-icons-svelte';
	import Graph from '$lib/components/Graph.svelte';

	// Chart imports
	import Chart, { type ChartConfiguration } from 'chart.js/auto';
	import annotationPlugin from 'chartjs-plugin-annotation';

	// Function imports
	import { evaluate } from 'mathjs';
	import { range } from '$lib/functions';

	// Algorithm imports
	import { FixedPoint } from '$lib/algorithms/rootFinding/fixedPoint/algorithm';
	import type { FixedPointStep } from '$lib/algorithms/rootFinding/fixedPoint/type';
	import Info from '$lib/algorithms/rootFinding/fixedPoint/Description.md';

	// Page configuration variables
	let title = 'Fixed Point Method';
	let show: boolean = false;
	let config: ChartConfiguration;
	const precision: number = 6;

	// Algorithm related variables
	let fixedPoint: FixedPoint;
	let x0: number;
	let error: number;
	let func: string;
	let steps: Array<FixedPointStep>;
	let lastStep: FixedPointStep;

	function findRoot() {
		fixedPoint = new FixedPoint(x0, func, error);
		steps = fixedPoint.steps();
		lastStep = steps[steps.length - 1];
		show = true;
		let xValues = range(lastStep.x1 - 5, lastStep.x1 + 5, 0.1);

		const graphData = {
			labels: xValues.map((x) => x.toFixed(1)),
			datasets: [
				{
					type: 'scatter',
					label: 'Root',
					data: [{ x: lastStep.x1, y: lastStep.gx1 }],
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
		<Grid.Col xs={3} sm={3}>
			<TextInput placeholder="E.g. x^3" label="Function" bind:value={func} />
		</Grid.Col>
		<Grid.Col xs={3} sm={1}>
			<NumberInput placeholder="E.g. -2" label="First fixed point (x0)" bind:value={x0} />
		</Grid.Col>
		<Grid.Col xs={3} sm={1}>
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
					{#if lastStep.error <= error || lastStep.gx1 === 0}
						Root found on <b>{lastStep.x1.toFixed(precision)}</b>
					{:else}
						Root not found for {func}
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
				<table>
					<thead>
						<th>n</th>
						<th>x0</th>
						<th>x1</th>
						<th>error</th>
					</thead>
					<tbody>
						{#each steps as step}
							<tr>
								<td>{step.iteration}</td>
								<td>{step.x0.toFixed(precision)}</td>
								<td>{step.x1.toFixed(precision)}</td>
								<td>{step.error.toFixed(precision)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</Tabs.Tab>
		</Tabs>
	{/if}
</div>
