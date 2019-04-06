<template>
    <div id="app">
        <Hero/>
    </div>
</template>

<script>
  import Hero from './components/Hero.vue'

  export default {
    name: 'app',
    components: {
      Hero
    }
  }
</script>

<style lang="scss">
    @import 'assets/scss/_variables.scss';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: $white;
        background-color: $base-black;
        height: 100vh;
    }
</style>
