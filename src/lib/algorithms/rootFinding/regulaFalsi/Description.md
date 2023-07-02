The *Regula Falsi* or method of fake position is a method for solving an equation with one unknown variable. This method is a **trial and error** method where the function is evaluated with "false" values and adjusting said test value according to the evaluation.

## Algorithm

1. Select the initial values of $a$ and $b$, evaluate $f(a)$ and $f(b)$, select a tolerance of error $e_p$.
2. Calculate the first root approximation:

    $$
    x_R = b - \dfrac{f(b)(a - b)}{f(a) - f(b)}
    $$
    
3. Determine if the root has been found or where does the root could be bound:
    - If $f(a) \times f(x_R) = 0$, the root is $x_R$, the iteration stops
    - If $f(a) \times f(x_R) \gt 0$, the root is the interval $(x_R, b)$
    - If $f(a) \times f(x_R) \lt 0$, the root is the interval $(a, x_R)$
4. Recalculate the root approximation.
5. Calculate the relative error, if it's sufficiently small, the calculation stops, otherwise, continue:

    $$
    e_p = |\dfrac{x_{R (current)} - x_{R (previous)}}{x_{R (current)}}| \times 100
    $$