Given the values of a known function $y = f(x)$ at a sequence of ordered points $x_0, x_1, \cdots, x_n$, find $f(x)$ for arbitrary $x$. When $x_0 \le x \le x_n$, the problem is called interpolation. When $x \lt x_0$ or $x \gt x_n$, the problem is called extrapolation.

The easiest way to interpolate, is connecting two points of a curve with a straight line that can be built with two points $(x_0, f(x_0))$ and $(x_1, f(x_1))$ and the line equation becomes:

$$
\dfrac{f(x_1) - f(x_0)}{x_1 - x_0} = \dfrac{f(x) - f(x_0)}{x - x_0} \\
$$

$$
f(x) = f(x_0) + \dfrac{f(x_1) - f(x_0)}{x_1 - x_0}(x - x_0)
$$

Then we solve for $f(x)$ and we can get all the values from $x_0$ to $x_1$, but if the function is not a line, an error should be introduced and if we know the real value of $f(x)$, the percentage error is:

$$
e_p = \dfrac{f(x_{real}) - f(x_{interpolated})}{f(x_{real})}
$$