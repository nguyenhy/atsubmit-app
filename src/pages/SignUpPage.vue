<script setup lang="ts">
import { ref } from "vue";

import AuthCard from "../components/AuthCard.vue";
import SocialButton from "../components/SocialButton.vue";
import InputField from "../components/InputField.vue";

import { Mail, Lock } from "lucide-vue-next";
import { siFacebook } from "simple-icons";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import SimpleIconSvg from "@/components/SimpleIconSvg.vue";

const agreed = ref(false);
</script>

<template>
    <AuthCard
        title="Create account"
        subtitle="Start managing your forms for free"
    >
        <div class="mb-6">
            <SocialButton provider="Facebook">
                <template #icon>
                    <SimpleIconSvg :size="20" :icon="siFacebook" />
                </template>
            </SocialButton>
        </div>

        <div class="flex items-center w-full">
            <div class="grow h-px bg-gray-400"></div>
            <span class="px-3 whitespace-nowrap"> or sign up with email </span>
            <div class="grow h-px bg-gray-400"></div>
        </div>

        <form
            @submit.prevent
            action="/signup"
            method="POST"
            :disabled="!agreed"
        >
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
                    autocomplete: 'new-password',
                }"
            />

            <InputField
                label="Confirm Password"
                :icon="Lock"
                :input="{
                    id: 'confirm-password',
                    name: 'confirm-password',
                    type: 'password',
                    placeholder: '••••••••',
                    autocomplete: 'new-password',
                }"
            />

            <div class="flex items-start gap-2 mb-6">
                <input
                    type="checkbox"
                    v-model="agreed"
                    class="mt-1 rounded border-border text-apple-blue focus:ring-apple-blue"
                />

                <label class="text-sm text-muted-foreground leading-tight">
                    I agree to the
                    <a
                        href="https://atsubmit.com/legal/en/terms"
                        class="text-apple-blue hover:underline"
                    >
                        Terms
                    </a>
                    and
                    <a
                        href="https://atsubmit.com/legal/en/privacy"
                        class="text-apple-blue hover:underline"
                    >
                        Privacy Policy
                    </a>
                </label>
            </div>

            <PrimaryButton class="w-full py-2.5 mb-6" :disabled="!agreed">
                Sign up
            </PrimaryButton>
        </form>

        <p class="text-center text-sm text-muted-foreground">
            Already have an account?

            <a
                href="/login"
                class="font-medium text-apple-blue hover:underline"
            >
                Log in
            </a>
        </p>
    </AuthCard>
</template>
