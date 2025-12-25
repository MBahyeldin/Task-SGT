<template>
    <Form :form="permitApplicationForm" title="تقديم طلب تصريح" />
</template>

<script setup lang="ts">
import Form from '~/components/forms/index.vue';
import PermitApplicationForm from '~/models/permit-application'

const permitApplicationForm = new PermitApplicationForm()
</script>