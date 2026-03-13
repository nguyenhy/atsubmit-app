<script setup lang="ts">
import { Plus, Trash } from "lucide-vue-next";
import PrimaryButton from "../buttons/PrimaryButton.vue";
import Card from "./Card.vue";
import { ref } from "vue";
import { doFetch } from "@/utils/request";
import { isValidDomain, isValidDomainGlob } from "@/utils/domain";

const props = defineProps<{
    allowed: string[];
    disallowed: string[];
}>();

const inputAllowedDomain = ref("");
const inputAllowedDomainError = ref(false);
const allowedDomains = ref<string[]>([...(props.allowed || [])]);

const inputDisallowedDomain = ref("");
const inputDisallowedDomainError = ref(false);
const disallowedDomains = ref<string[]>([...(props.disallowed || [])]);

const onSubmitAdd = async (allow: boolean, value: string) => {
    const domain = (value || "").trim().toLowerCase();
    if (!domain || !(isValidDomain(domain) || isValidDomainGlob(domain))) {
        inputAllowedDomainError.value = true;
        return;
    }
    const response = await doFetch("/webapi/dashboard/settings/domains", {
        method: "PUT",
        body: JSON.stringify(
            allow
                ? {
                      allow: domain,
                  }
                : {
                      disallow: domain,
                  },
        ),
    });
    if (response.ok) {
        const json = await response.json();

        if (Array.isArray(json.allowed)) {
            allowedDomains.value = [...json.allowed];
        }

        if (Array.isArray(json.disallowed)) {
            disallowedDomains.value = [...json.disallowed];
        }
    }
};

const onClickDelete = async (allow: boolean, domain: String) => {
    const response = await doFetch("/webapi/dashboard/settings/domains", {
        method: "DELETE",
        body: JSON.stringify(
            allow
                ? {
                      allow: domain,
                  }
                : {
                      disallow: domain,
                  },
        ),
    });
    if (response.ok) {
        const json = await response.json();

        if (Array.isArray(json.allowed)) {
            allowedDomains.value = [...json.allowed];
        }

        if (Array.isArray(json.disallowed)) {
            disallowedDomains.value = [...json.disallowed];
        }
    }
};
</script>

<template>
    <div class="space-y-8">
        <Card
            title="Allowed Domains"
            subtitle="Restrict form submissions to specific domains for extra security."
        >
            <div class="space-y-6">
                <div>
                    <form
                        class="flex gap-2 mb-1"
                        @submit.prevent="onSubmitAdd(true, inputAllowedDomain)"
                    >
                        <input
                            type="text"
                            v-model="inputAllowedDomain"
                            placeholder="e.g. example.com"
                            class="grow px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-apple-blue/50"
                            required
                        />

                        <PrimaryButton type="submit">
                            <Plus />
                        </PrimaryButton>
                    </form>
                    <p
                        class="text-xs"
                        :class="[
                            inputAllowedDomainError
                                ? 'text-red-300'
                                : 'text-muted-foreground',
                        ]"
                    >
                        Enter domains only (no <code>http://</code> or
                        <code>https://</code>). Example:
                        <code>example.com</code>,
                        <code>app.example.com</code>
                    </p>
                </div>

                <div class="space-y-2">
                    <div
                        v-for="domain in allowedDomains"
                        :key="domain"
                        class="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                    >
                        <span class="font-medium">{{ domain }}</span>

                        <button
                            class="text-red-500 hover:text-red-600 text-sm font-medium"
                            @click="onClickDelete(true, domain)"
                        >
                            <Trash />
                        </button>
                    </div>
                </div>
            </div>
        </Card>

        <Card
            title="Disallowed Domains"
            subtitle="Block form submissions from specific domains for extra security."
        >
            <div class="space-y-6">
                <div>
                    <form
                        class="flex gap-2 mb-1"
                        @submit.prevent="
                            onSubmitAdd(false, inputDisallowedDomain)
                        "
                    >
                        <input
                            type="text"
                            v-model="inputDisallowedDomain"
                            placeholder="e.g. example.com"
                            class="grow px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-apple-blue/50"
                            required
                        />

                        <PrimaryButton type="submit">
                            <Plus />
                        </PrimaryButton>
                    </form>
                    <p
                        class="text-xs"
                        :class="[
                            inputDisallowedDomainError
                                ? 'text-red-300'
                                : 'text-muted-foreground',
                        ]"
                    >
                        Enter domains only (no <code>http://</code> or
                        <code>https://</code>). Example:
                        <code>example.com</code>,
                        <code>app.example.com</code>
                    </p>
                </div>

                <div class="space-y-2">
                    <div
                        v-for="domain in disallowedDomains"
                        :key="domain"
                        class="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                    >
                        <span class="font-medium">{{ domain }}</span>

                        <button
                            class="text-red-500 hover:text-red-600 text-sm font-medium"
                            @click="onClickDelete(false, domain)"
                        >
                            <Trash />
                        </button>
                    </div>
                </div>
            </div>
        </Card>

        <Card title="Domain rule priority">
            <p>
                <b><i>Disallowed Domains</i></b> take priority. If a domain appears
                in both lists, it will be blocked. When an <b><i>allow list</i></b> is set,
                only submissions from those domains are accepted.
            </p>
        </Card>
    </div>
</template>
