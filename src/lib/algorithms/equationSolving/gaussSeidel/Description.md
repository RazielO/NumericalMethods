The Gauss-Seidel method is an iterative method to solve systems of linear equations. The iterative methods have the advantage over elimination method of less round-off errors.

$$
\begin{matrix}
a_{11}x_1 & + & a_{12}x_2  & + & \cdots & + & a_{1n}x_n & = & b_1 \\
a_{21}x_1 & + & a_{22}x_2  & + & \cdots & + & a_{2n}x_n & = & b_2 \\
\vdots &  & \vdots  &  &  &  & \vdots & = & \vdots \\
a_{n1}x_1 & + & a_{n2}x_2  & + & \cdots & + & a_{nn}x_n & = & b_n
\end{matrix}
$$

### Algorithm

1. If the diagonal elements are non-zero, each equation is rewritten for the corresponding unknown:
	$$\begin{aligned}
	x_1 = \frac{b_1 − a_{12}x_2 − a_{13}x_3 - \cdots − a_{1n}x_n}{a_{11}} \\
	x_2 = \frac{b_2 − a_{21}x_1 − a_{23}x_3 - \cdots - a_{2n}x_n}{a_{22}} \\
	\vdots \\
	x_n = \frac{b_n − a_{n1}x_1 − a_{n2}x_2 − \cdots − a_{nn−1}x_{n−1}}{a_{nn}} 
	\end{aligned}$$
2. Take an initial guess for all the $x_i$
3. Use the rewritten equations to calculate the new estimates.
4. Calculate the relative error for each $x_i$, if it's small enough, the iterations stop:

	$$
	|ep|_i= ∣\frac{x^{new}_i − x^{old}_i}{x^{new}_i}∣ \times 100
	$$