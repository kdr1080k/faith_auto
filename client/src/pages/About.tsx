import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Helmet } from "react-helmet-async";

// Professional smooth animations with GPU acceleration
const animationStyles = `
  .animate-element {
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  
  @keyframes professionalFadeUp {
    0% { 
      opacity: 0; 
      transform: translate3d(0, 25px, 0) scale3d(0.98, 0.98, 1); 
    }
    100% { 
      opacity: 1; 
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
    }
  }
  
  @keyframes professionalSlideIn {
    0% { 
      opacity: 0; 
      transform: translate3d(-25px, 0, 0) scale3d(0.98, 0.98, 1); 
    }
    100% { 
      opacity: 1; 
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
    }
  }
  
  @keyframes professionalScale {
    0% { 
      opacity: 0; 
      transform: translate3d(0, 0, 0) scale3d(0.95, 0.95, 1); 
    }
    100% { 
      opacity: 1; 
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
    }
  }
  
  @keyframes professionalFadeRight {
    0% { 
      opacity: 0; 
      transform: translate3d(35px, 0, 0) scale3d(0.96, 0.96, 1); 
    }
    60% {
      opacity: 0.8;
      transform: translate3d(-2px, 0, 0) scale3d(1.01, 1.01, 1);
    }
    100% { 
      opacity: 1; 
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
    }
  }
  
  @keyframes professionalFadeLeft {
    0% { 
      opacity: 0; 
      transform: translate3d(-35px, 0, 0) scale3d(0.96, 0.96, 1); 
    }
    60% {
      opacity: 0.8;
      transform: translate3d(2px, 0, 0) scale3d(1.01, 1.01, 1);
    }
    100% { 
      opacity: 1; 
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1); 
    }
  }
  
  /* Cleanup will-change after animations */
  .animation-complete {
    will-change: auto;
  }
`;

