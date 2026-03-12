<script setup lang="ts">
import { CheckCircle2 } from "lucide-vue-next";

import AuthCard from "../components/AuthCard.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
</script>

<template>
    <AuthCard title="Reset password" subtitle="">
        <div class="text-center">
            <CheckCircle2 class="mx-auto mb-6" :size="32" />

            <p class="text-muted-foreground mb-8">
                If an account exists for this email, a reset link will be sent.
            </p>

            <a href="/login">
                <PrimaryButton class="w-full py-2.5 inline-block">
                    Back to login
                </PrimaryButton>
            </a>

            <p class="text-center text-sm text-muted-foreground">
                Does not receive reset password email?
                <a
                    href="/forgot-password"
                    class="font-medium text-apple-blue hover:underline"
                >
                    Try again
                </a>
            </p>
        </div>
    </AuthCard>
</template>
