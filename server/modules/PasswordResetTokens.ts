import type { Timestamp, UUID } from "@server/modules/Fields";

export interface PasswordResetTokens {
  id: UUID;

  user_id: UUID;

  token_hash: string;

  expires_at: Timestamp;

  used_at: Timestamp;

  created_at: Timestamp;
}
