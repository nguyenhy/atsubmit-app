<script setup lang="ts">
import Layout from "@/layouts/AuthedLayout.vue";

import DashboardSettingsPage from "@/pages/DashboardSettingsPage.vue";
import DashboardDomainSettings from "@/components/dashboard/DashboardDomainSettings.vue";

const props = defineProps<{
    allowed: string[];
    disallowed: string[];
}>();
</script>

<template>
    <Layout>
        <DashboardSettingsPage tab="domains">
            <DashboardDomainSettings
                action="/webapi/dashboard/settings/domains"
                v-bind="props"
            />
        </DashboardSettingsPage>
    </Layout>
</template>
