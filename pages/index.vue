<template>
    <div class="">
        <div class="container mx-auto px-2 py-2 lg:px-6 lg:py-10 prose dark:prose-invert font-medium">
            <NuxtContent :document="page_content" />
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ $content, route }) {
        const current_page_route = "index"
        const post = (await $content('pages', { deep: true }).where({ "pageDisplaySlug": current_page_route }).fetch())[0];
        return {
            page_content: post
        }
    }
}
</script>

<style>

</style>