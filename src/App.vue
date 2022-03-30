<script setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { toJpeg } from 'html-to-image';
import { VForm, VInput, VBtn } from 'vuetensils/src/components/index.js'
import pokemonData from './data/pokemon.json'
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

const locations = {
  grass: 'Grass',
  sand: 'Sand',
  water: 'Water',
  mountain: 'Mountain',
  forest: 'Forest',
  cave: 'Cave',
}
const times = {
  day: 'Day',
  afternoon: 'Afternoon',
  night: 'Night',
}
const displayedLocations = Object.entries(locations).map(([key, value]) => {
  return { value: key, label: value }
})
const displayedTimes = Object.entries(times).map(([key, value]) => {
  return { value: key, label: value }
})

const randomPokemonNumber = Math.floor(Math.random() * 151) + 1
const randomPokemon = Object.values(pokemonData).find(pokemon => pokemon.num === randomPokemonNumber)
const data = reactive({
  width: 600,
  height: 200,
  location: 'grass',
  timeOfDay: 'day',

  // Opponent
  opponentName: randomPokemon.name,
  /** @type {string | ArrayBuffer} */
  opponentUrl: `/img/pokemon/${randomPokemon.num}.png`,
})
function updateData(event) {
  /** @type {HTMLInputElement} */
  const input = event.target
  const name = input.name
  const type = input.type
  /** @type {string | number} */
  let value = input.value

  if (type === 'number') {
    value = Number(value)
    if (input.min) {
      value = Math.max(value, Number(input.min))
    }
  }

  data[name] = value
}
const displaySize = computed(() => ({
  width: Math.max(data.width, 600),
  height: Math.max(data.height, 200)
}))

function onFileChange(event) {
  const files = event.target.files;
  if (!files.length) {
    data.opponentUrl = ''
    return;
  }
  // Create the image preview with a data url
  const reader = new FileReader();
  reader.onload = (event) => {
    data.opponentUrl = event.target.result;
    const randomFile = Math.floor(Math.random() * 151) + 1
    const audioEl = new Audio()
    audioEl.src = `/audio/cries/${randomFile}.ogg`
    audioEl.play()
  };
  reader.readAsDataURL(files[0]);
  // Add the file to state
  // this.file = files[0];
}

const previewRef = ref()
const pokeCenter = ref()
function handleSubmit(event) {
  pokeCenter.value.play()
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
  <main class="h-full p-16">
    <h1>Battle Bannerz</h1>
    <p>A Pokémon battle scene generator for social media banners!</p>
    <div class="flex gap-8 h-full">
      <VForm @valid="handleSubmit" class="w-1/4">
        <VInput
          label="Preset"
          name="preset"
          type="select"
          :options="[...presets.keys()]"
          @change="selectPreset"
          class="mbe-16"
        />
  
        <VInput
          v-model="data.width"
          @change="updateData($event)"
          label="Width"
          name="width"
          type="number"
          required
          min="600"
          class="mbe-16"
        />
  
        <VInput
          v-model="data.height"
          @change="updateData($event)"
          label="Height"
          name="height"
          type="number"
          required
          min="200"
          class="mbe-16"
        />
        
        <VInput
          v-model="data.location"
          label="Location"
          name="location"
          type="select"
          :options="displayedLocations"
          @change="updateData($event)"
          class="mbe-16"
        />
  
        <VInput
          v-model="data.timeOfDay"
          label="Time of Day"
          name="timeOfDay"
          type="select"
          :options="displayedTimes"
          @change="updateData($event)"
          class="mbe-16"
        />
  
        <fieldset>
          <legend>Opponent</legend>
          <VInput
            v-model="data.opponentName"
            label="Name"
            name="opponentName"
            class="mbe-16"
          />

          <VInput
            @change="onFileChange($event)"
            label="Sprite"
            name="sprite"
            type="file"
            class="mbe-16"
          />
        </fieldset>
  
        <VBtn type="submit">Generate Banner</VBtn>
      </VForm>
      <audio ref="pokeCenter" src="/audio/pokecenter.mp3" preload="metadata" type="audio/mpeg"></audio>
  
      <div class="w-3/4">
        <AppPreview
          id="preview"
          ref="previewRef"
          :width="displaySize.width"
          :height="displaySize.height"
          :location="data.location"
          :timeOfDay="data.timeOfDay"
          :opponentName="data.opponentName"
          :opponentUrl="data.opponentUrl"
        />
        <div class="dialog">
          <p>Dialog</p>
        </div>
        <!-- <div class="avatar grid place-center radius-full">
          <AppSvg href="icon-user" ></AppSvg>
        </div> -->
      </div>
    </div>
    <!-- <audio src="/audio/battle.mp3" autoplay preload="metadata" type="audio/mpeg"></audio> -->
  </main>
</template>

<style>
.dialog {
  border: 4px double;
  border-radius: 4px;
  padding: 4px;
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