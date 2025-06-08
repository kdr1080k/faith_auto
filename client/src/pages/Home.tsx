import { Helmet } from "react-helmet-async";
import Hero from "@/components/home/Hero";
import AllInclusive from "@/components/home/AllInclusive";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from 'react';

const Home = () => {
  const darkSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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

    if (darkSectionRef.current) {
      observer.observe(darkSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>FlexCar - Car Subscription & Quality Used Cars</title>
        <meta name="description" content="Experience the freedom of car subscription or find your perfect pre-owned vehicle. Flexible terms, all-inclusive packages, and quality assured used cars." />
      </Helmet>
      
      <Hero 
        title="Your Journey, Your Choice"
        subtitle="Subscribe to a flexible car experience or find your perfect pre-owned vehicle. Quality assured, hassle-free, and tailored to your lifestyle."
        buttonText="Explore Subscription"
        buttonLink="/subscription"
        secondaryButtonText="View Used Cars"
        secondaryButtonLink="/second-hand-cars"
      />
      
      {/* Featured Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Car Subscription */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-sync-alt text-primary text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Car Subscription</h3>
              <ul className="space-y-3 mb-6 text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  All-inclusive monthly fee
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Insurance & maintenance included
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Flexible terms from 1 month
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Switch cars when you want
                </li>
              </ul>
              <Link href="/subscription">
                <Button className="w-full transform transition-transform hover:scale-105">Learn More</Button>
              </Link>
            </div>

            {/* Second Hand Cars */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-car text-primary text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">Quality Used Cars</h3>
              <ul className="space-y-3 mb-6 text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Thoroughly inspected vehicles
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Warranty included
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Competitive financing
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Trade-in welcome
                </li>
              </ul>
              <Link href="/second-hand-cars">
                <Button className="w-full transform transition-transform hover:scale-105">View Inventory</Button>
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
            <h2 className="text-3xl font-bold mb-6 text-white">Why Choose FlexCar</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Whether you're looking for the flexibility of a subscription or the perfect pre-owned vehicle, 
              we're here to provide you with the best automotive experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-shield-alt text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Quality Assured</h3>
              <p className="text-gray-300">
                Every vehicle thoroughly inspected and maintained to the highest standards
              </p>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-dollar-sign text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Transparent Pricing</h3>
              <p className="text-gray-300">
                No hidden fees, competitive rates, and flexible payment options
              </p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-tools text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Expert Service</h3>
              <p className="text-gray-300">
                Professional maintenance and support for peace of mind
              </p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-headset text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Customer First</h3>
              <p className="text-gray-300">
                Dedicated support team available 7 days a week
              </p>
            </div>
          </div>

          {/* Smart Cars Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Smart Cars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-check-circle text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">All inclusive rates</h3>
              <p className="text-gray-300">
                Insurance, registration, servicing and roadside assistance all included for complete peace of mind.*
              </p>
            </div>

            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-car-side text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Premium luxury vehicles</h3>
              <p className="text-gray-300">
                Choose from our fleet of new & near-new hatchbacks, sedans and SUVs.
              </p>
            </div>

            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-sync-alt text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Flexible options</h3>
              <p className="text-gray-300">
                Subscribe from 3 months with options to switch, upgrade or purchase at term end.*
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-8 text-center">* Terms and conditions apply</p>
        </div>
      </section>

      <AllInclusive />

      {/* Contact Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
            <p className="text-gray-600">Questions about our services? We're here to help.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <i className="fas fa-map-marker-alt text-primary text-2xl mb-3"></i>
              <h3 className="font-medium text-lg mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Car Street<br />Melbourne, VIC 3000</p>
            </div>
            <div className="text-center">
              <i className="fas fa-phone-alt text-primary text-2xl mb-3"></i>
              <h3 className="font-medium text-lg mb-2">Call Us</h3>
              <p className="text-gray-600">(03) 1234 5678</p>
            </div>
            <div className="text-center">
              <i className="fas fa-envelope text-primary text-2xl mb-3"></i>
              <h3 className="font-medium text-lg mb-2">Email Us</h3>
              <p className="text-gray-600">info@flexcar.com.au</p>
            </div>
          </div>
          <div className="text-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary-hover transform transition-all duration-300 hover:scale-105"
              >
                Contact Us Now
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
