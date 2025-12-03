<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-2 opacity-0"
  >
    <div
      v-if="show"
      :class="toastClasses"
      class="fixed top-4 left-1/2 -translate-x-1/2 z-50 min-w-[320px] max-w-md mx-auto rounded-lg shadow-xl"
    >
      <!-- Colored Border Top -->
      <div :class="borderClasses" class="h-1 rounded-t-lg"></div>
      
      <!-- Content -->
      <div class="bg-white px-4 py-4 rounded-b-lg flex items-start gap-3">
        <!-- Icon -->
        <div class="flex-shrink-0 mt-0.5">
          <div :class="iconBgClasses" class="w-8 h-8 rounded-full flex items-center justify-center">
            <!-- Success Icon -->
            <svg v-if="type === 'success'" :class="iconClasses" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
            </svg>
            <!-- Error Icon -->
            <svg v-else-if="type === 'error'" :class="iconClasses" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <!-- Warning Icon -->
            <svg v-else-if="type === 'warning'" :class="iconClasses" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <!-- Info Icon -->
            <svg v-else :class="iconClasses" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        
        <!-- Message -->
        <div class="flex-1 min-w-0">
          <h4 :class="titleClasses" class="text-sm font-semibold mb-0.5">{{ title }}</h4>
          <p class="text-sm text-gray-600 leading-relaxed">{{ message }}</p>
        </div>
        
        <!-- Close Button -->
        <button
          @click="close"
          class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

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

