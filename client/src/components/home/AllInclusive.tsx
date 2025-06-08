import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import styles from './AllInclusive.module.css';
import { useEffect, useRef, useState } from 'react';

const AllInclusive = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Smart Cars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-4">
              <i className="fas fa-shield-alt text-2xl text-primary"></i>
              <span className="text-lg font-semibold text-gray-900">All inclusive rates</span>
            </div>
            <p className="text-gray-600">
              Insurance, registration, servicing and roadside assistance all included for complete peace of mind.*
            </p>
          </div>

          {/* Card 2 */}
          <div className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-4">
              <i className="fas fa-car text-2xl text-primary"></i>
              <span className="text-lg font-semibold text-gray-900">Premium luxury vehicles</span>
            </div>
            <p className="text-gray-600">
              Choose from our fleet of new & near-new hatchbacks, sedans and SUVs.
            </p>
          </div>

          {/* Card 3 */}
          <div className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="flex items-center justify-between mb-4">
              <i className="fas fa-calendar-alt text-2xl text-primary"></i>
              <span className="text-lg font-semibold text-gray-900">Flexible options</span>
            </div>
            <p className="text-gray-600">
              Subscribe from 3 months with options to switch, upgrade or purchase at term end.*
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllInclusive;
