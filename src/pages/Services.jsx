import { services } from "../data/mockData";
import ServiceCard from "../components/ServiceCard";

function Services() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>

      <div className="grid grid-cols-3 gap-6">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
}

export default Services;
