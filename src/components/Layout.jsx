<<<<<<< HEAD

=======
import Navbar from "./components/Navbar";

function Layout({ children }) {
  return (
    <div>
      {/* Top navigation bar */}
      <Navbar />

      {/* Main page content */}
      <main style={{ minHeight: "70vh" }}>{children}</main>

      {/* Simple footer */}
      <footer
        style={{
          marginTop: "2rem",
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "#f4f4f4",
        }}
      >
        <small>© 2024 DrAppointment – Demo project</small>
      </footer>
    </div>
  );
}

export default Layout;
>>>>>>> e59b98879056c056840c5279b1da74ee44643565
