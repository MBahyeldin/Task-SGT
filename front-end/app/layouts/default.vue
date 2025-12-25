<template>
    <Header v-bind="headerData" />
      <section class="container mx-auto px-4 py-8 min-h-screen mb-20">
        <NuxtPage />
    </section>  
    <Footer />
</template>

<script setup lang="ts">
import Header from '~/components/nav/Header.vue';
import Footer from '~/components/nav/Footer.vue';

const headerData = {
    title: 'مرحبًا بك في موقعنا',
    description: 'اكتشف محتوى رائعًا وخدمات مميزة هنا.',
    icon: 'i-heroicons-home',
    date: '2024-06-15'
};
</script>