<script>
	import { goto } from '$app/navigation';
	import { Button, Divider, Menu } from '@svelteuidev/core';
</script>

<Menu>
	<Button slot="control" variant="subtle" ripple>Menu</Button>
	<Menu.Item disabled><b>Root Finding</b></Menu.Item>
	<Menu.Item on:click={() => goto('/rootFinding/bisection')}>Bisection</Menu.Item>
	<Menu.Item on:click={() => goto('/rootFinding/regulaFalsi')}>Regula Falsi</Menu.Item>
	<Menu.Item on:click={() => goto('/rootFinding/fixedPoint')}>Fixed Point</Menu.Item>
	<Menu.Item on:click={() => goto('/rootFinding/newtonRaphson')}>Newton-Raphson</Menu.Item>
	<Menu.Item on:click={() => goto('/rootFinding/secant')}>Secant</Menu.Item>
	<Menu.Item disabled><b>Equation Solving</b></Menu.Item>
	<Menu.Item on:click={() => goto('/equationSolving/gauss')}>Gauss</Menu.Item>
	<Menu.Item on:click={() => goto('/equationSolving/gaussJordan')}>Gauss-Jordan</Menu.Item>
	<Menu.Item on:click={() => goto('/equationSolving/gaussSeidel')}>Gauss-Seidel</Menu.Item>
	<Menu.Item on:click={() => goto('/equationSolving/jacobi')}>Jacobi</Menu.Item>
	<Menu.Item disabled><b>Multi variable Equation Solving</b></Menu.Item>
	<Menu.Item on:click={() => goto('/equationSolving/newtonRaphson')}>Newton-Raphson</Menu.Item>
	<Menu.Item disabled><b>Regression</b></Menu.Item>
	<Menu.Item on:click={() => goto('/regression/leastSquares')}>Least Squares</Menu.Item>
	<Menu.Item on:click={() => goto('/regression/polynomial')}>Polynomial</Menu.Item>
</Menu>
