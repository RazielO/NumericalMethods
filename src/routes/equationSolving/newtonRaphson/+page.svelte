<script lang="ts">
	// UI Imports
	import { Stack, NumberInput, Button, Grid, Tabs, Group, TextInput } from '@svelteuidev/core';
	import { Table, LightningBolt } from 'radix-icons-svelte';
	import Info from '$lib/algorithms/equationSolving/newtonRaphson/Description.md';

	// Algorithm imports
	import { MultivariableNewtonRaphson } from '$lib/algorithms/equationSolving/newtonRaphson/algorithm';
	import type { NewtonRaphsonStep } from '$lib/algorithms/equationSolving/newtonRaphson/type';

	// Math imports
	import { display } from 'mathlifier';
	import ResultTable from '$lib/components/ResultTable.svelte';

	// Page configuration variables
	let title = 'Newton-Raphson Method';
	const headers: string[] = ['n', 'x', 'y', '\\Delta x', '\\Delta y', 'error_x', 'error_y'];
	let values: string[][];

	// Algorithm related variables
	let gauss: MultivariableNewtonRaphson;
	let steps: Array<NewtonRaphsonStep>;
	let lastStep: NewtonRaphsonStep;
	let results: string[];
	let tolerance: number = 0.01;
	let f: string;
	let g: string;
	let fx: string;
	let fy: string;
	let gx: string;
	let gy: string;
	let x: number;
	let y: number;

	function solve() {
		gauss = new MultivariableNewtonRaphson(f, g, fx, fy, gx, gy, x, y, tolerance);
		steps = gauss.steps();
		lastStep = steps[steps.length - 1];
		results = [lastStep.x.toFixed(6), lastStep.y.toFixed(6)];

		values = steps.map((step) => [
			step.iteration.toString(),
			step.x.toFixed(6),
			step.y.toFixed(6),
			step.deltaX.toFixed(6),
			step.deltaY.toFixed(6),
			step.errorX.toFixed(6),
			step.errorY.toFixed(6)
		]);
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

	<Grid cols={3}>
		<Grid.Col xs={3} sm={1}>
			<TextInput placeholder="E.g. xy" label="Function f(x, y)" bind:value={f} />
		</Grid.Col>
		<Grid.Col xs={3} sm={1}>
			<TextInput placeholder="E.g. y" label="Partial derivative on x of f" bind:value={fx} />
		</Grid.Col>
		<Grid.Col xs={3} sm={1}>
			<TextInput placeholder="E.g. y" label="Partial derivative on y of f" bind:value={fy} />
		</Grid.Col>
		<Grid.Col xs={3} sm={1}>
			<TextInput placeholder="E.g. xy" label="Function g(x, y)" bind:value={g} />
		</Grid.Col>
		<Grid.Col xs={3} sm={1}>
			<TextInput placeholder="E.g. y" label="Partial derivative on x of g" bind:value={gx} />
		</Grid.Col>
		<Grid.Col xs={3} sm={1}>
			<TextInput placeholder="E.g. y" label="Partial derivative on y of g" bind:value={gy} />
		</Grid.Col>
		<Grid.Col xs={3} sm={1}>
			<NumberInput placeholder="E.g. -2" label="Initial value of x" bind:value={x} precision={4} />
		</Grid.Col>
		<Grid.Col xs={3} sm={1}>
			<NumberInput placeholder="E.g. 2" label="Initial value of y" bind:value={y} precision={4} />
		</Grid.Col>
		<Grid.Col xs={3} sm={1}>
			<NumberInput
				placeholder="E.g. 0.01"
				label="Allowed error (ep)"
				step={0.01}
				precision={4}
				bind:value={tolerance}
			/>
		</Grid.Col>
		<Grid.Col xs={3} sm={3}><Button on:click={solve}>Find root</Button></Grid.Col>
	</Grid>
</div>

<div class="result py-[2rem]">
	{#if steps}
		<Tabs grow>
			<Tabs.Tab label="Results" icon={LightningBolt}>
				{@html display(`\\begin{bmatrix}
				x = ${results[0]} \\\\
				y = ${results[1]}
				\\end{bmatrix}`)}
			</Tabs.Tab>
			<Tabs.Tab label="Iterations" icon={Table}>
				<ResultTable {headers} {values} />
			</Tabs.Tab>
		</Tabs>
	{/if}
</div>
