import type { Timestamp, UUID } from "@server/modules/Fields";

export interface Form {
    id: UUID;

    user_id: UUID;

    name: string;

    endpoint_slug: string;

    submit_token: string;

    allowed_domains: string[];

    notification_email: string | null;

    is_active: boolean;

    created_at: Timestamp;
    updated_at: Timestamp;
}
