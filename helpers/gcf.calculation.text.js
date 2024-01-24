const lodash = require('lodash');
function calculateGCF(numbersArray) {
    const numbers = Array.from(numbersArray).map((num) => parseInt(num));
    var common_factors_for_method_two = [];
    var final_common_factors_for_method_two = [];

    const calculateGCF = (numbers) => {
        const findGCF = (a, b) => (b === 0 ? a : findGCF(b, a % b));
        let gcf = numbers[0];
        for (let i = 1; i < numbers.length; i++) { gcf = findGCF(gcf, numbers[i]); }
        return gcf;
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
    const calculateGCFBetweenTwo = (a, b) => (b === 0 ? a : calculateGCFBetweenTwo(b, a % b));

    // Function to calculate the GCF of an array of numbers
    const calculateGCFOfArray = (numbers) => {
        if (numbers.length === 0) {
            return null; // Handle empty array case
        }
        let gcf = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            gcf = calculateGCFBetweenTwo(gcf, numbers[i]);
        }
        return gcf;
    };

    // Calculate GCF using the array of numbers
    const gcf = calculateGCFOfArray(numbers);

    numbers.forEach((num) => {
        const factors = Array.from({ length: num }, (_, i) => i + 1).filter((factor) => num % factor === 0);
        common_factors_for_method_two = common_factors_for_method_two.concat(factors);
        final_common_factors_for_method_two = lodash.filter(common_factors_for_method_two, (item, index) => lodash.indexOf(common_factors_for_method_two, item) === index && lodash.lastIndexOf(common_factors_for_method_two, item) !== index);
    });

    const calculateGCFEuclidean = (numbers) => {
        if (numbers.length === 0) {
            return null; // Handle empty array case
        }
        let [a, b] = numbers.sort((a, b) => a - b);
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };

    function make_text_for_euclidean_method(numbers) {
        const length_of_numbers_array = numbers.length;
        var text = "";

        var running_text_for_case_two = ``
        var running_equation_text_for_case_two = ``

        if (length_of_numbers_array === 2) {
            var new_numbers_array = JSON.parse(JSON.stringify(numbers));
            new_numbers_array.sort((a, b) => a - b);
            if (new_numbers_array[0] !== numbers[0]) {
                running_equation_text_for_case_two = running_equation_text_for_case_two + ` = GCF(${numbers[0]}, ${numbers[1]})`
            }
            var a = new_numbers_array[0];
            var b = new_numbers_array[1];
            var r = b % a;
            while (r !== 0) {
                if (a > r) {
                    running_text_for_case_two = running_text_for_case_two + `
$GCF(${a}, ${b}) = GCF(${a}, ${b % a})$
                    `
                    running_equation_text_for_case_two = running_equation_text_for_case_two + ` = GCF(${a}, ${b}) = GCF(${a}, ${b % a})`

                    b = a;
                    a = r;
                    running_text_for_case_two = running_text_for_case_two + `
Now, $A = ${a}$ and $B = ${b}$.
Dividing $B$ by $A$, we get: $R = ${b % a}$
                    `
                    r = b % a;
                } else {
                    running_text_for_case_two = running_text_for_case_two + `
$GCF(${a}, ${b}) = GCF(${b}, ${a})$
                    `
                    running_equation_text_for_case_two = running_equation_text_for_case_two + `= GCF(${a}, ${b}) = GCF(${b}, ${a})`

                    a = b;
                    b = r;
                    running_text_for_case_two = running_text_for_case_two + `
Now, $A = ${a}$ and $B = ${b}$.
                    `
                }
            }
        }

        // if there is a "=" at the start of the equation text, remove it
        running_equation_text_for_case_two = running_equation_text_for_case_two.trim()
        if (running_equation_text_for_case_two.charAt(0) === "=") {
            running_equation_text_for_case_two = running_equation_text_for_case_two.substring(1);
        }

        running_equation_text_for_case_two = running_equation_text_for_case_two.trim()
        running_equation_text_for_case_two = running_equation_text_for_case_two + ` = ${calculateGCFEuclidean(numbers)}`
        running_equation_text_for_case_two = running_equation_text_for_case_two.trim()



        switch (length_of_numbers_array) {
            case 2:
                text = `
Let us look at the steps involved in calculating the GCF of ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') } using the Euclidean algorithm.

### Step 1: Sort the numbers into ascending order:

${numbers.sort((a, b) => a - b).join(', ')}

So, in the formula above, $A = ${numbers[0]}$ and $B = ${numbers[1]}$.

### Step 2: Divide the larger number by the smaller number:

$${numbers[1]} / ${numbers[0]} = ${numbers[1] / numbers[0]}$

Our remainder from this division is supposed to be $R$.
So, $R = ${numbers[1] % numbers[0]}$

### Step 3: Do this as long as necessary. Replace the larger number with the smaller number, and the smaller number with the remainder of the division. Repeat until the remainder is 0.

${ running_text_for_case_two }

Since, our remainder is already 0, we can stop here.

So, GCF of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} can be represented as:

${ running_equation_text_for_case_two }

Therefore, $GCF(${numbers.join(', ')}) = ${calculateGCFEuclidean(numbers)}$
                `;
                break;
            default:
                var gcf_examples_array = [];
                while (gcf_examples_array.length < 5) {
                    var random_number_one = Math.floor(Math.random() * 100) + 1;
                    var random_number_two = Math.floor(Math.random() * 100) + 1;
                    if (numbers.indexOf(random_number_one) === -1 && numbers.indexOf(random_number_two) === -1 && random_number_one !== random_number_two) {
                        gcf_examples_array.push([random_number_one, random_number_two]);
                    }
                }
                text = `
> **So, can we use the Euclidean algorithm to calculate the GCF of ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') }?**

The answer is **YES**.

But, should we use the Euclidean algorithm to calculate the GCF of ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') }?

<u>**We would strongly recommend against it.**</u>

Just because something should be done, doesn't mean it should be done.

That principle applies here. The Euclidean algorithm is not the best method to calculate the GCF of ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') }.

The Euclidean algorithm is best suited for calculating the GCF of 2 numbers. For ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') }, we have ${ numbers.length } numbers.

So, we advise using the prime factorization method to calculate the GCF here. It is much simpler and easier to understand.

However, if you are interested in learning more about the Euclidean algorithm, you can look at one of the examples below:

${gcf_examples_array.map((example) => {
    return `- [GCF of ${example.join(' and ')}](/gcf-of-${example.join('-and-')})`;
}).join('\n')};
                `;
                break;
        }
        return text;
    }

    // Generate formatted output
    const output = `
# What is the Greatest Common Factor or GCF of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}?
  
The Greatest Common Factor (GCF), Highest Common Factor (HCF) or Greatest Common Divisor (GCD) of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} is **${ calculateGCF(numbers) }**.
  
We can calculate the *Greatest Common Factor* or GCF in multiple simple and easy ways:
- Using prime factorization method
- Using list of factors method
- Using Euclidean algorithm
- Using Binary GCD algorithm

Let us look at each of these methods, and calculate the GCF of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}.
  
## Prime Factorization Method To Calculate GCF of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}
  
This is the most simple method, and also the most effective. All we need to do here is find the common prime factors for ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') }, and then multiply them.
  
### Step 1: Let's create a list of all the prime factors of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}:
  
${numbers.map((num) => {
    const factors = primeFactorization(num);
    return `
#### Prime factors of ${num}:
  
As you can see below, the prime factors of **${num}** are ${Object.keys(factors).join(', ')}.
  
Let's illustrate the prime factorization of **${num}** in exponential form:
  
$${num} = ${Object.entries(factors)
.map(([factor, exponent]) => `${factor}^${exponent}`)
.join(' * ')}$`;
}).join('\n')}
  
### Step 2: Write down a list of all the common prime factors of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}:

Identifying the common prime factors from our computations above, we can see that the common prime factors of ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') } are ${
    Object.keys(primeFactorization(gcf)).map((factor) => `**${factor}** which occurs ${Math.min(...numbers.map((num) => primeFactorization(num)[factor]))} time(s)`).join(', ').replace(/,([^,]*)$/, ' and$1') || 'none'
}.

So, common prime factors would be $${
    Object.keys(primeFactorization(gcf)).map((factor) => {
        const exponent = Math.min(...numbers.map((num) => primeFactorization(num)[factor]));
        return exponent > 1 ? `${factor}^${exponent}` : factor;
    }).join(' * ') || 'none'
}$
  
### Step 3: All we have to do now is to multiply these common prime factors:
  
Find the product of all common prime factors by multiplying them:

${
    Object.entries(primeFactorization(gcf)).length ?
    `$GCF(${numbers.join(', ')}) = ${Object.entries(primeFactorization(gcf)).map(([factor, exponent]) => `${factor}^${exponent}`).join(' * ')} = ${
        Object.entries(primeFactorization(gcf)).map(([factor, exponent]) => {
            return Math.pow(factor, exponent);
        }).join(' * ') } = ${gcf}$` :
    `$GCF(${numbers.join(', ')}) = ${gcf}$`
}
  
**That's it!** We have found the Greatest Common Factor of ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') } using the prime factorization method.
  
According to our calculations above, the **GCF** of ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') } is **${gcf}**.
  
## Method 2 - List of Factors
  
With this simple method, we'll need to find all the factors of ${ numbers.join(' and ').replace(/,([^,]*)$/, ' and$1') }, and then identify the common factors.

The greatest common factor (GCF) is the largest of these common factors.

Remember, factors are numbers that divide another number without a remainder.

The steps are simple:

### Step 1: Create a list of all the numbers that divide ${ numbers.join(' and ').replace(/,([^,]*)$/, ' and$1') } without a remainder:
  
${numbers.map((num) => {
const factors = Array.from({ length: num }, (_, i) => i + 1).filter((factor) => num % factor === 0);

return `
#### List of factors that divide **${num}** without a remainder are:

${factors.map((n) => { return final_common_factors_for_method_two.includes(n) ? `"${n}"` : `"<span class=\"gcf-common-factor\">${n}</span>"`; }).join(', ').replace(/,([^,]*)$/, ' and$1')}`;
}).join('\n')}

#### Step 2: Identify the largest common number from the 2 lists above:
  
As you can see in the lists of factors from above, for the numbers ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') }, the common factors have been highlighted for clarity.
  
According to our calculations above, the **Greatest Common Factor (GCF) of** ${ numbers.join(', ').replace(/,([^,]*)$/, ' and$1') } is **${gcf}**.

||thumbnail_image_placeholder||

## Method 3 - Euclidean algorithm

The [Euclidean algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm) proceeds in a series of steps, with the output of each step used as the input for the next.

The Euclidean algorithm is based on the principle that the greatest common divisor of two numbers does not change if the larger number is replaced by its difference with the smaller number. 

For example, the GCD of 252 and 105 is exactly the same as the GCD of 147 (= 252 - 105) and 105. Since the larger of the two numbers is reduced, repeating this process gives successively smaller pairs of numbers until the two numbers become equal. When that occurs, they are the GCD of the original two numbers.

By reversing the steps, the GCD can be expressed as a sum of the two original numbers each multiplied by a positive or negative integer, e.g., 21 = 5 × 105 + (−2) × 252. The fact that the GCD can always be expressed in this way is known as Bézout's identity.

To put it in the form of a formula, if $A$ and $B$ are two non-negative integers with $A < B$, and if $R$ is the remainder of the division of $B$ by $A$, then $GCF(A, B) = GCF(A, R)$.

${make_text_for_euclidean_method(numbers)}

## Method 4 - Binary GCD algorithm

The [Binary GCD algorithm](https://en.wikipedia.org/wiki/Binary_GCD_algorithm) is an algorithm that computes the greatest common divisor of two nonnegative integers $A$ and $B$.

The algorithm reduces the problem of finding the GCD of two nonnegative integers by repeatedly applying the identity $GCF(A, B) = GCF(A, B - A)$ if $B > A$ and $GCF(A, B) = GCF(A - B, B)$ if $A > B$.

This is a relatively efficient algorithm for large numbers, even though it involves several divisions, so we don't recommend using it for small numbers.

||pin_image_placeholder||

`;
    return {
        page_title: `[Solved] GCF of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}`,
        page_description: `Learn how to calculate the GCF of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using  Prime Factorization method, or List of Factors method.`,
        page_keywords: [`gcf of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}`, `gcf of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using prime factorization`, `gcf of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using list of factors`, `greatest common factor of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}`, `greatest common factor of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using prime factorization`, `greatest common factor of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using list of factors`],
        page_author: "",
        page_content: output,
        solution_text: `The Greatest Common Factor (GCF), Highest Common Factor (HCF) or Greatest Common Divisor (GCD) of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} is ${ calculateGCF(numbers) }.`,
    }
}

module.exports = { calculateGCF }