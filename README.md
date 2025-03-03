# ResellBD Backend

## Overview

ResellBD is a platform for buying and selling second-hand products. This repository contains the backend of the project, built with a modular monolithic architecture to ensure scalability and maintainability.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## Features

- User authentication & authorization (JWT)
- CRUD operations for listings, transactions, and users
- Secure API with role-based access control
- Pagination, sorting, and filtering for listing
- Order management system
- Payment integration (SSL Commerez)
- Optimized database queries for performance

## Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or cloud instance)

### Steps

1. Clone the repository:

```sh
git clone https://github.com/Emam-Bokhari/ReSellBD-Server.git
cd ResellBD-Server
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the root directory and configure the required variables:

```env
PORT=5000
NODE=development
DATABASE_URL=mongodb+srv://ReSellBD:qYwgmPYvqy4vm49q@cluster0.kndeci6.mongodb.net/ReSellBD?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=12bdd4a2ffb0cfd2b0a6b7f59a0ed9d62e1103aeb70b4d835ed64edf5e466d95
STORE_NAME=ReSellBD
PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v3/api.php
VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
STORE_ID=dream67950c298b8c2
STORE_PASSWORD=dream67950c298b8c2@ssl
VALIDATION_URL=http://localhost:5000/api/v1/ssl/validate
SUCCESS_URL=http://localhost:3000/success
FAILED_URL=<your_failed_url>
CANCEL_URL=<your_cancel_url>
```

4. Start the development server:

```sh
npm run start:dev
```

## API Endpoints

### Authentication

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | `/api/v1/auth/register` | Register a new user |
| POST   | `/api/v1/auth/login`    | User login          |

### Users

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/api/v1/users`            | Get all users (Admin)      |
| GET    | `/api/v1/users/:id`        | Get a user by ID           |
| PATCH  | `/api/v1/users/:id`        | Update user information    |
| PATCH  | `/api/v1/users/:id/status` | Update user status (Admin) |
| DELETE | `/api/v1/users/:id`        | Delete Own ID              |

### Listings

| Method | Endpoint                      | Description                          |
| ------ | ----------------------------- | ------------------------------------ |
| GET    | `/api/v1/listings`            | Get all products                     |
| GET    | `/api/v1/listings/:id`        | Get a listing by ID                  |
| GET    | `/api/v1/listings/byUser`     | Get products by Specific User        |
| POST   | `/api/v1/listings`            | Add a new listing                    |
| PATCH  | `/api/v1/listings/:id`        | Update a listing                     |
| PATCH  | `/api/v1/listings/:id/status` | Update a listing status              |
| DELETE | `/api/v1/listings/:id`        | Delete a listing                     |
| DELETE | `/api/v1/listings/admin/:id`  | Delete inappropriate listing (Admin) |

### Transactions

| Method | Endpoint                                 | Description                               |
| ------ | ---------------------------------------- | ----------------------------------------- |
| GET    | `/api/v1/transactions`                   | Get all transactions (Admin)              |
| PATCH  | `/api/v1/transactions/:id/status`        | Update an transaction status ID           |
| POST   | `/api/v1/transactions`                   | Create a new transaction                  |
| GET    | `/api/v1/transactions/purchases-history` | Get all purchase history by specific user |
| GET    | `/api/v1/transactions/sales-history`     | Get all sales history by specific user    |

## Folder Structure

```
resellbd-backend/
├── dist/                                             # Compiled Code
│   ├── app/
│   ├── app.js
│   └── server.js
├── src/                                              # Source Code
│   ├── app/                                          # Main Application Logic
│   │   ├── config/                                   # Configuration Files
│   │   ├── builder/                                  # Query Builders
│   │   ├── errors/                                   # Error Handling
│   │   ├── interface/                                # TypeScript Interfaces
│   │   ├── middleware/                               # Middleware Functions
│   │   ├── modules/                                  # Modularized Features
│   │   ├── routes/                                   # API Routes
│   │   ├── types/                                    # Type Definitions
│   │   └── utils/                                    # Utility Functions
│   ├── app.ts                                        # Application Entry Point
│   └── server.ts                                     # Main Server File
├── .gitignore                                        # Files/Folders to Ignore in Git
├── .prettierignore                                   # Files/Folders to Ignore in Prettier
├── .prettierrc                                       # Prettier Configuration
├── README.md                                         # Documentation File
├── .eslint.config.mjs                                # ESLint Configuration
├── package-lock.json                                 # Lock File for Dependencies
├── package.json                                      # Project Metadata and Dependencies
├── tsconfig.json                                     # TypeScript Configuration
└── vercel.json                                       # Vercel Deployment Configuration
```

## 📞 Contact

For any inquiries, or suggestions, feel free to reach out:

- **Email**: [moshfiqurrahman37@gmail.com](mailto:moshfiqurrahman37@gmail.com)
- **GitHub**: [Emam-Bokhari](https://github.com/Emam-Bokhari)
- **LinkedIn**: [Moshfiqur Rahman](https://www.linkedin.com/in/moshfiqur-rahman-a302b32a3/)

I am always open to feedback ! 😊
