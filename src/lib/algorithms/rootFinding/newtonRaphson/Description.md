We can use the fixed-point iteration to find the root of a function. Given a function $f(x)$ which we have set to zero to find the root ($f(x) = 0$), we rewrite the equation in terms of $x$ so that $f(x) = 0$ becomes $x = g(x)$ (note, there are often many $g(x)$ functions for each $f(x) = 0$ function). Next, we relabel each side of the equation as $x_{n + 1} = g(x_n)$ so that we can perform the iteration. Next, we pick a value for $x_1$ and perform the iteration until it converges towards a root of the function. If the iteration converges, it will converge to a root. The iteration will only converge if $|g'(root)| \lt 1$.

## Algorithm

1. Select the function $f(x)$ and it's derivative $f'(x)$.
2. Select the allowed error.
3. Select the initial approximation $x_0$.
4. Calculate the next approximation:

    $$
    x_{i + 1} = x_i + \dfrac{f(x_i)}{f'(x_i)}
    $$

5. Calculate the relative error, if it's sufficiently small, the calculation stops, otherwise, continue:

    $$
    e_p = |\dfrac{x_{R (current)} - x_{R (previous)}}{x_{R (current)}}| \times 100
    $$
