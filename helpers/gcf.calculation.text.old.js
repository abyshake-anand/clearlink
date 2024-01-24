function calculateGCF(numbers) {
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

    // Generate formatted output
    const output = `
  # How to find the Greatest Common Factor of ${numbers.join(' and ')}?
  
  There are several methods to calculate the Greatest Common Factor (GCF) of ${numbers.join(' and ')}.
  
  In our first method, we'll find out the GCF using the prime factorization method.
  
  In our second method, we'll use the list of factors to determine the GCF.
  
  Now let's look at each method and calculate the GCF of ${numbers.join(' and ')}.
  
  ### Method 1 - Prime Factorization
  
  With the prime factorization method, all we have to do is to find the common prime factors of ${numbers.join(' and ')}, and then multiply them.
  
  #### Step 1: Let's create a list of all the prime factors of ${numbers.join(' and ')}:
  
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
  
  #### Step 2: Write down a list of all the common prime factors of ${numbers.join(' and ')}:
  
  As seen in the boxes above, the common prime factors of ${numbers.join(' and ')} are ${Object.keys(primeFactorization(gcf)).join(' and ') || 'None'}.
  
  #### Step 3: All we have to do now is to multiply these common prime factors:
  
  Find the product of all common prime factors by multiplying them:
  
  ${Object.entries(primeFactorization(gcf))
            .map(([factor, exponent]) => `${factor}^${exponent}`)
            .join(' * ')} = **${gcf}**
  
  ### Done!
  
  According to our calculations above, the **Greatest Common Factor** of ${numbers.join(' and ')} is **${gcf}**.
  
  ### Method 2 - List of Factors
  
  With this simple method, we'll need to find all the factors of ${numbers.join(' and ')}, factors are numbers that divide the another number without a remainder, and simply identify the common ones, then choose which is the largest one.
  
  #### Step 1: Create a list of all the numbers that divide ${numbers.join(' and ')} without a remainder:
  
  ${numbers.map((num) => {
                const factors = Array.from({ length: num }, (_, i) => i + 1).filter((factor) => num % factor === 0);
                return `
  #### List of factors that divide **${num}** without a remainder are:
  
  ${factors.join(', ')}`;
            }).join('\n')}
  
  #### Step 2: Identify the largest common number from the 2 lists above:
  
  As you can see in the lists of factors from above, for the numbers ${numbers.join(' and ')}, we have highlighted the number **${gcf}**, which means that we have found the Greatest Common Factor, or GCF.
  
  According to our calculations above, the **Greatest Common Factor of** ${numbers.join(' and ')} is **${gcf}**.
  
  `;
    return {
        page_title: `[Solved] LCM of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}: 3 Easy Ways`,
        page_description: `Learn how to calculate the LCM of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using 3 easy methods: Using GCF, By Prime Factorization, and Using List of Multiples.`,
        page_keywords: [`lcm of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}`, `lcm of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using gcf`, `lcm of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using prime factorization`, `lcm of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using list of multiples`, `least common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}`, `least common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using gcf`, `least common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using prime factorization`, `least common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using list of multiples`, `lowest common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')}`, `lowest common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using gcf`, `lowest common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using prime factorization`, `lowest common multiple of ${numbers.join(', ').replace(/,([^,]*)$/, ' and$1')} using list of multiples`],
        page_author: "",
        page_content: output,
    }
}

module.exports = { calculateGCF }