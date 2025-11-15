function NotFound() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-gray-600">Page not found.</p>
      <a href="/" className="text-blue-600 underline mt-4 block">
        Return Home
      </a>
    </div>
  );
}

export default NotFound;
