<template>
    <div>
        <label
            class="text-sm font-medium dark:text-foreground/90"
            :class="[
                !!input?.disabled
                    ? 'text-muted-foreground dark:text-muted-foreground/80'
                    : 'text-foreground dark:text-foreground/80',
            ]"
            :for="input?.id"
        >
            {{ label }}
        </label>

        <slot :input="input"></slot>

        <!-- hint -->
        <slot name="hint">
            <div>
                <p v-if="hint" class="mt-1 text-xs text-muted-foreground">
                    {{ hint }}
                </p>
            </div>
        </slot>

        <slot name="message" :error="error">
            <!-- errors -->
            <InputFieldError v-if="error" :error="error" class="mt-1" />
        </slot>
    </div>
</template>

<script setup lang="ts">
import { type InputHTMLAttributes } from "vue";
import InputFieldError from "./InputFieldError.vue";

const props = defineProps<{
    label: string;
    input?: InputHTMLAttributes;
    error?: string | string[];
    success?: string;
    hint?: string;
}>();
</script>
