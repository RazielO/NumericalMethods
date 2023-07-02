The bisection method is a root-finding method for numerically solving the equation $f(x) = 0$ for the real variable $x$ where the function is defined on an interval $[a, b]$ and where $f(a)$ and $f(b)$ have opposite signs. According to the intermediate value theorem, $f$ must have at least one root in the interval $(a, b)$.

Each step, the interval is divided in two halves by computing the midpoint of the interval and the value of the function at that point, if it's a root, the process stops there, otherwise the midpoint now becomes one of the ends of the range. The method continues until the root is found or the error is sufficiently small.

### Algorithm

1. Select the initial values of $a$ and $b$, evaluate $f(a)$ and $f(b)$, select a tolerance of error $e_p$.
2. Calculate the midpoint of the interval:

    $$
    x_R = \dfrac{a + b}{2}
    $$

3. Determine if the root has been found or where does the root is:
    - If $f(a) \times f(x_R) = 0$, the root is $x_R$, the iteration stops
    - If $f(a) \times f(x_R) \gt 0$, the root is the interval $(x_R, b)$
    - If $f(a) \times f(x_R) \lt 0$, the root is the interval $(a, x_R)$
4. Recalculate the midpoint
5. Calculate the relative error, if it's sufficiently small, the calculation stops, otherwise, continue:

    $$
    e_p = |\dfrac{x_{R (current)} - x_{R (previous)}}{x_{R (current)}}| \times 100
    $$