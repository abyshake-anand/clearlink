<template></template>

<script>
import { project_config, project_metadata } from '~/inc/config/project'
const lodash = require("lodash"); const moment = require("moment-timezone");
export default {
    props: {
        page_data: { type: Object, default: () => ({}) }
    },
    computed: {
        absolute_url() {
            const full_url = project_metadata.base_url + this.$route.path
            return lodash.replace(full_url, /\/\//g, '/')
        },
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
        page_title() {
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
        page_description() {
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
        all_images_on_page() {
            return [
                ...[ this.featured_image_details ],
                ... this.page_data?.pin_image?.url ? [ this.page_data?.pin_image ] : [],
                ... this.page_data?.thumbnail_image?.url ? [ this.page_data?.thumbnail_image ] : [],
            ]
        }
    },
    head() {
        return {
            script: [
                ...[
                    {
                        type: 'application/ld+json',
                        json: {
                            '@context': 'http://schema.org',
                            '@type': 'Article',
                            "@id": `${this.absolute_url}#article`,
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": `${this.absolute_url}#webpage`,
                            },
                            "datePublished": this.created_at,
                            "dateModified": this.updated_at,
                            "description": this.page_description,
                            "headline": this.page_title,
                            "image": this.all_images_on_page.map((image) => {
                                return {
                                    "@type": "ImageObject",
                                    "@id": `${image.url}#${image.image_cat}`,
                                    "url": image.url,
                                    "width": image.width,
                                    "height": image.height
                                }
                            }),
                            "author": {
                                "@type": "Organization",
                                "@id": `${project_metadata.base_url}#organization`,
                                "name": project_metadata.name,
                                "url": project_metadata.base_url,
                            },
                            "publisher": {
                                "@type": "Organization",
                                "@id": `${project_metadata.base_url}#organization`,
                                "name": project_metadata.name,
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": project_metadata.logo_url
                                }
                            }
                        }
                    },
                    {
                        type: 'application/ld+json',
                        json: {
                            "@context": "https://schema.org",
                            "@type": "Table",
                            "about": this.page_title
                        }
                    },
                    {
                        type: 'application/ld+json',
                        json: {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "@id": `${project_metadata.base_url}#organization`,
                            "url": project_metadata.base_url,
                            "logo": project_metadata.logo_url,
                            "name": project_metadata.name,
                        }
                    },
                    {
                        type: 'application/ld+json',
                        json: {
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "@id": `${project_metadata.base_url}#website`,
                            "url": project_metadata.base_url,
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": `${ project_metadata.base_url }?s={search_term_string}`,
                                "query-input": "required name=search_term_string"
                            }
                        }
                    },
                    {
                        type: 'application/ld+json',
                        json: {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "@id": `${this.absolute_url}#webpage`,
                            "url": project_metadata.base_url,
                            "name": this.page_title,
                            "isPartOf": {
                                "@id": `${project_metadata.base_url}#website`,
                            },
                            "primaryImageOfPage": {
                                "@id": `${this.absolute_url}#featured`,
                            },
                            "image": {
                                "@id": `${this.absolute_url}#featured`,
                            },
                            "thumbnailUrl": this.all_images_on_page.find((image) => image.image_cat === 'thumbnail')?.url,
                            "datePublished": this.created_at,
                            "dateModified": this.updated_at,
                            "author": {
                                "@type": "Organization",
                                "name": project_metadata.name,
                                "url": project_metadata.base_url,
                            },
                            "description": this.page_description,
                            "breadcrumb": {
                                "@id": `${this.absolute_url}#breadcrumb`,
                            },
                            "inLanguage": "en-US",
                            "potentialAction": [
                                {
                                    "@type": "ReadAction",
                                    "target": [
                                        `${this.absolute_url}`
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        type: 'application/ld+json',
                        json: {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "@id": `${this.absolute_url}#breadcrumb`,
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": project_metadata.name,
                                    "item": project_metadata.base_url
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": this.page_title,
                                    "item": this.absolute_url
                                }
                            ]
                        }
                    },
                    {
                    type: 'application/ld+json',
                    json: {
                        "@context": "https://schema.org",
                        "@type": "ImageObject",
                        "@id": `${this.absolute_url}#logo`,
                        "url": project_metadata.logo_url,
                        "width": project_metadata.logo_width ? project_metadata.logo_width : 512,
                        "height": project_metadata.logo_height ? project_metadata.logo_height : 512,
                        "caption": project_metadata.name,
                    }
                },
                ],
                ... this.all_images_on_page.map((image) => {
                    return {
                        type: 'application/ld+json',
                        json: {
                            "@context": "https://schema.org",
                            "@type": "ImageObject",
                            "@id": `${image.url}#${image.image_cat}`,
                            "url": image.url,
                            "width": image.width,
                            "height": image.height,
                            "caption": image.alt,
                        }
                    }
                }),
            ]
        }
    },
    mounted() {
        this.$nuxt.$on('routeChanged', (to, from) => {
            this.$nuxt.$emit('updateHead')
        })
    }
}
</script>