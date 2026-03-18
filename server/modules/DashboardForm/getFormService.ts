import { lazyPoolExecute } from "@server/db/pool";
import { MainContext } from "@server/types";
import { Form } from "../Form";

export const paginateForm = async (
    c: MainContext,
    data: {
        user_id: string;
        page: number;
        limit: number;
        orderBy?: "created_at" | "updated_at";
        orderDesc?: boolean;
    },
) => {
    const orderBy =
        data.orderBy &&
        (data.orderBy === "created_at" || data.orderBy === "updated_at")
            ? data.orderBy
            : "created_at";
    const direction = data.orderDesc ? "DESC" : "ASC";
    const offset = (data.page - 1) * data.limit;

    const query = `
        SELECT
            id,
            name,
            endpoint_slug,
            is_active,
            created_at,
            updated_at,
            COUNT(*) OVER() AS total
        FROM forms
        WHERE user_id = $1
        ORDER BY ${orderBy} ${direction}
        LIMIT $2
        OFFSET $3
    `;

    const params = [data.user_id, data.limit, offset];

    const result = await lazyPoolExecute(c, async (client) => {
        return client.query<
            Pick<
                Form,
                | "id"
                | "name"
                | "endpoint_slug"
                | "is_active"
                | "created_at"
                | "updated_at"
            > & { total: number }
        >(query, params);
    });

    const rows = result.rows;

    return {
        items: rows.map((item) => {
            return {
                id: item.endpoint_slug,
                name: item.name,
                endpoint: `https://api.atsubmit.com/f/${item.endpoint_slug}`,
                is_active: item.is_active,
                created_at: item.created_at,
                updated_at: item.updated_at,
            };
        }),
        total: rows.length ? Number(rows[0].total) : 0,
        page: data.page,
        limit: data.limit,
    };
};
