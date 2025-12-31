import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/doctors/${doctor.id}`);
  };

  
  const name = doctor.full_name || doctor.name || "Doctor";
  const specialty = doctor.specialty_name || doctor.specialty || "Specialist";
  const rating = doctor.rating ?? "—";

  const experienceText =
    doctor.years_experience !== undefined && doctor.years_experience !== null
      ? `${doctor.years_experience} years experience`
      : doctor.experience || "";

  const img =
    doctor.image_path || doctor.image || "/images/doctors/dr-sarah-johnson.png";

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition group">
      <div className="relative w-full h-72 overflow-hidden rounded-t-3xl flex items-center justify-center bg-white">
        <img
          src={img}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/doctors/dr-sarah-johnson.png";
          }}
          className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1 text-xs text-[#facc15] shadow">
          <Star className="h-3 w-3 fill-[#facc15]" />
          <span>{rating}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">{name}</h3>
        <p className="text-[#6366f1] text-sm mb-1">{specialty}</p>
        <p className="text-slate-500 text-sm mb-4">{experienceText}</p>

        <button
          type="button"
          onClick={handleViewProfile}
          className="w-full py-3 rounded-full bg-[#6366f1] text-white text-sm font-medium hover:bg-[#4f46e5] transition active:scale-95"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
