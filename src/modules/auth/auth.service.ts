import bcrypt from "bcryptjs";
import { pool } from './../../config/db';
import jwt from "jsonwebtoken";
import config from "../../config";

const signUpUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;
    const hashedPass = await bcrypt.hash(password as string, 10)
    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPass, phone, role]);
    delete result.rows[0].password
    return result.rows[0]
}

const signInUser = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
    if (result.rows.length === 0) {
        return null
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return null
    }
    const token = jwt.sign({ name: user.name, email: user.email, role: user.role, id: user.id }, config.jwtSecret as string, { expiresIn: "1d" })
    delete user.password;
    return { token, user }
}



export const authServices = {
    signUpUser, signInUser
}