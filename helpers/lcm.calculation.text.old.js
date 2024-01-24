function calculateLCM(numbersArray) {
    const numbers = Array.from(numbersArray).map((num) => parseInt(num));
    // Function to calculate the greatest common factor (GCF) of numbers in an array
    const calculateGCF = (a, b) => (b === 0 ? a : calculateGCF(b, a % b));

    // Function to calculate the LCM using GCF
    const calculateLCMUsingGCF = (a, b) => (a * b) / calculateGCF(a, b);

    // Function to calculate the prime factorization of a number
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

    // Function to calculate the LCM using prime factorization
    const calculateLCMUsingPrimeFactorization = (a, b) => {
        const factorsA = primeFactorization(a);
        const factorsB = primeFactorization(b);
        const lcmFactors = {};

        // Merge factors from both numbers
        for (let factor in factorsA) {
            lcmFactors[factor] = Math.max(lcmFactors[factor] || 0, factorsA[factor]);
        }

        for (let factor in factorsB) {
            lcmFactors[factor] = Math.max(lcmFactors[factor] || 0, factorsB[factor]);
        }

        // Calculate LCM using the merged factors
        let lcm = 1;
        for (let factor in lcmFactors) {
            lcm *= Math.pow(parseInt(factor), lcmFactors[factor]);
        }

        return lcm;
    };

    // Function to calculate the LCM using the list of multiples
    const calculateLCMUsingMultiples = (numbers) => {
        let lcm = Math.max(...numbers);
        while (!numbers.every((num) => lcm % num === 0)) {
            lcm += Math.max(...numbers);
        }
        return lcm;
    };

    // Calculate LCM using different methods
    const lcmUsingGCF = numbers.reduce(calculateLCMUsingGCF);
    const lcmUsingPrimeFactorization = numbers.reduce(calculateLCMUsingPrimeFactorization);
    const lcmUsingMultiples = calculateLCMUsingMultiples(numbers);

    // Generate formatted output
    const output = `
  # What is the Least Common Multiple of ${numbers.join(' and ')}?
  
  The least common multiple (LCM) of ${numbers.join(' and ')} is **${lcmUsingGCF}**.
  
  *Least common multiple* or lowest common denominator (lcd) can be calculated in three simple and easy ways:
  
  - LCM formula calculation method using greatest common factor (GCF)
  - Prime factorization method
  - List of multiples method
  
  Let us look at each of these methods.
  
  ## Calculating LCM of ${numbers.join(' and ')} using their GCF
  
  The formula for calculating LCM of two numbers is:
  
  $LCM(a, b) = (a * b) / GCF(a, b)$
  
  For this method, we need to first calculate the greatest common factor of ${numbers.join(' and ')}, and then apply it to the formula equation above.
  
  GCF of ${numbers.join(' and ')} is ${lcmUsingGCF}.
  
  So, LCM of ${numbers.join(' and ')} would be (${numbers.join(' x ')}) / ${lcmUsingGCF} = ${lcmUsingGCF}
  
  ## Using Prime Factorization to calculate Least Common Multiple of ${numbers.join(' and ')}
  
  The least common multiple (LCM) of numbers can be also found by breaking up each number into its prime factors, and then multiplying the highest exponent prime factors of each number.
  
  The steps are simple:
  
  - Find prime factors of each number
  - Denote each number as a multiple of prime factors in their exponential form
  - Identify the highest exponential power for each prime factor for each number
  - Multiply the prime factors with their highest powers to get the Least common multiple of the numbers
  
  Let’s do this.
  
  ${numbers.map((num) => {
        const factors = primeFactorization(num);
        return `
  ### Prime factorization of ${num}
  
  Prime factors of ${num} are ${Object.keys(factors).join(', ')}.
  
  So, prime factorization of ${num} in exponential form would be:
  
  $${num} = ${Object.entries(factors)
                .map(([factor, exponent]) => `${factor}^${exponent}`)
                .join(' * ')}$`;
    }).join('')}
    
  So, to calculate the LCM of ${numbers.join(' and ')}, we would multiply the highest exponent prime factors:
  
  ${numbers.map((num) => {
        const factors = primeFactorization(num);
        return `
  $${num} = ${Object.entries(factors)
                .map(([factor, exponent]) => `${factor}^${exponent}`)
                .join(' * ')}$`;
    }).join('\n\n')}
  
So, LCM of ${numbers.join(' and ')} would be:
  
  $LCM(${numbers.join(', ')}) = ${lcmUsingPrimeFactorization}$
  
  ## LCM of ${numbers.join(' and ')} using list of multiples
  
  This is the most rudimentary approach.
  
  We will find and list the multiples of each number until we find a common multiple. This common multiple would therefore, by definition, be the lowest or least common multiple.
  
  ${numbers.map((num) => {
                const multiples = Array.from({ length: 10 }, (_, i) => num * (i + 1));
                return `
  ### Multiples of ${num}:
  
  ${multiples.join(', ')}`;
            }).join('')}
    
  As we can see, ${lcmUsingMultiples} is the first number to be present in all lists of multiples.
  
  Therefore, LCM(${numbers.join(', ')}) = ${lcmUsingMultiples}`;

  return {
    page_title: "",
    page_description: "",
    page_keywords: [],
    page_author: "",
    page_url: "",
    page_image: "",
    page_content: output,
  }
}

module.exports = { calculateLCM }