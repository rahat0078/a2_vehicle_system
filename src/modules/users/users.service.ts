import { pool } from "../../config/db";


const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    const WithoutPassword = result.rows.map(user => {
        delete user.password;
        return user;
    });
    return WithoutPassword
}




interface UpdateUserPayload {
    name?: string;
    email?: string;
    phone?: string;
    role?: "admin" | "customer";
}

const updateUser = async (req: any, userId: string) => {
    const loggedInUser = req.user as Express.UserPayload;
    if (!loggedInUser) {
        const error: any = new Error("Unauthorized");
        error.statusCode = 401;
        throw error;
    }

    const payload = req.body as UpdateUserPayload;

    // Customer can update only own profile
    if (loggedInUser.role === "customer") {
        if (loggedInUser.id !== Number(userId)) {
            const error: any = new Error("Customers can update only their own profile");
            error.statusCode = 403;
            throw error;
        }

        const result = await pool.query(
            `
      UPDATE users
      SET 
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone)
      WHERE id = $4
      RETURNING id, name, email, phone, role
      `,
            [payload.name ?? null, payload.email ?? null, payload.phone ?? null, loggedInUser.id]
        );

        return result.rows[0];
    }

    // Admin can update anything
    if (loggedInUser.role === "admin") {
        const result = await pool.query(
            `
      UPDATE users
      SET 
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone),
        role = COALESCE($4, role)
      WHERE id = $5
      RETURNING id, name, email, phone, role
      `,
            [
                payload.name ?? null,
                payload.email ?? null,
                payload.phone ?? null,
                payload.role ?? null,
                userId,
            ]
        );

        return result.rows[0];
    }

    const error: any = new Error("Unauthorized");
    error.statusCode = 403;
    throw error;
};

const deleteUser = async (userId: string) => {
    const bookingStatus = await pool.query(
        `SELECT * FROM bookings WHERE customer_id = $1 AND status = 'active'`,
        [userId]
    );

    if (bookingStatus.rows.length > 0) {
        const error: any = new Error("Cannot delete user with active bookings");
        error.statusCode = 400;
        throw error;
    }

    const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [userId]);
    return result;
}




export const usersServices = {
    getUsers, updateUser, deleteUser
}