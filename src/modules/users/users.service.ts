import { pool } from "../../config/db";


const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    const WithoutPassword = result.rows.map(user => {
        delete user.password;
        return user;
    });
    return WithoutPassword
}

export const usersServices = {
    getUsers
}