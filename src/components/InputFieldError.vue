<template>
    <div>
        <template v-if="Array.isArray(error)">
            <ul class="ml-4 list-disc marker:text-red-500">
                <li v-for="(e, i) in error" :key="i">
                    <p class="text-sm text-red-500">
                        {{ e }}
                    </p>
                </li>
            </ul>
        </template>
        <p v-else class="text-sm text-red-500">
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    error?: string | string[];
}>();
</script>
