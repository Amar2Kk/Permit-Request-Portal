interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'warning'
  duration: number
}

const toasts = ref<Toast[]>([])
let toastId = 0

export function useToast() {
  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success', duration = 3000) => {
    const id = toastId++
    toasts.value.push({ id, message, type, duration })
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string, duration = 3000) => {
    showToast(message, 'success', duration)
  }

  const error = (message: string, duration = 3000) => {
    showToast(message, 'error', duration)
  }

  const warning = (message: string, duration = 3000) => {
    showToast(message, 'warning', duration)
  }

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    warning,
  }
}

