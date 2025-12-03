<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
})

const cardClasses = computed(() => {
  const base = 'card'
  const hoverClass = props.hover ? 'card-hover cursor-pointer' : ''
  return `${base} ${hoverClass}`
})
</script>

