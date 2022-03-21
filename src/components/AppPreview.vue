<script setup>
import { ref, onMounted, onUpdated, } from 'vue'
import { AppSvg } from './index.js'

// import img from '../assets/images/sand-foreground.png'

const props = defineProps({
  width: Number,
  height: Number
})

const el = ref()

const paintCanvas = () => {
  const ctx = el.value.getContext("2d");
  const foreground = new Image();
  foreground.src = '/img/sand-foreground.png';
  foreground.onload = function () {
    const offsetX = 0
    const offsetY = props.height.value - foreground.naturalHeight
    ctx.drawImage(foreground, offsetX, offsetY);
  }
  const background = new Image();
  background.src = '/img/sand-background.png';
  background.onload = function () {
    const offsetX = props.width.value - background.naturalWidth - 32;
    const offsetY = background.naturalHeight + 48;
    ctx.drawImage(background, offsetX, offsetY);
  }
}
onMounted(paintCanvas)
onUpdated(paintCanvas)

</script>

<template>
  <div>
    <canvas ref="el" :width="props.width.value" :height="props.height.value"></canvas>
    <div class="avatar grid place-center radius-full">
      <AppSvg href="icon-user" ></AppSvg>
    </div>
  </div>
</template>

<style scoped>
img {
  display: none;
}
canvas {
  border: 1px solid;
}
.avatar {
  width: 8rem;
  height: 8rem;
  border: 2px solid;
  position: absolute;
  transform: translate(1rem, -50%);
  font-size: 6rem;
  background-color: ButtonFace;
}
</style>