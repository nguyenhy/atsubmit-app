<script setup lang="ts">
import DashboardDomainSettings from "@/components/dashboard/DashboardDomainSettings.vue";
import Layout from "@/layouts/AuthedLayout.vue";
import DashboardEditFormPage from "@/pages/DashboardEditFormPage.vue";

const props = defineProps<{
    slug: string;
    allowed: string[];
    disallowed: string[];
}>();
</script>

<template>
    <Layout>
        <DashboardEditFormPage tab="domains" :slug="slug">
            <DashboardDomainSettings
                :action="`/webapi/dashboard/form/${slug}/domains`"
                v-bind="props"
            />
        </DashboardEditFormPage>
    </Layout>
</template>
