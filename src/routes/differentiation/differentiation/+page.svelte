<script lang="ts">
	// UI Imports
	import { Grid, NumberInput, Button, TextInput } from '@svelteuidev/core';
	import Info from '$lib/algorithms/differentiation/differentiation/Description.md';

	// Function imports
	import { display } from 'mathlifier';

	// Algorithm imports
	import { Differentiation } from '$lib/algorithms/differentiation/differentiation/algorithm';
	import { parse } from 'mathjs';

	// Page configuration variables
	let title = 'Numerical differentiation';

	// Algorithm related variables
	let x: number;
	let h: number;
	let f: string;
	let differentiation: Differentiation;
	let forward: string[];
	let backward: string[];
	let central: string[];
	let symbols: string[];
	let lines: string[];

	function solve() {
		differentiation = new Differentiation(f, x, h);
		forward = [1, 2, 3, 4].map((n) => differentiation.forward(n).toFixed(6));
		backward = [1, 2, 3, 4].map((n) => differentiation.backward(n).toFixed(6));
		central = [1, 2, 3, 4].map((n) => differentiation.central(n).toFixed(6));
		symbols = [`f^{'}(${x})`, `f^{''}(${x})`, `f^{'''}(${x})`, `f^{(iv)}(${x})`];
		lines = symbols.map(
			(sym, i) => `${sym} \\approx & ${forward[i]} & ${backward[i]} & ${central[i]}`
		);
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
			<TextInput label="f(x)" bind:value={f} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="Value of x" bind:value={x} />
		</Grid.Col>
		<Grid.Col span={1}>
			<NumberInput precision={6} label="Value of h" bind:value={h} />
		</Grid.Col>
		<Grid.Col span={2}>
			<Button class="w-[100%]" on:click={solve}>Solve</Button>
		</Grid.Col>
	</Grid>
</div>

<div class="result">
	{#if lines}
		<h2>Result</h2>
		{@html display(`f(x) = ${parse(f).toTex()}`)}
		{@html display(`\\begin{array}{c:c:c:c}
 & \\text{Forward} & \\text{Backward} & \\text{Central} \\\\ \\hline
 ${lines.join('\\\\')}
\\end{array}`)}
	{/if}
</div>
