import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import api, { buildImageUrl } from "../api";

function DoctorDetails() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setDoctor(null);
    setAvailability([]);
    setError("");

    api
      .get(`/doctors/${id}`)
      .then((data) => {
        if (data?.doctor) {
          setDoctor(data.doctor);
          setAvailability(Array.isArray(data.availability) ? data.availability : []);
        } else {
          setDoctor(data);
          setAvailability(Array.isArray(data?.available) ? data.available : []);
        }
      })
      .catch((err) => {
        console.log("DOCTOR DETAILS ERROR:", err);
        setError(err?.message || "Doctor not found.");
      });
  }, [id]);

  const ui = useMemo(() => {
    if (!doctor) return null;

    const name = doctor.full_name || doctor.name || "Doctor";
    const specialty = doctor.specialty_name || doctor.specialty || "Specialist";
    const rating = doctor.rating ?? "—";

    const years =
      doctor.years_experience !== undefined && doctor.years_experience !== null
        ? `${doctor.years_experience} years experience`
        : doctor.experience || "";

    const location = doctor.location || "";
    const about = doctor.bio || doctor.about || "";

    // ✅ use env-based backend URL
    const img = doctor.image_path
      ? buildImageUrl(doctor.image_path)
      : "/images/doctors/dr-sarah-johnson.png";

    const slots = availability.length ? availability : (doctor.available || []);

    return { name, specialty, rating, years, location, about, img, slots };
  }, [doctor, availability]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <p className="text-center text-slate-700">{error}</p>
        <div className="text-center mt-6">
          <Link to="/doctors" className="text-sm text-indigo-600">
            ← Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  if (!doctor || !ui) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <p className="text-center text-slate-700">Loading...</p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <Link to="/doctors" className="text-sm text-indigo-600 mb-6 inline-block">
        ← Back to Doctors
      </Link>

      <section className="bg-white/80 rounded-3xl shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-80 md:h-full bg-slate-100">
            <img
              src={ui.img}
              alt={ui.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/doctors/dr-sarah-johnson.png";
              }}
            />
          </div>

          <div className="p-8 space-y-4">
            <h1 className="text-2xl font-semibold text-slate-900">{ui.name}</h1>
            <p className="text-indigo-600 font-medium">{ui.specialty}</p>

            <div className="flex flex-wrap gap-3 text-sm text-slate-600 mt-4">
              <span className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-pink-500" />
                {ui.rating} rating
              </span>

              <span className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                {ui.years}
              </span>

              <span className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4" />
                {ui.location}
              </span>
            </div>

            <p className="text-sm text-slate-600 mt-4">{ui.about}</p>

            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500 mb-2">
                Availability
              </p>

              <div className="flex flex-wrap gap-2">
                {ui.slots.map((slot, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs"
                  >
                    <Clock className="w-3 h-3" />
                    {typeof slot === "string"
                      ? slot
                      : slot.day_of_week || "Available"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DoctorDetails;
