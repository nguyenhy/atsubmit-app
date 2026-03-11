<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :fill="`#${icon.hex}`"
        :viewBox="viewBox"
        :style="{
            width: `${$props.size}px`,
            height: `${$props.size}px`,
        }"
    >
        <title v-if="icon.title">{{ icon.title }} Icon</title>
        <path :d="icon.path" />
    </svg>
</template>

<script setup lang="ts">
import type { SimpleIcon } from "simple-icons";
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        /**
         * in pixels
         */
        size?: number;
        icon: SimpleIcon;
    }>(),
    {
        size: 16,
    },
);

const viewBox = computed(() => {
    const match = props.icon.svg.match(/viewBox="([^"]+)"/);
    return match ? match[1] || "" : "";
});
</script>
