export type FormSettingsTabId =
    | "general"
    | "processing"
    | "domains"
    | "notifications";
export interface FormSettingsTab {
    id: FormSettingsTabId;
    name: string;
    href: string;
    icon: any;
}
