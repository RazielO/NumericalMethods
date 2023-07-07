To get a better interpolation for $f(x)$, we can add a curvature to the function with an $n^{th}$ degree polynomial when we have $n + 1$ points:

$$
f_n(x) = b_0 + b_1(x - x_0) + \cdots + b_n(x - x_0)(x - x_1)\cdots(x - x_{n - 1})
$$

To get the coefficients $b_0$, $b_1$, ..., $b_n$:

$$\begin{aligned}
b_0 = & f(x_0) \\
b_1 = & f[x_1, x_0] \\
b_2 = & f[x_2, x_1, x_0] \\
\vdots \\
b_n = & f[x_n, x_{n - 1}, \cdots, x_1, x_0] \\
\end{aligned}$$

The functions with brackets are finite divided differences where:

$$\begin{aligned}
f[x_i, x_j] = & \dfrac{f(x_i) - f(x_j)}{x_i - x_j} \\
f[x_i, x_j, x_r] = & \dfrac{f[x_i, x_j] - f[x_j, x_r]}{x_i - x_r} \\
\vdots \\
f[x_n, x_{n - 1}, \cdots, x_1, x_0] = & \dfrac{f[x_n, x_{n - 1}, \cdots, x_1] - f[x_{n - 1}, x_{n - 2}, \cdots, x_1]}{x_n - x_0}
\end{aligned}$$

If we have an additional value $f(x_{n + 1})$, we can evaluate the error with the following equation:

$$
R_n = f[x_{n + 1}, x_n, x_{n - 1}, \cdots, x_0](x - x_0)(x - x_1)\cdots(x - x_n)
$$