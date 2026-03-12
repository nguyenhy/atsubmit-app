<script setup lang="ts">
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";

import type { DashboardSettingsTab, DashboardSettingsTabId } from "./DashboardSettingsPage.types";

import { User, Shield, Globe, Bell } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps<{ tab: DashboardSettingsTabId }>();

const tabs: DashboardSettingsTab[] = [
    {
        id: "profile",
        name: "Profile",
        href: "/dashboard/settings/profile",
        icon: User,
    },
    {
        id: "processing",
        name: "Processing",
        href: "/dashboard/settings/processing",
        icon: Shield,
    },
    {
        id: "domains",
        name: "Domains",
        href: "/dashboard/settings/domains",
        icon: Globe,
    },
    {
        id: "notifications",
        name: "Notifications",
        href: "/dashboard/settings/notifications",
        icon: Bell,
    },
];

const currentTabId = computed(() => {
    const path = location.pathname;
    if (path.includes("processing")) return "processing";
    if (path.includes("domains")) return "domains";
    if (path.includes("notifications")) return "notifications";
    return "profile";
});
</script>

<template>
    <div class="space-y-8 animate-in fade-in duration-500">
        <DashboardHeader
            title="Settings"
            description="Manage your account, security, and notification preferences."
        />

        <div class="flex border-b border-border mb-8 overflow-x-auto">
            <a
                v-for="tab in tabs"
                :key="tab.name"
                :href="tab.href"
                class="flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap"
                :class="
                    tab.id === props.tab
                        ? 'border-apple-blue text-apple-blue'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                "
            >
                <component :is="tab.icon" :size="18" />
                {{ tab.name }}
            </a>
        </div>

        <div class="max-w-4xl">
            <slot></slot>
        </div>
    </div>
</template>
