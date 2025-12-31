import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import api from "../api";

function Contact() {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    patient_full_name: "",
    patient_phone: "",
    patient_email: "",
    doctor_id: "",
    preferred_date: "",
    preferred_time: "",
    message: "",
  });

  function triggerError(msg) {
    setErrorMsg(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 4000);
  }

  function triggerSuccess() {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  useEffect(() => {
    api
      .get("/doctors")
      .then((data) => {
        setDoctors(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setDoctors([]);
      })
      .finally(() => setLoadingDoctors(false));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.patient_full_name.trim())
      return triggerError("Please enter your full name.");
    if (!form.patient_phone.trim())
      return triggerError("Please enter your phone number.");
    if (!form.patient_email.trim())
      return triggerError("Please enter your email address.");
    if (!validateEmail(form.patient_email))
      return triggerError("Please enter a valid email address.");
    if (!form.doctor_id) return triggerError("Please choose a doctor.");
    if (!form.preferred_date) return triggerError("Please choose a date.");
    if (!form.preferred_time) return triggerError("Please choose a time.");

    api
      .post("/appointments", {
        patient_full_name: form.patient_full_name,
        patient_phone: form.patient_phone,
        patient_email: form.patient_email,
        doctor_id: Number(form.doctor_id),
        preferred_date: form.preferred_date,
        preferred_time: form.preferred_time,
        message: form.message,
      })
      .then(() => {
        triggerSuccess();
        setShowError(false);
        setForm({
          patient_full_name: "",
          patient_phone: "",
          patient_email: "",
          doctor_id: "",
          preferred_date: "",
          preferred_time: "",
          message: "",
        });
      })
      .catch((err) => {
        triggerError(err?.message || "Failed to submit appointment.");
      });
  }

  return (
    <div className="py-12 sm:py-16 bg-[#f5f7ff] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-slate-600 mb-10">
          Schedule an appointment or reach out with any questions. We're here to
          help you.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT INFO */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Address</p>
                <p className="text-sm text-slate-600">123 Medical Center Drive</p>
                <p className="text-sm text-slate-600">Suite 100, Health City</p>
                <p className="text-sm text-slate-600">HC 12345</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <Phone className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Phone</p>
                <p className="text-sm text-slate-600">+1 (555) 123-4567</p>
                <p className="text-sm text-slate-600">
                  24/7 Emergency: +1 (555) 999-0000
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <Mail className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Email</p>
                <p className="text-sm text-slate-600">info@healthcareplus.com</p>
                <p className="text-sm text-slate-600">
                  appointments@healthcareplus.com
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <Clock className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Hours</p>
                <p className="text-sm text-slate-600">
                  Mon – Fri: 8:00 AM – 8:00 PM
                </p>
                <p className="text-sm text-slate-600">
                  Saturday: 9:00 AM – 5:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Book an Appointment
            </h2>

            {showSuccess && (
              <div className="mb-4 p-3 rounded-xl border border-green-200 bg-green-50 text-green-700 text-sm">
                Appointment request sent successfully!
              </div>
            )}

            {showError && (
              <div className="mb-4 p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    name="patient_full_name"
                    value={form.patient_full_name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Phone
                  </label>
                  <input
                    name="patient_phone"
                    value={form.patient_phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400"
                    placeholder="+961 ..."
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    name="patient_email"
                    value={form.patient_email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Select Doctor
                  </label>
                  <select
                    name="doctor_id"
                    value={form.doctor_id}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400"
                  >
                    <option value="">
                      {loadingDoctors ? "Loading..." : "Choose a doctor"}
                    </option>
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.full_name} ({d.specialty})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="preferred_date"
                    value={form.preferred_date}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    name="preferred_time"
                    value={form.preferred_time}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400 min-h-[120px]"
                  placeholder="Tell us about your health concern..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 transition"
              >
                Submit Appointment Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
