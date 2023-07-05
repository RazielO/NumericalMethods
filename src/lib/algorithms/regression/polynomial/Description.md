Some discrete data is poorly represented by a straight line, therefore is better to fit them to a curve making the polynomial regression a better option.

To create the polynomial, the least-square method can be easily extended with the polynomial function adding the error:

$$
y = a_0 + a_1x_i + a_2x_i^2 + \cdots + a_mx_i^m + E \\
E = y_i - a_0 - a_1x_i - a_2x_i^2 - \cdots - a_mx_i^m \\
$$

To get the coefficients of the equation:

$$\begin{aligned}
\sum y_i    & = & na_0        & + & a_1\sum x_i   & + & a_2\sum x_i^2 & + & \cdots & + & a_m\sum x_i^m \\
\sum x_iy_i & = & a_0\sum x_i & + & a_1\sum x_i^2 & + & a_2\sum x_i^3 & + & \cdots & + & a_m\sum x_i^{m + 1} \\
\sum x_i^2y_i & = & a_0\sum x_i^2 & + & a_1\sum x_i^3 & + & a_2\sum x_i^4 & + & \cdots & + & a_m\sum x_i^{m + 2} \\
& & & & & \vdots \\
\sum x_i^my_i & = & a_0\sum x_i^m & + & a_1\sum x_i^{m+1} & + & a_2\sum x_i^{m+2} & + & \cdots & + & a_m\sum x_i^{2m} \\
\end{aligned}$$

Making these equations equal to zero, to get the coefficients of a $m^{th}$ degree polynomial becomes a problem of solving a system of $m + 1$ linear equations.

### Error calculation

The best adjusted data is the one that minimizes the sum of the squared residues $S_r$, meaning the error between the model and the experimental data, this is the vertical distance between the points and the line:

$$
S_r = \sum_{i=1}^{n} (y_i - a_0 - a_1x_i - a_2x_i^2 - \cdots - a_mx_i^m)^2
$$

To calculate the error, we need to sum the squared difference of each point with the mean on the y-axis:

$$
S_t = \sum_{i+1}^{n} (y_i - \overline{y})^2
$$

The coefficient of corelation (how good is the regression) is calculated as:

$$
r = \sqrt{\dfrac{S_t - S_r}{S_t}}
$$