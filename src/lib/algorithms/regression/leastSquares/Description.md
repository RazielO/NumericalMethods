The least-squares method is a way to find a simple analytic function that describes the general behavior of the data, even if the function does not pass through every single point. It should minimize the sum of the deviations from the discrete data to the function squared.

The linear regression consists on fitting a line to a set of discrete points $(x_1, y_1)$, $(x_2, y_2)$, ..., $(x_n, y_n)$. The error is added to the equation of a line:

$$
y = a_o + a_1x + E
$$

To get the coefficients of the equation:

$$
a_1 = \dfrac{n \sum x_iy_i - \sum x_i \sum y_i}{n \sum x_i^2 - (\sum x_i)^2}
$$

$$
a_0 = \overline{y} - a_1 * \overline{x}
$$

### Error calculation

The best adjusted data is the one that minimizes the sum of the squared residues $S_r$, meaning the error between the model and the experimental data, this is the vertical distance between the points and the line:

$$
S_r = \sum_{i=1}^{n} = (y_i - a_0 - a_1x)^2
$$

To calculate the error, we need to sum the squared difference of each point with the mean on the y-axis:

$$
S_t = \sum_{i+1}^{n} (y_i - \overline{y})^2
$$

The coefficient of corelation (how good is the regression) is calculated as:

$$
r = \sqrt{\dfrac{S_t - S_r}{S_t}}
$$