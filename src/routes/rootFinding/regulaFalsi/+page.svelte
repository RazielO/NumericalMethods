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
	import { RegulaFalsi } from '$lib/algorithms/rootFinding/regulaFalsi/algorithm';
	import type { RegulaFalsiStep } from '$lib/algorithms/rootFinding/regulaFalsi/type';
	import Info from '$lib/algorithms/rootFinding/regulaFalsi/Description.md';

	// Page configuration variables
	let title = 'Regula Falsi Method';
	let show: boolean = false;
	let modalOpened: boolean = false;
	let config: ChartConfiguration;

	// Algorithm related variables
	let regulaFalsi: RegulaFalsi;
	let a: number;
	let b: number;
	let error: number;
	let func: string;
	let steps: Array<RegulaFalsiStep>;

	function findRoot() {
		regulaFalsi = new RegulaFalsi(a, b, error, func);
		steps = regulaFalsi.steps();
		show = true;
		let end = (x: number) => (x > 0 ? x * 1.2 : x + x * 0.2);
		let start = (x: number) => (x > 0 ? x - x * 0.2 : x * 1.2);
		let xValues = range(start(a), end(b), 0.1);

		const graphData = {
			labels: xValues.map((x) => x.toFixed(1)),
			datasets: [
				{
					type: 'scatter',
					label: 'Root',
					data: [{ x: steps[steps.length - 1].xr, y: steps[steps.length - 1].fxr }],
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
			},
			plugins: {
				annotation: {
					annotations: {
						lineA: {
							type: 'line',
							xMin: a,
							xMax: a,
							borderColor: 'rgb(255, 99, 132)',
							borderWidth: 2,
							label: {
								display: true,
								content: `a = ${a}`
							}
						},
						lineB: {
							type: 'line',
							xMin: b,
							xMax: b,
							borderColor: 'rgb(75, 255, 132)',
							borderWidth: 2,
							label: {
								display: true,
								content: `b = ${b}`
							}
						}
					}
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

	const closeModal = () => (modalOpened = false);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1 class="text-center">{title}</h1>

<div class="description">
	<h2>Description</h2>
	<Modal
		opened={modalOpened}
		overflow="inside"
		on:close={closeModal}
		size="calc(100vw - 2rem)"
		{title}
	>
		<TypographyProvider>
			<Info />
		</TypographyProvider>
	</Modal>

	<Group position="center">
		<Button on:click={() => (modalOpened = true)}>
			<div class="flex gap-2">
				<InfoCircled /> Info
			</div>
		</Button>
	</Group>
</div>

<div class="calculator">
	<h2>Calculator</h2>

	<Grid cols={3}>
		<Grid.Col xs={3} sm={3}
			><TextInput placeholder="E.g. x^3" label="Function" bind:value={func} /></Grid.Col
		>
		<Grid.Col xs={3} sm={1}
			><NumberInput placeholder="E.g. -2" label="Start point (a)" bind:value={a} /></Grid.Col
		>
		<Grid.Col xs={3} sm={1}
			><NumberInput placeholder="E.g. 2" label="End point (b)" bind:value={b} /></Grid.Col
		>
		<Grid.Col xs={3} sm={1}
			><NumberInput
				placeholder="E.g. 0.01"
				label="Allowed error (ep)"
				step={0.01}
				precision={4}
				bind:value={error}
			/></Grid.Col
		>
		<Grid.Col xs={3} sm={3}><Button on:click={findRoot}>Find root</Button></Grid.Col>
	</Grid>
</div>

<div class="result py-[2rem]">
	{#if steps}
		<Tabs grow on:click={() => console.log('idx')}>
			<Tabs.Tab label="Result" icon={LightningBolt}>
				<p class="text-center text-lg py-[1rem]">
					{#if Number.parseFloat(steps[steps.length - 1].error) <= error || Number.parseFloat(steps[steps.length - 1].fxr) === 0}
						Root found on <b>{steps[steps.length - 1].xr}</b>
					{:else}
						Root not found for {func} on the interval [{a}, {b}]
					{/if}
				</p>
			</Tabs.Tab>
			<Tabs.Tab label="Graph" icon={BarChart} on:click={() => (modalOpened = !modalOpened)}>
				{#key config}
					<Graph {config} />
				{/key}
			</Tabs.Tab>
			<Tabs.Tab label="Iterations" icon={Table}>
				<h3>Result Table</h3>
				<table>
					<thead>
						<th>n</th>
						<th>a</th>
						<th>b</th>
						<th>xR</th>
						<th>error</th>
					</thead>
					<tbody>
						{#each steps as step}
							<tr>
								<td>{step.iteration}</td>
								<td>{step.a}</td>
								<td>{step.b}</td>
								<td>{step.xr}</td>
								<td>{step.error}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</Tabs.Tab>
		</Tabs>
	{/if}
</div>
