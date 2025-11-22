
// src/pages/Doctors.jsx

import SectionHeader from "../components/SectionHeader.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
import { doctors } from "../data/doctors";

function Doctors() {
  return (
    <div className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Meet Our"
          highlight="Doctors"
          subtitle="Browse all of our board-certified specialists who are dedicated to your health and wellbeing."
          align="left"
        />

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
