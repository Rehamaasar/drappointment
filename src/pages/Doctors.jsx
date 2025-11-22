<<<<<<< Updated upstream
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
=======
// REHAM

import { doctors } from "../data/mockData";
import DoctorCard from "../components/DoctorCard";

function Doctors() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Meet Our Doctors</h1>

      <div className="grid grid-cols-3 gap-6">
        {doctors.map((d) => (
          <DoctorCard key={d.id} doctor={d} />
        ))}
>>>>>>> Stashed changes
      </div>
    </div>
  );
}

export default Doctors;
