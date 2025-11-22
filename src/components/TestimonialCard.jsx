
function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <p className="italic text-gray-600">"{testimonial.text}"</p>
      <p className="mt-4 font-bold">{testimonial.author}</p>
    </div>
  );
}

export default TestimonialCard;
