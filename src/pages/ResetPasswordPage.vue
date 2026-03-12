<script setup lang="ts">
import { Lock, Eye, EyeClosed, EyeClosedIcon } from "lucide-vue-next";

import AuthCard from "../components/AuthCard.vue";
import InputField from "../components/InputField.vue";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import { ref } from "vue";
import InputFieldError from "@/components/InputFieldError.vue";
import { useFormError } from "@/composition/useFormError";

const props = defineProps<{
    email: string;
    error?: string | string[] | Record<string, unknown>;
}>();

const token = new URL(location.href).searchParams.get("token");

const showPass = ref(false);
const { msg, errors } = useFormError(props.error);
</script>

<template>
    <AuthCard
        title="Set new password"
        :subtitle="'Choose a strong password for your account'"
    >
        <InputFieldError v-if="msg" :error="msg" class="mt-4" />
        <form action="/reset-password" method="post">
            <input type="hidden" name="token" :value="token" />
            <input
                type="email"
                name="email"
                autocomplete="none"
                disabled
                readonly
                :value="props.email"
                style="display: none"
            />
            <InputField
                label="New Password"
                :icon="Lock"
                :input="{
                    id: 'password',
                    name: 'password',
                    type: showPass ? 'text' : 'password',
                    placeholder: '••••••••',
                    autocomplete: 'new-password',
                }"
                :error="errors.password"
            >
                <template #append>
                    <button type="button" @click="showPass = !showPass">
                        <EyeClosed v-if="showPass"></EyeClosed>
                        <Eye v-else></Eye>
                    </button>
                </template>
            </InputField>

            <InputField
                label="Confirm New Password"
                :icon="Lock"
                :input="{
                    id: 'confirm-password',
                    name: 'confirm-password',
                    type: showPass ? 'text' : 'password',
                    placeholder: '••••••••',
                    autocomplete: 'new-password',
                }"
                :error="errors['confirm-password']"
            >
                <template #append>
                    <button type="button" @click="showPass = !showPass">
                        <EyeClosed v-if="showPass"></EyeClosed>
                        <Eye v-else></Eye>
                    </button>
                </template>
            </InputField>

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
