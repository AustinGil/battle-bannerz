<script setup>
import { reactive, toRefs } from 'vue'
import { VInput } from 'vuetensils/src/components/index.js'
import { AppPreview, VForm, VBtn } from './components/index.js'

const data = reactive({
  width: 600,
  height: 200,
})
const size = toRefs(data)

function handleSubmit(event) {
  event.preventDefault()
  console.log(event)
}
const log = console.log
</script>

<template>
  <main class="flex gap-8 h-full p-16">
    <VForm @valid="handleSubmit" class="w-1/4">
      <div class="mbe-16">
        <VInput label="Width" name="width" type="number" :value="size.width" />
      </div>

      <div class="mbe-16">
        <VInput label="Height" name="height" type="number" :value="size.height" />
      </div>
      <VBtn type="submit">Submit</VBtn>
    </VForm>

    <AppPreview :width="size.width" :height="size.height" class="w-3/4"></AppPreview>
  </main>
</template>
