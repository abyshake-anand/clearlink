<template>
    <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 antialiased">
        <header class="flex flex-col bg-slate-200/50 border-b border-slate-300">
            <LayoutsStickyHeader class="sticky top-0 z-50" />
            <LayoutsPrimaryHeader class="" />
            <LayoutsSecondaryHeader class="" />
        </header>
        <Nuxt class="flex-1 flex flex-col" />
        <footer id="" class="flex flex-col py-10">
            <LayoutsCtaFooter class="" />
            <LayoutsPrimaryFooter class="" />
            <LayoutsSecondaryFooter class="" />
            <LayoutsSocialFooter class="" />
        </footer>
        <LayoutsBrandings class="fixed bottom-0 right-0 mr-3.5 mb-2 space-y-2" />
        <div >
        </div>
    </div>
</template>

<script>
export default {

}
</script>