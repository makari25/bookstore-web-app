# Bookstore Web App

A full-stack web application for managing a bookstore, including user registration, book browsing, orders, and payments. Built with Node.js, Prisma ORM, and PostgreSQL.

![alt text](image.png)

![alt text](image-1.png)



## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User registration and login
- Browse and view books
- Add books to cart and place orders
- Manage orders (view, cancel)
- Payment processing integration
- Role-based access (User/Admin)
- Secure password storage

---

## Technologies

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Payment:** Integration with payment providers (e.g., Stripe, PayPal)
- **Others:** Prisma Client, dotenv

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 14.x
- [PostgreSQL](https://www.postgresql.org/) installed and running
- Basic knowledge of JavaScript/Node.js

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/makari25/bookstore-web-app.git

cd bookstore-web-app
```
2. Install dependencies
   ```
   npm install
   ```
   
3. Configure environment variables
Create a .env file in the root directory with your database and secret configurations:
```
DATABASE_URL=postgresql://username:password@localhost:5432/bookstoredb
JWT_SECRET=your_jwt_secret
Replace username, password, and database name as per your PostgreSQL setup.
```
5. Initialize the database
Run Prisma migrations to create the database schema:
```
npx prisma migrate dev --name init
#This will create your tables in PostgreSQL.
```
6. Generate Prisma Client
```
npx prisma generate
```
7. Run the server
   ```
          node server.js
   ```
The server should now be running on http://localhost:5000.

# Database Setup
Ensure PostgreSQL is installed and running. Create a database:
```
          CREATE DATABASE bookstoredb;
      #Update your .env file with the correct connection string.
```

API Endpoints

Auth:

POST /api/register - Register a new user
POST /api/login - Login and receive JWT token


Books:

GET /api/books - List all books
GET /api/books/:id - Get details of a specific book


Orders:

POST /api/orders - Create a new order
GET /api/orders - List user orders
GET /api/orders/:id - Get order details


# Payments:

POST /api/payments - Initiate payment



Note: Authentication is required for most endpoints.

# Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
