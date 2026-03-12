<script setup lang="ts">
import { ref } from "vue";

import AuthCard from "../components/AuthCard.vue";
import SocialButton from "../components/SocialButton.vue";
import InputField from "../components/InputField.vue";

import { Mail, Lock } from "lucide-vue-next";
import { siFacebook } from "simple-icons";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import SimpleIconSvg from "@/components/SimpleIconSvg.vue";
import { useFormError } from "@/composition/useFormError";
import InputFieldError from "@/components/InputFieldError.vue";

const agreed = ref(false);

const props = defineProps<{
    email: string;
    error?: string | string[];
}>();

const { msg, errors } = useFormError(props.error, { isMsgFields: ["agree"] });
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

        <InputFieldError v-if="msg" :error="msg" class="mt-4" />
        <form action="/signup" method="POST">
            <InputField
                label="Email Address"
                :icon="Mail"
                :input="{
                    id: 'email',
                    name: 'email',
                    type: 'email',
                    placeholder: 'name@example.com',
                    autocomplete: 'email',
                    required: true,
                }"
                :error="errors.email"
                class="space-y-2 mb-4"
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
                    required: true,
                }"
                :error="errors.password"
                class="space-y-2 mb-4"
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
                    required: true,
                }"
                :error="errors['confirm-password']"
                class="space-y-2 mb-4"
            />

            <div
                class="flex items-start gap-2"
                :class="{
                    'mb-6': !errors.agree,
                }"
            >
                <input
                    name="agree"
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
            <InputFieldError
                v-if="errors.agree"
                :error="errors.agree"
                :class="{
                    'mb-6': errors.agree,
                }"
            />

            <PrimaryButton class="w-full py-2.5 mb-6"> Sign up </PrimaryButton>
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
