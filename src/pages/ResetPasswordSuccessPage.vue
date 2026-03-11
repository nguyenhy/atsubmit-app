<script setup lang="ts">
import { CheckCircle2 } from "lucide-vue-next";

import AuthCard from "../components/AuthCard.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
</script>

<template>
    <AuthCard title="Set new password">
        <div class="text-center">
            <CheckCircle2 class="mx-auto mb-6" :size="32" />

            <h2 class="text-xl font-bold mb-2">Password updated</h2>

            <p class="text-muted-foreground mb-8">
                Your password has been successfully updated.
            </p>

            <a href="/login">
                <PrimaryButton class="w-full py-2.5 inline-block"
                    >Log in now</PrimaryButton
                >
            </a>
        </div>
    </AuthCard>
</template>
