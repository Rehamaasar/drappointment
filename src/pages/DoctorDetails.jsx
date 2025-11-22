import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import { doctors } from "../data/doctors";

function DoctorDetails() {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <p className="text-center text-slate-700">Doctor not found.</p>
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
          {/* Image */}
          <div className="h-80 md:h-full">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="p-8 space-y-4">
            <h1 className="text-2xl font-semibold text-slate-900">
              {doctor.name}
            </h1>
            <p className="text-indigo-600 font-medium">{doctor.specialty}</p>

            <div className="flex flex-wrap gap-3 text-sm text-slate-600 mt-4">
              <span className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-pink-500" />
                {doctor.rating} rating
              </span>
              <span className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                {doctor.experience}
              </span>
              <span className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4" />
                {doctor.location}
              </span>
            </div>

            <p className="text-sm text-slate-600 mt-4">{doctor.about}</p>

            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500 mb-2">
                Availability
              </p>
              <div className="flex flex-wrap gap-2">
                {doctor.available.map((day) => (
                  <span
                    key={day}
                    className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs"
                  >
                    <Clock className="w-3 h-3" />
                    {day}
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
