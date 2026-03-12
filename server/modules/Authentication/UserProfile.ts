import { Timestamp } from "../Fields";
import { User } from "./User";

export interface UserProfile {
    user_id: Pick<User, "id">;

    /**
     * max: 100
     */
    display_name: string;

    /**
     * max: 64
     */
    timezone: string;

    created_at: Timestamp;
    updated_at: Timestamp;
}
