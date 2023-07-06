<script lang="ts">
	import { Button, Menu } from '@svelteuidev/core';

	const menuItems = [
		{
			title: 'Root Finding',
			links: [
				{ href: '/rootFinding/bisection', title: 'Bisection' },
				{ href: '/rootFinding/regulaFalsi', title: 'Regula Falsi' },
				{ href: '/rootFinding/fixedPoint', title: 'Fixed Point' },
				{ href: '/rootFinding/newtonRaphson', title: 'Newton-Raphson' },
				{ href: '/rootFinding/secant', title: 'Secant' }
			]
		},
		{
			title: 'Equation Solving',
			links: [
				{ href: '/equationSolving/gauss', title: 'Gauss' },
				{ href: '/equationSolving/gaussJordan', title: 'Gauss-Jordan' },
				{ href: '/equationSolving/gaussSeidel', title: 'Gauss-Seidel' },
				{ href: '/equationSolving/jacobi', title: 'Jacobi' }
			]
		},
		{
			title: 'Multi variable Equation Solving',
			links: [{ href: '/equationSolving/newtonRaphson', title: 'Newton-Raphson' }]
		},
		{
			title: 'Regression',
			links: [
				{ href: '/regression/leastSquares', title: 'Least Squares' },
				{ href: '/regression/polynomial', title: 'Polynomial' }
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
					<Menu.Item root="a" href={link.href}>{link.title}</Menu.Item>
				{/each}
			</Menu>
		</Menu.Item>
	{/each}
</Menu>
