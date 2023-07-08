The Runge-Kutta methods are generalizations of the Euler formula, where the slope is substituted with a weighted average of the slopes in $[x_n \le x \le x_{n+1}]$:

$$
y_{n+1} = y_n + h(w_1k_1 + w_2k2 + \cdots + w_mk_m)
$$

The weights ($w_i$) satisfy $w_1 + w_2 + \cdots + w_m = 1$ and $k_1 = f(x_n, y_n)$. The order of the method is $m$, if $m = 1$, we get the Euler formula.

### Second order

$$\begin{aligned}
y_{n+1} & = y_n + \dfrac{h}{2}(k_1 + k_2) \\
& \text{where:} \\
k_1 & = f(x_n, y_n) \\
k_2 & = f(x_n + h, y_n + hk_1)
\end{aligned}$$

### Fourth order (RK4)

$$\begin{aligned}
y_{n + 1} & = y_n +\dfrac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4) \\
& \text{where:} \\
k_1 & = f(x_n, y_n) \\
k_2 & = f(x_n + \frac{1}{2}h, y_n + \frac{1}{2}hk_1) \\
k_3 & = f(x_n + \frac{1}{2}h, y_n + \frac{1}{2}hk_2) \\
k_4 & = f(x_n + h, y_n + hk_3)
\end{aligned}$$