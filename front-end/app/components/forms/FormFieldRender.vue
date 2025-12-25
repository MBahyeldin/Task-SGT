<template>
    <UFormField :label="fieldProps?.label" :name="fieldProps?.name">
        <component :is="fieldComponent" v-if="fieldComponent" v-model="value" v-bind="fieldProps"/>
    </UFormField>
</template>

<script setup lang="ts">    
import { computed } from 'vue'
import type { FormField } from '~/models/Form';

const props = defineProps<{
    modelValue: any,
    fieldProps?: FormField
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
}>()

const value = computed({
    get: () => props.modelValue,
    set: (val: any) => emit('update:modelValue', val)
})


import {
  UInput,
  UTextarea,
  USelect,
} from '#components'

const fieldComponent = computed(() => {
  switch (props.fieldProps?.interface) {
    case 'UInput':
      return UInput

    case 'UTextarea':
      return UTextarea

    case 'USelect':
      return USelect

    default:
      return null
  }
})
</script>