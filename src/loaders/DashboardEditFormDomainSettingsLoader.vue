<script setup lang="ts">
import DashboardDomainSettings from "@/components/dashboard/DashboardDomainSettings.vue";
import DashboardProcessingSettings from "@/components/dashboard/DashboardProcessingSettings.vue";
import Layout from "@/layouts/AuthedLayout.vue";
import DashboardEditFormPage from "@/pages/DashboardEditFormPage.vue";

const props = defineProps<{
    formId: string;
    allowed: string[];
    disallowed: string[];
}>();
</script>

<template>
    <Layout>
        <DashboardEditFormPage tab="domains" :form-id="formId">
            <DashboardDomainSettings
                :action="`/webapi/dashboard/form/${formId}/domains`"
                v-bind="props"
            />
        </DashboardEditFormPage>
    </Layout>
</template>
