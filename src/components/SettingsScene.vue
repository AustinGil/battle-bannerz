<script setup>
import globalStore, { updateData } from '../store.js'

const presets = new Map([
  ['Large', { width: 1500, height: 500 }],
  ['Medium', { width: 1200, height: 480 }],
  ['Small', { width: 900, height: 400 }],
  ['XSmall', { width: 600, height: 300 }],
])
const displayedLocations = [
  {value: 'grass', label: 'Grass'},
  {value: 'sand', label: 'Sand'},
  {value: 'water', label: 'Water'},
  {value: 'mountain', label: 'Mountain'},
  {value: 'forest', label: 'Forest'},
  {value: 'cave', label: 'Cave'}
]
const displayedTimes = [
  {value: 'day', label: 'Day'},
  {value: 'afternoon', label: 'Afternoon'},
  {value: 'night', label: 'Night'},
]

function selectPreset(event) {
  const key = event.target.value
  const preset = presets.get(key)
  if (preset) {
    globalStore.width = preset.width
    globalStore.height = preset.height
  }
}
</script> 

<template>
  <fieldset class="mbe-16">
    <legend>Scene</legend>

    <AppInput
      label="Preset"
      name="preset"
      type="select"
      :options="[...presets.keys()]"
      @change="selectPreset"
      class="mbe-16"
    />

    <AppInput
      v-model="globalStore.width"
      @change="updateData($event)"
      label="Width"
      name="width"
      type="number"
      required
      min="600"
      class="mbe-16"
    />

    <AppInput
      v-model="globalStore.height"
      @change="updateData($event)"
      label="Height"
      name="height"
      type="number"
      required
      min="200"
      class="mbe-16"
    />
    
    <AppInput
      v-model="globalStore.location"
      label="Location"
      name="location"
      type="select"
      :options="displayedLocations"
      @change="updateData($event)"
      class="mbe-16"
    />

    <AppInput
      v-model="globalStore.timeOfDay"
      label="Time of Day"
      name="timeOfDay"
      type="select"
      :options="displayedTimes"
      @change="updateData($event)"
    />
  </fieldset>
</template>