<template>
    <button
        :class="[
            'px-6 py-3',
            'rounded-full',
            'bg-apple-blue text-white',
            'font-medium',

            'transition-all',
            'hover:opacity-90  active:scale-95',

            'disabled:opacity-50',
            'disabled:cursor-not-allowed',
            'disabled:hover:opacity-50',
            'disabled:active:scale-100',
        ]"
    >
        <slot></slot>
    </button>
</template>
