The Gauss elimination is a method for solving systems of linear equations of $n$ equations and $n$ unknowns:
$$
\begin{matrix}
a_{11}x_1 & + & a_{12}x_2  & + & \cdots & + & a_{1n}x_n & = & b_1 \\
a_{21}x_1 & + & a_{22}x_2  & + & \cdots & + & a_{2n}x_n & = & b_2 \\
\vdots &  & \vdots  &  &  &  & \vdots & = & \vdots \\
a_{n1}x_1 & + & a_{n2}x_2  & + & \cdots & + & a_{nn}x_n & = & b_n
\end{matrix}
$$

### Algorithm

1. Represent the system as an augmented matrix
2. Manipulate the rows to form an upper triangle matrix by:
	- Swapping the positions of two rows.
	- Multiplying a row by a non-zero scalar.
	- Adding to one row a scalar multiple of another.
3. Starting from the last equation (which is solved), substitute the value on the others to get the value of the other unknowns.