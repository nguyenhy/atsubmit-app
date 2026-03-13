<script setup lang="ts">
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import Card from "@/components/dashboard/Card.vue";
import Table from "@/components/dashboard/Table.vue";

import {
    FileText,
    Inbox,
    Zap,
    TrendingUp,
    Clock,
    Plus,
    ExternalLink,
} from "lucide-vue-next";

const stats = [
    {
        label: "Total Submissions",
        value: "1,284",
        change: "+12%",
        icon: Inbox,
        color: "text-blue-500",
    },
    {
        label: "Active Forms",
        value: "12",
        change: "+2",
        icon: FileText,
        color: "text-emerald-500",
    },
    {
        label: "Conversion Rate",
        value: "3.2%",
        change: "+0.4%",
        icon: TrendingUp,
        color: "text-violet-500",
    },
    {
        label: "Spam Blocked",
        value: "432",
        change: "-5%",
        icon: Zap,
        color: "text-amber-500",
    },
];

const submissions = [
    { form: "Contact Sales", data: "john@example.com...", time: "2 mins ago" },
    { form: "Newsletter", data: "sarah.j@gmail.com", time: "15 mins ago" },
    {
        form: "Job Application",
        data: "mike.dev@outlook.com",
        time: "1 hour ago",
    },
    { form: "Contact Sales", data: "info@startup.io", time: "3 hours ago" },
    { form: "Support Request", data: "help@user.com", time: "5 hours ago" },
];
</script>

<template>
    <div class="space-y-8 animate-in fade-in duration-500">
        <DashboardHeader
            title="Overview"
            description="Welcome back, John. Here's what's happening with your forms."
        />

        <!-- Stats -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card v-for="(stat, i) in stats" :key="i" class="p-0">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div :class="['p-2 rounded-lg bg-muted', stat.color]">
                            <component :is="stat.icon" :size="20" />
                        </div>

                        <span
                            :class="[
                                'text-xs font-bold px-2 py-1 rounded-full',
                                stat.change.startsWith('+')
                                    ? 'bg-emerald-500/10 text-emerald-500'
                                    : 'bg-red-500/10 text-red-500',
                            ]"
                        >
                            {{ stat.change }}
                        </span>
                    </div>

                    <p class="text-sm text-muted-foreground font-medium">
                        {{ stat.label }}
                    </p>

                    <h3 class="text-2xl font-bold mt-1">
                        {{ stat.value }}
                    </h3>
                </div>
            </Card>
        </div>

        <!-- Main grid -->
        <div class="grid lg:grid-cols-3 gap-8">
            <!-- Recent submissions -->
            <Card class="lg:col-span-2">
                <template #title> Recent Submissions </template>

                <Table :headers="['Form', 'Data', 'Time']">
                    <tr
                        v-for="(sub, i) in submissions"
                        :key="i"
                        class="hover:bg-muted/50 transition-colors"
                    >
                        <td class="px-4 py-4 font-medium">
                            {{ sub.form }}
                        </td>

                        <td
                            class="px-4 py-4 text-muted-foreground truncate max-w-50"
                        >
                            {{ sub.data }}
                        </td>

                        <td
                            class="px-4 py-4 text-sm text-muted-foreground flex items-center gap-2"
                        >
                            <Clock :size="14" />
                            {{ sub.time }}
                        </td>
                    </tr>
                </Table>

                <template #footer>
                    <button
                        class="text-apple-blue text-sm font-medium hover:underline"
                    >
                        View all submissions
                    </button>
                </template>
            </Card>

            <!-- Quick actions -->
            <Card>
                <template #title> Quick Actions </template>

                <div class="space-y-4">
                    <button
                        class="w-full flex items-center justify-between p-4 rounded-xl bg-apple-blue text-white font-medium hover:opacity-90 transition-all"
                    >
                        <span>Create New Form</span>
                        <Plus :size="20" />
                    </button>

                    <button
                        class="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted font-medium transition-all"
                    >
                        <span>View Documentation</span>
                        <ExternalLink :size="20" />
                    </button>

                    <button
                        class="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted font-medium transition-all"
                    >
                        <span>Configure Webhooks</span>
                        <Zap :size="20" />
                    </button>
                </div>
            </Card>
        </div>
    </div>
</template>
