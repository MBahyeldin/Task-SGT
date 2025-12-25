<template>
  <section class="flex justify-center px-4 py-12">
    <div class="w-full max-w-2xl">
    <h1 class="text-2xl font-bold mb-6">{{ title }}</h1>
      <!-- Form -->
      <UForm
        v-if="!isFormSubmitted"
        :schema="form.schema"
        :state="state"
        class="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        @submit="onSubmit"
      >
        <div
          v-for="field in form.fields"
          :key="field.name"
          class="space-y-2"
        >
          <FormFieldRender
            :field-props="field"
            v-model="state[field.name]"
          />
        </div>

        <div class="pt-4">
          <UButton
            type="submit"
            color="primary"
            size="lg"
            class="w-fit font-semibold"
          >
            تأكيد وإرسال
          </UButton>
        </div>
      </UForm>

      <!-- Success state -->
      <div
        v-else
        class="rounded-xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <UIcon name="i-lucide-check" class="h-6 w-6 text-green-600" />
        </div>

        <h1 class="text-2xl font-bold text-gray-900">
          شكراً لتقديم طلب التصريح الخاص بك
        </h1>

        <p class="mt-3 text-gray-600">
          تم استلام طلبك بنجاح وسنقوم بمراجعته في أقرب وقت ممكن.
        </p>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import FormFieldRender from '~/components/forms/FormFieldRender.vue';
import type Form from '~/models/Form';

const isFormSubmitted = ref(false);

const props = defineProps<{
    form: Form,
    title: string
}>()


const initValue = props.form.fields.reduce((acc, field) => {
    acc[field.name] = field.default || null
    return acc
}, {} as {[key: string]: any})

const toast = useToast()

const state = ref<Partial<{[key: string]: any}>>(initValue)
const onSubmit = async () => {
    try {
    await props.form.onSubmit(state.value);

    state.value = initValue;
    toast.add({
        color: 'success',
        title: 'تم تقديم الطلب بنجاح',
    });

    isFormSubmitted.value = true;
    } catch (response:any) {
        toast.add({
            color: 'error',
            title: 'فشل في تقديم الطلب',
            description: 'يرجى المحاولة مرة أخرى.',
        });
    }
}
</script>
