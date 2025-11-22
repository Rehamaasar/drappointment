import SectionHeader from "../components/SectionHeader.jsx";
import {
  Shield,
  Heart,
  User,
  Award,
  Clock,
  Stethoscope,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trusted Healthcare",
    text: "Over 25 years of providing reliable medical services to our community.",
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    text: "We treat every patient with kindness, respect, and personalized attention.",
  },
  {
    icon: User,
    title: "Expert Team",
    text: "50+ board-certified specialists with extensive experience in their fields.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    text: "Accredited facilities with state-of-the-art medical technology.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    text: "Round-the-clock emergency services and support for urgent needs.",
  },
  {
    icon: Stethoscope,
    title: "Comprehensive Services",
    text: "Full spectrum of medical services from preventive care to specialized treatment.",
  },
];

function About() {
  return (
    <div>
      {/* TOP TITLE SECTION */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="About"
            highlight="HealthCare+"
            subtitle="We're dedicated to providing exceptional healthcare services with a personal touch. Your health and wellness are at the heart of everything we do."
          />
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-10 lg:grid-cols-[1.1fr,1fr] items-center">
          {/* LEFT TEXT */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Our Story
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mb-3">
              Founded in 1999, HealthCare+ began with a simple mission: to
              make quality healthcare accessible, affordable, and compassionate.
              Over the past two decades, we've grown from a small clinic into a
              comprehensive healthcare platform serving thousands of patients.
            </p>
            <p className="text-slate-600 text-sm sm:text-base mb-3">
              Our journey has been guided by our commitment to excellence,
              innovation, and patient-centered care. We've embraced technology to
              make healthcare more convenient while never losing sight of the
              human connection that makes medicine meaningful.
            </p>
            <p className="text-slate-600 text-sm sm:text-base">
              Today, we're proud to offer a full range of medical services, from
              primary care to specialized treatments, delivered by a team of
              dedicated healthcare professionals who truly care about your
              wellbeing.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl bg-white">
            <img
              src="/images/doctors/hero/hospital-interior.png"
              alt="Hospital interior"
              className="w-full h-[320px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-10 bg-[#e0f0ff]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Why Choose"
            highlight="Us?"
            subtitle="We combine medical expertise with genuine compassion to provide an exceptional healthcare experience."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-3xl bg-white/90 shadow-sm px-6 py-7 hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-[#f4e8ff] mb-4">
                    <Icon className="h-6 w-6 text-[#7c3aed]" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-[#eef2ff] to-[#fdf2ff] p-7 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Our Mission
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To provide accessible, high-quality healthcare services that
              improve the wellbeing of our community. We aim to deliver
              compassionate care that respects every patient's dignity while
              embracing innovation to enhance medical experiences.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#fdf2ff] to-[#e0f2fe] p-7 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Our Vision
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be the most trusted healthcare partner in our community,
              recognized for clinical excellence, innovation, and patient
              satisfaction. We envision a future where technology and compassion
              work together to create better health outcomes for all.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

