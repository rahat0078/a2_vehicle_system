# 🚗 Vehicle Rental System — Backend API (Node.js + TypeScript)

A complete backend system for managing vehicle rentals, bookings, and users with secure authentication, role-based access control, and a clean modular architecture.

---

## 📌 Features

### 🔐 Authentication & Authorization
- User signup & login (bcrypt + JWT)
- Role-based access (Admin / Customer)
- Protected routes

### 🚘 Vehicle Management
- Add, update, delete vehicles (Admin only)
- Validate unique registration numbers
- Availability tracking (available/booked)
- Prevent deletion when active bookings exist

### 📅 Booking System
- Create/cancel/return bookings
- Price auto-calculation (daily_rent_price × days)
- Auto return if end date passed
- Vehicle status update on booking lifecycle

### 👤 User Management
- CRUD operations for users (Admin)
- Prevent deletion of users with active bookings
- Customers can update their own profile

---

### 🛠️ Tech Stack

- **Node.js**  
- **Express.js**  
- **TypeScript**  
- **PostgreSQL**  
- **pg (PostgreSQL client)**  
- **bcryptjs**  
- **jsonwebtoken**  
- **ts-node-dev**  
- **ESLint**  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/rahat0078/a2_vehicle_system.git
cd a2_vehicle_system
npm install
3️⃣ Configure Environment Variables
PORT=5000
CONNECTION_STR=db_connection_string
JWTSECRET=your_jwt_secret_here
npm run dev
```
### 🧪 API Reference
#### 🔐 Auth
```bash

Signup
POST /api/v1/auth/signup

Signin
POST /api/v1/auth/signin
```

#### 🚘 Vehicles
```base
Create Vehicle (Admin)
POST /api/v1/vehicles

Get All Vehicles
GET /api/v1/vehicles

Get Single Vehicle
GET /api/v1/vehicles/:vehicleId

Update Vehicle (Admin)
PUT /api/v1/vehicles/:vehicleId

Delete Vehicle (Admin)
DELETE /api/v1/vehicles/:vehicleId

```

#### 👤 Users
``` bash
Get All Users (Admin)
GET /api/v1/users

Update User
PUT /api/v1/users/:userId

Delete User (Admin)
DELETE /api/v1/users/:userId

```

#### 📅 Bookings
```bash
Create Booking
POST /api/v1/bookings

Get Bookings
Admin → All bookings
Customer → Own bookings
GET /api/v1/bookings

Cancel Booking
PUT /api/v1/bookings/:bookingId/cancel

Return Booking
PUT /api/v1/bookings/:bookingId/return

```


