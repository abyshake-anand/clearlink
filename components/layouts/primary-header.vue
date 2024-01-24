<template>
    <div id="header" class="container px-4 py-6 lg:px-6 lg:py-10 mx-auto flex justify-between">
        <NuxtLink to="/" class="flex items-center space-x-0.5 lg:space-x-2">
            <div class="h-6 w-6 lg:h-20 lg:w-20">
                <img src="/logos/logo.jpg" alt="" class="rounded-full border-4 border-slate-300">
            </div>
            <div class="text-base lg:text-4xl font-black">@mx_abhishek</div>
        </NuxtLink>
        <div class="hidden lg:flex items-center space-x-8 text-xl font-medium">
            <NuxtLink to="/about" class="text-slate-700 hover:text-slate-800 hover:underline">About</NuxtLink>
            <NuxtLink to="/blog" class="text-slate-700 hover:text-slate-800 hover:underline">Blog</NuxtLink>
            <NuxtLink to="/contact" class="text-slate-700 hover:text-slate-800 hover:underline">Contact</NuxtLink>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>