<template>
  <div
    class="w-full max-w-md p-8 rounded-apple-lg bg-card border border-border shadow-sm"
  >
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold tracking-tight mb-2">
        {{ title }}
      </h1>

      <p v-if="subtitle" class="text-muted-foreground">
        {{ subtitle }}
      </p>
    </div>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>
