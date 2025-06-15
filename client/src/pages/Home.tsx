import { Helmet } from "react-helmet-async";
import Hero from "@/components/home/Hero";
import AllInclusive from "@/components/home/AllInclusive";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from 'react';

const Home = () => {
  const darkSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Add professional CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-up {
        from {
          opacity: 0;
          transform: translate3d(0, 40px, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes fade-right {
        from {
          opacity: 0;
          transform: translate3d(-50px, 0, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      .animate-fade-up {
        opacity: 0;
        transform: translate3d(0, 40px, 0);
        will-change: opacity, transform;
        backface-visibility: hidden;
      }

      .animate-fade-right {
        opacity: 0;
        transform: translate3d(-50px, 0, 0);
        will-change: opacity, transform;
        backface-visibility: hidden;
      }

      .animate-fade-up.animate-in {
        animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .animate-fade-right.animate-in {
        animation: fade-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .animate-fade-up.animate-in,
      .animate-fade-right.animate-in {
        will-change: auto;
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bg-dark-active');
          } else {
            entry.target.classList.remove('bg-dark-active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px'
      }
    );

    // Animation observer
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Clean up performance properties after animation
          setTimeout(() => {
            (entry.target as HTMLElement).style.willChange = 'auto';
          }, 1000);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-50px'
    });

    if (darkSectionRef.current) {
      observer.observe(darkSectionRef.current);
    }

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-right');
    animatedElements.forEach(element => animationObserver.observe(element));

    return () => {
      observer.disconnect();
      animationObserver.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Faith Auto - Car Subscription & Quality  cars</title>
        <meta name="description" content="Experience the freedom of car subscription or find your perfect pre-owned vehicle. Flexible terms, all-inclusive packages, and quality assured  cars." />
      </Helmet>

      <Hero
        title="Your Journey, Your Choice"
        subtitle="Subscribe to a flexible car experience or find your perfect pre-owned vehicle. Quality assured, hassle-free, and tailored to your lifestyle."
        buttonText="View Car Listing"
        buttonLink="/car-listing"
        secondaryButtonText="Explore Subscription"
        secondaryButtonLink="/subscription"
      />

      {/* Featured Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="animate-fade-up text-3xl font-bold text-center mb-12" style={{ animationDelay: '200ms' }}>Choose Your Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Car Subscription */}
            <div className="animate-fade-up bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-sync-alt text-primary text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Car Subscription</h3>
              <ul className="space-y-3 mb-6 text-gray-600">
                <li className="animate-fade-right flex items-center" style={{ animationDelay: '400ms' }}>
                  <i className="fas fa-check text-primary mr-2"></i>
                  All-inclusive monthly fee
                </li>
                <li className="animate-fade-right flex items-center" style={{ animationDelay: '500ms' }}>
                  <i className="fas fa-check text-primary mr-2"></i>
                  Insurance & maintenance included
                </li>
                <li className="animate-fade-right flex items-center" style={{ animationDelay: '600ms' }}>
                  <i className="fas fa-check text-primary mr-2"></i>
                  Flexible terms from 1 month
                </li>
                <li className="animate-fade-right flex items-center" style={{ animationDelay: '700ms' }}>
                  <i className="fas fa-check text-primary mr-2"></i>
                  Switch cars when you want
                </li>
              </ul>
              <Link href="/subscription">
                <Button className="animate-fade-up w-full text-white transform transition-transform hover:scale-105" style={{ animationDelay: '800ms' }}>
                  View Vehicles
                </Button>
              </Link>

            </div>

            {/* Second Hand Cars */}
            <div className="animate-fade-up bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-car text-primary text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Quality  cars</h3>
              <ul className="space-y-3 mb-6 text-gray-600">
                <li className="animate-fade-right flex items-center" style={{ animationDelay: '500ms' }}>
                  <i className="fas fa-check text-primary mr-2"></i>
                  Thoroughly inspected vehicles
                </li>
                <li className="animate-fade-right flex items-center" style={{ animationDelay: '600ms' }}>
                  <i className="fas fa-check text-primary mr-2"></i>
                  Warranty included
                </li>
                <li className="animate-fade-right flex items-center" style={{ animationDelay: '700ms' }}>
                  <i className="fas fa-check text-primary mr-2"></i>
                  Competitive financing
                </li>
                <li className="animate-fade-right flex items-center" style={{ animationDelay: '800ms' }}>
                  <i className="fas fa-check text-primary mr-2"></i>
                  High quality vehicles
                </li>
              </ul>
              <Link href="/car-listing">
                <Button className="animate-fade-up w-full text-white transform transition-transform hover:scale-105" style={{ animationDelay: '900ms' }}>
                  View Vehicles
                </Button>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        className="py-24 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(17, 24, 39, 0.9),
              rgba(17, 24, 39, 0.85)
            ),
            url('/pexels-svonhorst-2920064.jpg')
          `
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="animate-fade-up text-3xl font-bold mb-6 text-white" style={{ animationDelay: '200ms' }}>Why Choose Faith Auto</h2>
            <p className="animate-fade-right text-xl max-w-3xl mx-auto text-gray-300" style={{ animationDelay: '300ms' }}>
              Whether you're looking for the flexibility of a subscription or the perfect pre-owned vehicle,
              we're here to provide you with the best automotive experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            <div className="animate-fade-up p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1" style={{ animationDelay: '400ms' }}>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-shield-alt text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Quality Assured</h3>
              <p className="animate-fade-right text-gray-300" style={{ animationDelay: '500ms' }}>
                Every vehicle thoroughly inspected and maintained to the highest standards
              </p>
            </div>

            <div className="animate-fade-up p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1" style={{ animationDelay: '500ms' }}>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-dollar-sign text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Transparent Pricing</h3>
              <p className="animate-fade-right text-gray-300" style={{ animationDelay: '600ms' }}>
                No hidden fees, competitive rates, and flexible payment options
              </p>
            </div>

            <div className="animate-fade-up p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1" style={{ animationDelay: '600ms' }}>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-tools text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Expert Service</h3>
              <p className="animate-fade-right text-gray-300" style={{ animationDelay: '700ms' }}>
                Professional maintenance and support for peace of mind
              </p>
            </div>

            <div className="animate-fade-up p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1" style={{ animationDelay: '700ms' }}>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-headset text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Customer First</h3>
              <p className="animate-fade-right text-gray-300" style={{ animationDelay: '800ms' }}>
                Dedicated support team available during the week.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AllInclusive />

      {/* Contact Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="animate-fade-up text-2xl font-bold mb-2" style={{ animationDelay: '200ms' }}>Get in Touch</h2>
            <p className="animate-fade-right text-gray-600" style={{ animationDelay: '300ms' }}>Questions about our services? We're here to help.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="animate-fade-up text-center" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-phone text-primary text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="animate-fade-right text-gray-600" style={{ animationDelay: '500ms' }}>1800 316 965</p>
            </div>
            <div className="animate-fade-up text-center" style={{ animationDelay: '500ms' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-envelope text-primary text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="animate-fade-right text-gray-600 break-all" style={{ animationDelay: '600ms' }}>melbourne@rushcarrental.com.au</p>
            </div>
            <div className="animate-fade-up text-center" style={{ animationDelay: '600ms' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-map-marker-alt text-primary text-xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="animate-fade-right text-gray-600" style={{ animationDelay: '700ms' }}>Westmeadows, Melbourne VIC</p>
            </div>
          </div>
          <div className="text-center">
            <Link href="/contact">
              <Button className="animate-fade-up bg-primary hover:bg-primary/90 text-white px-8 py-3" style={{ animationDelay: '800ms' }}>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
