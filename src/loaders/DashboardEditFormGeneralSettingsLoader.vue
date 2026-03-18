<script setup lang="ts">
import DashboardEditFormGeneralSettings from "@/components/dashboard/DashboardEditFormGeneralSettings.vue";
import Layout from "@/layouts/AuthedLayout.vue";
import DashboardEditFormPage from "@/pages/DashboardEditFormPage.vue";

const props = defineProps<{
    slug: string;
    endpointUrl: string;
    name: string;
    isActive: boolean;
    submitToken: string;

    error?: string | string[];
}>();
</script>

<template>
    <Layout>
        <DashboardEditFormPage tab="general" :slug="slug">
            <DashboardEditFormGeneralSettings
                :action="`/dashboard/form/${slug}/general`"
                :refreshToken="`/webapi/dashboard/form/${slug}/submit_token`"
                v-bind="props"
            />
        </DashboardEditFormPage>
    </Layout>
</template>
