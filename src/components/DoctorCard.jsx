import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    // go to /doctors/1, /doctors/2, etc.
    navigate(`/doctors/${doctor.id}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition group">
      {/* IMAGE BOX */}
      <div className="relative w-full h-72 overflow-hidden rounded-t-3xl flex items-center justify-center bg-white">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="
            max-h-full w-auto
            object-contain
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* RATING BADGE ON IMAGE */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1 text-xs text-[#facc15] shadow">
          <Star className="h-3 w-3 fill-[#facc15]" />
          <span>{doctor.rating}</span>
        </div>
      </div>

      {/* TEXT + BUTTON */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          {doctor.name}
        </h3>
        <p className="text-[#6366f1] text-sm mb-1">{doctor.specialty}</p>
        <p className="text-slate-500 text-sm mb-4">{doctor.experience}</p>

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
