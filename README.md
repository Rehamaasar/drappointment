🏥 HealthCare+ Doctor Appointment System

A full-stack Doctor Appointment Booking System built using React, Node.js, Express, and MySQL.
The platform allows users to browse doctors, view details, and book appointments through a modern, responsive interface.

📌 Project Overview

HealthCare+ is a web application designed to simplify the process of finding doctors and booking medical appointments online.
It separates concerns into a frontend (React) and backend (Node.js + Express) with a MySQL database.

🛠️ Tech Stack
Frontend

React (Create React App)

Tailwind CSS

Axios / Fetch API

React Router

Deployed on Vercel

Backend

Node.js

Express.js

MySQL

JWT Authentication

Deployed on Railway

Database

MySQL (Railway hosted) 
✨ Features

View all available doctors

Doctor details (specialty, experience, rating, bio)

Secure authentication using JWT

RESTful API architecture

Responsive UI

Backend error handling

Environment-based configuration

🌐 Live Links
Frontend (Vercel)

https://drappointment-82za.vercel.app

Backend (Railway)
https://romantic-acceptance-production-2479.up.railway.app

📂 Project Structure
drappointment/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── index.js
│   └── db.js
│
└── README.md

🔑 Environment Variables
Backend (Railway)
PORT=5000
MYSQLHOST=...
MYSQLUSER=...
MYSQLPASSWORD=...
MYSQLDATABASE=...
MYSQLPORT=...
JWT_SECRET=your_secret_key

Frontend (Vercel)
REACT_APP_API_URL=https://romantic-acceptance-production-2479.up.railway.app
🔄 API Endpoints (Sample)
Method	Endpoint	Description
GET	/doctors	Get all doctors
GET	/doctors/:id	Get doctor details
POST	/auth/login	User login
POST	/auth/register	User registration
🧪 Testing

Backend tested using browser & Postman

Frontend tested via deployed Vercel domain

Network tab used to verify API responses

🚀 Deployment

Frontend deployed on Vercel

Backend & MySQL deployed on Railway

Environment variables configured securely

👩‍💻 Author

Reham Aasar
Lama Harmouch

Lebanese International University (LIU)
📜 License

This project is for educational purposes.
