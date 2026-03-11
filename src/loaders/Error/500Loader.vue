<script setup lang="ts">
import ErrorLayout from "@/layouts/ErrorLayout.vue";
import { httpStatus500 } from "./HttpStatusLoader.const";
</script>

<template>
    <ErrorLayout
        :code="httpStatus500.code"
        :title="httpStatus500.title"
        :description="httpStatus500.description"
        :action="httpStatus500.action"
    >
    </ErrorLayout>
</template>
