export type ThemeMode = "light" | "dark";

export const getCurrentTheme = (): ThemeMode =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

export const saveTheme = (value: ThemeMode) => {
    localStorage.setItem("theme", value);
};

export const getSavedTheme = (): string | null => {
    return localStorage.getItem("theme") || null;
};

export const isValidTheme = (value: unknown): value is ThemeMode =>
    !!value && (value === "dark" || value === "light");

export const initTheme = () => {
    if (typeof window === "undefined") return "light";

    const saved = getSavedTheme();
    if (isValidTheme(saved)) {
        applyTheme(saved);

        return saved;
    } else {
        const value = getCurrentTheme();
        saveTheme(value);
        applyTheme(value);

        return value;
    }
};

export const applyTheme = (theme: ThemeMode) => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    saveTheme(theme);
};

export const toggleTheme = () => {
    if (typeof window === "undefined") return "light";

    const saved = localStorage.getItem("theme") as ThemeMode | null;

    if (isValidTheme(saved)) {
        const flipped = saved === "light" ? "dark" : "light";

        saveTheme(flipped);
        applyTheme(flipped);

        return flipped;
    } else {
        const value = getCurrentTheme();
        const flipped = value === "light" ? "dark" : "light";

        saveTheme(value);
        applyTheme(flipped);

        return flipped;
    }
};
