Replacing the derivative in Newton's method with a finite difference, we get the secant method. This method does not require the computation (nor the existence) of a derivative, but the price is slower convergence.

### Algorithm

1. Select two initial approximations $x_j$ and $x_{j - 1}$, the function $f(x)$, select a tolerance of error $e_p$.
2. Calculate the midpoint of the interval:

    $$
    x_{i + 1} = x_i - \dfrac{f(x_i)(x_{i - 1} - x_i)}{f(x_{i - 1}) - f(x_i)}
    $$

3. Calculate the relative error, if it's sufficiently small, the calculation stops, otherwise, continue:

    $$
    e_p = |\dfrac{x_{R (current)} - x_{R (previous)}}{x_{R (current)}}| \times 100
    $$
