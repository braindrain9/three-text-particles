<template>
    <footer class="d-flex justify-content-between">
        <div>Kate Vitruk</div>
        <div>Three.js. WebGL</div>
    </footer>
</template>

<script>
    export default {
      name: 'Footer'
    }
</script>

<style lang="scss">
    footer {
        position: fixed;
        left: 0;
        z-index: 100;
        text-orientation: sideways;
        writing-mode: vertical-lr;
        height: 100%;
        padding: 80px 0 80px 40px;

        > div {
            transform: rotate(180deg);
        }
    }
</style>