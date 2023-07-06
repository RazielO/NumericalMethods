<script lang="ts">
	// UI Imports
	import { display } from 'mathlifier';
	import Info from '$lib/algorithms/regression/multipleLinear/Description.md';
	import { Grid, Button, NumberInput } from '@svelteuidev/core';

	// Algorithm imports
	import { MultipleLinear } from '$lib/algorithms/regression/multipleLinear/algorithm';

	// Page configuration variables
	let title = 'Multiple Linear Regression';
	let show: boolean = false;

	// Algorithm related variables
	let y: number[] = [];
	let x1: number[] = [];
	let x2: number[] = [];
	let leastSquares: MultipleLinear;
	let func: string;
	let texFunc: string;
	let rValue: number;

	function addPoint() {
		x1.push(0);
		x2.push(0);
		y.push(0);
		x1 = x1;
	}

	function removePoint() {
		x1 = x1.slice(0, x1.length - 1);
		x2 = x1.slice(0, x2.length - 1);
		y = y.slice(0, y.length - 1);
	}

	function solve() {
		leastSquares = new MultipleLinear(y, x1, x2);
		func = leastSquares.getFunction();
		rValue = leastSquares.rValue();

		show = true;
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

	<Grid cols={6} class="sm:mx-[25vw]">
		{#each x1 as item, i}
			<Grid.Col span={2}>
				<NumberInput precision={4} label="y{i + 1}" bind:value={y[i]} />
			</Grid.Col>
			<Grid.Col span={2}>
				<NumberInput precision={4} label="x1{i + 1}" bind:value={item} />
			</Grid.Col>
			<Grid.Col span={2}>
				<NumberInput precision={4} label="x2{i + 1}" bind:value={x2[i]} />
			</Grid.Col>
		{/each}

		<Grid.Col span={3}>
			<Button class="w-[100%]" color="violet" on:click={addPoint}>Add Point</Button>
		</Grid.Col>
		<Grid.Col span={3}>
			<Button class="w-[100%]" color="red" on:click={removePoint}>Remove Last Point</Button>
		</Grid.Col>
		<Grid.Col span={6}>
			<Button class="w-[100%]" on:click={solve}>Solve</Button>
		</Grid.Col>
	</Grid>
</div>

<div class="result">
	{#if func}
		<h2>Result</h2>

		{@html display(`f(x) = ${texFunc}`)}
		{@html display(`r = ${rValue.toFixed(6)}`)}
	{/if}
</div>
