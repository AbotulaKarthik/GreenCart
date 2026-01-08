🛒 GreenCart — Full-Stack Grocery Delivery Platform

GreenCart is a modern, full-stack MERN grocery delivery application designed to provide a seamless online shopping experience.
The platform supports product browsing, cart management, address handling, and order placement, with a scalable backend architecture.

🔗 Live Application:
https://green-cart-self-beta.vercel.app/

🔗 Backend API:
https://green-cart-be-flame.vercel.app/

📖 Overview

GreenCart demonstrates real-world full-stack development practices including:

RESTful API design

Secure authentication

Environment-based configuration

Cloud-based deployment

The application is structured for maintainability and scalability, following industry-standard project organization.

✨ Key Features
User

User registration and authentication

Browse grocery products

Add and remove items from cart

Manage delivery addresses

Place orders and view order history

Seller / Admin

Seller authentication

Product management (create, update, delete)

Order visibility

System

JWT-based authentication

Secure cookie handling

Cloudinary image uploads

Clean REST APIs

Responsive user interface

🧰 Tech Stack
Frontend

React (Vite)

React Router

Context API

Axios

Tailwind CSS

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Cloudinary

Cookie-Parser

CORS

Deployment

Frontend: Vercel

Backend: Vercel

Database: MongoDB Atlas

📁 Project Structure
GreenCart/
├── client/            # Frontend application (React + Vite)
├── server/            # Backend API (Node.js + Express)
├── .gitignore
└── README.md

🔐 Environment Configuration
Frontend (client/.env)
VITE_BACKEND_URL=https://green-cart-be-flame.vercel.app
VITE_CURRENCY=$

Backend (server/.env)
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


⚠️ Environment files are intentionally excluded from version control.

🛠️ Local Development Setup
1️⃣ Clone Repository
git clone https://github.com/AbotulaKarthik/GreenCart.git
cd GreenCart

2️⃣ Install Dependencies
Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm run dev

🌐 API Health Check
GET /
Response: Hello server

📌 Deployment Notes

Backend deployed as a serverless function on Vercel

Frontend configured with environment-specific API endpoints

CORS configured for production and local environments

🔮 Future Improvements

Online payment integration

Order status tracking

Admin dashboard analytics

Advanced product search and filtering

Notifications system

👤 Author

Karthik Abotula
GitHub: https://github.com/AbotulaKarthik