const About: React.FC = () => {
  // Create refs for all sections that need scroll animations
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Add animation styles to the document
    const styleElement = document.createElement('style');
    styleElement.textContent = animationStyles;
    document.head.appendChild(styleElement);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const animationType = element.dataset.animation;
          
          // Use requestAnimationFrame for smoother timing
          requestAnimationFrame(() => {
            setTimeout(() => {
              element.classList.add('animate-element');
              
              // Add professional entrance effects based on animation type
                             if (animationType === 'fade-up') {
                 element.style.animation = 'professionalFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
               } else if (animationType === 'fade-right') {
                 element.style.animation = 'professionalFadeRight 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
               } else if (animationType === 'fade-in') {
                 element.style.animation = 'professionalFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
               }
              
              // Clean up will-change after animation completes
              setTimeout(() => {
                element.classList.add('animation-complete');
                element.style.removeProperty('will-change');
              }, 1000);
            }, parseInt(element.dataset.delay || '0'));
          });
        }
      });
    };

    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section elements and text elements
    [...sectionRefs.current, ...textRefs.current].forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Us | Faith Auto</title>
        <meta name="description" content="Learn about Faith Auto, Australia's leading importer of high-quality Japanese vehicles, providing reliable and trustworthy cars to Australian drivers." />
      </Helmet>

      {/* Hero Banner Section - Full Width */}
      <section className="relative w-full h-[600px] bg-cover bg-center bg-no-repeat flex items-center" style={{
        backgroundImage: `
          linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.55), 
            rgba(0, 0, 0, 0.55)
          ),
          url('/pexels-olia-danilevich-6647233.jpg')
        `
      }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center z-20 h-full">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <div 
              className="opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards] flex flex-col items-center"
              style={{ animationDelay: '250ms' }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight transform transition-all duration-300 hover:scale-105 cursor-default">
                About Faith Auto
              </h1>
            </div>
            <div 
              className="mt-4 opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards] flex flex-col items-center"
              style={{ animationDelay: '500ms' }}
            >
              <p className="text-lg md:text-xl text-white transform transition-all duration-300 hover:scale-[1.02] cursor-default max-w-2xl">
                Your trusted source for high-quality Japanese imports in Australia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <section 
            ref={el => sectionRefs.current[0] = el}
            className="mb-16 opacity-0 translate-y-8 transition-all duration-800 ease-out"
            data-animation="fade-in"
            data-delay="0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 hover:scale-105 transition-transform duration-300">
                  Our Mission & Story
                </h2>
                <p 
                  ref={el => textRefs.current[0] = el}
                  className="text-gray-600 mb-4 hover:text-gray-900 transition-colors duration-300 opacity-0 translate-x-8"
                  data-animation="fade-right"
                  data-delay="200"
                >
                  At Faith Auto, we believe that every car is a promise — of freedom, trust, and the road ahead. 
                  Specializing in high-quality Japanese imports, we are committed to making reliable, honest, and 
                  affordable cars available to Australian drivers.
                </p>
                <p 
                  ref={el => textRefs.current[1] = el}
                  className="text-gray-600 mb-4 hover:text-gray-900 transition-colors duration-300 opacity-0 translate-x-8"
                  data-animation="fade-right"
                  data-delay="300"
                >
                  Our journey began in 2018 with the launch of Rush Car Rental, a premium car rental brand serving 
                  thousands of satisfied customers across major cities in Australia. Over time, we saw a growing 
                  demand for well-maintained, trustworthy used cars — especially those from Japan. This inspired us 
                  to create Faith Auto, a brand built on our passion for vehicles and our commitment to long-term value.
                </p>
                <p 
                  ref={el => textRefs.current[2] = el}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 opacity-0 translate-x-8"
                  data-animation="fade-right"
                  data-delay="400"
                >
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
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <section 
            ref={el => sectionRefs.current[1] = el}
            className="opacity-0 translate-y-8 transition-all duration-800 ease-out"
            data-animation="fade-in"
            data-delay="100"
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
                  ref={el => textRefs.current[3 + index] = el}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 translate-y-8"
                  data-animation="fade-up"
                  data-delay={(200 + index * 100).toString()}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <i className={`fas ${item.icon} text-primary`}></i>
                  </div>
                  <h3 className="font-bold mb-2 hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300">{item.description}</p>
                </div>
              ))}
            </div>
            <blockquote 
              ref={el => textRefs.current[6] = el}
              className="border-l-4 border-primary pl-6 italic text-gray-700 text-lg hover:text-gray-900 transition-colors duration-300 opacity-0 translate-x-8"
              data-animation="fade-right"
              data-delay="500"
            >
              "We're not just selling cars — we're building relationships through trust and consistency."
            </blockquote>
          </section>
        </div>
      </div>

      {/* Vehicle Categories Section - Full Width Dark Theme */}
      <section 
        ref={el => sectionRefs.current[2] = el}
        className="w-full bg-gray-900 text-white py-20 opacity-0 translate-y-8 transition-all duration-800 ease-out"
        data-animation="fade-in"
        data-delay="100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 hover:scale-105 transition-transform duration-300 text-center">
            Our Vehicle Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
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
              <div key={index} className="hover:bg-gray-800/30 rounded-xl p-6 transition-colors duration-300">
                <h3 className="text-2xl font-bold mb-6 text-blue-400 hover:text-blue-300 transition-colors duration-300">{category.title}</h3>
                <ul className="space-y-4">
                                      {category.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex} 
                        ref={el => textRefs.current[7 + (index * 2) + itemIndex] = el}
                        className="flex items-start text-gray-300 hover:text-white transition-colors duration-300 opacity-0 translate-x-8"
                        data-animation="fade-right"
                        data-delay={(200 + (index * 200) + (itemIndex * 100)).toString()}
                      >
                        <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <i className="fas fa-check text-white text-sm"></i>
                        </span>
                        <span className="text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Promise Section - Full Width Dark Theme with Delayed Text */}
      <section 
        ref={el => sectionRefs.current[3] = el}
        className="w-full bg-gray-900 text-white py-20 opacity-0 translate-y-8 transition-all duration-800 ease-out"
        data-animation="fade-in"
        data-delay="200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 hover:scale-105 transition-transform duration-300 text-center">
            Our Service Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Clear History Reports',
                description: 'Complete auction sheets and odometer verification for every vehicle.',
                delay: '300'
              },
              {
                title: 'Extended Warranty Options',
                description: 'Comprehensive warranty and service packages available.',
                delay: '500'
              },
              {
                title: 'Australia-Wide Delivery',
                description: 'Professional vehicle transport to any location in Australia.',
                delay: '700'
              },
              {
                title: 'Expert Support',
                description: 'Multilingual team providing personalized assistance throughout your journey.',
                delay: '900'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="hover:bg-gray-800/30 rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <i className="fas fa-check text-white text-sm"></i>
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-blue-400 hover:text-blue-300 transition-colors duration-300">{service.title}</h3>
                                          <p 
                        ref={el => textRefs.current[11 + index] = el}
                        className="text-gray-300 hover:text-white transition-colors duration-300 leading-relaxed opacity-0 translate-x-8"
                        data-animation="fade-right"
                        data-delay={service.delay}
                      >
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <section 
            ref={el => sectionRefs.current[4] = el}
            className="mb-16 opacity-0 translate-y-8 transition-all duration-800 ease-out"
            data-animation="fade-in"
            data-delay="100"
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
                  ref={el => textRefs.current[15 + index] = el}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 opacity-0 translate-y-8"
                  data-animation="fade-up"
                  data-delay={(200 + index * 100).toString()}
                >
                  <h3 className="font-bold mb-2 hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <section 
            ref={el => sectionRefs.current[5] = el}
            className="text-center opacity-0 translate-y-8 transition-all duration-800 ease-out"
            data-animation="fade-in"
            data-delay="150"
          >
            <h2 className="text-3xl font-bold mb-6 hover:scale-105 transition-transform duration-300">
              Ready to Find Your Perfect Vehicle?
            </h2>
            <p 
              ref={el => textRefs.current[19] = el}
              className="text-gray-600 mb-8 max-w-2xl mx-auto hover:text-gray-900 transition-colors duration-300 opacity-0 translate-x-8"
              data-animation="fade-right"
              data-delay="200"
            >
              Browse our current inventory or make an enquiry. Our team is here to help you find the perfect Japanese import for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/cars">
                
              </Link>
              <Link href="/contact">
                <Button 
                  ref={el => textRefs.current[21] = el}
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg w-full sm:w-auto transform transition-all duration-300 hover:scale-105 hover:shadow-md opacity-0 translate-y-8"
                  data-animation="fade-up"
                  data-delay="400"
                >
                  Make an Enquiry
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
