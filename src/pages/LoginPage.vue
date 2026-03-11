<template>
    <AuthCard title="Welcome back" subtitle="Log in to your AtSubmit account">
        <div class="mb-6">
            <SocialButton provider="Facebook">
                <template #icon>
                    <SimpleIconSvg :size="20" :icon="siFacebook" />
                </template>
            </SocialButton>
        </div>

        <div class="flex items-center w-full">
            <div class="grow h-px bg-gray-400"></div>
            <span class="px-3 whitespace-nowrap"> or continue with email </span>
            <div class="grow h-px bg-gray-400"></div>
        </div>

        <form @submit.prevent action="/login" method="POST">
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

            <InputField
                label="Password"
                :icon="Lock"
                :input="{
                    id: 'password',
                    name: 'password',
                    type: 'password',
                    placeholder: '••••••••',
                    autocomplete: 'current-password',
                }"
            />

            <div class="flex items-center justify-between mb-6">
                <label class="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        class="rounded border-border text-apple-blue focus:ring-apple-blue"
                    />
                    <span>Remember me</span>
                </label>

                <a
                    href="/forgot-password"
                    class="text-sm font-medium text-apple-blue hover:underline"
                >
                    Forgot password?
                </a>
            </div>

            <PrimaryButton class="w-full py-2.5 mb-6">Log in</PrimaryButton>
        </form>

        <p class="text-center text-sm text-muted-foreground">
            Don't have an account?

            <a
                href="/signup"
                class="font-medium text-apple-blue hover:underline"
            >
                Create account
            </a>
        </p>
    </AuthCard>
</template>

<script setup lang="ts">
import AuthCard from "../components/AuthCard.vue";
import SocialButton from "../components/SocialButton.vue";
import InputField from "../components/InputField.vue";

import { Mail, Lock } from "lucide-vue-next";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import { siFacebook } from "simple-icons";
import SimpleIconSvg from "@/components/SimpleIconSvg.vue";

console.log(typeof siFacebook, siFacebook);
</script>
