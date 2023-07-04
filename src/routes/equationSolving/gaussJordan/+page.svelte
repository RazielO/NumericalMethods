<script lang="ts">
	// UI Imports
	import { Stack, NumberInput, Button, Grid, Tabs } from '@svelteuidev/core';
	import { Table, LightningBolt } from 'radix-icons-svelte';
	import Info from '$lib/algorithms/equationSolving/gaussJordan/Description.md';

	// Algorithm imports
	import { GaussJordan } from '$lib/algorithms/equationSolving/gaussJordan/algorithm';

	// Math imports
	import { display } from 'mathlifier';

	// Page configuration variables
	let title = 'Gauss-Jordan Method';

	// Algorithm related variables
	let gauss: GaussJordan;
	let steps: Array<number[][]>;
	let results: string[];
	let matrix: number[][];
	let size: number = 3;

	function updateMatrix() {
		matrix = Array(size)
			.fill([])
			.map(() => Array(size + 1));
	}

	function solve() {
		gauss = new GaussJordan(matrix);
		steps = gauss.steps();
		results = gauss.results();
	}

	function formatNumber(n: number): string {
		return Number.isInteger(n) ? n.toString() : n.toFixed(4);
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
				{#each row as cell, j}
					<Grid.Col span={1}>
						<NumberInput
							label={j === size ? `= b${i + 1}` : `a${i + 1}${j + 1} x${j + 1}`}
							placeholder="x{j + 1}"
							bind:value={matrix[i][j]}
						/>
					</Grid.Col>
				{/each}
			{/each}
		</Grid>
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
				{#each steps as step}
					{@html display(`\\left[{\\begin{array}{rrr|r}
					${step.map((x) => x.map((y) => formatNumber(y)).join(' & ')).join(' \\\\ ')}
					\\end{array}}\\right]`)}
				{/each}
			</Tabs.Tab>
		</Tabs>
	{/if}
</div>
