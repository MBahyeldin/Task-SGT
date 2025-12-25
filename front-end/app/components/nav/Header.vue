<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur-md"
  >
    <div class="mx-auto flex h-20 max-w-7xl items-center gap-6 px-6">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 transition-opacity hover:opacity-80"
      >
        <NuxtImg
          src="/logo.png"
          alt="Logo"
          height="100"
          class="h-10 w-auto"
        />
      </NuxtLink>

      <!-- Navigation -->
      <UNavigationMenu
        :items="items"
        dir="rtl"
        class="flex-1"
        item-class="
          h-full flex items-center px-4 text-sm font-medium
          text-gray-700 transition
          hover:text-primary-600
          hover:bg-gray-100/60
          rounded-md
        "
      />
    </div>
  </header>
</template>

<script setup lang="ts">
const items = ref([
  {
    label: 'قدم طلبًا',
    icon: 'i-lucide-book-open',
    to: '/apply',
  },
])
</script>
