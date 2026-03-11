<script setup lang="ts">
import ErrorLayout from "@/layouts/ErrorLayout.vue";
import type { HttpStatusViewProps } from "./HttpStatusLoader.const";

const props = defineProps<{
    code: HttpStatusViewProps["code"];
    title: HttpStatusViewProps["title"];
    description: HttpStatusViewProps["description"];
    action: HttpStatusViewProps["action"];
}>();
</script>

<template>
    <ErrorLayout
        :code="props.code"
        :title="props.title"
        :description="props.description"
        :action="props.action"
    ></ErrorLayout>
</template>
