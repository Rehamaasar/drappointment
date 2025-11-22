// REHAM

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="p-4 bg-white shadow">
      <nav className="flex justify-between items-center container mx-auto">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DrAppointment
        </Link>

        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
