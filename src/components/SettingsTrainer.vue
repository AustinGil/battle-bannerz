<script setup>
import globalStore from '../store.js'
</script>

<template>
  <fieldset>
    <legend>Trainer</legend>
    <VInput
      :value="globalStore.trainerBox"
      label="Box Type"
      name="trainerBox"
      type="radio"
      :options="[{ label: 'Status', value: 'status' }, { label: 'Text', value: 'text' }]"
      @change="globalStore.trainerBox = $event.target.value"
      class="mbe-16"
    />

    <template v-if="globalStore.trainerBox === 'status'">
      <VInput
        v-model="globalStore.trainerName"
        label="Name"
        name="trainerName"
        class="mbe-16"
      />
      <VInput
        v-model="globalStore.trainerHealth"
        label="Health"
        name="trainerHealth"
        type="range"
        class="mbe-16"
      />
    </template>

    <template v-else>
      <VInput
        v-model="globalStore.trainerText"
        label="Text"
        type="textarea"
        name="trainerText"
        class="mbe-16"
        @change="globalStore.customText = true"
      />
    </template>
  </fieldset>
</template>