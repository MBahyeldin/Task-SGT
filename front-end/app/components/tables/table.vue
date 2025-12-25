<template>
  <div class="flex flex-col flex-1 w-full">
    <div class="flex px-4 py-3.5 border-b border-accented">
      <UInput v-model="globalFilter" class="max-w-sm" placeholder=" البحث.." />
    </div>

    <UTable ref="table" v-model:global-filter="globalFilter" :data="data" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { PermitApplication } from '~/types/strapi';
import { h, resolveComponent } from 'vue'

const UBadge = resolveComponent('UBadge')
const globalFilter = ref('')

const columns: TableColumn<PermitApplication>[] = [
  { accessorKey: 'id', header: 'معرف' },
  { accessorKey: 'applicant_name', header: 'اسم مقدم الطلب' },
  { accessorKey: 'applicant_email', header: 'البريد الإلكتروني' },
  { accessorKey: 'permit_type', header: 'نوع التصريح' },
  { accessorKey: 'application_status', header: 'حالة الطلب',
    cell: ({ row }) => {
          const color = {
            approved: 'success' as const,
            rejected: 'error' as const,
            pending: 'warning' as const
          }[row.getValue('application_status') as string]

          return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
            row.getValue('application_status')
          )
        }
   },
  { 
    accessorKey: 'submitted_at',
    header: 'تاريخ التقديم',
    cell: ({ row }) => {
      return new Date(row.getValue('submitted_at')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    } },
]

defineProps<{
  data: PermitApplication[]
}>()

</script>
