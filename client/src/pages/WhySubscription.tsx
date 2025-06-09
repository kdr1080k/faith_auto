import { useState } from "react";
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
            <div>
              <img 
                src="/pexels-shkrabaanthony-7144207.jpg" 
                alt="Modern car subscription service" 
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">What is a Car Subscription?</h2>
              <div className="prose prose-lg">
                <p className="text-gray-600 mb-6">
                  Think of it as Netflix for cars - a modern, hassle-free way to drive the car you want without the long-term commitments of traditional ownership or leasing. Our car subscription service offers you complete freedom and flexibility in your driving journey.
                </p>
                <p className="text-gray-600 mb-6">
                  With a simple all-inclusive weekly payment, you get access to your chosen vehicle plus everything you need to hit the road - registration, insurance, maintenance, and roadside assistance are all covered. No more juggling multiple bills or worrying about unexpected repair costs.
                </p>
                <p className="text-gray-600">
                  Whether you need a car for a few months or longer, our subscription model adapts to your lifestyle. Want to switch to a different vehicle? No problem. Your needs change? Simply return the car with minimal notice. It's car ownership reimagined for the modern driver in Melbourne, Sydney, Brisbane, Perth, and Adelaide.
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
