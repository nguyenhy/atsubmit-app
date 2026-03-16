<script setup lang="ts">
import DashboardEditFormGeneralSettings from "@/components/dashboard/DashboardEditFormGeneralSettings.vue";
import Layout from "@/layouts/AuthedLayout.vue";
import DashboardEditFormPage from "@/pages/DashboardEditFormPage.vue";

const props = defineProps<{
    formId: string;
    endpointUrl: string;
    name: string;
    isActive: boolean;
    submitToken: string;

    error?: string | string[];
}>();
</script>

<template>
    <Layout>
        <DashboardEditFormPage tab="general" :form-id="formId">
            <DashboardEditFormGeneralSettings
                :action="`/dashboard/form/${formId}/general`"
                :refreshToken="`/webapi/dashboard/form/${formId}/submit_token`"
                v-bind="props"
            />
        </DashboardEditFormPage>
    </Layout>
</template>
