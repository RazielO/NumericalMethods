<script lang="ts">
	// UI Imports
	import { Stack, NumberInput, Button, Grid, Tabs } from '@svelteuidev/core';
	import { Table, LightningBolt } from 'radix-icons-svelte';
	import Info from '$lib/algorithms/equationSolving/gaussSeidel/Description.md';

	// Algorithm imports
	import { GaussSeidel } from '$lib/algorithms/equationSolving/gaussSeidel/algorithm';

	// Math imports
	import { display } from 'mathlifier';
	import type { GaussSeidelStep } from '$lib/algorithms/equationSolving/gaussSeidel/type';
	import ResultTable from '$lib/components/ResultTable.svelte';

	// Page configuration variables
	let title = 'Gauss-Seidel Method';
	const headers: string[] = ['n', 'solutions', 'errors'];
	let values: string[][];

	// Algorithm related variables
	let gauss: GaussSeidel;
	let steps: Array<GaussSeidelStep>;
	let results: string[];
	let matrix: number[][];
	let approximations: number[];
	let size: number = 3;

	function updateMatrix() {
		matrix = Array(size)
			.fill([])
			.map(() => Array(size + 1));
		approximations = new Array(size);
	}

	function solve() {
		gauss = new GaussSeidel(matrix, 0.001, approximations);
		steps = gauss.steps();
		results = steps[steps.length - 1].newValues;

		values = steps.map((step) => [
			step.iteration.toString(),
			`\\begin{bmatrix} ${step.newValues.join('\\\\')} \\end{bmatrix}`,
			`\\begin{bmatrix} ${step.errors.join('\\\\')} \\end{bmatrix}`
		]);
	}

	updateMatrix();
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

	<Stack align="center">
		<NumberInput
			placeholder="Number of equations"
			label="Number of equations"
			bind:value={size}
			on:change={updateMatrix}
			min={3}
			max={10}
			step={1}
		/>
		<Grid cols={size + 1}>
			{#each matrix as row, i}
				{#each row as _, j}
					<Grid.Col span={1}>
						<NumberInput
							label={j === size ? `= b${i + 1}` : `a${i + 1}${j + 1} x${j + 1}`}
							placeholder="x{j + 1}"
							bind:value={matrix[i][j]}
							precision={4}
						/>
					</Grid.Col>
				{/each}
			{/each}
		</Grid>
		<Stack align="center">
			<p>Initial approximations</p>
			{#each approximations as approximation, i}
				<NumberInput label="x{i}" placeholder="x{i}" bind:value={approximation} precision={4} />
			{/each}
		</Stack>

		<Button on:click={solve}>Find root</Button>
	</Stack>
</div>

<div class="result py-[2rem]">
	{#if steps}
		<Tabs grow>
			<Tabs.Tab label="Results" icon={LightningBolt}>
				{@html display(`\\begin{bmatrix} ${results.join('\\\\')} \\end{bmatrix}`)}
			</Tabs.Tab>
			<Tabs.Tab label="Iterations" icon={Table}>
				<ResultTable {headers} {values} />
			</Tabs.Tab>
		</Tabs>
	{/if}
</div>
