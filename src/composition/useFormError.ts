import { reactive, ref, unref, type MaybeRefOrGetter } from "vue";

export const useFormError = (
    input?: MaybeRefOrGetter<string | string[] | Record<string, unknown>>,
    options?: {
        isMsgFields?: string[];
    },
) => {
    const msg = ref<string[]>([]);
    const errors = reactive<Record<string, string[]>>({});
    const isMsgFields = options?.isMsgFields || [];

    const error = unref(input);
    if (error) {
        if (typeof error === "string") {
            msg.value = [error.trim()];
        } else if (Array.isArray(error)) {
            msg.value = [];
            for (let index = 0; index < error.length; index++) {
                const element = error[index];
                if (typeof element === "string") {
                    msg.value.push(element.trim());
                }
            }
        } else if (typeof error === "object") {
            for (const key in error) {
                if (!Object.prototype.hasOwnProperty.call(error, key)) continue;

                const value = error[key];

                if (typeof value === "string") {
                    if (isMsgFields.includes(key)) {
                        msg.value.push(value.trim());
                    } else {
                        errors[key] = [value.trim()];
                    }
                } else if (Array.isArray(value)) {
                    errors[key] = [];
                    for (let index = 0; index < value.length; index++) {
                        const element = value[index];
                        if (typeof element === "string") {
                            if (isMsgFields.includes(key)) {
                                msg.value.push(element.trim());
                            } else {
                                errors[key].push(element.trim());
                            }
                        }
                    }
                }
            }
        }
    }

    return {
        msg,
        errors,
    };
};
