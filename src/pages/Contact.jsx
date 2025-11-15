// LAMA

function Contact() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <form className="max-w-lg space-y-4">
        <input className="border p-2 w-full" placeholder="Full Name" />
        <input className="border p-2 w-full" placeholder="Email" />
        <textarea className="border p-2 w-full" placeholder="Message"></textarea>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
