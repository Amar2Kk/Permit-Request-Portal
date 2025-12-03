<script setup lang="ts">
import { ref } from 'vue'
import plusIcon from '~/assets/icons/Plus.svg?raw'
import menuIcon from '~/assets/icons/Menu.svg?raw'
import errorIcon from '~/assets/icons/Error.svg?raw'

const mobileMenuOpen = ref(false)

// Helper function to process SVG for proper sizing
function processSvg(svgContent: string, size: string = '100%'): string {
  return svgContent
    .replace(/width="[^"]*"/g, `width="${size}"`)
    .replace(/height="[^"]*"/g, `height="${size}"`)
    .replace(/<svg/, '<svg class="w-full h-full"')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-primary-600 shadow-lg">
      <nav class="container-custom py-3">
        <div class="flex items-center justify-between">
          <!-- Logo and Title -->
          <NuxtLink to="/" class="flex items-center gap-4 hover:opacity-90 transition-opacity">
            <div class="w-14 h-14 bg-white rounded flex items-center justify-center text-3xl shadow-md">
              🇸🇦
            </div>
            <div class="flex flex-col">
              <h1 class="text-base sm:text-xl font-bold text-white leading-tight">
                بوابة طلبات التصاريح
              </h1>
              <span class="text-xs text-white/80 hidden sm:block">المملكة العربية السعودية</span>
            </div>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-3">
            <NuxtLink to="/"
              class="px-5 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all"
              active-class="!text-white !bg-white/20">
              الطلبات
            </NuxtLink>
            <NuxtLink to="/admin"
              class="px-5 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all"
              active-class="!text-white !bg-white/20">
              الإدارة
            </NuxtLink>
            <div class="w-px h-6 bg-white/20 mx-1"></div>
            <NuxtLink to="/apply"
              class="px-6 py-2.5 text-sm font-bold text-primary-600 bg-white hover:bg-gray-50 rounded-md transition-all shadow-md hover:shadow-lg flex items-center gap-2">
              <span class="w-4 h-4 flex items-center justify-center flex-shrink-0" v-html="processSvg(plusIcon)" />
              تقديم طلب جديد
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-all flex items-center justify-center">
            <span v-if="!mobileMenuOpen" class="w-6 h-6 flex items-center justify-center"
              v-html="processSvg(menuIcon)" />
            <span v-else class="w-6 h-6 flex items-center justify-center" v-html="processSvg(errorIcon)" />
          </button>
        </div>

        <!-- Mobile Menu -->
        <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
          <div v-if="mobileMenuOpen" class="md:hidden mt-4 pt-4 border-t border-white/20">
            <div class="flex flex-col gap-2">
              <NuxtLink to="/" @click="mobileMenuOpen = false"
                class="px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all"
                active-class="!text-white !bg-white/20">
                الطلبات
              </NuxtLink>
              <NuxtLink to="/admin" @click="mobileMenuOpen = false"
                class="px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all"
                active-class="!text-white !bg-white/20">
                الإدارة
              </NuxtLink>
              <NuxtLink to="/apply" @click="mobileMenuOpen = false"
                class="px-4 py-2.5 text-sm font-bold text-primary-600 bg-white hover:bg-gray-50 rounded-md transition-all text-center shadow-md flex items-center justify-center gap-2">
                <span class="w-4 h-4 flex items-center justify-center flex-shrink-0" v-html="processSvg(plusIcon)" />
                تقديم طلب جديد
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="container-custom py-8 flex-grow w-full">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-primary-600 mt-auto">
      <div class="container-custom py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <!-- Logo and Description -->
          <div class="col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-white rounded flex items-center justify-center text-2xl">
                🇸🇦
              </div>
              <h3 class="text-white font-bold text-lg">بوابة التصاريح</h3>
            </div>
            <p class="text-white/80 text-sm leading-relaxed">
              نظام إلكتروني متكامل لتقديم ومتابعة طلبات التصاريح في المملكة العربية السعودية
            </p>
          </div>

          <!-- Quick Links -->
          <div class="col-span-1">
            <h4 class="text-white font-semibold text-base mb-4">روابط سريعة</h4>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/" class="text-white/80 hover:text-white text-sm transition-colors">
                  الصفحة الرئيسية
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/apply" class="text-white/80 hover:text-white text-sm transition-colors">
                  تقديم طلب جديد
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin" class="text-white/80 hover:text-white text-sm transition-colors">
                  لوحة الإدارة
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div class="col-span-1">
            <h4 class="text-white font-semibold text-base mb-4">الخدمات</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-white/80 hover:text-white text-sm transition-colors">
                  تصاريح البناء
                </a>
              </li>
              <li>
                <a href="#" class="text-white/80 hover:text-white text-sm transition-colors">
                  تصاريح العمل
                </a>
              </li>
              <li>
                <a href="#" class="text-white/80 hover:text-white text-sm transition-colors">
                  تصاريح التشغيل
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="col-span-1">
            <h4 class="text-white font-semibold text-base mb-4">تواصل معنا</h4>
            <ul class="space-y-2">
              <li class="text-white/80 text-sm">
                البريد الإلكتروني: info@permits.gov.sa
              </li>
              <li class="text-white/80 text-sm">
                الهاتف: 920000000
              </li>
              <li class="text-white/80 text-sm">
                الدعم الفني: support@permits.gov.sa
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/20 pt-6">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-white/80 text-sm text-center md:text-right">
              © {{ new Date().getFullYear() }} جميع الحقوق محفوظة - المملكة العربية السعودية
            </p>
            <div class="flex items-center gap-4">
              <a href="#" class="text-white/80 hover:text-white text-sm transition-colors">
                سياسة الخصوصية
              </a>
              <span class="text-white/40">|</span>
              <a href="#" class="text-white/80 hover:text-white text-sm transition-colors">
                الشروط والأحكام
              </a>
              <span class="text-white/40">|</span>
              <a href="#" class="text-white/80 hover:text-white text-sm transition-colors">
                خريطة الموقع
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
