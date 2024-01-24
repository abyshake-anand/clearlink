<template>
    <div class="flex flex-col">
        <div class="container mx-auto px-2 py-2 lg:px-6 lg:py-10 prose font-medium">
            <h2 class="text-2xl font-bold">{{ gcf_heading_text }}</h2>
            <ul v-if="gcf_examples_array.length" class="list-disc list-inside">
                <li v-for="(example, index) in gcf_examples_array" :key="`gcf_example_${ index + 1}`">
                    <NuxtLink :to="example.url" class="">{{ example.title }}</NuxtLink>
                </li>
            </ul>
            <h2 class="text-2xl font-bold">{{ lcm_heading_text }}</h2>
            <ul v-if="lcm_examples_array.length" class="list-disc list-inside">
                <li v-for="(example, index) in lcm_examples_array" :key="`lcm_example_${ index + 1}`">
                    <NuxtLink :to="example.url" class="">{{ example.title }}</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
const lodash = require("lodash");
export default {
    data() {
        return {
            gcf_heading_text: `Greatest Common Factor Examples`,
            lcm_heading_text: `Least Common Multiple Examples`,
            gcf_examples_array: [],
            lcm_examples_array: [],
        }
    },
    computed: {
        current_numbers_array() {
            if (this.$route.path === '/') {
                return []
            }
            var current_url_slug = this.$route.path.split('/').pop()
            var url_slug = lodash.replace(current_url_slug, '-', ' ')
            var numbers = url_slug.match(/\d+/g).map(Number)
            return numbers
        }
    },
    methods: {
        make_gcf_examples_array() {
            var numbers_array = this.current_numbers_array
            var gcf_examples_array = []
            var items = []
            var number_of_entries = Math.floor(Math.random() * 5) + 6
            while (gcf_examples_array.length < number_of_entries) {
                var first_number = Math.floor(Math.random() * 100) + 2
                var second_number = Math.floor(Math.random() * 100) + 2
                var include_third_number = Math.random() >= 0.75
                var third_number = include_third_number ? Math.floor(Math.random() * 100) + 2 : null
                if (first_number === second_number || first_number === third_number || second_number === third_number) { continue }
                if (numbers_array.includes(first_number) || numbers_array.includes(second_number) || numbers_array.includes(third_number)) { continue }
                var number_combination = [ ...[first_number, second_number], ...(include_third_number ? [third_number] : []) ]
                number_combination.sort((a, b) => a - b)
                if (items.some(item => lodash.isEqual(item, number_combination))) { continue }
                items.push(number_combination)
                gcf_examples_array.push({
                    title: `GCF of ${number_combination.join(', ').replace(/,([^,]*)$/, ' and$1')}`,
                    url: `/gcf-of-${number_combination.join('-').replace(/-([^\\-]*)$/, '-and-$1')}`,
                })
            }
            this.gcf_examples_array = gcf_examples_array
            return;
        },
        make_lcm_examples_array() {
            var numbers_array = this.current_numbers_array
            var lcm_examples_array = []
            var items = []
            var number_of_entries = Math.floor(Math.random() * 5) + 6
            while (lcm_examples_array.length < number_of_entries) {
                var first_number = Math.floor(Math.random() * 100) + 2
                var second_number = Math.floor(Math.random() * 100) + 2
                var include_third_number = Math.random() >= 0.80
                var third_number = include_third_number ? Math.floor(Math.random() * 100) + 2 : null
                if (first_number === second_number || first_number === third_number || second_number === third_number) { continue }
                if (numbers_array.includes(first_number) || numbers_array.includes(second_number) || numbers_array.includes(third_number)) { continue }
                var number_combination = [ ...[first_number, second_number], ...(include_third_number ? [third_number] : []) ]
                number_combination.sort((a, b) => a - b)
                if (items.some(item => lodash.isEqual(item, number_combination))) { continue }
                items.push(number_combination)
                lcm_examples_array.push({
                    title: `LCM of ${number_combination.join(', ').replace(/,([^,]*)$/, ' and$1')}`,
                    url: `/lcm-of-${number_combination.join('-').replace(/-([^\\-]*)$/, '-and-$1')}`,
                })
            }
            this.lcm_examples_array = lcm_examples_array
            return;
        },
    },
    mounted() {
        try {
            this.make_gcf_examples_array()
            this.make_lcm_examples_array()
            if (this.$route.path !== '/') {
                this.$nuxt.$on('routeChanged', () => {
                    this.make_gcf_examples_array()
                    this.make_lcm_examples_array()
                })
                this.gcf_heading_text = `Other Greatest Common Factor Examples`
                this.lcm_heading_text = `Other Least Common Multiple Examples`
            }
        } catch (error) {
            console.log(error)
            this.gcf_heading_text = ""
            this.lcm_heading_text = ""
        }
    },
}
</script>

<style>

</style>