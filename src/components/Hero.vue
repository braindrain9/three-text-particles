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
        <div class="circle big"></div>
        <div class="circle small"></div>
        <div class="rectangle blue"></div>
        <div class="rectangle purple"></div>
        <div class="rectangle light-blue"></div>
        <div class="rectangle tiny"></div>
        <div class="rectangle tiny tiny-2"></div>
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

    .circle {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(40, 46, 188, 0.29) 0%, rgba(2, 3, 2, 0) 55%);

        &.big {
            width: 820px;
            height: 820px;
            left: -100px;
            top: 640px;
        }

        &.small {
            width: 310px;
            height: 310px;
            right: 100px;
            top: 90px;
        }
    }

    .rectangle {
        position: absolute;
        width: 8px;

        &.blue {
            height: 85px;
            left: 270px;
            top: 785px;
            background: #3E45FF;
        }

        &.purple {
            height: 70px;
            right: 300px;
            top: 897px;
            background: #6635CD;
            transform: rotate(-90deg);
        }

        &.tiny {
            background: #7D64E2;
            height: 8px;
            left: 356px;
            top: 201px;

            &.tiny-2 {
                top: 232px;
            }
        }

        &.light-blue {
            background: #4759F4;
            width: 35px;
            height: 35px;
            right: 300px;
            top: 215px;
        }
    }
</style>
