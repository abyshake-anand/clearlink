const analytics_details = {
    id: "GOyVv9Yx37x6ZPQwA",
    domain: "gcf-lcm.vercel.app"
}
export default {
    head: {
        title: 'Clearlink',
        htmlAttrs: {
            lang: 'en'
        },
        link: [
            { hid: "shortcut_icon", rel: 'icon', type: 'png', href: '/test/clearlink.png' },
            { rel: 'icon', type: 'image/png', href: '/test/clearlink.png' },
            { rel: 'shortcut icon', type: 'image/png', href: '/test/clearlink.png' },
            { rel: 'shortcut icon', type: 'image/png', href: '/test/clearlink.png', sizes: '16x16' },
            { rel: 'shortcut icon', type: 'image/png', href: '/test/clearlink.png', sizes: '32x32' },
            { rel: 'shortcut icon', type: 'image/png', href: '/test/clearlink.png', sizes: '96x96' },
        ],
        script: [
            // { "async": true, "src": 'https://getbenne.com/core.js', "data-site": analytics_details.id, "data-domain": analytics_details.domain },
            // { "async": true, "src": 'https://mx-abhishek.vercel.app/chat.js', "data-site": "wzqgjx", "data-domain": "getbenne.com", "widget": "1" },
            // { "async": true, "src": 'https://trycitadel.com/script.js', "data-site": "wzqgjx", "data-domain": "getbenne.com", "widget": "1" },
        ]
    },
    css: ['~/assets/css/main.css'],
    plugins: [],
    components: true,
    buildModules: ['@nuxt/image'],
    image: {
    },
    modules: [
        '@nuxtjs/axios',
        '@nuxt/content'
    ],
    axios: {
        baseURL: '/',
    },
    dotenv: {
    },
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    'tailwindcss/nesting': {},
                    tailwindcss: {},
                    autoprefixer: {},
                    cssnano: {}
                },
            },
        },
    },
    serverMiddleware: [
        '~/api/index.js',
        // '~/middleware/redirects.js'
    ],
}