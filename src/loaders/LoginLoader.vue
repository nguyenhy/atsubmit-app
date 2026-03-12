<script setup lang="ts">
import Layout from "@/layouts/NoAuthedLayout.vue";
import LoginPage from "@/pages/LoginPage.vue";

const props = defineProps<{
    email: string;
    error?: string | string[];
}>();
</script>

<template>
    <Layout class="min-h-[80vh] flex items-center justify-center px-6 py-12">
        <LoginPage v-bind="props" />
    </Layout>
</template>
