// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss'],
  
  css: ['~/assets/css/main.css'],
  
  runtimeConfig: {
    // Private keys (only available server-side)
    backendBaseUrl: process.env.BACKEND_BASE_URL || 'http://localhost:3001',
    
    // Public keys (exposed to client)
    public: {
      apiBase: '/api'
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
      },
      title: 'بوابة طلبات التصاريح',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'بوابة طلبات التصاريح - نظام إلكتروني لتقديم طلبات التصاريح' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})

