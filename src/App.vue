<script setup>
import { reactive, computed, ref } from 'vue'
import { toJpeg } from 'html-to-image';
import { VForm, VInput, VBtn } from 'vuetensils/src/components/index.js'
import { AppPreview, AppSvg } from './components/index.js'

const presets = new Map([
  ['Large', { width: 1500, height: 500 }],
  ['Medium', { width: 1200, height: 480 }],
  ['Small', { width: 900, height: 400 }],
  ['XSmall', { width: 600, height: 300 }],
])
function selectPreset(event) {
  const key = event.target.value
  const preset = presets.get(key)
  if (preset) {
    data.width = preset.width
    data.height = preset.height
  }
}

const data = reactive({
  width: 600,
  height: 200,
  imagePreview: null
})
function updateSize(event) {
  /** @type {HTMLInputElement} */
  const input = event.target
  const name = input.name
  const min = input.min
  let value = Number(input.value)
  if (min) {
    value = Math.max(value, Number(min))
  }
  data[name] = value
}
const displaySize = computed(() => ({
  width: Math.max(data.width, 600),
  height: Math.max(data.height, 200)
}))

function onFileChange(event) {
  const files = event.target.files;
  if (!files.length) return;
  // Create the image preview with a data url
  const reader = new FileReader();
  reader.onload = (event) => {
    data.imagePreview = event.target.result;
  };
  reader.readAsDataURL(files[0]);
  // Add the file to state
  // this.file = files[0];
}

const previewRef = ref()
function handleSubmit(event) {
  event.preventDefault()
  const preview = document.getElementById('preview')
  toJpeg(preview, { quality: 0.95 })
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = 'battle-banner.jpeg';
      link.href = dataUrl;
      link.click();
    });
}
const log = console.log
</script>

<template>
  <main class="flex gap-8 h-full p-16">
    <VForm @valid="handleSubmit" class="w-1/4">
      <div class="mbe-16">
        <VInput
          label="Preset"
          name="preset"
          type="select"
          :options="[...presets.keys()]"
          @change="selectPreset"
        />
      </div>

      <div class="mbe-16">
        <VInput
          v-model="data.width"
          @change="updateSize($event)"
          label="Width"
          name="width"
          type="number"
          required
          min="600"
        />
      </div>

      <div class="mbe-16">
        <VInput
          v-model="data.height"
          @change="updateSize($event)"
          label="Height"
          name="height"
          type="number"
          required
          min="200"
        />
      </div>

      <div class="mbe-16">
        <VInput
          @change="onFileChange($event)"
          label="Opponent"
          name="opponent"
          type="file"
        />
      </div>

      <VBtn type="submit">Generate Banner</VBtn>
    </VForm>

    <div class="w-3/4">
      <AppPreview
        id="preview"
        ref="previewRef"
        :width="displaySize.width"
        :height="displaySize.height"
        :opponentUrl="data.imagePreview"
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