<script setup lang="ts">
import Layout from "@/layouts/AuthedLayout.vue";

import DashboardSettingsPage from "@/pages/DashboardSettingsPage.vue";
import ProfileSettings from "@/components/dashboard/DashboardSettingsProfile.vue";

const props = defineProps<{
    name: string;
    email: string;
    timezones: { label: string; id: string }[];
    timezone: string | null;
    error?: string | string[];
}>();
</script>

<template>
    <Layout>
        <DashboardSettingsPage tab="profile">
            <ProfileSettings v-bind="props" />
        </DashboardSettingsPage>
    </Layout>
</template>
