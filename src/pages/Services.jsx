import SectionHeader from "../components/SectionHeader.jsx";
import { services } from "../data.js";
import {
  Video,
  Ambulance,
  Clipboard,
  Activity,
  Pill,
  Beaker,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const iconMap = {
  Video,
  Ambulance,
  Clipboard,
  Activity,
  Pill,
  Beaker,
};

function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Our"
            highlight="Services"
            subtitle="Comprehensive healthcare solutions designed to meet all your medical needs. From preventive care to specialized treatment, we're here for you."
          />
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="rounded-3xl bg-white/90 shadow-sm px-6 py-7 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-[#f4e8ff] mb-4">
                  <Icon className="h-6 w-6 text-[#7c3aed]" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gradient CTA */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] px-8 py-10 text-center text-white shadow-md">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-sm sm:text-base mb-6 opacity-90 max-w-2xl mx-auto">
              Book an appointment today and take the first step towards
              better health and wellness.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white text-[#6366f1] text-sm font-medium hover:bg-slate-100 transition active:scale-95"
              type="button"
            >
              Book Appointment →
            </button>
          </div>
        </div>
      </section>

      {/* Why our services are special */}
      <section className="pb-14 bg-[#e0f0ff]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="What Makes Our Services"
            highlight="Special?"
            subtitle="We combine advanced medical technology with a patient-centered approach to provide exceptional care."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-3xl shadow-sm px-6 py-7">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Patient-Centered Approach
              </h3>
              <p className="text-sm text-slate-600">
                We design our services around your needs, ensuring personalized
                care at every step.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-sm px-6 py-7">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Advanced Technology
              </h3>
              <p className="text-sm text-slate-600">
                State-of-the-art medical equipment and digital health tools for
                accurate diagnosis.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-sm px-6 py-7">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Experienced Professionals
              </h3>
              <p className="text-sm text-slate-600">
                Board-certified specialists with years of experience in their
                respective fields.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-sm px-6 py-7">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Affordable Care
              </h3>
              <p className="text-sm text-slate-600">
                Quality healthcare that's accessible and affordable with flexible
                payment options.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
