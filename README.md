🏥 HealthCare+ – Medical Appointment & Services Web Application

HealthCare+ is a modern ReactJS-based healthcare web application designed to help users explore medical services, browse doctors, view detailed profiles, and book appointments easily. The platform provides a clean UI/UX, responsive design, and a smooth user experience. Users can access information about doctors, services, contact details, and login functionality—all wrapped in a simple, elegant interface.

🚀 Live Demo

drappointment-k0axgpycy-lamaharmouch18s-projects.vercel.app

📌 Features

Fully responsive UI built with ReactJS + Tailwind CSS

Clean navigation using React Router DOM

Dynamic Doctor Details using URL parameters

Contact / Appointment form with validation and toast feedback

Login UI (local form handling)

Doctors directory with profiles, ratings, and availability

Services listing with categorized medical features

Reusable components

Navbar

Footer

SectionHeader

DoctorCard

Global data using external data files

Fully deployable on Vercel

🔑 Key Code (Summaries)
Layout Component

Wraps the entire application with a Navbar and Footer to maintain consistency across all pages.

Doctors Data

Stored in src/data/doctors.js, including name, specialty, experience, rating, availability, and image.

App Routing

Defines all routes using React Router DOM:

/ Home

/about About

/services Services

/doctors Doctors

/doctors/:id Doctor Details

/contact Book Appointment

/login Login

Appointment Form

Includes validation for required fields and toast notifications for:

Missing fields

Successful appointment request

Login

Frontend-only validation with a success toast message.

🛠 Technologies Used

ReactJS

React Router DOM

Tailwind CSS

Lucide Icons

Vercel Deployment

Git & GitHub Version Control

📥 Installation & Setup
# Clone repository
git clone https://github.com/lamaharmouch18/drappointment

# Navigate to project
cd healthcareplus

# Install dependencies
npm install

# Run development server
npm run dev

📌 Future Improvements

Add backend authentication (Next part)

Add real database for doctors and appointments (Next part)

Add patient dashboard

Add user registration

Add appointment history

👥 Team Members
Name  ID
Lama Harmouch  52330808
Reham Aasar  52230205

Instructor: Dr. Ahmad Trad
Semester: Fall 2025–2026