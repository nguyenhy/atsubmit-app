<template>
    <button
        class="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-muted transition-all font-medium mb-3"
    >
        <slot name="icon">
            <component v-if="icon" :is="icon" :size="20" />
        </slot>

        <slot name="label">
            <span>Continue with {{ provider }}</span>
        </slot>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    provider: string;
    icon?: any;
}>();
</script>
