<template>
    <HeroSection />
    <div class="bg-white rounded-lg shadow-sm p-6">
      <Table v-if="applications?.data" :data="data" sticky />

      <div v-else class="text-center py-16">
        <h1 class="text-2xl font-bold">No Applications Found</h1>
        <p class="mt-4 text-gray-600">
          There are currently no permit applications available.
        </p>
      </div>
    </div>
</template>


<script setup lang="ts">
import Table from '~/components/tables/table.vue';
import type { PermitApplication } from '~/types/strapi';

const { find } = useStrapi();

const { data: applications, pending, error } = await useAsyncData('applications', () =>
  find('permit-applications', { populate: '*' })
);

let data = (applications.value?.data || []) as unknown as PermitApplication[];
data = data.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());

</script>