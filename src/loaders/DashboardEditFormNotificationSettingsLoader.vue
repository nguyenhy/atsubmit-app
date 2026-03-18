<script setup lang="ts">
import type { NotificationFrequentRule } from "@/components/dashboard/DashboardNotificationSettings.types";
import DashboardNotificationSettings from "@/components/dashboard/DashboardNotificationSettings.vue";
import Layout from "@/layouts/AuthedLayout.vue";
import DashboardEditFormPage from "@/pages/DashboardEditFormPage.vue";

const props = defineProps<{
    slug: string;

    rules: NotificationFrequentRule[];

    enabled?: boolean;
    frequency?: string;
    email_owner: string;
    email_recipients?: string[];
    error?: string | string[];
}>();
</script>

<template>
    <Layout>
        <DashboardEditFormPage tab='notifications' :slug="slug">
            <DashboardNotificationSettings
                :action="`/dashboard/form/${slug}/notifications`"
                v-bind="props"
            />
        </DashboardEditFormPage>
    </Layout>
</template>
