Given a continuous function $f: [a,b] \rightarrow \Reals$, we want to calculate:

$$
\int_{a}^{b} f(x)
$$

If $F$ is a primitive of $f$:

$$
\int_a^b f(x)dx = F(b) - F(a)
$$

Since there is not always a known primitive $F$, it's better to approximate the value of the integral. The Simpson's $\frac{3}{8}$ states that:

$$\begin{aligned}
\int_a^b f(x) \, dx & \approx \frac{3}{8} h \left[ f(a) + 3f\left(\frac{2a + b}{3}\right) + 3f\left(\frac{a + 2b}{3}\right) + f(b) \right] \\ 
& \approx \frac{b - a}{8} \left[ f(a) + 3f\left(\frac{2a + b}{3} \right) + 3f\left(\frac{a + 2b}{3} \right) + f(b) \right]
\end{aligned}$$

where $h = \dfrac{b − a}{3}$ is the step size.