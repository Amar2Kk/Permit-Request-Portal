<template>
  <div class="fixed top-0 left-0 right-0 z-50 pointer-events-none">
    <TransitionGroup
      name="toast"
      tag="div"
      class="flex flex-col items-center gap-2 p-4"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto"
      >
        <UiToast
          :message="toast.message"
          :type="toast.type"
          :duration="toast.duration"
          @close="removeToast(toast.id)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { toasts, removeToast } = useToast()
</script>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
}

.toast-leave-active {
  position: absolute;
}
</style>

