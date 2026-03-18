<script setup lang="ts">
import DashboardProcessingSettings from "@/components/dashboard/DashboardProcessingSettings.vue";
import Layout from "@/layouts/AuthedLayout.vue";
import DashboardEditFormPage from "@/pages/DashboardEditFormPage.vue";

const props = defineProps<{
    slug: string;
    enabled: boolean;
    name: string;
    hiddenStyle: string;
    hiddenClassName: string;

    error?: string | string[];
}>();
</script>

<template>
    <Layout>
        <DashboardEditFormPage tab="processing" :slug="slug">
            <DashboardProcessingSettings
                :action="`/dashboard/form/${slug}/processing`"
                v-bind="props"
            />
        </DashboardEditFormPage>
    </Layout>
</template>
