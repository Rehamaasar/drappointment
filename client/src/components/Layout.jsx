// Assigned to Lama
// src/components/Layout.jsx

import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

<<<<<<< Updated upstream:client/src/components/Layout.jsx
export default Layout;
=======
export default Layout;

>>>>>>> Stashed changes:src/components/Layout.jsx
