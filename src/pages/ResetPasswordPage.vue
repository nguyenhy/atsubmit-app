<script setup lang="ts">
import { Lock } from "lucide-vue-next";

import AuthCard from "../components/AuthCard.vue";
import InputField from "../components/InputField.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
</script>

<template>
    <AuthCard
        title="Set new password"
        :subtitle="'Choose a strong password for your account'"
    >
        <form @submit.prevent>
            <InputField
                label="New Password"
                :icon="Lock"
                :input="{
                    id: 'new-password',
                    name: 'new-password',
                    type: 'password',
                    placeholder: '••••••••',
                    autocomplete: 'new-password',
                }"
            />

            <InputField
                label="Confirm New Password"
                :icon="Lock"
                :input="{
                    id: 'confirm-new-password',
                    name: 'confirm-new-password',
                    type: 'password',
                    placeholder: '••••••••',
                    autocomplete: 'new-password',
                }"
            />

            <PrimaryButton class="w-full py-2.5 mb-6">
                Reset password
            </PrimaryButton>

            <p class="text-center text-sm text-muted-foreground">
                Already have your email and password?
                <a
                    href="/login"
                    target="_blank"
                    class="font-medium text-apple-blue hover:underline"
                >
                    Log in
                </a>
            </p>
        </form>
    </AuthCard>
</template>
