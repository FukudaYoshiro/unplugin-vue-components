# unplugin-vue-components

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-components?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-components)

On-demand components auto importing for Vue.

###### Features

- 💚 Supports both Vue 2 and Vue 3 out-of-the-box.
- ⚡️ Supports Vite, Webpack, Vue CLI, rollup and more, powered by <a href="https://github.com/unjs/unplugin">unplugin</a>.
- 🏝 Tree-shakable, only registers the components you use.
- 🪐 Folder as namespaces.
- 🦾 Full TypeScript support.
- 🌈 [Built-in resolvers](#importing-from-ui-libraries) for popular UI libraries.
- 😃 Works perfectly with [unplugin-icons](https://github.com/antfu/unplugin-icons).

<br>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

<br>

## Installation

```bash
npm i unplugin-vue-components -D
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({ /* options */ }),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Components from 'unplugin-vue-components/rollup'

export default {
  plugins: [
    Components({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-components/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

You don't need this plugin for Nuxt, use [`@nuxt/components`](https://github.com/nuxt/components) instead.

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

## Usage

Use components in templates as you would usually do, it will import components on demand and there is no `import` and `component registration` required anymore! If you register the parent component asynchronously (or lazy route), the auto-imported components will be code-split along with their parent.

Basically, it will automatically turn this

```html
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

into this

```html
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
import HelloWorld from './src/components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
```

## TypeScript

To have TypeScript support for auto-imported components, there is [a PR](https://github.com/vuejs/vue-next/pull/3399) to Vue 3 extending the interface of global components. Currently, [Volar](https://github.com/johnsoncodehk/volar) has supported this usage already, if you are using Volar, you can change the config as following to get the support.

```ts
Components({
  dts: true, // enabled by default if `typescript` is installed
})
```

Once the setup is done, a `components.d.ts` will be generated and updates automatically with the type definitions. Feel free to commit it into git or not as you want.

**Make sure you also add `components.d.ts` to your `tsconfig.json` under `includes`.**

## Importing from UI Libraries

We have several built-in resolvers for popular UI libraries like **Vuetify**, **Ant Design Vue**, and **Element Plus**, where you can enable them by:

Supported Resolvers:

- [Ant Design Vue](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/antdv.ts)
- [Element Plus](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/element-plus.ts)
- [Element UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/resolvers/element-ui.ts)
- [Headless UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/headless-ui.ts)
- [IDux](https://github.com/antfu/unplugin-vue-components/blob/main/src/resolvers/idux.ts)
- [Naive UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/naive-ui.ts)
- [Prime Vue](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/prime-vue.ts)
- [Vant](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/vant.ts)
- [Varlet UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/varlet-ui.ts)
- [View UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/resolvers/view-ui.ts)
- [Vuetify](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/vuetify.ts)
- [VueUse Components](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/vueuse.ts)

```ts
// vite.config.js
import ViteComponents, {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers'

// your plugin installation
Components({
  resolvers: [
    AntDesignVueResolver(),
    ElementPlusResolver(),
    VantResolver(),
  ]
})
```

You can also write your own resolver easily:

```ts
Components({
  resolvers: [
    // example of importing Vant
    (name) => {
      // where `name` is always CapitalCase
      if (name.startsWith('Van'))
        return { importName: name.slice(3), path: 'vant' }
    }
  ]
})
```

If you made other UI libraries configured, please feel free to contribute so it can help others using them out-of-box. Thanks!


## Migrate from `vite-plugin-components`

`package.json`

```diff
{
  "devDependencies": {
-   "vite-plugin-components": "*",
+   "unplugin-vue-components": "^0.14.0",
  }
}
```

`vite.config.json`

```diff
- import Components, { ElementPlusResolver } from 'vite-plugin-components'
+ import Components from 'unplugin-vue-components/vite'
+ import ElementPlusResolver from 'unplugin-vie-components/resolvers'

export default {
  plugins: [
    /* ... */
    Components({
      /* ... */

      // `customComponentsResolvers` has renamed to `resolver`
-     customComponentsResolvers: [
+     resolvers: [
        ElementPlusResolver(),
      ],

      // `globalComponentsDeclaration` has renamed to `dts`
-     globalComponentsDeclaration: true,
+     dts: true,

      // `customLoaderMatcher` is depreacted, use `include` instead
-     customLoaderMatcher: id => id.endsWith('.md'),
+     include: [/\.vue$/, /\.vue\?vue&type=template/, /\.md$/],
    }),
  ],
}
```

## Configuration

The following show the default values of the configuration

```ts
Components({
  // relative paths to the directory to search for components.
  dirs: ['src/components'],

  // valid file extensions for components.
  extensions: ['vue'],
  // search for subdirectories
  deep: true,
  // resolvers for custom components
  resolvers: [],

  // generate `components.d.ts` global declrations, 
  // also accepts a path for custom filename
  dts: false,

  // Allow subdirectories as namespace prefix for components.
  directoryAsNamespace: false,
  // Subdirectory paths for ignoring namespace prefixes
  // works when `directoryAsNamespace: true`
  globalNamespaces: [],

  // filters for transforming targets
  include: [/\.vue$/, /\.vue\?vue&type=template/],
  exclude: [/node_modules/, /\.git/, /\.nuxt/],
})
```

## Example

See the [Vitesse](https://github.com/antfu/vitesse) starter template.

## Thanks

Thanks to [@brattonross](https://github.com/brattonross), this project is heavily inspired by [vite-plugin-voie](https://github.com/vamplate/vite-plugin-voie).

## License

MIT License © 2020-PRESENT [Anthony Fu](https://github.com/antfu)
