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
      </div>
    </div>
  );
}

export default Doctors;
