
import { NavLink } from "react-router-dom";
import { HeartPulse, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-t from-[#e4f0ff] via-[#f6f2ff] to-[#f9fbff] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Top section */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#ff5ea8] to-[#7d5bff] flex items-center justify-center">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold">
                <span className="text-[#6a4cff]">Health</span>
                <span className="text-[#ff5ea8]">Care+</span>
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Your wellness, our priority. Providing compassionate, expert
              medical care for you and your family.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <NavLink to="/" className="hover:text-[#6a4cff]">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-[#6a4cff]">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-[#6a4cff]">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/doctors" className="hover:text-[#6a4cff]">
                  Our Doctors
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Online Consultation</li>
              <li>Emergency Support</li>
              <li>Health Monitoring</li>
              <li>Lab Testing</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-[#6a4cff]" />
                <span>
                  123 Medical Center Dr, Suite 100, Health City, HC 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#6a4cff]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#6a4cff]" />
                <span>info@healthcareplus.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 pt-6 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500 text-center mt-6">
            ©️ {new Date().getFullYear()} HealthCare+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}