<script setup lang="ts">
import Layout from "@/layouts/Base.vue";
import { Home } from "lucide-vue-next";
import type { Action } from "./ErrorLayout.types";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import SecondaryButton from "@/components/buttons/SecondaryButton.vue";

defineProps<{
    code: string;
    title: string;
    description: string;
    action?: Action;
}>();
</script>

<template>
    <Layout>
        <div class="min-h-[80vh] flex items-center justify-center px-6 py-12">
            <div class="text-center max-w-md">
                <div
                    class="w-24 h-24 rounded-full bg-apple-blue/10 text-apple-blue flex items-center justify-center mx-auto mb-8"
                >
                    <slot name="icon"></slot>
                </div>

                <span
                    class="text-sm font-bold text-apple-blue uppercase tracking-widest mb-4 block"
                >
                    Error {{ code }}
                </span>

                <h1 class="text-4xl font-bold tracking-tight mb-4">
                    {{ title }}
                </h1>

                <p class="text-lg text-muted-foreground mb-10">
                    {{ description }}
                </p>

                <div
                    class="flex flex-col items-center sm:flex-row gap-4 justify-center"
                >
                    <a href="/">
                        <PrimaryButton
                            class="flex items-center gap-2 justify-center"
                        >
                            <Home :size="18" />
                            Back to Home
                        </PrimaryButton>
                    </a>

                    <a v-if="action?.href" :href="action.href">
                        <SecondaryButton
                            class="flex items-center gap-2 justify-center"
                        >
                            <component :is="action.icon" :size="18" />
                            {{ action.label || "" }}
                        </SecondaryButton>
                    </a>

                    <button v-else-if="action?.onClick" @click="action.onClick">
                        <SecondaryButton
                            class="flex items-center gap-2 justify-center"
                        >
                            <component :is="action.icon" :size="18" />
                            {{ action.label || "" }}
                        </SecondaryButton>
                    </button>
                </div>
            </div>
        </div>
    </Layout>
</template>
