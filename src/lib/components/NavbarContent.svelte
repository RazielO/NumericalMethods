<script lang="ts">
	import { Button, Menu } from '@svelteuidev/core';

	const menuItems = [
		{
			title: 'Root Finding',
			folder: '/rootFinding',
			links: [
				{ href: 'bisection', title: 'Bisection' },
				{ href: 'regulaFalsi', title: 'Regula Falsi' },
				{ href: 'fixedPoint', title: 'Fixed Point' },
				{ href: 'newtonRaphson', title: 'Newton-Raphson' },
				{ href: 'secant', title: 'Secant' }
			]
		},
		{
			title: 'Equation Solving',
			folder: '/equationSolving',
			links: [
				{ href: 'gauss', title: 'Gauss' },
				{ href: 'gaussJordan', title: 'Gauss-Jordan' },
				{ href: 'gaussSeidel', title: 'Gauss-Seidel' },
				{ href: 'jacobi', title: 'Jacobi' }
			]
		},
		{
			title: 'Multi variable Equation Solving',
			folder: '/equationSolving',
			links: [{ href: 'newtonRaphson', title: 'Newton-Raphson' }]
		},
		{
			title: 'Regression',
			folder: '/regression',
			links: [
				{ href: 'leastSquares', title: 'Least Squares' },
				{ href: 'polynomial', title: 'Polynomial' },
				{ href: 'multipleLinear', title: 'Multiple Linear' }
			]
		},
		{
			title: 'Interpolation',
			folder: '/interpolation',
			links: [
				{ href: 'linear', title: 'Linear' },
				{ href: 'polynomial', title: 'Polynomial' }
			]
		}
	];
</script>

<Menu style="overflow-">
	<Button slot="control" variant="subtle" ripple>Menu</Button>
	{#each menuItems as item}
		<Menu.Item>
			<Menu>
				<Button slot="control" variant="subtle" color="dark" class="text-left">
					<b>{item.title}</b>
				</Button>
				{#each item.links as link}
					<Menu.Item root="a" href="{item.folder}/{link.href}">{link.title}</Menu.Item>
				{/each}
			</Menu>
		</Menu.Item>
	{/each}
</Menu>
