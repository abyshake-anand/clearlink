# gcd-lcm-site

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
# zsites-gcd-lcm


"vercel-build": "yarn global add node-gyp sharp fs-extra && yarn install && yarn build"


vercel.json
{
    "version": 2,
    "builds": [
        {
            "src": "package.json",
            "use": "@vercel/node"
        },
        {
            "src": "nuxt.config.js",
            "use": "@nuxtjs/vercel-builder",
            "config": {
                "serverFiles": [
                    "content/**"
                ]
            }
        }
    ]
}

package.json
{
  "name": "gcd-lcm-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate",
    "vercel-build": "yarn global add node-gyp sharp fs-extra && yarn install && yarn build"
  },
  "dependencies": {
    "esm": "^3.2.25",
    "fs-extra": "^11.2.0",
    "node-fetch": "2.6.6",
    "node-fetch-native": "^1.4.1",
    "path": "^0.12.7",
    "sharp": "0.32.6"
  },
  "devDependencies": {
    "@nuxt/image": "^0.7.1",
    "@nuxtjs/axios": "^5.13.6",
    "@tailwindcss/typography": "^0.5.10",
    "autoprefixer": "^10.4.14",
    "core-js": "^3.25.3",
    "dotenv": "^16.3.1",
    "encoding": "^0.1.13",
    "katex": "^0.16.9",
    "lodash": "^4.17.21",
    "markdown-it": "^13.0.2",
    "markdown-it-texmath": "^1.0.0",
    "moment-timezone": "^0.5.43",
    "nuxt": "^2.15.8",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.2",
    "vue": "^2.7.10",
    "vue-clickaway": "^2.2.2",
    "vue-server-renderer": "^2.7.10",
    "vue-template-compiler": "^2.7.10"
  }
}
# mx-abhishek
# clearlink
