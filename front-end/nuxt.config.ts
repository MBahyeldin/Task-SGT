// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/strapi', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    strapi: {
      url: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
      token: process.env.STRAPI_API_TOKEN,
    },
    public: {
      strapi: {
        url: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
      }
    }
  }
})