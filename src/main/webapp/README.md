# webapp

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Notice !!!

⚠ warn PLEASE READ THIS MESSAGE

At installation, this plugin will try to fix your current project code to make it compatible
with Vue SSR. If you install others Vue CLI plugin after UVue, you have to run "ssr:fix" command

Basically, you need to keep in mind two things:

1) Avoid stateful singletons:
https://ssr.vuejs.org/guide/structure.html#avoid-stateful-singletons
Command "ssr:fix" try to fix common plugins

List of supported plugins here:
https://universal-vue.github.io/docs/guide/vue-cli-plugins.html

2) Use a factory function to delcare your Vuex states:
export default {
  state: () => ({
    // Your variables here
  }),
  // mutations, actions, getters...
}
Command "ssr:fix-vuex" try to fix them automatically
