<template>
  <div id="app">
    <nav class="header">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link>
    </nav>
    <Stage />
  </div>
</template>

<script>

import { Stage } from 'vue-stage'

export default {
  name: 'App',
  components: { Stage }
}
</script>

<style lang="scss">

* {
  box-sizing: border-box;
}

.header {

  position: relative;
  z-index: 1;

}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
