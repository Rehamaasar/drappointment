// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, HeartPulse, ShieldCheck } from "lucide-react";

import api, { buildImageUrl } from "../api";
import SectionHeader from "../components/SectionHeader.jsx";
import DoctorCard from "../components/DoctorCard.jsx";

import { stats, testimonials } from "../data.js";

function mapDoctor(d) {
  return {
    id: d.id,
    name: d.full_name,
    specialty: d.specialty,
    rating: d.rating,
    experience: `${d.years_experience} years experience`,
    location: d.location,
    about: d.bio,

    // ✅ Build full backend URL (Railway in production)
    image: d.image_path
      ? buildImageUrl(d.image_path)
      : buildImageUrl("/images/doctors/dr-sarah-johnson.png"),
  };
}

function Home() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/doctors")
      .then((rows) => {
        const mapped = (rows || []).map(mapDoctor);
        setDoctors(mapped);
        setError("");
      })
      .catch((err) => {
        console.log("HOME DOCTORS ERROR:", err);
        setError(err?.message || "Failed to load doctors.");
      });
  }, []);

  const homeDoctors = doctors.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-10 lg:grid-cols-[1.1fr,1fr] items-center">
          {/* Left */}
          <div>
            <p className="text-sm font-semibold text-[#6366f1] mb-3">
              Expert Medical Care
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4">
              Your wellness,
              <br />
              <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                our priority.
              </span>
            </h1>

            <p className="text-slate-600 max-w-xl mb-6">
              Experience compassionate, expert medical care tailored to you and your family.
              Your health journey begins with us.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-sm font-medium shadow-md hover:shadow-lg transition active:scale-95"
                type="button"
              >
                Book Appointment
              </button>

              <button
                onClick={() => navigate("/doctors")}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#6366f1] text-[#6366f1] text-sm font-medium bg-white/80 hover:bg-[#eef2ff] transition active:scale-95"
                type="button"
              >
                View Doctors
              </button>
            </div>

            <div className="flex gap-6 items-center text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-[#eef2ff] flex items-center justify-center">
                  <Users className="h-4 w-4 text-[#6366f1]" />
                </span>
                <span>10K+ happy patients</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-[#fce7f3] flex items-center justify-center">
                  <HeartPulse className="h-4 w-4 text-[#ec4899]" />
                </span>
                <span>Patient-centered care</span>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl bg-white">
              <img
                // ✅ Hero image should come from backend too (if it exists there)
                src={buildImageUrl("/images/doctors/hero/hero-doctor-patient.png")}
                alt="Doctor with patient"
                className="w-full h-[340px] object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = buildImageUrl("/images/doctors/dr-sarah-johnson.png");
                }}
              />
            </div>

            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white/90 px-4 py-3 shadow-md flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#eef2ff] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-[#6366f1]" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Trusted by</p>
                <p className="text-sm font-semibold text-slate-900">
                  50+ expert doctors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] py-6 px-6 sm:px-10 text-white grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold">{item.value}</div>
                <div className="text-xs sm:text-sm opacity-90">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS PREVIEW */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Meet Our"
            highlight="Doctors"
            subtitle="Get to know some of our board-certified specialists who are dedicated to your health and wellbeing."
            align="left"
          />

          {error && (
            <div className="mb-4 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            {homeDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/doctors")}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#6366f1] text-[#6366f1] text-sm font-medium bg-white hover:bg-[#eef2ff] transition active:scale-95"
              type="button"
            >
              View All Doctors →
            </button>
          </div>
        </div>
      </section>

      {/* PATIENT REVIEWS */}
      <section className="py-10 sm:py-14 bg-[#f5f3ff]/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Patient"
            highlight="Reviews"
            subtitle="Don't just take our word for it. Here's what our patients have to say."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-4 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="flex gap-1 text-[#f97316] text-xs">{"★★★★★"}</div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  “{review.quote}”
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <img
                    // If review.avatar is local, keep it. If it's missing, fallback to backend-served image.
                    src={review.avatar}
                    alt={review.name}
                    className="h-10 w-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = buildImageUrl("/images/doctors/dr-sarah-johnson.png");
                    }}
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {review.name}
                    </div>
                    <div className="text-xs text-slate-500">{review.subtitle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
