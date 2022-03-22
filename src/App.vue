<script setup>
import { reactive, ref } from 'vue'
import { toJpeg } from 'html-to-image';
import { VForm, VInput, VBtn } from 'vuetensils/src/components/index.js'
import { AppPreview, AppSvg } from './components/index.js'

const data = reactive({
  width: 600,
  height: 200,
})

const presets = new Map([
  ['Small', { width: 320, height: 480 }],
  ['Medium', { width: 640, height: 960 }],
  ['Large', { width: 1280, height: 1920 }],
  ['Xlarge', { width: 1920, height: 2880 }],
  // LinkedIn
  // 1,584x396
  // 646x220
  // Twitter
  // 1,500x500
  // YT
  // 2,560x1,440
  // twitch
  // 1200 px by 480 px
])
function selectPreset(event) {
  const key = event.target.value
  const preset = presets.get(key)
  if (preset) {
    data.width = preset.width
    data.height = preset.height
  }
}

const previewRef = ref()
  function generateImg() {
    const preview = document.getElementById('preview')
    toJpeg(preview, { quality: 0.95 })
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'battle-banner.jpeg';
        link.href = dataUrl;
        link.click();
      });
}


function handleSubmit(event) {
  event.preventDefault()
}
const log = console.log
</script>

<template>
  <main class="flex gap-8 h-full p-16">
    <VForm @valid="handleSubmit" class="w-1/4">
      <div class="mbe-16">
        <VInput label="Width" name="width" type="number" :value="data.width" v-model="data.width" />
      </div>

      <div class="mbe-16">
        <VInput label="Height" name="height" type="number" :value="data.height" v-model="data.height" />
      </div>

      <div class="mbe-16">
        <select name="preset" @change="selectPreset">
          <option v-for="[key] in presets" :key="key" :value="key">{{ key }}</option>
        </select>
      </div>
      <VBtn type="submit">Submit</VBtn>
      <VBtn @click="generateImg">Generate Banner</VBtn>
    </VForm>

    <div class="w-3/4">
      <AppPreview
        id="preview"
        ref="previewRef"
        :width="data.width"
        :height="data.height"
      />
      <div class="avatar grid place-center radius-full">
        <AppSvg href="icon-user" ></AppSvg>
      </div>
    </div>
  </main>
</template>

<style>
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