<script setup lang="ts">
import { ref } from "vue";
import { Copy } from "lucide-vue-next";
import { useClipboard } from "@/utils/clipboard";

const props = defineProps<{
    value: string;
    label?: string;
}>();

const { copied, copy } = useClipboard();

const onClick = async () => {
    await copy(props.value);
};
</script>

<template>
    <div class="space-y-2">
        <label v-if="label" class="text-sm font-medium">
            {{ label }}
        </label>

        <div class="flex gap-2">
            <input
                readonly
                :value="value"
                class="grow px-4 py-2 rounded-lg bg-muted border border-border font-mono text-sm focus:outline-none"
            />

            <button
                @click="onClick"
                class="px-4 py-2 rounded-lg bg-apple-blue text-white font-medium hover:opacity-90 transition-all flex items-center gap-2"
            >
                <span v-if="copied"> Copied! </span>

                <template v-else>
                    <Copy :size="16" />
                    Copy
                </template>
            </button>
        </div>
    </div>
</template>
