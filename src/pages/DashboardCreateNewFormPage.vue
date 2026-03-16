<script setup lang="ts">
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import Card from "@/components/dashboard/Card.vue";
import { onMounted, ref } from "vue";
import InputField from "@/components/InputField.vue";

const props = defineProps<{}>();

const formName = ref("");

onMounted(() => {
    formName.value = "Contact Sales";
});
</script>

<template>
    <div
        class="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500"
    >
        <DashboardHeader
            title="Create New Form"
            description="Set up a new endpoint to start receiving submissions."
        />

        <Card
            title="Form Setup"
            subtitle="Configure your form and connect it to your website."
        >
            <form class="space-y-8" action="/dashboard/forms/new" method="POST">
                <!-- Form name -->
                <InputField
                    label="Form Name"
                    hint="This is for your internal reference only."
                    :input="{
                        required: true,
                        type: 'text',
                        name: 'name',
                    }"
                >
                    <template #default="{ classes, input }">
                        <input
                            :class="classes"
                            v-bind="input"
                            v-model="formName"
                        />
                    </template>
                </InputField>

                <!-- actions -->
                <div class="pt-4 flex justify-end">
                    <button type="submit" class="btn-primary px-8">
                        Create Form
                    </button>
                </div>
            </form>
        </Card>
    </div>
</template>
