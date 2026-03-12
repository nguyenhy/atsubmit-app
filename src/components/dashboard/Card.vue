<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    title?: string;
    subtitle?: string;
    className?: string;
    footer?: boolean;
}>();

const classes = computed(() => [
    "bg-card border border-border rounded-apple-lg overflow-hidden shadow-sm",
    props.className,
]);
</script>

<template>
    <div :class="classes">
        <div v-if="title || subtitle" class="px-6 py-4 border-b border-border">
            <h3 v-if="title" class="font-bold text-lg">
                {{ title }}
            </h3>

            <p v-if="subtitle" class="text-sm text-muted-foreground">
                {{ subtitle }}
            </p>
        </div>

        <div class="p-6">
            <slot />
        </div>

        <div
            v-if="$slots.footer"
            class="px-6 py-4 bg-muted/50 border-t border-border"
        >
            <slot name="footer" />
        </div>
    </div>
</template>
