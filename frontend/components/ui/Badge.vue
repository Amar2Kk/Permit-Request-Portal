<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'pending' | 'approved' | 'rejected'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'pending',
})

const badgeClasses = computed(() => {
  const base = 'badge'
  const variants = {
    pending: 'badge-pending',
    approved: 'badge-approved',
    rejected: 'badge-rejected',
  }
  return `${base} ${variants[props.variant]}`
})
</script>

