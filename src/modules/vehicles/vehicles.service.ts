import { pool } from "../../config/db";


const createVehicle = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result.rows[0]
}

const getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result.rows
}

const getSingleVehicle = async (id: any) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
    return result.rows[0]
}



const updateVehicle = async (vehicleId: string, updateData: any) => {
    
    const exist = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
    if (exist.rows.length === 0) {
        const error: any = new Error("Vehicle not found");
        error.statusCode = 404;
        throw error;
    }

    
    if (!updateData || Object.keys(updateData).length === 0) {
        const error: any = new Error("No fields to update");
        error.statusCode = 400;
        throw error;
    }

    const fields = Object.keys(updateData);
    const values = Object.values(updateData);

    const setString = fields
        .map((field, index) => `${field} = $${index + 2}`)
        .join(', ');

    const result = await pool.query(
        `UPDATE vehicles SET ${setString} WHERE id = $1 RETURNING *`,
        [vehicleId, ...values]
    );

    return result.rows[0];
};



export const deleteVehicle = async (vehicleId: string) => {
    const bookingStatus = await pool.query(
        `SELECT * FROM bookings WHERE vehicle_id = $1 AND status = 'active'`,
        [vehicleId]
    );

    if (bookingStatus.rows.length > 0) {
        const error: any = new Error("Cannot delete vehicle with active bookings");
        error.statusCode = 400;
        throw error;
    }

    const result = await pool.query(`DELETE FROM vehicles WHERE id=$1 RETURNING *`, [vehicleId]);
    return result;
}







export const vehiclesServices = {
    createVehicle, getAllVehicles, getSingleVehicle, deleteVehicle, updateVehicle
}