<template></template>

<script>
const { project_metadata, project_config, project_verification } = require("~/inc/config/project");
const lodash = require("lodash"); const moment = require("moment-timezone");
export default {
    props: { page_data: { type: Object, default: null } },
    data() { return {} },
    computed: {
        created_at() {
            if (this.page_data && this.page_data?.created_at) {
                return moment.unix(this.page_data?.created_at).toISOString()
            }
            return project_metadata.created_at
        },
        updated_at() {
            if (this.page_data && this.page_data?.updated_at) {
                return moment.unix(this.page_data?.updated_at).toISOString()
            }
            return project_metadata.updated_at
        },
        absolute_url() {
            const full_url = project_metadata.base_url + this.$route.path
            return lodash.replace(full_url, /\/\//g, '/')
        },
        language_locale() {
            if (this.page_data?.language_code && this.page_data?.language_code !== 'en') {
                return `${this.page_data?.language_code}-${this.page_data?.language_code.toUpperCase()}`
            }
            return 'en-US'
        },
        current_page_title() {
            if (this.$route.path === '/') {
                return project_metadata.title
            }
            if (this.page_data?.page_title) {
                return `${this.page_data?.page_title} | ${project_metadata.title_template}`
            }
            var current_url_slug = this.$route.path.split('/').pop()
            var url_slug = lodash.replace(current_url_slug, '-', ' ')
            return `${lodash.startCase(url_slug)} | ${project_metadata.title_template}`
        },
        current_page_description() {
            if (this.$route.path === '/') {
                return project_metadata.description
            }
            if (this.page_data?.page_description) {
                return this.page_data?.page_description
            }
            var current_url_slug = this.$route.path.split('/').pop()
            var url_slug = lodash.replace(current_url_slug, '-', ' ')
            return `${lodash.startCase(url_slug)} page for ${project_metadata.name}. ${project_metadata.description}`
        },
        featured_image_details() {
            if (this.page_data?.featured_image?.url) {
                return this.page_data?.featured_image
            }
            return project_metadata.featured_image_details
        },
    },
    head() {
        return {
            title: this.current_page_title,
            htmlAttrs: { lang: this.language_locale },
            meta: [
                ...this.current_page_title ? [
                    { hid: "title", name: "title", content: this.current_page_title },
                    { hid: "og:title", property: "og:title", content: this.current_page_title },
                    { hid: "twitter:title", name: "twitter:title", content: this.current_page_title },
                    { hid: "og:image:alt", property: "og:image:alt", content: this.current_page_title },
                    { hid: "twitter:image:alt", name: "twitter:image:alt", content: this.current_page_title },
                ] : [],
                ...this.current_page_description ? [
                    { hid: "description", property: "description", content: this.current_page_description },
                    { hid: "og:description", property: "og:description", content: this.current_page_description },
                    { hid: "twitter:description", name: "twitter:description", content: this.current_page_description },
                ] : [],
                ...this.page_data?.keywords ? [ { hid: "keywords", name: "keywords", content: this.page_data?.keywords } ] : [],
                ...[
                    { hid: "twitter:image", name: "twitter:image", content: this.featured_image_details.url },
                    { hid: "twitter:image:secure_url", name: "twitter:image:secure_url", content: this.featured_image_details.url },
                    { hid: "twitter:image:width", name: "twitter:image:width", content: this.featured_image_details.width },
                    { hid: "twitter:image:height", name: "twitter:image:height", content: this.featured_image_details.height },
                    { hid: "twitter:image:alt", name: "twitter:image:alt", content: this.featured_image_details.alt },
                    { hid: "twitter:image:type", name: "twitter:image:type", content: "image/webp" },
                    { hid: "og:image", property: "og:image", content: this.featured_image_details.url },
                    { hid: "og:image:secure_url", property: "og:image:secure_url", content: this.featured_image_details.url },
                    { hid: "og:image:width", property: "og:image:width", content: this.featured_image_details.width },
                    { hid: "og:image:alt", property: "og:image:alt", content: this.featured_image_details.alt },
                    { hid: "og:image:height", property: "og:image:height", content: this.featured_image_details.height },
                    { hid: "og:image:type", property: "og:image:type", content: "image/webp" },
                    
                ],
                ...[
                    { hid: 'robots', name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
                    { charset: 'utf-8' },
                    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=5' },
                    { name: 'format-detection', content: 'telephone=no' },
                    { hid: "apple-mobile-web-app-capable", name: 'apple-mobile-web-app-capable', content: 'yes' },
                    { hid: "apple-mobile-web-app-title", name: 'apple-mobile-web-app-title', content: project_metadata.name },
                    { hid: "application-name", name: 'application-name', content: project_metadata.name },
                    { hid: "msapplication-TileImage", name: 'msapplication-TileImage', content: '/logos/192x192.png' },
                    { hid: "msapplication-TileColor", name: 'msapplication-TileColor', content: '#1E61F0' },
                    { hid: "theme-color", name: 'theme-color', content: '#eef9ff' },
                    { hid: 'referrer', name: 'referrer', content: 'strict-origin-when-cross-origin' },
                    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
                    { hid: 'og:type:primary', property: 'og:type', content: 'website' },
                    { name: 'twitter:card', content: 'summary_large_image' },
                    { name: 'robots', content: 'index, follow' },
                    { name: 'googlebot', content: 'index, follow' },
                    { name: 'bingbot', content: 'index, follow' },
                    { name: 'yandex', content: 'index, follow' },
                    { hid: "pinterest-verification", name: "p:domain_verify", content: project_verification.pinterest },
                    { hid: "google-search-console-verification", name: 'google-site-verification', content: project_verification.gsc },
                    // { hid: "google-adsense", name: 'google-adsense-account', content: project_verification.adsense },
                    { name: 'generator', content: project_config.generator },
                    { hid: "language", name: "language", content: this.language_locale },
                    { hid: "content-language", "http-equiv": "content-language", content: this.language_locale },
                    { hid: "og:locale", property: "og:locale", content: this.language_locale },
                    { hid: "og:url", property: "og:url", content: this.absolute_url },
                    { hid: "twitter:url", name: "twitter:url", content: this.absolute_url },
                    { hid: "og:published_time", property: "og:published_time", content: this.created_at },
                    { hid: "og:updated_time", property: "og:updated_time", content: this.updated_at },
                    // { hid: 'twitter:domain', name: 'twitter:domain', content: this.page_data.domain },
                    // { hid: 'twitter:creator', name: 'twitter:creator', content: this.page_data.creator },
                    // { hid: 'twitter:site', name: 'twitter:site', content: this.page_data.site },
                    // { hid: 'og:site_name', property: 'og:site_name', content: this.page_data.site_name },
                    { name: 'type', content: 'website' },
                    // { hid: 'author', name: 'author', content: project_config.project_name },
                    { name: 'copyright', content: project_metadata.name },
                    { name: 'publisher', content: project_metadata.name },
                ],
            ],
            link: [
                { hid: "canonical", rel: "canonical", href: this.absolute_url },
            ],
            script: [
                { "async": true, "src": 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', "data-ad-client": "client=ca-pub-7172542180035788", "crossorigin": "anonymous" },
            ]
        }
    },
}
</script>