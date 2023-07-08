The Euler method is a procedure of numerical integration to solve ordinary differential equations from an initial value. To start, we have to make $n$ intervals of $h$ width:

$$
h = \dfrac{x_{n} - x_{n-1}}{n}
$$

With this intervals, we get the points $x_0$, $x_1$, ..., $x_n$, where $x_i = x_0 + ih$. The initial condition $y(x_0) = y_0$ is the point $P_0 = (x_0, y_0)$ and we can evaluate the function in $P_0$:

$$
F^{\prime}(x) = \left.\dfrac{dy}{dx}\right|_{P_0} = f(x_0, y_0) = \dfrac{y_1 - y_0}{x_1 - x_0}
$$

Solving for $y_1$:

$$
y_1 = y_0 + (x_1 - x_0)f(x_0, y_0) = y_0 + hf(x_0, y_0)
$$

Solving the approximations, we get:

$$\begin{aligned}
y_1 & = y_0 + hf(x_0, y_0) \\
& \vdots \\
y_{i + 1} & = y_i + hf(x_i, y_i) \\
& \vdots \\
y_{n} & = y_{n - 1} + hf(x_{n - 1}, y_{n - 1}) \\
\end{aligned}$$