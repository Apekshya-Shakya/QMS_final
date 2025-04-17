
import { Navigation } from '@/components/Navigation';

const About = () => {
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">About Our Hospital</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            Welcome to our state-of-the-art hospital, dedicated to providing exceptional healthcare services to our community since 1985.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            To deliver compassionate, high-quality care that improves the health and well-being of our patients and communities.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
          <p>
            To be the trusted leader in healthcare, recognized for excellence in patient care, innovation, and community service.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Patient-centered care</li>
            <li>Integrity and accountability</li>
            <li>Respect for all individuals</li>
            <li>Excellence in all we do</li>
            <li>Teamwork and collaboration</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
