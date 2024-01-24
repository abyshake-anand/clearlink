function calculateLCM(numbersArray) {
    var all_prime_factors_array = [];
    var max_exponent_object = {};
    const numbers = Array.from(numbersArray).map((num) => parseInt(num));

    const calculateGCF = (...numbers) => {
        const findGCF = (a, b) => (b === 0 ? a : findGCF(b, a % b));
        let gcf = numbers[0];
        for (let i = 1; i < numbers.length; i++) { gcf = findGCF(gcf, numbers[i]); }
        return gcf;
    };

    const calculateLCMUsingGCF = (...numbers) => {
        const findLCM = (a, b) => (a * b) / calculateGCF(a, b);
        let lcm = numbers[0];
        for (let i = 1; i < numbers.length; i++) { lcm = findLCM(lcm, numbers[i]); }
        return lcm;
    };

    const primeFactorization = (num) => {
        let factors = {};
        let divisor = 2;

        while (num > 1) {
            if (num % divisor === 0) {
                factors[divisor] = (factors[divisor] || 0) + 1;
                num /= divisor;
            } else {
                divisor++;
            }
        }

        return factors;
    };

    const calculateLCMUsingPrimeFactorization = (...numbers) => {
        const factorsArray = numbers.map(primeFactorization);
        const lcmFactors = {};
        factorsArray.forEach((factors) => {
            for (let factor in factors) {
                lcmFactors[factor] = Math.max(lcmFactors[factor] || 0, factors[factor]);
            }
        });
        let lcm = 1;
        for (let factor in lcmFactors) {
            lcm *= Math.pow(parseInt(factor), lcmFactors[factor]);
        }
        return lcm;
    };

    const calculateLCMUsingMultiples = (...numbers) => {
        let lcm = Math.max(...numbers);
        while (!numbers.every((num) => lcm % num === 0)) {
            lcm += Math.max(...numbers);
        }
        return lcm;
    };

    const lcmUsingGCF = calculateLCMUsingGCF(...numbers);
    const lcmUsingPrimeFactorization = calculateLCMUsingPrimeFactorization(...numbers);
    const lcmUsingMultiples = calculateLCMUsingMultiples(...numbers);

    const lcm_calculation_using_gcf_text = (numbers_array) => {
        var length_of_numbers_array = numbers_array.length;
        switch (length_of_numbers_array) {
            case 2: return `
The LCM of two numbers can be calculated using their GCF using the following formula:
$LCM(a, b) = (a * b) / GCF(a, b)$

For this method, we need to first calculate the greatest common factor of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}, and then apply it to the formula equation above.

[GCF of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}](/gcf-of-${numbers.join('-and-')}) is ${ calculateGCF(...numbers) }.

So, according to the formula,

$LCM(${numbers.join(', ')}) = (${numbers.join(' x ')}) / GCF(${numbers.join(', ')}) = ${numbers.reduce((a, b) => a * b, 1)} / ${ calculateGCF(...numbers) } = ${lcmUsingGCF}$.

**Therefore, LCM(${numbers.join(', ')}) = ${lcmUsingGCF}**.
            `;
            case 3: return `
Since we have more than two numbers, we will break down the calculation into steps.

We will first calculate the lcm of the first two numbers, and then calculate the lcm of the result with the next number, and so on.

So, $LCM(${numbers.join(', ')})$ would be calculated as: $LCM(LCM(${numbers[0]}, ${numbers[1]}), ${numbers[2]})$.

Let us calculate the LCM of ${numbers[0]} and ${numbers[1]} first.

$LCM(${numbers[0]}, ${numbers[1]}) = (${numbers[0]} x ${numbers[1]}) / GCF(${numbers[0]}, ${numbers[1]})$

[GCF of ${numbers[0]} and ${numbers[1]}](/gcf-of-${numbers[0]}-and-${numbers[1]}) is ${calculateGCF(numbers[0], numbers[1])}.

So, according to the formula,

$LCM(${numbers[0]}, ${numbers[1]}) = (${numbers[0]} x ${numbers[1]}) / GCF(${numbers[0]}, ${numbers[1]}) = ${numbers[0] * numbers[1]} / ${calculateGCF(numbers[0], numbers[1])} = ${calculateLCMUsingGCF(numbers[0], numbers[1])}$.

Now, we will calculate the LCM of ${calculateLCMUsingGCF(numbers[0], numbers[1])} and ${numbers[2]}.

$LCM(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = (${calculateLCMUsingGCF(numbers[0], numbers[1])} x ${numbers[2]}) / GCF(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]})$

[GCF of ${calculateLCMUsingGCF(numbers[0], numbers[1])} and ${numbers[2]}](/gcf-of-${calculateLCMUsingGCF(numbers[0], numbers[1])}-and-${numbers[2]}) is ${calculateGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}.

As before,

$LCM(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = (${calculateLCMUsingGCF(numbers[0], numbers[1])} x ${numbers[2]}) / GCF(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = ${calculateLCMUsingGCF(numbers[0], numbers[1]) * numbers[2]} / ${calculateGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} = ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}$.

**Therefore, LCM(${numbers.join(', ')}) = ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}**.
            `;
            case 4: return `
Since we have more than two numbers, we will break down the calculation into steps.

We will first calculate the lcm of the first two numbers, and then calculate the lcm of the result with the next number, and so on.

So, $LCM(${numbers.join(', ')})$ would be calculated as: $LCM(LCM(LCM(${numbers[0]}, ${numbers[1]}), ${numbers[2]}), ${numbers[3]})$.

Let us calculate the LCM of ${numbers[0]} and ${numbers[1]} first.

$LCM(${numbers[0]}, ${numbers[1]}) = (${numbers[0]} x ${numbers[1]}) / GCF(${numbers[0]}, ${numbers[1]})$

[GCF of ${numbers[0]} and ${numbers[1]}](/gcf-of-${numbers[0]}-and-${numbers[1]}) is ${calculateGCF(numbers[0], numbers[1])}.

So, according to the formula,

$LCM(${numbers[0]}, ${numbers[1]}) = (${numbers[0]} x ${numbers[1]}) / GCF(${numbers[0]}, ${numbers[1]}) = ${numbers[0] * numbers[1]} / ${calculateGCF(numbers[0], numbers[1])} = ${calculateLCMUsingGCF(numbers[0], numbers[1])}$.

Now, we will calculate the LCM of ${calculateLCMUsingGCF(numbers[0], numbers[1])} and ${numbers[2]}.

$LCM(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = (${calculateLCMUsingGCF(numbers[0], numbers[1])} x ${numbers[2]}) / GCF(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]})$

[GCF of ${calculateLCMUsingGCF(numbers[0], numbers[1])} and ${numbers[2]}](/gcf-of-${calculateLCMUsingGCF(numbers[0], numbers[1])}-and-${numbers[2]}) is ${calculateGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}.

As before,

$LCM(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = (${calculateLCMUsingGCF(numbers[0], numbers[1])} x ${numbers[2]}) / GCF(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = ${calculateLCMUsingGCF(numbers[0], numbers[1]) * numbers[2]} / ${calculateGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} = ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}$.

Now, we will calculate the LCM of ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} and ${numbers[3]}.

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} x ${numbers[3]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]})$

[GCF of ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} and ${numbers[3]}](/gcf-of-${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}-and-${numbers[3]}) is ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}.

As before,

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} x ${numbers[3]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]}) = ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]) * numbers[3]} / ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}$.

**Therefore, LCM(${numbers.join(', ')}) = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}**.
            `;
            case 5: return `
Since we have more than two numbers, we will break down the calculation into steps.

We will first calculate the lcm of the first two numbers, and then calculate the lcm of the result with the next number, and so on.

So, $LCM(${numbers.join(', ')})$ would be calculated as: $LCM(LCM(LCM(LCM(${numbers[0]}, ${numbers[1]}), ${numbers[2]}), ${numbers[3]}), ${numbers[4]})$.

Let us calculate the LCM of ${numbers[0]} and ${numbers[1]} first.

$LCM(${numbers[0]}, ${numbers[1]}) = (${numbers[0]} x ${numbers[1]}) / GCF(${numbers[0]}, ${numbers[1]})$

[GCF of ${numbers[0]} and ${numbers[1]}](/gcf-of-${numbers[0]}-and-${numbers[1]}) is ${calculateGCF(numbers[0], numbers[1])}.

So, according to the formula,

$LCM(${numbers[0]}, ${numbers[1]}) = (${numbers[0]} x ${numbers[1]}) / GCF(${numbers[0]}, ${numbers[1]}) = ${numbers[0] * numbers[1]} / ${calculateGCF(numbers[0], numbers[1])} = ${calculateLCMUsingGCF(numbers[0], numbers[1])}$.

Now, we will calculate the LCM of ${calculateLCMUsingGCF(numbers[0], numbers[1])} and ${numbers[2]}.

$LCM(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = (${calculateLCMUsingGCF(numbers[0], numbers[1])} x ${numbers[2]}) / GCF(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]})$

[GCF of ${calculateLCMUsingGCF(numbers[0], numbers[1])} and ${numbers[2]}](/gcf-of-${calculateLCMUsingGCF(numbers[0], numbers[1])}-and-${numbers[2]}) is ${calculateGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}.

As before,

$LCM(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = (${calculateLCMUsingGCF(numbers[0], numbers[1])} x ${numbers[2]}) / GCF(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = ${calculateLCMUsingGCF(numbers[0], numbers[1]) * numbers[2]} / ${calculateGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} = ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}$.

Now, we will calculate the LCM of ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} and ${numbers[3]}.

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} x ${numbers[3]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]})$

[GCF of ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} and ${numbers[3]}](/gcf-of-${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}-and-${numbers[3]}) is ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}.

As before,

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} x ${numbers[3]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]}) = ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]) * numbers[3]} / ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}$.

Now, we will calculate the LCM of ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} and ${numbers[4]}.

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}, ${numbers[4]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} x ${numbers[4]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}, ${numbers[4]})$

[GCF of ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} and ${numbers[4]}](/gcf-of-${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}-and-${numbers[4]}) is ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])}.

As before,

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}, ${numbers[4]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} x ${numbers[4]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}, ${numbers[4]}) = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]) * numbers[4]} / ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])} = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])}$.

**Therefore, LCM(${numbers.join(', ')}) = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])}**.
            `;
            case 6: return `
Since we have more than two numbers, we will break down the calculation into steps.

We will first calculate the lcm of the first two numbers, and then calculate the lcm of the result with the next number, and so on.

So, $LCM(${numbers.join(', ')})$ would be calculated as: $LCM(LCM(LCM(LCM(LCM(${numbers[0]}, ${numbers[1]}), ${numbers[2]}), ${numbers[3]}), ${numbers[4]}), ${numbers[5]})$.

Let us calculate the LCM of ${numbers[0]} and ${numbers[1]} first.

$LCM(${numbers[0]}, ${numbers[1]}) = (${numbers[0]} x ${numbers[1]}) / GCF(${numbers[0]}, ${numbers[1]})$

[GCF of ${numbers[0]} and ${numbers[1]}](/gcf-of-${numbers[0]}-and-${numbers[1]}) is ${calculateGCF(numbers[0], numbers[1])}.

So, according to the formula,

$LCM(${numbers[0]}, ${numbers[1]}) = (${numbers[0]} x ${numbers[1]}) / GCF(${numbers[0]}, ${numbers[1]}) = ${numbers[0] * numbers[1]} / ${calculateGCF(numbers[0], numbers[1])} = ${calculateLCMUsingGCF(numbers[0], numbers[1])}$.

Now, we will calculate the LCM of ${calculateLCMUsingGCF(numbers[0], numbers[1])} and ${numbers[2]}.

$LCM(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = (${calculateLCMUsingGCF(numbers[0], numbers[1])} x ${numbers[2]}) / GCF(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]})$

[GCF of ${calculateLCMUsingGCF(numbers[0], numbers[1])} and ${numbers[2]}](/gcf-of-${calculateLCMUsingGCF(numbers[0], numbers[1])}-and-${numbers[2]}) is ${calculateGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}.

As before,

$LCM(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = (${calculateLCMUsingGCF(numbers[0], numbers[1])} x ${numbers[2]}) / GCF(${calculateLCMUsingGCF(numbers[0], numbers[1])}, ${numbers[2]}) = ${calculateLCMUsingGCF(numbers[0], numbers[1]) * numbers[2]} / ${calculateGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} = ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}$.

Now, we will calculate the LCM of ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} and ${numbers[3]}.

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} x ${numbers[3]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]})$

[GCF of ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} and ${numbers[3]}](/gcf-of-${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}-and-${numbers[3]}) is ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}.

As before,

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])} x ${numbers[3]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2])}, ${numbers[3]}) = ${calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]) * numbers[3]} / ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}$.

Now, we will calculate the LCM of ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} and ${numbers[4]}.

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}, ${numbers[4]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} x ${numbers[4]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}, ${numbers[4]})$

[GCF of ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} and ${numbers[4]}](/gcf-of-${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}-and-${numbers[4]}) is ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])}.

As before,

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}, ${numbers[4]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])} x ${numbers[4]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3])}, ${numbers[4]}) = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]) * numbers[4]} / ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])} = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])}$.

Now, we will calculate the LCM of ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])} and ${numbers[5]}.

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])}, ${numbers[5]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])} x ${numbers[5]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])}, ${numbers[5]})$

[GCF of ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])} and ${numbers[5]}](/gcf-of-${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])}-and-${numbers[5]}) is ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4]), numbers[5])}.

As before,

$LCM(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])}, ${numbers[5]}) = (${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])} x ${numbers[5]}) / GCF(${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4])}, ${numbers[5]}) = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4]) * numbers[5]} / ${calculateGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4]), numbers[5])} = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4]), numbers[5])}$.

**Therefore, LCM(${numbers.join(', ')}) = ${calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(calculateLCMUsingGCF(numbers[0], numbers[1]), numbers[2]), numbers[3]), numbers[4]), numbers[5])}**.
            `;
            default: return ``;
        }
    };

    const output = `
# What is the Least Common Multiple or LCM of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}?
  
The least common multiple (LCM) of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} is **${lcmUsingGCF}**.
  
*Least common multiple* or lowest common denominator (lcd) can be calculated in three simple and easy ways:
- LCM formula calculation method using greatest common factor (GCF)
- Prime factorization method
- List of multiples method

Let us look at each of these methods.

## Calculating LCM of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using their GCF

${lcm_calculation_using_gcf_text(numbers)}

## Using Prime Factorization to calculate Least Common Multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}
  
The least common multiple (LCM) of numbers can be also found by breaking up each number into its prime factors, and then multiplying the highest exponent prime factors of each number.
  
The steps are simple:
  
- Find prime factors of each number
- Denote each number as a multiple of prime factors in their exponential form
- Identify the highest exponential power for each prime factor for each number
- Multiply the prime factors with their highest powers to get the Least common multiple of the numbers
  
Let’s do this.
  
${numbers.map((num) => {
const factors = primeFactorization(num);
const prime_factors = Object.keys(factors);
prime_factors.forEach((factor) => {
    if (!all_prime_factors_array.includes(factor)) { all_prime_factors_array.push(factor); }
});
all_prime_factors_array.sort();
return `
### Prime factorization of ${num}
  
Prime factors of ${num} are ${Object.keys(factors).join(', ')}.
  
So, prime factorization of ${num} in exponential form would be:
  
$${num} = ${Object.entries(factors)
.map(([factor, exponent]) => `${factor}^${exponent}`)
.join(' * ')}$`;
}).join('')}
    
So, to calculate the LCM of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}, we would multiply the highest exponent prime factors:
  
${numbers.map((num) => {
const factors = primeFactorization(num);
return `
$${num} = ${ all_prime_factors_array.map(n => {
    if (factors[n]) {
        return `${n}^${factors[n]}`;
    } else {
        return `${n}^0`;
    }
}).join(' * ')}$`;
}).join('\n\n')}
  
So, LCM of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} would be:
  
$LCM(${numbers.join(', ')}) = ${
    all_prime_factors_array.map(n => {
        let max_exponent = 0;
        numbers.forEach(num => {
            if (primeFactorization(num)[n]) {
                max_exponent = Math.max(max_exponent, primeFactorization(num)[n]);
            }
            max_exponent_object[n] = max_exponent;
        });
        return `${n}^${max_exponent}`;
    }).join(' * ')
} = ${
    Object.entries(max_exponent_object).map(([factor, exponent]) => `${Math.pow(parseInt(factor), exponent)}`).join(' * ')
} = ${lcmUsingPrimeFactorization}$

Thus, **LCM of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} is ${lcmUsingPrimeFactorization}**.

||thumbnail_image_placeholder||
  
## LCM of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using list of multiples

This is the most rudimentary approach, but also the most tedious, especially when the numbers are large.

**So, you should use this method only when the numbers are small. Otherwise, you should use the GCF method or the prime factorization method. This method is also not very efficient, so we would, in any case, recommend using the GCF method or the prime factorization method.**
  
We will find and list the multiples of each number until we find a common multiple. This common multiple would therefore, by definition, be the lowest or least common multiple.
  
${numbers.map((num) => {
const lcm = calculateLCMUsingGCF(...numbers);
const multiples = Array.from({ length: (lcm / num) + 2 }, (_, i) => num * (i + 1));
return `
### Multiples of ${num}:

${multiples.join(', ')}`;
}).join('')}

As we can see, ${lcmUsingMultiples} is the first number to be present in all lists of multiples.
  
Therefore, LCM(${numbers.join(', ')}) = ${lcmUsingMultiples}

||pin_image_placeholder||
`;


return {
        page_title: `[Solved] LCM of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}: 3 Easy Ways`,
        page_description: `Learn how to calculate the LCM of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using 3 easy methods: Using GCF, By Prime Factorization, and Using List of Multiples.`,
        page_keywords: [`lcm of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}`, `lcm of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using gcf`, `lcm of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using prime factorization`, `lcm of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using list of multiples`, `least common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}`, `least common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using gcf`, `least common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using prime factorization`, `least common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using list of multiples`, `lowest common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}`, `lowest common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using gcf`, `lowest common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using prime factorization`, `lowest common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using list of multiples`],
        page_author: "",
        page_content: output,
        solution_text: `The least common multiple (LCM) of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} is ${lcmUsingGCF}.`,
    };
}

module.exports = { calculateLCM };