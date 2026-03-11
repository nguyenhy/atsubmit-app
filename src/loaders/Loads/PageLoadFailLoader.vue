<script lang="ts" setup>
import { onMounted } from 'vue';
import type { PageLoadFailError } from './PageLoadFailLoader.types';

const props = defineProps<{
    error: PageLoadFailError;
}>();

const error: Error | null = props.error
    ? props.error instanceof Error
        ? props.error
        : new Error(String(props.error))
    : null;
const extra =
    !!props.error && typeof props.error === 'object' && '__extra' in props.error
        ? props.error.__extra || null
        : null;

const isProd = import.meta.env.PROD;

onMounted(() => {
    console.log([]);
});
</script>

<template>
    <div class="failed">
        <div class="failed__msg">Failed</div>
        <div v-if="!isProd" class="failed__debug">
            <template v-if="error">
                <p class="failed__debug__info">
                    <span>{{ error.name }}</span>
                    <span>{{ error.message }}</span>
                </p>
                <p class="failed__debug__stack">
                    {{ error.stack }}
                </p>
            </template>
            <pre v-if="extra" class="failed__debug__extra">{{ extra }}</pre>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.failed {
    background: var(--color-background-soft);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    padding: 2rem;
    transition:
        background-color 0.3s,
        border-color 0.3s;
}

.failed__msg {
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-heading);
    text-align: center;
    margin-bottom: 1rem;
}

.failed__debug {
}

.failed__debug__info {
    margin-top: 0.5rem;
    span:last-child {
        color: var(--color-text); /* fallback */
    }
}

.failed__debug__stack,
.failed__debug__extra {
    background: var(--color-background-mute);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    padding: 0.8rem;
    font-size: 0.85rem;
    line-height: 1.4;
    white-space: pre-wrap;
    max-height: 240px;
    overflow: auto;

    margin-top: 0.5rem;
}
</style>
