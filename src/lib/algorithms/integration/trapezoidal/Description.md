Given a continuous function $f: [a,b] \rightarrow \Reals$, we want to calculate:

$$
\int_{a}^{b} f(x)
$$

If $F$ is a primitive of $f$:

$$
\int_a^b f(x)dx = F(b) - F(a)
$$

Since there is not always a known primitive $F$, it's better to approximate the value of the integral. The trapezoidal rule gives the following approximation:

$$
I_i = \int_{x_i}^{x_{i + 1}} f(x)\;dx \approx \frac{1}{2} \left[ f(x_i) + f(x_{i + 1}) \right](x_{i + 1} - x_i)
$$

By making $h = \dfrac{b - a}{n}$, we get:

$$\begin{aligned}
\int_a^b f(x)\;dx & = \sum_{i = 0}^{n - 1} I_i \approx \frac{h}{2} \sum_{i = 0}^{n - 1} [f(x_i) + f(x_{i+ 1})] \\
\int_a^b f(x)\;dx & \approx h \left[\dfrac{f(a) + f(b)}{2} + \sum_{i = 1}^{n - 1} f(x_i) \right]
\end{aligned}$$