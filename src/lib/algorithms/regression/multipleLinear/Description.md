Another useful case of regression, specially for experimental data, is when the dependent variable $y$ depends on 2 or more independent variables ($x_1$, $x_2$, ..., $x_n$) as:

$$
y = a_0 + a_1x_1 + a_2x_2 + \cdots + a_nx_n \\
\text{Bidimensional:} \\
y = a_0 + a_1x_1 + a_2x_2
$$

To create the equation, the least-square method can be easily extended the function adding the error:

$$
y = a_0 + a_1x_1 + a_2x_2 \\
E = y_i - a_0 - a_1x_1 - a_2x_2
$$

To get the coefficients of the equation, we can represent the sums as a matrix and solve it:

$$
\left[\begin{array}{rrr:r}
n & \sum x_1 & \sum x_2 & \sum y_i \\
\sum x_1 & \sum x_1^2 & \sum x_1x_2 & \sum x_1y_i \\
\sum x_2 & \sum x_1x_2 & \sum x_2^2 & \sum x_2y_i
\end{array}\right]
$$

### Error calculation

The best adjusted data is the one that minimizes the sum of the squared residues $S_r$, meaning the error between the model and the experimental data, this is the vertical distance between the points and the line:

$$
S_r = \sum_{i=1}^{n} (y_i - a_0 - a_1x_1 - a_2x_2)^2
$$

To calculate the error, we need to sum the squared difference of each point with the mean on the y-axis:

$$
S_t = \sum_{i+1}^{n} (y_i - \overline{y})^2
$$

The coefficient of corelation (how good is the regression) is calculated as:

$$
r = \sqrt{\dfrac{S_t - S_r}{S_t}}
$$