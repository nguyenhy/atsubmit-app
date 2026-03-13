import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { UserDomainSettings } from "../Authentication/UserSettings";

export const getDefaultDomainService = async (
    c: MainContext,
    user_id: string,
) => {
    const query = `
        SELECT
            us.default_allowed_domains,
            us.default_disallowed_domains
        FROM user_settings us
        WHERE user_id = $1
	`;
    const params = [user_id];
    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<UserDomainSettings>(query, params);
    });

    return result.rows[0] || null;
};
