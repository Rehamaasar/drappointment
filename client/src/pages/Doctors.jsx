import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import DoctorCard from "../components/DoctorCard";
import api, { buildImageUrl } from "../api";

function mapDoctor(d) {
  return {
    id: d.id,
    name: d.full_name,
    specialty: d.specialty,
    rating: d.rating,
    experience: `${d.years_experience} years experience`,
    location: d.location,
    about: d.bio,

    // ✅ IMPORTANT: build full image url using env base (Railway in production)
    image: d.image_path
      ? buildImageUrl(d.image_path)
      : "/images/doctors/dr-sarah-johnson.png",
  };
}

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/doctors")
      .then((rows) => {
        setDoctors((rows || []).map(mapDoctor));
        setError("");
      })
      .catch((err) => {
        console.log("DOCTORS API ERROR:", err);
        setError(err?.message || "Failed to load doctors.");
      });
  }, []);

  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Meet Our"
          highlight="Doctors"
          subtitle="Browse all of our board-certified specialists who are dedicated to your health and wellbeing."
          align="left"
        />

        {error && (
          <div className="mb-4 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
