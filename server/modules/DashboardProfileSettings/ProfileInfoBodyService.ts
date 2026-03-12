import { validator } from "hono/validator";
import { z } from "zod";
import { SUPPORTED_TIMEZONE } from "./SupportedTimezone";

export const profileInfoSchema = z.object({
    name: z
        .string("Please enter your full name.")
        .trim()
        .min(2, "Full name must contain at least 2 characters."),
    timezone: z.enum(
        SUPPORTED_TIMEZONE,
        "Please select a valid timezone from the list.",
    ),
});

export const validateProfileInfoBodyService = () =>
    validator("form", (form, c) => {
        return profileInfoSchema.safeParse(form);
    });
