export type DashboardSettingsTabId = "profile" | "processing" | "domains" | "notifications";
export interface DashboardSettingsTab {
    id: DashboardSettingsTabId;
    name: string;
    href: string;
    icon: any;
}
