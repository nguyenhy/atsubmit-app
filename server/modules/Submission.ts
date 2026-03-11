import type { JSONValue, Timestamp, UUID } from "@server/modules/Fields";

export interface Submission {
    id: UUID;

    form_id: UUID;

    created_at: Timestamp;

    ip_address: string | null;

    user_agent: string | null;

    payload: JSONValue;

    spam_flag: boolean;
}
