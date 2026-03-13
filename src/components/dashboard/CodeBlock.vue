<script setup lang="ts">
import { ref } from "vue";
import { Copy, Check } from "lucide-vue-next";

const props = defineProps<{
    code: string;
    language?: string;
}>();

const copied = ref(false);
let timeoutId = 0;

const copy = async () => {
    clearTimeout(timeoutId);
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    timeoutId = setTimeout(() => (copied.value = false), 2000);
};
</script>

<template>
    <div class="relative group">
        <div class="absolute z-10 right-2 top-2 transition-opacity">
            <button
                @click="copy"
                type="button"
                class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
                <Check v-if="copied" :size="16" class="text-green-500" />
                <Copy v-else :size="16" />
            </button>
        </div>

        <pre
            class="p-6 rounded-apple-lg bg-[#0d1117] text-white overflow-x-auto font-mono text-sm leading-relaxed"
        ><code>{{ code }}</code></pre>
    </div>
</template>
