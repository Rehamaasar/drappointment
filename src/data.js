
// src/data.js

export const stats = [
  { label: "Expert Doctors", value: "50+" },
  { label: "Happy Patients", value: "10,000+" },
  { label: "Years Experience", value: "25+" },
  { label: "Success Rate", value: "98%" },
];

export const services = [
  {
    id: 1,
    title: "Online Consultation",
    description:
      "Connect with healthcare professionals from the comfort of your home through secure video calls.",
    icon: "Video",
  },
  {
    id: 2,
    title: "Emergency Support",
    description:
      "24/7 emergency medical assistance available for urgent healthcare needs and critical situations.",
    icon: "Ambulance",
  },
  {
    id: 3,
    title: "Personalized Care Plans",
    description:
      "Customized treatment plans tailored to your specific health needs and wellness goals.",
    icon: "Clipboard",
  },
  {
    id: 4,
    title: "Health Monitoring",
    description:
      "Continuous health tracking and regular check-ups to maintain optimal wellness and prevent illness.",
    icon: "Activity",
  },
  {
    id: 5,
    title: "Prescription Management",
    description:
      "Easy prescription refills and medication management through our integrated pharmacy network.",
    icon: "Pill",
  },
  {
    id: 6,
    title: "Lab Testing",
    description:
      "Comprehensive laboratory services with quick results and detailed health analysis reports.",
    icon: "Beaker",
  },
];

export const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    yearsExperience: 15,
    rating: 4.9,
    image: "/images/doctor-sarah.jpg",
    location: "HealthCare+ Medical Center",
    availability: ["Monday", "Wednesday", "Friday"],
    about:
      "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in cardiovascular medicine. She specializes in preventive cardiology and heart disease management.",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    yearsExperience: 12,
    rating: 4.8,
    image: "/images/doctor-michael.jpg",
    location: "HealthCare+ Children’s Clinic",
    availability: ["Tuesday", "Thursday"],
    about:
      "Dr. Michael Chen is a compassionate pediatrician focused on providing comprehensive care for infants, children, and adolescents.",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    yearsExperience: 10,
    rating: 4.9,
    image: "/images/doctor-emily.jpg",
    location: "HealthCare+ Skin & Wellness Center",
    availability: ["Monday", "Thursday"],
    about:
      "Dr. Emily Rodriguez is a dermatologist with expertise in both medical and cosmetic dermatology, helping patients feel confident in their skin.",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Jennifer Adams",
    subtitle: "Patient since 2022",
    avatar: "/images/raters/jennifer-adams.png",
    quote:
      "The care I received was exceptional. The doctors are knowledgeable, compassionate, and truly listen to their patients. Highly recommend!",
  },
  {
    id: 2,
    name: "David Thompson",
    subtitle: "Patient since 2021",
    avatar: "/images/raters/david-thompson.png",
    quote:
      "Booking appointments is so easy, and the online consultation feature is incredibly convenient. The medical staff is professional and caring.",
  },
  {
    id: 3,
    name: "Maria Garcia",
    subtitle: "Patient since 2023",
    avatar: "/images/raters/maria-garcia.png",
    quote:
      "I've been impressed with the level of care and attention to detail. The doctors take time to explain everything and answer all questions.",
  },
];
