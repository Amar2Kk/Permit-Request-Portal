<template>
  <div class="fixed top-0 left-0 right-0 z-50 pointer-events-none">
    <TransitionGroup name="toast" tag="div" class="flex flex-col items-center gap-2 p-4">
      <div v-for="toast in toasts" :key="toast.id" class="pointer-events-auto w-full flex justify-center">
        <UiToast :message="toast.message" :type="toast.type" :duration="toast.duration"
          @close="removeToast(toast.id)" />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { toasts, removeToast } = useToast()
</script>

<style scoped>
.toast-move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.toast-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.toast-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
