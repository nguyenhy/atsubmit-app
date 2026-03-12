<script setup lang="ts">
import Layout from "@/layouts/AuthedLayout.vue";

import DashboardSettingsPage from "@/pages/DashboardSettingsPage.vue";
import NotificationSettings from "@/components/dashboard/DashboardNotificationSettings.vue";

const props = defineProps<{}>();
</script>

<template>
    <Layout>
        <DashboardSettingsPage tab="notifications">
            <NotificationSettings v-bind="props" />
        </DashboardSettingsPage>
    </Layout>
</template>
