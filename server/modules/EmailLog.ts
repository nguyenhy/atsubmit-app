import type { Timestamp, UUID } from "@server/modules/Fields";

export type EmailStatus = "queued" | "sent" | "failed" | "bounced" | string;

export interface EmailLog {
  id: UUID;

  submission_id: UUID;

  recipient_email: string;

  status: EmailStatus;

  provider_message_id: string | null;

  created_at: Timestamp;
}
