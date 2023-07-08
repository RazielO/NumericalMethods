The derivative of a function $f(x)$ at $x_0$ is defined as:

$$
f'(x_0) = \lim_{h \to 0} \dfrac{f(x_0 + h) - f(x_0)}{h}
$$

For a small enough value of $h$ we can approximate $f'(x)$:

1. **Forward**

$$
f^{\prime}(x_0) \approx \dfrac{f(x_0 + h) - f(x_0)}{h}
$$


2. **Backward**

$$
f^{\prime}(x_0) \approx \dfrac {f(x_0) - f(x_0 - h)}{h}
$$


3. **Central**

$$
f^{\prime}(x_0) \approx \dfrac{f(x_0 + h) - f(x_0 - h)}{2h}
$$