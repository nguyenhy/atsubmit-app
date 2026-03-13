<script setup lang="ts">
import { getCurrentTheme, toggleTheme } from "@/utils/theme";
import { Moon, Sun } from "lucide-vue-next";
import { ref } from "vue";

const isDark = ref<boolean>(getCurrentTheme() === "dark");
const onClick = () => {
    isDark.value = toggleTheme() === "dark";
};
</script>
<template>
    <button
        class="p-2 rounded-full hover:bg-muted transition-colors"
        aria-label="Toggle theme"
        @click="onClick"
    >
        <Sun v-if="isDark" :size="18" />
        <Moon v-else :size="18" />
    </button>
</template>
