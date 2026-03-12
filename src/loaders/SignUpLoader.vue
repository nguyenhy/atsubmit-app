<script setup lang="ts">
import Layout from "@/layouts/NoAuthedLayout.vue";
import SignupPage from "@/pages/SignUpPage.vue";

const props = defineProps<{
    email: string;
    error?: string | string[];
}>();
</script>

<template>
    <Layout class="min-h-[80vh] flex items-center justify-center px-6 py-12">
        <SignupPage v-bind="props" />
    </Layout>
</template>
