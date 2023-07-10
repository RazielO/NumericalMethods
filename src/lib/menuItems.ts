export const menuItems = [
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
            { href: 'polynomial', title: 'Polynomial' },
            { href: 'lagrange', title: 'Lagrange' }
        ]
    },
    {
        title: 'Differentiation',
        folder: '/differentiation',
        links: [
            { href: 'differentiation', title: 'Numerical Differentiation' },
        ]
    },
    {
        title: 'Integration',
        folder: '/integration',
        links: [
            { href: 'trapezoidal', title: 'Trapezoidal rule' },
            { href: 'simpson13', title: 'Simpson 1/3' },
            { href: 'simpson38', title: 'Simpson 3/8' },
        ]
    },
    {
        title: 'Differential Equations',
        folder: '/differentialEquations',
        links: [
            { href: 'euler', title: 'Euler method' },
            { href: 'rungeKutta', title: 'Runge-Kutta method' },
        ]
    },
];