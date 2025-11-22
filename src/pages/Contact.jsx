import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import { doctors } from "../data.js";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["123 Medical Center Drive", "Suite 100, Health City", "HC 12345"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+1 (555) 123-4567", "24/7 Emergency: +1 (555) 999-0000"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@healthcareplus.com", "appointments@healthcareplus.com"],
  },
  {
    icon: Clock,
    title: "Hours",
    lines: [
      "Mon – Fri: 8:00 AM – 8:00 PM",
      "Saturday: 9:00 AM – 5:00 PM",
      "Sunday: Emergency Only",
    ],
  },
];

function Contact() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");

  // 👉 Scroll to form when clicking "Book Appointment"
  useEffect(() => {
    const shouldScroll = localStorage.getItem("scrollToAppointment");
    if (shouldScroll === "true") {
      const section = document.getElementById("appointmentForm");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      localStorage.removeItem("scrollToAppointment");
    }
  }, []);

  // 👉 Handle form submit with validation
  const handleSubmit = () => {
    if (!fullName || !phone || !email || !doctor || !date || !time) {
      setToast("⚠ Please fill all required fields.");
      return;
    }

    setToast("✔ Appointment Request Received!");
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <div className="py-12 sm:py-16 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <SectionHeader
          title="Get In"
          highlight="Touch"
          subtitle="Schedule an appointment or reach out with any questions. We're here to help you."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr] items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {contactInfo.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-3xl bg-white shadow-sm px-6 py-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4e8ff]">
                    <Icon className="h-6 w-6 text-[#7c3aed]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-sm text-slate-600 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT FORM */}
          <div
            id="appointmentForm"
            className="bg-white rounded-3xl shadow-sm px-6 py-7 sm:px-8 sm:py-8"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Book an Appointment
            </h3>

            <form className="space-y-4">
              {/* FULL NAME + PHONE */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-700">Full Name</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-[#f3f4ff]/60 px-3 py-2 text-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-[#f3f4ff]/60 px-3 py-2 text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* EMAIL + DOCTOR */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-700">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-[#f3f4ff]/60 px-3 py-2 text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700">Select Doctor</label>
                  <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-[#f3f4ff]/60 px-3 py-2 text-sm"
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map((d) => (
                      <option key={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DATE + TIME */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-700">Preferred Date</label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-[#f3f4ff]/60 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700">Preferred Time</label>
                  <input
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    type="time"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-[#f3f4ff]/60 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-xs font-medium text-slate-700">
                  Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-[#f3f4ff]/60 px-3 py-2 text-sm"
                  placeholder="Tell us about your health concern..."
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-2 w-full rounded-full bg-[#6366f1] text-white text-sm font-medium py-2.5 hover:bg-[#4f46e5] transition"
              >
                Submit Appointment Request
              </button>
            </form>
          </div>
        </div>

        {/* TOAST */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-white shadow-xl rounded-2xl px-6 py-4 border">
            {toast}
            <p className="text-sm text-slate-600">
              {toast.includes("✔") && "We'll contact you shortly to confirm your appointment."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
