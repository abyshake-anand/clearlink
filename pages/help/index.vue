<template>
    <div class="flex-1 flex flex-col">
        <div class="fixed bottom-10 right-10">
            <div v-if="widget_open" class="h-[85vh] w-[370px] bg-white border border-gray-300"></div>
            <!-- <div class="launcher">
                <svg xmlns="http://www.w3.org/2000/svg" id="launcherBtn-icon-open" class="helpkit-show" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 helpkit-hide" id="launcherBtn-icon-close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span id="launcherBtn-text" class="">Help</span>
            </div> -->
            <!-- <a href="#_" class="relative inline-block text-lg group">
                <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span class="relative">Button Text</span>
                </span>
                <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
            </a> -->
            <div @click="toggle_widget" class="flex justify-end mt-2 bg-green-200 max-w-max float-right">
                <div v-if="!widget_open" class="relative inline-block px-4 py-2 font-medium group">
                    <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                    <span class="relative text-black group-hover:text-white">Open widget</span>
                </div>
                <div v-else class="relative inline-block px-4 py-2 font-medium group">
                    <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                    <span class="relative text-black group-hover:text-white">X</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "blank",
    methods: {
        toggle_widget() {
            this.widget_open = !this.widget_open
        }
    },
    data() {
        return {
            widget_open: false,
        }
    },
}
</script>

<style scoped>
.launcher {
    /* position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 999;
    cursor: pointer;
    transition: all 0.3s ease-in-out; */
    bottom: 16px;
    right: 24px;
    left: auto;
    position: fixed !important;
    background: #7C2DF1;
    transition: all 0.3s ease-in;
    color: #ffffff;
    z-index: 99998;
    padding-left: 8px;
    padding-right: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    user-select: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Oxygen, Cantarell, sans-serif;
    cursor: pointer;
    display: flex;
    max-width: 250px;
    width: auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border-radius: 30px 8px 30px 30px;
    animation: helpkitPulse 2s;
    animation-delay: 2s;
    animation-iteration-count: 1;
}
</style>