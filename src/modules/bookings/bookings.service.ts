import { pool } from "../../config/db";

interface CreateBookingPayload {
    customer_id: number;
    vehicle_id: number;
    rent_start_date: string;
    rent_end_date: string;
}

const createBooking = async (payload: CreateBookingPayload) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const vehicleResult = await pool.query(
        `SELECT * FROM vehicles WHERE id=$1`,
        [vehicle_id]
    );

    if (vehicleResult.rows.length === 0) {
        const error: any = new Error("Vehicle is not available");
        error.statusCode = 400;
        throw error;
    }

    const vehicle = vehicleResult.rows[0];
    if (vehicle.availability_status !== "available") {
        const error: any = new Error("Vehicle is not available");
        error.statusCode = 400;
        throw error;
    }


    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const total_price = days * vehicle.daily_rent_price;


    const bookingResult = await pool.query(
        `
      INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, "active"]
    );
    const booking = bookingResult.rows[0];


    await pool.query(
        `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
        [vehicle_id]
    );


    booking.vehicle = {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: vehicle.daily_rent_price
    };

    return booking;


}



export const getBookings = async (user: Express.UserPayload) => {
    if (user.role === "admin") {
        // Admin: সব bookings দেখবে
        const result = await pool.query(
            `
      SELECT 
        b.*,
        json_build_object('name', u.name, 'email', u.email) as customer,
        json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number) as vehicle
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
      ORDER BY b.id DESC
      `
        );
        return result.rows;
    }

    
    const result = await pool.query(
        `
    SELECT 
      b.*,
      json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number, 'type', v.type) as vehicle
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.customer_id = $1
    ORDER BY b.id DESC
    `,
        [user.id]
    );

    return result.rows;
};









export const bookingsServices = {
    createBooking, getBookings
}