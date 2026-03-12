<script setup lang="ts">
import Card from "./Card.vue";

const rules = [
    {
        label: "Immediately",
        desc: "Send an email for every new submission.",
        plan: "Free",
    },
    {
        label: "Daily Digest",
        desc: "A summary of all submissions from the last 24 hours.",
        plan: "Starter",
    },
    {
        label: "Weekly Report",
        desc: "A comprehensive report of your form performance.",
        plan: "Pro",
    },
];
</script>

<template>
    <div class="space-y-8">
        <Card
            title="Email Notifications"
            subtitle="Configure how and when you receive email alerts."
        >
            <div class="space-y-8">
                <div class="space-y-4">
                    <h4
                        class="font-bold text-sm uppercase tracking-wider text-muted-foreground"
                    >
                        Notification Rules
                    </h4>

                    <div class="space-y-3">
                        <label
                            v-for="rule in rules"
                            :key="rule.label"
                            class="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-apple-blue/50 transition-all cursor-pointer group"
                        >
                            <input
                                type="radio"
                                name="rule"
                                class="mt-1 text-apple-blue focus:ring-apple-blue"
                                :checked="rule.label === 'Immediately'"
                            />

                            <div class="flex-grow">
                                <div class="flex items-center justify-between">
                                    <span class="font-bold">{{
                                        rule.label
                                    }}</span>

                                    <span
                                        class="text-xs font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground"
                                    >
                                        {{ rule.plan }}
                                    </span>
                                </div>

                                <p class="text-sm text-muted-foreground">
                                    {{ rule.desc }}
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="pt-4 border-t border-border">
                    <button class="btn-primary px-8">
                        Save Notification Preferences
                    </button>
                </div>
            </div>
        </Card>
    </div>
</template>
