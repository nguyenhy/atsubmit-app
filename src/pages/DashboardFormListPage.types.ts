export interface FormInfoItem {
    id: string;
    name: string;
    endpoint: string;
    status: string;
    is_active: boolean;
}

export interface FormStatsItem {
    submissions?: number;
}

export interface FormItem extends FormInfoItem, FormStatsItem {}
