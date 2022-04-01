<script setup>
import { reactive, computed, ref, watch } from 'vue'
import { toJpeg } from 'html-to-image';
import { VTabs, VForm, VInput, VBtn } from 'vuetensils/src/components/index.js'
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

const pokemonList = [] 
for (const pokemonKey in pokemonData) {
  if (!Object.hasOwnProperty.call(pokemonData, pokemonKey)) continue
  
  const pokemon = pokemonData[pokemonKey]
  if (pokemon.num === pokemonList.length) continue

  pokemonList.push(pokemon)
}
pokemonList.length = 300
const randomPokemonIndex = Math.floor(Math.random() * pokemonList.length) + 1
const randomPokemon = pokemonList[randomPokemonIndex]

const currentQuery = new URLSearchParams(window.location.search)

const data = reactive({
  // Scene
  width: 600,
  height: 200,
  location: currentQuery.get('location') || 'grass',
  timeOfDay: currentQuery.get('timeOfDay') || 'day',
  // Opponent
  opponentName: randomPokemon.name,
  /** @type {string | ArrayBuffer} */
  opponentUrl: `/img/pokemon/${randomPokemon.num}.png`,
  opponentHealth: 100,
  // Trainer
  /** @type {'status'|'text'} */
  trainerBox: 'status',
  trainerName: '',
  trainerHealth: 100,
  customText: false,
  trainerText: `A wild ${randomPokemon.name.toUpperCase()} appeared!`,
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

function setOpponent(event) {
  const select = event.target
  const pokemonNum = Number(select.value)
  const pokemon = pokemonList[pokemonNum - 1]
  const audioEl = new Audio()
  audioEl.src = `/audio/cries/${pokemon.num}.ogg`
  audioEl.play()
  data.opponentName = pokemon.name
  data.opponentUrl = `/img/pokemon/${pokemon.num}.png`
  if (!data.customText) {
    data.trainerText = `A wild ${pokemon.name.toUpperCase()} appeared!`
  }
}
function onFileChange(event) {
  const files = event.target.files;
  if (!files.length) {
    data.opponentUrl = ''
    return;
  }
  const file = files[0]
  let name = file.name
  name = name.slice(0, name.lastIndexOf('.'))
  // Create the image preview with a data url
  const reader = new FileReader();
  reader.onload = (event) => {
    data.opponentUrl = event.target.result;
    data.opponentName = name
    const randomFile = Math.floor(Math.random() * pokemonList.length) + 1
    const audioEl = new Audio()
    audioEl.src = `/audio/cries/${randomFile}.ogg`
    audioEl.play()
    if (!data.customText) {
      data.trainerText = `A wild ${name.toUpperCase()} appeared!`
    }
  };
  reader.readAsDataURL(file);
}

const previewRef = ref()
const pokeCenter = new Audio()
pokeCenter.src = '/audio/pokecenter.mp3'
function handleSubmit(event) {
  pokeCenter.play()
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

watch(
  [() => data.location, () => data.timeOfDay], 
  ([newLocation, newTimeOfDay]) => {
    const queryParams = new URLSearchParams({
      location: newLocation,
      timeOfDay: newTimeOfDay,
    })
    window.history.replaceState({}, '', `?${queryParams}`)
  },
)
const log = console.log
</script>

<template>
  <main class="h-full p-16">
    <h1>Battle Bannerz</h1>
    <p>A Pokémon battle scene generator for social media banners!</p>
    <div class="flex gap-8 h-full">
      <VForm @valid="handleSubmit" class="w-1/4">
        <VTabs>
          <template #tab-scene>Scene</template>
          <template #panel-scene>
            <fieldset class="mbe-16">
              <legend>Scene</legend>
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
            </fieldset>
          </template>
          
          <template #tab-opponent>Opponent</template>
          <template #panel-opponent>
            <fieldset>
              <legend>Opponent</legend>
              <VInput
                label="Pokemon"
                name="opponent-preset"
                type="select"
                :options="pokemonList.map(poke => {
                  return {
                    value: poke.num,
                    label: poke.name,
                  }
                })"
                :value="randomPokemon.num"
                @change="setOpponent($event)"
                class="mbe-16"
              />

              <VInput
                label="Sprite"
                name="sprite"
                type="file"
                @change="onFileChange($event)"
                class="mbe-16"
              />

              <VInput
                v-model="data.opponentName"
                label="Name"
                name="opponentName"
                class="mbe-16"
              />

              <VInput
                v-model="data.opponentHealth"
                label="Health"
                name="opponentHealth"
                type="range"
                class="mbe-16"
              />
            </fieldset>
          </template>

          <template #tab-trainer>Trainer</template>
          <template #panel-trainer>
            <fieldset>
              <legend>Trainer</legend>
              <VInput
                :value="data.trainerBox"
                label="Box Type"
                name="trainerBox"
                type="radio"
                :options="[{ label: 'Status', value: 'status' }, { label: 'Text', value: 'text' }]"
                @change="data.trainerBox = $event.target.value"
                class="mbe-16"
              />

              <template v-if="data.trainerBox === 'status'">
                <VInput
                  v-model="data.trainerName"
                  label="Name"
                  name="trainerName"
                  class="mbe-16"
                />
                <VInput
                  v-model="data.trainerHealth"
                  label="Health"
                  name="trainerHealth"
                  type="range"
                  class="mbe-16"
                />
              </template>

              <template v-else>
                <VInput
                  v-model="data.trainerText"
                  label="Text"
                  type="textarea"
                  name="trainerText"
                  class="mbe-16"
                  @change="data.customText = true"
                />
              </template>
            </fieldset>
          </template>
        </VTabs>
        <VBtn type="submit">Generate Banner</VBtn>
      </VForm>
  
      <div class="w-3/4">
        <AppPreview
          id="preview"
          ref="previewRef"
          v-bind="data"
          :width="displaySize.width"
          :height="displaySize.height"
        />
        <div class="avatar grid place-center radius-full">
          <AppSvg href="icon-user" ></AppSvg>
        </div>
      </div>
    </div>
    <!-- <audio src="/audio/battle.mp3" autoplay preload="metadata" type="audio/mpeg"></audio> -->
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
.vts-input--radio label {
  display: block;
}
.vts-input--radio input {
  margin-inline-end: .5rem;
}
</style>