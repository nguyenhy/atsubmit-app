<script setup lang="ts">
import ErrorLayout from "@/layouts/ErrorLayout.vue";
import { httpStatus404 } from "./HttpStatusLoader.const";
</script>

<template>
    <ErrorLayout
        :code="httpStatus404.code"
        :title="httpStatus404.title"
        :description="httpStatus404.description"
        :action="httpStatus404.action"
    >
    </ErrorLayout>
</template>
