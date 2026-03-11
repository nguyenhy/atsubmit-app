<template>
    <div class="space-y-2 mb-4">
        <label class="text-sm font-medium text-foreground" :for="input?.id">{{
            label
        }}</label>

        <div class="relative">
            <div
                class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
                <component :is="icon" :size="18" />
            </div>

            <slot>
                <input
                    v-bind="input"
                    class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all"
                />
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

defineProps<{
    label: string;
    icon: any;
    input?: InputHTMLAttributes;
}>();
</script>
