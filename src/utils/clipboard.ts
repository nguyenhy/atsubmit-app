import { reactive, ref } from "vue";

export const useClipboard = () => {
    const copied = ref(false);
    const copiedMap = reactive<Record<string, boolean>>({});

    const copy = async (value: string) => {
        await navigator.clipboard.writeText(value);
        copied.value = true;
        setTimeout(() => (copied.value = false), 2000);
    };

    const copyById = async (id: string, value: string) => {
        await navigator.clipboard.writeText(value);
        copiedMap[id] = true;
        setTimeout(() => (copiedMap[id] = false), 2000);
    };

    return {
        copied,
        copy,

        copiedMap,
        copyById,
    };
};

export const useClipboardMap = () => {
    const copied = reactive<Record<string, boolean>>({});

    const copy = async (id: string, value: string) => {
        await navigator.clipboard.writeText(value);
        copied[id] = true;
        setTimeout(() => (copied[id] = false), 2000);
    };

    return {
        copied: copied,
        copy: copy,
    };
};
