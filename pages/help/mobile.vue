<template>
    <div class="flex flex-col flex-1">
        <div id="top-section" class="w-full px-4 py-4 text-white" style="background:radial-gradient(#2e0f75, #131b27);">
            <div id="top-header" class="flex items-center justify-between">
                <div class="flex items-center">
                    <img src="/logos/logo.jpg" alt="" class="h-8 w-8 rounded-full mr-2">
                    <div class="text-2xl font-medium font-mono">@mx_abhishek</div>
                </div>
                <div v-if="is_page_iframe" class="">
                    <div @click="close_iframe" class="px-1 py-1 rounded-md hover:bg-gray-300/10 cursor-pointer hover:text-indigo-200 hover:rotate-90 transition ease-in-out duration-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /> </svg></div>
                </div>
            </div>
            <div id="search-form" class="py-16">
                <div class="flex justify-center text-center font-medium text-2xl">How can we help? 👋</div>
                <form action="" class="mt-5 w-full flex text-gray-950 relative">
                    <input type="text" class="flex-1 pl-10 mx-5 my-2 px-2 py-2 rounded-md border border-purple-500 outline-none focus:outline-none" placeholder="Search for articles..." />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute m-auto top-0 bottom-0 left-7 text-black w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /> </svg>
                    <div class="">
                    </div>
                </form>
            </div>
            <div class="h-20"></div>
        </div>
        <div id="content-section" class="-mt-20 px-5">
            <div class="text-white text-base font-bold">All Categories</div>
            <div class="">
                <div v-for="(category, index) in categories" :key="`cat_${ index + 1 }`" class="bg-white rounded-lg shadow-lg border border-gray-300 my-5 px-5 py-5">
                    <div class="text-lg font-bold font-monty">{{ category.name }}</div>
                    <div class="text-sm font-medium font-poppins my-2">{{ category.description }}</div>
                    <div class="text-xs uppercase tracking-widest text-gray-600">{{ category.articles }} articles</div>
                </div>
            </div>
        </div>
        <div id="footer-section" class=""></div>
        <div id="branding-section" class=""></div>
    </div>
</template>

<script>
export default {
    layout: "blank",
    methods: {
        iframe_check() {
            if (window.self !== window.top) {
                return true;
            } else {
                return false;
            }
        },
        close_iframe() {
            if (this.iframe_check()) {
                window.parent.postMessage({ "message": "close_iframe" }, "*");
            } else {
                console.log("not in iframe")
                return false;
            }
        }
    },
    mounted() {
        if (this.iframe_check()) {
            this.is_page_iframe = true;
        }
    },
    data() {
        return {
            is_page_iframe: false,
            categories: [
                {
                    name: "General Info",
                    description: "Find out what Helpkit is, our data safety, and how our trial works",
                    articles: 10,
                    slug: "general-info",
                },
                {
                    name: "Getting Started",
                    description: "Learn how to set up your account, invite your team, and get started with Helpkit",
                    articles: 7,
                    slug: "getting-started",
                },
                {
                    name: "Working with your Notion workspace",
                    description: "How Helpkit interacts with your Notion workspace, how can you create new articles, and more",
                    articles: 12,
                    slug: "notion-workspace",
                },
                {
                    name: "Customization",
                    description: "Learn how to customize your Helpkit knowledge base, and how to make it your own",
                    articles: 5,
                    slug: "customization",
                },
                {
                    name: "Insights",
                    description: "Learn how to use Helpkit's insights to improve your knowledge base",
                    articles: 3,
                    slug: "insights",
                }
            ]
        }
    },
}
</script>

<style>

</style>