### Algorithm

1. Define the initial approximations.
2. Evaluate $f_1$, $f_2$, $\dfrac{\partial{f_1}}{\partial{x}}$, $\dfrac{\partial{f_1}}{\partial{y}}$, $\dfrac{\partial{f_2}}{\partial{x}}$, $\dfrac{\partial{f_2}}{\partial{y}}$.
3. Find $\Delta x$ and $\Delta y$:
	$$
	\newcommand{\diff}[2]{\dfrac{\partial#1}{\partial#2}}
	\newcommand{\diffto}[4]{\left.\diff{#1}{#2}\right|_{#3, #4}}
	\begin{aligned}
	 \Delta x & = &
		\left[
		\begin{array}{rr}
		   -f_1(x_i, y_i) & \diffto{f_1}{y}{x_i}{y_i} \\
		   -f_2(x_i, y_i) & \diffto{f_2}{y}{x_i}{y_i} \\ \hline
		   \diffto{f_1}{x}{x_i}{y_i} & \diffto{f_1}{y}{x_i}{y_i} \\
		   \diffto{f_2}{x}{x_i}{y_i} & \diffto{f_2}{y}{x_i}{y_i}
		\end{array}
		\right] & = &
		\dfrac{-f_1\diff{f_2}{y} + f_2\diff{f_1}{y}}
		{\diff{f_1}{x}\diff{f_2}{y} - \diff{f_2}{x}\diff{f_1}{y}} \\
  
		\text{} \\
  
	 \Delta y & = &
		\left[
		\begin{array}{rr}
		   \diffto{f_1}{x}{x_i}{y_i} & -f_1(x_i, y_i) \\
		   \diffto{f_2}{x}{x_i}{y_i} & -f_2(x_i, y_i) \\ \hline
		   \diffto{f_1}{x}{x_i}{y_i} & \diffto{f_1}{y}{x_i}{y_i} \\
		   \diffto{f_2}{x}{x_i}{y_i} & \diffto{f_2}{y}{x_i}{y_i}
		\end{array}
		\right] & = &
		\dfrac{-f_2\diff{f_1}{x} + f_1\diff{f_2}{x}}
		{\diff{f_1}{x}\diff{f_2}{y} - \diff{f_2}{x}\diff{f_1}{y}}
	\end{aligned}$$
4. Solve for $x_{i+1}$ and $y_{i+1}$ in $\Delta x$ and $\Delta y$:
	$$\begin{aligned}
	 \Delta x & = x_{i+1} - x_i \\
	 \Delta y & = y_{i+1} - y_i \\
	\end{aligned}$$
5. Calculate the relative error, if it's sufficiently small, the calculation stops, otherwise, continue:

	$$
	e_p = |\dfrac{x_{i + 1} - x_i}{x_{i + 1}}| \times 100
	$$