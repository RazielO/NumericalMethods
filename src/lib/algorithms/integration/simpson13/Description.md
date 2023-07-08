Given a continuous function $f: [a,b] \rightarrow \Reals$, we want to calculate:

$$
\int_{a}^{b} f(x)
$$

If $F$ is a primitive of $f$:

$$
\int_a^b f(x)dx = F(b) - F(a)
$$

Since there is not always a known primitive $F$, it's better to approximate the value of the integral. The Simpson's $\frac{1}{3}$ states that:

$$\begin{aligned}
\int_a^b f(x)\;dx & \approx \frac{1}{3} h \left[ f(a) + 4f\left(\frac{a + b}{2} \right) + f(b) \right] \\
& \approx \frac{b - a}{6} \left[ f(a) + 4f\left(\frac{a+b}{2} \right) + f(b) \right]
\end{aligned}$$