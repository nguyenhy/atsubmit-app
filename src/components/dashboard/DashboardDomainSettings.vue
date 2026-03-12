<script setup lang="ts">
import Card from "./Card.vue";

const domains = ["atsubmit.com", "my-portfolio.vercel.app"];
</script>

<template>
    <div class="space-y-8">
        <Card
            title="Allowed Domains"
            subtitle="Restrict form submissions to specific domains for extra security."
        >
            <div class="space-y-6">
                <div class="flex gap-2">
                    <input
                        placeholder="e.g. example.com"
                        class="flex-grow px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-apple-blue/50"
                    />

                    <button class="btn-primary px-6">Add Domain</button>
                </div>

                <div class="space-y-2">
                    <div
                        v-for="domain in domains"
                        :key="domain"
                        class="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                    >
                        <span class="font-medium">{{ domain }}</span>

                        <button
                            class="text-red-500 hover:text-red-600 text-sm font-medium"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>
