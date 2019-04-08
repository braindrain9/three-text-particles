<template>
    <div class="hero">
        <form class="form">
            <div class="form-group">
                <input class="form-control" placeholder="Enter your word" v-model="word">
                <button type="button" class="btn btn-primary">Change!</button>
            </div>
        </form>
        <canvas id="hero-canvas"></canvas>
    </div>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      word: 'hello',
      title: ''
    }
  },
  mounted() {
    this.getAnimation();
  }
}
</script>

<style scoped lang="scss">
    .form {
        position: absolute;
        bottom: 100px;
        left: calc(50% - 150px);
        z-index: 100;

        input {
            width: 300px;
            height: 50px;
            border: 1px solid $grey;
            background-color: #252525;
            margin-bottom: 20px;
            color: $white;
        }

        button {
            width: 300px;
            height: 50px;
            background: linear-gradient(100.24deg, #3840FF 0%, rgba(26, 31, 145, 0.58) 100%);
        }
    }
</style>
