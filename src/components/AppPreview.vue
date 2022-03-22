<script setup>
// import { ref, onMounted, onUpdated, } from 'vue'
// import {throttle} from '../utils/index.js'

// import img from '../assets/images/sand-foreground.png'

const props = defineProps({
  width: Number,
  height: Number
})

// TODO: Maybe throttle this?
// const paintCanvas = () => {
//   const ctx = el.value.getContext("2d");
//   const background = new Image();
//   background.src = '/img/background-grass-day.png';
//   background.onload = function () {
//     ctx.drawImage(background, 0, 0, props.width, props.height);
//   }
//   const foreground = new Image();
//   foreground.src = '/img/sand-foreground.png';
//   foreground.onload = function () {
//     const offsetX = 0
//     const offsetY = props.height - foreground.naturalHeight
//     ctx.drawImage(foreground, offsetX, offsetY);
//   }
//   const midground = new Image();
//   midground.src = '/img/sand-midground.png';
//   midground.onload = function () {
//     const offsetX = props.width - midground.naturalWidth - 32;
//     const offsetY = midground.naturalHeight + 48;
//     ctx.drawImage(midground, offsetX, offsetY);
//   }
// }
// onMounted(paintCanvas)
// onUpdated(paintCanvas)
</script>

<template>
  <!-- <canvas ref="el" :width="props.width" :height="props.height"></canvas> -->
  <div
    :style="{
      width: `${props.width}px`,
      height: `${props.height}px`,
      backgroundImage: `url('/img/background-grass-day.png')` 
    }"
    class="battle-scene"
  >
    <img class="midground" src="/img/sand-midground.png" alt="">
    <img class="foreground" src="/img/sand-foreground.png" alt="">
  </div>
</template>

<style scoped>
canvas {
  border: 1px solid;
}

.battle-scene {
  position: relative;
  background-size: cover;
}

.battle-scene img {
  position: absolute;
}
.midground {
  top: 50%;
  right: 1rem;
}
.foreground {
  bottom: 0;
}
</style>