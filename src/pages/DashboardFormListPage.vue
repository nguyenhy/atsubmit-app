<script setup lang="ts">
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import Card from "@/components/dashboard/Card.vue";
import Table from "@/components/dashboard/Table.vue";
import { Copy, Eye, Edit2, Trash2, Plus, Check } from "lucide-vue-next";
import type { FormInfoItem, FormItem } from "./DashboardFormListPage.types";
import { onBeforeMount, ref } from "vue";
import { useClipboardMap } from "@/utils/clipboard";

const props = defineProps<{
    items: FormInfoItem[];
    total: number;
    page: number;
    limit: number;
}>();
const items = ref<FormItem[]>([]);

onBeforeMount(() => {
    for (let index = 0; index < props.items.length; index++) {
        const element = props.items[index];
        if (element) {
            items.value.push({
                ...element,
            });
        }
    }
});

const { copied, copy } = useClipboardMap();
</script>

<template>
    <div class="space-y-8 animate-in fade-in duration-500">
        <DashboardHeader
            title="Forms"
            description="Manage your form endpoints and integration settings."
        >
            <template #actions>
                <a
                    href="/dashboard/forms/new"
                    class="btn-primary flex items-center gap-2"
                >
                    <Plus :size="18" />
                    Create Form
                </a>
            </template>
        </DashboardHeader>

        <Card class="p-0">
            <Table
                :headers="[
                    'Form Name',
                    'Endpoint',
                    'Submissions',
                    'Status',
                    'Actions',
                ]"
            >
                <tr
                    v-for="form in items"
                    :key="form.id"
                    class="hover:bg-muted/50 transition-colors"
                >
                    <td class="px-4 py-4">
                        <div class="font-medium">
                            <a :href="`/dashboard/form/${form.id}`">
                                {{ form.name }}
                            </a>
                        </div>
                        <div class="text-xs text-muted-foreground font-mono">
                            <a :href="`/dashboard/form/${form.id}`">
                                {{ form.id }}
                            </a>
                        </div>
                    </td>

                    <td class="px-4 py-4">
                        <div class="flex items-center gap-2">
                            <code
                                class="text-xs bg-muted px-2 py-1 rounded border border-border"
                            >
                                {{ form.endpoint }}
                            </code>

                            <button
                                class="text-muted-foreground hover:text-apple-blue"
                                @click="copy(form.id, form.endpoint)"
                            >
                                <Check
                                    v-if="copied[form.id]"
                                    :size="14"
                                    class="text-green-500"
                                />
                                <Copy v-else :size="14" />
                            </button>
                        </div>
                    </td>

                    <td class="px-4 py-4 text-sm font-medium">
                        {{
                            typeof form.submissions === "number" &&
                            form.submissions >= 0
                                ? form.submissions
                                : ""
                        }}
                    </td>

                    <td class="px-4 py-4">
                        <span
                            :class="[
                                'text-xs font-bold px-2 py-1 rounded-full',
                                form.is_active
                                    ? 'bg-emerald-500/10 text-emerald-500'
                                    : 'bg-apple-gray/10 text-apple-gray',
                            ]"
                        >
                            {{ form.is_active ? "active" : "inactive" }}
                        </span>
                    </td>

                    <td class="px-4 py-4">
                        <div class="flex items-center gap-2">
                            <a :href="`/dashboard/form/${form.id}`">
                                <button
                                    class="p-2 rounded-lg hover:bg-muted text-muted-foreground"
                                >
                                    <Edit2 :size="18" />
                                </button>
                            </a>

                            <button
                                class="p-2 rounded-lg hover:bg-muted text-red-500"
                            >
                                <Trash2 :size="18" />
                            </button>
                        </div>
                    </td>
                </tr>
            </Table>
        </Card>
    </div>
</template>
