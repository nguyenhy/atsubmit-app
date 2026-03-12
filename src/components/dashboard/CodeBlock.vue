<script setup lang="ts">
import { ref } from "vue";
import { Copy } from "lucide-vue-next";

const props = defineProps<{
    code: string;
    language?: string;
}>();

const copied = ref(false);

const copy = async () => {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
};
</script>

<template>
    <div class="relative group">
        <div
            class="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
            <button
                @click="copy"
                class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
                <span v-if="copied" class="text-xs font-bold"> Copied! </span>

                <Copy v-else :size="16" />
            </button>
        </div>

        <pre
            class="p-6 rounded-apple-lg bg-[#0d1117] text-white overflow-x-auto font-mono text-sm leading-relaxed"
        >
<code>{{ code }}</code>
</pre>
    </div>
</template>
