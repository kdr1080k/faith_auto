import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/home/Hero";
import FeaturedCars from "@/components/home/FeaturedCars";
import AllInclusive from "@/components/home/AllInclusive";
import ComparisonSection from "@/components/home/ComparisonSection";
import CarSearchForm from "@/components/home/CarSearchForm";
import ContactCTA from "@/components/home/ContactCTA";

const WhySubscription = () => {
  const [filters, setFilters] = useState({
    location: "All",
    bodyType: "All",
    fuelType: "All",
    seats: "All"
  });

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

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-right');
    animatedElements.forEach(element => animationObserver.observe(element));

    return () => {
      animationObserver.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  return (
    <>
      <Helmet>
        <title>Car Subscription | Faith Auto</title>
        <meta name="description" content="Experience the future of car ownership with our flexible car subscription service. All-inclusive pricing with no long-term commitment." />
      </Helmet>
      
      <Hero 
        title="Car Subscription Service"
        subtitle="Drive the car you want with all-inclusive pricing. No long-term commitment, just flexible mobility solutions tailored to your lifestyle."
        buttonText="Make an Enquiry"
        buttonLink="/contact"
        height="medium"
        backgroundImage="/pexels-joshsorenson-59512.jpg"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
              <img 
                src="/pexels-shkrabaanthony-7144207.jpg" 
                alt="Modern car subscription service" 
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="animate-fade-up text-4xl font-bold mb-6" style={{ animationDelay: '300ms' }}>What is a Car Subscription?</h2>
              <div className="prose prose-lg">
                <p className="animate-fade-right text-gray-600 mb-6" style={{ animationDelay: '400ms' }}>
                  Our revolutionary car subscription service provides a modern, hassle-free alternative to traditional vehicle ownership and leasing. Experience complete freedom and flexibility in your mobility choices without the burden of long-term financial commitments.
                </p>
                <p className="animate-fade-right text-gray-600 mb-6" style={{ animationDelay: '500ms' }}>
                  Through a streamlined all-inclusive weekly payment structure, you gain immediate access to your selected vehicle along with comprehensive coverage including registration, insurance, maintenance, and 24/7 roadside assistance. Eliminate the complexity of managing multiple automotive expenses and the uncertainty of unexpected repair costs.
                </p>
                <p className="animate-fade-right text-gray-600" style={{ animationDelay: '600ms' }}>
                  Our flexible subscription model seamlessly adapts to your evolving lifestyle needs, whether you require a vehicle for several months or an extended period. Vehicle switching options are readily available, and minimal notice periods ensure you can adjust your commitment as circumstances change. This represents a sophisticated reimagining of automotive access for discerning drivers across Melbourne, Sydney, Brisbane, Perth, and Adelaide.
                </p>
              </div>
           
            </div>
          </div>
        </div>
      </section>
      
      <CarSearchForm 
        onFilterChange={handleFilterChange}
        initialLocation="All"
      />
      
      <ComparisonSection filters={filters} />

      <ContactCTA />
    </>
  );
};

export default WhySubscription;
