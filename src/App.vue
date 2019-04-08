<template>
    <div id="app">
        <Hero/>
        <Footer/>
    </div>
</template>

<script>
  import Hero from './components/Hero.vue'
  import Footer from './components/Footer';

  export default {
    name: 'app',
    components: {
      Hero,
      Footer
    }
  }
</script>

<style lang="scss">
    #app {
        font-family: 'Lato', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100vh;
        font-size: $base-medium-font-size;
    }
</style>
