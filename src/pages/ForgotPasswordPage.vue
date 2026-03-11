<script setup lang="ts">
import { ref } from "vue";
import { Mail, CheckCircle2 } from "lucide-vue-next";

import AuthCard from "../components/AuthCard.vue";
import InputField from "../components/InputField.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";

const submitted = ref(false);

function submit() {
    submitted.value = true;
}
</script>

<template>
    <AuthCard
        title="Reset password"
        :subtitle="
            submitted ? '' : 'Enter your email and we will send reset link'
        "
    >
        <div v-if="submitted" class="text-center">
            <CheckCircle2 class="mx-auto mb-6" :size="32" />

            <p class="text-muted-foreground mb-8">
                If an account exists for this email, a reset link will be sent.
            </p>

            <a href="/login">
                <PrimaryButton class="w-full py-2.5 inline-block">
                    Back to login
                </PrimaryButton>
            </a>
        </div>

        <form v-else @submit.prevent="submit">
            <InputField
                label="Email Address"
                :icon="Mail"
                :input="{
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    placeholder: 'name@example.com',
                    autocomplete: 'email',
                }"
            />

            <PrimaryButton class="w-full py-2.5 mb-6">
                Send reset link
            </PrimaryButton>

            <p class="text-center text-sm text-muted-foreground">
                Already have your email and password?
                <a
                    href="/login"
                    class="font-medium text-apple-blue hover:underline"
                >
                    Log in
                </a>
            </p>
        </form>
    </AuthCard>
</template>
