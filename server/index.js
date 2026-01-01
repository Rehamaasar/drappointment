import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

/* =========================================================
   Fix __dirname for ES Modules
========================================================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================================================
   1) Serve Images
   Put images here:
   server/public/images/doctors/...
   URL:
   https://YOUR_BACKEND_URL/images/doctors/filename.jpg
========================================================= */
app.use("/images", express.static(path.join(__dirname, "public", "images")));

/* =========================================================
   2) Middlewares
========================================================= */
app.use(express.json());

/* =========================================================
   3) CORS (IMPORTANT)
   Railway variable:
   FRONTEND_ORIGIN = https://YOUR-VERCEL-APP.vercel.app
========================================================= */
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman / server-to-server requests (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked: ${origin}`), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// handle preflight
app.options("*", cors());

/* =========================================================
   4) DB Connection (Railway MySQL variables)
   Railway gives:
   MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT
========================================================= */
const DB_HOST = process.env.MYSQLHOST || process.env.DB_HOST || "localhost";
const DB_USER = process.env.MYSQLUSER || process.env.DB_USER || "root";
const DB_PASSWORD = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "";
const DB_NAME =
  process.env.MYSQLDATABASE || process.env.DB_NAME || "healthcare_plus";
const DB_PORT = Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306);

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database:", DB_NAME);
    conn.release();
  }
});

/* =========================================================
   5) JWT
========================================================= */
const JWT_SECRET = process.env.JWT_SECRET || "change_me";

/* -----------------------------
   Helpers
----------------------------- */
function sendError(res, status, message) {
  return res.status(status).json({ toastType: "error", message });
}

function sendSuccess(res, status, message, extra = {}) {
  return res.status(status).json({ toastType: "success", message, ...extra });
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return sendError(res, 401, "Unauthorized: token missing");
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch {
    return sendError(res, 401, "Unauthorized: token invalid");
  }
}

/* =========================================================
   6) Base Routes
========================================================= */
app.get("/", (req, res) => {
  res.status(200).send("HealthCare+ API is running ✅");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* =========================================================
   AUTH APIs
========================================================= */
app.post("/auth/signup", (req, res) => {
  const { full_name, email, password, phone } = req.body;

  if (!full_name || !email || !password) {
    return sendError(res, 400, "full_name, email, password are required.");
  }

  const cleanName = String(full_name).trim();
  const cleanEmail = String(email).trim().toLowerCase();

  if (String(password).length < 6) {
    return sendError(res, 400, "Password must be at least 6 characters.");
  }

  const checkQ = "SELECT id FROM users WHERE email = ?";
  db.query(checkQ, [cleanEmail], async (err, rows) => {
    if (err) return sendError(res, 500, "Database error while checking email.");

    if (rows.length > 0) return sendError(res, 400, "Email already exists.");

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const insertQ =
      "INSERT INTO users (full_name, email, phone, password_hash, role, created_at) VALUES (?, ?, ?, ?, 'patient', NOW())";

    db.query(
      insertQ,
      [cleanName, cleanEmail, phone ? String(phone).trim() : null, password_hash],
      (err2, result) => {
        if (err2) return sendError(res, 500, "Database error while creating user.");

        const user = {
          id: result.insertId,
          full_name: cleanName,
          email: cleanEmail,
          phone: phone ? String(phone).trim() : null,
          role: "patient",
        };

        const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
        return sendSuccess(res, 201, "Signup successful!", { token, user });
      }
    );
  });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 400, "email and password are required.");
  }

  const cleanEmail = String(email).trim().toLowerCase();

  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [cleanEmail], async (err, rows) => {
    if (err) return sendError(res, 500, "Database error while logging in.");
    if (rows.length === 0) return sendError(res, 401, "Invalid email or password.");

    const userRow = rows[0];
    const ok = await bcrypt.compare(password, userRow.password_hash);

    if (!ok) return sendError(res, 401, "Invalid email or password.");

    const user = {
      id: userRow.id,
      full_name: userRow.full_name,
      email: userRow.email,
      phone: userRow.phone,
      role: userRow.role,
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
    return sendSuccess(res, 200, "Login successful!", { token, user });
  });
});

app.get("/auth/me", requireAuth, (req, res) => {
  const q =
    "SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = ?";
  db.query(q, [req.user.id], (err, rows) => {
    if (err) return sendError(res, 500, "Database error while fetching user.");
    if (rows.length === 0) return sendError(res, 404, "User not found.");
    return res.status(200).json(rows[0]);
  });
});

/* =========================================================
   SPECIALTIES
========================================================= */
app.get("/specialties", (req, res) => {
  const q = "SELECT id, name FROM specialties ORDER BY name ASC";
  db.query(q, (err, rows) => {
    if (err) return sendError(res, 500, "Database error while fetching specialties.");
    return res.status(200).json(rows);
  });
});

/* =========================================================
   DOCTORS
========================================================= */
app.get("/doctors", (req, res) => {
  const q = `
    SELECT 
      d.id,
      d.full_name,
      d.years_experience,
      d.rating,
      d.location,
      d.bio,
      d.image_path,
      d.is_active,
      s.name AS specialty
    FROM doctors d
    INNER JOIN specialties s ON s.id = d.specialty_id
    WHERE d.is_active = 1
    ORDER BY d.rating DESC, d.full_name ASC
  `;

  db.query(q, (err, rows) => {
    if (err) return sendError(res, 500, "Database error while fetching doctors.");
    return res.status(200).json(rows);
  });
});

app.get("/doctors/:id", (req, res) => {
  const doctorId = Number(req.params.id);

  if (!doctorId || isNaN(doctorId)) {
    return sendError(res, 400, "Valid doctor id is required.");
  }

  const doctorQ = `
    SELECT 
      d.*,
      s.name AS specialty
    FROM doctors d
    INNER JOIN specialties s ON s.id = d.specialty_id
    WHERE d.id = ?
    LIMIT 1
  `;

  db.query(doctorQ, [doctorId], (err, docRows) => {
    if (err) return sendError(res, 500, "Database error while fetching doctor.");
    if (docRows.length === 0) return sendError(res, 404, "Doctor not found.");

    const availabilityQ = `
      SELECT id, day_of_week, start_time, end_time
      FROM doctor_availability
      WHERE doctor_id = ? AND is_active = 1
      ORDER BY FIELD(day_of_week,'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')
    `;

    db.query(availabilityQ, [doctorId], (err2, availRows) => {
      if (err2) return sendError(res, 500, "Database error while fetching availability.");

      const reviewsQ = `
        SELECT id, reviewer_name, rating, comment, patient_since, created_at
        FROM reviews
        WHERE doctor_id = ?
        ORDER BY created_at DESC
      `;

      db.query(reviewsQ, [doctorId], (err3, reviewRows) => {
        if (err3) return sendError(res, 500, "Database error while fetching reviews.");

        return res.status(200).json({
          doctor: docRows[0],
          availability: availRows,
          reviews: reviewRows,
        });
      });
    });
  });
});

/* =========================================================
   APPOINTMENTS
========================================================= */
app.post("/appointments", (req, res) => {
  const {
    user_id,
    patient_full_name,
    patient_email,
    patient_phone,
    doctor_id,
    preferred_date,
    preferred_time,
    message,
  } = req.body;

  if (!patient_full_name || !patient_email || !patient_phone) {
    return sendError(res, 400, "Please fill patient name, email, and phone.");
  }

  if (!doctor_id || isNaN(Number(doctor_id))) {
    return sendError(res, 400, "Valid doctor_id is required.");
  }

  if (!preferred_date || !preferred_time) {
    return sendError(res, 400, "Please choose preferred date and time.");
  }

  const checkDoctorQ = "SELECT id FROM doctors WHERE id = ? AND is_active = 1";
  db.query(checkDoctorQ, [Number(doctor_id)], (err, docRows) => {
    if (err) return sendError(res, 500, "Database error while checking doctor.");
    if (docRows.length === 0) return sendError(res, 404, "Doctor not found.");

    const insertQ = `
      INSERT INTO appointments
        (user_id, patient_full_name, patient_email, patient_phone, doctor_id,
         preferred_date, preferred_time, message, status, created_at)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    db.query(
      insertQ,
      [
        user_id && !isNaN(Number(user_id)) ? Number(user_id) : null,
        String(patient_full_name).trim(),
        String(patient_email).trim(),
        String(patient_phone).trim(),
        Number(doctor_id),
        preferred_date,
        preferred_time,
        message ? String(message).trim() : null,
      ],
      (err2, result) => {
        if (err2) return sendError(res, 500, "Database error while creating appointment.");

        return sendSuccess(res, 201, "Appointment request sent successfully!", {
          appointment_id: result.insertId,
        });
      }
    );
  });
});

/* -----------------------------
   404
----------------------------- */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* -----------------------------
   Start server (Railway uses process.env.PORT)
----------------------------- */
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

