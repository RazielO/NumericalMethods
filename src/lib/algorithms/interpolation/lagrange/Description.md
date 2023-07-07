The Lagrange polynomial interpolation is a reformulation of the Newton polynomial interpolation where the divided differences are avoided, and the $n^{th}$ degree interpolation can be represented as:

$$
f_n(x) = \sum_{i = 0}^{n} L_i(x)f(x_i)
$$

where:

$$
L_i(x) = \prod_{j = 0, i \ne j}^{n} \dfrac{x - x_j}{x_i - x_j}
$$