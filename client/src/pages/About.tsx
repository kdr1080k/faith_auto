import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Helmet } from "react-helmet-async";

const About: React.FC = () => {
  // Create refs for all sections that need scroll animations
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section elements
    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Us | Faith Auto</title>
        <meta name="description" content="Learn about Faith Auto, Australia's leading importer of high-quality Japanese vehicles, providing reliable and trustworthy cars to Australian drivers." />
      </Helmet>

      {/* Hero Banner Section */}
      <section className="relative min-h-[400px] md:min-h-[450px] lg:min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: `
            linear-gradient(to bottom, 
              rgba(31, 41, 55, 0.95), 
              rgba(31, 41, 55, 0.85)
            ),
            url('/pexels-bertellifotografia-13872477.jpg')
          `
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center z-20 h-full">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <div 
              className="opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards] flex flex-col items-center"
              style={{ animationDelay: '250ms' }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 cursor-default">
                About Faith Auto
              </h1>
            </div>
            <div 
              className="mt-4 opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards] flex flex-col items-center"
              style={{ animationDelay: '500ms' }}
            >
              <p className="text-lg md:text-xl text-white transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] cursor-default max-w-2xl">
                Your trusted source for high-quality Japanese imports in Australia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Mission & Story Section */}
        <section 
          ref={el => sectionRefs.current[0] = el}
          className="mb-16 opacity-0 transition-all duration-1000"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 hover:scale-105 transition-transform duration-300">
                Our Mission & Story
              </h2>
              <p className="text-gray-600 mb-4 hover:text-gray-900 transition-colors duration-300">
                At Faith Auto, we believe that every car is a promise — of freedom, trust, and the road ahead. 
                Specializing in high-quality Japanese imports, we are committed to making reliable, honest, and 
                affordable cars available to Australian drivers.
              </p>
              <p className="text-gray-600 mb-4 hover:text-gray-900 transition-colors duration-300">
                Our journey began in 2018 with the launch of Rush Car Rental, a premium car rental brand serving 
                thousands of satisfied customers across major cities in Australia. Over time, we saw a growing 
                demand for well-maintained, trustworthy used cars — especially those from Japan. This inspired us 
                to create Faith Auto, a brand built on our passion for vehicles and our commitment to long-term value.
              </p>
              <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Today, Faith Auto is more than a dealership. It's a community built on integrity, transparency, and faith.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/pexels-taras-makarenko-188506-593172.jpg" 
                alt="Faith Auto Showroom" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section 
          ref={el => sectionRefs.current[1] = el}
          className="mb-16 bg-gray-50 rounded-2xl p-8 opacity-0 translate-y-4 transition-all duration-1000"
        >
          <h2 className="text-3xl font-bold mb-6 hover:scale-105 transition-transform duration-300">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                icon: 'fa-search',
                title: 'Vehicle Sourcing',
                description: 'Expert sourcing and inspection from trusted Japanese auction houses and suppliers.'
              },
              {
                icon: 'fa-car',
                title: 'Fleet Management',
                description: 'Years of experience in fleet operations and premium customer service.'
              },
              {
                icon: 'fa-file-contract',
                title: 'Compliance',
                description: 'Expertise in automotive finance, compliance, and logistics.'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <i className={`fas ${item.icon} text-primary`}></i>
                </div>
                <h3 className="font-bold mb-2 hover:text-primary transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300">{item.description}</p>
              </div>
            ))}
          </div>
          <blockquote className="border-l-4 border-primary pl-6 italic text-gray-700 text-lg hover:text-gray-900 transition-colors duration-300">
            "We're not just selling cars — we're building relationships through trust and consistency."
          </blockquote>
        </section>

        {/* Vehicle Categories Section */}
        <section 
          ref={el => sectionRefs.current[2] = el}
          className="mb-16 opacity-0 translate-y-4 transition-all duration-1000"
        >
          <h2 className="text-3xl font-bold mb-8 hover:scale-105 transition-transform duration-300">
            Our Vehicle Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Performance Vehicles',
                items: [
                  'JDM performance models (Toyota Supra, Nissan Skyline)',
                  'Honda Type R series'
                ]
              },
              {
                title: 'Family & Utility',
                items: [
                  'Toyota Alphard & Hiace',
                  'Land Cruiser Prado'
                ]
              }
            ].map((category, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold mb-4 hover:text-primary transition-colors duration-300">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex} 
                      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    >
                      <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-check text-gray-600 text-sm"></i>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Service Promise Section */}
        <section 
          ref={el => sectionRefs.current[3] = el}
          className="mb-16 bg-gray-50 rounded-2xl p-8 opacity-0 translate-y-4 transition-all duration-1000"
        >
          <h2 className="text-3xl font-bold mb-8 hover:scale-105 transition-transform duration-300">
            Our Service Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Clear History Reports',
                description: 'Complete auction sheets and odometer verification for every vehicle.'
              },
              {
                title: 'Extended Warranty Options',
                description: 'Comprehensive warranty and service packages available.'
              },
              {
                title: 'Australia-Wide Delivery',
                description: 'Professional vehicle transport to any location in Australia.'
              },
              {
                title: 'Expert Support',
                description: 'Multilingual team providing personalized assistance throughout your journey.'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="flex items-start hover:transform hover:translate-x-2 transition-transform duration-300"
              >
                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-check text-gray-600 text-sm"></i>
                </span>
                <div>
                  <h3 className="font-bold mb-1 hover:text-primary transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section 
          ref={el => sectionRefs.current[4] = el}
          className="mb-16 opacity-0 transition-all duration-1000"
        >
          <h2 className="text-3xl font-bold mb-8 hover:scale-105 transition-transform duration-300">
            Why Choose Faith Auto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Industry Experience',
                description: 'Backed by a proven rental & import track record'
              },
              {
                title: 'Customer-First Approach',
                description: 'Zero-pressure environment prioritizing your needs'
              },
              {
                title: 'Ethical Sourcing',
                description: 'We avoid flood-damaged, accident-prone, or tampered vehicles'
              },
              {
                title: 'Competitive Pricing',
                description: 'Direct Japan supply chain ensures best value'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="font-bold mb-2 hover:text-primary transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={el => sectionRefs.current[5] = el}
          className="text-center bg-gray-50 rounded-2xl p-12 opacity-0 transition-all duration-1000"
        >
          <h2 className="text-3xl font-bold mb-6 hover:scale-105 transition-transform duration-300">
            Ready to Find Your Perfect Vehicle?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto hover:text-gray-900 transition-colors duration-300">
            Browse our current inventory or make an enquiry. Our team is here to help you find the perfect Japanese import for your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/inventory">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg w-full sm:w-auto transform transition-transform duration-300 hover:scale-105">
                View Inventory
              </Button>
            </Link>
            <Link href="/enquiry">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg w-full sm:w-auto transform transition-transform duration-300 hover:scale-105">
                Make an Enquiry
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

// Update the global styles for animation
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
    filter: grayscale(0%) !important;
  }
  
  section {
    filter: grayscale(100%);
    transform: translateY(20px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
document.head.appendChild(style);

export default About;
