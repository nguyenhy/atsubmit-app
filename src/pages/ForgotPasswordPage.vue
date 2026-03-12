<script setup lang="ts">
import { Mail } from "lucide-vue-next";

import AuthCard from "../components/AuthCard.vue";
import InputField from "../components/InputField.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
</script>

<template>
    <AuthCard
        title="Reset password"
        :subtitle="'Enter your email and we will send reset link'"
    >
        <form action="/forgot-password" method="post">
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
                class="space-y-2 mb-4"
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
