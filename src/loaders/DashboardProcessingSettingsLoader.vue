<script setup lang="ts">
import Layout from "@/layouts/AuthedLayout.vue";

import DashboardSettingsPage from "@/pages/DashboardSettingsPage.vue";
import ProcessingSettings from "@/components/dashboard/DashboardProcessingSettings.vue";

const props = defineProps<{
    enabled: boolean;
    name: string;
    hiddenStyle: string;
    hiddenClassName: string;

    error?: string | string[];
}>();
</script>

<template>
    <Layout>
        <DashboardSettingsPage tab="processing">
            <ProcessingSettings
                action="/dashboard/settings/processing"
                v-bind="props"
            />
        </DashboardSettingsPage>
    </Layout>
</template>
