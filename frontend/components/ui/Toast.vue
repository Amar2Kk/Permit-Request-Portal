<template>
  <div v-if="show" :class="toastClasses" class="min-w-[320px] max-w-md mx-auto rounded-lg shadow-xl">
    <!-- Colored Border Top -->
    <div :class="borderClasses" class="h-1 rounded-t-lg"></div>

    <!-- Content -->
    <div class="bg-white px-4 py-4 rounded-b-lg flex items-start gap-3">
      <!-- Icon -->
      <div class="flex-shrink-0 mt-0.5">
        <div :class="iconBgClasses" class="w-8 h-8 rounded-full flex items-center justify-center">
          <!-- Success Icon -->
          <span v-if="type === 'success'" :class="iconClasses" class="w-4 h-4 flex items-center justify-center"
            v-html="processSvg(checkmarkIcon)" />
          <!-- Error Icon -->
          <span v-else-if="type === 'error'" :class="iconClasses" class="w-4 h-4 flex items-center justify-center"
            v-html="processSvg(errorIcon)" />
          <!-- Warning Icon -->
          <span v-else-if="type === 'warning'" :class="iconClasses" class="w-4 h-4 flex items-center justify-center"
            v-html="processSvg(warningIcon)" />
          <!-- Info Icon -->
          <span v-else :class="iconClasses" class="w-4 h-4 flex items-center justify-center"
            v-html="processSvg(infoIcon)" />
        </div>
      </div>

      <!-- Message -->
      <div class="flex-1 min-w-0">
        <h4 :class="titleClasses" class="text-sm font-semibold mb-0.5">{{ title }}</h4>
        <p class="text-sm text-gray-600 leading-relaxed">{{ message }}</p>
      </div>

      <!-- Close Button -->
      <button @click="close"
        class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center">
        <span class="w-5 h-5 flex items-center justify-center" v-html="processSvg(errorIcon)" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import checkmarkIcon from '~/assets/icons/Checkmark.svg?raw'
import errorIcon from '~/assets/icons/Error.svg?raw'
import warningIcon from '~/assets/icons/Warning.svg?raw'
import infoIcon from '~/assets/icons/Info.svg?raw'

// Helper function to process SVG for proper sizing
function processSvg(svgContent: string, size: string = '100%'): string {
  return svgContent
    .replace(/width="[^"]*"/g, `width="${size}"`)
    .replace(/height="[^"]*"/g, `height="${size}"`)
    .replace(/<svg/, '<svg class="w-full h-full"')
}

interface Props {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  duration: 5000,
  title: '',
})

const emit = defineEmits<{
  close: []
}>()

const show = ref(true)

let timeout: NodeJS.Timeout

onMounted(() => {
  if (props.duration > 0) {
    timeout = setTimeout(() => {
      close()
    }, props.duration)
  }
})

onUnmounted(() => {
  if (timeout) {
    clearTimeout(timeout)
  }
})

function close() {
  show.value = false
  setTimeout(() => {
    emit('close')
  }, 200)
}

// Computed title with defaults
const title = computed(() => {
  if (props.title) return props.title

  switch (props.type) {
    case 'success':
      return 'نجح'
    case 'error':
      return 'خطأ'
    case 'warning':
      return 'تحذير'
    case 'info':
      return 'معلومة'
    default:
      return 'إشعار'
  }
})

const toastClasses = computed(() => {
  return 'border border-gray-100'
})

const borderClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-success-500'
    case 'error':
      return 'bg-danger-500'
    case 'warning':
      return 'bg-warning-500'
    case 'info':
      return 'bg-blue-500'
    default:
      return 'bg-success-500'
  }
})

const iconBgClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-success-50'
    case 'error':
      return 'bg-danger-50'
    case 'warning':
      return 'bg-warning-50'
    case 'info':
      return 'bg-blue-50'
    default:
      return 'bg-success-50'
  }
})

const iconClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-success-600'
    case 'error':
      return 'text-danger-600'
    case 'warning':
      return 'text-warning-600'
    case 'info':
      return 'text-blue-600'
    default:
      return 'text-success-600'
  }
})

const titleClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-success-700'
    case 'error':
      return 'text-danger-700'
    case 'warning':
      return 'text-warning-700'
    case 'info':
      return 'text-blue-700'
    default:
      return 'text-success-700'
  }
})
</script>
