<script setup lang="ts">
import { CheckCircle2 } from "lucide-vue-next";

import AuthCard from "../components/AuthCard.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
</script>

<template>
    <AuthCard title="Reset Link Already Used">
        <div class="text-center">
            <CheckCircle2 class="mx-auto mb-6" :size="32" />

            <h2 class="text-xl font-bold mb-2">
                This password reset link has already been used.
            </h2>

            <p class="text-muted-foreground mb-8">
                For security reasons, each reset link can only be used once.
            </p>

            <p class="text-center text-sm text-muted-foreground">
                If you still need to reset your password, please
                <a href="/forgot-password">
                    <PrimaryButton class="w-full py-2.5 inline-block"
                        >Request a new reset link</PrimaryButton
                    >
                </a>
            </p>
        </div>
    </AuthCard>
</template>
