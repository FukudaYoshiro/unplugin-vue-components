<h2 align='center'><samp>vite-plugin-components</samp></h2>

<p align='center'>On demand components auto importing for Vite</p>

<p align='center'>
<a href='https://www.npmjs.com/package/vite-plugin-components'>
<img src='https://img.shields.io/npm/v/vite-plugin-components?color=222&style=flat-square'>
</a>
</p>

<br>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>


<br>

## Usage

Install

```bash
npm i vite-plugin-components -D # yarn add vite-plugin-components -D
```

Add it to `vite.config.js`

```ts
// vite.config.js
import ViteComponents from 'vite-plugin-components'

export default {
  plugins: [
    ViteComponents()
  ]
}
```

That's all. 

Use components in templates as you would usually do but NO `import` and `component registration` required anymore! It will import components on demand, code spliting is also possible.

Basically, it automatically turns this

```vue
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

```vue
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

## Configuration

The following show the default values of the configuration

```ts
ViteComponents({
  // Relative paths to the directory to search for components.
  dirs: ['src/components'],
  // Valid file extensions for components.
  extensions: ['vue'],
  // Search for subdirectories
  deep: true,
})
```

## Example

See the [Vitesse](https://github.com/antfu/vitesse) starter template.

## Thanks

Thanks to [@brattonross](https://github.com/brattonross), this project is heavily inspired by [vite-plugin-voie](https://github.com/vamplate/vite-plugin-voie).

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
