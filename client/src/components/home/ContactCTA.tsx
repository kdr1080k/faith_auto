import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const ContactCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
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
    <section ref={sectionRef} className="py-48 bg-gray-50">
      <div 
        className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        <h3 
          className={`text-2xl md:text-3xl font-bold text-gray-900 mb-4 transform transition-all duration-500 hover:scale-105 cursor-default ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Ready to Experience Hassle-Free Car Subscription?
        </h3>
        <p 
          className={`text-lg text-gray-600 mb-8 transform transition-all duration-500 hover:scale-105 cursor-default ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Our team is here to help you find the perfect vehicle and subscription plan that fits your lifestyle.
        </p>
        <div 
          className={`transform transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 transform transition-all duration-300 hover:scale-105">
              Contact Us
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA; 