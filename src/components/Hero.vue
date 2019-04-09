<template>
    <div class="hero">
        <form class="form" v-on:submit.prevent="changeAnimation">
            <div class="form-group">
                <div class="form-group">
                    <label for="wordInput">Select color</label>
                    <input class="form-control" id="wordInput" placeholder="Enter your word" v-model="word">
                </div>

                <div class="form-group">
                    <label for="colorSelect">Select color</label>
                    <select class="form-control" v-model="color" id="colorSelect">
                        <option v-for="item in colors" v-bind:value="item.code" :key="item.code">
                            {{item.title}}
                        </option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary" :disabled="disabled()">Change!</button>
            </div>
        </form>
        <canvas id="hero-canvas"></canvas>
    </div>
</template>

<script>
  import bus from '../bus';

  export default {
    name: 'Hero',
    data() {
      return {
        word: 'hello',
        color: '#fff',
        prevWord: 'hello',
        prevColor: '#fff',
        disabled() {
          return !this.word || (this.prevWord === this.word && this.prevColor === this.color);
        },
        changeAnimation() {
          if (this.prevWord !== this.word) {
            this.prevWord = this.word;

            bus.$emit('changeAnimationText', this.word);
          }

          if (this.prevColor !== this.color || this.color === 'random') {
            this.prevColor = this.color === 'random' ? Math.random() : this.color;

            bus.$emit('changeAnimationColor', this.color);
          }
        }
      }
    },
    mounted() {
      this.getAnimation(this.word, this.color);
    }
  }
</script>

<style scoped lang="scss">
    .form {
        position: absolute;
        bottom: 50px;
        left: calc(50% - 150px);
        z-index: 100;

        label {
            color: $grey;
            font-size: $base-small-font-size;
        }

        input, select {
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
